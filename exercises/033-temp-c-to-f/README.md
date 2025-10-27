## Temperature Converter - Celsius to Fahrenheit

Practice converting temperatures — a common task when working with international data and user inputs.

In this exercise you'll create a function that converts temperatures from Celsius to Fahrenheit.

## Your Challenge

Open `033-temp-c-to-f.js` and implement the `celsiusToFahrenheit` function.

Requirements:
- Accept a single number (degrees Celsius) as input
- Return a number representing degrees Fahrenheit using the formula: (C × 9/5) + 32
- Do not print the result from inside the function (the tests will call and check the return value)

## Expected Behavior

When your function is implemented:

```text
celsiusToFahrenheit(0)   // 32
celsiusToFahrenheit(100) // 212
celsiusToFahrenheit(-40) // -40
```

## Hints

<details>
<summary>Hint 1: Formula</summary>

Use the formula: Fahrenheit = (Celsius * 9/5) + 32. Try writing it directly in code.

</details>

<details>
<summary>Hint 2: Order of operations</summary>

Remember to multiply Celsius by 9, then divide by 5, then add 32. Parentheses can make this explicit: `(celsius * 9) / 5 + 32`.

</details>

<details>
<summary>Hint 3: Return value</summary>

Make sure your function uses the `return` keyword to give the result back to the caller — tests will assert the returned number.

</details>

## Test Your Code

To run the tests for this exercise:

```bash
cd exercises/033-temp-c-to-f
node 033-temp-c-to-f.test.js
```

## What You're Learning

- How to write simple functions
- Working with numeric expressions and order of operations
- Returning values from functions instead of printing them

## Reflection Questions

1. Why is the order of operations important in the conversion formula?
2. What happens if you forget to `return` the calculated value?
3. How would you adapt the function to accept a string like "25C" as input?

## Next Steps

Next, you'll implement the inverse conversion — Fahrenheit to Celsius — and then create a small utility that can convert both directions.