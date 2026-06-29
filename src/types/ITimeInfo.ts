/**
 *  Time information for a timer or task.
 */
interface ITimeInfo {
  /**
   *  Start time, as a timestamp in milliseconds. `0` if not started yet.
   */
  started: number;
  /**
   *  Stop time, as a timestamp in milliseconds. `0` if still running.
   */
  stopped: number;
  /**
   *  Elapsed time, in milliseconds.
   */
  elapsed: number;
}

export type { ITimeInfo };
