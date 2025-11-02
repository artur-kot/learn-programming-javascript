import { describe, it, expect } from 'vitest';
import {
  createCounterIterator,
  createArrayIterator,
  createFilterIterator,
  createPairsIterator,
  createMapIterator,
  makeIterableString,
  createRangeIterator,
  isIterable,
  getIteratorValues,
  createZipIterator
} from './158-iterator-basic.js';

describe('Exercise 163: Iterator - Basic Iterator', () => {
  describe('createCounterIterator', () => {
    it('should create iterator counting from 1 to max', () => {
      const counter = createCounterIterator(3);
      const values = [...counter];
      expect(values).toEqual([1, 2, 3]);
    });

    it('should work with for...of loop', () => {
      const counter = createCounterIterator(2);
      const result = [];
      for (const value of counter) {
        result.push(value);
      }
      expect(result).toEqual([1, 2]);
    });

    it('should handle max of 1', () => {
      const counter = createCounterIterator(1);
      expect([...counter]).toEqual([1]);
    });

    it('should have Symbol.iterator method', () => {
      const counter = createCounterIterator(5);
      expect(typeof counter[Symbol.iterator]).toBe('function');
    });

    it('should create multiple independent iterators', () => {
      const counter1 = createCounterIterator(2);
      const counter2 = createCounterIterator(3);
      expect([...counter1]).toEqual([1, 2]);
      expect([...counter2]).toEqual([1, 2, 3]);
    });
  });

  describe('createArrayIterator', () => {
    it('should manually iterate through array', () => {
      const iter = createArrayIterator([1, 2, 3]);
      expect(iter.next()).toEqual({ value: 1, done: false });
      expect(iter.next()).toEqual({ value: 2, done: false });
      expect(iter.next()).toEqual({ value: 3, done: false });
      expect(iter.next()).toEqual({ value: undefined, done: true });
    });

    it('should work with empty array', () => {
      const iter = createArrayIterator([]);
      expect(iter.next()).toEqual({ value: undefined, done: true });
    });

    it('should work with different types', () => {
      const iter = createArrayIterator(['a', true, null, {x: 1}]);
      expect(iter.next().value).toBe('a');
      expect(iter.next().value).toBe(true);
      expect(iter.next().value).toBe(null);
      expect(iter.next().value).toEqual({x: 1});
    });

    it('should not be reusable after exhaustion', () => {
      const iter = createArrayIterator([1]);
      iter.next();
      expect(iter.next().done).toBe(true);
      expect(iter.next().done).toBe(true);
    });
  });

  describe('createFilterIterator', () => {
    it('should filter items with predicate', () => {
      const iter = createFilterIterator([1, 2, 3, 4], x => x > 2);
      expect([...iter]).toEqual([3, 4]);
    });

    it('should work with for...of', () => {
      const iter = createFilterIterator([1, 2, 3], x => x % 2 === 0);
      const result = [];
      for (const val of iter) {
        result.push(val);
      }
      expect(result).toEqual([2]);
    });

    it('should handle empty results', () => {
      const iter = createFilterIterator([1, 2, 3], x => x > 10);
      expect([...iter]).toEqual([]);
    });

    it('should work with strings', () => {
      const iter = createFilterIterator(['a', 'ab', 'abc'], s => s.length > 1);
      expect([...iter]).toEqual(['ab', 'abc']);
    });

    it('should preserve order', () => {
      const iter = createFilterIterator([5, 1, 3, 2, 4], x => x > 2);
      expect([...iter]).toEqual([5, 3, 4]);
    });
  });

  describe('createPairsIterator', () => {
    it('should create adjacent pairs', () => {
      const iter = createPairsIterator([1, 2, 3, 4]);
      expect([...iter]).toEqual([[1, 2], [2, 3], [3, 4]]);
    });

    it('should handle array with 2 elements', () => {
      const iter = createPairsIterator([1, 2]);
      expect([...iter]).toEqual([[1, 2]]);
    });

    it('should handle array with 1 element', () => {
      const iter = createPairsIterator([1]);
      expect([...iter]).toEqual([]);
    });

    it('should work with strings', () => {
      const iter = createPairsIterator(['a', 'b', 'c']);
      expect([...iter]).toEqual([['a', 'b'], ['b', 'c']]);
    });

    it('should work with mixed types', () => {
      const iter = createPairsIterator([1, 'a', true]);
      expect([...iter]).toEqual([[1, 'a'], ['a', true]]);
    });
  });

  describe('createMapIterator', () => {
    it('should transform items with function', () => {
      const iter = createMapIterator([1, 2, 3], x => x * 2);
      expect([...iter]).toEqual([2, 4, 6]);
    });

    it('should work with for...of', () => {
      const iter = createMapIterator(['a', 'b'], x => x.toUpperCase());
      const result = [];
      for (const val of iter) {
        result.push(val);
      }
      expect(result).toEqual(['A', 'B']);
    });

    it('should handle empty array', () => {
      const iter = createMapIterator([], x => x * 2);
      expect([...iter]).toEqual([]);
    });

    it('should preserve array structure', () => {
      const iter = createMapIterator([[1, 2], [3, 4]], arr => arr.length);
      expect([...iter]).toEqual([2, 2]);
    });

    it('should work with complex transformations', () => {
      const iter = createMapIterator([1, 2, 3], x => ({value: x, doubled: x * 2}));
      const result = [...iter];
      expect(result[0]).toEqual({value: 1, doubled: 2});
      expect(result[2]).toEqual({value: 3, doubled: 6});
    });
  });

  describe('makeIterableString', () => {
    it('should iterate through string characters', () => {
      const iter = makeIterableString('ABC');
      expect([...iter]).toEqual(['A', 'B', 'C']);
    });

    it('should work with for...of', () => {
      const iter = makeIterableString('Hi');
      const result = [];
      for (const char of iter) {
        result.push(char);
      }
      expect(result).toEqual(['H', 'i']);
    });

    it('should handle empty string', () => {
      const iter = makeIterableString('');
      expect([...iter]).toEqual([]);
    });

    it('should handle special characters', () => {
      const iter = makeIterableString('!@#');
      expect([...iter]).toEqual(['!', '@', '#']);
    });

    it('should have Symbol.iterator', () => {
      const iter = makeIterableString('test');
      expect(typeof iter[Symbol.iterator]).toBe('function');
    });
  });

  describe('createRangeIterator', () => {
    it('should create range with default step 1', () => {
      const iter = createRangeIterator(1, 3);
      expect([...iter]).toEqual([1, 2, 3]);
    });

    it('should create range with custom step', () => {
      const iter = createRangeIterator(0, 10, 2);
      expect([...iter]).toEqual([0, 2, 4, 6, 8, 10]);
    });

    it('should work with for...of', () => {
      const iter = createRangeIterator(1, 3, 1);
      const result = [];
      for (const val of iter) {
        result.push(val);
      }
      expect(result).toEqual([1, 2, 3]);
    });

    it('should handle single value', () => {
      const iter = createRangeIterator(5, 5);
      expect([...iter]).toEqual([5]);
    });

    it('should handle negative numbers', () => {
      const iter = createRangeIterator(-2, 1);
      expect([...iter]).toEqual([-2, -1, 0, 1]);
    });

    it('should handle larger steps', () => {
      const iter = createRangeIterator(0, 100, 25);
      expect([...iter]).toEqual([0, 25, 50, 75, 100]);
    });
  });

  describe('isIterable', () => {
    it('should return true for arrays', () => {
      expect(isIterable([1, 2, 3])).toBe(true);
    });

    it('should return true for strings', () => {
      expect(isIterable('hello')).toBe(true);
    });

    it('should return false for plain objects', () => {
      expect(isIterable({a: 1})).toBe(false);
    });

    it('should return true for custom iterators', () => {
      const iter = createCounterIterator(5);
      expect(isIterable(iter)).toBe(true);
    });

    it('should return false for null', () => {
      expect(isIterable(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isIterable(undefined)).toBe(false);
    });

    it('should return false for numbers', () => {
      expect(isIterable(123)).toBe(false);
    });
  });

  describe('getIteratorValues', () => {
    it('should extract values from array', () => {
      expect(getIteratorValues([1, 2, 3])).toEqual([1, 2, 3]);
    });

    it('should extract characters from string', () => {
      expect(getIteratorValues('ABC')).toEqual(['A', 'B', 'C']);
    });

    it('should extract values from custom iterator', () => {
      const iter = createCounterIterator(3);
      expect(getIteratorValues(iter)).toEqual([1, 2, 3]);
    });

    it('should work with empty iterables', () => {
      expect(getIteratorValues([])).toEqual([]);
      expect(getIteratorValues('')).toEqual([]);
    });

    it('should handle mixed content', () => {
      expect(getIteratorValues([1, 'a', null, true])).toEqual([1, 'a', null, true]);
    });
  });

  describe('createZipIterator', () => {
    it('should zip two arrays', () => {
      const iter = createZipIterator([1, 2], ['a', 'b']);
      expect([...iter]).toEqual([[1, 'a'], [2, 'b']]);
    });

    it('should stop at shorter array', () => {
      const iter = createZipIterator([1, 2, 3], ['a', 'b']);
      expect([...iter]).toEqual([[1, 'a'], [2, 'b']]);
    });

    it('should work with for...of', () => {
      const iter = createZipIterator([1, 2], ['x', 'y']);
      const result = [];
      for (const pair of iter) {
        result.push(pair);
      }
      expect(result).toEqual([[1, 'x'], [2, 'y']]);
    });

    it('should handle empty arrays', () => {
      const iter = createZipIterator([], ['a', 'b']);
      expect([...iter]).toEqual([]);
    });

    it('should work with strings', () => {
      const iter = createZipIterator('ab', 'xy');
      expect([...iter]).toEqual([['a', 'x'], ['b', 'y']]);
    });

    it('should handle different types', () => {
      const iter = createZipIterator([1, 2], ['a', true]);
      expect([...iter]).toEqual([[1, 'a'], [2, true]]);
    });
  });

  describe('Integration tests', () => {
    it('should chain multiple iterators', () => {
      const filtered = createFilterIterator([1, 2, 3, 4, 5], x => x > 2);
      const mapped = createMapIterator(getIteratorValues(filtered), x => x * 10);
      expect([...mapped]).toEqual([30, 40, 50]);
    });

    it('should combine counter with range', () => {
      const counter = getIteratorValues(createCounterIterator(3));
      const range = getIteratorValues(createRangeIterator(10, 12));
      const zipped = createZipIterator(counter, range);
      expect([...zipped]).toEqual([[1, 10], [2, 11], [3, 12]]);
    });

    it('should work with nested pairs and map', () => {
      const pairs = getIteratorValues(createPairsIterator([1, 2, 3, 4]));
      const summed = createMapIterator(pairs, ([a, b]) => a + b);
      expect([...summed]).toEqual([3, 5, 7]);
    });
  });
});
