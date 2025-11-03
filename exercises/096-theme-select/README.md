# Exercise 098: Theme Switcher - Select Elements

Welcome to browser development! Learn to select and access DOM elements using query selectors. This is the beginning of the DOM manipulation journey.

## Concepts

- **document Object** - Global browser object for DOM access
- **querySelector** - Select single element by CSS selector
- **querySelectorAll** - Select multiple elements
- **getElementById** - Select by ID attribute
- **getElementByClass** - Alternative selection methods
- **DOM Element Properties** - Accessing element attributes
- **Null Safety** - Checking if elements exist

## What You're Learning

The DOM (Document Object Model) is how JavaScript interacts with HTML. In this exercise, you'll:
- Use `document.querySelector()` to select elements
- Access elements by ID, class, and CSS selectors
- Use `querySelectorAll()` for multiple selections
- Understand element properties and attributes
- Handle cases when elements don't exist

**QuerySelector Pattern:**
```javascript
// Select single element
const button = document.querySelector('#theme-toggle');
const button = document.querySelector('.theme-btn');
const button = document.querySelector('button');

// Select multiple elements
const allButtons = document.querySelectorAll('.theme-btn');

// Alternative methods (older)
const byId = document.getElementById('theme-toggle');
const byClass = document.getElementsByClassName('theme-btn');
```

## Challenge

Implement functions that select and validate DOM elements. Return the selected elements or validation information.

## Functions to Implement

### `selectThemeButton()`
Use querySelector to find the theme toggle button.

**Returns:**
- The button element with ID "theme-toggle"
- Use: `document.querySelector('#theme-toggle')`

**CSS Selector Syntax:**
- `#id` - Select by ID
- `.class` - Select by class
- `tag` - Select by tag name
- `tag.class` - Combine selectors

### `selectBody()`
Use querySelector to find the body element.

**Returns:**
- The body element
- Use: `document.querySelector('body')` or `document.body`

### `selectAllThemeButtons()`
Use querySelectorAll to find all elements with class "theme-btn".

**Returns:**
- NodeList of all buttons with class "theme-btn"
- Use: `document.querySelectorAll('.theme-btn')`

### `selectByIdAndClass()`
Find element with both ID and class.

**Returns:**
- Element with ID "theme-container" that has class "container"
- Use combined selectors: `#theme-container.container`

### `validateElements()`
Check if elements exist and return validation object.

**Returns:**
- Object with validation properties:
  ```javascript
  {
    hasThemeButton: boolean,
    hasBody: boolean,
    hasThemeButtons: boolean,
    buttonCount: number,
    allValid: boolean
  }
  ```

**Example:**
```javascript
const validation = validateElements();
console.log(validation);
// {
//   hasThemeButton: true,
//   hasBody: true,
//   hasThemeButtons: true,
//   buttonCount: 3,
//   allValid: true
// }
```

## DOM Selection Methods

**Modern Approach (querySelector):**
```javascript
// One element
const element = document.querySelector('selector');

// Multiple elements (NodeList)
const elements = document.querySelectorAll('selector');
```

**Older Approach (still works):**
```javascript
const byId = document.getElementById('id');
const byClass = document.getElementsByClassName('class');
const byTag = document.getElementsByTagName('tag');
```

**Why querySelector is preferred:**
- Works with any CSS selector
- Consistent API
- More powerful selector syntax
- NodeList is easier to work with

## CSS Selector Examples

```javascript
// By ID
document.querySelector('#my-id');

// By class
document.querySelector('.my-class');

// By tag
document.querySelector('button');

// Combined
document.querySelector('#container.active');

// Descendant
document.querySelector('.container button');

// Attribute
document.querySelector('[data-theme="dark"]');

// Multiple elements
document.querySelectorAll('.item');
```

## Tips

- `querySelector` returns `null` if no element found
- `querySelectorAll` returns empty NodeList if nothing found
- Always check if element exists before using it
- You can use `document.querySelector` on any element
- NodeList can be looped with forEach, but not other Array methods
- `document.body` is shortcut for selecting body

## Testing HTML

The `index.html` file provides test HTML you can open in a browser to verify your selections work correctly.

## Next Steps

Once complete, move to [exercise 099](../099-theme-text) where you'll modify element content using textContent.
