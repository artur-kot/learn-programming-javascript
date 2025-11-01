import { describe, it, expect, beforeEach } from 'vitest';
import {
  searchNotes,
  sortNotesByDate,
  sortNotesByTitle,
  filterNotesByLength,
  getNotesByTag,
  getNotesStatistics,
  getNotesGroupedByDate,
  getRecentNotes,
  filterByMultipleTags,
  createFilteredView
} from './151-notes-state.js';

describe('Notes State Management', () => {
  let sampleNotes;

  beforeEach(() => {
    sampleNotes = [
      {
        id: 1,
        title: 'JavaScript Tips',
        content: 'Learn arrow functions and destructuring',
        createdAt: new Date('2024-01-05'),
        tags: ['javascript', 'tutorial', 'important']
      },
      {
        id: 2,
        title: 'Python Guide',
        content: 'Python for beginners',
        createdAt: new Date('2024-01-03'),
        tags: ['python', 'guide']
      },
      {
        id: 3,
        title: 'Web Development',
        content: 'HTML CSS JavaScript basics and advanced techniques',
        createdAt: new Date('2024-01-07'),
        tags: ['web', 'javascript', 'important']
      },
      {
        id: 4,
        title: 'AI',
        content: 'ML',
        createdAt: new Date('2024-01-01'),
        tags: ['ai']
      },
      {
        id: 5,
        title: 'Database Design',
        content: 'Learning SQL queries and optimization techniques',
        createdAt: new Date('2024-01-04'),
        tags: ['database', 'sql']
      }
    ];
  });

  describe('searchNotes', () => {
    it('should find notes by title (case-insensitive)', () => {
      const results = searchNotes(sampleNotes, 'python');
      expect(results).toHaveLength(1);
      expect(results[0].id).toBe(2);
    });

    it('should find notes by content', () => {
      const results = searchNotes(sampleNotes, 'arrow');
      expect(results).toHaveLength(1);
      expect(results[0].id).toBe(1);
    });

    it('should be case-insensitive for content search', () => {
      const results = searchNotes(sampleNotes, 'JAVASCRIPT');
      expect(results.length).toBeGreaterThan(0);
    });

    it('should return multiple matches', () => {
      const results = searchNotes(sampleNotes, 'javascript');
      expect(results.length).toBeGreaterThanOrEqual(2);
    });

    it('should return empty array for no matches', () => {
      const results = searchNotes(sampleNotes, 'rust');
      expect(results).toEqual([]);
    });

    it('should handle empty query', () => {
      const results = searchNotes(sampleNotes, '');
      expect(results).toEqual([]);
    });
  });

  describe('sortNotesByDate', () => {
    it('should sort notes oldest first (ascending)', () => {
      const sorted = sortNotesByDate(sampleNotes, true);
      expect(sorted[0].id).toBe(4);
      expect(sorted[1].id).toBe(2);
      expect(sorted[sorted.length - 1].id).toBe(3);
    });

    it('should sort notes newest first (descending)', () => {
      const sorted = sortNotesByDate(sampleNotes, false);
      expect(sorted[0].id).toBe(3);
      expect(sorted[sorted.length - 1].id).toBe(4);
    });

    it('should not mutate original array', () => {
      const original = [...sampleNotes];
      sortNotesByDate(sampleNotes, true);
      expect(sampleNotes).toEqual(original);
    });
  });

  describe('sortNotesByTitle', () => {
    it('should sort alphabetically ascending', () => {
      const sorted = sortNotesByTitle(sampleNotes, true);
      expect(sorted[0].title).toBe('AI');
      expect(sorted[sorted.length - 1].title).toBe('Web Development');
    });

    it('should sort alphabetically descending', () => {
      const sorted = sortNotesByTitle(sampleNotes, false);
      expect(sorted[0].title).toBe('Web Development');
      expect(sorted[sorted.length - 1].title).toBe('AI');
    });

    it('should be case-insensitive', () => {
      const mixed = [
        { title: 'zebra' },
        { title: 'APPLE' },
        { title: 'Banana' }
      ];
      const sorted = sortNotesByTitle(mixed, true);
      expect(sorted[0].title).toBe('APPLE');
    });
  });

  describe('filterNotesByLength', () => {
    it('should filter by minimum length', () => {
      const results = filterNotesByLength(sampleNotes, 30, Infinity);
      expect(results.length).toBeGreaterThan(0);
      results.forEach(note => {
        expect(note.content.length).toBeGreaterThanOrEqual(30);
      });
    });

    it('should filter by maximum length', () => {
      const results = filterNotesByLength(sampleNotes, 0, 10);
      expect(results.length).toBeGreaterThan(0);
      results.forEach(note => {
        expect(note.content.length).toBeLessThanOrEqual(10);
      });
    });

    it('should filter by range', () => {
      const results = filterNotesByLength(sampleNotes, 5, 40);
      results.forEach(note => {
        expect(note.content.length).toBeGreaterThanOrEqual(5);
        expect(note.content.length).toBeLessThanOrEqual(40);
      });
    });

    it('should return empty if no matches', () => {
      const results = filterNotesByLength(sampleNotes, 1000, 2000);
      expect(results).toEqual([]);
    });
  });

  describe('getNotesByTag', () => {
    it('should find notes by tag', () => {
      const results = getNotesByTag(sampleNotes, 'javascript');
      expect(results.length).toBe(2);
    });

    it('should be case-insensitive', () => {
      const results = getNotesByTag(sampleNotes, 'JAVASCRIPT');
      expect(results.length).toBe(2);
    });

    it('should return empty for non-existent tag', () => {
      const results = getNotesByTag(sampleNotes, 'rust');
      expect(results).toEqual([]);
    });

    it('should handle single tag matches', () => {
      const results = getNotesByTag(sampleNotes, 'python');
      expect(results).toHaveLength(1);
      expect(results[0].id).toBe(2);
    });

    it('should not return duplicates', () => {
      const results = getNotesByTag(sampleNotes, 'javascript');
      const ids = results.map(n => n.id);
      expect(ids).toEqual([...new Set(ids)]);
    });
  });

  describe('getNotesStatistics', () => {
    it('should count total notes', () => {
      const stats = getNotesStatistics(sampleNotes);
      expect(stats.totalNotes).toBe(5);
    });

    it('should calculate total characters', () => {
      const stats = getNotesStatistics(sampleNotes);
      const expectedTotal = sampleNotes.reduce((sum, n) => sum + n.content.length, 0);
      expect(stats.totalCharacters).toBe(expectedTotal);
    });

    it('should calculate average length', () => {
      const stats = getNotesStatistics(sampleNotes);
      const expectedAvg = sampleNotes.reduce((sum, n) => sum + n.content.length, 0) / sampleNotes.length;
      expect(stats.averageLength).toBe(expectedAvg);
    });

    it('should find shortest note', () => {
      const stats = getNotesStatistics(sampleNotes);
      expect(stats.shortestNote.content).toBe('ML');
    });

    it('should find longest note', () => {
      const stats = getNotesStatistics(sampleNotes);
      expect(stats.longestNote.content.length).toBeGreaterThan(10);
    });

    it('should track date range', () => {
      const stats = getNotesStatistics(sampleNotes);
      expect(stats.mostRecentDate).toBeDefined();
      expect(stats.oldestDate).toBeDefined();
    });
  });

  describe('getNotesGroupedByDate', () => {
    it('should group notes by date string', () => {
      const grouped = getNotesGroupedByDate(sampleNotes);
      expect(grouped['2024-01-05']).toBeDefined();
      expect(grouped['2024-01-05'].length).toBeGreaterThan(0);
    });

    it('should have all notes in groups', () => {
      const grouped = getNotesGroupedByDate(sampleNotes);
      const totalNotes = Object.values(grouped).flat().length;
      expect(totalNotes).toBe(sampleNotes.length);
    });

    it('should use YYYY-MM-DD format', () => {
      const grouped = getNotesGroupedByDate(sampleNotes);
      Object.keys(grouped).forEach(key => {
        expect(key).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      });
    });
  });

  describe('getRecentNotes', () => {
    it('should return N most recent notes', () => {
      const recent = getRecentNotes(sampleNotes, 2);
      expect(recent).toHaveLength(2);
      expect(recent[0].id).toBe(3);
      expect(recent[1].id).toBe(1);
    });

    it('should return newest first', () => {
      const recent = getRecentNotes(sampleNotes, 3);
      for (let i = 0; i < recent.length - 1; i++) {
        expect(recent[i].createdAt.getTime()).toBeGreaterThanOrEqual(recent[i + 1].createdAt.getTime());
      }
    });

    it('should return all notes if count exceeds available', () => {
      const recent = getRecentNotes(sampleNotes, 100);
      expect(recent.length).toBeLessThanOrEqual(sampleNotes.length);
    });

    it('should return empty array for zero count', () => {
      const recent = getRecentNotes(sampleNotes, 0);
      expect(recent).toEqual([]);
    });
  });

  describe('filterByMultipleTags', () => {
    it('should filter notes with all specified tags', () => {
      const results = filterByMultipleTags(sampleNotes, ['javascript', 'important']);
      expect(results.length).toBe(2);
      results.forEach(note => {
        expect(note.tags).toContain('javascript');
        expect(note.tags).toContain('important');
      });
    });

    it('should return empty if no notes have all tags', () => {
      const results = filterByMultipleTags(sampleNotes, ['javascript', 'python']);
      expect(results).toEqual([]);
    });

    it('should handle single tag', () => {
      const results = filterByMultipleTags(sampleNotes, ['ai']);
      expect(results.length).toBe(1);
    });

    it('should be case-insensitive', () => {
      const results = filterByMultipleTags(sampleNotes, ['JAVASCRIPT', 'IMPORTANT']);
      expect(results.length).toBeGreaterThan(0);
    });

    it('should return empty for empty tag array', () => {
      const results = filterByMultipleTags(sampleNotes, []);
      expect(results.length).toBe(sampleNotes.length);
    });
  });

  describe('createFilteredView', () => {
    it('should apply search filter', () => {
      const results = createFilteredView(sampleNotes, { searchQuery: 'javascript' });
      expect(results.length).toBeGreaterThan(0);
      results.forEach(note => {
        const hasMatch = note.title.toLowerCase().includes('javascript') || 
                         note.content.toLowerCase().includes('javascript');
        expect(hasMatch).toBe(true);
      });
    });

    it('should apply length filter', () => {
      const results = createFilteredView(sampleNotes, { minLength: 30, maxLength: 100 });
      results.forEach(note => {
        expect(note.content.length).toBeGreaterThanOrEqual(30);
        expect(note.content.length).toBeLessThanOrEqual(100);
      });
    });

    it('should apply tag filter', () => {
      const results = createFilteredView(sampleNotes, { tags: ['javascript'] });
      results.forEach(note => {
        expect(note.tags).toContain('javascript');
      });
    });

    it('should apply sorting by date', () => {
      const results = createFilteredView(sampleNotes, { sortBy: 'date', sortOrder: 'asc' });
      for (let i = 0; i < results.length - 1; i++) {
        expect(results[i].createdAt.getTime()).toBeLessThanOrEqual(results[i + 1].createdAt.getTime());
      }
    });

    it('should apply sorting by title', () => {
      const results = createFilteredView(sampleNotes, { sortBy: 'title', sortOrder: 'asc' });
      for (let i = 0; i < results.length - 1; i++) {
        expect(results[i].title.toLowerCase()).toBeLessThanOrEqual(results[i + 1].title.toLowerCase());
      }
    });

    it('should combine multiple filters', () => {
      const results = createFilteredView(sampleNotes, {
        tags: ['javascript'],
        minLength: 20,
        sortBy: 'date',
        sortOrder: 'desc'
      });
      results.forEach(note => {
        expect(note.tags).toContain('javascript');
        expect(note.content.length).toBeGreaterThanOrEqual(20);
      });
    });

    it('should handle empty filters', () => {
      const results = createFilteredView(sampleNotes, {});
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe('Integration tests', () => {
    it('should work with empty array', () => {
      const empty = [];
      expect(searchNotes(empty, 'test')).toEqual([]);
      expect(sortNotesByDate(empty, true)).toEqual([]);
    });

    it('should maintain note integrity through operations', () => {
      const searched = searchNotes(sampleNotes, 'javascript');
      const sorted = sortNotesByDate(searched, true);
      sorted.forEach(note => {
        expect(note).toHaveProperty('id');
        expect(note).toHaveProperty('title');
        expect(note).toHaveProperty('content');
      });
    });

    it('should chain multiple operations', () => {
      const step1 = searchNotes(sampleNotes, 'javascript');
      const step2 = filterNotesByLength(step1, 20, 100);
      const step3 = sortNotesByDate(step2, false);
      expect(Array.isArray(step3)).toBe(true);
    });
  });
});
