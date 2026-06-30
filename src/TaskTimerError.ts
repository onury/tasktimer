// own modules
import type { ErrorCode } from './enums/ErrorCode.js';

/**
 *  Options for constructing a {@link TaskTimerError}. Extends the standard
 *  `ErrorOptions` (so `cause` is supported) with the required `code`.
 */
interface ITaskTimerErrorOptions extends ErrorOptions {
  /**
   *  Machine-readable error code. See {@link ErrorCode}.
   */
  code: ErrorCode;
}

/**
 *  Error thrown by {@link TaskTimer} and {@link Task}. Carries a stable,
 *  machine-readable {@link ErrorCode} on `code` so failures can be branched on
 *  without matching the message, and preserves any underlying error on `cause`.
 *
 *  @example
 *  try {
 *    timer.add();
 *  } catch (err) {
 *    if (err instanceof TaskTimerError && err.code === ErrorCode.NO_TASK_PROVIDED) {
 *      // …
 *    }
 *  }
 */
class TaskTimerError extends Error {
  /**
   *  Machine-readable error code. See {@link ErrorCode}.
   */
  readonly code: ErrorCode;

  /**
   *  Creates a new `TaskTimerError`.
   *  @param message - Human-readable error message.
   *  @param options - The required `code`, plus an optional `cause`.
   */
  constructor(message: string, options: ITaskTimerErrorOptions) {
    super(message, options);
    this.name = 'TaskTimerError';
    this.code = options.code;
  }
}

export type { ITaskTimerErrorOptions };
export { TaskTimerError };
