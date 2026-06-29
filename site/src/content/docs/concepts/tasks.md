---
title: Tasks
description: The Task object — its options, run count, completion, and lifetime.
---

A **task** holds a callback and the configuration for when and how often it runs. You rarely construct one directly — `timer.add()` accepts options or a callback and creates the [`Task`](/tasktimer/api/classes/task/) for you.

## Creating Tasks

`add()` takes a callback, an options object, a `Task` instance, or an array mixing them:

```js
// a bare callback (id auto-generated)
timer.add(task => poll());

// an options object
timer.add({ id: 'poll', tickInterval: 5, callback: poll });

// an explicit Task instance
import { Task } from 'tasktimer';
const task = new Task({ id: 'poll', tickInterval: 5, callback: poll });
timer.add(task);
```

A callback is always required. An `id` is required when constructing a `Task` directly, but optional via `add()` — a unique `task{n}` id is generated when omitted.

```js
const task = timer.add(poll).get('task1'); // grab the auto-id'd task
```

Adding a second task with an existing id throws.

## Task Options

Every option except `callback` is optional.

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `id` | `string` | auto | Unique task id. |
| `callback` | `TaskCallback` | — | Function run on each tick the task fires. |
| `tickInterval` | `number` | `1` | Run every N ticks. |
| `tickDelay` | `number` | `0` | Ticks to wait before the first run. |
| `totalRuns` | `number` | `null` | Run limit; `0`/`null` = unlimited. |
| `startDate` | `number \| Date` | — | Don't run before this time. |
| `stopDate` | `number \| Date` | — | Stop running at this time. |
| `enabled` | `boolean` | `true` | When `false`, the task is skipped. |
| `immediate` | `boolean` | `false` | Wrap the callback in `setImmediate()`. |
| `removeOnCompleted` | `boolean` | `false` | Remove the task once completed. |

Scheduling options are covered in [Scheduling Tasks](/tasktimer/guides/scheduling/) and [Scheduling by Date](/tasktimer/guides/date-scheduling/).

## Run Count & Completion

Each time a task fires, `currentRuns` increments. A task is **completed** when it reaches its `totalRuns` limit or its `stopDate` — whichever comes first. Without either, a task never completes; it runs until the timer stops.

```js
const task = timer.get('poll');
task.currentRuns; // how many times it has run
task.completed;   // true once totalRuns / stopDate is reached
```

Completion fires the [`taskCompleted`](/tasktimer/concepts/events/) event, and — when every task is complete — `completed`. See [Pause, Resume & Cleanup](/tasktimer/guides/control/) for `removeOnCompleted` and `stopOnCompleted`.

## Enabling & Disabling

`enabled` is a manual on/off switch. A disabled task stays added and keeps its place in the schedule, but its callback is skipped until you re-enable it:

```js
const task = timer.get('poll');
task.enabled = false; // pause just this task
task.enabled = true;  // resume it
```

## Resetting a Task

`reset()` zeroes the run count, keeping the task on the same schedule. Pass options to also re-configure it — but the `id` can't change:

```js
task.reset();                                  // start its runs over
task.reset({ tickInterval: 10, callback: fn }); // re-configure and reset
```

## Task Time

`task.time` reports the task's lifetime as an [`ITimeInfo`](/tasktimer/api/interfaces/itimeinfo/) — `started` (first run), `stopped` (last run, `0` while running), and `elapsed`, all in milliseconds.

```js
const { started, stopped, elapsed } = task.time;
```

## Serialization

`Task` implements `toJSON()`, returning its configuration and counters without the callback — so a task is safe to `JSON.stringify`:

```js
JSON.stringify(task); // { id, tickInterval, totalRuns, currentRuns, … }
```
