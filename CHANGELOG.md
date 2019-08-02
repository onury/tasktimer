# `TaskTimer` Changelog

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org).

## 3.0.0 (2019-08-02)

### Changed
- **Breaking**: TypeScript type definitions now require TypeScript 3.
- Updated dependencies to their latest versions.

### Fixed
- An issue where `timer#time.elapsed` was a timestamp when idle but a timespan when running. Fixes [#11](https://github.com/onury/tasktimer/issues/11).


## 2.0.1 (2019-01-21)
This release includes various **breaking changes**. Please see the [API reference][docs]. Also note that this version is completely re-written in TypeScript.

### Changed
- **Breaking**: `TaskTimer` is no longer a default export. See _Usage_ section in readme.
- **Breaking**: `TaskTimer#addTask()` renamed to `TaskTimer#add()`. This no longer accepts a `string` argument. It should either be an options object, a `Task` instance or a callback function. It also accepts an array of these, to add multiple tasks at once.
- **Breaking**: `Task#name` renamed to `Task#id`.
- **Breaking**: The task ID is optional (auto-generated when omitted) when task is created via `#add()`. But `callback` is now required.
- **Breaking**: `TaskTimer#removeTask()` renamed to `TaskTimer#remove()`.
- **Breaking**: `TaskTimer#getTask()` renamed to `TaskTimer#get()`.
- **Breaking**: `TaskTimer.State` enumeration type is changed to `string`. (meaning enum values are also changed.)

### Added
- Timer option: `precision: boolean` indicating whether the timer should auto-adjust the delay between ticks if it's off due to task loads or clock drifts. See more info in readme. Default: `true`
- Timer option: `stopOnCompleted: boolean` indicating whether to automatically stop the timer when all tasks are completed. For this to take affect, all added tasks should have `totalRuns` and/or `stopDate` configured. Default: `false`
- Support for async tasks. Use `callback(task: Task, done: Function)` signature. Either return a promise or call `done()` argument within the callback; when the task is done.
- Task option: `enabled: boolean` indicating whether the task is currently enabled. This essentially gives you a manual control over execution. The task will always bypass the callback while this is set to `false`.
- Task option: `tickDelay: number` to specify a number of ticks to allow before running the task for the first time.
- Task option: `removeOnCompleted: number` indicating whether to remove the task (to free up memory) when task has completed its executions (runs). For this to take affect, the task should have `totalRuns` and/or `stopDate` configured. Default: `false`
- Event: `TaskTimer.Event.TASK_COMPLETED` (`"taskCompleted"`) Emitted when a task has completed all of its executions (runs) or reached its stopping date/time (if set). Note that this event will only be fired if the tasks has a `totalRuns` limit or a `stopDate` value set.
- Event: `TaskTimer.Event.COMPLETED` (`"completed"`) Emitted when *all* tasks have completed all of their executions (runs) or reached their stopping date/time (if set). Note that this event will only be fired if *each* task either have a `totalRuns` limit or a `stopDate` value set, or both.
- Event: `TaskTimer.Event.TASK_ERROR` (`"taskError"`) Catches and emits errors produced (if any) on a task execution.
- `Task#time` getter that returns an object `{ started, stopped, elapsed }` defining the life-time of a task.
- `TaskTimer#runCount: boolean` indicating the total number of timer runs, including resumed runs.
- `TaskTimer#taskRunCount: boolean` indicating the total number of all task executions (runs).
- TypeScript support.

### Fixed
- An issue where default task options would not be set in some cases. Fixes issue [#5](https://github.com/onury/tasktimer/issues/5).
- An issue where webpack would mock or polyfill Node globals unnecessarily. (v2.0.1 patch)

### Removed
- **Breaking**: `TaskTimer#resetTask()` is removed. Use `#get(name).reset()` to reset a task.
- Dropped bower. Please use npm to install.
- (Dev) Removed grunt in favour of npm scripts. Using jest instead of jasmine-core for tests.


## 1.0.0 (2016-08-16)

- Initial release.


[docs]:https://onury.io/tasktimer/api