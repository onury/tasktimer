<p align="center">
    <a href="https://onury.io/tasktimer"><img width="300" height="300" src="https://raw.githubusercontent.com/onury/tasktimer/master/tasktimer-logo.png" alt="TaskTimer" /></a>
</p>
<p align="center">
    <a href="https://github.com/onury/tasktimer/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/onury/tasktimer/ci.yml?branch=master&style=flat" alt="Build Status" /></a>
    <a href="#"><img src="https://img.shields.io/badge/coverage-100%25-2BB150?style=flat" alt="Coverage" /></a>
    <a href="#"><img src="https://img.shields.io/badge/mutation-99%25-2BB150?style=flat" alt="Mutation Score" /></a>
    <a href="https://www.npmjs.com/package/tasktimer"><img src="https://img.shields.io/npm/v/tasktimer?style=flat&logo=npm&label=&color=C6234B" alt="npm" /></a>
    <a href="#"><img src="https://img.shields.io/badge/dependencies-0-2BB150?style=flat" alt="Zero Dependencies" /></a>
    <a href="https://gist.github.com/onury/d3f3d765d7db2e8b2d050d14315f2ac7"><img src="https://img.shields.io/badge/module-ESM-F7DF1E?style=flat" alt="ESM" /></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/built_with-TypeScript-3260C7?style=flat" alt="TypeScript" /></a>
    <a href="https://github.com/onury/tasktimer/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/tasktimer?style=flat&color=2BB150" alt="License" /></a>
    <a href="https://onury.io/tasktimer"><img src="https://img.shields.io/badge/docs-onury.io-c27cf4?style=flat" alt="Documentation" /></a>
</p>

