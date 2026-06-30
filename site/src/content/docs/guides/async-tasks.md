---
title: Async Tasks
description: Run asynchronous work with promises or the done() callback, and handle errors.
---

A task callback can be synchronous, return a `Promise`, or signal completion through a `done()` callback. TaskTimer waits for the task to finish before counting it complete, so overlapping async runs stay correctly accounted.

## Synchronous

The simplest case — the callback runs and returns:

```js
timer.add(task => {
    console.log('tick', task.currentRuns);
});
```

## Returning a Promise

Return a promise and TaskTimer awaits it. The run isn't considered finished until the promise settles:

```js
timer.add(async task => {
    const data = await fetch(url).then(r => r.json());
    save(data);
});
```

A rejected promise emits [`taskError`](/tasktimer/concepts/events/) rather than crashing the timer.

## Using `done()`

For callback-style async work, take a second `done` argument and call it when finished. TaskTimer detects the two-argument signature and waits for `done()`:

```js
timer.add((task, done) => {
    fs.readFile(path, (err, buf) => {
        process(buf);
        done(); // mark this run complete
    });
});
```

:::caution
If your callback declares a `done` parameter, you **must** call it — TaskTimer treats the task as in-flight until you do, and it won't complete (or fire `taskCompleted`). Use the promise form if you don't need `done`.
:::

## Deferring Heavy Tasks

A synchronous task that blocks the event loop holds up the whole timer. If the work is CPU-bound and can't be made async, set `defer: true` to push the callback to the next event-loop turn (via `setImmediate`), so it yields instead of running inline on the tick:

```js
timer.add({
    defer: true,
    callback: crunchNumbers // heavy, synchronous
});
```

This doesn't make the work parallel — JavaScript is single-threaded — but it lets the current tick finish before the blocking work starts.

## Handling Errors

A task that throws, or returns a rejecting promise, emits [`taskError`](/tasktimer/concepts/events/) with the error; the timer keeps running and other tasks are unaffected. The errored run still counts — it advances `currentRuns` and `totalRuns` like any other.

Every error TaskTimer raises is a `TaskTimerError` (extends `Error`) carrying a machine-readable [`ErrorCode`](/tasktimer/api/enumerations/errorcode/) on `.code` and the original on `.cause`. On a `taskError` event the failing task is `event.task` and the thrown value is `event.error`:

```js
import { TaskTimer, Event } from 'tasktimer';

timer.on(Event.TASK_ERROR, event => {
    console.error(`${event.task.id} failed:`, event.error);
});

timer.add({
    id: 'risky',
    callback() {
        throw new Error('boom'); // caught, emitted as taskError
    }
});
```

For `done()`-style tasks, route failures through your own error handling — a thrown error before `done()` is caught, but an async failure inside the callback is yours to surface.

### Unhandled Errors

By default a task error with **no** `taskError` listener is swallowed (`silentErrors` is `true`). Set the timer's `silentErrors: false` to surface such errors instead — the error is re-thrown on the next event-loop turn as a `TaskTimerError` (original on `.cause`), while the timer keeps running:

```js
const timer = new TaskTimer({ interval: 1000, silentErrors: false });
```

A `taskError` listener always takes precedence: a handled error is never re-surfaced.
