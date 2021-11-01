/* tslint:disable:no-empty */

import { ITaskBaseOptions, ITaskOptions, ITaskTimerEvent, ITimeInfo, TaskCallback, TaskTimer } from '.';
import { utils } from './utils';

/**
 *  @private
 */
const DEFAULT_TASK_OPTIONS: ITaskOptions = Object.freeze({
    enabled: true,
    tickDelay: 0,
    tickInterval: 1,
    totalRuns: null,
    startDate: null,
    stopDate: null,
    immediate: false,
    removeOnCompleted: false,
    callback: null
});

/**
 *  Represents the class that holds the configurations and the callback function
 *  required to run a task.
 *  @class
 */
class Task {

    /**
     *  @private
     */
    private _timer: TaskTimer;

    /**
     *  @private
     */
    private _markedCompleted: boolean;

    /**
     *  @private
     */
    private _: {
        currentRuns: number;
        timeOnFirstRun?: number;
        timeOnLastRun?: number;
    } & ITaskOptions;

    /**
     *  Initializes a new instance of `Task` class.
     *  @constructor
     *  @param {ITaskOptions} options Task options.
     */
    constructor(options: ITaskOptions) {
        this._init(options);
    }

    // ---------------------------
    // PUBLIC (INSTANCE) MEMBERS
    // ---------------------------

    /**
     *  Gets the unique ID of the task.
     *  @name Task#id
     *  @type {string}
     *  @readonly
     */
    get id(): string {
        return this._.id;
    }

    /**
     *  Specifies whether this task is currently enabled. This essentially gives
     *  you a manual control over execution. The task will always bypass the
     *  callback while this is set to `false`.
     *  @name Task#enabled
     *  @type {boolean}
     */
    get enabled(): boolean {
        return this._.enabled;
    }
    set enabled(value: boolean) {
        this._.enabled = utils.getBool(value, true);
    }

    /**
     *  Gets or sets the number of ticks to allow before running the task for
     *  the first time.
     *  @name Task#tickDelay
     *  @type {number}
     */
    get tickDelay(): number {
        return this._.tickDelay;
    }
    set tickDelay(value: number) {
        this._.tickDelay = utils.getNumber(value, 0, DEFAULT_TASK_OPTIONS.tickDelay);
    }

    /**
     *  Gets or sets the tick interval that the task should be run on. The unit
     *  is "ticks" (not milliseconds). For instance, if the timer interval is
     *  `1000` milliseconds, and we add a task with `5` tick intervals. The task
     *  will run on every `5` <b>seconds</b>.
     *  @name Task#tickInterval
     *  @type {number}
     */
    get tickInterval(): number {
        return this._.tickInterval;
    }
    set tickInterval(value: number) {
        this._.tickInterval = utils.getNumber(value, 1, DEFAULT_TASK_OPTIONS.tickInterval);
    }

    /**
     *  Gets or sets the total number of times the task should be run. `0` or
     *  `null` means unlimited (until the timer has stopped).
     *  @name Task#totalRuns
     *  @type {number}
     */
    get totalRuns(): number {
        return this._.totalRuns;
    }
    set totalRuns(value: number) {
        this._.totalRuns = utils.getNumber(value, 0, DEFAULT_TASK_OPTIONS.totalRuns);
    }

    /**
     *  Specifies whether to wrap callback in a `setImmediate()` call before
     *  executing. This can be useful if the task is not doing any I/O or using
     *  any JS timers but synchronously blocking the event loop.
     *  @name Task#immediate
     *  @type {boolean}
     */
    get immediate(): boolean {
        return this._.immediate;
    }
    set immediate(value: boolean) {
        this._.immediate = utils.getBool(value, false);
    }

    /**
     *  Gets the number of times, this task has been run.
     *  @name Task#currentRuns
     *  @type {number}
     *  @readonly
     */
    get currentRuns(): number {
        return this._.currentRuns;
    }

    /**
     *  Gets time information for the lifetime of a task.
     *  `#time.started` indicates the first execution time of a task.
     *  `#time.stopped` indicates the last execution time of a task. (`0` if still running.)
     *  `#time.elapsed` indicates the total lifetime of a task.
     *  @name Task#time
     *  @type {ITimeInfo}
     *  @readonly
     */
    get time(): ITimeInfo {
        const started = this._.timeOnFirstRun || 0;
        const stopped = this._.timeOnLastRun || 0;
        return Object.freeze({
            started,
            stopped,
            elapsed: stopped - started
        });
    }

    /**
     *  Gets the callback function to be executed on each run.
     *  @name Task#callback
     *  @type {TaskCallback}
     *  @readonly
     */
    get callback(): TaskCallback {
        return this._.callback;
    }

    /**
     *  Gets or sets whether to remove the task (to free up memory) when task
     *  has completed its executions (runs). For this to take affect, the task
     *  should have `totalRuns` and/or `stopDate` configured.
     *  @name Task#removeOnCompleted
     *  @type {boolean}
     */
    get removeOnCompleted(): boolean {
        return this._.removeOnCompleted;
    }
    set removeOnCompleted(value: boolean) {
        this._.removeOnCompleted = utils.getBool(value, false);
    }

