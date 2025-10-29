import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  ControllableTimer,
  pauseableCountdown,
  createTimerController,
  pauseAndResume,
  multiPhaseTimer
} from './090-pomodoro-clear.js';

test('Pomodoro Timer - Pause and Resume', async (t) => {

  await t.test('ControllableTimer can be created', () => {
    const timer = new ControllableTimer();
    assert.ok(timer);
  });

  await t.test('ControllableTimer has start method', () => {
    const timer = new ControllableTimer();
    assert.ok(typeof timer.start === 'function');
  });

  await t.test('ControllableTimer has pause method', () => {
    const timer = new ControllableTimer();
    assert.ok(typeof timer.pause === 'function');
  });

  await t.test('ControllableTimer has resume method', () => {
    const timer = new ControllableTimer();
    assert.ok(typeof timer.resume === 'function');
  });

  await t.test('ControllableTimer start begins countdown', (t, done) => {
    const timer = new ControllableTimer();
    let ticks = 0;
    timer.start(0.02, () => {
      ticks++;
      if (ticks === 1) {
        timer.pause();
        done();
      }
    });
  });

  await t.test('ControllableTimer pause stops countdown', (t, done) => {
    const timer = new ControllableTimer();
    let ticks = 0;
    timer.start(0.05, () => {
      ticks++;
      if (ticks === 1) {
        timer.pause();
        setTimeout(() => {
          assert.equal(ticks, 1);
          done();
        }, 30);
      }
    });
  });

  await t.test('ControllableTimer resume continues countdown', (t, done) => {
    const timer = new ControllableTimer();
    let ticks = 0;
    timer.start(0.02, () => {
      ticks++;
      if (ticks === 1) {
        timer.pause();
        setTimeout(() => {
          timer.resume();
          setTimeout(() => {
            if (ticks >= 2) {
              timer.pause();
              done();
            }
          }, 30);
        }, 30);
      }
    });
  });

  await t.test('pauseableCountdown returns controller object', () => {
    const controller = pauseableCountdown(10, () => {}, () => {});
    assert.ok(typeof controller === 'object');
  });

  await t.test('pauseableCountdown controller has pause method', () => {
    const controller = pauseableCountdown(10, () => {}, () => {});
    assert.ok(typeof controller.pause === 'function');
  });

  await t.test('pauseableCountdown controller has resume method', () => {
    const controller = pauseableCountdown(10, () => {}, () => {});
    assert.ok(typeof controller.resume === 'function');
  });

  await t.test('pauseableCountdown ticks and can be paused', (t, done) => {
    let ticks = 0;
    const controller = pauseableCountdown(0.02, () => {
      ticks++;
      if (ticks === 1) {
        controller.pause();
        setTimeout(() => {
          assert.equal(ticks, 1);
          done();
        }, 30);
      }
    }, () => {});
  });

  await t.test('createTimerController returns controller', () => {
    const controller = createTimerController();
    assert.ok(typeof controller === 'object');
  });

  await t.test('createTimerController has create method', () => {
    const controller = createTimerController();
    assert.ok(typeof controller.create === 'function');
  });

  await t.test('createTimerController has pauseAll method', () => {
    const controller = createTimerController();
    assert.ok(typeof controller.pauseAll === 'function');
  });

  await t.test('createTimerController has resumeAll method', () => {
    const controller = createTimerController();
    assert.ok(typeof controller.resumeAll === 'function');
  });

  await t.test('pauseAndResume returns timer object', () => {
    const timer = pauseAndResume(10, () => {});
    assert.ok(typeof timer === 'object');
  });

  await t.test('pauseAndResume has pause method', () => {
    const timer = pauseAndResume(10, () => {});
    assert.ok(typeof timer.pause === 'function');
  });

  await t.test('pauseAndResume has resume method', () => {
    const timer = pauseAndResume(10, () => {});
    assert.ok(typeof timer.resume === 'function');
  });

  await t.test('multiPhaseTimer returns controller', () => {
    const controller = multiPhaseTimer([
      { duration: 1, label: 'work' },
      { duration: 0.5, label: 'break' }
    ], () => {});
    assert.ok(typeof controller === 'object');
  });

  await t.test('multiPhaseTimer has start method', () => {
    const controller = multiPhaseTimer([
      { duration: 1, label: 'work' }
    ], () => {});
    assert.ok(typeof controller.start === 'function');
  });

  await t.test('multiPhaseTimer has pause method', () => {
    const controller = multiPhaseTimer([
      { duration: 1, label: 'work' }
    ], () => {});
    assert.ok(typeof controller.pause === 'function');
  });

  await t.test('multiPhaseTimer has resume method', () => {
    const controller = multiPhaseTimer([
      { duration: 1, label: 'work' }
    ], () => {});
    assert.ok(typeof controller.resume === 'function');
  });

});
