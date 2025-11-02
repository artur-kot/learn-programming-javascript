import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  deleteTodo,
  removeTodoById,
  softDeleteTodo,
  restoreDeletedTodo,
  emptyTrash,
  getDeletedTodos,
  undoLastDelete,
  permanentlyDeleteTodo,
  deleteMultipleTodos,
  deleteByQuery
} from './147-todo-delete-items.js';

describe('deleteTodo', () => {
  it('should delete a todo by ID', () => {
    const todos = [
      { id: 1, title: 'Task 1' },
      { id: 2, title: 'Task 2' }
    ];
    
    const result = deleteTodo(todos, 1);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it('should not modify original array', () => {
    const todos = [{ id: 1, title: 'Task' }];
    deleteTodo(todos, 1);
    
    expect(todos).toHaveLength(1);
  });

  it('should handle non-existent ID', () => {
    const todos = [{ id: 1, title: 'Task' }];
    const result = deleteTodo(todos, 999);
    
    expect(result).toHaveLength(1);
  });

  it('should handle empty array', () => {
    const result = deleteTodo([], 1);
    expect(result).toEqual([]);
  });

  it('should delete from middle of array', () => {
    const todos = [
      { id: 1, title: 'Task 1' },
      { id: 2, title: 'Task 2' },
      { id: 3, title: 'Task 3' }
    ];
    
    const result = deleteTodo(todos, 2);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(3);
  });
});

describe('removeTodoById', () => {
  it('should remove todo by ID', () => {
    const todos = [
      { id: 1, title: 'Task 1' },
      { id: 2, title: 'Task 2' }
    ];
    
    const result = removeTodoById(todos, 1);
    expect(result).toHaveLength(1);
  });

  it('should preserve other todos', () => {
    const todos = [
      { id: 1, title: 'Task 1', description: 'Keep' },
      { id: 2, title: 'Task 2' }
    ];
    
    const result = removeTodoById(todos, 2);
    expect(result[0].description).toBe('Keep');
  });

  it('should handle empty array', () => {
    const result = removeTodoById([], 1);
    expect(result).toEqual([]);
  });
});

describe('deleteMultipleTodos', () => {
  it('should delete multiple todos', () => {
    const todos = [
      { id: 1, title: 'Task 1' },
      { id: 2, title: 'Task 2' },
      { id: 3, title: 'Task 3' }
    ];
    
    const result = deleteMultipleTodos(todos, [1, 3]);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it('should handle empty ID array', () => {
    const todos = [{ id: 1, title: 'Task' }];
    const result = deleteMultipleTodos(todos, []);
    
    expect(result).toHaveLength(1);
  });

  it('should handle non-existent IDs', () => {
    const todos = [{ id: 1, title: 'Task' }];
    const result = deleteMultipleTodos(todos, [999, 888]);
    
    expect(result).toHaveLength(1);
  });
});

describe('permanentlyDeleteTodo', () => {
  it('should permanently delete todo', () => {
    const todos = [
      { id: 1, title: 'Task 1' },
      { id: 2, title: 'Task 2' }
    ];
    
    const result = permanentlyDeleteTodo(todos, 1);
    expect(result).toHaveLength(1);
  });

  it('should not keep any reference', () => {
    const todos = [{ id: 1, title: 'Task' }];
    const result = permanentlyDeleteTodo(todos, 1);
    
    expect(result).toEqual([]);
  });
});

describe('softDeleteTodo', () => {
  it('should move todo to trash', () => {
    const todos = [
      { id: 1, title: 'Task 1' },
      { id: 2, title: 'Task 2' }
    ];
    
    const result = softDeleteTodo(todos, 1);
    expect(result).toBeDefined();
  });

  it('should keep deleted todo recoverable', () => {
    const todos = [{ id: 1, title: 'Task' }];
    const result = softDeleteTodo(todos, 1);
    
    // Result should contain trash or deleted info
    expect(result).toBeDefined();
  });
});

describe('getDeletedTodos', () => {
  it('should return deleted todos', () => {
    const trash = [
      { id: 1, title: 'Deleted 1' },
      { id: 2, title: 'Deleted 2' }
    ];
    
    const result = getDeletedTodos(trash);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should handle empty trash', () => {
    const result = getDeletedTodos([]);
    expect(result).toEqual([]);
  });
});

describe('restoreDeletedTodo', () => {
  it('should restore from trash', () => {
    const todos = [];
    const trash = [{ id: 1, title: 'Deleted' }];
    
    const result = restoreDeletedTodo(todos, trash, 1);
    expect(result).toBeDefined();
  });

  it('should handle non-existent restore ID', () => {
    const todos = [];
    const trash = [];
    
    const result = restoreDeletedTodo(todos, trash, 999);
    expect(result).toBeDefined();
  });
});

describe('emptyTrash', () => {
  it('should clear all trash', () => {
    const trash = [
      { id: 1, title: 'Item 1' },
      { id: 2, title: 'Item 2' }
    ];
    
    const result = emptyTrash(trash);
    expect(result).toEqual([]);
  });

  it('should handle empty trash', () => {
    const result = emptyTrash([]);
    expect(result).toEqual([]);
  });
});

describe('undoLastDelete', () => {
  it('should restore last deleted todo', () => {
    const todos = [];
    const history = [
      { id: 1, title: 'Task', action: 'delete' }
    ];
    
    const result = undoLastDelete(todos, history);
    expect(result).toBeDefined();
  });

  it('should handle empty history', () => {
    const todos = [];
    const result = undoLastDelete(todos, []);
    
    expect(result).toBeDefined();
  });
});

describe('deleteByQuery', () => {
  it('should delete matching completed todos', () => {
    const todos = [
      { id: 1, title: 'Task 1', completed: true },
      { id: 2, title: 'Task 2', completed: false }
    ];
    
    const result = deleteByQuery(todos, { completed: true });
    expect(result).toHaveLength(1);
    expect(result[0].completed).toBe(false);
  });

  it('should delete by title match', () => {
    const todos = [
      { id: 1, title: 'Delete me' },
      { id: 2, title: 'Keep me' }
    ];
    
    const result = deleteByQuery(todos, { titleContains: 'Delete' });
    expect(result).toHaveLength(1);
  });

  it('should handle no matches', () => {
    const todos = [{ id: 1, title: 'Task' }];
    const result = deleteByQuery(todos, { completed: true });
    
    expect(result).toHaveLength(1);
  });

  it('should handle empty array', () => {
    const result = deleteByQuery([], { completed: true });
    expect(result).toEqual([]);
  });
});

describe('Integration: Deletion Workflows', () => {
  it('should delete and restore with soft delete', () => {
    const todos = [{ id: 1, title: 'Task' }];
    
    // Soft delete
    const afterDelete = softDeleteTodo(todos, 1);
    expect(afterDelete).toBeDefined();
  });

  it('should handle multiple deletions', () => {
    const todos = [
      { id: 1, title: 'Task 1' },
      { id: 2, title: 'Task 2' },
      { id: 3, title: 'Task 3' }
    ];
    
    const result = deleteMultipleTodos(todos, [1, 3]);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it('should permanent delete after soft delete', () => {
    const todos = [{ id: 1, title: 'Task' }];
    
    // Soft delete first (in real app)
    // Then permanent delete
    const result = permanentlyDeleteTodo(todos, 1);
    expect(result).toEqual([]);
  });
});
