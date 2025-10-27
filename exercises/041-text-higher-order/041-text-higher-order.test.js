import { test } from 'node:test';
import assert from 'node:assert';
import {
  countWords,
  countCharacters,
  countLetters,
  countDigits,
  countMatching,
  filterText,
  createDigitFilter,
  createLetterFilter,
  createLowercaseFilter,
  createUppercaseFilter,
  createCharacterFilter,
} from './041-text-higher-order.js';

test('createDigitFilter returns a function', () => {
  const digitFilter = createDigitFilter();
  assert.strictEqual(typeof digitFilter, 'function');
});

test('createDigitFilter function identifies digits correctly', () => {
  const digitFilter = createDigitFilter();
  assert.strictEqual(digitFilter('5'), true);
  assert.strictEqual(digitFilter('a'), false);
});

test('createDigitFilter can be used with countMatching', () => {
  const digitFilter = createDigitFilter();
  assert.strictEqual(countMatching('hello123', digitFilter), 3);
});

test('createLetterFilter returns a function', () => {
  const letterFilter = createLetterFilter();
  assert.strictEqual(typeof letterFilter, 'function');
});

test('createLetterFilter function identifies letters correctly', () => {
  const letterFilter = createLetterFilter();
  assert.strictEqual(letterFilter('a'), true);
  assert.strictEqual(letterFilter('Z'), true);
  assert.strictEqual(letterFilter('5'), false);
});

test('createLetterFilter can be used with filterText', () => {
  const letterFilter = createLetterFilter();
  assert.strictEqual(filterText('hello123', letterFilter), 'hello');
});

test('createLowercaseFilter identifies lowercase letters', () => {
  const lowercaseFilter = createLowercaseFilter();
  assert.strictEqual(lowercaseFilter('a'), true);
  assert.strictEqual(lowercaseFilter('A'), false);
  assert.strictEqual(countMatching('HeLLo', lowercaseFilter), 2);
});

test('createUppercaseFilter identifies uppercase letters', () => {
  const uppercaseFilter = createUppercaseFilter();
  assert.strictEqual(uppercaseFilter('A'), true);
  assert.strictEqual(uppercaseFilter('a'), false);
  assert.strictEqual(countMatching('HeLLo', uppercaseFilter), 3);
});

test('createCharacterFilter filters for specific character', () => {
  const xFilter = createCharacterFilter('x');
  assert.strictEqual(countMatching('example', xFilter), 1);
  assert.strictEqual(filterText('example', xFilter), 'x');
});

test('createCharacterFilter with different characters', () => {
  const aFilter = createCharacterFilter('a');
  assert.strictEqual(countMatching('banana', aFilter), 3);
});

test('chaining multiple higher-order filters', () => {
  // Verify that filters work independently
  const digitFilter = createDigitFilter();
  const letterFilter = createLetterFilter();
  
  const text = 'Hello123World456';
  assert.strictEqual(countMatching(text, digitFilter), 6);
  assert.strictEqual(countMatching(text, letterFilter), 10);
});