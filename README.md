# TaskTimer

[![npm](http://img.shields.io/npm/v/tasktimer.svg)](https://www.npmjs.com/package/tasktimer)
[![release](https://img.shields.io/github/release/onury/tasktimer.svg)](https://github.com/onury/tasktimer)
[![dependencies](https://david-dm.org/onury/tasktimer.svg)](https://david-dm.org/onury/tasktimer)
[![license](http://img.shields.io/npm/l/tasktimer.svg)](https://github.com/onury/tasktimer/blob/master/LICENSE)
[![maintained](https://img.shields.io/maintenance/yes/2018.svg)](https://github.com/onury/tasktimer/graphs/commit-activity)

> © 2018, Onur Yıldırım ([@onury](https://github.com/onury)). MIT License.

A timer utility for running periodic tasks on the given interval ticks.
This is useful when you want to run or schedule multiple tasks (on a single timer instance).

Universal module. Works in both Node and Browser. Less than **3.3 KB** (minified, gzipped).

_In order to build on more solid foundations, this library (v2.0.0+) is completely re-written in TypeScript._

## How it works

- When you create a timer; you set a **time**-interval, to be used as base resolution (tick) for the tasks.
- Then add task(s) to be executed on **tick**-intervals.
- You can optionally define number of **total runs**, an initial **delay** or start/end **dates** for each task.
- Event listeners can be added to be invoked on each `tick`, `task`, etc...
- Add, remove or reset individual tasks at anytime.
- Start, pause, resume or stop the timer; which effects all current tasks.

## Installation

```sh
npm i tasktimer --save
```

## Usage

In Node/CommonJS environments:
```js
const { TaskTimer } = require('tasktimer');
```

With transpilers (TypeScript, Babel):
```js
import { TaskTimer } from 'tasktimer';
```

In Browsers:
```html
<script src="js/tasktimer.min.js"></script>
<script>
    var TaskTimer = tasktimer.TaskTimer;
    // or in modern browsers:
    // const { TaskTimer } = tasktimer;
</script>
```

### Simplest Example

```js
const timer = new TaskTimer(1000);
timer.add(task => console.log(`Current runs: ${task.currentRuns}`)).start();
```

### Regular Timer (without Task Management)

```js
const timer = new TaskTimer(5000);
timer.on('tick', () => console.log(`Tick count: ${timer.tickCount}`));
timer.start();
```

### Detailed Example

```js
// Timer with 1000ms (1 second) base interval resolution.
const timer = new TaskTimer(1000);
// interval can be updated anytime by setting the `timer.interval` property.

// Add multiple tasks (at once) based on tick intervals.
timer.add([
    {
        name: 'task-1',     // unique name of the task
        tickInterval: 5,    // run every 5 ticks (5 x interval = 5000 ms)
        totalRuns: 10,      // run 10 times only. (set to 0 for unlimited times)
        callback(task) {
            // code to be executed on each run
            console.log(`${task.name} task has run ${task.currentRuns} times.`);
        }
    },
    {
        name: 'task-2',     // unique name of the task
        tickInterval: 10,   // run every 10 ticks (10 x interval = 10000 ms)
        totalRuns: 2,       // run 2 times only. (set to 0 for unlimited times)
        callback(task) {
            // code to be executed on each run
            console.log(`${task.name} task has run ${task.currentRuns} times.`);
        }
    }
]);

// You can also execute some code on each tick... (every 1 second)
timer.on('tick', () => {
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

## Changelog

See [CHANGELOG.md][changelog].
*If you're migrating from TaskTimer v1 to v2+, there are various **breaking changes**!..*

## Contributing

Clone original project:

```sh
git clone https://github.com/onury/tasktimer.git
```

Install dependencies:

```sh
npm install
```

Add tests into [test/node](test/node) and [test/browser](test/browser) and run:

```sh
npm run test!   # builds and runs tests
npm test        # runs tests without building
```

Use included `tslint.json` and `editorconfig` for style and linting.
Travis build should pass, coverage should not degrade.

## License
[MIT][LICENSE].

[docs]:https://onury.io/tasktimer/?api=tasktimer
[changelog]:CHANGELOG.md
