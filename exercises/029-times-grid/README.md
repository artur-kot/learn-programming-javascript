## Times Table - Full Grid

This is where nested loops shine! In the previous exercise, you created a multiplication table for ONE number using a single loop. Now you'll create a COMPLETE multiplication grid showing all tables from 1 to 10.

## What You're Building On

From exercise 028, you have:
- `timesTable(number)` - displays one multiplication table from 1 to 10

That function uses ONE loop to count from 1 to 10 for a single number. But what if you want ALL the tables? That's where you need a loop INSIDE another loop!

## Your Challenge

Open `029-times-grid.js`. Your task is to create a function called `timesGrid()` that displays the complete multiplication grid:
- 1 times table (1x1 through 1x10)
- 2 times table (2x1 through 2x10)
- 3 times table (3x1 through 3x10)
- ... all the way through...
- 10 times table (10x1 through 10x10)

That's 100 multiplication equations in total!

**How nested loops work:**
- The OUTER loop picks which table to show (1's, 2's, 3's, etc.)
- For EACH outer loop iteration, the INNER loop runs completely (counting 1 to 10)
- This creates a grid pattern

## Expected Output

When you run your code, you should see (showing first few and last few lines):

```
=== Full multiplication grid (1-10) ===

1 x 1 = 1
1 x 2 = 2
1 x 3 = 3
...
1 x 10 = 10

2 x 1 = 2
2 x 2 = 4
2 x 3 = 6
...
2 x 10 = 20

...

10 x 1 = 10
10 x 2 = 20
10 x 3 = 30
...
10 x 10 = 100
```

Notice the blank lines between each table - that makes it easier to read!

## Hints

<details>
<summary>Hint 1: Understanding nested loops</summary>

A nested loop is simply a loop inside another loop:

```javascript
for (let outer = 1; outer <= 3; outer++) {
  console.log(`Outer loop: ${outer}`);

  for (let inner = 1; inner <= 3; inner++) {
    console.log(`  Inner loop: ${inner}`);
  }
}
```

Output:
```
Outer loop: 1
  Inner loop: 1
  Inner loop: 2
  Inner loop: 3
Outer loop: 2
  Inner loop: 1
  Inner loop: 2
  Inner loop: 3
Outer loop: 3
  Inner loop: 1
  Inner loop: 2
  Inner loop: 3
```

The inner loop runs COMPLETELY for each iteration of the outer loop!

</details>

<details>
<summary>Hint 2: Structure for the multiplication grid</summary>

For a multiplication grid:
- Outer loop = which table (1's table, 2's table, etc.)
- Inner loop = multiplying by 1, 2, 3... up to 10

```javascript
for (let outer = 1; outer <= 10; outer++) {
  // outer is 1, then 2, then 3... up to 10

  for (let inner = 1; inner <= 10; inner++) {
    // For each outer, inner goes 1, 2, 3... up to 10
    // Display: outer x inner = result
  }

  // After inner loop finishes, add spacing
}
```

</details>

<details>
<summary>Hint 3: Calculating and displaying</summary>

Inside the nested loops, calculate the result and display it:

```javascript
for (let outer = 1; outer <= 10; outer++) {
  for (let inner = 1; inner <= 10; inner++) {
    let result = outer * inner;
    console.log(`${outer} x ${inner} = ${result}`);
  }
  console.log(""); // Blank line after each table
}
```

The blank line after the inner loop completes makes each table visually separated.

</details>

<details>
<summary>Hint 4: Complete solution</summary>

```javascript
export function timesGrid() {
  for (let outer = 1; outer <= 10; outer++) {
    for (let inner = 1; inner <= 10; inner++) {
      let result = outer * inner;
      console.log(`${outer} x ${inner} = ${result}`);
    }
    console.log(""); // Add spacing between tables
  }
}
```

This creates 10 complete multiplication tables, one after another!

</details>

## Test Your Code

To run your code:
```bash
cd exercises/029-times-grid
node 029-times-grid.js
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise teaches you:
- **Nested loops** - loops inside other loops
- **Loop execution order** - inner loop completes fully for each outer iteration
- **Grid patterns** - how to generate two-dimensional data
- **Loop organization** - using descriptive variable names (outer/inner instead of i/j)

Nested loops are essential for working with:
- Tables and grids
- Multi-dimensional arrays
- Comparing all items with all other items
- Game boards and maps

## Reflection Questions

After completing the exercise, think about:
1. How many times does the inner loop run in total? (Hint: outer runs 10 times, inner runs 10 times per outer...)
2. What would happen if you put the blank line INSIDE the inner loop instead of after it?
3. If you wanted a 5x5 grid instead of 10x10, what would you change?
4. Can you think of real-world scenarios where you need this kind of nested pattern?

## Visualizing Nested Loop Execution

Here's what happens with a smaller 3x3 grid:

```
outer=1, inner=1 → display "1 x 1 = 1"
outer=1, inner=2 → display "1 x 2 = 2"
outer=1, inner=3 → display "1 x 3 = 3"
[inner loop done, outer still 1] → blank line

outer=2, inner=1 → display "2 x 1 = 2"
outer=2, inner=2 → display "2 x 2 = 4"
outer=2, inner=3 → display "2 x 3 = 6"
[inner loop done, outer still 2] → blank line

outer=3, inner=1 → display "3 x 1 = 3"
outer=3, inner=2 → display "3 x 2 = 6"
outer=3, inner=3 → display "3 x 3 = 9"
[inner loop done, outer still 3] → blank line

[outer loop done] → function complete
```

## Next Steps

Excellent work! You've mastered nested loops by creating a complete multiplication grid. In the next exercise, you'll make this more flexible by accepting custom ranges (like creating a 5x7 grid instead of always 10x10).

## Read More

Want to dive deeper? Check out these resources:

- 📚 [Nested Loops - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration#nested_loops)
