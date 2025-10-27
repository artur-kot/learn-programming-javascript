import test from 'node:test';
import assert from 'node:assert';
import { countdownWhile, countdownFor, countdownByInterval } from './026-countdown-skip.js';

test('Countdown - previous functions should still work', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args.join(' '));
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof countdownWhile, 'function', 'countdownWhile should be a function');
  assert.strictEqual(typeof countdownFor, 'function', 'countdownFor should be a function');

  countdownWhile(5);
  let countdownLogs = logs.filter(log => !log.includes('==='));
  assert.strictEqual(countdownLogs.length, 6, 'countdownWhile should still work');

  logs.length = 0;

  countdownFor(3);
  countdownLogs = logs.filter(log => !log.includes('==='));
  assert.strictEqual(countdownLogs.length, 4, 'countdownFor should still work');
});

test('Countdown - should count down by custom intervals', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args.join(' '));
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof countdownByInterval, 'function', 'countdownByInterval should be a function');

  // Test counting by 2s from 10
  countdownByInterval(10, 2);
  let countdownLogs = logs.filter(log => !log.includes('==='));
  assert.strictEqual(countdownLogs[0], '10', 'Should start at 10');
  assert.strictEqual(countdownLogs[1], '8', 'Should be 8 (10 - 2)');
  assert.strictEqual(countdownLogs[2], '6', 'Should be 6 (8 - 2)');
  assert.strictEqual(countdownLogs[3], '4', 'Should be 4 (6 - 2)');
  assert.strictEqual(countdownLogs[4], '2', 'Should be 2 (4 - 2)');
  assert.strictEqual(countdownLogs[5], 'Blast off!', 'Should end with Blast off!');
  assert.strictEqual(countdownLogs.length, 6, 'Should have 6 lines (5 numbers + blast off)');

  // Reset logs
  logs.length = 0;

  // Test counting by 5s from 20
  countdownByInterval(20, 5);
  countdownLogs = logs.filter(log => !log.includes('==='));
  assert.strictEqual(countdownLogs[0], '20', 'Should start at 20');
  assert.strictEqual(countdownLogs[1], '15', 'Should be 15 (20 - 5)');
  assert.strictEqual(countdownLogs[2], '10', 'Should be 10 (15 - 5)');
  assert.strictEqual(countdownLogs[3], '5', 'Should be 5 (10 - 5)');
  assert.strictEqual(countdownLogs[4], 'Blast off!', 'Should end with Blast off!');
  assert.strictEqual(countdownLogs.length, 5, 'Should have 5 lines (4 numbers + blast off)');

  // Reset logs
  logs.length = 0;

  // Test counting by 10s from 50
  countdownByInterval(50, 10);
  countdownLogs = logs.filter(log => !log.includes('==='));
  assert.strictEqual(countdownLogs[0], '50', 'Should start at 50');
  assert.strictEqual(countdownLogs[1], '40', 'Should be 40 (50 - 10)');
  assert.strictEqual(countdownLogs[2], '30', 'Should be 30 (40 - 10)');
  assert.strictEqual(countdownLogs[3], '20', 'Should be 20 (30 - 10)');
  assert.strictEqual(countdownLogs[4], '10', 'Should be 10 (20 - 10)');
  assert.strictEqual(countdownLogs[5], 'Blast off!', 'Should end with Blast off!');
  assert.strictEqual(countdownLogs.length, 6, 'Should have 6 lines (5 numbers + blast off)');

  // Reset logs
  logs.length = 0;

  // Test counting by 1 (same as regular countdown)
  countdownByInterval(5, 1);
  countdownLogs = logs.filter(log => !log.includes('==='));
  assert.strictEqual(countdownLogs[0], '5', 'Should start at 5');
  assert.strictEqual(countdownLogs[1], '4', 'Should be 4');
  assert.strictEqual(countdownLogs[2], '3', 'Should be 3');
  assert.strictEqual(countdownLogs[3], '2', 'Should be 2');
  assert.strictEqual(countdownLogs[4], '1', 'Should be 1');
  assert.strictEqual(countdownLogs[5], 'Blast off!', 'Should end with Blast off!');

  // Reset logs
  logs.length = 0;

  // Test counting by 3s from 15
  countdownByInterval(15, 3);
  countdownLogs = logs.filter(log => !log.includes('==='));
  assert.strictEqual(countdownLogs[0], '15', 'Should start at 15');
  assert.strictEqual(countdownLogs[1], '12', 'Should be 12 (15 - 3)');
  assert.strictEqual(countdownLogs[2], '9', 'Should be 9 (12 - 3)');
  assert.strictEqual(countdownLogs[3], '6', 'Should be 6 (9 - 3)');
  assert.strictEqual(countdownLogs[4], '3', 'Should be 3 (6 - 3)');
  assert.strictEqual(countdownLogs[5], 'Blast off!', 'Should end with Blast off!');
});
