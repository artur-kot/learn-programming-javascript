## Shopping List - Item Quantities

Track quantities for each item in your shopping list using objects.

In this exercise you'll switch from storing simple strings to storing objects that include item names and quantities.

## Your Challenge

Open `046-shopping-quantities.js`. Implement:
- `addItemWithQuantity(item, quantity)` — add an item with a quantity (default quantity = 1)
- `getListWithQuantities()` — return array of items with quantities
- `updateQuantity(item, quantity)` — update the quantity of an item
- `getTotalItems()` — return the sum of all quantities

Requirements:
- Each item should be stored as an object: `{ item: name, quantity: number }`
- Use a new array to store items with quantities
- `quantity` parameter defaults to 1
- `updateQuantity` returns true if successful, false if item not found
- `getTotalItems` sums all quantities

## Expected Behavior

```javascript
clearList();
addItemWithQuantity('milk', 2);
addItemWithQuantity('eggs', 12);

getListWithQuantities();
// [
//   { item: 'milk', quantity: 2 },
//   { item: 'eggs', quantity: 12 }
// ]

getTotalItems();        // 14

updateQuantity('milk', 3);
getTotalItems();        // 15
```

## Hints

<details>
<summary>Hint 1: Object shorthand</summary>

Use object shorthand when properties match variable names:

```javascript
const item = 'milk';
const quantity = 2;
const obj = { item, quantity };  // Same as { item: item, quantity: quantity }
```

</details>

<details>
<summary>Hint 2: Array of objects</summary>

Create a separate array to store these quantity-tracked items.

</details>

<details>
<summary>Hint 3: Iteration and aggregation</summary>

Use for-of to loop through items and accumulate quantities for the total.

</details>

## Test Your Code

```bash
cd exercises/046-shopping-quantities
node 046-shopping-quantities.test.js
```

## What You're Learning

- Objects as data structures
- Arrays of objects
- Property access and modification
- Aggregation and calculations
- Default parameters

## Reflection Questions

1. Why use an object instead of parallel arrays?
2. What if an item is added twice with different quantities?
3. How would you handle removing items by name?

## Next Steps

Next, you'll compose all functionality into a complete shopping manager object.

## Read More

- 📚 [Objects in JavaScript - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- 📖 [Object Basics - JavaScript.info](https://javascript.info/object)
- 📚 [Object Property Shorthand - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)