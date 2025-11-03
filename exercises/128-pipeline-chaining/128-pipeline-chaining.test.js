import { test } from 'node:test';
import assert from 'node:assert';
import {
  filterAndTransform,
  sumPricesOfCategory,
  getTopThreeByPrice,
  filterAndCount,
  transformAndAggregate,
  multiStepTransform,
  findMaxValue,
  groupAndSum,
  createReport,
  pipeline
} from './128-pipeline-chaining.js';

// ============================================================================
// FILTER AND MAP CHAINING
// ============================================================================

test('filterAndTransform - filters and maps in chain', () => {
  const products = [
    { id: 1, name: 'Laptop', price: 800, category: 'electronics' },
    { id: 2, name: 'Shirt', price: 50, category: 'clothing' },
    { id: 3, name: 'Phone', price: 400, category: 'electronics' },
    { id: 4, name: 'Tablet', price: 600, category: 'electronics' },
    { id: 5, name: 'Monitor', price: 300, category: 'electronics' }
  ];

  const result = filterAndTransform(products);

  assert.strictEqual(result.length, 3, 'Returns 3 electronics under 500');
  assert.strictEqual(result[0].id, 3, 'First item is phone');
  assert.strictEqual(result[0].discountedPrice, 360, 'Price discounted by 10%');
  assert.strictEqual(result[2].discountedPrice, 270, 'Last item discounted correctly');
});

test('filterAndTransform - handles empty result', () => {
  const products = [
    { id: 1, name: 'Expensive', price: 1000, category: 'electronics' },
    { id: 2, name: 'Clothing', price: 50, category: 'clothing' }
  ];

  const result = filterAndTransform(products);

  assert.strictEqual(result.length, 0, 'Returns empty array when no matches');
});

// ============================================================================
// FILTER AND REDUCE CHAINING
// ============================================================================

test('sumPricesOfCategory - filters and reduces in chain', () => {
  const products = [
    { id: 1, name: 'Laptop', price: 800, category: 'electronics' },
    { id: 2, name: 'Shirt', price: 50, category: 'clothing' },
    { id: 3, name: 'Phone', price: 400, category: 'electronics' },
    { id: 4, name: 'Jeans', price: 80, category: 'clothing' }
  ];

  const electronics = sumPricesOfCategory(products, 'electronics');
  const clothing = sumPricesOfCategory(products, 'clothing');

  assert.strictEqual(electronics, 1200, 'Sum of electronics prices');
  assert.strictEqual(clothing, 130, 'Sum of clothing prices');
});

test('sumPricesOfCategory - handles no matches', () => {
  const products = [
    { id: 1, name: 'Item', price: 100, category: 'furniture' }
  ];

  const result = sumPricesOfCategory(products, 'electronics');

  assert.strictEqual(result, 0, 'Returns 0 when no products match');
});

// ============================================================================
// SORT AND SLICE CHAINING
// ============================================================================

test('getTopThreeByPrice - sorts and maps top 3', () => {
  const products = [
    { name: 'Laptop', price: 800 },
    { name: 'Phone', price: 400 },
    { name: 'Tablet', price: 600 },
    { name: 'Monitor', price: 300 },
    { name: 'Keyboard', price: 150 }
  ];

  const result = getTopThreeByPrice(products);

  assert.strictEqual(result.length, 3, 'Returns 3 items');
  assert.strictEqual(result[0].name, 'Laptop', 'First is most expensive');
  assert.strictEqual(result[0].price, 800, 'Highest price first');
  assert.strictEqual(result[2].name, 'Tablet', 'Third is tablet');
});

test('getTopThreeByPrice - handles fewer than 3 items', () => {
  const products = [
    { name: 'Item1', price: 100 },
    { name: 'Item2', price: 200 }
  ];

  const result = getTopThreeByPrice(products);

  assert.strictEqual(result.length, 2, 'Returns all items if fewer than 3');
});

// ============================================================================
// MULTIPLE FILTERS CHAINING
// ============================================================================

test('filterAndCount - applies multiple filters', () => {
  const users = [
    { id: 1, name: 'Alice', age: 25, active: true },
    { id: 2, name: 'Bob', age: 18, active: true },
    { id: 3, name: 'Charlie', age: 30, active: false },
    { id: 4, name: 'Diana', age: 22, active: true },
    { id: 5, name: 'Eve', age: 20, active: true }
  ];

  const count = filterAndCount(users);

  assert.strictEqual(count, 3, 'Returns count of active users 21+');
});

