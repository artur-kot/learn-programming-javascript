# Exercise 154: Notes State Management

## Overview

Master advanced state management techniques for note-taking applications. This exercise focuses on searching, filtering, sorting, and analyzing collections of data using functional programming patterns. You'll learn how to manipulate immutable arrays while performing complex queries and transformations.

## Series Context

**Series 31: Building a Note-Taking App**
- Exercise 153: Notes Create - Create and validate notes
- **Exercise 154: Notes State** - Search, filter, and sort notes ← You are here
- Exercise 155: Notes Edit - Update and modify existing notes
- Exercise 156: Notes Persist - Save notes to localStorage
- Exercise 157: Notes Undo/Redo - Implement history management

## Learning Objectives

By completing this exercise, you will:
- Implement search functionality across multiple properties
- Create flexible filtering systems with various criteria
- Develop sorting algorithms for different properties
- Build data aggregation and statistical functions
- Learn to compose complex operations on arrays
- Understand immutable data transformations
- Practice functional programming patterns
- Create reusable filter and query functions

## Functions to Implement

### 1. searchNotes(notes, query)

Search notes by title or content using a query string. Search should be case-insensitive and find partial matches.

**Purpose**: Enable users to quickly find notes by searching text content

**Parameters**:
- `notes`: Array of note objects with `title` and `content` properties
- `query`: Search string (case-insensitive)

**Returns**: Array of matching note objects

**Key Requirements**:
- Case-insensitive search
- Search both title and content
- Return notes that match in either field
- Return empty array if no matches
- Handle empty query gracefully

**Examples**:
```javascript
// Basic search by title
const notes = [
  { id: 1, title: "JavaScript Tips", content: "Learn JS" },
  { id: 2, title: "Python Guide", content: "Python is great" }
];
searchNotes(notes, "python");
// Returns: [{ id: 2, title: "Python Guide", ... }]

// Search by content
searchNotes(notes, "learn");
// Returns: [{ id: 1, title: "JavaScript Tips", ... }]

// Case-insensitive
searchNotes(notes, "JAVASCRIPT");
// Returns: [{ id: 1, ... }]

// Multiple matches
const notes2 = [
  { id: 1, title: "JavaScript", content: "JS tutorial" },
  { id: 2, title: "Guide", content: "JavaScript guide" }
];
searchNotes(notes2, "javascript");
// Returns: [{ id: 1 }, { id: 2 }]
```

**Common Mistakes**:
```javascript
// ❌ Case-sensitive search only
searchNotes(notes, query) {
  return notes.filter(n => n.title === query);
}

// ❌ Doesn't search content
searchNotes(notes, query) {
  return notes.filter(n => n.title.includes(query));
}

// ❌ Not handling case sensitivity
const results = notes.filter(n =>
  n.title.includes(query) || n.content.includes(query)
);

// ✅ Correct implementation
searchNotes(notes, query) {
  const lowerQuery = query.toLowerCase();
  return notes.filter(n =>
    n.title.toLowerCase().includes(lowerQuery) ||
    n.content.toLowerCase().includes(lowerQuery)
  );
}
```

---

### 2. sortNotesByDate(notes, ascending)

Sort notes chronologically by creation date. Does not mutate the original array.

**Purpose**: Allow users to view notes in chronological order

**Parameters**:
- `notes`: Array of note objects with `createdAt` timestamp
- `ascending`: Boolean (true = oldest first, false = newest first)

**Returns**: New sorted array of notes

**Key Requirements**:
- Non-mutating (create new array)
- Correct date ordering
- Support both ascending and descending
- Handle Date objects properly

**Examples**:
```javascript
const notes = [
  { id: 1, title: "First", createdAt: new Date("2024-01-03") },
  { id: 2, title: "Second", createdAt: new Date("2024-01-01") },
  { id: 3, title: "Third", createdAt: new Date("2024-01-02") }
];

// Oldest first (ascending)
sortNotesByDate(notes, true);
// Returns: [id: 2, id: 3, id: 1]

// Newest first (descending)
sortNotesByDate(notes, false);
// Returns: [id: 1, id: 3, id: 2]

// Original unchanged
console.log(notes[0].id); // Still 1
```

