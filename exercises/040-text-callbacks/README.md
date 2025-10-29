## Text Analyzer - Custom Filters

Make your text analyzer flexible by accepting callback functions for custom filtering logic.

In this exercise you'll add the ability to pass a callback function to filter or count characters based on any criteria.

## Your Challenge

Open `040-text-callbacks.js`. Implement:
- `countMatching(text, filterFunction)` — count characters where filterFunction returns true
- `filterText(text, filterFunction)` — return new string with only matching characters

Requirements:
- filterFunction receives a single character
- filterFunction returns true if the character matches, false otherwise
- Do not modify the original text

## Expected Behavior

```text
const isDigit = char => /[0-9]/.test(char);
countMatching("hello123", isDigit)  // 3
filterText("hello123", isDigit)     // "123"

const isLower = char => /[a-z]/.test(char);
filterText("Hello123", isLower)     // "ello"
```

## Hints

<details>
<summary>Hint 1: Callback pattern</summary>

A callback is a function passed as an argument to another function. Call it inside your function with `filterFunction(char)`.

</details>

<details>
<summary>Hint 2: Building strings</summary>

Use concatenation or a loop to build a new string from matching characters.

</details>

<details>
<summary>Hint 3: Higher-order functions</summary>

Functions that accept functions as parameters are called higher-order functions.

</details>

## Test Your Code

```bash
cd exercises/040-text-callbacks
node 040-text-callbacks.test.js
```

## What You're Learning

- Callback functions
- Higher-order functions (functions that take functions as arguments)
- Function flexibility and reusability

## Reflection Questions

1. Why is using callbacks more flexible than hard-coding specific logic?
2. Can you think of other text analysis tasks that could use callbacks?

## Next Steps

Next, you'll create functions that return functions - going even deeper into functional programming.

## Read More

- 📚 [Callback functions - MDN](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
- 📖 [Higher-Order Functions - JavaScript.info](https://javascript.info/function-object)