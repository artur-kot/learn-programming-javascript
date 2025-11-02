import { describe, it, expect, beforeEach } from 'vitest';
import {
  combineTags,
  getCommonTags,
  getUniqueTags,
  addMultipleTags,
  removeMultipleTags,
  hasAllTags,
  hasAnyTag,
  getAllExcept,
  toggleTag,
  isSupersetOf
} from './154-tags-operations.js';

describe('Tags Set Operations', () => {
  let set1, set2;

  beforeEach(() => {
    set1 = new Set(['javascript', 'python', 'java']);
    set2 = new Set(['java', 'ruby', 'go']);
  });

  describe('combineTags', () => {
    it('should combine two sets', () => {
      const result = combineTags(set1, set2);
      expect(result.size).toBe(5);
    });

    it('should contain all unique tags', () => {
      const result = combineTags(set1, set2);
      expect(result.has('javascript')).toBe(true);
      expect(result.has('ruby')).toBe(true);
    });

    it('should not create duplicates', () => {
      const set3 = new Set(['java', 'javascript']);
      const result = combineTags(set1, set3);
      expect(result.size).toBe(3);
    });

    it('should handle empty sets', () => {
      const empty = new Set();
      const result = combineTags(set1, empty);
      expect(result.size).toBe(3);
    });

    it('should be commutative', () => {
      const r1 = combineTags(set1, set2);
      const r2 = combineTags(set2, set1);
      expect(r1.size).toBe(r2.size);
    });
  });

  describe('getCommonTags', () => {
    it('should find common tags', () => {
      const result = getCommonTags(set1, set2);
      expect(result.has('java')).toBe(true);
    });

    it('should return correct count', () => {
      const result = getCommonTags(set1, set2);
      expect(result.size).toBe(1);
    });

    it('should handle no common tags', () => {
      const set3 = new Set(['rust', 'swift']);
      const result = getCommonTags(set1, set3);
      expect(result.size).toBe(0);
    });

    it('should be commutative', () => {
      const r1 = getCommonTags(set1, set2);
      const r2 = getCommonTags(set2, set1);
      expect(r1.size).toBe(r2.size);
    });

    it('should handle identical sets', () => {
      const result = getCommonTags(set1, set1);
      expect(result.size).toBe(3);
    });
  });

  describe('getUniqueTags', () => {
    it('should find unique tags', () => {
      const result = getUniqueTags(set1, set2);
      expect(result.has('javascript')).toBe(true);
      expect(result.has('python')).toBe(true);
    });

    it('should not include common tags', () => {
      const result = getUniqueTags(set1, set2);
      expect(result.has('java')).toBe(false);
    });

    it('should return correct count', () => {
      const result = getUniqueTags(set1, set2);
      expect(result.size).toBe(2);
    });

    it('should handle no common tags', () => {
      const set3 = new Set(['rust', 'swift']);
      const result = getUniqueTags(set1, set3);
      expect(result.size).toBe(3);
    });

    it('should not be commutative', () => {
      const r1 = getUniqueTags(set1, set2);
      const r2 = getUniqueTags(set2, set1);
      expect(r1.size).not.toBe(r2.size);
    });
  });

  describe('addMultipleTags', () => {
    it('should add multiple new tags', () => {
      const tags = new Set(['javascript']);
      const added = addMultipleTags(tags, ['python', 'java']);
      expect(added).toBe(2);
      expect(tags.size).toBe(3);
    });

    it('should count only new additions', () => {
      const tags = new Set(['javascript', 'python']);
      const added = addMultipleTags(tags, ['python', 'java', 'ruby']);
      expect(added).toBe(2);
    });

    it('should handle no new tags', () => {
      const tags = new Set(['javascript']);
      const added = addMultipleTags(tags, ['javascript']);
      expect(added).toBe(0);
      expect(tags.size).toBe(1);
    });

    it('should handle empty array', () => {
      const tags = new Set(['javascript']);
      const added = addMultipleTags(tags, []);
      expect(added).toBe(0);
    });

    it('should return count of added tags', () => {
      const tags = new Set();
      const added = addMultipleTags(tags, ['a', 'b', 'c', 'd']);
      expect(added).toBe(4);
    });
  });

  describe('removeMultipleTags', () => {
    it('should remove multiple tags', () => {
      const tags = new Set(['a', 'b', 'c', 'd']);
      const removed = removeMultipleTags(tags, ['a', 'c']);
      expect(removed).toBe(2);
      expect(tags.size).toBe(2);
    });

    it('should count only actual removals', () => {
      const tags = new Set(['a', 'b', 'c']);
      const removed = removeMultipleTags(tags, ['b', 'd', 'e']);
      expect(removed).toBe(1);
    });

    it('should handle no existing tags', () => {
      const tags = new Set(['a', 'b']);
      const removed = removeMultipleTags(tags, ['x', 'y']);
      expect(removed).toBe(0);
      expect(tags.size).toBe(2);
    });

    it('should return 0 for empty array', () => {
      const tags = new Set(['a', 'b']);
      const removed = removeMultipleTags(tags, []);
      expect(removed).toBe(0);
    });

    it('should clear tags if all removed', () => {
      const tags = new Set(['a', 'b']);
      removeMultipleTags(tags, ['a', 'b']);
      expect(tags.size).toBe(0);
    });
  });

  describe('hasAllTags', () => {
    it('should return true if all exist', () => {
      const tags = new Set(['a', 'b', 'c']);
      expect(hasAllTags(tags, ['a', 'b'])).toBe(true);
    });

    it('should return false if any missing', () => {
      const tags = new Set(['a', 'b']);
      expect(hasAllTags(tags, ['a', 'c'])).toBe(false);
    });

    it('should handle single tag', () => {
      const tags = new Set(['a', 'b']);
      expect(hasAllTags(tags, ['a'])).toBe(true);
    });

    it('should handle empty check array', () => {
      const tags = new Set(['a', 'b']);
      expect(hasAllTags(tags, [])).toBe(true);
    });

    it('should handle all tags', () => {
      const tags = new Set(['a', 'b', 'c']);
      expect(hasAllTags(tags, ['a', 'b', 'c'])).toBe(true);
    });
  });

  describe('hasAnyTag', () => {
    it('should return true if any exist', () => {
      const tags = new Set(['a', 'b', 'c']);
      expect(hasAnyTag(tags, ['x', 'a', 'y'])).toBe(true);
    });

    it('should return false if none exist', () => {
      const tags = new Set(['a', 'b']);
      expect(hasAnyTag(tags, ['x', 'y', 'z'])).toBe(false);
    });

    it('should handle single tag', () => {
      const tags = new Set(['a', 'b']);
      expect(hasAnyTag(tags, ['a'])).toBe(true);
    });

    it('should return false for empty array', () => {
      const tags = new Set(['a', 'b']);
      expect(hasAnyTag(tags, [])).toBe(false);
    });

    it('should return true if one matches', () => {
      const tags = new Set(['a']);
      expect(hasAnyTag(tags, ['b', 'c', 'a', 'd'])).toBe(true);
    });
  });

  describe('getAllExcept', () => {
    it('should exclude specified tags', () => {
      const tags = new Set(['a', 'b', 'c', 'd']);
      const result = getAllExcept(tags, ['b', 'd']);
      expect(result).toContain('a');
      expect(result).toContain('c');
      expect(result).not.toContain('b');
    });

    it('should return sorted array', () => {
      const tags = new Set(['z', 'a', 'm']);
      const result = getAllExcept(tags, []);
      expect(result).toEqual(['a', 'm', 'z']);
    });

    it('should handle empty exclusion', () => {
      const tags = new Set(['a', 'b']);
      const result = getAllExcept(tags, []);
      expect(result.length).toBe(2);
    });

    it('should return empty if all excluded', () => {
      const tags = new Set(['a', 'b']);
      const result = getAllExcept(tags, ['a', 'b']);
      expect(result.length).toBe(0);
    });

    it('should ignore non-existent exclusions', () => {
      const tags = new Set(['a', 'b']);
      const result = getAllExcept(tags, ['c', 'd']);
      expect(result.length).toBe(2);
    });
  });

  describe('toggleTag', () => {
    it('should add tag if missing', () => {
      const tags = new Set(['a']);
      const result = toggleTag(tags, 'b');
      expect(result).toBe(true);
      expect(tags.has('b')).toBe(true);
    });

    it('should remove tag if exists', () => {
      const tags = new Set(['a', 'b']);
      const result = toggleTag(tags, 'b');
      expect(result).toBe(false);
      expect(tags.has('b')).toBe(false);
    });

    it('should toggle correctly multiple times', () => {
      const tags = new Set();
      expect(toggleTag(tags, 'a')).toBe(true);
      expect(toggleTag(tags, 'a')).toBe(false);
      expect(toggleTag(tags, 'a')).toBe(true);
    });

    it('should add to empty set', () => {
      const tags = new Set();
      const result = toggleTag(tags, 'x');
      expect(result).toBe(true);
      expect(tags.size).toBe(1);
    });

    it('should maintain other tags', () => {
      const tags = new Set(['a', 'b', 'c']);
      toggleTag(tags, 'b');
      expect(tags.has('a')).toBe(true);
      expect(tags.has('c')).toBe(true);
      expect(tags.size).toBe(2);
    });
  });

  describe('isSupersetOf', () => {
    it('should return true if superset', () => {
      const tags = new Set(['a', 'b', 'c']);
      const subset = new Set(['a', 'b']);
      expect(isSupersetOf(tags, subset)).toBe(true);
    });

    it('should return false if not superset', () => {
      const tags = new Set(['a', 'b']);
      const subset = new Set(['a', 'b', 'c']);
      expect(isSupersetOf(tags, subset)).toBe(false);
    });

    it('should handle identical sets', () => {
      const tags = new Set(['a', 'b']);
      expect(isSupersetOf(tags, tags)).toBe(true);
    });

    it('should return true for empty subset', () => {
      const tags = new Set(['a', 'b']);
      const empty = new Set();
      expect(isSupersetOf(tags, empty)).toBe(true);
    });

    it('should return false for empty superset', () => {
      const tags = new Set();
      const subset = new Set(['a']);
      expect(isSupersetOf(tags, subset)).toBe(false);
    });
  });

  describe('Integration Tests', () => {
    it('should combine and find common', () => {
      const combined = combineTags(set1, set2);
      const common = getCommonTags(set1, set2);
      expect(combined.size).toBeGreaterThan(common.size);
    });

    it('should add and remove correctly', () => {
      const tags = new Set(['a']);
      addMultipleTags(tags, ['b', 'c']);
      expect(tags.size).toBe(3);
      removeMultipleTags(tags, ['a', 'b']);
      expect(tags.size).toBe(1);
    });

    it('should check all and any', () => {
      const tags = new Set(['a', 'b', 'c']);
      expect(hasAllTags(tags, ['a', 'b'])).toBe(true);
      expect(hasAnyTag(tags, ['x', 'a'])).toBe(true);
      expect(hasAllTags(tags, ['a', 'x'])).toBe(false);
    });

    it('should toggle and check', () => {
      const tags = new Set(['a', 'b']);
      toggleTag(tags, 'c');
      expect(hasAllTags(tags, ['a', 'b', 'c'])).toBe(true);
      toggleTag(tags, 'c');
      expect(hasAllTags(tags, ['a', 'b', 'c'])).toBe(false);
    });

    it('should exclude and filter', () => {
      const tags = new Set(['a', 'b', 'c', 'd']);
      const filtered = getAllExcept(tags, ['a', 'b']);
      expect(filtered).toEqual(['c', 'd']);
      expect(hasAllTags(tags, filtered)).toBe(true);
    });
  });
});
