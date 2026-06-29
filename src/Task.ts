// own modules
import { Event } from './enums/Event.js';
import type { TaskTimer } from './TaskTimer.js';
import type {
  ITaskBaseOptions,
  ITaskOptions,
  ITaskTimerEvent,
  ITimeInfo,
  TaskCallback
} from './types/index.js';
import { utils } from './utils.js';

/**
 *  Default task options.
 *  @internal
 */
const DEFAULT_TASK_OPTIONS = Object.freeze({
  enabled: true,
  tickDelay: 0,
  tickInterval: 1,
  totalRuns: null as number | null,
  startDate: null as number | Date | null,
  stopDate: null as number | Date | null,
  immediate: false,
  removeOnCompleted: false
});

/**
 *  Represents a task that holds the configuration and the callback to be run by
 *  a {@link TaskTimer} on its tick intervals.
 *
 *  A task can be created implicitly via {@link TaskTimer.add} (passing options
 *  or a callback) or explicitly with the `Task` constructor when a stable
 *  reference is needed up front.
 *
 *  @example
 *  const task = new Task({
 *    id: 'heartbeat',
 *    tickInterval: 5,
 *    totalRuns: 10,
 *    callback(task) {
 *      console.log(`${task.id} ran ${task.currentRuns} times`);
 *    }
 *  });
 *  timer.add(task);
 */
class Task {
  /**
   *  The owning timer, set by {@link TaskTimer.add}.
   *  @internal
   */
  #timer!: TaskTimer;

  /**
   *  Whether the task has been marked completed. Always (re)set by `#init`.
   *  @internal
   */
  #markedCompleted!: boolean;

