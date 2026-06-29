---
title: Events
description: The timer's event emitter surface and the events it fires.
---

A `TaskTimer` is an event emitter. Subscribe with `on()` (and the familiar friends) to react to ticks, task runs, and lifecycle changes. Event names are enumerated by [`TaskTimer.Event`](/tasktimer/api/enumerations/event/).

## Subscribing

```js
import { TaskTimer } from 'tasktimer';

const timer = new TaskTimer(1000);

timer.on(TaskTimer.Event.TICK, event => {
    console.log('tick', timer.tickCount);
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

Every listener receives an [`ITaskTimerEvent`](/tasktimer/api/interfaces/itasktimerevent/):

```ts
interface ITaskTimerEvent {
    name: TaskTimer.Event; // the event name
    source: any;           // the TaskTimer or Task that fired it
    data?: any;            // the related Task, when applicable
    error?: Error;         // set only for taskError
}
```

```js
timer.on(TaskTimer.Event.TASK, event => {
    const task = event.data; // the Task that just ran
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
| `TASK` | `task` | A task executes (`event.data` is the task). |
| `TASK_ADDED` | `taskAdded` | A task is added. |
| `TASK_REMOVED` | `taskRemoved` | A task is removed (not on `reset()`). |
| `TASK_COMPLETED` | `taskCompleted` | A task reaches its `totalRuns` / `stopDate`. |
| `TASK_ERROR` | `taskError` | A task throws or rejects (`event.error` is set). |
| `COMPLETED` | `completed` | Every task has completed. |

The string values are stable, so `timer.on('tick', …)` works too — but the enum keeps things type-safe and refactor-proof.

## Completion Events

`taskCompleted` fires for a task only if it has a `totalRuns` limit or a `stopDate` — otherwise it never completes. `completed` fires once **every** task has completed; it's the natural hook for `stopOnCompleted` workflows.

```js
timer.on(TaskTimer.Event.COMPLETED, () => {
    console.log('all tasks done');
});
```

## Errors

A throwing or rejecting task does not crash the timer — it emits `taskError` with the error on `event.error`, and the timer keeps ticking. See [Async Tasks](/tasktimer/guides/async-tasks/) for the details.

```js
timer.on(TaskTimer.Event.TASK_ERROR, event => {
    console.error('task failed:', event.error);
});
```
