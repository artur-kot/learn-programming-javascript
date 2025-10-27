## Grade Book - Map to Letters

Convert an array of numeric scores to letter grades using the map() method.

In this exercise you'll learn about array transformation with `map()` and convert scores to letters.

## Your Challenge

Open `049-gradebook-map.js`. Implement:
- `scoreToLetter(score)` — convert numeric score to letter grade
- `mapScoresToLetters()` — use Array.map() to convert all scores to letters

Grading scale:
- 90-100: A
- 80-89: B
- 70-79: C
- 60-69: D
- Below 60: F

Requirements:
- `scoreToLetter` uses conditionals to determine the letter
- `mapScoresToLetters` uses the `.map()` method on the scores array
- Return a new array without modifying the original

## Expected Behavior

```javascript
addScore(95);
addScore(80);
addScore(75);

scoreToLetter(95);           // 'A'
mapScoresToLetters();        // ['A', 'B', 'C']
```

## Hints

<details>
<summary>Hint 1: Array.map()</summary>

The `map()` method transforms each element and returns a new array:

```javascript
const letters = scores.map(score => scoreToLetter(score));
```

</details>

<details>
<summary>Hint 2: Arrow functions</summary>

Use arrow functions with map for concise transformation.

</details>

<details>
<summary>Hint 3: Non-mutating</summary>

`map()` returns a new array and doesn't change the original.

</details>

## Test Your Code

```bash
cd exercises/049-gradebook-map
node 049-gradebook-map.test.js
```

## What You're Learning

- Array.map() method for transformation
- Creating new arrays without mutation
- Arrow functions with array methods
- Pure functions (no side effects)

## Reflection Questions

1. Why does `map()` create a new array instead of modifying the existing one?
2. What would happen if you used a for loop instead of map()?
3. When would you use map() vs. forEach()?

## Next Steps

Next, you'll use filter() to find passing students.

## Read More

- 📚 [Array.map() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- 📖 [Array map() - JavaScript.info](https://javascript.info/array-methods#map)
- 📚 [Arrow Functions - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)