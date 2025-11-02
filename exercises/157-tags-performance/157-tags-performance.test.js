import { describe, it, expect, beforeEach } from 'vitest';
import { createArrayTags, createSetTags, benchmarkAdd, benchmarkSearch, benchmarkDuplicate, analyzeComplexity, findPerformanceBreakpoint, formatBenchmarkResult, generateRandomTags, compareStructures } from './157-tags-performance.js';

describe('Tags - Performance', () => {
  describe('createArrayTags', () => {
    it('should create array', () => {
      const arr = createArrayTags(['a', 'b']);
      expect(Array.isArray(arr)).toBe(true);
    });
  });

  describe('createSetTags', () => {
    it('should create Set', () => {
      const set = createSetTags(['a', 'b']);
      expect(set instanceof Set).toBe(true);
    });
    it('should remove duplicates', () => {
      const set = createSetTags(['a', 'a', 'b']);
      expect(set.size).toBe(2);
    });
  });

  describe('benchmarkAdd', () => {
    it('should return benchmark result', () => {
      const result = benchmarkAdd(false);
      expect(result).toHaveProperty('time');
      expect(result.time).toBeGreaterThanOrEqual(0);
    });
  });

  describe('benchmarkSearch', () => {
    it('should benchmark array search', () => {
      const tags = ['a', 'b', 'c'];
      const result = benchmarkSearch(tags, ['b']);
      expect(result).toHaveProperty('time');
    });
    it('should benchmark Set search', () => {
      const tags = new Set(['a', 'b', 'c']);
      const result = benchmarkSearch(tags, ['b']);
      expect(result).toHaveProperty('time');
    });
  });

  describe('benchmarkDuplicate', () => {
    it('should return timing data', () => {
      const result = benchmarkDuplicate(['a', 'a', 'b', 'b'], false);
      expect(result).toHaveProperty('time');
    });
  });

  describe('analyzeComplexity', () => {
    it('should return Big-O for add', () => {
      const complexity = analyzeComplexity('add');
      expect(typeof complexity).toBe('string');
    });
    it('should return Big-O for search', () => {
      const complexity = analyzeComplexity('search');
      expect(typeof complexity).toBe('string');
    });
  });

  describe('findPerformanceBreakpoint', () => {
    it('should return number', () => {
      const breakpoint = findPerformanceBreakpoint('search');
      expect(typeof breakpoint).toBe('number');
    });
  });

  describe('formatBenchmarkResult', () => {
    it('should format result as string', () => {
      const result = {time: 123.45, count: 1000};
      const formatted = formatBenchmarkResult(result);
      expect(typeof formatted).toBe('string');
    });
  });

  describe('generateRandomTags', () => {
    it('should generate array of tags', () => {
      const tags = generateRandomTags(10);
      expect(tags.length).toBe(10);
    });
    it('should generate different values', () => {
      const tags = generateRandomTags(100);
      const unique = new Set(tags);
      expect(unique.size).toBeGreaterThan(1);
    });
  });

  describe('compareStructures', () => {
    it('should return comparison object', () => {
      const result = compareStructures(100);
      expect(result).toHaveProperty('array');
      expect(result).toHaveProperty('set');
    });
  });
});