test('filterAndCount - handles no matches', () => {
  const users = [
    { id: 1, name: 'Young', age: 15, active: true },
    { id: 2, name: 'Inactive', age: 30, active: false }
  ];

  const count = filterAndCount(users);

  assert.strictEqual(count, 0, 'Returns 0 when no matches');
});

// ============================================================================
// MAP, FLAT, AND REDUCE CHAINING
// ============================================================================

test('transformAndAggregate - maps, flats, and reduces', () => {
  const orders = [
    {
      id: 1,
      items: [
        { name: 'item1', price: 100, qty: 2 },
        { name: 'item2', price: 50, qty: 1 }
      ],
      customer: 'Customer1'
    },
    {
      id: 2,
      items: [
        { name: 'item3', price: 200, qty: 1 }
      ],
      customer: 'Customer2'
    }
  ];

  const result = transformAndAggregate(orders);

  // (100 * 2) + (50 * 1) + (200 * 1) = 200 + 50 + 200 = 450
  assert.strictEqual(result, 450, 'Calculates total revenue correctly');
});

test('transformAndAggregate - handles empty orders', () => {
  const orders = [];

  const result = transformAndAggregate(orders);

  assert.strictEqual(result, 0, 'Returns 0 for empty orders');
});

// ============================================================================
// MAP, FILTER, SORT CHAINING
// ============================================================================

test('multiStepTransform - maps, filters, sorts', () => {
  const students = [
    { id: 1, name: 'Alice', grades: [80, 85, 90] },
    { id: 2, name: 'Bob', grades: [70, 72, 68] },
    { id: 3, name: 'Charlie', grades: [95, 92, 98] },
    { id: 4, name: 'Diana', grades: [75, 78, 80] }
  ];

  const result = multiStepTransform(students);

  assert.strictEqual(result.length, 3, 'Returns 3 students with avg > 75');
  assert.strictEqual(result[0].name, 'Charlie', 'Highest average first');
  assert(result[0].averageGrade > 90, 'Charlie average above 90');
});

test('multiStepTransform - sorts descending by average', () => {
  const students = [
    { id: 1, name: 'A', grades: [80, 90] },
    { id: 2, name: 'B', grades: [85, 85] },
    { id: 3, name: 'C', grades: [75, 80] }
  ];

  const result = multiStepTransform(students);

  // A: 85, B: 85, C: 77.5, all > 75
  assert.strictEqual(result[0].averageGrade, 85, 'First average is 85');
  assert(result[2].averageGrade < result[0].averageGrade, 'Sorted descending');
});

// ============================================================================
// FILTER, MAP, REDUCE WITH MATH
// ============================================================================

test('findMaxValue - finds max from filtered values', () => {
  const transactions = [
    { id: 1, amount: 100, type: 'credit' },
    { id: 2, amount: 50, type: 'debit' },
    { id: 3, amount: 500, type: 'credit' },
    { id: 4, amount: 200, type: 'credit' },
    { id: 5, amount: 1000, type: 'debit' }
  ];

  const max = findMaxValue(transactions);

  assert.strictEqual(max, 500, 'Returns maximum credit transaction');
});

test('findMaxValue - handles no matches', () => {
  const transactions = [
    { id: 1, amount: 100, type: 'debit' }
  ];

  const max = findMaxValue(transactions);

  assert.strictEqual(max, -Infinity, 'Returns -Infinity when no credit transactions');
});

// ============================================================================
// REDUCE FOR GROUPING
// ============================================================================

test('groupAndSum - groups by category and sums', () => {
  const expenses = [
    { date: '2024-01-01', category: 'food', amount: 50 },
    { date: '2024-01-02', category: 'transport', amount: 30 },
    { date: '2024-01-03', category: 'food', amount: 45 },
    { date: '2024-01-04', category: 'entertainment', amount: 100 }
  ];

  const result = groupAndSum(expenses);

  assert.strictEqual(result.food, 95, 'Food total is 95');
  assert.strictEqual(result.transport, 30, 'Transport total is 30');
  assert.strictEqual(result.entertainment, 100, 'Entertainment total is 100');
});

