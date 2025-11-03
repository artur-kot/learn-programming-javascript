## Calculator - Advanced Math

Great job on creating the basic calculator operations! Now it's time to level up your calculator with three powerful math operations that you'll see in scientific calculators and real-world applications.

**Building on previous exercise**: This exercise continues from exercise 008. You'll keep your basic operations (add, subtract, multiply, divide) and add three new advanced operations.

## Advanced Math Operators

Beyond basic arithmetic, JavaScript provides powerful operators and tools for more complex mathematical operations. Let's explore three of them:

### The Modulo Operator (%)

The modulo operator finds the **remainder** after division:

```javascript
10 % 3    // Results in 1 (10 ÷ 3 = 3 remainder 1)
10 % 2    // Results in 0 (10 ÷ 2 = 5 remainder 0)
7 % 3     // Results in 1 (7 ÷ 3 = 2 remainder 1)
```

**Why is this useful?** You can check if a number is even or odd:
```javascript
if (number % 2 === 0) {
  console.log("Even!");  // No remainder = even
} else {
  console.log("Odd!");   // Has remainder = odd
}
```

### The Exponentiation Operator (**)

Exponentiation raises a number to a power (multiplies it by itself a certain number of times):

```javascript
2 ** 3    // Results in 8 (same as 2 × 2 × 2)
5 ** 2    // Results in 25 (same as 5 × 5)
10 ** 3   // Results in 1000 (same as 10 × 10 × 10)
```

### The Math Object: Square Roots and More

JavaScript has a built-in `Math` object with useful mathematical functions. The most common is `Math.sqrt()` for square roots:

```javascript
Math.sqrt(16)   // Results in 4 (because 4 × 4 = 16)
Math.sqrt(9)    // Results in 3 (because 3 × 3 = 9)
Math.sqrt(25)   // Results in 5 (because 5 × 5 = 25)
```

The `Math` object has many other functions too: `Math.abs()` (absolute value), `Math.floor()` (round down), `Math.ceil()` (round up), `Math.max()`, `Math.min()`, and more!

## Your Challenge

Professional calculators don't stop at basic arithmetic - they include advanced operations for more complex calculations. In this exercise, you'll add:

1. **Modulo (%)**: Find the remainder after division
2. **Power (**)**: Raise a number to an exponent
3. **Square Root**: Find the square root of a number

Open `009-calculator-advanced.js`. You already have the basic operations from the previous exercise. Your task is to implement the three new functions at the bottom of the file.

## Expected Output

When you run your code, you should see:
```
=== Basic Operations ===
Addition: 10 + 5 = 15
Subtraction: 10 - 5 = 5
Multiplication: 10 * 5 = 50
Division: 10 / 5 = 2

=== Advanced Operations ===
Modulo: 10 % 3 = 1
Power: 2 ** 3 = 8
Square Root: √16 = 4
```

## Hints

<details>
<summary>Hint 1: Understanding modulo (remainder)</summary>

The modulo operation finds what's left over after division. Think about:
- When you divide 10 by 3, you can fit three 3's into 10, but what's left over?
- How would you express "the remainder after division"?
- What's a practical use for knowing remainders? (Think about even/odd numbers, or cycles)

In everyday life, remainders tell us about patterns and divisibility.
</details>

<details>
<summary>Hint 2: Understanding exponentiation (powers)</summary>

Raising a number to a power is like multiplying it by itself multiple times. Think about:
- What does "2 to the power of 3" mean? (2 × 2 × 2)
- How is this different from regular multiplication?
- What mathematical notation represents this in math class?

Programming languages need a way to express exponentiation just like calculators do.
</details>

<details>
<summary>Hint 3: Understanding square roots</summary>

A square root asks: "what number multiplied by itself gives me this value?" Think about:
- If 4 × 4 equals 16, what operation reverses this to get back to 4?
- Does JavaScript have built-in mathematical functions beyond basic operators?
- Where might these functions be located or organized?

Many languages provide a collection of mathematical utilities for complex operations.
</details>

<details>
<summary>Hint 4: Following the same pattern</summary>

These three functions follow the same pattern as your basic operations:
- Accept input value(s)
- Apply a mathematical operation
- Return the result

The difference is you're using more advanced mathematical concepts. Try researching or experimenting to discover how JavaScript expresses these operations.
</details>

## Test Your Code

To run your code and see the output:
```bash
cd exercises/009-calculator-advanced
node 009-calculator-advanced.js
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise introduces several new concepts:

- **Modulo operator (%)**: Finding remainders and checking divisibility
- **Exponentiation operator (**)**: Raising numbers to powers
- **Math object**: JavaScript's built-in mathematical functions
- **Math.sqrt()**: Calculating square roots
- **Building on previous code**: Extending existing functionality

These operations might seem abstract now, but they're incredibly useful in real applications!

## Reflection Questions

After completing the exercise, think about:
1. How could you use the modulo operator to check if a number is even or odd?
2. What would `power(10, 3)` calculate? (Hint: 10 × 10 × 10)
3. Can you think of a situation where you'd need to calculate a square root in a real app?

## Next Steps

Excellent work! Your calculator now has both basic and advanced operations.

In **exercise 010-calculator-input**, you'll learn how to handle user input that comes as strings (text) instead of numbers. This is crucial because when users type into forms or command-line interfaces, JavaScript receives text that needs to be converted to numbers first!

Keep building!

## Read More

Want to dive deeper? Check out these resources:

- 📚 [Math Object - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)
- 📖 [Number Methods - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
