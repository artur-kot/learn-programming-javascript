# Exercise 135: Data Pipeline - Array Construction

Master **Array.from()** and **Array.of()** for creating and converting arrays. Transform various data types into arrays for processing.

## Overview

In this exercise, you'll learn the fundamental array construction methods that convert iterables, array-like objects, and other data structures into proper arrays. This is essential for data transformation pipelines.

### What You'll Learn

- **Array.from()**: Converting iterables to arrays
- **Array.of()**: Creating arrays from arguments
- **Iterables**: Strings, Sets, Maps, and custom iterables
- **Array-like objects**: Objects with length property
- **Mapping during construction**: Transforming values while creating arrays
- **Practical conversions**: Strings, Sets, Maps, and sequences

## Key Concepts

### Array.from() Basics

**Array.from()** converts iterables and array-like objects to arrays:

```javascript
// From string
Array.from('hello');
// ['h', 'e', 'l', 'l', 'o']

// From Set
Array.from(new Set([1, 2, 3]));
// [1, 2, 3]

// From Map
Array.from(new Map([['a', 1], ['b', 2]]));
// [['a', 1], ['b', 2]]

// From array-like object
const arrayLike = { 0: 'a', 1: 'b', length: 2 };
Array.from(arrayLike);
// ['a', 'b']
```

### Array.from() with Mapping

Pass a mapping function as the second argument:

```javascript
// Create [1, 2, 3, 4, 5]
Array.from({ length: 5 }, (_, i) => i + 1);
// [1, 2, 3, 4, 5]

// Create [2, 4, 6, 8, 10]
Array.from({ length: 5 }, (_, i) => (i + 1) * 2);
// [2, 4, 6, 8, 10]

// Transform string to uppercase
Array.from('hello', char => char.toUpperCase());
// ['H', 'E', 'L', 'L', 'O']
```

### Array.of() vs Array Constructor

```javascript
// Array constructor - confusing with single number
new Array(3);      // [empty × 3]
Array.of(3);       // [3]

// With multiple arguments
new Array(1, 2, 3);  // [1, 2, 3]
Array.of(1, 2, 3);   // [1, 2, 3]

// Array.of always treats arguments as elements
Array.of(1);         // [1]
new Array(1);        // [empty]
```

### Converting Different Types

#### String to Array

```javascript
// String is iterable
const str = 'hello';
const chars = Array.from(str);
// ['h', 'e', 'l', 'l', 'o']

// Or use spread operator
const chars2 = [...str];
// Same result
```

#### Set to Array

```javascript
const set = new Set([1, 2, 2, 3, 3, 3]);
const arr = Array.from(set);
// [1, 2, 3] - duplicates removed

// Or with spread
const arr2 = [...set];
// Same result
```

#### Map to Array

```javascript
const map = new Map([['a', 1], ['b', 2]]);
const arr = Array.from(map);
// [['a', 1], ['b', 2]]

// Transform during conversion
const entries = Array.from(map, ([key, value]) => ({ key, value }));
// [{ key: 'a', value: 1 }, { key: 'b', value: 2 }]
```

### Creating Sequences

#### Creating Ranges

```javascript
// Range from 1 to 5
const range = Array.from({ length: 5 }, (_, i) => i + 1);
// [1, 2, 3, 4, 5]

// Range with step
const evens = Array.from({ length: 5 }, (_, i) => (i + 1) * 2);
// [2, 4, 6, 8, 10]

// Custom ranges
const range = (start, end) => 
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

range(3, 7); // [3, 4, 5, 6, 7]
```

#### Creating Matrices

```javascript
// 3x3 matrix with 0s
const matrix = Array.from({ length: 3 }, () =>
  Array.from({ length: 3 }, () => 0)
);

// Multiplication table
const table = Array.from({ length: 10 }, (_, row) =>
  Array.from({ length: 10 }, (_, col) => (row + 1) * (col + 1))
);
```

### Array-Like Objects

```javascript
// DOM collection (array-like)
const elements = document.querySelectorAll('.item');
const arr = Array.from(elements); // Convert to real array

// Arguments object (array-like)
function example(...args) {
  const arr = Array.from(args);
}

// Custom array-like
const arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};
Array.from(arrayLike); // ['a', 'b', 'c']
```

### Common Patterns

#### String Reversal

```javascript
const reverse = str =>
  Array.from(str).reverse().join('');

reverse('hello');
// 'olleh'
```

#### Unique Characters

```javascript
const unique = str =>
  Array.from(new Set(str)).sort();

unique('hello');
// ['e', 'h', 'l', 'o']
```

#### Character Count

```javascript
const countChars = str =>
  Array.from(str).reduce((counts, char) => {
    counts[char] = (counts[char] || 0) + 1;
    return counts;
  }, {});

countChars('hello');
// { h: 1, e: 1, l: 2, o: 1 }
```

## Exercise Tasks

### Task 1: String to Array

Implement `stringToArray`:
- Convert string to character array
- Use `Array.from()`

```javascript
stringToArray('hello');
// ['h', 'e', 'l', 'l', 'o']
```

### Task 2: Create Range

Implement `createRange`:
- Create array from start to end (inclusive)
- Use `Array.from()` with mapping

```javascript
createRange(1, 5);
// [1, 2, 3, 4, 5]
```

### Task 3: Set to Array

Implement `setToArray`:
- Convert Set to array
- Use `Array.from()`

```javascript
setToArray(new Set([1, 2, 3]));
// [1, 2, 3]
```

### Task 4: Map to Array

