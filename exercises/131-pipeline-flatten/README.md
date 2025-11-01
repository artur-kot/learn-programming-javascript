# Exercise 134: Data Pipeline - Flatten Data

Master **flat()** and **flatMap()** methods to transform nested arrays into single-level structures. Learn to handle hierarchical data elegantly.

## Overview

In this exercise, you'll work with the most important array flattening methods. Instead of manually looping through nested arrays, you'll use `flat()` and `flatMap()` to transform complex data structures into clean arrays.

### What You'll Learn

- **flat() method**: Flattens nested arrays
- **flatMap() method**: Maps then flattens in one step
- **Depth parameter**: Controlling how deep to flatten
- **Handling nested data**: Processing hierarchical structures
- **Real-world use cases**: API responses, reports, data transformation

## Key Concepts

### The flat() Method

**flat()** creates a new array with elements from nested arrays at specified depth:

```javascript
const nested = [[1, 2], [3, 4], [5]];
const flattened = nested.flat();
// [1, 2, 3, 4, 5]

const deeper = [1, [2, [3, [4]]]];
const flat1 = deeper.flat(1);       // [1, 2, [3, [4]]]
const flat2 = deeper.flat(2);       // [1, 2, 3, [4]]
const flatAll = deeper.flat(Infinity); // [1, 2, 3, 4]
```

### The flatMap() Method

**flatMap()** maps each element then flattens the result. It's equivalent to `map().flat()` but more efficient:

```javascript
// Without flatMap - map then flat
const orders = [
  { items: [1, 2] },
  { items: [3, 4] }
];

const prices1 = orders
  .map(order => order.items)
  .flat();
// [1, 2, 3, 4]

// With flatMap - all in one
const prices2 = orders.flatMap(order => order.items);
// [1, 2, 3, 4] - Same result!
```

### Common Flattening Patterns

#### Pattern 1: Simple Flattening

Flatten one level of nesting:

```javascript
const groups = [['a', 'b'], ['c', 'd']];
const items = groups.flat();
// ['a', 'b', 'c', 'd']
```

#### Pattern 2: Complete Flattening

Remove all nesting levels:

```javascript
const deeply = [1, [2, [3, [4]]]];
const all = deeply.flat(Infinity);
// [1, 2, 3, 4]
```

#### Pattern 3: Map Then Flatten

Transform and flatten in one operation:

```javascript
const users = [
  { id: 1, hobbies: ['reading', 'gaming'] },
  { id: 2, hobbies: ['sports'] }
];

const hobbies = users.flatMap(user => user.hobbies);
// ['reading', 'gaming', 'sports']
```

#### Pattern 4: Filter Then Flatten

Select items, then flatten their contents:

```javascript
const departments = [
  { name: 'Sales', employees: ['Alice', 'Bob'] },
  { name: 'Eng', employees: ['Charlie', 'Diana'] },
  { name: 'HR', employees: [] }
];

const techStaff = departments
  .filter(dept => dept.name === 'Eng')
  .flatMap(dept => dept.employees);
// ['Charlie', 'Diana']
```

#### Pattern 5: Flatten Then Group

Flatten first, then aggregate:

```javascript
const data = [[100, 50], [200, 150], [75]];

const total = data
  .flat()
  .reduce((sum, n) => sum + n, 0);
// 575
```

### Understanding Depth

The depth parameter controls flattening levels:

```javascript
const data = [1, [2, [3, [4]]]];

data.flat(0);       // [1, [2, [3, [4]]]] - No change
data.flat(1);       // [1, 2, [3, [4]]]   - One level
data.flat(2);       // [1, 2, 3, [4]]     - Two levels
data.flat(3);       // [1, 2, 3, 4]       - Three levels
data.flat(999);     // [1, 2, 3, 4]       - Enough for all
data.flat(Infinity); // [1, 2, 3, 4]     - All levels
```

### flatMap() vs map().flat()

```javascript
const orders = [
  { id: 1, items: [10, 20] },
  { id: 2, items: [30] }
];

// Method 1: map then flat
const prices1 = orders
  .map(order => order.items)
  .flat();

// Method 2: flatMap
const prices2 = orders.flatMap(order => order.items);

// Method 3: flatMap with transformation
const doubled = orders.flatMap(order =>
  order.items.map(price => price * 2)
);
// [20, 40, 60]
```

**flatMap()** is better because:
- Single pass through data
- Reads cleaner
- More performant

### Practical Data Structures

#### Nested Objects in Arrays

