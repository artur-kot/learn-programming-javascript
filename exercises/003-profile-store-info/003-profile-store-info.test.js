import test from 'node:test';
import assert from 'node:assert';
import { createProfile } from './003-profile-store-info.js';

test('Profile Store Info - createProfile should log name, age, and email', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args);
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof createProfile, 'function', 'createProfile should be a function');

  createProfile();

  assert.strictEqual(logs.length, 3, 'Should log exactly 3 values (name, age, email)');
  assert.strictEqual(logs[0][0], 'Sarah Chen', 'First log should be the name "Sarah Chen"');
  assert.strictEqual(logs[1][0], 28, 'Second log should be the age 28');
  assert.strictEqual(logs[2][0], 'sarah.chen@email.com', 'Third log should be the email "sarah.chen@email.com"');
});
