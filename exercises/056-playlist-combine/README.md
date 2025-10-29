# 056 - Playlist Combine

## Overview

Learn different techniques for merging arrays by combining multiple playlists. This exercise explores both `concat()` and the spread operator for array combination.

## Challenge

You need to implement two functions that merge playlists:

1. **`mergePlaylist(otherPlaylist)`** - Combine using `concat()` method
   - Merge the current playlist with another playlist
   - Return a **new array** without modifying either original
   - The current playlist should come first, then the other playlist

2. **`combineWithSpread(otherPlaylist)`** - Combine using the spread operator
   - Merge the current playlist with another playlist
   - Return a **new array** without modifying either original
   - Use the spread operator syntax: `[...array1, ...array2]`

## Hints

- `concat()` creates a new array: `array1.concat(array2)`
- The spread operator allows destructuring arrays: `[...array1, ...array2]`
- Both methods should produce identical results
- Neither method modifies the original arrays
- Both methods work with arrays of objects just like arrays of primitives

## Example Usage

```javascript
addSong('Bohemian Rhapsody', 'Queen');
addSong('Imagine', 'John Lennon');

const otherPlaylist = [
  { title: 'A Day in the Life', artist: 'The Beatles' }
];

const merged = mergePlaylist(otherPlaylist);
console.log(merged.length); // 3
console.log(merged[0].title); // 'Bohemian Rhapsody' (from current)
console.log(merged[2].title); // 'A Day in the Life' (from other)

const combined = combineWithSpread(otherPlaylist);
console.log(combined.length); // 3 (same as merged)
```

## Learning Outcomes

After completing this exercise, you will understand:
- The `concat()` method for combining arrays
- The spread operator for array destructuring and combination
- Why both methods produce new arrays without modification
- Immutability patterns in array operations
- When to use `concat()` vs spread operator

## Tests

Run the tests to verify your implementation:

```bash
npm test
```

---

## Read More

- [MDN: Array.prototype.concat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
- [MDN: Spread Syntax (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [MDN: Array Copying Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#copying_methods_and_mutating_methods)