```javascript
const users = [
  {
    name: 'Alice',
    posts: [
      { id: 1, likes: 10 },
      { id: 2, likes: 20 }
    ]
  },
  {
    name: 'Bob',
    posts: [
      { id: 3, likes: 15 }
    ]
  }
];

// Get all post likes
const likes = users.flatMap(user =>
  user.posts.map(post => post.likes)
);
// [10, 20, 15]

// Get all posts
const posts = users.flatMap(user => user.posts);
// [{id: 1, likes: 10}, ...]
```

#### Multi-Level Nesting

```javascript
const departments = [
  {
    name: 'Engineering',
    teams: [
      {
        name: 'Frontend',
        members: ['Alice', 'Bob']
      },
      {
        name: 'Backend',
        members: ['Charlie', 'Diana']
      }
    ]
  }
];

// Get all members
const members = departments
  .flatMap(dept => dept.teams)
  .flatMap(team => team.members);
// ['Alice', 'Bob', 'Charlie', 'Diana']

// Or use flat() for deeper structures
const membersAlt = departments
  .map(dept =>
    dept.teams.map(team => team.members)
  )
  .flat(2);
// Same result
```

## Exercise Tasks

### Task 1: Flatten One Level

Implement `flattenOnce`:
- Use `flat(1)` to flatten exactly one level
- Works with mixed content

```javascript
flattenOnce([[1, 2], [3, 4]]);
// [1, 2, 3, 4]
```

### Task 2: Complete Flattening

Implement `flattenCompletely`:
- Use `flat(Infinity)` to remove all nesting
- Handles any depth

```javascript
flattenCompletely([1, [2, [3, [4]]]]);
// [1, 2, 3, 4]
```

### Task 3: Extract Nested Items

Implement `flattenOrders`:
- Given orders with items array
- Extract all items into single array
- Use `map().flat()`

```javascript
const orders = [
  { id: 1, items: [{ name: 'a', price: 100 }] },
  { id: 2, items: [{ name: 'b', price: 200 }] }
];
flattenOrders(orders);
// [{ name: 'a', price: 100 }, { name: 'b', price: 200 }]
```

### Task 4: FlatMap Prices

Implement `flatMapPrices`:
- Use `flatMap()` directly
- More efficient than map().flat()

```javascript
flatMapPrices(orders);
// [100, 200]
```

### Task 5: Filter Then FlatMap

Implement `flatMapWithFilter`:
- Filter students with average > 80
- FlatMap to get their grades

```javascript
const students = [
  { name: 'Strong', grades: [90, 95] },
  { name: 'Weak', grades: [60, 65] }
];
flatMapWithFilter(students);
// [90, 95]
```

### Task 6: Expand and Flatten

Implement `expandAndFlatten`:
- Each number n repeated n times
- Then flatten result

```javascript
expandAndFlatten([2, 3]);
// [2, 2, 3, 3, 3]
```

### Task 7: Extract Unique Categories

Implement `flatMapCategories`:
- Extract all categories using flatMap
- Remove duplicates using Set

```javascript
const products = [
  { categories: ['tech', 'gadget'] },
  { categories: ['tech', 'device'] }
];
flatMapCategories(products);
// ['tech', 'gadget', 'device'] (no duplicates)
```

### Task 8: Flatten and Group

Implement `flattenAndGroup`:
- Flatten nested transactions
- Group by amount ranges: '<100', '100-500', '>500'

```javascript
const txs = [[[50], [200]], [[100], [600]]];
flattenAndGroup(txs);
// {
//   '<100': [50],
//   '100-500': [200, 100],
//   '>500': [600]
// }
```

### Task 9: FlatMap with Transform

Implement `flatMapWithTransform`:
- Expand each user to one object per hobby
- Result: `[{ person, hobby }, ...]`

```javascript
const users = [
  { name: 'Alice', hobbies: ['reading', 'gaming'] }
];
flatMapWithTransform(users);
// [
//   { person: 'Alice', hobby: 'reading' },
//   { person: 'Alice', hobby: 'gaming' }
// ]
```

### Task 10: Complex Nested Extraction

Implement `complexFlatten`:
- Extract items from deeply nested structure
- Handle multiple levels of nesting

```javascript
const data = [
  {
    categories: [
      { items: [{ id: 1 }, { id: 2 }] },
      { items: [{ id: 3 }] }
    ]
  }
];
complexFlatten(data);
// [{ id: 1 }, { id: 2 }, { id: 3 }]
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

### E-commerce: Extract All Prices

```javascript
const orders = [
  {
    items: [
      { name: 'Laptop', price: 800 },
      { name: 'Mouse', price: 50 }
    ]
  },
  {
    items: [
      { name: 'Monitor', price: 300 }
    ]
  }
];

