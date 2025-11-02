# Exercise 149: Todo List - Save to Storage

Persist todo data to localStorage so it survives page reloads. Learn how to serialize JavaScript objects to JSON, store them in the browser, and retrieve them later.

## Learning Outcomes

By completing this exercise, you will:

- ✅ Use localStorage API to save and retrieve data
- ✅ Serialize objects to JSON strings
- ✅ Deserialize JSON back to objects
- ✅ Handle storage errors gracefully
- ✅ Validate stored data
- ✅ Calculate and monitor storage size
- ✅ Clear storage when needed
- ✅ Implement persistence patterns in applications

## Prerequisites

Before starting this exercise, you should be familiar with:

- **Exercise 148**: Todo Add and Display
- **localStorage API**: Basic setItem, getItem, removeItem
- **JSON methods**: JSON.stringify(), JSON.parse()
- **Error handling**: Try-catch blocks
- **Data validation**: Checking object structure

## Concepts

### localStorage Fundamentals

`localStorage` is a browser API for persistent storage:

```javascript
// Save data
localStorage.setItem('key', 'value');

// Get data
const data = localStorage.getItem('key'); // Returns string or null

// Remove data
localStorage.removeItem('key');

// Clear everything
localStorage.clear();
```

**Key characteristics:**
- Data persists even after closing the browser
- Same-origin policy (can't access other site's data)
- Limited storage (typically 5-10MB per domain)
- Stores only strings (need JSON for objects)
- Synchronous (can be slow on large data)

### JSON Serialization

Converting objects ↔ strings for storage:

```javascript
// Object → String (save)
const obj = { id: 1, title: 'Task' };
const json = JSON.stringify(obj);
// json = '{"id":1,"title":"Task"}'

// String → Object (load)
const loaded = JSON.parse(json);
// loaded = { id: 1, title: 'Task' }
```

**Why JSON?**
- localStorage only stores strings
- JSON is text-based and universal
- Easy to transfer and debug
- Human readable in DevTools

### Storage Lifecycle

```
Create Data
    ↓
Validate Data
    ↓
Serialize to JSON
    ↓
Save to localStorage
    ↓
    [Later...]
    ↓
Get from localStorage
    ↓
Deserialize from JSON
    ↓
Validate Data
    ↓
Use Data
```

### Storage Availability

Not all environments support localStorage:
- Private/incognito mode (sometimes blocked)
- Some old browsers
- Cross-origin iframes

Solution: Check before use

```javascript
if (isStorageAvailable()) {
  localStorage.setItem('todos', json);
} else {
  // Fallback to memory storage
}
```

## Function Specifications

### getStorageKey()

Get the consistent key used for storing todos.

```javascript
const key = getStorageKey();
// Returns: 'todos' (or 'app_todos', etc.)
```

**Implementation tips:**
- Return a string constant
- Use same key everywhere (prevents bugs)
- Could be 'todos', 'app_todos', 'my-todos', etc.

### isStorageAvailable()

Check if localStorage is available and working.

```javascript
if (isStorageAvailable()) {
  localStorage.setItem('test', 'test');
  localStorage.removeItem('test');
  // Can use localStorage safely
}
```

**Implementation tips:**
- Try to set and get a test item
- Return true if successful
- Catch errors and return false

```javascript
try {
  const test = '__test__';
  localStorage.setItem(test, test);
  localStorage.removeItem(test);
  return true;
} catch(e) {
  return false;
}
```

### serializeTodos(todos)

Convert todos array to JSON string.

```javascript
const todos = [
  { id: 1, title: 'Task', description: 'Desc', completed: false }
];
const json = serializeTodos(todos);
// Returns: '[{"id":1,"title":"Task",...}]'
```

**Implementation tips:**
- Use JSON.stringify()
- Handle empty arrays: `[]` → `'[]'`
- Result is always a string

### deserializeTodos(jsonString)

Convert JSON string back to todos array.

```javascript
const json = '[{"id":1,"title":"Task"}]';
const todos = deserializeTodos(json);
// Returns: [{ id: 1, title: 'Task' }]

deserializeTodos('invalid')
// Returns: [] (handle gracefully)
```

**Implementation tips:**
- Use JSON.parse()
- Wrap in try-catch for invalid JSON
- Return empty array on error

### validateStoredTodos(todos)

Check that todos have all required properties.

```javascript
validateStoredTodos([
  { id: 1, title: 'Task', description: '', completed: false }
]) // true

validateStoredTodos([
  { id: 1 } // Missing properties
]) // false
```

