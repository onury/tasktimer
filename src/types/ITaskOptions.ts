// own modules
import type { TaskCallback } from './TaskCallback.js';

/**
 *  Base options for a {@link Task}, shared by task creation and
 *  {@link Task.reset}.
 */
interface ITaskBaseOptions {
  /**
   *  Whether the task is currently enabled. This gives manual control over
   *  execution: while `false`, the task bypasses its callback. Default: `true`.
   */
  enabled?: boolean;
  /**
   *  Number of ticks to wait before running the task for the first time.
   *  Default: `0`.
   */
  tickDelay?: number;
  /**
   *  Tick interval the task runs on. The unit is ticks, not milliseconds: with a
   *  timer interval of `1000` ms, a `tickInterval` of `5` runs the task every 5
   *  seconds. Default: `1`.
   */
  tickInterval?: number;
  /**
   *  Total number of times the task should run. `0` or `null` means unlimited,
   *  until `stopDate` is reached or the timer stops. Default: `null`.
   */
  totalRuns?: number;
  /**
   *  Date/time (or timestamp) to start executing the task. If omitted, the task
   *  runs on its tick interval right after the timer starts.
   */
  startDate?: number | Date;
  /**
   *  Date/time (or timestamp) to stop executing the task. If `totalRuns` is
   *  reached first, the task is considered completed regardless. If omitted, the
   *  task runs until `totalRuns` is fulfilled or the timer stops.
   */
  stopDate?: number | Date;
  /**
   *  Whether to wrap the callback in a `setImmediate()` before executing. Useful
   *  when the task synchronously blocks the event loop without doing I/O or
   *  using JS timers. Default: `false`.
   */
  immediate?: boolean;
  /**
   *  Whether to remove the task (freeing memory) once it has completed its runs.
   *  For this to take effect, the task must have `totalRuns` and/or `stopDate`
   *  configured. Default: `false`.
   */
  removeOnCompleted?: boolean;
  /**
   *  Callback executed on each run of the task. See {@link TaskCallback}.
   */
  callback: TaskCallback;
}

/**
 *  Options for a {@link Task}.
 */
interface ITaskOptions extends ITaskBaseOptions {
  /**
   *  Unique ID of the task. Required when constructing a `Task` directly; may be
   *  omitted when adding via {@link TaskTimer.add}, in which case a unique
   *  `task{n}` ID is generated.
   */
  id?: string;
}

export type { ITaskBaseOptions, ITaskOptions };
