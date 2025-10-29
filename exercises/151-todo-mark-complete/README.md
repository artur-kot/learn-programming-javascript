# Exercise 151: Todo Mark Complete

## Overview

This exercise teaches toggling todo completion status, managing visual feedback, and synchronizing state changes with storage. You'll master state mutations, filtering, progress tracking, and user interaction patterns.

**Difficulty:** Intermediate  
**Focus Areas:** State Updates, Completion Management, Visual Feedback, Storage Sync  
**Prerequisites:** Exercise 150 (Load Storage), state immutability, DOM updates  

---

## Learning Outcomes

By completing this exercise, you will:

1. **Toggle completion status** - Switch todo completion state between true and false
2. **Manage immutable updates** - Change state without mutating original data
3. **Filter by status** - Separate completed from pending todos
4. **Track progress** - Calculate completion statistics and percentages
5. **Render state changes** - Update DOM when completion status changes
6. **Sync with storage** - Save completion changes to localStorage
7. **Handle bulk operations** - Mark multiple todos or all todos
8. **Provide visual feedback** - Show completion with styling (strikethrough, colors)
9. **Count statistics** - Track completed, pending, and total counts
10. **Support user interactions** - React to checkbox clicks and toggle buttons

---

## Core Concepts

### 1. Toggling Completion Status

Toggle changes the state from complete to pending or vice versa:

```javascript
function toggleTodoStatus(todos, id) {
  return todos.map(todo => 
    todo.id === id 
      ? { ...todo, completed: !todo.completed }
      : todo
  );
}
```

### 2. Immutable State Updates

Always create new objects/arrays, never modify originals:

```javascript
// Good: Immutable update
const updated = todos.map(todo => 
  todo.id === 1 
    ? { ...todo, completed: true }
    : todo
);

// Bad: Mutating original
todos[0].completed = true; // Don't do this!
```

### 3. Filtering by Completion

Separate todos into groups:

```javascript
function getCompletedTodos(todos) {
  return todos.filter(todo => todo.completed === true);
}

function getPendingTodos(todos) {
  return todos.filter(todo => todo.completed === false);
}
```

### 4. Progress Calculation

Calculate completion percentage:

```javascript
function getTodoCompletionStats(todos) {
  const completed = todos.filter(t => t.completed).length;
  const total = todos.length;
  const percentage = total === 0 ? 0 : (completed / total) * 100;
  
  return {
    completed,
    pending: total - completed,
    total,
    percentage: Math.round(percentage)
  };
}
```

### 5. Visual Feedback with CSS

Style completed todos:

```css
.todo-item.completed {
  opacity: 0.6;
  background: #f0fdf4;
}

.todo-item.completed .todo-title {
  text-decoration: line-through;
  color: #999;
}
```

### 6. Storage Synchronization

Save changes to localStorage:

```javascript
function updateCompletionInStorage(todos) {
  try {
    localStorage.setItem('todos', JSON.stringify(todos));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

### 7. Rendering Completion State

Render with completion class:

```javascript
function renderCompletedState(todo) {
  const status = todo.completed ? 'completed' : 'pending';
  return `
    <li class="todo-item ${status}">
      <span class="todo-title">${escapeHtml(todo.title)}</span>
      <span class="todo-status ${status}">
        ${todo.completed ? '✓ Complete' : '○ Pending'}
      </span>
    </li>
  `;
}
```

### 8. Counting Statistics

Track all completion metrics:

```javascript
function countCompleted(todos) {
  const completed = todos.filter(t => t.completed).length;
  
  return {
    completed,
    pending: todos.length - completed,
    total: todos.length
  };
}
```

### 9. Filtering with Criteria

Support flexible filtering:

```javascript
function filterByCompletion(todos, criteria) {
  if (criteria.completed === true) {
    return todos.filter(t => t.completed === true);
  } else if (criteria.completed === false) {
    return todos.filter(t => t.completed === false);
  }
  return todos;
}
```

### 10. Mark Complete vs Toggle

Mark has different semantics:

```javascript
// Mark complete: always sets to true
function markTodoComplete(todos, id) {
  return todos.map(todo =>
    todo.id === id ? { ...todo, completed: true } : todo
  );
}

