/**
 *  Interface for `TaskTimer` options.
 */
interface ITaskTimerOptions {
    /**
     *  Timer interval in milliseconds. Since the tasks run on ticks instead of
     *  millisecond intervals; this value operates as the base resolution for
     *  all tasks. If you are running heavy tasks, lower interval requires
     *  higher CPU power. This value can be updated any time by setting the
     *  `interval` property on the `TaskTimer` instance. Default: `1000`
     *  (milliseconds)
     *  @type {number}
     */
    interval?: number;
    /**
     *  Specifies whether to automatically stop the timer when all tasks are
     *  completed. For this to take affect, all added tasks should have
     *  `totalRuns` and/or `stopDate` configured. Default: `false`
     *  @type {boolean}
     */
    stopOnCompleted?: boolean;
}

export { ITaskTimerOptions };