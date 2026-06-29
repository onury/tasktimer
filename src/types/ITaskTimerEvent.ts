// own modules
import type { Event } from '../enums/Event.js';

/**
 *  Event object passed to {@link TaskTimer} event listeners.
 */
interface ITaskTimerEvent {
  /**
   *  Name of the emitted event.
   */
  name: Event;
  /**
   *  Object that fired the event — a `TaskTimer` or a `Task` instance.
   */
  source: any;
  /**
   *  Payload passed to the listeners, generally the related `Task` instance.
   */
  data?: any;
  /**
   *  Error passed to the listeners, set for `taskError` events.
   */
  error?: Error;
}

export type { ITaskTimerEvent };
