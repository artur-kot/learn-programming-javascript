## Calculator - Display Results

Your calculator works great! But the output could be more professional. When you divide 10 by 3, you get `3.3333333333333335` - not very user-friendly! Real applications format numbers to be readable and add helpful labels like "$", "%", or units.

In this exercise, you'll learn to format calculator results like a professional application.

**Building on previous exercises**: This exercise builds on your calculator from exercises 008-010, adding professional formatting to the output.

## Your Challenge

Imagine showing calculator results to real users. Compare these outputs:

**Ugly (what we have now):**
```
Price: 19.5
Tax rate: 0.156
Distance: 1500
Result: 3.3333333333333335
```

**Professional (what we want):**
```
Price: $19.50
Tax rate: 15.6%
Distance: 1.50 km
Result: 10 ÷ 3 = 3.33
```

Open `011-calculator-display.js`. Your task is to create four formatting functions:

1. `formatCurrency()` - Format numbers as dollars with 2 decimal places
2. `formatPercentage()` - Convert decimals to percentages with 1 decimal place
3. `formatDistance()` - Show meters or kilometers with appropriate units
4. `formatCalculation()` - Display full equation with formatted result

## Expected Output

When you run your code, you should see:
```
=== Currency Formatting ===
$19.50
$1234.57
$0.50

=== Percentage Formatting ===
15.6%
50.0%
125.0%

=== Distance Formatting ===
500 m
1.50 km
2.75 km

=== Calculation Formatting ===
10 + 5.5 = 15.50
7 × 3 = 21.00
10 ÷ 3 = 3.33
```

## Hints

<details>
<summary>Hint 1: The toFixed() method</summary>

The `.toFixed()` method rounds numbers to a specific number of decimal places and returns a **string**:

```javascript
const price = 19.5;
price.toFixed(2)  // Returns "19.50" (2 decimals)

const pi = 3.14159;
pi.toFixed(1)     // Returns "3.1" (1 decimal)
pi.toFixed(3)     // Returns "3.142" (3 decimals)

const whole = 100;
whole.toFixed(2)  // Returns "100.00" (adds decimals)
```

Key points:
- Always returns a string (not a number)
- Rounds to the specified decimal places
- Adds zeros if needed to reach the decimal count
</details>

<details>
<summary>Hint 2: Formatting currency</summary>

To format as currency:
1. Use `.toFixed(2)` to get exactly 2 decimal places
2. Add a dollar sign "$" at the beginning

```javascript
export function formatCurrency(amount) {
  return "$" + amount.toFixed(2);
}

// Examples:
formatCurrency(19.5)      // Returns "$19.50"
formatCurrency(1234.567)  // Returns "$1234.57"
```

You can also use a template literal:
```javascript
return `$${amount.toFixed(2)}`;
```
</details>

<details>
<summary>Hint 3: Formatting percentages</summary>

To format as a percentage:
1. Multiply the decimal by 100
2. Use `.toFixed(1)` for 1 decimal place
3. Add "%" at the end

```javascript
export function formatPercentage(decimal) {
  return (decimal * 100).toFixed(1) + "%";
}

// Examples:
formatPercentage(0.156)  // Returns "15.6%"
formatPercentage(0.5)    // Returns "50.0%"
```

Why multiply by 100? Because 0.156 as a decimal = 15.6 as a percentage.
</details>

<details>
<summary>Hint 4: Formatting distance with conditions</summary>

For distance, you need conditional logic:
- If distance is 1000 or more, show kilometers (divide by 1000, 2 decimals)
- If less than 1000, show meters (no decimals)

```javascript
export function formatDistance(meters) {
  if (meters >= 1000) {
    const km = meters / 1000;
    return km.toFixed(2) + " km";
  } else {
    return meters.toFixed(0) + " m";
  }
}

// Examples:
formatDistance(1500)  // Returns "1.50 km"
formatDistance(750)   // Returns "750 m"
```
</details>

<details>
<summary>Hint 5: Formatting full calculations</summary>

For showing calculations, you need to:
1. Convert operation name to symbol (add → +, subtract → -, etc.)
2. Format the result with `.toFixed(2)`
3. Build a template string

```javascript
export function formatCalculation(operation, num1, num2, result) {
  let symbol;

  if (operation === "add") {
    symbol = "+";
  } else if (operation === "subtract") {
    symbol = "-";
  } else if (operation === "multiply") {
    symbol = "×";  // Use × not *
  } else if (operation === "divide") {
    symbol = "÷";  // Use ÷ not /
  }

  return `${num1} ${symbol} ${num2} = ${result.toFixed(2)}`;
}

// Example:
formatCalculation("add", 10, 5.5, 15.5)
// Returns "10 + 5.5 = 15.50"
```
</details>

## Test Your Code

To run your code and see the output:
```bash
cd exercises/011-calculator-display
node 011-calculator-display.js
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise teaches essential output formatting skills:

- **toFixed() method**: Controlling decimal places in numbers
- **String concatenation**: Combining numbers with labels and symbols
- **Conditional formatting**: Choosing format based on value
- **User-friendly output**: Making data readable for humans
- **Professional presentation**: Creating polished application displays

These skills are crucial for any user-facing application!

## Reflection Questions

After completing the exercise, think about:
1. Why does `toFixed()` return a string instead of a number?
2. How would you format a very large number like 1234567.89 with comma separators (1,234,567.89)?
3. When might you want more or fewer decimal places than 2?

## Solution

<details>
<summary>Click to see the solution (try the exercise first!)</summary>

```javascript
// Calculator functions from previous exercises (with input conversion)

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

export function power(base, exponent) {
  return Number(base) ** Number(exponent);
}

export function squareRoot(number) {
  return Math.sqrt(Number(number));
}

// New display formatting functions!

export function formatCurrency(amount) {
  return "$" + amount.toFixed(2);
}

export function formatPercentage(decimal) {
  return (decimal * 100).toFixed(1) + "%";
}

export function formatDistance(meters) {
  if (meters >= 1000) {
    const km = meters / 1000;
    return km.toFixed(2) + " km";
  } else {
    return meters.toFixed(0) + " m";
  }
}

export function formatCalculation(operation, num1, num2, result) {
  let symbol;

  if (operation === "add") {
    symbol = "+";
  } else if (operation === "subtract") {
    symbol = "-";
  } else if (operation === "multiply") {
    symbol = "×";
  } else if (operation === "divide") {
    symbol = "÷";
  }

  return `${num1} ${symbol} ${num2} = ${result.toFixed(2)}`;
}

// Test the formatting functions
console.log("=== Currency Formatting ===");
console.log(formatCurrency(19.5));
console.log(formatCurrency(1234.567));
console.log(formatCurrency(0.5));

console.log("\n=== Percentage Formatting ===");
console.log(formatPercentage(0.156));
console.log(formatPercentage(0.5));
console.log(formatPercentage(1.25));

console.log("\n=== Distance Formatting ===");
console.log(formatDistance(500));
console.log(formatDistance(1500));
console.log(formatDistance(2750));

console.log("\n=== Calculation Formatting ===");
console.log(formatCalculation("add", 10, 5.5, add(10, 5.5)));
console.log(formatCalculation("multiply", 7, 3, multiply(7, 3)));
console.log(formatCalculation("divide", 10, 3, divide(10, 3)));
```

**Understanding formatCurrency:**

```javascript
formatCurrency(19.5)
  → 19.5.toFixed(2)          // "19.50"
  → "$" + "19.50"            // "$19.50"

formatCurrency(1234.567)
  → 1234.567.toFixed(2)      // "1234.57" (rounded)
  → "$" + "1234.57"          // "$1234.57"
```

The `toFixed(2)` ensures exactly 2 decimal places, even for whole numbers!

**Understanding formatPercentage:**

```javascript
formatPercentage(0.156)
  → 0.156 * 100              // 15.6
  → 15.6.toFixed(1)          // "15.6"
  → "15.6" + "%"             // "15.6%"

