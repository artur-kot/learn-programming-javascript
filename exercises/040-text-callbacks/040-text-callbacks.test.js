import test from 'node:test';
import assert from 'node:assert';
import { countMatching, filterText } from './040-text-callbacks.js';

test('Custom Filters with Callbacks', (t) => {
  assert.strictEqual(typeof countMatching, 'function');
  assert.strictEqual(typeof filterText, 'function');

  // Test countMatching
  assert.strictEqual(countMatching("hello123", char => /[0-9]/.test(char)), 3, 'Should count 3 digits');
  assert.strictEqual(countMatching("hello123", char => /[a-z]/.test(char)), 5, 'Should count 5 lowercase letters');
  
  // Test filterText
  assert.strictEqual(filterText("hello123", char => /[0-9]/.test(char)), "123", 'Should filter digits');
  assert.strictEqual(filterText("hello123", char => /[a-z]/.test(char)), "hello", 'Should filter lowercase letters');
});