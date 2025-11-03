import { test } from 'node:test';
import assert from 'node:assert';
import {
  flattenOnce,
  flattenCompletely,
  flattenOrders,
  flatMapPrices,
  flatMapWithFilter,
  expandAndFlatten,
  flatMapCategories,
  flattenAndGroup,
  flatMapWithTransform,
  complexFlatten
} from './129-pipeline-flatten.js';

// ============================================================================
// BASIC FLATTENING
// ============================================================================

test('flattenOnce - flattens one level', () => {
  const nested = [[1, 2], [3, 4], [5]];
  const result = flattenOnce(nested);

  assert.deepStrictEqual(result, [1, 2, 3, 4, 5], 'Flattens one level');
});

test('flattenOnce - handles empty arrays', () => {
  const nested = [[], [1, 2], []];
  const result = flattenOnce(nested);

  assert.deepStrictEqual(result, [1, 2], 'Removes empty arrays');
});

test('flattenOnce - preserves objects in array', () => {
  const nested = [[{ id: 1 }], [{ id: 2 }]];
  const result = flattenOnce(nested);

  assert.strictEqual(result.length, 2, 'Contains 2 objects');
  assert.strictEqual(result[0].id, 1, 'First object preserved');
});

// ============================================================================
// COMPLETE FLATTENING
// ============================================================================

test('flattenCompletely - flattens deeply nested arrays', () => {
  const nested = [1, [2, [3, [4, [5]]]]];
  const result = flattenCompletely(nested);

  assert.deepStrictEqual(result, [1, 2, 3, 4, 5], 'Flattens all levels');
});

test('flattenCompletely - handles mixed nesting', () => {
  const nested = [[1, 2], [3, [4, 5]], [[6]]];
  const result = flattenCompletely(nested);

  assert.deepStrictEqual(result, [1, 2, 3, 4, 5, 6], 'Handles mixed nesting');
});

test('flattenCompletely - handles empty arrays', () => {
  const nested = [1, [[]], [2]];
  const result = flattenCompletely(nested);

  assert.deepStrictEqual(result, [1, 2], 'Removes all empty arrays');
});

// ============================================================================
// FLATTEN ORDERS
// ============================================================================

test('flattenOrders - extracts items from orders', () => {
  const orders = [
    { id: 1, items: [{ name: 'item1', price: 100 }, { name: 'item2', price: 50 }] },
    { id: 2, items: [{ name: 'item3', price: 200 }] }
  ];

  const result = flattenOrders(orders);

  assert.strictEqual(result.length, 3, 'Returns all items');
  assert.strictEqual(result[0].name, 'item1', 'First item correct');
  assert.strictEqual(result[2].name, 'item3', 'Last item correct');
});

test('flattenOrders - handles empty items', () => {
  const orders = [
    { id: 1, items: [{ name: 'item1', price: 100 }] },
    { id: 2, items: [] },
    { id: 3, items: [{ name: 'item2', price: 50 }] }
  ];

  const result = flattenOrders(orders);

  assert.strictEqual(result.length, 2, 'Skips orders with no items');
});

// ============================================================================
// FLATMAP PRICES
// ============================================================================

test('flatMapPrices - extracts all prices using flatMap', () => {
  const orders = [
    { id: 1, items: [{ name: 'a', price: 100 }, { name: 'b', price: 50 }] },
    { id: 2, items: [{ name: 'c', price: 200 }] }
  ];

  const result = flatMapPrices(orders);

  assert.deepStrictEqual(result, [100, 50, 200], 'All prices extracted');
});

test('flatMapPrices - handles single item orders', () => {
  const orders = [
    { id: 1, items: [{ price: 100 }] },
    { id: 2, items: [{ price: 200 }] },
    { id: 3, items: [{ price: 50 }] }
  ];

  const result = flatMapPrices(orders);

  assert.deepStrictEqual(result, [100, 200, 50], 'Single items extracted');
});

// ============================================================================
// FLATMAP WITH FILTER
// ============================================================================

test('flatMapWithFilter - filters then flatMaps', () => {
  const students = [
    { name: 'Alice', grades: [90, 95, 88] },  // avg 91
    { name: 'Bob', grades: [70, 75, 72] },    // avg 72.3
    { name: 'Charlie', grades: [85, 88, 91] } // avg 88
  ];

  const result = flatMapWithFilter(students);

  assert.deepStrictEqual(result, [90, 95, 88, 85, 88, 91], 'Filters and flattens grades');
});

test('flatMapWithFilter - excludes low average students', () => {
  const students = [
    { name: 'Strong', grades: [90, 95] },
    { name: 'Weak', grades: [50, 60] }
  ];

  const result = flatMapWithFilter(students);

  // Only Strong student has average > 80
  assert.deepStrictEqual(result, [90, 95], 'Excludes below-threshold students');
});

// ============================================================================
// EXPAND AND FLATTEN
// ============================================================================

