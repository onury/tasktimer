/* tslint:disable:no-empty max-file-line-count */

import { ITaskOptions, ITaskTimerEvent, Task, TaskTimer } from '../../src';

/**
 *  TaskTimer Test Suite for Node/TypeScript.
 */
describe('TaskTimer (Node/TypeScript)', () => {

    test('TaskTimer namespace', () => {
        expect(TaskTimer.State).toEqual(expect.any(Object));
        expect(TaskTimer.Event).toEqual(expect.any(Object));
        expect(TaskTimer.Task).toEqual(Task);
    });

    test('ITaskTimerOptions, ITaskOptions, defaults', () => {
        let timer = new TaskTimer();
        expect(timer.interval).toEqual(1000);
        expect(timer.stopOnCompleted).toEqual(false);
        expect(timer.time).toEqual({ started: 0, stopped: 0, elapsed: 0 });

        timer = new TaskTimer({
            interval: 2500,
            stopOnCompleted: true
        });
        expect(timer.interval).toEqual(2500);
        expect(timer.stopOnCompleted).toEqual(true);

        // name is required if constructing Task instance.
        expect(() => new Task({ callback: () => {} })).toThrow();
        // name is NOT required if creating via TaskTimer#add()
        expect(() => timer.add({ callback: () => {} })).not.toThrow();

        let task = new Task({
            id: 'my-task',
            callback: () => {}
        });
        expect(task.enabled).toEqual(true);
        expect(task.id).toEqual('my-task');
        expect(task.tickDelay).toEqual(0);
        expect(task.tickInterval).toEqual(1);
        expect(task.totalRuns).toEqual(null);
        expect(task.removeOnCompleted).toEqual(false);
        expect(task.immediate).toEqual(false);

        task = timer.add({ callback: () => {} }).get('task1');
        expect(task.enabled).toEqual(true);
        expect(task.id).toEqual('task1');
        expect(task.tickDelay).toEqual(0);
        expect(task.tickInterval).toEqual(1);
        expect(task.totalRuns).toEqual(null);
        expect(task.removeOnCompleted).toEqual(false);
        expect(task.immediate).toEqual(false);

        const callback = o => o;
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
        expect(task.enabled).toEqual(false);
        expect(task.id).toEqual('my-task-2');
        expect(task.tickDelay).toEqual(10);
        expect(task.tickInterval).toEqual(5);
        expect(task.totalRuns).toEqual(3);
        expect(task.removeOnCompleted).toEqual(true);
        expect(task.immediate).toEqual(true);
        expect(task.callback).toEqual(callback);
    });

    test('TaskTimer » .State, #start(), #pause(), #resume(), #stop(), #reset()', () => {
        const timer = new TaskTimer(500);
        expect(timer.state).toEqual(TaskTimer.State.IDLE);
        timer.start();
        expect(timer.state).toEqual(TaskTimer.State.RUNNING);
        timer.pause();
        expect(timer.state).toEqual(TaskTimer.State.PAUSED);
        timer.resume();
        expect(timer.state).toEqual(TaskTimer.State.RUNNING);
        timer.resume();
        expect(timer.state).toEqual(TaskTimer.State.RUNNING);
        timer.stop();
        expect(timer.state).toEqual(TaskTimer.State.STOPPED);
        timer.reset();
        expect(timer.state).toEqual(TaskTimer.State.IDLE);
    });

    test('TaskTimer » #add(), #remove()', (done: Function) => {
        const interval = 500;
        const timer = new TaskTimer(interval);
        expect(timer.taskCount).toEqual(0);

        const task1Opts: ITaskOptions = {
            id: 'heartbeat',
            tickInterval: 2,
            totalRuns: 2,
            callback(task: Task): void {
                console.log(task.id + ' task has run ' + task.currentRuns + ' times @ ', timer.time.elapsed);
                expect(task.id).toEqual('heartbeat');
                expect(timer.tickCount % 2).toEqual(0);
                expect(task.tickInterval).toEqual(task1Opts.tickInterval);
                expect(task.totalRuns).toEqual(task1Opts.totalRuns);
                expect(task.currentRuns <= task.totalRuns).toBeTruthy();
                expect(timer.time.stopped).toEqual(0);
                const i = task.tickInterval * task.currentRuns;
                expect(timer.time.elapsed).toBeGreaterThanOrEqual(i * interval);
                expect(timer.time.elapsed).toBeLessThanOrEqual((i + 1) * interval);
            }
        };
        timer.add(task1Opts);
        expect(timer.taskCount).toEqual(1);

        const task2: Task = new Task({
            id: 'remove-check',
            tickInterval: 5,
            totalRuns: 1,
            removeOnCompleted: true,
            callback(task: Task): void {
                console.log(task.id + ' task has run ' + task.currentRuns + ' times.');
                expect(timer.tickCount).toEqual(5);
                expect(timer.get('remove-check')).not.toEqual(null);
            }
        });
        timer.add(task2);
        expect(timer.taskCount).toEqual(2);

        const task3: ITaskOptions = {
            id: 'final-check',
            tickInterval: 7,
            totalRuns: 1,
            callback(task: Task): void {
                console.log(task.id + ' task has run ' + task.currentRuns + ' times.');
                expect(timer.tickCount).toEqual(7);

                expect(timer.get('remove-check')).toEqual(null);
                expect(timer.taskCount).toEqual(2);
                timer.remove('heartbeat');
                expect(timer.taskCount).toEqual(1);

                timer.stop();
                expect(timer.state).toEqual(TaskTimer.State.STOPPED);
                expect(timer.time.stopped).not.toEqual(0);
                timer.reset();
                expect(timer.taskCount).toEqual(0);
                expect(timer.state).toEqual(TaskTimer.State.IDLE);

                done();
            }
        };
        timer.add(task3);
        expect(timer.taskCount).toEqual(3);

        // cannot add a task with existing id
        const t1 = {
            id: task1Opts.id,
            callback(): void {}
        };
        expect(() => timer.add(t1)).toThrow();
        // cannot add a task without a callback
        const t2: any = {
            id: 'no-callback'
        };
        expect(() => timer.add(t2)).toThrow();
        expect(() => timer.add(null)).toThrow();
        // cannot remove non-existing task
        expect(() => timer.remove('non-existing-task')).toThrow();

        timer.start();
    });

    test('ITaskTimerEvent', (done: Function) => {
        const timer = new TaskTimer(500);
        const taskComp: ITaskOptions = {
            id: 'check-task-completed',
            totalRuns: 2,
            callback: () => { }
        };
        // second task will be added without name set.
        // it should be generated as "task2".
        const autoTaskID = 'task2';
        const executedEvents: TaskTimer.Event[] = [];

        // pause should do nothing if not running
        expect(() => timer.pause()).not.toThrow();

        timer
            .reset()
            .on(TaskTimer.Event.STARTED, (event: ITaskTimerEvent) => {
                executedEvents.push(event.name);
                expect(event.name).toEqual(TaskTimer.Event.STARTED);
                expect(event.source instanceof TaskTimer).toEqual(true);
                console.log('——» started');
            })
            .on(TaskTimer.Event.TICK, (event: ITaskTimerEvent) => {
                executedEvents.push(event.name);
                expect(event.name).toEqual(TaskTimer.Event.TICK);
                expect(event.source).toEqual(timer);
                expect(event.data).toBeUndefined();
                console.log('——» tick', timer.tickCount);
                if (timer.tickCount === 2) {
                    timer.add(taskComp);
                    expect(timer.get(taskComp.id)).not.toBe(null);
                    expect(timer.taskCount).toEqual(1);
                }
                if (timer.tickCount === 3) {
                    timer.add(() => {});
                    // console.log((timer as any)._.tasks);
                    expect(timer.get(autoTaskID)).not.toBe(null);
                    expect(timer.taskCount).toEqual(2);
                }
            })
            .on(TaskTimer.Event.TASK_ADDED, (event: ITaskTimerEvent) => {
                executedEvents.push(event.name);
                expect(event.name).toEqual(TaskTimer.Event.TASK_ADDED);
                expect(event.source instanceof TaskTimer).toEqual(true);
                expect(event.data instanceof Task).toEqual(true);
                const task = event.data as Task;
                console.log('——» taskAdded', JSON.stringify(task));
                expect(task.tickInterval).toEqual(1);
                expect(typeof task.callback).toEqual('function');
                if (task.id === taskComp.id) {
                    expect(timer.tickCount).toEqual(2);
                    expect(task.totalRuns).toEqual(taskComp.totalRuns);
                    expect(timer.taskCount).toEqual(1);
                } else {
                    expect(task.id).toEqual(autoTaskID);
                    expect(timer.tickCount).toEqual(3);
                    expect(task.totalRuns).toEqual(null);
                    expect(timer.taskCount).toEqual(2);
                }
            })
            .on(TaskTimer.Event.TASK, (event: ITaskTimerEvent) => {
                executedEvents.push(event.name);
                expect(event.name).toEqual(TaskTimer.Event.TASK);
                expect(event.source instanceof TaskTimer).toEqual(true);
                expect(event.data instanceof Task).toEqual(true);
                const task = event.data as Task;
                expect(task).toBeDefined();
                console.log('——» task (executed)', JSON.stringify(task));
            })
            .on(TaskTimer.Event.TASK_COMPLETED, (event: ITaskTimerEvent) => {
                executedEvents.push(event.name);
                expect(event.name).toEqual(TaskTimer.Event.TASK_COMPLETED);
                expect(event.source instanceof TaskTimer).toEqual(true);
                expect(event.data instanceof Task).toEqual(true);
                expect(timer.taskCount).toEqual(2);
                const task = event.data as Task;
                expect(task).toBeDefined();
                console.log('——» taskCompleted', JSON.stringify(task));
                expect(task.id).toEqual(taskComp.id);
                timer.remove(autoTaskID);
            })
            .on(TaskTimer.Event.TASK_REMOVED, (event: ITaskTimerEvent) => {
                executedEvents.push(event.name);
                expect(event.name).toEqual(TaskTimer.Event.TASK_REMOVED);
                expect(event.source instanceof TaskTimer).toEqual(true);
                expect(event.data instanceof Task).toEqual(true);
                expect(timer.taskCount).toEqual(1);
                const task = event.data as Task;
                expect(task).toBeDefined();
                console.log('——» taskRemoved', JSON.stringify(task));
                expect(task.id).toEqual(autoTaskID);
                expect(timer.get(autoTaskID)).toEqual(null);
                timer.pause();
            })
            .on(TaskTimer.Event.PAUSED, (event: ITaskTimerEvent) => {
                executedEvents.push(event.name);
                expect(event.name).toEqual(TaskTimer.Event.PAUSED);
                expect(event.source instanceof TaskTimer).toEqual(true);
                console.log('——» paused');
                timer.resume();
            })
            .on(TaskTimer.Event.RESUMED, (event: ITaskTimerEvent) => {
                executedEvents.push(event.name);
                expect(event.name).toEqual(TaskTimer.Event.RESUMED);
                expect(event.source instanceof TaskTimer).toEqual(true);
                console.log('——» resumed');
                timer.stop();
            })
            .on(TaskTimer.Event.STOPPED, (event: ITaskTimerEvent) => {
                executedEvents.push(event.name);
                expect(event.name).toEqual(TaskTimer.Event.STOPPED);
                expect(event.source instanceof TaskTimer).toEqual(true);
                console.log('——» stopped');
                timer.reset();
            })
            .on(TaskTimer.Event.STOPPED, (event: ITaskTimerEvent) => {
                // second event listener for "stopped"
                executedEvents.push(event.name);
                expect(event.source instanceof TaskTimer).toEqual(true);
            })
            .on(TaskTimer.Event.RESET, (event: ITaskTimerEvent) => {
                try {
                    executedEvents.push(event.name);
                    expect(event.name).toEqual(TaskTimer.Event.RESET);
                    expect(event.source instanceof TaskTimer).toEqual(true);
                    expect(timer.runCount).toEqual(2);
                    console.log('——» reset');
                    checkEvents();
                } catch (err) {
                    console.log(err.stack || err);
                }
                done();
            });

        function checkEvents(): void {
            expect(executedEvents).toContain(TaskTimer.Event.STARTED);
            expect(timer.listenerCount(TaskTimer.Event.STARTED)).toEqual(1);

            expect(executedEvents).toContain(TaskTimer.Event.TICK);
            expect(timer.listenerCount(TaskTimer.Event.TICK)).toEqual(1);

            expect(executedEvents).toContain(TaskTimer.Event.TASK_ADDED);
            expect(timer.listenerCount(TaskTimer.Event.TASK_ADDED)).toEqual(1);

            expect(executedEvents).toContain(TaskTimer.Event.TASK);
            expect(timer.listenerCount(TaskTimer.Event.TASK)).toEqual(1);

            expect(executedEvents).toContain(TaskTimer.Event.TASK_COMPLETED);
            expect(timer.listenerCount(TaskTimer.Event.TASK_COMPLETED)).toEqual(1);

            expect(executedEvents).toContain(TaskTimer.Event.TASK_REMOVED);
            expect(timer.listenerCount(TaskTimer.Event.TASK_REMOVED)).toEqual(1);

            expect(executedEvents).toContain(TaskTimer.Event.PAUSED);
            expect(timer.listenerCount(TaskTimer.Event.PAUSED)).toEqual(1);

            expect(executedEvents).toContain(TaskTimer.Event.RESUMED);
            expect(timer.listenerCount(TaskTimer.Event.RESUMED)).toEqual(1);

            expect(executedEvents).toContain(TaskTimer.Event.STOPPED);
            expect(timer.listenerCount(TaskTimer.Event.STOPPED)).toEqual(2);

            expect(executedEvents).toContain(TaskTimer.Event.RESET);
            expect(timer.listenerCount(TaskTimer.Event.RESET)).toEqual(1);
        }

        timer.start();
        expect(timer.state).toEqual(TaskTimer.State.RUNNING);
        console.log('——» running');
    });

    test('Task[], ITaskTimerOptions #stopOnCompleted', (done: any) => {
        const timer = new TaskTimer({
            interval: 500,
            stopOnCompleted: true
        });
        const tasks: ITaskOptions[] = [
            {
                totalRuns: 2,
                callback(): void { }
            },
            {
                totalRuns: 5,
                callback(): void { }
            }
        ];
        timer.add(tasks);
        expect(timer.taskCount).toEqual(tasks.length);

        timer.on('tick', (event: ITaskTimerEvent) => {
            // console.log('timer.tickCount:', timer.tickCount, 'timer.taskRunCount:', timer.taskRunCount);
            if (timer.tickCount === 2) {
                expect(timer.state).toEqual(TaskTimer.State.RUNNING);
                expect(event.name).toEqual(TaskTimer.Event.TICK);
                expect(event.source instanceof TaskTimer).toEqual(true);
            }
        });
        // tslint:disable:no-unnecessary-callback-wrapper
        timer.on(TaskTimer.Event.STOPPED, (event: ITaskTimerEvent) => {
            try {
                expect(timer.state).toEqual(TaskTimer.State.STOPPED);
                expect(event.name).toEqual(TaskTimer.Event.STOPPED);
                expect(event.source instanceof TaskTimer).toEqual(true);
                expect(timer.taskRunCount).toEqual(7);
                expect(timer.runCount).toEqual(1);
            } catch (err) {
                console.log(err.stack || err);
            }
            done();
        });
        // calling resume() instead of start() which should be equivalent if not
        // already paused.
        timer.resume();
    }, 7000); // set a larger timeout for jest/jasmine

    test('ITaskOptions » startDate/stopDate cannot be the same', () => {
        const timer = new TaskTimer(500);
        const date = Date.now();
        const add = () => timer.add({
            id: 'task-date',
            startDate: new Date(date),
            stopDate: new Date(date),
            tickInterval: 1,
            callback(): void {}
        });

        expect(add).toThrow();
    });

    test('ITaskOptions #startDate, #stopDate', (done: any) => {
        const timer = new TaskTimer({
            interval: 500,
            stopOnCompleted: true
        });
        const date = Date.now();
        const startDate = new Date(date);
        const stopDate = new Date(date);
        startDate.setSeconds(startDate.getSeconds() + 5);
        stopDate.setSeconds(stopDate.getSeconds() + 10);
        timer.add({
            id: 'task-date',
            startDate,
            stopDate,
            tickInterval: 1,
            callback(task: Task): void {
                if (task.currentRuns === 1) {
                    expect(Date.now() - startDate.getTime()).toBeLessThan(1000);
                }
                console.log('currentRuns:', task.currentRuns, ' run date:', new Date().toISOString());
            }
        });

        const taskD = timer.get('task-date');
        expect(taskD.completed).toEqual(false);
        expect(taskD.time.started).toEqual(0);
        expect(taskD.time.stopped).toEqual(0);
        expect(taskD.time.elapsed).toEqual(0);

        timer.on(TaskTimer.Event.TASK_COMPLETED, (event: ITaskTimerEvent) => {
            const task: Task = event.data as Task;
            try {
                expect(task instanceof Task).toEqual(true);
                expect(task.completed).toEqual(true);
                expect(timer.get('task-date').completed).toEqual(true);
                expect(task.currentRuns).toEqual(11); // one per 500ms in 5 seconds
                const elapsed = task.time.stopped - task.time.started;
                expect(task.time.elapsed).toEqual(elapsed);
                timer.stop();
            } catch (err) {
                console.log(err.stack || err);
            }
            done();
        });
        timer.start();
        console.log('timer started @', new Date().toISOString());
        console.log('task startDate @', startDate.toISOString());
        console.log('task stopDate @', stopDate.toISOString());
    }, 15000); // set a larger timeout for jest/jasmine

    test('Task » #reset()', (done: any) => {
        const timer = new TaskTimer(500);
        const task = new Task({
            id: 'task-to-reset',
            tickInterval: 1,
            totalRuns: 3,
            callback(): void { }
        });
        timer.add(task);

        timer.on(TaskTimer.Event.TICK, (event: ITaskTimerEvent) => {
            try {
                if (timer.tickCount < 3) {
                    console.log('will reset task on tick 3 » tick', timer.tickCount);
                } else if (timer.tickCount === 3) {
                    expect(task.currentRuns).toEqual(2);
                    expect(() => task.reset({ id: 'cannot-change' } as any)).toThrow();
                    task.reset();
                    console.log('task is reset!');
                } else if (timer.tickCount === 5) {
                    expect(task.currentRuns).toEqual(2);
                    task.reset({
                        totalRuns: 2,
                        callback(): void {}
                    });
                    console.log('task is reset with options!');
                } else {
                    console.log('after task reset » tick', timer.tickCount);
                }
            } catch (err) {
                console.log(err.stack || err);
            }
        });

        timer.on(TaskTimer.Event.TASK_COMPLETED, (event: ITaskTimerEvent) => {
            expect(task.totalRuns).toEqual(2);
            expect(task.currentRuns).toEqual(2);
            timer.stop();
        });

        timer.on(TaskTimer.Event.STOPPED, (event: ITaskTimerEvent) => {
            try {
                expect(timer.taskCount).toEqual(1);
                expect(timer.tickCount).toEqual(6);
                expect(timer.taskRunCount).toEqual(6);
            } catch (err) {
                console.log(err.stack || err);
            }
            done();
        });

        timer.start();
    }, 10000);

    test('TaskCallback » sync, async + immediate, async (done()), promise', (done: any) => {
        const timer = new TaskTimer(500);
        const taskSync = new Task({
            id: 'task-sync',
            tickInterval: 1,
            totalRuns: 1,
            callback(): void {}
        });
        timer.add(taskSync);
        const taskAsync = new Task({
            id: 'task-async',
            tickDelay: 2,
            tickInterval: 1,
            totalRuns: 1,
            callback(task: Task, taskDone: any): void {
                setTimeout(() => taskDone(), 100);
            }
        });
        timer.add(taskAsync);
        const taskAsyncImmediate = new Task({
            id: 'task-sync-immediate',
            tickDelay: 2,
            tickInterval: 1,
            totalRuns: 1,
            immediate: true,
            callback(): void { }
        });
        timer.add(taskAsyncImmediate);
        const taskPromise = new Task({
            id: 'task-promise',
            tickDelay: 3,
            tickInterval: 1,
            totalRuns: 1,
            callback(): Promise<any> {
                return getPromise(true);
            }
        });
        timer.add(taskPromise);
        const taskDisabled = new Task({
            id: 'task-disabled',
            enabled: false,
            tickDelay: 2,
            tickInterval: 1,
            totalRuns: 1,
            callback(): void {}
        });
        timer.add(taskDisabled);

        let firstAsync = null;
        timer.on(TaskTimer.Event.TASK_COMPLETED, (event: ITaskTimerEvent) => {
            try {
                const task: Task = event.data;
                console.log(task.id, 'completed on tick #', timer.tickCount);
                if (timer.tickCount === 1) {
                    expect(task.id).toEqual(taskSync.id);
                } else if (timer.tickCount === 3) {
                    // taskAsyncImmediate should run/complete before taskAsync
                    if (!firstAsync) {
                        expect(task.id).toEqual(taskAsyncImmediate.id);
                        firstAsync = task;
                    } else {
                        expect(task.id).toEqual(taskAsync.id);
                    }
                } else if (timer.tickCount === 4) {
                    expect(task.id).toEqual(taskPromise.id);
                    // taskDisabled should not have run
                    expect(timer.taskRunCount).toEqual(4);
                    timer.stop();
                    done();
                }
            } catch (err) {
                console.log(err.stack || err);
            }
        });
        timer.start();
    });

    test('Task » ~toJSON()', () => {
        const task = new Task({
            id: 'task-json',
            tickInterval: 1,
            totalRuns: 3,
            callback(): void { }
        });
        const o = JSON.parse(JSON.stringify(task));
        // console.log(o);
        expect(o.id).toEqual(task.id);
        expect(o.enabled).toEqual(task.enabled);
        expect(o.tickDelay).toEqual(task.tickDelay);
        expect(o.tickInterval).toEqual(task.tickInterval);
        expect(o.totalRuns).toEqual(task.totalRuns);
        expect(o.currentRuns).toEqual(task.currentRuns);
        expect(o.immediate).toEqual(task.immediate);
        expect(o.removeOnCompleted).toEqual(task.removeOnCompleted);
        expect(o.startDate).toEqual(null);
        expect(o.stopDate).toEqual(null);
        expect(o.callback).toBeUndefined();
    });

    test('TaskTimer.EventType.TASK_ERROR (sync)', (done: any) => {
        const timer = new TaskTimer(500);
        const taskError = new Error('task error');
        const task = new Task({
            id: 'task-error',
            tickInterval: 1,
            totalRuns: 1,
            callback(): void {
                throw taskError;
            }
        });
        timer.add(task);
        timer.on(TaskTimer.Event.TASK_ERROR, (event: ITaskTimerEvent) => {
            try {
                expect(event.name).toEqual(TaskTimer.Event.TASK_ERROR);
                expect(event.source).toEqual(task);
                expect(event.error).toEqual(taskError);
                timer.stop();
            } catch (err) {
                console.log(err.stack || err);
            }
            done();
        });
        timer.start();
    });

    test('TaskTimer.EventType.TASK_ERROR (promise)', (done: any) => {
        const timer = new TaskTimer(500);
        const taskError = new Error('task error');
        const task = new Task({
            id: 'task-error',
            tickInterval: 1,
            totalRuns: 1,
            callback(): Promise<any> {
                return getPromise(taskError);
            }
        });
        timer.add(task);
        timer.on(TaskTimer.Event.TASK_ERROR, (event: ITaskTimerEvent) => {
            try {
                expect(event.name).toEqual(TaskTimer.Event.TASK_ERROR);
                expect(event.source).toEqual(task);
                expect(event.error).toEqual(taskError);
                timer.stop();
            } catch (err) {
                console.log(err.stack || err);
            }
            done();
        });
        timer.start();
    });

    test('ITaskTimerOptions » #precision = false', (done: any) => {
        const interval = 500;
        const timer = new TaskTimer({
            interval,
            precision: false,
            stopOnCompleted: true
        });
        timer.add({
            tickInterval: 1,
            totalRuns: 3,
            callback(task: Task): void {
                console.log('tick @', task.currentRuns, ':', timer.time.elapsed);
                block(interval + 100);
                const mod = timer.time.elapsed % interval;
                expect(mod <= 20 || mod >= 20).toEqual(true);
            }
        });
        // tslint:disable:no-unnecessary-callback-wrapper
        timer.on(TaskTimer.Event.STOPPED, () => {
            // console.log('stop event fired');
            done();
        });
        timer.start();
    }, 5000); // set a larger timeout for jest/jasmine

    test('precision: catch up with setImmediate()', (done: any) => {
        expect.assertions(4);

        const elapsedList = [];
        const totalRuns = 10;
        const interval = 400;
        const timer = new TaskTimer({
            interval,
            precision: true,
            stopOnCompleted: true
        });
        let start;
        let cn = 0;
        timer.add({
            tickInterval: 1,
            totalRuns,
            removeOnCompleted: true,
            callback(): void {
                // if (cn >= totalRuns) done();
                cn++;
                const diff = Date.now() - start;
                elapsedList.push(diff);
                console.log('tick @', cn, ':', diff);
                // block each run with a sync operation (longer than the
                // interval) except 3rd and 6th so that these 2 use
                // setImmediate() to catch up.
                if ([3, 6].indexOf(cn) === -1) block(interval + 50);
            }
        });
        timer.on(TaskTimer.Event.STOPPED, (event: ITaskTimerEvent) => {
            console.log('stopped, task count:', timer.taskCount);
            console.log(elapsedList);
            expect(timer.taskCount).toEqual(1);
            done();
        });
        timer.on(TaskTimer.Event.COMPLETED, (event: ITaskTimerEvent) => {
            try {
                console.log('completed, run count:', timer.taskRunCount);
                expect(timer.taskRunCount).toEqual(totalRuns);
                expect(elapsedList[3] % (interval * 4)).toBeLessThan(10);
                expect(elapsedList[6] % (interval * 7)).toBeLessThan(10);
            } catch (err) {
                console.log(err.stack || err);
            }
        });
        start = Date.now();
        timer.start();
    }, 20000); // set a larger timeout for jest/jasmine

});

function block(time: number = 100): void {
    const start = Date.now();
    while (Date.now() - start < time) {}
}

function getPromise(value: any, delay: number = 100): Promise<any> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (value instanceof Error) {
                reject(value);
            } else {
                resolve(value);
            }
        }, delay);
    });
}