test('groupAndSum - handles multiple entries per category', () => {
  const expenses = [
    { date: '2024-01-01', category: 'work', amount: 100 },
    { date: '2024-01-02', category: 'work', amount: 200 },
    { date: '2024-01-03', category: 'work', amount: 150 }
  ];

  const result = groupAndSum(expenses);

  assert.strictEqual(result.work, 450, 'Work total is 450');
});

// ============================================================================
// COMPLEX REPORT GENERATION
// ============================================================================

test('createReport - generates sales report', () => {
  const sales = [
    { id: 1, amount: 100, region: 'North', representative: 'Alice' },
    { id: 2, amount: 200, region: 'South', representative: 'Bob' },
    { id: 3, amount: 150, region: 'North', representative: 'Charlie' },
    { id: 4, amount: 300, region: 'East', representative: 'Diana' }
  ];

  const report = createReport(sales);

  assert.strictEqual(report.totalSales, 750, 'Total sales is 750');
  assert.strictEqual(report.averageSale, 187.5, 'Average sale is 187.5');
  assert.strictEqual(report.topRegion, 'North', 'North is top region');
  assert.strictEqual(report.regions.North, 250, 'North region total');
  assert.strictEqual(report.regions.South, 200, 'South region total');
});

test('createReport - handles single sale', () => {
  const sales = [
    { id: 1, amount: 500, region: 'North', representative: 'Alice' }
  ];

  const report = createReport(sales);

  assert.strictEqual(report.totalSales, 500, 'Total is 500');
  assert.strictEqual(report.averageSale, 500, 'Average is 500');
  assert.strictEqual(report.topRegion, 'North', 'Only region is top');
});

// ============================================================================
// CUSTOM PIPELINE
// ============================================================================

test('pipeline - creates chainable interface', () => {
  const data = [
    { name: 'item1', value: 10 },
    { name: 'item2', value: 20 },
    { name: 'item3', value: 30 },
    { name: 'item4', value: 5 }
  ];

  const pipe = pipeline(data);

  assert(pipe.filter, 'Pipeline has filter method');
  assert(pipe.map, 'Pipeline has map method');
  assert(pipe.reduce, 'Pipeline has reduce method');
  assert(pipe.get, 'Pipeline has get method');
});

test('pipeline - filter and map chaining', () => {
  const data = [
    { name: 'item1', value: 10 },
    { name: 'item2', value: 20 },
    { name: 'item3', value: 30 },
    { name: 'item4', value: 5 }
  ];

  const result = pipeline(data)
    .filter(item => item.value > 10)
    .map(item => item.value * 2)
    .get();

  assert.deepStrictEqual(result, [40, 60], 'Filter and map chaining works');
});

test('pipeline - reduce at end', () => {
  const data = [
    { value: 10 },
    { value: 20 },
    { value: 30 }
  ];

  const result = pipeline(data)
    .map(item => item.value)
    .reduce((sum, val) => sum + val, 0);

  assert.strictEqual(result, 60, 'Reduce returns final value');
});

test('pipeline - complex chaining', () => {
  const data = [
    { type: 'A', amount: 100 },
    { type: 'B', amount: 50 },
    { type: 'A', amount: 150 },
    { type: 'C', amount: 200 },
    { type: 'A', amount: 75 }
  ];

  const result = pipeline(data)
    .filter(item => item.type === 'A')
    .map(item => item.amount)
    .reduce((sum, amount) => sum + amount, 0);

  assert.strictEqual(result, 325, 'Complex chain works (100 + 150 + 75)');
});

test('pipeline - get returns current state', () => {
  const data = [1, 2, 3, 4, 5];

  const filtered = pipeline(data)
    .filter(x => x > 2)
    .get();

  assert.deepStrictEqual(filtered, [3, 4, 5], 'Get returns filtered array');
});

test('pipeline - can continue after get', () => {
  const data = [1, 2, 3, 4, 5];

  const result = pipeline(data)
    .filter(x => x > 2)
    .map(x => x * 2)
    .filter(x => x > 6)
    .get();

  assert.deepStrictEqual(result, [8, 10], 'Can continue chaining after get');
});
