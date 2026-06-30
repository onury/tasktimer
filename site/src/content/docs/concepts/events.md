---
title: Events
description: The timer's event emitter surface and the events it fires.
---

A `TaskTimer` is an event emitter. Subscribe with `on()` (and the familiar friends) to react to ticks, task runs, and lifecycle changes. Event names are enumerated by the [`Event`](/tasktimer/api/enumerations/event/) enum, a named export.

## Subscribing

```js
import { TaskTimer, Event } from 'tasktimer';

const timer = new TaskTimer(1000);

timer.on(Event.TICK, event => {
    console.log('tick', event.timer.tickCount);
});
```

The emitter surface mirrors the common Node / `eventemitter3` API — no dependency required:

```js
timer.on(name, fn);      // alias: addListener
timer.once(name, fn);    // fire once, then auto-remove
timer.off(name, fn);     // alias: removeListener
timer.removeAllListeners(name?);
timer.emit(name, …args);
timer.listeners(name);
timer.listenerCount(name);
timer.eventNames();
```

## The Event Object

Every listener receives a typed [`ITaskTimerEvent`](/tasktimer/api/interfaces/itasktimerevent/) — no `any` in sight:

```ts
interface ITaskTimerEvent {
    name: Event;       // the event name
    timer: TaskTimer;  // the TaskTimer that fired it — always
    task?: Task;       // the related Task, when the event concerns one
    error?: Error;     // set only for taskError
}
```

The shape is consistent across every event: the firing timer is always `event.timer`, and whenever an event concerns a task — `task`, `taskAdded`, `taskRemoved`, `taskCompleted`, `taskError` — the task is always `event.task`.

```js
timer.on(Event.TASK, event => {
    const task = event.task; // the Task that just ran
    console.log(`${task.id} ran ${task.currentRuns} times`);
});
```

## Events

| Event | Name | Fires when |
| ----- | ---- | ---------- |
| `TICK` | `tick` | Each tick of the timer. |
| `STARTED` | `started` | The timer is started. |
| `RESUMED` | `resumed` | The timer is resumed from pause. |
| `PAUSED` | `paused` | The timer is paused. |
| `STOPPED` | `stopped` | The timer is stopped. |
| `RESET` | `reset` | The timer is reset. |
| `TASK` | `task` | A task executes (`event.task` is the task). |
| `TASK_ADDED` | `taskAdded` | A task is added (`event.task`). |
| `TASK_REMOVED` | `taskRemoved` | A task is removed (`event.task`; not on `reset()`). |
| `TASK_COMPLETED` | `taskCompleted` | A task reaches its `totalRuns` / `stopDate` (`event.task`). |
| `TASK_ERROR` | `taskError` | A task throws or rejects (`event.task` plus `event.error`). |
| `COMPLETED` | `completed` | Every task has completed. |

The string values are stable, so `timer.on('tick', …)` works too — but the enum keeps things type-safe and refactor-proof.

## Completion Events

`taskCompleted` fires for a task only if it has a `totalRuns` limit or a `stopDate` — otherwise it never completes. `completed` fires once **every** task has completed; it's the natural hook for `stopOnCompleted` workflows.

```js
timer.on(Event.COMPLETED, () => {
    console.log('all tasks done');
});
```

## Errors

A throwing or rejecting task does not crash the timer — it emits `taskError` with the failing task on `event.task` and the error on `event.error`, and the timer keeps ticking. See [Async Tasks](/tasktimer/guides/async-tasks/) for the details.

```js
timer.on(Event.TASK_ERROR, event => {
    console.error(`task '${event.task.id}' failed:`, event.error);
});
```

The error is always a [`TaskTimerError`](/tasktimer/api/classes/tasktimererror/) — it extends `Error` with a machine-readable [`ErrorCode`](/tasktimer/api/enumerations/errorcode/) on `.code` and the original failure on `.cause`. The same applies to anything the library itself throws (a duplicate task id, a missing callback, an invalid date range), so you can branch on `.code` instead of matching message strings.

```js
import { TaskTimerError, ErrorCode } from 'tasktimer';

try {
    timer.add({ id: 'poll', callback: poll });
    timer.add({ id: 'poll', callback: poll }); // duplicate id
} catch (err) {
    if (err instanceof TaskTimerError && err.code === ErrorCode.DUPLICATE_TASK_ID) {
        // …
    }
}
```

### Unhandled task errors

By default the timer's `silentErrors` option is `true`: if a task fails and there's no `taskError` listener, the error is swallowed and the timer keeps running. Set `silentErrors: false` to surface such an unhandled error instead — it's re-thrown on the next event-loop turn as a `TaskTimerError` (the original on `.cause`), without disturbing the running timer. A `taskError` listener always takes precedence, so a handled error is never surfaced.

```js
const timer = new TaskTimer({ interval: 1000, silentErrors: false });
```
