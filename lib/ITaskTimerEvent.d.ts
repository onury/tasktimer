import { TaskTimer } from '.';
/**
 *  Interface for time information for the latest run of the timer.
 */
interface ITaskTimerEvent {
    /**
     *  Indicates the type of the event.
     *  @type {TaskTimer.EventType}
     */
    type: TaskTimer.EventType;
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
}
export { ITaskTimerEvent };
