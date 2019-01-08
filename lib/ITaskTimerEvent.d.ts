import { TaskTimer } from '.';
/**
 *  Interface for time information for the latest run of the timer.
 */
interface ITaskTimerEvent {
    /**
     *  Indicates the name of the event.
     *  @type {TaskTimer.Event}
     */
    name: TaskTimer.Event;
    /**
     *  Indicates the source object fired this event.
     *  @type {any}
     */
    source: any;
    /**
     *  Any object passed to the event emitter. This is generally a `Task`
     *  instance if set.
     *  @type {any}
     */
    data?: any;
    /**
     *  Any `Error` instance passed to the event emitter. This is generally a
     *  task error instance if set.
     *  @type {any}
     */
    error?: Error;
}
export { ITaskTimerEvent };
