import test from 'node:test';
import assert from 'node:assert';
import { displayProfile } from './004-profile-concatenation.js';

test('Profile Concatenation - displayProfile should log formatted profile info', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args);
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof displayProfile, 'function', 'displayProfile should be a function');

  displayProfile();

  assert.strictEqual(logs.length, 3, 'Should log exactly 3 formatted messages');
  assert.strictEqual(logs[0][0], 'Name: Sarah Chen', 'First log should be "Name: Sarah Chen"');
  assert.strictEqual(logs[1][0], 'Age: 28', 'Second log should be "Age: 28"');
  assert.strictEqual(logs[2][0], 'Email: sarah.chen@email.com', 'Third log should be "Email: sarah.chen@email.com"');
});
