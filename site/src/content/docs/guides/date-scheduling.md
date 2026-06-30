---
title: Scheduling by Date
description: Bind a task to a start and stop date instead of (or alongside) tick cadence.
---

Beyond tick cadence, a task can be anchored to wall-clock time with `startDate` and `stopDate`. Use them to defer a task until a moment in the future, or to retire it automatically at a deadline.

## Start Date

`startDate` holds the task back until the given time. Before it, the task is skipped; from then on it runs on its `tickInterval` as usual. Accepts a `Date` or a millisecond timestamp.

```js
const inFiveMinutes = new Date(Date.now() + 5 * 60_000);

timer.add({
    id: 'deferred',
    startDate: inFiveMinutes,
    tickInterval: 1,
    callback: run
});
```

A `startDate` also defers a [`lead`](/tasktimer/guides/scheduling/) task: the leading-edge run waits until the date is reached rather than firing at `start()`.

## Stop Date

`stopDate` retires the task at the given time. Once reached, the task is **completed** — it won't run again, and it emits [`taskCompleted`](/tasktimer/concepts/events/).

```js
const inOneHour = new Date(Date.now() + 60 * 60_000);

timer.add({
    id: 'until-deadline',
    stopDate: inOneHour,
    tickInterval: 5,
    callback: poll
});
```

## A Time Window

Combine both to run a task only between two times:

```js
timer.add({
    id: 'business-hours-poll',
    startDate: openTime,
    stopDate: closeTime,
    tickInterval: 10,
    callback: poll
});
```

`startDate` must be before `stopDate` — a start at or after the stop throws when the task is created.

## Dates and Run Limits

`stopDate` and `totalRuns` are both completion conditions; whichever is reached **first** completes the task. A task with `totalRuns: 100` and a `stopDate` an hour out stops at 100 runs or at the hour, whichever comes sooner.

```js
timer.add({
    totalRuns: 100,
    stopDate: inOneHour,
    tickInterval: 1,
    callback: poll // completes at 100 runs OR after an hour
});
```

:::note
Dates are evaluated on each tick, so their resolution is the base [interval](/tasktimer/concepts/ticks-and-intervals/). A `stopDate` takes effect on the first tick at or after it — not to the exact millisecond. Choose a base interval fine enough for the precision you need.
:::
