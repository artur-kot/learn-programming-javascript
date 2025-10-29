# Exercise 116: Live Search Filter - Highlight Results

Highlight matching search terms in results using HTML and regex.

## Concepts

- **Text Highlighting** - Visual emphasis on matching text
- **Regular Expressions** - Pattern matching with regex
- **String Replace** - Replace text with HTML
- **innerHTML** - Insert HTML into elements
- **HTML Escaping** - Prevent XSS attacks
- **Case-insensitive Matching** - Ignore case in search
- **DOM Text Manipulation** - Modify text content safely

## What You're Learning

Highlighting search terms helps users quickly see why results matched. In this exercise, you'll:
- Use regex for case-insensitive matching
- Wrap matching text in `<mark>` tags
- Escape HTML to prevent security issues
- Insert highlighted HTML safely
- Create visual feedback for searches
- Handle edge cases (empty search, special chars)

**Highlight Pattern:**
```javascript
function highlightText(text, searchTerm) {
  if (!searchTerm) return escapeHTML(text);
  
  const escaped = escapeHTML(text);
  const regex = new RegExp(`(${escapeRegex(searchTerm)})`, 'gi');
  
  return escaped.replace(regex, '<mark>$1</mark>');
}
```

## Challenge

Implement text highlighting that safely wraps matching terms in HTML tags while preventing XSS vulnerabilities.

## Functions to Implement

### `escapeHTML(text)`
Escape HTML special characters for safe insertion.

**Parameters:**
- `text` - Text to escape

**Returns:**
- HTML-safe text

**Implementation:**
```javascript
const htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

return text.replace(/[&<>"']/g, char => htmlEscapes[char]);
```

### `highlightText(text, searchTerm)`
Highlight search term in text with HTML.

**Parameters:**
- `text` - Text to highlight in
- `searchTerm` - Term to highlight

**Returns:**
- Text with `<mark>` tags around matches

**Implementation:**
```javascript
if (!searchTerm) return escapeHTML(text);

const escaped = escapeHTML(text);
const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const regex = new RegExp(`(${escapedTerm})`, 'gi');

return escaped.replace(regex, '<mark>$1</mark>');
```

### `getHighlightStyles()`
Get CSS styles for highlight.

**Returns:**
- Object with CSS properties

**Implementation:**
```javascript
return {
  backgroundColor: '#ffeb3b',
  color: '#000',
  padding: '2px 4px',
  borderRadius: '3px',
  fontWeight: '600'
};
```

### `createHighlightedElement(text, searchTerm, className)`
Create DOM element with highlighted text.

**Parameters:**
- `text` - Text to display
- `searchTerm` - Term to highlight
- `className` - CSS class for element

**Returns:**
- DOM element

**Implementation:**
```javascript
const div = document.createElement('div');
div.className = className;
div.innerHTML = highlightText(text, searchTerm);
return div;
```

### `displayHighlightedResults(resultsContainer, items, searchTerm)`
Display results with highlighted search terms.

**Parameters:**
- `resultsContainer` - Container element
- `items` - Items to display
- `searchTerm` - Term to highlight

**Implementation:**
```javascript
resultsContainer.innerHTML = '';

if (items.length === 0) {
  resultsContainer.innerHTML = '<div class="no-results">No results found</div>';
  return;
}

items.forEach(item => {
  const element = createHighlightedElement(item, searchTerm, 'result-item');
  resultsContainer.appendChild(element);
});
```

## Regular Expressions for Highlighting

**Basic pattern:**
```javascript
const searchTerm = 'java';
const regex = new RegExp(searchTerm, 'gi');
// g = global (all matches)
// i = case-insensitive

'JavaScript and Java'.replace(regex, '<mark>$&</mark>');
// '<mark>Java</mark>Script and <mark>Java</mark>'
```

**With capture group:**
```javascript
const regex = new RegExp(`(${searchTerm})`, 'gi');
text.replace(regex, '<mark>$1</mark>');
// $1 refers to captured group
```

**Escape special regex characters:**
```javascript
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const searchTerm = 'c++'; // Contains special chars
const escaped = escapeRegex(searchTerm); // 'c\\+\\+'
const regex = new RegExp(escaped, 'gi');
```

## HTML Escaping (Security)

