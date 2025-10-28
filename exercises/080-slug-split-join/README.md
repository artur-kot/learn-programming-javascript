# Exercise 080: URL Slug Generator - Split and Join

Take a different approach to slug generation: convert strings to arrays, process each element, and join them back. This technique is powerful for cleaning, filtering, and transforming content. You'll learn that strings and arrays are just different ways to represent data.

## Concepts

- **String split()** - Convert string to array by splitting on a delimiter
- **Array join()** - Convert array back to string with a separator
- **Array operations** - Filter and transform array elements
- **Method chaining** - Combining multiple operations
- **Data transformation patterns** - Common technique in data processing

## What You're Learning

The **split/join pattern** is fundamental in programming:
1. Split text into individual pieces (words, characters, lines)
2. Process each piece independently
3. Combine pieces back together

This approach gives you fine-grained control. For example:
- "Hello  World" (two spaces) split by space gives `["Hello", "", "World"]`
- You can filter out empty strings
- Join with hyphens to get "hello-world"

**Why is this useful?**
- Handle multiple spaces, tabs, or mixed whitespace
- Remove empty elements programmatically
- Transform each element uniformly
- Validate content as you process

## Challenge

Refactor your slug generator using the split/join approach. You'll see how breaking the problem into smaller steps makes the code more flexible and powerful.

## Functions to Implement

### `slugFromArray(title)`
Convert title to slug by: splitting into words, filtering empty strings, lowercasing, and joining with hyphens.

**Parameters:**
- `title` - Title to convert (may have extra spaces)

**Returns:**
- Clean slug with words separated by hyphens

**Example:**
```javascript
slugFromArray("Hello  World");
// Returns: "hello-world" (handles multiple spaces)

slugFromArray("  Spaces  Around  ");
// Returns: "spaces-around" (removes leading/trailing)

slugFromArray("Learn JavaScript Basics");
// Returns: "learn-javascript-basics"
```

### `splitAndFilter(text, separator)`
Split text by separator, filter empty strings, and return the array.

**Parameters:**
- `text` - Text to split
- `separator` - What to split on (usually " ")

**Returns:**
- Array of non-empty strings

**Example:**
```javascript
splitAndFilter("Hello  World", " ");
// Returns: ["Hello", "World"] (empty string filtered out)

splitAndFilter("a--b--c", "--");
// Returns: ["a", "b", "c"]
```

### `normalizeAndJoin(words, separator)`
Convert array of words to lowercase, filter empties, and join with separator.

**Parameters:**
- `words` - Array of strings to process
- `separator` - What to join with

**Returns:**
- Lowercase, joined string

**Example:**
```javascript
normalizeAndJoin(["Hello", "World"], "-");
// Returns: "hello-world"

normalizeAndJoin(["Python", "JS", "Ruby"], "_");
// Returns: "python_js_ruby"
```

### `buildSlugFromWords(title)`
Advanced: Clean special characters, split, filter, normalize, and join.

**Parameters:**
- `title` - Raw title with possible special characters and spaces

**Returns:**
- Clean, valid slug

**Example:**
```javascript
buildSlugFromWords("Learn JavaScript!");
// Returns: "learn-javascript"

buildSlugFromWords("Hello,  World!");
// Returns: "hello-world"
```

## Requirements

- Use `split()` to convert strings to arrays
- Use `join()` to convert arrays back to strings
- Filter out empty strings from arrays
- Convert all words to lowercase
- Handle multiple spaces correctly
- Handle leading/trailing spaces
- Remove special characters before slug generation
- Return valid URL-safe slugs

## Hints

<details>
<summary>Hint 1: Split Basics</summary>
`"hello world".split(" ")` gives `["hello", "world"]`. But what about `"hello  world"` (two spaces)? It gives `["hello", "", "world"]` - notice the empty string! That's why filtering is useful.
</details>

<details>
<summary>Hint 2: Filter Empty Strings</summary>
After splitting, you might have empty strings. Use `array.filter(word => word.length > 0)` or `array.filter(word => word)` to remove them. An empty string is falsy in JavaScript.
</details>

<details>
<summary>Hint 3: Method Chaining</summary>
You can chain methods: `"Hello  World".split(" ").filter(w => w).join("-")`. But make sure each method returns what the next one expects (split returns array, join returns string).
</details>

<details>
<summary>Hint 4: Combining with Previous Knowledge</summary>
You can use regex replace BEFORE splitting: `title.replace(/[^a-z0-9 -]/gi, '').split(" ").filter(w => w).join("-")`. Try combining your previous techniques!
</details>

## Expected Behavior

```javascript
// Handles multiple spaces
slugFromArray("Hello  World") → "hello-world"

// Removes leading/trailing spaces
slugFromArray("  Hello World  ") → "hello-world"

// Multiple spaces and extra characters
slugFromArray("Learn   JavaScript  ") → "learn-javascript"

// Integration with previous techniques
buildSlugFromWords("Hello, World!") → "hello-world"
buildSlugFromWords("Learn JavaScript!") → "learn-javascript"
```

## Testing

Run tests to verify your implementation:

```bash
cd exercises/080-slug-split-join
pnpm test
```

Tests will check:
- Splitting produces correct arrays
- Empty strings are filtered properly
- Multiple spaces are handled
- Leading/trailing spaces are removed
- Words are normalized to lowercase
- Final slugs are valid and complete

## Reflection Questions

After completing this exercise, consider:

1. **When to split?** When is split/join better than direct string replacement?
2. **Performance** - Does split/join create unnecessary copies? Is that a problem?
3. **Flexibility** - How would you modify this to handle line breaks or tabs?
4. **Real-world patterns** - Where else do you see split/join patterns? (CSV parsing, config files, etc.)

## Next Steps

In the next exercise, you'll learn to extract parts of strings using slice and substring methods!

## Read More

- [String split() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
- [Array join() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
- [Array filter() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Method Chaining - MDN](https://developer.mozilla.org/en-US/docs/Glossary/Method_chaining)
