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
<summary>Hint 1: Understanding invalid data</summary>

When conversions fail, JavaScript produces a special value indicating "this isn't a valid number." Think about:
- What happens when you try to convert "hello" to a number?
- How can you detect when a conversion has failed?
- What special value represents calculation failure in JavaScript?

Detecting invalid data is the first step in defensive programming.
</details>

<details>
<summary>Hint 2: Checking for invalid inputs</summary>

Before performing calculations, you need to verify inputs are usable. Consider:
- How do you check if a converted value is actually a valid number?
- What should your function return when it receives invalid input?
- Does JavaScript provide a built-in way to test for invalid numeric values?

Validation creates a safety checkpoint before proceeding with operations.
</details>

<details>
<summary>Hint 3: Handling mathematical impossibilities</summary>

Some operations have special restrictions beyond just being numbers. Think about:
- What happens mathematically when you divide by zero?
- Can you calculate the square root of a negative number (in basic math)?
- How should your functions respond when asked to do impossible operations?

Different functions may need different validation checks based on their mathematical constraints.
</details>

<details>
<summary>Hint 4: Ordering validation checks</summary>

When multiple things can go wrong, order matters. Consider:
- Should you check if something is a number before checking if it's zero?
- What's the most fundamental requirement that should be checked first?
- How do you structure multiple validation conditions?

Always validate the most basic requirements first before checking specific constraints.
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

