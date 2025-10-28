# Exercise 119: Interactive Drawing Canvas - Mouse Move Events

Implement continuous drawing as the mouse moves over the canvas.

## Concepts

- **Mouse Move Events** - Triggered when mouse moves
- **Continuous Drawing** - Draw while mouse moves
- **Drawing Line Segments** - Connect points with small lines
- **Mouse Tracking** - Track current mouse position
- **Event Throttling Concepts** - Mouse events fire frequently
- **Smooth Drawing Paths** - Create smooth lines from segments
- **Path Continuation** - Connect line segments seamlessly

## What You're Learning

In Exercise 118, you learned to track mouse down and up events. Now you'll add the `mousemove` event
to create continuous, smooth drawing. This is the foundation of any drawing application.

## Functions to Implement

### `getMousePosition(event, canvas)`
Convert mouse event coordinates to canvas coordinates.

**Parameters:**
- `event` - mousemove event object
- `canvas` - Canvas DOM element

**Returns:**
- Object with `{ x, y }` properties

**Implementation:**
```javascript
const rect = canvas.getBoundingClientRect();
return {
  x: event.clientX - rect.left,
  y: event.clientY - rect.top
};
```

### `drawLineSegment(ctx, fromX, fromY, toX, toY, color, width)`
Draw a line from one point to another.

**Parameters:**
- `ctx` - Canvas 2D context
- `fromX, fromY` - Starting coordinates
- `toX, toY` - Ending coordinates
- `color` - Line color (e.g., '#000000')
- `width` - Line width in pixels

**Implementation:**
```javascript
ctx.strokeStyle = color;
ctx.lineWidth = width;
ctx.beginPath();
ctx.moveTo(fromX, fromY);
ctx.lineTo(toX, toY);
ctx.stroke();
```

### `updateDrawingState(drawingState, x, y)`
Update drawing state with new position.

**Parameters:**
- `drawingState` - State object to update
- `x, y` - New position coordinates

**Implementation:**
```javascript
drawingState.lastX = x;
drawingState.lastY = y;
```

### `handleMouseMove(event, canvas, ctx, drawingState)`
Handle mousemove event to draw continuously.

**Parameters:**
- `event` - mousemove event
- `canvas` - Canvas element
- `ctx` - Canvas context
- `drawingState` - Drawing state object

**Implementation:**
```javascript
if (!drawingState.isDrawing) return;

const pos = getMousePosition(event, canvas);

drawLineSegment(
  ctx,
  drawingState.lastX,
  drawingState.lastY,
  pos.x,
  pos.y,
  '#000000',
  2
);

updateDrawingState(drawingState, pos.x, pos.y);
```

### `setupDrawingEventHandlers(canvas, ctx, drawingState)`
Attach all event handlers for drawing.

**Parameters:**
- `canvas` - Canvas element
- `ctx` - Canvas context
- `drawingState` - Drawing state object

**Implementation:**
```javascript
canvas.addEventListener('mousedown', (event) => {
  const pos = getMousePosition(event, canvas);
  drawingState.isDrawing = true;
  drawingState.lastX = pos.x;
  drawingState.lastY = pos.y;
});

canvas.addEventListener('mousemove', (event) => {
  handleMouseMove(event, canvas, ctx, drawingState);
});

canvas.addEventListener('mouseup', () => {
  drawingState.isDrawing = false;
});

canvas.addEventListener('mouseleave', () => {
  drawingState.isDrawing = false;
});
```

## How Continuous Drawing Works

### The Drawing Cycle

Think of continuous drawing as connecting many small line segments:

```
User Interaction          Event Flow               Drawing
─────────────────────────────────────────────────────────────

Click on canvas     →    mousedown
                         Set isDrawing = true
                         Save start position

Move mouse          →    mousemove (fires ~60x/sec)
(button held)             Calculate current position
                         Draw line from last to current
                         Update last position

                    →    mousemove (fires again)
                         Calculate new current position
                         Draw line from previous to current
                         Update last position

                    →    mousemove (continues...)

Release button      →    mouseup
                         Set isDrawing = false
                         Stop drawing
```

### Why It Works

```
Frame 1: Line from (10,10) to (15,12)
Frame 2: Line from (15,12) to (20,15)
Frame 3: Line from (20,15) to (25,18)
Frame 4: Line from (25,18) to (30,20)
...
Result: Appears as one smooth curved line!
```

Because events fire 60+ times per second, the human eye perceives the segments as continuous.

## Mouse Event Frequency

Mouse events fire very frequently:

```javascript
let moveCount = 0;

canvas.addEventListener('mousemove', () => {
  moveCount++;
  console.log('mousemove fired:', moveCount, 'times');
});

// In one second of moving the mouse around,
// this might log: 60, 80, or even 120+ events!
```

