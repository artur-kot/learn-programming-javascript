# Exercise 115: Live Search Filter - Debounce Input

Delay search execution until user stops typing using debounce.

## Concepts

- **Debounce Pattern** - Delay function execution until activity stops
- **setTimeout** - Schedule delayed execution
- **clearTimeout** - Cancel scheduled execution
- **Performance Optimization** - Reduce unnecessary operations
- **Delayed Execution** - Wait before running function
- **Closure** - Capture timeout reference
- **Higher-order Functions** - Functions that return functions

## What You're Learning

Debouncing delays function execution until a pause in activity. This is crucial for performance when handling frequent events like typing. In this exercise, you'll:
- Implement debounce pattern
- Use setTimeout and clearTimeout
- Cancel previous timeouts
- Optimize search performance
- Create debounced search functions
- Handle rapid user input efficiently

**Debounce Pattern:**
```javascript
function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Usage
const debouncedSearch = debounce(search, 300);
input.addEventListener('input', () => {
  debouncedSearch(input.value);
});
```

## Challenge

Implement debounce logic to delay search until user stops typing, improving performance with large datasets.

## Functions to Implement

### `debounce(func, delay)`
Create debounced version of a function.

**Parameters:**
- `func` - Function to debounce
- `delay` - Delay in milliseconds

**Returns:**
- Debounced function

**Implementation:**
```javascript
let timeoutId;

return function(...args) {
  clearTimeout(timeoutId);
  
  timeoutId = setTimeout(() => {
    func.apply(this, args);
  }, delay);
};
```

### `clearDebounceTimeout(timeoutId)`
Clear pending debounced execution.

**Parameters:**
- `timeoutId` - Timeout ID to clear

**Implementation:**
```javascript
clearTimeout(timeoutId);
```

### `getDebounceDelay(itemCount)`
Get appropriate debounce delay based on item count.

**Parameters:**
- `itemCount` - Number of items to search

**Returns:**
- Delay in milliseconds

**Implementation Pattern:**
```javascript
if (itemCount < 100) return 200;
if (itemCount < 1000) return 300;
return 500;
```

### `createDebouncedSearch(items, resultsContainer, delay)`
Create debounced search function.

**Parameters:**
- `items` - Items to search
- `resultsContainer` - Container for results
- `delay` - Debounce delay

**Returns:**
- Debounced search function

**Implementation:**
```javascript
return debounce((searchTerm) => {
  const filtered = items.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );
  displayResults(resultsContainer, filtered);
}, delay);
```

### `setupDebouncedInput(input, items, resultsContainer, delay)`
Setup input listener with debounce.

**Parameters:**
- `input` - Input element
- `items` - Items to search
- `resultsContainer` - Container for results
- `delay` - Debounce delay

**Implementation:**
```javascript
const debouncedSearch = createDebouncedSearch(items, resultsContainer, delay);

input.addEventListener('input', (event) => {
  const searchTerm = event.target.value;
  debouncedSearch(searchTerm);
});
```

## Debounce vs Throttle

**Debounce:**
```javascript
// Waits until activity stops
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Only executes after user stops typing for 300ms
const debouncedSearch = debounce(search, 300);
```

**Throttle:**
```javascript
// Executes at most once per interval
function throttle(func, interval) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= interval) {
      lastCall = now;
      func(...args);
    }
  };
}

// Executes at most once every 300ms
const throttledSearch = throttle(search, 300);
```

**Use Debounce For:**
- Search input
- Window resize
- Auto-save
- Form validation

**Use Throttle For:**
- Scroll events
- Mouse movement
- Animation frames
- Rate limiting

## setTimeout and clearTimeout

**Basic usage:**
```javascript
// Schedule execution
const timeoutId = setTimeout(() => {
  console.log('Executed after 1 second');
}, 1000);

// Cancel execution
clearTimeout(timeoutId);
```

**With arguments:**
```javascript
function greet(name, greeting) {
  console.log(`${greeting}, ${name}!`);
}

const timeoutId = setTimeout(greet, 1000, 'Alice', 'Hello');
// After 1 second: "Hello, Alice!"
```

**Clearing in debounce:**
```javascript
let timeoutId;

function debounce(func, delay) {
  return function(...args) {
    clearTimeout(timeoutId); // Cancel previous
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
```

## Closure in Debounce

**How it works:**
```javascript
function debounce(func, delay) {
  let timeoutId; // Captured in closure
  
  return function(...args) {
    // This function has access to timeoutId
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const debounced1 = debounce(fn1, 300); // Own timeoutId
const debounced2 = debounce(fn2, 300); // Separate timeoutId
```

**Each call creates new closure:**
```javascript
const search1 = debounce(searchProducts, 300);
const search2 = debounce(searchUsers, 300);

// Independent timers
search1('query'); // Has own timeoutId
search2('query'); // Different timeoutId
```

## Performance Benefits

**Without debounce:**
```javascript
input.addEventListener('input', (e) => {
  search(e.target.value); // Runs on EVERY keystroke
});

// Typing "javascript" = 10 searches!
// j -> ja -> jav -> java -> javas -> javasc -> javascr -> javascri -> javascrip -> javascript
```

**With debounce:**
```javascript
const debouncedSearch = debounce(search, 300);

input.addEventListener('input', (e) => {
  debouncedSearch(e.target.value); // Waits until typing stops
});

// Typing "javascript" = 1 search!
// Only searches after 300ms pause
```

**Performance comparison:**
```javascript
// 1000 items, typing speed 100ms/char
// "programming" = 11 characters

// Without debounce: 11 searches × 1000 items = 11,000 operations
// With debounce (300ms): 1 search × 1000 items = 1,000 operations
// 91% reduction!
```

## Common Patterns

**Basic debounce:**
```javascript
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
```

**With immediate execution:**
```javascript
function debounce(func, delay, immediate = false) {
  let timeoutId;
  return function(...args) {
    const callNow = immediate && !timeoutId;
    
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (!immediate) func(...args);
    }, delay);
    
    if (callNow) func(...args);
  };
}
```

**With cancel method:**
```javascript
function debounce(func, delay) {
  let timeoutId;
  
  const debounced = function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
  
  debounced.cancel = function() {
    clearTimeout(timeoutId);
  };
  
  return debounced;
}

// Usage
const debouncedSearch = debounce(search, 300);
input.addEventListener('input', () => debouncedSearch());
clearBtn.addEventListener('click', () => debouncedSearch.cancel());
```

## Tips

- Use 200-500ms delay for search input
- Clear timeout before setting new one
- Use closure to store timeout ID
- Consider throttle for scroll/resize events
- Debounce API calls to reduce server load
- Can debounce any function, not just search
- Adjust delay based on dataset size
- Test with fake timers in unit tests
- Remember each debounced function has own timer

## Common Mistakes

**Forgetting to clear previous timeout:**
```javascript
// BAD - Creates multiple timers
function debounce(func, delay) {
  return function(...args) {
    setTimeout(() => func(...args), delay);
  };
}

// GOOD - Clears previous
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
```

**Not using closure:**
```javascript
// BAD - timeoutId is global
let timeoutId;
function debounce1(func, delay) {
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Both share same timeoutId!
const d1 = debounce1(fn1, 300);
const d2 = debounce1(fn2, 300);
```

## Next Steps

Once complete, move to [exercise 116](../116-search-highlight) where you'll implement text highlighting in search results.
