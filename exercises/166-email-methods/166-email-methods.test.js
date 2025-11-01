import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  testEmailFormat,
  findAllEmails,
  findFirstEmail,
  findEmailPosition,
  replaceAtSymbol,
  maskEmail,
  countEmails,
  validateEmailList,
  getValidEmails,
  normalizeEmails
} from './166-email-methods.js';

test('Email Validator - Test and Match Methods', async (t) => {

  await t.test('testEmailFormat uses test() correctly', () => {
    assert.equal(testEmailFormat('user@example.com'), true);
    assert.equal(testEmailFormat('valid@domain.org'), true);
    assert.equal(testEmailFormat('notanemail'), false);
    assert.equal(testEmailFormat('user@domain'), false);
  });

  await t.test('testEmailFormat returns boolean', () => {
    const result = testEmailFormat('test@test.com');
    assert.equal(typeof result, 'boolean');
  });

  await t.test('findAllEmails finds multiple emails with g flag', () => {
    const result = findAllEmails('Contact us@example.com or sales@company.org');
    assert.equal(Array.isArray(result), true);
    assert.equal(result.length, 2);
    assert.equal(result.includes('us@example.com'), true);
    assert.equal(result.includes('sales@company.org'), true);
  });

  await t.test('findAllEmails returns empty array when no matches', () => {
    const result = findAllEmails('no emails here');
    assert.equal(result.length, 0);
  });

  await t.test('findAllEmails handles mixed text', () => {
    const text = 'Emails: user1@test.com and user2@test.com please';
    const result = findAllEmails(text);
    assert.equal(result.length, 2);
  });

  await t.test('findFirstEmail returns first email without g flag', () => {
    const result = findFirstEmail('Contact user1@test.com or user2@test.com');
    assert.equal(result !== null, true);
    assert.equal(result[0], 'user1@test.com');
  });

  await t.test('findFirstEmail returns null when no match', () => {
    const result = findFirstEmail('no emails here');
    assert.equal(result, null);
  });

  await t.test('findFirstEmail returns array with one element', () => {
    const result = findFirstEmail('email: user@example.com and another@test.com');
    assert.equal(Array.isArray(result), true);
    assert.equal(result.length, 1);
  });

  await t.test('findEmailPosition finds @ symbol index', () => {
    assert.equal(findEmailPosition('user@example.com'), 4);
    assert.equal(findEmailPosition('john@domain.org'), 4);
    assert.equal(findEmailPosition('a@b.c'), 1);
  });

  await t.test('findEmailPosition returns -1 when not found', () => {
    assert.equal(findEmailPosition('notanemail'), -1);
    assert.equal(findEmailPosition(''), -1);
  });

  await t.test('findEmailPosition uses search()', () => {
    const result = findEmailPosition('test@example.com');
    assert.equal(typeof result, 'number');
    assert.equal(result >= -1, true);
  });

  await t.test('replaceAtSymbol replaces @ with at ', () => {
    assert.equal(replaceAtSymbol('user@example.com'), 'user at example.com');
    assert.equal(replaceAtSymbol('test@test.org'), 'test at test.org');
  });

  await t.test('replaceAtSymbol replaces only first @', () => {
    const result = replaceAtSymbol('user@@example.com');
    assert.equal(result.includes(' at @ '), true);
    assert.equal((result.match(/ at /g) || []).length, 1);
  });

  await t.test('maskEmail masks local part', () => {
    assert.equal(maskEmail('user@example.com'), 'us***@example.com');
    assert.equal(maskEmail('john@domain.org'), 'jo***@domain.org');
  });

  await t.test('maskEmail keeps @ and domain visible', () => {
    const result = maskEmail('test@mysite.com');
    assert.equal(result.includes('@'), true);
    assert.equal(result.includes('mysite.com'), true);
  });

  await t.test('maskEmail keeps first 2 characters', () => {
    const result = maskEmail('administrator@example.com');
    assert.equal(result.startsWith('ad***'), true);
  });

  await t.test('countEmails counts all emails in text', () => {
    assert.equal(countEmails('user@test.com'), 1);
    assert.equal(countEmails('user@test.com and admin@test.com'), 2);
    assert.equal(countEmails('Contact: user1@a.com, user2@b.com, user3@c.com'), 3);
  });

  await t.test('countEmails returns 0 for no emails', () => {
    assert.equal(countEmails('no emails here'), 0);
    assert.equal(countEmails(''), 0);
  });

  await t.test('countEmails returns number', () => {
    const result = countEmails('test@test.com');
    assert.equal(typeof result, 'number');
  });

  await t.test('validateEmailList checks all emails are valid', () => {
    assert.equal(validateEmailList(['user@test.com', 'admin@site.org']), true);
    assert.equal(validateEmailList(['valid@test.com', 'invalid']), false);
    assert.equal(validateEmailList([]), true);
  });

  await t.test('validateEmailList returns false if any invalid', () => {
    assert.equal(validateEmailList(['user@test.com', '@noemail', 'another@site.com']), false);
  });

  await t.test('validateEmailList uses every()', () => {
    const valid = ['a@b.c', 'user@test.org'];
    const invalid = ['x@y.z', 'notanemail', 'test@test.com'];
    assert.equal(validateEmailList(valid), true);
    assert.equal(validateEmailList(invalid), false);
  });

  await t.test('getValidEmails filters array to valid only', () => {
    const result = getValidEmails(['user@test.com', 'invalid', 'admin@site.org', '@bad']);
    assert.equal(result.length, 2);
    assert.equal(result.includes('user@test.com'), true);
    assert.equal(result.includes('admin@site.org'), true);
    assert.equal(result.includes('invalid'), false);
  });

  await t.test('getValidEmails returns empty array if no valid', () => {
    const result = getValidEmails(['not email', 'also not', 'nope']);
    assert.equal(result.length, 0);
  });

  await t.test('getValidEmails preserves valid entries', () => {
    const mixed = ['test@test.com', 'invalid', 'another@site.com'];
    const result = getValidEmails(mixed);
    assert.equal(result.every(email => email.includes('@')), true);
  });

  await t.test('normalizeEmails removes spaces around @', () => {
    assert.equal(normalizeEmails('user @ example.com'), 'user@example.com');
    assert.equal(normalizeEmails('user  @  example.com'), 'user@example.com');
    assert.equal(normalizeEmails('user\t@\texample.com'), 'user@example.com');
  });

  await t.test('normalizeEmails handles already normalized', () => {
    assert.equal(normalizeEmails('user@example.com'), 'user@example.com');
  });

  await t.test('normalizeEmails removes leading/trailing spaces around @', () => {
    const result = normalizeEmails('test @ domain.com');
    assert.equal(result, 'test@domain.com');
  });

});
