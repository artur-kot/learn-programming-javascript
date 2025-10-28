# 067 - Inventory: Search Products

## Overview

Implement advanced search and filtering operations on the product inventory. This exercise combines filter, find, reduce, and sorting methods for real-world data queries.

## Challenge

Implement these search functions:

1. **`searchByName(query)`** - Find products by name (case-insensitive, partial match)
2. **`findProductById(id)`** - Find single product by exact ID
3. **`getProductsInPriceRange(minPrice, maxPrice)`** - Filter by price range, sorted by price
4. **`getLowStockProducts(threshold = 5)`** - Find low stock items, sorted by quantity
5. **`getCategoryStats()`** - Generate statistics per category (count, totalValue, avgPrice)

## Hints

- Use `.toLowerCase().includes()` for case-insensitive search
- Use `.find()` to locate a single item by ID
- Use `.filter()` then `.sort()` for range queries
- Use `.reduce()` or `.forEach()` to build category statistics
- For average price, sum all prices in category and divide by count

## Example Usage

```javascript
populateInventory();

searchByName('top');              // Find 'Laptop'
findProductById(2);               // Find Mouse
getProductsInPriceRange(100, 500); // Electronics + Furniture
getLowStockProducts(5);           // Items with ≤5 units
getCategoryStats();               // { Electronics: {...}, Furniture: {...} }
```

## Tests

```bash
npm test
```

## Read More

- [MDN: Array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [MDN: Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [MDN: Array.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [MDN: Array.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
