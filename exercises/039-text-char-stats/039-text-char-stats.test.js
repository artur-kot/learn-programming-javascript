import test from 'node:test';
import assert from 'node:assert';
import { countWords, countCharacters, countLetters, countDigits } from './039-text-char-stats.js';

test('Character Statistics', (t) => {
  assert.strictEqual(typeof countWords, 'function');
  assert.strictEqual(typeof countCharacters, 'function');
  assert.strictEqual(typeof countLetters, 'function');
  assert.strictEqual(typeof countDigits, 'function');

  const text = "Hello world";
  assert.strictEqual(countWords(text), 2, 'Should count 2 words');
  assert.strictEqual(countCharacters(text), 11, 'Should count 11 characters (including space)');
  assert.strictEqual(countLetters(text), 10, 'Should count 10 letters');
  assert.strictEqual(countDigits(text), 0, 'Should count 0 digits');

  const text2 = "I have 2 cats and 3 dogs";
  assert.strictEqual(countDigits(text2), 2, 'Should count 2 digits in "I have 2 cats and 3 dogs"');
  assert.strictEqual(countLetters(text2), 16, 'Should count 16 letters');
});