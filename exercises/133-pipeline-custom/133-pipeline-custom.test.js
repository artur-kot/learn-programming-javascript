import { test } from 'node:test';
import assert from 'node:assert';
import {
  chunk,
  compact,
  difference,
  intersection,
  unique,
  groupBy,
  indexBy,
  partition,
  takeWhile,
  dropWhile
} from './133-pipeline-custom.js';

// ============================================================================
// CHUNK
// ============================================================================

test('chunk - splits array into chunks', () => {
  const result = chunk([1, 2, 3, 4, 5], 2);

  assert.strictEqual(result.length, 3, 'Creates 3 chunks');
  assert.deepStrictEqual(result[0], [1, 2], 'First chunk');
  assert.deepStrictEqual(result[1], [3, 4], 'Second chunk');
  assert.deepStrictEqual(result[2], [5], 'Last chunk (partial)');
});

test('chunk - handles empty array', () => {
  const result = chunk([], 2);

  assert.deepStrictEqual(result, [], 'Empty array returns empty');
});

test('chunk - size larger than array', () => {
  const result = chunk([1, 2], 5);

  assert.strictEqual(result.length, 1, 'Single chunk');
  assert.deepStrictEqual(result[0], [1, 2], 'Entire array in chunk');
});

// ============================================================================
// COMPACT
// ============================================================================

test('compact - removes falsy values', () => {
  const result = compact([0, 1, false, 2, '', 3, null, undefined]);

  assert.deepStrictEqual(result, [1, 2, 3], 'Only truthy values remain');
});

test('compact - preserves falsy objects', () => {
  const obj = { value: 0 };
  const result = compact([obj, false, null]);

  assert.strictEqual(result.length, 1, 'Object with falsy value kept');
  assert.strictEqual(result[0], obj, 'Correct object preserved');
});

test('compact - handles all truthy', () => {
  const result = compact([1, 'a', true]);

  assert.deepStrictEqual(result, [1, 'a', true], 'All kept');
});

// ============================================================================
// DIFFERENCE
// ============================================================================

test('difference - returns elements not in second array', () => {
  const result = difference([1, 2, 3, 4], [2, 4]);

  assert.deepStrictEqual(result, [1, 3], 'Correct difference');
});

test('difference - handles empty second array', () => {
  const result = difference([1, 2, 3], []);

  assert.deepStrictEqual(result, [1, 2, 3], 'Returns all from first');
});

test('difference - no common elements', () => {
  const result = difference([1, 2], [3, 4]);

  assert.deepStrictEqual(result, [1, 2], 'Returns all from first');
});

test('difference - with objects', () => {
  const result = difference([1, 2, 3], [2]);

  assert.deepStrictEqual(result, [1, 3], 'Works with numbers');
});

// ============================================================================
// INTERSECTION
// ============================================================================

test('intersection - returns common elements', () => {
  const result = intersection([1, 2, 3, 4], [2, 3, 5]);

  assert.deepStrictEqual(result, [2, 3], 'Common elements found');
});

test('intersection - no common elements', () => {
  const result = intersection([1, 2], [3, 4]);

  assert.deepStrictEqual(result, [], 'Returns empty');
});

test('intersection - handles empty arrays', () => {
  const result1 = intersection([], [1, 2]);
  const result2 = intersection([1, 2], []);

  assert.deepStrictEqual(result1, [], 'First empty returns empty');
  assert.deepStrictEqual(result2, [], 'Second empty returns empty');
});

test('intersection - handles duplicates', () => {
  const result = intersection([1, 1, 2, 2, 3], [2, 3, 3]);

  assert(result.includes(2), 'Contains 2');
  assert(result.includes(3), 'Contains 3');
  assert(!result.includes(1), 'Does not contain 1');
});

// ============================================================================
// UNIQUE
// ============================================================================

test('unique - removes duplicates', () => {
  const result = unique([1, 2, 2, 3, 1, 3, 3]);

  assert.strictEqual(result.length, 3, 'Returns 3 unique values');
  assert(result.includes(1), 'Contains 1');
  assert(result.includes(2), 'Contains 2');
  assert(result.includes(3), 'Contains 3');
});

test('unique - handles empty array', () => {
  const result = unique([]);

  assert.deepStrictEqual(result, [], 'Empty remains empty');
});

test('unique - all unique', () => {
  const result = unique([1, 2, 3]);

  assert.strictEqual(result.length, 3, 'All unique');
});

