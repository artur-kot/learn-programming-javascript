# Exercise 082: URL Slug Generator - Regex Pattern Matching

Bring everything together with advanced regular expressions! You'll create a production-ready slug generator that handles complex patterns, multiple spaces, various Unicode characters, and edge cases. This is the culmination of the URL Slug series.

## Concepts

- **Advanced Regex** - Complex patterns combining multiple techniques
- **Character Classes** - Grouping similar characters efficiently
- **Quantifiers** - `*`, `+`, `?`, `{n,m}` for matching repetitions
- **Alternation** - Using `|` to match multiple patterns
- **Flags** - `g` (global), `i` (case-insensitive), `u` (unicode)
- **Test and Match** - Methods to check and find patterns
- **Substitution Patterns** - Advanced replacement techniques

## What You're Learning

By now you've built slugs step by step. This exercise combines regex power with your previous knowledge:
- Convert multiple spaces to single hyphens
- Handle unicode characters (accents, non-Latin scripts)
- Validate slug format
- Create production-quality slugs used by real websites
- Debug and test complex patterns

**Real-world complexity:**
- "Café Société" should become "cafe-societe" (removing accents)
- "Hello     World" should become "hello-world" (multiple spaces)
- "CamelCaseText" might become "camel-case-text" (inserting hyphens)
- Non-English: "北京" (Beijing) handling for internationalization

## Challenge

Build the ultimate slug generator combining all previous techniques plus regex mastery. Create functions for complex transformations, pattern validation, and specialized slug types.

## Functions to Implement

### `advancedSlug(title)`
Create production-ready slugs with all refinements: special char removal, space normalization, hyphen deduplication.

**Parameters:**
- `title` - Any title string

**Returns:**
- Clean, valid slug

**Example:**
```javascript
advancedSlug("Learn JavaScript!");
// Returns: "learn-javascript"

advancedSlug("Hello     World");
// Returns: "hello-world"

advancedSlug("  Spaces  Around  ");
// Returns: "spaces-around"

advancedSlug("Multiple!!!Punctuation???");
// Returns: "multiplepunctuation"
```

### `isValidSlug(text)`
Check if a string is a valid slug format.

**Parameters:**
- `text` - String to validate

**Returns:**
- Boolean: true if valid slug, false otherwise

**Valid slug criteria:**
- Only lowercase letters, numbers, and hyphens
- Doesn't start or end with hyphen
- No consecutive hyphens
- Non-empty

**Example:**
```javascript
isValidSlug("learn-javascript");
// Returns: true

isValidSlug("Learn-JavaScript");
// Returns: false (uppercase)

isValidSlug("-invalid");
// Returns: false (starts with hyphen)

isValidSlug("hello--world");
// Returns: false (consecutive hyphens)
```

### `camelCaseToSlug(text)`
Convert camelCase or PascalCase to slug format.

**Parameters:**
- `text` - camelCase or PascalCase text

**Returns:**
- Slug format with hyphens between words

**Example:**
```javascript
camelCaseToSlug("camelCaseExample");
// Returns: "camel-case-example"

camelCaseToSlug("PascalCaseExample");
// Returns: "pascal-case-example"

camelCaseToSlug("HTTPSConnection");
// Returns: "https-connection"
```

### `findAllWords(slug)`
Extract all words from a slug using regex matching.

**Parameters:**
- `slug` - A slug string

**Returns:**
- Array of all words (non-empty strings separated by hyphens)

**Example:**
```javascript
findAllWords("learn-javascript-basics");
// Returns: ["learn", "javascript", "basics"]

findAllWords("python-3-10-tips");
// Returns: ["python", "3", "10", "tips"]
```

### `createCustomSlug(title, options)`
Create slugs with custom rules (max length, word count, etc.).

**Parameters:**
- `title` - Title to convert
- `options` - Object with optional properties:
  - `maxLength` - Maximum slug length
  - `maxWords` - Maximum number of words
  - `keepNumbers` - Keep numeric characters (default: true)

