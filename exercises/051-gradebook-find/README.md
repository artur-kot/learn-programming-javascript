## Grade Book - Find Student

Find specific scores in an array using find() and findIndex() methods.

In this exercise you'll learn about array search methods and how to locate specific elements.

## Your Challenge

Open `051-gradebook-find.js`. Implement:
- `findScore(score)` — use Array.find() to locate a score
- `findScoreIndex(score)` — use Array.findIndex() to get the index
- `findHighestScore()` — return the maximum score
- `findLowestScore()` — return the minimum score

Requirements:
- `findScore` uses `.find()` and returns the value or undefined
- `findScoreIndex` uses `.findIndex()` and returns index or -1
- Both work with comparison predicates
- Find highest/lowest by comparing all values

## Expected Behavior

```javascript
addScore(85);
addScore(90);
addScore(75);

findScore(90);           // 90
findScore(100);          // undefined

findScoreIndex(90);      // 1
findScoreIndex(100);     // -1

findHighestScore();      // 90
findLowestScore();       // 75
```

## Hints

<details>
<summary>Hint 1: Array.find()</summary>

The `find()` method returns the first element that matches the predicate:

```javascript
return scores.find(s => s === score);
```

</details>

<details>
<summary>Hint 2: Array.findIndex()</summary>

The `findIndex()` method returns the index of the first match, or -1 if not found.

</details>

<details>
<summary>Hint 3: Finding extremes</summary>

Use a loop to compare each score and track the highest/lowest value.

</details>

## Test Your Code

```bash
cd exercises/051-gradebook-find
node 051-gradebook-find.test.js
```

## What You're Learning

- Array.find() method for locating elements
- Array.findIndex() for getting positions
- Predicate functions with search methods
- Finding maximum and minimum values
- The difference between find() and findIndex()

## Reflection Questions

1. What's the difference between find() and findIndex()?
2. Why does findIndex() return -1 instead of undefined?
3. How could you find the index of the highest score?

## Next Steps

Next, you'll calculate the class average using reduce().

## Read More

- 📚 [Array.find() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- 📚 [Array.findIndex() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
- 📖 [Array find() - JavaScript.info](https://javascript.info/array-methods#find)