const allPrices = orders.flatMap(order =>
  order.items.map(item => item.price)
);
// [800, 50, 300]

const total = allPrices.reduce((sum, p) => sum + p, 0);
// 1150
```

### Social Media: Extract All Comments

```javascript
const posts = [
  {
    id: 1,
    comments: [
      { author: 'Alice', text: 'Great!' },
      { author: 'Bob', text: 'Thanks!' }
    ]
  },
  {
    id: 2,
    comments: [
      { author: 'Charlie', text: 'Nice post' }
    ]
  }
];

const allComments = posts.flatMap(post => post.comments);
// All comments in single array

const authors = posts
  .flatMap(post => post.comments)
  .map(comment => comment.author);
// ['Alice', 'Bob', 'Charlie']
```

### Data Processing: Multi-Level Report

```javascript
const departments = [
  {
    name: 'Engineering',
    teams: [
      { name: 'Frontend', salary: 100000 },
      { name: 'Backend', salary: 110000 }
    ]
  },
  {
    name: 'Sales',
    teams: [
      { name: 'US', salary: 80000 }
    ]
  }
];

const avgSalary = departments
  .flatMap(dept => dept.teams)
  .map(team => team.salary)
  .reduce((sum, s) => sum + s, 0) /
  (departments.flatMap(dept => dept.teams).length);
```

### API Response: Normalize Nested Data

```javascript
// Complex API response
const response = {
  status: 'success',
  data: {
    pages: [
      {
        results: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' }
        ]
      },
      {
        results: [
          { id: 3, name: 'Item 3' }
        ]
      }
    ]
  }
};

// Extract all items
const allItems = response.data.pages.flatMap(page => page.results);
// [{ id: 1, name: 'Item 1' }, ...]
```

## Best Practices

### 1. Choose the Right Method

```javascript
// ✓ GOOD - Use flatMap when mapping and flattening
const hobbies = users.flatMap(user => user.hobbies);

// ❌ LESS EFFICIENT - map then flat
const hobbies = users.map(user => user.hobbies).flat();

// ✓ GOOD - Use flat for simple flattening
const items = orders.map(o => o.items).flat();
```

### 2. Use Correct Depth

```javascript
// ✓ GOOD - Specify exact depth needed
const level1 = data.flat(1);

// ⚠️ RISKY - Infinity can cause unexpected behavior
const allFlat = data.flat(Infinity); // Use only when certain

// ❌ WRONG - flat() defaults to 1, not all levels
const notEnough = data.flat();
```

### 3. Chain Efficiently

```javascript
// ✓ GOOD - Single pass operations
const result = data
  .flatMap(item => item.children)
  .filter(child => child.active)
  .map(child => child.id);

// ❌ INEFFICIENT - Multiple passes
const result = data
  .flatMap(item => item.children)
  .flat()
  .flat();
```

### 4. Handle Empty Arrays

```javascript
// ✓ GOOD - flat() handles empty arrays
const result = [[], [1], []].flat();
// [1] - empties are skipped

// ✓ GOOD - flatMap handles empty results
const result = users
  .flatMap(user => user.hobbies); // Works even if empty
```

## Common Mistakes

```javascript
// ❌ WRONG - Forgetting flat() exists
const items = [];
for (let order of orders) {
  items.push(...order.items); // Works but verbose
}

// ✓ RIGHT - Use flatMap
const items = orders.flatMap(order => order.items);

// ❌ WRONG - Using flat() for transformations
const doubled = data.flat().map(x => x * 2); // Two passes

// ✓ RIGHT - Use flatMap for map + flatten
const doubled = data.flatMap(x => [x * 2]); // One pass

// ❌ WRONG - Assuming flat() changes depth infinitely
const result = veryDeep.flat(); // Only flattens 1 level!

// ✓ RIGHT - Specify depth or use Infinity
const result = veryDeep.flat(Infinity);

// ❌ WRONG - Using flat for filtering
const big = data.flat().filter(x => x > 10);

// ✓ RIGHT - Filter before flattening if possible
const big = data
  .filter(group => group.some(x => x > 10))
  .flat();
```

## Summary

Key points about flattening:

✅ Use `flat(depth)` to remove nesting levels
✅ Use `flat(Infinity)` for complete flattening
✅ Use `flatMap()` for mapping then flattening
✅ flatMap is more efficient than map().flat()
✅ Specify correct depth to avoid issues
✅ Chain with other methods for powerful transformations
✅ Handles empty arrays and holes automatically

Next exercise: You'll learn **array construction** with Array.from() and Array.of()!