**Implementation tips:**
- Every todo must have: id, title, completed
- Use some() or every() to check array
- Check each property exists

```javascript
return todos.every(todo =>
  todo.id !== undefined &&
  todo.title !== undefined &&
  todo.completed !== undefined
);
```

### saveTodosToStorage(todos)

Save todos array to localStorage.

```javascript
const success = saveTodosToStorage(todos);
// Returns: true if successful, false if failed
```

**Implementation tips:**
- Serialize todos to JSON
- Save to localStorage with key
- Return true on success
- Return false on error (quota exceeded, etc.)

```javascript
try {
  const json = serializeTodos(todos);
  localStorage.setItem(getStorageKey(), json);
  return true;
} catch(e) {
  return false;
}
```

### getTodosFromStorage()

Retrieve todos from localStorage.

```javascript
const todos = getTodosFromStorage();
// Returns: [todos] or [] if none stored
```

**Implementation tips:**
- Get JSON from storage
- Deserialize to objects
- Return empty array if not found
- Handle corrupted data gracefully

```javascript
const json = localStorage.getItem(getStorageKey());
if (!json) return [];
const todos = deserializeTodos(json);
return validateStoredTodos(todos) ? todos : [];
```

### getStorageSize()

Calculate size of stored todos in bytes.

```javascript
const size = getStorageSize();
// Returns: 1024 (1KB)
```

**Implementation tips:**
- Get JSON from storage
- Calculate string length (approximation)
- Return 0 if nothing stored

```javascript
const json = localStorage.getItem(getStorageKey());
return json ? new Blob([json]).size : 0;
```

### clearAllStorage()

Remove all todos from localStorage.

```javascript
clearAllStorage();
// getTodosFromStorage() now returns []
```

**Implementation tips:**
- Remove the key
- Or removeItem()
- Or clear() entire storage (careful!)

### validateStoredTodos(todos)

Check data integrity of retrieved todos.

```javascript
const todos = [
  { id: 1, title: 'Task', description: '', completed: false, createdAt: '...' }
];
validateStoredTodos(todos) // true
```

**Implementation tips:**
- Check all required properties exist
- Verify types (id is number, title is string, etc.)
- Return true only if all valid

### updateStorageOnAdd(todos, newTodo)

Add a new todo and persist in one operation.

```javascript
const todos = [{ id: 1, ... }];
const newTodo = { id: 2, ... };
const updated = updateStorageOnAdd(todos, newTodo);
// Returns: [...todos, newTodo] and saves to storage
```

**Implementation tips:**
- Create new array with added todo
- Save to storage
- Return updated array
- Keep it immutable

## Common Patterns

### Pattern 1: Save on Every Change

```javascript
let todos = getTodosFromStorage();

function addTodo(title, description) {
  const newTodo = {
    id: generateId(todos),
    title,
    description,
    completed: false,
    createdAt: new Date()
  };
  
  todos = [...todos, newTodo];
  saveTodosToStorage(todos); // Save immediately
  return newTodo;
}
```

### Pattern 2: Load on App Start

```javascript
// Initialize app
window.addEventListener('load', () => {
  if (!isStorageAvailable()) {
    console.warn('Storage not available');
    todos = [];
    return;
  }
  
  todos = getTodosFromStorage();
  renderTodos(todos);
});
```

### Pattern 3: Handle Quota Exceeded

```javascript
function saveSafely(todos) {
  try {
    const success = saveTodosToStorage(todos);
    if (!success) {
      alert('Storage quota exceeded');
      return false;
    }
    return true;
  } catch(e) {
    console.error('Storage error:', e);
    return false;
  }
}
```

### Pattern 4: Version Migration

```javascript
function loadWithMigration() {
  let todos = getTodosFromStorage();
  
  // Migrate old format to new format
  if (todos.length > 0 && !todos[0].createdAt) {
    todos = todos.map(todo => ({
      ...todo,
      createdAt: new Date().toISOString()
    }));
    saveTodosToStorage(todos);
  }
  
  return todos;
}
```

### Pattern 5: Export/Backup

```javascript
function exportTodos() {
  const todos = getTodosFromStorage();
  const json = JSON.stringify(todos, null, 2);
  
  const blob = new Blob([json], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `todos-${Date.now()}.json`;
  a.click();
}

function importTodos(jsonFile) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const todos = JSON.parse(e.target.result);
      if (validateStoredTodos(todos)) {
        saveTodosToStorage(todos);
        console.log('Import successful');
      }
    } catch(err) {
      console.error('Import failed:', err);
    }
  };
  reader.readAsText(jsonFile);
}
```

