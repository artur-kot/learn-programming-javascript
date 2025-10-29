# Exercise 157: Notes Undo/Redo & History

## Overview

Master advanced state management with history tracking, time travel debugging, and undo/redo operations. This exercise teaches you how to implement a complete history system that allows users to navigate through previous application states.

**What You'll Learn:**
- History manager pattern and state snapshots
- Undo/redo stack implementation
- Time travel debugging concepts
- State branching and re-history
- Memory optimization with max history limits
- Integration with UI state management

**Series Context:**
- Series: 31 (Notes Application)
- Position: Exercise 157 (Final - Part 5/5)
- Difficulty: Advanced
- Prerequisites: Exercises 153-156

---

## Core Concepts

### What is a History Manager?

A history manager is a data structure that maintains a collection of application states at different points in time. It allows users to:
- Move backward to a previous state (undo)
- Move forward after undo (redo)
- View current state
- Track all historical states
- Check capabilities (can undo/redo)

**Real-World Examples:**
- Code editors (VS Code, Sublime Text)
- Graphic design tools (Photoshop, Figma)
- Document editors (Google Docs, Word)
- Games with save/load functionality
- Browser back/forward buttons

### Key Components

**1. State Snapshot**
A complete copy of the application state at a moment in time.

```javascript
// State snapshot examples
const snapshot1 = [
  { id: 1, title: "Learn History", completed: false }
];

const snapshot2 = [
  { id: 1, title: "Learn History", completed: true },
  { id: 2, title: "Implement Undo", completed: false }
];
```

**2. History Stack**
An array maintaining all snapshots with a current position pointer.

```javascript
{
  states: [snapshot1, snapshot2, snapshot3],
  currentIndex: 1  // Currently at snapshot2
}
```

**3. Undo Operation**
Move the pointer backward (decrease currentIndex).

```javascript
// Before undo: currentIndex = 2
// After undo: currentIndex = 1
// User sees: snapshot2
```

**4. Redo Operation**
Move the pointer forward (increase currentIndex).

```javascript
// Before redo: currentIndex = 1
// After redo: currentIndex = 2
// User sees: snapshot3
```

### History Branching

When a user makes an action after undoing, the redo history is discarded (branching):

```javascript
// Initial path: A → B → C → D
// User undoes twice: A → B (D and C discarded)
// User makes new action: A → B → E
// Redo history is gone (C, D no longer accessible)
```

This prevents confusion about which timeline is "correct."

### Memory Optimization

History managers should respect a `maxHistory` limit to prevent excessive memory usage:

```javascript
// With maxHistory = 3:
// Push state1: [state1]
// Push state2: [state1, state2]
// Push state3: [state1, state2, state3]
// Push state4: [state2, state3, state4]  ← state1 removed
```

---

## Function Specifications

### 1. `createHistoryManager(initialState, maxHistory = 50)`

Initialize a new history manager with an optional initial state and maximum history size.

**Parameters:**
- `initialState` (any): The starting state (can be null, array, object, etc.)
- `maxHistory` (number, optional): Maximum states to keep (default: 50)

**Returns:**
- (object): History manager with structure:
  ```javascript
  {
    states: [initialState],
    currentIndex: 0
  }
  ```

**Key Requirements:**
- Always initialize with currentIndex = 0
- Store initialState as the first state
- Should handle any data type for initialState
- maxHistory defaults to 50 if not provided
- Should validate maxHistory is a positive number

**Example:**
```javascript
const history = createHistoryManager([], 50);
// { states: [[]], currentIndex: 0 }

const history = createHistoryManager({ notes: [] });
// { states: [{ notes: [] }], currentIndex: 0 }

const history = createHistoryManager(null);
// { states: [null], currentIndex: 0 }
```

**Common Mistakes:**
- Starting with an empty states array (should have initialState)
- Not storing maxHistory for later enforcement
- Initializing currentIndex to something other than 0
- Not validating maxHistory parameter

**Testing:** 5 tests
- Initialize with array state
- Initialize with object state
- Default maxHistory to 50
- No undo available initially
- No redo available initially

---

### 2. `pushState(history, newState)`

Add a new state to history. This discards any redo history and enforces maxHistory limit.

**Parameters:**
- `history` (object): The history manager
- `newState` (any): The new state to add

**Returns:**
- (boolean): True if state added successfully

**Key Requirements:**
- Slice history to current position (discard redo states)
- Add newState to end of states array
- Move currentIndex to the new state
- Enforce maxHistory limit by removing oldest states
- Return true on success

**Example:**
```javascript
const history = createHistoryManager([]);
pushState(history, [{ id: 1 }]);
// states: [[], [{ id: 1 }]], currentIndex: 1

pushState(history, [{ id: 1 }, { id: 2 }]);
// states: [[], [{ id: 1 }], [{ id: 1 }, { id: 2 }]], currentIndex: 2
```

**Redo Branch Example:**
```javascript
// Before: states: [A, B, C], currentIndex: 2 (at C)
// Undo: states: [A, B, C], currentIndex: 1 (at B)
// Push D: states: [A, B, D], currentIndex: 2 (C discarded!)
```

**Common Mistakes:**
- Not slicing history before adding (keeping redo states)
- Not updating currentIndex to new position
- Not enforcing maxHistory limit
- Modifying the history object incorrectly
- Not returning a boolean

**Testing:** 6 tests
- Add state to empty history
- Enable undo after push
- Push multiple states sequentially
- Discard redo states on new push
- Enforce maxHistory limit
- Return true on success

---

### 3. `undo(history)`

Move the current position backward to the previous state.

**Parameters:**
- `history` (object): The history manager

