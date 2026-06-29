---
title: Getting Started
description: Install TaskTimer and run your first periodic task.
---

TaskTimer runs periodic tasks on a single timer. You set one **base interval**, then add tasks that run on **tick** multiples of it — each with its own interval, run limit, delay, or date window.

## Install

```sh
npm i tasktimer
```

TaskTimer is **ESM-only** and ships with TypeScript types.

```ts
import { TaskTimer } from 'tasktimer';
```

:::note
TaskTimer is ESM-only and Node-first. It runs in the browser too — bundle it with your app (Vite, esbuild, Rollup, webpack …); the high-resolution timing path falls back gracefully when `process.hrtime` is unavailable.
:::

## Your First Timer

Create a timer with a base interval (milliseconds), add a task, and start it. The task's callback receives the [`Task`](/tasktimer/concepts/tasks/) instance.

```js
import { TaskTimer } from 'tasktimer';

const timer = new TaskTimer(1000); // tick every 1000 ms
timer.add(task => {
    console.log(`Run #${task.currentRuns}`);
});
timer.start();
```

The base interval is the **tick** resolution shared by every task. A task's `tickInterval` is counted in ticks, not milliseconds — see [Ticks & Intervals](/tasktimer/concepts/ticks-and-intervals/).

## Multiple Tasks

Add many tasks at once, each on its own schedule. Here one runs every 5 ticks (5s) ten times, another waits a tick then runs every 10 ticks (10s) twice.

```js
const timer = new TaskTimer(1000);

timer.add([
    {
        id: 'sync-users',
        tickInterval: 5,  // every 5 ticks → 5s
        totalRuns: 10,    // stop after 10 runs
        callback(task) {
            console.log(`${task.id}: run ${task.currentRuns}`);
        }
    },
    {
        id: 'send-digest',
        tickDelay: 1,     // wait 1 tick before the first run
        tickInterval: 10, // every 10 ticks → 10s
        totalRuns: 2,
        callback: sendDigest
    }
]);

timer.start();
```

## Listen for Events

A `TaskTimer` is an event emitter. Subscribe to lifecycle [events](/tasktimer/concepts/events/) such as `tick` or `task`.

```js
timer.on(TaskTimer.Event.TICK, () => {
    console.log(`tick ${timer.tickCount} · elapsed ${timer.time.elapsed} ms`);
});
```

## Next Steps

- [Ticks & Intervals](/tasktimer/concepts/ticks-and-intervals/) — how the tick model works.
- [Tasks](/tasktimer/concepts/tasks/) — the task object, its options, and completion.
- [Scheduling Tasks](/tasktimer/guides/scheduling/) — interval, delay, and run limits.
- [Async Tasks](/tasktimer/guides/async-tasks/) — promises, `done()`, and errors.
- [API Reference](/tasktimer/api/readme/) — the complete generated reference.
