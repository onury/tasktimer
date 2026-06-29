// own modules
import type { Task } from '../Task.js';

/**
 *  Callback executed on each run of a task. The task itself is passed as the
 *  first argument. For an async task, either return a `Promise` or call the
 *  `done` function passed as the second argument when the work is finished.
 *
 *  @param task - The task being executed.
 *  @param done - Marks an async task as finished. Omit for sync tasks or when
 *  returning a `Promise`.
 *
 *  @example
 *  // sync
 *  timer.add(task => console.log(task.currentRuns));
 *  @example
 *  // async via done()
 *  timer.add((task, done) => fs.readFile(path, () => done()));
 *  @example
 *  // async via Promise
 *  timer.add(task => readFileAsync(path).then(process));
 */
type TaskCallback = (task: Task, done?: () => void) => void | Promise<unknown>;

export type { TaskCallback };
