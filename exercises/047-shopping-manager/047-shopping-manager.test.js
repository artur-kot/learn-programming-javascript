import { test } from 'node:test';
import assert from 'node:assert';
import { createShoppingManager } from './047-shopping-manager.js';

test('createShoppingManager returns an object', () => {
  const manager = createShoppingManager();
  assert.strictEqual(typeof manager, 'object');
});

test('manager.add adds items to the list', () => {
  const manager = createShoppingManager();
  manager.clear();
  manager.add('milk', 2);
  manager.add('eggs', 12);
  const list = manager.getList();
  assert.strictEqual(list.length, 2);
});

test('manager.add defaults quantity to 1', () => {
  const manager = createShoppingManager();
  manager.clear();
  manager.add('bread');
  const list = manager.getList();
  assert.strictEqual(list[0].quantity, 1);
});

test('manager.getList returns array of items', () => {
  const manager = createShoppingManager();
  manager.clear();
  manager.add('milk', 2);
  manager.add('eggs', 12);
  assert.deepStrictEqual(manager.getList(), [
    { item: 'milk', quantity: 2 },
    { item: 'eggs', quantity: 12 },
  ]);
});

test('manager.remove removes item', () => {
  const manager = createShoppingManager();
  manager.clear();
  manager.add('milk', 2);
  manager.add('eggs', 12);
  manager.remove('milk');
  assert.strictEqual(manager.getList().length, 1);
  assert.strictEqual(manager.getList()[0].item, 'eggs');
});

test('manager.remove returns true on success', () => {
  const manager = createShoppingManager();
  manager.clear();
  manager.add('milk', 2);
  const result = manager.remove('milk');
  assert.strictEqual(result, true);
});

test('manager.remove returns false if not found', () => {
  const manager = createShoppingManager();
  manager.clear();
  manager.add('milk', 2);
  const result = manager.remove('cheese');
  assert.strictEqual(result, false);
});

test('manager.updateQuantity updates item quantity', () => {
  const manager = createShoppingManager();
  manager.clear();
  manager.add('milk', 2);
  manager.updateQuantity('milk', 5);
  assert.strictEqual(manager.getList()[0].quantity, 5);
});

test('manager.getTotal returns sum of all quantities', () => {
  const manager = createShoppingManager();
  manager.clear();
  manager.add('milk', 2);
  manager.add('eggs', 12);
  manager.add('bread', 1);
  assert.strictEqual(manager.getTotal(), 15);
});

test('manager.clear removes all items', () => {
  const manager = createShoppingManager();
  manager.add('milk', 2);
  manager.add('eggs', 12);
  manager.clear();
  assert.strictEqual(manager.getList().length, 0);
});

test('manager.findItem finds item index', () => {
  const manager = createShoppingManager();
  manager.clear();
  manager.add('milk', 2);
  manager.add('eggs', 12);
  const index = manager.findItem('eggs');
  assert.strictEqual(index, 1);
});

test('manager.isEmpty returns true when empty', () => {
  const manager = createShoppingManager();
  manager.clear();
  assert.strictEqual(manager.isEmpty(), true);
});

test('manager.isEmpty returns false when not empty', () => {
  const manager = createShoppingManager();
  manager.clear();
  manager.add('milk', 2);
  assert.strictEqual(manager.isEmpty(), false);
});

test('manager.getCount returns number of unique items', () => {
  const manager = createShoppingManager();
  manager.clear();
  manager.add('milk', 2);
  manager.add('eggs', 12);
  manager.add('bread', 1);
  assert.strictEqual(manager.getCount(), 3);
});

test('multiple manager instances are independent', () => {
  const manager1 = createShoppingManager();
  const manager2 = createShoppingManager();
  
  manager1.clear();
  manager2.clear();
  
  manager1.add('milk', 2);
  manager2.add('eggs', 12);
  
  assert.strictEqual(manager1.getCount(), 1);
  assert.strictEqual(manager2.getCount(), 1);
  assert.strictEqual(manager1.getList()[0].item, 'milk');
  assert.strictEqual(manager2.getList()[0].item, 'eggs');
});