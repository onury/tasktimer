/* global window */

(function () {

    // This spec file is used both by grunt-contrib-jasmine (for browser) and
    // grunt-jasmine-nodejs (for Node). So we import the lib conditionally.
    var TaskTimer;
    if (typeof window === 'undefined') {
        TaskTimer = require('../dist/tasktimer.min');
    } else {
        TaskTimer = window.TaskTimer;
    }

    describe('TaskTimer', function () {
        var interval = 500;

        it('should check timer states', function () {
            var timer = new TaskTimer(interval);
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

        it('should add/remove task', function (done) {
            var timer = new TaskTimer(interval);
            expect(timer.taskCount).toEqual(0);
            var task1 = {
                name: 'heartbeat',
                tickInterval: 2,
                totalRuns: 3,
                callback: function (task) {
                    console.log(task.name + ' task has run ' + task.currentRuns + ' times');
                    expect(task.name).toEqual('heartbeat');
                    expect(task.tickInterval).toEqual(task1.tickInterval);
                    expect(task.totalRuns).toEqual(task1.totalRuns);
                    expect(task.currentRuns <= task.totalRuns).toBeTruthy();
                    expect(timer.time.stopped).toEqual(0);
                    var i = task1.tickInterval * task.currentRuns;
                    expect(timer.time.elapsed >= i * interval).toBeTruthy();
                    expect(timer.time.elapsed < (i + 1) * interval).toBeTruthy();
                }
            };
            timer.addTask(task1);
            expect(timer.taskCount).toEqual(1);
            var task2 = {
                name: 'final-check',
                tickInterval: 7,
                totalRuns: 1,
                callback: function (task) {
                    console.log(task.name + ' task has run ' + task.currentRuns + ' times.');
                    expect(timer.tickCount).toEqual(7);
                    timer.removeTask('heartbeat');
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
            timer.addTask(task2);
            expect(timer.taskCount).toEqual(2);
            timer.start();
        });

        it('should check events', function (done) {
            var timer = new TaskTimer(interval);
            timer
                .reset()
                .on(TaskTimer.Event.STARTED, function (event) {
                    expect(event.type).toEqual(TaskTimer.Event.STARTED);
                    console.log('>>> started');
                })
                .on(TaskTimer.Event.TICK, function (event) {
                    expect(event.type).toEqual(TaskTimer.Event.TICK);
                    // expect(event.source).toEqual(timer);
                    expect(event.task).toBeUndefined();
                    console.log('>>> tick', timer.tickCount);
                    if (timer.tickCount === 3) {
                        timer.addTask('test');
                    }
                })
                .on(TaskTimer.Event.TASK_ADDED, function (event) {
                    expect(event.type).toEqual(TaskTimer.Event.TASK_ADDED);
                    expect(timer.taskCount).toEqual(1);
                    expect(event.task).toBeDefined();
                    if (event.task) {
                        console.log('>>> taskAdded', JSON.stringify(event.task));
                        expect(event.task.name).toEqual('test');
                        expect(event.task.tickInterval).toEqual(1);
                        expect(event.task.totalRuns).toEqual(0);
                        expect(event.task.callback).toBeUndefined();
                    }
                })
                .on(TaskTimer.Event.TASK, function (event) {
                    expect(event.type).toEqual(TaskTimer.Event.TASK);
                    expect(timer.taskCount).toEqual(1);
                    expect(event.task).toBeDefined();
                    if (event.task) {
                        console.log('>>> task (executed)', JSON.stringify(event.task));
                        expect(event.task.name).toEqual('test');
                        expect(event.task.tickInterval).toEqual(1);
                        expect(event.task.totalRuns).toEqual(0);
                        expect(event.task.callback).toBeUndefined();
                    }
                    timer.removeTask('test');
                })
                .on(TaskTimer.Event.TASK_REMOVED, function (event) {
                    expect(event.type).toEqual(TaskTimer.Event.TASK_REMOVED);
                    expect(timer.taskCount).toEqual(0);
                    expect(event.task).toBeDefined();
                    if (event.task) {
                        console.log('>>> taskRemoved', JSON.stringify(event.task));
                        expect(event.task.name).toEqual('test');
                        expect(event.task.tickInterval).toEqual(1);
                        expect(event.task.totalRuns).toEqual(0);
                        expect(event.task.callback).toBeUndefined();
                    }
                    timer.pause();
                })
                .on(TaskTimer.Event.PAUSED, function (event) {
                    expect(event.type).toEqual(TaskTimer.Event.PAUSED);
                    expect(timer.tickCount).toEqual(3);
                    console.log('>>> paused');
                    timer.resume();
                })
                .on(TaskTimer.Event.RESUMED, function (event) {
                    expect(event.type).toEqual(TaskTimer.Event.RESUMED);
                    console.log('>>> resumed');
                    timer.stop();
                })
                .on(TaskTimer.Event.STOPPED, function (event) {
                    expect(event.type).toEqual(TaskTimer.Event.STOPPED);
                    console.log('>>> stopped');
                    timer.reset();
                })
                .on(TaskTimer.Event.RESET, function (event) {
                    expect(event.type).toEqual(TaskTimer.Event.RESET);
                    console.log('>>> reset');
                    done();
                });
            timer.start();
            expect(timer.state).toEqual(TaskTimer.State.RUNNING);
            console.log('>>> running');
            expect(timer.listenerCount(TaskTimer.Event.RESET)).toEqual(1);
        });

    });

})();
