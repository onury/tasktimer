import { describe, expect, it } from 'vitest';

import { type ITaskOptions, type ITaskTimerEvent, Task, TaskTimer } from '../src/index.js';

/**
 *  Blocks the event loop synchronously for the given duration.
 */
function block(ms = 100): void {
  const start = Date.now();
  while (Date.now() - start < ms) {
    // busy-wait
  }
}

/**
 *  Resolves (or rejects with an `Error` value) after a short delay.
 */
function getPromise(value: unknown, delay = 50): Promise<unknown> {
  return new Promise((resolve, reject) => {
    setTimeout(() => (value instanceof Error ? reject(value) : resolve(value)), delay);
  });
}

const noop = (): void => undefined;

describe('TaskTimer namespace & defaults', () => {
  it('exposes State, Event and Task', () => {
    expect(TaskTimer.State).toEqual(expect.any(Object));
    expect(TaskTimer.Event).toEqual(expect.any(Object));
    expect(TaskTimer.Task).toBe(Task);
  });

  it('applies timer defaults and option overrides', () => {
    let timer = new TaskTimer();
    expect(timer.interval).toBe(1000);
    expect(timer.precision).toBe(true);
    expect(timer.stopOnCompleted).toBe(false);
    expect(timer.time).toEqual({ started: 0, stopped: 0, elapsed: 0 });

    timer = new TaskTimer({ interval: 2500, precision: false, stopOnCompleted: true });
    expect(timer.interval).toBe(2500);
    expect(timer.precision).toBe(false);
    expect(timer.stopOnCompleted).toBe(true);

    // interval below the minimum is clamped
    expect(new TaskTimer(5).interval).toBe(20);
  });

  it('applies task defaults and option overrides', () => {
    const timer = new TaskTimer();
    // id is required when constructing a Task directly
    expect(() => new Task({ callback: noop })).toThrow();
    // id is optional when adding via TaskTimer#add()
    expect(() => timer.add({ callback: noop })).not.toThrow();

    let task = new Task({ id: 'my-task', callback: noop });
    expect(task.enabled).toBe(true);
    expect(task.id).toBe('my-task');
    expect(task.tickDelay).toBe(0);
    expect(task.tickInterval).toBe(1);
    expect(task.totalRuns).toBe(null);
    expect(task.removeOnCompleted).toBe(false);
    expect(task.immediate).toBe(false);
    expect(task.currentRuns).toBe(0);
    expect(task.time).toEqual({ started: 0, stopped: 0, elapsed: 0 });
    expect(task.completed).toBe(false);

    task = timer.add({ callback: noop }).get('task1');
    expect(task.id).toBe('task1');

    const callback = (): void => undefined;
    task = new Task({
      id: 'my-task-2',
      enabled: false,
      tickDelay: 10,
      tickInterval: 5,
      totalRuns: 3,
      removeOnCompleted: true,
      immediate: true,
      callback
    });
    expect(task.enabled).toBe(false);
    expect(task.tickDelay).toBe(10);
    expect(task.tickInterval).toBe(5);
    expect(task.totalRuns).toBe(3);
    expect(task.removeOnCompleted).toBe(true);
    expect(task.immediate).toBe(true);
    expect(task.callback).toBe(callback);
  });

  it('validates Task construction', () => {
    expect(() => new Task(null as any)).toThrow('A unique task ID is required.');
    expect(() => new Task({ callback: noop } as any)).toThrow('A unique task ID is required.');
    expect(() => new Task({ id: 'x' } as any)).toThrow(
      'A callback function is required for a task to run.'
    );
    const date = Date.now();
    expect(
      () =>
        new Task({
          id: 'x',
          startDate: new Date(date + 100),
          stopDate: new Date(date),
          callback: noop
        })
    ).toThrow('Task start date cannot be the same or after stop date.');
  });

  it('reset() guards the id and re-applies options', () => {
    const task = new Task({ id: 'r', totalRuns: 3, callback: noop });
    expect(() => task.reset({ id: 'other' } as any)).toThrow('Cannot change ID of a task.');
    // same id is allowed and re-applies options
    expect(() => task.reset({ id: 'r', totalRuns: 5, callback: noop } as any)).not.toThrow();
    expect(task.totalRuns).toBe(5);
    // no options just resets the run count, keeping the configuration
    task.reset();
    expect(task.totalRuns).toBe(5);
    expect(task.currentRuns).toBe(0);
  });

  it('generates unique task IDs, skipping collisions', () => {
    const timer = new TaskTimer();
    timer.add({ id: 'task2', callback: noop }); // taskCount = 1 → next auto would be "task2"
    timer.add(noop); // collides with "task2" → "task3"
    expect(timer.get('task3')).not.toBe(null);
    expect(timer.taskCount).toBe(2);
  });

  it('preserves an explicit id and only auto-generates when missing', () => {
    const timer = new TaskTimer();
    timer.add({ id: 'explicit', tickInterval: 4, callback: noop });
    expect(timer.get('explicit')).not.toBe(null);
    expect(timer.get('explicit').tickInterval).toBe(4);
    // a Task instance keeps its own id (no overwrite/auto-generation)
    const instance = new Task({ id: 'inst', callback: noop });
    timer.add(instance);
    expect(timer.get('inst')).toBe(instance);
  });

  it('reset() preserves the timer configuration', () => {
    const timer = new TaskTimer({ interval: 2500, precision: false, stopOnCompleted: true });
    timer.reset();
    expect(timer.interval).toBe(2500);
    expect(timer.precision).toBe(false);
    expect(timer.stopOnCompleted).toBe(true);
  });
});

