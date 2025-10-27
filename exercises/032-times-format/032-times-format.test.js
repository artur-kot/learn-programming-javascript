import test from 'node:test';
import assert from 'node:assert';
import { timesTable, timesGrid, timesGridRange, timesGridOddsOnly, timesGridFormatted } from './032-times-format.js';

test('Times Format - previous functions should still work', (t) => {
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
  assert.strictEqual(typeof timesGridOddsOnly, 'function', 'timesGridOddsOnly should be a function');

  timesTable(5);
  let tableLogs = logs.filter(log => !log.includes('===') && log !== '');
  assert.strictEqual(tableLogs[0], '5 x 1 = 5', 'timesTable should still work');
});

test('Times Format - should create formatted multiplication table', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args.join(' '));
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof timesGridFormatted, 'function', 'timesGridFormatted should be a function');

  // Test 5x5 table
  timesGridFormatted(5);
  let formattedLogs = logs.filter(log => !log.includes('===') && log !== '');

  // Should have exactly 5 lines (one per row)
  assert.strictEqual(formattedLogs.length, 5, 'Should have 5 rows for 5x5 table');

  // Check first row (1's table): should have all products on one line
  let firstRow = formattedLogs[0];
  assert.ok(firstRow.includes('1'), 'First row should include 1');
  assert.ok(firstRow.includes('2'), 'First row should include 2');
  assert.ok(firstRow.includes('3'), 'First row should include 3');
  assert.ok(firstRow.includes('4'), 'First row should include 4');
  assert.ok(firstRow.includes('5'), 'First row should include 5');

  // Check that numbers are padded (should have leading spaces for alignment)
  // First number should be right-aligned: "   1" (4 chars wide)
  assert.ok(firstRow.match(/^\s+1/), 'First number should have leading spaces');

  // Check last row (5's table)
  let lastRow = formattedLogs[4];
  assert.ok(lastRow.includes('5'), 'Last row should include 5');
  assert.ok(lastRow.includes('10'), 'Last row should include 10');
  assert.ok(lastRow.includes('15'), 'Last row should include 15');
  assert.ok(lastRow.includes('20'), 'Last row should include 20');
  assert.ok(lastRow.includes('25'), 'Last row should include 25');

  logs.length = 0;

  // Test 3x3 table
  timesGridFormatted(3);
  formattedLogs = logs.filter(log => !log.includes('===') && log !== '');

  assert.strictEqual(formattedLogs.length, 3, 'Should have 3 rows for 3x3 table');

  // Check second row (2's table): 2, 4, 6
  let secondRow = formattedLogs[1];
  assert.ok(secondRow.includes('2'), 'Second row should include 2');
  assert.ok(secondRow.includes('4'), 'Second row should include 4');
  assert.ok(secondRow.includes('6'), 'Second row should include 6');

  logs.length = 0;

  // Test 10x10 table
  timesGridFormatted(10);
  formattedLogs = logs.filter(log => !log.includes('===') && log !== '');

  assert.strictEqual(formattedLogs.length, 10, 'Should have 10 rows for 10x10 table');

  // Check that large numbers appear (like 100 from 10x10)
  let tenthRow = formattedLogs[9];
  assert.ok(tenthRow.includes('100'), 'Tenth row should include 100');
});
