## Calculator - Input Validation

Welcome to the final exercise in the Simple Calculator series! You've built a calculator that handles basic and advanced math, accepts string inputs, and formats output beautifully. But there's one critical piece missing: **error handling**.

What happens when someone enters "hello" instead of a number? Or tries to divide by zero? Right now, your calculator would produce confusing results like `NaN` or `Infinity`. Professional applications validate inputs and show helpful error messages instead.

**Building on previous exercises**: This exercise completes your calculator from exercises 008-011 by adding robust input validation and error handling.

## Your Challenge

Real users make mistakes. They might:
- Type "hello" when they should enter a number
- Accidentally divide by zero
- Try to find the square root of a negative number

Your calculator should handle these gracefully:

**Before (confusing):**
```javascript
add("hello", 5)  // Returns NaN (what does that mean?)
divide(10, 0)    // Returns Infinity (not helpful!)
squareRoot(-16)  // Returns NaN (why?)
```

**After (clear):**
```javascript
add("hello", 5)  // Returns "Error: Invalid input"
divide(10, 0)    // Returns "Error: Division by zero"
squareRoot(-16)  // Returns "Error: Cannot calculate square root of negative number"
```

Open `012-calculator-validation.js`. Your task is to add validation to each function:

1. Check if inputs are valid numbers using `isNaN()`
2. Check for division by zero in `divide()` and `modulo()`
3. Check for negative numbers in `squareRoot()`
4. Return helpful error messages when problems are found

## Expected Output

When you run your code, you should see:
```
=== Valid Inputs ===
add(10, 5) = 15
subtract(10, 5) = 5
divide(10, 5) = 2

=== Invalid Inputs ===
add("hello", 5) = Error: Invalid input
multiply(10, "world") = Error: Invalid input
subtract("abc", "def") = Error: Invalid input

=== Division by Zero ===
divide(10, 0) = Error: Division by zero
modulo(10, 0) = Error: Division by zero

=== Negative Square Root ===
squareRoot(-16) = Error: Cannot calculate square root of negative number
squareRoot(16) = 4
```

## Hints

<details>
<summary>Hint 1: What is NaN?</summary>

`NaN` stands for "Not a Number" - it's JavaScript's way of saying "this math operation failed."

```javascript
Number("hello")  // Returns NaN
Number("123abc") // Returns NaN
Number("42")     // Returns 42 (valid!)

// NaN in calculations:
NaN + 5          // NaN (NaN infects everything!)
10 * NaN         // NaN
```

You can check if something is NaN:
```javascript
isNaN(NaN)           // true
isNaN("hello")       // true (would become NaN when converted)
isNaN(42)            // false (valid number)
isNaN("42")          // false (valid number as string)
```

**Important**: `isNaN()` tries to convert to a number first, then checks!
</details>

<details>
<summary>Hint 2: Validating inputs</summary>

To check if inputs are valid numbers:

```javascript
const numA = Number(a);
const numB = Number(b);

if (isNaN(numA) || isNaN(numB)) {
  return "Error: Invalid input";
}

// If we get here, both numbers are valid
return numA + numB;
```

The `||` operator means "or" - if **either** number is NaN, return the error.

**Flow:**
```javascript
add("hello", 5)
  → Number("hello") = NaN
  → isNaN(NaN) = true
  → Returns "Error: Invalid input"

add(10, 5)
  → Number(10) = 10, Number(5) = 5
  → isNaN(10) = false, isNaN(5) = false
  → Returns 10 + 5 = 15
```
</details>

<details>
<summary>Hint 3: Checking for division by zero</summary>

Division by zero is mathematically undefined. In the `divide()` function:

```javascript
export function divide(a, b) {
  const numA = Number(a);
  const numB = Number(b);

  // First check for invalid inputs
  if (isNaN(numA) || isNaN(numB)) {
    return "Error: Invalid input";
  }

  // Then check for division by zero
  if (numB === 0) {
    return "Error: Division by zero";
  }

  // If all checks pass, do the division
  return numA / numB;
}
```

**Order matters!** Check for invalid inputs first, then specific errors.
</details>

