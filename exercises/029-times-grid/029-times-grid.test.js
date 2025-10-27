import test from 'node:test';
import assert from 'node:assert';
import { timesTable, timesGrid } from './029-times-grid.js';

test('Times Grid - single table function should still work', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args.join(' '));
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof timesTable, 'function', 'timesTable should be a function');

  timesTable(5);
  let tableLogs = logs.filter(log => !log.includes('==='));
  assert.strictEqual(tableLogs[0], '5 x 1 = 5', 'timesTable should still work');
  assert.strictEqual(tableLogs.length, 10, 'timesTable should show 10 lines');
});

test('Times Grid - should create full multiplication grid', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args.join(' '));
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof timesGrid, 'function', 'timesGrid should be a function');

  timesGrid();
  let gridLogs = logs.filter(log => !log.includes('==='));

  // Should have 100 multiplication lines (10 x 10) plus 10 blank lines
  let multiplicationLines = gridLogs.filter(log => log.includes('x') && log.includes('='));
  assert.strictEqual(multiplicationLines.length, 100, 'Should display 100 multiplication equations');

  // Check first few lines (1's table)
  assert.strictEqual(multiplicationLines[0], '1 x 1 = 1', 'Should start with 1 x 1 = 1');
  assert.strictEqual(multiplicationLines[1], '1 x 2 = 2', 'Should show 1 x 2 = 2');
  assert.strictEqual(multiplicationLines[9], '1 x 10 = 10', 'Should show 1 x 10 = 10');

  // Check some from 2's table
  assert.strictEqual(multiplicationLines[10], '2 x 1 = 2', 'Should start 2s table with 2 x 1 = 2');
  assert.strictEqual(multiplicationLines[15], '2 x 6 = 12', 'Should show 2 x 6 = 12');

  // Check some from 5's table
  assert.strictEqual(multiplicationLines[40], '5 x 1 = 5', 'Should start 5s table with 5 x 1 = 5');
  assert.strictEqual(multiplicationLines[44], '5 x 5 = 25', 'Should show 5 x 5 = 25');

  // Check last few lines (10's table)
  assert.strictEqual(multiplicationLines[90], '10 x 1 = 10', 'Should start 10s table with 10 x 1 = 10');
  assert.strictEqual(multiplicationLines[99], '10 x 10 = 100', 'Should end with 10 x 10 = 100');
});
