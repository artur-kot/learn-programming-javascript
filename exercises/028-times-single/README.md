## Times Table - Single Number

Welcome to Series 6: Multiplication Table Generator! In this series, you'll learn about **nested loops** - loops inside other loops - which are essential for working with grids, tables, and multi-dimensional data.

But first, let's start with something familiar: a single loop to create a multiplication table for one number.

## Your Challenge

Remember learning multiplication tables in school? "5 times 1 is 5, 5 times 2 is 10..." That's exactly what you'll build!

Open `028-times-single.js`. Create a function called `timesTable(number)` that displays the multiplication table from 1 to 10 for any number.

**Requirements:**
- Accept one number as a parameter
- Loop from 1 to 10
- For each number, display: "number x i = result"
- For example: "5 x 1 = 5", "5 x 2 = 10", etc.

## Expected Output

When you run your code, you should see:

```
=== Times table for 5 ===

5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
5 x 4 = 20
5 x 5 = 25
5 x 6 = 30
5 x 7 = 35
5 x 8 = 40
5 x 9 = 45
5 x 10 = 50

=== Times table for 7 ===

7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
7 x 4 = 28
7 x 5 = 35
7 x 6 = 42
7 x 7 = 49
7 x 8 = 56
7 x 9 = 63
7 x 10 = 70
```

## Hints

<details>
<summary>Hint 1: Setting up the loop</summary>

You need a loop that counts from 1 to 10:

```javascript
for (let i = 1; i <= 10; i++) {
  // This runs 10 times, with i being 1, then 2, then 3... up to 10
}
```

Notice we start at 1 (not 0) because multiplication tables typically start with "times 1".

</details>

<details>
<summary>Hint 2: Calculating the result</summary>

Inside the loop, multiply the input number by the loop counter:

```javascript
for (let i = 1; i <= 10; i++) {
  let result = number * i;
  // Now you have the answer for "number times i"
}
```

</details>

<details>
<summary>Hint 3: Displaying the equation</summary>

Use template literals to format the output nicely:

```javascript
console.log(`${number} x ${i} = ${result}`);
```

This creates a string like "5 x 3 = 15".

</details>

<details>
<summary>Hint 4: Complete solution structure</summary>

```javascript
export function timesTable(number) {
  for (let i = 1; i <= 10; i++) {
    let result = number * i;
    console.log(`${number} x ${i} = ${result}`);
  }
}
```

That's it! A simple loop that runs 10 times, calculating and displaying each multiplication.

</details>

## Test Your Code

To run your code:
```bash
cd exercises/028-times-single
node 028-times-single.js
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise reinforces:
- **For loops** - counting from 1 to a specific number
- **Loop variables** - using the counter (i) in calculations
- **String formatting** - creating readable output with template literals
- **Function parameters** - making functions flexible with inputs

This is preparation for the next exercise where you'll use **two loops together** to create a complete multiplication grid!

## Reflection Questions

After completing the exercise, think about:
1. Why do we start the loop at 1 instead of 0?
2. What would happen if you changed `i <= 10` to `i < 10`?
3. How would you modify this to show a table up to 12 instead of 10?
4. Can you think of other situations where you'd want to repeat similar calculations?

## Next Steps

Great work! You've created a multiplication table for a single number. In the next exercise, you'll learn about **nested loops** - using one loop inside another to create a full multiplication grid showing all tables from 1x1 to 10x10. This is where things get really interesting!
