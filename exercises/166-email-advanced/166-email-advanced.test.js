import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  validateWithWordBoundaries,
  validateEmailWithDots,
  validateEmailWithPlus,
  validateLongTLD,
  rejectConsecutiveDots,
  validateNoSpecialStart,
  findEmailsNotInBrackets,
  validateEmailWithHyphens,
  validateCommonDomains,
  extractEmailWithContext
} from './166-email-advanced.js';

test('Email Validator - Advanced Patterns', async (t) => {

  await t.test('validateWithWordBoundaries requires complete word', () => {
    assert.equal(validateWithWordBoundaries('user@example.com'), true);
    assert.equal(validateWithWordBoundaries('contact us@example.com'), true);
  });

  await t.test('validateWithWordBoundaries rejects partial matches', () => {
    assert.equal(validateWithWordBoundaries('emailuser@example.com'), false);
  });

  await t.test('validateEmailWithDots allows dots in local part', () => {
    assert.equal(validateEmailWithDots('user.name@example.com'), true);
    assert.equal(validateEmailWithDots('john.doe.smith@domain.org'), true);
  });

  await t.test('validateEmailWithDots requires valid format', () => {
    assert.equal(validateEmailWithDots('user..name@example.com'), false);
    assert.equal(validateEmailWithDots('.user@example.com'), false);
  });

  await t.test('validateEmailWithPlus allows + for tags', () => {
    assert.equal(validateEmailWithPlus('user+tag@example.com'), true);
    assert.equal(validateEmailWithPlus('admin+notifications@domain.org'), true);
  });

  await t.test('validateEmailWithPlus allows multiple special chars', () => {
    assert.equal(validateEmailWithPlus('user+tag-123@example.com'), true);
    assert.equal(validateEmailWithPlus('name.plus+tag@domain.com'), true);
  });

  await t.test('validateLongTLD validates TLD length', () => {
    assert.equal(validateLongTLD('user@example.com'), true);
    assert.equal(validateLongTLD('user@domain.org'), true);
    assert.equal(validateLongTLD('user@site.info'), true);
  });

  await t.test('validateLongTLD rejects short TLD', () => {
    assert.equal(validateLongTLD('user@example.c'), false);
  });

  await t.test('validateLongTLD rejects long TLD', () => {
    assert.equal(validateLongTLD('user@example.verylongtld'), false);
  });

  await t.test('rejectConsecutiveDots rejects double dots', () => {
    assert.equal(rejectConsecutiveDots('user..name@example.com'), false);
    assert.equal(rejectConsecutiveDots('user@exam..ple.com'), false);
  });

  await t.test('rejectConsecutiveDots allows single dots', () => {
    assert.equal(rejectConsecutiveDots('user.name@example.com'), true);
    assert.equal(rejectConsecutiveDots('user@mail.example.com'), true);
  });

  await t.test('validateNoSpecialStart rejects starting with digit', () => {
    assert.equal(validateNoSpecialStart('1user@example.com'), false);
    assert.equal(validateNoSpecialStart('9admin@domain.org'), false);
  });

  await t.test('validateNoSpecialStart rejects starting with dot', () => {
    assert.equal(validateNoSpecialStart('.user@example.com'), false);
  });

  await t.test('validateNoSpecialStart allows starting with letter', () => {
    assert.equal(validateNoSpecialStart('user@example.com'), true);
    assert.equal(validateNoSpecialStart('admin@domain.org'), true);
  });

  await t.test('findEmailsNotInBrackets excludes bracketed emails', () => {
    const result = findEmailsNotInBrackets('user@example.com and <admin@test.org>');
    assert.equal(result.includes('user@example.com'), true);
    assert.equal(result.some(e => e.includes('admin@test.org')), false);
  });

  await t.test('findEmailsNotInBrackets finds multiple unbracketed', () => {
    const result = findEmailsNotInBrackets('user1@a.com and user2@b.com');
    assert.equal(result.length, 2);
  });

  await t.test('findEmailsNotInBrackets handles mixed brackets', () => {
    const result = findEmailsNotInBrackets('Contact: user@test.com <admin@test.com> reply@test.com');
    assert.equal(result.length >= 2, true);
  });

  await t.test('validateEmailWithHyphens allows hyphens in domain', () => {
    assert.equal(validateEmailWithHyphens('user@my-domain.com'), true);
    assert.equal(validateEmailWithHyphens('admin@mail-server.org'), true);
  });

  await t.test('validateEmailWithHyphens allows hyphens in both parts', () => {
    assert.equal(validateEmailWithHyphens('user@my-company.co-uk'), true);
  });

  await t.test('validateEmailWithHyphens rejects leading hyphen', () => {
    assert.equal(validateEmailWithHyphens('user@-domain.com'), false);
  });

  await t.test('validateEmailWithHyphens rejects trailing hyphen', () => {
    assert.equal(validateEmailWithHyphens('user@domain-.com'), false);
  });

  await t.test('validateCommonDomains accepts gmail', () => {
    assert.equal(validateCommonDomains('user@gmail.com'), true);
  });

  await t.test('validateCommonDomains accepts yahoo', () => {
    assert.equal(validateCommonDomains('user@yahoo.com'), true);
  });

  await t.test('validateCommonDomains accepts outlook', () => {
    assert.equal(validateCommonDomains('user@outlook.com'), true);
  });

  await t.test('validateCommonDomains rejects other domains', () => {
    assert.equal(validateCommonDomains('user@example.com'), false);
    assert.equal(validateCommonDomains('user@domain.org'), false);
  });

  await t.test('extractEmailWithContext returns object', () => {
    const result = extractEmailWithContext('Contact user@example.com today');
    assert.equal(typeof result, 'object');
  });

  await t.test('extractEmailWithContext extracts email', () => {
    const result = extractEmailWithContext('Send to admin@test.com please');
    assert.equal(result.email, 'admin@test.com');
  });

  await t.test('extractEmailWithContext captures surrounding words', () => {
    const result = extractEmailWithContext('Email support@company.com here');
    assert.equal(result.email, 'support@company.com');
    assert.equal(result.before, 'Email');
    assert.equal(result.after, 'here');
  });

  await t.test('extractEmailWithContext handles no surrounding words', () => {
    const result = extractEmailWithContext('user@domain.com');
    assert.equal(result.email, 'user@domain.com');
  });

});
