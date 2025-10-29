# Exercise 136: Data Pipeline - Custom Methods

Build **custom array transformation utilities** and helper functions. Create reusable, chainable methods for data processing pipelines.

## Overview

In this exercise, you'll create utility functions that solve common data transformation problems. These functions form the foundation of powerful data processing pipelines and are used across real applications.

### What You'll Learn

- **Utility functions**: Solving common transformation problems
- **Helper patterns**: Designing reusable utilities
- **Array operations**: Set operations, grouping, partitioning
- **Higher-order functions**: Functions working with predicates
- **Composable methods**: Functions that work well together

## Key Concepts

### Utility Function Design

**Utility functions** solve specific, common problems:

```javascript
// ✓ GOOD utility function - solves common problem
function chunk(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

chunk([1,2,3,4,5], 2);
// [[1,2], [3,4], [5]]
```

### Common Array Operations

#### Filtering Utilities

```javascript
// Remove falsy values
function compact(array) {
  return array.filter(Boolean);
}

compact([0, 1, false, 2, '', 3]);
// [1, 2, 3]
```

#### Set Operations

```javascript
// Find difference
function difference(first, second) {
  const secondSet = new Set(second);
  return first.filter(item => !secondSet.has(item));
}

difference([1,2,3], [2]);
// [1, 3]

// Find intersection
function intersection(first, second) {
  const secondSet = new Set(second);
  return first.filter(item => secondSet.has(item));
}

intersection([1,2,3], [2,3,4]);
// [2, 3]

// Remove duplicates
function unique(array) {
  return [...new Set(array)];
}

unique([1,2,2,3,1]);
// [1, 2, 3]
```

#### Grouping Utilities

```javascript
// Group by property
function groupBy(array, fn) {
  return array.reduce((groups, item) => {
    const key = fn(item);
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
    return groups;
  }, {});
}

groupBy([{t:'a'}, {t:'b'}, {t:'a'}], x => x.t);
// { a: [{t:'a'}, {t:'a'}], b: [{t:'b'}] }

// Create lookup object
function indexBy(array, fn) {
  return array.reduce((obj, item) => {
    obj[fn(item)] = item;
    return obj;
  }, {});
}

const users = [{id:1, name:'Alice'}, {id:2, name:'Bob'}];
indexBy(users, u => u.id);
// { 1: {id:1, name:'Alice'}, 2: {id:2, name:'Bob'} }
```

### Chunking

```javascript
// Split into chunks of size
function chunk(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

chunk([1,2,3,4,5,6,7], 3);
// [[1,2,3], [4,5,6], [7]]

// Useful for:
// - Pagination
// - Batch processing
// - Displaying lists in columns
```

### Partitioning

```javascript
// Split into two arrays based on predicate
function partition(array, predicate) {
  const truthy = [];
  const falsy = [];
  
  array.forEach(item => {
    if (predicate(item)) {
      truthy.push(item);
    } else {
      falsy.push(item);
    }
  });
  
  return [truthy, falsy];
}

partition([1,2,3,4], x => x % 2);
// [[1,3], [2,4]]
```

### Conditional Taking/Dropping

```javascript
// Take elements while condition true
function takeWhile(array, predicate) {
  const result = [];
  for (const item of array) {
    if (!predicate(item)) break;
    result.push(item);
  }
  return result;
}

takeWhile([1,2,3,4,5], x => x < 4);
// [1, 2, 3]

// Drop elements while condition true
function dropWhile(array, predicate) {
  let index = 0;
  while (index < array.length && predicate(array[index])) {
    index++;
  }
  return array.slice(index);
}

dropWhile([1,2,3,4,5], x => x < 4);
// [4, 5]
```

## Exercise Tasks

### Task 1: Chunk

Implement `chunk`:
- Split array into chunks of specified size
- Last chunk may be smaller

```javascript
chunk([1,2,3,4,5], 2);
// [[1,2], [3,4], [5]]
```

### Task 2: Compact

Implement `compact`:
- Remove falsy values (0, false, '', null, undefined)
- Keep truthy values

```javascript
compact([0, 1, false, 2, '', 3, null]);
// [1, 2, 3]
```

### Task 3: Difference

Implement `difference`:
- Return elements in first array not in second
- Set operation: A - B

```javascript
difference([1,2,3], [2]);
// [1, 3]
```

### Task 4: Intersection

Implement `intersection`:
- Return elements appearing in both arrays
- Set operation: A ∩ B

```javascript
intersection([1,2,3], [2,3,4]);
// [2, 3]
```

### Task 5: Unique

Implement `unique`:
- Remove duplicate values
- Preserve order when possible

```javascript
unique([1,2,2,3,1]);
// [1, 2, 3]
```

### Task 6: GroupBy

Implement `groupBy`:
- Group array elements by function result
- Return object with groups

```javascript
const data = [{type:'a', val:1}, {type:'b', val:2}, {type:'a', val:3}];
groupBy(data, x => x.type);
// {
//   a: [{type:'a', val:1}, {type:'a', val:3}],
//   b: [{type:'b', val:2}]
// }
```

### Task 7: IndexBy

Implement `indexBy`:
- Create lookup object using function result as key
- One element per key

