import { strict as assert } from 'node:assert';
import test from 'node:test';
import * as ex from './066-inventory-spread.js';

test('066 - Inventory Spread', async (t) => {
  const original = { id: 1, name: 'Laptop', price: 999.99, quantity: 5, category: 'Electronics' };

  await t.test('cloneProduct creates independent copy', () => {
    const clone = ex.cloneProduct(original);
    assert.deepStrictEqual(clone, original);
    assert.notStrictEqual(clone, original);
  });

  await t.test('cloneProduct does not reference original', () => {
    const clone = ex.cloneProduct(original);
    clone.name = 'Desktop';
    assert.strictEqual(original.name, 'Laptop');
  });

  await t.test('updateProductPrice clones and updates price', () => {
    const updated = ex.updateProductPrice(original, 1299.99);
    assert.strictEqual(updated.price, 1299.99);
    assert.strictEqual(updated.name, 'Laptop');
    assert.strictEqual(original.price, 999.99);
  });

  await t.test('mergeProductUpdates merges properties without modifying original', () => {
    const updates = { quantity: 10, price: 899.99 };
    const merged = ex.mergeProductUpdates(original, updates);
    
    assert.strictEqual(merged.price, 899.99);
    assert.strictEqual(merged.quantity, 10);
    assert.strictEqual(merged.name, 'Laptop');
    assert.strictEqual(original.price, 999.99);
    assert.strictEqual(original.quantity, 5);
  });

  await t.test('addProductWithDefaults creates new product with default category', () => {
    ex.populateInventory();
    const newProduct = ex.addProductWithDefaults('Keyboard', 149.99, 20);
    
    assert.strictEqual(newProduct.name, 'Keyboard');
    assert.strictEqual(newProduct.price, 149.99);
    assert.strictEqual(newProduct.quantity, 20);
    assert.strictEqual(newProduct.category, 'Uncategorized');
    assert.strictEqual(typeof newProduct.id, 'number');
  });

  await t.test('addProductWithDefaults creates with custom category', () => {
    const newProduct = ex.addProductWithDefaults('Monitor', 399.99, 8, 'Peripherals');
    assert.strictEqual(newProduct.category, 'Peripherals');
  });

  await t.test('cleanup', () => {
    ex.resetInventory();
  });
});
