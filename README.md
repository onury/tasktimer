<h1 align="center">
    <a href="https://github.com/onury/tasktimer"><img width="300" height="300" src="https://raw.github.com/onury/tasktimer/master/tasktimer-logo.png" alt="TaskTimer" /></a>
</h1>
<p align="center">
    <a href="https://travis-ci.org/onury/tasktimer"><img src="https://img.shields.io/travis/onury/tasktimer.svg?branch=master&style=flat-square" alt="Build Status" /></a>
    <a href="https://coveralls.io/github/onury/tasktimer?branch=master"><img src="https://img.shields.io/coveralls/github/onury/tasktimer/master.svg?style=flat-square" alt="Coverage Status" /></a>
    <a href="https://david-dm.org/onury/tasktimer"><img src="https://david-dm.org/onury/tasktimer.svg?style=flat-square" alt="Dependencies" /></a>
    <a href="https://snyk.io/test/github/onury/tasktimer"><img src="https://snyk.io/test/github/onury/tasktimer/badge.svg?style=flat-square" alt="Known Vulnerabilities" /></a>
    <a href="https://github.com/onury/tasktimer/graphs/commit-activity"><img src="https://img.shields.io/maintenance/yes/2019.svg?style=flat-square" alt="Maintained" /></a>
    <br />
    <a href="https://www.npmjs.com/package/tasktimer"><img src="http://img.shields.io/npm/v/tasktimer.svg?style=flat-square" alt="npm" /></a>
    <a href="https://github.com/onury/tasktimer"><img src="https://img.shields.io/github/release/onury/tasktimer.svg?style=flat-square" alt="Release" /></a>
    <a href="https://github.com/onury/tasktimer/blob/master/LICENSE"><img src="http://img.shields.io/npm/l/tasktimer.svg?style=flat-square" alt="License" /></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/written%20in-%20TypeScript%20-6575ff.svg?style=flat-square" alt="TypeScript" /></a>
    <a href="https://onury.io/tasktimer/api"><img src="https://img.shields.io/badge/documentation-click_to_read-c27cf4.svg?documentation=click_to_read&style=flat-square" alt="Documentation" /></a>
    <br />
    <sub>© 2019, Onur Yıldırım (<b><a href="https://github.com/onury">@onury</a></b>).</sub>
</p>
<br />

An accurate timer utility for running periodic tasks on the given interval ticks or dates.

## Why `TaskTimer`?
Because of the single-threaded, asynchronous [nature of JavaScript][how-timers-work], each execution takes a piece of CPU time, and the time they have to wait will vary, depending on the load. This creates a latency and cumulative difference in asynchronous timers; that gradually increase the inacuraccy. `TaskTimer` claims to be the best timer that overcomes this problem as much as possible.

Secondly, I needed a task manager that can handle multiple tasks on different intervals, with a single timer instance.

## Features
- **Precission & Accuracy**: With the `precision` option (enabled by default);
  - The delay between each tick is **auto-adjusted** when it's off due to task/CPU loads or [clock drifts][clock-drift].
  - In Node.js, `TaskTimer` also makes use of `process.hrtime()` **high-resolution real-time**. The time is relative to an arbitrary time in the past (not related to the time of day) and therefore not subject to clock drifts.
  - The timer may hit a synchronous / blocking task; or detect significant time drift (longer than the base interval) due to JS event queue, which cannot be recovered by simply adjusting the next delay. In this case, right from the next tick onward; it will auto-recover as much as possible by running "immediate" tasks until it reaches the proper time vs tick/run balance.
- Run or schedule **multiple tasks** (on a single timer instance).
- Ability to run **sync** or **async** tasks that return a promise (or use callbacks).
- Ability to **balance task-loads** via distributing executions by tick intervals.
- Ability to **limit total runs** of a task.
- **Stateful tasks**: i.e. ability to auto-stop when all tasks complete.
- `TaskTimer` is also an **`EventEmitter`**.
- **Universal** module. Works in both Node and Browser. 
- Small size (4.5kB minified, gzipped).
- Completely **re-written** in **TypeScript**. (version 2.0.0+)

## Installation

```sh
npm i tasktimer
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

In (Modern) Browsers:
```html
<script src="js/tasktimer.min.js"></script>
<script>
    const { TaskTimer } = tasktimer;
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
        id: 'task-1',       // unique ID of the task
        tickInterval: 5,    // run every 5 ticks (5 x interval = 5000 ms)
        totalRuns: 10,      // run 10 times only. (set to 0 for unlimited times)
        callback(task) {
            // code to be executed on each run
            console.log(`${task.id} task has run ${task.currentRuns} times.`);
        }
    },
    {
        id: 'task-2',       // unique ID of the task
        tickDelay: 1,       // 1 tick delay before first run
        tickInterval: 10,   // run every 10 ticks (10 x interval = 10000 ms)
        totalRuns: 2,       // run 2 times only. (set to 0 for unlimited times)
        callback(task) {
            // code to be executed on each run
            console.log(`${task.id} task has run ${task.currentRuns} times.`);
        }
    }
]);

// You can also execute some code on each tick... (every 1000 ms)
timer.on('tick', () => {
    console.log('tick count: ' + timer.tickCount);
    console.log('elapsed time: ' + timer.time.elapsed + ' ms.');
    // stop timer (and all tasks) after 1 hour
    if (timer.tickCount >= 3600000) timer.stop();
});

// Start the timer
timer.start();
```

## How it works

- When you create a timer; you set a **time**-interval (e.g. `1000` milliseconds), to be used as **base** resolution (tick) for the tasks.
- Then add task(s) to be executed on **tick**-intervals.   
*(e.g. task1 runs on every 10th tick, task2 runs on every 30th)*
- You can optionally define:
  - The number of **total runs**, 
  - An initial **delay**,
  - Start/end **dates** for each task...
- In addition to task callbacks; event listeners can be added to execute some other code on each `tick` (base interval) or `task` run, etc...
- You can add, remove, reset, disable individual tasks at any time, without having to stop or re-create the timer.
- Pause and resume the timer at any time; which effects all current tasks.

### Documentation

See [**API reference**][docs] and examples [here][docs].

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
[MIT](LICENSE).

[docs]:https://onury.io/tasktimer/api
[changelog]:CHANGELOG.md
[how-timers-work]:https://johnresig.com/blog/how-javascript-timers-work/
[clock-drift]:https://en.wikipedia.org/wiki/Clock_drift