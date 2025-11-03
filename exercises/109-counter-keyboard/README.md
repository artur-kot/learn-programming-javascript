# Exercise 111: Interactive Counter - Keyboard Events

Use arrow keys and other keyboard events to control the counter.

## Concepts

- **Keyboard Events** - Detect keyboard input
- **keydown Event** - When a key is pressed down
- **Key Codes and Key Properties** - Identifying which key was pressed
- **Arrow Keys** - Using directional keys for navigation
- **Conditional Keyboard Handling** - Different actions for different keys
- **Event.key vs Event.code** - String vs physical position
- **Keyboard State Management** - Responding to keyboard input

## What You're Learning

Keyboard events enable powerful keyboard shortcuts and navigation. In this exercise, you'll:
- Listen for keyboard events
- Detect arrow key presses
- Implement different actions per key
- Use event.key property
- Handle keyboard input efficiently
- Update counter with keyboard control

**Keyboard Event Pattern:**
```javascript
window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
    counter++;
  } else if (event.key === 'ArrowDown') {
    counter--;
  }
});
```

## Challenge

Implement functions to handle keyboard events. Control the counter with arrow keys and reset key.

## Functions to Implement

### `isArrowKey(key)`
Check if key pressed is an arrow key.

**Parameters:**
- `key` - Key string from event.key

**Returns:**
- Boolean indicating if arrow key

**Implementation:**
```javascript
return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key);
```

### `getKeyName(key)`
Get readable name for key pressed.

**Parameters:**
- `key` - Key string from event.key

**Returns:**
- Readable key name

**Implementation:**
```javascript
return key;
// or map to readable names like "↑", "↓", etc.
```

### `handleArrowKey(key, counter)`
Handle arrow key press and update counter.

**Parameters:**
- `key` - Arrow key name
- `counter` - Counter object with count property

**Implementation Pattern:**
```javascript
if (key === 'ArrowUp' || key === 'ArrowRight') {
  counter.count++;
} else if (key === 'ArrowDown' || key === 'ArrowLeft') {
  counter.count--;
}
```

### `handleKeyPress(event, counter)`
Handle keyboard input for counter control.

**Parameters:**
- `event` - Keyboard event object
- `counter` - Counter object

**Implementation Pattern:**
```javascript
const key = event.key;

if (isArrowKey(key)) {
  handleArrowKey(key, counter);
} else if (key.toLowerCase() === 'r') {
  counter.count = 0;
}
```

### `setupKeyboardListener(display, counter)`
Add keyboard event listener to window.

**Parameters:**
- `display` - Display element
- `counter` - Counter object

**Implementation Pattern:**
```javascript
window.addEventListener('keydown', (event) => {
  handleKeyPress(event, counter);
  display.textContent = counter.count;
});
```

## Keyboard Events

**keydown:**
```javascript
window.addEventListener('keydown', (event) => {
  console.log(event.key); // Character pressed
  console.log(event.code); // Physical key position
});
```

**event.key property:**
```javascript
event.key === 'a'          // Letter key
event.key === 'ArrowUp'    // Arrow key
event.key === 'Enter'      // Enter key
event.key === ' '          // Space bar
event.key === 'Escape'     // Escape key
```

**event.code property:**
```javascript
event.code === 'KeyA'      // Physical key A
event.code === 'ArrowUp'   // Physical up arrow
event.code === 'Enter'     // Physical enter key
```

## Detecting Arrow Keys

**Pattern:**
```javascript
window.addEventListener('keydown', (event) => {
  switch(event.key) {
    case 'ArrowUp':
    case 'ArrowRight':
      counter++;
      break;
    case 'ArrowDown':
    case 'ArrowLeft':
      counter--;
      break;
  }
});
```

**With array check:**
```javascript
const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

if (arrowKeys.includes(event.key)) {
  // Handle arrow key
}
```

## Common Keyboard Shortcuts

**Common keys:**
```javascript
'Enter'     // Return key
'Escape'    // Esc key
' '         // Space bar
'Shift'     // Shift key
'Control'   // Ctrl key (note: 'Control' not 'Ctrl')
'Alt'       // Alt key
'Meta'      // Command/Windows key
'Tab'       // Tab key
```

**Modifier keys:**
```javascript
event.shiftKey   // Is Shift held?
event.ctrlKey    // Is Ctrl held?
event.altKey     // Is Alt held?
event.metaKey    // Is Meta held?

// Example: Ctrl+S
if (event.ctrlKey && event.key === 's') {
  event.preventDefault(); // Stop default save
}
```

## Preventing Default Behavior

**Stop default actions:**
```javascript
window.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
    event.preventDefault(); // Don't scroll page on space
  }
});
```

## Case Sensitivity

**Remember key is case-sensitive:**
```javascript
event.key === 'r'     // Lowercase r
event.key === 'R'     // Uppercase R (Shift held)

// Better: normalize
if (event.key.toLowerCase() === 'r') {
  // Handles both 'r' and 'R'
}
```

## Tips

- Use event.key for character input
- Use event.code for game controls
- Listen on window for global keyboard
- Remember key names for arrows: 'ArrowUp', etc.
- Check modifier keys with event.shiftKey, etc.
- Normalize case when checking letters
- Prevent default for shortcuts
- Test on different keyboards/browsers

## Keyboard vs Mouse

**Keyboard events (global, no element):**
```javascript
window.addEventListener('keydown', handler);
```

**Mouse events (on specific element):**
```javascript
button.addEventListener('click', handler);
```

**Combining both:**
```javascript
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') counter++;
});

button.addEventListener('click', () => {
  counter++;
});
```

## Common Patterns

**Arrow key navigation:**
```javascript
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') moveUp();
  if (e.key === 'ArrowDown') moveDown();
  if (e.key === 'ArrowLeft') moveLeft();
  if (e.key === 'ArrowRight') moveRight();
});
```

**Shortcut keys:**
```javascript
window.addEventListener('keydown', (e) => {
  if (e.key === 'r' || e.key === 'R') reset();
  if (e.key === 's' || e.key === 'S') save();
});
```

## Next Steps

Once complete, move to [exercise 112](../112-counter-remove) where you'll remove event listeners to disable keyboard control.
