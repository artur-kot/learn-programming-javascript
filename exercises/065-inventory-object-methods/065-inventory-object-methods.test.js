import { strict as assert } from 'node:assert';
import test from 'node:test';
import * as ex from './065-inventory-object-methods.js';

test('065 - Inventory Object Methods', async (t) => {
  const product = { id: 1, name: 'Laptop', price: 999.99, quantity: 5, category: 'Electronics' };

  await t.test('getProductPropertyNames returns keys array', () => {
    const keys = ex.getProductPropertyNames(product);
    assert(Array.isArray(keys));
    assert(keys.includes('id'));
    assert(keys.includes('name'));
    assert(keys.includes('price'));
  });

  await t.test('getProductPropertyValues returns values array', () => {
    const values = ex.getProductPropertyValues(product);
    assert(Array.isArray(values));
    assert(values.includes('Laptop'));
    assert(values.includes(999.99));
    assert(values.includes(5));
  });

  await t.test('getProductEntries returns array of [key, value] pairs', () => {
    const entries = ex.getProductEntries(product);
    assert(Array.isArray(entries));
    assert(entries.some(pair => pair[0] === 'name' && pair[1] === 'Laptop'));
    assert(entries.some(pair => pair[0] === 'price' && pair[1] === 999.99));
  });

  await t.test('createPriceIndex builds name -> price mapping', () => {
    ex.populateInventory();
    const priceIndex = ex.createPriceIndex();
    
    assert.strictEqual(priceIndex['Laptop'], 999.99);
    assert.strictEqual(priceIndex['Mouse'], 29.99);
    assert.strictEqual(priceIndex['Desk'], 299.99);
  });

  await t.test('createPriceIndex includes all products', () => {
    const priceIndex = ex.createPriceIndex();
    assert.strictEqual(Object.keys(priceIndex).length, 5);
  });

  await t.test('cleanup', () => {
    ex.resetInventory();
  });
});