Implement `mapToArray`:
- Convert Map to array of [key, value] pairs
- Use `Array.from()`

```javascript
mapToArray(new Map([['a', 1], ['b', 2]]));
// [['a', 1], ['b', 2]]
```

### Task 5: Reverse String

Implement `reverseString`:
- Reverse string using array methods
- Use `Array.from()`, `reverse()`, `join()`

```javascript
reverseString('hello');
// 'olleh'
```

### Task 6: Array Of

Implement `arrayOf`:
- Create array from arguments
- Use `Array.of()`

```javascript
arrayOf(1, 2, 3);
// [1, 2, 3]
```

### Task 7: Transform Range

Implement `transformRange`:
- Create range 1 to n with transformation
- Use `Array.from()` with mapping

```javascript
transformRange(3, x => x * 2);
// [2, 4, 6]
```

### Task 8: Count Characters

Implement `countCharacters`:
- Return object with character counts
- Use `Array.from()` with `reduce()`

```javascript
countCharacters('hello');
// { h: 1, e: 1, l: 2, o: 1 }
```

### Task 9: Create Matrix

Implement `createMatrix`:
- Create 2D array with function values
- Use nested `Array.from()`

```javascript
createMatrix(2, 2, (r, c) => r + c);
// [[0, 1], [1, 2]]
```

### Task 10: Unique Characters

Implement `uniqueCharacters`:
- Return unique characters sorted
- Use `Array.from()` with `Set` and `sort()`

```javascript
uniqueCharacters('hello');
// ['e', 'h', 'l', 'o']
```

## Testing

Run the tests:

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

## Real-World Examples

### Processing DOM Elements

```javascript
// Get all buttons and convert to array
const buttons = Array.from(document.querySelectorAll('button'));

// Add click handlers to all
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Handle click
  });
});
```

### Converting API Data

```javascript
// API returns Set of unique IDs
const uniqueIds = new Set(data.map(item => item.userId));

// Convert to array for processing
const idArray = Array.from(uniqueIds);

// Sort and filter
const filteredIds = idArray
  .filter(id => id > 100)
  .sort();
```

### Generating Test Data

```javascript
// Generate 100 user objects for testing
const testUsers = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`
}));
```

### Creating Lookup Tables

```javascript
// Create multiplication table
const multiplicationTable = Array.from({ length: 10 }, (_, row) =>
  Array.from({ length: 10 }, (_, col) =>
    (row + 1) * (col + 1)
  )
);

// Lookup: table[4][3] = 20 (5 × 4)
```

### Processing Arguments

```javascript
function sum(...numbers) {
  // Convert to array and process
  return Array.from(numbers)
    .reduce((total, n) => total + n, 0);
}

sum(1, 2, 3, 4, 5); // 15
```

## Best Practices

### 1. Choose the Right Method

```javascript
// ✓ GOOD - Use Array.from for iterables
const arr = Array.from('hello');

// ✓ GOOD - Use Array.of for arguments
const arr = Array.of(1, 2, 3);

// ❌ LESS CLEAR - Use spread instead if clearer
const arr = [...'hello']; // Works but less explicit
```

### 2. Use Mapping Function

```javascript
// ✓ GOOD - Transform during creation
const doubled = Array.from({ length: 5 }, (_, i) => (i + 1) * 2);

// ❌ LESS EFFICIENT - Create then map
const doubled = Array.from({ length: 5 }, (_, i) => i + 1)
  .map(x => x * 2);
```

### 3. Handle Index in Mapping

```javascript
// ✓ GOOD - Use index parameter
Array.from({ length: 3 }, (_, i) => i);
// [0, 1, 2]

// ❌ CONFUSING - First parameter is usually element, not index
Array.from({ length: 3 }, (val) => val);
// [undefined, undefined, undefined]
```

### 4. Consider Readability

```javascript
// ✓ GOOD - Clear intent
const range = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

// ❌ LESS CLEAR - Magic numbers
Array.from({ length: 5 }, (_, i) => i + 10);
```

## Common Mistakes

```javascript
// ❌ WRONG - Forgetting Array.from exists
const arr = [];
for (let i = 0; i < 5; i++) {
  arr.push(i + 1);
}

// ✓ RIGHT - Use Array.from with mapping
const arr = Array.from({ length: 5 }, (_, i) => i + 1);

// ❌ WRONG - Using Array constructor with length
const arr = new Array(5).map(() => 0); // Returns sparse array!

// ✓ RIGHT - Use Array.from
const arr = Array.from({ length: 5 }, () => 0);

// ❌ WRONG - Assuming array-like is array
const elements = document.querySelectorAll('div');
elements.forEach(...); // May not work in old browsers

// ✓ RIGHT - Convert to array first
const elementArray = Array.from(elements);
elementArray.forEach(...);

// ❌ WRONG - Confusing Array() with Array.of()
Array(3);           // [empty × 3]
Array.of(3);        // [3]

// ✓ RIGHT - Know the difference
Array.of(1, 2, 3);  // [1, 2, 3]
```

## Summary

Key points about array construction:

✅ Use `Array.from()` to convert iterables to arrays
✅ Use `Array.from()` with mapping for transformation
✅ Use `Array.of()` to create arrays from arguments
✅ Understand difference between `Array()` and `Array.of()`
✅ Convert strings, Sets, Maps to arrays easily
✅ Create sequences and matrices with `Array.from()`
✅ Handle array-like objects with `Array.from()`

Next exercise: You'll build **custom transformation utilities** and helper functions!
