import { ITaskBaseOptions, ITaskOptions, TaskCallback } from '.';

/**
 *  @private
 */
const DEFAULT_TASK_OPTIONS: ITaskOptions = Object.freeze({
    enabled: true,
    tickDelay: 0,
    tickInterval: 1,
    totalRuns: null,
    callback() {}
});

/**
 *  Represents the class that holds the configurations and the callback function
 *  required to run a task.
 */
class Task {

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
     *  Gets the unique name of the task.
     *  @type {string}
     */
    get name(): string {
        return this._.name;
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
        this._.enabled = Boolean(value);
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
        this._.tickDelay = value;
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
        this._.tickInterval = value;
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
        this._.totalRuns = value;
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
     *  Specifies whether the task has completed all runs (executions). Note
     *  that if `totalRuns` and/or `stopDate` is not set, this will never return
     *  `true`; since the task has no execution limit set.
     *  @type {boolean}
     */
    get completed(): boolean {
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
            if ((options as any).name) throw new Error('Cannot rename a task.');
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
        const obj = Object.assign({}, this._);
        delete obj.callback;
        return obj;
    }

    // ---------------------------
    // PRIVATE (INSTANCE) MEMBERS
    // ---------------------------

    /**
     *  @private
     */
    // @ts-ignore: TS6133: '_run' is declared but its value is never read. (private but used in TaskTimer)
    private _run(onRun: Function): void {
        if (!this.enabled || this.completed) return;
        this._.currentRuns += 1;
        this.callback.apply(null, [this]);
        onRun();
    }

    /**
     *  @private
     */
    private _init(options: ITaskOptions): void {
        if (!options || !options.name) {
            throw new Error('A unique task name is required. Use TaskTimer#add() to create a task with auto-generated name.');
        }

        if (typeof options.callback !== 'function') {
            throw new Error('A callback function is required for a task to be run.');
        }

        this._ = Object.assign({ currentRuns: 0 }, DEFAULT_TASK_OPTIONS, options);
    }
}

// ---------------------------
// EXPORT
// ---------------------------

export { Task };