**Common Mistakes**:
```javascript
// ❌ Mutates original array
sortNotesByDate(notes, ascending) {
  return notes.sort((a, b) => 
    ascending ? a.createdAt - b.createdAt : b.createdAt - a.createdAt
  );
}

// ❌ Doesn't respect ascending parameter
sortNotesByDate(notes, ascending) {
  const sorted = [...notes];
  sorted.sort((a, b) => a.createdAt - b.createdAt);
  return sorted;
}

// ✅ Correct implementation
sortNotesByDate(notes, ascending) {
  const sorted = [...notes];
  sorted.sort((a, b) => {
    const diff = a.createdAt.getTime() - b.createdAt.getTime();
    return ascending ? diff : -diff;
  });
  return sorted;
}
```

---

### 3. sortNotesByTitle(notes, ascending)

Sort notes alphabetically by title in ascending (A-Z) or descending (Z-A) order.

**Purpose**: Allow alphabetical organization of notes

**Parameters**:
- `notes`: Array of note objects with `title` property
- `ascending`: Boolean (true = A-Z, false = Z-A)

**Returns**: New sorted array of notes

**Key Requirements**:
- Non-mutating
- Case-insensitive sorting
- Alphabetical ordering
- Handle ascending/descending parameter

**Examples**:
```javascript
const notes = [
  { id: 1, title: "Zebra" },
  { id: 2, title: "Apple" },
  { id: 3, title: "Banana" }
];

// A-Z (ascending)
sortNotesByTitle(notes, true);
// Returns: [Apple, Banana, Zebra]

// Z-A (descending)
sortNotesByTitle(notes, false);
// Returns: [Zebra, Banana, Apple]

// Case-insensitive
const mixed = [
  { title: "zebra" },
  { title: "APPLE" },
  { title: "Banana" }
];
sortNotesByTitle(mixed, true);
// Returns: [APPLE, Banana, zebra]
```

**Common Mistakes**:
```javascript
// ❌ Case-sensitive sorting
sortNotesByTitle(notes, ascending) {
  const sorted = [...notes];
  sorted.sort((a, b) => a.title.localeCompare(b.title));
  return sorted;
}

// ❌ Doesn't handle ascending parameter
sortNotesByTitle(notes, ascending) {
  const sorted = [...notes];
  sorted.sort((a, b) =>
    a.title.toLowerCase().localeCompare(b.title.toLowerCase())
  );
  return sorted;
}

// ✅ Correct implementation
sortNotesByTitle(notes, ascending) {
  const sorted = [...notes];
  sorted.sort((a, b) => {
    const comparison = a.title.toLowerCase()
      .localeCompare(b.title.toLowerCase());
    return ascending ? comparison : -comparison;
  });
  return sorted;
}
```

---

### 4. filterNotesByLength(notes, minLength, maxLength)

Filter notes by content length. Return notes where content length is between min and max (inclusive).

**Purpose**: Find notes by content size (short notes, long notes, etc.)

**Parameters**:
- `notes`: Array of note objects with `content` property
- `minLength`: Minimum content length in characters
- `maxLength`: Maximum content length in characters

**Returns**: Array of notes within the specified length range

**Key Requirements**:
- Inclusive range (min and max included)
- Measure by character count
- Return empty array if no matches
- Handle edge cases (0 length, very large numbers)

**Examples**:
```javascript
const notes = [
  { id: 1, content: "Short" },           // 5 chars
  { id: 2, content: "Medium text" },     // 11 chars
  { id: 3, content: "Very long content" } // 17 chars
];

// Short notes only
filterNotesByLength(notes, 0, 10);
// Returns: [id: 1]

// Medium range
filterNotesByLength(notes, 5, 15);
// Returns: [id: 1, id: 2, id: 3]

// Long notes
filterNotesByLength(notes, 15, 100);
// Returns: [id: 3]

// No matches
filterNotesByLength(notes, 1000, 2000);
// Returns: []
```

**Common Mistakes**:
```javascript
// ❌ Exclusive boundaries
filterNotesByLength(notes, minLength, maxLength) {
  return notes.filter(n =>
    n.content.length > minLength && n.content.length < maxLength
  );
}

// ❌ Only checking minimum
filterNotesByLength(notes, minLength, maxLength) {
  return notes.filter(n => n.content.length >= minLength);
}

// ✅ Correct implementation
filterNotesByLength(notes, minLength, maxLength) {
  return notes.filter(n =>
    n.content.length >= minLength && n.content.length <= maxLength
  );
}
```

---

### 5. getNotesByTag(notes, tag)

