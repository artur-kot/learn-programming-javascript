import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  ValidationError,
  InvalidEmailError,
  InvalidPasswordError,
  InvalidUsernameError,
  InvalidAgeError,
  validateEmail,
  validatePassword,
  validateUsername,
  validateAge,
  validateForm
} from './084-validator-custom-errors.js';

test('Form Validator - Custom Errors', async (t) => {

  await t.test('custom error classes inherit from Error', () => {
    const error = new ValidationError("Test");
    assert.ok(error instanceof Error);
    assert.ok(error instanceof ValidationError);
  });

  await t.test('InvalidEmailError is ValidationError', () => {
    const error = new InvalidEmailError("Invalid email");
    assert.ok(error instanceof ValidationError);
    assert.ok(error instanceof InvalidEmailError);
  });

  await t.test('validateEmail throws InvalidEmailError for invalid emails', () => {
    assert.throws(
      () => validateEmail("invalid"),
      InvalidEmailError
    );
    assert.throws(
      () => validateEmail("@example.com"),
      InvalidEmailError
    );
  });

  await t.test('validateEmail returns true for valid emails', () => {
    assert.equal(validateEmail("user@example.com"), true);
    assert.equal(validateEmail("john.doe@company.org"), true);
  });

  await t.test('validatePassword throws InvalidPasswordError for short passwords', () => {
    assert.throws(
      () => validatePassword("short"),
      InvalidPasswordError
    );
  });

  await t.test('validatePassword returns true for valid passwords', () => {
    assert.equal(validatePassword("SecurePass123!"), true);
  });

  await t.test('validateUsername throws InvalidUsernameError for invalid usernames', () => {
    assert.throws(
      () => validateUsername("ab"),
      InvalidUsernameError
    );
    assert.throws(
      () => validateUsername("user@name"),
      InvalidUsernameError
    );
  });

  await t.test('validateUsername returns true for valid usernames', () => {
    assert.equal(validateUsername("john_doe"), true);
  });

  await t.test('validateAge throws InvalidAgeError for invalid ages', () => {
    assert.throws(
      () => validateAge(-5),
      InvalidAgeError
    );
    assert.throws(
      () => validateAge(150),
      InvalidAgeError
    );
  });

  await t.test('validateAge returns true for valid ages', () => {
    assert.equal(validateAge(25), true);
  });

  await t.test('validateForm returns success object for all valid fields', () => {
    const result = validateForm({
      email: "user@example.com",
      password: "SecurePass123!",
      username: "john_doe",
      age: 25
    });
    assert.deepEqual(result, {
      isValid: true,
      errors: {}
    });
  });

  await t.test('validateForm returns errors object with caught error messages', () => {
    const result = validateForm({
      email: "invalid",
      password: "short",
      username: "ab",
      age: 150
    });
    assert.equal(result.isValid, false);
    assert.ok(result.errors.email);
    assert.ok(result.errors.password);
    assert.ok(result.errors.username);
    assert.ok(result.errors.age);
  });

  await t.test('validateForm catches specific error types', () => {
    const result = validateForm({
      email: "user@example.com",
      password: "short",
      username: "john_doe",
      age: 25
    });
    assert.equal(result.isValid, false);
    assert.ok(result.errors.password);
    assert.equal(Object.keys(result.errors).length, 1);
  });

});