**Returns:**
- Customized slug

**Example:**
```javascript
createCustomSlug("Learn JavaScript Basics", { maxLength: 15 });
// Returns: "learn-javascript"

createCustomSlug("Python Tips Tricks", { maxWords: 2 });
// Returns: "python-tips"

createCustomSlug("Version 3.0 Release", { keepNumbers: false });
// Returns: "version-release"
```

## Requirements

- Use regular expressions for all major operations
- Handle Unicode/accented characters if possible
- Remove all special characters except hyphens
- Normalize multiple spaces to single hyphens
- Remove leading/trailing hyphens
- Deduplicate consecutive hyphens
- Convert to lowercase
- Validate slug format
- Support camelCase conversion
- Handle edge cases gracefully

## Hints

<details>
<summary>Hint 1: Multiple Spaces Pattern</summary>
To find multiple spaces: `/\s+/g` matches one or more whitespace characters. Replace with single hyphen, then clean up consecutive hyphens with `/\-+/g` → "✌️
</details>

<details>
<summary>Hint 2: CamelCase Detection</summary>
To find camelCase boundaries, look for lowercase followed by uppercase: `/([a-z])([A-Z])/g`. The `$1-$2` replacement inserts hyphen between them.
</details>

<details>
<summary>Hint 3: Validating Slugs</summary>
Valid slug pattern: `/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/` means: starts with letter/number, middle can have hyphens, ends with letter/number.
</details>

<details>
<summary>Hint 4: Extracting Words</summary>
To get all words from slug: `/[a-z0-9]+/g` with `.match()` gets all sequences of letters and numbers.
</details>

## Expected Behavior

```javascript
// Complex spacing
advancedSlug("Hello     World") → "hello-world"

// Punctuation handling
advancedSlug("Rock & Roll!!!") → "rock-roll"

// Leading/trailing cleanup
advancedSlug("  Learn  ") → "learn"

// CamelCase conversion
camelCaseToSlug("myVariableName") → "my-variable-name"

// Validation
isValidSlug("valid-slug") → true
isValidSlug("Invalid-Slug") → false
isValidSlug("invalid--slug") → false

// Word extraction
findAllWords("a-b-c-1-2-3") → ["a", "b", "c", "1", "2", "3"]

// Custom options
createCustomSlug("Very Long Title Here", { maxWords: 2 }) → "very-long"
```

## Testing

Run tests to verify your implementation:

```bash
cd exercises/082-slug-regex
pnpm test
```

Tests will check:
- Advanced slug generation with various inputs
- Slug validation with all edge cases
- CamelCase to slug conversion
- Word extraction accuracy
- Custom options application
- Proper regex flag usage
- Edge case handling

## Reflection Questions

After completing this exercise, consider:

1. **Regex complexity** - When is regex appropriate vs. other methods?
2. **Performance** - Do complex regexes slow down code? How would you measure?
3. **Unicode handling** - How would you support accented characters?
4. **Real-world URLs** - What other transformations do production systems apply?
5. **Reversibility** - Can you convert a slug back to original text?

## Next Steps

Congratulations on completing Series 16! You've mastered:
- Basic string operations and case conversion
- Character removal and normalization
- Array operations with strings
- String extraction and truncation
- Advanced pattern matching with regex

These skills form the foundation for text processing, data validation, URL generation, and more!

## Practical Project Ideas

- Build a blog URL generator
- Create a file naming system
- Implement a search query normalizer
- Build a social media hashtag generator
- Create a URL shortener

## Read More

- [Advanced Regex - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Regex Quantifiers - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers)
- [Regex Assertions - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
- [String match() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
- [Regex101.com](https://regex101.com/) - Interactive regex debugger
- [Regex Cheat Sheet](https://www.regular-expressions.info/quickstart.html)
