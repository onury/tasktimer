/* tslint:disable:no-empty */

import { ITaskBaseOptions, ITaskOptions, ITaskTimerEvent, TaskCallback, TaskTimer } from '.';
import { utils } from './utils';

/**
 *  @private
 */
const DEFAULT_TASK_OPTIONS: ITaskOptions = Object.freeze({
    enabled: true,
    tickDelay: 0,
    tickInterval: 1,
    totalRuns: null,
    immediate: false,
    removeOnCompleted: false,
    callback(): void {}
});

/**
 *  Represents the class that holds the configurations and the callback function
 *  required to run a task.
 */
class Task {

    /**
     *  @private
     */
    private _timer: TaskTimer;

    /**
     *  @private
     */
    private _: {
        currentRuns: number;
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
     *  @type {string}
     */
    get id(): string {
        return this._.id;
    }

    /**
     *  Specifies whether this task is currently enabled. This essentially gives
     *  you a manual control over execution. The task will always bypass the
     *  callback while this is set to `false`.
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
     *  @type {number}
     */
    get currentRuns(): number {
        return this._.currentRuns;
    }

    /**
     *  Gets the callback function to be executed on each run.
     *  @type {TaskCallback}
     */
    get callback(): TaskCallback {
        return this._.callback;
    }

    /**
     *  Gets or sets whether to remove the task (to free up memory) when task
     *  has completed its executions (runs). For this to take affect, the task
     *  should have `totalRuns` and/or `stopDate` configured.
     *  @type {boolean}
     */
    get removeOnCompleted(): boolean {
        return this._.removeOnCompleted;
    }
    set removeOnCompleted(value: boolean) {
        this._.removeOnCompleted = utils.getBool(value, false);
    }

    /**
     *  Specifies whether the task has completed all runs (executions). Note
     *  that if `totalRuns` and/or `stopDate` is not set, this will never return
     *  `true`; since the task has no execution limit set.
     *  @type {boolean}
     */
    get completed(): boolean {
        // TODO: check stopDate here
        const canRun: boolean = !this.totalRuns || this.currentRuns < this.totalRuns;
        return !canRun;
    }

    /**
     *  Resets the current number of runs. This will keep the task running for
     *  the same amount of `tickIntervals` initially configured.
     *  @chainable
     *
     *  @param {ITaskBaseOptions} [options] If set, this will also re-configure the task.
     *
     *  @returns {Task}
     */
    reset(options?: ITaskBaseOptions): Task {
        this._.currentRuns = 0;
        if (options) {
            if ((options as any).id) throw new Error('Cannot change ID of a task.');
            this._init(options);
        }
        return this;
    }

    /**
     *  Never return JSON From toJSON.
     *  It should return an object.
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
     *  Only used by `TaskTimer`.
     *  @private
     */
    // @ts-ignore: TS6133: declared but never read.
    private _setTimer(timer: TaskTimer): void {
        this._timer = timer;
    }

    /**
     *  @private
     */
    private _emit(type: TaskTimer.EventType, object: Task | Error): void {
        const event: ITaskTimerEvent = {
            type,
            source: this
        };
        if (object instanceof Task) {
            event.data = object;
        } else {
            event.error = object;
        }
        this._timer.emit(type, event);
    }

    /**
     *  @private
     */
    private _done(): void {
        this._.currentRuns += 1;
        if (this.completed) (this._timer as any)._taskCompleted(this);
    }

    /**
     *  @private
     */
    private _execCallback(timer: TaskTimer): void {
        try {
            const o = this.callback.apply(null, [this, this._done]);
            if (this.callback.length >= 2) {
                // handled by _done() (called within the task callback)
            } else if (utils.isPromise(o)) {
                o.then(() => {
                    this._done();
                })
                .catch((err: Error) => {
                    this._emit(TaskTimer.EventType.TASK_ERROR, err);
                });
            } else {
                this._done();
            }
        } catch (err) {
            this._emit(TaskTimer.EventType.TASK_ERROR, err);
        }
    }

    /**
     *  Only used by `TaskTimer`.
     *  @private
     */
    // @ts-ignore: TS6133: declared but never read.
    private _run(onRun: Function | any, timer: TaskTimer): void {
        if (!this.enabled || this.completed) return;

        if (this.immediate) {
            utils.setImmediate(() => this._execCallback(timer));
        } else {
            this._execCallback(timer);
        }

        onRun();
    }

    /**
     *  @private
     */
    private _init(options: ITaskOptions): void {
        if (!options || !options.id) {
            throw new Error('A unique task ID is required. Use TaskTimer#add() to create a task with auto-generated unique ID.');
        }

        if (typeof options.callback !== 'function') {
            throw new Error('A callback function is required for a task to be run.');
        }

        this._ = {
            currentRuns: 0,
            ...DEFAULT_TASK_OPTIONS,
            ...(options || {})
        };
    }
}

// ---------------------------
// EXPORT
// ---------------------------

export { Task };
