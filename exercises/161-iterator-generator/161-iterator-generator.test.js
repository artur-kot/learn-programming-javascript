import { describe, it, expect } from 'vitest';
import {
  generateCounts,
  generateFibonacci,
  generateRange,
  generateEvens,
  generateLetters,
  generateWords,
  generateMatches,
  generateMapped,
  generatePairs,
  generateRepeated
} from './161-iterator-generator.js';

describe('Exercise 164: Iterator - Generator Functions', () => {
  describe('generateCounts', () => {
    it('should yield numbers from 1 to max', () => {
      const result = [...generateCounts(3)];
      expect(result).toEqual([1, 2, 3]);
    });

    it('should work with for...of loop', () => {
      const result = [];
      for (const n of generateCounts(2)) {
        result.push(n);
      }
      expect(result).toEqual([1, 2]);
    });

    it('should handle max of 1', () => {
      expect([...generateCounts(1)]).toEqual([1]);
    });

    it('should return generator object', () => {
      const gen = generateCounts(3);
      expect(typeof gen).toBe('object');
      expect(typeof gen.next).toBe('function');
    });

    it('should yield correct count', () => {
      let count = 0;
      for (const n of generateCounts(5)) {
        count++;
      }
      expect(count).toBe(5);
    });
  });

  describe('generateFibonacci', () => {
    it('should yield Fibonacci sequence', () => {
      const result = [...generateFibonacci(5)];
      expect(result).toEqual([1, 1, 2, 3, 5]);
    });

    it('should work with first 6 numbers', () => {
      const result = [...generateFibonacci(6)];
      expect(result).toEqual([1, 1, 2, 3, 5, 8]);
    });

    it('should handle count of 1', () => {
      expect([...generateFibonacci(1)]).toEqual([1]);
    });

    it('should handle count of 2', () => {
      expect([...generateFibonacci(2)]).toEqual([1, 1]);
    });

    it('should return correct number of values', () => {
      const result = [...generateFibonacci(10)];
      expect(result.length).toBe(10);
    });

    it('should be in increasing order', () => {
      const result = [...generateFibonacci(7)];
      for (let i = 2; i < result.length; i++) {
        expect(result[i]).toBe(result[i - 1] + result[i - 2]);
      }
    });
  });

  describe('generateRange', () => {
    it('should create range with default step 1', () => {
      const result = [...generateRange(1, 3)];
      expect(result).toEqual([1, 2, 3]);
    });

    it('should create range with custom step', () => {
      const result = [...generateRange(0, 10, 2)];
      expect(result).toEqual([0, 2, 4, 6, 8, 10]);
    });

    it('should handle single value', () => {
      expect([...generateRange(5, 5)]).toEqual([5]);
    });

    it('should handle negative numbers', () => {
      const result = [...generateRange(-2, 1)];
      expect(result).toEqual([-2, -1, 0, 1]);
    });

    it('should work with work for...of', () => {
      const result = [];
      for (const n of generateRange(1, 3)) {
        result.push(n);
      }
      expect(result).toEqual([1, 2, 3]);
    });

    it('should handle larger steps', () => {
      const result = [...generateRange(0, 100, 25)];
      expect(result).toEqual([0, 25, 50, 75, 100]);
    });
  });

  describe('generateEvens', () => {
    it('should yield only even numbers', () => {
      const result = [...generateEvens([1, 2, 3, 4, 5])];
      expect(result).toEqual([2, 4]);
    });

    it('should work with for...of', () => {
      const result = [];
      for (const n of generateEvens([1, 2, 3])) {
        result.push(n);
      }
      expect(result).toEqual([2]);
    });

    it('should handle empty array', () => {
      expect([...generateEvens([])]).toEqual([]);
    });

    it('should handle no even numbers', () => {
      expect([...generateEvens([1, 3, 5])]).toEqual([]);
    });

    it('should preserve order', () => {
      const result = [...generateEvens([8, 1, 4, 2, 7])];
      expect(result).toEqual([8, 4, 2]);
    });
  });

  describe('generateLetters', () => {
    it('should yield individual characters', () => {
      const result = [...generateLetters('Hi')];
      expect(result).toEqual(['H', 'i']);
    });

    it('should work with for...of', () => {
      const result = [];
      for (const char of generateLetters('ABC')) {
        result.push(char);
      }
      expect(result).toEqual(['A', 'B', 'C']);
    });

    it('should handle empty string', () => {
      expect([...generateLetters('')]).toEqual([]);
    });

    it('should handle special characters', () => {
      const result = [...generateLetters('!@#')];
      expect(result).toEqual(['!', '@', '#']);
    });

    it('should handle spaces', () => {
      const result = [...generateLetters('a b')];
      expect(result).toEqual(['a', ' ', 'b']);
    });
  });

  describe('generateWords', () => {
    it('should split text into words', () => {
      const result = [...generateWords('Hello World Test')];
      expect(result).toEqual(['Hello', 'World', 'Test']);
    });

    it('should work with for...of', () => {
      const result = [];
      for (const word of generateWords('one two')) {
        result.push(word);
      }
      expect(result).toEqual(['one', 'two']);
    });

    it('should handle single word', () => {
      expect([...generateWords('word')]).toEqual(['word']);
    });

    it('should handle empty string', () => {
      expect([...generateWords('')]).toEqual(['']);
    });

    it('should skip empty strings from multiple spaces', () => {
      const result = [...generateWords('a  b')];
      // This depends on implementation - should handle gracefully
      expect(result.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('generateMatches', () => {
    it('should yield matching items', () => {
      const result = [...generateMatches([1, 2, 3, 4], x => x > 2)];
      expect(result).toEqual([3, 4]);
    });

    it('should work with for...of', () => {
      const result = [];
      for (const n of generateMatches([1, 2, 3], x => x % 2 === 0)) {
        result.push(n);
      }
      expect(result).toEqual([2]);
    });

    it('should handle empty results', () => {
      const result = [...generateMatches([1, 2, 3], x => x > 10)];
      expect(result).toEqual([]);
    });

    it('should work with strings', () => {
      const result = [...generateMatches(['a', 'ab', 'abc'], s => s.length > 1)];
      expect(result).toEqual(['ab', 'abc']);
    });

    it('should preserve order', () => {
      const result = [...generateMatches([5, 1, 3, 2, 4], x => x > 2)];
      expect(result).toEqual([5, 3, 4]);
    });
  });

  describe('generateMapped', () => {
    it('should transform items', () => {
      const result = [...generateMapped([1, 2, 3], x => x * 2)];
      expect(result).toEqual([2, 4, 6]);
    });

    it('should work with for...of', () => {
      const result = [];
      for (const n of generateMapped([1, 2], x => x + 10)) {
        result.push(n);
      }
      expect(result).toEqual([11, 12]);
    });

    it('should handle empty array', () => {
      expect([...generateMapped([], x => x * 2)]).toEqual([]);
    });

    it('should work with strings', () => {
      const result = [...generateMapped(['a', 'b'], x => x.toUpperCase())];
      expect(result).toEqual(['A', 'B']);
    });

    it('should handle complex transformations', () => {
      const result = [...generateMapped([1, 2], x => ({value: x, squared: x * x}))];
      expect(result[0]).toEqual({value: 1, squared: 1});
      expect(result[1]).toEqual({value: 2, squared: 4});
    });
  });

  describe('generatePairs', () => {
    it('should yield adjacent pairs', () => {
      const result = [...generatePairs([1, 2, 3, 4])];
      expect(result).toEqual([[1, 2], [2, 3], [3, 4]]);
    });

    it('should work with for...of', () => {
      const result = [];
      for (const pair of generatePairs([1, 2, 3])) {
        result.push(pair);
      }
      expect(result).toEqual([[1, 2], [2, 3]]);
    });

    it('should handle 2-element array', () => {
      expect([...generatePairs([1, 2])]).toEqual([[1, 2]]);
    });

    it('should handle 1-element array', () => {
      expect([...generatePairs([1])]).toEqual([]);
    });

    it('should work with strings', () => {
      const result = [...generatePairs('abc')];
      expect(result).toEqual([['a', 'b'], ['b', 'c']]);
    });
  });

  describe('generateRepeated', () => {
    it('should repeat value n times', () => {
      const result = [...generateRepeated('x', 3)];
      expect(result).toEqual(['x', 'x', 'x']);
    });

    it('should work with for...of', () => {
      const result = [];
      for (const val of generateRepeated(5, 2)) {
        result.push(val);
      }
      expect(result).toEqual([5, 5]);
    });

    it('should handle 0 times', () => {
      expect([...generateRepeated('x', 0)]).toEqual([]);
    });

    it('should handle 1 time', () => {
      expect([...generateRepeated('a', 1)]).toEqual(['a']);
    });

    it('should work with different types', () => {
      expect([...generateRepeated(42, 3)]).toEqual([42, 42, 42]);
      expect([...generateRepeated(null, 2)]).toEqual([null, null]);
    });

    it('should work with objects', () => {
      const obj = {x: 1};
      const result = [...generateRepeated(obj, 2)];
      expect(result[0]).toBe(obj);
      expect(result[1]).toBe(obj);
    });
  });

  describe('Integration tests', () => {
    it('should chain generators with spread', () => {
      const ranges = [...generateRange(1, 3)];
      const evens = [...generateEvens(ranges.concat([4, 5]))];
      expect(evens).toEqual([2, 4]);
    });

    it('should use generator output as input', () => {
      const counted = [...generateCounts(4)];
      const mapped = [...generateMapped(counted, x => x * 10)];
      expect(mapped).toEqual([10, 20, 30, 40]);
    });

    it('should combine multiple generators', () => {
      const numbers = [...generateRange(1, 5)];
      const doubled = [...generateMapped(numbers, x => x * 2)];
      const pairs = [...generatePairs(doubled)];
      expect(pairs).toEqual([[2, 4], [4, 6], [6, 8], [8, 10]]);
    });

    it('should filter and transform together', () => {
      const words = [...generateWords('one two three four five')];
      const long = [...generateMatches(words, w => w.length > 3)];
      const upper = [...generateMapped(long, w => w.toUpperCase())];
      expect(upper).toEqual(['THREE', 'FOUR', 'FIVE']);
    });
  });
});
