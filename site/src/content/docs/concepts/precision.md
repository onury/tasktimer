---
title: Precision
description: How TaskTimer corrects timing drift from CPU load and clock drift.
---

JavaScript timers drift. Because the runtime is single-threaded and asynchronous, each scheduled callback waits for the event loop, and that wait grows under load. A naive `setInterval` accumulates this error and slowly slides off schedule. TaskTimer corrects the drift on every tick.

## What Precision Does

With `precision` enabled (the default), before scheduling the next tick TaskTimer compares the **elapsed real time** against the **expected tick count**, and adjusts:

- If it's slightly behind, it **shortens the next delay** so the following tick lands on schedule.
- If it's far behind — for example after a synchronous, blocking task — it runs the next tick **immediately** (via `setImmediate`) and keeps catching up until the time/tick balance is restored.

In Node, the elapsed time is measured with high-resolution [`process.hrtime()`](https://nodejs.org/api/process.html#processhrtimetime), which is monotonic and **not subject to clock drift** (NTP adjustments, the machine sleeping, etc.). In the browser it falls back to `Date.now()`.

```js
const timer = new TaskTimer({ interval: 1000, precision: true }); // default
```

## Disabling Precision

Set `precision: false` for a plain fixed-delay schedule, where each tick is simply `interval` ms after the previous callback returns — drift and all.

```js
const timer = new TaskTimer({ interval: 1000, precision: false });
```

You can toggle it at any time:

```js
timer.precision = false;
```

## Limits

Precision is best-effort. It keeps the schedule honest against gradual drift, but it can't shorten a delay below zero or interrupt a callback that's already running. A task that blocks the event loop for longer than the base interval delays that tick no matter what; precision only governs how the timer **recovers afterward**.

:::caution
Precision corrects the *timer's* schedule, not your task's runtime. If a task blocks for longer than the base interval, consider a larger `interval`, a higher `tickInterval`, or making the task asynchronous (see [Async Tasks](/tasktimer/guides/async-tasks/)). For genuinely CPU-bound synchronous work, `immediate: true` defers it off the current tick.
:::

Even with precision, expect a few milliseconds of jitter depending on the CPU and load.
