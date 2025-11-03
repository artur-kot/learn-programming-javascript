import { describe, it, expect, beforeEach } from 'vitest';
import { createTagCounter, incrementTag, decrementTag, getTagCount, getMostUsed, getLeastUsed, getTagsSorted, removeTag, mergeCounters, getStats } from './155-tags-map.js';

describe('Tags - Map for Counts', () => {
  let counter;
  beforeEach(() => { counter = createTagCounter(); });

  describe('createTagCounter', () => {
    it('should create empty counter', () => {
      expect(counter instanceof Map).toBe(true);
      expect(counter.size).toBe(0);
    });
    it('should create with initial tags', () => {
      const c = createTagCounter(['a', 'b', 'a']);
      expect(getTagCount(c, 'a')).toBe(2);
      expect(getTagCount(c, 'b')).toBe(1);
    });
  });

  describe('incrementTag', () => {
    it('should add new tag with count 1', () => {
      const result = incrementTag(counter, 'javascript');
      expect(result).toBe(1);
      expect(getTagCount(counter, 'javascript')).toBe(1);
    });
    it('should increment existing tag', () => {
      incrementTag(counter, 'javascript');
      const result = incrementTag(counter, 'javascript');
      expect(result).toBe(2);
    });
    it('should return correct count', () => {
      for (let i = 0; i < 5; i++) {
        incrementTag(counter, 'test');
      }
      expect(getTagCount(counter, 'test')).toBe(5);
    });
  });

  describe('decrementTag', () => {
    it('should decrement existing tag', () => {
      incrementTag(counter, 'test');
      const result = decrementTag(counter, 'test');
      expect(result).toBe(0);
    });
    it('should return 0 for non-existing', () => {
      expect(decrementTag(counter, 'test')).toBe(0);
    });
    it('should not go negative', () => {
      incrementTag(counter, 'test');
      decrementTag(counter, 'test');
      expect(decrementTag(counter, 'test')).toBe(0);
    });
  });

  describe('getTagCount', () => {
    it('should return count for existing tag', () => {
      incrementTag(counter, 'test');
      incrementTag(counter, 'test');
      expect(getTagCount(counter, 'test')).toBe(2);
    });
    it('should return 0 for missing tag', () => {
      expect(getTagCount(counter, 'missing')).toBe(0);
    });
  });

  describe('getMostUsed', () => {
    it('should return most used tag', () => {
      incrementTag(counter, 'a');
      incrementTag(counter, 'b');
      incrementTag(counter, 'b');
      expect(getMostUsed(counter)).toContain('b');
    });
    it('should handle multiple with same count', () => {
      incrementTag(counter, 'a');
      incrementTag(counter, 'b');
      const result = getMostUsed(counter);
      expect(result.length).toBe(2);
    });
  });

  describe('getLeastUsed', () => {
    it('should return least used tag', () => {
      incrementTag(counter, 'a');
      incrementTag(counter, 'b');
      incrementTag(counter, 'b');
      expect(getLeastUsed(counter)).toContain('a');
    });
  });

  describe('getTagsSorted', () => {
    it('should sort descending by default', () => {
      incrementTag(counter, 'a');
      incrementTag(counter, 'b');
      incrementTag(counter, 'b');
      incrementTag(counter, 'c');
      incrementTag(counter, 'c');
      incrementTag(counter, 'c');
      const result = getTagsSorted(counter);
      expect(result[0]).toBe('c');
    });
    it('should sort ascending if specified', () => {
      incrementTag(counter, 'a');
      incrementTag(counter, 'b');
      incrementTag(counter, 'b');
      const result = getTagsSorted(counter, false);
      expect(result[0]).toBe('a');
    });
  });

  describe('removeTag', () => {
    it('should remove existing tag', () => {
      incrementTag(counter, 'test');
      const result = removeTag(counter, 'test');
      expect(result).toBe(true);
      expect(getTagCount(counter, 'test')).toBe(0);
    });
    it('should return false for non-existing', () => {
      expect(removeTag(counter, 'test')).toBe(false);
    });
  });

  describe('mergeCounters', () => {
    it('should combine two counters', () => {
      const c1 = createTagCounter(['a', 'b']);
      const c2 = createTagCounter(['b', 'c']);
      const merged = mergeCounters(c1, c2);
      expect(getTagCount(merged, 'b')).toBe(2);
    });
  });

  describe('getStats', () => {
    it('should return stats object', () => {
      incrementTag(counter, 'a');
      incrementTag(counter, 'b');
      const stats = getStats(counter);
      expect(stats).toHaveProperty('total');
      expect(stats).toHaveProperty('unique');
    });
  });
});