<details>
<summary>Hint 4: Validating square root</summary>

You can't take the square root of a negative number (in basic math):

```javascript
export function squareRoot(number) {
  const num = Number(number);

  // Check for invalid input
  if (isNaN(num)) {
    return "Error: Invalid input";
  }

  // Check for negative number
  if (num < 0) {
    return "Error: Cannot calculate square root of negative number";
  }

  // If all checks pass, calculate square root
  return Math.sqrt(num);
}
```

Note: Zero is allowed! `Math.sqrt(0)` equals `0`.
</details>

<details>
<summary>Hint 5: Complete example for add</summary>

Here's the complete `add()` function with validation:

```javascript
export function add(a, b) {
  const numA = Number(a);
  const numB = Number(b);

  if (isNaN(numA) || isNaN(numB)) {
    return "Error: Invalid input";
  }

  return numA + numB;
}
```

Apply this same pattern to all functions! The only differences:
- `divide()` and `modulo()` also check `numB === 0`
- `squareRoot()` also checks `num < 0`
</details>

## Test Your Code

To run your code and see the output:
```bash
cd exercises/012-calculator-validation
node 012-calculator-validation.js
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise teaches essential error handling concepts:

- **Input validation**: Checking data before processing it
- **isNaN() function**: Detecting invalid numbers
- **Conditional logic**: Making decisions based on input
- **Error messages**: Providing helpful feedback to users
- **Defensive programming**: Planning for things to go wrong
- **Edge cases**: Handling special situations (divide by zero, negative square root)

These skills are critical for building reliable, user-friendly applications!

## Reflection Questions

After completing the exercise, think about:
1. Why is it important to check for invalid input **before** division by zero?
2. What other errors might a calculator need to handle?
3. How would you improve these error messages to be even more helpful?

## Solution

<details>
<summary>Click to see the solution (try the exercise first!)</summary>

```javascript
// Calculator functions with validation!

export function add(a, b) {
  const numA = Number(a);
  const numB = Number(b);

  if (isNaN(numA) || isNaN(numB)) {
    return "Error: Invalid input";
  }

  return numA + numB;
}

export function subtract(a, b) {
  const numA = Number(a);
  const numB = Number(b);

  if (isNaN(numA) || isNaN(numB)) {
    return "Error: Invalid input";
  }

  return numA - numB;
}

export function multiply(a, b) {
  const numA = Number(a);
  const numB = Number(b);

  if (isNaN(numA) || isNaN(numB)) {
    return "Error: Invalid input";
  }

  return numA * numB;
}

export function divide(a, b) {
  const numA = Number(a);
  const numB = Number(b);

  if (isNaN(numA) || isNaN(numB)) {
    return "Error: Invalid input";
  }

  if (numB === 0) {
    return "Error: Division by zero";
  }

  return numA / numB;
}

export function modulo(a, b) {
  const numA = Number(a);
  const numB = Number(b);

  if (isNaN(numA) || isNaN(numB)) {
    return "Error: Invalid input";
  }

  if (numB === 0) {
    return "Error: Division by zero";
  }

  return numA % numB;
}

export function power(base, exponent) {
  const numBase = Number(base);
  const numExponent = Number(exponent);

  if (isNaN(numBase) || isNaN(numExponent)) {
    return "Error: Invalid input";
  }

  return numBase ** numExponent;
}

export function squareRoot(number) {
  const num = Number(number);

  if (isNaN(num)) {
    return "Error: Invalid input";
  }

  if (num < 0) {
    return "Error: Cannot calculate square root of negative number";
  }

  return Math.sqrt(num);
}

// Test valid inputs
console.log("=== Valid Inputs ===");
console.log("add(10, 5) =", add(10, 5));
console.log("subtract(10, 5) =", subtract(10, 5));
console.log("divide(10, 5) =", divide(10, 5));

// Test invalid inputs (not numbers)
console.log("\n=== Invalid Inputs ===");
console.log('add("hello", 5) =', add("hello", 5));
console.log('multiply(10, "world") =', multiply(10, "world"));
console.log('subtract("abc", "def") =', subtract("abc", "def"));

