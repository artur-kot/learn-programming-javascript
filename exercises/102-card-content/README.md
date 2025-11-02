# Exercise 104: Card Generator - Set Content

Add title and description to cards using innerHTML and textContent. Populate created elements with data.

## Concepts

- **Setting textContent** - Safe text assignment
- **Setting innerHTML** - HTML content assignment
- **Populating Elements** - Adding data to DOM
- **Content Creation** - Dynamic text and HTML
- **Nested HTML** - Complex content structures
- **Creating Cards from Data** - Building from objects

## What You're Learning

Combining element creation with content population. In this exercise, you'll:
- Set text content on elements
- Set HTML content for rich formatting
- Populate cards from data objects
- Build reusable card creation functions
- Understand safe vs unsafe content assignment

**Content Population Pattern:**
```javascript
// Set text
element.textContent = 'Plain text';

// Set HTML
element.innerHTML = '<p>Formatted content</p>';

// Create and populate
const card = document.createElement('div');
card.textContent = 'Content here';
```

## Challenge

Implement functions that add content to elements. Create cards from data objects.

## Functions to Implement

### `setCardTitle(headerElement, title)`
Set title text on a card header element.

**Parameters:**
- `headerElement` - Header div element
- `title` - Title text to set

**Implementation:**
```javascript
headerElement.textContent = title;
```

### `setCardDescription(contentElement, description)`
Set description text on a card content element.

**Parameters:**
- `contentElement` - Content div element
- `description` - Description text to set

**Implementation:**
```javascript
contentElement.textContent = description;
```

### `createCardWithContent(title, description)`
Create a complete card with title and description.

**Parameters:**
- `title` - Card title text
- `description` - Card description text

**Returns:**
- Object with card structure:
  ```javascript
  {
    card: <div with class="card">,
    header: <div with class="card-header">,
    content: <div with class="card-content">
  }
  ```

**Implementation Pattern:**
1. Create card div with class "card"
2. Create header div with class "card-header" and title text
3. Create content div with class "card-content" and description text
4. Return object with all elements

### `setCardHTML(element, html)`
Set HTML content on card (for rich formatting).

**Parameters:**
- `element` - Element to set HTML on
- `html` - HTML string to set

**Implementation:**
```javascript
element.innerHTML = html;
```

**Example:**
```javascript
setCardHTML(element, '<strong>Bold</strong> and <em>italic</em>');
```

### `buildCardFromData(data)`
Create and populate card from data object.

**Parameters:**
- `data` - Object with properties:
  ```javascript
  {
    title: 'Card Title',
    description: 'Card Description'
  }
  ```

**Returns:**
- Complete card object with populated content

**Implementation:**
```javascript
const card = createCardWithContent(data.title, data.description);
return card;
```

## textContent vs innerHTML

**textContent:**
- ✅ Sets plain text only
- ✅ Fast and safe
- ✅ No HTML parsing
- ✅ Best for user data

**innerHTML:**
- ✅ Sets HTML content
- ✅ Allows formatting
- ⚠️ Security risk if untrusted
- ✅ Better for known content

```javascript
// Safe - always
element.textContent = anyData;

// Safe - only with known content
element.innerHTML = '<strong>Bold</strong>';

// Dangerous - never do this
element.innerHTML = userInput; // XSS vulnerability!
```

## Working with Data Objects

**Card data structure:**
```javascript
const cardData = {
  title: 'JavaScript',
  description: 'Learn programming'
};
```

**Building from data:**
```javascript
function buildCard(data) {
  const card = document.createElement('div');
  const header = document.createElement('div');
  const content = document.createElement('div');
  
  header.textContent = data.title;
  content.textContent = data.description;
  
  return { card, header, content };
}
```

## Common Patterns

**Reusable card builder:**
```javascript
function createCardWithContent(title, description) {
  const card = document.createElement('div');
  card.className = 'card';
  
  const header = document.createElement('div');
  header.className = 'card-header';
  header.textContent = title;
  
  const content = document.createElement('div');
  content.className = 'card-content';
  content.textContent = description;
  
  return { card, header, content };
}
```

**From data array:**
```javascript
const cards = cardDataArray.map(data => 
  buildCardFromData(data)
);
```

## Tips

- Use `textContent` for simple text content
- Use `innerHTML` only with trusted content
- Return objects to access individual parts
- Create factories for reusable components
- Set content after creating element
- Combine with loops to create multiple cards

## Security Note

Never use `innerHTML` with user-provided data:
```javascript
// ❌ DANGEROUS
element.innerHTML = userComment;

// ✅ SAFE
element.textContent = userComment;
```

## Next Steps

Once complete, move to [exercise 105](../105-card-attributes) where you'll add classes, IDs, and data attributes.
