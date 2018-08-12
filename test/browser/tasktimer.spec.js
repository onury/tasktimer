// https://github.com/smooth-code/jest-puppeteer
// https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md

const { TaskTimer, Task } = require('../../lib/tasktimer');

/**
 *  TaskTimer Test Suite for Browser/Puppeteer.
 *  This suite includes some basic tests only.
 *  For full-coverage tests we use ./test/node/tasktimer.spec.ts
 */
describe('TaskTimer (Browser/Puppeteer)', () => {

    async function getHandle() {
        const handle = await page.evaluateHandle(() => window);
        const properties = await handle.getProperties();
        return {
            handle, // use as `await handle.dispose()` when done (but jest-puppeteer does it for us it seems)
            window: properties.get('window')
        };
    }

    // we use runTests() to auto-run an expect().toEqual() on each value of a
    // test results object. The reason is that, expect is not available within
    // page.evaluate() context, and writing both a test statement and an
    // expect() for the result value of the same statement outside
    // page.evaluate() is too much duplication.
    // ( Maybe there is a better way, dunno... ¯\_(ツ)_/¯ )

    // each property of tests argument should be an `Array(2)`.
    // e.g. [received, expected]
    // correct   »  tests.innerText = [elem.innerText, 'hello'];
    // incorrect »  tests.innerText = 'hello';
    function runTests(tests) {
        let received, expected;
        for (let testName in tests) {
            received = tests[testName][0];
            expected = tests[testName][1];
            // if any expect fails in this iteration, the test's stack output
            // will not show the proper line. so we'll log if any is `false` to
            // get a proper hint.
            if (received !== expected) console.log(`FAILED: tests.${testName}`);
            expect(expected).toEqual(received);
        }
    }

    beforeAll(async () => {
        await page.goto('http://localhost:5001');
    });

    test('page / html', async () => {
        // "TaskTimer" text on page
        await expect(page).toMatch('TaskTimer');
    });

    test('window.tasktimer', async () => {
        const result = await page.evaluate(() => {
            const tests = {};
            const { TaskTimer, Task } = window.tasktimer;
            tests.TaskTimer = [typeof TaskTimer.constructor, 'function'];
            tests.Task = [typeof Task.constructor, 'function'];
            return tests;
        });
        runTests(result);
    });

    test('TaskTimer', async () => {
        const result = await page.evaluate(() => {
            const tests = {};
            const { TaskTimer } = window.tasktimer;

            const timer = new TaskTimer();
            tests.interval = [timer.interval, 1000];
            tests.stopOnCompleted = [timer.stopOnCompleted, false];

            timer.add(() => { }).start();
            tests.running = [timer.state, TaskTimer.State.RUNNING];
            tests.taskCount = [timer.taskCount, 1];

            timer.stop();
            tests.stopped = [timer.state, TaskTimer.State.STOPPED];

            return tests;
        });
        runTests(result);
    });

});
