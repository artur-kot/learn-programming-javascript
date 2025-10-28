import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  runAfterDelay,
  runAfterSeconds,
  delayedGreeting,
  countdownStart,
  createTimer
} from './088-pomodoro-settimeout.js';

test('Pomodoro Timer - Basic Countdown', async (t) => {

  await t.test('runAfterDelay executes callback after delay', (t, done) => {
    let executed = false;
    runAfterDelay(() => {
      executed = true;
      done();
    }, 10);
  });

  await t.test('runAfterDelay respects delay time', (t, done) => {
    const start = Date.now();
    runAfterDelay(() => {
      const elapsed = Date.now() - start;
      assert.ok(elapsed >= 10);
      done();
    }, 10);
  });

  await t.test('runAfterDelay passes arguments to callback', (t, done) => {
    runAfterDelay((value) => {
      assert.equal(value, 42);
      done();
    }, 10, 42);
  });

  await t.test('runAfterSeconds converts seconds to milliseconds', (t, done) => {
    const start = Date.now();
    runAfterSeconds(() => {
      const elapsed = Date.now() - start;
      assert.ok(elapsed >= 20);
      done();
    }, 0.02);
  });

  await t.test('runAfterSeconds executes callback', (t, done) => {
    let executed = false;
    runAfterSeconds(() => {
      executed = true;
      done();
    }, 0.01);
  });

  await t.test('delayedGreeting returns a promise', () => {
    const result = delayedGreeting('Alice', 10);
    assert.ok(result instanceof Promise);
  });

  await t.test('delayedGreeting resolves with greeting message', (t, done) => {
    delayedGreeting('Bob', 10).then((message) => {
      assert.ok(message.includes('Bob'));
      done();
    });
  });

  await t.test('delayedGreeting respects delay', (t, done) => {
    const start = Date.now();
    delayedGreeting('Charlie', 20).then(() => {
      const elapsed = Date.now() - start;
      assert.ok(elapsed >= 20);
      done();
    });
  });

  await t.test('countdownStart calls callback after delay', (t, done) => {
    let called = false;
    countdownStart(0.01, () => {
      called = true;
      done();
    });
  });

  await t.test('countdownStart accepts duration in seconds', (t, done) => {
    const start = Date.now();
    countdownStart(0.02, () => {
      const elapsed = Date.now() - start;
      assert.ok(elapsed >= 20);
      done();
    });
  });

  await t.test('createTimer returns timer object', () => {
    const timer = createTimer();
    assert.ok(typeof timer === 'object');
  });

  await t.test('createTimer has start method', () => {
    const timer = createTimer();
    assert.ok(typeof timer.start === 'function');
  });

  await t.test('createTimer start method starts timer', (t, done) => {
    const timer = createTimer();
    let completed = false;
    timer.start(0.01, () => {
      completed = true;
      done();
    });
  });

  await t.test('createTimer returns timeout ID', () => {
    const timer = createTimer();
    const id = timer.start(100, () => {});
    assert.ok(typeof id === 'number');
    clearTimeout(id);
  });

});