Get notes that contain a specific tag in their tags array. Search is case-insensitive.

**Purpose**: Filter notes by category or label

**Parameters**:
- `notes`: Array of note objects with `tags` property (array of strings)
- `tag`: Tag to search for (case-insensitive)

**Returns**: Array of notes containing the tag

**Key Requirements**:
- Case-insensitive tag matching
- Find tag in the tags array
- Return empty array if no matches
- Don't return duplicates

**Examples**:
```javascript
const notes = [
  { id: 1, tags: ["work", "important"] },
  { id: 2, tags: ["personal", "todo"] },
  { id: 3, tags: ["work", "reference"] }
];

// Find by tag
getNotesByTag(notes, "work");
// Returns: [id: 1, id: 3]

// Case-insensitive
getNotesByTag(notes, "WORK");
// Returns: [id: 1, id: 3]

// No matches
getNotesByTag(notes, "rust");
// Returns: []
```

**Common Mistakes**:
```javascript
// ❌ Case-sensitive
getNotesByTag(notes, tag) {
  return notes.filter(n => n.tags.includes(tag));
}

// ❌ Comparing whole array
getNotesByTag(notes, tag) {
  return notes.filter(n => n.tags === tag);
}

// ✅ Correct implementation
getNotesByTag(notes, tag) {
  const lowerTag = tag.toLowerCase();
  return notes.filter(n =>
    n.tags.some(t => t.toLowerCase() === lowerTag)
  );
}
```

---

### 6. getNotesStatistics(notes)

Calculate comprehensive statistics about the notes collection.

**Purpose**: Provide insights and analytics about notes data

**Parameters**:
- `notes`: Array of note objects with `content` and `createdAt` properties

**Returns**: Object with properties:
- `totalNotes`: Number of notes
- `totalCharacters`: Sum of all content lengths
- `averageLength`: Average content length (rounded)
- `shortestNote`: Note object with shortest content
- `longestNote`: Note object with longest content
- `mostRecentDate`: Most recent createdAt date
- `oldestDate`: Oldest createdAt date

**Key Requirements**:
- Calculate all statistics correctly
- Handle edge cases (empty array, single note)
- Return actual note objects for shortest/longest
- Properly compare dates

**Examples**:
```javascript
const notes = [
  { id: 1, content: "Hi", createdAt: new Date("2024-01-01") },
  { id: 2, content: "Hello world", createdAt: new Date("2024-01-02") }
];

const stats = getNotesStatistics(notes);
// stats.totalNotes === 2
// stats.totalCharacters === 13 (2 + 11)
// stats.averageLength === 6.5
// stats.shortestNote.id === 1
// stats.longestNote.id === 2
// stats.mostRecentDate.getTime() > stats.oldestDate.getTime()
```

**Common Mistakes**:
```javascript
// ❌ Incomplete statistics
getNotesStatistics(notes) {
  return {
    totalNotes: notes.length,
    totalCharacters: notes.reduce((s, n) => s + n.content.length, 0)
  };
}

// ❌ Wrong average calculation
getNotesStatistics(notes) {
  const total = notes.reduce((s, n) => s + n.content.length, 0);
  const avg = total / notes.length; // Not rounded
  return { totalNotes: notes.length, averageLength: avg };
}

// ✅ Correct implementation
getNotesStatistics(notes) {
  const totalChars = notes.reduce((s, n) => s + n.content.length, 0);
  return {
    totalNotes: notes.length,
    totalCharacters: totalChars,
    averageLength: Math.round(totalChars / notes.length),
    shortestNote: notes.reduce((min, n) =>
      n.content.length < min.content.length ? n : min
    ),
    longestNote: notes.reduce((max, n) =>
      n.content.length > max.content.length ? n : max
    ),
    mostRecentDate: new Date(Math.max(...notes.map(n => n.createdAt))),
    oldestDate: new Date(Math.min(...notes.map(n => n.createdAt)))
  };
}
```

---

### 7. getNotesGroupedByDate(notes)

Group notes by their creation date in YYYY-MM-DD format.

**Purpose**: Organize notes by day for daily views or archives

**Parameters**:
- `notes`: Array of note objects with `createdAt` timestamp

**Returns**: Object where keys are date strings (YYYY-MM-DD) and values are arrays of notes

**Key Requirements**:
- Date format must be YYYY-MM-DD
- Group all notes by their date
- Preserve all notes in groups
- Handle notes created on same day

