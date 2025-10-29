import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  cleanSlug,
  removeSpecialChars,
  sanitizeTitle
} from './079-slug-replace.js';

test('URL Slug Generator - Remove Special Characters', async (t) => {

  await t.test('cleanSlug removes basic punctuation', () => {
    assert.equal(cleanSlug("Hello, World!"), "hello-world");
    assert.equal(cleanSlug("What?"), "what");
    assert.equal(cleanSlug("Great."), "great");
  });

  await t.test('cleanSlug removes special characters', () => {
    assert.equal(cleanSlug("Rock & Roll"), "rock-roll");
    assert.equal(cleanSlug("$100 Deal"), "100-deal");
    assert.equal(cleanSlug("50% Off!"), "50-off");
  });

  await t.test('cleanSlug handles apostrophes', () => {
    assert.equal(cleanSlug("Don't"), "dont");
    assert.equal(cleanSlug("It's Amazing"), "its-amazing");
  });

  await t.test('cleanSlug preserves numbers', () => {
    assert.equal(cleanSlug("Python 3.0"), "python-30");
    assert.equal(cleanSlug("Top 10 Tips!"), "top-10-tips");
  });

  await t.test('cleanSlug handles complex punctuation', () => {
    assert.equal(cleanSlug("C++ Programming!"), "c-programming");
    assert.equal(cleanSlug("Web (HTML/CSS)"), "web-htmlcss");
    assert.equal(cleanSlug("Hi-Tech!"), "hi-tech");
  });

  await t.test('removeSpecialChars keeps alphanumeric and safe chars', () => {
    assert.equal(removeSpecialChars("Hello @#$% World!"), "Hello  World");
    assert.equal(removeSpecialChars("Test-123!@#"), "Test-123");
  });

  await t.test('removeSpecialChars removes punctuation', () => {
    assert.equal(removeSpecialChars("Hello, World!"), "Hello World");
    assert.equal(removeSpecialChars("What?!"), "What");
  });

  await t.test('removeSpecialChars handles mixed content', () => {
    assert.equal(removeSpecialChars("User@Email.com (test)"), "UserEmailcom test");
    assert.equal(removeSpecialChars("50% off!"), "50 off");
  });

  await t.test('sanitizeTitle combines cleaning and slug conversion', () => {
    assert.equal(sanitizeTitle("The Ultimate Guide!"), "the-ultimate-guide");
    assert.equal(sanitizeTitle("100% Free & Easy"), "100-free-easy");
  });

  await t.test('sanitizeTitle handles various title formats', () => {
    assert.equal(sanitizeTitle("Hello, World!"), "hello-world");
    assert.equal(sanitizeTitle("What?!"), "what");
    assert.equal(sanitizeTitle("Rock & Roll Music"), "rock-roll-music");
  });

  await t.test('all functions convert to lowercase', () => {
    assert.equal(cleanSlug("HELLO, WORLD!"), "hello-world");
    assert.equal(sanitizeTitle("GREAT TITLE!"), "great-title");
  });

  await t.test('functions handle titles with only special characters', () => {
    // Should result in empty or minimal output
    const result = cleanSlug("!@#$%");
    assert.equal(result.length <= 1, true);
  });

});
