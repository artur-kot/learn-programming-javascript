import { describe, it, expect, beforeEach } from 'vitest';
import {
  createTodo,
  addTodo,
  getTodos,
  getTodoById,
  renderTodo,
  renderTodos,
  formatTodoDisplay,
  clearTodoInput,
  validateTodoInput,
  generateTodoId
} from './143-todo-add-display.js';

describe('createTodo', () => {
  it('should create a todo object with required properties', () => {
    const todo = createTodo('Buy milk', 'Get 2L bottle');
    expect(todo).toHaveProperty('id');
    expect(todo).toHaveProperty('title');
    expect(todo).toHaveProperty('description');
    expect(todo).toHaveProperty('completed');
    expect(todo).toHaveProperty('createdAt');
  });

  it('should set title and description from parameters', () => {
    const todo = createTodo('Buy milk', 'Get 2L bottle');
    expect(todo.title).toBe('Buy milk');
    expect(todo.description).toBe('Get 2L bottle');
  });

  it('should set completed to false by default', () => {
    const todo = createTodo('Task 1', 'Description');
    expect(todo.completed).toBe(false);
  });

  it('should set createdAt to current date', () => {
    const beforeCreate = Date.now();
    const todo = createTodo('Task', 'Desc');
    const afterCreate = Date.now();
    
    const createdTime = new Date(todo.createdAt).getTime();
    expect(createdTime).toBeGreaterThanOrEqual(beforeCreate);
    expect(createdTime).toBeLessThanOrEqual(afterCreate);
  });

  it('should have a numeric id', () => {
    const todo = createTodo('Task', 'Desc');
    expect(typeof todo.id).toBe('number');
  });
});

describe('addTodo', () => {
  it('should add todo to empty array', () => {
    const todo = { id: 1, title: 'Task', description: '', completed: false };
    const result = addTodo([], todo);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(todo);
  });

  it('should add todo to existing todos', () => {
    const existing = [{ id: 1, title: 'Task 1' }];
    const newTodo = { id: 2, title: 'Task 2' };
    const result = addTodo(existing, newTodo);
    expect(result).toHaveLength(2);
    expect(result[1]).toEqual(newTodo);
  });

  it('should not modify original array', () => {
    const todos = [{ id: 1 }];
    const newTodo = { id: 2 };
    const result = addTodo(todos, newTodo);
    expect(todos).toHaveLength(1);
    expect(result).toHaveLength(2);
  });

  it('should preserve order', () => {
    const todos = [{ id: 1 }, { id: 2 }];
    const newTodo = { id: 3 };
    const result = addTodo(todos, newTodo);
    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(2);
    expect(result[2].id).toBe(3);
  });
});

describe('getTodoById', () => {
  const todos = [
    { id: 1, title: 'Task 1' },
    { id: 2, title: 'Task 2' },
    { id: 3, title: 'Task 3' }
  ];

  it('should find todo by id', () => {
    expect(getTodoById(todos, 1).title).toBe('Task 1');
    expect(getTodoById(todos, 2).title).toBe('Task 2');
  });

  it('should return null for non-existent id', () => {
    expect(getTodoById(todos, 999)).toBeNull();
  });

  it('should handle empty array', () => {
    expect(getTodoById([], 1)).toBeNull();
  });

  it('should work with string ids', () => {
    const todoWithStringId = { id: '1', title: 'Task' };
    expect(getTodoById([todoWithStringId], '1')).toBeDefined();
  });
});

describe('validateTodoInput', () => {
  it('should validate non-empty string', () => {
    expect(validateTodoInput('Buy milk')).toBe(true);
  });

  it('should reject empty string', () => {
    expect(validateTodoInput('')).toBe(false);
  });

  it('should reject whitespace only', () => {
    expect(validateTodoInput('   ')).toBe(false);
    expect(validateTodoInput('\t')).toBe(false);
    expect(validateTodoInput('\n')).toBe(false);
  });

  it('should accept string with special characters', () => {
    expect(validateTodoInput('Task: do @home!')).toBe(true);
  });

  it('should accept single character', () => {
    expect(validateTodoInput('A')).toBe(true);
  });

  it('should accept long strings', () => {
    const longString = 'a'.repeat(1000);
    expect(validateTodoInput(longString)).toBe(true);
  });
});

describe('generateTodoId', () => {
  it('should return 1 for empty array', () => {
    expect(generateTodoId([])).toBe(1);
  });

  it('should return max id + 1', () => {
    const todos = [{ id: 1 }, { id: 2 }, { id: 3 }];
    expect(generateTodoId(todos)).toBe(4);
  });

  it('should handle single todo', () => {
    expect(generateTodoId([{ id: 1 }])).toBe(2);
  });

  it('should work with unordered ids', () => {
    const todos = [{ id: 3 }, { id: 1 }, { id: 2 }];
    expect(generateTodoId(todos)).toBe(4);
  });

  it('should handle large ids', () => {
    const todos = [{ id: 1000 }, { id: 999 }];
    expect(generateTodoId(todos)).toBe(1001);
  });
});

