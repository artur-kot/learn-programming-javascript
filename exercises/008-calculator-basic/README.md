## Calculator - Basic Operations

Welcome to the Simple Calculator series! Over the next 5 exercises, you'll build a working calculator step by step. By the end, you'll understand how computers perform math, handle user input, format output, and validate data.

But first things first: let's create the foundation by building four basic math operations.

## Your Challenge

Imagine you're building a calculator app. Before you can add fancy features, you need the core operations that every calculator has: **add**, **subtract**, **multiply**, and **divide**.

Open `008-calculator-basic.js`. You'll see four empty functions. Your task is to:

1. Make the `add` function return the sum of two numbers
2. Make the `subtract` function return the difference between two numbers
3. Make the `multiply` function return the product of two numbers
4. Make the `divide` function return the quotient of two numbers

## Expected Output

When you run your code, you should see:
```
Addition: 10 + 5 = 15
Subtraction: 10 - 5 = 5
Multiplication: 10 * 5 = 50
Division: 10 / 5 = 2
```

## Hints

<details>
<summary>Hint 1: JavaScript arithmetic operators</summary>

JavaScript uses these symbols for basic math:
- `+` for addition
- `-` for subtraction
- `*` for multiplication
- `/` for division

Examples:
```javascript
5 + 3    // Results in 8
10 - 4   // Results in 6
6 * 7    // Results in 42
20 / 4   // Results in 5
```
</details>

<details>
<summary>Hint 2: Returning values from functions</summary>

Functions can calculate a value and send it back using the `return` keyword:

```javascript
function double(number) {
  return number * 2;
}

const result = double(5);  // result is 10
```

The `return` keyword does two things:
1. Sends a value back to whoever called the function
2. Immediately exits the function
</details>

<details>
<summary>Hint 3: Complete example for add</summary>

Here's how to make the `add` function work:

```javascript
export function add(a, b) {
  return a + b;
}
```

That's it! The function:
- Takes two parameters (a and b)
- Adds them together with the `+` operator
- Returns the result
</details>

<details>
<summary>Hint 4: All four functions</summary>

Each function follows the same pattern, just with a different operator:

```javascript
export function add(a, b) {
  return a + b;  // Use + for addition
}

export function subtract(a, b) {
  return a - b;  // Use - for subtraction
}

export function multiply(a, b) {
  return a * b;  // Use * for multiplication
}

export function divide(a, b) {
  return a / b;  // Use / for division
}
```
</details>

## Test Your Code

To run your code and see the output:
```bash
cd exercises/008-calculator-basic
node 008-calculator-basic.js
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise introduces several important concepts:

- **Arithmetic operators**: How JavaScript performs math calculations
- **Functions**: Creating reusable blocks of code that perform specific tasks
- **Parameters**: Accepting input values in your functions
- **Return values**: Sending calculated results back from functions
- **Numbers**: Working with JavaScript's number data type

Think about it: these simple operations are the foundation of every calculator, spreadsheet, game, and financial app ever created!

## Reflection Questions

After completing the exercise, think about:
1. What happens if you divide by zero? Try it! (We'll handle this properly in a later exercise)
2. What happens when you add a very large number to another large number?
3. Why do we create separate functions instead of just writing the math directly?

## Solution

<details>
<summary>Click to see the solution (try the exercise first!)</summary>

```javascript
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function multiply(a, b) {
  return a * b;
}

export function divide(a, b) {
  return a / b;
}

// Test your functions
console.log("Addition: 10 + 5 =", add(10, 5));
console.log("Subtraction: 10 - 5 =", subtract(10, 5));
console.log("Multiplication: 10 * 5 =", multiply(10, 5));
console.log("Division: 10 / 5 =", divide(10, 5));
```

**Why this works:**

Each function is incredibly simple - it just takes two numbers and applies an arithmetic operator:

- `add(10, 5)` calculates `10 + 5` and returns `15`
- `subtract(10, 5)` calculates `10 - 5` and returns `5`
- `multiply(10, 5)` calculates `10 * 5` and returns `50`
- `divide(10, 5)` calculates `10 / 5` and returns `2`

**Understanding the flow:**

```javascript
// When you call:
const result = add(10, 5);

// JavaScript does this:
// 1. Calls the add function
// 2. Sets a = 10 and b = 5
// 3. Calculates a + b (which is 10 + 5 = 15)
// 4. Returns 15
// 5. Stores 15 in the result variable
```

**Why create functions?**

You might wonder: "Why not just write `10 + 5` directly?" Great question! Functions are useful because:

1. **Reusability**: Write once, use many times
   ```javascript
   add(5, 3)
   add(100, 200)
   add(userInput1, userInput2)
   ```

2. **Clarity**: `calculateTotal(price, tax)` is clearer than `price + tax`

3. **Easy to test**: You can verify each function works correctly

4. **Easy to modify**: Change the logic in one place, not everywhere you do math

**Interesting facts about JavaScript numbers:**

```javascript
// JavaScript handles decimals automatically
divide(7, 2)  // Returns 3.5 (not 3 like some languages)

// Negative numbers work as expected
subtract(5, 10)  // Returns -5

// You can chain operations
add(5, multiply(3, 4))  // Returns 5 + (3 * 4) = 5 + 12 = 17

// Division by zero returns Infinity
divide(10, 0)  // Returns Infinity (we'll handle this better later!)
```

**Real-world context:**

These basic operations are the building blocks of:
- Shopping cart totals in e-commerce sites
- Score calculations in games
- Financial calculations in banking apps
- Statistical analysis in data science
- Graphics and animation in visual applications

Every complex calculation starts with these simple operations!

</details>

## Next Steps

Great start! You've created the basic operations for your calculator.

In **exercise 009-calculator-advanced**, you'll add more powerful math operations like exponents (powers), modulo (remainders), and square roots. These operations are used in everything from game physics to financial calculations!

Keep coding!
