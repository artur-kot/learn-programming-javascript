## Grade Book - Calculate Average

Calculate class statistics using the reduce() method to aggregate array data.

In this exercise you'll learn about array reduction and create comprehensive class statistics.

## Your Challenge

Open `052-gradebook-reduce.js`. Implement:
- `calculateClassAverage()` — use Array.reduce() to calculate the average score
- `getStatistics()` — return comprehensive statistics object

The statistics object should include:
- `average` — average score (using reduce)
- `highest` — highest score
- `lowest` — lowest score
- `total` — total number of scores
- `passing` — count of passing scores (70+)
- `failing` — count of failing scores (< 70)

Requirements:
- Use `.reduce()` method to sum scores for average calculation
- Compose multiple existing functions
- Return meaningful statistics data

## Expected Behavior

```javascript
addScore(95);
addScore(75);
addScore(65);
addScore(55);

calculateClassAverage();     // 72.5

getStatistics();
// {
//   average: 72.5,
//   highest: 95,
//   lowest: 55,
//   total: 4,
//   passing: 2,
//   failing: 2
// }
```

## Hints

<details>
<summary>Hint 1: Array.reduce()</summary>

The `reduce()` method accumulates values into a single result:

```javascript
const sum = scores.reduce((total, score) => total + score, 0);
```

</details>

<details>
<summary>Hint 2: Composition</summary>

Reuse existing functions like `findHighestScore()` and `getPassingScores()`.

</details>

<details>
<summary>Hint 3: Object creation</summary>

Return an object with all statistics computed from existing functions.

</details>

## Test Your Code

```bash
cd exercises/052-gradebook-reduce
node 052-gradebook-reduce.test.js
```

## What You're Learning

- Array.reduce() method for aggregation
- Creating summary statistics
- Composing multiple array operations
- Building comprehensive data reports
- Functions that combine other functions

## Reflection Questions

1. Why is reduce() powerful for aggregation?
2. How could you calculate median or mode using reduce()?
3. What other statistics would be useful for a grade book?

## Congratulations!

You've completed the Student Grade Book series! You've learned:
- Array storage and basic operations
- Array.map() for transformation
- Array.filter() for selection
- Array.find() and findIndex() for searching
- Array.reduce() for aggregation

These are essential array methods for data processing.

## Read More

- 📚 [Array.reduce() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- 📖 [Array reduce() - JavaScript.info](https://javascript.info/array-methods#reduce)
- 📚 [Array Methods Summary - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#instance_methods)