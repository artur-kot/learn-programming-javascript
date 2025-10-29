## Text Analyzer - Character Statistics

Expand your analyzer to count not just words, but also characters, letters, and digits.

This exercise builds on your word counter. You'll add three new functions to provide deeper text analysis.

## Your Challenge

Open `039-text-char-stats.js`. The `countWords` function is already implemented from the previous exercise. Now implement:
- `countCharacters(text)` — total character count (including spaces)
- `countLetters(text)` — alphabetic characters only (a-z, A-Z)
- `countDigits(text)` — numeric characters only (0-9)

## Expected Behavior

```text
countCharacters("Hello world") // 11 (H,e,l,l,o, ,w,o,r,l,d)
countLetters("Hello world")    // 10 (letters only)
countDigits("I have 2 cats and 3 dogs") // 2
```

## Hints

<details>
<summary>Hint 1: Character count</summary>

Use the `.length` property on the string directly.

</details>

<details>
<summary>Hint 2: Loop through characters</summary>

Use a for...of loop to iterate through each character.

</details>

<details>
<summary>Hint 3: Regular expressions</summary>

Use regex patterns like `/[a-zA-Z]/` to test if a character is a letter.

</details>

## Test Your Code

```bash
cd exercises/039-text-char-stats
node 039-text-char-stats.test.js
```

## What You're Learning

- Building on previous solutions
- Character classification with regex
- Different types of text analysis

## Read More

- 📚 [String.prototype.length - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length)
- 📖 [Regular expressions - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)