**Returns:**
- (any): The previous state (or null if can't undo)

**Key Requirements:**
- Only move if currentIndex > 0
- Decrease currentIndex by 1
- Return the state at new position
- Enable redo capability
- Return null if can't undo

**Example:**
```javascript
const history = createHistoryManager(null);
pushState(history, 'state1');
pushState(history, 'state2');
// states: [null, 'state1', 'state2'], currentIndex: 2

const prev = undo(history);
// states: [null, 'state1', 'state2'], currentIndex: 1
// returns: 'state1'
```

**Common Mistakes:**
- Not checking if at start (currentIndex === 0)
- Not returning the previous state
- Modifying the states array
- Not respecting currentIndex boundaries

**Testing:** 5 tests
- Move back from middle position
- Enable redo after undo
- Can't undo at start
- Multiple undos in sequence
- Return correct state value

---

### 4. `redo(history)`

Move the current position forward to the next state after an undo.

**Parameters:**
- `history` (object): The history manager

**Returns:**
- (any): The next state (or null if can't redo)

**Key Requirements:**
- Only move if currentIndex < states.length - 1
- Increase currentIndex by 1
- Return the state at new position
- Return null if can't redo
- After reaching end, disable redo

**Example:**
```javascript
// states: [null, 'state1', 'state2'], currentIndex: 1

const next = redo(history);
// states: [null, 'state1', 'state2'], currentIndex: 2
// returns: 'state2'
```

**Common Mistakes:**
- Not checking if at end
- Not returning the next state
- Off-by-one errors with currentIndex
- Modifying the states array

**Testing:** 5 tests
- Move forward from middle position
- Can't redo at end
- Disable redo when reaching end
- Multiple redos in sequence
- Return correct state value

---

### 5. `getCurrentState(history)`

Retrieve the state at the current history position.

**Parameters:**
- `history` (object): The history manager

**Returns:**
- (any): The current state

**Key Requirements:**
- Return states[currentIndex]
- Should always return a value (never undefined)
- Work after any operation (push, undo, redo)

**Example:**
```javascript
const history = createHistoryManager('initial');
// getCurrentState(history) → 'initial'

pushState(history, 'modified');
// getCurrentState(history) → 'modified'

undo(history);
// getCurrentState(history) → 'initial'
```

**Common Mistakes:**
- Returning undefined
- Not using currentIndex correctly
- Returning a reference instead of the value

**Testing:** 4 tests
- Get initial state
- Get state after push
- Get state after undo
- Get state after redo

---

### 6. `getHistory(history)`

Get all states from the beginning to the current position (excluding redo states).

**Parameters:**
- `history` (object): The history manager

**Returns:**
- (array): Array of states from start to current

**Key Requirements:**
- Return slice from index 0 to currentIndex + 1
- Do not include redo states (after currentIndex)
- Return a new array (not reference)
- Should include initial state

**Example:**
```javascript
const history = createHistoryManager(null);
pushState(history, 'state1');
pushState(history, 'state2');
pushState(history, 'state3');
// states: [null, 'state1', 'state2', 'state3'], currentIndex: 3

getHistory(history);
// [null, 'state1', 'state2', 'state3']

undo(history);  // currentIndex: 2
getHistory(history);
// [null, 'state1', 'state2']  ← state3 excluded
```

**Common Mistakes:**
- Including redo states (states after currentIndex)
- Not including the initial state
- Using slice incorrectly (off-by-one)
- Modifying the original states array

**Testing:** 3 tests
- Get full history without undo
- Exclude redo states after undo
- Return empty-like history for initial state

---

### 7. `canUndo(history)`

Check whether an undo operation is currently available.

**Parameters:**
- `history` (object): The history manager

**Returns:**
- (boolean): True if undo is available, false otherwise

**Key Requirements:**
- Return true if currentIndex > 0
- Return false if at start
- Should always return a boolean
- Pure function (no side effects)

**Example:**
```javascript
const history = createHistoryManager('initial');
canUndo(history);  // false (at start)

pushState(history, 'state1');
canUndo(history);  // true (can go back)

undo(history);
canUndo(history);  // false (back at start)
```

**Common Mistakes:**
- Returning null or undefined
- Using >= or <= instead of correct operators
- Modifying history state

**Testing:** 4 tests
- Initially false
- True after push
- False at start position
- True at middle positions

---

### 8. `canRedo(history)`

Check whether a redo operation is currently available.

**Parameters:**
- `history` (object): The history manager

**Returns:**
- (boolean): True if redo is available, false otherwise

**Key Requirements:**
- Return true if currentIndex < states.length - 1
- Return false if at end
- Should always return a boolean
- Pure function (no side effects)

**Example:**
```javascript
const history = createHistoryManager('initial');
canRedo(history);  // false (no redo available)

pushState(history, 'state1');
canRedo(history);  // false (at end)

undo(history);
canRedo(history);  // true (can go forward)

redo(history);
canRedo(history);  // false (back at end)
```

**Common Mistakes:**
- Returning null or undefined
- Off-by-one errors with array length
- Not handling the case properly

**Testing:** 4 tests
- Initially false
- False after push (at end)
- True after undo
- False after redo (back at end)

---

### 9. `clearHistory(history)`

Clear all history and reset to the current state as the only state.

**Parameters:**
- `history` (object): The history manager

**Returns:**
- (boolean): True if cleared successfully

**Key Requirements:**
- Preserve the current state
- Set states to only [currentState]
- Reset currentIndex to 0
- Return true
- After clear, canUndo and canRedo should be false

**Example:**
```javascript
const history = createHistoryManager(null);
pushState(history, 'state1');
pushState(history, 'state2');
// states: [null, 'state1', 'state2'], currentIndex: 2

clearHistory(history);
// states: ['state2'], currentIndex: 0
// canUndo(history) → false
// canRedo(history) → false
```

**Workflow Example:**
```javascript
undo(history);  // currentIndex: 1
clearHistory(history);
// Discards state2, keeps state1 as new root
// states: ['state1'], currentIndex: 0
```

**Common Mistakes:**
- Losing the current state
- Not resetting currentIndex to 0
- Not returning boolean
- Clearing entire history without preserving current

**Testing:** 4 tests
- Clear history successfully
- Preserve current state after clear
- Return true
- Disable undo/redo after clear

---

### 10. `getHistoryStats(history)`

Get detailed statistics about the current history state.

**Parameters:**
- `history` (object): The history manager

**Returns:**
- (object): Statistics object with properties:
  - `currentIndex` (number): Current position
  - `totalStates` (number): Total states stored
  - `undoCount` (number): Number of undo steps available
  - `redoCount` (number): Number of redo steps available

**Key Requirements:**
- Return object with exactly 4 properties
- currentIndex: Direct value from history
- totalStates: Length of states array
- undoCount: currentIndex (steps to go back)
- redoCount: totalStates - currentIndex - 1

**Example:**
```javascript
const history = createHistoryManager(null);
pushState(history, 'state1');
pushState(history, 'state2');
pushState(history, 'state3');

getHistoryStats(history);
// {
//   currentIndex: 3,
//   totalStates: 4,
//   undoCount: 3,
//   redoCount: 0
// }

undo(history);
getHistoryStats(history);
// {
//   currentIndex: 2,
//   totalStates: 4,
//   undoCount: 2,
//   redoCount: 1
// }
```

**Math Formula:**
- `undoCount = currentIndex`
- `redoCount = totalStates - currentIndex - 1`

**Common Mistakes:**
- Wrong property names
- Incorrect calculations for undo/redo counts
- Off-by-one errors in counts
- Not including all 4 properties

**Testing:** 5 tests
- All properties present
- Initial state stats
- Stats after push operations
- Stats after undo operation
- Stats with active redo count

---

## Integration Tests

Beyond testing individual functions, comprehensive test suites should verify:

**Test Categories:**

1. **Complete Workflow** (3 tests)
   - Initialize → Push → Undo → Redo → Clear
   - Verify state at each step
   - Check stats progression

2. **Branching Behavior** (3 tests)
   - Push states → Undo → Push different state
   - Verify redo history discarded
   - Verify new path preserved

3. **Max History Limit** (2 tests)
   - Create with maxHistory = 5
   - Push 10 states
   - Verify oldest removed
   - Verify currentIndex adjusted

4. **Edge Cases** (3 tests)
   - Rapid undo/redo succession
   - Large state objects
   - Null/undefined handling

5. **State Integrity** (2 tests)
   - Verify deep copies (if needed)
   - Verify state consistency after operations
   - Verify no mutations

6. **Capability Checks** (2 tests)
   - Verify canUndo/canRedo at all positions
   - Verify buttons can be enabled/disabled correctly
   - Verify UI state consistency

---

## Common Mistakes & Solutions

### ❌ Mistake 1: Not Slicing Before Push
```javascript
// WRONG
pushState(history, newState) {
  history.states.push(newState);  // Keeps redo!
  history.currentIndex++;
}

// CORRECT
pushState(history, newState) {
  history.states = history.states.slice(0, history.currentIndex + 1);
  history.states.push(newState);
  history.currentIndex++;
}
```

### ❌ Mistake 2: Off-by-One Errors
```javascript
// WRONG
canRedo(history) {
  return history.currentIndex <= history.states.length - 1;
}

// CORRECT
canRedo(history) {
  return history.currentIndex < history.states.length - 1;
}
```

### ❌ Mistake 3: Forgetting Max History
```javascript
// WRONG
pushState(history, newState) {
  history.states.slice(0, history.currentIndex + 1);
  history.states.push(newState);
  history.currentIndex++;
  // History grows unbounded!
}

// CORRECT
pushState(history, newState) {
  history.states.slice(0, history.currentIndex + 1);
  history.states.push(newState);
  
  if (history.states.length > history.maxHistory) {
    history.states.shift();
    history.currentIndex--;
  }
  
  history.currentIndex++;
}
```

### ❌ Mistake 4: Modifying State References
```javascript
// WRONG
pushState(history, newState) {
  history.states.push(newState);  // Stores reference!
  // If newState modified later, history also changes
}

// CORRECT (for objects)
pushState(history, newState) {
  history.states.push(JSON.parse(JSON.stringify(newState)));
  // Deep copy prevents external modifications
}
```

### ❌ Mistake 5: Wrong Boundary Checks
```javascript
// WRONG
undo(history) {
  if (history.currentIndex > 1) {  // Should be > 0
    history.currentIndex--;
  }
}

// CORRECT
undo(history) {
  if (history.currentIndex > 0) {
    history.currentIndex--;
  }
}
```

---

## Real-World Applications

### 1. Text Editor
```javascript
// User types characters
undo();  // Ctrl+Z
redo();  // Ctrl+Y
```

### 2. Drawing Application
```javascript
// Each brush stroke is a state
// User can undo/redo drawings
// Max history prevents memory issues
```

### 3. Game State
```javascript
// Save state before risky action
// Load previous state if failed
// Undo/redo puzzle moves
```

### 4. Configuration Tool
```javascript
// Change settings → Preview
// Undo to previous settings
// Redo if changed mind
```

### 5. Time Travel Debugging
```javascript
// Record all state changes
// Step through history
// Inspect state at any point
```

---

## Implementation Patterns

### Pattern 1: Immutable State Management
```javascript
// Create new state, don't modify existing
const newState = {
  ...previousState,
  title: 'Updated'
};

pushState(history, newState);
```

### Pattern 2: State Snapshots
```javascript
// Create complete snapshot at each action
const snapshot = JSON.parse(JSON.stringify(currentState));
pushState(history, snapshot);
```

### Pattern 3: Storing Deltas (Advanced)
```javascript
// Instead of full state, store changes
// More memory efficient for large states
const change = { fieldChanged: 'title', oldValue: 'A', newValue: 'B' };
pushState(history, change);
```

### Pattern 4: UI State Binding
```javascript
// After undo/redo, update UI
const newState = undo(history);
if (newState) {
  renderNotes(newState);
  updateButtons(history);
}
```

---

## Advanced Topics

### Undo/Redo Stack vs Timeline
- **Stack Model**: Linear backward/forward (most common)
- **Tree Model**: Branching history (more complex but more flexible)

### Memory Optimization
- Implement maxHistory limit
- Use compression for large states
- Store deltas instead of full states
- Periodic cleanup of old states

### Persistent History
- Save history to localStorage
- Serialize history to JSON
- Load history on app restart
- Implement history export/import

### Collaborative History
- Merge undo/redo from multiple users
- Preserve causal ordering
- Handle conflicts in branching
- Synchronize history across clients

---

## Challenge Extensions

### Extension 1: Named Checkpoints
Add ability to mark important states with names:
```javascript
createCheckpoint(history, name)
jumpToCheckpoint(history, name)
listCheckpoints(history)
```

### Extension 2: History Branching Support
Instead of discarding redo, maintain multiple branches:
```javascript
getBranches(history)
switchBranch(history, branchId)
mergeBranches(history, branchId1, branchId2)
```

### Extension 3: State Compression
Store only differences between states:
```javascript
createDeltaHistory()
pushStateDelta(history, delta)
getFullStateAt(history, index)
```

### Extension 4: Time Travel UI
Visual timeline showing all states:
```javascript
// Interactive slider to jump to any state
// Preview shows state at that point
// Click to restore
```

### Extension 5: History Export
Save history to file and load later:
```javascript
exportHistory(history) → JSON
importHistory(json) → history
validateHistoryData(json) → boolean
```

---

## Testing Checklist

### Unit Tests (45+)

**createHistoryManager (5 tests)**
- [ ] Initialize with array state
- [ ] Initialize with object state
- [ ] Set maxHistory default to 50
- [ ] No undo available initially
- [ ] No redo available initially

**pushState (6 tests)**
- [ ] Add state to empty history
- [ ] Enable undo after push
- [ ] Push multiple states sequentially
- [ ] Discard redo states on new push
- [ ] Enforce maxHistory limit
- [ ] Return true on success

**undo (5 tests)**
- [ ] Move back from middle position
- [ ] Enable redo after undo
- [ ] Can't undo at start
- [ ] Multiple undos in sequence
- [ ] Return correct state value

**redo (5 tests)**
- [ ] Move forward from middle position
- [ ] Can't redo at end
- [ ] Disable redo when reaching end
- [ ] Multiple redos in sequence
- [ ] Return correct state value

**getCurrentState (4 tests)**
- [ ] Get initial state
- [ ] Get state after push
- [ ] Get state after undo
- [ ] Get state after redo

**getHistory (3 tests)**
- [ ] Get full history without undo
- [ ] Exclude redo states after undo
- [ ] Include initial state

**canUndo (4 tests)**
- [ ] Initially false
- [ ] True after push
- [ ] False at start position
- [ ] True at middle positions

**canRedo (4 tests)**
- [ ] Initially false
- [ ] False after push (at end)
- [ ] True after undo
- [ ] False after redo (back at end)

**clearHistory (4 tests)**
- [ ] Clear history successfully
- [ ] Preserve current state after clear
- [ ] Return true
- [ ] Disable undo/redo after clear

**getHistoryStats (5 tests)**
- [ ] All properties present
- [ ] Initial state stats
- [ ] Stats after push operations
- [ ] Stats after undo operation
- [ ] Stats with active redo count

**Integration Tests (6+ tests)**
- [ ] Complete workflow: push → undo → redo → clear
- [ ] Branching: push → undo → push different
- [ ] Max limit enforcement
- [ ] Rapid undo/redo succession
- [ ] State integrity throughout
- [ ] UI capability checks

---

## Progress Checklist

**Foundational Understanding**
- [ ] Understand history manager concept
- [ ] Understand state snapshots
- [ ] Understand undo/redo mechanism
- [ ] Understand history branching
- [ ] Understand maxHistory limits

**Function Implementation**
- [ ] createHistoryManager working
- [ ] pushState working with branching
- [ ] undo working correctly
- [ ] redo working correctly
- [ ] getCurrentState working
- [ ] getHistory working (excluding redo)
- [ ] canUndo working
- [ ] canRedo working
- [ ] clearHistory working
- [ ] getHistoryStats working

**Testing**
- [ ] All unit tests passing
- [ ] All integration tests passing
- [ ] Edge cases covered
- [ ] No off-by-one errors
- [ ] Memory limits enforced

**Integration**
- [ ] Works with notes app data
- [ ] UI buttons enable/disable correctly
- [ ] States render properly after undo/redo
- [ ] Clear history works as expected

**Extensions**
- [ ] Consider checkpoint feature
- [ ] Consider branching support
- [ ] Consider state compression
- [ ] Consider history persistence
- [ ] Consider export/import

---

## Additional Resources

### Concepts
- **State Management**: Understanding application state
- **Data Structures**: Stack and queue patterns
- **Time Travel Debugging**: Chrome DevTools Redux debugging

### Tools & Libraries
- **Redux Time Travel**: Redux DevTools for state history
- **Immer.js**: Immutable state management
- **Recoil**: State management with time travel
- **Zustand**: Simple state with history support

### Real Examples
- **VS Code**: Undo/redo implementation
- **Git**: Commit history (branching model)
- **Figma**: Design state history
- **Photoshop**: Layer history panel

---

## Series 31: Complete Learning Path

**Exercise 153: Notes Create**
✅ Create, read, delete notes
✅ DOM rendering and form handling
✅ Basic validation and formatting

**Exercise 154: Notes State**
✅ Search, filter, sort operations
✅ Advanced array methods (map, filter, reduce)
✅ Data aggregation and statistics

**Exercise 155: Notes Edit**
✅ Update operations with immutability
✅ Tag management and manipulation
✅ Validation of updates

**Exercise 156: Notes Persist**
✅ localStorage integration
✅ JSON serialization and deserialization
✅ Backup and restore functionality

**Exercise 157: Notes Undo/Redo** (This Exercise)
✅ History management and state snapshots
✅ Time travel navigation
✅ Complete state management system

**Next Steps**: Series 32 will explore advanced concepts like:
- Real database integration
- API communication
- Authentication and authorization
- Real-time synchronization
- Performance optimization

---

## Quick Reference

### Quick API Reference

```javascript
// Initialize
const h = createHistoryManager([], 50);

// Add state
pushState(h, newNotes);

// Navigate
undo(h);
redo(h);

// Query
getCurrentState(h);
getHistory(h);
canUndo(h);
canRedo(h);

// Manage
clearHistory(h);
getHistoryStats(h);

// Stats structure
// {
//   currentIndex: 0,
//   totalStates: 1,
//   undoCount: 0,
//   redoCount: 0
// }
```

### Quick Test Template

```javascript
import { describe, it, expect } from 'vitest';
import { createHistoryManager, pushState, undo } from './157-notes-undo.js';

describe('History Manager', () => {
  it('should initialize with state', () => {
    const h = createHistoryManager([]);
    expect(h.states[0]).toEqual([]);
    expect(h.currentIndex).toBe(0);
  });

  it('should push new state', () => {
    const h = createHistoryManager([]);
    pushState(h, [{ id: 1 }]);
    expect(h.states.length).toBe(2);
    expect(h.currentIndex).toBe(1);
  });
});
```

---

**Exercise Created:** 2024
**Last Updated:** Series 31, Part 5/5
**Difficulty Level:** Advanced
**Estimated Time:** 120-180 minutes
**Status:** Ready for Implementation

---

*End of Exercise 157: Notes Undo/Redo & History*
