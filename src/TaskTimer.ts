// own modules
import { EventEmitter } from './core/EventEmitter.js';
import { Event } from './enums/Event.js';
import * as enums from './enums/index.js';
import { State } from './enums/State.js';
import { Task as TaskClass } from './Task.js';
import type {
  ITaskOptions,
  ITaskTimerEvent,
  ITaskTimerOptions,
  ITimeInfo,
  TaskCallback
} from './types/index.js';
import { utils } from './utils.js';

/**
 *  Default timer options.
 *  @internal
 */
const DEFAULT_TIMER_OPTIONS: Readonly<ITaskTimerOptions> = Object.freeze({
  interval: 1000,
  precision: true,
  stopOnCompleted: false
});

/**
 *  A timer utility for running periodic tasks on tick intervals. Useful for
 *  running or scheduling multiple tasks on a single timer instance.
 *
 *  `TaskTimer` extends an internal `EventEmitter` (zero runtime dependencies),
 *  so you can subscribe to lifecycle events via {@link TaskTimer.on} and the
 *  related methods.
 *
 *  @example
 *  const timer = new TaskTimer(1000); // 1s base interval
 *  timer.on(TaskTimer.Event.TICK, () => console.log(timer.tickCount));
 *  timer.add({
 *    id: 'heartbeat',
 *    tickInterval: 5, // every 5 ticks
 *    totalRuns: 10,
 *    callback(task) {
 *      console.log(`${task.id} ran ${task.currentRuns} times`);
 *    }
 *  });
 *  timer.start();
 */
