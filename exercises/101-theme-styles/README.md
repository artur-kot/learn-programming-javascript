# Exercise 101: Theme Switcher - Inline Styles

Change CSS properties directly using the .style API. Learn when to use inline styles versus CSS classes.

## Concepts

- **element.style Property** - Direct access to inline styles
- **camelCase CSS Properties** - JavaScript naming convention
- **Setting Inline Styles** - Modifying properties dynamically
- **Reading Inline Styles** - Getting current style values
- **Color Properties** - backgroundColor and color
- **Inline Styles vs Classes** - When to use each approach
- **Performance Considerations** - When inline styles make sense

## What You're Learning

While classes are usually preferred, sometimes you need to set styles directly. In this exercise, you'll:
- Use `element.style` to modify CSS properties
- Understand camelCase property names
- Set and read color values
- Apply multiple styles at once
- Know when to use inline styles vs classes

**Inline Style Pattern:**
```javascript
// Set property
element.style.backgroundColor = '#1a1a1a';
element.style.color = '#ffffff';

// Read property
const bgColor = element.style.backgroundColor;

// Multiple properties
element.style.cssText = 'background-color: #1a1a1a; color: #ffffff;';
```

## Challenge

Implement functions that modify CSS properties directly. Create a theme switcher that changes colors using inline styles.

## Functions to Implement

### `setBackgroundColor(elementId, color)`
Change element background color.

**Parameters:**
- `elementId` - ID of element to modify
- `color` - Color value (name, hex, rgb)

**Implementation:**
```javascript
const element = document.getElementById(elementId);
element.style.backgroundColor = color;
```

**Example:**
```javascript
setBackgroundColor('container', '#1a1a1a');
setBackgroundColor('container', 'rgb(26, 26, 26)');
```

### `setTextColor(elementId, color)`
Change element text color.

**Parameters:**
- `elementId` - ID of element to modify
- `color` - Color value

**Implementation:**
```javascript
const element = document.getElementById(elementId);
element.style.color = color;
```

### `getBackgroundColor(elementId)`
Read current background color.

**Parameters:**
- `elementId` - ID of element to read

**Returns:**
- String of current background color, or empty string if not set

**Implementation:**
```javascript
const element = document.getElementById(elementId);
return element.style.backgroundColor;
```

### `applyThemeStyles(elementId, theme)`
Apply complete theme using style property.

**Parameters:**
- `elementId` - ID of element to style
- `theme` - Object with CSS properties:
  ```javascript
  {
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    fontSize: '16px'
  }
  ```

**Implementation:**
```javascript
const element = document.getElementById(elementId);
Object.assign(element.style, theme);
// Or loop through theme properties
for (const prop in theme) {
  element.style[prop] = theme[prop];
}
```

### `toggleInlineTheme(elementId)`
Toggle between two complete style sets.

**Parameters:**
- `elementId` - ID of element to toggle

**Behavior:**
- First call: apply dark theme
- Second call: apply light theme
- Third call: apply dark theme
- And so on...

**Implementation Idea:**
- Store current theme state
- Alternate between two theme objects
- Apply using `applyThemeStyles()`

## CSS Property Names in JavaScript

**CSS to JavaScript conversion:**
```javascript
// CSS property name -> JavaScript property name
'background-color' -> element.style.backgroundColor
'font-size' -> element.style.fontSize
'text-align' -> element.style.textAlign
'padding-top' -> element.style.paddingTop
'border-bottom' -> element.style.borderBottom
```

**Pattern:** Remove hyphens and camelCase the next letter

## Common CSS Values

**Colors:**
```javascript
element.style.color = 'red';                    // Named color
element.style.color = '#ffffff';                // Hex
element.style.color = 'rgb(255, 255, 255)';     // RGB
element.style.color = 'rgba(255, 255, 255, 0.5)'; // RGBA
```

**Sizes:**
```javascript
element.style.fontSize = '16px';
element.style.padding = '10px';
element.style.width = '100%';
```

**Other:**
```javascript
element.style.display = 'none';
element.style.cursor = 'pointer';
element.style.textAlign = 'center';
```

## Inline Styles vs Classes

**Use Classes When:**
- ✅ Multiple related properties
- ✅ Reusable styling
- ✅ Theme switching
- ✅ Media queries needed
- ✅ Performance important

**Use Inline Styles When:**
- ✅ Calculated/dynamic values
- ✅ Quick temporary changes
- ✅ User-provided values
- ✅ Simple one-off changes
- ⚠️ Generally rare in modern development

```javascript
// Good: Use class
element.classList.add('dark-theme');

// Okay: Use inline for dynamic value
element.style.width = userWidth + 'px';

// Bad: Too many inline styles
element.style.backgroundColor = '...';
element.style.color = '...';
// Better to use a class
```

## Tips

- Always use camelCase for style properties
- Remember to include units (px, %, em, etc.)
- Empty string removes inline style
- Use classes for maintainability
- Inline styles override classes
- Check browser DevTools to verify applied styles

## Accessing Style Values

```javascript
// Direct style property (inline styles only)
element.style.backgroundColor; // May be empty

// Computed styles (all styles including CSS)
window.getComputedStyle(element).backgroundColor; // Better for reading
```

## Next Steps

Once complete, move to [exercise 102](../102-theme-storage) where you'll save theme preferences to localStorage.
