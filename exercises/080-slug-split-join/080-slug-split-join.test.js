import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  slugFromArray,
  splitAndFilter,
  normalizeAndJoin,
  buildSlugFromWords
} from './080-slug-split-join.js';

test('URL Slug Generator - Split and Join', async (t) => {

  await t.test('slugFromArray handles single space', () => {
    assert.equal(slugFromArray("Hello World"), "hello-world");
  });

  await t.test('slugFromArray handles multiple spaces', () => {
    assert.equal(slugFromArray("Hello  World"), "hello-world");
    assert.equal(slugFromArray("Learn   JavaScript"), "learn-javascript");
  });

  await t.test('slugFromArray removes leading spaces', () => {
    assert.equal(slugFromArray("  Hello World"), "hello-world");
  });

  await t.test('slugFromArray removes trailing spaces', () => {
    assert.equal(slugFromArray("Hello World  "), "hello-world");
  });

  await t.test('slugFromArray handles leading and trailing spaces', () => {
    assert.equal(slugFromArray("  Hello  World  "), "hello-world");
  });

  await t.test('slugFromArray converts to lowercase', () => {
    assert.equal(slugFromArray("HELLO World"), "hello-world");
  });

  await t.test('splitAndFilter splits by separator', () => {
    const result = splitAndFilter("hello world", " ");
    assert.deepEqual(result, ["hello", "world"]);
  });

  await t.test('splitAndFilter filters empty strings', () => {
    const result = splitAndFilter("hello  world", " ");
    assert.deepEqual(result, ["hello", "world"]);
  });

  await t.test('splitAndFilter works with custom separator', () => {
    const result = splitAndFilter("a--b--c", "--");
    assert.deepEqual(result, ["a", "b", "c"]);
  });

  await t.test('splitAndFilter handles leading/trailing separators', () => {
    const result = splitAndFilter("  hello world  ", " ");
    assert.deepEqual(result, ["hello", "world"]);
  });

  await t.test('normalizeAndJoin lowercases words', () => {
    assert.equal(normalizeAndJoin(["Hello", "World"], "-"), "hello-world");
  });

  await t.test('normalizeAndJoin joins with separator', () => {
    assert.equal(normalizeAndJoin(["Python", "JS", "Ruby"], "_"), "python_js_ruby");
  });

  await t.test('normalizeAndJoin filters empty strings', () => {
    assert.equal(normalizeAndJoin(["hello", "", "world"], "-"), "hello-world");
  });

  await t.test('normalizeAndJoin handles single word', () => {
    assert.equal(normalizeAndJoin(["Hello"], "-"), "hello");
  });

  await t.test('buildSlugFromWords removes special characters', () => {
    assert.equal(buildSlugFromWords("Learn JavaScript!"), "learn-javascript");
  });

  await t.test('buildSlugFromWords handles multiple spaces and special chars', () => {
    assert.equal(buildSlugFromWords("Hello,  World!"), "hello-world");
  });

  await t.test('buildSlugFromWords integrates all operations', () => {
    assert.equal(buildSlugFromWords("  Learn JavaScript!  "), "learn-javascript");
  });

  await t.test('buildSlugFromWords handles complex punctuation', () => {
    assert.equal(buildSlugFromWords("Rock & Roll Music!"), "rock-roll-music");
  });

});
