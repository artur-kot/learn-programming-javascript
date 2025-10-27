import { test } from 'node:test';
import assert from 'node:assert';
import {
  analyzeText,
  analyzeTextWithOptions,
  createDigitFilter,
  createLetterFilter,
} from './042-text-composition.js';

test('analyzeText returns an object', () => {
  const result = analyzeText('hello');
  assert.strictEqual(typeof result, 'object');
});

test('analyzeText includes words count', () => {
  const result = analyzeText('hello world');
  assert.strictEqual(result.words, 2);
});

test('analyzeText includes characters count', () => {
  const result = analyzeText('hello');
  assert.strictEqual(result.characters, 5);
});

test('analyzeText includes letters count', () => {
  const result = analyzeText('hello');
  assert.strictEqual(result.letters, 5);
});

test('analyzeText includes digits count', () => {
  const result = analyzeText('hello123');
  assert.strictEqual(result.digits, 3);
});

test('analyzeText includes digitString', () => {
  const result = analyzeText('hello123world456');
  assert.strictEqual(result.digitString, '123456');
});

test('analyzeText includes letterString', () => {
  const result = analyzeText('hello123');
  assert.strictEqual(result.letterString, 'hello');
});

test('analyzeText with mixed content', () => {
  const result = analyzeText('Hello World 123!');
  assert.strictEqual(result.words, 3);
  assert.strictEqual(result.characters, 16);
  assert.strictEqual(result.letters, 10);
  assert.strictEqual(result.digits, 3);
});

test('analyzeTextWithOptions returns full analysis by default', () => {
  const result = analyzeTextWithOptions('test123');
  assert.strictEqual(typeof result.words, 'number');
  assert.strictEqual(typeof result.characters, 'number');
  assert.strictEqual(typeof result.letters, 'number');
  assert.strictEqual(typeof result.digits, 'number');
});

test('analyzeTextWithOptions respects include option', () => {
  const result = analyzeTextWithOptions('hello123', { includeDigits: true, includeLetters: false });
  
  // Should include digits info
  assert.strictEqual(typeof result.digits, 'number');
  
  // Depending on implementation, letters might be undefined, null, or 0
  // Both behaviors are acceptable for this exercise
});

test('analyzeTextWithOptions with empty text', () => {
  const result = analyzeText('');
  assert.strictEqual(result.words, 0);
  assert.strictEqual(result.characters, 0);
  assert.strictEqual(result.letters, 0);
  assert.strictEqual(result.digits, 0);
});

test('analyzeText composition combines multiple functions', () => {
  const text = 'JavaScript 2024';
  const result = analyzeText(text);
  
  // Verify all components are present
  assert.ok(result.hasOwnProperty('words'));
  assert.ok(result.hasOwnProperty('characters'));
  assert.ok(result.hasOwnProperty('letters'));
  assert.ok(result.hasOwnProperty('digits'));
  assert.ok(result.hasOwnProperty('digitString'));
  assert.ok(result.hasOwnProperty('letterString'));
});