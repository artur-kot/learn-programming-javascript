# Exercise 099: Theme Switcher - Change Text

Modify element content with textContent and innerHTML. Learn to update what users see on the page.

## Concepts

- **textContent Property** - Get/set plain text
- **innerHTML Property** - Get/set HTML content
- **innerText vs textContent** - Differences and use cases
- **Setting Element Content** - Different approaches
- **Text Nodes** - How browsers store text
- **Security Considerations** - When to use which method

## What You're Learning

Content modification is the first step of DOM manipulation. In this exercise, you'll:
- Use `textContent` to read and set plain text
- Use `innerHTML` to set HTML content
- Update element content dynamically
- Handle multiple elements efficiently
- Understand when to use each approach

**Text Content Pattern:**
```javascript
// Read text
const text = element.textContent;

// Set text
element.textContent = 'New text';

// Set HTML
element.innerHTML = '<strong>Bold text</strong>';
```

## Challenge

Implement functions that modify element content using both textContent and innerHTML. Update buttons, status messages, and content dynamically.

## Functions to Implement

### `updateButtonText(buttonId, newText)`
Change button text using textContent.

**Parameters:**
- `buttonId` - ID of the button to update
- `newText` - New text to display

**Implementation:**
```javascript
const button = document.getElementById(buttonId);
button.textContent = newText;
```

### `getButtonText(buttonId)`
Read button text content.

**Parameters:**
- `buttonId` - ID of the button to read

**Returns:**
- String of the button's text

### `updateWithHTML(elementId, htmlContent)`
Set HTML content (with tags).

**Parameters:**
- `elementId` - ID of element to update
- `htmlContent` - HTML string to set

**Implementation:**
```javascript
const element = document.getElementById(elementId);
element.innerHTML = htmlContent;
```

**Example:**
```javascript
updateWithHTML('status', '<strong>Dark Mode</strong>');
```

### `toggleThemeText(buttonId, text1, text2)`
Toggle button text between two values.

**Parameters:**
- `buttonId` - Button to toggle
- `text1` - First text option
- `text2` - Second text option

**Behavior:**
- First call: set to text1
- Next call: set to text2
- Next call: set to text1
- And so on...

**Implementation Tip:**
- Track current text or state
- Compare and switch

### `updateMultipleElements(updates)`
Update text for multiple elements at once.

**Parameters:**
- `updates` - Object with ID as key and new text as value
  ```javascript
  {
    'button1': 'New Text 1',
    'button2': 'New Text 2'
  }
  ```

**Example:**
```javascript
updateMultipleElements({
  'theme-toggle': 'Switch Mode',
  'light-btn': 'Light Theme',
  'dark-btn': 'Dark Theme'
});
```

## textContent vs innerHTML

**textContent:**
- ✅ Plain text only
- ✅ Safe from HTML injection
- ✅ Better performance
- ✅ Use for user-facing data
- ✅ Strips all HTML tags

**innerHTML:**
- ✅ Can set HTML content
- ✅ Allows complex layouts
- ⚠️ Security risk with user input
- ⚠️ Slower than textContent
- ✅ Use for known HTML content

```javascript
// Safe
element.textContent = userInput; // Always safe

// Dangerous if userInput is untrusted
element.innerHTML = userInput; // Can run scripts!

// Safe to use for known content
element.innerHTML = '<strong>Bold</strong>';
```

## Getting vs Setting

```javascript
// Get text
const currentText = element.textContent;
const currentHTML = element.innerHTML;

// Set text (replaces all content)
element.textContent = 'New text';

// Set HTML (replaces all content)
element.innerHTML = '<p>New paragraph</p>';

// Safe alternatives to innerHTML
element.appendChild(newElement);
element.insertAdjacentHTML('beforeend', html);
```

## Tips

- Use `textContent` by default - it's safer
- Only use `innerHTML` for known, trusted HTML
- Never use `innerHTML` with user input
- `textContent` is faster than `innerHTML`
- Setting content replaces all children
- Use `appendChild()` to preserve existing content

## Next Steps

Once complete, move to [exercise 100](../100-theme-classes) where you'll toggle CSS classes.
