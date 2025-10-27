import test from 'node:test';
import assert from 'node:assert';
import { countWords } from './038-text-word-count.js';

test('Word Counter', (t) => {
  assert.strictEqual(typeof countWords, 'function', 'Should export a function');

  assert.strictEqual(countWords("hello world"), 2, 'Should count 2 words');
  assert.strictEqual(countWords("The quick brown fox"), 4, 'Should count 4 words');
  assert.strictEqual(countWords(""), 0, 'Empty string should return 0');
  assert.strictEqual(countWords("single"), 1, 'Single word should return 1');
  assert.strictEqual(countWords("  multiple   spaces  "), 2, 'Multiple spaces should be treated as one separator');
});