describe('TaskTimer state machine', () => {
  it('transitions through start/pause/resume/stop/reset', () => {
    const timer = new TaskTimer(50);
    expect(timer.state).toBe(TaskTimer.State.IDLE);
    // pause/stop are no-ops while not running
    expect(timer.pause().state).toBe(TaskTimer.State.IDLE);
    expect(timer.stop().state).toBe(TaskTimer.State.IDLE);
    // resume while idle starts the timer
    timer.resume();
    expect(timer.state).toBe(TaskTimer.State.RUNNING);
    timer.pause();
    expect(timer.state).toBe(TaskTimer.State.PAUSED);
    // resume is a no-op unless paused/idle; here it resumes
    timer.resume();
    expect(timer.state).toBe(TaskTimer.State.RUNNING);
    // resume while already running is a no-op
    timer.resume();
    expect(timer.state).toBe(TaskTimer.State.RUNNING);
    timer.stop();
    expect(timer.state).toBe(TaskTimer.State.STOPPED);
    expect(timer.time.stopped).not.toBe(0);
    // a stopped timer's elapsed is frozen at (stopped - started) and small here
    const elapsed = timer.time.elapsed;
    expect(elapsed).toBe(timer.time.stopped - timer.time.started);
    expect(elapsed).toBeGreaterThanOrEqual(0);
    expect(elapsed).toBeLessThan(1000);
    block(15);
    expect(timer.time.elapsed).toBe(elapsed); // does not keep counting after stop
    timer.reset();
    expect(timer.state).toBe(TaskTimer.State.IDLE);
  });
});

