# Exercise 152: Todo Delete Items

## Overview

This exercise teaches deletion operations with recovery patterns, undo functionality, and trash management. You'll master soft deletes, permanent deletions, and implementing user-friendly recovery workflows.

**Difficulty:** Intermediate  
**Focus Areas:** Deletion Patterns, Undo/Recovery, Trash Management, Data Lifecycle  
**Prerequisites:** Exercise 151 (Mark Complete), immutable updates, filtering  

---

## Learning Outcomes

By completing this exercise, you will:

1. **Delete individual todos** - Remove specific todos by ID
2. **Implement soft delete** - Move todos to trash instead of deleting immediately
3. **Restore from trash** - Recover accidentally deleted todos
4. **Permanent deletion** - Remove todos irreversibly when needed
5. **Manage trash** - Track and empty trash/bin
6. **Support undo** - Restore the last deleted todo
7. **Bulk deletion** - Delete multiple todos at once
8. **Query-based deletion** - Delete based on criteria (e.g., all completed)
9. **Track deletion history** - Keep history for recovery
10. **Handle edge cases** - Empty states, non-existent IDs, etc.

---

## Core Concepts

### 1. Basic Deletion Pattern

Remove a todo from the array:

```javascript
function deleteTodo(todos, id) {
  return todos.filter(todo => todo.id !== id);
}
```

### 2. Soft Delete Pattern

Mark for deletion but keep recoverable:

```javascript
function softDeleteTodo(todos, id) {
  return todos.map(todo =>
    todo.id === id 
      ? { ...todo, deleted: true, deletedAt: new Date().toISOString() }
      : todo
  );
}
```

### 3. Trash/Bin Pattern

Separate deleted items into trash:

```javascript
function softDeleteToTrash(todos, trash, id) {
  const todoToDelete = todos.find(t => t.id === id);
  
  if (!todoToDelete) return { todos, trash };
  
  return {
    todos: todos.filter(t => t.id !== id),
    trash: [...trash, { ...todoToDelete, deletedAt: new Date().toISOString() }]
  };
}
```

### 4. Restore from Trash

Recover deleted todos:

```javascript
function restoreFromTrash(todos, trash, id) {
  const todoToRestore = trash.find(t => t.id === id);
  
  if (!todoToRestore) return { todos, trash };
  
  const restored = { ...todoToRestore };
  delete restored.deleted;
  delete restored.deletedAt;
  
  return {
    todos: [...todos, restored],
    trash: trash.filter(t => t.id !== id)
  };
}
```

### 5. Empty Trash Permanently

Clear all trash:

```javascript
function emptyTrash(trash) {
  return [];
  // Or with confirmation:
  // return confirm('Permanently delete all items?') ? [] : trash;
}
```

### 6. Undo Last Delete

Maintain deletion history:

```javascript
function undoLastDelete(todos, history) {
  if (history.length === 0) return { todos, history };
  
  const lastDelete = history[history.length - 1];
  
  return {
    todos: [...todos, lastDelete.todo],
    history: history.slice(0, -1)
  };
}
```

### 7. Bulk Deletion

Delete multiple todos:

```javascript
function deleteMultiple(todos, ids) {
  return todos.filter(todo => !ids.includes(todo.id));
}
```

### 8. Query-Based Deletion

Delete matching criteria:

```javascript
function deleteByQuery(todos, query) {
  if (query.completed === true) {
    return todos.filter(t => !t.completed);
  }
  return todos;
}
```

### 9. Permanent vs Soft Delete

Semantics matter:

```javascript
// Soft: recoverable
function softDelete(todos, id) {
  return todos.map(t => t.id === id ? { ...t, deleted: true } : t);
}

// Hard: permanent
function permanentDelete(todos, id) {
  return todos.filter(t => t.id !== id);
}
```

### 10. Track Deletion Metadata

Keep audit trail:

```javascript
function deleteWithMetadata(todos, id, userId) {
  const deletedTodo = todos.find(t => t.id === id);
  
  return {
    todos: todos.filter(t => t.id !== id),
    audit: {
      deletedId: id,
      deletedAt: new Date().toISOString(),
      deletedBy: userId,
      deletedData: deletedTodo
    }
  };
}
```