formatPercentage(0.5)
  → 0.5 * 100                // 50
  → 50.toFixed(1)            // "50.0"
  → "50.0" + "%"             // "50.0%"
```

We multiply by 100 because percentages are "per hundred" (per cent = per hundred in Latin!).

**Understanding formatDistance:**

```javascript
formatDistance(1500)
  → 1500 >= 1000? true
  → 1500 / 1000              // 1.5
  → 1.5.toFixed(2)           // "1.50"
  → "1.50" + " km"           // "1.50 km"

formatDistance(750)
  → 750 >= 1000? false
  → 750.toFixed(0)           // "750"
  → "750" + " m"             // "750 m"
```

We use different decimal places because:
- Kilometers need precision (1.50 km vs 1.51 km is a difference)
- Meters don't need decimals (750.5 meters is unnecessarily precise)

**Understanding formatCalculation:**

```javascript
formatCalculation("divide", 10, 3, 3.333333)
  → operation === "divide"
  → symbol = "÷"
  → `${10} ${÷} ${3} = ${3.333333.toFixed(2)}`
  → "10 ÷ 3 = 3.33"
```

Note we use proper math symbols (× and ÷) instead of programming symbols (* and /).

**Why toFixed() returns a string:**

```javascript
const num = 3.14159;
num.toFixed(2)  // Returns "3.14" (string)

// If it returned a number:
num.toFixed(2)  // Would be 3.14 (number)
// But then 3.10 would become 3.1 (losing the trailing zero!)
```

By returning a string, `toFixed()` preserves the exact formatting you requested.

**Alternative using template literals:**

You can write formatCurrency more concisely:

```javascript
// Original:
export function formatCurrency(amount) {
  return "$" + amount.toFixed(2);
}

// With template literal:
export function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}
```

Both work identically! Choose whichever is clearer to you.

**Handling edge cases:**

```javascript
// Very small numbers:
formatCurrency(0.005)  // "$0.01" (rounds up)
formatCurrency(0.004)  // "$0.00" (rounds down)

// Very large percentages:
formatPercentage(2.5)  // "250.0%" (works fine!)

// Boundary case for distance:
formatDistance(1000)   // "1.00 km" (exactly at boundary)
formatDistance(999)    // "999 m"
```

**Real-world applications:**

**E-commerce:**
```javascript
const price = 29.99;
const tax = 0.08;
const total = price * (1 + tax);

console.log(`Subtotal: ${formatCurrency(price)}`);
console.log(`Tax: ${formatPercentage(tax)}`);
console.log(`Total: ${formatCurrency(total)}`);
// Subtotal: $29.99
// Tax: 8.0%
// Total: $32.39
```

**Fitness app:**
```javascript
const distance = 5280;  // meters
console.log(`You ran ${formatDistance(distance)}!`);
// You ran 5.28 km!
```

**Financial dashboard:**
```javascript
const interestRate = 0.0425;
const principal = 10000;
const interest = principal * interestRate;

console.log(`Principal: ${formatCurrency(principal)}`);
console.log(`Rate: ${formatPercentage(interestRate)}`);
console.log(`Interest: ${formatCurrency(interest)}`);
// Principal: $10000.00
// Rate: 4.3%
// Interest: $425.00
```

**Advanced formatting (bonus):**

For really professional output, you might use the `Intl.NumberFormat` API:

```javascript
// Currency with locale:
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

formatter.format(1234.56)  // "$1,234.56" (with comma!)

// Percentage with locale:
const percentFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 1
});

percentFormatter.format(0.156)  // "15.6%"
```

But for now, `toFixed()` is perfect for learning!

</details>

## Next Steps

Fantastic work! Your calculator now produces professional, user-friendly output.

In **exercise 012-calculator-validation** (the final exercise in this series!), you'll learn to validate inputs and handle errors gracefully. What happens when someone enters "hello" instead of a number? Or divides by zero? You'll make your calculator bulletproof!

Keep coding!
