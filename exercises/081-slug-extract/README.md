# Exercise 081: URL Slug Generator - Extract Parts

Learn to extract substrings using `slice()` and `substring()`. These methods let you grab specific portions of text, useful for truncating long slugs, extracting prefixes/suffixes, or building preview text. Understanding these methods is essential for advanced text processing.

## Concepts

- **String slice()** - Extract substring using start and end positions
- **String substring()** - Similar to slice but with different negative behavior
- **String length** - Getting string size
- **Index positions** - How strings are indexed (0-based)
- **Truncation** - Shortening strings to maximum length
- **Substring extraction** - Getting parts of strings for processing

## What You're Learning

Strings are sequences of characters at positions:
```
"javascript"
 0123456789
```

`slice()` and `substring()` let you extract ranges:
- `"javascript".slice(0, 4)` → "java"
- `"javascript".slice(6)` → "ript"
- `"javascript".slice(-4)` → "ript" (negative: count from end)

**When to use this:**
- Truncate long slugs: "very-long-article-title" → first 15 chars
- Extract first/last word
- Remove prefix or suffix
- Create preview text

## Challenge

Enhance your slug generator with extraction capabilities. Truncate long slugs to reasonable lengths, extract specific parts, and combine extraction with your slug generation logic.

## Functions to Implement

### `truncateSlug(slug, maxLength)`
Shorten a slug to a maximum length, preserving whole words when possible.

**Parameters:**
- `slug` - A slug string
- `maxLength` - Maximum length desired

**Returns:**
- Truncated slug (with trailing hyphens removed if needed)

**Example:**
```javascript
truncateSlug("learn-javascript-basics", 10);
// Returns: "learn"

truncateSlug("web-development-tips", 15);
// Returns: "web-development"

truncateSlug("hello", 10);
// Returns: "hello"
```

### `getSlugPrefix(slug, wordCount)`
Extract first N words from a slug.

**Parameters:**
- `slug` - A hyphen-separated slug
- `wordCount` - Number of words to extract

**Returns:**
- First N words joined by hyphens

**Example:**
```javascript
getSlugPrefix("learn-javascript-advanced-basics", 2);
// Returns: "learn-javascript"

getSlugPrefix("python-tips-tricks", 1);
// Returns: "python"
```

### `getSlugSuffix(slug, wordCount)`
Extract last N words from a slug.

**Parameters:**
- `slug` - A hyphen-separated slug
- `wordCount` - Number of words to extract

**Returns:**
- Last N words joined by hyphens

**Example:**
```javascript
getSlugSuffix("learn-javascript-advanced-basics", 2);
// Returns: "advanced-basics"

getSlugSuffix("web-design-trends-2024", 2);
// Returns: "trends-2024"
```

### `extractKeywordFromSlug(slug, position)`
Extract a single word from slug at given position.

**Parameters:**
- `slug` - A hyphen-separated slug
- `position` - Zero-based word position

**Returns:**
- Word at that position, or empty string if out of bounds

**Example:**
```javascript
extractKeywordFromSlug("learn-javascript-basics", 1);
// Returns: "javascript"

extractKeywordFromSlug("python-tips-tricks", 0);
// Returns: "python"

extractKeywordFromSlug("hello", 5);
// Returns: ""
```

## Requirements

- Use `slice()` or `substring()` for string extraction
- Use `.length` to get string size
- Handle edge cases (empty strings, invalid positions)
- Remove trailing hyphens from truncated slugs
- Work with hyphen-separated words
- Preserve slug validity after extraction

## Hints

<details>
<summary>Hint 1: Slice vs Substring</summary>
Both `slice()` and `substring()` extract substrings. Key difference: `slice()` accepts negative indexes (counting from the end), while `substring()` doesn't. For this exercise, `slice()` is more flexible.
</details>

<details>
<summary>Hint 2: Using Length</summary>
To get the last N characters: `slug.slice(-N)`. To get all but the last N: `slug.slice(0, -N)`. The `.length` property tells you the total characters.
</details>

<details>
<summary>Hint 3: Removing Trailing Hyphens</summary>
After truncating, you might have a trailing hyphen like "learn-". Use `slug.slice(0, -1)` or `slug.replace(/-+$/, '')` to remove it. Which is better for this exercise?
</details>

<details>
<summary>Hint 4: Words in Slugs</summary>
Slugs are just strings with hyphens. To get word 1: split by hyphen, get index 1, rejoin if needed. Or use `slice()` creatively with `indexOf()` to find hyphen positions.
</details>

## Expected Behavior

```javascript
// Truncation
truncateSlug("learn-javascript-basics", 10) → "learn"
truncateSlug("hello-world", 15) → "hello-world"
truncateSlug("a-very-long-slug", 8) → "a-very"

// Prefix extraction
getSlugPrefix("learn-javascript-advanced", 2) → "learn-javascript"

// Suffix extraction  
getSlugSuffix("learn-javascript-advanced", 2) → "javascript-advanced"

// Keyword extraction
extractKeywordFromSlug("python-tips-tricks", 1) → "tips"
extractKeywordFromSlug("hello-world", 0) → "hello"
```

## Testing

Run tests to verify your implementation:

```bash
cd exercises/081-slug-extract
pnpm test
```

Tests will check:
- Truncation respects max length
- Trailing hyphens are removed
- Prefix/suffix extraction works correctly
- Edge cases (empty, out of bounds, short slugs)
- Word extraction by position
- String extraction methods used properly

## Reflection Questions

After completing this exercise, consider:

1. **Slice vs Substring** - When would you use each? Why is negative indexing useful?
2. **Real-world use** - When do you see truncated text online? (Twitter, preview text, etc.)
3. **Handling hyphens** - Is there a cleaner way to remove trailing hyphens?
4. **Performance** - Does splitting create unnecessary copies? Is it a concern?

## Next Steps

In the final exercise, you'll master regular expressions to create a sophisticated slug generator that handles edge cases!

## Read More

- [String slice() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice)
- [String substring() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring)
- [String length - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length)
- [String indexOf() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)
