import { ITaskBaseOptions, ITaskOptions, TaskCallback } from '.';
/**
 *  Represents the class that holds the configurations and the callback function
 *  required to run a task.
 */
declare class Task {
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
     *  Gets the unique name of the task.
     *  @type {string}
     */
    readonly name: string;
    /**
     *  Specifies whether this task is currently enabled. This essentially gives
     *  you a manual control over execution. The task will always bypass the
     *  callback while this is set to `false`.
     *  @type {boolean}
     */
    enabled: boolean;
    /**
     *  Gets or sets the number of ticks to allow before running the task for
     *  the first time.
     *  @type {number}
     */
    tickDelay: number;
    /**
     *  Gets or sets the tick interval that the task should be run on. The unit
     *  is "ticks" (not milliseconds). For instance, if the timer interval is
     *  `1000` milliseconds, and we add a task with `5` tick intervals. The task
     *  will run on every `5` <b>seconds</b>.
     *  @type {number}
     */
    tickInterval: number;
    /**
     *  Gets or sets the total number of times the task should be run. `0` or
     *  `null` means unlimited (until the timer has stopped).
     *  @type {number}
     */
    totalRuns: number;
    /**
     *  Gets the number of times, this task has been run.
     *  @type {number}
     */
    readonly currentRuns: number;
    /**
     *  Gets the callback function to be executed on each run.
     *  @type {TaskCallback}
     */
    readonly callback: TaskCallback;
    /**
     *  Specifies whether the task has completed all runs (executions). Note
     *  that if `totalRuns` and/or `stopDate` is not set, this will never return
     *  `true`; since the task has no execution limit set.
     *  @type {boolean}
     */
    readonly completed: boolean;
    /**
     *  Resets the current number of runs. This will keep the task running for
     *  the same amount of `tickIntervals` initially configured.
     *  @chainable
     *
     *  @param {ITaskBaseOptions} [options] If set, this will also re-configure the task.
     *
     *  @returns {Task}
     */
    reset(options?: ITaskBaseOptions): Task;
    /**
     *  Never return JSON From toJSON.
     *  It should return an object.
     *  @private
     */
    toJSON(): any;
    /**
     *  @private
     */
    private _run;
    /**
     *  @private
     */
    private _init;
}
export { Task };
