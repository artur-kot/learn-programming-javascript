import test from 'node:test';
import assert from 'node:assert';
import { countdownWhile, countdownFor, countdownByInterval, countdownWithStop } from './027-countdown-break.js';

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
  assert.strictEqual(typeof countdownByInterval, 'function', 'countdownByInterval should be a function');

  countdownWhile(5);
  let countdownLogs = logs.filter(log => !log.includes('==='));
  assert.strictEqual(countdownLogs.length, 6, 'countdownWhile should still work');

  logs.length = 0;

  countdownByInterval(10, 2);
  countdownLogs = logs.filter(log => !log.includes('==='));
  assert.strictEqual(countdownLogs[0], '10', 'countdownByInterval should still work');
  assert.strictEqual(countdownLogs[1], '8', 'countdownByInterval should count by intervals');
});

test('Countdown - should stop early at specified number', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args.join(' '));
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof countdownWithStop, 'function', 'countdownWithStop should be a function');

  // Test stopping at 5 from 10
  countdownWithStop(10, 5);
  let countdownLogs = logs.filter(log => !log.includes('==='));
  assert.strictEqual(countdownLogs[0], '10', 'Should start at 10');
  assert.strictEqual(countdownLogs[1], '9', 'Should show 9');
  assert.strictEqual(countdownLogs[2], '8', 'Should show 8');
  assert.strictEqual(countdownLogs[3], '7', 'Should show 7');
  assert.strictEqual(countdownLogs[4], '6', 'Should show 6');
  assert.strictEqual(countdownLogs[5], '5', 'Should show 5 (the stop point)');
  assert.strictEqual(countdownLogs[6], 'Stopped at 5!', 'Should end with "Stopped at 5!"');
  assert.strictEqual(countdownLogs.length, 7, 'Should have 7 lines (6 numbers + stopped message)');

  // Should NOT show 4, 3, 2, 1 because it stopped at 5
  assert.ok(!countdownLogs.includes('4'), 'Should not show 4 (stopped at 5)');
  assert.ok(!countdownLogs.includes('3'), 'Should not show 3 (stopped at 5)');
  assert.ok(!countdownLogs.includes('Blast off!'), 'Should not show "Blast off!" (stopped early)');

  // Reset logs
  logs.length = 0;

  // Test stopping at 7 from 10
  countdownWithStop(10, 7);
  countdownLogs = logs.filter(log => !log.includes('==='));
  assert.strictEqual(countdownLogs[0], '10', 'Should start at 10');
  assert.strictEqual(countdownLogs[1], '9', 'Should show 9');
  assert.strictEqual(countdownLogs[2], '8', 'Should show 8');
  assert.strictEqual(countdownLogs[3], '7', 'Should show 7 (the stop point)');
  assert.strictEqual(countdownLogs[4], 'Stopped at 7!', 'Should end with "Stopped at 7!"');
  assert.strictEqual(countdownLogs.length, 5, 'Should have 5 lines (4 numbers + stopped message)');

  // Reset logs
  logs.length = 0;

  // Test stopping at 1 from 5 (counting all the way)
  countdownWithStop(5, 1);
  countdownLogs = logs.filter(log => !log.includes('==='));
  assert.strictEqual(countdownLogs[0], '5', 'Should start at 5');
  assert.strictEqual(countdownLogs[1], '4', 'Should show 4');
  assert.strictEqual(countdownLogs[2], '3', 'Should show 3');
  assert.strictEqual(countdownLogs[3], '2', 'Should show 2');
  assert.strictEqual(countdownLogs[4], '1', 'Should show 1 (the stop point)');
  assert.strictEqual(countdownLogs[5], 'Stopped at 1!', 'Should end with "Stopped at 1!"');
  assert.strictEqual(countdownLogs.length, 6, 'Should have 6 lines (5 numbers + stopped message)');

  // Reset logs
  logs.length = 0;

  // Test stopping at starting number (immediately)
  countdownWithStop(10, 10);
  countdownLogs = logs.filter(log => !log.includes('==='));
  assert.strictEqual(countdownLogs[0], '10', 'Should show 10');
  assert.strictEqual(countdownLogs[1], 'Stopped at 10!', 'Should immediately stop');
  assert.strictEqual(countdownLogs.length, 2, 'Should only have 2 lines (1 number + stopped message)');
});