// Unmark: always sets to false
function uncompleteTodo(todos, id) {
  return todos.map(todo =>
    todo.id === id ? { ...todo, completed: false } : todo
  );
}
```

---

## Common Patterns

### Pattern 1: Toggle with Immediate Storage

```javascript
function toggleTodoAndSave(todos, id) {
  // Toggle state
  const updated = toggleTodoStatus(todos, id);
  
  // Save immediately
  const result = updateCompletionInStorage(updated);
  
  // Return with status
  return {
    todos: updated,
    saved: result.success,
    error: result.error
  };
}
```

### Pattern 2: Bulk Operations

```javascript
function markAllComplete(todos) {
  return todos.map(todo => ({
    ...todo,
    completed: true
  }));
}

function markAllPending(todos) {
  return todos.map(todo => ({
    ...todo,
    completed: false
  }));
}
```

### Pattern 3: Progress Tracking

```javascript
function trackProgress(todos) {
  const stats = getTodoCompletionStats(todos);
  
  console.log(`Progress: ${stats.completed}/${stats.total} (${stats.percentage}%)`);
  
  return {
    completed: stats.percentage === 100,
    inProgress: stats.percentage > 0 && stats.percentage < 100,
    notStarted: stats.percentage === 0
  };
}
```

### Pattern 4: Render with Progress Bar

```javascript
function renderTodoWithProgress(todos) {
  const stats = getTodoCompletionStats(todos);
  
  return `
    <div class="progress-container">
      <div class="progress-label">
        <span>${stats.completed}/${stats.total}</span>
        <span>${stats.percentage}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${stats.percentage}%"></div>
      </div>
    </div>
  `;
}
```

### Pattern 5: Render Individual Todo with Status

```javascript
function renderTodoListWithStatus(todos) {
  return todos.map(todo => `
    <li class="todo-item ${todo.completed ? 'completed' : 'pending'}">
      <input type="checkbox" ${todo.completed ? 'checked' : ''} />
      <span class="todo-text">${escapeHtml(todo.title)}</span>
      <span class="todo-status">
        ${todo.completed ? '✓' : '○'}
      </span>
    </li>
  `).join('');
}
```

---

## Implementation Guide

### Step 1: Implement `markTodoComplete`

Mark a specific todo as complete:

```javascript
export function markTodoComplete(todos, id) {
  // TODO: Return todos with specified todo marked as complete
}
```

### Step 2: Implement `toggleTodoStatus`

Toggle between complete and pending:

```javascript
export function toggleTodoStatus(todos, id) {
  // TODO: Toggle completed status of specified todo
}
```

### Step 3: Implement `uncompleteTodo`

Mark a completed todo back as pending:

```javascript
export function uncompleteTodo(todos, id) {
  // TODO: Mark todo as pending (completed: false)
}
```

### Step 4: Implement `getCompletedTodos`

Get all completed todos:

```javascript
export function getCompletedTodos(todos) {
  // TODO: Filter and return only completed todos
}
```

### Step 5: Implement `getPendingTodos`

Get all pending todos:

```javascript
export function getPendingTodos(todos) {
  // TODO: Filter and return only pending todos
}
```

### Step 6: Implement `countCompleted`

Count completed, pending, and total:

```javascript
export function countCompleted(todos) {
  // TODO: Return object with completed, pending, total
}
```

### Step 7: Implement `getTodoCompletionStats`

Get comprehensive completion statistics:

```javascript
export function getTodoCompletionStats(todos) {
  // TODO: Return stats with completed, pending, total, percentage
}
```

### Step 8: Implement `renderCompletedState`

Render todo with completion styling:

```javascript
export function renderCompletedState(todo) {
  // TODO: Return HTML/string representing todo with status
}
```

### Step 9: Implement `filterByCompletion`

Filter todos by criteria:

```javascript
export function filterByCompletion(todos, criteria) {
  // TODO: Filter todos based on criteria object
}
```

### Step 10: Implement `updateCompletionInStorage`

Save completion changes to storage:

```javascript
export function updateCompletionInStorage(todos) {
  // TODO: Save todos to localStorage and return status
}
```

---

## Testing Strategy

### Test 1: Toggle Completion

```javascript
it('should toggle todo status', () => {
  const todos = [{ id: 1, title: 'Task', completed: false }];
  const updated = toggleTodoStatus(todos, 1);
  
  expect(updated[0].completed).toBe(true);
});
```

### Test 2: Mark Complete

```javascript
it('should mark todo as complete', () => {
  const todos = [{ id: 1, title: 'Task', completed: false }];
  const updated = markTodoComplete(todos, 1);
  
  expect(updated[0].completed).toBe(true);
});
```

### Test 3: Filter Todos

```javascript
it('should filter completed todos', () => {
  const todos = [
    { id: 1, completed: true },
    { id: 2, completed: false }
  ];
  
  const completed = getCompletedTodos(todos);
  expect(completed).toHaveLength(1);
});
```

### Test 4: Count Statistics

```javascript
it('should calculate statistics correctly', () => {
  const todos = [
    { id: 1, completed: true },
    { id: 2, completed: true },
    { id: 3, completed: false }
  ];
  
  const stats = getTodoCompletionStats(todos);
  expect(stats.completed).toBe(2);
  expect(stats.percentage).toBe(67); // rounded
});
```

### Test 5: Immutability

```javascript
it('should not modify original array', () => {
  const todos = [{ id: 1, completed: false }];
  toggleTodoStatus(todos, 1);
  
  expect(todos[0].completed).toBe(false);
});
```

---

## Real-World Usage Examples

### Example 1: Todo App with Checkbox Toggle

```javascript
class TodoApp {
  constructor(todos) {
    this.todos = todos;
    this.render();
  }
  
