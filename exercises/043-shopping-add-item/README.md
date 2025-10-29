## Shopping List - Add Item

Start building a shopping list manager by creating basic item storage.

In this exercise you'll create functions to add and retrieve items from a simple shopping list.

## Your Challenge

Open `043-shopping-add-item.js`. Implement:
- `addItem(item)` — store an item for later retrieval
- `getItem()` — retrieve the currently stored item

Requirements:
- Store the item in a module-level variable
- `addItem` should replace any previous item
- `getItem` should return the stored item

## Expected Behavior

```javascript
addItem('milk');
getItem();        // 'milk'

addItem('bread');
getItem();        // 'bread'
```

## Hints

<details>
<summary>Hint 1: Module-level variable</summary>

Declare a variable at the top of your module (outside any function) to store the current item.

</details>

<details>
<summary>Hint 2: Simple assignment</summary>

Use `=` to assign the parameter to your storage variable in `addItem`.

</details>

<details>
<summary>Hint 3: Function scope</summary>

Your functions can access module-level variables because they're in the same scope.

</details>

## Test Your Code

```bash
cd exercises/043-shopping-add-item
node 043-shopping-add-item.test.js
```

## What You're Learning

- Module-level variables and scope
- State management with functions
- Function parameters and returns
- Basic data storage patterns

## Reflection Questions

1. Why use a module-level variable instead of returning different values?
2. What happens if you call `getItem()` before `addItem()`?
3. How is this similar to storing data in a real application?

## Next Steps

Next, you'll expand this to manage multiple items in a list.

## Read More

- 📚 [Scope in JavaScript - MDN](https://developer.mozilla.org/en-US/docs/Glossary/Scope)
- 📖 [Variables - JavaScript.info](https://javascript.info/variables)