import { describe, it, expect } from 'vitest';
import {
  infiniteCount,
  infiniteRepeating,
  infiniteFibonacci,
  infiniteSquares,
  infinitePowers,
  take,
  takeWhile,
  skip,
  cycle,
  takeEvery
} from './162-iterator-infinite.js';

describe('Exercise 165: Iterator - Infinite Sequences', () => {
  describe('infiniteCount', () => {
    it('should count infinitely', () => {
      const gen = infiniteCount();
      expect(gen.next().value).toBe(1);
      expect(gen.next().value).toBe(2);
      expect(gen.next().value).toBe(3);
    });

    it('should work with take', () => {
      expect(take(infiniteCount(), 5)).toEqual([1, 2, 3, 4, 5]);
    });

    it('should continue from where it left off', () => {
      const gen = infiniteCount();
      gen.next();
      gen.next();
      expect(gen.next().value).toBe(3);
    });

    it('should handle large counts', () => {
      const result = take(infiniteCount(), 100);
      expect(result.length).toBe(100);
      expect(result[0]).toBe(1);
      expect(result[99]).toBe(100);
    });
  });

  describe('infiniteRepeating', () => {
    it('should repeat array items infinitely', () => {
      const result = take(infiniteRepeating(['a', 'b']), 5);
      expect(result).toEqual(['a', 'b', 'a', 'b', 'a']);
    });

    it('should work with numbers', () => {
      const result = take(infiniteRepeating([1, 2, 3]), 7);
      expect(result).toEqual([1, 2, 3, 1, 2, 3, 1]);
    });

    it('should work with single item', () => {
      const result = take(infiniteRepeating(['x']), 3);
      expect(result).toEqual(['x', 'x', 'x']);
    });
  });

  describe('infiniteFibonacci', () => {
    it('should generate Fibonacci sequence', () => {
      const result = take(infiniteFibonacci(), 6);
      expect(result).toEqual([1, 1, 2, 3, 5, 8]);
    });

    it('should continue sequence correctly', () => {
      const result = take(infiniteFibonacci(), 10);
      expect(result[9]).toBe(55); // 10th Fibonacci
    });

    it('should match mathematical definition', () => {
      const result = take(infiniteFibonacci(), 8);
      for (let i = 2; i < result.length; i++) {
        expect(result[i]).toBe(result[i - 1] + result[i - 2]);
      }
    });
  });

  describe('infiniteSquares', () => {
    it('should yield perfect squares', () => {
      const result = take(infiniteSquares(), 4);
      expect(result).toEqual([1, 4, 9, 16]);
    });

    it('should continue sequence', () => {
      const result = take(infiniteSquares(), 7);
      expect(result).toEqual([1, 4, 9, 16, 25, 36, 49]);
    });
  });

  describe('infinitePowers', () => {
    it('should yield powers of base', () => {
      const result = take(infinitePowers(2), 5);
      expect(result).toEqual([2, 4, 8, 16, 32]);
    });

    it('should work with base 10', () => {
      const result = take(infinitePowers(10), 4);
      expect(result).toEqual([10, 100, 1000, 10000]);
    });

    it('should work with base 3', () => {
      const result = take(infinitePowers(3), 4);
      expect(result).toEqual([3, 9, 27, 81]);
    });
  });

  describe('take', () => {
    it('should take from array', () => {
      expect(take([1, 2, 3, 4, 5], 3)).toEqual([1, 2, 3]);
    });

    it('should work with strings', () => {
      const result = take('ABCDE', 2);
      expect(result).toEqual(['A', 'B']);
    });

    it('should handle take 0', () => {
      expect(take([1, 2, 3], 0)).toEqual([]);
    });

    it('should handle taking more than available', () => {
      expect(take([1, 2], 5)).toEqual([1, 2]);
    });

    it('should work with generators', () => {
      function* gen() {
        yield 10;
        yield 20;
        yield 30;
      }
      expect(take(gen(), 2)).toEqual([10, 20]);
    });
  });

  describe('takeWhile', () => {
    it('should take while condition true', () => {
      const result = takeWhile([1, 2, 3, 4, 1], x => x < 4);
      expect(result).toEqual([1, 2, 3]);
    });

    it('should work with infinite sequence', () => {
      const result = takeWhile(infiniteCount(), x => x < 5);
      expect(result).toEqual([1, 2, 3, 4]);
    });

    it('should handle all false', () => {
      const result = takeWhile([1, 2, 3], x => x > 5);
      expect(result).toEqual([]);
    });

    it('should handle all true', () => {
      const result = takeWhile([1, 2, 3], x => x < 10);
      expect(result).toEqual([1, 2, 3]);
    });

    it('should work with strings', () => {
      const result = takeWhile('ABCD', x => x <= 'B');
      expect(result).toEqual(['A', 'B']);
    });
  });

  describe('skip', () => {
    it('should skip n items', () => {
      expect(skip([1, 2, 3, 4, 5], 2)).toEqual([3, 4, 5]);
    });

    it('should work with strings', () => {
      const result = skip('ABCDE', 1);
      expect(result).toEqual(['B', 'C', 'D', 'E']);
    });

    it('should handle skip 0', () => {
      expect(skip([1, 2, 3], 0)).toEqual([1, 2, 3]);
    });

    it('should handle skip all', () => {
      expect(skip([1, 2, 3], 3)).toEqual([]);
    });

    it('should handle skip more than available', () => {
      expect(skip([1, 2], 5)).toEqual([]);
    });
  });

  describe('cycle', () => {
    it('should cycle through array', () => {
      const result = take(cycle([1, 2, 3]), 7);
      expect(result).toEqual([1, 2, 3, 1, 2, 3, 1]);
    });

    it('should work with single item', () => {
      const result = take(cycle(['a']), 3);
      expect(result).toEqual(['a', 'a', 'a']);
    });

    it('should work with two items', () => {
      const result = take(cycle(['x', 'y']), 5);
      expect(result).toEqual(['x', 'y', 'x', 'y', 'x']);
    });
  });

  describe('takeEvery', () => {
    it('should take every nth item', () => {
      const result = takeEvery([1, 2, 3, 4, 5, 6, 7], 2);
      expect(result).toEqual([2, 4, 6]);
    });

    it('should work with strings', () => {
      const result = takeEvery('ABCDEFG', 3);
      expect(result).toEqual(['C', 'F']);
    });

    it('should handle every 1st', () => {
      const result = takeEvery([1, 2, 3], 1);
      expect(result).toEqual([2, 3]); // After first skip
    });

    it('should work with large step', () => {
      expect(takeEvery([1, 2, 3, 4, 5], 4)).toEqual([5]);
    });

    it('should handle step larger than array', () => {
      expect(takeEvery([1, 2, 3], 10)).toEqual([]);
    });
  });

  describe('Integration tests', () => {
    it('should compose infinite generators', () => {
      const result = take(
        takeWhile(infiniteFibonacci(), x => x < 20),
        10
      );
      expect(result).toEqual([1, 1, 2, 3, 5, 8, 13]);
    });

    it('should use cycle with takeWhile', () => {
      const result = takeWhile(cycle([1, 2, 3]), x => x < 5);
      expect(result).toEqual([1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3]);
    });

    it('should skip then take', () => {
      const arr = [1, 2, 3, 4, 5, 6, 7];
      const result = take(skip(arr, 2), 3);
      expect(result).toEqual([3, 4, 5]);
    });

    it('should combine multiple operations', () => {
      const result = take(
        takeWhile(infiniteSquares(), x => x < 50),
        10
      );
      expect(result).toEqual([1, 4, 9, 16, 25, 36, 49]);
    });

    it('should use takeEvery on infinite', () => {
      const result = take(takeEvery(infiniteCount(), 2), 4);
      expect(result).toEqual([2, 4, 6, 8]);
    });
  });
});
