## Text Analyzer - Word Counter

Count words in text - a foundational step toward building a text analysis tool.

In this exercise you'll create a function that counts how many words appear in a string.

## Your Challenge

Open `038-text-word-count.js` and implement the `countWords(text)` function.

Requirements:
- Accept a string as input
- Split by whitespace (spaces, tabs, newlines)
- Treat multiple consecutive spaces as a single separator
- Return the word count as a number
- Empty strings should return 0

## Expected Behavior

```text
countWords("hello world")           // 2
countWords("The quick brown fox")   // 4
countWords("")                      // 0
countWords("  multiple   spaces  ") // 2
```

## Hints

<details>
<summary>Hint 1: Split method</summary>

Use the `.split()` method to break a string into an array. You can split on whitespace.

</details>

<details>
<summary>Hint 2: Trim whitespace</summary>

Use `.trim()` to remove leading/trailing spaces before splitting.

</details>

<details>
<summary>Hint 3: Regex split</summary>

To handle multiple spaces, use a regex pattern like `/\s+/` to split on any whitespace sequence.

</details>

## Test Your Code

```bash
cd exercises/038-text-word-count
node 038-text-word-count.test.js
```

## What You're Learning

- String methods: split, trim
- Regular expressions for pattern matching
- Handling edge cases (empty strings, multiple spaces)

## Reflection Questions

1. What happens if you split on just a space instead of /\s+/?
2. How would you count words that contain punctuation?

## Next Steps

Next, you'll expand this to count characters, letters, and digits - building more stat functions on top of your word counter.

## Read More

- 📚 [String.prototype.split() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
- 📖 [String.prototype.trim() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim)