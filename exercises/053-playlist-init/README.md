# 053 - Playlist Initialize

## Overview

Create a simple playlist manager that stores and manages a collection of songs. This exercise introduces you to working with arrays of objects and basic array operations.

## Challenge

You need to implement three functions to manage a music playlist:

1. **`addSong(title, artist)`** - Add a new song to the playlist
   - Store each song as an object with `title` and `artist` properties
   - The song should be added to an internal playlist array
   - Don't return anything

2. **`getSongs()`** - Retrieve all songs from the playlist
   - Return the entire playlist array
   - Each element should be an object with `title` and `artist`

3. **`getSongCount()`** - Get the number of songs in the playlist
   - Return the total count of songs
   - Should match the length of the playlist array

## Hints

- Use a module-level variable to store the playlist: `let playlist = [];`
- Use the `push()` method to add songs to the array
- Songs should be stored as objects: `{ title, artist }`
- Use object shorthand notation when the property name matches the variable name

## Example Usage

```javascript
addSong('Bohemian Rhapsody', 'Queen');
addSong('Imagine', 'John Lennon');

console.log(getSongCount()); // 2
console.log(getSongs());     // [{ title: 'Bohemian Rhapsody', artist: 'Queen' }, ...]
```

## Learning Outcomes

After completing this exercise, you will understand:
- How to work with arrays of objects
- Module-level state management
- Basic array operations (push, length)
- Object literal syntax and shorthand notation

## Tests

Run the tests to verify your implementation:

```bash
npm test
```

---

## Read More

- [MDN: Array push()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
- [MDN: Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
- [MDN: Array Index](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#array_indices)
