import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  validatePhone,
  validateURL,
  detectFormat,
  validateAny,
  extractContacts,
  formatPhone,
  normalizePhone,
  validatePhoneStrict,
  extractURLDomain,
  validateContactInfo
} from './167-email-multiple.js';

test('Email Validator - Multiple Formats', async (t) => {

  await t.test('validatePhone accepts dashed format', () => {
    assert.equal(validatePhone('123-456-7890'), true);
    assert.equal(validatePhone('555-123-4567'), true);
  });

  await t.test('validatePhone accepts parentheses format', () => {
    assert.equal(validatePhone('(123) 456-7890'), true);
    assert.equal(validatePhone('(555) 123-4567'), true);
  });

  await t.test('validatePhone accepts digits only', () => {
    assert.equal(validatePhone('1234567890'), true);
    assert.equal(validatePhone('5551234567'), true);
  });

  await t.test('validatePhone rejects invalid formats', () => {
    assert.equal(validatePhone('123456789'), false);
    assert.equal(validatePhone('12345678901'), false);
  });

  await t.test('validateURL accepts http', () => {
    assert.equal(validateURL('http://example.com'), true);
    assert.equal(validateURL('http://www.google.com'), true);
  });

  await t.test('validateURL accepts https', () => {
    assert.equal(validateURL('https://example.com'), true);
    assert.equal(validateURL('https://secure.site.org'), true);
  });

  await t.test('validateURL accepts with paths', () => {
    assert.equal(validateURL('https://example.com/path/to/page'), true);
    assert.equal(validateURL('http://site.org/index.html'), true);
  });

  await t.test('validateURL rejects without protocol', () => {
    assert.equal(validateURL('example.com'), false);
    assert.equal(validateURL('www.google.com'), false);
  });

  await t.test('detectFormat returns email', () => {
    assert.equal(detectFormat('user@example.com'), 'email');
  });

  await t.test('detectFormat returns phone', () => {
    assert.equal(detectFormat('123-456-7890'), 'phone');
    assert.equal(detectFormat('(555) 123-4567'), 'phone');
  });

  await t.test('detectFormat returns url', () => {
    assert.equal(detectFormat('http://example.com'), 'url');
    assert.equal(detectFormat('https://test.org'), 'url');
  });

  await t.test('detectFormat returns unknown for invalid', () => {
    assert.equal(detectFormat('not a format'), 'unknown');
    assert.equal(detectFormat(''), 'unknown');
  });

  await t.test('validateAny accepts email', () => {
    assert.equal(validateAny('user@example.com'), true);
  });

  await t.test('validateAny accepts phone', () => {
    assert.equal(validateAny('555-123-4567'), true);
  });

  await t.test('validateAny accepts URL', () => {
    assert.equal(validateAny('https://example.com'), true);
  });

  await t.test('validateAny rejects invalid', () => {
    assert.equal(validateAny('random text'), false);
  });

  await t.test('extractContacts finds emails', () => {
    const result = extractContacts('Contact user@test.com');
    assert.equal(result.emails.length > 0, true);
    assert.equal(result.emails.includes('user@test.com'), true);
  });

  await t.test('extractContacts finds phones', () => {
    const result = extractContacts('Call 555-123-4567');
    assert.equal(result.phones.length > 0, true);
  });

  await t.test('extractContacts finds URLs', () => {
    const result = extractContacts('Visit https://example.com');
    assert.equal(result.urls.length > 0, true);
  });

  await t.test('extractContacts finds mixed', () => {
    const text = 'Email user@test.com or call 555-123-4567 or visit https://site.com';
    const result = extractContacts(text);
    assert.equal(result.emails.length > 0, true);
    assert.equal(result.phones.length > 0, true);
    assert.equal(result.urls.length > 0, true);
  });

  await t.test('formatPhone converts to standard format', () => {
    assert.equal(formatPhone('1234567890'), '(123) 456-7890');
    assert.equal(formatPhone('5551234567'), '(555) 123-4567');
  });

  await t.test('formatPhone handles already formatted', () => {
    const result = formatPhone('(123) 456-7890');
    assert.equal(result, '(123) 456-7890');
  });

  await t.test('normalizePhone extracts digits', () => {
    assert.equal(normalizePhone('(123) 456-7890'), '1234567890');
    assert.equal(normalizePhone('123-456-7890'), '1234567890');
    assert.equal(normalizePhone('1234567890'), '1234567890');
  });

  await t.test('normalizePhone removes all non-digits', () => {
    const result = normalizePhone('(555) 123-4567');
    assert.equal(/^\d{10}$/.test(result), true);
  });

  await t.test('validatePhoneStrict accepts 10 digits', () => {
    assert.equal(validatePhoneStrict('1234567890'), true);
    assert.equal(validatePhoneStrict('5551234567'), true);
  });

  await t.test('validatePhoneStrict rejects formatted', () => {
    assert.equal(validatePhoneStrict('(123) 456-7890'), false);
    assert.equal(validatePhoneStrict('123-456-7890'), false);
  });

  await t.test('validatePhoneStrict rejects wrong length', () => {
    assert.equal(validatePhoneStrict('123456789'), false);
    assert.equal(validatePhoneStrict('12345678901'), false);
  });

  await t.test('extractURLDomain extracts domain', () => {
    assert.equal(extractURLDomain('https://example.com'), 'example.com');
    assert.equal(extractURLDomain('http://www.test.org'), 'www.test.org');
  });

  await t.test('extractURLDomain handles paths', () => {
    const result = extractURLDomain('https://example.com/path/to/page');
    assert.equal(result, 'example.com');
  });

  await t.test('extractURLDomain handles subdomains', () => {
    const result = extractURLDomain('https://mail.example.com');
    assert.equal(result.includes('mail.example.com'), true);
  });

  await t.test('validateContactInfo accepts valid email', () => {
    const contact = { email: 'user@example.com' };
    assert.equal(validateContactInfo(contact), true);
  });

  await t.test('validateContactInfo accepts valid phone', () => {
    const contact = { phone: '555-123-4567' };
    assert.equal(validateContactInfo(contact), true);
  });

  await t.test('validateContactInfo accepts valid URL', () => {
    const contact = { url: 'https://example.com' };
    assert.equal(validateContactInfo(contact), true);
  });

  await t.test('validateContactInfo rejects all invalid', () => {
    const contact = { email: 'invalid', phone: '123', url: 'not-a-url' };
    assert.equal(validateContactInfo(contact), false);
  });

  await t.test('validateContactInfo returns false for empty', () => {
    const contact = {};
    assert.equal(validateContactInfo(contact), false);
  });

  await t.test('validateContactInfo accepts mixed valid', () => {
    const contact = { email: 'user@test.com', phone: 'invalid', url: 'https://example.com' };
    assert.equal(validateContactInfo(contact), true);
  });

});
