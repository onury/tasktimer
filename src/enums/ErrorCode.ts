/**
 *  Enumerates the machine-readable codes carried by a {@link TaskTimerError} on
 *  its `code` property, so failures can be branched on without string-matching.
 */
enum ErrorCode {
  /**
   *  {@link TaskTimer.add} was called without a task, task options or a callback.
   */
  NO_TASK_PROVIDED = 'NO_TASK_PROVIDED',
  /**
   *  A task was constructed (or reset) without a unique `id`.
   */
  TASK_ID_REQUIRED = 'TASK_ID_REQUIRED',
  /**
   *  A task was constructed without a `callback` function.
   */
  CALLBACK_REQUIRED = 'CALLBACK_REQUIRED',
  /**
   *  A task with the same `id` already exists on the timer.
   */
  DUPLICATE_TASK_ID = 'DUPLICATE_TASK_ID',
  /**
   *  {@link TaskTimer.remove} was given an `id` that no task matches.
   */
  NO_SUCH_TASK = 'NO_SUCH_TASK',
  /**
   *  A task's `startDate` is the same as or after its `stopDate`.
   */
  INVALID_DATE_RANGE = 'INVALID_DATE_RANGE',
  /**
   *  {@link Task.reset} was asked to change the task `id`, which is immutable.
   */
  CANNOT_CHANGE_ID = 'CANNOT_CHANGE_ID'
}

export { ErrorCode };
