## Shopping Manager - Complete Manager Object

Create a complete shopping list manager by composing all functionality into a single object.

In this exercise you'll bring together all the shopping list operations you've created into a cohesive manager object.

## Your Challenge

Open `047-shopping-manager.js`. Implement:
- `createShoppingManager()` — factory function that returns a manager object

The manager object should have methods:
- `add(item, quantity)` — add item with optional quantity (default 1)
- `remove(item)` — remove item, return true/false
- `getList()` — return array of items with quantities
- `updateQuantity(item, quantity)` — update item quantity, return true/false
- `getTotal()` — return sum of all quantities
- `clear()` — remove all items
- `findItem(item)` — return index of item or -1
- `isEmpty()` — return true if list is empty
- `getCount()` — return number of unique items

Requirements:
- Use a closure to maintain private state
- Each manager instance should be independent
- All methods should be accessible on the returned object

## Expected Behavior

```javascript
const manager = createShoppingManager();
manager.clear();

manager.add('milk', 2);
manager.add('eggs', 12);

manager.getList();       // [{ item: 'milk', quantity: 2 }, { item: 'eggs', quantity: 12 }]
manager.getTotal();      // 14
manager.getCount();      // 2
manager.isEmpty();       // false

manager.updateQuantity('milk', 5);
manager.getTotal();      // 17

manager.remove('milk');
manager.getCount();      // 1

// Each instance is independent
const manager2 = createShoppingManager();
manager2.getCount();     // 0
```

## Hints

<details>
<summary>Hint 1: Factory pattern</summary>

Return an object from `createShoppingManager()`. Each call creates a new independent manager with its own state.

</details>

<details>
<summary>Hint 2: Closures for privacy</summary>

Variables declared inside the function are private to that manager instance (closure).

</details>

<details>
<summary>Hint 3: Object methods shorthand</summary>

```javascript
return {
  add(item, quantity) { /* ... */ },
  remove(item) { /* ... */ },
  // ... more methods
};
```

</details>

## Test Your Code

```bash
cd exercises/047-shopping-manager
node 047-shopping-manager.test.js
```

## What You're Learning

- Factory functions and closures
- Object composition
- Encapsulation and data privacy
- Method organization
- Creating complete, usable interfaces

## Reflection Questions

1. Why use a factory function instead of a class?
2. How does closure enable private state?
3. Why is each manager instance independent?
4. How would you add additional features like categories or notes?

## Congratulations!

You've completed the Shopping List Manager series! You've learned:
- Basic state management with variables
- Arrays and array methods
- Objects and object methods
- Searching and filtering
- Composition and encapsulation
- Creating reusable interfaces

These skills are fundamental to building real applications.

## Read More

- 📚 [Closures - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- 📖 [Closures - JavaScript.info](https://javascript.info/closure)
- 📚 [Factory Functions - MDN](https://developer.mozilla.org/en-US/docs/Glossary/Factory_function)
- 📖 [Objects in Depth - JavaScript.info](https://javascript.info/object-methods)