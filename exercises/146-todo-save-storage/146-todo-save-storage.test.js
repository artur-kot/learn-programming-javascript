import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  getStorageKey,
  isStorageAvailable,
  serializeTodos,
  deserializeTodos,
  validateStoredTodos,
  saveTodosToStorage,
  getTodosFromStorage,
  getStorageSize,
  clearAllStorage,
  updateStorageOnAdd
} from './146-todo-save-storage.js';

describe('getStorageKey', () => {
  it('should return a string key', () => {
    const key = getStorageKey();
    expect(typeof key).toBe('string');
    expect(key.length).toBeGreaterThan(0);
  });

  it('should return consistent key', () => {
    const key1 = getStorageKey();
    const key2 = getStorageKey();
    expect(key1).toBe(key2);
  });
});

describe('isStorageAvailable', () => {
  it('should return boolean', () => {
    const available = isStorageAvailable();
    expect(typeof available).toBe('boolean');
  });

  it('should return true (assuming browser support)', () => {
    const available = isStorageAvailable();
    expect(available).toBe(true);
  });
});

describe('serializeTodos', () => {
  it('should convert todos to JSON string', () => {
    const todos = [{ id: 1, title: 'Task', description: 'Desc', completed: false }];
    const json = serializeTodos(todos);
    
    expect(typeof json).toBe('string');
    expect(json).toContain('Task');
  });

  it('should handle empty array', () => {
    const json = serializeTodos([]);
    expect(json).toBe('[]');
  });

  it('should be valid JSON', () => {
    const todos = [{ id: 1, title: 'Task' }];
    const json = serializeTodos(todos);
    expect(() => JSON.parse(json)).not.toThrow();
  });

  it('should handle multiple todos', () => {
    const todos = [
      { id: 1, title: 'Task 1' },
      { id: 2, title: 'Task 2' },
      { id: 3, title: 'Task 3' }
    ];
    const json = serializeTodos(todos);
    const parsed = JSON.parse(json);
    
    expect(parsed).toHaveLength(3);
  });
});

describe('deserializeTodos', () => {
  it('should parse JSON to todos array', () => {
    const json = '[{"id":1,"title":"Task","description":"Desc","completed":false}]';
    const todos = deserializeTodos(json);
    
    expect(Array.isArray(todos)).toBe(true);
    expect(todos).toHaveLength(1);
    expect(todos[0].title).toBe('Task');
  });

  it('should handle empty array JSON', () => {
    const todos = deserializeTodos('[]');
    expect(todos).toEqual([]);
  });

  it('should handle invalid JSON gracefully', () => {
    const todos = deserializeTodos('invalid json');
    expect(Array.isArray(todos)).toBe(true);
  });

  it('should handle null string', () => {
    const todos = deserializeTodos(null);
    expect(Array.isArray(todos)).toBe(true);
  });

  it('should preserve data types', () => {
    const json = '[{"id":1,"completed":true,"createdAt":"2025-10-29T00:00:00.000Z"}]';
    const todos = deserializeTodos(json);
    
    expect(todos[0].id).toBe(1);
    expect(todos[0].completed).toBe(true);
  });
});

describe('validateStoredTodos', () => {
  it('should validate properly structured todos', () => {
    const todos = [
      { id: 1, title: 'Task', description: '', completed: false, createdAt: new Date() }
    ];
    expect(validateStoredTodos(todos)).toBe(true);
  });

  it('should reject todos missing required properties', () => {
    const todos = [{ id: 1 }]; // Missing title, completed, etc.
    expect(validateStoredTodos(todos)).toBe(false);
  });

  it('should accept empty array', () => {
    expect(validateStoredTodos([])).toBe(true);
  });

  it('should validate all todos in array', () => {
    const todos = [
      { id: 1, title: 'Good', description: '', completed: false },
      { id: 2 } // Bad one
    ];
    expect(validateStoredTodos(todos)).toBe(false);
  });

  it('should check for id property', () => {
    const todos = [{ title: 'Task', description: '', completed: false }];
    expect(validateStoredTodos(todos)).toBe(false);
  });

  it('should check for title property', () => {
    const todos = [{ id: 1, description: '', completed: false }];
    expect(validateStoredTodos(todos)).toBe(false);
  });

  it('should check for completed property', () => {
    const todos = [{ id: 1, title: 'Task', description: '' }];
    expect(validateStoredTodos(todos)).toBe(false);
  });
});

describe('saveTodosToStorage', () => {
  afterEach(() => {
    clearAllStorage();
  });

  it('should return boolean', () => {
    const result = saveTodosToStorage([]);
    expect(typeof result).toBe('boolean');
  });

  it('should save and retrieve same data', () => {
    const todos = [
      { id: 1, title: 'Task 1', description: 'Desc 1', completed: false }
    ];
    
    saveTodosToStorage(todos);
    const retrieved = getTodosFromStorage();
    
    expect(retrieved).toHaveLength(1);
    expect(retrieved[0].title).toBe('Task 1');
  });

  it('should save empty array', () => {
    saveTodosToStorage([]);
    const retrieved = getTodosFromStorage();
    expect(retrieved).toEqual([]);
  });

  it('should return true on success', () => {
    const result = saveTodosToStorage([{id: 1, title: 'Test', description: '', completed: false}]);
    expect(result).toBe(true);
  });
});

