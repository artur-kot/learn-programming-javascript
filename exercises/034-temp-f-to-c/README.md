## Temperature Converter - Fahrenheit to Celsius

Convert temperatures from Fahrenheit to Celsius - a common task when reading user input or working with datasets from different regions.

In this exercise you'll implement a function to convert Fahrenheit values into Celsius.

## Your Challenge

Open `034-temp-f-to-c.js` and implement the `fahrenheitToCelsius` function.

Requirements:
- Accept a number (degrees Fahrenheit) as input
- Return the converted temperature in degrees Celsius using the formula: (F - 32) × 5/9
- Do not print from inside the function (tests will call it)

## Expected Behavior

```text
fahrenheitToCelsius(32)   // 0
fahrenheitToCelsius(212)  // 100
fahrenheitToCelsius(-40)  // -40
```

## Hints

<details>
<summary>Hint 1: Formula</summary>

Use the formula: Celsius = (Fahrenheit - 32) * 5/9.

</details>

<details>
<summary>Hint 2: Return the value</summary>

Remember to use `return` so the caller gets the numeric result.

</details>

<details>
<summary>Hint 3: Negative numbers</summary>

The same formula works for negative values (e.g., -40°F is -40°C).

</details>

## Test Your Code

To run the tests:

```bash
cd exercises/034-temp-f-to-c
node 034-temp-f-to-c.test.js
```

## What You're Learning

- Writing simple mathematical functions
- Applying formulas and operator precedence
- Returning values from functions

## Reflection Questions

1. Why do we subtract 32 before multiplying?
2. How would you convert Celsius back to Fahrenheit?

## Next Steps

Next, you'll add Kelvin conversions so you can switch between absolute and relative temperature scales.

## Read More

- 📚 [Temperature conversion formulas - Wikipedia](https://en.wikipedia.org/wiki/Conversion_of_units)
- 📖 [Numeric operators - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#arithmetic_operators)