// Test division by zero
console.log("\n=== Division by Zero ===");
console.log("divide(10, 0) =", divide(10, 0));
console.log("modulo(10, 0) =", modulo(10, 0));

// Test negative square root
console.log("\n=== Negative Square Root ===");
console.log("squareRoot(-16) =", squareRoot(-16));
console.log("squareRoot(16) =", squareRoot(16));
```

**Understanding the validation flow:**

```javascript
// Example 1: Valid input
add(10, 5)
  → Number(10) = 10, Number(5) = 5
  → isNaN(10) = false, isNaN(5) = false
  → Validation passes
  → Returns 10 + 5 = 15

// Example 2: Invalid input
add("hello", 5)
  → Number("hello") = NaN, Number(5) = 5
  → isNaN(NaN) = true
  → Validation fails
  → Returns "Error: Invalid input"

// Example 3: Division by zero
divide(10, 0)
  → Number(10) = 10, Number(0) = 0
  → isNaN(10) = false, isNaN(0) = false (0 is a valid number!)
  → Input validation passes
  → numB === 0 is true
  → Division by zero check fails
  → Returns "Error: Division by zero"
```

**Why check in this order?**

```javascript
// CORRECT order:
export function divide(a, b) {
  const numA = Number(a);
  const numB = Number(b);

  // Check 1: Are inputs valid numbers?
  if (isNaN(numA) || isNaN(numB)) {
    return "Error: Invalid input";
  }

  // Check 2: Is this division by zero?
  if (numB === 0) {
    return "Error: Division by zero";
  }

  return numA / numB;
}

// WRONG order (don't do this):
export function divide(a, b) {
  const numA = Number(a);
  const numB = Number(b);

  // If we check division by zero first:
  if (numB === 0) {
    return "Error: Division by zero";
  }

  // And then check for invalid input:
  if (isNaN(numA) || isNaN(numB)) {
    return "Error: Invalid input";
  }

  return numA / numB;
}

// Problem with wrong order:
divide("hello", 0)
  → Number("hello") = NaN, Number(0) = 0
  → numB === 0 is true
  → Returns "Error: Division by zero"
  // But the REAL problem is "hello" is not a number!
  // We should return "Error: Invalid input" instead!
```

Always check the most fundamental errors first (is this even a number?) before checking specific errors (is this zero?).

**Understanding isNaN:**

```javascript
// isNaN checks if something is Not-a-Number
isNaN(42)           // false (42 IS a number)
isNaN("42")         // false (converts to 42, which IS a number)
isNaN("hello")      // true (converts to NaN, which is NOT a number)
isNaN(NaN)          // true (NaN is NOT a number)
isNaN(undefined)    // true (undefined is NOT a number)

// Be careful with special values:
isNaN(null)         // false (null converts to 0!)
isNaN(true)         // false (true converts to 1!)
isNaN(false)        // false (false converts to 0!)
isNaN("")           // false (empty string converts to 0!)

// That's why we convert to Number first:
const num = Number("hello");  // NaN
isNaN(num);                   // true
```

**The OR operator (||):**

```javascript
// || means "or" - true if EITHER side is true
if (isNaN(numA) || isNaN(numB)) {
  // This runs if:
  // - numA is NaN, OR
  // - numB is NaN, OR
  // - BOTH are NaN
}

// Examples:
isNaN(NaN) || isNaN(5)    // true (left is true)
isNaN(5) || isNaN(NaN)    // true (right is true)
isNaN(NaN) || isNaN(NaN)  // true (both are true)
isNaN(5) || isNaN(10)     // false (both are false)
```

**Why return strings instead of throwing errors?**

For now, we're returning error strings because it's simpler to understand. In real applications, you might:

```javascript
// Option 1: Return special values (what we're doing)
if (numB === 0) {
  return "Error: Division by zero";
}

// Option 2: Throw exceptions (more advanced)
if (numB === 0) {
  throw new Error("Division by zero");
}

