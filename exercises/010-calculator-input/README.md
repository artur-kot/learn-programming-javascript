## Calculator - Handle User Input

Your calculator is coming along nicely! But there's a problem: when users type numbers into forms or command-line interfaces, JavaScript receives them as **text (strings)**, not numbers. Try to add "5" + "3" in JavaScript and you'll get "53" instead of 8!

In this exercise, you'll learn how to convert string inputs into numbers so your calculator works with real user input.

**Building on previous exercises**: This exercise enhances your calculator functions from exercises 008-009 to handle string inputs.

## Your Challenge

Here's the situation: when a user types numbers into a calculator interface, JavaScript sees them as strings:

```javascript
// User types: 5 and 3
const num1 = "5";  // String, not number!
const num2 = "3";  // String, not number!

// This won't work as expected:
num1 + num2  // Results in "53" (string concatenation)

// We need to convert strings to numbers first!
Number(num1) + Number(num2)  // Results in 8 (math addition)
```

Open `010-calculator-input.js`. Your task is to:

1. Modify each function to convert string inputs to numbers **before** performing calculations
2. Use `Number()` for whole numbers
3. Use `parseFloat()` for decimal numbers (or just use `Number()` - it handles both!)

## Expected Output

When you run your code, you should see:
```
=== Testing with String Inputs ===
add("10", "5") = 15
subtract("10", "5") = 5
multiply("10", "5") = 50
divide("10", "5") = 2
modulo("10", "3") = 1
power("2", "3") = 8
squareRoot("16") = 4

=== Mixed Number and String Inputs ===
add(10, "5") = 15
multiply("7", 3) = 21
```

## Hints

<details>
<summary>Hint 1: The problem with strings</summary>

JavaScript treats strings and numbers differently:

```javascript
// With numbers (correct math):
5 + 3         // Returns 8
10 - 4        // Returns 6

// With strings (unexpected behavior):
"5" + "3"     // Returns "53" (concatenates strings)
"10" - "4"    // Returns 6 (JavaScript tries to help, but inconsistent!)
"10" * "5"    // Returns 50 (works by accident)
```

To avoid confusion, **always convert strings to numbers explicitly** before doing math!
</details>

<details>
<summary>Hint 2: Converting strings to numbers</summary>

JavaScript provides several ways to convert strings to numbers:

```javascript
// Number() - converts strings to numbers
Number("42")      // Returns 42
Number("3.14")    // Returns 3.14
Number("  10  ")  // Returns 10 (ignores whitespace)

// parseFloat() - converts strings to decimal numbers
parseFloat("3.14")     // Returns 3.14
parseFloat("42")       // Returns 42
parseFloat("3.14abc")  // Returns 3.14 (stops at first non-number)

// parseInt() - converts strings to whole numbers
parseInt("42")       // Returns 42
parseInt("3.14")     // Returns 3 (removes decimal)
parseInt("42abc")    // Returns 42 (stops at first non-number)
```

For this exercise, `Number()` works great for all cases!
</details>

<details>
<summary>Hint 3: Updating the add function</summary>

Here's how to modify the `add` function to handle string inputs:

```javascript
export function add(a, b) {
  // Convert both inputs to numbers
  const numA = Number(a);
  const numB = Number(b);

  // Now perform the addition
  return numA + numB;
}
```

Or more concisely:
```javascript
export function add(a, b) {
  return Number(a) + Number(b);
}
```

Both versions work! The second is shorter but the first is clearer for beginners.
</details>

<details>
<summary>Hint 4: The pattern for all functions</summary>

Every function follows the same pattern - convert inputs to numbers, then calculate:

```javascript
export function add(a, b) {
  return Number(a) + Number(b);
}

export function subtract(a, b) {
  return Number(a) - Number(b);
}

export function multiply(a, b) {
  return Number(a) * Number(b);
}

export function divide(a, b) {
  return Number(a) / Number(b);
}

export function modulo(a, b) {
  return Number(a) % Number(b);
}

export function power(base, exponent) {
  return Number(base) ** Number(exponent);
}

export function squareRoot(number) {
  return Math.sqrt(Number(number));
}
```

Simple! Just wrap each parameter in `Number()` before using it.
</details>

## Test Your Code

To run your code and see the output:
```bash
cd exercises/010-calculator-input
node 010-calculator-input.js
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise introduces crucial concepts for handling user input:

- **Type conversion**: Converting between strings and numbers
- **Number() function**: Converting strings to numeric values
- **parseFloat() function**: Alternative for decimal numbers
- **Why conversion matters**: Understanding JavaScript's type system
- **Real-world input handling**: Preparing for actual user interfaces

Every form input, API response, and user interaction involves type conversion!

## Reflection Questions

After completing the exercise, think about:
1. What happens if you try `Number("hello")`? Try it in your code!
2. Why does `"5" + "3"` give `"53"` but `"5" - "3"` gives `2`?
3. When would you use `parseInt()` instead of `Number()`?

## Solution

<details>
<summary>Click to see the solution (try the exercise first!)</summary>

```javascript
// Calculator functions from previous exercises

