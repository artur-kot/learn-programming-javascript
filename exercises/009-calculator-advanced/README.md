## Calculator - Advanced Math

Great job on creating the basic calculator operations! Now it's time to level up your calculator with three powerful math operations that you'll see in scientific calculators and real-world applications.

**Building on previous exercise**: This exercise continues from exercise 008. You'll keep your basic operations (add, subtract, multiply, divide) and add three new advanced operations.

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
<summary>Hint 1: What is modulo?</summary>

The modulo operator (`%`) returns the **remainder** after division.

Think of it like this: when you divide 10 by 3, you get 3 with a remainder of 1.
- 10 ÷ 3 = 3 remainder 1
- So 10 % 3 = 1

More examples:
```javascript
17 % 5  // Returns 2 (17 ÷ 5 = 3 remainder 2)
20 % 4  // Returns 0 (20 ÷ 4 = 5 remainder 0)
7 % 2   // Returns 1 (7 ÷ 2 = 3 remainder 1)
```

**Real-world use**: Checking if a number is even or odd!
```javascript
10 % 2  // Returns 0 (even number)
11 % 2  // Returns 1 (odd number)
```
</details>

<details>
<summary>Hint 2: What is the power operator?</summary>

The power operator (`**`) raises a number to an exponent. It's like repeated multiplication.

```javascript
2 ** 3  // Means 2 × 2 × 2 = 8
5 ** 2  // Means 5 × 5 = 25
10 ** 0 // Any number to the power of 0 is 1
```

Think of it as:
- `base ** exponent`
- 2³ in math = `2 ** 3` in JavaScript

**Real-world use**: Calculating compound interest, population growth, physics formulas!
</details>

<details>
<summary>Hint 3: How to calculate square root</summary>

JavaScript provides a built-in `Math.sqrt()` function for calculating square roots.

```javascript
Math.sqrt(16)  // Returns 4 (because 4 × 4 = 16)
Math.sqrt(25)  // Returns 5 (because 5 × 5 = 25)
Math.sqrt(9)   // Returns 3 (because 3 × 3 = 9)
```

The `Math` object contains many useful mathematical functions. You'll use more of them as you progress!

**Real-world use**: Calculating distances, physics, geometry, graphics programming!
</details>

<details>
<summary>Hint 4: Complete implementations</summary>

Here's how to implement all three functions:

```javascript
export function modulo(a, b) {
  return a % b;
}

export function power(base, exponent) {
  return base ** exponent;
}

export function squareRoot(number) {
  return Math.sqrt(number);
}
```

Each follows the same pattern as your basic operations - take input(s), perform calculation, return result!
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

## Solution

<details>
<summary>Click to see the solution (try the exercise first!)</summary>

```javascript
// Import the basic operations from the previous exercise
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

// New advanced operations below!

export function modulo(a, b) {
  return a % b;
}

export function power(base, exponent) {
  return base ** exponent;
}

export function squareRoot(number) {
  return Math.sqrt(number);
}

// Test basic operations
console.log("=== Basic Operations ===");
console.log("Addition: 10 + 5 =", add(10, 5));
console.log("Subtraction: 10 - 5 =", subtract(10, 5));
console.log("Multiplication: 10 * 5 =", multiply(10, 5));
console.log("Division: 10 / 5 =", divide(10, 5));

// Test advanced operations
console.log("\n=== Advanced Operations ===");
console.log("Modulo: 10 % 3 =", modulo(10, 3));
console.log("Power: 2 ** 3 =", power(2, 3));
console.log("Square Root: √16 =", squareRoot(16));
```

**Understanding modulo:**

The modulo operator finds the remainder:
```javascript
modulo(10, 3)  // Returns 1
// Why? 10 ÷ 3 = 3 remainder 1

modulo(17, 5)  // Returns 2
// Why? 17 ÷ 5 = 3 remainder 2

modulo(20, 4)  // Returns 0
// Why? 20 ÷ 4 = 5 remainder 0 (divides evenly!)
```

**Practical use - checking even/odd:**
```javascript
function isEven(number) {
  return number % 2 === 0;
}

isEven(10)  // true (10 % 2 = 0)
isEven(11)  // false (11 % 2 = 1)
```

**Understanding power:**

The power operator performs exponentiation:
```javascript
power(2, 3)  // Returns 8
// Why? 2 × 2 × 2 = 8

power(5, 2)  // Returns 25
// Why? 5 × 5 = 25

power(10, 0)  // Returns 1
// Why? Any number to the power of 0 is 1
```

**Practical use - calculating area:**
```javascript
function calculateSquareArea(side) {
  return side ** 2;  // side × side
}

calculateSquareArea(5)  // 25 square units
```

**Understanding square root:**

Square root finds what number multiplied by itself gives you the original number:
```javascript
squareRoot(16)  // Returns 4
// Why? 4 × 4 = 16

squareRoot(25)  // Returns 5
// Why? 5 × 5 = 25

squareRoot(2)   // Returns 1.4142135623730951
// Why? √2 is an irrational number
```

**Practical use - calculating distance:**
```javascript
// Distance formula in 2D space (Pythagorean theorem)
function distance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx ** 2 + dy ** 2);
}

distance(0, 0, 3, 4)  // Returns 5
// Why? 3² + 4² = 9 + 16 = 25, √25 = 5
```

**The Math object:**

JavaScript's `Math` object provides many useful functions:
```javascript
Math.sqrt(16)      // Square root: 4
Math.abs(-5)       // Absolute value: 5
Math.round(4.7)    // Round to nearest integer: 5
Math.floor(4.7)    // Round down: 4
Math.ceil(4.1)     // Round up: 5
Math.max(5, 10, 3) // Maximum: 10
Math.min(5, 10, 3) // Minimum: 3
Math.random()      // Random number between 0 and 1
```

We're using `Math.sqrt()` here, but you'll encounter other `Math` methods as you build more complex applications!

**Real-world applications:**

These operations appear everywhere:

**Modulo:**
- Determining if a year is a leap year
- Cycling through array indices (circular buffers)
- Converting 24-hour time to 12-hour format
- Creating alternating patterns (zebra striping in tables)

**Power:**
- Compound interest calculations
- Population growth models
- Physics formulas (kinetic energy, gravitational force)
- Computer science algorithms (complexity calculations)

**Square root:**
- Calculating distances (GPS, games, graphics)
- Physics calculations (velocity, acceleration)
- Statistics (standard deviation)
- Graphics programming (normalizing vectors)

</details>

## Next Steps

Excellent work! Your calculator now has both basic and advanced operations.

In **exercise 010-calculator-input**, you'll learn how to handle user input that comes as strings (text) instead of numbers. This is crucial because when users type into forms or command-line interfaces, JavaScript receives text that needs to be converted to numbers first!

Keep building!