describe('getTodosFromStorage', () => {
  afterEach(() => {
    clearAllStorage();
  });

  it('should return array', () => {
    const todos = getTodosFromStorage();
    expect(Array.isArray(todos)).toBe(true);
  });

  it('should return empty array if nothing stored', () => {
    const todos = getTodosFromStorage();
    expect(todos).toEqual([]);
  });

  it('should retrieve saved todos', () => {
    const original = [{ id: 1, title: 'Task', description: 'Desc', completed: false }];
    saveTodosToStorage(original);
    
    const retrieved = getTodosFromStorage();
    expect(retrieved[0].title).toBe('Task');
  });

  it('should return empty array if storage corrupted', () => {
    const key = getStorageKey();
    localStorage.setItem(key, 'corrupted data');
    
    const todos = getTodosFromStorage();
    expect(Array.isArray(todos)).toBe(true);
  });
});

describe('getStorageSize', () => {
  afterEach(() => {
    clearAllStorage();
  });

  it('should return number', () => {
    const size = getStorageSize();
    expect(typeof size).toBe('number');
  });

  it('should return 0 for empty storage', () => {
    clearAllStorage();
    const size = getStorageSize();
    expect(size).toBe(0);
  });

  it('should increase with more data', () => {
    saveTodosToStorage([]);
    const size1 = getStorageSize();
    
    saveTodosToStorage([{ id: 1, title: 'Much longer task title', description: 'A longer description', completed: false }]);
    const size2 = getStorageSize();
    
    expect(size2).toBeGreaterThanOrEqual(size1);
  });
});

describe('clearAllStorage', () => {
  it('should remove todos from storage', () => {
    saveTodosToStorage([{ id: 1, title: 'Task', description: '', completed: false }]);
    clearAllStorage();
    
    const todos = getTodosFromStorage();
    expect(todos).toEqual([]);
  });

  it('should set size to 0', () => {
    saveTodosToStorage([{ id: 1, title: 'Task', description: '', completed: false }]);
    clearAllStorage();
    
    const size = getStorageSize();
    expect(size).toBe(0);
  });
});

describe('updateStorageOnAdd', () => {
  afterEach(() => {
    clearAllStorage();
  });

  it('should add todo and save', () => {
    const todos = [{ id: 1, title: 'Task 1', description: '', completed: false }];
    const newTodo = { id: 2, title: 'Task 2', description: '', completed: false };
    
    const result = updateStorageOnAdd(todos, newTodo);
    
    expect(result).toHaveLength(2);
  });

  it('should persist to storage', () => {
    let todos = [];
    const todo1 = { id: 1, title: 'Task 1', description: '', completed: false };
    const todo2 = { id: 2, title: 'Task 2', description: '', completed: false };
    
    todos = updateStorageOnAdd(todos, todo1);
    todos = updateStorageOnAdd(todos, todo2);
    
    const retrieved = getTodosFromStorage();
    expect(retrieved).toHaveLength(2);
  });

  it('should not modify original array', () => {
    const original = [{ id: 1, title: 'Task', description: '', completed: false }];
    const originalLength = original.length;
    const newTodo = { id: 2, title: 'New', description: '', completed: false };
    
    updateStorageOnAdd(original, newTodo);
    
    expect(original).toHaveLength(originalLength);
  });

  it('should return todos array', () => {
    const todos = [];
    const newTodo = { id: 1, title: 'Task', description: '', completed: false };
    
    const result = updateStorageOnAdd(todos, newTodo);
    
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);
  });
});

describe('Integration: Full Storage Lifecycle', () => {
  afterEach(() => {
    clearAllStorage();
  });

  it('should save and retrieve multiple todos', () => {
    const todos = [
      { id: 1, title: 'Buy milk', description: '2L bottle', completed: false },
      { id: 2, title: 'Call mom', description: 'Catch up', completed: false },
      { id: 3, title: 'Review PR', description: 'Check code', completed: true }
    ];
    
    saveTodosToStorage(todos);
    const retrieved = getTodosFromStorage();
    
    expect(retrieved).toHaveLength(3);
    expect(retrieved[0].title).toBe('Buy milk');
    expect(retrieved[2].completed).toBe(true);
  });

  it('should clear and start fresh', () => {
    saveTodosToStorage([{ id: 1, title: 'Task', description: '', completed: false }]);
    clearAllStorage();
    
    const newTodos = [{ id: 1, title: 'New Task', description: '', completed: false }];
    saveTodosToStorage(newTodos);
    
    const retrieved = getTodosFromStorage();
    expect(retrieved[0].title).toBe('New Task');
  });

  it('should survive serialization round-trip', () => {
    const original = [
      { id: 1, title: 'Task', description: 'Desc', completed: false, createdAt: '2025-10-29' }
    ];
    
    const json = serializeTodos(original);
    const deserialized = deserializeTodos(json);
    
    expect(deserialized[0].title).toBe(original[0].title);
    expect(deserialized[0].id).toBe(original[0].id);
  });
});