### Pattern 6: Storage Limits

```javascript
const MAX_TODOS = 1000;
const MAX_STORAGE_MB = 4; // 4MB limit

function canAddTodo(newTodo) {
  const todos = getTodosFromStorage();
  
  if (todos.length >= MAX_TODOS) {
    return false; // Too many todos
  }
  
  const testTodos = [...todos, newTodo];
  const size = getStorageSize();
  const sizeInMB = size / (1024 * 1024);
  
  return sizeInMB < MAX_STORAGE_MB;
}
```

## Testing Guide

### Test Serialization

```javascript
it('should serialize todos to valid JSON', () => {
  const todos = [{ id: 1, title: 'Task', completed: false }];
  const json = serializeTodos(todos);
  
  expect(() => JSON.parse(json)).not.toThrow();
  expect(JSON.parse(json)[0].title).toBe('Task');
});
```

### Test Storage Operations

```javascript
it('should save and retrieve todos', () => {
  const todos = [{ id: 1, title: 'Task', description: '', completed: false }];
  saveTodosToStorage(todos);
  const retrieved = getTodosFromStorage();
  
  expect(retrieved[0].title).toBe('Task');
});
```

### Test Error Handling

```javascript
it('should handle corrupted data', () => {
  const key = getStorageKey();
  localStorage.setItem(key, 'corrupted data');
  
  const todos = getTodosFromStorage();
  expect(Array.isArray(todos)).toBe(true);
});
```

## Real-World Usage

### Complete Persistent Todo App

```javascript
class PersistentTodoApp {
  constructor() {
    this.todos = getTodosFromStorage();
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.render();
  }

  setupEventListeners() {
    document.getElementById('addBtn').addEventListener('click', () => {
      this.addTodo();
    });
    
    document.getElementById('clearBtn').addEventListener('click', () => {
      this.clearAll();
    });
  }

  addTodo() {
    const title = document.getElementById('todoTitle').value;
    const desc = document.getElementById('todoDesc').value;
    
    if (!title.trim()) return;
    
    const newTodo = {
      id: Date.now(),
      title,
      description: desc,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    this.todos.push(newTodo);
    
    if (saveTodosToStorage(this.todos)) {
      this.render();
      this.clearInputs();
    } else {
      alert('Failed to save todo');
    }
  }

  clearAll() {
    if (confirm('Clear all todos?')) {
      this.todos = [];
      clearAllStorage();
      this.render();
    }
  }

  render() {
    const container = document.getElementById('todos');
    container.innerHTML = '';
    
    this.todos.forEach(todo => {
      const li = document.createElement('li');
      li.innerHTML = `${todo.title} - ${todo.description}`;
      container.appendChild(li);
    });
    
    this.showStats();
  }

  showStats() {
    const size = getStorageSize();
    const sizeMB = (size / 1024).toFixed(2);
    document.getElementById('stats').textContent = 
      `${this.todos.length} todos, ${sizeMB}KB storage`;
  }

  clearInputs() {
    document.getElementById('todoTitle').value = '';
    document.getElementById('todoDesc').value = '';
  }
}

// Initialize when page loads
new PersistentTodoApp();
```

## Implementation Tips

1. **Always validate**: Check data structure before using
2. **Handle errors**: Storage might fail or be unavailable
3. **Test thoroughly**: Storage works differently than memory
4. **Monitor size**: Know how much data you're storing
5. **Provide feedback**: Tell users when save succeeds/fails
6. **Export option**: Let users backup their data
7. **Lazy loading**: Don't load everything at once for large datasets
8. **Encryption**: Consider security for sensitive data

## Resources

- [MDN: localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [MDN: JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
- [Storage API Spec](https://html.spec.whatwg.org/multipage/webstorage.html)
- [How Much Can You Store](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API#key_characteristics)

## Key Takeaways

- **localStorage persists** data beyond page reloads
- **JSON is the bridge** between objects and strings
- **Always check availability** before using storage
- **Validate on load** to handle corrupted data
- **Save on changes** to keep data in sync
- **Handle quota** exceeded gracefully
- **Serialize carefully** to preserve all data
- **Deserialize safely** with error handling
- **Monitor storage size** to avoid problems
- **Provide user feedback** on storage operations

Good luck! 💾
