# 066 - Inventory: Clone and Merge (Spread Operator)

## Overview

Practice cloning and merging objects using the spread operator to maintain immutability while updating data.

## Challenge

- Implement `cloneProduct(product)` to return a shallow copy of the product using spread.
- Implement `updateProductPrice(product, newPrice)` to return a new product with updated price.
- Implement `mergeProductUpdates(product, updates)` to return a new product merged with provided updates.
- Implement `addProductWithDefaults(name, price, quantity, category)` to create a new product with default category when missing and add it to inventory.

## Hints

- Use `{ ...product }` for shallow cloning
- Merging can be done with `{ ...product, ...updates }`
- To get next ID, find max existing `id` in inventory and add 1

## Tests

```bash
npm test
```