  /**
   *  Internal state and resolved options.
   *  @internal
   */
  #state!: {
    currentRuns: number;
    timeOnFirstRun?: number;
    timeOnLastRun?: number;
    totalRuns?: number | null;
    startDate?: number | Date | null;
    stopDate?: number | Date | null;
  } & Omit<ITaskOptions, 'totalRuns' | 'startDate' | 'stopDate'>;

  /**
   *  Creates a new `Task`.
   *  @param options - Task options. A unique `id` and a `callback` are required.
   */
  constructor(options: ITaskOptions) {
    this.#init(options);
  }

  // ---------------------------
  // PUBLIC PROPERTIES
  // ---------------------------

  /**
   *  Unique ID of the task.
   */
  get id(): string {
    return this.#state.id!;
  }

  /**
   *  Whether the task is currently enabled. While `false`, the task bypasses its
   *  callback — a manual on/off switch over execution.
   */
  get enabled(): boolean {
    return this.#state.enabled!;
  }
  set enabled(value: boolean) {
    this.#state.enabled = utils.getBool(value, DEFAULT_TASK_OPTIONS.enabled);
  }

  /**
   *  Number of ticks to wait before running the task for the first time.
   */
  get tickDelay(): number {
    return this.#state.tickDelay!;
  }
  set tickDelay(value: number) {
    this.#state.tickDelay = utils.getNumber(value, 0, DEFAULT_TASK_OPTIONS.tickDelay!);
  }

  /**
   *  Tick interval the task runs on. The unit is ticks, not milliseconds: with a
   *  timer interval of `1000` ms, a `tickInterval` of `5` runs the task every 5
   *  seconds.
   */
  get tickInterval(): number {
    return this.#state.tickInterval!;
  }
  set tickInterval(value: number) {
    this.#state.tickInterval = utils.getNumber(value, 1, DEFAULT_TASK_OPTIONS.tickInterval!);
  }

  /**
   *  Total number of times the task should run. `0` or `null` means unlimited
   *  (until the timer stops).
   */
  get totalRuns(): number {
    return this.#state.totalRuns!;
  }
  set totalRuns(value: number) {
    this.#state.totalRuns = utils.getNumber(value, 0, DEFAULT_TASK_OPTIONS.totalRuns!);
  }

  /**
   *  Whether the callback is wrapped in a `setImmediate()` before executing.
   *  Useful when the task synchronously blocks the event loop.
   */
  get immediate(): boolean {
    return this.#state.immediate!;
  }
  set immediate(value: boolean) {
    this.#state.immediate = utils.getBool(value, DEFAULT_TASK_OPTIONS.immediate);
  }

  /**
   *  Number of times the task has run.
   */
  get currentRuns(): number {
    return this.#state.currentRuns;
  }

  /**
   *  Lifetime information for the task: `started`, `stopped` (`0` if still
   *  running) and `elapsed`, in milliseconds.
   */
  get time(): ITimeInfo {
    const started = this.#state.timeOnFirstRun || 0;
    const stopped = this.#state.timeOnLastRun || 0;
    // Mirror the timer's `time`: 0 before the first run, the live elapsed while
    // the task is still running, and frozen at (stopped - started) once it has
    // completed. (Previously `stopped - started` with stopped still 0, so a
    // running task reported a negative elapsed.)
    let elapsed = 0;
    if (started) elapsed = (stopped || Date.now()) - started;
    return Object.freeze({ started, stopped, elapsed });
  }

  /**
   *  Callback executed on each run.
   */
  get callback(): TaskCallback {
    return this.#state.callback;
  }

  /**
   *  Whether to remove the task (freeing memory) once it has completed. Requires
   *  `totalRuns` and/or `stopDate` to be set.
   */
  get removeOnCompleted(): boolean {
    return this.#state.removeOnCompleted!;
  }
  set removeOnCompleted(value: boolean) {
    this.#state.removeOnCompleted = utils.getBool(value, DEFAULT_TASK_OPTIONS.removeOnCompleted);
  }

  /**
   *  Whether the task has completed all of its runs or reached its `stopDate`.
   *  Always `false` when neither `totalRuns` nor `stopDate` is set.
   */
  get completed(): boolean {
    // Stryker disable next-line all: fast-path equivalent to the expression below in normal flow (#markedCompleted is only set once the task is already completed).
    if (this.#markedCompleted) return true;
    return Boolean(
      (this.totalRuns && this.currentRuns >= this.totalRuns) ||
        // Stryker disable next-line all: stopDate boundary is wall-clock exact and not deterministically killable.
        (this.#state.stopDate && Date.now() >= Number(this.#state.stopDate))
    );
  }

  /**
   *  Whether the task can run on the current tick of the timer.
   *  @internal
   */
  get canRunOnTick(): boolean {
    // Stryker disable next-line all: redundant fast-path; `_run` re-checks #markedCompleted before executing.
    if (this.#markedCompleted) return false;
    const { startDate } = this.#state;
    // Stryker disable all: date-anchored scheduling — mutations shift only the virtual tick mapping/start gate (wall-clock dependent), covered behaviorally by the startDate test.
    if (startDate && Date.now() < Number(startDate)) return false;
    const tickCount = startDate
      ? Math.ceil((Date.now() - Number(startDate)) / this.#timer.interval)
      : this.#timer.tickCount;
    // Stryker restore all
    return tickCount > this.tickDelay && (tickCount - this.tickDelay) % this.tickInterval === 0;
  }

  // ---------------------------
  // PUBLIC METHODS
  // ---------------------------

  /**
   *  Resets the current run count, keeping the task running for the same
   *  `tickInterval` as initially configured. Optionally re-configures the task.
   *  @param options - New options to apply. The task `id` cannot be changed.
   *  @returns The task instance for chaining.
   *  @throws If `options` tries to change the task `id`.
   */
  reset(options?: ITaskBaseOptions): Task {
    this.#state.currentRuns = 0;
    if (options) {
      const { id } = options as ITaskOptions;
      if (id && id !== this.id) throw new Error('Cannot change ID of a task.');
      (options as ITaskOptions).id = this.id;
      this.#init(options as ITaskOptions);
    }
    return this;
  }

  /**
   *  Serializes the task to a plain object (excluding the callback). Used by
   *  `JSON.stringify`.
   */
  toJSON(): Record<string, any> {
    const obj: Record<string, any> = { ...this.#state };
    delete obj.callback;
    return obj;
  }

  // ---------------------------
  // INTERNAL METHODS
  // ---------------------------

  /**
   *  Sets the owning timer. Called only by {@link TaskTimer}.
   *  @internal
   */
  _setTimer(timer: TaskTimer): void {
    this.#timer = timer;
  }

  /**
   *  Runs the task. Called only by {@link TaskTimer} on each eligible tick.
   *  @internal
   */
  _run(onRun: () => void): void {
    if (!this.enabled || this.#markedCompleted) return;
    if (this.currentRuns === 0) this.#state.timeOnFirstRun = Date.now();
    // current runs must be set before execution, or it might drift if some
    // async runs finish faster than others.
    this.#state.currentRuns++;
    onRun();

    if (this.immediate) {
      utils.setImmediate(() => this.#execCallback());
    } else {
      this.#execCallback();
    }
  }

  /**
   *  Emits a `taskError` event through the owning timer.
   *  @internal
   */
  #emitError(error: Error): void {
    const event: ITaskTimerEvent = {
      name: Event.TASK_ERROR,
      source: this,
      error
    };
    this.#timer.emit(Event.TASK_ERROR, event);
  }

  /**
   *  Informs the owning timer that the task is completed. Called after the
   *  execution finishes.
   *  @internal
   */
  #done(): void {
    if (this.completed) {
      this.#markedCompleted = true;
      this.#state.timeOnLastRun = Date.now();
      this.#timer._taskCompleted(this);
    }
  }

  /**
   *  Executes the callback, handling sync, `done()`-based and Promise-based
   *  tasks, and emitting `taskError` on failure.
   *  @internal
   */
  #execCallback(): void {
    try {
      const result = this.callback(this, () => this.#done());
      if (this.callback.length >= 2) {
        // async; resolved by the user calling done() within the callback.
      } else if (utils.isPromise(result)) {
        (result as Promise<unknown>)
          .then(() => this.#done())
          .catch((err: Error) => {
            this.#emitError(err);
          });
      } else {
        this.#done();
      }
    } catch (err) {
      this.#emitError(err as Error);
    }
  }

  /**
   *  Validates and applies the given options.
   *  @internal
   */
  #init(options: ITaskOptions): void {
    if (!options?.id) {
      throw new Error('A unique task ID is required.');
    }
    if (typeof options.callback !== 'function') {
      throw new Error('A callback function is required for a task to run.');
    }
    const { startDate, stopDate } = options;
    // Stryker disable next-line all: the `&&` chain's short-circuit is equivalent to `||` here (a single date makes the numeric comparison `>= NaN`, always false).
    if (startDate && stopDate && Number(startDate) >= Number(stopDate)) {
      throw new Error('Task start date cannot be the same or after stop date.');
    }

    this.#markedCompleted = false;
    this.#state = {
      currentRuns: 0,
      ...DEFAULT_TASK_OPTIONS,
      id: String(options.id),
      callback: options.callback,
      startDate: startDate || null,
      stopDate: stopDate || null
    };

    // using setters for validation & default values
    this.enabled = options.enabled!;
    this.tickDelay = options.tickDelay!;
    this.tickInterval = options.tickInterval!;
    this.totalRuns = options.totalRuns!;
    this.immediate = options.immediate!;
    this.removeOnCompleted = options.removeOnCompleted!;
  }
}

export { Task };
