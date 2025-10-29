import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  MessageBuilder,
  validateEmailWithMessage,
  validatePasswordWithMessage,
  validateUsernameWithMessage,
  validateAgeWithMessage,
  validateFormWithMessages
} from './086-validator-messages.js';

test('Form Validator - Error Messages', async (t) => {

  await t.test('MessageBuilder creates field messages', () => {
    const builder = new MessageBuilder('email');
    const message = builder.required().build();
    assert.ok(message.includes('email'));
  });

  await t.test('MessageBuilder chains methods', () => {
    const builder = new MessageBuilder('password');
    const message = builder.required().minLength(8).build();
    assert.ok(typeof message === 'string');
  });

  await t.test('MessageBuilder includes specific hints', () => {
    const builder = new MessageBuilder('password');
    const message = builder.required().minLength(8).uppercase().digit().build();
    assert.ok(message.includes('8'));
  });

  await t.test('validateEmailWithMessage returns success object for valid emails', () => {
    const result = validateEmailWithMessage('user@example.com');
    assert.equal(result.isValid, true);
    assert.equal(result.message, '');
  });

  await t.test('validateEmailWithMessage returns error message for invalid emails', () => {
    const result = validateEmailWithMessage('invalid');
    assert.equal(result.isValid, false);
    assert.ok(result.message.length > 0);
    assert.ok(result.message.includes('@'));
  });

  await t.test('validateEmailWithMessage handles missing @', () => {
    const result = validateEmailWithMessage('user.example.com');
    assert.equal(result.isValid, false);
    assert.ok(result.message.includes('@'));
  });

  await t.test('validatePasswordWithMessage returns success for strong passwords', () => {
    const result = validatePasswordWithMessage('StrongPass123!');
    assert.equal(result.isValid, true);
    assert.equal(result.message, '');
  });

  await t.test('validatePasswordWithMessage provides guidance for short passwords', () => {
    const result = validatePasswordWithMessage('pass');
    assert.equal(result.isValid, false);
    assert.ok(result.message.includes('8'));
  });

  await t.test('validatePasswordWithMessage suggests improvements', () => {
    const result = validatePasswordWithMessage('password');
    assert.equal(result.isValid, false);
    assert.ok(result.message.length > 0);
  });

  await t.test('validateUsernameWithMessage returns success for valid usernames', () => {
    const result = validateUsernameWithMessage('john_doe');
    assert.equal(result.isValid, true);
    assert.equal(result.message, '');
  });

  await t.test('validateUsernameWithMessage provides guidance for invalid usernames', () => {
    const result = validateUsernameWithMessage('ab');
    assert.equal(result.isValid, false);
    assert.ok(result.message.includes('3'));
  });

  await t.test('validateAgeWithMessage returns success for valid ages', () => {
    const result = validateAgeWithMessage(25);
    assert.equal(result.isValid, true);
    assert.equal(result.message, '');
  });

  await t.test('validateAgeWithMessage provides range for invalid ages', () => {
    const result = validateAgeWithMessage(-5);
    assert.equal(result.isValid, false);
    assert.ok(result.message.includes('0'));
    assert.ok(result.message.includes('120'));
  });

  await t.test('validateFormWithMessages returns all field messages', () => {
    const result = validateFormWithMessages({
      email: 'invalid',
      password: 'short',
      username: 'ab',
      age: 150
    });
    assert.equal(result.isValid, false);
    assert.ok(result.errors.email);
    assert.ok(result.errors.password);
    assert.ok(result.errors.username);
    assert.ok(result.errors.age);
  });

  await t.test('validateFormWithMessages returns success for valid form', () => {
    const result = validateFormWithMessages({
      email: 'user@example.com',
      password: 'StrongPass123!',
      username: 'john_doe',
      age: 25
    });
    assert.equal(result.isValid, true);
    assert.deepEqual(result.errors, {});
  });

  await t.test('validateFormWithMessages returns messages for specific invalid fields', () => {
    const result = validateFormWithMessages({
      email: 'user@example.com',
      password: 'short',
      username: 'john_doe',
      age: 25
    });
    assert.equal(result.isValid, false);
    assert.equal(Object.keys(result.errors).length, 1);
    assert.ok(result.errors.password);
  });

});
