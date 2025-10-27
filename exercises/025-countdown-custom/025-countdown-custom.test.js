import test from 'node:test';
import assert from 'node:assert';
import { countdownWhile, countdownFor } from './025-countdown-custom.js';

test('Countdown - while loop should accept custom start parameter', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args.join(' '));
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof countdownWhile, 'function', 'countdownWhile should be a function');

  // Test counting from 5
  countdownWhile(5);
  let countdownLogs = logs.filter(log => !log.includes('==='));
  assert.strictEqual(countdownLogs.length, 6, 'Should log 6 lines for countdown from 5');
  assert.strictEqual(countdownLogs[0], '5', 'Should start at 5');
  assert.strictEqual(countdownLogs[4], '1', 'Should end at 1');
  assert.strictEqual(countdownLogs[5], 'Blast off!', 'Should end with Blast off!');

  // Reset logs
  logs.length = 0;

  // Test counting from 3
  countdownWhile(3);
  countdownLogs = logs.filter(log => !log.includes('==='));
  assert.strictEqual(countdownLogs.length, 4, 'Should log 4 lines for countdown from 3');
  assert.strictEqual(countdownLogs[0], '3', 'Should start at 3');
  assert.strictEqual(countdownLogs[1], '2', 'Second should be 2');
  assert.strictEqual(countdownLogs[2], '1', 'Third should be 1');
  assert.strictEqual(countdownLogs[3], 'Blast off!', 'Should end with Blast off!');

  // Reset logs
  logs.length = 0;

  // Test counting from 1
  countdownWhile(1);
  countdownLogs = logs.filter(log => !log.includes('==='));
  assert.strictEqual(countdownLogs.length, 2, 'Should log 2 lines for countdown from 1');
  assert.strictEqual(countdownLogs[0], '1', 'Should log 1');
  assert.strictEqual(countdownLogs[1], 'Blast off!', 'Should end with Blast off!');
});

test('Countdown - for loop should accept custom start parameter', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args.join(' '));
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof countdownFor, 'function', 'countdownFor should be a function');

  // Test counting from 5
  countdownFor(5);
  let countdownLogs = logs.filter(log => !log.includes('==='));
  assert.strictEqual(countdownLogs.length, 6, 'Should log 6 lines for countdown from 5');
  assert.strictEqual(countdownLogs[0], '5', 'Should start at 5');
  assert.strictEqual(countdownLogs[4], '1', 'Should end at 1');
  assert.strictEqual(countdownLogs[5], 'Blast off!', 'Should end with Blast off!');

  // Reset logs
  logs.length = 0;

  // Test counting from 10
  countdownFor(10);
  countdownLogs = logs.filter(log => !log.includes('==='));
  assert.strictEqual(countdownLogs.length, 11, 'Should log 11 lines for countdown from 10');
  assert.strictEqual(countdownLogs[0], '10', 'Should start at 10');
  assert.strictEqual(countdownLogs[9], '1', 'Should end at 1');
  assert.strictEqual(countdownLogs[10], 'Blast off!', 'Should end with Blast off!');

  // Reset logs
  logs.length = 0;

  // Test counting from 20
  countdownFor(20);
  countdownLogs = logs.filter(log => !log.includes('==='));
  assert.strictEqual(countdownLogs.length, 21, 'Should log 21 lines for countdown from 20');
  assert.strictEqual(countdownLogs[0], '20', 'Should start at 20');
  assert.strictEqual(countdownLogs[19], '1', 'Should end at 1');
  assert.strictEqual(countdownLogs[20], 'Blast off!', 'Should end with Blast off!');
});
