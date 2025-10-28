import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  advancedSlug,
  isValidSlug,
  camelCaseToSlug,
  findAllWords,
  createCustomSlug
} from './082-slug-regex.js';

test('URL Slug Generator - Regex Pattern Matching', async (t) => {

  await t.test('advancedSlug handles basic titles', () => {
    assert.equal(advancedSlug("Learn JavaScript!"), "learn-javascript");
    assert.equal(advancedSlug("Web Development"), "web-development");
  });

  await t.test('advancedSlug handles multiple spaces', () => {
    assert.equal(advancedSlug("Hello     World"), "hello-world");
    assert.equal(advancedSlug("Python   Tips   Tricks"), "python-tips-tricks");
  });

  await t.test('advancedSlug removes leading/trailing spaces', () => {
    assert.equal(advancedSlug("  Spaces  Around  "), "spaces-around");
    assert.equal(advancedSlug("   Leading"), "leading");
  });

  await t.test('advancedSlug handles complex punctuation', () => {
    assert.equal(advancedSlug("Multiple!!!Punctuation???"), "multiplepunctuation");
    assert.equal(advancedSlug("Rock & Roll Music!"), "rock-roll-music");
  });

  await t.test('advancedSlug removes consecutive hyphens', () => {
    const result = advancedSlug("Hello  --  World");
    assert.equal(result.includes("--"), false);
  });

  await t.test('isValidSlug validates correct slugs', () => {
    assert.equal(isValidSlug("learn-javascript"), true);
    assert.equal(isValidSlug("web-development-tips"), true);
    assert.equal(isValidSlug("hello"), true);
    assert.equal(isValidSlug("123-test"), true);
  });

  await t.test('isValidSlug rejects uppercase letters', () => {
    assert.equal(isValidSlug("Learn-JavaScript"), false);
    assert.equal(isValidSlug("HELLO"), false);
  });

  await t.test('isValidSlug rejects leading hyphen', () => {
    assert.equal(isValidSlug("-invalid"), false);
  });

  await t.test('isValidSlug rejects trailing hyphen', () => {
    assert.equal(isValidSlug("invalid-"), false);
  });

  await t.test('isValidSlug rejects consecutive hyphens', () => {
    assert.equal(isValidSlug("hello--world"), false);
  });

  await t.test('isValidSlug rejects special characters', () => {
    assert.equal(isValidSlug("hello@world"), false);
    assert.equal(isValidSlug("hello world"), false);
  });

  await t.test('isValidSlug rejects empty string', () => {
    assert.equal(isValidSlug(""), false);
  });

  await t.test('camelCaseToSlug converts camelCase', () => {
    assert.equal(camelCaseToSlug("camelCaseExample"), "camel-case-example");
    assert.equal(camelCaseToSlug("myVariableName"), "my-variable-name");
  });

  await t.test('camelCaseToSlug converts PascalCase', () => {
    assert.equal(camelCaseToSlug("PascalCaseExample"), "pascal-case-example");
    assert.equal(camelCaseToSlug("MyClassName"), "my-class-name");
  });

  await t.test('camelCaseToSlug handles consecutive capitals', () => {
    assert.equal(camelCaseToSlug("HTTPSConnection"), "https-connection");
    assert.equal(camelCaseToSlug("XMLParser"), "xml-parser");
  });

  await t.test('camelCaseToSlug converts to lowercase', () => {
    const result = camelCaseToSlug("CamelCase");
    assert.equal(result, result.toLowerCase());
  });

  await t.test('findAllWords extracts all words', () => {
    assert.deepEqual(findAllWords("learn-javascript-basics"), ["learn", "javascript", "basics"]);
  });

  await t.test('findAllWords handles alphanumeric', () => {
    assert.deepEqual(findAllWords("python-3-10-tips"), ["python", "3", "10", "tips"]);
  });

  await t.test('findAllWords returns array', () => {
    const result = findAllWords("hello-world");
    assert.equal(Array.isArray(result), true);
  });

  await t.test('findAllWords handles single word', () => {
    assert.deepEqual(findAllWords("hello"), ["hello"]);
  });

  await t.test('createCustomSlug applies maxLength', () => {
    const result = createCustomSlug("Learn JavaScript Basics", { maxLength: 15 });
    assert.equal(result.length <= 15, true);
    assert.equal(isValidSlug(result), true);
  });

  await t.test('createCustomSlug applies maxWords', () => {
    const result = createCustomSlug("Python Tips Tricks And More", { maxWords: 2 });
    const words = result.split("-").filter(w => w.length > 0);
    assert.equal(words.length <= 2, true);
  });

  await t.test('createCustomSlug respects keepNumbers option', () => {
    const withNumbers = createCustomSlug("Version 3.0 Release", { keepNumbers: true });
    const withoutNumbers = createCustomSlug("Version 3.0 Release", { keepNumbers: false });
    assert.equal(withNumbers.includes("3") || withNumbers.includes("0"), true);
    assert.equal(withoutNumbers.includes("3"), false);
  });

  await t.test('createCustomSlug combines multiple options', () => {
    const result = createCustomSlug("Learn Python 3.10 Basics", { 
      maxWords: 2, 
      keepNumbers: false 
    });
    const words = result.split("-").filter(w => w.length > 0);
    assert.equal(words.length <= 2, true);
    assert.equal(result.includes("3"), false);
  });

});
