## Times Table - Formatted Display

This is the final exercise in the Multiplication Table Generator series! You've learned nested loops, parameters, and loop control. Now let's make your tables look professional with proper formatting and alignment.

## What You're Building On

From exercises 028-031, you have:
- `timesTable(number)` - single multiplication table
- `timesGrid()` - complete 10x10 grid
- `timesGridRange(minRow, maxRow, minCol, maxCol)` - flexible range
- `timesGridOddsOnly(minRow, maxRow, minCol, maxCol)` - filtering with continue

All of these display results vertically (one equation per line). But real multiplication tables show results in a GRID - all numbers for a row on one line!

## Your Challenge

Open `032-times-format.js`. Create a function called `timesGridFormatted(size)` that displays a multiplication table as a properly formatted grid:
- Accept one parameter: the table size (e.g., 10 for 10×10)
- Display each row on ONE line with all results
- Right-align numbers with consistent spacing
- Create a professional-looking table

**Key difference from previous exercises:**
- Before: Each result on its own line
- Now: All results for a row on ONE line

## Expected Output

When you run your code, you should see:

```
=== Formatted 5x5 (new way) ===

   1   2   3   4   5
   2   4   6   8  10
   3   6   9  12  15
   4   8  12  16  20
   5  10  15  20  25

=== Formatted 10x10 ===

   1   2   3   4   5   6   7   8   9  10
   2   4   6   8  10  12  14  16  18  20
   3   6   9  12  15  18  21  24  27  30
   4   8  12  16  20  24  28  32  36  40
   5  10  15  20  25  30  35  40  45  50
   6  12  18  24  30  36  42  48  54  60
   7  14  21  28  35  42  49  56  63  70
   8  16  24  32  40  48  56  64  72  80
   9  18  27  36  45  54  63  72  81  90
  10  20  30  40  50  60  70  80  90 100
```

Notice how the numbers line up in neat columns!

## Hints

<details>
<summary>Hint 1: Building a string for each row</summary>

Instead of logging each number immediately, build a complete row string first:

```javascript
for (let row = 1; row <= size; row++) {
  let rowString = "";  // Start with empty string

  for (let col = 1; col <= size; col++) {
    let result = row * col;
    // Add result to rowString (with formatting)
  }

  console.log(rowString);  // Log complete row at once
}
```

This way each row is logged as a single line!

</details>

<details>
<summary>Hint 2: Using padStart for alignment</summary>

The `padStart()` method adds spaces to make a string a certain width:

```javascript
let num = 5;
let formatted = num.toString().padStart(4);
// Result: "   5" (4 characters wide, spaces on left)

let num2 = 100;
let formatted2 = num2.toString().padStart(4);
// Result: " 100" (4 characters wide, one space on left)
```

This right-aligns numbers in columns!

</details>

<details>
<summary>Hint 3: Adding each result to the row</summary>

Convert each result to string, add padding, and append to rowString:

```javascript
for (let row = 1; row <= size; row++) {
  let rowString = "";

  for (let col = 1; col <= size; col++) {
    let result = row * col;
    rowString += result.toString().padStart(4);
  }

  console.log(rowString);
}
```

Each number takes 4 characters of space, creating aligned columns!

</details>

<details>
<summary>Hint 4: Complete solution</summary>

```javascript
export function timesGridFormatted(size) {
  for (let row = 1; row <= size; row++) {
    let rowString = "";

    for (let col = 1; col <= size; col++) {
      let result = row * col;
      rowString += result.toString().padStart(4);
    }

    console.log(rowString);
  }
}
```

That's it! Build each row as a string, then log it all at once.

</details>

## Test Your Code

To run your code:
```bash
cd exercises/032-times-format
node 032-times-format.js
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise teaches you:
- **String building** - concatenating multiple values into one string
- **String formatting** - using padStart() for alignment
- **Data presentation** - making output readable and professional
- **String methods** - toString() and padStart()

These techniques are essential for:
- Creating formatted reports
- Displaying tabular data
- Building user interfaces
- Generating aligned output

## Reflection Questions

After completing the exercise, think about:
1. Why do we need to convert numbers to strings with toString()?
2. What would happen if you used padStart(3) instead of padStart(4)?
3. How would you add a header row showing column numbers?
4. Could you modify this to use padEnd() instead? What would be different?

## Understanding padStart

**How padStart works:**

```javascript
"5".padStart(4)     // "   5" (adds 3 spaces on left)
"25".padStart(4)    // "  25" (adds 2 spaces on left)
"100".padStart(4)   // " 100" (adds 1 space on left)
"1000".padStart(4)  // "1000" (already 4 chars, no change)
```

**Why 4 characters?**
- Largest number in 10×10 table: 100 (3 digits)
- Plus 1 space for separation
- Total: 4 characters per column

**String concatenation in the loop:**

```javascript
// First iteration (col=1): rowString = "" + "   1" = "   1"
// Second iteration (col=2): rowString = "   1" + "   2" = "   1   2"
// Third iteration (col=3): rowString = "   1   2" + "   3" = "   1   2   3"
// etc.
```

## Comparing Approaches

**Old way (one equation per line):**
```
1 x 1 = 1
1 x 2 = 2
1 x 3 = 3
```
- Each multiplication is a separate log
- Takes many lines of output
- Hard to see patterns

**New way (grid format):**
```
   1   2   3
   2   4   6
   3   6   9
```
- Each row is one log
- Compact and readable
- Easy to spot patterns (like the diagonal being perfect squares)

## Optional Enhancements

Want to go further? Try these challenges:

**Add column headers:**
```javascript
// Add before the loop
console.log("    " + " Col1 Col2 Col3");
```

**Add row labels:**
```javascript
for (let row = 1; row <= size; row++) {
  let rowString = `R${row} `;  // Start with row label
  // ... rest of code
}
```

**Use different padding:**
```javascript
rowString += result.toString().padStart(5);  // Wider columns
```

## Series Complete!

Congratulations! You've completed the **Multiplication Table Generator** series!

Here's what you've accomplished:
- ✅ **Exercise 028**: Created single multiplication table with basic loop
- ✅ **Exercise 029**: Learned nested loops to create full grid
- ✅ **Exercise 030**: Made grids flexible with parameters
- ✅ **Exercise 031**: Used continue to filter even numbers
- ✅ **Exercise 032**: Formatted output professionally with string methods

## What You've Mastered

**Nested Loop Fundamentals:**
- Understanding how loops inside loops work
- Visualizing two-dimensional iteration
- Managing outer and inner loop variables
- Building grid patterns

**Loop Control:**
- Using continue to skip iterations
- Filtering data as you process it
- Controlling which iterations run

**String Manipulation:**
- Building strings with concatenation
- Formatting with padStart()
- Converting numbers to strings
- Creating aligned output

**Real-World Skills:**
- Generating tables and grids
- Processing two-dimensional data
- Creating formatted reports
- Building professional output

## Next Steps

Ready to continue learning? The next series in the roadmap will teach you about **functions** - how to organize and reuse your code by creating custom commands. Functions are one of the most important concepts in programming!

Take a moment to appreciate how much you've learned. Nested loops open up a whole new world of possibilities - you can now work with grids, tables, matrices, and any kind of two-dimensional data!

Keep up the fantastic work!

## Read More

Want to dive deeper? Check out these resources:

- 📚 [String Formatting - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)
- 📖 [Template Literals - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- 🎯 [String Methods - JavaScript.info](https://javascript.info/string)

