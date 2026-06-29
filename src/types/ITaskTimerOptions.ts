/**
 *  Options for constructing a {@link TaskTimer}.
 */
interface ITaskTimerOptions {
  /**
   *  Base timer interval in milliseconds. Tasks run on tick intervals rather
   *  than millisecond intervals, so this is the base resolution for all tasks.
   *  Lower intervals require more CPU when running heavy tasks. Can be changed
   *  any time via the `interval` property. Default: `1000`.
   */
  interval?: number;
  /**
   *  Whether the timer should auto-adjust the delay between ticks when it drifts
   *  due to task/CPU load or clock drift. Precision is best-effort and can still
   *  be off by a few milliseconds depending on the CPU. Default: `true`.
   */
  precision?: boolean;
  /**
   *  Whether to automatically stop the timer once all tasks are completed. For
   *  this to take effect, every added task must have `totalRuns` and/or
   *  `stopDate` configured. Default: `false`.
   */
  stopOnCompleted?: boolean;
}

export type { ITaskTimerOptions };
