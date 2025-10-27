import test from 'node:test';
import assert from 'node:assert';
import { countdownWhile, countdownFor } from './024-countdown-for.js';

test('Countdown - while loop should still work from exercise 023', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args.join(' '));
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof countdownWhile, 'function', 'countdownWhile should be a function');

  countdownWhile();

  const countdownLogs = logs.filter(log => !log.includes('==='));
  assert.strictEqual(countdownLogs.length, 11, 'While loop should log 11 lines');
  assert.strictEqual(countdownLogs[0], '10', 'While loop should start at 10');
  assert.strictEqual(countdownLogs[9], '1', 'While loop should end at 1');
  assert.strictEqual(countdownLogs[10], 'Blast off!', 'While loop should end with "Blast off!"');
});

test('Countdown - for loop should count from 10 to 1', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args.join(' '));
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof countdownFor, 'function', 'countdownFor should be a function');

  countdownFor();

  const countdownLogs = logs.filter(log => !log.includes('==='));

  // Should have 11 outputs: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, "Blast off!"
  assert.strictEqual(countdownLogs.length, 11, 'Should log 11 lines (10 numbers + blast off message)');

  // Check each number from 10 to 1
  assert.strictEqual(countdownLogs[0], '10', 'First log should be 10');
  assert.strictEqual(countdownLogs[1], '9', 'Second log should be 9');
  assert.strictEqual(countdownLogs[2], '8', 'Third log should be 8');
  assert.strictEqual(countdownLogs[3], '7', 'Fourth log should be 7');
  assert.strictEqual(countdownLogs[4], '6', 'Fifth log should be 6');
  assert.strictEqual(countdownLogs[5], '5', 'Sixth log should be 5');
  assert.strictEqual(countdownLogs[6], '4', 'Seventh log should be 4');
  assert.strictEqual(countdownLogs[7], '3', 'Eighth log should be 3');
  assert.strictEqual(countdownLogs[8], '2', 'Ninth log should be 2');
  assert.strictEqual(countdownLogs[9], '1', 'Tenth log should be 1');
  assert.strictEqual(countdownLogs[10], 'Blast off!', 'Last log should be "Blast off!"');
});
