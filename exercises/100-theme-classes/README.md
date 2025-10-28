# Exercise 100: Theme Switcher - Toggle Classes

Toggle CSS classes to change element styling. Master the classList API for dynamic theme switching.

## Concepts

- **classList API** - Modern class manipulation
- **add() Method** - Add class to element
- **remove() Method** - Remove class from element
- **toggle() Method** - Add if missing, remove if present
- **contains() Method** - Check if element has class
- **CSS Classes for Styling** - Separation of concerns
- **Theme Switching** - Complete theme changes with classes

## What You're Learning

Classes are the modern way to apply styles dynamically. In this exercise, you'll:
- Add and remove classes with `classList`
- Toggle classes on and off
- Check if an element has a class
- Implement theme switching with classes
- Understand separation of styling from logic

**classList API Pattern:**
```javascript
// Add class
element.classList.add('dark');

// Remove class
element.classList.remove('dark');

// Toggle class
element.classList.toggle('dark');

// Check class
if (element.classList.contains('dark')) { }
```

## Challenge

Implement class management functions and use them to create a working theme switcher that changes between light and dark modes using CSS classes.

## Functions to Implement

### `addClass(elementId, className)`
Add a class to an element.

**Parameters:**
- `elementId` - ID of element to modify
- `className` - Name of class to add

**Implementation:**
```javascript
const element = document.getElementById(elementId);
element.classList.add(className);
```

**Example:**
```javascript
addClass('theme-container', 'dark');
```

### `removeClass(elementId, className)`
Remove a class from an element.

**Parameters:**
- `elementId` - ID of element to modify
- `className` - Name of class to remove

**Implementation:**
```javascript
const element = document.getElementById(elementId);
element.classList.remove(className);
```

### `toggleClass(elementId, className)`
Toggle a class on/off.

**Parameters:**
- `elementId` - ID of element to modify
- `className` - Name of class to toggle

**Behavior:**
- If class exists: remove it
- If class doesn't exist: add it

**Implementation:**
```javascript
const element = document.getElementById(elementId);
element.classList.toggle(className);
```

### `hasClass(elementId, className)`
Check if element has a class.

**Parameters:**
- `elementId` - ID of element to check
- `className` - Name of class to check

**Returns:**
- Boolean: true if class exists, false otherwise

**Implementation:**
```javascript
const element = document.getElementById(elementId);
return element.classList.contains(className);
```

### `switchTheme(elementId)`
Toggle between light and dark theme.

**Parameters:**
- `elementId` - ID of element to switch theme

**Behavior:**
- Toggle "dark" class on element
- Or implement with "light" and "dark" classes

**Implementation Example:**
```javascript
toggleClass(elementId, 'dark');
```

## classList API Methods

**All classList methods:**
```javascript
element.classList.add('class1', 'class2');      // Add one or more
element.classList.remove('class1', 'class2');   // Remove one or more
element.classList.toggle('class1');             // Toggle on/off
element.classList.contains('class1');           // Check existence
element.classList.replace('old', 'new');        // Replace class
element.classList.item(0);                      // Get class by index
element.classList.length;                       // Number of classes
```

## Theme Switching Pattern

**CSS:**
```css
/* Light theme (default) */
body {
  background-color: white;
  color: black;
}

/* Dark theme */
body.dark {
  background-color: #1a1a1a;
  color: white;
}
```

**JavaScript:**
```javascript
const button = document.getElementById('theme-toggle');

button.addEventListener('click', () => {
  toggleClass('body', 'dark');
});
```

## Common Patterns

**Multiple classes:**
```javascript
classList.add('dark', 'theme-v2', 'active');
classList.remove('light', 'theme-v1');
```

**Batch operations:**
```javascript
if (classList.contains('dark')) {
  classList.remove('dark');
  classList.add('light');
}
```

**Safe toggle:**
```javascript
const isDark = classList.contains('dark');
classList.toggle('dark');
// Now isDark is opposite of what it was
```

## Tips

- Use `classList.toggle()` for on/off switching
- Classes are better than inline styles for complex changes
- One class can apply multiple CSS properties
- Classes are easier to maintain than style changes
- Use `classList.contains()` to check state before toggling
- `classList` works on any HTML element

## Next Steps

Once complete, move to [exercise 101](../101-theme-styles) where you'll change inline CSS styles directly.