  handleCheckbox(id) {
    // Toggle completion
    this.todos = toggleTodoStatus(this.todos, id);
    
    // Save changes
    updateCompletionInStorage(this.todos);
    
    // Update stats
    this.updateStats();
    
    // Rerender
    this.render();
  }
  
  updateStats() {
    const stats = getTodoCompletionStats(this.todos);
    document.getElementById('stats').innerHTML = `
      ${stats.completed} / ${stats.total} complete (${stats.percentage}%)
    `;
  }
  
  render() {
    const list = document.getElementById('todoList');
    list.innerHTML = this.todos.map((todo, idx) => `
      <li class="todo-item ${todo.completed ? 'completed' : ''}">
        <input type="checkbox" ${todo.completed ? 'checked' : ''} 
          onchange="app.handleCheckbox(${todo.id})" />
        <span>${escapeHtml(todo.title)}</span>
      </li>
    `).join('');
  }
}
```

### Example 2: Progress Bar with Completion Stats

```javascript
function renderProgressBar(todos) {
  const stats = getTodoCompletionStats(todos);
  
  const percent = stats.percentage;
  const colors = {
    high: percent >= 75 ? 'green' : 'orange',
    text: percent === 100 ? 'success' : 'warning'
  };
  
  return `
    <div class="progress-section">
      <h3>Your Progress</h3>
      <div class="stats">
        <span class="stat-completed">${stats.completed}</span>
        <span>/</span>
        <span class="stat-total">${stats.total}</span>
        <span class="stat-percent">(${percent}%)</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${percent}%"></div>
      </div>
    </div>
  `;
}
```

### Example 3: Filter View with Completion

```javascript
function createFilterView(todos) {
  const completed = getCompletedTodos(todos);
  const pending = getPendingTodos(todos);
  
  return {
    showAll: () => todos,
    showCompleted: () => completed,
    showPending: () => pending,
    getStats: () => getTodoCompletionStats(todos)
  };
}

const view = createFilterView(todos);
console.log('Pending:', view.showPending()); // Only pending
console.log('Stats:', view.getStats()); // All statistics
```

### Example 4: Bulk Completion with Undo

```javascript
class UndoableTodos {
  constructor(todos) {
    this.history = [todos];
    this.currentIndex = 0;
  }
  
  markAllComplete() {
    const updated = this.history[this.currentIndex]
      .map(t => ({ ...t, completed: true }));
    
    this.history.push(updated);
    this.currentIndex++;
    
    updateCompletionInStorage(updated);
    return updated;
  }
  
