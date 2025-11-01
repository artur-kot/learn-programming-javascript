import { describe, it, expect, beforeEach } from 'vitest';
import { createCategorySystem, addCategory, addTagToCategory, removeTagFromCategory, getCategoryTags, getTagCategories, mergeCategoriesFor, removeCategory, getSystemStats, renameCategory } from './158-tags-categories.js';

describe('Tags - Categories', () => {
  let system;
  beforeEach(() => { system = createCategorySystem(); });

  describe('createCategorySystem', () => {
    it('should create empty system', () => {
      expect(system instanceof Map).toBe(true);
    });
    it('should create with initial categories', () => {
      const sys = createCategorySystem({ 'front': ['js', 'css'], 'back': ['python'] });
      expect(sys.size).toBeGreaterThan(0);
    });
  });

  describe('addCategory', () => {
    it('should add new category', () => {
      addCategory(system, 'backend');
      expect(system.has('backend')).toBe(true);
    });
    it('should return false for duplicate', () => {
      addCategory(system, 'backend');
      const result = addCategory(system, 'backend');
      expect(result).toBe(false);
    });
  });

  describe('addTagToCategory', () => {
    it('should add tag to category', () => {
      addCategory(system, 'web');
      const result = addTagToCategory(system, 'web', 'javascript');
      expect(result).toBe(true);
    });
    it('should handle non-existing category', () => {
      const result = addTagToCategory(system, 'web', 'javascript');
      expect(result).toBe(false);
    });
  });

  describe('removeTagFromCategory', () => {
    it('should remove tag from category', () => {
      addCategory(system, 'web');
      addTagToCategory(system, 'web', 'javascript');
      const result = removeTagFromCategory(system, 'web', 'javascript');
      expect(result).toBe(true);
    });
    it('should return false if tag not in category', () => {
      addCategory(system, 'web');
      const result = removeTagFromCategory(system, 'web', 'python');
      expect(result).toBe(false);
    });
  });

  describe('getCategoryTags', () => {
    it('should get all tags in category', () => {
      addCategory(system, 'web');
      addTagToCategory(system, 'web', 'javascript');
      addTagToCategory(system, 'web', 'css');
      const tags = getCategoryTags(system, 'web');
      expect(tags).toContain('javascript');
      expect(tags).toContain('css');
    });
    it('should return sorted array', () => {
      addCategory(system, 'web');
      addTagToCategory(system, 'web', 'z');
      addTagToCategory(system, 'web', 'a');
      const tags = getCategoryTags(system, 'web');
      expect(tags).toEqual(['a', 'z']);
    });
  });

  describe('getTagCategories', () => {
    it('should find categories with tag', () => {
      addCategory(system, 'web');
      addCategory(system, 'mobile');
      addTagToCategory(system, 'web', 'javascript');
      addTagToCategory(system, 'mobile', 'javascript');
      const cats = getTagCategories(system, 'javascript');
      expect(cats).toContain('web');
      expect(cats).toContain('mobile');
    });
    it('should return empty for missing tag', () => {
      const cats = getTagCategories(system, 'missing');
      expect(cats.length).toBe(0);
    });
  });

  describe('mergeCategoriesFor', () => {
    it('should combine multiple categories', () => {
      addCategory(system, 'frontend');
      addCategory(system, 'backend');
      addTagToCategory(system, 'frontend', 'javascript');
      addTagToCategory(system, 'backend', 'python');
      const merged = mergeCategoriesFor(system, ['frontend', 'backend']);
      expect(merged.size).toBe(2);
    });
  });

  describe('removeCategory', () => {
    it('should delete category', () => {
      addCategory(system, 'web');
      const result = removeCategory(system, 'web');
      expect(result).toBe(true);
      expect(system.has('web')).toBe(false);
    });
    it('should return false if not exists', () => {
      const result = removeCategory(system, 'web');
      expect(result).toBe(false);
    });
  });

  describe('getSystemStats', () => {
    it('should return stats object', () => {
      addCategory(system, 'web');
      const stats = getSystemStats(system);
      expect(stats).toHaveProperty('totalCategories');
      expect(stats).toHaveProperty('totalTags');
    });
  });

  describe('renameCategory', () => {
    it('should rename category', () => {
      addCategory(system, 'old');
      const result = renameCategory(system, 'old', 'new');
      expect(result).toBe(true);
      expect(system.has('new')).toBe(true);
    });
    it('should return false if category not exists', () => {
      const result = renameCategory(system, 'old', 'new');
      expect(result).toBe(false);
    });
  });
});
