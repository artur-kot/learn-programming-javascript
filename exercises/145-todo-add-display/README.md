# Exercise 148: Todo List - Add and Display

Build a todo list application starting with the core functionality: adding todos and displaying them on the page. This exercise introduces state management, form handling, and dynamic DOM rendering.

## Learning Outcomes

By completing this exercise, you will:

- ✅ Create and manage todo objects
- ✅ Implement state management for a list of items
- ✅ Handle form submissions and input validation
- ✅ Render dynamic content to the DOM
- ✅ Generate unique identifiers for items
- ✅ Manage list operations (add, find, display)
- ✅ Clear form inputs after submission
- ✅ Separate concerns with helper functions

## Prerequisites

Before starting this exercise, you should be familiar with:

- **DOM manipulation**: Creating elements, selecting, modifying
- **Event handling**: Form submission, click handlers
- **Array methods**: map, filter, find, push
- **Objects**: Creating, accessing properties
- **ES6 features**: Arrow functions, destructuring, template literals
- **Validation**: Checking input before processing

## Concepts

### Todo List Architecture

A todo list application has three main layers:

1. **Data Layer**: Array of todo objects in state
2. **Logic Layer**: Functions to add, find, validate todos
3. **UI Layer**: Rendering todos to the DOM

```
User Types Text
    ↓
Form Submission
    ↓
Validate Input
    ↓
Create Todo Object
    ↓
Add to State Array
    ↓
Render All Todos
    ↓
Clear Form
    ↓
Display on Page
```

### Todo Object Structure

Each todo needs:
```javascript
{
  id: 1,                           // Unique identifier
  title: 'Buy milk',               // Main task
  description: 'Get 2L bottle',    // Details
  completed: false,                // Status
  createdAt: new Date()            // Timestamp
}
```

### State Management Basics

In this exercise, state is an array of todos. Every operation either:
- **Reads** from state (get todos)
- **Creates** new state (add todo)
- **Transforms** state (not yet, but prepare for it)

Key principle: Keep data and UI separate. Functions work with data, then we render the result.

## Function Specifications

### createTodo(title, description)

Create a new todo object with all required properties.

```javascript
const todo = createTodo('Buy milk', '2L bottle');
// Returns: {
//   id: 1,
//   title: 'Buy milk',
//   description: '2L bottle',
//   completed: false,
//   createdAt: Thu Oct 29 2025 14:30:00...
// }
```

**Implementation tips:**
- Generate a unique ID (can be random for now)
- Set completed to false
- Use `new Date()` for timestamp
- Return a new object

### addTodo(todos, newTodo)

