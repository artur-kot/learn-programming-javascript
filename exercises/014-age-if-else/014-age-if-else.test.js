import test from 'node:test';
import assert from 'node:assert';
import { classifyAge } from './014-age-if-else.js';

test('Age Checker If-Else - should classify ages as Adult or Minor', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args);
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof classifyAge, 'function', 'classifyAge should be a function');

  classifyAge();

  assert.strictEqual(logs.length, 3, 'Should log exactly 3 classification messages');
  assert.strictEqual(logs[0][0], 'Age 25: Adult', 'Age 25 should be classified as Adult');
  assert.strictEqual(logs[1][0], 'Age 16: Minor', 'Age 16 should be classified as Minor');
  assert.strictEqual(logs[2][0], 'Age 10: Minor', 'Age 10 should be classified as Minor');
});
