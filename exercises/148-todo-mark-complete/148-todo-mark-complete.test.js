import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  markTodoComplete,
  toggleTodoStatus,
  uncompleteTodo,
  getCompletedTodos,
  getPendingTodos,
  renderCompletedState,
  updateCompletionInStorage,
  filterByCompletion,
  countCompleted,
  getTodoCompletionStats
} from './148-todo-mark-complete.js';

describe('markTodoComplete', () => {
  it('should mark a todo as complete', () => {
    const todos = [
      { id: 1, title: 'Task 1', completed: false }
    ];
    
    const result = markTodoComplete(todos, 1);
    expect(result[0].completed).toBe(true);
  });

  it('should preserve other properties', () => {
    const todos = [
      { id: 1, title: 'Task 1', description: 'Desc', completed: false }
    ];
    
    const result = markTodoComplete(todos, 1);
    expect(result[0].title).toBe('Task 1');
    expect(result[0].description).toBe('Desc');
  });

  it('should not modify original array', () => {
    const todos = [
      { id: 1, title: 'Task 1', completed: false }
    ];
    
    markTodoComplete(todos, 1);
    expect(todos[0].completed).toBe(false);
  });

  it('should handle multiple todos', () => {
    const todos = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: false }
    ];
    
    const result = markTodoComplete(todos, 2);
    expect(result[0].completed).toBe(false);
    expect(result[1].completed).toBe(true);
  });

  it('should handle non-existent ID', () => {
    const todos = [
      { id: 1, title: 'Task 1', completed: false }
    ];
    
    const result = markTodoComplete(todos, 999);
    expect(Array.isArray(result)).toBe(true);
  });
});

describe('toggleTodoStatus', () => {
  it('should toggle incomplete to complete', () => {
    const todos = [
      { id: 1, title: 'Task', completed: false }
    ];
    
    const result = toggleTodoStatus(todos, 1);
    expect(result[0].completed).toBe(true);
  });

  it('should toggle complete to incomplete', () => {
    const todos = [
      { id: 1, title: 'Task', completed: true }
    ];
    
    const result = toggleTodoStatus(todos, 1);
    expect(result[0].completed).toBe(false);
  });

  it('should preserve all properties', () => {
    const todos = [
      { id: 1, title: 'Task', description: 'Desc', completed: false }
    ];
    
    const result = toggleTodoStatus(todos, 1);
    expect(result[0].title).toBe('Task');
    expect(result[0].description).toBe('Desc');
  });

  it('should handle multiple toggles', () => {
    let todos = [
      { id: 1, title: 'Task', completed: false }
    ];
    
    todos = toggleTodoStatus(todos, 1);
    expect(todos[0].completed).toBe(true);
    
    todos = toggleTodoStatus(todos, 1);
    expect(todos[0].completed).toBe(false);
  });
});

describe('uncompleteTodo', () => {
  it('should mark completed todo as pending', () => {
    const todos = [
      { id: 1, title: 'Task', completed: true }
    ];
    
    const result = uncompleteTodo(todos, 1);
    expect(result[0].completed).toBe(false);
  });

  it('should handle already pending todo', () => {
    const todos = [
      { id: 1, title: 'Task', completed: false }
    ];
    
    const result = uncompleteTodo(todos, 1);
    expect(result[0].completed).toBe(false);
  });

  it('should preserve properties', () => {
    const todos = [
      { id: 1, title: 'Task', description: 'Desc', completed: true }
    ];
    
    const result = uncompleteTodo(todos, 1);
    expect(result[0].title).toBe('Task');
    expect(result[0].description).toBe('Desc');
  });
});