> This module is **ESM** 🔆. Please [**read this**](https://gist.github.com/onury/d3f3d765d7db2e8b2d050d14315f2ac7).

An accurate timer utility for running periodic tasks on the given interval ticks or dates — with a single timer instance, zero runtime dependencies, and full TypeScript types.

## Why TaskTimer?

Because of the single-threaded, asynchronous [nature of JavaScript][how-timers-work], each execution takes a slice of CPU time, and the wait before the next one varies with the load. This creates a cumulative latency in naive timers that gradually drifts away from the intended schedule. TaskTimer corrects this drift on every tick, and it lets you run many tasks — each on its own interval, run limit, or date window — from one timer.

## Features

- **Precision** (on by default): the delay between ticks is auto-adjusted when it drifts due to task/CPU load or [clock drift][clock-drift]. In Node, it uses high-resolution [`process.hrtime()`][hrtime] (immune to clock drift) and auto-recovers via immediate ticks after a blocking task.
- Run or schedule **multiple tasks** on a single timer instance.
- **Sync or async** tasks — return a `Promise` or use the `done()` callback.
- **Limit runs** per task (`totalRuns`), add an initial **delay** (`tickDelay`), or bind a task to a **date window** (`startDate` / `stopDate`).
- Add, remove, reset, enable/disable, **pause and resume** tasks at any time — without recreating the timer.
- **Stateful**: auto-stop when all tasks complete (`stopOnCompleted`); free memory when a task finishes (`removeOnCompleted`).
- A familiar **`EventEmitter`** surface (`on` / `once` / `off` / `emit` …).
- **ESM-only**, **zero runtime dependencies**, written in **TypeScript**.

## Installation

```sh
npm i tasktimer
```

```js
import { TaskTimer } from 'tasktimer';
```

> [!NOTE]
> TaskTimer is **ESM-only** and Node-first. It runs in the browser too — bundle it with your app (Vite, esbuild, Rollup, webpack …); the high-resolution paths fall back gracefully when `process.hrtime` is unavailable.

## Usage

### Simplest example

```js
const timer = new TaskTimer(1000); // base interval: 1000 ms
timer.add(task => console.log(`Run #${task.currentRuns}`)).start();
```

### A plain timer (events only, no tasks)

```js
const timer = new TaskTimer(5000);
timer.on(TaskTimer.Event.TICK, () => console.log(`Tick #${timer.tickCount}`));
timer.start();
```

### Multiple tasks on a single timer

```js
const timer = new TaskTimer(1000); // 1s base resolution

timer.add([
    {
        id: 'task-1',
        tickInterval: 5,  // every 5 ticks → 5s
        totalRuns: 10,    // run 10 times only (0 = unlimited)
        callback(task) {
            console.log(`${task.id} ran ${task.currentRuns} times`);
        }
    },
    {
        id: 'task-2',
        tickDelay: 1,     // wait 1 tick before the first run
        tickInterval: 10, // every 10 ticks → 10s
        totalRuns: 2,
        callback(task) {
            console.log(`${task.id} ran ${task.currentRuns} times`);
        }
    }
]);

timer.on(TaskTimer.Event.TICK, () => {
    console.log(`tick ${timer.tickCount} · elapsed ${timer.time.elapsed} ms`);
});

timer.start();
```

### Async tasks

```js
// return a Promise
timer.add(task => fetch(url).then(handle));

// or call done() when finished
timer.add((task, done) => {
    fs.readFile(path, () => done());
});
```

> [!TIP]
> Set `immediate: true` on a task to wrap its callback in a `setImmediate()` — useful when the task synchronously blocks the event loop without doing I/O.

### Auto-stop when everything completes

```js
const timer = new TaskTimer({ interval: 1000, stopOnCompleted: true });

timer.add({ totalRuns: 3, callback: doWork });
timer.add({ totalRuns: 5, callback: doOtherWork });

timer.on(TaskTimer.Event.COMPLETED, () => console.log('all tasks done'));
timer.start();
```

### Pause and resume

```js
timer.start();
timer.pause();   // holds all tasks
timer.resume();  // continues where it left off
timer.stop();    // stops; tasks and counters are retained
timer.reset();   // back to idle; tasks removed silently
```

## How it works

- You create a timer with a **base interval** (e.g. `1000` ms) — the **tick** resolution shared by all tasks.
- You add tasks that run on **tick intervals** (e.g. every 5th tick), optionally with a run limit, an initial delay, or a start/stop date.
- Beyond task callbacks, you can listen for lifecycle **events** (`tick`, `task`, `completed`, …).
- Tasks can be added, removed, reset, enabled or disabled at any time; the timer can be paused and resumed — all without recreating it.

## API

### `new TaskTimer(options?)`

`options` is either an [`ITaskTimerOptions`](#itasktimeroptions) object or a `number` (the base interval in ms).

#### Timer properties

| Property | Type | Description |
| --- | --- | --- |
| `interval` | `number` | Base tick interval in ms (read/write). |
| `precision` | `boolean` | Whether drift auto-correction is enabled (read/write). |
| `stopOnCompleted` | `boolean` | Auto-stop once all tasks complete (read/write). |
| `state` | [`State`](#enumerations) | Current timer state (read-only). |
| `time` | [`ITimeInfo`](#itimeinfo) | `{ started, stopped, elapsed }` for the current run (read-only). |
| `tickCount` | `number` | Ticks elapsed in the current run (read-only). |
| `taskCount` | `number` | Number of tasks (read-only). |
| `taskRunCount` | `number` | Total task executions (read-only). |
| `runCount` | `number` | Total timer runs, including resumes (read-only). |

#### Timer methods

| Method | Returns | Description |
| --- | --- | --- |
| `add(task)` | `TaskTimer` | Add a task, options, callback, or an array of these. |
| `get(id)` | `Task \| null` | Get a task by id. |
| `remove(task)` | `TaskTimer` | Remove a task by id or instance. |
| `start()` | `TaskTimer` | Start (or restart) the timer. |
| `pause()` | `TaskTimer` | Pause the timer and all tasks. |
| `resume()` | `TaskTimer` | Resume a paused timer (starts it if idle). |
| `stop()` | `TaskTimer` | Stop the timer, retaining tasks and counters. |
| `reset()` | `TaskTimer` | Stop and reset to idle, removing all tasks silently. |

`TaskTimer` also exposes the `EventEmitter` surface: `on` / `addListener`, `once`, `off` / `removeListener`, `removeAllListeners`, `emit`, `listeners`, `listenerCount`, `eventNames`.

### `new Task(options)`

A `Task` is created implicitly via `timer.add(...)`, or explicitly with the constructor (an [`ITaskOptions`](#itaskoptions) with a required `id` and `callback`).

| Member | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique task id (read-only). |
| `enabled` | `boolean` | While `false`, the task bypasses its callback (read/write). |
| `tickDelay` | `number` | Ticks to wait before the first run (read/write). |
| `tickInterval` | `number` | Tick interval the task runs on (read/write). |
| `totalRuns` | `number` | Run limit; `0`/`null` = unlimited (read/write). |
| `immediate` | `boolean` | Wrap the callback in `setImmediate()` (read/write). |
| `removeOnCompleted` | `boolean` | Remove the task once completed (read/write). |
| `currentRuns` | `number` | Number of times run so far (read-only). |
| `completed` | `boolean` | Whether the task is completed (read-only). |
| `time` | [`ITimeInfo`](#itimeinfo) | The task's lifetime `{ started, stopped, elapsed }` (read-only). |
| `callback` | `TaskCallback` | The callback executed on each run (read-only). |
| `reset(options?)` | `Task` | Reset the run count, optionally re-configuring (id can't change). |

### Enumerations

`TaskTimer.State` — `IDLE` · `RUNNING` · `PAUSED` · `STOPPED`.

`TaskTimer.Event` — the events emitted by the timer:

| Event | Value | Emitted when |
| --- | --- | --- |
| `TICK` | `tick` | Each tick of the timer. |
| `STARTED` | `started` | The timer is started. |
| `RESUMED` | `resumed` | The timer is resumed. |
| `PAUSED` | `paused` | The timer is paused. |
| `STOPPED` | `stopped` | The timer is stopped. |
| `RESET` | `reset` | The timer is reset. |
| `TASK` | `task` | A task is executed. |
| `TASK_ADDED` | `taskAdded` | A task is added. |
| `TASK_REMOVED` | `taskRemoved` | A task is removed. |
| `TASK_COMPLETED` | `taskCompleted` | A task completes its runs / reaches its `stopDate`. |
| `TASK_ERROR` | `taskError` | A task throws or rejects. |
| `COMPLETED` | `completed` | Every task has completed. |

Event listeners receive an [`ITaskTimerEvent`](#itasktimerevent): `{ name, source, data?, error? }`.

### Types

###### `ITaskTimerOptions`
`{ interval?, precision?, stopOnCompleted? }`

###### `ITaskOptions`
`{ id?, enabled?, tickDelay?, tickInterval?, totalRuns?, startDate?, stopDate?, immediate?, removeOnCompleted?, callback }`

###### `ITimeInfo`
`{ started, stopped, elapsed }` — timestamps and elapsed time in ms.

###### `ITaskTimerEvent`
`{ name, source, data?, error? }`

###### `TaskCallback`
`(task: Task, done?: () => void) => void | Promise<unknown>`

Full reference: **[onury.io/tasktimer](https://onury.io/tasktimer)**.

## Changelog

See [CHANGELOG.md](CHANGELOG.md). Migrating from v3? See the [Unreleased](CHANGELOG.md) notes — v4 is **ESM-only**.

## Related

- [**AccessControl**](https://github.com/onury/accesscontrol) — Role and Attribute based Access Control for Node.js.
- [**Notation**](https://github.com/onury/notation) — Utility for notating and manipulating JS objects via dot-separated keys.

## License

© 2026, Onur Yıldırım. [**MIT**](LICENSE) License.

[how-timers-work]: https://johnresig.com/blog/how-javascript-timers-work/
[clock-drift]: https://en.wikipedia.org/wiki/Clock_drift
[hrtime]: https://nodejs.org/api/process.html#processhrtimetime
