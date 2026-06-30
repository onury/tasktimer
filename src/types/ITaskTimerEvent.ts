// own modules

import type { Event } from '../enums/Event.js';
import type { Task } from '../Task.js';
import type { TaskTimer } from '../TaskTimer.js';

/**
 *  Event object passed to {@link TaskTimer} event listeners.
 */
interface ITaskTimerEvent {
  /**
   *  Name of the emitted event.
   */
  name: Event;
  /**
   *  The `TaskTimer` that fired the event.
   */
  timer: TaskTimer;
  /**
   *  The related `Task`, when the event concerns one (`task`, `taskAdded`,
   *  `taskRemoved`, `taskCompleted`, `taskError`). Absent for timer-level events
   *  such as `tick`, `started` or `completed`.
   */
  task?: Task;
  /**
   *  The error, set only for `taskError` events.
   */
  error?: Error;
}

export type { ITaskTimerEvent };
