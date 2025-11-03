import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  EventEmitter,
  NotificationCenter,
  createNotifyingPomodoro,
  timerWithAlerts,
  pomodoroApp
} from './090-pomodoro-complete.js';

test('Pomodoro Timer - Complete Application', async (t) => {

  await t.test('EventEmitter can be created', () => {
    const emitter = new EventEmitter();
    assert.ok(emitter);
  });

  await t.test('EventEmitter has on method', () => {
    const emitter = new EventEmitter();
    assert.ok(typeof emitter.on === 'function');
  });

  await t.test('EventEmitter has emit method', () => {
    const emitter = new EventEmitter();
    assert.ok(typeof emitter.emit === 'function');
  });

  await t.test('EventEmitter on registers listener', (t, done) => {
    const emitter = new EventEmitter();
    let called = false;
    emitter.on('test', () => {
      called = true;
      done();
    });
    emitter.emit('test');
  });

  await t.test('EventEmitter emit passes data', (t, done) => {
    const emitter = new EventEmitter();
    emitter.on('data', (value) => {
      assert.equal(value, 42);
      done();
    });
    emitter.emit('data', 42);
  });

  await t.test('NotificationCenter can be created', () => {
    const center = new NotificationCenter();
    assert.ok(center);
  });

  await t.test('NotificationCenter has notify method', () => {
    const center = new NotificationCenter();
    assert.ok(typeof center.notify === 'function');
  });

  await t.test('NotificationCenter has subscribe method', () => {
    const center = new NotificationCenter();
    assert.ok(typeof center.subscribe === 'function');
  });

  await t.test('NotificationCenter notify sends to subscribers', (t, done) => {
    const center = new NotificationCenter();
    let received = false;
    center.subscribe((notification) => {
      received = true;
      done();
    });
    center.notify({ message: 'test' });
  });

  await t.test('NotificationCenter includes notification data', (t, done) => {
    const center = new NotificationCenter();
    center.subscribe((notification) => {
      assert.equal(notification.message, 'time to work');
      done();
    });
    center.notify({ message: 'time to work' });
  });

  await t.test('createNotifyingPomodoro returns app object', () => {
    const app = createNotifyingPomodoro(1, 0.5, 2);
    assert.ok(typeof app === 'object');
  });

  await t.test('createNotifyingPomodoro has start method', () => {
    const app = createNotifyingPomodoro(1, 0.5, 2);
    assert.ok(typeof app.start === 'function');
  });

  await t.test('createNotifyingPomodoro has pause method', () => {
    const app = createNotifyingPomodoro(1, 0.5, 2);
    assert.ok(typeof app.pause === 'function');
  });

  await t.test('createNotifyingPomodoro has on method', () => {
    const app = createNotifyingPomodoro(1, 0.5, 2);
    assert.ok(typeof app.on === 'function');
  });

  await t.test('createNotifyingPomodoro emits events', (t, done) => {
    const app = createNotifyingPomodoro(0.01, 0.01, 1);
    let eventEmitted = false;
    app.on('tick', () => {
      eventEmitted = true;
      app.pause();
      done();
    });
    app.start();
  });

  await t.test('timerWithAlerts returns controller', () => {
    const timer = timerWithAlerts(10, () => {});
    assert.ok(typeof timer === 'object');
  });

  await t.test('timerWithAlerts has start method', () => {
    const timer = timerWithAlerts(10, () => {});
    assert.ok(typeof timer.start === 'function');
  });

  await t.test('timerWithAlerts has stop method', () => {
    const timer = timerWithAlerts(10, () => {});
    assert.ok(typeof timer.stop === 'function');
  });

  await t.test('timerWithAlerts calls onAlert', (t, done) => {
    const timer = timerWithAlerts(0.02, () => {
      timer.stop();
      done();
    });
    timer.start();
  });

  await t.test('pomodoroApp returns app object', () => {
    const app = pomodoroApp(1, 0.5, 2);
    assert.ok(typeof app === 'object');
  });

  await t.test('pomodoroApp has start method', () => {
    const app = pomodoroApp(1, 0.5, 2);
    assert.ok(typeof app.start === 'function');
  });

  await t.test('pomodoroApp has pause method', () => {
    const app = pomodoroApp(1, 0.5, 2);
    assert.ok(typeof app.pause === 'function');
  });

  await t.test('pomodoroApp has resume method', () => {
    const app = pomodoroApp(1, 0.5, 2);
    assert.ok(typeof app.resume === 'function');
  });

  await t.test('pomodoroApp has on method for events', () => {
    const app = pomodoroApp(1, 0.5, 2);
    assert.ok(typeof app.on === 'function');
  });

  await t.test('pomodoroApp emits phase-change events', (t, done) => {
    const app = pomodoroApp(0.01, 0.01, 1);
    let phaseChanged = false;
    app.on('phase-change', () => {
      phaseChanged = true;
      app.pause();
      done();
    });
    app.start();
  });

});
