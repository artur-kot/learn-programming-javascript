import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  truncateSlug,
  getSlugPrefix,
  getSlugSuffix,
  extractKeywordFromSlug
} from './081-slug-extract.js';

test('URL Slug Generator - Extract Parts', async (t) => {

  await t.test('truncateSlug respects maxLength', () => {
    assert.equal(truncateSlug("hello-world", 5).length <= 5, true);
    assert.equal(truncateSlug("learn-javascript-basics", 10).length <= 10, true);
  });

  await t.test('truncateSlug removes trailing hyphens', () => {
    const result = truncateSlug("learn-javascript-basics", 10);
    assert.equal(result.endsWith("-"), false);
  });

  await t.test('truncateSlug returns shorter strings unchanged', () => {
    assert.equal(truncateSlug("hello", 20), "hello");
  });

  await t.test('truncateSlug truncates correctly', () => {
    assert.equal(truncateSlug("learn-javascript-basics", 10), "learn");
    assert.equal(truncateSlug("hello-world", 15), "hello-world");
  });

  await t.test('truncateSlug handles edge case of exact match', () => {
    assert.equal(truncateSlug("hello-world", 11), "hello-world");
  });

  await t.test('getSlugPrefix extracts first N words', () => {
    assert.equal(getSlugPrefix("learn-javascript-advanced-basics", 2), "learn-javascript");
  });

  await t.test('getSlugPrefix extracts single word', () => {
    assert.equal(getSlugPrefix("python-tips-tricks", 1), "python");
  });

  await t.test('getSlugPrefix returns full slug if wordCount exceeds', () => {
    const result = getSlugPrefix("hello-world", 5);
    assert.equal(result, "hello-world");
  });

  await t.test('getSlugPrefix works with non-hyphenated slug', () => {
    assert.equal(getSlugPrefix("hello", 1), "hello");
  });

  await t.test('getSlugSuffix extracts last N words', () => {
    assert.equal(getSlugSuffix("learn-javascript-advanced-basics", 2), "advanced-basics");
  });

  await t.test('getSlugSuffix extracts single word', () => {
    assert.equal(getSlugSuffix("web-design-trends-2024", 2), "trends-2024");
  });

  await t.test('getSlugSuffix returns full slug if wordCount exceeds', () => {
    const result = getSlugSuffix("hello-world", 5);
    assert.equal(result, "hello-world");
  });

  await t.test('getSlugSuffix works with non-hyphenated slug', () => {
    assert.equal(getSlugSuffix("hello", 1), "hello");
  });

  await t.test('extractKeywordFromSlug gets word by position', () => {
    assert.equal(extractKeywordFromSlug("learn-javascript-basics", 0), "learn");
    assert.equal(extractKeywordFromSlug("learn-javascript-basics", 1), "javascript");
    assert.equal(extractKeywordFromSlug("learn-javascript-basics", 2), "basics");
  });

  await t.test('extractKeywordFromSlug returns empty for out of bounds', () => {
    assert.equal(extractKeywordFromSlug("hello-world", 5), "");
    assert.equal(extractKeywordFromSlug("python-tips-tricks", 10), "");
  });

  await t.test('extractKeywordFromSlug handles negative position', () => {
    const result = extractKeywordFromSlug("hello-world", -1);
    assert.equal(result, "");
  });

  await t.test('extractKeywordFromSlug works with single-word slug', () => {
    assert.equal(extractKeywordFromSlug("hello", 0), "hello");
    assert.equal(extractKeywordFromSlug("hello", 1), "");
  });

});
