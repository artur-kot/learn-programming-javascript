## Temperature Defaults - Use Default Parameters

Make functions more flexible and user-friendly by providing sensible default values.

In this exercise you'll add a default parameter to a temperature conversion function.

## Your Challenge

Open `036-temp-defaults.js` and implement `celsiusToFahrenheit(celsius = 25)`.

Requirements:
- If called with a number, convert it to Fahrenheit as usual
- If called with no arguments, assume 25°C (common room temperature) and return its Fahrenheit value

## Expected Behavior

```text
celsiusToFahrenheit(0)   // 32
celsiusToFahrenheit()    // 77 (25°C -> 77°F)
```

## Hints

<details>
<summary>Hint 1: Default syntax</summary>

You can provide a default value right in the parameter list: `function f(x = 10) {}`

</details>

<details>
<summary>Hint 2: Reuse formula</summary>

Use the same formula as before: `(celsius * 9) / 5 + 32`.

</details>

## Test Your Code

```bash
cd exercises/036-temp-defaults
node 036-temp-defaults.test.js
```

## What You're Learning

- Default parameters
- Backwards-compatible functions that are easier to call

## Read More

- 📚 [Default parameters - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