**Examples**:
```javascript
const notes = [
  { id: 1, createdAt: new Date("2024-01-01T10:00") },
  { id: 2, createdAt: new Date("2024-01-01T14:00") },
  { id: 3, createdAt: new Date("2024-01-02T09:00") }
];

const grouped = getNotesGroupedByDate(notes);
// grouped["2024-01-01"] = [note1, note2]
// grouped["2024-01-02"] = [note3]
```

**Common Mistakes**:
```javascript
// ❌ Wrong date format
getNotesGroupedByDate(notes) {
  return notes.reduce((groups, n) => {
    const key = n.createdAt.toString(); // Wrong format
    if (!groups[key]) groups[key] = [];
    groups[key].push(n);
    return groups;
  }, {});
}

// ❌ Not using YYYY-MM-DD
getNotesGroupedByDate(notes) {
  return notes.reduce((groups, n) => {
    const key = n.createdAt.toLocaleDateString(); // Varies by locale
    if (!groups[key]) groups[key] = [];
    groups[key].push(n);
    return groups;
  }, {});
}

// ✅ Correct implementation
getNotesGroupedByDate(notes) {
  return notes.reduce((groups, n) => {
    const date = n.createdAt.toISOString().split('T')[0]; // YYYY-MM-DD
    if (!groups[date]) groups[date] = [];
    groups[date].push(n);
    return groups;
  }, {});
}
```

---

### 8. getRecentNotes(notes, count)

Get the N most recently created notes in descending order (newest first).

**Purpose**: Show recent notes in a summary or timeline view

**Parameters**:
- `notes`: Array of note objects with `createdAt` timestamp
- `count`: Number of recent notes to retrieve

**Returns**: Array of the N most recent notes (newest first)

**Key Requirements**:
- Return exactly N notes (or fewer if not enough exist)
- Newest first (descending order)
- If count exceeds available notes, return all
- Handle zero or negative count

**Examples**:
```javascript
const notes = [
  { id: 1, createdAt: new Date("2024-01-01") },
  { id: 2, createdAt: new Date("2024-01-02") },
  { id: 3, createdAt: new Date("2024-01-03") }
];

// Get 2 most recent
getRecentNotes(notes, 2);
// Returns: [id: 3, id: 2]

// Get 5 (only 3 exist)
getRecentNotes(notes, 5);
// Returns: [id: 3, id: 2, id: 1] (all notes)

// Get 0
getRecentNotes(notes, 0);
// Returns: []
```

**Common Mistakes**:
```javascript
// ❌ Oldest first instead of newest
getRecentNotes(notes, count) {
  return notes
    .sort((a, b) => a.createdAt - b.createdAt)
    .slice(0, count);
}

// ❌ Doesn't slice to count
getRecentNotes(notes, count) {
  return notes.sort((a, b) => b.createdAt - a.createdAt);
}

// ✅ Correct implementation
getRecentNotes(notes, count) {
  return notes
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, count);
}
```

---

### 9. filterByMultipleTags(notes, tags)

Filter notes that contain ALL specified tags (intersection logic, not union).

**Purpose**: Find notes matching multiple categories simultaneously

**Parameters**:
- `notes`: Array of note objects with `tags` property
- `tags`: Array of tags that notes must contain

**Returns**: Notes that have all specified tags

**Key Requirements**:
- ALL tags must be present (AND logic)
- Case-insensitive matching
- Return empty array if no notes match
- Handle empty tags array (return all notes)

**Examples**:
```javascript
const notes = [
  { id: 1, tags: ["work", "urgent", "meeting"] },
  { id: 2, tags: ["work", "urgent"] },
  { id: 3, tags: ["personal", "urgent"] }
];

// Notes with both "work" AND "urgent"
filterByMultipleTags(notes, ["work", "urgent"]);
// Returns: [id: 1, id: 2]

// Notes with all three tags
filterByMultipleTags(notes, ["work", "urgent", "meeting"]);
// Returns: [id: 1]

// No note has both
filterByMultipleTags(notes, ["work", "personal"]);
// Returns: []

// Empty array returns all
filterByMultipleTags(notes, []);
// Returns: [all notes]
```

