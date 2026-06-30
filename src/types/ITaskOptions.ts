// own modules
import type { TaskCallback } from './TaskCallback.js';

/**
 *  Base options for a {@link Task}, shared by task creation and
 *  {@link Task.reset}.
 */
interface ITaskBaseOptions<TData = any> {
  /**
   *  Whether the task is currently enabled. This gives manual control over
   *  execution: while `false`, the task bypasses its callback. Default: `true`.
   */
  enabled?: boolean;
  /**
   *  Whether to run the task once immediately when the timer starts (the leading
   *  edge), in addition to its normal tick schedule — instead of waiting a full
   *  interval for the first tick. Ignored while a future `startDate` has not been
   *  reached. Applies on `start()` only. Default: `false`.
   */
  lead?: boolean;
  /**
   *  Arbitrary user data attached to the task, available as `task.data` in the
   *  callback and event listeners. Type it via the `TData` parameter, e.g.
   *  `timer.get<MyType>(id)`. Default: `undefined`.
   */
  data?: TData;
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
  totalRuns?: number | null;
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
   *  Whether to defer the callback to the next event-loop turn (via
   *  `setImmediate`) before executing, so it yields instead of running inline on
   *  the tick. Useful when the task synchronously blocks the event loop without
   *  doing I/O or using JS timers. Default: `false`.
   */
  defer?: boolean;
  /**
   *  Whether to remove the task (freeing memory) once it has completed its runs.
   *  For this to take effect, the task must have `totalRuns` and/or `stopDate`
   *  configured. Default: `false`.
   */
  removeOnCompleted?: boolean;
  /**
   *  Callback executed on each run of the task. See {@link TaskCallback}.
   */
  callback: TaskCallback<TData>;
}

/**
 *  Options for a {@link Task}.
 */
interface ITaskOptions<TData = any> extends ITaskBaseOptions<TData> {
  /**
   *  Unique ID of the task. Required when constructing a `Task` directly; may be
   *  omitted when adding via {@link TaskTimer.add}, in which case a unique
   *  `task{n}` ID is generated.
   */
  id?: string;
}

export type { ITaskBaseOptions, ITaskOptions };
