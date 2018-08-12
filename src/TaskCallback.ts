import { Task } from '.';

/**
 *  Defines a callback function for a `Task`.
 */
export type TaskCallback = (task: Task, done?: Function) => void;