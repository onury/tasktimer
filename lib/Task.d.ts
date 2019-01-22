import { ITaskBaseOptions, ITaskOptions, ITimeInfo, TaskCallback } from '.';
/**
 *  Represents the class that holds the configurations and the callback function
 *  required to run a task.
 *  @class
 */
declare class Task {
    /**
     *  @private
     */
    private _timer;
    /**
     *  @private
     */
    private _markedCompleted;
    /**
     *  @private
     */
    private _;
    /**
     *  Initializes a new instance of `Task` class.
     *  @constructor
     *  @param {ITaskOptions} options Task options.
     */
    constructor(options: ITaskOptions);
    /**
     *  Gets the unique ID of the task.
     *  @name Task#id
     *  @type {string}
     *  @readonly
     */
    readonly id: string;
    /**
     *  Specifies whether this task is currently enabled. This essentially gives
     *  you a manual control over execution. The task will always bypass the
     *  callback while this is set to `false`.
     *  @name Task#enabled
     *  @type {boolean}
     */
    enabled: boolean;
    /**
     *  Gets or sets the number of ticks to allow before running the task for
     *  the first time.
     *  @name Task#tickDelay
     *  @type {number}
     */
    tickDelay: number;
    /**
     *  Gets or sets the tick interval that the task should be run on. The unit
     *  is "ticks" (not milliseconds). For instance, if the timer interval is
     *  `1000` milliseconds, and we add a task with `5` tick intervals. The task
     *  will run on every `5` <b>seconds</b>.
     *  @name Task#tickInterval
     *  @type {number}
     */
    tickInterval: number;
    /**
     *  Gets or sets the total number of times the task should be run. `0` or
     *  `null` means unlimited (until the timer has stopped).
     *  @name Task#totalRuns
     *  @type {number}
     */
    totalRuns: number;
    /**
     *  Specifies whether to wrap callback in a `setImmediate()` call before
     *  executing. This can be useful if the task is not doing any I/O or using
     *  any JS timers but synchronously blocking the event loop.
     *  @name Task#immediate
     *  @type {boolean}
     */
    immediate: boolean;
    /**
     *  Gets the number of times, this task has been run.
     *  @name Task#currentRuns
     *  @type {number}
     *  @readonly
     */
    readonly currentRuns: number;
    /**
     *  Gets time information for the lifetime of a task.
     *  `#time.started` indicates the first execution time of a task.
     *  `#time.stopped` indicates the last execution time of a task. (`0` if still running.)
     *  `#time.elapsed` indicates the total lifetime of a task.
     *  @name Task#time
     *  @type {ITimeInfo}
     *  @readonly
     */
    readonly time: ITimeInfo;
    /**
     *  Gets the callback function to be executed on each run.
     *  @name Task#callback
     *  @type {TaskCallback}
     *  @readonly
     */
    readonly callback: TaskCallback;
    /**
     *  Gets or sets whether to remove the task (to free up memory) when task
     *  has completed its executions (runs). For this to take affect, the task
     *  should have `totalRuns` and/or `stopDate` configured.
     *  @name Task#removeOnCompleted
     *  @type {boolean}
     */
    removeOnCompleted: boolean;
    /**
     *  Specifies whether the task has completed all runs (executions) or
     *  `stopDate` is reached. Note that if both `totalRuns` and `stopDate` are
     *  omitted, this will never return `true`; since the task has no execution
     *  limit set.
     *  @name Task#completed
     *  @type {boolean}
     *  @readonly
     */
    readonly completed: boolean;
    /**
     *  Specifies whether the task can run on the current tick of the timer.
     *  @private
     *  @name Task#canRunOnTick
     *  @type {boolean}
     *  @readonly
     */
    readonly canRunOnTick: boolean;
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
    reset(options?: ITaskBaseOptions): Task;
    /**
     *  Serialization to JSON.
     *
     *  Never return string from `toJSON()`. It should return an object.
     *  @private
     */
    toJSON(): any;
    /**
     *  Set reference to timer itself.
     *  Only called by `TaskTimer`.
     *  @private
     */
    private _setTimer;
    /**
     *  @private
     */
    private _emit;
    /**
     *  `TaskTimer` should be informed if this task is completed. But execution
     *  should be finished. So we do this within the `done()` function.
     *  @private
     */
    private _done;
    /**
     *  @private
     */
    private _execCallback;
    /**
     *  Only used by `TaskTimer`.
     *  @private
     */
    private _run;
    /**
     *  @private
     */
    private _init;
}
export { Task };
