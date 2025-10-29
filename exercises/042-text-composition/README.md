## Text Analyzer - Function Composition

Bring everything together! Compose your text analysis functions into a comprehensive analyzer.

In this exercise you'll combine all the functions you've created into a single powerful analysis tool.

## Your Challenge

Open `042-text-composition.js`. Implement:
- `analyzeText(text)` — perform complete text analysis and return results as an object
- `analyzeTextWithOptions(text, options)` — perform customizable analysis based on options

Requirements for `analyzeText`:
- Return an object with properties: words, characters, letters, digits, digitString, letterString
- Use your existing helper functions to build the analysis
- Do not duplicate code - use the functions you already created

Requirements for `analyzeTextWithOptions`:
- Default to full analysis if no options provided
- Accept options object to customize which analyses to perform
- Return only requested analyses

## Expected Behavior

```javascript
analyzeText("Hello 2024")
// { 
//   words: 2, 
//   characters: 10,
//   letters: 5,
//   digits: 4,
//   digitString: "2024",
//   letterString: "Hello"
// }

analyzeTextWithOptions("test123", { includeDigits: true, includeLetters: false })
// Returns analysis with digits but possibly without letter counts
```

## Hints

<details>
<summary>Hint 1: Object construction</summary>

You can return an object with multiple properties:

```javascript
return {
  words: countWords(text),
  characters: countCharacters(text),
  // ... more properties
};
```

</details>

<details>
<summary>Hint 2: Reusing existing functions</summary>

Don't rewrite logic you already have. Just call your existing functions.

</details>

<details>
<summary>Hint 3: Default parameters</summary>

```javascript
export function analyzeTextWithOptions(text, options = {}) {
  // options defaults to empty object if not provided
}
```

</details>

## Test Your Code

```bash
cd exercises/042-text-composition
node 042-text-composition.test.js
```

## What You're Learning

- Function composition
- Object creation and properties
- Combining multiple functions into a single interface
- Flexible, extensible design with optional parameters

## Reflection Questions

1. Why is composing functions better than writing one giant function?
2. How does returning an object make this analyzer more useful?
3. What other text properties could you analyze?

## Congratulations!

You've completed the Text Analyzer series! You've learned:
- String manipulation and basic analysis
- Character classification and filtering
- Higher-order functions and callbacks
- Functional composition

These concepts are fundamental to many real-world JavaScript applications.

## Read More

- 📚 [Function Composition - MDN](https://developer.mozilla.org/en-US/docs/Glossary/Functional_composition)
- 📖 [Objects in JavaScript - JavaScript.info](https://javascript.info/object)
- 📚 [Object Properties - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)