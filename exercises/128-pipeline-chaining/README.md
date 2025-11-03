# Exercise 133: Data Pipeline - Method Chaining

Master **method chaining** to create elegant data transformation pipelines using filter, map, and reduce.

## Overview

In this exercise, you'll learn to chain array methods together to transform data in readable, functional sequences. Instead of creating temporary variables, you'll write expressions that flow like a process.

### What You'll Learn

- **Method Chaining**: Calling multiple methods sequentially
- **Data Pipelines**: Creating transformation sequences
- **Filter + Map Patterns**: Filtering then transforming data
- **Filter + Reduce Patterns**: Filtering then aggregating
- **Complex Chains**: Combining multiple operations
- **Custom Pipelines**: Building reusable pipeline objects

## Key Concepts

### Method Chaining Basics

**Method chaining** means calling multiple methods on the result of the previous method:

```javascript
const result = array
  .filter(item => item.active)
  .map(item => item.name)
  .sort();
```

This is equivalent to:

```javascript
let temp1 = array.filter(item => item.active);
let temp2 = temp1.map(item => item.name);
let result = temp2.sort();
```

### Why Chain Methods?

```javascript
// ❌ WITHOUT CHAINING - Lots of temporary variables
const data = [1, 2, 3, 4, 5];
const filtered = data.filter(x => x > 2);
const doubled = filtered.map(x => x * 2);
const sum = doubled.reduce((a, b) => a + b, 0);

// ✓ WITH CHAINING - Clean, readable pipeline
const data = [1, 2, 3, 4, 5];
const sum = data
  .filter(x => x > 2)
  .map(x => x * 2)
  .reduce((a, b) => a + b, 0);
```

### Common Chaining Patterns

#### Pattern 1: Filter → Map

Transform only items that match a condition:

```javascript
const products = [
  { name: 'Laptop', price: 800, inStock: true },
  { name: 'Phone', price: 400, inStock: false },
  { name: 'Tablet', price: 600, inStock: true }
];

const inStockNames = products
  .filter(product => product.inStock)
  .map(product => product.name);
// ['Laptop', 'Tablet']
```

#### Pattern 2: Filter → Reduce

Aggregate filtered items:

```javascript
const total = products
  .filter(product => product.inStock)
  .reduce((sum, product) => sum + product.price, 0);
// 1400 (800 + 600)
```

#### Pattern 3: Map → Filter

Transform first, then filter:

```javascript
const scores = [45, 78, 92, 65, 88];

const highScores = scores
  .map(score => score + 5)  // Curve: add 5 points
  .filter(score => score >= 80);
// [83, 97, 93]
```

#### Pattern 4: Map → Reduce

Transform then aggregate:

```javascript
const items = [
  { qty: 2, price: 50 },
  { qty: 3, price: 30 }
];

const total = items
  .map(item => item.qty * item.price)
  .reduce((sum, subtotal) => sum + subtotal, 0);
// 190 (100 + 90)
```

#### Pattern 5: Filter → Map → Sort

Filter, transform, and order:

```javascript
const products
  .filter(p => p.price < 500)
  .map(p => ({ name: p.name, price: p.price }))
  .sort((a, b) => b.price - a.price);
```

### Data Flows in Pipelines

```javascript
// Original data
[
  { id: 1, name: 'Alice', age: 25, active: true },
  { id: 2, name: 'Bob', age: 18, active: true },
  { id: 3, name: 'Charlie', age: 30, active: false }
]

  // After .filter(u => u.active)
  [
    { id: 1, name: 'Alice', age: 25, active: true },
    { id: 2, name: 'Bob', age: 18, active: true }
  ]

  // After .map(u => u.name)
  ['Alice', 'Bob']

  // After .sort()
  ['Alice', 'Bob']
```

### Performance Considerations

Array methods create new arrays at each step:

```javascript
// Creates 3 arrays: filtered, then mapped, then result
const result = data
  .filter(x => x > 5)      // New array
  .map(x => x * 2)         // New array
  .filter(x => x > 20);    // New array
```

For large datasets, consider reducing the number of passes:

```javascript
// Single pass with reduce
const result = data.reduce((acc, x) => {
  if (x > 5) {
    const doubled = x * 2;
    if (doubled > 20) {
      acc.push(doubled);
    }
  }
  return acc;
}, []);
```

## Exercise Tasks

### Task 1: Filter and Map Chaining

Implement `filterAndTransform`:
- Filter products where category is 'electronics' and price < 500
- Transform to { id, name, discountedPrice } (10% off)

```javascript
const result = filterAndTransform(products);
// Returns: [
//   { id: 3, name: 'Phone', discountedPrice: 360 },
//   { id: 5, name: 'Monitor', discountedPrice: 270 }
// ]
```

### Task 2: Filter and Reduce Chaining

Implement `sumPricesOfCategory`:
- Filter products by category
- Reduce to sum of prices

```javascript
const total = sumPricesOfCategory(products, 'electronics');
// Returns: 1200
```

### Task 3: Sort and Slice Chaining

Implement `getTopThreeByPrice`:
- Sort by price (highest first)
- Take first 3 items
- Map to { name, price }

```javascript
const top = getTopThreeByPrice(products);
// Returns: [
//   { name: 'Laptop', price: 800 },
//   { name: 'Tablet', price: 600 },
//   { name: 'Monitor', price: 300 }
// ]
```

### Task 4: Multiple Filters

Implement `filterAndCount`:
- Filter where active === true
- Filter where age >= 21
- Return count

```javascript
const count = filterAndCount(users);
// Returns: 3
```

### Task 5: Map, Flat, and Reduce

