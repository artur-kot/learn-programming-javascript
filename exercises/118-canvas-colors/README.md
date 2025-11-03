# Exercise 120: Interactive Drawing Canvas - Color Picker

Add color selection to the drawing canvas using event delegation.

## Concepts

- **Event Delegation** - Handle events on parent container
- **DOM Traversal** - Using closest() and dataset
- **Dynamic Color Selection** - Change drawing color on the fly
- **Attribute Reading** - Access data from elements
- **Data Attributes** - Store custom data on HTML elements
- **Event Target Identification** - Identify what was clicked
- **State Management** - Track current drawing color

## What You're Learning

Event delegation is a powerful pattern for handling events efficiently. Instead of attaching
event listeners to many individual elements, you attach ONE listener to a parent container
and let it handle events that bubble up from children.

This is especially useful for:
- Buttons that are added dynamically after page load
- Large numbers of similar elements (more efficient)
- Cleaner, more maintainable code

## Functions to Implement

### `getColorFromButton(button)`
Extract color from button element using data attribute.

**Parameters:**
- `button` - Button DOM element

**Returns:**
- Color value from data-color attribute

**Implementation:**
```javascript
return button.dataset.color;
```

### `updateDrawingColor(ctx, color)`
Update the canvas context's stroke color.

**Parameters:**
- `ctx` - Canvas 2D context
- `color` - Color string (hex, rgb, etc.)

**Implementation:**
```javascript
ctx.strokeStyle = color;
```

### `createColorButton(color, label)`
Create a color button element with data attribute.

**Parameters:**
- `color` - Hex color code (e.g., '#FF0000')
- `label` - Display name (e.g., 'Red')

**Returns:**
- Created button element

**Implementation:**
```javascript
const button = document.createElement('button');
button.dataset.color = color;
button.textContent = label;
button.className = 'color-btn';
return button;
```

### `handleColorClick(event, ctx, colorContainer)`
Handle color button clicks and update drawing color.

**Parameters:**
- `event` - Click event
- `ctx` - Canvas 2D context
- `colorContainer` - Container element

**Implementation:**
```javascript
const button = event.target.closest('button');
if (!button) return;

const color = getColorFromButton(button);
updateDrawingColor(ctx, color);
```

### `setupColorEventDelegation(colorContainer, ctx)`
Set up event delegation for color buttons.

**Parameters:**
- `colorContainer` - Container element
- `ctx` - Canvas 2D context

**Implementation:**
```javascript
colorContainer.addEventListener('click', (event) => {
  handleColorClick(event, ctx, colorContainer);
});
```

### `initColorPicker(colorContainer, colors, ctx)`
Initialize the color picker with buttons.

**Parameters:**
- `colorContainer` - Container element
- `colors` - Array of {hex, name} objects
- `ctx` - Canvas 2D context

**Implementation:**
```javascript
colorContainer.innerHTML = '';
colors.forEach(color => {
  const button = createColorButton(color.hex, color.name);
  colorContainer.appendChild(button);
});
setupColorEventDelegation(colorContainer, ctx);
```

## Event Delegation Pattern

### Basic Flow

```
User clicks button
  ↓
Browser creates MouseEvent
  ↓
Event starts at button
  ↓
Event bubbles UP to parent
  ↓
Container's click listener catches it
  ↓
Check event.target (what was clicked)
  ↓
If it's a button, get data and use it
```

### Code Structure

```javascript
// 1. Attach listener to PARENT
container.addEventListener('click', (event) => {
  
  // 2. Check if click was on a button
  const button = event.target.closest('button');
  if (!button) return;
  
  // 3. Extract data from button
  const color = button.dataset.color;
  
  // 4. Update drawing
  updateDrawingColor(ctx, color);
});
```

## Data Attributes

### Storing Data on Elements

HTML data attributes let you store custom data on any element:

```html
<button data-color="#FF0000" data-id="color-1">Red</button>
<button data-color="#00FF00" data-id="color-2">Green</button>
```

### Accessing Data Attributes

In JavaScript, access via the `dataset` property:

```javascript
const button = document.querySelector('button');
const color = button.dataset.color;  // "#FF0000"
const id = button.dataset.id;        // "color-1"
```

### Naming Convention

Hyphens in HTML become camelCase in JavaScript:

```
HTML:                JavaScript:
data-color          element.dataset.color
data-user-id        element.dataset.userId
data-background-url element.dataset.backgroundUrl
```

## Event Delegation Benefits

### Problem Without Delegation

