---
title: Scheduling Tasks
description: Control when and how often a task runs with tickInterval, tickDelay, and totalRuns.
---

Three options shape a task's schedule: how often it runs (`tickInterval`), how long before it starts (`tickDelay`), and how many times in total (`totalRuns`). All are counted in [ticks](/tasktimer/concepts/ticks-and-intervals/), not milliseconds.

## Interval

`tickInterval` runs the task every N ticks. With a `1000` ms base interval, `tickInterval: 5` runs every 5 seconds.

```js
const timer = new TaskTimer(1000);

timer.add({
    tickInterval: 5, // every 5 ticks → 5s
    callback: poll
});
```

The default is `1` — run on every tick.

## Delay

`tickDelay` holds the task back for N ticks before its first run. The first run lands on the first tick **after** the delay that also matches the interval.

```js
timer.add({
    tickDelay: 3,    // wait 3 ticks
    tickInterval: 1, // then every tick → first run on tick 4
    callback: warmUp
});
```

A task fires on tick `n` exactly when `n > tickDelay` and `(n - tickDelay) % tickInterval === 0`. So `tickDelay: 2, tickInterval: 3` first runs on tick 5, then 8, 11, ….

## Run on Start

By default the first run lands one interval after `start()`, not at the moment of starting. Set `lead: true` to also run the task **once immediately** on the leading edge — then it continues on its normal `tickInterval`:

```js
timer.add({
    lead: true,      // run now, at start()
    tickInterval: 5, // then every 5 ticks
    callback: poll
});
```

A future [`startDate`](/tasktimer/guides/date-scheduling/) still defers the leading run until that time. `lead` takes effect on `start()` only.

## Run Limit

`totalRuns` caps the number of executions. After the last run the task is **completed** and stops; set it to `0` or `null` (the default) for unlimited runs.

```js
timer.add({
    tickInterval: 1,
    totalRuns: 10, // run 10 times, then stop
    callback: heartbeat
});
```

When a task completes it emits [`taskCompleted`](/tasktimer/concepts/events/); when all tasks complete, `completed`.

## Putting It Together

```js
const timer = new TaskTimer(1000);

timer.add({
    id: 'heartbeat',
    tickDelay: 2,     // wait 2s
    tickInterval: 5,  // then every 5s
    totalRuns: 12,    // for 1 minute (12 × 5s)
    callback(task) {
        console.log(`beat ${task.currentRuns}/${task.totalRuns}`);
    }
});

timer.start();
```

## Distributing Load

Because every task shares one timer, you can **stagger** heavy tasks across different ticks so they don't all fire together. Give them the same interval but different delays:

```js
const timer = new TaskTimer(1000);

timer.add([
    { id: 'sync-a', tickDelay: 0, tickInterval: 3, callback: syncA },
    { id: 'sync-b', tickDelay: 1, tickInterval: 3, callback: syncB },
    { id: 'sync-c', tickDelay: 2, tickInterval: 3, callback: syncC }
]);

timer.start(); // a, b, c each run every 3s, but on different ticks
```

:::tip
Counting in ticks keeps cadences in lockstep with the base interval. To change every task's real-world speed at once, change the timer's `interval` — the tick math stays the same.
:::

For time-of-day scheduling rather than tick cadence, see [Scheduling by Date](/tasktimer/guides/date-scheduling/).