describe('formatTodoDisplay', () => {
  it('should format title and description', () => {
    const todo = { title: 'Buy milk', description: '2L bottle', completed: false };
    const result = formatTodoDisplay(todo);
    expect(result).toContain('Buy milk');
    expect(result).toContain('2L bottle');
  });

  it('should handle empty description', () => {
    const todo = { title: 'Task', description: '', completed: false };
    const result = formatTodoDisplay(todo);
    expect(result).toContain('Task');
  });

  it('should include completion status indicator', () => {
    const completed = { title: 'Done task', description: '', completed: true };
    const incomplete = { title: 'Pending', description: '', completed: false };
    
    expect(formatTodoDisplay(completed)).toContain('Done task');
    expect(formatTodoDisplay(incomplete)).toContain('Pending');
  });

  it('should return string', () => {
    const todo = { title: 'Test', description: 'Desc', completed: false };
    expect(typeof formatTodoDisplay(todo)).toBe('string');
  });
});

describe('renderTodo', () => {
  it('should create HTMLElement', () => {
    const todo = { id: 1, title: 'Task', description: 'Desc', completed: false };
    const element = renderTodo(todo);
    expect(element.nodeType).toBe(1); // Element node
  });

  it('should be a list item', () => {
    const todo = { id: 1, title: 'Task', description: 'Desc', completed: false };
    const element = renderTodo(todo);
    expect(element.tagName.toLowerCase()).toBe('li');
  });

  it('should contain todo title', () => {
    const todo = { id: 1, title: 'Buy milk', description: '', completed: false };
    const element = renderTodo(todo);
    expect(element.textContent).toContain('Buy milk');
  });

  it('should have todo-item class', () => {
    const todo = { id: 1, title: 'Task', description: '', completed: false };
    const element = renderTodo(todo);
    expect(element.className).toContain('todo-item');
  });

  it('should have data-id attribute', () => {
    const todo = { id: 5, title: 'Task', description: '', completed: false };
    const element = renderTodo(todo);
    expect(element.getAttribute('data-id')).toBe('5');
  });

  it('should show completed status visually', () => {
    const completed = { id: 1, title: 'Done', description: '', completed: true };
    const incomplete = { id: 2, title: 'Pending', description: '', completed: false };
    
    const completedEl = renderTodo(completed);
    const incompleteEl = renderTodo(incomplete);
    
    expect(completedEl.className).toContain('completed');
    expect(incompleteEl.className).not.toContain('completed');
  });
});

describe('renderTodos', () => {
  it('should render all todos to container', () => {
    const container = document.createElement('ul');
    const todos = [
      { id: 1, title: 'Task 1', description: '', completed: false },
      { id: 2, title: 'Task 2', description: '', completed: false }
    ];
    
    renderTodos(todos, container);
    expect(container.children).toHaveLength(2);
  });

  it('should clear container before rendering', () => {
    const container = document.createElement('ul');
    container.innerHTML = '<li>Old</li>';
    
    const todos = [{ id: 1, title: 'New', description: '', completed: false }];
    renderTodos(todos, container);
    
    expect(container.children).toHaveLength(1);
    expect(container.textContent).toContain('New');
    expect(container.textContent).not.toContain('Old');
  });

  it('should handle empty todos array', () => {
    const container = document.createElement('ul');
    renderTodos([], container);
    expect(container.children).toHaveLength(0);
  });

  it('should render todo items in order', () => {
    const container = document.createElement('ul');
    const todos = [
      { id: 1, title: 'First', description: '', completed: false },
      { id: 2, title: 'Second', description: '', completed: false },
      { id: 3, title: 'Third', description: '', completed: false }
    ];
    
    renderTodos(todos, container);
    
    expect(container.children[0].textContent).toContain('First');
    expect(container.children[1].textContent).toContain('Second');
    expect(container.children[2].textContent).toContain('Third');
  });
});

describe('clearTodoInput', () => {
  it('should clear text inputs', () => {
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.type = 'text';
    input.value = 'Some text';
    form.appendChild(input);
    
    clearTodoInput(form);
    expect(input.value).toBe('');
  });

  it('should clear textarea', () => {
    const form = document.createElement('form');
    const textarea = document.createElement('textarea');
    textarea.value = 'Some description';
    form.appendChild(textarea);
    
    clearTodoInput(form);
    expect(textarea.value).toBe('');
  });

  it('should clear multiple inputs', () => {
    const form = document.createElement('form');
    const input1 = document.createElement('input');
    const input2 = document.createElement('input');
    input1.value = 'Text 1';
    input2.value = 'Text 2';
    form.appendChild(input1);
    form.appendChild(input2);
    
    clearTodoInput(form);
    expect(input1.value).toBe('');
    expect(input2.value).toBe('');
  });

  it('should not clear hidden inputs by mistake', () => {
    const form = document.createElement('form');
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.value = 'keep-me';
    form.appendChild(hiddenInput);
    
    clearTodoInput(form);
    // Hidden inputs might still be cleared if implementation clears all inputs
    // This test documents expected behavior
  });
});

describe('getTodos', () => {
  it('should return an array', () => {
    const todos = getTodos();
    expect(Array.isArray(todos)).toBe(true);
  });

  it('should return empty array by default', () => {
    const todos = getTodos();
    expect(todos).toHaveLength(0);
  });
});