describe('TaskTimer task management', () => {
  it('adds, runs and removes tasks', () =>
    new Promise<void>((resolve, reject) => {
      const interval = 40;
      const timer = new TaskTimer(interval);
      expect(timer.taskCount).toBe(0);

      const task1: ITaskOptions = {
        id: 'heartbeat',
        tickInterval: 2,
        totalRuns: 2,
        callback(task: Task): void {
          try {
            expect(task.id).toBe('heartbeat');
            expect(timer.tickCount % 2).toBe(0);
            expect(task.currentRuns).toBeLessThanOrEqual(task.totalRuns);
            expect(timer.time.stopped).toBe(0);
          } catch (err) {
            reject(err);
          }
        }
      };
      timer.add(task1);
      expect(timer.taskCount).toBe(1);

      // a Task instance with removeOnCompleted
      const task2 = new Task({
        id: 'remove-check',
        tickInterval: 5,
        totalRuns: 1,
        removeOnCompleted: true,
        callback(): void {
          try {
            expect(timer.tickCount).toBe(5);
            expect(timer.get('remove-check')).not.toBe(null);
          } catch (err) {
            reject(err);
          }
        }
      });
      timer.add(task2);
      expect(timer.taskCount).toBe(2);

      const task3: ITaskOptions = {
        id: 'final-check',
        tickInterval: 7,
        totalRuns: 1,
        callback(): void {
          try {
            expect(timer.tickCount).toBe(7);
            // remove-check removed itself on completion
            expect(timer.get('remove-check')).toBe(null);
            expect(timer.taskCount).toBe(2);
            timer.remove('heartbeat');
            expect(timer.taskCount).toBe(1);
            timer.stop();
            expect(timer.state).toBe(TaskTimer.State.STOPPED);
            timer.reset();
            expect(timer.taskCount).toBe(0);
            expect(timer.state).toBe(TaskTimer.State.IDLE);
            resolve();
          } catch (err) {
            reject(err);
          }
        }
      };
      timer.add(task3);
      expect(timer.taskCount).toBe(3);

      // cannot add a duplicate id
      expect(() => timer.add({ id: 'heartbeat', callback: noop })).toThrow(
        "A task with id 'heartbeat' already exists."
      );
      // cannot add without a callback
      expect(() => timer.add({ id: 'no-callback' } as any)).toThrow(
        'A callback function is required for a task to run.'
      );
      expect(() => timer.add(null as any)).toThrow(
        'Either a task, task options or a callback is required.'
      );
      // cannot remove a non-existing task
      expect(() => timer.remove('non-existing')).toThrow("No tasks exist with ID: 'non-existing'.");

      timer.start();
    }));

  it('accepts an array of mixed task definitions', () => {
    const timer = new TaskTimer();
    const task = new Task({ id: 'instance', callback: noop });
    timer.add([task, { id: 'options', callback: noop }, noop]);
    expect(timer.taskCount).toBe(3);
    expect(timer.get('instance')).toBe(task);
  });
});

