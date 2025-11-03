import { test } from 'node:test';
import assert from 'node:assert';
import {
  stringToArray,
  createRange,
  setToArray,
  mapToArray,
  reverseString,
  arrayOf,
  transformRange,
  countCharacters,
  createMatrix,
  uniqueCharacters
} from './130-pipeline-construction.js';

// ============================================================================
// STRING TO ARRAY
// ============================================================================

test('stringToArray - converts string to character array', () => {
  const result = stringToArray('hello');

  assert.deepStrictEqual(result, ['h', 'e', 'l', 'l', 'o'], 'String converted correctly');
  assert.strictEqual(result.length, 5, 'Length matches string length');
});

test('stringToArray - handles single character', () => {
  const result = stringToArray('a');

  assert.deepStrictEqual(result, ['a'], 'Single character converted');
});

test('stringToArray - handles empty string', () => {
  const result = stringToArray('');

  assert.deepStrictEqual(result, [], 'Empty string becomes empty array');
});

test('stringToArray - preserves special characters', () => {
  const result = stringToArray('a-b');

  assert.deepStrictEqual(result, ['a', '-', 'b'], 'Special characters preserved');
});

// ============================================================================
// CREATE RANGE
// ============================================================================

test('createRange - creates array from start to end', () => {
  const result = createRange(1, 5);

  assert.deepStrictEqual(result, [1, 2, 3, 4, 5], 'Range created correctly');
});

test('createRange - works with negative numbers', () => {
  const result = createRange(-2, 2);

  assert.deepStrictEqual(result, [-2, -1, 0, 1, 2], 'Negative range works');
});

test('createRange - single value', () => {
  const result = createRange(5, 5);

  assert.deepStrictEqual(result, [5], 'Single value range');
});

// ============================================================================
// SET TO ARRAY
// ============================================================================

test('setToArray - converts Set to array', () => {
  const set = new Set([1, 2, 3]);
  const result = setToArray(set);

  assert.strictEqual(result.length, 3, 'Returns 3 elements');
  assert(result.includes(1), 'Contains 1');
  assert(result.includes(2), 'Contains 2');
  assert(result.includes(3), 'Contains 3');
});

test('setToArray - removes duplicates via Set', () => {
  const set = new Set([1, 1, 2, 2, 3]);
  const result = setToArray(set);

  assert.strictEqual(result.length, 3, 'Duplicates already removed by Set');
});

test('setToArray - handles empty Set', () => {
  const set = new Set();
  const result = setToArray(set);

  assert.deepStrictEqual(result, [], 'Empty set becomes empty array');
});

// ============================================================================
// MAP TO ARRAY
// ============================================================================

test('mapToArray - converts Map to array of pairs', () => {
  const map = new Map([['a', 1], ['b', 2]]);
  const result = mapToArray(map);

  assert.strictEqual(result.length, 2, 'Returns 2 entries');
  assert.deepStrictEqual(result[0], ['a', 1], 'First pair correct');
  assert.deepStrictEqual(result[1], ['b', 2], 'Second pair correct');
});

test('mapToArray - handles empty Map', () => {
  const map = new Map();
  const result = mapToArray(map);

  assert.deepStrictEqual(result, [], 'Empty map becomes empty array');
});

// ============================================================================
// REVERSE STRING
// ============================================================================

test('reverseString - reverses a string', () => {
  const result = reverseString('hello');

  assert.strictEqual(result, 'olleh', 'String reversed');
});

test('reverseString - handles single character', () => {
  const result = reverseString('a');

  assert.strictEqual(result, 'a', 'Single character unchanged');
});

test('reverseString - handles palindrome', () => {
  const result = reverseString('racecar');

  assert.strictEqual(result, 'racecar', 'Palindrome unchanged');
});

// ============================================================================
// ARRAY OF
// ============================================================================

test('arrayOf - creates array from arguments', () => {
  const result = arrayOf(1, 2, 3);

  assert.deepStrictEqual(result, [1, 2, 3], 'Array created from arguments');
});

