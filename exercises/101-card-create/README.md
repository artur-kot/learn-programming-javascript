# Exercise 103: Card Generator - Create Element

Create DOM elements dynamically with createElement. Learn to build DOM structures from JavaScript code.

## Concepts

- **document.createElement()** - Create new elements
- **Creating Elements Dynamically** - Build DOM from code
- **Element Constructors** - Different element types
- **Document Fragments** - Efficient bulk creation
- **Element Types and Tags** - Different HTML elements
- **Returning Elements** - Functions that build DOM

## What You're Learning

Dynamic element creation is the foundation of interactive applications. In this exercise, you'll:
- Use `document.createElement()` to create elements
- Create different element types (div, button, etc.)
- Build element structures as functions
- Return created elements from functions
- Understand element creation patterns

**createElement Pattern:**
```javascript
// Create element
const div = document.createElement('div');
const button = document.createElement('button');

// Add properties
div.className = 'card';
button.textContent = 'Click me';

// Return element
return div;
```

## Challenge

Implement functions that create DOM elements and structures. Build reusable element factories.

## Functions to Implement

### `createCard()`
Create a new div element for a card.

**Returns:**
- A div element with no classes or attributes

**Implementation:**
```javascript
const card = document.createElement('div');
return card;
```

### `createCardWithClass(className)`
Create a div element with a class name.

**Parameters:**
- `className` - CSS class to add to the div

**Returns:**
- Div element with the specified class

**Implementation:**
```javascript
const card = document.createElement('div');
card.className = className;
return card;
```

### `createCardElements()`
Create card structure with header, content, footer divs.

**Returns:**
- Object with three properties:
  ```javascript
  {
    header: <div element>,
    content: <div element>,
    footer: <div element>
  }
  ```

**Example:**
```javascript
const elements = createCardElements();
elements.header.textContent = 'Title';
elements.content.textContent = 'Content here';
```

### `createButton(text)`
Create a button element with text.

**Parameters:**
- `text` - Text to display on button

**Returns:**
- Button element with text content

**Implementation:**
```javascript
const button = document.createElement('button');
button.textContent = text;
return button;
```

### `createCompleteCard(title, content, buttonText)`
Create a complete card structure with all elements.

**Parameters:**
- `title` - Title text for card header
- `content` - Content text for card body
- `buttonText` - Text for the button

**Returns:**
- Object with complete card structure:
  ```javascript
  {
    card: <div className="card">,
    header: <div className="card-header">,
    content: <div className="card-content">,
    footer: <div className="card-footer">,
    button: <button>
  }
  ```

**Card Structure:**
```
card (div.card)
├── header (div.card-header) - contains title text
├── content (div.card-content) - contains content text
└── footer (div.card-footer) - contains button
    └── button
```

## document.createElement() Reference

**Basic usage:**
```javascript
// Create different element types
const div = document.createElement('div');
const button = document.createElement('button');
const span = document.createElement('span');
const section = document.createElement('section');
```

**Setting properties:**
```javascript
const element = document.createElement('div');
element.className = 'card';           // Set class
element.id = 'my-card';               // Set ID
element.textContent = 'Hello';        // Set text
element.innerHTML = '<p>Hello</p>';    // Set HTML
```

## Building Structures

**Return objects for related elements:**
```javascript
function createCardElements() {
  return {
    header: document.createElement('div'),
    content: document.createElement('div'),
    footer: document.createElement('div')
  };
}
```

**Complete structures:**
```javascript
function createCompleteCard(title) {
  const card = document.createElement('div');
  card.className = 'card';
  
  const header = document.createElement('div');
  header.className = 'card-header';
  header.textContent = title;
  
  card.appendChild(header);
  
  return {
    card: card,
    header: header
  };
}
```

## Benefits of Dynamic Creation

- ✅ Create elements without HTML markup
- ✅ Generate multiple similar elements
- ✅ Reusable element factories
- ✅ Programmatic control
- ✅ Combine with loops and conditions

## Common Patterns

**Element factory:**
```javascript
function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}
```

**Structured creation:**
```javascript
function createCard() {
  const card = document.createElement('div');
  card.className = 'card';
  
  const header = document.createElement('div');
  header.className = 'card-header';
  card.appendChild(header);
  
  return card;
}
```

## Tips

- `createElement` creates but doesn't add to page
- Must use `appendChild` or `insertBefore` to add to DOM
- Return elements from functions for reusability
- Use objects to return multiple related elements
- Set properties before adding to DOM for efficiency

## Next Steps

Once complete, move to [exercise 104](../104-card-content) where you'll add content to created elements.
