import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  isSimpleEmail,
  hasAtSymbol,
  hasDotAfterAt,
  isValidBasicFormat,
  countAtSymbols,
  checkLocalPart,
  checkDomainPart,
  extractDomain,
  extractExtension,
  isValidExtension
} from './163-email-basic.js';

test('Email Validator - Basic Pattern', async (t) => {

  await t.test('isSimpleEmail validates basic emails', () => {
    assert.equal(isSimpleEmail('user@example.com'), true);
    assert.equal(isSimpleEmail('john@domain.org'), true);
    assert.equal(isSimpleEmail('test123@site.co'), true);
  });

  await t.test('isSimpleEmail rejects invalid formats', () => {
    assert.equal(isSimpleEmail('notanemail'), false);
    assert.equal(isSimpleEmail('user@domain'), false);
    assert.equal(isSimpleEmail('@example.com'), false);
    assert.equal(isSimpleEmail('user@.com'), false);
  });

  await t.test('isSimpleEmail handles edge cases', () => {
    assert.equal(isSimpleEmail(''), false);
    assert.equal(isSimpleEmail('a@b.c'), true);
    assert.equal(isSimpleEmail('user@@example.com'), false);
  });

  await t.test('hasAtSymbol finds single @', () => {
    assert.equal(hasAtSymbol('user@example.com'), true);
    assert.equal(hasAtSymbol('john@domain.org'), true);
  });

  await t.test('hasAtSymbol rejects no @', () => {
    assert.equal(hasAtSymbol('userexample.com'), false);
    assert.equal(hasAtSymbol(''), false);
  });

  await t.test('hasAtSymbol rejects multiple @', () => {
    assert.equal(hasAtSymbol('user@@example.com'), false);
    assert.equal(hasAtSymbol('user@middle@domain.com'), false);
  });

  await t.test('hasDotAfterAt validates dot placement', () => {
    assert.equal(hasDotAfterAt('user@example.com'), true);
    assert.equal(hasDotAfterAt('test@domain.org'), true);
  });

  await t.test('hasDotAfterAt rejects missing dot', () => {
    assert.equal(hasDotAfterAt('user@examplecom'), false);
    assert.equal(hasDotAfterAt('user@'), false);
  });

  await t.test('hasDotAfterAt handles edge cases', () => {
    assert.equal(hasDotAfterAt('user@domain.'), true);
    assert.equal(hasDotAfterAt('user@.'), false);
  });

  await t.test('isValidBasicFormat validates complete format', () => {
    assert.equal(isValidBasicFormat('user@example.com'), true);
    assert.equal(isValidBasicFormat('john123@domain.org'), true);
    assert.equal(isValidBasicFormat('a@b.co'), true);
  });

  await t.test('isValidBasicFormat rejects invalid characters', () => {
    assert.equal(isValidBasicFormat('user.name@example.com'), false);
    assert.equal(isValidBasicFormat('user+tag@domain.com'), false);
    assert.equal(isValidBasicFormat('user-name@domain.com'), false);
  });

  await t.test('isValidBasicFormat rejects missing parts', () => {
    assert.equal(isValidBasicFormat('@example.com'), false);
    assert.equal(isValidBasicFormat('user@'), false);
    assert.equal(isValidBasicFormat('user@.com'), false);
  });

  await t.test('countAtSymbols counts correctly', () => {
    assert.equal(countAtSymbols('user@example.com'), 1);
    assert.equal(countAtSymbols('user@@example.com'), 2);
    assert.equal(countAtSymbols('no at symbol'), 0);
  });

  await t.test('countAtSymbols handles edge cases', () => {
    assert.equal(countAtSymbols(''), 0);
    assert.equal(countAtSymbols('@@@'), 3);
    assert.equal(countAtSymbols('a@b@c@d'), 3);
  });

  await t.test('checkLocalPart validates characters', () => {
    assert.equal(checkLocalPart('user@example.com'), true);
    assert.equal(checkLocalPart('john.doe@domain.com'), true);
    assert.equal(checkLocalPart('test123@site.com'), true);
  });

  await t.test('checkLocalPart rejects special characters', () => {
    assert.equal(checkLocalPart('user+tag@domain.com'), false);
    assert.equal(checkLocalPart('user-name@domain.com'), false);
    assert.equal(checkLocalPart('user name@domain.com'), false);
  });

  await t.test('checkLocalPart handles multiple dots', () => {
    assert.equal(checkLocalPart('user.name.here@domain.com'), true);
  });

  await t.test('checkDomainPart validates characters', () => {
    assert.equal(checkDomainPart('user@example.com'), true);
    assert.equal(checkDomainPart('user@mail-server.com'), true);
    assert.equal(checkDomainPart('user@sub.domain.com'), true);
  });

  await t.test('checkDomainPart rejects invalid characters', () => {
    assert.equal(checkDomainPart('user@domain_.com'), false);
    assert.equal(checkDomainPart('user@domain@com'), false);
    assert.equal(checkDomainPart('user@domain com'), false);
  });

  await t.test('checkDomainPart allows hyphens', () => {
    assert.equal(checkDomainPart('user@mail-server.com'), true);
    assert.equal(checkDomainPart('user@my-domain.co.uk'), true);
  });

  await t.test('extractDomain extracts correctly', () => {
    assert.equal(extractDomain('user@example.com'), 'example');
    assert.equal(extractDomain('john@company.org'), 'company');
    assert.equal(extractDomain('test@mail.co.uk'), 'mail');
  });

  await t.test('extractDomain handles subdomains', () => {
    assert.equal(extractDomain('user@mail.example.com'), 'mail');
  });

  await t.test('extractDomain returns empty for invalid email', () => {
    assert.equal(extractDomain('notanemail'), '');
    assert.equal(extractDomain('user@domain'), '');
  });

  await t.test('extractExtension extracts correctly', () => {
    assert.equal(extractExtension('user@example.com'), 'com');
    assert.equal(extractExtension('john@domain.org'), 'org');
    assert.equal(extractExtension('test@site.co.uk'), 'uk');
  });

  await t.test('extractExtension handles various TLDs', () => {
    assert.equal(extractExtension('user@example.co'), 'co');
    assert.equal(extractExtension('user@domain.info'), 'info');
    assert.equal(extractExtension('user@site.museum'), 'museum');
  });

  await t.test('extractExtension returns empty for invalid email', () => {
    assert.equal(extractExtension('notanemail'), '');
    assert.equal(extractExtension('user@domain'), '');
  });

  await t.test('isValidExtension validates length', () => {
    assert.equal(isValidExtension('user@example.com'), true);
    assert.equal(isValidExtension('user@domain.org'), true);
    assert.equal(isValidExtension('user@site.co'), true);
    assert.equal(isValidExtension('user@place.museum'), true);
  });

  await t.test('isValidExtension rejects too short', () => {
    assert.equal(isValidExtension('user@domain.c'), false);
  });

  await t.test('isValidExtension rejects too long', () => {
    assert.equal(isValidExtension('user@example.toolong'), false);
  });

  await t.test('isValidExtension checks for letters only', () => {
    assert.equal(isValidExtension('user@domain.c0m'), false);
    assert.equal(isValidExtension('user@site.c-m'), false);
  });

});