---

## Common Patterns

### Pattern 1: Trash with Recovery UI

```javascript
function renderTrashUI(trash) {
  if (trash.length === 0) return '<p>Trash is empty</p>';
  
  return `
    <div class="trash-section">
      <h3>🗑️ Trash (${trash.length} items)</h3>
      <ul>
        ${trash.map(todo => `
          <li class="trash-item">
            <span>${escapeHtml(todo.title)}</span>
            <button onclick="restore(${todo.id})">Restore</button>
          </li>
        `).join('')}
      </ul>
      <button onclick="emptyTrash()" class="danger">Empty Trash</button>
    </div>
  `;
}
```

### Pattern 2: Confirmation Before Delete

```javascript
function deleteWithConfirmation(todos, id) {
  const todo = todos.find(t => t.id === id);
  const confirmed = confirm(`Delete "${todo.title}"?`);
  
  if (confirmed) {
    return deleteTodo(todos, id);
  }
  return todos;
}
```

### Pattern 3: Undo Stack

```javascript
class TodosWithUndo {
  constructor(todos) {
    this.todos = todos;
    this.history = [];
  }
  
  delete(id) {
    this.history.push({ ...this.todos });
    this.todos = deleteTodo(this.todos, id);
  }
  
  undo() {
    if (this.history.length > 0) {
      this.todos = this.history.pop();
    }
  }
}
```

### Pattern 4: Bulk Delete with Undo

```javascript
function deleteBulkWithHistory(todos, ids, history) {
  // Save current state to history
  const newHistory = [...history, { ...todos }];
  
  // Delete todos
  const updated = todos.filter(t => !ids.includes(t.id));
  
  return { updated, history: newHistory };
}
```

### Pattern 5: Safe Deletion (Validation)

```javascript
function safeDelete(todos, id) {
  const todo = todos.find(t => t.id === id);
  
  if (!todo) {
    console.warn(`Todo ${id} not found`);
    return todos;
  }
  
  // Only delete if not active
  if (todo.completed || todo.archived) {
    return deleteTodo(todos, id);
  }
  
  console.warn(`Cannot delete active todo: ${todo.title}`);
  return todos;
}
```

---

## Implementation Guide

### Step 1: Implement `deleteTodo`

Delete a todo by ID:

```javascript
export function deleteTodo(todos, id) {
  // TODO: Filter out todo with matching id
}
```

### Step 2: Implement `removeT odoById`

Same as delete with different name:

```javascript
export function removeTodoById(todos, id) {
  // TODO: Remove and return updated array
}
```

### Step 3: Implement `deleteMultipleTodos`

Delete by array of IDs:

```javascript
export function deleteMultipleTodos(todos, ids) {
  // TODO: Remove all matching IDs
}
```

### Step 4: Implement `permanentlyDeleteTodo`

Immediate permanent deletion:

```javascript
export function permanentlyDeleteTodo(todos, id) {
  // TODO: Delete immediately without recovery
}
```

### Step 5: Implement `softDeleteTodo`

Move to trash:

```javascript
export function softDeleteTodo(todos, id) {
  // TODO: Mark as deleted or move to trash
}
```

### Step 6: Implement `getDeletedTodos`

Get trash contents:

```javascript
export function getDeletedTodos(trash) {
  // TODO: Return deleted todos
}
```

### Step 7: Implement `restoreDeletedTodo`

Recover from trash:

```javascript
export function restoreDeletedTodo(todos, trash, id) {
  // TODO: Move from trash back to todos
}
```

### Step 8: Implement `emptyTrash`

Permanently delete trash:

```javascript
export function emptyTrash(trash) {
  // TODO: Clear trash
}
```

### Step 9: Implement `undoLastDelete`

Support undo:

```javascript
export function undoLastDelete(todos, history) {
  // TODO: Restore from history
}
```

### Step 10: Implement `deleteByQuery`

Delete by criteria:

```javascript
export function deleteByQuery(todos, query) {
  // TODO: Delete matching query
}
```

---

## Testing Strategy

### Test 1: Basic Deletion