test('expandAndFlatten - repeats and flattens numbers', () => {
  const numbers = [2, 3, 1];
  const result = expandAndFlatten(numbers);

  assert.deepStrictEqual(result, [2, 2, 3, 3, 3, 1], 'Numbers repeated correctly');
});

test('expandAndFlatten - handles zeros', () => {
  const numbers = [2, 0, 1];
  const result = expandAndFlatten(numbers);

  assert.deepStrictEqual(result, [2, 2, 1], 'Skips zero repetitions');
});

// ============================================================================
// FLATMAP CATEGORIES
// ============================================================================

test('flatMapCategories - extracts unique categories', () => {
  const products = [
    { name: 'Laptop', categories: ['electronics', 'computers'] },
    { name: 'Phone', categories: ['electronics', 'mobile'] },
    { name: 'Monitor', categories: ['electronics', 'accessories'] }
  ];

  const result = flatMapCategories(products);

  assert.strictEqual(result.length, 5, 'Returns unique categories');
  assert(result.includes('electronics'), 'Contains electronics');
  assert(result.includes('computers'), 'Contains computers');
  assert(result.includes('mobile'), 'Contains mobile');
});

test('flatMapCategories - removes duplicates', () => {
  const products = [
    { name: 'Item1', categories: ['tech', 'gadget'] },
    { name: 'Item2', categories: ['tech', 'device'] }
  ];

  const result = flatMapCategories(products);

  // 'tech' appears twice but should only be once
  const techCount = result.filter(c => c === 'tech').length;
  assert.strictEqual(techCount, 1, 'Removes duplicate categories');
});

// ============================================================================
// FLATTEN AND GROUP
// ============================================================================

test('flattenAndGroup - groups by amount ranges', () => {
  const transactions = [
    [[50, 60], [200, 250]],
    [[100, 150], [600, 700]]
  ];

  const result = flattenAndGroup(transactions);

  assert(result['<100'], 'Has <100 group');
  assert(result['100-500'], 'Has 100-500 group');
  assert(result['>500'], 'Has >500 group');
  assert.strictEqual(result['<100'].length, 2, '<100 has 2 items');
  assert.strictEqual(result['100-500'].length, 2, '100-500 has 2 items');
  assert.strictEqual(result['>500'].length, 2, '>500 has 2 items');
});

test('flattenAndGroup - handles edge cases', () => {
  const transactions = [
    [[100, 500]],
    [[99], [501]]
  ];

  const result = flattenAndGroup(transactions);

  assert.strictEqual(result['<100'].length, 1, 'Correctly categorizes 99 as <100');
  assert.strictEqual(result['100-500'].length, 1, 'Correctly categorizes 100-500');
  assert.strictEqual(result['>500'].length, 1, 'Correctly categorizes 501 as >500');
});

// ============================================================================
// FLATMAP WITH TRANSFORM
// ============================================================================

test('flatMapWithTransform - expands users to hobby records', () => {
  const users = [
    { name: 'Alice', hobbies: ['reading', 'gaming'] },
    { name: 'Bob', hobbies: ['sports'] }
  ];

  const result = flatMapWithTransform(users);

  assert.strictEqual(result.length, 3, 'Creates 3 records (2 + 1)');
  assert.strictEqual(result[0].person, 'Alice', 'First person is Alice');
  assert.strictEqual(result[0].hobby, 'reading', 'First hobby is reading');
  assert.strictEqual(result[2].person, 'Bob', 'Last person is Bob');
  assert.strictEqual(result[2].hobby, 'sports', 'Last hobby is sports');
});

test('flatMapWithTransform - handles multiple hobbies', () => {
  const users = [
    { name: 'Charlie', hobbies: ['a', 'b', 'c', 'd'] }
  ];

  const result = flatMapWithTransform(users);

  assert.strictEqual(result.length, 4, 'Creates 4 records for 4 hobbies');
  assert(result.every(r => r.person === 'Charlie'), 'All records have same person');
});

// ============================================================================
// COMPLEX NESTED FLATTENING
// ============================================================================

test('complexFlatten - extracts items from deeply nested structure', () => {
  const data = [
    {
      categories: [
        {
          items: [
            { id: 1, name: 'item1' },
            { id: 2, name: 'item2' }
          ]
        },
        {
          items: [
            { id: 3, name: 'item3' }
          ]
        }
      ]
    },
    {
      categories: [
        {
          items: [
            { id: 4, name: 'item4' }
          ]
        }
      ]
    }
  ];

  const result = complexFlatten(data);

  assert.strictEqual(result.length, 4, 'Extracts all 4 items');
  assert.strictEqual(result[0].id, 1, 'First item has correct id');
  assert.strictEqual(result[3].id, 4, 'Last item has correct id');
});

test('complexFlatten - handles empty categories', () => {
  const data = [
    {
      categories: [
        { items: [] },
        { items: [{ id: 1, name: 'item1' }] }
      ]
    }
  ];

  const result = complexFlatten(data);

  assert.strictEqual(result.length, 1, 'Skips empty item arrays');
  assert.strictEqual(result[0].id, 1, 'Extracts remaining item');
});
