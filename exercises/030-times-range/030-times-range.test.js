import test from 'node:test';
import assert from 'node:assert';
import { timesTable, timesGrid, timesGridRange } from './030-times-range.js';

test('Times Range - previous functions should still work', (t) => {
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

  timesTable(3);
  let tableLogs = logs.filter(log => !log.includes('===') && log !== '');
  assert.strictEqual(tableLogs[0], '3 x 1 = 3', 'timesTable should still work');

  logs.length = 0;

  timesGrid();
  let gridLogs = logs.filter(log => log.includes('x') && log.includes('='));
  assert.strictEqual(gridLogs.length, 100, 'timesGrid should still work');
});

test('Times Range - should create custom range grids', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args.join(' '));
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof timesGridRange, 'function', 'timesGridRange should be a function');

  // Test 5x5 grid (1-5 rows, 1-5 cols)
  timesGridRange(1, 5, 1, 5);
  let rangeLogs = logs.filter(log => log.includes('x') && log.includes('=') && !log.includes('==='));
  assert.strictEqual(rangeLogs.length, 25, 'Should display 25 equations for 5x5 grid');
  assert.strictEqual(rangeLogs[0], '1 x 1 = 1', 'Should start with 1 x 1 = 1');
  assert.strictEqual(rangeLogs[4], '1 x 5 = 5', 'Should show 1 x 5 = 5');
  assert.strictEqual(rangeLogs[24], '5 x 5 = 25', 'Should end with 5 x 5 = 25');

  logs.length = 0;

  // Test custom range: 3-7 rows, 1-10 cols
  timesGridRange(3, 7, 1, 10);
  rangeLogs = logs.filter(log => log.includes('x') && log.includes('=') && !log.includes('==='));
  assert.strictEqual(rangeLogs.length, 50, 'Should display 50 equations (5 rows x 10 cols)');
  assert.strictEqual(rangeLogs[0], '3 x 1 = 3', 'Should start with 3 x 1 = 3');
  assert.strictEqual(rangeLogs[9], '3 x 10 = 30', 'Should show 3 x 10 = 30');
  assert.strictEqual(rangeLogs[49], '7 x 10 = 70', 'Should end with 7 x 10 = 70');

  logs.length = 0;

  // Test 2x2 grid (8-9 rows, 8-9 cols)
  timesGridRange(8, 9, 8, 9);
  rangeLogs = logs.filter(log => log.includes('x') && log.includes('=') && !log.includes('==='));
  assert.strictEqual(rangeLogs.length, 4, 'Should display 4 equations for 2x2 grid');
  assert.strictEqual(rangeLogs[0], '8 x 8 = 64', 'Should start with 8 x 8 = 64');
  assert.strictEqual(rangeLogs[1], '8 x 9 = 72', 'Should show 8 x 9 = 72');
  assert.strictEqual(rangeLogs[2], '9 x 8 = 72', 'Should show 9 x 8 = 72');
  assert.strictEqual(rangeLogs[3], '9 x 9 = 81', 'Should end with 9 x 9 = 81');

  logs.length = 0;

  // Test single cell (5-5 rows, 5-5 cols)
  timesGridRange(5, 5, 5, 5);
  rangeLogs = logs.filter(log => log.includes('x') && log.includes('=') && !log.includes('==='));
  assert.strictEqual(rangeLogs.length, 1, 'Should display 1 equation for 1x1 grid');
  assert.strictEqual(rangeLogs[0], '5 x 5 = 25', 'Should show 5 x 5 = 25');
});
