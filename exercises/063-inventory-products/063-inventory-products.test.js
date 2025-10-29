import { strict as assert } from 'node:assert';
import test from 'node:test';
import * as ex from './063-inventory-products.js';

test('063 - Inventory Products', async (t) => {
  // Setup: Populate inventory before each test
  ex.populateInventory();

  await t.test('getInventory returns an array', () => {
    const inv = ex.getInventory();
    assert(Array.isArray(inv));
  });

  await t.test('getInventory contains all products', () => {
    const inv = ex.getInventory();
    assert.strictEqual(inv.length, 5);
  });

  await t.test('getInventory products have correct properties', () => {
    const inv = ex.getInventory();
    const first = inv[0];
    assert.strictEqual(first.id, 1);
    assert.strictEqual(first.name, 'Laptop');
    assert.strictEqual(first.price, 999.99);
    assert.strictEqual(first.quantity, 5);
    assert.strictEqual(first.category, 'Electronics');
  });

  await t.test('getProductCount returns correct count', () => {
    const count = ex.getProductCount();
    assert.strictEqual(count, 5);
  });

  await t.test('getTotalInventoryValue calculates correctly', () => {
    const total = ex.getTotalInventoryValue();
    // Laptop: 999.99 * 5 = 4999.95
    // Mouse: 29.99 * 15 = 449.85
    // Desk: 299.99 * 3 = 899.97
    // Chair: 199.99 * 8 = 1599.92
    // Monitor: 399.99 * 4 = 1599.96
    const expected = 4999.95 + 449.85 + 899.97 + 1599.92 + 1599.96;
    assert.strictEqual(total, expected);
  });

  await t.test('getProductsByCategory returns Electronics', () => {
    const electronics = ex.getProductsByCategory('Electronics');
    assert.strictEqual(electronics.length, 3);
    assert(electronics.every(p => p.category === 'Electronics'));
  });

  await t.test('getProductsByCategory returns Furniture', () => {
    const furniture = ex.getProductsByCategory('Furniture');
    assert.strictEqual(furniture.length, 2);
    assert(furniture.every(p => p.category === 'Furniture'));
  });

  await t.test('getProductsByCategory returns empty array for unknown category', () => {
    const unknown = ex.getProductsByCategory('Unknown');
    assert.strictEqual(unknown.length, 0);
  });

  await t.test('cleanup: resetInventory clears inventory', () => {
    ex.resetInventory();
    const inv = ex.getInventory();
    assert.strictEqual(inv.length, 0);
  });
});
