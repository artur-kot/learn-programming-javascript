import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  saveNotesToStorage,
  loadNotesFromStorage,
  deleteNoteFromStorage,
  clearAllNotes,
  getStorageStats,
  validateStorageData,
  exportNotesToJSON,
  importNotesFromJSON,
  backupNotes,
  restoreNotesFromBackup
} from './156-notes-persist.js';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

global.localStorage = localStorageMock;

describe('Notes Persist & Storage', () => {
  let sampleNotes;

  beforeEach(() => {
    localStorage.clear();
    sampleNotes = [
      {
        id: 1,
        title: 'First Note',
        content: 'First content here',
        tags: ['work'],
        createdAt: new Date('2024-01-01'),
        modifiedAt: new Date('2024-01-01')
      },
      {
        id: 2,
        title: 'Second Note',
        content: 'Second content here with more text',
        tags: ['personal', 'important'],
        createdAt: new Date('2024-01-02'),
        modifiedAt: new Date('2024-01-02')
      },
      {
        id: 3,
        title: 'Third Note',
        content: 'Third content',
        tags: ['work'],
        createdAt: new Date('2024-01-03'),
        modifiedAt: new Date('2024-01-03')
      }
    ];
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('saveNotesToStorage', () => {
    it('should save notes to localStorage', () => {
      const result = saveNotesToStorage(sampleNotes);
      expect(result).toBe(true);
      expect(localStorage.getItem('notes')).toBeDefined();
    });

    it('should save with custom key', () => {
      saveNotesToStorage(sampleNotes, 'myNotes');
      expect(localStorage.getItem('myNotes')).toBeDefined();
    });

    it('should save as valid JSON', () => {
      saveNotesToStorage(sampleNotes);
      const json = localStorage.getItem('notes');
      expect(() => JSON.parse(json)).not.toThrow();
    });

    it('should preserve all properties', () => {
      saveNotesToStorage(sampleNotes);
      const loaded = JSON.parse(localStorage.getItem('notes'));
      expect(loaded[0].id).toBe(sampleNotes[0].id);
      expect(loaded[0].title).toBe(sampleNotes[0].title);
      expect(loaded[0].content).toBe(sampleNotes[0].content);
    });

    it('should handle empty array', () => {
      const result = saveNotesToStorage([]);
      expect(result).toBe(true);
      const loaded = JSON.parse(localStorage.getItem('notes'));
      expect(loaded).toEqual([]);
    });

    it('should overwrite existing data', () => {
      saveNotesToStorage(sampleNotes);
      const newNotes = [{ id: 999, title: 'New' }];
      saveNotesToStorage(newNotes);
      const loaded = JSON.parse(localStorage.getItem('notes'));
      expect(loaded.length).toBe(1);
      expect(loaded[0].id).toBe(999);
    });
  });

  describe('loadNotesFromStorage', () => {
    it('should load notes from localStorage', () => {
      saveNotesToStorage(sampleNotes);
      const loaded = loadNotesFromStorage();
      expect(loaded).toHaveLength(3);
      expect(loaded[0].id).toBe(1);
    });

    it('should load with custom key', () => {
      saveNotesToStorage(sampleNotes, 'myNotes');
      const loaded = loadNotesFromStorage('myNotes');
      expect(loaded).toHaveLength(3);
    });

    it('should return empty array if not found', () => {
      const loaded = loadNotesFromStorage('nonexistent');
      expect(loaded).toEqual([]);
    });

    it('should parse JSON correctly', () => {
      saveNotesToStorage(sampleNotes);
      const loaded = loadNotesFromStorage();
      expect(Array.isArray(loaded)).toBe(true);
      expect(loaded[1].title).toBe('Second Note');
    });

    it('should return empty array on invalid JSON', () => {
      localStorage.setItem('notes', 'invalid json');
      const loaded = loadNotesFromStorage();
      expect(loaded).toEqual([]);
    });
  });

  describe('deleteNoteFromStorage', () => {
    it('should delete a note by ID', () => {
      saveNotesToStorage(sampleNotes);
      const result = deleteNoteFromStorage(1);
      expect(result).toBe(true);
      
      const loaded = loadNotesFromStorage();
      expect(loaded).toHaveLength(2);
      expect(loaded.some(n => n.id === 1)).toBe(false);
    });

    it('should return false if ID not found', () => {
      saveNotesToStorage(sampleNotes);
      const result = deleteNoteFromStorage(999);
      expect(result).toBe(false);
      
      const loaded = loadNotesFromStorage();
      expect(loaded).toHaveLength(3);
    });

    it('should preserve other notes', () => {
      saveNotesToStorage(sampleNotes);
      deleteNoteFromStorage(2);
      
      const loaded = loadNotesFromStorage();
      expect(loaded.some(n => n.id === 1)).toBe(true);
      expect(loaded.some(n => n.id === 3)).toBe(true);
    });

    it('should work with custom key', () => {
      saveNotesToStorage(sampleNotes, 'myNotes');
      deleteNoteFromStorage(1, 'myNotes');
      
      const loaded = loadNotesFromStorage('myNotes');
      expect(loaded).toHaveLength(2);
    });
  });

  describe('clearAllNotes', () => {
    it('should remove all notes', () => {
      saveNotesToStorage(sampleNotes);
      const result = clearAllNotes();
      expect(result).toBe(true);
      expect(loadNotesFromStorage()).toEqual([]);
    });

    it('should clear custom key', () => {
      saveNotesToStorage(sampleNotes, 'myNotes');
      clearAllNotes('myNotes');
      expect(localStorage.getItem('myNotes')).toBeNull();
    });

    it('should handle non-existent key', () => {
      const result = clearAllNotes('nonexistent');
      expect(result).toBe(true);
    });
  });

  describe('getStorageStats', () => {
    it('should return note count', () => {
      saveNotesToStorage(sampleNotes);
      const stats = getStorageStats();
      expect(stats.noteCount).toBe(3);
    });

    it('should calculate total bytes', () => {
      saveNotesToStorage(sampleNotes);
      const stats = getStorageStats();
      expect(stats.totalBytes).toBeGreaterThan(0);
    });

    it('should provide formatted usage', () => {
      saveNotesToStorage(sampleNotes);
      const stats = getStorageStats();
      expect(stats.estimatedUsage).toBeDefined();
      expect(typeof stats.estimatedUsage).toBe('string');
    });

    it('should return 0 for empty storage', () => {
      const stats = getStorageStats();
      expect(stats.noteCount).toBe(0);
      expect(stats.totalBytes).toBe(0);
    });
  });

  describe('validateStorageData', () => {
    it('should validate valid data', () => {
      const result = validateStorageData(sampleNotes);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should reject non-array data', () => {
      const result = validateStorageData({ id: 1 });
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should check required properties', () => {
      const invalid = [{ id: 1 }]; // missing title
      const result = validateStorageData(invalid);
      expect(result.isValid).toBe(false);
    });

    it('should validate empty array', () => {
      const result = validateStorageData([]);
      expect(result.isValid).toBe(true);
    });

    it('should report multiple errors', () => {
      const invalid = [{ wrongProp: 'value' }];
      const result = validateStorageData(invalid);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('exportNotesToJSON', () => {
    it('should export as JSON string', () => {
      const json = exportNotesToJSON(sampleNotes);
      expect(typeof json).toBe('string');
      expect(JSON.parse(json)).toEqual(sampleNotes);
    });

    it('should be prettified', () => {
      const json = exportNotesToJSON(sampleNotes);
      expect(json).toContain('\n'); // Should have formatting
    });

    it('should handle empty array', () => {
      const json = exportNotesToJSON([]);
      expect(JSON.parse(json)).toEqual([]);
    });

    it('should preserve all data', () => {
      const json = exportNotesToJSON(sampleNotes);
      const parsed = JSON.parse(json);
      expect(parsed.length).toBe(sampleNotes.length);
      expect(parsed[0].tags).toEqual(sampleNotes[0].tags);
    });
  });

  describe('importNotesFromJSON', () => {
    it('should import valid JSON', () => {
      const json = JSON.stringify(sampleNotes);
      const result = importNotesFromJSON(json);
      expect(result.success).toBe(true);
      expect(result.notes).toHaveLength(3);
      expect(result.errors).toEqual([]);
    });

    it('should reject invalid JSON', () => {
      const result = importNotesFromJSON('not json');
      expect(result.success).toBe(false);
      expect(result.notes).toEqual([]);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate imported data', () => {
      const invalid = JSON.stringify([{ id: 1 }]);
      const result = importNotesFromJSON(invalid);
      expect(result.success).toBe(false);
    });

    it('should handle empty array', () => {
      const json = JSON.stringify([]);
      const result = importNotesFromJSON(json);
      expect(result.success).toBe(true);
      expect(result.notes).toEqual([]);
    });

    it('should return errors array', () => {
      const result = importNotesFromJSON('invalid');
      expect(Array.isArray(result.errors)).toBe(true);
    });
  });

  describe('backupNotes', () => {
    it('should create backup with timestamp', () => {
      saveNotesToStorage(sampleNotes);
      const backupKey = backupNotes();
      expect(backupKey).toContain('backup');
      expect(localStorage.getItem(backupKey)).toBeDefined();
    });

    it('should preserve original notes', () => {
      saveNotesToStorage(sampleNotes);
      backupNotes();
      const loaded = loadNotesFromStorage();
      expect(loaded).toHaveLength(3);
    });

    it('should copy all data', () => {
      saveNotesToStorage(sampleNotes);
      const backupKey = backupNotes();
      const backup = JSON.parse(localStorage.getItem(backupKey));
      expect(backup).toEqual(sampleNotes);
    });

    it('should return backup key', () => {
      saveNotesToStorage(sampleNotes);
      const backupKey = backupNotes();
      expect(typeof backupKey).toBe('string');
      expect(backupKey.length).toBeGreaterThan(0);
    });
  });

  describe('restoreNotesFromBackup', () => {
    it('should restore from backup', () => {
      saveNotesToStorage(sampleNotes);
      const backupKey = backupNotes();
      
      clearAllNotes();
      expect(loadNotesFromStorage()).toEqual([]);
      
      const result = restoreNotesFromBackup(backupKey);
      expect(result).toBe(true);
      
      const restored = loadNotesFromStorage();
      expect(restored).toHaveLength(3);
    });

    it('should return false for invalid backup key', () => {
      const result = restoreNotesFromBackup('nonexistent');
      expect(result).toBe(false);
    });

    it('should restore to target key', () => {
      saveNotesToStorage(sampleNotes);
      const backupKey = backupNotes();
      
      const result = restoreNotesFromBackup(backupKey, 'restored');
      expect(result).toBe(true);
      
      const restored = loadNotesFromStorage('restored');
      expect(restored).toHaveLength(3);
    });

    it('should overwrite target notes', () => {
      const oldNotes = [{ id: 999, title: 'Old' }];
      saveNotesToStorage(oldNotes);
      
      saveNotesToStorage(sampleNotes, 'backup_source');
      const backupKey = backupNotes('backup_source');
      
      restoreNotesFromBackup(backupKey);
      const restored = loadNotesFromStorage();
      expect(restored[0].id).toBe(1);
    });
  });

  describe('Integration tests', () => {
    it('should save and load complete workflow', () => {
      saveNotesToStorage(sampleNotes);
      const loaded = loadNotesFromStorage();
      expect(loaded).toHaveLength(3);
      
      deleteNoteFromStorage(1);
      const updated = loadNotesFromStorage();
      expect(updated).toHaveLength(2);
    });

    it('should backup and restore workflow', () => {
      saveNotesToStorage(sampleNotes);
      const backupKey = backupNotes();
      
      deleteNoteFromStorage(1);
      deleteNoteFromStorage(2);
      expect(loadNotesFromStorage()).toHaveLength(1);
      
      restoreNotesFromBackup(backupKey);
      expect(loadNotesFromStorage()).toHaveLength(3);
    });

    it('should export and import workflow', () => {
      saveNotesToStorage(sampleNotes);
      const json = exportNotesToJSON(loadNotesFromStorage());
      
      clearAllNotes();
      const result = importNotesFromJSON(json);
      expect(result.success).toBe(true);
      
      saveNotesToStorage(result.notes);
      expect(loadNotesFromStorage()).toHaveLength(3);
    });

    it('should validate data after operations', () => {
      saveNotesToStorage(sampleNotes);
      const loaded = loadNotesFromStorage();
      const validation = validateStorageData(loaded);
      expect(validation.isValid).toBe(true);
    });
  });
});
