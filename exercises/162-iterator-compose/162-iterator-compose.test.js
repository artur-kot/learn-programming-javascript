import { describe, it, expect } from 'vitest';
import {
  compose,
  pipe,
  map,
  filter,
  flatMap,
  takeUntil,
  dropWhile,
  chunk,
  interleave,
  chain
} from './162-iterator-compose.js';

describe('Exercise 167: Iterator - Generator Composition', () => {
  // Helper generators for testing
  function* nums(arr) {
    for (const n of arr) yield n;
  }

  function* doubler(arr) {
    for (const x of arr) yield x * 2;
  }

  function* evens(gen) {
    for (const x of gen) if (x % 2 === 0) yield x;
  }

  describe('compose', () => {
    it('should compose two generators', () => {
      const composed = compose(doubler, evens);
      const result = [...composed([1, 2, 3, 4])];
      expect(result).toEqual([4, 8]);
    });

    it('should apply in correct order', () => {
      const composed = compose(doubler, evens);
      const result = [...composed([5])];
      expect(result).toEqual([10]); // 5*2=10, is even
    });

    it('should handle empty input', () => {
      const composed = compose(doubler, evens);
      expect([...composed([])]).toEqual([]);
    });
  });

  describe('pipe', () => {
    it('should chain transformers left-to-right', () => {
      function* add5(arr) { for (const x of arr) yield x + 5; }
      function* double(arr) { for (const x of arr) yield x * 2; }
      
      const transform = pipe([add5, double]);
      const result = [...transform([1, 2, 3])];
      expect(result).toEqual([12, 14, 16]); // (1+5)*2=12, etc
    });

    it('should work with single transformer', () => {
      const transform = pipe([doubler]);
      expect([...transform([1, 2])]).toEqual([2, 4]);
    });

    it('should work with multiple transformers', () => {
      function* addOne(arr) { for (const x of arr) yield x + 1; }
      function* double(arr) { for (const x of arr) yield x * 2; }
      function* addTwo(arr) { for (const x of arr) yield x + 2; }
      
      const transform = pipe([addOne, double, addTwo]);
      const result = [...transform([5])];
      expect(result).toEqual([14]); // ((5+1)*2)+2=14
    });
  });

  describe('map', () => {
    it('should transform values', () => {
      const gen = map(nums([1, 2, 3]), x => x * 2);
      expect([...gen]).toEqual([2, 4, 6]);
    });

    it('should work with strings', () => {
      const gen = map(nums(['a', 'b']), x => x.toUpperCase());
      expect([...gen]).toEqual(['A', 'B']);
    });

    it('should preserve order', () => {
      const gen = map(nums([3, 1, 2]), x => x * 10);
      expect([...gen]).toEqual([30, 10, 20]);
    });
  });

  describe('filter', () => {
    it('should filter matching values', () => {
      const gen = filter(nums([1, 2, 3, 4]), x => x > 2);
      expect([...gen]).toEqual([3, 4]);
    });

    it('should handle no matches', () => {
      const gen = filter(nums([1, 2, 3]), x => x > 10);
      expect([...gen]).toEqual([]);
    });

    it('should preserve order', () => {
      const gen = filter(nums([5, 1, 3, 2, 4]), x => x % 2 === 0);
      expect([...gen]).toEqual([2, 4]);
    });
  });

  describe('flatMap', () => {
    it('should map and flatten', () => {
      const gen = flatMap(nums([1, 2]), x => [x, x * 10]);
      expect([...gen]).toEqual([1, 10, 2, 20]);
    });

    it('should work with generators', () => {
      const gen = flatMap(nums([1, 2]), function*(x) {
        yield x;
        yield x * 100;
      });
      expect([...gen]).toEqual([1, 100, 2, 200]);
    });

    it('should flatten multiple levels from map', () => {
      const gen = flatMap(nums([2, 3]), x => Array(x).fill(x));
      expect([...gen]).toEqual([2, 2, 3, 3, 3]);
    });
  });

  describe('takeUntil', () => {
    it('should yield until condition true', () => {
      const gen = takeUntil(nums([1, 2, 3, 4]), x => x > 2);
      expect([...gen]).toEqual([1, 2]);
    });

    it('should handle condition always false', () => {
      const gen = takeUntil(nums([1, 2, 3]), x => x > 10);
      expect([...gen]).toEqual([1, 2, 3]);
    });

    it('should stop at first match', () => {
      const gen = takeUntil(nums([1, 2, 3, 4, 5]), x => x === 3);
      expect([...gen]).toEqual([1, 2]);
    });
  });

  describe('dropWhile', () => {
    it('should skip while condition true', () => {
      const gen = dropWhile(nums([1, 2, 3, 4]), x => x < 3);
      expect([...gen]).toEqual([3, 4]);
    });

    it('should drop nothing if condition false', () => {
      const gen = dropWhile(nums([1, 2, 3]), x => x > 10);
      expect([...gen]).toEqual([1, 2, 3]);
    });

    it('should drop all if condition always true', () => {
      const gen = dropWhile(nums([1, 2, 3]), x => x < 10);
      expect([...gen]).toEqual([]);
    });
  });

  describe('chunk', () => {
    it('should group into chunks', () => {
      const gen = chunk(nums([1, 2, 3, 4]), 2);
      expect([...gen]).toEqual([[1, 2], [3, 4]]);
    });

    it('should handle partial last chunk', () => {
      const gen = chunk(nums([1, 2, 3, 4, 5]), 2);
      expect([...gen]).toEqual([[1, 2], [3, 4], [5]]);
    });

    it('should work with chunk size 1', () => {
      const gen = chunk(nums([1, 2, 3]), 1);
      expect([...gen]).toEqual([[1], [2], [3]]);
    });

    it('should work with chunk larger than input', () => {
      const gen = chunk(nums([1, 2]), 5);
      expect([...gen]).toEqual([[1, 2]]);
    });
  });

  describe('interleave', () => {
    it('should alternate between generators', () => {
      const gen = interleave(nums([1, 2]), nums(['a', 'b']));
      expect([...gen]).toEqual([1, 'a', 2, 'b']);
    });

    it('should handle different lengths', () => {
      const gen = interleave(nums([1, 2, 3]), nums(['a', 'b']));
      expect([...gen]).toEqual([1, 'a', 2, 'b', 3]);
    });

    it('should handle first shorter', () => {
      const gen = interleave(nums([1]), nums(['a', 'b', 'c']));
      expect([...gen]).toEqual([1, 'a', 'b', 'c']);
    });

    it('should handle empty generators', () => {
      const gen = interleave(nums([]), nums([]));
      expect([...gen]).toEqual([]);
    });
  });

  describe('chain', () => {
    it('should combine multiple generators', () => {
      const gen = chain([nums([1, 2]), nums([3, 4])]);
      expect([...gen]).toEqual([1, 2, 3, 4]);
    });

    it('should work with single generator', () => {
      const gen = chain([nums([1, 2, 3])]);
      expect([...gen]).toEqual([1, 2, 3]);
    });

    it('should work with empty array', () => {
      const gen = chain([]);
      expect([...gen]).toEqual([]);
    });

    it('should work with many generators', () => {
      const gen = chain([nums([1]), nums([2]), nums([3]), nums([4])]);
      expect([...gen]).toEqual([1, 2, 3, 4]);
    });

    it('should handle generators of different sizes', () => {
      const gen = chain([nums([1, 2]), nums([3]), nums([4, 5, 6])]);
      expect([...gen]).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('Integration tests', () => {
    it('should compose map and filter', () => {
      const gen = filter(map(nums([1, 2, 3, 4]), x => x * 2), x => x > 4);
      expect([...gen]).toEqual([6, 8]);
    });

    it('should chain complex operations', () => {
      const gen = chain([
        map(nums([1, 2]), x => x * 10),
        filter(nums([100, 200, 300]), x => x > 150)
      ]);
      expect([...gen]).toEqual([10, 20, 200, 300]);
    });

    it('should chunk mapped values', () => {
      const gen = chunk(map(nums([1, 2, 3, 4]), x => x * 2), 2);
      expect([...gen]).toEqual([[2, 4], [6, 8]]);
    });

    it('should use pipe with multiple steps', () => {
      function* add1(arr) { for (const x of arr) yield x + 1; }
      function* double(arr) { for (const x of arr) yield x * 2; }
      function* filterEven(arr) { for (const x of arr) if (x % 2 === 0) yield x; }
      
      const transform = pipe([add1, double, filterEven]);
      const result = [...transform([1, 2, 3, 4])];
      expect(result).toEqual([4, 8, 12]);
    });

    it('should interleave with chunk', () => {
      const gen = chunk(interleave(nums([1, 2]), nums(['a', 'b'])), 2);
      expect([...gen]).toEqual([[1, 'a'], [2, 'b']]);
    });
  });
});