**Common Mistakes**:
```javascript
// ❌ OR logic instead of AND
filterByMultipleTags(notes, tags) {
  return notes.filter(n =>
    tags.some(t => n.tags.includes(t))
  );
}

// ❌ Case-sensitive
filterByMultipleTags(notes, tags) {
  return notes.filter(n =>
    tags.every(t => n.tags.includes(t))
  );
}

// ✅ Correct implementation
filterByMultipleTags(notes, tags) {
  if (tags.length === 0) return notes;
  const lowerTags = tags.map(t => t.toLowerCase());
  return notes.filter(n => {
    const noteTags = n.tags.map(t => t.toLowerCase());
    return lowerTags.every(t => noteTags.includes(t));
  });
}
```

---

### 10. createFilteredView(notes, filters)

Create a complex filtered and sorted view by applying multiple criteria in one operation.

**Purpose**: Provide flexible, advanced filtering UI with multiple options

**Parameters**:
- `notes`: Array of note objects
- `filters`: Object with optional properties:
  - `searchQuery`: String to search in title/content
  - `minLength`: Minimum content length
  - `maxLength`: Maximum content length
  - `tags`: Array of tags (ALL must be present)
  - `sortBy`: "date" or "title"
  - `sortOrder`: "asc" or "desc"

**Returns**: Filtered and sorted array of notes

**Key Requirements**:
- Apply all provided filters
- Combine multiple criteria correctly
- Respect sort parameters
- Handle missing filter properties gracefully
- Filter properties are optional

**Examples**:
```javascript
const notes = [
  { id: 1, title: "Project Alpha", content: "..." tags: ["work"], createdAt: new Date("2024-01-05") },
  // ... more notes
];

// Complex filtering
createFilteredView(notes, {
  searchQuery: "project",
  minLength: 50,
  tags: ["work"],
  sortBy: "date",
  sortOrder: "desc"
});
// Returns: Notes matching ALL criteria, sorted by date (newest first)

// Simple filtering (optional properties)
createFilteredView(notes, { searchQuery: "javascript" });
// Returns: All matching notes, unsorted

// Empty filters (returns all)
createFilteredView(notes, {});
// Returns: All notes unchanged
```

**Common Mistakes**:
```javascript
// ❌ Doesn't handle optional properties
createFilteredView(notes, filters) {
  const searched = searchNotes(notes, filters.searchQuery); // Error if undefined
  const filtered = filterNotesByLength(searched, filters.minLength, filters.maxLength);
  return filtered;
}

// ❌ Wrong filter order (inefficient)
createFilteredView(notes, filters) {
  const sorted = sortNotesByDate(notes, ...); // Sort first, then filter
  return filterNotesByLength(sorted, ...);
}

// ✅ Correct implementation
createFilteredView(notes, filters) {
  let result = [...notes];
  
  if (filters.searchQuery) {
    result = searchNotes(result, filters.searchQuery);
  }
  if (filters.minLength !== undefined || filters.maxLength !== undefined) {
    result = filterNotesByLength(
      result,
      filters.minLength ?? 0,
      filters.maxLength ?? Infinity
    );
  }
  if (filters.tags?.length > 0) {
    result = filterByMultipleTags(result, filters.tags);
  }
  
  if (filters.sortBy) {
    const ascending = filters.sortOrder === 'asc';
    if (filters.sortBy === 'date') {
      result = sortNotesByDate(result, ascending);
    } else if (filters.sortBy === 'title') {
      result = sortNotesByTitle(result, ascending);
    }
  }
  
  return result;
}
```

---

## Testing Your Implementation

### Run Tests
```bash
npm test
# or
npm run test
```

### Test Coverage
The test file includes 45+ test cases covering:

**searchNotes** (6 tests)
- Search by title (case-insensitive)
- Search by content
- Multiple matches
- No matches
- Empty query

**sortNotesByDate** (3 tests)
- Ascending order (oldest first)
- Descending order (newest first)
- Non-mutating behavior

**sortNotesByTitle** (3 tests)
- Ascending order (A-Z)
- Descending order (Z-A)
- Case-insensitive sorting

**filterNotesByLength** (4 tests)
- Minimum length filter
- Maximum length filter
- Range filtering
- No matches

**getNotesByTag** (5 tests)
- Single tag matching
- Case-insensitive matching
- Non-existent tags
- No duplicates

**getNotesStatistics** (6 tests)
- Total notes count
- Total characters calculation
- Average length
- Shortest and longest notes
- Date range tracking

**getNotesGroupedByDate** (3 tests)
- Date grouping format
- All notes included
- YYYY-MM-DD format verification

