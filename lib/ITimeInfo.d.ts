/**
 *  Stores time information for a timer or task.
 */
interface ITimeInfo {
    /**
     *  Indicates the start time of a timer or task.
     *  @type {number}
     */
    started: number;
    /**
     *  Indicates the stop time of a timer or task. (`0` if still running.)
     *  @type {number}
     */
    stopped: number;
    /**
     *  Indicates the the elapsed time of a timer or task, in milliseconds.
     *  @type {number}
     */
    elapsed: number;
}
export { ITimeInfo };
