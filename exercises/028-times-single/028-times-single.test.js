import test from 'node:test';
import assert from 'node:assert';
import { timesTable } from './028-times-single.js';

test('Times Table - should create multiplication table for a number', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args.join(' '));
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof timesTable, 'function', 'timesTable should be a function');

  // Test with 5
  timesTable(5);
  let tableLogs = logs.filter(log => !log.includes('==='));

  assert.strictEqual(tableLogs[0], '5 x 1 = 5', 'Should show 5 x 1 = 5');
  assert.strictEqual(tableLogs[1], '5 x 2 = 10', 'Should show 5 x 2 = 10');
  assert.strictEqual(tableLogs[2], '5 x 3 = 15', 'Should show 5 x 3 = 15');
  assert.strictEqual(tableLogs[9], '5 x 10 = 50', 'Should show 5 x 10 = 50');
  assert.strictEqual(tableLogs.length, 10, 'Should display 10 lines');

  // Reset logs
  logs.length = 0;

  // Test with 3
  timesTable(3);
  tableLogs = logs.filter(log => !log.includes('==='));

  assert.strictEqual(tableLogs[0], '3 x 1 = 3', 'Should show 3 x 1 = 3');
  assert.strictEqual(tableLogs[4], '3 x 5 = 15', 'Should show 3 x 5 = 15');
  assert.strictEqual(tableLogs[9], '3 x 10 = 30', 'Should show 3 x 10 = 30');
  assert.strictEqual(tableLogs.length, 10, 'Should display 10 lines');

  // Reset logs
  logs.length = 0;

  // Test with 1
  timesTable(1);
  tableLogs = logs.filter(log => !log.includes('==='));

  assert.strictEqual(tableLogs[0], '1 x 1 = 1', 'Should show 1 x 1 = 1');
  assert.strictEqual(tableLogs[9], '1 x 10 = 10', 'Should show 1 x 10 = 10');
  assert.strictEqual(tableLogs.length, 10, 'Should display 10 lines');
});