test('arrayOf - handles single argument', () => {
  const result = arrayOf(42);

  assert.deepStrictEqual(result, [42], 'Single argument becomes array');
});

test('arrayOf - handles mixed types', () => {
  const result = arrayOf(1, 'two', true, null);

  assert.deepStrictEqual(result, [1, 'two', true, null], 'Mixed types handled');
});

test('arrayOf - handles no arguments', () => {
  const result = arrayOf();

  assert.deepStrictEqual(result, [], 'No arguments becomes empty array');
});

// ============================================================================
// TRANSFORM RANGE
// ============================================================================

test('transformRange - creates transformed range', () => {
  const result = transformRange(3, x => x * 2);

  assert.deepStrictEqual(result, [2, 4, 6], 'Range transformed correctly');
});

test('transformRange - with square function', () => {
  const result = transformRange(4, x => x * x);

  assert.deepStrictEqual(result, [1, 4, 9, 16], 'Squares correct');
});

test('transformRange - with identity function', () => {
  const result = transformRange(5, x => x);

  assert.deepStrictEqual(result, [1, 2, 3, 4, 5], 'Identity returns range');
});

// ============================================================================
// COUNT CHARACTERS
// ============================================================================

test('countCharacters - counts character occurrences', () => {
  const result = countCharacters('aabbcc');

  assert.deepStrictEqual(result, { a: 2, b: 2, c: 2 }, 'Characters counted correctly');
});

test('countCharacters - handles repeated characters', () => {
  const result = countCharacters('hello');

  assert.strictEqual(result.h, 1, 'h count is 1');
  assert.strictEqual(result.e, 1, 'e count is 1');
  assert.strictEqual(result.l, 2, 'l count is 2');
  assert.strictEqual(result.o, 1, 'o count is 1');
});

test('countCharacters - handles empty string', () => {
  const result = countCharacters('');

  assert.deepStrictEqual(result, {}, 'Empty string returns empty object');
});

// ============================================================================
// CREATE MATRIX
// ============================================================================

test('createMatrix - creates 2D array', () => {
  const result = createMatrix(2, 2, (r, c) => r + c);

  assert.strictEqual(result.length, 2, 'Has 2 rows');
  assert.strictEqual(result[0].length, 2, 'First row has 2 cols');
  assert.deepStrictEqual(result[0], [0, 1], 'First row correct');
  assert.deepStrictEqual(result[1], [1, 2], 'Second row correct');
});

test('createMatrix - creates 3x3 matrix', () => {
  const result = createMatrix(3, 3, (r, c) => r * c);

  assert.strictEqual(result.length, 3, 'Has 3 rows');
  assert.deepStrictEqual(result[0], [0, 0, 0], 'First row');
  assert.deepStrictEqual(result[1], [0, 1, 2], 'Second row');
  assert.deepStrictEqual(result[2], [0, 2, 4], 'Third row');
});

test('createMatrix - rectangular matrix', () => {
  const result = createMatrix(2, 3, (r, c) => c);

  assert.strictEqual(result.length, 2, 'Has 2 rows');
  assert.strictEqual(result[0].length, 3, 'Has 3 cols');
  assert.deepStrictEqual(result[0], [0, 1, 2], 'First row');
  assert.deepStrictEqual(result[1], [0, 1, 2], 'Second row');
});

// ============================================================================
// UNIQUE CHARACTERS
// ============================================================================

test('uniqueCharacters - returns unique sorted characters', () => {
  const result = uniqueCharacters('hello');

  assert.deepStrictEqual(result, ['e', 'h', 'l', 'o'], 'Unique characters sorted');
});

test('uniqueCharacters - removes duplicates', () => {
  const result = uniqueCharacters('aabbcc');

  assert.deepStrictEqual(result, ['a', 'b', 'c'], 'All unique');
});

test('uniqueCharacters - handles empty string', () => {
  const result = uniqueCharacters('');

  assert.deepStrictEqual(result, [], 'Empty string returns empty array');
});

test('uniqueCharacters - single character', () => {
  const result = uniqueCharacters('a');

  assert.deepStrictEqual(result, ['a'], 'Single character');
});
