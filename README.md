# TaskTimer

> © 2016, Onur Yıldırım (@onury). MIT License.

A timer utility for running periodic tasks on the given interval ticks.
This is useful when you want to run or schedule multiple tasks (on a single timer instance).

Universal module. Works in both Node and Browser. Less than **3KB** (minified, gzipped).

## Installation

```sh
npm i tasktimer --save
```

## How it works

- When you create a timer; you set a **time**-interval, to be used as base resolution (tick) for the tasks.
- Then add task(s) to be executed on **tick**-intervals and (optionally) define number of **total runs**.
- Event listeners can be added to be invoked on each `tick`, `task`, etc...
- Remove or reset individual tasks at anytime.
- Or start, pause, resume or stop the timer. Effects all tasks.

## Usage

In Node/CommonJS environments:
```js
var TaskTimer = require('tasktimer');
```

via script tag in the browser:
```html
<script src="tasktimer.js"></script>
```

### Example

```js
// Timer with 1000ms (1 second) base interval resolution.
var timer = new TaskTimer(1000)
// interval can be updated anytime by setting the `timer.interval` property.

// Add task(s) based on tick intervals.
timer.addTask({
    name: 'job1',       // unique name of the task
    tickInterval: 5,    // run every 5 ticks (5 x interval = 5000 ms)
    totalRuns: 10,      // run 10 times only. (set to 0 for unlimited times)
    callback: function (task) {
        // code to be executed on each run
        console.log(task.name + ' task has run ' + task.currentRuns + ' times.');
    }
});

// Execute some code on each tick... (every 1 second)
timer.on('tick', function () {
    console.log('tick count: ' + timer.tickCount);
    console.log('elapsed time: ' + timer.time.elapsed + ' ms.');
    // stop timer (and all tasks) after 1 hour
    if (timer.tickCount >= 3600000) timer.stop();
});

// Start the timer
timer.start();
```

### Documentation

See API documentation and examples [here][docs].

## License
MIT.

[docs]:http://onury.github.io/tasktimer/?api=tasktimer
