# 064 - Inventory: Object Destructuring

## Overview

Learn how to extract properties from objects using destructuring syntax. This is a modern ES6+ feature that makes code cleaner and more readable.

## Challenge

Implement these functions using object destructuring:

1. **`extractProductName(product)`** - Extract just the name property and return it
2. **`extractProductInfo(product)`** - Extract name, price, and quantity into an object
3. **`extractWithDefaults(product, defaultCategory)`** - Extract name, price, and category with a default fallback

## Hints

- Basic destructuring: `const { name } = product`
- Multiple properties: `const { name, price, quantity } = product`
- Default values: `const { category = 'Uncategorized' } = product`
- Renaming: `const { price: unitPrice } = product` (advanced)

## Example Usage

```javascript
const laptop = { name: 'Laptop', price: 999.99, quantity: 5 };

extractProductName(laptop);           // 'Laptop'
extractProductInfo(laptop);           // { name: 'Laptop', price: 999.99, quantity: 5 }
extractWithDefaults(laptop);          // { name: 'Laptop', price: 999.99, category: 'Uncategorized' }
```

## Tests

```bash
npm test
```

## Read More

- [MDN: Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [MDN: Object Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#object_destructuring)
