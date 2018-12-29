/* tslint:disable:no-empty */

import { ITaskOptions, ITaskTimerEvent, Task, TaskTimer } from '../../src';

/**
 *  TaskTimer Test Suite for Node/TypeScript.
 */
describe('TaskTimer (Node/TypeScript)', () => {

    test('structure', () => {
        expect(TaskTimer.State).toEqual(expect.any(Object));
        expect(TaskTimer.EventType).toEqual(expect.any(Object));
        expect(TaskTimer.Task).toEqual(Task);
    });

    test('options & defaults', () => {
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

    test('timer states', () => {
        const timer = new TaskTimer(500);
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

    test('add/remove task', (done: Function) => {
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

        timer.start();
    });

    test('events', (done: Function) => {
        const timer = new TaskTimer(500);
        const taskComp: ITaskOptions = {
            id: 'check-task-completed',
            totalRuns: 2,
            callback: () => { }
        };
        // second task will be added without name set.
        // it should be generated as "task2".
        const autoTaskID = 'task2';
        const executedEvents: TaskTimer.EventType[] = [];

        timer
            .reset()
            .on(TaskTimer.EventType.STARTED, (event: ITaskTimerEvent) => {
                executedEvents.push(event.type);
                expect(event.type).toEqual(TaskTimer.EventType.STARTED);
                console.log('>>> started');
            })
            .on(TaskTimer.EventType.TICK, (event: ITaskTimerEvent) => {
                executedEvents.push(event.type);
                expect(event.type).toEqual(TaskTimer.EventType.TICK);
                expect(event.source).toEqual(timer);
                expect(event.data).toBeUndefined();
                console.log('>>> tick', timer.tickCount);
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
            .on(TaskTimer.EventType.TASK_ADDED, (event: ITaskTimerEvent) => {
                executedEvents.push(event.type);
                expect(event.type).toEqual(TaskTimer.EventType.TASK_ADDED);
                const task = event.data as Task;
                expect(task).toBeDefined();
                console.log('>>> taskAdded', JSON.stringify(task));
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
            .on(TaskTimer.EventType.TASK, (event: ITaskTimerEvent) => {
                executedEvents.push(event.type);
                expect(event.type).toEqual(TaskTimer.EventType.TASK);
                const task = event.data as Task;
                expect(task).toBeDefined();
                console.log('>>> task (executed)', JSON.stringify(task));
            })
            .on(TaskTimer.EventType.TASK_COMPLETED, (event: ITaskTimerEvent) => {
                executedEvents.push(event.type);
                expect(event.type).toEqual(TaskTimer.EventType.TASK_COMPLETED);
                expect(timer.taskCount).toEqual(2);
                const task = event.data as Task;
                expect(task).toBeDefined();
                console.log('>>> taskCompleted', JSON.stringify(task));
                expect(task.id).toEqual(taskComp.id);
                timer.remove(autoTaskID);
            })
            .on(TaskTimer.EventType.TASK_REMOVED, (event: ITaskTimerEvent) => {
                executedEvents.push(event.type);
                expect(event.type).toEqual(TaskTimer.EventType.TASK_REMOVED);
                expect(timer.taskCount).toEqual(1);
                const task = event.data as Task;
                expect(task).toBeDefined();
                console.log('>>> taskRemoved', JSON.stringify(task));
                expect(task.id).toEqual(autoTaskID);
                expect(timer.get(autoTaskID)).toEqual(null);
                timer.pause();
            })
            .on(TaskTimer.EventType.PAUSED, (event: ITaskTimerEvent) => {
                executedEvents.push(event.type);
                expect(event.type).toEqual(TaskTimer.EventType.PAUSED);
                console.log('>>> paused');
                timer.resume();
            })
            .on(TaskTimer.EventType.RESUMED, (event: ITaskTimerEvent) => {
                executedEvents.push(event.type);
                expect(event.type).toEqual(TaskTimer.EventType.RESUMED);
                console.log('>>> resumed');
                timer.stop();
            })
            .on(TaskTimer.EventType.STOPPED, (event: ITaskTimerEvent) => {
                executedEvents.push(event.type);
                expect(event.type).toEqual(TaskTimer.EventType.STOPPED);
                console.log('>>> stopped');
                timer.reset();
            })
            .on(TaskTimer.EventType.STOPPED, (event: ITaskTimerEvent) => {
                // second event listener for "stopped"
                executedEvents.push(event.type);
            })
            .on(TaskTimer.EventType.RESET, (event: ITaskTimerEvent) => {
                executedEvents.push(event.type);
                expect(event.type).toEqual(TaskTimer.EventType.RESET);
                console.log('>>> reset');
                checkEvents();
                done();
            });

        function checkEvents(): void {
            expect(executedEvents).toContain(TaskTimer.EventType.STARTED);
            expect(timer.listenerCount(TaskTimer.EventType.STARTED)).toEqual(1);

            expect(executedEvents).toContain(TaskTimer.EventType.TICK);
            expect(timer.listenerCount(TaskTimer.EventType.TICK)).toEqual(1);

            expect(executedEvents).toContain(TaskTimer.EventType.TASK_ADDED);
            expect(timer.listenerCount(TaskTimer.EventType.TASK_ADDED)).toEqual(1);

            expect(executedEvents).toContain(TaskTimer.EventType.TASK);
            expect(timer.listenerCount(TaskTimer.EventType.TASK)).toEqual(1);

            expect(executedEvents).toContain(TaskTimer.EventType.TASK_COMPLETED);
            expect(timer.listenerCount(TaskTimer.EventType.TASK_COMPLETED)).toEqual(1);

            expect(executedEvents).toContain(TaskTimer.EventType.TASK_REMOVED);
            expect(timer.listenerCount(TaskTimer.EventType.TASK_REMOVED)).toEqual(1);

            expect(executedEvents).toContain(TaskTimer.EventType.PAUSED);
            expect(timer.listenerCount(TaskTimer.EventType.PAUSED)).toEqual(1);

            expect(executedEvents).toContain(TaskTimer.EventType.RESUMED);
            expect(timer.listenerCount(TaskTimer.EventType.RESUMED)).toEqual(1);

            expect(executedEvents).toContain(TaskTimer.EventType.STOPPED);
            expect(timer.listenerCount(TaskTimer.EventType.STOPPED)).toEqual(2);

            expect(executedEvents).toContain(TaskTimer.EventType.RESET);
            expect(timer.listenerCount(TaskTimer.EventType.RESET)).toEqual(1);
        }

        timer.start();
        expect(timer.state).toEqual(TaskTimer.State.RUNNING);
        console.log('>>> running');
    });

    test('task array, stopOnCompleted', (done: any) => {
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

        timer.on('tick', () => {
            if (timer.tickCount === 2) {
                expect(timer.state).toEqual(TaskTimer.State.RUNNING);
            }
            if (timer.tickCount === 5) {
                expect(timer.state).toEqual(TaskTimer.State.STOPPED);
            }
        });
        // tslint:disable:no-unnecessary-callback-wrapper
        timer.on(TaskTimer.EventType.STOPPED, () => done());
        timer.start();
    }, 7000); // set a larger timeout for jest/jasmine

    // test.only('timer precision', (done: any) => {
    //     const interval = 500;
    //     const timer = new TaskTimer({
    //         interval,
    //         precision: true,
    //         stopOnCompleted: true
    //     });
    //     timer.add({
    //         tickInterval: 1,
    //         totalRuns: runs,
    //         callback(task: Task): void {
    //             console.log('tick @', task.currentRuns, ':', timer.time.elapsed);
    //             blockCount();
    //             const mod = timer.time.elapsed % interval;
    //             expect(mod <= 6 || mod >= 6).toEqual(true);
    //         }
    //     });
    //     // tslint:disable:no-unnecessary-callback-wrapper
    //     timer.on(TaskTimer.EventType.STOPPED, () => {
    //         console.log('stop event fired');
    //         done();
    //     });
    //     timer.start();
    // }, 20000); // set a larger timeout for jest/jasmine

});

// function blockCount(): void {
//     let i = 0;
//     // count to billion
//     while (i < 1000000000) i++;
//     // console.log('count ok.');
// }
