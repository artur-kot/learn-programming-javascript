import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  tickingCountdown,
  createCountdownTimer,
  stopwatch,
  pomodoroSession,
  pomodoroWorkBreakCycle
} from './089-pomodoro-setinterval.js';

test('Pomodoro Timer - Tick Every Second', async (t) => {

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
