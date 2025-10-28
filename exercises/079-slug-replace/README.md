# Exercise 079: URL Slug Generator - Remove Special Characters

Improve your slug generator to handle titles with special characters, punctuation, and accents. Real-world titles include commas, apostrophes, ampersands, and other characters that shouldn't appear in URLs. This exercise teaches you to clean titles properly using string replacement techniques.

## Concepts

- **Regular Expressions** - Introduction to regex patterns for matching characters
- **Character Patterns** - Matching groups of characters like all punctuation
- **String Normalization** - Converting text to a standard format
- **Edge Cases** - Handling apostrophes, commas, hyphens in text
- **URL-Safe Characters** - What characters are allowed in URLs

## What You're Learning

URLs have restrictions on which characters they can contain. Special characters like `!@#$%^&*()` need to be removed or replaced. You'll learn to:
1. Recognize common punctuation and special characters
2. Use regular expressions to match and remove them
3. Handle edge cases like apostrophes in words ("don't")
4. Keep the slug readable after cleaning

**Examples:**
- "Hello, World!" → "hello-world"
- "Rock & Roll" → "rock-roll"
- "User's Guide" → "users-guide"

## Challenge

Extend your slug generator to handle titles with punctuation and special characters. You'll use regular expressions to remove unwanted characters while keeping the slug readable.

## Functions to Implement

### `cleanSlug(title)`
Convert title to slug AND remove special characters (except spaces and hyphens).

**Parameters:**
- `title` - A title that may contain punctuation and special characters

**Returns:**
- A clean slug with no special characters

**Example:**
```javascript
cleanSlug("Hello, World!");
// Returns: "hello-world"

cleanSlug("Rock & Roll");
// Returns: "rock-roll"

cleanSlug("Don't miss this!");
// Returns: "dont-miss-this"

cleanSlug("Python 3.0 Tips");
// Returns: "python-30-tips"
```

### `removeSpecialChars(text)`
Remove all special characters from text, keeping only letters, numbers, spaces, and hyphens.

**Parameters:**
- `text` - Text containing special characters

**Returns:**
- Text with special characters removed

**Example:**
```javascript
removeSpecialChars("Hello @#$% World!");
// Returns: "Hello  World"

removeSpecialChars("Test-123!@#");
// Returns: "Test-123"
```

### `sanitizeTitle(title)`
Clean a title by removing special characters AND converting to slug format.

**Parameters:**
- `title` - Title to clean and convert

**Returns:**
- Clean slug format

**Example:**
```javascript
sanitizeTitle("The Ultimate Guide!");
// Returns: "the-ultimate-guide"

sanitizeTitle("100% Free & Easy");
// Returns: "100-free-easy"
```

## Requirements

- Remove all punctuation marks (! ? . , ; : ' " etc.)
- Remove all special characters (@ # $ % ^ & * = + [ ] { } | \ etc.)
- Keep letters, numbers, spaces, and hyphens
- Convert to lowercase
- Replace spaces with hyphens
- Handle titles with mixed punctuation gracefully

## Hints

<details>
<summary>Hint 1: Regular Expression Pattern</summary>
A regular expression is a pattern for matching strings. The pattern `/[^a-z0-9 -]/gi` means "find anything that's NOT a letter, number, space, or hyphen". The flags `g` (global) means replace ALL matches, and `i` means ignore case.
</details>

<details>
<summary>Hint 2: What is the Caret?</summary>
In a character class `[...]`, the caret `^` means "NOT". So `[^abc]` means "anything except a, b, or c". This is useful for keeping certain characters while removing everything else.
</details>

<details>
<summary>Hint 3: Combining Steps</summary>
You'll need to: 1) Remove special characters, 2) Handle multiple spaces, 3) Convert to lowercase, 4) Replace spaces with hyphens. Which order matters? Try different orders and see what breaks.
</details>

## Expected Behavior

```javascript
// Basic punctuation
cleanSlug("Hello, World!") → "hello-world"
cleanSlug("What?!") → "what"

// Special characters
cleanSlug("Rock & Roll") → "rock-roll"
cleanSlug("$100 Deal") → "100-deal"

// Apostrophes and quotes
cleanSlug("Don't") → "dont"
cleanSlug("It's \"Amazing\"") → "its-amazing"

// Complex titles
cleanSlug("C++ Programming!") → "c-programming"
cleanSlug("Web (HTML/CSS) Guide") → "web-htmlcss-guide"
```

## Testing

Run tests to verify your implementation:

```bash
cd exercises/079-slug-replace
pnpm test
```

Tests will check:
- Punctuation is removed correctly
- Special characters are removed
- Apostrophes in words are handled
- Numbers are preserved
- Spaces are converted to hyphens
- Multiple spaces are handled
- Output is lowercase

## Reflection Questions

After completing this exercise, consider:

1. **Why not keep all characters?** What issues would URLs have with `!@#$%` characters?
2. **What about accents?** If a title is "Café" or "Naïve", should accents be removed? (We might handle this later)
3. **Hyphen handling** - If original text has "multi-word", does it stay as "multi-word" or become something else?
4. **Real-world examples** - What titles have you seen that would need special character cleaning?

## Next Steps

In the next exercise, you'll learn about splitting strings into arrays, which opens up new possibilities for slug generation!

## Read More

- [String replace() with Regex - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
- [Regular Expressions - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Character Classes - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes)
- [Regex Patterns - Regex101.com](https://regex101.com/) (Interactive regex tester)
