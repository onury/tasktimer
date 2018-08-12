'use strict';

import { TaskTimer, Task, ITaskOptions, ITaskTimerEvent } from '../../src';

/**
 *  TaskTimer Test Suite for Node/TypeScript.
 */
describe('TaskTimer (Node/TypeScript)', () => {

    const interval = 500;

    test('structure', () => {
        expect(TaskTimer.State).toEqual(expect.any(Object));
        expect(TaskTimer.EventType).toEqual(expect.any(Object));
        expect(TaskTimer.Task).toEqual(Task);
    });

    test.only('options & defaults', () => {
        let timer = new TaskTimer();
        expect(timer.interval).toEqual(1000);
        expect(timer.stopOnCompleted).toEqual(false);

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
            name: 'my-task',
            callback: () => {}
        });
        expect(task.enabled).toEqual(true);
        expect(task.name).toEqual('my-task');
        expect(task.tickDelay).toEqual(0);
        expect(task.tickInterval).toEqual(1);
        expect(task.totalRuns).toEqual(null);

        task = timer.add({ callback: () => {} }).get('task-1');
        expect(task.enabled).toEqual(true);
        expect(task.name).toEqual('task-1');
        expect(task.tickDelay).toEqual(0);
        expect(task.tickInterval).toEqual(1);
        expect(task.totalRuns).toEqual(null);

        const callback = (o) => o;
        task = new Task({
            name: 'my-task-2',
            enabled: false,
            tickDelay: 10,
            tickInterval: 5,
            totalRuns: 3,
            callback
        });
        expect(task.enabled).toEqual(false);
        expect(task.name).toEqual('my-task-2');
        expect(task.tickDelay).toEqual(10);
        expect(task.tickInterval).toEqual(5);
        expect(task.totalRuns).toEqual(3);
        expect(task.callback).toEqual(callback);
    });

    test('timer states', () => {
        const timer = new TaskTimer(interval);
        expect(timer.state).toEqual(TaskTimer.State.IDLE);
        timer.start();
        expect(timer.state).toEqual(TaskTimer.State.RUNNING);
        timer.pause();
        expect(timer.state).toEqual(TaskTimer.State.PAUSED);
        timer.resume();
        expect(timer.state).toEqual(TaskTimer.State.RUNNING);
        timer.stop();
        expect(timer.state).toEqual(TaskTimer.State.STOPPED);
        timer.reset();
        expect(timer.state).toEqual(TaskTimer.State.IDLE);
    });

    test('add/remove task', (done) => {
        const timer = new TaskTimer(interval);
        expect(timer.taskCount).toEqual(0);

        const task1Opts: ITaskOptions = {
            name: 'heartbeat',
            tickInterval: 2,
            totalRuns: 3,
            callback(task: Task) {
                console.log(task.name + ' task has run ' + task.currentRuns + ' times');
                expect(task.name).toEqual('heartbeat');
                expect(task.tickInterval).toEqual(task1Opts.tickInterval);
                expect(task.totalRuns).toEqual(task1Opts.totalRuns);
                expect(task.currentRuns <= task.totalRuns).toBeTruthy();
                expect(timer.time.stopped).toEqual(0);
                let i = task1Opts.tickInterval * task.currentRuns;
                expect(timer.time.elapsed >= i * interval).toBeTruthy();
                expect(timer.time.elapsed < (i + 1) * interval).toBeTruthy();
            }
        };
        timer.add(task1Opts);
        expect(timer.taskCount).toEqual(1);

        const task2: Task = new Task({
            name: 'final-check',
            tickInterval: 7,
            totalRuns: 1,
            callback: function (task) {
                console.log(task.name + ' task has run ' + task.currentRuns + ' times.');
                expect(timer.tickCount).toEqual(7);
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
        });
        timer.add(task2);
        expect(timer.taskCount).toEqual(2);
        timer.start();
    });

    test('events', (done) => {
        const timer = new TaskTimer(interval);
        const autoTaskName = 'task-1';
        timer
            .reset()
            .on(TaskTimer.EventType.STARTED, (event: ITaskTimerEvent) => {
                expect(event.type).toEqual(TaskTimer.EventType.STARTED);
                console.log('>>> started');
            })
            .on(TaskTimer.EventType.TICK, (event: ITaskTimerEvent) => {
                expect(event.type).toEqual(TaskTimer.EventType.TICK);
                // expect(event.source).toEqual(timer);
                expect(event.data).toBeUndefined();
                console.log('>>> tick', timer.tickCount);
                if (timer.tickCount === 3) {
                    timer.add(() => {});
                    console.log((timer as any)._.tasks);
                    expect(timer.get(autoTaskName)).toBeDefined();
                }
            })
            .on(TaskTimer.EventType.TASK_ADDED, (event: ITaskTimerEvent) => {
                expect(event.type).toEqual(TaskTimer.EventType.TASK_ADDED);
                expect(timer.taskCount).toEqual(1);
                const task = event.data as Task;
                expect(task).toBeDefined();
                if (task) {
                    console.log('>>> taskAdded', JSON.stringify(task));
                    expect(task.name).toEqual(autoTaskName);
                    expect(task.tickInterval).toEqual(1);
                    expect(task.totalRuns).toEqual(0);
                    expect(typeof task.callback).toEqual('function');
                }
            })
            .on(TaskTimer.EventType.TASK, (event: ITaskTimerEvent) => {
                expect(event.type).toEqual(TaskTimer.EventType.TASK);
                expect(timer.taskCount).toEqual(1);
                const task = event.data as Task;
                expect(task).toBeDefined();
                if (task) {
                    console.log('>>> task (executed)', JSON.stringify(task));
                    expect(task.name).toEqual(autoTaskName);
                    expect(task.tickInterval).toEqual(1);
                    expect(task.totalRuns).toEqual(0);
                    expect(typeof task.callback).toEqual('function');
                }
                timer.remove(autoTaskName);
            })
            .on(TaskTimer.EventType.TASK_REMOVED, (event: ITaskTimerEvent) => {
                expect(event.type).toEqual(TaskTimer.EventType.TASK_REMOVED);
                expect(timer.taskCount).toEqual(0);
                const task = event.data as Task;
                expect(task).toBeDefined();
                if (task) {
                    console.log('>>> taskRemoved', JSON.stringify(task));
                    expect(task.name).toEqual(autoTaskName);
                    expect(task.tickInterval).toEqual(1);
                    expect(task.totalRuns).toEqual(0);
                    expect(typeof task.callback).toEqual('function');
                }
                timer.pause();
            })
            .on(TaskTimer.EventType.PAUSED, (event: ITaskTimerEvent) => {
                expect(event.type).toEqual(TaskTimer.EventType.PAUSED);
                expect(timer.tickCount).toEqual(3);
                console.log('>>> paused');
                timer.resume();
            })
            .on(TaskTimer.EventType.RESUMED, (event: ITaskTimerEvent) => {
                expect(event.type).toEqual(TaskTimer.EventType.RESUMED);
                console.log('>>> resumed');
                timer.stop();
            })
            .on(TaskTimer.EventType.STOPPED, (event: ITaskTimerEvent) => {
                expect(event.type).toEqual(TaskTimer.EventType.STOPPED);
                console.log('>>> stopped');
                timer.reset();
            })
            .on(TaskTimer.EventType.RESET, (event: ITaskTimerEvent) => {
                expect(event.type).toEqual(TaskTimer.EventType.RESET);
                console.log('>>> reset');
                done();
            });
        timer.start();
        expect(timer.state).toEqual(TaskTimer.State.RUNNING);
        console.log('>>> running');
        expect(timer.listenerCount(TaskTimer.EventType.RESET)).toEqual(1);
    });

    test.only('task array, stopOnCompleted', (done) => {
        const timer = new TaskTimer({
            interval: 500,
            stopOnCompleted: true
        });
        const tasks: ITaskOptions[] = [
            {
                totalRuns: 2,
                callback() { }
            },
            {
                totalRuns: 5,
                callback() { }
            },
        ];
        timer.add(tasks);
        expect(timer.taskCount).toEqual(tasks.length);

        timer.on('tick', () => {
            if (timer.tickCount === 2) {
                expect(timer.state).toEqual(TaskTimer.State.RUNNING);
            }
            if (timer.tickCount === 5) {
                expect(timer.state).toEqual(TaskTimer.State.STOPPED);
            }
        });
        timer.on(TaskTimer.EventType.STOPPED, () => done());
        timer.start();
    }, 7000); // set a larger timeout for jest/jasmine

});