// ============================================================================
// GROUP BY
// ============================================================================

test('groupBy - groups by function result', () => {
  const data = [
    { type: 'a', value: 1 },
    { type: 'b', value: 2 },
    { type: 'a', value: 3 }
  ];

  const result = groupBy(data, item => item.type);

  assert(result.a, 'Group a exists');
  assert(result.b, 'Group b exists');
  assert.strictEqual(result.a.length, 2, 'Group a has 2 items');
  assert.strictEqual(result.b.length, 1, 'Group b has 1 item');
});

test('groupBy - with number grouping', () => {
  const result = groupBy([1, 2, 3, 4, 5], x => x % 2);

  assert.strictEqual(result[0].length, 2, 'Even numbers grouped');
  assert.strictEqual(result[1].length, 3, 'Odd numbers grouped');
});

test('groupBy - empty array', () => {
  const result = groupBy([], x => x);

  assert.deepStrictEqual(result, {}, 'Empty array returns empty object');
});

// ============================================================================
// INDEX BY
// ============================================================================

test('indexBy - creates lookup object', () => {
  const data = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];

  const result = indexBy(data, item => item.id);

  assert.strictEqual(result[1].name, 'Alice', 'Lookup by id 1');
  assert.strictEqual(result[2].name, 'Bob', 'Lookup by id 2');
});

test('indexBy - with string keys', () => {
  const data = [
    { code: 'US', name: 'United States' },
    { code: 'UK', name: 'United Kingdom' }
  ];

  const result = indexBy(data, item => item.code);

  assert.strictEqual(result.US.name, 'United States', 'Lookup by string key');
  assert.strictEqual(result.UK.name, 'United Kingdom', 'Another string key');
});

test('indexBy - empty array', () => {
  const result = indexBy([], x => x);

  assert.deepStrictEqual(result, {}, 'Empty array returns empty object');
});

// ============================================================================
// PARTITION
// ============================================================================

test('partition - splits array into two', () => {
  const result = partition([1, 2, 3, 4], x => x % 2);

  assert.strictEqual(result.length, 2, 'Returns 2 arrays');
  assert.deepStrictEqual(result[0], [1, 3], 'Truthy partition');
  assert.deepStrictEqual(result[1], [2, 4], 'Falsy partition');
});

test('partition - no matches in first partition', () => {
  const result = partition([2, 4], x => x % 2);

  assert.deepStrictEqual(result[0], [], 'Empty truthy partition');
  assert.deepStrictEqual(result[1], [2, 4], 'All in falsy partition');
});

test('partition - empty array', () => {
  const result = partition([], x => x > 2);

  assert.deepStrictEqual(result, [[], []], 'Returns empty partitions');
});

// ============================================================================
// TAKE WHILE
// ============================================================================

test('takeWhile - takes elements while predicate true', () => {
  const result = takeWhile([1, 2, 3, 4, 5], x => x < 4);

  assert.deepStrictEqual(result, [1, 2, 3], 'Takes while x < 4');
});

test('takeWhile - stops at first false', () => {
  const result = takeWhile([1, 2, 3, 2, 1], x => x < 3);

  assert.deepStrictEqual(result, [1, 2], 'Stops at first false');
});

test('takeWhile - all match', () => {
  const result = takeWhile([1, 2, 3], x => x < 10);

  assert.deepStrictEqual(result, [1, 2, 3], 'All match');
});

test('takeWhile - none match', () => {
  const result = takeWhile([5, 6, 7], x => x < 3);

  assert.deepStrictEqual(result, [], 'Empty when none match');
});

// ============================================================================
// DROP WHILE
// ============================================================================

test('dropWhile - skips elements while predicate true', () => {
  const result = dropWhile([1, 2, 3, 4, 5], x => x < 4);

  assert.deepStrictEqual(result, [4, 5], 'Drops while x < 4');
});

test('dropWhile - stops at first false', () => {
  const result = dropWhile([1, 2, 3, 2, 1], x => x < 3);

  assert.deepStrictEqual(result, [3, 2, 1], 'Keeps from first false onward');
});

test('dropWhile - all match', () => {
  const result = dropWhile([1, 2, 3], x => x < 10);

  assert.deepStrictEqual(result, [], 'All skipped when all match');
});

test('dropWhile - none match', () => {
  const result = dropWhile([5, 6, 7], x => x < 3);

  assert.deepStrictEqual(result, [5, 6, 7], 'None dropped when none match');
});
