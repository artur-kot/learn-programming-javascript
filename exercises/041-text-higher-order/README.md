## Text Analyzer - Higher-Order Functions

Take your functional programming skills to the next level by creating functions that return other functions.

In this exercise you'll implement factory functions that create specialized filter functions.

## Your Challenge

Open `041-text-higher-order.js`. Implement:
- `createDigitFilter()` — returns a function that identifies digits
- `createLetterFilter()` — returns a function that identifies letters
- `createLowercaseFilter()` — returns a function that identifies lowercase letters
- `createUppercaseFilter()` — returns a function that identifies uppercase letters
- `createCharacterFilter(targetChar)` — returns a function that matches a specific character

Requirements:
- Each function must return a function (not execute directly)
- Returned functions accept a single character
- Returned functions return true/false for matching
- All previous functions (countWords, countMatching, etc.) should still work

## Expected Behavior

```javascript
const isDigit = createDigitFilter();
isDigit('5')                          // true
isDigit('a')                          // false

const isLower = createLowercaseFilter();
countMatching('HeLLo', isLower)       // 2

const isX = createCharacterFilter('x');
filterText('example', isX)            // "x"
```

## Hints

<details>
<summary>Hint 1: Returning functions</summary>

A function can return another function:

```javascript
function createFilter() {
  return char => /[0-9]/.test(char);
}
```

</details>

<details>
<summary>Hint 2: Arrow functions</summary>

Arrow functions are perfect for creating small, reusable filter functions.

</details>

<details>
<summary>Hint 3: Parameters in returned functions</summary>

For `createCharacterFilter(targetChar)`, use the parameter in the returned function:

```javascript
export function createCharacterFilter(targetChar) {
  return char => char === targetChar;
}
```

</details>

## Test Your Code

```bash
cd exercises/041-text-higher-order
node 041-text-higher-order.test.js
```

## What You're Learning

- Higher-order functions
- Factory functions
- Closures (accessing outer function's parameters in returned function)
- Functional programming patterns

## Reflection Questions

1. Why might creating filter factories be better than defining each filter inline?
2. How do you think closures allow the returned function to "remember" the targetChar?

## Next Steps

Next, you'll compose multiple analysis functions together into a comprehensive text analyzer.

## Read More

- 📚 [Higher-Order Functions - MDN](https://developer.mozilla.org/en-US/docs/Glossary/Higher-order_function)
- 📖 [Factory Functions - JavaScript.info](https://javascript.info/constructor-new)