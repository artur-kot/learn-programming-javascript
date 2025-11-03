# Exercise 113: Live Search Filter - Input Event

Filter a list as the user types in an input field.

## Concepts

- **Input Event** - Triggered when input value changes
- **Real-time Filtering** - Update results instantly as user types
- **Search Functionality** - Find matching items in a list
- **String Matching** - Compare strings for partial matches
- **Dynamic Filtering** - Filter content based on criteria
- **Input Value Access** - Get and use input field value
- **List Filtering** - Show only matching items

## What You're Learning

Input events enable real-time search and filtering. In this exercise, you'll:
- Listen to input events on search field
- Filter items by search term
- Update results as user types
- Handle case-insensitive matching
- Display filtered results dynamically
- Show appropriate feedback when no results match

**Input Event Pattern:**
```javascript
const input = document.getElementById('search-input');

input.addEventListener('input', (event) => {
  const searchTerm = event.target.value;
  const filtered = items.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );
  displayResults(filtered);
});
```

## Challenge

Implement functions to filter items based on search input. Update results in real-time as user types.

## Functions to Implement

### `getInputValue(input)`
Get current value from input field.

**Parameters:**
- `input` - Input element

**Returns:**
- Current input value (trimmed)

**Implementation:**
```javascript
return input.value.trim();
```

### `filterItems(items, searchTerm)`
Filter items array by search term.

**Parameters:**
- `items` - Array of items to search
- `searchTerm` - Search term to filter by

**Returns:**
- Filtered array of matching items

**Implementation:**
```javascript
const lowerTerm = searchTerm.toLowerCase();
return items.filter(item =>
  item.toLowerCase().includes(lowerTerm)
);
```

### `clearResults(resultsContainer)`
Clear results container.

**Parameters:**
- `resultsContainer` - Container element to clear

**Implementation:**
```javascript
resultsContainer.innerHTML = '';
```

### `displayResults(resultsContainer, items)`
Display filtered items in results container.

**Parameters:**
- `resultsContainer` - Container to display results in
- `items` - Items to display

**Implementation Pattern:**
```javascript
clearResults(resultsContainer);

if (items.length === 0) {
  resultsContainer.innerHTML = '<div class="no-results">No results found</div>';
} else {
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'result-item';
    div.textContent = item;
    resultsContainer.appendChild(div);
  });
}
```

### `setupSearchListener(input, resultsContainer, items)`
Setup input event listener for real-time filtering.

**Parameters:**
- `input` - Input element
- `resultsContainer` - Container for results
- `items` - Items to search in

**Implementation Pattern:**
```javascript
input.addEventListener('input', (event) => {
  const searchTerm = getInputValue(input);
  const filtered = filterItems(items, searchTerm);
  displayResults(resultsContainer, filtered);
});
```

## Input Event vs Change Event

**Input Event:**
```javascript
// Fires on every keystroke/change
input.addEventListener('input', () => {
  // Real-time updates
});
```

**Change Event:**
```javascript
// Fires only when focus leaves element
input.addEventListener('change', () => {
  // After user finishes editing
});
```

**For live search, use 'input'!**

## Case-Insensitive Matching

**Pattern:**
```javascript
const searchTerm = 'APPLE'.toLowerCase(); // 'apple'
const item = 'Apple'.toLowerCase();       // 'apple'

if (item.includes(searchTerm)) {
  // Matches!
}
```

## String Matching Methods

**includes() - Partial match:**
```javascript
'javascript'.includes('script') // true
'javascript'.includes('java')   // true
'javascript'.includes('xyz')    // false
```

**startsWith() - Begins with:**
```javascript
'javascript'.startsWith('java') // true
'javascript'.startsWith('script') // false
```

**match() - Regex matching:**
```javascript
'javascript'.match(/^java/i) // matches
```

**indexOf() - Find position:**
```javascript
'javascript'.indexOf('script') // 4 (found)
'javascript'.indexOf('xyz')    // -1 (not found)
```

## Display Filtered Results

**Basic pattern:**
```javascript
function displayResults(container, items) {
  container.innerHTML = '';
  
  if (items.length === 0) {
    container.innerHTML = '<p>No results</p>';
    return;
  }
  
  items.forEach(item => {
    const div = document.createElement('div');
    div.textContent = item;
    container.appendChild(div);
  });
}
```

**With item count:**
```javascript
function displayResults(container, items) {
  container.innerHTML = '';
  
  if (items.length === 0) {
    container.innerHTML = '<p>No results found</p>';
  } else {
    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'result-item';
      div.textContent = item;
      container.appendChild(div);
    });
    
    const count = document.createElement('div');
    count.className = 'result-count';
    count.textContent = `${items.length} result(s)`;
    container.appendChild(count);
  }
}
```

## Performance Considerations

**Search on input:**
```javascript
// Runs for every keystroke - could be slow with large lists
input.addEventListener('input', () => {
  const results = items.filter(item => item.includes(search));
});
```

**Better: Use debounce (Exercise 115):**
```javascript
// Wait until user stops typing before searching
let timeout;
input.addEventListener('input', () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    const results = filterItems(items, search);
  }, 300);
});
```

## Tips

- Use 'input' event for real-time updates
- Make search case-insensitive
- Trim input to remove extra whitespace
- Show "no results" message when appropriate
- Display item count for feedback
- Use includes() for partial matching
- Filter as user types for immediate feedback
- Consider debouncing for large lists (later exercise)

## Common Patterns

**Basic search:**
```javascript
const searchInput = document.getElementById('search');
const resultsList = document.getElementById('results');
const items = ['apple', 'banana', 'cherry'];

searchInput.addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = items.filter(item =>
    item.toLowerCase().includes(term)
  );
  
  resultsList.innerHTML = filtered
    .map(item => `<div>${item}</div>`)
    .join('');
});
```

**With template creation:**
```javascript
searchInput.addEventListener('input', (e) => {
  const term = e.target.value;
  const filtered = filterItems(items, term);
  
  resultsList.innerHTML = '';
  filtered.forEach(item => {
    const div = document.createElement('div');
    div.textContent = item;
    resultsList.appendChild(div);
  });
});
```

## Next Steps

Once complete, move to [exercise 114](../114-search-prevent) where you'll handle form submission without page reload.