Add a todo to the list **immutably** (don't modify input).

```javascript
const todos = [];
const newTodo = { id: 1, title: 'Task', ... };
const updated = addTodo(todos, newTodo);

console.log(todos);      // [] (unchanged)
console.log(updated);    // [newTodo] (new array)
```

**Implementation tips:**
- Use spread operator: `[...todos, newTodo]`
- Don't modify the original array
- Return new array with added item

### getTodos()

Get all todos (simple getter function).

```javascript
const todos = getTodos();
// Returns: []
```

**Implementation tips:**
- For now, return empty array
- In real app, would return from global state
- Used for testing purposes

### getTodoById(todos, id)

Find a specific todo by its ID.

```javascript
getTodoById(todos, 1)   // {id: 1, title: '...'}
getTodoById(todos, 999) // null
```

**Implementation tips:**
- Use `array.find()` method
- Return null if not found
- Handle both number and string IDs

### generateTodoId(todos)

Create a unique ID higher than any existing one.

```javascript
generateTodoId([])                 // 1
generateTodoId([{id: 1}, {id: 2}]) // 3
generateTodoId([{id: 5}, {id: 10}]) // 11
```

**Implementation tips:**
- Find maximum ID with `Math.max()`
- Handle empty array (return 1)
- Use spread operator: `Math.max(...todos.map(t => t.id))`

### validateTodoInput(title)

Check if title is valid before creating todo.

```javascript
validateTodoInput('Buy milk')  // true
validateTodoInput('')          // false
validateTodoInput('   ')       // false (whitespace only)
```

**Implementation tips:**
- Check length > 0
- Trim whitespace: `title.trim()`
- Only accept non-empty after trimming

### formatTodoDisplay(todo)

Format a todo as a readable string.

```javascript
const todo = { title: 'Buy milk', description: '2L', completed: false };
formatTodoDisplay(todo);
// Returns: "Buy milk - 2L"
```

**Implementation tips:**
- Include title
- Include description if not empty
- Can include completed status
- Use template literals

### renderTodo(todo)

Create an HTML element for a single todo.

```javascript
const todo = { id: 1, title: 'Buy milk', ... };
const element = renderTodo(todo);
// Returns: <li class="todo-item">
//            <div class="todo-content">
//              <div class="todo-title">Buy milk</div>
//            </div>
//          </li>
```

**Implementation tips:**
- Create `<li>` element
- Add class "todo-item"
- Add data-id attribute: `setAttribute('data-id', todo.id)`
- Add "completed" class if todo.completed is true
- Include title and description in content
- Return the element

### renderTodos(todos, container)

Render all todos to a container element.

```javascript
const container = document.getElementById('todoList');
const todos = [{ id: 1, ... }, { id: 2, ... }];
renderTodos(todos, container);

// Result: <ul id="todoList">
//           <li class="todo-item">...</li>
//           <li class="todo-item">...</li>
//         </ul>
```

**Implementation tips:**
- Clear container: `container.innerHTML = ''`
- Loop through todos
- Call renderTodo for each
- Use `container.appendChild()` to add
- Or use `container.innerHTML` to set HTML

### clearTodoInput(formElement)

Clear all input fields in a form.

```javascript
const form = document.getElementById('todoForm');
clearTodoInput(form);
// All inputs now empty
```

**Implementation tips:**
- Select all inputs and textareas
- Set value to empty string
- Or loop through form elements

## Common Patterns

### Pattern 1: Todo Creation and Display

```javascript
// Get form elements
const titleInput = document.getElementById('title');
const descInput = document.getElementById('description');
const form = document.getElementById('todoForm');
const todoList = document.getElementById('todoList');

// State
let todos = [];

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Validate
  if (!validateTodoInput(titleInput.value)) {
    alert('Please enter a title');
    return;
  }
  
  // Create and add
  const newTodo = createTodo(titleInput.value, descInput.value);
  todos = addTodo(todos, newTodo);
  
  // Render
  renderTodos(todos, todoList);
  
  // Clear
  clearTodoInput(form);
});

// Display initial todos
renderTodos(todos, todoList);
```

### Pattern 2: Displaying Statistics

```javascript
function updateStats(todos) {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const pending = total - completed;
  
  document.getElementById('totalCount').textContent = total;
  document.getElementById('completedCount').textContent = completed;
  document.getElementById('pendingCount').textContent = pending;
}
```

### Pattern 3: Finding and Displaying Single Todo

```javascript
function showTodoDetails(todos, id) {
  const todo = getTodoById(todos, id);
  
  if (!todo) {
    console.log('Todo not found');
    return;
  }
  
  const details = formatTodoDisplay(todo);
  console.log(details);
}
```

### Pattern 4: Rendering with Empty State

```javascript
function renderTodosWithEmptyState(todos, container) {
  if (todos.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>No todos yet. Create one to get started!</p>
      </div>
    `;
    return;
  }
  
  renderTodos(todos, container);
}
```

### Pattern 5: Todo Item with ID Attribute

```javascript
// HTML for each todo
function renderTodo(todo) {
  const li = document.createElement('li');
  li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
  li.setAttribute('data-id', todo.id);
  
  li.innerHTML = `
    <div class="todo-content">
      <div class="todo-title">${todo.title}</div>
      <div class="todo-description">${todo.description}</div>
      <div class="todo-meta">Created: ${todo.createdAt.toLocaleDateString()}</div>
    </div>
  `;
  
  return li;
}
```

### Pattern 6: Form Clearing

```javascript
function clearForm(formElement) {
  // Clear all input elements
  const inputs = formElement.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.value = '';
  });
  
  // Or simply reset
  formElement.reset();
}
```

## Testing Guide

### Test Todo Creation

```javascript
it('should create a todo with required properties', () => {
  const todo = createTodo('Task', 'Description');
  expect(todo.title).toBe('Task');
  expect(todo.completed).toBe(false);
  expect(todo).toHaveProperty('id');
});
```

### Test Adding Todos

```javascript
it('should add todo without modifying original', () => {
  const todos = [];
  const newTodo = { id: 1, title: 'Task' };
  const result = addTodo(todos, newTodo);
  
  expect(todos).toHaveLength(0);
  expect(result).toHaveLength(1);
});
```

### Test Finding Todos

```javascript
it('should find todo by id', () => {
  const todos = [{ id: 1, title: 'Task' }];
  expect(getTodoById(todos, 1).title).toBe('Task');
  expect(getTodoById(todos, 99)).toBeNull();
});
```

### Test Rendering

```javascript
it('should render todo as li element', () => {
  const todo = { id: 1, title: 'Task', description: '', completed: false };
  const element = renderTodo(todo);
  
  expect(element.tagName).toBe('LI');
  expect(element.className).toContain('todo-item');
  expect(element.getAttribute('data-id')).toBe('1');
});
```

## Real-World Usage

### Complete Todo App

```javascript
class TodoApp {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.form = document.querySelector('form');
    this.titleInput = this.form.querySelector('[name="title"]');
    this.descInput = this.form.querySelector('[name="description"]');
    this.todos = [];
    
    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleAddTodo(e));
    this.render();
  }

  handleAddTodo(e) {
    e.preventDefault();
    
    if (!validateTodoInput(this.titleInput.value)) {
      alert('Title cannot be empty');
      return;
    }
    
    const newTodo = createTodo(
      this.titleInput.value,
      this.descInput.value
    );
    
    this.todos = addTodo(this.todos, newTodo);
    this.render();
    clearTodoInput(this.form);
  }

  render() {
    renderTodos(this.todos, this.container);
    this.updateStats();
  }

  updateStats() {
    const total = this.todos.length;
    const completed = this.todos.filter(t => t.completed).length;
    
    const statsEl = document.getElementById('stats');
    statsEl.innerHTML = `
      <div class="stat-box">
        <div class="stat-label">Total</div>
        <div class="stat-value">${total}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Completed</div>
        <div class="stat-value">${completed}</div>
      </div>
    `;
  }
}

