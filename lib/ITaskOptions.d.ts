import { TaskCallback } from '.';
/**
 *  Interface for base task options.
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
     *  run on every `5` <b>seconds</b>. Default: `1` (minimum tick interval)
     *  @type {number}
     */
    tickInterval?: number;
    /**
     *  Total number of times the task should be run. `0` or `null` means
     *  unlimited until `stopDate` is reached or the timer has stopped. If
     *  `stopDate` is reached before `totalRuns` is fulfilled, task will still
     *  be considered completed and will not be executed any more. Default:
     *  `null`
     *  @type {number}
     */
    totalRuns?: number;
    /**
     *  Indicates the initial date and time to start executing the task on given
     *  interval. If omitted, task will be executed on defined tick interval,
     *  right after the timer starts.
     *  @type {number|Date}
     */
    startDate?: number | Date;
    /**
     *  Indicates the final date and time to execute the task. If `totalRuns` is
     *  set and it's reached before this date; task will be considered completed
     *  and will not be executed any more. If `stopDate` is omitted, task will
     *  be executed until `totalRuns` is fulfilled or timer is stopped.
     *  @type {number|Date}
     */
    stopDate?: number | Date;
    /**
     *  Whether to wrap callback in a `setImmediate()` call before executing.
     *  This can be useful if the task is not doing any I/O or using any JS
     *  timers but synchronously blocking the event loop. Default: `false`
     *  @type {boolean}
     */
    immediate?: boolean;
    /**
     *  Specifies whether to remove the task (to free up memory) when task has
     *  completed its executions (runs). For this to take affect, the task
     *  should have `totalRuns` and/or `stopDate` configured. Default: `false`
     *  @type {boolean}
     */
    removeOnCompleted?: boolean;
    /**
     *  The callback function of the task to be executed on each run. The task
     *  itself is passed to this callback, as the first argument. If you're
     *  defining an async task; either return a `Promise` or call `done()`
     *  function which is passed as the second argument to the callback.
     *  @type {TaskCallback}
     *
     *  @example <caption>Using <code>done()</code> function</caption>
     *  timer.add({
     *      callback(task, done) {
     *          fs.readFile(filePath, () => done());
     *      }
     *  });
     *  @example <caption>Returning a <code>Promise()</code></caption>
     *  timer.add({
     *      callback(task) {
     *          return readFileAsync().then(result => {
     *             // do some stuff...
     *          });
     *      }
     *  });
     */
    callback: TaskCallback;
}
/**
 *  Interface for task options.
 *  @extends ITaskBaseOptions
 */
interface ITaskOptions extends ITaskBaseOptions {
    /**
     *  Unique ID of the task. Required if creating a `Task` instance directly.
     *  Can be omitted if creating via `TaskTimer#add()` method. In this case, a
     *  unique ID will be auto-generated in `task-{n}` format.
     *  @type {string}
     */
    id?: string;
}
export { ITaskBaseOptions, ITaskOptions };
