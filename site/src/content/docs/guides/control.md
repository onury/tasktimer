---
title: Pause, Resume & Cleanup
description: Control a running timer and clean up tasks as they finish.
---

A running timer can be paused, resumed, stopped, and reset at any time, and tasks can clean up after themselves when they finish. This guide covers controlling the timer and the two completion options, `stopOnCompleted` and `removeOnCompleted`.

## Pause & Resume

`pause()` freezes the timer and every task; `resume()` continues exactly where it left off, preserving each task's run count and the tick count. Paused time doesn't count toward [precision](/tasktimer/concepts/precision/) drift.

```js
timer.start();
timer.pause();   // hold everything
timer.resume();  // continue the same run
```

`resume()` on an idle timer simply starts it, so it's a safe "ensure running" call.

## Stop & Reset

`stop()` halts the timer but keeps tasks and counters, so you can inspect state or restart. `reset()` returns the timer to `idle`, clearing the tick count and removing all tasks silently.

```js
timer.stop();   // halt; tasks and counts retained
timer.start();  // restart a fresh run (tasks kept)

timer.reset();  // back to idle; tasks removed
```

See [Timer Lifecycle](/tasktimer/concepts/timer-lifecycle/) for the full state model.

## Auto-Stop When Done

By default the timer keeps ticking even after every task has completed. Set `stopOnCompleted: true` to stop it automatically once all tasks finish — useful for one-shot batches.

```js
import { TaskTimer, Event } from 'tasktimer';

const timer = new TaskTimer({ interval: 1000, stopOnCompleted: true });

timer.add({ id: 'a', totalRuns: 3, callback: jobA });
timer.add({ id: 'b', totalRuns: 5, callback: jobB });

timer.on(Event.STOPPED, () => console.log('batch finished'));
timer.start();
```

For this to take effect, **every** task must be able to complete — each needs a `totalRuns` limit or a `stopDate`. A task with neither runs forever and the timer never stops.

## Free Memory As Tasks Finish

Completed tasks stay added (so you can inspect them) until removed. For long-lived timers that add many short-lived tasks, set `removeOnCompleted: true` to drop each task as soon as it finishes:

```js
timer.add({
    id: 'one-shot',
    totalRuns: 1,
    removeOnCompleted: true, // gone once it has run
    callback: doOnce
});
```

Like `stopOnCompleted`, this requires the task to be completable (a `totalRuns` limit and/or a `stopDate`).

## Removing Tasks Manually

Remove a task at any time by id or instance — this emits [`taskRemoved`](/tasktimer/concepts/events/):

```js
timer.remove('one-shot');
timer.remove(task);
```

`reset()`, by contrast, removes every task **silently** — no `taskRemoved` events.

## Inspecting Tasks

`timer.tasks` returns every task as an array, in insertion order, and `timer.get(id)` looks one up by id (returning `undefined` if there's no match):

```js
timer.tasks.map(task => task.id); // all task ids
const task = timer.get('one-shot'); // Task | undefined
```
