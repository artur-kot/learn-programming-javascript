## Shopping List - Remove & Find Items

Search for and remove items from your shopping list.

In this exercise you'll add search and removal capabilities to your shopping list manager.

## Your Challenge

Open `045-shopping-remove.js`. Implement:
- `findItem(item)` — search for an item and return its index
- `removeItem(item)` — remove an item from the list

Requirements for `findItem`:
- Return the index of the first occurrence of the item
- Return -1 if the item is not found

Requirements for `removeItem`:
- Remove the first occurrence of the item from the list
- Return true if item was removed, false if not found
- Do not remove all occurrences, just the first one

## Expected Behavior

```javascript
clearList();
addToList('milk');
addToList('bread');
addToList('eggs');

findItem('bread');         // 1
findItem('cheese');        // -1

removeItem('bread');
getList();                 // ['milk', 'eggs']
removeItem('notfound');    // false
removeItem('milk');        // true
```

## Hints

<details>
<summary>Hint 1: indexOf method</summary>

Use the array `indexOf()` method to find the position of an item. It returns -1 if not found.

</details>

<details>
<summary>Hint 2: splice method</summary>

Use the array `splice()` method to remove items: `array.splice(index, 1)` removes 1 item at the given index.

</details>

<details>
<summary>Hint 3: Conditional removal</summary>

Check if indexOf returns a valid index (>= 0) before attempting to remove.

</details>

## Test Your Code

```bash
cd exercises/045-shopping-remove
node 045-shopping-remove.test.js
```

## What You're Learning

- Array search methods (indexOf)
- Array mutation methods (splice)
- Return values for operation success
- Defensive programming patterns

## Reflection Questions

1. Why does `removeItem` return a boolean instead of the item itself?
2. What's the difference between `indexOf` and `findIndex`?
3. How would you remove ALL occurrences of an item?

## Next Steps

Next, you'll add quantity tracking to manage item amounts.

## Read More

- 📚 [Array indexOf() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
- 📚 [Array splice() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
- 📖 [Array Methods - JavaScript.info](https://javascript.info/array-methods)