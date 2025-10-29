import { strict as assert } from 'node:assert';
import test from 'node:test';
import * as ex from './067-inventory-search.js';

test('067 - Inventory Search', async (t) => {
  ex.populateInventory();

  await t.test('searchByName finds products by partial name match', () => {
    const results = ex.searchByName('top');
    assert(results.length >= 1);
    assert(results.some(p => p.name === 'Laptop'));
  });

  await t.test('searchByName is case-insensitive', () => {
    const results = ex.searchByName('MOUSE');
    assert(results.length >= 1);
    assert(results.some(p => p.name === 'Mouse'));
  });

  await t.test('searchByName returns empty for no matches', () => {
    const results = ex.searchByName('Unknown');
    assert.strictEqual(results.length, 0);
  });

  await t.test('findProductById returns exact product match', () => {
    const product = ex.findProductById(1);
    assert.strictEqual(product.name, 'Laptop');
  });

  await t.test('findProductById returns undefined for non-existent ID', () => {
    const product = ex.findProductById(999);
    assert.strictEqual(product, undefined);
  });

  await t.test('getProductsInPriceRange filters by price range', () => {
    const results = ex.getProductsInPriceRange(100, 400);
    assert(results.every(p => p.price >= 100 && p.price <= 400));
    assert(results.length >= 2);
  });

  await t.test('getProductsInPriceRange returns sorted by price', () => {
    const results = ex.getProductsInPriceRange(0, 1000);
    for (let i = 1; i < results.length; i++) {
      assert(results[i - 1].price <= results[i].price);
    }
  });

  await t.test('getLowStockProducts finds products below threshold', () => {
    const results = ex.getLowStockProducts(5);
    assert(results.some(p => p.name === 'Desk'));
    assert(results.some(p => p.name === 'Monitor'));
  });

  await t.test('getLowStockProducts sorts by quantity ascending', () => {
    const results = ex.getLowStockProducts(10);
    for (let i = 1; i < results.length; i++) {
      assert(results[i - 1].quantity <= results[i].quantity);
    }
  });

  await t.test('getCategoryStats returns stats for each category', () => {
    const stats = ex.getCategoryStats();
    assert(stats.Electronics);
    assert(stats.Furniture);
  });

  await t.test('getCategoryStats includes count, totalValue, avgPrice', () => {
    const stats = ex.getCategoryStats();
    const elec = stats.Electronics;
    assert.strictEqual(typeof elec.count, 'number');
    assert.strictEqual(typeof elec.totalValue, 'number');
    assert.strictEqual(typeof elec.avgPrice, 'number');
  });

  await t.test('getCategoryStats calculates correct values', () => {
    const stats = ex.getCategoryStats();
    assert.strictEqual(stats.Electronics.count, 3);
    assert.strictEqual(stats.Furniture.count, 2);
  });

  await t.test('cleanup', () => {
    ex.resetInventory();
  });
});
