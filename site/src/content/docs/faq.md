---
title: FAQ
description: Common questions about TaskTimer.
---

## How is this different from `setInterval`?

`setInterval` schedules one callback at a fixed delay and drifts under load. TaskTimer runs **many tasks on one timer**, each with its own interval, delay, run limit, or date window — and it [corrects drift](/tasktimer/concepts/precision/) on every tick instead of accumulating it.

## Are intervals in milliseconds?

The **base interval** is in milliseconds. A **task's** `tickInterval` is in [ticks](/tasktimer/concepts/ticks-and-intervals/) — multiples of that base. With a `1000` ms timer, `tickInterval: 5` runs every 5 seconds.

## Can a task run faster than the base interval?

No. The base interval is the finest resolution. To run something more often, lower the timer's `interval`. Every task is evaluated once per tick, so all cadences are multiples of the base.

## Why isn't my task completing?

A task completes only when it has a `totalRuns` limit or a `stopDate`. Without either, it runs forever. If you use a `done()`-style callback, the run isn't finished — and the task can't complete — until you **call `done()`**. See [Async Tasks](/tasktimer/guides/async-tasks/).

## How do I run a task right away instead of waiting one interval?

Add it with `lead: true`. The task runs once immediately on the leading edge at `start()`, then continues on its normal `tickInterval`. A future `startDate` defers that leading run until the date. See [Scheduling Tasks](/tasktimer/guides/scheduling/).

```js
timer.add({ lead: true, tickInterval: 5, callback: poll });
```

## How do I list all the tasks?

`timer.tasks` is every task as an array, in insertion order; `timer.get(id)` looks one up (or returns `undefined`).

```js
timer.tasks.map(task => task.id); // all task ids
```

## Why doesn't `stopOnCompleted` stop my timer?

Every task must be completable. If even one task has no `totalRuns` and no `stopDate`, it never completes, so "all tasks completed" never happens. The same applies to `removeOnCompleted`. See [Pause, Resume & Cleanup](/tasktimer/guides/control/).

## How do I handle a task error?

Listen for [`taskError`](/tasktimer/concepts/events/) — the failing task is `event.task` and the thrown value is `event.error`. Every error TaskTimer raises is a `TaskTimerError` with a machine-readable `code` ([`ErrorCode`](/tasktimer/api/enumerations/errorcode/)) and the original on `cause`. With no `taskError` listener the error is swallowed by default; set the timer's `silentErrors: false` to surface it (re-thrown on the next turn) instead. See [Async Tasks](/tasktimer/guides/async-tasks/).

## Does a failing task stop the timer?

No. A task that throws or rejects emits a [`taskError`](/tasktimer/concepts/events/) event with the error; the timer keeps running and other tasks are unaffected. The errored run still counts toward `totalRuns`.

## Can I use TaskTimer in the browser?

Yes. TaskTimer is ESM-only and runs in the browser via native ESM or a bundler (Vite, esbuild, Rollup, webpack). Its precision path uses the monotonic `performance.now()` clock, which exists in both Node and the browser — there's no Node-specific timing dependency. There's no prebuilt `<script>` bundle as of v4.

## How accurate is the timer?

As accurate as the runtime allows. Precision keeps the schedule from drifting by measuring elapsed time with the monotonic [`performance.now()`](https://developer.mozilla.org/docs/Web/API/Performance/now) clock — the same in Node and the browser. Expect a few milliseconds of jitter depending on CPU and load; a task that blocks longer than the base interval will still delay that tick. See [Precision](/tasktimer/concepts/precision/).

## Is TypeScript supported?

TaskTimer is written in TypeScript and ships complete type definitions — no `@types` package needed. The [API Reference](/tasktimer/api/readme/) is generated from the source.
