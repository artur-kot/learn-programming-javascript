## Times Table - Custom Range

You've mastered nested loops! Now let's make your multiplication grid more flexible by accepting custom ranges instead of always going from 1 to 10.

## What You're Building On

From exercises 028-029, you have:
- `timesTable(number)` - single multiplication table
- `timesGrid()` - complete 10x10 multiplication grid using nested loops

Both of these are hardcoded to work with specific ranges. But what if you want a 5x5 grid? Or rows 3-7 with columns 1-10? That's where parameters come in!

## Your Challenge

Open `030-times-range.js`. Create a function called `timesGridRange(minRow, maxRow, minCol, maxCol)` that accepts FOUR parameters to control the grid size:

**Parameters:**
- `minRow` - starting number for rows (outer loop)
- `maxRow` - ending number for rows (outer loop)
- `minCol` - starting number for columns (inner loop)
- `maxCol` - ending number for columns (inner loop)

This lets you create any size grid with any starting and ending points!

## Expected Output

When you run your code, you should see:

```
=== Custom range: 5x5 grid (1 to 5) ===

1 x 1 = 1
1 x 2 = 2
...
1 x 5 = 5

2 x 1 = 2
...
5 x 5 = 25

=== Custom range: 3-7 rows, 1-10 columns ===

3 x 1 = 3
3 x 2 = 6
...
3 x 10 = 30

4 x 1 = 4
...
7 x 10 = 70

=== Custom range: 8-10 rows, 8-10 columns ===

8 x 8 = 64
8 x 9 = 72
8 x 10 = 80

9 x 8 = 72
9 x 9 = 81
9 x 10 = 90

10 x 8 = 80
10 x 9 = 90
10 x 10 = 100
```

## Hints

<details>
<summary>Hint 1: Using parameters in loop conditions</summary>

Instead of hardcoding `1` and `10`, use the parameters:

```javascript
// Before (hardcoded):
for (let outer = 1; outer <= 10; outer++) {
  for (let inner = 1; inner <= 10; inner++) {
    // ...
  }
}

// After (flexible with parameters):
for (let row = minRow; row <= maxRow; row++) {
  for (let col = minCol; col <= maxCol; col++) {
    // ...
  }
}
```

Now the loops adapt based on what values are passed in!

</details>

<details>
<summary>Hint 2: Better variable names</summary>

Since we're working with rows and columns, using descriptive names helps:

```javascript
export function timesGridRange(minRow, maxRow, minCol, maxCol) {
  for (let row = minRow; row <= maxRow; row++) {
    for (let col = minCol; col <= maxCol; col++) {
      let result = row * col;
      // Display the multiplication
    }
    // Blank line after each row
  }
}
```

Using `row` and `col` instead of `outer` and `inner` makes the code clearer!

</details>

<details>
<summary>Hint 3: Structure is identical to timesGrid</summary>

The structure is EXACTLY the same as `timesGrid()` - you're just using parameters instead of hardcoded values:

```javascript
export function timesGridRange(minRow, maxRow, minCol, maxCol) {
  for (let row = minRow; row <= maxRow; row++) {
    for (let col = minCol; col <= maxCol; col++) {
      let result = row * col;
      console.log(`${row} x ${col} = ${result}`);
    }
    console.log(""); // Blank line between row groups
  }
}
```

That's it! Parameters give you flexibility without changing the logic.

</details>

## Test Your Code

To run your code:
```bash
cd exercises/030-times-range
node 030-times-range.js
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise teaches you:
- **Function parameters** - making functions flexible and reusable
- **Loop ranges** - starting and ending loops at any point, not just 0 or 1
- **Code reusability** - one function handles many different scenarios
- **Variable naming** - using descriptive names (row/col) for clarity

This pattern is useful for:
- Creating flexible data structures
- Generating custom-sized grids or tables
- Processing subsets of data
- Building configurable components

## Reflection Questions

After completing the exercise, think about:
1. What happens if you call `timesGridRange(5, 5, 5, 5)`? (min equals max)
2. How many equations are displayed for `timesGridRange(2, 4, 1, 10)`?
3. Could you modify this to accept just TWO parameters (min and max) and use them for both rows and columns?
4. What would happen if maxRow is LESS than minRow? (e.g., `timesGridRange(10, 5, 1, 5)`)

## Understanding the Math

For `timesGridRange(3, 7, 1, 10)`:
- Rows: 3, 4, 5, 6, 7 (5 rows total)
- Columns: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 (10 columns total)
- Total equations: 5 × 10 = 50

The formula: `(maxRow - minRow + 1) × (maxCol - minCol + 1)`

For `timesGridRange(8, 10, 8, 10)`:
- Rows: 8, 9, 10 (3 rows)
- Columns: 8, 9, 10 (3 columns)
- Total equations: 3 × 3 = 9

## Next Steps

Great work! You've made your multiplication grid completely flexible. In the next exercise, you'll learn about the `continue` statement - a way to SKIP certain iterations without exiting the loop entirely. You'll use it to skip even numbers in your multiplication table!