  undo() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      const todos = this.history[this.currentIndex];
      updateCompletionInStorage(todos);
      return todos;
    }
    return this.history[this.currentIndex];
  }
  
  getCurrent() {
    return this.history[this.currentIndex];
  }
}
```

### Example 5: Completion Milestone Notifications

```javascript
function notifyMilestones(todos, previousStats) {
  const currentStats = getTodoCompletionStats(todos);
  
  const milestones = [25, 50, 75, 100];
  
  milestones.forEach(milestone => {
    if (previousStats.percentage < milestone && 
        currentStats.percentage >= milestone) {
      console.log(`🎉 You've reached ${milestone}% completion!`);
    }
  });
  
  return currentStats;
}
```

---

## Debugging Tips

### Check Completion Status

```javascript
function debugCompletion(todos) {
  todos.forEach(todo => {
    console.log(`${todo.id}: ${todo.title} - ${todo.completed ? '✓' : '○'}`);
  });
}
```

### Verify Statistics

```javascript
function debugStats(todos) {
  const stats = getTodoCompletionStats(todos);
  console.table({
    'Completed': stats.completed,
    'Pending': stats.pending,
    'Total': stats.total,
    'Percentage': `${stats.percentage}%`
  });
}
```

### Monitor Storage Updates

```javascript
function debugStorageUpdate(todos) {
  const before = localStorage.getItem('todos');
  updateCompletionInStorage(todos);
  const after = localStorage.getItem('todos');
  
  console.log('Before:', JSON.parse(before).filter(t => t.id === 1));
  console.log('After:', JSON.parse(after).filter(t => t.id === 1));
}
```

---

## Edge Cases to Handle

1. **Empty todos** - Handle empty arrays gracefully
2. **Invalid ID** - Searching for non-existent todo
3. **Already complete** - Marking already complete todo
4. **Already pending** - Uncompleting already pending todo
5. **Storage full** - Handle quota errors when saving
6. **Concurrent updates** - Multiple tabs updating storage
7. **Large datasets** - Many todos to filter/process
8. **Missing properties** - Todo without `completed` property
9. **Type mismatches** - `completed` is not boolean
10. **DOM rendering** - Hundreds of todos to render

---

## Summary

This exercise teaches you to:

- **Toggle states** immutably while preserving data
- **Filter and group** todos by completion status
- **Track progress** with statistics and percentages
- **Render changes** with visual feedback and styling
- **Synchronize** completion changes to storage
- **Bulk operations** for marking multiple todos
- **Provide statistics** for progress tracking
- **Handle interactions** from user events
- **Debug completion** workflows systematically
- **Support undo/redo** for state changes

These patterns are fundamental for interactive todo applications and any state management system.

---

## Functions to Implement

| # | Function | Purpose |
|---|----------|---------|
| 1 | `markTodoComplete(todos, id)` | Mark specific todo as complete |
| 2 | `toggleTodoStatus(todos, id)` | Toggle completion status |
| 3 | `uncompleteTodo(todos, id)` | Mark completed todo as pending |
| 4 | `getCompletedTodos(todos)` | Get all completed todos |
| 5 | `getPendingTodos(todos)` | Get all pending todos |
| 6 | `renderCompletedState(todo)` | Render todo with completion state |
| 7 | `updateCompletionInStorage(todos)` | Save to localStorage |
| 8 | `filterByCompletion(todos, criteria)` | Filter by completion |
| 9 | `countCompleted(todos)` | Count completed and pending |
| 10 | `getTodoCompletionStats(todos)` | Get comprehensive stats |

---

## Acceptance Criteria

✓ All 10 functions implemented and exported  
✓ All 40+ test cases passing  
✓ Toggle completion status correctly  
✓ Preserve immutability in updates  
✓ Filter todos by completion status  
✓ Calculate statistics accurately  
✓ Save changes to localStorage  
✓ Render with visual feedback  
✓ Handle edge cases gracefully  
✓ Support bulk operations  
✓ HTML demo with 9 interactive sections  
✓ CSS with completion styling  
✓ No console errors or warnings
