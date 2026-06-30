# TaskTimer - Changelog

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org).

## 4.0.0 (2026-06-30)

A 2026 modernization of TaskTimer — ESM-only, zero-dependency, browser-safe, strongly typed — with some new sugar (`lead`, `task.data`, typed events, coded errors, `silentErrors`). The scheduling model is the same; the surface around it is cleaner and more honest. See the [migration notes](#migrating-from-3x) below.

### Added
- **`lead` task option** — run a task once immediately when the timer starts (the leading edge), in addition to its normal tick schedule, instead of waiting a full interval. A future `startDate` still defers it. Fixes [#41](https://github.com/onury/tasktimer/issues/41).
- **`task.data`** — attach arbitrary user data to a task, available in the callback and event listeners. `Task` is now generic (`Task<TData>`); type it via `timer.get<MyType>(id)`. Fixes the ergonomics behind [#43](https://github.com/onury/tasktimer/issues/43).
- **`timer.tasks`** — a getter returning all tasks in insertion order (`timer.tasks.map(t => t.id)` for every id). Fixes [#40](https://github.com/onury/tasktimer/issues/40).
- **`silentErrors` timer option** (default `true`) — when `false`, a task error with no `taskError` listener is surfaced (re-thrown on the next turn) instead of swallowed; the timer keeps running either way.
- **`TaskTimerError` + `ErrorCode`** — every error the library throws is now a `TaskTimerError` carrying a stable, machine-readable `code` (and a `cause`), so failures can be branched on without matching the message.

### Changed
- **Breaking — ESM-only** (`"type": "module"`); no CommonJS entry. `import { TaskTimer } from 'tasktimer'`. Still runs in the browser via native ESM / a bundler. See the [ESM notice](https://gist.github.com/onury/d3f3d765d7db2e8b2d050d14315f2ac7).
- **Breaking — minimum Node.js is now 22**.
- **Breaking — no more `TaskTimer` namespace.** `Event`, `State`, `Task` (and the new `TaskTimerError`, `ErrorCode`) are **named exports**: `import { TaskTimer, Event, State } from 'tasktimer'`. `TaskTimer.Event.TICK` → `Event.TICK`.
- **Breaking — event payload redesigned** to `{ name, timer, task, error }` (was `{ name, source, data }`). The related task is always `event.task` and the timer always `event.timer` — consistently, including on `taskError`. Listeners are now typed (you get an `ITaskTimerEvent`, not `any`).
- **Breaking — task option `immediate` renamed to `defer`** — it defers the callback to the next event-loop turn (via `setImmediate`); the old name read as the opposite.
- **Breaking — `timer.get(id)` returns `Task | undefined`** (was typed `Task`, returned `null`), mirroring `Map.get`.
- **Zero runtime dependencies** — `eventemitter3` replaced by a small built-in, typed `EventEmitter` (same `on`/`once`/`off`/`emit` surface).
- **Precision** now uses the monotonic `performance.now()` in every environment (Node and browser), so browser precision is no longer subject to wall-clock drift.
- Types compile against **TypeScript 6** and ship with declaration maps.

### Fixed
- **Task `time.elapsed` was negative while a task was running** (`stopped - started` with `stopped` still `0`); it now counts up live and freezes on completion, mirroring the timer's `time`. Fixes [#12](https://github.com/onury/tasktimer/issues/12).
- **Invalid option values** (`NaN`/`Infinity`) no longer slip through: a `NaN` interval no longer busy-loops and a `NaN`/`Infinity` `tickInterval`/`totalRuns` no longer makes a task silently never run — they fall back to their defaults.
- **A task that throws every run now honors `totalRuns`** instead of running forever — an errored run counts toward completion.
- **Calling `start()` from within a tick** no longer leaves a second tick chain running (double-speed ticks).
- The browser fallback for `setImmediate` defers correctly via `setTimeout(…, 0)`.

### Removed
- **Breaking** — the bundled UMD `<script>` build (`tasktimer.min.js`). Bundle TaskTimer with your app (Vite, esbuild, Rollup, webpack …) for browser use.

### Docs / Tooling
- New documentation site at [onury.io/tasktimer](https://onury.io/tasktimer); rewritten README and example-rich TSDoc across the public API.
- Build is a plain `tsc` emit to `lib/`. Adopted **Biome** (lint + format), **Vitest** (100% coverage, all four metrics), and **Stryker** mutation testing (100%); CI on **GitHub Actions** (Node 22, 24).

### Migrating from 3.x
- `import TaskTimer from 'tasktimer'` → `import { TaskTimer } from 'tasktimer'`; named exports for `Event`/`State`/`Task`.
- `TaskTimer.Event.TICK` → `Event.TICK`; `TaskTimer.State.RUNNING` → `State.RUNNING`.
- In event listeners: `event.data` → `event.task`, `event.source` → `event.timer` (use `event.task` for the task on `taskError`).
- Task option `immediate: true` → `defer: true`.
- `timer.get(id)` now returns `undefined` (not `null`) when absent.
- Errors thrown by the library are `TaskTimerError` (still `instanceof Error`); branch on `err.code` if you handle them.

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