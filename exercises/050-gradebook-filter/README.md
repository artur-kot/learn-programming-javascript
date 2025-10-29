## Grade Book - Filter Passing

Filter an array of scores to find passing and failing grades using the filter() method.

In this exercise you'll learn about array filtering and separate passing from failing scores.

## Your Challenge

Open `050-gradebook-filter.js`. Implement:
- `getPassingScores(passingScore)` — return array of scores >= passing threshold
- `getFailingScores(passingScore)` — return array of scores < passing threshold

Requirements:
- Default passing score is 70
- Use Array.filter() method on the scores array
- Return new arrays without modifying the original
- Support custom passing scores

## Expected Behavior

```javascript
addScore(85);
addScore(75);
addScore(65);

getPassingScores();         // [85, 75]
getFailingScores();         // [65]

getPassingScores(80);       // [85]
```

## Hints

<details>
<summary>Hint 1: Array.filter()</summary>

The `filter()` method returns a new array with elements that pass a test:

```javascript
const passing = scores.filter(score => score >= passingScore);
```

</details>

<details>
<summary>Hint 2: Comparison operators</summary>

Use `>=` for greater than or equal (passing) and `<` for less than (failing).

</details>

<details>
<summary>Hint 3: Default parameters</summary>

Set `passingScore = 70` to provide a default value.

</details>

## Test Your Code

```bash
cd exercises/050-gradebook-filter
node 050-gradebook-filter.test.js
```

## What You're Learning

- Array.filter() method for selecting elements
- Creating subsets of arrays based on conditions
- Default parameters for flexibility
- Arrow functions with predicates

## Reflection Questions

1. When would you use filter() vs. map()?
2. Can you chain filter() with other array methods?
3. How would you count passing vs. failing without filtering?

## Next Steps

Next, you'll use find() and findIndex() to locate specific scores.

## Read More

- 📚 [Array.filter() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- 📖 [Array filter() - JavaScript.info](https://javascript.info/array-methods#filter)
- 📚 [Default Parameters - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)