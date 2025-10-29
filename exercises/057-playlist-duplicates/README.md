# 057 - Playlist Duplicates

## Overview

Detect duplicate songs in your playlist using advanced array methods like `some()` and `includes()`. This exercise teaches you how to identify and validate data in arrays.

## Challenge

You need to implement two functions to detect duplicates:

1. **`hasDuplicateTitles()`** - Check if any song appears more than once
   - Return `true` if **any** song title appears multiple times in the playlist
   - Return `false` if all song titles are unique
   - Compare by title only (not artist)

2. **`checkDuplicateByTitle(title)`** - Check if a specific title is duplicated
   - Search for a specific song title in the playlist
   - Return `true` if that title appears more than once
   - Return `false` if the title appears once or doesn't exist
   - The search should be **case-sensitive**

## Hints

- Use `Array.some()` to check if a condition is true for any element
- Use `Array.filter()` to count matching songs: `filter(s => s.title === title).length > 1`
- For `hasDuplicateTitles()`, you can use nested `some()` calls or `filter()` with counting
- Think about the logic: a duplicate means at least 2 occurrences
- The `some()` method short-circuits (stops early when it finds a match)

## Example Usage

```javascript
addSong('Imagine', 'John Lennon');
addSong('A Day in the Life', 'The Beatles');
addSong('Imagine', 'John Lennon');  // Duplicate!

console.log(hasDuplicateTitles());      // true
console.log(checkDuplicateByTitle('Imagine')); // true
console.log(checkDuplicateByTitle('A Day in the Life')); // false

addSong('Imagine', 'Different Artist'); // Another duplicate!
console.log(hasDuplicateTitles());      // true (still true)
```

## Learning Outcomes

After completing this exercise, you will understand:
- The `some()` method for finding elements based on conditions
- The difference between `some()` and `every()`
- How to use nested predicates for complex conditions
- Duplicate detection patterns
- Counting array elements that match criteria
- Boolean logic in array searches

## Tests

Run the tests to verify your implementation:

```bash
npm test
```

---

## Read More

- [MDN: Array.prototype.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
- [MDN: Array.prototype.includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
- [MDN: Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [MDN: Array.prototype.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
