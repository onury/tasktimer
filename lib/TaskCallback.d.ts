import { Task } from '.';
/**
 *  Defines a callback function for a task to be executed on each run. The task
 *  itself is passed to this callback, as the first argument. If you're
 *  defining an async task; either return a `Promise` or call `done()`
 *  function which is passed as the second argument to the callback.
 */
export declare type TaskCallback = (task: Task, done?: Function) => void;
