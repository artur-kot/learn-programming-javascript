## Grade Book - Store Scores

Start building a grade tracking system by storing an array of student scores.

In this exercise you'll create functions to add scores and retrieve them from an array.

## Your Challenge

Open `048-gradebook-store.js`. Implement:
- `addScore(score)` — add a score to the grade book array
- `getScores()` — return the array of all scores
- `getScoreCount()` — return the number of scores

Requirements:
- Store scores in an array
- Each score should be added to the end of the array
- Scores should remain in order
- Support any numeric score value

## Expected Behavior

```javascript
addScore(85);
addScore(92);
addScore(78);

getScores();       // [85, 92, 78]
getScoreCount();   // 3
```

## Hints

<details>
<summary>Hint 1: Array storage</summary>

Create an array at module level to store scores.

</details>

<details>
<summary>Hint 2: Array.push()</summary>

Use the `.push()` method to add scores to the array.

</details>

<details>
<summary>Hint 3: Array.length</summary>

Use the `.length` property to count scores.

</details>

## Test Your Code

```bash
cd exercises/048-gradebook-store
node 048-gradebook-store.test.js
```

## What You're Learning

- Arrays as data storage
- Array methods (.push())
- Array properties (.length)
- Maintaining order in arrays

## Reflection Questions

1. Why use an array instead of individual variables?
2. What happens if you add the same score twice?
3. How would you remove a score from the array?

## Next Steps

Next, you'll convert scores to letter grades using the map() method.

## Read More

- 📚 [Array push() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
- 📚 [Array length - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
- 📖 [Arrays - JavaScript.info](https://javascript.info/array)