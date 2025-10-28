# 063 - Inventory: Product Objects

## Overview

Build a product inventory system using objects with multiple properties and methods. This is a more complex starting point that introduces real-world data structures.

## Challenge

You are given a more complex starter code with helper functions that create and manage products. Each product has:
- `id`: Unique identifier
- `name`: Product name
- `price`: Unit price
- `quantity`: Amount in stock
- `category`: Product category
- `totalValue()`: Method to calculate price × quantity

Implement these functions:

1. **`getInventory()`** - Return the entire inventory array
2. **`getProductCount()`** - Return the number of unique products
3. **`getTotalInventoryValue()`** - Calculate total value of all products (sum of all totalValue())
4. **`getProductsByCategory(category)`** - Find all products matching a category

## Hints

- Use `.length` to count products
- Use `.reduce()` to sum values
- Use `.filter()` to find products by category
- Products are objects with both data properties and methods

## Example Usage

```javascript
populateInventory();
console.log(getProductCount());           // 5
console.log(getTotalInventoryValue());    // Total value of all products
console.log(getProductsByCategory('Electronics')); // Array of 3 products
```

## Tests

```bash
npm test
```

## Read More

- [MDN: Object Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#defining_methods)
- [MDN: Array Methods - reduce, filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
