import { strict as assert } from 'node:assert';
import test from 'node:test';
import * as ex from './064-inventory-destructuring.js';

test('064 - Inventory Destructuring', async (t) => {
  const laptop = { id: 1, name: 'Laptop', price: 999.99, quantity: 5, category: 'Electronics' };

  await t.test('extractProductName returns name using destructuring', () => {
    const name = ex.extractProductName(laptop);
    assert.strictEqual(name, 'Laptop');
  });

  await t.test('extractProductInfo returns object with name, price, quantity', () => {
    const info = ex.extractProductInfo(laptop);
    assert.strictEqual(info.name, 'Laptop');
    assert.strictEqual(info.price, 999.99);
    assert.strictEqual(info.quantity, 5);
    assert.strictEqual(info.id, undefined);
  });

  await t.test('extractWithDefaults uses provided category', () => {
    const result = ex.extractWithDefaults(laptop);
    assert.strictEqual(result.name, 'Laptop');
    assert.strictEqual(result.price, 999.99);
    assert.strictEqual(result.category, 'Electronics');
  });

  await t.test('extractWithDefaults uses default when category missing', () => {
    const noCategory = { name: 'Unknown', price: 100 };
    const result = ex.extractWithDefaults(noCategory);
    assert.strictEqual(result.category, 'Uncategorized');
  });

  await t.test('extractWithDefaults uses custom default when provided', () => {
    const noCategory = { name: 'Unknown', price: 100 };
    const result = ex.extractWithDefaults(noCategory, 'General');
    assert.strictEqual(result.category, 'General');
  });
});