```javascript
// If you have 100 buttons...
buttons.forEach(btn => {
  btn.addEventListener('click', handleClick); // 100 listeners!
});

// And you add a new button dynamically
const newBtn = document.createElement('button');
container.appendChild(newBtn);
newBtn.addEventListener('click', handleClick); // Must manually add listener!
```

### Solution With Delegation

```javascript
// ONE listener on container
container.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (button) handleClick(button);
});

// Add new button - automatically works!
const newBtn = document.createElement('button');
container.appendChild(newBtn); // Already has delegation!
```

## Common Color Picker Pattern

### Complete Example

```javascript
// 1. Define colors
const colors = [
  { hex: '#000000', name: 'Black' },
  { hex: '#FF0000', name: 'Red' },
  { hex: '#00FF00', name: 'Green' },
  { hex: '#0000FF', name: 'Blue' }
];

// 2. Create buttons
const container = document.getElementById('colors');
colors.forEach(color => {
  const btn = document.createElement('button');
  btn.dataset.color = color.hex;
  btn.textContent = color.name;
  btn.style.backgroundColor = color.hex;
  container.appendChild(btn);
});

// 3. Set up delegation
container.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  
  ctx.strokeStyle = btn.dataset.color;
  
  // Visual feedback
  container.querySelectorAll('button').forEach(b => {
    b.classList.remove('active');
  });
  btn.classList.add('active');
});
```

## Finding Parent Elements with closest()

### Basic Usage

```javascript
// Find the closest button ancestor
const button = element.closest('button');

// Find closest element with class 'active'
const active = element.closest('.active');

// Find closest div
const div = element.closest('div');
```

### Practical Example

```javascript
container.addEventListener('click', (event) => {
  // If user clicked a nested element, find the button
  const button = event.target.closest('button');
  
  if (button && button.parentElement === container) {
    // Click was on a button in this container
    handleColorClick(button);
  }
});
```

## Visual Feedback

### Highlighting Active Button

```javascript
container.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  // Remove active class from all buttons
  container.querySelectorAll('button').forEach(btn => {
    btn.classList.remove('active');
  });

  // Add active class to clicked button
  button.classList.add('active');

  // Update color
  ctx.strokeStyle = button.dataset.color;
});
```

### CSS for Active State

```css
.color-btn {
  padding: 10px 16px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.color-btn.active {
  border-color: white;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}
```

## Dynamic HTML Generation

### Creating Elements Programmatically

```javascript
// Create button
const button = document.createElement('button');

// Set attributes
button.dataset.color = '#FF0000';
button.textContent = 'Red';
button.className = 'color-btn';

// Set styles
button.style.backgroundColor = '#FF0000';
button.style.color = 'white';

// Add to page
container.appendChild(button);
```

### Clearing and Recreating

```javascript
function initColorPicker(colors) {
  // Clear existing buttons
  container.innerHTML = '';
  
  // Create new buttons
  colors.forEach(color => {
    const btn = document.createElement('button');
    btn.dataset.color = color.hex;
    btn.textContent = color.name;
    container.appendChild(btn);
  });
  
  // Re-attach delegation
  setupEventDelegation();
}
```

## Tips

- Use data attributes for non-visual data
- Event delegation works best with bubbling events (click, mousedown, etc.)
- Check `event.target` or use `closest()` to identify elements
- Clear `innerHTML` before recreating many elements
- Add visual feedback to show which option is selected
- Keep listeners on stable parent elements
- Event delegation scales well for many items

## Common Mistakes

**Missing the closest() check:**
```javascript
// BAD - Works only if user clicks button text directly
container.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') { // Misses nested elements
    updateColor(e.target.dataset.color);
  }
});

// GOOD - Handles nested elements too
container.addEventListener('click', (e) => {
  const button = e.target.closest('button');
  if (button) {
    updateColor(button.dataset.color);
  }
});
```

**Forgetting to remove/update active state:**
```javascript
// BAD - Multiple active buttons at once
container.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  btn.classList.add('active'); // Never removes old active!
});

// GOOD - Only one active at a time
container.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
});
```

**Re-attaching delegation on dynamic content:**
```javascript
// BAD - Listeners break when content is recreated
function recreateButtons() {
  container.innerHTML = '';
  colors.forEach(c => {
    const btn = document.createElement('button');
    container.appendChild(btn);
  });
  // Forgot to re-attach listener!
}

// GOOD - Delegation works automatically
function recreateButtons() {
  container.innerHTML = '';
  colors.forEach(c => {
    const btn = document.createElement('button');
    container.appendChild(btn);
  });
  // No re-attachment needed with delegation!
}
```

## Next Steps

Once complete, move to [exercise 121](../121-canvas-custom-event) where you'll implement custom events for the clear button.
