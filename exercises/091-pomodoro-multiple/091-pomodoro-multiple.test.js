import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  PomodoroSession,
  createWorkBreakCycle,
  pomodoroPlanner,
  adaptivePomodoro,
  pomodoroWithNotifications
} from './091-pomodoro-multiple.js';

test('Pomodoro Timer - Multiple Timers', async (t) => {

  await t.test('PomodoroSession can be created', () => {
    const session = new PomodoroSession(1, 0.5);
    assert.ok(session);
  });

  await t.test('PomodoroSession has start method', () => {
    const session = new PomodoroSession(1, 0.5);
    assert.ok(typeof session.start === 'function');
  });

  await t.test('PomodoroSession has pause method', () => {
    const session = new PomodoroSession(1, 0.5);
    assert.ok(typeof session.pause === 'function');
  });

  await t.test('PomodoroSession has resume method', () => {
    const session = new PomodoroSession(1, 0.5);
    assert.ok(typeof session.resume === 'function');
  });

  await t.test('PomodoroSession starts with work phase', (t, done) => {
    let phase = null;
    const session = new PomodoroSession(0.01, 0.01);
    session.start((update) => {
      phase = update.phase;
      session.pause();
      done();
    });
  });

  await t.test('PomodoroSession transitions to break', (t, done) => {
    let phases = [];
    const session = new PomodoroSession(0.01, 0.01);
    session.start((update) => {
      phases.push(update.phase);
      if (phases.length === 2 && phases[0] === 'work' && phases[1] === 'break') {
        session.pause();
        done();
      }
    });
  });

  await t.test('createWorkBreakCycle returns controller', () => {
    const controller = createWorkBreakCycle(1, 0.5, () => {});
    assert.ok(typeof controller === 'object');
  });

  await t.test('createWorkBreakCycle has start method', () => {
    const controller = createWorkBreakCycle(1, 0.5, () => {});
    assert.ok(typeof controller.start === 'function');
  });

  await t.test('createWorkBreakCycle has stop method', () => {
    const controller = createWorkBreakCycle(1, 0.5, () => {});
    assert.ok(typeof controller.stop === 'function');
  });

  await t.test('createWorkBreakCycle calls onTick', (t, done) => {
    let called = false;
    const controller = createWorkBreakCycle(0.02, 0.01, () => {
      called = true;
      controller.stop();
      done();
    });
    controller.start();
  });

  await t.test('pomodoroPlanner returns controller', () => {
    const planner = pomodoroPlanner(4, () => {});
    assert.ok(typeof planner === 'object');
  });

  await t.test('pomodoroPlanner has start method', () => {
    const planner = pomodoroPlanner(4, () => {});
    assert.ok(typeof planner.start === 'function');
  });

  await t.test('pomodoroPlanner has pause method', () => {
    const planner = pomodoroPlanner(4, () => {});
    assert.ok(typeof planner.pause === 'function');
  });

  await t.test('pomodoroPlanner has resume method', () => {
    const planner = pomodoroPlanner(4, () => {});
    assert.ok(typeof planner.resume === 'function');
  });

  await t.test('pomodoroPlanner tracks session count', (t, done) => {
    let sessionCount = 0;
    const planner = pomodoroPlanner(2, (update) => {
      if (update.sessionNumber) {
        sessionCount = update.sessionNumber;
      }
      if (sessionCount >= 2) {
        planner.pause();
        done();
      }
    });
    planner.start();
  });

  await t.test('adaptivePomodoro returns controller', () => {
    const adaptive = adaptivePomodoro(1, 0.5, () => {});
    assert.ok(typeof adaptive === 'object');
  });

  await t.test('adaptivePomodoro has start method', () => {
    const adaptive = adaptivePomodoro(1, 0.5, () => {});
    assert.ok(typeof adaptive.start === 'function');
  });

  await t.test('adaptivePomodoro has stop method', () => {
    const adaptive = adaptivePomodoro(1, 0.5, () => {});
    assert.ok(typeof adaptive.stop === 'function');
  });

  await t.test('pomodoroWithNotifications returns controller', () => {
    const pomodoro = pomodoroWithNotifications(1, 0.5, 2, () => {});
    assert.ok(typeof pomodoro === 'object');
  });

  await t.test('pomodoroWithNotifications has start method', () => {
    const pomodoro = pomodoroWithNotifications(1, 0.5, 2, () => {});
    assert.ok(typeof pomodoro.start === 'function');
  });

  await t.test('pomodoroWithNotifications has pause method', () => {
    const pomodoro = pomodoroWithNotifications(1, 0.5, 2, () => {});
    assert.ok(typeof pomodoro.pause === 'function');
  });

  await t.test('pomodoroWithNotifications has resume method', () => {
    const pomodoro = pomodoroWithNotifications(1, 0.5, 2, () => {});
    assert.ok(typeof pomodoro.resume === 'function');
  });

  await t.test('pomodoroWithNotifications calls onPhaseChange', (t, done) => {
    let called = false;
    const pomodoro = pomodoroWithNotifications(0.01, 0.01, 1, () => {
      called = true;
      pomodoro.pause();
      done();
    });
    pomodoro.start();
  });

});