describe('TaskTimer events', () => {
  it('emits the full lifecycle of events', () =>
    new Promise<void>((resolve, reject) => {
      const timer = new TaskTimer(40);
      const seen: TaskTimer.Event[] = [];
      const taskComp: ITaskOptions = { id: 'comp', totalRuns: 2, callback: noop };
      const autoTaskID = 'task2';

      timer
        .on(TaskTimer.Event.STARTED, (e: ITaskTimerEvent) => {
          seen.push(e.name);
          expect(e.source).toBe(timer);
        })
        .on(TaskTimer.Event.TICK, (e: ITaskTimerEvent) => {
          seen.push(e.name);
          expect(e.data).toBeUndefined();
          if (timer.tickCount === 2) timer.add(taskComp);
          if (timer.tickCount === 3) timer.add(noop);
        })
        .on(TaskTimer.Event.TASK_ADDED, (e: ITaskTimerEvent) => {
          seen.push(e.name);
          expect(e.data instanceof Task).toBe(true);
        })
        .on(TaskTimer.Event.TASK, (e: ITaskTimerEvent) => {
          seen.push(e.name);
          expect(e.data instanceof Task).toBe(true);
        })
        .on(TaskTimer.Event.TASK_COMPLETED, (e: ITaskTimerEvent) => {
          seen.push(e.name);
          expect((e.data as Task).id).toBe(taskComp.id);
          timer.remove(autoTaskID);
        })
        .on(TaskTimer.Event.TASK_REMOVED, (e: ITaskTimerEvent) => {
          seen.push(e.name);
          expect((e.data as Task).id).toBe(autoTaskID);
          timer.pause();
        })
        .on(TaskTimer.Event.PAUSED, (e: ITaskTimerEvent) => {
          seen.push(e.name);
          timer.resume();
        })
        .on(TaskTimer.Event.RESUMED, (e: ITaskTimerEvent) => {
          seen.push(e.name);
          timer.stop();
        })
        .on(TaskTimer.Event.STOPPED, (e: ITaskTimerEvent) => {
          seen.push(e.name);
          timer.reset();
        })
        // a second STOPPED listener
        .on(TaskTimer.Event.STOPPED, () => seen.push(TaskTimer.Event.STOPPED))
        .on(TaskTimer.Event.RESET, (e: ITaskTimerEvent) => {
          try {
            seen.push(e.name);
            expect(timer.runCount).toBe(2);
            for (const name of [
              TaskTimer.Event.STARTED,
              TaskTimer.Event.TICK,
              TaskTimer.Event.TASK_ADDED,
              TaskTimer.Event.TASK,
              TaskTimer.Event.TASK_COMPLETED,
              TaskTimer.Event.TASK_REMOVED,
              TaskTimer.Event.PAUSED,
              TaskTimer.Event.RESUMED,
              TaskTimer.Event.RESET
            ]) {
              expect(seen).toContain(name);
            }
            expect(timer.listenerCount(TaskTimer.Event.STOPPED)).toBe(2);
            resolve();
          } catch (err) {
            reject(err);
          }
        });

      timer.start();
      expect(timer.state).toBe(TaskTimer.State.RUNNING);
    }));

  it('stops automatically when all tasks complete (stopOnCompleted)', () =>
    new Promise<void>((resolve, reject) => {
      const timer = new TaskTimer({ interval: 40, stopOnCompleted: true });
      timer.add([
        { totalRuns: 2, callback: noop },
        { totalRuns: 4, callback: noop }
      ]);
      expect(timer.taskCount).toBe(2);
      timer.on(TaskTimer.Event.STOPPED, () => {
        try {
          expect(timer.state).toBe(TaskTimer.State.STOPPED);
          expect(timer.taskRunCount).toBe(6);
          expect(timer.runCount).toBe(1);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
      // resume() acts as start() when idle
      timer.resume();
    }));
});

describe('Task scheduling by date', () => {
  it('rejects a startDate equal to or after stopDate', () => {
    const timer = new TaskTimer(40);
    const date = Date.now();
    expect(() =>
      timer.add({ id: 'd', startDate: new Date(date), stopDate: new Date(date), callback: noop })
    ).toThrow('Task start date cannot be the same or after stop date.');
  });

  it('honors startDate and stopDate', () =>
    new Promise<void>((resolve, reject) => {
      const timer = new TaskTimer({ interval: 50, stopOnCompleted: true });
      const startDate = new Date(Date.now() + 200);
      const stopDate = new Date(Date.now() + 700);
      timer.add({
        id: 'task-date',
        startDate,
        stopDate,
        callback(task: Task): void {
          if (task.currentRuns === 1) {
            try {
              expect(Date.now() - startDate.getTime()).toBeLessThan(200);
            } catch (err) {
              reject(err);
            }
          }
        }
      });

      const task = timer.get('task-date');
      expect(task.completed).toBe(false);
      expect(task.time).toEqual({ started: 0, stopped: 0, elapsed: 0 });

      timer.on(TaskTimer.Event.TASK_COMPLETED, (e: ITaskTimerEvent) => {
        const t = e.data as Task;
        try {
          expect(t.completed).toBe(true);
          expect(t.currentRuns).toBeGreaterThanOrEqual(1);
          expect(t.time.elapsed).toBe(t.time.stopped - t.time.started);
          timer.stop();
          resolve();
        } catch (err) {
          reject(err);
        }
      });
      timer.start();
    }));
});

describe('Task reset & serialization', () => {
  it('resets run count and re-configures', () =>
    new Promise<void>((resolve, reject) => {
      const timer = new TaskTimer(40);
      const task = new Task({ id: 'r', tickInterval: 1, totalRuns: 3, callback: noop });
      timer.add(task);

      timer.on(TaskTimer.Event.TICK, () => {
        try {
          if (timer.tickCount === 3) {
            expect(task.currentRuns).toBe(2);
            expect(() => task.reset({ id: 'nope' } as any)).toThrow('Cannot change ID of a task.');
            task.reset();
          } else if (timer.tickCount === 5) {
            task.reset({ totalRuns: 2, callback: noop });
          }
        } catch (err) {
          reject(err);
        }
      });
      timer.on(TaskTimer.Event.TASK_COMPLETED, () => {
        try {
          expect(task.totalRuns).toBe(2);
          expect(task.currentRuns).toBe(2);
          timer.stop();
          resolve();
        } catch (err) {
          reject(err);
        }
      });
      timer.start();
    }));

  it('serializes to JSON without the callback', () => {
    const task = new Task({ id: 'json', tickInterval: 1, totalRuns: 3, callback: noop });
    const o = JSON.parse(JSON.stringify(task));
    expect(o.id).toBe('json');
    expect(o.tickInterval).toBe(1);
    expect(o.totalRuns).toBe(3);
    expect(o.currentRuns).toBe(0);
    expect(o.startDate).toBe(null);
    expect(o.stopDate).toBe(null);
    expect(o.callback).toBeUndefined();
  });
});

describe('Task callbacks', () => {
  it('supports sync, immediate, done() and Promise tasks; skips disabled', () =>
    new Promise<void>((resolve, reject) => {
      // interval comfortably larger than the async delays, so a one-shot task's
      // async work resolves (marking it completed) before its next tick.
      const timer = new TaskTimer(80);
      timer.add(new Task({ id: 'sync', totalRuns: 1, callback: noop }));
      timer.add(
        new Task({
          id: 'async-done',
          tickDelay: 2,
          totalRuns: 1,
          callback(_task: Task, done?: () => void): void {
            setTimeout(() => done?.(), 20);
          }
        })
      );
      timer.add(
        new Task({ id: 'immediate', tickDelay: 2, totalRuns: 1, immediate: true, callback: noop })
      );
      timer.add(
        new Task({
          id: 'promise',
          tickDelay: 3,
          totalRuns: 1,
          callback: (): Promise<unknown> => getPromise(true, 20)
        })
      );
      timer.add(
        new Task({ id: 'disabled', enabled: false, tickDelay: 2, totalRuns: 1, callback: noop })
      );

      timer.on(TaskTimer.Event.TASK_COMPLETED, (e: ITaskTimerEvent) => {
        const task = e.data as Task;
        if (task.id === 'promise') {
          try {
            // the disabled task must never have run
            expect(timer.taskRunCount).toBe(4);
            timer.stop();
            resolve();
          } catch (err) {
            reject(err);
          }
        }
      });
      timer.start();
    }));

  it('emits taskError for a throwing callback', () =>
    new Promise<void>((resolve, reject) => {
      const timer = new TaskTimer(40);
      const taskError = new Error('boom');
      const task = new Task({
        id: 'err',
        totalRuns: 1,
        callback(): void {
          throw taskError;
        }
      });
      timer.add(task);
      timer.on(TaskTimer.Event.TASK_ERROR, (e: ITaskTimerEvent) => {
        try {
          expect(e.source).toBe(task);
          expect(e.error).toBe(taskError);
          timer.stop();
          resolve();
        } catch (err) {
          reject(err);
        }
      });
      timer.start();
    }));

  it('emits taskError for a rejected Promise', () =>
    new Promise<void>((resolve, reject) => {
      const timer = new TaskTimer(40);
      const taskError = new Error('rejected');
      const task = new Task({
        id: 'err-promise',
        totalRuns: 1,
        callback: (): Promise<unknown> => getPromise(taskError, 15)
      });
      timer.add(task);
      timer.on(TaskTimer.Event.TASK_ERROR, (e: ITaskTimerEvent) => {
        try {
          expect(e.error).toBe(taskError);
          timer.stop();
          resolve();
        } catch (err) {
          reject(err);
        }
      });
      timer.start();
    }));
});

describe('TaskTimer precision', () => {
  it('runs on schedule with precision disabled', () =>
    new Promise<void>((resolve, reject) => {
      const timer = new TaskTimer({ interval: 50, precision: false, stopOnCompleted: true });
      timer.add({
        totalRuns: 3,
        callback(): void {
          block(60);
        }
      });
      timer.on(TaskTimer.Event.STOPPED, () => {
        try {
          expect(timer.taskRunCount).toBe(3);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
      timer.start();
    }));

  it('catches up with setImmediate when blocked (precision enabled)', () =>
    new Promise<void>((resolve, reject) => {
      const totalRuns = 6;
      const interval = 40;
      const timer = new TaskTimer({ interval, precision: true, stopOnCompleted: true });
      let n = 0;
      timer.add({
        totalRuns,
        removeOnCompleted: true,
        callback(): void {
          n++;
          // block longer than the interval except on runs 3 and 5, so those
          // two have to catch up via setImmediate.
          if (n !== 3 && n !== 5) block(interval + 30);
        }
      });
      timer.on(TaskTimer.Event.COMPLETED, () => {
        try {
          expect(timer.taskRunCount).toBe(totalRuns);
        } catch (err) {
          reject(err);
        }
      });
      timer.on(TaskTimer.Event.STOPPED, () => {
        try {
          // removeOnCompleted removes the task after stop() returns, so it is
          // still present while the STOPPED event fires.
          expect(timer.taskCount).toBe(1);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
      timer.start();
    }));
});

describe('TaskTimer scheduling & timing details', () => {
  it('honors tickDelay and tickInterval for the first run', () =>
    new Promise<void>((resolve, reject) => {
      // tickDelay 2, tickInterval 3 → first eligible tick is 5:
      // tickCount(5) > tickDelay(2) and (5 - 2) % 3 === 0.
      const timer = new TaskTimer({ interval: 30, stopOnCompleted: true });
      timer.add({
        id: 's',
        tickDelay: 2,
        tickInterval: 3,
        totalRuns: 1,
        callback(task: Task): void {
          try {
            expect(task.currentRuns).toBe(1);
            expect(timer.tickCount).toBe(5);
          } catch (err) {
            reject(err);
          }
        }
      });
      timer.on(TaskTimer.Event.STOPPED, () => resolve());
      timer.start();
    }));

  it('freezes a task time window: started is the first run, stopped the last', () =>
    new Promise<void>((resolve, reject) => {
      const interval = 40;
      const timer = new TaskTimer({ interval, stopOnCompleted: true });
      timer.add({ id: 'm', tickInterval: 1, totalRuns: 3, callback: noop });
      timer.on(TaskTimer.Event.TASK_COMPLETED, (e: ITaskTimerEvent) => {
        const t = (e.data as Task).time;
        try {
          // ~2 intervals between first and last of 3 runs → elapsed clearly > 0
          expect(t.started).toBeGreaterThan(0);
          expect(t.stopped).toBeGreaterThanOrEqual(t.started);
          expect(t.elapsed).toBeGreaterThan(interval);
          timer.stop();
          resolve();
        } catch (err) {
          reject(err);
        }
      });
      timer.start();
    }));

  it('reports a growing elapsed time while running', () =>
    new Promise<void>((resolve, reject) => {
      const timer = new TaskTimer(30);
      timer.add({ id: 't', callback: noop });
      timer.on(TaskTimer.Event.TICK, () => {
        try {
          if (timer.tickCount === 2) {
            expect(timer.state).toBe(TaskTimer.State.RUNNING);
            expect(timer.time.stopped).toBe(0);
            // elapsed is measured live (not frozen) while running
            expect(timer.time.elapsed).toBeGreaterThan(0);
            timer.stop();
            resolve();
          }
        } catch (err) {
          reject(err);
        }
      });
      timer.start();
    }));

  it('runs an immediate task after a same-tick synchronous task', () =>
    new Promise<void>((resolve, reject) => {
      const order: string[] = [];
      const timer = new TaskTimer(40);
      // immediate task is registered first but should run last on the tick.
      timer.add({
        id: 'imm',
        immediate: true,
        totalRuns: 1,
        callback: (): void => {
          order.push('imm');
        }
      });
      timer.add({
        id: 'sync',
        totalRuns: 1,
        callback: (): void => {
          order.push('sync');
        }
      });
      timer.on(TaskTimer.Event.TASK_COMPLETED, (e: ITaskTimerEvent) => {
        if ((e.data as Task).id === 'imm') {
          try {
            expect(order).toEqual(['sync', 'imm']);
            timer.stop();
            resolve();
          } catch (err) {
            reject(err);
          }
        }
      });
      timer.start();
    }));

  it('does not complete a done()-style task until done() is called', () =>
    new Promise<void>((resolve, reject) => {
      const timer = new TaskTimer(30);
      let completed = false;
      // 2-arg callback that never calls done(): the task must stay incomplete.
      timer.add({
        id: 'pending',
        totalRuns: 1,
        callback: (_t: Task, _done?: () => void): void => undefined
      });
      timer.on(TaskTimer.Event.TASK_COMPLETED, () => {
        completed = true;
      });
      timer.start();
      setTimeout(() => {
        try {
          expect(completed).toBe(false);
          timer.stop();
          resolve();
        } catch (err) {
          reject(err);
        }
      }, 200);
    }));

  it('stops scheduling further ticks after stop()', () =>
    new Promise<void>((resolve, reject) => {
      const timer = new TaskTimer(30);
      timer.add({ id: 't', callback: noop });
      timer.on(TaskTimer.Event.TICK, () => {
        if (timer.tickCount === 2) {
          timer.stop();
          const frozen = timer.tickCount;
          setTimeout(() => {
            try {
              expect(timer.tickCount).toBe(frozen);
              expect(timer.state).toBe(TaskTimer.State.STOPPED);
              resolve();
            } catch (err) {
              reject(err);
            }
          }, 120);
        }
      });
      timer.start();
    }));

  it('does not stop after completion unless stopOnCompleted is set', () =>
    new Promise<void>((resolve, reject) => {
      const timer = new TaskTimer(30); // stopOnCompleted defaults to false
      let completedAt = 0;
      timer.add({ id: 'one', tickInterval: 1, totalRuns: 1, callback: noop });
      timer.on(TaskTimer.Event.COMPLETED, () => {
        completedAt = timer.tickCount;
      });
      timer.start();
      // check well after completion: the timer must keep ticking (not stop).
      setTimeout(() => {
        try {
          expect(completedAt).toBeGreaterThan(0);
          expect(timer.state).toBe(TaskTimer.State.RUNNING);
          expect(timer.tickCount).toBeGreaterThan(completedAt);
          timer.stop();
          resolve();
        } catch (err) {
          reject(err);
        }
      }, 150);
    }));

  it('keeps completion accounting correct when a completed task is removed', () =>
    new Promise<void>((resolve, reject) => {
      const timer = new TaskTimer({ interval: 30, stopOnCompleted: true });
      // 'a' completes first and removes itself (decrementing the completed
      // count); 'b' completing later must still trigger COMPLETED.
      timer.add({
        id: 'a',
        tickInterval: 1,
        totalRuns: 1,
        removeOnCompleted: true,
        callback: noop
      });
      timer.add({ id: 'b', tickInterval: 1, totalRuns: 3, callback: noop });
      timer.on(TaskTimer.Event.COMPLETED, () => {
        try {
          expect(timer.taskRunCount).toBe(4);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
      timer.start();
    }));
});
