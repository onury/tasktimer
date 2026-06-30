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
  /**
   *  Whether a task error with no `taskError` listener is swallowed silently.
   *  When `false`, such an unhandled error is surfaced (re-thrown on the next
   *  event-loop turn as a {@link TaskTimerError} with the original on `cause`)
   *  instead of vanishing — the timer keeps running either way. A `taskError`
   *  listener always takes precedence; a handled error is never surfaced.
   *  Default: `true`.
   */
  silentErrors?: boolean;
}

export type { ITaskTimerOptions };