```javascript
const users = [{id:1, name:'Alice'}, {id:2, name:'Bob'}];
indexBy(users, u => u.id);
// {
//   1: {id:1, name:'Alice'},
//   2: {id:2, name:'Bob'}
// }
```

### Task 8: Partition

Implement `partition`:
- Split array into two based on predicate
- Return [truthy, falsy]

```javascript
partition([1,2,3,4], x => x % 2);
// [[1,3], [2,4]]
```

### Task 9: TakeWhile

Implement `takeWhile`:
- Take elements while predicate true
- Stop at first false

```javascript
takeWhile([1,2,3,4,5], x => x < 4);
// [1, 2, 3]
```

### Task 10: DropWhile

Implement `dropWhile`:
- Skip elements while predicate true
- Return remainder

```javascript
dropWhile([1,2,3,4,5], x => x < 4);
// [4, 5]
```

## Testing

Run tests:

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

## Real-World Examples

### E-commerce: Partition Orders

```javascript
const orders = [
  { id: 1, status: 'pending', total: 100 },
  { id: 2, status: 'shipped', total: 200 },
  { id: 3, status: 'pending', total: 150 }
];

const [pending, completed] = partition(orders, o => o.status === 'pending');

// pending: [{id:1}, {id:3}]
// completed: [{id:2}]
```

### Data Analysis: Group and Index

```javascript
const sales = [
  { rep: 'Alice', region: 'US', amount: 5000 },
  { rep: 'Bob', region: 'EU', amount: 3000 },
  { rep: 'Charlie', region: 'US', amount: 4000 }
];

// Group by region
const byRegion = groupBy(sales, s => s.region);
// { US: [...], EU: [...] }

// Index by rep
const byRep = indexBy(sales, s => s.rep);
// { Alice: {...}, Bob: {...}, Charlie: {...} }
```

### Processing: Batch Operations

```javascript
const records = getMillionRecords();

// Process in chunks of 100
chunk(records, 100).forEach(batch => {
  processBatch(batch);
  saveToDatabase(batch);
});
```

### Data Cleaning: Compact and Unique

```javascript
const userData = [
  null,
  { id: 1, name: 'Alice' },
  undefined,
  { id: 1, name: 'Alice' }, // duplicate
  { id: 2, name: 'Bob' }
];

const cleaned = unique(compact(userData));
// Only valid, unique users
```

### Search: Early Termination

```javascript
// Find first 10 items where price > 1000
const expensive = takeWhile(
  sortedByPrice,
  item => item.price < 10000
);

// Skip non-matching prefix
const matching = dropWhile(
  sortedResults,
  item => !item.matches(query)
);
```

## Best Practices

### 1. Pure Functions

```javascript
// ✓ GOOD - No side effects
function compact(array) {
  return array.filter(Boolean);
}

// ❌ MUTATES - Modifies original
function compactBad(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (!array[i]) array.splice(i, 1);
  }
}
```

### 2. Consistent Naming

```javascript
// ✓ GOOD - Clear intent
function removeEmpty(array) { ... }
function filterByStatus(array, status) { ... }

// ❌ CONFUSING
function clean(array) { ... }
function process(array, x) { ... }
```

### 3. Useful Return Types

```javascript
// ✓ GOOD - Returns array for chaining
function compact(array) {
  return array.filter(Boolean);
}

// ✓ GOOD - Returns object for lookup
function indexBy(array, fn) {
  return array.reduce((obj, item) => {
    obj[fn(item)] = item;
    return obj;
  }, {});
}
```

### 4. Document Edge Cases

```javascript
// ✓ GOOD - Clear behavior
function chunk(array, size) {
  // Returns array of arrays, last chunk may be smaller
  // chunk([1,2,3,4,5], 2) -> [[1,2], [3,4], [5]]
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}
```

## Common Mistakes

```javascript
// ❌ WRONG - Modifying original array
function compact(array) {
  array = array.filter(Boolean); // Doesn't modify parameter
  return array;
}

// ✓ RIGHT - Returns new array
function compact(array) {
  return array.filter(Boolean);
}

// ❌ WRONG - Inconsistent partition order
function partition(array, fn) {
  return [
    array.filter(fn),    // truthy first
    array.filter(x => !fn(x))
  ];
}

// ✓ RIGHT - Clear order
function partition(array, fn) {
  return [
    array.filter(fn),           // truthy
    array.filter(x => !fn(x))   // falsy
  ];
}

// ❌ WRONG - Not considering performance
function difference(first, second) {
  return first.filter(x => !second.includes(x)); // O(n*m)
}

// ✓ RIGHT - Use Set for O(n)
function difference(first, second) {
  const set = new Set(second);
  return first.filter(x => !set.has(x));
}
```

## Summary

Key points about custom utilities:

✅ Create reusable utility functions for common problems
✅ Use higher-order functions with predicates
✅ Implement set operations efficiently (use Set)
✅ Return appropriate types for chainability
✅ Keep functions pure (no side effects)
✅ Document edge cases and behavior
✅ Consider performance (Set vs includes, etc.)

Next exercise: You'll learn **function composition** for building powerful pipelines!