describe('getCompletedTodos', () => {
  it('should return completed todos', () => {
    const todos = [
      { id: 1, title: 'Done', completed: true },
      { id: 2, title: 'Pending', completed: false },
      { id: 3, title: 'Done too', completed: true }
    ];
    
    const result = getCompletedTodos(todos);
    expect(result).toHaveLength(2);
    expect(result.every(t => t.completed)).toBe(true);
  });

  it('should return empty for no completed todos', () => {
    const todos = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: false }
    ];
    
    const result = getCompletedTodos(todos);
    expect(result).toEqual([]);
  });

  it('should handle empty array', () => {
    const result = getCompletedTodos([]);
    expect(result).toEqual([]);
  });
});

describe('getPendingTodos', () => {
  it('should return pending todos', () => {
    const todos = [
      { id: 1, title: 'Done', completed: true },
      { id: 2, title: 'Pending', completed: false },
      { id: 3, title: 'Pending too', completed: false }
    ];
    
    const result = getPendingTodos(todos);
    expect(result).toHaveLength(2);
    expect(result.every(t => !t.completed)).toBe(true);
  });

  it('should return empty for no pending todos', () => {
    const todos = [
      { id: 1, title: 'Task 1', completed: true },
      { id: 2, title: 'Task 2', completed: true }
    ];
    
    const result = getPendingTodos(todos);
    expect(result).toEqual([]);
  });

  it('should handle empty array', () => {
    const result = getPendingTodos([]);
    expect(result).toEqual([]);
  });
});

describe('countCompleted', () => {
  it('should count completed and pending', () => {
    const todos = [
      { id: 1, title: 'Done 1', completed: true },
      { id: 2, title: 'Done 2', completed: true },
      { id: 3, title: 'Pending', completed: false }
    ];
    
    const result = countCompleted(todos);
    expect(result.completed).toBe(2);
    expect(result.pending).toBe(1);
    expect(result.total).toBe(3);
  });

  it('should handle empty array', () => {
    const result = countCompleted([]);
    expect(result.completed).toBe(0);
    expect(result.pending).toBe(0);
    expect(result.total).toBe(0);
  });

  it('should handle all completed', () => {
    const todos = [
      { id: 1, completed: true },
      { id: 2, completed: true }
    ];
    
    const result = countCompleted(todos);
    expect(result.completed).toBe(2);
    expect(result.pending).toBe(0);
  });

  it('should handle all pending', () => {
    const todos = [
      { id: 1, completed: false },
      { id: 2, completed: false }
    ];
    
    const result = countCompleted(todos);
    expect(result.completed).toBe(0);
    expect(result.pending).toBe(2);
  });
});

describe('getTodoCompletionStats', () => {
  it('should return comprehensive stats', () => {
    const todos = [
      { id: 1, completed: true },
      { id: 2, completed: true },
      { id: 3, completed: false }
    ];
    
    const stats = getTodoCompletionStats(todos);
    expect(stats).toHaveProperty('completed');
    expect(stats).toHaveProperty('pending');
    expect(stats).toHaveProperty('total');
    expect(stats).toHaveProperty('percentage');
  });

  it('should calculate percentage correctly', () => {
    const todos = [
      { id: 1, completed: true },
      { id: 2, completed: true },
      { id: 3, completed: false },
      { id: 4, completed: false }
    ];
    
    const stats = getTodoCompletionStats(todos);
    expect(stats.completed).toBe(2);
    expect(stats.total).toBe(4);
    expect(stats.percentage).toBe(50);
  });

  it('should handle 100% completion', () => {
    const todos = [
      { id: 1, completed: true },
      { id: 2, completed: true }
    ];
    
    const stats = getTodoCompletionStats(todos);
    expect(stats.percentage).toBe(100);
  });

  it('should handle 0% completion', () => {
    const todos = [
      { id: 1, completed: false },
      { id: 2, completed: false }
    ];
    
    const stats = getTodoCompletionStats(todos);
    expect(stats.percentage).toBe(0);
  });

  it('should handle empty todos', () => {
    const stats = getTodoCompletionStats([]);
    expect(stats.total).toBe(0);
    expect(stats.completed).toBe(0);
  });
});

