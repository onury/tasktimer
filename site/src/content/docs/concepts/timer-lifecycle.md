---
title: Timer Lifecycle
description: The four timer states and the transitions between them.
---

A timer is always in one of four states, exposed by `timer.state` and enumerated by the [`State`](/tasktimer/api/enumerations/state/) enum, a named export. The control methods move it between them.

## States

| State | Value | Meaning |
| ----- | ----- | ------- |
| `IDLE` | `idle` | Initial state, and the state after `reset()`. No tasks have run. |
| `RUNNING` | `running` | Ticking; tasks are firing. |
| `PAUSED` | `paused` | Held; tasks and counters are frozen, ready to resume. |
| `STOPPED` | `stopped` | Halted; tasks and counters are retained but not running. |

```js
import { TaskTimer, State } from 'tasktimer';

timer.state === State.RUNNING;
```

## Transitions

```js
timer.start();  // → RUNNING  (resets tick count; keeps tasks)
timer.pause();  // → PAUSED   (only from RUNNING)
timer.resume(); // → RUNNING  (from PAUSED; starts the timer if IDLE)
timer.stop();   // → STOPPED  (only from RUNNING)
timer.reset();  // → IDLE     (clears ticks and removes all tasks silently)
```

Each method returns the timer, so calls chain: `timer.add(task).start()`.

The transitions are guarded — calling a method from the wrong state is a safe no-op rather than an error:

- `pause()` and `stop()` do nothing unless the timer is `RUNNING`.
- `resume()` does nothing unless the timer is `PAUSED` — except from `IDLE`, where it acts as `start()`.
- `start()` from `RUNNING` restarts: it resets the tick count and counters but keeps existing tasks.

## Start vs Resume

`start()` begins a fresh run — `tickCount`, `taskRunCount`, and the timer's `time` reset to zero. `resume()` continues a paused run where it left off, preserving counters and each task's progress. `runCount` increments on every start **and** resume.

```js
timer.start();  // run 1
timer.pause();
timer.resume(); // still run 1, continued
timer.runCount; // 2 (one start + one resume)
```

## Stop vs Reset

`stop()` halts the timer but keeps everything — tasks, tick count, run counters — so you can inspect or restart. `reset()` returns the timer to `IDLE`, clearing the tick count and **removing all tasks silently** (no `taskRemoved` events).

```js
timer.stop();   // STOPPED — tasks and counts retained
timer.reset();  // IDLE — tasks removed, counts cleared
```

Both pausing and the lifecycle around completion are covered in [Pause, Resume & Cleanup](/tasktimer/guides/control/). Every transition also emits an [event](/tasktimer/concepts/events/).