export function add(a, b) {
  return Number(a) + Number(b);
}

export function subtract(a, b) {
  return Number(a) - Number(b);
}

export function multiply(a, b) {
  return Number(a) * Number(b);
}

export function divide(a, b) {
  return Number(a) / Number(b);
}

export function modulo(a, b) {
  return Number(a) % Number(b);
}

export function power(base, exponent) {
  return Number(base) ** Number(exponent);
}

export function squareRoot(number) {
  return Math.sqrt(Number(number));
}

// Test with string inputs (simulating user input from forms)
console.log("=== Testing with String Inputs ===");
console.log('add("10", "5") =', add("10", "5"));
console.log('subtract("10", "5") =', subtract("10", "5"));
console.log('multiply("10", "5") =', multiply("10", "5"));
console.log('divide("10", "5") =', divide("10", "5"));
console.log('modulo("10", "3") =', modulo("10", "3"));
console.log('power("2", "3") =', power("2", "3"));
console.log('squareRoot("16") =', squareRoot("16"));

// Test with mixed inputs
console.log("\n=== Mixed Number and String Inputs ===");
console.log('add(10, "5") =', add(10, "5"));
console.log('multiply("7", 3) =', multiply("7", 3));
```

**Why this works:**

When you call `Number()` on a value:
- If it's already a number, it stays a number: `Number(5)` → `5`
- If it's a string with a valid number, it converts: `Number("5")` → `5`
- If it's a string with decimals, it converts: `Number("3.14")` → `3.14`

So `Number()` is safe to use even if the input might already be a number!

**Understanding the conversion:**

```javascript
// Before conversion (strings):
"10" + "5"    // Results in "105" (concatenation)

// After conversion (numbers):
Number("10") + Number("5")  // Results in 15 (addition)

// The conversion process:
add("10", "5")
  → Number("10") + Number("5")
  → 10 + 5
  → 15
```

**Alternative using parseFloat:**

You could also use `parseFloat()` which handles decimals well:

```javascript
export function add(a, b) {
  return parseFloat(a) + parseFloat(b);
}
```

Both `Number()` and `parseFloat()` work, but `Number()` is slightly stricter:

```javascript
Number("42")       // 42
Number("42abc")    // NaN (Not a Number - invalid!)

parseFloat("42")     // 42
parseFloat("42abc")  // 42 (stops at first non-numeric character)
```

For a calculator, `Number()` is usually better because it catches invalid inputs!

**What about parseInt?**

`parseInt()` only returns whole numbers (integers):

```javascript
parseInt("3.14")    // Returns 3 (drops the decimal!)
parseFloat("3.14")  // Returns 3.14 (keeps the decimal)
Number("3.14")      // Returns 3.14 (keeps the decimal)
```

Use `parseInt()` only when you specifically want whole numbers (like counting items, ages, etc.).

**Handling Number() on actual numbers:**

One great thing about `Number()` is that it's safe to use even if the value is already a number:

```javascript
Number(5)       // Returns 5 (already a number, unchanged)
Number("5")     // Returns 5 (string converted to number)
Number(3.14)    // Returns 3.14 (already a number)
Number("3.14")  // Returns 3.14 (string converted to number)
```

This means you don't need to check the type first - just convert it!

**Real-world context:**

Type conversion is essential in web development:

**Form inputs:**
```javascript
// HTML: <input id="price" value="19.99">
const priceInput = document.getElementById("price").value;  // "19.99" (string!)
const price = Number(priceInput);  // 19.99 (number!)
const tax = price * 0.1;  // Now you can do math!
```

**API responses:**
```javascript
// JSON often has numbers as strings
const data = { age: "25", price: "99.99" };
const age = Number(data.age);      // 25
const price = Number(data.price);  // 99.99
```

**URL parameters:**
```javascript
// URL: example.com/product?id=42&quantity=3
// All URL parameters come as strings!
const id = Number(urlParams.get("id"));          // 42
const quantity = Number(urlParams.get("quantity")); // 3
```

**What happens with invalid input?**

When you try to convert non-numeric strings, you get `NaN` (Not a Number):

```javascript
Number("hello")    // NaN
Number("12abc")    // NaN (strict - won't convert partial numbers)
Number("")         // 0 (empty string converts to 0)
Number("  ")       // 0 (whitespace converts to 0)

// NaN in calculations:
Number("hello") + 5  // NaN (NaN + anything = NaN)
```

We'll learn how to validate inputs and handle `NaN` in the next exercises!

</details>

## Next Steps

Great progress! Your calculator now handles string inputs like a real application.

In **exercise 011-calculator-display**, you'll learn to format the output to look professional - controlling decimal places, adding labels, and making results easy to read. This is crucial for creating user-friendly applications!

Keep coding!