    /**
     *  Specifies whether the task has completed all runs (executions) or
     *  `stopDate` is reached. Note that if both `totalRuns` and `stopDate` are
     *  omitted, this will never return `true`; since the task has no execution
     *  limit set.
     *  @name Task#completed
     *  @type {boolean}
     *  @readonly
     */
    get completed(): boolean {
        // return faster if already completed
        if (this._markedCompleted) return true;
        return Boolean((this.totalRuns && this.currentRuns >= this.totalRuns)
            || (this._.stopDate && Date.now() >= this._.stopDate));
    }

    /**
     *  Specifies whether the task can run on the current tick of the timer.
     *  @private
     *  @name Task#canRunOnTick
     *  @type {boolean}
     *  @readonly
     */
    get canRunOnTick(): boolean {
        if (this._markedCompleted) return false;
        const tickCount = this._.startDate
            ? Math.ceil((Date.now() - Number(this._.startDate)) / this._timer.interval)
            : this._timer.tickCount;
        const timeToRun = !this._.startDate || Date.now() >= this._.startDate;
        const onInterval = tickCount > this.tickDelay && (tickCount - this.tickDelay) % this.tickInterval === 0;
        return Boolean(timeToRun && onInterval);
    }

    /**
     *  Resets the current number of runs. This will keep the task running for
     *  the same amount of `tickIntervals` initially configured.
     *  @memberof Task
     *  @chainable
     *
     *  @param {ITaskBaseOptions} [options] If set, this will also re-configure the task.
     *
     *  @returns {Task}
     */
    reset(options?: ITaskBaseOptions): Task {
        this._.currentRuns = 0;
        if (options) {
            const id = (options as ITaskOptions).id;
            if (id && id !== this.id) throw new Error('Cannot change ID of a task.');
            (options as ITaskOptions).id = this.id;
            this._init(options);
        }
        return this;
    }

    /**
     *  Serialization to JSON.
     *
     *  Never return string from `toJSON()`. It should return an object.
     *  @private
     */
    toJSON(): any {
        const obj = {
            ...this._
        };
        delete obj.callback;
        return obj;
    }

    // ---------------------------
    // PRIVATE (INSTANCE) MEMBERS
    // ---------------------------

    /**
     *  Set reference to timer itself.
     *  Only called by `TaskTimer`.
     *  @private
     */
    // @ts-ignore: TS6133: declared but never read.
    private _setTimer(timer: TaskTimer): void {
        this._timer = timer;
    }

    /**
     *  @private
     */
    private _emit(name: TaskTimer.Event, object: Task | Error): void {
        const event: ITaskTimerEvent = {
            name,
            source: this
        };
        /* istanbul ignore else */
        if (object instanceof Error) {
            event.error = object;
        } else {
            event.data = object;
        }
        this._timer.emit(name, event);
    }

    /**
     *  `TaskTimer` should be informed if this task is completed. But execution
     *  should be finished. So we do this within the `done()` function.
     *  @private
     */
    private _done(): void {
        if (this.completed) {
            this._markedCompleted = true;
            this._.timeOnLastRun = Date.now();
            (this._timer as any)._taskCompleted(this);
        }
    }

    /**
     *  @private
     */
    private _execCallback(): void {
        try {
            const o = this.callback.apply(this, [this, () => this._done()]);
            if (this.callback.length >= 2) {
                // handled by done() (called within the task callback by the user)
            } else if (utils.isPromise(o)) {
                o.then(() => {
                    this._done();
                })
                .catch((err: Error) => {
                    this._emit(TaskTimer.Event.TASK_ERROR, err);
                });
            } else {
                this._done();
            }
        } catch (err) {
            this._emit(TaskTimer.Event.TASK_ERROR, err);
        }
    }

    /**
     *  Only used by `TaskTimer`.
     *  @private
     */
    // @ts-ignore: TS6133: declared but never read.
    private _run(onRun: Function | any): void {
        if (!this.enabled || this._markedCompleted) return;
        if (this.currentRuns === 0) this._.timeOnFirstRun = Date.now();
        // current runs should be set before execution or it might flow if some
        // async runs finishes faster and some other slower.
        this._.currentRuns++;
        onRun();

        if (this.immediate) {
            utils.setImmediate(() => this._execCallback());
        } else {
            this._execCallback();
        }
    }

    /**
     *  @private
     */
    private _init(options: ITaskOptions): void {
        if (!options || !options.id) {
            throw new Error('A unique task ID is required.');
        }
        
        if(typeof options.id !== 'string') {
            throw new Error('Task ID must be a string');
        }

        if (typeof options.callback !== 'function') {
            throw new Error('A callback function is required for a task to run.');
        }

        const { startDate, stopDate } = options;
        if (startDate && stopDate && startDate >= stopDate) {
            throw new Error('Task start date cannot be the same or after stop date.');
        }

        this._markedCompleted = false;

        this._ = {
            currentRuns: 0,
            ...DEFAULT_TASK_OPTIONS
        };

        this._.id = options.id;
        this._.callback = options.callback;
        this._.startDate = options.startDate || null;
        this._.stopDate = options.stopDate || null;

        // using setters for validation & default values
        this.enabled = options.enabled;
        this.tickDelay = options.tickDelay;
        this.tickInterval = options.tickInterval;
        this.totalRuns = options.totalRuns;
        this.immediate = options.immediate;
        this.removeOnCompleted = options.removeOnCompleted;
    }
}

// ---------------------------
// EXPORT
// ---------------------------

export { Task };
