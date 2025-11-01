import { describe, it, expect, beforeEach } from 'vitest';
import {
  updateNote,
  updateNoteInList,
  updateNoteTitle,
  updateNoteContent,
  addTagToNote,
  removeTagFromNote,
  replaceTagInNote,
  updateNotesInList,
  validateNoteUpdate,
  mergeNotes
} from './152-notes-edit.js';

describe('Notes Edit & Update', () => {
  let baseNote;
  let notesList;

  beforeEach(() => {
    baseNote = {
      id: 1,
      title: 'Test Note',
      content: 'Original content',
      tags: ['javascript', 'tutorial'],
      createdAt: new Date('2024-01-01'),
      modifiedAt: new Date('2024-01-01')
    };

    notesList = [
      { id: 1, title: 'First', content: 'First content', tags: ['work'] },
      { id: 2, title: 'Second', content: 'Second content', tags: ['personal'] },
      { id: 3, title: 'Third', content: 'Third content', tags: ['work'] }
    ];
  });

  describe('updateNote', () => {
    it('should update a single property', () => {
      const updated = updateNote(baseNote, { title: 'New Title' });
      expect(updated.title).toBe('New Title');
      expect(updated.content).toBe('Original content');
      expect(updated.id).toBe(1);
    });

    it('should update multiple properties', () => {
      const updated = updateNote(baseNote, {
        title: 'New Title',
        content: 'New content'
      });
      expect(updated.title).toBe('New Title');
      expect(updated.content).toBe('New content');
    });

    it('should not mutate original note', () => {
      const original = { ...baseNote };
      updateNote(baseNote, { title: 'Changed' });
      expect(baseNote).toEqual(original);
    });

    it('should update modifiedAt timestamp', () => {
      const now = new Date();
      const updated = updateNote(baseNote, { title: 'New' });
      expect(updated.modifiedAt).toBeDefined();
      expect(updated.modifiedAt.getTime()).toBeGreaterThanOrEqual(now.getTime());
    });

    it('should handle empty updates', () => {
      const updated = updateNote(baseNote, {});
      expect(updated.id).toBe(baseNote.id);
      expect(updated.title).toBe(baseNote.title);
    });

    it('should preserve all original properties', () => {
      const updated = updateNote(baseNote, { title: 'Changed' });
      expect(updated).toHaveProperty('id');
      expect(updated).toHaveProperty('content');
      expect(updated).toHaveProperty('tags');
      expect(updated).toHaveProperty('createdAt');
    });
  });

  describe('updateNoteInList', () => {
    it('should update a note by ID', () => {
      const updated = updateNoteInList(notesList, 1, { title: 'Updated' });
      expect(updated[0].title).toBe('Updated');
    });

    it('should not modify other notes', () => {
      const updated = updateNoteInList(notesList, 1, { title: 'Updated' });
      expect(updated[1].title).toBe('Second');
      expect(updated[2].title).toBe('Third');
    });

    it('should not mutate original array', () => {
      const original = JSON.stringify(notesList);
      updateNoteInList(notesList, 1, { title: 'Updated' });
      expect(JSON.stringify(notesList)).toBe(original);
    });

    it('should handle non-existent ID', () => {
      const updated = updateNoteInList(notesList, 999, { title: 'Updated' });
      expect(updated).toEqual(notesList);
    });

    it('should return new array instance', () => {
      const updated = updateNoteInList(notesList, 1, { title: 'Updated' });
      expect(updated).not.toBe(notesList);
    });

    it('should update multiple updates', () => {
      const updated = updateNoteInList(notesList, 2, {
        title: 'New Title',
        content: 'New content'
      });
      expect(updated[1].title).toBe('New Title');
      expect(updated[1].content).toBe('New content');
    });
  });

  describe('updateNoteTitle', () => {
    it('should update only the title', () => {
      const updated = updateNoteTitle(baseNote, 'New Title');
      expect(updated.title).toBe('New Title');
      expect(updated.content).toBe('Original content');
    });

    it('should update modifiedAt', () => {
      const before = baseNote.modifiedAt.getTime();
      const updated = updateNoteTitle(baseNote, 'New');
      expect(updated.modifiedAt.getTime()).toBeGreaterThanOrEqual(before);
    });

    it('should not mutate original', () => {
      const original = { ...baseNote };
      updateNoteTitle(baseNote, 'Changed');
      expect(baseNote).toEqual(original);
    });

    it('should handle empty title', () => {
      const updated = updateNoteTitle(baseNote, '');
      expect(updated.title).toBe('');
    });
  });

  describe('updateNoteContent', () => {
    it('should update only the content', () => {
      const updated = updateNoteContent(baseNote, 'New content');
      expect(updated.content).toBe('New content');
      expect(updated.title).toBe('Test Note');
    });

    it('should update modifiedAt', () => {
      const updated = updateNoteContent(baseNote, 'Changed');
      expect(updated.modifiedAt).toBeDefined();
    });

    it('should not mutate original', () => {
      const original = { ...baseNote };
      updateNoteContent(baseNote, 'Changed');
      expect(baseNote).toEqual(original);
    });

    it('should handle long content', () => {
      const longText = 'a'.repeat(10000);
      const updated = updateNoteContent(baseNote, longText);
      expect(updated.content).toBe(longText);
    });

    it('should handle empty content', () => {
      const updated = updateNoteContent(baseNote, '');
      expect(updated.content).toBe('');
    });
  });

  describe('addTagToNote', () => {
    it('should add a new tag', () => {
      const updated = addTagToNote(baseNote, 'newTag');
      expect(updated.tags).toContain('newTag');
      expect(updated.tags.length).toBe(3);
    });

    it('should prevent duplicate tags', () => {
      const updated = addTagToNote(baseNote, 'javascript');
      expect(updated.tags).toEqual(['javascript', 'tutorial']);
    });

    it('should not mutate original', () => {
      const original = [...baseNote.tags];
      addTagToNote(baseNote, 'new');
      expect(baseNote.tags).toEqual(original);
    });

    it('should handle empty string tag', () => {
      const updated = addTagToNote(baseNote, '');
      expect(updated.tags).toContain('');
    });

    it('should preserve other tags', () => {
      const updated = addTagToNote(baseNote, 'css');
      expect(updated.tags).toContain('javascript');
      expect(updated.tags).toContain('tutorial');
    });
  });

  describe('removeTagFromNote', () => {
    it('should remove an existing tag', () => {
      const updated = removeTagFromNote(baseNote, 'javascript');
      expect(updated.tags).not.toContain('javascript');
      expect(updated.tags).toContain('tutorial');
    });

    it('should return unchanged if tag not found', () => {
      const updated = removeTagFromNote(baseNote, 'nonexistent');
      expect(updated.tags).toEqual(baseNote.tags);
    });

    it('should not mutate original', () => {
      const original = [...baseNote.tags];
      removeTagFromNote(baseNote, 'javascript');
      expect(baseNote.tags).toEqual(original);
    });

    it('should handle removing last tag', () => {
      const single = { ...baseNote, tags: ['only'] };
      const updated = removeTagFromNote(single, 'only');
      expect(updated.tags).toEqual([]);
    });

    it('should handle case-sensitive removal', () => {
      const updated = removeTagFromNote(baseNote, 'JavaScript');
      expect(updated.tags).toContain('javascript');
    });
  });

  describe('replaceTagInNote', () => {
    it('should replace an existing tag', () => {
      const updated = replaceTagInNote(baseNote, 'javascript', 'typescript');
      expect(updated.tags).not.toContain('javascript');
      expect(updated.tags).toContain('typescript');
    });

    it('should add tag if old tag not found', () => {
      const updated = replaceTagInNote(baseNote, 'nonexistent', 'newtag');
      expect(updated.tags).toContain('newtag');
      expect(updated.tags.length).toBe(3);
    });

    it('should not mutate original', () => {
      const original = [...baseNote.tags];
      replaceTagInNote(baseNote, 'javascript', 'typescript');
      expect(baseNote.tags).toEqual(original);
    });

    it('should handle replacing to existing tag', () => {
      const updated = replaceTagInNote(baseNote, 'javascript', 'tutorial');
      expect(updated.tags).toContain('tutorial');
    });

    it('should preserve other tags', () => {
      const updated = replaceTagInNote(baseNote, 'javascript', 'python');
      expect(updated.tags).toContain('tutorial');
    });
  });

  describe('updateNotesInList', () => {
    it('should update notes matching condition', () => {
      const updated = updateNotesInList(
        notesList,
        n => n.tags.includes('work'),
        { archived: true }
      );
      expect(updated[0].archived).toBe(true);
      expect(updated[2].archived).toBe(true);
      expect(updated[1].archived).toBeUndefined();
    });

    it('should not mutate original array', () => {
      const original = JSON.stringify(notesList);
      updateNotesInList(notesList, n => true, { updated: true });
      expect(JSON.stringify(notesList)).toBe(original);
    });

    it('should handle no matches', () => {
      const updated = updateNotesInList(
        notesList,
        n => false,
        { archived: true }
      );
      expect(updated).toEqual(notesList);
    });

    it('should update all if condition always true', () => {
      const updated = updateNotesInList(
        notesList,
        n => true,
        { status: 'updated' }
      );
      updated.forEach(note => {
        expect(note.status).toBe('updated');
      });
    });

    it('should apply multiple updates', () => {
      const updated = updateNotesInList(
        notesList,
        n => n.id === 1,
        { title: 'Changed', content: 'Changed' }
      );
      expect(updated[0].title).toBe('Changed');
      expect(updated[0].content).toBe('Changed');
    });
  });

  describe('validateNoteUpdate', () => {
    it('should validate valid updates', () => {
      const result = validateNoteUpdate(baseNote, { title: 'New Title' });
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should reject empty title', () => {
      const result = validateNoteUpdate(baseNote, { title: '' });
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('title'))).toBe(true);
    });

    it('should reject empty content', () => {
      const result = validateNoteUpdate(baseNote, { content: '' });
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('content'))).toBe(true);
    });

    it('should reject changing ID', () => {
      const result = validateNoteUpdate(baseNote, { id: 999 });
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('ID'))).toBe(true);
    });

    it('should reject changing createdAt', () => {
      const result = validateNoteUpdate(baseNote, { createdAt: new Date() });
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('createdAt'))).toBe(true);
    });

    it('should validate tag array', () => {
      const result = validateNoteUpdate(baseNote, { tags: ['valid', 'tags'] });
      expect(result.isValid).toBe(true);
    });

    it('should handle multiple errors', () => {
      const result = validateNoteUpdate(baseNote, {
        title: '',
        content: '',
        id: 999
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
    });

    it('should allow empty updates', () => {
      const result = validateNoteUpdate(baseNote, {});
      expect(result.isValid).toBe(true);
    });
  });

  describe('mergeNotes', () => {
    it('should combine content from multiple notes', () => {
      const note1 = { id: 1, title: 'Main', content: 'Part 1', tags: [] };
      const note2 = { id: 2, title: 'Extra', content: 'Part 2', tags: [] };
      const note3 = { id: 3, title: 'More', content: 'Part 3', tags: [] };
      
      const merged = mergeNotes([note2, note3], note1);
      expect(merged.content).toContain('Part 1');
      expect(merged.content).toContain('Part 2');
      expect(merged.content).toContain('Part 3');
    });

    it('should merge tags', () => {
      const note1 = { id: 1, title: 'Main', content: 'C1', tags: ['work'] };
      const note2 = { id: 2, title: 'Other', content: 'C2', tags: ['urgent'] };
      const merged = mergeNotes([note2], note1);
      expect(merged.tags).toContain('work');
      expect(merged.tags).toContain('urgent');
    });

    it('should prevent duplicate tags', () => {
      const note1 = { id: 1, title: 'Main', content: 'C1', tags: ['work'] };
      const note2 = { id: 2, title: 'Other', content: 'C2', tags: ['work'] };
      const merged = mergeNotes([note2], note1);
      const workCount = merged.tags.filter(t => t === 'work').length;
      expect(workCount).toBe(1);
    });

    it('should preserve target note ID', () => {
      const note1 = { id: 1, title: 'Main', content: 'C1', tags: [] };
      const note2 = { id: 2, title: 'Other', content: 'C2', tags: [] };
      const merged = mergeNotes([note2], note1);
      expect(merged.id).toBe(1);
    });

    it('should use target note title', () => {
      const note1 = { id: 1, title: 'Main', content: 'C1', tags: [] };
      const note2 = { id: 2, title: 'Other', content: 'C2', tags: [] };
      const merged = mergeNotes([note2], note1);
      expect(merged.title).toBe('Main');
    });

    it('should handle empty merge array', () => {
      const note1 = { id: 1, title: 'Main', content: 'C1', tags: ['a'] };
      const merged = mergeNotes([], note1);
      expect(merged.content).toBe('C1');
      expect(merged.tags).toContain('a');
    });
  });

  describe('Integration tests', () => {
    it('should chain multiple updates', () => {
      let note = { ...baseNote };
      note = updateNoteTitle(note, 'New Title');
      note = updateNoteContent(note, 'New Content');
      note = addTagToNote(note, 'new');
      
      expect(note.title).toBe('New Title');
      expect(note.content).toBe('New Content');
      expect(note.tags).toContain('new');
    });

    it('should update list and then modify result', () => {
      let list = updateNoteInList(notesList, 1, { title: 'Changed' });
      const note = list[0];
      const updated = addTagToNote(note, 'modified');
      
      expect(updated.title).toBe('Changed');
      expect(updated.tags).toContain('modified');
    });

    it('should validate before updating', () => {
      const validation = validateNoteUpdate(baseNote, { title: '' });
      if (validation.isValid) {
        const updated = updateNote(baseNote, { title: '' });
        expect(updated.title).toBe('');
      } else {
        expect(validation.isValid).toBe(false);
      }
    });

    it('should handle complex tag operations', () => {
      let note = { ...baseNote };
      note = addTagToNote(note, 'urgent');
      note = replaceTagInNote(note, 'tutorial', 'guide');
      note = removeTagFromNote(note, 'javascript');
      
      expect(note.tags).toContain('guide');
      expect(note.tags).toContain('urgent');
      expect(note.tags).not.toContain('javascript');
    });
  });
});