// Option 3: Return objects with status
if (numB === 0) {
  return { error: true, message: "Division by zero" };
}
```

We're using Option 1 because it's easiest for beginners. You'll learn about exceptions (try/catch) in later exercises!

**Edge cases to consider:**

```javascript
// Zero is a valid number (not NaN):
add(0, 5)         // Returns 5 (valid!)
multiply(10, 0)   // Returns 0 (valid!)
squareRoot(0)     // Returns 0 (valid!)

// But zero as a divisor is not:
divide(10, 0)     // Returns "Error: Division by zero"

// Negative numbers work fine in most operations:
add(-5, 10)       // Returns 5 (valid!)
power(2, -2)      // Returns 0.25 (valid!)

// Except square root:
squareRoot(-16)   // Returns "Error: Cannot calculate square root..."

// Empty strings convert to 0:
Number("")        // 0 (not NaN!)
add("", 5)        // Returns 5 (because "" becomes 0)

// Whitespace converts to 0:
Number("  ")      // 0 (not NaN!)
add("  ", 5)      // Returns 5
```

**Real-world applications:**

**Form validation:**
```javascript
function processCheckout(price, quantity) {
  const numPrice = Number(price);
  const numQuantity = Number(quantity);

  if (isNaN(numPrice) || isNaN(numQuantity)) {
    return "Please enter valid numbers";
  }

  if (numPrice < 0 || numQuantity < 0) {
    return "Price and quantity must be positive";
  }

  if (numQuantity === 0) {
    return "Quantity must be at least 1";
  }

  return numPrice * numQuantity;
}
```

**API input validation:**
```javascript
function calculateDiscount(total, discountPercent) {
  const numTotal = Number(total);
  const numDiscount = Number(discountPercent);

  if (isNaN(numTotal) || isNaN(numDiscount)) {
    return { error: "Invalid input" };
  }

  if (numDiscount < 0 || numDiscount > 100) {
    return { error: "Discount must be between 0 and 100" };
  }

  const discountAmount = numTotal * (numDiscount / 100);
  return { discountAmount, finalTotal: numTotal - discountAmount };
}
```

**User-friendly error messages (bonus):**

You could make error messages even more helpful:

```javascript
export function divide(a, b) {
  const numA = Number(a);
  const numB = Number(b);

  if (isNaN(numA)) {
    return `Error: "${a}" is not a valid number`;
  }

  if (isNaN(numB)) {
    return `Error: "${b}" is not a valid number`;
  }

  if (numB === 0) {
    return "Error: Cannot divide by zero";
  }

  return numA / numB;
}

// Now you get specific feedback:
divide("hello", 5)  // "Error: "hello" is not a valid number"
divide(10, "world") // "Error: "world" is not a valid number"
divide(10, 0)       // "Error: Cannot divide by zero"
```

</details>

## Series Complete!

Congratulations! You've completed the **Simple Calculator** series!

Here's what you've accomplished:

- **Exercise 008**: Created basic arithmetic operations (add, subtract, multiply, divide)
- **Exercise 009**: Added advanced math (modulo, power, square root)
- **Exercise 010**: Handled string inputs with type conversion
- **Exercise 011**: Formatted output professionally with toFixed() and units
- **Exercise 012**: Validated inputs and handled errors gracefully

You've built a complete, production-ready calculator that:
- Performs basic and advanced calculations
- Accepts user input in any format
- Displays results beautifully
- Handles errors intelligently

These skills - math operations, type conversion, formatting, and validation - are fundamental to every application you'll ever build!

## What You've Learned

Through this series, you've mastered:

- **Arithmetic operators**: +, -, *, /, %, **
- **Math object**: Math.sqrt() and other built-in functions
- **Type conversion**: Number(), parseFloat(), parseInt()
- **Number formatting**: toFixed() for controlling decimals
- **Validation**: isNaN() and conditional error checking
- **Defensive programming**: Planning for invalid inputs
- **User experience**: Clear error messages and formatted output

## Next Steps

Ready for the next challenge? The upcoming series will teach you how to make decisions in your code using **if statements** and **boolean logic**.

Take a well-deserved break, then dive into the next series when you're ready!

Keep up the excellent work!
