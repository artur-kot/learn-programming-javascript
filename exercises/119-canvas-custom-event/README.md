# Exercise 121: Interactive Drawing Canvas - Custom Events

Implement custom events for canvas clearing and canvas state management for undo functionality.

## Concepts

- **Custom Events** - Creating and dispatching custom events
- **Event Creation** - Using CustomEvent constructor
- **Event Dispatching** - Sending events with dispatchEvent()
- **Event Listeners** - Responding to custom events
- **Canvas Clearing** - Resetting canvas state
- **Undo/Redo Patterns** - Maintaining history for restoration
- **Application Events** - Domain-specific event architecture
- **Event-Driven Architecture** - Loose coupling with events

## What You're Learning

Custom events allow different parts of your application to communicate without being tightly
coupled to each other. Instead of one component directly calling functions on another,
components emit events and other components listen to them.

This is especially useful for:
- Complex applications with many interacting pieces
- Adding new features without changing existing code
- Making code more testable and maintainable
- Following the Observer pattern

## Functions to Implement

### `clearCanvas(ctx, canvas, history)`
Clear the canvas and save previous state to history.

**Parameters:**
- `ctx` - Canvas 2D context
- `canvas` - Canvas element
- `history` - Array to store canvas states

**Implementation:**
```javascript
ctx.clearRect(0, 0, canvas.width, canvas.height);
saveCanvasState(canvas, history);
```

### `createCanvasClearedEvent()`
Create a custom 'canvasCleared' event.

**Returns:**
- CustomEvent instance

**Implementation:**
```javascript
return new CustomEvent('canvasCleared', {
  bubbles: true,
  cancelable: true
});
```

### `dispatchCanvasClearedEvent(target)`
Dispatch the custom canvasCleared event on target.

**Parameters:**
- `target` - Element to dispatch event on

**Implementation:**
```javascript
const event = createCanvasClearedEvent();
target.dispatchEvent(event);
```

### `onCanvasCleared(element, callback)`
Set up listener for canvasCleared event.

**Parameters:**
- `element` - Element to listen on
- `callback` - Function to call when event fires

**Implementation:**
```javascript
element.addEventListener('canvasCleared', callback);
```

### `saveCanvasState(canvas, history)`
Save current canvas state to history array.

**Parameters:**
- `canvas` - Canvas element
- `history` - Array to store states

**Implementation:**
```javascript
const imageUrl = canvas.toDataURL('image/png');
history.push(imageUrl);
```

### `undoCanvasAction(ctx, canvas, history)`
Restore previous canvas state from history.

**Parameters:**
- `ctx` - Canvas 2D context
- `canvas` - Canvas element
- `history` - History array

**Implementation:**
```javascript
if (history.length <= 1) return;

history.pop(); // Remove current
const previousState = history[history.length - 1];

const img = new Image();
img.onload = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
};
img.src = previousState;
```

## Custom Events Pattern

### Creating a Custom Event

```javascript
// Simple event
const event = new CustomEvent('myEvent');

// Event with options
const event = new CustomEvent('myEvent', {
  bubbles: true,        // Event bubbles up through parents
  cancelable: true,     // Can be stopped with preventDefault()
  detail: { /* data */ }// Custom data
});
```

### Dispatching a Custom Event

```javascript
element.dispatchEvent(event);

// Or in one line
element.dispatchEvent(new CustomEvent('myEvent'));
```

### Listening to a Custom Event

```javascript
element.addEventListener('myEvent', (event) => {
  console.log('Event fired!');
  console.log('Detail:', event.detail);
});
```

## Real-World Example: Complete Event Workflow

```javascript
// 1. Define what events you'll emit
function createCanvasClearedEvent() {
  return new CustomEvent('canvasCleared', {
    bubbles: true,
    cancelable: true
  });
}

// 2. Emit event when action happens
clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.dispatchEvent(createCanvasClearedEvent());
});

// 3. Other components listen and respond
canvas.addEventListener('canvasCleared', () => {
  updateStatusUI('Canvas cleared');
});

canvas.addEventListener('canvasCleared', () => {
  logAnalytics('canvas_cleared');
});

canvas.addEventListener('canvasCleared', () => {
  enableUndoButton();
});

// No tight coupling between components!
```

## Event-Driven Architecture Benefits

### Before: Tight Coupling

```javascript
// clear.js directly calls other modules
function handleClear() {
  canvasModule.clear();
  uiModule.updateStatus('Cleared');
  historyModule.saveState();
  analyticsModule.log('cleared');
}

// Problems:
// - clear.js depends on all other modules
// - Hard to add new modules
// - Difficult to test in isolation
// - Changes ripple through codebase
```

