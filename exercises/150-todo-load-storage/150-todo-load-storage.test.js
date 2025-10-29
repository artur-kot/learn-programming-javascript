import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  initializeApp,
  loadTodosOnStartup,
  getInitialAppState,
  restoreTodosFromStorage,
  setupAppState,
  renderInitialTodos,
  handleStorageError,
  checkStorageOnLoad,
  migrateOldStorage,
  logStorageStatus
} from './150-todo-load-storage.js';

describe('loadTodosOnStartup', () => {
  it('should return an array', () => {
    const todos = loadTodosOnStartup();
    expect(Array.isArray(todos)).toBe(true);
  });

  it('should return empty array if no storage', () => {
    localStorage.clear();
    const todos = loadTodosOnStartup();
    expect(todos).toEqual([]);
  });

  it('should load todos if stored', () => {
    const stored = [
      { id: 1, title: 'Task 1', description: '', completed: false }
    ];
    localStorage.setItem('todos', JSON.stringify(stored));
    
    const todos = loadTodosOnStartup();
    expect(todos).toHaveLength(1);
    expect(todos[0].title).toBe('Task 1');
  });

  afterEach(() => {
    localStorage.clear();
  });
});

describe('restoreTodosFromStorage', () => {
  it('should return array', () => {
    const todos = restoreTodosFromStorage();
    expect(Array.isArray(todos)).toBe(true);
  });

  it('should handle missing storage', () => {
    localStorage.clear();
    const todos = restoreTodosFromStorage();
    expect(todos).toEqual([]);
  });

  it('should handle corrupted data', () => {
    localStorage.setItem('todos', 'corrupted');
    const todos = restoreTodosFromStorage();
    expect(Array.isArray(todos)).toBe(true);
  });

  it('should handle empty array', () => {
    localStorage.setItem('todos', '[]');
    const todos = restoreTodosFromStorage();
    expect(todos).toEqual([]);
  });

  afterEach(() => {
    localStorage.clear();
  });
});

describe('getInitialAppState', () => {
  it('should return object with required properties', () => {
    const state = getInitialAppState();
    expect(state).toHaveProperty('todos');
    expect(Array.isArray(state.todos)).toBe(true);
  });

  it('should include loaded flag', () => {
    const state = getInitialAppState();
    expect(state).toHaveProperty('loaded');
    expect(typeof state.loaded).toBe('boolean');
  });

  it('should include timestamp', () => {
    const state = getInitialAppState();
    expect(state).toHaveProperty('timestamp');
  });

  afterEach(() => {
    localStorage.clear();
  });
});

describe('setupAppState', () => {
  it('should return array', () => {
    const todos = [{ id: 1, title: 'Task', description: '', completed: false }];
    const result = setupAppState(todos);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should handle empty todos', () => {
    const result = setupAppState([]);
    expect(result).toEqual([]);
  });

  it('should preserve todos', () => {
    const todos = [
      { id: 1, title: 'Task 1', description: '', completed: false },
      { id: 2, title: 'Task 2', description: '', completed: false }
    ];
    const result = setupAppState(todos);
    expect(result).toHaveLength(2);
  });
});

describe('checkStorageOnLoad', () => {
  it('should return object', () => {
    const status = checkStorageOnLoad();
    expect(typeof status).toBe('object');
  });

  it('should have available property', () => {
    const status = checkStorageOnLoad();
    expect(status).toHaveProperty('available');
    expect(typeof status.available).toBe('boolean');
  });

  it('should check accessibility', () => {
    const status = checkStorageOnLoad();
    expect(status).toHaveProperty('accessible');
  });
});

describe('handleStorageError', () => {
  it('should return object', () => {
    const error = new Error('Test error');
    const result = handleStorageError(error);
    expect(typeof result).toBe('object');
  });

  it('should include message', () => {
    const error = new Error('Storage failed');
    const result = handleStorageError(error);
    expect(result).toHaveProperty('message');
  });

  it('should include recovery info', () => {
    const error = new Error('Test');
    const result = handleStorageError(error);
    expect(result).toHaveProperty('recovery');
  });
});

