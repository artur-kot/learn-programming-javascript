import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  runAfterDelay,
  runAfterSeconds,
  delayedGreeting,
  countdownStart,
  createTimer,
  tickingCountdown,
  createCountdownTimer,
  stopwatch,
  pomodoroSession,
  pomodoroWorkBreakCycle
} from './088-pomodoro-timers.js';

test('Pomodoro Timer - Timer Fundamentals', async (t) => {

  // setTimeout Tests
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

  // setInterval Tests
  await t.test('tickingCountdown calls onTick each second', (t, done) => {
    let ticks = 0;
    const id = tickingCountdown(0.02, (remaining) => {
      ticks++;
      if (ticks === 1) {
        clearInterval(id);
        done();
      }
    });
  });

  await t.test('tickingCountdown counts down correctly', (t, done) => {
    let values = [];
    const id = tickingCountdown(0.03, (remaining) => {
      values.push(remaining);
      if (values.length === 2) {
        clearInterval(id);
        assert.ok(values[1] < values[0]);
        done();
      }
    });
  });

  await t.test('tickingCountdown returns interval ID', () => {
    const id = tickingCountdown(10, () => {});
    assert.ok(typeof id === 'number');
    clearInterval(id);
  });

  await t.test('createCountdownTimer returns timer object', () => {
    const timer = createCountdownTimer();
    assert.ok(typeof timer === 'object');
  });

  await t.test('createCountdownTimer has start method', () => {
    const timer = createCountdownTimer();
    assert.ok(typeof timer.start === 'function');
  });

  await t.test('createCountdownTimer start returns interval ID', () => {
    const timer = createCountdownTimer();
    const id = timer.start(10, () => {});
    assert.ok(typeof id === 'number');
    clearInterval(id);
  });

  await t.test('createCountdownTimer tick callback receives remaining time', (t, done) => {
    const timer = createCountdownTimer();
    let tickReceived = false;
    const id = timer.start(0.02, (remaining) => {
      if (typeof remaining === 'number') {
        tickReceived = true;
        clearInterval(id);
        done();
      }
    });
  });

  await t.test('stopwatch tracks elapsed time', (t, done) => {
    let ticks = 0;
    const id = stopwatch((elapsed) => {
      ticks++;
      if (ticks === 2) {
        clearInterval(id);
        done();
      }
    });
  });

  await t.test('stopwatch elapsed time increases', (t, done) => {
    let values = [];
    const id = stopwatch((elapsed) => {
      values.push(elapsed);
      if (values.length === 2) {
        clearInterval(id);
        assert.ok(values[1] > values[0]);
        done();
      }
    });
  });

  await t.test('stopwatch returns interval ID', () => {
    const id = stopwatch(() => {});
    assert.ok(typeof id === 'number');
    clearInterval(id);
  });

  await t.test('pomodoroSession calls onTick each second', (t, done) => {
    let ticks = 0;
    const id = pomodoroSession(0.02, () => {
      ticks++;
      if (ticks === 1) {
        clearInterval(id);
        done();
      }
    }, () => {});
  });

  await t.test('pomodoroSession returns interval ID', () => {
    const id = pomodoroSession(10, () => {}, () => {});
    assert.ok(typeof id === 'number');
    clearInterval(id);
  });

  await t.test('pomodoroSession onTick receives remaining seconds', (t, done) => {
    let received = false;
    const id = pomodoroSession(0.02, (remaining) => {
      if (typeof remaining === 'number') {
        received = true;
        clearInterval(id);
        done();
      }
    }, () => {});
  });

  await t.test('pomodoroWorkBreakCycle returns object', () => {
    const cycle = pomodoroWorkBreakCycle(1, 0.5, () => {});
    assert.ok(typeof cycle === 'object');
  });

  await t.test('pomodoroWorkBreakCycle has start method', () => {
    const cycle = pomodoroWorkBreakCycle(1, 0.5, () => {});
    assert.ok(typeof cycle.start === 'function');
  });

  await t.test('pomodoroWorkBreakCycle has stop method', () => {
    const cycle = pomodoroWorkBreakCycle(1, 0.5, () => {});
    assert.ok(typeof cycle.stop === 'function');
  });

  await t.test('pomodoroWorkBreakCycle calls onUpdate', (t, done) => {
    const cycle = pomodoroWorkBreakCycle(0.01, 0.01, () => {
      cycle.stop();
      done();
    });
    cycle.start();
  });

});