```javascript
it('should delete a todo', () => {
  const todos = [
    { id: 1, title: 'Task 1' },
    { id: 2, title: 'Task 2' }
  ];
  
  const result = deleteTodo(todos, 1);
  expect(result).toHaveLength(1);
  expect(result[0].id).toBe(2);
});
```

### Test 2: Immutability

```javascript
it('should not modify original array', () => {
  const todos = [{ id: 1, title: 'Task' }];
  deleteTodo(todos, 1);
  
  expect(todos).toHaveLength(1);
});
```

### Test 3: Bulk Deletion

```javascript
it('should delete multiple todos', () => {
  const todos = [
    { id: 1 }, { id: 2 }, { id: 3 }
  ];
  
  const result = deleteMultipleTodos(todos, [1, 3]);
  expect(result).toHaveLength(1);
});
```

### Test 4: Query Deletion

```javascript
it('should delete by query', () => {
  const todos = [
    { id: 1, completed: true },
    { id: 2, completed: false }
  ];
  
  const result = deleteByQuery(todos, { completed: true });
  expect(result).toHaveLength(1);
});
```

---

## Real-World Usage Examples

### Example 1: Todo App with Trash

```javascript
class TodoAppWithTrash {
  constructor(todos) {
    this.todos = todos;
    this.trash = [];
  }
  
  delete(id) {
    const todo = this.todos.find(t => t.id === id);
    this.todos = this.todos.filter(t => t.id !== id);
    this.trash.push(todo);
  }
  
  restore(id) {
    const todo = this.trash.find(t => t.id === id);
    this.todos.push(todo);
    this.trash = this.trash.filter(t => t.id !== id);
  }
  
  emptyTrash() {
    this.trash = [];
  }
}
```

### Example 2: Undo/Redo Deletion

```javascript
class TodosWithUndoRedo {
  constructor(todos) {
    this.current = todos;
    this.undoStack = [];
    this.redoStack = [];
  }
  
  delete(id) {
    this.undoStack.push([...this.current]);
    this.current = deleteTodo(this.current, id);
    this.redoStack = [];
  }
  
  undo() {
    if (this.undoStack.length > 0) {
      this.redoStack.push([...this.current]);
      this.current = this.undoStack.pop();
    }
  }
  
  redo() {
    if (this.redoStack.length > 0) {
      this.undoStack.push([...this.current]);
      this.current = this.redoStack.pop();
    }
  }
}
```

---

## Summary

This exercise teaches you to:

- **Delete immutably** while preserving data integrity
- **Implement trash/recovery** workflows for safety
- **Support undo operations** for user-friendly deletion
- **Handle bulk operations** efficiently
- **Query-based deletion** with flexible criteria
- **Track audit trails** for compliance
- **Manage lifecycle** from active to deleted to purged
- **Provide safe UX** with confirmations and recovery

These patterns are essential for robust data management applications.

---

## Functions to Implement

| # | Function | Purpose |
|---|----------|---------|
| 1 | `deleteTodo(todos, id)` | Delete specific todo |
| 2 | `removeTodoById(todos, id)` | Remove todo variant |
| 3 | `softDeleteTodo(todos, id)` | Move to trash |
| 4 | `restoreDeletedTodo(todos, trash, id)` | Recover from trash |
| 5 | `emptyTrash(trash)` | Clear all trash |
| 6 | `getDeletedTodos(trash)` | Get trash contents |
| 7 | `undoLastDelete(todos, history)` | Undo deletion |
| 8 | `permanentlyDeleteTodo(todos, id)` | Permanent delete |
| 9 | `deleteMultipleTodos(todos, ids)` | Delete multiple |
| 10 | `deleteByQuery(todos, query)` | Delete by criteria |

---

## Acceptance Criteria

✓ All 10 functions implemented and exported  
✓ All 40+ test cases passing  
✓ Delete todos correctly and immutably  
✓ Implement soft delete with trash  
✓ Support restore from trash  
✓ Implement undo functionality  
✓ Handle bulk deletions  
✓ Support query-based deletion  
✓ Track deletion history  
✓ Handle edge cases gracefully  
✓ HTML demo with 8 interactive sections  
✓ CSS with trash and recovery styling  
✓ No console errors or warnings