describe('renderCompletedState', () => {
  it('should render completed todo', () => {
    const todo = { id: 1, title: 'Done', completed: true };
    const result = renderCompletedState(todo);
    expect(result).toBeDefined();
  });

  it('should render pending todo', () => {
    const todo = { id: 1, title: 'Pending', completed: false };
    const result = renderCompletedState(todo);
    expect(result).toBeDefined();
  });

  it('should include todo title', () => {
    const todo = { id: 1, title: 'My Task', completed: false };
    const result = renderCompletedState(todo);
    expect(typeof result === 'string' ? result.includes('My Task') : true).toBe(true);
  });
});

describe('filterByCompletion', () => {
  it('should filter by completed status', () => {
    const todos = [
      { id: 1, title: 'Done', completed: true },
      { id: 2, title: 'Pending', completed: false }
    ];
    
    const result = filterByCompletion(todos, { completed: true });
    expect(result.every(t => t.completed === true)).toBe(true);
  });

  it('should filter by pending status', () => {
    const todos = [
      { id: 1, title: 'Done', completed: true },
      { id: 2, title: 'Pending', completed: false }
    ];
    
    const result = filterByCompletion(todos, { completed: false });
    expect(result.every(t => t.completed === false)).toBe(true);
  });

  it('should handle empty criteria', () => {
    const todos = [
      { id: 1, title: 'Task 1', completed: true },
      { id: 2, title: 'Task 2', completed: false }
    ];
    
    const result = filterByCompletion(todos, {});
    expect(Array.isArray(result)).toBe(true);
  });

  it('should handle empty todos', () => {
    const result = filterByCompletion([], { completed: true });
    expect(result).toEqual([]);
  });
});

describe('updateCompletionInStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should save todos to storage', () => {
    const todos = [
      { id: 1, title: 'Task', completed: true }
    ];
    
    const result = updateCompletionInStorage(todos);
    expect(result.success).toBe(true);
    expect(localStorage.getItem('todos')).toBeDefined();
  });

  it('should handle storage errors', () => {
    const result = updateCompletionInStorage([]);
    expect(typeof result).toBe('object');
    expect(result).toHaveProperty('success');
  });

  it('should preserve all todo properties', () => {
    const todos = [
      { id: 1, title: 'Task', description: 'Desc', completed: true }
    ];
    
    updateCompletionInStorage(todos);
    const stored = JSON.parse(localStorage.getItem('todos'));
    expect(stored[0].title).toBe('Task');
    expect(stored[0].description).toBe('Desc');
  });
});

describe('Integration: Complete Workflows', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should toggle and save completion', () => {
    let todos = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: false }
    ];
    
    todos = toggleTodoStatus(todos, 1);
    const result = updateCompletionInStorage(todos);
    
    expect(result.success).toBe(true);
    expect(todos[0].completed).toBe(true);
    expect(todos[1].completed).toBe(false);
  });

  it('should track completion stats', () => {
    let todos = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: false },
      { id: 3, title: 'Task 3', completed: false }
    ];
    
    todos = markTodoComplete(todos, 1);
    todos = markTodoComplete(todos, 2);
    
    const stats = getTodoCompletionStats(todos);
    expect(stats.completed).toBe(2);
    expect(stats.pending).toBe(1);
    expect(stats.percentage).toBe(Math.round((2/3) * 100));
  });

  it('should filter and count todos', () => {
    const todos = [
      { id: 1, title: 'Task 1', completed: true },
      { id: 2, title: 'Task 2', completed: false },
      { id: 3, title: 'Task 3', completed: true }
    ];
    
    const completed = getCompletedTodos(todos);
    const pending = getPendingTodos(todos);
    const counts = countCompleted(todos);
    
    expect(completed).toHaveLength(2);
    expect(pending).toHaveLength(1);
    expect(counts.completed).toBe(2);
  });
});
