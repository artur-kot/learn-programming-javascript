## Calculator - Handle User Input

Your calculator is coming along nicely! But there's a problem: when users type numbers into forms or command-line interfaces, JavaScript receives them as **text (strings)**, not numbers. Try to add "5" + "3" in JavaScript and you'll get "53" instead of 8!

In this exercise, you'll learn how to convert string inputs into numbers so your calculator works with real user input.

**Building on previous exercises**: This exercise enhances your calculator functions from exercises 008-009 to handle string inputs.

## Type Conversion: Strings to Numbers

When users interact with web forms, command-line interfaces, or text inputs, JavaScript receives their data as **strings** (text), not numbers. This creates a problem: the `+` operator with strings concatenates (joins) them instead of adding them!

### The Problem with String Concatenation

```javascript
// Strings vs Numbers
"10" + "5"      // Results in "105" (string concatenation - not what we want!)
10 + 5          // Results in 15 (number addition - correct!)
Number("10") + Number("5")  // Results in 15 (string → number → addition)
```

### Converting Strings to Numbers

JavaScript provides several ways to convert strings to numbers:

#### 1. The `Number()` Function (Most Common)
```javascript
Number("10")    // Returns: 10 (a number)
Number("3.14")  // Returns: 3.14 (decimal numbers work too)
Number("hello") // Returns: NaN (invalid - Not a Number)
```

#### 2. The `parseFloat()` Function
```javascript
parseFloat("3.14")   // Returns: 3.14
parseFloat("42")     // Returns: 42
parseFloat("3.14abc") // Returns: 3.14 (ignores text after the number)
```

#### 3. The `parseInt()` Function
```javascript
parseInt("42")    // Returns: 42
parseInt("3.14")  // Returns: 3 (drops decimal part)
parseInt("42abc") // Returns: 42 (ignores text after the number)
```

**For this exercise, use `Number()` since it handles both integers and decimals correctly!**

### Making Your Functions Work with String Input

```javascript
function add(a, b) {
  // Convert strings to numbers first
  const numA = Number(a);
  const numB = Number(b);
  
  // Now perform the calculation
  return numA + numB;
}

add("10", "5")  // Returns: 15 ✓ (not "105")
add(10, 5)      // Still works: 15 ✓ (Number() handles actual numbers too)
```

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
<summary>Hint 1: Understanding data types</summary>

JavaScript treats text and numbers as different types of data. Think about:
- What happens when you try to do math with text that looks like a number?
- Why might "5" + "3" give a different result than 5 + 3?
- How can text be transformed into actual numbers for calculations?

Understanding the difference between text representation and numeric values is crucial.
</details>

<details>
<summary>Hint 2: Type conversion in JavaScript</summary>

Programming languages need ways to transform data from one type to another. Consider:
- If you have the text "42", how can you convert it to the number 42?
- What built-in capabilities does JavaScript provide for this transformation?
- Why is it important to explicitly convert types before performing operations?

JavaScript provides tools to handle type conversion, making your code predictable.
</details>

<details>
<summary>Hint 3: Applying conversion to calculations</summary>

The pattern is to transform your inputs before using them in calculations. Think about:
- At what point in your function should conversion happen?
- Can you convert each input parameter before using it?
- Will converting already-numeric values cause problems?

Once you convert text to numbers, the rest of your calculation logic stays the same.
</details>

<details>
<summary>Hint 4: Consistent approach across functions</summary>

All seven functions need the same enhancement:
- Each receives parameters that might be text or numbers
- Each needs to ensure parameters are numeric before calculating
- Each performs its mathematical operation after conversion

Try updating one function first to see the pattern, then apply it to the others.
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

## Next Steps

Great progress! Your calculator now handles string inputs like a real application.

In **exercise 011-calculator-display**, you'll learn to format the output to look professional - controlling decimal places, adding labels, and making results easy to read. This is crucial for creating user-friendly applications!

Keep coding!

## Read More

Want to dive deeper? Check out these resources:

- 📚 [Type Conversion - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#data_type_conversion)
- 🎯 [Type Conversions - JavaScript.info](https://javascript.info/type-conversions)
