# 055 - Playlist Search

## Overview

Implement search functionality to find songs by title or artist. This exercise teaches you how to filter arrays based on search criteria.

## Challenge

You need to implement two search functions:

1. **`searchByTitle(query)`** - Find all songs with a matching title
   - Search for songs where the title **contains** the query string
   - The search should be **case-insensitive**
   - Return an array of matching song objects
   - Return an empty array if no matches found

2. **`searchByArtist(query)`** - Find all songs by a matching artist
   - Search for songs where the artist **contains** the query string
   - The search should be **case-insensitive**
   - Return an array of matching song objects
   - Return an empty array if no matches found

## Hints

- Use `Array.filter()` to find matching songs
- Use `String.toLowerCase()` to make comparisons case-insensitive
- Use `String.includes()` to check if a string contains the query text
- Both functions should return arrays, even if empty

## Example Usage

```javascript
addSong('Bohemian Rhapsody', 'Queen');
addSong('Another One Bites the Dust', 'Queen');
addSong('Imagine', 'John Lennon');

const queenSongs = searchByArtist('Queen');
console.log(queenSongs.length); // 2

const rhapsodySongs = searchByTitle('Rhapsody');
console.log(rhapsodySongs[0].title); // 'Bohemian Rhapsody'

const noMatch = searchByTitle('Unknown');
console.log(noMatch.length); // 0
```

## Learning Outcomes

After completing this exercise, you will understand:
- How to filter arrays with specific conditions
- Case-insensitive string comparisons
- Partial string matching with `includes()`
- Returning filtered subsets of data
- How `filter()` and `map()` differ in purpose

## Tests

Run the tests to verify your implementation:

```bash
npm test
```

---

## Read More

- [MDN: Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [MDN: String.prototype.includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
- [MDN: String.prototype.toLowerCase()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase)
