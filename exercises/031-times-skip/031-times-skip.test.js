import test from 'node:test';
import assert from 'node:assert';
import { timesTable, timesGrid, timesGridRange, timesGridOddsOnly } from './031-times-skip.js';

test('Times Skip - previous functions should still work', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args.join(' '));
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof timesTable, 'function', 'timesTable should be a function');
  assert.strictEqual(typeof timesGrid, 'function', 'timesGrid should be a function');
  assert.strictEqual(typeof timesGridRange, 'function', 'timesGridRange should be a function');

  timesGridRange(1, 3, 1, 3);
  let rangeLogs = logs.filter(log => log.includes('x') && log.includes('='));
  assert.strictEqual(rangeLogs.length, 9, 'timesGridRange should still work');
});

test('Times Skip - should skip even numbers', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args.join(' '));
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof timesGridOddsOnly, 'function', 'timesGridOddsOnly should be a function');

  // Test 1-5 range (should only show 1, 3, 5)
  timesGridOddsOnly(1, 5, 1, 5);
  let oddsLogs = logs.filter(log => log.includes('x') && log.includes('=') && !log.includes('==='));

  // Should only have odd x odd combinations: 1x1, 1x3, 1x5, 3x1, 3x3, 3x5, 5x1, 5x3, 5x5 = 9 total
  assert.strictEqual(oddsLogs.length, 9, 'Should display 9 equations (3 odd rows x 3 odd cols)');

  // Check that we have 1's row (only odd columns)
  assert.strictEqual(oddsLogs[0], '1 x 1 = 1', 'Should show 1 x 1 = 1');
  assert.strictEqual(oddsLogs[1], '1 x 3 = 3', 'Should show 1 x 3 = 3');
  assert.strictEqual(oddsLogs[2], '1 x 5 = 5', 'Should show 1 x 5 = 5');

  // Check that we have 3's row (only odd columns)
  assert.strictEqual(oddsLogs[3], '3 x 1 = 3', 'Should show 3 x 1 = 3');
  assert.strictEqual(oddsLogs[4], '3 x 3 = 9', 'Should show 3 x 3 = 9');
  assert.strictEqual(oddsLogs[5], '3 x 5 = 15', 'Should show 3 x 5 = 15');

  // Check that we have 5's row (only odd columns)
  assert.strictEqual(oddsLogs[6], '5 x 1 = 5', 'Should show 5 x 1 = 5');
  assert.strictEqual(oddsLogs[7], '5 x 3 = 15', 'Should show 5 x 3 = 15');
  assert.strictEqual(oddsLogs[8], '5 x 5 = 25', 'Should show 5 x 5 = 25');

  // Make sure no even numbers appear
  assert.ok(!oddsLogs.some(log => log.includes('2 x')), 'Should not have any 2 x equations');
  assert.ok(!oddsLogs.some(log => log.includes('4 x')), 'Should not have any 4 x equations');
  assert.ok(!oddsLogs.some(log => log.includes('x 2 ')), 'Should not have any x 2 equations');
  assert.ok(!oddsLogs.some(log => log.includes('x 4 ')), 'Should not have any x 4 equations');

  logs.length = 0;

  // Test 1-10 range (should only show 1, 3, 5, 7, 9)
  timesGridOddsOnly(1, 10, 1, 10);
  oddsLogs = logs.filter(log => log.includes('x') && log.includes('=') && !log.includes('==='));

  // Should only have 5 odd rows x 5 odd columns = 25 equations
  assert.strictEqual(oddsLogs.length, 25, 'Should display 25 equations (5 odd rows x 5 odd cols)');

  // Verify some specific odd combinations
  assert.ok(oddsLogs.some(log => log === '7 x 9 = 63'), 'Should include 7 x 9 = 63');
  assert.ok(oddsLogs.some(log => log === '9 x 9 = 81'), 'Should include 9 x 9 = 81');

  // Make sure no even numbers appear
  assert.ok(!oddsLogs.some(log => log.includes('6 x')), 'Should not have any 6 x equations');
  assert.ok(!oddsLogs.some(log => log.includes('8 x')), 'Should not have any 8 x equations');
  assert.ok(!oddsLogs.some(log => log.includes('10 x')), 'Should not have any 10 x equations');
  assert.ok(!oddsLogs.some(log => log.includes('x 6 ')), 'Should not have any x 6 equations');
  assert.ok(!oddsLogs.some(log => log.includes('x 8 ')), 'Should not have any x 8 equations');
  assert.ok(!oddsLogs.some(log => log.includes('x 10 ')), 'Should not have any x 10 equations');
});
