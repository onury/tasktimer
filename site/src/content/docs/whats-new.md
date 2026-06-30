---
title: What's New
description: Highlights of TaskTimer v4 and how to migrate from v3.
---

TaskTimer **v4** is a 2026 modernization. The scheduling model is unchanged — one timer, many tasks, on tick intervals — but the surface around it is cleaner, more honest, and strongly typed, with some new sugar along the way: `lead`, `task.data`, typed events, coded errors, and `silentErrors`.

## The Modernization

- **ESM-only, zero dependencies.** TaskTimer is now a pure ES module (`"type": "module"`) with no runtime dependencies — `eventemitter3` was replaced by a small built-in, typed emitter that keeps the same `on` / `once` / `off` / `emit` surface.
- **Node 22+ and the browser.** Runs in Node 22 or newer and in the browser via native ESM or any bundler.
- **Drift-free precision everywhere.** Timing now uses the monotonic `performance.now()` in every environment, so browser precision is no longer subject to wall-clock drift.
- **Strongly typed.** Built with TypeScript, event listeners are typed (you get an `ITaskTimerEvent`, not `any`), and the package ships declaration maps.

## New Sugar

- **`lead` — run once at the leading edge.** Set `lead: true` on a task to run it once the moment the timer starts, in addition to its normal tick schedule, instead of waiting a full interval. A future `startDate` still defers the first run.
- **`task.data` — typed user data.** Attach arbitrary data to a task and read it back as `task.data` in the callback and in event listeners. `Task` is now generic (`Task<TData>`); type it via `timer.get<MyType>(id)`.
- **`timer.tasks` — every task at once.** A getter returning all tasks in insertion order. Read every id with `timer.tasks.map(t => t.id)`; use `timer.get(id)` for a single lookup.
- **`silentErrors` — surface unhandled task errors.** A timer option (default `true`). Set it to `false` and a task error with no `taskError` listener is re-thrown on the next turn instead of being swallowed. The timer keeps running either way.
- **`TaskTimerError` + `ErrorCode` — coded errors.** Every error the library throws is now a `TaskTimerError` carrying a stable, machine-readable `code`, so failures can be branched on without matching the message.

## Fixes

- A task's `time.elapsed` was negative while the task was running; it now counts up live and freezes on completion, mirroring the timer's `time`.
- Invalid option values (`NaN` / `Infinity`) no longer slip through — they fall back to their defaults instead of busy-looping or silently never running.
- A task that throws on every run now honors `totalRuns` instead of running forever — an errored run counts toward completion.
- Calling `start()` from within a tick no longer leaves a second tick chain running (double-speed ticks).

## Migrating from v3

### Named exports, no namespace

`TaskTimer` is no longer a default export, and `Event` / `State` / `Task` are no longer namespaced under it. Everything is a named export.

```js
// v3
import TaskTimer from 'tasktimer';
timer.on(TaskTimer.Event.TICK, /* … */);

// v4
import { TaskTimer, Event, State } from 'tasktimer';
timer.on(Event.TICK, /* … */);
```

If your project isn't ESM yet, set `"type": "module"` in your `package.json` (or use a bundler / a dynamic `import()`). See the [ESM notice](https://gist.github.com/onury/d3f3d765d7db2e8b2d050d14315f2ac7) for the common cases.

### Typed event payload

The event object was reshaped from `{ name, source, data }` to `{ name, timer, task, error }`. The related task is always `event.task` and the timer always `event.timer` — consistently, including on `taskError`.

```js
// v3
timer.on(TaskTimer.Event.TASK, event => {
    console.log(event.data.id, event.source.tickCount);
});

// v4
timer.on(Event.TASK, event => {
    console.log(event.task.id, event.timer.tickCount);
});
```

### `immediate` → `defer`

The task option `immediate` was renamed to `defer` — it defers the callback to the next event-loop turn (the old name read as the opposite).

```js
timer.add({ id: 'job', defer: true, callback: run }); // was: immediate: true
```

### `timer.get(id)`

`get` now returns `Task | undefined` (was typed `Task`, returned `null`) when no task matches, mirroring `Map.get`.

### Browser usage

v4 no longer ships a UMD `<script>` bundle (`tasktimer.min.js`). For the browser, bundle TaskTimer with your app using any modern bundler — Vite, esbuild, Rollup, or webpack.

### Errors

Errors thrown by the library are now `TaskTimerError` (still `instanceof Error`). Branch on `err.code` (an `ErrorCode`) if you handle them.

```js
import { TaskTimer, TaskTimerError, ErrorCode } from 'tasktimer';

try {
    timer.add(existingTask);
} catch (err) {
    if (err instanceof TaskTimerError && err.code === ErrorCode.DUPLICATE_TASK_ID) {
        // …
    }
}
```

The full list of changes is in the [Changelog](/tasktimer/changelog/).

:::tip
Coming from v1? v2 was a full TypeScript rewrite with several breaking API changes (`addTask` → `add`, `name` → `id`, and more). The [Changelog](/tasktimer/changelog/) documents those releases in full.
:::