// Initialize app
const app = new TodoApp('#todoList');
```

### Todo Object with Helper Methods

```javascript
function createTodoWithMethods(title, description) {
  const todo = createTodo(title, description);
  
  return {
    ...todo,
    display() {
      return formatTodoDisplay(this);
    },
    matches(query) {
      return this.title.toLowerCase().includes(query) ||
             this.description.toLowerCase().includes(query);
    },
    getAge() {
      const now = new Date();
      const age = now - new Date(this.createdAt);
      return Math.floor(age / (1000 * 60 * 60)); // hours
    }
  };
}
```

## Implementation Tips

1. **Immutability**: Don't modify input arrays, create new ones
2. **Data First**: Create data, then render it
3. **Validation**: Always check input before processing
4. **IDs**: Make them unique and sequential
5. **Empty States**: Handle when there are no todos
6. **Separation**: Keep data functions separate from DOM functions
7. **Readability**: Use meaningful names for functions and variables
8. **Testing**: Write functions that are easy to test in isolation

## Resources

- [MDN: Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN: Creating DOM Elements](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
- [MDN: Form Events](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement)
- [State Management Basics](https://en.wikipedia.org/wiki/State_management)
- [TODO MVC Architecture](https://todomvc.com/)

## Key Takeaways

- **Todos are objects** with id, title, description, completed, createdAt
- **State is an array** of todo objects
- **Functions read or transform state** without side effects
- **Rendering** turns data into DOM elements
- **Form handling** creates new todos and updates state
- **Validation** prevents bad data from entering the system
- **Immutability** keeps code predictable and easier to debug
- **ID generation** ensures each todo is unique
- **Separation of concerns** makes code maintainable
- **Pattern recognition** helps build more complex features

Good luck! 🚀
