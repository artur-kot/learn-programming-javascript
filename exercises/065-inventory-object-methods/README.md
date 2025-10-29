# 065 - Inventory: Object Methods

## Overview

Learn how to analyze and introspect objects using `Object.keys()`, `Object.values()`, and `Object.entries()`. These methods are essential for iterating over object properties dynamically.

## Challenge

Implement these functions:

1. **`getProductPropertyNames(product)`** - Use `Object.keys()` to get all property names, excluding methods
2. **`getProductPropertyValues(product)`** - Use `Object.values()` to get all property values, excluding methods
3. **`getProductEntries(product)`** - Use `Object.entries()` to get [key, value] pairs, excluding methods
4. **`createPriceIndex()`** - Build an object mapping product names to prices using `Object.entries()` or loop

## Hints

- `Object.keys(obj)` returns array of property names
- `Object.values(obj)` returns array of property values
- `Object.entries(obj)` returns array of [key, value] pairs
- Use `.filter()` to exclude methods (check `typeof value !== 'function'`)
- Use `.forEach()` or `.reduce()` to build the price index

## Example Usage

```javascript
const product = { name: 'Laptop', price: 999.99, quantity: 5 };

Object.keys(product);    // ['name', 'price', 'quantity']
Object.values(product);  // ['Laptop', 999.99, 5]
Object.entries(product); // [['name', 'Laptop'], ['price', 999.99], ...]
```

## Tests

```bash
npm test
```

## Read More

- [MDN: Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
- [MDN: Object.values()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)
- [MDN: Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
