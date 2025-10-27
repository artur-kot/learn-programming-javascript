## Temperature Converter - Kelvin Conversions

Work with absolute temperatures - Kelvin is commonly used in scientific contexts.

In this exercise you'll write functions to convert between Celsius and Kelvin.

## Your Challenge

Open `035-temp-kelvin.js` and implement these functions:
- `celsiusToKelvin(celsius)` — returns kelvin
- `kelvinToCelsius(kelvin)` — returns celsius

Requirements:
- Use the offset 273.15 for conversions
- Return numeric values (do not print inside the functions)

## Expected Behavior

```text
celsiusToKelvin(0)    // 273.15
celsiusToKelvin(100)  // 373.15
kelvinToCelsius(273.15) // 0
```

## Hints

<details>
<summary>Hint 1: Offset</summary>

Kelvin and Celsius have the same degree size; they differ only by the offset 273.15.

</details>

<details>
<summary>Hint 2: Precision</summary>

Floating point math can introduce tiny rounding differences; tests use a small tolerance.

</details>

## Test Your Code

```bash
cd exercises/035-temp-kelvin
node 035-temp-kelvin.test.js
```

## What You're Learning

- Using constants and offsets in formulas
- Handling floating point comparisons

## Reflection Questions

1. Why does Kelvin use an offset rather than a scaling factor?
2. How would you convert Kelvin directly to Fahrenheit?

## Read More

- 📚 [Kelvin - Wikipedia](https://en.wikipedia.org/wiki/Kelvin)
- 📖 [Working with numbers - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers)