### After: Loose Coupling with Events

```javascript
// clear.js just emits event
function handleClear() {
  canvasModule.clear();
  canvas.dispatchEvent(new CustomEvent('canvasCleared'));
}

// Each module independently listens
canvas.addEventListener('canvasCleared', () => {
  uiModule.updateStatus('Cleared');
});

canvas.addEventListener('canvasCleared', () => {
  historyModule.saveState();
});

canvas.addEventListener('canvasCleared', () => {
  analyticsModule.log('cleared');
});

// Benefits:
// - No dependencies between modules
// - Add new listeners without changing existing code
// - Each module can be tested independently
// - Scalable architecture
```

## Canvas State Preservation

### Why Save State?

Canvas drawing operations are destructive. When you clear or draw over,
the previous content is gone. To implement undo, you must save the canvas
state before changes.

### Saving State as Image

```javascript
const history = [];

function saveCanvasState(canvas, history) {
  // Convert canvas to PNG data URL
  const imageUrl = canvas.toDataURL('image/png');
  history.push(imageUrl);
}

// Usage
saveCanvasState(canvas, history); // Saves blank canvas
// User draws...
saveCanvasState(canvas, history); // Saves with drawing
// User draws more...
saveCanvasState(canvas, history); // Saves new drawing
```

### Restoring State

```javascript
function undoCanvasAction(ctx, canvas, history) {
  if (history.length <= 1) return; // Keep initial state
  
  // Remove current state
  history.pop();
  
  // Get previous state
  const previousState = history[history.length - 1];
  
  // Restore from image
  const img = new Image();
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };
  img.src = previousState;
}
```

## Passing Data with Events

### Event Detail Property

```javascript
const event = new CustomEvent('colorChanged', {
  detail: {
    oldColor: '#000000',
    newColor: '#FF0000',
    timestamp: Date.now()
  }
});

canvas.dispatchEvent(event);

canvas.addEventListener('colorChanged', (e) => {
  console.log('From:', e.detail.oldColor);
  console.log('To:', e.detail.newColor);
});
```

## Event Bubbling

### How Bubbling Works

```
User clicks button inside container
           ↓
    Button gets click event
           ↓
   Event bubbles to parent (container)
           ↓
Container's listener fires
           ↓
Event bubbles further up (if not stopped)
```

### Controlling Bubbling

```javascript
const event = new CustomEvent('myEvent', {
  bubbles: true,      // Allows bubbling (default: false)
  cancelable: true    // Allows preventDefault() (default: false)
});

// Stop event from bubbling further
canvas.addEventListener('canvasCleared', (e) => {
  e.stopPropagation();
});

// Prevent default action (if any)
canvas.addEventListener('canvasCleared', (e) => {
  e.preventDefault();
});
```

## Tips

- Use descriptive event names that describe what happened
- Set bubbles: true if event should propagate to parents
- Use detail object for passing associated data
- Save canvas state BEFORE making changes (for undo)
- Dispatch events at the end of operation
- Document which events your module emits
- Keep event listeners focused on one responsibility

## Common Mistakes

**Creating event inside dispatch:**
```javascript
// INEFFICIENT - Creates new event each time
element.addEventListener('click', () => {
  canvas.dispatchEvent(new CustomEvent('clear'));
  canvas.dispatchEvent(new CustomEvent('clear'));
});

// BETTER - Create once, reuse
const clearEvent = new CustomEvent('clear');
element.addEventListener('click', () => {
  canvas.dispatchEvent(clearEvent);
  canvas.dispatchEvent(clearEvent);
});
```

**Forgetting to save initial state:**
```javascript
// BAD - Can't undo first action
const history = [];
// User draws...
saveCanvasState(canvas, history); // First save
// Now can't undo back to blank

// GOOD - Include initial state
const history = [];
saveCanvasState(canvas, history); // Save blank first
// User draws...
saveCanvasState(canvas, history); // Can undo to blank
```

**Not checking history length before undo:**
```javascript
// BAD - Crashes when trying to undo past beginning
function undoCanvasAction(ctx, canvas, history) {
  history.pop();
  const state = history[history.length - 1]; // Could be undefined!
  restoreState(state);
}

// GOOD - Guard against empty history
function undoCanvasAction(ctx, canvas, history) {
  if (history.length <= 1) return; // Keep at least initial state
  
  history.pop();
  const state = history[history.length - 1];
  restoreState(state);
}
```

## Next Steps

Once complete, move to [exercise 122](../122-canvas-save) where you'll implement canvas export and image saving.