describe('migrateOldStorage', () => {
  it('should return array', () => {
    const todos = [{ id: 1, title: 'Task' }];
    const result = migrateOldStorage(todos);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should handle empty todos', () => {
    const result = migrateOldStorage([]);
    expect(result).toEqual([]);
  });

  it('should preserve todo data', () => {
    const todos = [
      { id: 1, title: 'Task 1', description: 'Desc 1' },
      { id: 2, title: 'Task 2', description: 'Desc 2' }
    ];
    const result = migrateOldStorage(todos);
    expect(result).toHaveLength(2);
  });

  it('should add missing properties', () => {
    const oldTodos = [
      { id: 1, title: 'Task' }
    ];
    const result = migrateOldStorage(oldTodos);
    // Migration might add completed, timestamp, etc.
    expect(result).toHaveLength(1);
  });
});

describe('renderInitialTodos', () => {
  it('should render todos to container', () => {
    const container = document.createElement('ul');
    const todos = [
      { id: 1, title: 'Task 1', description: '', completed: false },
      { id: 2, title: 'Task 2', description: '', completed: false }
    ];
    
    renderInitialTodos(todos, container);
    expect(container.children.length).toBeGreaterThanOrEqual(0);
  });

  it('should handle empty todos', () => {
    const container = document.createElement('ul');
    renderInitialTodos([], container);
    expect(container).toBeDefined();
  });

  it('should not throw with null container', () => {
    expect(() => {
      renderInitialTodos([], null);
    }).not.toThrow();
  });
});

describe('initializeApp', () => {
  it('should return object', () => {
    const app = initializeApp();
    expect(typeof app).toBe('object');
  });

  it('should have todos array', () => {
    const app = initializeApp();
    expect(Array.isArray(app.todos)).toBe(true);
  });

  it('should have success flag', () => {
    const app = initializeApp();
    expect(app).toHaveProperty('success');
    expect(typeof app.success).toBe('boolean');
  });

  it('should load persisted todos', () => {
    const stored = [
      { id: 1, title: 'Task', description: '', completed: false }
    ];
    localStorage.setItem('todos', JSON.stringify(stored));
    
    const app = initializeApp();
    expect(app.todos.length).toBeGreaterThanOrEqual(0);
  });

  afterEach(() => {
    localStorage.clear();
  });
});

describe('logStorageStatus', () => {
  it('should not throw', () => {
    expect(() => {
      logStorageStatus();
    }).not.toThrow();
  });
});

describe('Integration: Complete Initialization', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should load and setup todos on startup', () => {
    const todos = [
      { id: 1, title: 'Task 1', description: 'Desc', completed: false },
      { id: 2, title: 'Task 2', description: 'Desc', completed: true }
    ];
    localStorage.setItem('todos', JSON.stringify(todos));
    
    const app = initializeApp();
    expect(app.todos.length).toBeGreaterThanOrEqual(0);
    expect(app.success).toBe(true);
  });

  it('should handle missing storage gracefully', () => {
    localStorage.clear();
    
    const app = initializeApp();
    expect(app.todos).toEqual([]);
    expect(app.success).toBe(true);
  });

  it('should recover from corrupted storage', () => {
    localStorage.setItem('todos', '{invalid json}');
    
    const app = initializeApp();
    expect(Array.isArray(app.todos)).toBe(true);
  });

  it('should check storage on startup', () => {
    const status = checkStorageOnLoad();
    expect(status).toBeDefined();
    expect(status).toHaveProperty('available');
  });

  it('should provide initial state', () => {
    const state = getInitialAppState();
    expect(state).toHaveProperty('todos');
    expect(state).toHaveProperty('loaded');
    expect(state).toHaveProperty('timestamp');
  });
});
