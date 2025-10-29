# Exercise 155: Notes Edit & Update

## Overview

Master state mutation and update patterns for note applications. Learn to modify existing notes while maintaining immutability and data integrity. This exercise focuses on updating note properties, managing tags, and implementing validation before changes.

## Series Context

**Series 31: Building a Note-Taking App**
- Exercise 153: Notes Create - Create and validate notes
- Exercise 154: Notes State - Search, filter, and sort notes
- **Exercise 155: Notes Edit** - Update and modify existing notes ← You are here
- Exercise 156: Notes Persist - Save notes to localStorage
- Exercise 157: Notes Undo/Redo - Implement history management

## Learning Objectives

By completing this exercise, you will:
- Implement immutable update patterns using spread operator
- Update nested properties and arrays safely
- Handle tag operations (add, remove, replace)
- Batch update multiple items with conditional logic
- Validate data before applying updates
- Merge data from multiple sources
- Understand why immutability matters
- Practice functional patterns for state management

## Functions to Implement

### 1. updateNote(note, updates)

**Purpose**: Update a note's properties while maintaining immutability

Update any properties of a note without mutating the original. Automatically update `modifiedAt` timestamp.

**Requirements**:
- Create new note object (don't mutate original)
- Apply all updates from updates object
- Update modifiedAt automatically
- Preserve all other properties

**Examples**:
```javascript
const note = { id: 1, title: 'Old', content: 'Text', modifiedAt: oldDate };
updateNote(note, { title: 'New' });
// Returns: { id: 1, title: 'New', content: 'Text', modifiedAt: newDate }
```

**Implementation Pattern**:
```javascript
updateNote(note, updates) {
  return {
    ...note,
    ...updates,
    modifiedAt: new Date()
  };
}
```

---

### 2. updateNoteInList(notes, noteId, updates)

**Purpose**: Update a specific note in an array by ID

Find the note by ID and return a new array with that note updated.

**Requirements**:
- Return new array (don't mutate original)
- Find note by ID
- Update that note only
- Preserve other notes unchanged

**Examples**:
```javascript
const notes = [
  { id: 1, title: 'First' },
  { id: 2, title: 'Second' }
];
updateNoteInList(notes, 1, { title: 'Changed' });
// Returns: [{ id: 1, title: 'Changed' }, { id: 2, title: 'Second' }]
```

**Implementation Pattern**:
```javascript
updateNoteInList(notes, noteId, updates) {
  return notes.map(n =>
    n.id === noteId ? updateNote(n, updates) : n
  );
}
```

---

### 3. updateNoteTitle(note, newTitle)

**Purpose**: Update only the title of a note

**Requirements**:
- Create new note object
- Change only title property
- Update modifiedAt
- Preserve all other properties

**Examples**:
```javascript
updateNoteTitle(note, 'New Title');
// Only title changes, everything else preserved
```

---

### 4. updateNoteContent(note, newContent)

**Purpose**: Update only the content of a note

**Requirements**:
- Create new note object
- Change only content property
- Update modifiedAt
- Preserve all other properties

---

### 5. addTagToNote(note, tag)

**Purpose**: Add a single tag to a note

**Requirements**:
- Create new note object
- Add tag to tags array
- Prevent duplicate tags
- Return unchanged if tag already exists

**Examples**:
```javascript
const note = { tags: ['work'] };
addTagToNote(note, 'urgent');
// Returns: { tags: ['work', 'urgent'] }

// Duplicate prevention
addTagToNote(note, 'work');
// Returns: { tags: ['work'] } unchanged
```

**Implementation Pattern**:
```javascript
addTagToNote(note, tag) {
  return note.tags.includes(tag)
    ? note
    : { ...note, tags: [...note.tags, tag] };
}
```

---

### 6. removeTagFromNote(note, tag)

**Purpose**: Remove a tag from a note

**Requirements**:
- Create new note object
- Remove tag from tags array
- Return unchanged if tag doesn't exist
- Handle empty tags array

**Examples**:
```javascript
removeTagFromNote(note, 'work');
// Returns note without 'work' tag
```

---

### 7. replaceTagInNote(note, oldTag, newTag)

**Purpose**: Replace one tag with another

**Requirements**:
- Create new note object
- Replace oldTag with newTag
- If oldTag doesn't exist, add newTag
- Prevent duplicates

**Examples**:
```javascript
replaceTagInNote(note, 'urgent', 'critical');
// Replaces urgent with critical

replaceTagInNote(note, 'missing', 'new');
// Adds 'new' since 'missing' doesn't exist
```

---

### 8. updateNotesInList(notes, condition, updates)

**Purpose**: Update multiple notes matching a condition

**Requirements**:
- Update only notes where condition(note) returns true
- Return new array
- Apply same updates to all matching notes
- Don't mutate original

**Examples**:
```javascript
// Archive all work notes
updateNotesInList(
  notes,
  n => n.tags.includes('work'),
  { archived: true }
);
```

**Implementation Pattern**:
```javascript
updateNotesInList(notes, condition, updates) {
  return notes.map(n =>
    condition(n) ? updateNote(n, updates) : n
  );
}
```

---

### 9. validateNoteUpdate(note, updates)

**Purpose**: Validate updates before applying them

**Requirements**:
- Check title not empty (if updating)
- Check content not empty (if updating)
- Prevent ID changes
- Prevent createdAt changes
- Return { isValid: boolean, errors: string[] }

**Validation Rules**:
- Title must not be empty string
- Content must not be empty string
- ID is immutable (cannot be changed)
- createdAt is immutable (cannot be changed)
- Tags should be array of strings

**Examples**:
```javascript
validateNoteUpdate(note, { title: 'New' });
// Returns: { isValid: true, errors: [] }

validateNoteUpdate(note, { title: '' });
// Returns: { isValid: false, errors: ['Title cannot be empty'] }

validateNoteUpdate(note, { id: 999 });
// Returns: { isValid: false, errors: ['Cannot change note ID'] }
```

---

### 10. mergeNotes(notes, targetNote)

**Purpose**: Combine content from multiple notes into one

**Requirements**:
- Keep targetNote ID and title
- Combine content from all notes with separators
- Merge tags (remove duplicates)
- Return new merged note

**Examples**:
```javascript
const note1 = { id: 1, title: 'Main', content: 'Part 1', tags: ['a'] };
const note2 = { id: 2, title: 'Extra', content: 'Part 2', tags: ['b'] };
const note3 = { id: 3, title: 'More', content: 'Part 3', tags: ['a'] };

mergeNotes([note2, note3], note1);
// Returns: {
//   id: 1,
//   title: 'Main',
//   content: 'Part 1\n\nPart 2\n\nPart 3',
//   tags: ['a', 'b']
// }
```

---

## Key Concepts

### Immutability with Spread Operator

Always create new objects instead of mutating:

```javascript
// ❌ Wrong - mutates original
note.title = 'New';
note.tags.push('new');

// ✅ Correct - creates new objects
const updated = { ...note, title: 'New' };
const withTag = { ...note, tags: [...note.tags, 'new'] };
```

### Why Immutability Matters

1. **Predictability**: Original data never changes unexpectedly
2. **Debugging**: Easy to track what changed and when
3. **React/Vue**: Required for reactive frameworks to detect changes
4. **Undo/Redo**: History becomes trivial to implement
5. **Concurrent Safety**: Avoid race conditions

### Pattern: Filter and Map

For conditional updates in arrays:

```javascript
// Update matching items
array.map(item =>
  condition(item) ? updateItem(item, updates) : item
)

// Remove items
array.filter(item => !condition(item))
```

### Array Operations

```javascript
// Add without duplicates
[...arr, item].filter((x, i, a) => a.indexOf(x) === i)

// Remove item
arr.filter(x => x !== item)

// Replace item
arr.map(x => x === old ? newVal : x)

// Merge unique items
[...new Set([...arr1, ...arr2])]
```

## Testing Your Implementation

### Run Tests
```bash
npm test
```

### Test Coverage (45+ cases)
- updateNote: basic/multiple updates, non-mutating, timestamp
- updateNoteInList: by ID, preserve others, non-mutating
- updateNoteTitle: update only title
- updateNoteContent: update only content
- addTagToNote: add new, prevent duplicates
- removeTagFromNote: remove existing, handle missing
- replaceTagInNote: replace or add
- updateNotesInList: batch updates, conditions
- validateNoteUpdate: valid/invalid cases, multiple errors
- mergeNotes: combine content/tags, deduplicate
- Integration: chain operations, complex workflows

### Interactive Demo
Open `index.html` to:
- Edit note title and content
- Add and remove tags
- See live statistics update
- Explore function examples

## DaisyUI Components Used

**Form Elements**:
- `.input .input-bordered` - Text inputs
- `.textarea .textarea-bordered` - Multi-line content
- `.label` - Input labels

**Cards & Layout**:
- `.card .card-body` - Content containers
- `.grid .grid-cols-*` - Responsive layout
- `.badge .badge-primary` - Tag display

**Buttons**:
- `.btn .btn-primary` - Primary actions
- `.btn .btn-ghost` - Secondary actions
- `.btn .btn-sm` - Small buttons

**Styling**:
- `.space-y-4` - Vertical spacing
- `.gap-2` - Grid spacing
- `.divider` - Visual separator

All styling via Tailwind utilities - no custom CSS.

## Common Mistakes

### 1. Mutating When Updating
```javascript
// ❌ Wrong
function updateNote(note, updates) {
  Object.assign(note, updates); // Mutates!
  return note;
}

// ✅ Correct
function updateNote(note, updates) {
  return { ...note, ...updates, modifiedAt: new Date() };
}
```

### 2. Not Creating New Arrays
```javascript
// ❌ Wrong for updateNoteInList
notes[index].title = 'New'; // Mutates original array element
return notes;

// ✅ Correct
return notes.map(n =>
  n.id === noteId ? updateNote(n, updates) : n
);
```

### 3. Mutating Tags Array
```javascript
// ❌ Wrong
note.tags.push(newTag); // Mutates!
return note;

// ✅ Correct
return { ...note, tags: [...note.tags, newTag] };
```

### 4. Not Handling Duplicates
```javascript
// ❌ Wrong - allows duplicate tags
addTagToNote(note, tag) {
  return { ...note, tags: [...note.tags, tag] };
}

// ✅ Correct - prevents duplicates
addTagToNote(note, tag) {
  return note.tags.includes(tag)
    ? note
    : { ...note, tags: [...note.tags, tag] };
}
```

### 5. Not Validating Before Update
```javascript
// ❌ Wrong - updates invalid data
updateNote(note, { title: '' });

// ✅ Correct - validate first
const validation = validateNoteUpdate(note, { title: '' });
if (validation.isValid) {
  updateNote(note, { title: '' });
}
```

## Challenge Extensions

1. **Deep Clone Utility**: Handle nested object updates
   ```javascript
   function deepUpdate(obj, path, value) {
     // Update nested properties: deepUpdate(note, 'meta.tags[0]', 'new')
   }
   ```

2. **Change Tracking**: Track what changed
   ```javascript
   function updateWithTracking(note, updates) {
     // Return { updated: note, changes: { title: ['Old', 'New'] } }
   }
   ```

3. **Undo Support**: Keep update history
   ```javascript
   const noteHistory = [];
   function updateAndHistory(note, updates) {
     noteHistory.push(note);
     return updateNote(note, updates);
   }
   ```

4. **Batch Validation**: Validate multiple updates
   ```javascript
   function validateBatch(notes, updates) {
     // Validate all before any apply
   }
   ```

5. **Conflict Resolution**: Handle concurrent updates
   ```javascript
   function mergeUpdates(original, update1, update2) {
     // Resolve conflicts intelligently
   }
   ```

## Progress Checklist

- [ ] Implemented `updateNote` - update properties
- [ ] Implemented `updateNoteInList` - update by ID
- [ ] Implemented `updateNoteTitle` - update title only
- [ ] Implemented `updateNoteContent` - update content only
- [ ] Implemented `addTagToNote` - add with deduplication
- [ ] Implemented `removeTagFromNote` - remove tag
- [ ] Implemented `replaceTagInNote` - replace tag
- [ ] Implemented `updateNotesInList` - batch updates
- [ ] Implemented `validateNoteUpdate` - validation
- [ ] Implemented `mergeNotes` - merge multiple notes
- [ ] All tests passing (45+ cases)
- [ ] Tested interactive HTML demo
- [ ] Understood immutability patterns
- [ ] Mastered spread operator usage
- [ ] Explored challenge extensions

## Next Steps

1. Review implementations for efficiency
2. Test edge cases thoroughly
3. Practice immutable patterns in other contexts
4. Move on to Exercise 156: Notes Persist

## Real-World Applications

These update patterns are used in:
- **Text Editors**: Google Docs, VS Code (track changes, undo/redo)
- **Databases**: MongoDB, Firebase (immutable updates)
- **State Management**: Redux, Vuex (immutable state)
- **Git**: Commit history (immutable history)
- **Collaborative Apps**: Google Sheets (multi-user updates)

## Additional Resources

- [MDN: Spread Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [MDN: Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
- [Immutable.js Documentation](https://immutable-js.com/)
- [Redux: Structuring Reducers](https://redux.js.org/usage/structuring-reducers/immutable-update-patterns)

---

**Last Updated**: January 2024
**Difficulty**: Intermediate
**Time Estimate**: 3-4 hours
**Series**: 31 | Exercise: 155 of 200
