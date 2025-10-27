## Shopping List - Item List

Expand your shopping list by managing multiple items in an array.

In this exercise you'll create functions to add items to a list, retrieve the entire list, and clear it.

## Your Challenge

Open `044-shopping-list.js`. Implement:
- `addToList(item)` — add an item to the shopping list
- `getList()` — return the complete shopping list array
- `clearList()` — remove all items from the list

Requirements:
- Use an array to store multiple items
- `addToList` should append items to the array
- `getList` should return the current array
- `clearList` should reset the array to empty
- Previous functions (`addItem`, `getItem`) should still work

## Expected Behavior

```javascript
clearList();
addToList('milk');
addToList('bread');
addToList('eggs');
getList();       // ['milk', 'bread', 'eggs']

clearList();
getList();       // []
```

## Hints

<details>
<summary>Hint 1: Array declaration</summary>

Create an array variable at the module level to store your shopping list.

</details>

<details>
<summary>Hint 2: Push method</summary>

Use the `.push()` array method to add items to the array.

</details>

<details>
<summary>Hint 3: Array reassignment</summary>

To clear the list, you can reassign your array variable to an empty array: `shoppingList = [];`

</details>

## Test Your Code

```bash
cd exercises/044-shopping-list
node 044-shopping-list.test.js
```

## What You're Learning

- Array manipulation and methods
- Managing collections of data
- Array push, reassignment, and iteration
- State management with multiple items

## Reflection Questions

1. Why use an array instead of multiple variables?
2. Should `addToList` allow duplicate items? Why or why not?
3. What other list operations might be useful?

## Next Steps

Next, you'll add the ability to remove specific items and find items in the list.

## Read More

- 📚 [Array Methods - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- 📖 [Array push() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
- 📚 [Array - JavaScript.info](https://javascript.info/array)