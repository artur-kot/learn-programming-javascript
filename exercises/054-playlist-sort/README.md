# 054 - Playlist Sort and Shuffle

## Overview

Learn array sorting and shuffling techniques by implementing functions that organize and randomize your playlist without modifying the original.

## Challenge

You need to implement two functions that manipulate the playlist array:

1. **`sortByTitle()`** - Sort the playlist alphabetically by song title
   - Return a **new sorted array** (don't modify the original playlist)
   - Use alphabetical order (case-insensitive)
   - Preserve all song objects in the result

2. **`shufflePlaylist()`** - Randomly shuffle the playlist
   - Return a **new shuffled array** (don't modify the original playlist)
   - Use randomization to change the order
   - All original songs should remain in the result

## Hints

- Create a copy of the array first: `[...playlist]` (spread operator)
- Use `Array.sort()` with a comparison function for sorting
- Use `localeCompare()` for case-insensitive string comparison: `a.title.localeCompare(b.title)`
- For shuffle, you can use `Math.random() - 0.5` with sort (simple but not perfectly uniform)
- Always operate on a copy to maintain immutability

## Example Usage

```javascript
addSong('Bohemian Rhapsody', 'Queen');
addSong('Imagine', 'John Lennon');
addSong('A Day in the Life', 'The Beatles');

const sorted = sortByTitle();
console.log(sorted[0].title); // 'A Day in the Life'

const shuffled = shufflePlaylist();
console.log(shuffled.length); // 3
console.log(getSongs()[0].title); // Still 'Bohemian Rhapsody' (unchanged)
```

## Learning Outcomes

After completing this exercise, you will understand:
- How to sort arrays using comparison functions
- Shuffle algorithms and randomization
- The spread operator for creating copies
- Immutability patterns (not modifying original data)
- The `localeCompare()` method for string comparison

## Tests

Run the tests to verify your implementation:

```bash
npm test
```

---

## Read More

- [MDN: Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [MDN: String.prototype.localeCompare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)
- [MDN: Spread Syntax (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [MDN: Math.random()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