This is why drawing happens so smoothly - there are many opportunities to draw small segments.

## Making Lines Look Smooth

### Line Cap and Join Styles

By default, lines have sharp edges. Make them look smoother:

```javascript
ctx.lineCap = 'round';    // Round the ends
ctx.lineJoin = 'round';   // Round the joints
```

**Without these:**
```
Segments appear disconnected or sharp
A----B----C----D
```

**With round cap/join:**
```
Segments blend smoothly together
A····B····C····D
```

### Anti-Aliasing

Canvas automatically applies anti-aliasing (smoothing edges), which helps lines look less pixelated.

## Common Drawing Patterns

### Simple Drawing App

```javascript
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2D');

// Configure drawing
ctx.lineWidth = 2;
ctx.strokeStyle = '#000';
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

// State
const drawing = { active: false, x: 0, y: 0 };

// Start drawing
canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  drawing.active = true;
  drawing.x = e.clientX - rect.left;
  drawing.y = e.clientY - rect.top;
});

// Draw continuously
canvas.addEventListener('mousemove', (e) => {
  if (!drawing.active) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.beginPath();
  ctx.moveTo(drawing.x, drawing.y);
  ctx.lineTo(x, y);
  ctx.stroke();

  drawing.x = x;
  drawing.y = y;
});

// Stop drawing
canvas.addEventListener('mouseup', () => {
  drawing.active = false;
});

canvas.addEventListener('mouseleave', () => {
  drawing.active = false;
});
```

### Eraser Tool

```javascript
canvas.addEventListener('mousemove', (e) => {
  if (!drawing.active) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Erase instead of draw
  ctx.clearRect(x - 5, y - 5, 10, 10);
});
```

### Drawing with Opacity (Fade Out)

```javascript
canvas.addEventListener('mousemove', (e) => {
  if (!drawing.active) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Draw with fade
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  ctx.moveTo(drawing.x, drawing.y);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.globalAlpha = 1.0;

  drawing.x = x;
  drawing.y = y;
});
```

## Performance Considerations

### Mouse Events Fire Frequently

```javascript
// This runs 60+ times per SECOND while moving mouse!
canvas.addEventListener('mousemove', (e) => {
  // Be careful with expensive operations here
  // Avoid network requests, complex calculations, etc.
  expensiveOperation(); // BAD - will cause lag
});
```

### Optimize Drawing Operations

```javascript
// GOOD - Minimal work in event handler
canvas.addEventListener('mousemove', (e) => {
  if (!drawing.active) return;

  // Only essential calculations
  const pos = getMousePosition(e, canvas);
  
  // Simple drawing
  drawLineSegment(ctx, drawing.x, drawing.y, pos.x, pos.y, color, width);
  
  // Update state
  drawing.x = pos.x;
  drawing.y = pos.y;
});
```

### Debouncing/Throttling (Advanced)

For very performance-sensitive applications, you can limit mouse event handling:

```javascript
let lastTime = 0;

canvas.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastTime < 16) return; // Only process every 16ms (~60fps)
  lastTime = now;

  // Draw here
});
```

## Tips

- Always check `isDrawing` before drawing in mousemove handler
- Convert mouse coordinates to canvas coordinates
- Use `lineCap` and `lineJoin` for smooth appearance
- Stop drawing if mouse leaves canvas (mouseleave event)
- Mouse events fire frequently - keep handlers efficient
- Update last position after each draw
- Set drawing properties once, before event listeners

## Common Mistakes

**Drawing outside if statement:**
```javascript
// BAD - Draws even when button not pressed
canvas.addEventListener('mousemove', (e) => {
  // Missing: if (!drawing.active) return;
  ctx.lineTo(x, y);
  ctx.stroke();
});

// GOOD
canvas.addEventListener('mousemove', (e) => {
  if (!drawing.active) return;
  ctx.lineTo(x, y);
  ctx.stroke();
});
```

**Not updating position:**
```javascript
// BAD - Lines don't connect properly
canvas.addEventListener('mousemove', (e) => {
  if (!drawing.active) return;
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  ctx.lineTo(x, y);
  ctx.stroke();
  // Missing: drawing.x = x; drawing.y = y;
});

// GOOD
canvas.addEventListener('mousemove', (e) => {
  if (!drawing.active) return;
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  ctx.lineTo(x, y);
  ctx.stroke();
  drawing.x = x;
  drawing.y = y;
});
```

## Next Steps

Once complete, move to [exercise 120](../120-canvas-colors) where you'll add color selection to your drawing tool.
