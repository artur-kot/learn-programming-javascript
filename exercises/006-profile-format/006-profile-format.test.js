import test from 'node:test';
import assert from 'node:assert';
import { formatProfile } from './006-profile-format.js';

test('Profile Format - formatProfile should format and display profile with string methods', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args);
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof formatProfile, 'function', 'formatProfile should be a function');

  formatProfile();

  assert.strictEqual(logs.length, 4, 'Should log exactly 4 messages');
  assert.strictEqual(logs[0][0], 'Name: sarah chen', 'First log should be the trimmed name');
  assert.strictEqual(logs[1][0], 'Role: SOFTWARE ENGINEER', 'Second log should be the role in uppercase');
  assert.strictEqual(logs[2][0], 'Company: tech corp', 'Third log should be the company in lowercase');
  assert.strictEqual(logs[3][0], 'Name length: 10', 'Fourth log should be the length of the cleaned name');
});
