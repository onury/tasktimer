/**
 *  Enumerates the event types emitted by a {@link TaskTimer}.
 */
enum Event {
  /**
   *  Emitted on each tick (interval) of the timer.
   */
  TICK = 'tick',
  /**
   *  Emitted when the timer enters the `RUNNING` state by being started.
   */
  STARTED = 'started',
  /**
   *  Emitted when the timer enters the `RUNNING` state by being resumed.
   */
  RESUMED = 'resumed',
  /**
   *  Emitted when the timer is paused.
   */
  PAUSED = 'paused',
  /**
   *  Emitted when the timer is stopped.
   */
  STOPPED = 'stopped',
  /**
   *  Emitted when the timer is reset.
   */
  RESET = 'reset',
  /**
   *  Emitted when a task is executed.
   */
  TASK = 'task',
  /**
   *  Emitted when a task is added to the timer.
   */
  TASK_ADDED = 'taskAdded',
  /**
   *  Emitted when a task is removed from the timer. Not emitted by
   *  {@link TaskTimer.reset}, which removes all tasks silently.
   */
  TASK_REMOVED = 'taskRemoved',
  /**
   *  Emitted when a task completes all of its runs or reaches its `stopDate`.
   *  Only fired for tasks that have a `totalRuns` limit and/or a `stopDate`.
   */
  TASK_COMPLETED = 'taskCompleted',
  /**
   *  Emitted when a task throws (or rejects) during execution.
   */
  TASK_ERROR = 'taskError',
  /**
   *  Emitted when every task has completed all of its runs or reached its
   *  `stopDate`. Only fired when each task has a `totalRuns` limit and/or a
   *  `stopDate`.
   */
  COMPLETED = 'completed'
}

export { Event };
