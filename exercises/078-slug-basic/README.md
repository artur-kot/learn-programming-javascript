# Exercise 078: URL Slug Generator - Basic Conversion

Learn to convert titles into URL-friendly slugs. Slugs are lowercase, hyphen-separated versions of text used in web URLs. For example, "Learn JavaScript Basics" becomes "learn-javascript-basics". This exercise teaches the fundamental string transformations needed for web development.

## Concepts

- **String Methods** - Using built-in methods like `toLowerCase()` and `replace()`
- **URL Slugs** - What they are and why they're useful
- **String Transformation** - Converting text into different formats
- **Case Conversion** - Changing text case programmatically
- **Character Replacement** - Swapping one character for another

## What You're Learning

**URL slugs** are human-readable identifiers used in web addresses. Instead of using database IDs in URLs, slugs make URLs readable and SEO-friendly:
- ❌ `example.com/article?id=42`
- ✅ `example.com/article/learn-javascript-basics`

In this exercise, you'll master the basic transformation: converting any title to lowercase and replacing spaces with hyphens.

## Challenge

Implement functions that convert article titles into URL slugs. You'll start with the basics: making text lowercase and replacing spaces with hyphens. Future exercises will handle edge cases like special characters and multiple spaces.

## Functions to Implement

### `basicSlug(title)`
Convert a title to a basic slug by making it lowercase and replacing spaces with hyphens.

**Parameters:**
- `title` - A string representing an article title

**Returns:**
- A string with the title converted to slug format (lowercase, spaces as hyphens)

**Example:**
```javascript
basicSlug("Learn JavaScript Basics");
// Returns: "learn-javascript-basics"

basicSlug("Web Development Tips");
// Returns: "web-development-tips"

basicSlug("hello");
// Returns: "hello"
```

### `createBlogPostUrl(title)`
Create a complete blog post URL using the basic slug.

**Parameters:**
- `title` - Article title

**Returns:**
- Full URL string in format: `"https://myblog.com/posts/SLUG"`

**Example:**
```javascript
createBlogPostUrl("Learn JavaScript Basics");
// Returns: "https://myblog.com/posts/learn-javascript-basics"
```

### `convertToSlug(text)`
Convert any text to slug format. Identical to `basicSlug` but with a different name (for learning multiple naming patterns).

**Parameters:**
- `text` - Any string to convert

**Returns:**
- The slug format of the text

**Example:**
```javascript
convertToSlug("Getting Started with Node JS");
// Returns: "getting-started-with-node-js"
```

## Requirements

- Use `toLowerCase()` to convert the title to lowercase
- Use `replace()` with appropriate arguments to replace spaces with hyphens
- Handle single-word titles correctly (they should stay unchanged except for case)
- Your functions should work with titles of any length
- Do not modify the input string; return a new one

## Hints

<details>
<summary>Hint 1: String Methods</summary>
Every string in JavaScript has methods you can call on it. The `toLowerCase()` method returns a new string with all characters in lowercase. You can chain methods together like: `"HELLO".toLowerCase().replace(...)`
</details>

<details>
<summary>Hint 2: The Replace Method</summary>
The `replace()` method takes two arguments: what you want to find, and what to replace it with. Example: `"hello world".replace(" ", "-")` would give "hello-world". But what if there are multiple spaces?
</details>

<details>
<summary>Hint 3: Replacing All Spaces</summary>
The basic `replace()` only replaces the first occurrence. To replace all spaces, you can use a regular expression or use `replaceAll()`. Try looking up `replaceAll()` in JavaScript documentation.
</details>

## Expected Behavior

```javascript
// Simple titles
basicSlug("Hello World") → "hello-world"
basicSlug("JavaScript") → "javascript"

// Titles with multiple words
basicSlug("Learn JavaScript in 30 Days") → "learn-javascript-in-30-days"
basicSlug("Web Development for Beginners") → "web-development-for-beginners"

// Mixed case
basicSlug("LaRgE AnD sMaLl") → "large-and-small"
```

## Testing

Run tests to verify your implementation:

```bash
cd exercises/078-slug-basic
pnpm test
```

Tests will check:
- Single-word titles convert correctly
- Multi-word titles have hyphens between words
- All letters are lowercase
- Original string is not modified
- URLs are formatted correctly

## Reflection Questions

After completing this exercise, consider:

1. **Why are slugs useful?** Think about URLs you've seen on blogs or news sites.
2. **What happens with multiple spaces?** How should your function handle "Hello  World" (two spaces)?
3. **What about punctuation?** What should happen with "Hello, World!"? (We'll handle this in the next exercise)
4. **Real-world usage** - When would you need to generate slugs programmatically?

## Next Steps

In the next exercise, you'll extend this to handle special characters and punctuation, making your slug generator more robust!

## Read More

- [String toLowerCase() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase)
- [String replace() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
- [String replaceAll() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll)
- [URL Slugs - Wikipedia](https://en.wikipedia.org/wiki/Clean_URL#Slug)
