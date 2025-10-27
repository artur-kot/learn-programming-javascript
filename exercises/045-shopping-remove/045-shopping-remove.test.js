import { test } from 'node:test';
import assert from 'node:assert';
import { addToList, getList, clearList, findItem, removeItem } from './045-shopping-remove.js';

test('findItem returns index of item', () => {
  clearList();
  addToList('milk');
  addToList('bread');
  addToList('eggs');
  assert.strictEqual(findItem('bread'), 1);
});

test('findItem returns -1 if not found', () => {
  clearList();
  addToList('milk');
  addToList('bread');
  assert.strictEqual(findItem('cheese'), -1);
});

test('findItem returns index of first occurrence', () => {
  clearList();
  addToList('milk');
  addToList('bread');
  addToList('milk');
  assert.strictEqual(findItem('milk'), 0);
});

test('removeItem removes item from list', () => {
  clearList();
  addToList('milk');
  addToList('bread');
  addToList('eggs');
  removeItem('bread');
  assert.deepStrictEqual(getList(), ['milk', 'eggs']);
});

test('removeItem returns true when successful', () => {
  clearList();
  addToList('milk');
  const result = removeItem('milk');
  assert.strictEqual(result, true);
});

test('removeItem returns false when not found', () => {
  clearList();
  addToList('milk');
  const result = removeItem('cheese');
  assert.strictEqual(result, false);
});

test('removeItem removes only first occurrence', () => {
  clearList();
  addToList('milk');
  addToList('bread');
  addToList('milk');
  removeItem('milk');
  assert.deepStrictEqual(getList(), ['bread', 'milk']);
});

test('removeItem on empty list returns false', () => {
  clearList();
  const result = removeItem('anything');
  assert.strictEqual(result, false);
});