Implement `transformAndAggregate`:
- Map orders to items arrays
- Flat to single array
- Reduce to total revenue (qty * price)

```javascript
const revenue = transformAndAggregate(orders);
// Returns: 450
```

### Task 6: Map, Filter, Sort

Implement `multiStepTransform`:
- Map to { name, averageGrade }
- Filter where averageGrade > 75
- Sort by averageGrade (descending)

```javascript
const report = multiStepTransform(students);
// Returns: [
//   { name: 'Charlie', averageGrade: 95 },
//   { name: 'Alice', averageGrade: 85 },
//   { name: 'Diana', averageGrade: 77.5 }
// ]
```

### Task 7: Complex Reduce

Implement `findMaxValue`:
- Filter transactions by type 'credit'
- Map to amounts
- Reduce to find maximum

```javascript
const max = findMaxValue(transactions);
// Returns: 500
```

### Task 8: Reduce for Grouping

Implement `groupAndSum`:
- Use reduce to group by category
- Sum amounts for each category

```javascript
const totals = groupAndSum(expenses);
// Returns: {
//   food: 95,
//   transport: 30,
//   entertainment: 100
// }
```

### Task 9: Complex Report

Implement `createReport`:
- Create report object with totalSales, averageSale, topRegion, regions
- Use reduce efficiently

```javascript
const report = createReport(sales);
// Returns: {
//   totalSales: 750,
//   averageSale: 187.5,
//   topRegion: 'North',
//   regions: { North: 250, South: 200, East: 300 }
// }
```

### Task 10: Custom Pipeline Class

Implement `pipeline` function:
- Returns object with chainable methods: filter, map, reduce, get
- Each method returns new pipeline (except reduce and get)
- Allows: `pipeline(data).filter(...).map(...).reduce(...)`

```javascript
const result = pipeline([1, 2, 3, 4, 5])
  .filter(x => x > 2)
  .map(x => x * 2)
  .get(); // [6, 8, 10]
```

## Testing

Run the tests to verify your implementation:

```bash
npm test
```

Watch mode for development:

```bash
npm run test:watch
```

## Real-World Examples

### E-commerce: Filter and Discount

```javascript
const discountedCart = cart
  .filter(item => item.inStock)
  .map(item => ({
    ...item,
    price: item.price * 0.9
  }))
  .reduce((total, item) => total + (item.price * item.qty), 0);
```

### Data Analytics: Extract Top Results

```javascript
const topSales = salesData
  .filter(sale => sale.region === 'North')
  .map(sale => ({ rep: sale.rep, amount: sale.amount }))
  .sort((a, b) => b.amount - a.amount)
  .slice(0, 5);
```

### API Response Processing

```javascript
const processedUsers = apiResponse.users
  .filter(user => user.verified)
  .map(user => ({
    id: user.id,
    name: user.displayName,
    email: user.email
  }))
  .sort((a, b) => a.name.localeCompare(b.name));
```

## Best Practices

### 1. Clear, Readable Chains

```javascript
// ✓ GOOD - Each operation on new line
const result = data
  .filter(item => item.active)
  .map(item => item.value * 2)
  .reduce((sum, val) => sum + val, 0);

// ❌ HARD TO READ - All on one line
const result = data.filter(x=>x.active).map(x=>x.value*2).reduce((s,v)=>s+v,0);
```

### 2. Meaningful Variable Names

```javascript
// ✓ GOOD
const pricesByCategory = products
  .filter(p => p.category === 'electronics')
  .map(p => p.price);

// ❌ LESS CLEAR
const x = products
  .filter(p => p.category === 'electronics')
  .map(p => p.price);
```

### 3. Chain Related Operations

```javascript
// ✓ GOOD - Related operations together
const activeUserNames = users
  .filter(u => u.active)
  .map(u => u.name)
  .sort();

// ❌ INCONSISTENT - Mix of related and unrelated
const result = users
  .filter(u => u.active)
  .reverse()  // Unrelated operation
  .map(u => u.name);
```

### 4. Consider Performance

```javascript
// ✓ GOOD - Reduces to single value, stops iteration
const hasExpensive = data.some(item => item.price > 1000);

// ❌ UNNECESSARY - Creates full array, then checks
const hasExpensive = data
  .filter(item => item.price > 1000)
  .length > 0;
```

## Common Mistakes

```javascript
// ❌ WRONG - Forgetting each method returns array
const result = data.filter(x => x > 5).map(x => x * 2);
// Later trying to use non-array methods

// ✓ RIGHT - Know what each method returns
const array = data.filter(x => x > 5).map(x => x * 2);
const number = data.reduce((sum, x) => sum + x, 0);

// ❌ WRONG - Forgetting initial value in reduce
const sum = data.reduce((a, b) => a + b); // Problematic!

// ✓ RIGHT - Always provide initial value
const sum = data.reduce((a, b) => a + b, 0);

// ❌ WRONG - Modifying within chain
const result = data
  .filter(x => {
    x.processed = true; // Side effect!
    return x > 5;
  })
  .map(x => x.value);

// ✓ RIGHT - Pure functions in chains
const result = data
  .filter(x => x.value > 5)
  .map(x => x.value);
```

## Summary

Key points about method chaining:

✅ Chain related array methods for clean pipelines
✅ Filter, map, reduce are the most common chains
✅ Each method returns a new array (except reduce)
✅ Write chains on separate lines for readability
✅ Consider performance for large datasets
✅ Use meaningful names for chained variables
✅ Pipelines make code more functional and elegant

Next exercise: You'll learn **flatten and flatMap** for handling nested data!
