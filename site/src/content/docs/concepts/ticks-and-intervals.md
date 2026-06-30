---
title: Ticks & Intervals
description: The base interval is the timer's heartbeat; tasks run on tick multiples of it.
---

A `TaskTimer` has one **base interval** — its heartbeat, in milliseconds. Every elapsed interval is a **tick**. Tasks don't carry their own millisecond timers; they run on **tick multiples** of the shared base.

## The Base Interval

You set the base interval when constructing the timer, either as a number or via the `interval` option:

```js
new TaskTimer(1000);              // 1000 ms base interval
new TaskTimer({ interval: 500 }); // same, with options
```

The minimum is `20` ms; smaller values are clamped. The default is `1000` ms. You can change it at any time — the new interval applies from the next tick:

```js
timer.interval = 2000; // slow the heartbeat to 2s
```

A lower interval gives finer resolution but costs more CPU, since every task is re-evaluated on each tick.

## Ticks vs Milliseconds

A task's `tickInterval` is measured in **ticks, not milliseconds**. With a `1000` ms base interval, a `tickInterval` of `5` runs the task every 5 ticks — every 5 seconds.

```js
const timer = new TaskTimer(1000); // 1 tick = 1 second

timer.add({
    tickInterval: 5, // every 5 ticks → 5 seconds
    callback: poll
});
```

The same task on a `500` ms timer would run every 2.5 seconds. The tick is the unit; the base interval sets what a tick is worth.

| `interval` | `tickInterval` | Task runs every |
| ---------- | -------------- | --------------- |
| `1000` ms  | `1`            | 1 s             |
| `1000` ms  | `5`            | 5 s             |
| `500` ms   | `4`            | 2 s             |
| `100` ms   | `10`           | 1 s             |

## Counting Ticks

The timer exposes its progress through read-only counters:

```js
timer.tickCount;     // ticks since the timer started
timer.taskCount;     // number of tasks currently added
timer.taskRunCount;  // total task executions so far
timer.runCount;      // times the timer was started/resumed
```

`tickCount` resets to `0` each time the timer is started or reset. A task fires on tick `n` when `n > tickDelay` and `(n - tickDelay) % tickInterval === 0` — covered in [Scheduling Tasks](/tasktimer/guides/scheduling/).

## The Leading Edge

Normally a task waits a full interval before its first run. Set `lead: true` to also run it **once immediately when the timer starts** — the leading edge — on top of its regular tick schedule:

```js
const timer = new TaskTimer(1000);

timer.add({
    lead: true,    // run once at start, then…
    tickInterval: 5, // …every 5 ticks thereafter
    callback: poll
});
```

`lead` applies on `start()` only, and a future `startDate` still defers the first run until that time.

:::tip
Pick the base interval as the **greatest common resolution** your tasks need, then express each task's cadence as a `tickInterval`. One timer, evaluated once per tick, is cheaper than many independent timers.
:::

Because ticks can drift under load, TaskTimer corrects the delay between them — see [Precision](/tasktimer/concepts/precision/).
