/**
 *  Interface for time information for the latest run of the timer.
 */
interface ITimeInfo {
    /**
     *  Indicates the start time of the timer.
     *  @type {number}
     */
    started: number;
    /**
     *  Indicates the stop time of the timer. (`0` if still running.)
     *  @type {number}
     */
    stopped: number;
    /**
     *  Indicates the the elapsed time of the timer.
     *  @type {number}
     */
    elapsed: number;
}

export { ITimeInfo };
