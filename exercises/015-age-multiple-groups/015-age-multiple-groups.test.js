import test from 'node:test';
import assert from 'node:assert';
import { classifyAgeGroup } from './015-age-multiple-groups.js';

test('Age Checker Multiple Groups - should classify ages into Child, Teen, Adult, Senior', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args);
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof classifyAgeGroup, 'function', 'classifyAgeGroup should be a function');

  classifyAgeGroup();

  assert.strictEqual(logs.length, 4, 'Should log exactly 4 classification messages');
  assert.strictEqual(logs[0][0], 'Age 8: Child', 'Age 8 should be classified as Child');
  assert.strictEqual(logs[1][0], 'Age 16: Teen', 'Age 16 should be classified as Teen');
  assert.strictEqual(logs[2][0], 'Age 35: Adult', 'Age 35 should be classified as Adult');
  assert.strictEqual(logs[3][0], 'Age 72: Senior', 'Age 72 should be classified as Senior');
});
