# Exercise 112: Interactive Counter - Remove Listeners

Disable buttons by removing event listeners. Toggle event listener attachment.

## Concepts

- **removeEventListener Method** - Detach listeners from elements
- **Listener Removal** - Stop listening for events
- **Disabling Events** - Turn off event handling
- **Event Listener Management** - Add and remove listeners dynamically
- **Toggling Listeners** - Switch listeners on and off
- **Named Function References** - Need to reference same function to remove
- **Cleanup and Management** - Proper event listener lifecycle

## What You're Learning

Managing event listeners is crucial for performance and control. In this exercise, you'll:
- Remove event listeners from buttons
- Remove keyboard listeners
- Toggle listeners on and off
- Manage listener lifecycle
- Understand listener removal requirements
- Implement enable/disable functionality

**Removal Pattern:**
```javascript
// Add listener
const handler = () => { counter++; };
button.addEventListener('click', handler);

// Remove listener (must use same function reference)
button.removeEventListener('click', handler);
```

## Challenge

Implement functions to remove event listeners. Add enable/disable functionality to control counter.

## Functions to Implement

### `removeClickListener(button, handler)`
Remove click listener from button.

**Parameters:**
- `button` - Button element with listener
- `handler` - Handler function to remove

**Implementation:**
```javascript
button.removeEventListener('click', handler);
```

### `removeKeyboardListener(handler)`
Remove keyboard listener from window.

**Parameters:**
- `handler` - Keyboard handler function to remove

**Implementation:**
```javascript
window.removeEventListener('keydown', handler);
```

### `disableCounter(buttons, keyboardHandler)`
Remove all event listeners to disable counter.

**Parameters:**
- `buttons` - Object with button references and handlers
- `keyboardHandler` - Keyboard handler function

**Implementation Pattern:**
```javascript
// Remove click listeners
Object.values(buttons).forEach(btn => {
  removeClickListener(btn.element, btn.handler);
});

// Remove keyboard listener
removeKeyboardListener(keyboardHandler);
```

### `enableCounter(buttons, keyboardHandler)`
Add event listeners back to enable counter.

**Parameters:**
- `buttons` - Object with button references and handlers
- `keyboardHandler` - Keyboard handler function

**Implementation Pattern:**
```javascript
// Add click listeners
Object.values(buttons).forEach(btn => {
  btn.element.addEventListener('click', btn.handler);
});

// Add keyboard listener
window.addEventListener('keydown', keyboardHandler);
```

### `toggleCounterListeners(buttons, keyboardHandler, enabled)`
Toggle event listeners on or off.

**Parameters:**
- `buttons` - Object with button references and handlers
- `keyboardHandler` - Keyboard handler function
- `enabled` - Boolean to enable (true) or disable (false)

**Implementation:**
```javascript
if (enabled) {
  enableCounter(buttons, keyboardHandler);
} else {
  disableCounter(buttons, keyboardHandler);
}
```

## Event Listener Management

**Adding a listener:**
```javascript
const handler = (event) => { counter++; };
button.addEventListener('click', handler);
```

**Removing a listener:**
```javascript
button.removeEventListener('click', handler);
```

**Critical requirement:**
```javascript
// ❌ This won't work - different function reference
button.addEventListener('click', () => { counter++; });
button.removeEventListener('click', () => { counter++; }); // Different function!

// ✅ This works - same function reference
const handler = () => { counter++; };
button.addEventListener('click', handler);
button.removeEventListener('click', handler); // Same function
```

## Storing Handler References

**Pattern to enable listener removal:**
```javascript
const buttons = {
  increment: {
    element: document.getElementById('increment-btn'),
    handler: () => { counter++; }
  },
  decrement: {
    element: document.getElementById('decrement-btn'),
    handler: () => { counter--; }
  }
};

// Setup
Object.values(buttons).forEach(btn => {
  btn.element.addEventListener('click', btn.handler);
});

// Teardown
Object.values(buttons).forEach(btn => {
  btn.element.removeEventListener('click', btn.handler);
});
```

## Toggling Listeners

**Simple toggle:**
```javascript
let listenerAttached = false;

function toggleListener() {
  if (listenerAttached) {
    button.removeEventListener('click', handler);
    listenerAttached = false;
  } else {
    button.addEventListener('click', handler);
    listenerAttached = true;
  }
}
```

**Disable and Enable:**
```javascript
function disableAll() {
  buttons.forEach(btn => btn.removeEventListener('click', handler));
}

function enableAll() {
  buttons.forEach(btn => btn.addEventListener('click', handler));
}
```

## Common Use Cases

**Temporarily disable controls:**
```javascript
// During loading
disableCounter(buttons, keyboardHandler);
// After loading completes
enableCounter(buttons, keyboardHandler);
```

**Mode switching:**
```javascript
if (editMode) {
  enableCounter(buttons, keyboardHandler);
} else {
  disableCounter(buttons, keyboardHandler);
}
```

**Performance optimization:**
```javascript
// Remove expensive listeners when not visible
if (window.hidden) {
  disableCounter(buttons, keyboardHandler);
}
```

## Memory and Performance

**Why remove listeners:**
1. **Memory** - Listeners can retain references to objects
2. **Performance** - Fewer listeners = faster event dispatch
3. **Functionality** - Don't want stale handlers running
4. **Cleanup** - Proper lifecycle management

**Good practice:**
```javascript
// Add listeners
setupCounterButtons(buttons, keyboardHandler);

// Later, when done
disableCounter(buttons, keyboardHandler);

// Can re-enable
enableCounter(buttons, keyboardHandler);
```

## Tips

- **Always save handler reference** - Can't remove without it
- **Use same function** - removeEventListener needs exact same function
- **Name your handlers** - Easier to manage than anonymous functions
- **Store button data** - Keep track of elements and handlers together
- **Test removal** - Verify listeners actually stopped working
- **Clean up** - Remove listeners when components unmount
- **Toggle pattern** - Use enable/disable functions for clarity

## Common Mistakes

```javascript
// ❌ Won't work - different function instance
button.addEventListener('click', () => console.log('clicked'));
button.removeEventListener('click', () => console.log('clicked'));

// ✅ Works - same function reference
const handler = () => console.log('clicked');
button.addEventListener('click', handler);
button.removeEventListener('click', handler);

// ❌ Can't remove - anonymous callback
button.addEventListener('click', function() { 
  removeClickListener(button, ???); // What function to pass?
});

// ✅ Named function - easy to remove
const clickHandler = () => { /* ... */ };
button.addEventListener('click', clickHandler);
removeClickListener(button, clickHandler);
```

## Cleanup Pattern

**Complete lifecycle:**
```javascript
// Setup
const handler = () => { counter++; };
button.addEventListener('click', handler);

// Later - cleanup
button.removeEventListener('click', handler);

// Or toggle
function toggleListener(shouldListen) {
  if (shouldListen) {
    button.addEventListener('click', handler);
  } else {
    button.removeEventListener('click', handler);
  }
}
```

## Series 22 Complete

You've now implemented a full event handling system:
- 108: Basic click listeners
- 109: Event object properties
- 110: Multiple buttons with different actions
- 111: Keyboard event handling
- 112: Event listener management and removal

Congratulations on mastering event handling!

## Next Steps

You've completed Series 22! Move forward to explore:
- Form events and validation
- Advanced event delegation
- Event bubbling and capturing
- Custom events
- More complex user interactions
