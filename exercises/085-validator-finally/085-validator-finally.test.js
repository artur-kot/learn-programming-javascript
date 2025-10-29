import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  ValidationLogger,
  validateWithLogging,
  batchValidate,
  validateAndCleanup,
  secureValidate
} from './085-validator-finally.js';

test('Form Validator - Finally Cleanup', async (t) => {

  await t.test('ValidationLogger tracks attempts', () => {
    const logger = new ValidationLogger();
    assert.equal(logger.getAttempts(), 0);
    logger.recordAttempt('test@example.com');
    assert.equal(logger.getAttempts(), 1);
  });

  await t.test('ValidationLogger tracks successes', () => {
    const logger = new ValidationLogger();
    assert.equal(logger.getSuccesses(), 0);
    logger.recordSuccess('test@example.com');
    assert.equal(logger.getSuccesses(), 1);
  });

  await t.test('ValidationLogger tracks failures', () => {
    const logger = new ValidationLogger();
    assert.equal(logger.getFailures(), 0);
    logger.recordFailure('invalid', 'InvalidEmailError');
    assert.equal(logger.getFailures(), 1);
  });

  await t.test('ValidationLogger returns summary', () => {
    const logger = new ValidationLogger();
    logger.recordAttempt('test@example.com');
    logger.recordSuccess('test@example.com');
    logger.recordAttempt('invalid');
    logger.recordFailure('invalid', 'InvalidEmailError');
    
    const summary = logger.getSummary();
    assert.equal(summary.attempts, 2);
    assert.equal(summary.successes, 1);
    assert.equal(summary.failures, 1);
  });

  await t.test('validateWithLogging calls logger for valid input', () => {
    const logger = new ValidationLogger();
    const result = validateWithLogging('user@example.com', logger);
    
    assert.equal(result.isValid, true);
    assert.equal(logger.getAttempts(), 1);
    assert.equal(logger.getSuccesses(), 1);
    assert.equal(logger.getFailures(), 0);
  });

  await t.test('validateWithLogging calls logger for invalid input', () => {
    const logger = new ValidationLogger();
    const result = validateWithLogging('invalid', logger);
    
    assert.equal(result.isValid, false);
    assert.equal(logger.getAttempts(), 1);
    assert.equal(logger.getFailures(), 1);
  });

  await t.test('validateWithLogging logs even on error', () => {
    const logger = new ValidationLogger();
    const result = validateWithLogging(null, logger);
    
    assert.equal(result.isValid, false);
    assert.equal(logger.getAttempts(), 1);
  });

  await t.test('batchValidate logs all items', () => {
    const logger = new ValidationLogger();
    const items = [
      'user@example.com',
      'invalid',
      'john@company.org'
    ];
    
    const results = batchValidate(items, logger);
    assert.equal(logger.getAttempts(), 3);
  });

  await t.test('batchValidate returns array of results', () => {
    const logger = new ValidationLogger();
    const items = ['user@example.com', 'invalid'];
    const results = batchValidate(items, logger);
    
    assert.equal(results.length, 2);
    assert.equal(results[0].isValid, true);
    assert.equal(results[1].isValid, false);
  });

  await t.test('validateAndCleanup calls cleanup function', () => {
    let cleanupCalled = false;
    const cleanup = () => { cleanupCalled = true; };
    
    validateAndCleanup('user@example.com', cleanup);
    assert.equal(cleanupCalled, true);
  });

  await t.test('validateAndCleanup calls cleanup even on error', () => {
    let cleanupCalled = false;
    const cleanup = () => { cleanupCalled = true; };
    
    validateAndCleanup('invalid', cleanup);
    assert.equal(cleanupCalled, true);
  });

  await t.test('secureValidate tracks timing', () => {
    const result = secureValidate('user@example.com');
    assert.ok(result.duration >= 0);
    assert.equal(result.isValid, true);
  });

  await t.test('secureValidate includes timestamp', () => {
    const result = secureValidate('user@example.com');
    assert.ok(result.timestamp);
    assert.ok(typeof result.timestamp === 'number');
  });

  await t.test('secureValidate logs failures with timing', () => {
    const result = secureValidate('invalid');
    assert.equal(result.isValid, false);
    assert.ok(result.duration >= 0);
    assert.ok(result.timestamp);
  });

});
