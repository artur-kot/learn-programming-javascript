import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validateAge,
  validateForm
} from './083-validator-try-catch.js';

test('Form Validator - Try-Catch Basics', async (t) => {

  await t.test('validateEmail returns true for valid emails', () => {
    assert.equal(validateEmail("user@example.com"), true);
    assert.equal(validateEmail("john.doe@company.org"), true);
  });

  await t.test('validateEmail returns false for invalid emails', () => {
    assert.equal(validateEmail("invalid"), false);
    assert.equal(validateEmail("@example.com"), false);
    assert.equal(validateEmail("user@"), false);
  });

  await t.test('validateEmail handles null/undefined gracefully', () => {
    assert.equal(validateEmail(null), false);
    assert.equal(validateEmail(undefined), false);
  });

  await t.test('validatePassword returns true for valid passwords', () => {
    assert.equal(validatePassword("SecurePass123!"), true);
    assert.equal(validatePassword("MyPassword456"), true);
  });

  await t.test('validatePassword returns false for short passwords', () => {
    assert.equal(validatePassword("short"), false);
    assert.equal(validatePassword("123"), false);
  });

  await t.test('validatePassword handles null/undefined gracefully', () => {
    assert.equal(validatePassword(null), false);
    assert.equal(validatePassword(undefined), false);
  });

  await t.test('validateUsername returns true for valid usernames', () => {
    assert.equal(validateUsername("john_doe"), true);
    assert.equal(validateUsername("user123"), true);
  });

  await t.test('validateUsername returns false for invalid usernames', () => {
    assert.equal(validateUsername("ab"), false);
    assert.equal(validateUsername("user@name"), false);
  });

  await t.test('validateUsername handles null/undefined gracefully', () => {
    assert.equal(validateUsername(null), false);
    assert.equal(validateUsername(undefined), false);
  });

  await t.test('validateAge returns true for valid ages', () => {
    assert.equal(validateAge(25), true);
    assert.equal(validateAge(65), true);
  });

  await t.test('validateAge returns false for invalid ages', () => {
    assert.equal(validateAge(-5), false);
    assert.equal(validateAge(150), false);
  });

  await t.test('validateAge handles null/undefined gracefully', () => {
    assert.equal(validateAge(null), false);
    assert.equal(validateAge(undefined), false);
  });

  await t.test('validateForm returns object with all fields valid', () => {
    const result = validateForm({
      email: "user@example.com",
      password: "SecurePass123!",
      username: "john_doe",
      age: 25
    });
    assert.deepEqual(result, {
      isValid: true,
      errors: []
    });
  });

  await t.test('validateForm returns object with errors for invalid fields', () => {
    const result = validateForm({
      email: "invalid",
      password: "short",
      username: "ab",
      age: 150
    });
    assert.equal(result.isValid, false);
    assert.equal(result.errors.length, 4);
  });

  await t.test('validateForm handles mixed valid/invalid fields', () => {
    const result = validateForm({
      email: "user@example.com",
      password: "short",
      username: "john_doe",
      age: 25
    });
    assert.equal(result.isValid, false);
    assert.equal(result.errors.length, 1);
  });

});
