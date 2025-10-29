import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  extractLocalPart,
  extractDomainName,
  extractTLD,
  parseEmailParts,
  swapEmailParts,
  formatEmailParts,
  maskWithGroups,
  rebuildEmailNormalized,
  countGroupMatches,
  extractWithOptionalSubdomain
} from './170-email-groups.js';

test('Email Validator - Capture Groups', async (t) => {

  await t.test('extractLocalPart extracts before @', () => {
    assert.equal(extractLocalPart('user@example.com'), 'user');
    assert.equal(extractLocalPart('john@domain.org'), 'john');
    assert.equal(extractLocalPart('test123@site.co'), 'test123');
  });

  await t.test('extractLocalPart handles edge cases', () => {
    assert.equal(extractLocalPart('a@b.c'), 'a');
    assert.equal(extractLocalPart('longlocalpart@domain.com'), 'longlocalpart');
  });

  await t.test('extractLocalPart returns empty for invalid', () => {
    assert.equal(extractLocalPart('notanemail'), '');
  });

  await t.test('extractDomainName extracts between @ and first dot', () => {
    assert.equal(extractDomainName('user@example.com'), 'example');
    assert.equal(extractDomainName('john@company.org'), 'company');
    assert.equal(extractDomainName('test@mail.co'), 'mail');
  });

  await t.test('extractDomainName handles different TLDs', () => {
    assert.equal(extractDomainName('user@site.co.uk'), 'site');
    assert.equal(extractDomainName('admin@server.info'), 'server');
  });

  await t.test('extractDomainName returns empty for invalid', () => {
    assert.equal(extractDomainName('no-at-symbol'), '');
    assert.equal(extractDomainName('user@nodot'), '');
  });

  await t.test('extractTLD extracts after last dot', () => {
    assert.equal(extractTLD('user@example.com'), 'com');
    assert.equal(extractTLD('john@domain.org'), 'org');
    assert.equal(extractTLD('test@site.co'), 'co');
  });

  await t.test('extractTLD handles various extensions', () => {
    assert.equal(extractTLD('user@place.info'), 'info');
    assert.equal(extractTLD('user@site.museum'), 'museum');
  });

  await t.test('extractTLD returns empty for invalid', () => {
    assert.equal(extractTLD('notanemail'), '');
    assert.equal(extractTLD('user@domain'), '');
  });

  await t.test('parseEmailParts extracts all three parts', () => {
    const result = parseEmailParts('user@example.com');
    assert.deepEqual(result, { local: 'user', domain: 'example', tld: 'com' });
  });

  await t.test('parseEmailParts handles different emails', () => {
    const result = parseEmailParts('john@company.org');
    assert.deepEqual(result, { local: 'john', domain: 'company', tld: 'org' });
  });

  await t.test('parseEmailParts returns empty strings for invalid', () => {
    const result = parseEmailParts('notanemail');
    assert.deepEqual(result, { local: '', domain: '', tld: '' });
  });

  await t.test('parseEmailParts object has all properties', () => {
    const result = parseEmailParts('test@test.com');
    assert.equal('local' in result, true);
    assert.equal('domain' in result, true);
    assert.equal('tld' in result, true);
  });

  await t.test('swapEmailParts exchanges local and domain', () => {
    assert.equal(swapEmailParts('user@example.com'), 'example@user.com');
    assert.equal(swapEmailParts('john@company.org'), 'company@john.org');
  });

  await t.test('swapEmailParts preserves TLD', () => {
    const result = swapEmailParts('test@domain.co');
    assert.equal(result.endsWith('.co'), true);
  });

  await t.test('swapEmailParts handles single char local', () => {
    assert.equal(swapEmailParts('a@example.com'), 'example@a.com');
  });

  await t.test('formatEmailParts uses [at] notation', () => {
    assert.equal(formatEmailParts('user@example.com'), 'user [at] example.com');
    assert.equal(formatEmailParts('john@domain.org'), 'john [at] domain.org');
  });

  await t.test('formatEmailParts maintains all parts', () => {
    const result = formatEmailParts('test@site.co');
    assert.equal(result.includes('test'), true);
    assert.equal(result.includes('site.co'), true);
    assert.equal(result.includes('[at]'), true);
  });

  await t.test('maskWithGroups masks local part', () => {
    assert.equal(maskWithGroups('user@example.com'), 'u***@example.com');
    assert.equal(maskWithGroups('john@domain.org'), 'j***@domain.org');
  });

  await t.test('maskWithGroups keeps domain visible', () => {
    const result = maskWithGroups('admin@mysite.com');
    assert.equal(result.includes('mysite.com'), true);
  });

  await t.test('maskWithGroups keeps @ symbol', () => {
    const result = maskWithGroups('test@test.org');
    assert.equal(result.includes('@'), true);
  });

  await t.test('maskWithGroups shows first character', () => {
    const result = maskWithGroups('administrator@example.com');
    assert.equal(result.startsWith('a***'), true);
  });

  await t.test('rebuildEmailNormalized converts to lowercase', () => {
    assert.equal(rebuildEmailNormalized('USER@EXAMPLE.COM'), 'user@example.com');
    assert.equal(rebuildEmailNormalized('John@Domain.Org'), 'john@domain.org');
  });

  await t.test('rebuildEmailNormalized removes spaces', () => {
    assert.equal(rebuildEmailNormalized('user @ example.com'), 'user@example.com');
    assert.equal(rebuildEmailNormalized('  test  @  test.org  '), 'test@test.org');
  });

  await t.test('rebuildEmailNormalized handles trimmed input', () => {
    const result = rebuildEmailNormalized('TEST@TEST.COM');
    assert.equal(result, result.trim());
  });

  await t.test('countGroupMatches counts matched groups', () => {
    assert.equal(countGroupMatches('user@example.com'), 3);
    assert.equal(countGroupMatches('test@domain.org'), 3);
  });

  await t.test('countGroupMatches returns 0 for invalid', () => {
    assert.equal(countGroupMatches('notanemail'), 0);
    assert.equal(countGroupMatches(''), 0);
  });

  await t.test('countGroupMatches counts all groups', () => {
    const result = countGroupMatches('valid@email.co');
    assert.equal(typeof result, 'number');
    assert.equal(result > 0, true);
  });

  await t.test('extractWithOptionalSubdomain handles simple domain', () => {
    assert.equal(extractWithOptionalSubdomain('user@example.com'), 'example.com');
  });

  await t.test('extractWithOptionalSubdomain handles subdomain', () => {
    assert.equal(extractWithOptionalSubdomain('user@mail.example.com'), 'mail.example.com');
    assert.equal(extractWithOptionalSubdomain('test@api.domain.org'), 'api.domain.org');
  });

  await t.test('extractWithOptionalSubdomain handles multiple subdomains', () => {
    const result = extractWithOptionalSubdomain('user@ns1.mail.example.com');
    assert.equal(result.includes('ns1.mail.example.com'), true);
  });

  await t.test('extractWithOptionalSubdomain returns empty for invalid', () => {
    assert.equal(extractWithOptionalSubdomain('noemail'), '');
    assert.equal(extractWithOptionalSubdomain('user@domain'), '');
  });

});
