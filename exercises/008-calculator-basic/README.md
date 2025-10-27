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
<summary>Hint 1: Understanding arithmetic in JavaScript</summary>

JavaScript can perform calculations just like a regular calculator. Think about:
- What happens when you combine two numbers?
- How does a calculator know whether to add, subtract, multiply, or divide?
- What symbols represent these operations in programming?

Every programming language has built-in ways to perform mathematical operations on numbers.
</details>

<details>
<summary>Hint 2: Returning values from functions</summary>

Functions can calculate a value and send it back to whoever called the function. Think about:
- How does a function communicate its result back to the code that used it?
- What happens after a function finishes its calculation?
- Why might we want to send a value back instead of just printing it?

The key is understanding how to pass calculated results from inside a function to outside it.
</details>

<details>
<summary>Hint 3: The pattern for mathematical functions</summary>

Each arithmetic operation follows the same structure:
- Accept two numbers as input
- Perform a calculation on those numbers
- Send the result back

Think about what changes between addition, subtraction, multiplication, and division - it's just which mathematical operation you apply to the two numbers.
</details>

<details>
<summary>Hint 4: Starting with one function</summary>

Try implementing just the first function to understand the pattern. Once you solve one, the others follow the same structure - you're just changing which mathematical operation is performed on the two input numbers.
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

## Next Steps

Great start! You've created the basic operations for your calculator.

In **exercise 009-calculator-advanced**, you'll add more powerful math operations like exponents (powers), modulo (remainders), and square roots. These operations are used in everything from game physics to financial calculations!

Keep coding!