**Why escape?**
```javascript
// DANGEROUS - XSS vulnerability
const userInput = '<script>alert("XSS")</script>';
element.innerHTML = userInput; // Script executes!

// SAFE - Escaped
const escaped = escapeHTML(userInput);
element.innerHTML = escaped; // Shows as text
```

**Escape function:**
```javascript
function escapeHTML(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Or with replace:
function escapeHTML(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
```

**Highlight with escaping:**
```javascript
function highlightText(text, searchTerm) {
  // Escape FIRST
  const escaped = escapeHTML(text);
  
  // Then highlight
  const regex = new RegExp(`(${escapeRegex(searchTerm)})`, 'gi');
  return escaped.replace(regex, '<mark>$1</mark>');
}
```

## The `<mark>` Element

**HTML5 mark element:**
```html
<p>Search for <mark>JavaScript</mark> in text</p>
```

**Default browser styles:**
```css
mark {
  background-color: yellow;
  color: black;
}
```

**Custom styles:**
```css
mark {
  background: linear-gradient(120deg, #ffd700 0%, #ffed4e 100%);
  color: #000;
  padding: 2px 4px;
  border-radius: 3px;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(255, 215, 0, 0.3);
}
```

## innerHTML vs textContent

**textContent (safe):**
```javascript
element.textContent = '<script>alert("XSS")</script>';
// Shows as text, doesn't execute
```

**innerHTML (dangerous if not escaped):**
```javascript
element.innerHTML = '<script>alert("XSS")</script>';
// Script executes!

// Safe with escaping:
element.innerHTML = escapeHTML(userInput);
```

**When to use each:**
```javascript
// Plain text - use textContent
element.textContent = 'Hello';

// HTML content - escape first, then use innerHTML
element.innerHTML = highlightText(escapeHTML(text), searchTerm);
```

## Common Patterns

**Basic highlighting:**
```javascript
function highlightText(text, searchTerm) {
  if (!searchTerm) return text;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}
```

**With HTML escaping:**
```javascript
function highlightText(text, searchTerm) {
  const escaped = escapeHTML(text);
  if (!searchTerm) return escaped;
  
  const escapedTerm = escapeRegex(searchTerm);
  const regex = new RegExp(`(${escapedTerm})`, 'gi');
  return escaped.replace(regex, '<mark>$1</mark>');
}
```

**Multiple terms:**
```javascript
function highlightMultiple(text, terms) {
  let result = escapeHTML(text);
  
  terms.forEach(term => {
    const escaped = escapeRegex(term);
    const regex = new RegExp(`(${escaped})`, 'gi');
    result = result.replace(regex, '<mark>$1</mark>');
  });
  
  return result;
}
```

**With custom tag:**
```javascript
function highlightText(text, searchTerm, tag = 'mark') {
  const escaped = escapeHTML(text);
  const regex = new RegExp(`(${escapeRegex(searchTerm)})`, 'gi');
  return escaped.replace(regex, `<${tag}>$1</${tag}>`);
}
```

## Tips

- Always escape HTML before highlighting
- Use `<mark>` element for semantic highlighting
- Escape regex special characters in search term
- Use 'gi' flags for case-insensitive global match
- innerHTML is safe only with escaped content
- Test with special characters (& < > " ')
- Consider using textContent when no HTML needed
- Highlight all occurrences, not just first match
- Use capture groups to preserve original case

## Common Mistakes

**Not escaping HTML:**
```javascript
// BAD - XSS vulnerability
function highlightText(text, searchTerm) {
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

// Input: '<script>alert("XSS")</script>'
// Output: '<mark><script>alert("XSS")</script></mark>'
// Script executes!

// GOOD - Escape first
function highlightText(text, searchTerm) {
  const escaped = escapeHTML(text);
  const regex = new RegExp(`(${escapeRegex(searchTerm)})`, 'gi');
  return escaped.replace(regex, '<mark>$1</mark>');
}
```

**Not escaping regex characters:**
```javascript
// BAD - Breaks with special chars
const searchTerm = 'c++';
const regex = new RegExp(searchTerm, 'gi'); // Error!

// GOOD - Escape regex chars
const escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const regex = new RegExp(escaped, 'gi');
```

## Next Steps

Once complete, move to [exercise 117](../117-search-delegation) where you'll implement event delegation for dynamic result items.
