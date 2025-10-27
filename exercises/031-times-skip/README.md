## Times Table - Skip Evens

You've learned about the `break` statement that exits a loop completely. Now you'll learn about `continue` - which skips just the current iteration and moves to the next one!

## What You're Building On

From exercises 028-030, you have:
- `timesTable(number)` - single multiplication table
- `timesGrid()` - complete 10x10 grid
- `timesGridRange(minRow, maxRow, minCol, maxCol)` - flexible range grid

All of these show EVERY number in the range. But what if you only want certain numbers? That's where `continue` comes in!

## Your Challenge

Open `031-times-skip.js`. Create a function called `timesGridOddsOnly(minRow, maxRow, minCol, maxCol)` that:
- Works like `timesGridRange` with the same four parameters
- BUT skips all even numbers (only shows odd × odd multiplications)
- Uses the `continue` statement to skip even rows and columns

**Examples:**
- `timesGridOddsOnly(1, 5, 1, 5)` shows only 1, 3, 5 (skips 2, 4)
- `timesGridOddsOnly(1, 10, 1, 10)` shows only 1, 3, 5, 7, 9 (skips 2, 4, 6, 8, 10)

## Expected Output

When you run your code, you should see:

```
=== Standard 1-5 grid (all numbers) ===

1 x 1 = 1
1 x 2 = 2
1 x 3 = 3
1 x 4 = 4
1 x 5 = 5
[continues with 2, 3, 4, 5 rows...]

=== Odds only 1-5 grid (skip evens) ===

1 x 1 = 1
1 x 3 = 3
1 x 5 = 5

3 x 1 = 3
3 x 3 = 9
3 x 5 = 15

5 x 1 = 5
5 x 3 = 15
5 x 5 = 25
```

Notice how rows 2 and 4 are completely missing, AND columns 2 and 4 are missing from the rows that do appear!

## Hints

<details>
<summary>Hint 1: Understanding continue</summary>

The `continue` statement skips the rest of the current iteration and jumps to the next one:

```javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue;  // Skip when i is 3
  }
  console.log(i);
}
// Output: 1, 2, 4, 5 (skips 3)
```

When JavaScript encounters `continue`, it immediately jumps back to the loop's next iteration.

</details>

<details>
<summary>Hint 2: Checking if a number is even</summary>

Use the modulo operator (%) to check if a number is even:

```javascript
if (number % 2 === 0) {
  // number is even (divisible by 2)
  continue;  // Skip this iteration
}
```

If `number % 2` equals 0, the number is even. If it equals 1, the number is odd.

</details>

<details>
<summary>Hint 3: Using continue in nested loops</summary>

You need to check BOTH the row and column:

```javascript
for (let row = minRow; row <= maxRow; row++) {
  if (row % 2 === 0) {
    continue;  // Skip entire row if it's even
  }

  for (let col = minCol; col <= maxCol; col++) {
    if (col % 2 === 0) {
      continue;  // Skip this column if it's even
    }

    // Calculate and display (only runs for odd row AND odd col)
  }
}
```

The outer continue skips entire rows. The inner continue skips individual columns.

</details>

<details>
<summary>Hint 4: Complete solution</summary>

```javascript
export function timesGridOddsOnly(minRow, maxRow, minCol, maxCol) {
  for (let row = minRow; row <= maxRow; row++) {
    if (row % 2 === 0) {
      continue;  // Skip even rows
    }

    for (let col = minCol; col <= maxCol; col++) {
      if (col % 2 === 0) {
        continue;  // Skip even columns
      }

      let result = row * col;
      console.log(`${row} x ${col} = ${result}`);
    }
    console.log("");  // Blank line after each row's columns
  }
}
```

Only odd × odd combinations get displayed!

</details>

## Test Your Code

To run your code:
```bash
cd exercises/031-times-skip
node 031-times-skip.js
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise teaches you:
- **Continue statement** - skipping iterations without exiting the loop
- **Filtering in loops** - showing only data that meets certain conditions
- **Modulo operator** - checking if numbers are even or odd
- **Nested loop control** - continue affects only the loop it's in

The `continue` statement is useful for:
- Filtering data as you process it
- Skipping invalid or unwanted items
- Processing only items that meet specific criteria
- Optimizing loops by skipping unnecessary work

## Reflection Questions

After completing the exercise, think about:
1. What's the difference between `break` (from exercise 027) and `continue`?
2. For `timesGridOddsOnly(1, 10, 1, 10)`, how many equations are displayed?
3. What would happen if you put the `continue` AFTER the console.log instead of before?
4. Could you modify this to skip numbers divisible by 3 instead of even numbers?

## Break vs Continue

**Break - exits the loop completely:**
```javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    break;  // Exit loop entirely
  }
  console.log(i);
}
// Output: 1, 2 (stops at 3)
```

**Continue - skips to next iteration:**
```javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue;  // Skip 3, but keep going
  }
  console.log(i);
}
// Output: 1, 2, 4, 5 (skips 3)
```

## Understanding the Math

For `timesGridOddsOnly(1, 10, 1, 10)`:
- Range 1-10 has 5 odd numbers: 1, 3, 5, 7, 9
- 5 odd rows × 5 odd columns = 25 equations total
- Compare to regular grid: 10 × 10 = 100 equations

For `timesGridOddsOnly(1, 5, 1, 5)`:
- Range 1-5 has 3 odd numbers: 1, 3, 5
- 3 odd rows × 3 odd columns = 9 equations total
- Compare to regular grid: 5 × 5 = 25 equations

## Next Steps

Excellent work! You've learned how to filter loop iterations with `continue`. In the final exercise of this series, you'll learn how to format your multiplication table with proper spacing and alignment to make it look like a professional data table!

## Read More

Want to dive deeper? Check out these resources:

- 📚 [Conditional Logic in Loops - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration#break_and_continue_statements)
- 📖 [continue Statement - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue)
- 🎯 [Loop Control - JavaScript.info](https://javascript.info/while-for#breaking-the-loop)

