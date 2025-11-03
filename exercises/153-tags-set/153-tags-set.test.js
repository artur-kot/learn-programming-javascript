import { describe, it, expect, beforeEach } from 'vitest';
import {
  createTagSet,
  addTag,
  hasTag,
  removeTag,
  getAllTags,
  getTagCount,
  clearAllTags,
  filterTags,
  normalizeTag,
  getTagStats
} from './153-tags-set.js';

describe('Tags Set Basics', () => {
  let tags;

  beforeEach(() => {
    tags = createTagSet();
  });

  describe('createTagSet', () => {
    it('should create empty set', () => {
      const emptyTags = createTagSet();
      expect(getTagCount(emptyTags)).toBe(0);
    });

    it('should create set with initial tags', () => {
      const initialTags = createTagSet(['javascript', 'python']);
      expect(getTagCount(initialTags)).toBe(2);
    });

    it('should remove duplicates from initial tags', () => {
      const initialTags = createTagSet(['javascript', 'javascript', 'python']);
      expect(getTagCount(initialTags)).toBe(2);
    });

    it('should normalize initial tags', () => {
      const initialTags = createTagSet(['JavaScript', 'PYTHON']);
      expect(hasTag(initialTags, 'javascript')).toBe(true);
      expect(hasTag(initialTags, 'python')).toBe(true);
    });

    it('should return Set instance', () => {
      expect(tags instanceof Set).toBe(true);
    });
  });

  describe('addTag', () => {
    it('should add new tag and return true', () => {
      const result = addTag(tags, 'javascript');
      expect(result).toBe(true);
      expect(hasTag(tags, 'javascript')).toBe(true);
    });

    it('should not add duplicate and return false', () => {
      addTag(tags, 'javascript');
      const result = addTag(tags, 'javascript');
      expect(result).toBe(false);
      expect(getTagCount(tags)).toBe(1);
    });

    it('should normalize tag before adding', () => {
      addTag(tags, 'JavaScript');
      expect(hasTag(tags, 'javascript')).toBe(true);
    });

    it('should add multiple unique tags', () => {
      addTag(tags, 'javascript');
      addTag(tags, 'python');
      addTag(tags, 'ruby');
      expect(getTagCount(tags)).toBe(3);
    });

    it('should trim whitespace', () => {
      addTag(tags, '  javascript  ');
      expect(hasTag(tags, 'javascript')).toBe(true);
      expect(getTagCount(tags)).toBe(1);
    });

    it('should handle case-insensitive duplicates', () => {
      addTag(tags, 'JavaScript');
      const result = addTag(tags, 'JAVASCRIPT');
      expect(result).toBe(false);
    });
  });

  describe('hasTag', () => {
    it('should return true for existing tag', () => {
      addTag(tags, 'javascript');
      expect(hasTag(tags, 'javascript')).toBe(true);
    });

    it('should return false for non-existing tag', () => {
      expect(hasTag(tags, 'javascript')).toBe(false);
    });

    it('should be case-insensitive', () => {
      addTag(tags, 'javascript');
      expect(hasTag(tags, 'JavaScript')).toBe(true);
      expect(hasTag(tags, 'JAVASCRIPT')).toBe(true);
    });

    it('should ignore whitespace', () => {
      addTag(tags, 'javascript');
      expect(hasTag(tags, '  javascript  ')).toBe(true);
    });

    it('should handle empty set', () => {
      expect(hasTag(tags, 'anything')).toBe(false);
    });
  });

  describe('removeTag', () => {
    it('should remove existing tag and return true', () => {
      addTag(tags, 'javascript');
      const result = removeTag(tags, 'javascript');
      expect(result).toBe(true);
      expect(hasTag(tags, 'javascript')).toBe(false);
    });

    it('should not remove non-existing tag and return false', () => {
      const result = removeTag(tags, 'javascript');
      expect(result).toBe(false);
    });

    it('should be case-insensitive', () => {
      addTag(tags, 'javascript');
      const result = removeTag(tags, 'JAVASCRIPT');
      expect(result).toBe(true);
      expect(getTagCount(tags)).toBe(0);
    });

    it('should remove multiple tags', () => {
      addTag(tags, 'javascript');
      addTag(tags, 'python');
      addTag(tags, 'ruby');
      removeTag(tags, 'javascript');
      removeTag(tags, 'python');
      expect(getTagCount(tags)).toBe(1);
      expect(hasTag(tags, 'ruby')).toBe(true);
    });

    it('should handle whitespace in removal', () => {
      addTag(tags, 'javascript');
      const result = removeTag(tags, '  javascript  ');
      expect(result).toBe(true);
    });
  });

  describe('getAllTags', () => {
    it('should return empty array for empty set', () => {
      expect(getAllTags(tags)).toEqual([]);
    });

    it('should return all tags as array', () => {
      addTag(tags, 'javascript');
      addTag(tags, 'python');
      const result = getAllTags(tags);
      expect(result).toContain('javascript');
      expect(result).toContain('python');
      expect(result.length).toBe(2);
    });

    it('should return sorted alphabetically', () => {
      addTag(tags, 'zebra');
      addTag(tags, 'apple');
      addTag(tags, 'banana');
      const result = getAllTags(tags);
      expect(result).toEqual(['apple', 'banana', 'zebra']);
    });

    it('should not return duplicates', () => {
      addTag(tags, 'javascript');
      addTag(tags, 'javascript');
      const result = getAllTags(tags);
      expect(result.length).toBe(1);
    });
  });

  describe('getTagCount', () => {
    it('should return 0 for empty set', () => {
      expect(getTagCount(tags)).toBe(0);
    });

    it('should return correct count', () => {
      addTag(tags, 'javascript');
      addTag(tags, 'python');
      expect(getTagCount(tags)).toBe(2);
    });

    it('should not count duplicates', () => {
      addTag(tags, 'javascript');
      addTag(tags, 'javascript');
      expect(getTagCount(tags)).toBe(1);
    });

    it('should update after removal', () => {
      addTag(tags, 'javascript');
      addTag(tags, 'python');
      removeTag(tags, 'javascript');
      expect(getTagCount(tags)).toBe(1);
    });
  });

  describe('clearAllTags', () => {
    it('should clear all tags', () => {
      addTag(tags, 'javascript');
      addTag(tags, 'python');
      clearAllTags(tags);
      expect(getTagCount(tags)).toBe(0);
    });

    it('should return true if had tags', () => {
      addTag(tags, 'javascript');
      const result = clearAllTags(tags);
      expect(result).toBe(true);
    });

    it('should return false if already empty', () => {
      const result = clearAllTags(tags);
      expect(result).toBe(false);
    });

    it('should return false on second clear', () => {
      addTag(tags, 'javascript');
      clearAllTags(tags);
      const result = clearAllTags(tags);
      expect(result).toBe(false);
    });

    it('should make hasTag return false', () => {
      addTag(tags, 'javascript');
      clearAllTags(tags);
      expect(hasTag(tags, 'javascript')).toBe(false);
    });
  });

  describe('filterTags', () => {
    beforeEach(() => {
      addTag(tags, 'javascript');
      addTag(tags, 'java');
      addTag(tags, 'python');
      addTag(tags, 'typescript');
    });

    it('should return tags containing search term', () => {
      const result = filterTags(tags, 'java');
      expect(result).toContain('javascript');
      expect(result).toContain('java');
      expect(result.length).toBe(2);
    });

    it('should be case-insensitive', () => {
      const result = filterTags(tags, 'JAVA');
      expect(result).toContain('javascript');
      expect(result).toContain('java');
    });

    it('should return empty array if no matches', () => {
      const result = filterTags(tags, 'ruby');
      expect(result).toEqual([]);
    });

    it('should return sorted results', () => {
      const result = filterTags(tags, 'java');
      expect(result).toEqual(['java', 'javascript']);
    });

    it('should handle partial matches', () => {
      const result = filterTags(tags, 'script');
      expect(result).toContain('javascript');
      expect(result).toContain('typescript');
    });

    it('should return all tags if search is empty', () => {
      const result = filterTags(tags, '');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('normalizeTag', () => {
    it('should convert to lowercase', () => {
      expect(normalizeTag('JavaScript')).toBe('javascript');
    });

    it('should trim whitespace', () => {
      expect(normalizeTag('  javascript  ')).toBe('javascript');
    });

    it('should remove special characters', () => {
      expect(normalizeTag('web-dev!')).toBe('web-dev');
    });

    it('should handle multiple spaces', () => {
      expect(normalizeTag('   Java   Script   ')).toBe('java script');
    });

    it('should preserve hyphens and underscores', () => {
      expect(normalizeTag('Web-Dev_Tools')).toBe('web-dev_tools');
    });

    it('should handle numbers', () => {
      expect(normalizeTag('JavaScript123')).toBe('javascript123');
    });

    it('should handle empty string', () => {
      expect(normalizeTag('')).toBe('');
    });
  });

  describe('getTagStats', () => {
    it('should return object with required properties', () => {
      const stats = getTagStats(tags);
      expect(stats).toHaveProperty('count');
      expect(stats).toHaveProperty('isEmpty');
      expect(stats).toHaveProperty('tags');
    });

    it('should show count 0 and isEmpty true for empty set', () => {
      const stats = getTagStats(tags);
      expect(stats.count).toBe(0);
      expect(stats.isEmpty).toBe(true);
    });

    it('should show correct count and isEmpty false with tags', () => {
      addTag(tags, 'javascript');
      addTag(tags, 'python');
      const stats = getTagStats(tags);
      expect(stats.count).toBe(2);
      expect(stats.isEmpty).toBe(false);
    });

    it('should include all tags in stats array', () => {
      addTag(tags, 'javascript');
      addTag(tags, 'python');
      const stats = getTagStats(tags);
      expect(stats.tags).toContain('javascript');
      expect(stats.tags).toContain('python');
      expect(stats.tags.length).toBe(2);
    });

    it('should return sorted tags array', () => {
      addTag(tags, 'zebra');
      addTag(tags, 'apple');
      const stats = getTagStats(tags);
      expect(stats.tags).toEqual(['apple', 'zebra']);
    });

    it('should update after adding tags', () => {
      addTag(tags, 'javascript');
      let stats = getTagStats(tags);
      expect(stats.count).toBe(1);
      addTag(tags, 'python');
      stats = getTagStats(tags);
      expect(stats.count).toBe(2);
    });
  });

  describe('Integration Tests', () => {
    it('should manage complete workflow', () => {
      expect(getTagCount(tags)).toBe(0);
      
      addTag(tags, 'javascript');
      addTag(tags, 'python');
      addTag(tags, 'ruby');
      expect(getTagCount(tags)).toBe(3);
      
      expect(hasTag(tags, 'javascript')).toBe(true);
      
      removeTag(tags, 'python');
      expect(getTagCount(tags)).toBe(2);
      
      const all = getAllTags(tags);
      expect(all).toContain('javascript');
      expect(all).toContain('ruby');
    });

    it('should handle case-insensitive operations', () => {
      addTag(tags, 'JavaScript');
      expect(hasTag(tags, 'javascript')).toBe(true);
      expect(hasTag(tags, 'JAVASCRIPT')).toBe(true);
      
      removeTag(tags, 'jAvAsCrIpT');
      expect(hasTag(tags, 'javascript')).toBe(false);
    });

    it('should filter and search correctly', () => {
      addTag(tags, 'javascript');
      addTag(tags, 'java');
      addTag(tags, 'python');
      addTag(tags, 'typescript');
      
      const javaRelated = filterTags(tags, 'java');
      expect(javaRelated.length).toBe(3);
    });

    it('should maintain set integrity', () => {
      for (let i = 0; i < 5; i++) {
        addTag(tags, 'test');
      }
      expect(getTagCount(tags)).toBe(1);
    });

    it('should clear and restart', () => {
      addTag(tags, 'javascript');
      addTag(tags, 'python');
      clearAllTags(tags);
      
      addTag(tags, 'ruby');
      expect(getTagCount(tags)).toBe(1);
      expect(hasTag(tags, 'javascript')).toBe(false);
    });
  });
});
