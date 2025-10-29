import { test } from 'node:test';
import assert from 'node:assert';
import {
  addItemWithQuantity,
  getListWithQuantities,
  clearList,
  updateQuantity,
  getTotalItems,
} from './046-shopping-quantities.js';

test('addItemWithQuantity adds item with quantity', () => {
  clearList();
  addItemWithQuantity('milk', 2);
  const list = getListWithQuantities();
  assert.strictEqual(list.length, 1);
  assert.strictEqual(list[0].item, 'milk');
  assert.strictEqual(list[0].quantity, 2);
});

test('addItemWithQuantity defaults to quantity 1', () => {
  clearList();
  addItemWithQuantity('bread');
  const list = getListWithQuantities();
  assert.strictEqual(list[0].quantity, 1);
});

test('getListWithQuantities returns array of objects', () => {
  clearList();
  addItemWithQuantity('milk', 2);
  addItemWithQuantity('eggs', 12);
  const list = getListWithQuantities();
  assert.strictEqual(list.length, 2);
  assert.deepStrictEqual(list, [
    { item: 'milk', quantity: 2 },
    { item: 'eggs', quantity: 12 },
  ]);
});

test('updateQuantity changes quantity of existing item', () => {
  clearList();
  addItemWithQuantity('milk', 2);
  updateQuantity('milk', 3);
  const list = getListWithQuantities();
  assert.strictEqual(list[0].quantity, 3);
});

test('updateQuantity returns true when successful', () => {
  clearList();
  addItemWithQuantity('milk', 2);
  const result = updateQuantity('milk', 5);
  assert.strictEqual(result, true);
});

test('updateQuantity returns false when item not found', () => {
  clearList();
  addItemWithQuantity('milk', 2);
  const result = updateQuantity('cheese', 1);
  assert.strictEqual(result, false);
});

test('getTotalItems sums all quantities', () => {
  clearList();
  addItemWithQuantity('milk', 2);
  addItemWithQuantity('eggs', 12);
  addItemWithQuantity('bread', 1);
  assert.strictEqual(getTotalItems(), 15);
});

test('getTotalItems returns 0 for empty list', () => {
  clearList();
  assert.strictEqual(getTotalItems(), 0);
});

test('getTotalItems after update', () => {
  clearList();
  addItemWithQuantity('milk', 2);
  addItemWithQuantity('eggs', 12);
  updateQuantity('milk', 5);
  assert.strictEqual(getTotalItems(), 17);
});