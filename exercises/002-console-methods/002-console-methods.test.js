import test from 'node:test';
import assert from 'node:assert';
import { logInfo, logWarning, logError } from './002-console-methods.js';

test('Console Methods Exercise - logInfo should use console.log', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args);
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof logInfo, 'function');
  logInfo('Information');
  assert.strictEqual(logs.length, 1);
  assert.strictEqual(logs[0][0], 'Information');
});

test('Console Methods Exercise - logWarning should use console.warn', (t) => {
  const warnings = [];
  const originalWarn = console.warn;

  console.warn = (...args) => {
    warnings.push(args);
  };

  t.after(() => {
    console.warn = originalWarn;
  });

  assert.strictEqual(typeof logWarning, 'function');
  logWarning('Warning');
  assert.strictEqual(warnings.length, 1);
  assert.strictEqual(warnings[0][0], 'Warning');
});

test('Console Methods Exercise - logError should use console.error', (t) => {
  const errors = [];
  const originalError = console.error;

  console.error = (...args) => {
    errors.push(args);
  };

  t.after(() => {
    console.error = originalError;
  });

  assert.strictEqual(typeof logError, 'function');
  logError('Error');
  assert.strictEqual(errors.length, 1);
  assert.strictEqual(errors[0][0], 'Error');
});
