import { describe, it, expect, beforeEach } from 'vitest';
import {
  createNote,
  generateNoteId,
  validateNoteInput,
  addNoteToList,
  renderNoteElement,
  renderAllNotes,
  clearNoteForm,
  getNoteCount,
  formatNoteDate,
  initializeNoteApp
} from './148-notes-create.js';

describe('Notes Create - Core Functions', () => {
  let mockNote;

  beforeEach(() => {
    mockNote = {
      id: 'test-id-1',
      title: 'Test Note',
      content: 'Test Content',
      createdAt: new Date('2025-10-29'),
      updatedAt: new Date('2025-10-29')
    };
  });

  describe('createNote', () => {
    it('should create a note with title and content', () => {
      const note = createNote('Shopping', 'Milk, eggs, bread');
      expect(note).toHaveProperty('title', 'Shopping');
      expect(note).toHaveProperty('content', 'Milk, eggs, bread');
    });

    it('should include id property', () => {
      const note = createNote('Test', 'Content');
      expect(note).toHaveProperty('id');
      expect(typeof note.id).toBe('string');
    });

    it('should include createdAt timestamp', () => {
      const note = createNote('Test', 'Content');
      expect(note).toHaveProperty('createdAt');
      expect(note.createdAt instanceof Date).toBe(true);
    });

    it('should include updatedAt timestamp', () => {
      const note = createNote('Test', 'Content');
      expect(note).toHaveProperty('updatedAt');
      expect(note.updatedAt instanceof Date).toBe(true);
    });

    it('should have matching createdAt and updatedAt on creation', () => {
      const note = createNote('Test', 'Content');
      expect(note.createdAt.getTime()).toEqual(note.updatedAt.getTime());
    });

    it('should create notes with different IDs', () => {
      const note1 = createNote('Note 1', 'Content 1');
      const note2 = createNote('Note 2', 'Content 2');
      expect(note1.id).not.toBe(note2.id);
    });
  });

  describe('generateNoteId', () => {
    it('should return a string', () => {
      const id = generateNoteId();
      expect(typeof id).toBe('string');
    });

    it('should generate unique IDs', () => {
      const id1 = generateNoteId();
      const id2 = generateNoteId();
      expect(id1).not.toBe(id2);
    });

    it('should create consistent ID format', () => {
      const id = generateNoteId();
      expect(id.length).toBeGreaterThan(0);
      expect(typeof id).toBe('string');
    });
  });

  describe('validateNoteInput', () => {
    it('should validate correct input', () => {
      const result = validateNoteInput('Title', 'Content');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should reject empty title', () => {
      const result = validateNoteInput('', 'Content');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it('should reject empty content', () => {
      const result = validateNoteInput('Title', '');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it('should reject both empty', () => {
      const result = validateNoteInput('', '');
      expect(result.isValid).toBe(false);
    });

    it('should handle whitespace-only input', () => {
      const result = validateNoteInput('   ', 'Content');
      expect(result.isValid).toBe(false);
    });

    it('should accept long content', () => {
      const longContent = 'a'.repeat(5000);
      const result = validateNoteInput('Title', longContent);
      expect(result.isValid).toBe(true);
    });
  });

  describe('addNoteToList', () => {
    it('should add note to empty list', () => {
      const result = addNoteToList([], mockNote);
      expect(result).toHaveLength(1);
      expect(result[0]).toBe(mockNote);
    });

    it('should add note to existing list', () => {
      const note2 = { ...mockNote, id: 'test-id-2' };
      const result = addNoteToList([mockNote], note2);
      expect(result).toHaveLength(2);
    });

    it('should not mutate original array', () => {
      const original = [mockNote];
      const note2 = { ...mockNote, id: 'test-id-2' };
      addNoteToList(original, note2);
      expect(original).toHaveLength(1);
    });

    it('should preserve order', () => {
      const note2 = { ...mockNote, id: 'test-id-2' };
      const result = addNoteToList([mockNote], note2);
      expect(result[0].id).toBe('test-id-1');
      expect(result[1].id).toBe('test-id-2');
    });

    it('should handle multiple additions', () => {
      let list = [];
      for (let i = 0; i < 5; i++) {
        const note = { ...mockNote, id: `test-id-${i}` };
        list = addNoteToList(list, note);
      }
      expect(list).toHaveLength(5);
    });
  });

  describe('getNoteCount', () => {
    it('should return 0 for empty array', () => {
      expect(getNoteCount([])).toBe(0);
    });

    it('should return correct count', () => {
      const notes = [mockNote, { ...mockNote, id: 'test-id-2' }];
      expect(getNoteCount(notes)).toBe(2);
    });

    it('should count multiple notes', () => {
      const notes = Array(10).fill(null).map((_, i) => ({
        ...mockNote,
        id: `test-id-${i}`
      }));
      expect(getNoteCount(notes)).toBe(10);
    });
  });

  describe('formatNoteDate', () => {
    it('should return a string', () => {
      const date = new Date('2025-10-29T14:30:00');
      const formatted = formatNoteDate(date);
      expect(typeof formatted).toBe('string');
    });

    it('should format date with readable output', () => {
      const date = new Date('2025-10-29T14:30:00');
      const formatted = formatNoteDate(date);
      expect(formatted.length).toBeGreaterThan(0);
    });

    it('should handle various dates', () => {
      const dates = [
        new Date('2025-01-01'),
        new Date('2025-12-31'),
        new Date('2025-06-15')
      ];
      dates.forEach(date => {
        expect(typeof formatNoteDate(date)).toBe('string');
      });
    });
  });

  describe('renderNoteElement', () => {
    it('should return an HTMLElement', () => {
      const element = renderNoteElement(mockNote);
      expect(element instanceof HTMLElement).toBe(true);
    });

    it('should include note title in element', () => {
      const element = renderNoteElement(mockNote);
      expect(element.textContent).toContain('Test Note');
    });

    it('should include note content in element', () => {
      const element = renderNoteElement(mockNote);
      expect(element.textContent).toContain('Test Content');
    });

    it('should have appropriate class', () => {
      const element = renderNoteElement(mockNote);
      expect(element.className).toBeTruthy();
    });
  });

  describe('clearNoteForm', () => {
    it('should clear form inputs', () => {
      const form = document.createElement('form');
      form.id = 'test-form';
      form.innerHTML = `
        <input id="note-title" value="Old Title">
        <textarea id="note-content">Old Content</textarea>
      `;
      document.body.appendChild(form);

      clearNoteForm('test-form');
      
      const titleInput = document.getElementById('note-title');
      const contentInput = document.getElementById('note-content');
      
      expect(titleInput.value).toBe('');
      expect(contentInput.value).toBe('');
      
      document.body.removeChild(form);
    });
  });

  describe('Integration Tests', () => {
    it('should create and count notes', () => {
      let notes = [];
      const note1 = createNote('Note 1', 'Content 1');
      notes = addNoteToList(notes, note1);
      
      const note2 = createNote('Note 2', 'Content 2');
      notes = addNoteToList(notes, note2);
      
      expect(getNoteCount(notes)).toBe(2);
    });

    it('should validate and create valid notes', () => {
      const validation = validateNoteInput('Title', 'Content');
      
      if (validation.isValid) {
        const note = createNote('Title', 'Content');
        expect(note).toBeTruthy();
        expect(note.title).toBe('Title');
      }
    });

    it('should render created note', () => {
      const note = createNote('Test', 'Content');
      const element = renderNoteElement(note);
      
      expect(element).toBeTruthy();
      expect(element instanceof HTMLElement).toBe(true);
    });
  });
});
