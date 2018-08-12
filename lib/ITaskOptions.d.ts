import { TaskCallback } from '.';
/**
 *  Interface for task options.
 */
interface ITaskBaseOptions {
    /**
     *  Specifies whether this task is currently enabled. This essentially gives
     *  you a manual control over execution. The task will always bypass the
     *  callback while this is set to `false`.
     *  @type {boolean}
     */
    enabled?: boolean;
    /**
     *  Number of ticks to allow before running the task for the first time.
     *  Default: `0` (ticks)
     *  @type {number}
     */
    tickDelay?: number;
    /**
     *  Tick interval that the task should be run on. The unit is "ticks" (not
     *  milliseconds). For instance, if the timer interval is `1000`
     *  milliseconds, and we add a task with `5` tick intervals. The task will
     *  run on every `5` <b>seconds</b>. Default: `1` (tick)
     *  @type {number}
     */
    tickInterval?: number;
    /**
     *  Total number of times the task should be run. `0` or `null` means
     *  unlimited (until the timer has stopped). Default: `null`
     *  @type {number}
     */
    totalRuns?: number;
    /**
     *  The callback function (task) to be executed on each run. The task itself
     *  is passed to this callback, as the first argument.
     *  @type {TaskCallback}
     */
    callback: TaskCallback;
}
interface ITaskOptions extends ITaskBaseOptions {
    /**
     *  Unique name of the task. Required if creating a `Task` instance
     *  directly. Can be omitted if creating via `TaskTimer#add()` method. In
     *  this case, a unique name will be auto-generated in `task-{n}` format.
     *  @type {string}
     */
    name?: string;
}
export { ITaskBaseOptions, ITaskOptions };