**getRecentNotes** (4 tests)
- Get N most recent
- Newest first order
- Exceed available notes
- Zero count

**filterByMultipleTags** (5 tests)
- All tags present (AND logic)
- No matching notes
- Single tag
- Case-insensitive matching
- Empty tags array

**createFilteredView** (4 tests)
- Search filtering
- Length filtering
- Tag filtering
- Sorting options
- Multiple filter combinations
- Empty filters

### Interactive Demo
Open `index.html` in a browser to:
- Explore the search interface
- See example code for each function
- Understand filter combinations
- Test the filtering logic visually

## Key Concepts

### Immutability
Always create new arrays instead of mutating the original. This prevents bugs and makes code predictable:

```javascript
// ❌ Mutating
function sortNotes(notes) {
  return notes.sort(...);
}

// ✅ Non-mutating
function sortNotes(notes) {
  return [...notes].sort(...);
}
```

### Array Methods
Essential methods for this exercise:
- `.filter()` - Select matching elements
- `.sort()` - Order elements
- `.map()` - Transform elements
- `.reduce()` - Aggregate values
- `.find()` - Get first match
- `.slice()` - Extract portion
- `.includes()` - Check presence
- `.some()` - Check if any match
- `.every()` - Check if all match

### Functional Composition
Build complex operations from simpler ones:

```javascript
// Compose filters
const filtered = filterByTag(
  filterByLength(
    searchNotes(notes, query),
    50, 200
  ),
  'work'
);

// Or use createFilteredView
const filtered = createFilteredView(notes, {
  searchQuery: query,
  minLength: 50,
  maxLength: 200,
  tags: ['work']
});
```

### Case-Insensitive Comparison
Convert to lowercase before comparing:

```javascript
// For strings
const lower1 = str1.toLowerCase();
const lower2 = str2.toLowerCase();
if (lower1 === lower2) { /* match */ }

// For arrays of strings
const tagUpper = 'WORK';
const hasTag = tags.some(t => t.toLowerCase() === tagUpper.toLowerCase());
```

### Date Handling
Work with Date objects correctly:

```javascript
// Get time in milliseconds for comparison
const time1 = date1.getTime();
const time2 = date2.getTime();

// Format date as YYYY-MM-DD
const dateStr = date.toISOString().split('T')[0];

// Sorting by date
const sorted = dates.sort((a, b) => a.getTime() - b.getTime());
```

### Using reduce() for Aggregation
Combine values into a single result:

```javascript
// Count total characters
const total = notes.reduce((sum, n) => sum + n.content.length, 0);

// Find maximum
const max = notes.reduce((current, n) =>
  n.value > current.value ? n : current
);

// Group by property
const grouped = notes.reduce((groups, n) => {
  const key = n.date;
  if (!groups[key]) groups[key] = [];
  groups[key].push(n);
  return groups;
}, {});
```

## Common Mistakes to Avoid

### 1. Mutating Original Arrays
```javascript
// ❌ Wrong
function sort(arr) {
  arr.sort((a, b) => a - b); // Mutates!
  return arr;
}

// ✅ Correct
function sort(arr) {
  return [...arr].sort((a, b) => a - b); // Creates new array
}
```

### 2. Case-Sensitive Comparisons
```javascript
// ❌ Wrong
'JavaScript'.includes('javascript'); // false

// ✅ Correct
'JavaScript'.toLowerCase().includes('javascript'); // true
```

### 3. Forgetting to Handle Edge Cases
```javascript
// ❌ Crashes on empty array
const max = notes.reduce((m, n) => n > m ? n : m);

// ✅ Handle empty array
const max = notes.length > 0 
  ? notes.reduce((m, n) => n > m ? n : m)
  : null;
```

### 4. Confusing AND vs OR Logic
```javascript
// ❌ Wrong for "has ALL tags" (should be AND)
tags.some(t => n.tags.includes(t)); // OR logic

// ✅ Correct for "has ALL tags"
tags.every(t => n.tags.includes(t)); // AND logic
```

### 5. Incorrect Date Formatting
```javascript
// ❌ Wrong format (locale-dependent)
const dateStr = date.toLocaleDateString(); // "1/15/2024" in US

// ✅ Correct format (YYYY-MM-DD)
const dateStr = date.toISOString().split('T')[0]; // "2024-01-15"
```

## DaisyUI Components Used

The interactive demo uses these DaisyUI components:

**Form Components**:
- `.input .input-bordered` - Text input fields
- `.select .select-bordered` - Dropdown selection
- `.form-control` - Form field wrapper
- `.label` - Input labels

**Layout Components**:
- `.card .card-body` - Card containers for content sections
- `.grid .grid-cols-*` - Responsive grid layout
- `.badge` - Tag badges for displaying tags

**Button Components**:
- `.btn .btn-primary` - Primary action button
- `.btn .btn-ghost` - Secondary action button

**Spacing & Styling**:
- `.space-y-4` - Vertical spacing between elements
- `.gap-4` - Grid gap
- `.p-4` - Padding
- `.mb-8` - Margin bottom

All styling is achieved through Tailwind CSS utility classes - no custom CSS required.

## Challenge Extensions

Once you've completed the basic implementation:

1. **Advanced Search**: Implement regex-based searching for power users
   ```javascript
   searchNotesRegex(notes, pattern) {
     const regex = new RegExp(pattern, 'i');
     return notes.filter(n => regex.test(n.title) || regex.test(n.content));
   }
   ```

2. **Full-Text Search**: Search across all properties including tags
   ```javascript
   fullTextSearch(notes, query) {
     return notes.filter(n =>
       JSON.stringify(n).toLowerCase().includes(query.toLowerCase())
     );
   }
   ```

3. **Fuzzy Matching**: Find similar notes even with typos
   ```javascript
   fuzzySearch(notes, query) {
     // Implement Levenshtein distance or similar algorithm
   }
   ```

4. **Sorting Combinations**: Sort by multiple properties
   ```javascript
   sortByMultiple(notes, criteria) {
     // criteria: [{ field: 'date', order: 'desc' }, { field: 'title', order: 'asc' }]
   }
   ```

5. **Performance Optimization**: Memoize complex filter operations
   ```javascript
   const memoizedFilter = memoize(createFilteredView);
   ```

6. **Custom Filters**: Allow users to define custom filter functions
   ```javascript
   filterCustom(notes, predicate) {
     return notes.filter(predicate);
   }
   ```

## Progress Checklist

Track your progress through the exercise:

- [ ] Implemented `searchNotes` - search by title and content
- [ ] Implemented `sortNotesByDate` - chronological ordering
- [ ] Implemented `sortNotesByTitle` - alphabetical ordering
- [ ] Implemented `filterNotesByLength` - by content size
- [ ] Implemented `getNotesByTag` - tag-based filtering
- [ ] Implemented `getNotesStatistics` - calculate aggregate stats
- [ ] Implemented `getNotesGroupedByDate` - organize by date
- [ ] Implemented `getRecentNotes` - get N most recent
- [ ] Implemented `filterByMultipleTags` - AND logic filtering
- [ ] Implemented `createFilteredView` - complex combined filters
- [ ] All tests passing (45+ test cases)
- [ ] Tested with interactive HTML demo
- [ ] Understood immutability concepts
- [ ] Practiced functional array methods
- [ ] Explored challenge extensions

## Next Steps

After completing this exercise:

1. Review your implementations for efficiency and readability
2. Refactor any complex functions into smaller helpers
3. Add JSDoc comments to document your functions
4. Practice chaining these functions in different combinations
5. Think about real-world applications (email filtering, social media feeds, etc.)
6. Move on to Exercise 155: Notes Edit - to implement update functionality

## Real-World Applications

These filtering and sorting techniques are used in:

- **Email Clients**: Gmail, Outlook (search, filter by sender, date range, labels)
- **Task Management**: Todoist, Asana (filter by priority, due date, assignee, tags)
- **E-commerce**: Amazon, eBay (filter by price, rating, seller, category)
- **Music Streaming**: Spotify, Apple Music (search, filter by genre, artist, date added)
- **Document Management**: Google Drive, OneDrive (search, filter by type, date, shared status)
- **Social Media**: Twitter, LinkedIn (search, filter by date, like count, author)
- **Analytics Dashboards**: Complex data filtering and aggregation
- **Content Management**: Wordpress, Medium (search posts, filter by category, date)

## Additional Resources

- [MDN: Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN: Reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [MDN: Date Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [Functional JavaScript](https://eloquentjavascript.net/05_higher_order.html)

---

**Last Updated**: January 2024
**Difficulty**: Intermediate
**Time Estimate**: 3-4 hours
**Series**: 31 | Exercise: 154 of 200