class TaskTimer extends EventEmitter {
  /**
   *  Internal state. Paused time is excluded from precision calculations, so the
   *  resume-relative fields are kept separately.
   *  @internal
   */
  #state!: {
    opts: ITaskTimerOptions;
    state: State;
    tasks: { [k: string]: TaskClass };
    tickCount: number;
    taskRunCount: number;
    startTime: number;
    stopTime: number;
    completedTaskCount: number;
    resumeTime: number;
    hrResumeTime: [number, number] | null;
    tickCountAfterResume: number;
  };

  /**
   *  `setTimeout` handle used by the timer.
   *  @internal
   */
  #timeoutRef: any = null;

  /**
   *  `setImmediate` handle used by the timer.
   *  @internal
   */
  #immediateRef: any = null;

  /**
   *  Total number of timer runs, including resumed runs.
   *  @internal
   */
  #runCount = 0;

  /**
   *  Creates a new `TaskTimer`.
   *  @param options - Timer options, or a base interval in milliseconds. Tasks
   *  run on ticks rather than millisecond intervals, so this is the base
   *  resolution for all tasks; lower intervals require more CPU when running
   *  heavy tasks. Can be changed any time via the `interval` property.
   *
   *  @example
   *  const timer = new TaskTimer(1000);
   *  timer.on(TaskTimer.Event.TICK, () => {
   *    console.log('tick:', timer.tickCount, 'elapsed:', timer.time.elapsed);
   *  });
   *  timer.add(task => console.log(task.currentRuns)).start();
   */
  constructor(options?: ITaskTimerOptions | number) {
    super();
    this.#reset();
    this.#state.opts = {};
    const opts =
      typeof options === 'number' ? { interval: options } : options || ({} as ITaskTimerOptions);
    this.interval = opts.interval!;
    this.precision = opts.precision!;
    this.stopOnCompleted = opts.stopOnCompleted!;
  }

  // ---------------------------
  // PUBLIC PROPERTIES
  // ---------------------------

  /**
   *  Base timer interval in milliseconds. Tasks run on ticks rather than
   *  millisecond intervals, so this is the base resolution for all tasks. Can be
   *  updated any time.
   */
  get interval(): number {
    return this.#state.opts.interval!;
  }
  set interval(value: number) {
    this.#state.opts.interval = utils.getNumber(value, 20, DEFAULT_TIMER_OPTIONS.interval!);
  }

  /**
   *  Whether timer precision is enabled.
   *
   *  Because of the single-threaded, asynchronous nature of JavaScript, each
   *  execution takes a slice of CPU time, and the wait varies with load. This
   *  causes cumulative latency that gradually reduces accuracy. With precision
   *  enabled, `TaskTimer` mitigates this:
   *
   *  - The delay between ticks is auto-adjusted when it drifts due to task/CPU
   *    load or clock drift.
   *  - In Node, it uses `process.hrtime()` high-resolution time, which is not
   *    subject to clock drift.
   *  - If a tick is significantly late (e.g. a blocking task), it auto-recovers
   *    by running immediate ticks until the time/tick balance is restored.
   *
   *  Precision is best-effort and can still be off by a few milliseconds
   *  depending on the CPU and load.
   */
  get precision(): boolean {
    return this.#state.opts.precision!;
  }
  set precision(value: boolean) {
    this.#state.opts.precision = utils.getBool(value, DEFAULT_TIMER_OPTIONS.precision!);
  }

  /**
   *  Whether the timer automatically stops once all tasks are completed. For
   *  this to take effect, every added task must have `totalRuns` and/or
   *  `stopDate` configured.
   */
  get stopOnCompleted(): boolean {
    return this.#state.opts.stopOnCompleted!;
  }
  set stopOnCompleted(value: boolean) {
    this.#state.opts.stopOnCompleted = utils.getBool(value, DEFAULT_TIMER_OPTIONS.stopOnCompleted!);
  }

  /**
   *  Current state of the timer. See {@link TaskTimer.State}.
   */
  get state(): State {
    return this.#state.state;
  }

  /**
   *  Time information for the latest run of the timer: `started`, `stopped`
   *  (`0` while running) and `elapsed`, in milliseconds.
   */
  get time(): ITimeInfo {
    const { startTime, stopTime } = this.#state;
    const t: ITimeInfo = {
      started: startTime,
      stopped: stopTime,
      elapsed: 0
    };
    if (startTime) {
      const current = this.state !== State.STOPPED ? Date.now() : stopTime;
      t.elapsed = current - startTime;
    }
    return Object.freeze(t);
  }

  /**
   *  Current tick count for the latest run of the timer. Reset to `0` when the
   *  timer is stopped or reset.
   */
  get tickCount(): number {
    return this.#state.tickCount;
  }

  /**
   *  Current number of tasks. Tasks remain after the timer is stopped, but are
   *  removed when the timer is reset.
   */
  get taskCount(): number {
    return Object.keys(this.#state.tasks).length;
  }

  /**
   *  All tasks currently on the timer, in insertion order. Read every task ID
   *  via `timer.tasks.map(task => task.id)`. Use {@link TaskTimer.get} for a
   *  single lookup by ID.
   */
  get tasks(): TaskClass[] {
    return Object.values(this.#state.tasks);
  }

  /**
   *  Total number of all task executions (runs).
   */
  get taskRunCount(): number {
    return this.#state.taskRunCount;
  }

  /**
   *  Total number of timer runs, including resumed runs.
   */
  get runCount(): number {
    return this.#runCount;
  }

  // ---------------------------
  // PUBLIC METHODS
  // ---------------------------

  /**
   *  Gets the task with the given ID, or `null` if not found.
   *  @param id - ID of the task.
   */
  get(id: string): TaskClass | null {
    return this.#state.tasks[id] || null;
  }

  /**
   *  Adds one or more tasks to the timer.
   *  @param task - A task, task options or a callback — or an array mixing
   *  these to add multiple tasks at once.
   *  @returns The timer instance for chaining.
   *  @throws If a task callback is missing, or a task with the same ID exists.
   */
  add(
    task: TaskClass | ITaskOptions | TaskCallback | Array<TaskClass | ITaskOptions | TaskCallback>
  ): TaskTimer {
    if (!utils.isset(task)) {
      throw new Error('Either a task, task options or a callback is required.');
    }
    for (const item of utils.ensureArray(task)) this.#add(item);
    return this;
  }

  /**
   *  Removes a task from the timer.
   *  @param task - The task to remove, by ID or instance.
   *  @returns The timer instance for chaining.
   *  @throws If no task exists with the given ID.
   */
  remove(task: string | TaskClass): TaskTimer {
    const id: string = typeof task === 'string' ? task : task.id;
    const found = this.get(id);

    if (!id || !found) {
      throw new Error(`No tasks exist with ID: '${id}'.`);
    }

    // decrement completed count first if this is a completed task.
    // Stryker disable next-line all: guard conditions only diverge for remove-sequences (non-completed / zero-count) that leave no observable accounting difference in reachable states.
    if (found.completed && this.#state.completedTaskCount > 0) this.#state.completedTaskCount--;

    delete this.#state.tasks[id];
    this.#emit(Event.TASK_REMOVED, found);
    return this;
  }

  /**
   *  Starts the timer, putting it in the `RUNNING` state. If already running,
   *  this resets the start/stop time and tick count but keeps existing tasks.
   *  @returns The timer instance for chaining.
   */
  start(): TaskTimer {
    this.#stop();
    this.#state.state = State.RUNNING;
    this.#runCount++;
    this.#state.tickCount = 0;
    this.#state.taskRunCount = 0;
    this.#state.stopTime = 0;
    this.#markTime();
    this.#state.startTime = Date.now();
    this.#emit(Event.STARTED);
    this.#run();
    return this;
  }

  /**
   *  Pauses the timer, putting it in the `PAUSED` state and all tasks on hold.
   *  @returns The timer instance for chaining.
   */
  pause(): TaskTimer {
    if (this.state !== State.RUNNING) return this;
    this.#stop();
    this.#state.state = State.PAUSED;
    this.#emit(Event.PAUSED);
    return this;
  }

  /**
   *  Resumes a paused timer, putting it back in the `RUNNING` state. If the
   *  timer is idle, this starts it.
   *  @returns The timer instance for chaining.
   */
  resume(): TaskTimer {
    if (this.state === State.IDLE) {
      this.start();
      return this;
    }
    if (this.state !== State.PAUSED) return this;
    this.#runCount++;
    this.#markTime();
    this.#state.state = State.RUNNING;
    this.#emit(Event.RESUMED);
    this.#run();
    return this;
  }

  /**
   *  Stops the timer, putting it in the `STOPPED` state. Tasks and counters are
   *  retained until the timer is restarted or reset.
   *  @returns The timer instance for chaining.
   */
  stop(): TaskTimer {
    if (this.state !== State.RUNNING) return this;
    this.#stop();
    this.#state.stopTime = Date.now();
    this.#state.state = State.STOPPED;
    this.#emit(Event.STOPPED);
    return this;
  }

  /**
   *  Stops the timer and puts it in the `IDLE` state, resetting the ticks and
   *  removing all tasks silently (no `taskRemoved` events).
   *  @returns The timer instance for chaining.
   */
  reset(): TaskTimer {
    this.#reset();
    this.#emit(Event.RESET);
    return this;
  }

  // ---------------------------
  // INTERNAL METHODS
  // ---------------------------

  /**
   *  Called by a {@link Task} when it has completed all of its runs.
   *  @internal
   */
  _taskCompleted(task: TaskClass): void {
    this.#state.completedTaskCount++;
    this.#emit(Event.TASK_COMPLETED, task);
    if (this.#state.completedTaskCount === this.taskCount) {
      this.#emit(Event.COMPLETED);
      if (this.stopOnCompleted) this.stop();
    }
    if (task.removeOnCompleted) this.remove(task);
  }

  /**
   *  @internal
   */
  #emit(type: Event, data?: any): boolean {
    const event: ITaskTimerEvent = {
      name: type,
      source: this,
      data
    };
    return this.emit(type, event);
  }

  /**
   *  Adds a single task to the timer.
   *  @internal
   */
  #add(options: TaskClass | ITaskOptions | TaskCallback): TaskTimer {
    if (typeof options === 'function') {
      options = { callback: options };
    }
    if (utils.type(options) === 'object' && !options.id) {
      (options as ITaskOptions).id = this.#getUniqueTaskID();
    }
    if (this.get(options.id!)) {
      throw new Error(`A task with id '${options.id}' already exists.`);
    }
    const task = options instanceof TaskClass ? options : new TaskClass(options);
    task._setTimer(this);
    this.#state.tasks[task.id] = task;
    this.#emit(Event.TASK_ADDED, task);
    return this;
  }

  /**
   *  Clears any pending timeout/immediate.
   *  @internal
   */
  #stop(): void {
    this.#state.tickCountAfterResume = 0;
    // clearTimeout/clearImmediate are safe no-ops on a null handle.
    clearTimeout(this.#timeoutRef);
    this.#timeoutRef = null;
    utils.clearImmediate(this.#immediateRef);
    this.#immediateRef = null;
  }

  /**
   *  Resets all internal state, preserving the configured options.
   *  @internal
   */
  #reset(): void {
    this.#state = {
      opts: (this.#state || ({} as any)).opts,
      state: State.IDLE,
      tasks: {},
      tickCount: 0,
      taskRunCount: 0,
      startTime: 0,
      stopTime: 0,
      completedTaskCount: 0,
      resumeTime: 0,
      hrResumeTime: null,
      tickCountAfterResume: 0
    };
    this.#stop();
  }

  /**
   *  Handler executed on each tick.
   *  @internal
   */
  #tick(): void {
    this.#state.state = State.RUNNING;
    const { tasks } = this.#state;

    this.#state.tickCount++;
    this.#state.tickCountAfterResume++;
    this.#emit(Event.TICK);

    for (const id in tasks) {
      const task = tasks[id];
      if (!task.canRunOnTick) continue;
      // skipped if the task is disabled or already completed.
      task._run(() => {
        this.#state.taskRunCount++;
        this.#emit(Event.TASK, task);
      });
    }

    this.#run();
  }

  /**
   *  Marks the start/resume time, using high-resolution time in Node.
   *  @internal
   */
  // Stryker disable all: high-resolution time source; mutations alter timing precision, not run outcomes (the browser branch is also unreachable in the Node test environment).
  #markTime(): void {
    /* istanbul ignore if -- browser-only path, tested separately */
    if (utils.BROWSER) {
      this.#state.resumeTime = Date.now();
    } else {
      this.#state.hrResumeTime = process.hrtime();
    }
  }
  // Stryker restore all

  /**
   *  Gets the elapsed time (ms) since the last start/resume.
   *  @internal
   */
  // Stryker disable all: elapsed-time arithmetic; mutations alter timing precision, not run outcomes (the browser branch is also unreachable in the Node test environment).
  #getTimeDiff(): number {
    /* istanbul ignore if -- browser-only path, tested separately */
    if (utils.BROWSER) return Date.now() - this.#state.resumeTime;
    const hrDiff = process.hrtime(this.#state.hrResumeTime!);
    return Math.ceil(hrDiff[0] * 1000 + hrDiff[1] / 1e6);
  }
  // Stryker restore all

  /**
   *  Schedules the next tick, adjusting for drift when precision is enabled.
   *  @internal
   */
  #run(): void {
    if (this.state !== State.RUNNING) return;

    let { interval } = this;
    // Stryker disable all: precision drift-correction — mutations change only the dispatch timing/jitter, never the set of runs, so they are not deterministically killable; the catch-up path is exercised behaviorally by the precision tests.
    if (this.precision) {
      const diff = this.#getTimeDiff();
      // are we behind the expected tick count for the elapsed time?
      if (Math.floor(diff / interval) > this.#state.tickCountAfterResume) {
        // really late — run immediately to catch up.
        this.#immediateRef = utils.setImmediate(() => this.#tick());
        return;
      }
      // a bit off but still on time — shorten the next interval.
      interval = interval - (diff % interval);
    }
    // Stryker restore all

    this.#timeoutRef = setTimeout(() => this.#tick(), interval);
  }

  /**
   *  Generates a unique `task{n}` ID.
   *  @internal
   */
  #getUniqueTaskID(): string {
    let num = this.taskCount;
    let id = '';
    while (!id || this.get(id)) {
      num++;
      id = 'task' + num;
    }
    return id;
  }
}

// ---------------------------
// NAMESPACE (backward-compatible API surface)
// ---------------------------

/* istanbul ignore next -- namespace-merge init branch emitted by tsc */
namespace TaskTimer {
  /**
   *  The {@link Task} class.
   */
  export const Task = TaskClass;
  export type Task = TaskClass;

  /**
   *  The {@link State} enum of timer states.
   */
  export const State = enums.State;
  export type State = enums.State;

  /**
   *  The {@link Event} enum of timer event types.
   */
  export const Event = enums.Event;
  export type Event = enums.Event;
}

export { TaskTimer };
