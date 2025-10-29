import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  DebugValidator,
  validateWithDebug,
  validateBatchWithDebug,
  validateAndProfile,
  generateDebugReport
} from './087-validator-debug.js';

test('Form Validator - Debug Mode', async (t) => {

  await t.test('DebugValidator tracks operations', () => {
    const validator = new DebugValidator();
    validator.setDebugMode(true);
    assert.ok(validator.isDebugMode());
  });

  await t.test('DebugValidator disables debug mode', () => {
    const validator = new DebugValidator();
    validator.setDebugMode(true);
    validator.setDebugMode(false);
    assert.equal(validator.isDebugMode(), false);
  });

  await t.test('DebugValidator validates correctly', () => {
    const validator = new DebugValidator();
    const result = validator.validate('user@example.com');
    assert.equal(result.isValid, true);
  });

  await t.test('DebugValidator gets debug info', () => {
    const validator = new DebugValidator();
    validator.setDebugMode(true);
    validator.validate('user@example.com');
    const info = validator.getDebugInfo();
    assert.ok(info);
  });

  await t.test('validateWithDebug returns result for valid email', () => {
    const result = validateWithDebug('user@example.com', false);
    assert.equal(result.isValid, true);
  });

  await t.test('validateWithDebug returns result for invalid email', () => {
    const result = validateWithDebug('invalid', false);
    assert.equal(result.isValid, false);
  });

  await t.test('validateWithDebug includes timestamp', () => {
    const result = validateWithDebug('user@example.com', false);
    assert.ok(result.timestamp !== undefined);
  });

  await t.test('validateWithDebug includes duration', () => {
    const result = validateWithDebug('user@example.com', false);
    assert.ok(typeof result.duration === 'number');
    assert.ok(result.duration >= 0);
  });

  await t.test('validateBatchWithDebug returns array of results', () => {
    const items = ['user@example.com', 'invalid', 'john@test.org'];
    const results = validateBatchWithDebug(items, false);
    assert.equal(results.length, 3);
  });

  await t.test('validateBatchWithDebug tracks statistics', () => {
    const items = ['user@example.com', 'invalid', 'john@test.org'];
    const results = validateBatchWithDebug(items, false);
    assert.ok(results.stats);
    assert.equal(results.stats.total, 3);
  });

  await t.test('validateBatchWithDebug counts successes', () => {
    const items = ['user@example.com', 'john@test.org'];
    const results = validateBatchWithDebug(items, false);
    assert.equal(results.stats.succeeded, 2);
  });

  await t.test('validateBatchWithDebug counts failures', () => {
    const items = ['invalid', 'bad@'];
    const results = validateBatchWithDebug(items, false);
    assert.equal(results.stats.failed, 2);
  });

  await t.test('validateAndProfile returns profiling data', () => {
    const items = ['user@example.com', 'invalid'];
    const result = validateAndProfile(items);
    assert.ok(result.profile);
  });

  await t.test('validateAndProfile includes timing information', () => {
    const items = ['user@example.com'];
    const result = validateAndProfile(items);
    assert.ok(result.profile.totalTime >= 0);
  });

  await t.test('validateAndProfile includes average time', () => {
    const items = ['user@example.com', 'john@test.org'];
    const result = validateAndProfile(items);
    assert.ok(result.profile.averageTime >= 0);
  });

  await t.test('generateDebugReport creates structured report', () => {
    const results = [
      { isValid: true, email: 'user@example.com', duration: 1 },
      { isValid: false, email: 'invalid', duration: 1 }
    ];
    const report = generateDebugReport(results);
    assert.ok(report);
  });

  await t.test('generateDebugReport includes summary', () => {
    const results = [
      { isValid: true, email: 'user@example.com', duration: 1 },
      { isValid: false, email: 'invalid', duration: 1 }
    ];
    const report = generateDebugReport(results);
    assert.ok(report.summary);
    assert.equal(report.summary.total, 2);
  });

  await t.test('generateDebugReport calculates success rate', () => {
    const results = [
      { isValid: true, email: 'user@example.com', duration: 1 },
      { isValid: false, email: 'invalid', duration: 1 }
    ];
    const report = generateDebugReport(results);
    assert.equal(report.summary.successRate, 50);
  });

  await t.test('generateDebugReport includes performance metrics', () => {
    const results = [
      { isValid: true, email: 'user@example.com', duration: 5 },
      { isValid: true, email: 'john@test.org', duration: 3 }
    ];
    const report = generateDebugReport(results);
    assert.ok(report.performance);
    assert.equal(report.performance.slowest, 5);
    assert.equal(report.performance.fastest, 3);
  });

});
