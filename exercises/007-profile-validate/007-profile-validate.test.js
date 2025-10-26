import test from 'node:test';
import assert from 'node:assert';
import { validateEmail } from './007-profile-validate.js';

test('Profile Validate - validateEmail should check for @ symbol and display results', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args);
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof validateEmail, 'function', 'validateEmail should be a function');

  validateEmail();

  assert.strictEqual(logs.length, 3, 'Should log exactly 3 validation results');
  assert.strictEqual(logs[0][0], 'sarah.chen@email.com is valid', 'First email should be valid');
  assert.strictEqual(logs[1][0], 'invalid.email.com is invalid', 'Second email should be invalid (no @)');
  assert.strictEqual(logs[2][0], 'john@company.org is valid', 'Third email should be valid');
});
