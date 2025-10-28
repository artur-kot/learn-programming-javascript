# Exercise 118: Interactive Drawing Canvas - Mouse Down/Up Events

Learn to draw on HTML5 canvas and manage drawing state with mouse events.

## Concepts

- **HTML5 Canvas Element** - Drawing surface for graphics
- **Canvas Context (2D)** - API for drawing operations
- **Drawing Primitives** - Lines, rectangles, circles, etc.
- **Mouse Events** - mousedown, mouseup event handling
- **Drawing State Tracking** - Track if user is actively drawing
- **Canvas Coordinates** - Position system for drawing
- **Line Drawing** - Connect points with line segments

## What You're Learning

Canvas is a powerful API for drawing graphics directly on web pages. In this exercise, you'll:
- Understand what Canvas is and how it works
- Get the 2D drawing context
- Set up canvas dimensions
- Track mouse button states
- Capture mouse position relative to canvas
- Draw simple lines
- Manage drawing state

## What is HTML5 Canvas?

### Canvas vs Other Graphics Methods

Before diving into code, let's understand Canvas and when to use it:

**SVG (Vector Graphics):**
```html
<svg width="200" height="200">
  <circle cx="100" cy="100" r="50" fill="red"/>
</svg>
```
- Draws using mathematical formulas
- Scalable without quality loss
- Good for logos, icons, diagrams
- Can be styled with CSS
- DOM elements you can click/interact with

**Canvas (Raster Graphics):**
```javascript
const ctx = canvas.getContext('2D');
ctx.arc(100, 100, 50, 0, Math.PI * 2);
ctx.fillStyle = 'red';
ctx.fill();
```
- Draws pixel by pixel
- Like "painting" on a surface
- Great for animations, games, real-time drawing
- Not scalable (pixelated when enlarged)
- Draws much faster than SVG
- Cannot interact with individual drawn elements

**When to use Canvas:**
- Drawing applications (sketching, painting)
- Games and animations
- Real-time data visualization
- Image manipulation
- Performance-critical graphics

**When to use SVG:**
- Icons and logos
- Interactive diagrams
- Scalable graphics
- Accessible illustrations

### The Canvas Element

**HTML:**
```html
<canvas id="drawing-canvas" width="800" height="600"></canvas>
```

**Important:** The width and height attributes must be set on the HTML element, not just CSS!

```html
<!-- WRONG - Canvas will be stretched -->
<canvas style="width: 800px; height: 600px;"></canvas>

<!-- RIGHT - Native canvas resolution -->
<canvas width="800" height="600"></canvas>

<!-- You can use CSS for display size AND HTML for resolution -->
<canvas width="800" height="600" style="border: 1px solid black;"></canvas>
```

### Canvas Coordinate System

Canvas uses a coordinate system where:
- **(0, 0)** is the **top-left corner**
- **X increases** to the **right**
- **Y increases** downward (not upward like math!)
- **(width, height)** is the **bottom-right corner**

```
(0,0) ─────────────────────── (800,0)
  │
  │    Canvas coordinate system
  │    (positive Y goes DOWN)
  │
(0,600) ──────────────────── (800,600)
```

This is different from traditional math graphs where Y increases upward!

## Functions to Implement

### `initCanvas(canvasElement)`
Setup canvas and return context.

**Parameters:**
- `canvasElement` - Canvas DOM element

**Returns:**
- 2D drawing context

**Implementation:**
```javascript
const ctx = canvasElement.getContext('2D');
return ctx;
```

### `getCanvasContext(canvasElement)`
Get 2D drawing context from canvas.

**Parameters:**
- `canvasElement` - Canvas DOM element

**Returns:**
- 2D drawing context

**Implementation:**
```javascript
return canvasElement.getContext('2D');
```

### `setCanvasSize(canvasElement, width, height)`
Set canvas width and height.

**Parameters:**
- `canvasElement` - Canvas element
- `width` - Canvas width in pixels
- `height` - Canvas height in pixels

**Implementation:**
```javascript
canvasElement.width = width;
canvasElement.height = height;
```

### `startDrawing(event, drawingState)`
Handle mousedown - begin drawing.

**Parameters:**
- `event` - mousedown event
- `drawingState` - Object to store drawing state

**Implementation:**
```javascript
const rect = event.target.getBoundingClientRect();
const x = event.clientX - rect.left;
const y = event.clientY - rect.top;

drawingState.isDrawing = true;
drawingState.startX = x;
drawingState.startY = y;
```

### `stopDrawing(drawingState)`
Handle mouseup - stop drawing.

**Parameters:**
- `drawingState` - Drawing state object

**Implementation:**
```javascript
drawingState.isDrawing = false;
delete drawingState.startX;
delete drawingState.startY;
```

## The 2D Context Object

Once you have the 2D context, you can access many drawing methods:

### Basic Properties

```javascript
const ctx = canvas.getContext('2D');

// Colors and styles
ctx.fillStyle = '#FF0000';      // Fill color
ctx.strokeStyle = '#00FF00';    // Stroke (border) color
ctx.lineWidth = 2;              // Width of lines
ctx.lineJoin = 'round';         // How lines connect
ctx.lineCap = 'round';          // How line ends look

// Transparency
ctx.globalAlpha = 0.5;          // 0 = transparent, 1 = opaque

// Font and text
ctx.font = '20px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
```

### Drawing Methods

```javascript
// Rectangles
ctx.fillRect(x, y, width, height);      // Filled rectangle
ctx.strokeRect(x, y, width, height);    // Rectangle outline
ctx.clearRect(x, y, width, height);     // Erase rectangle

// Circles and arcs
ctx.arc(x, y, radius, startAngle, endAngle);

// Lines and paths
ctx.beginPath();                // Start a new path
ctx.moveTo(x, y);               // Move to point (no drawing)
ctx.lineTo(x, y);               // Draw line to point
ctx.stroke();                   // Draw the path with outline
ctx.fill();                     // Fill the path

// Text
ctx.fillText(text, x, y);       // Draw filled text
ctx.strokeText(text, x, y);     // Draw text outline
```

## Drawing Lines - The Complete Process

Here's how to draw a line from point A to point B:

```javascript
const ctx = canvas.getContext('2D');

// Step 1: Set properties
ctx.strokeStyle = '#000000';    // Black color
ctx.lineWidth = 2;              // 2 pixels thick
ctx.lineCap = 'round';          // Rounded line ends
ctx.lineJoin = 'round';         // Rounded line joints

// Step 2: Start a new path
ctx.beginPath();

// Step 3: Move to starting point (doesn't draw)
ctx.moveTo(50, 50);

// Step 4: Draw line to ending point
ctx.lineTo(150, 150);

// Step 5: Actually draw the line on canvas
ctx.stroke();
```

### Drawing Multiple Lines

```javascript
// First line: (10,10) to (100,100)
ctx.beginPath();
ctx.moveTo(10, 10);
ctx.lineTo(100, 100);
ctx.stroke();

// Second line: (100,100) to (200,50)
ctx.beginPath();
ctx.moveTo(100, 100);
ctx.lineTo(200, 50);
ctx.stroke();

// Connect them without clearing: same color, different path
ctx.beginPath();
ctx.moveTo(10, 10);
ctx.lineTo(100, 100);
ctx.lineTo(200, 50);
ctx.stroke();
```

## Getting Mouse Position Relative to Canvas

Mouse events give coordinates relative to the window, not the canvas:

```javascript
canvas.addEventListener('mousedown', (event) => {
  // These are window coordinates, not canvas coordinates!
  console.log(event.clientX);    // 523 (might be off canvas)
  console.log(event.clientY);    // 287

  // Get canvas position
  const rect = canvas.getBoundingClientRect();
  
  // Convert to canvas coordinates
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  // Now x, y are relative to canvas top-left (0,0)
  console.log(x, y);            // Correct canvas coordinates!
});
```

### Why This Matters

If canvas is positioned at (10, 20) on the page:
- Mouse at window position (100, 100)
- Canvas coordinates: (100-10, 100-20) = (90, 80)

```
┌─────── Window (page)
│
│  ┌──── Canvas at (10, 20)
│  │
│  │  Mouse at (100, 100) window coords
│  │  Canvas coords: (90, 80)
```

## Drawing State Object

To track drawing, we need an object:

```javascript
const drawingState = {
  isDrawing: false,      // Is mouse button pressed?
  startX: 0,            // Starting X position
  startY: 0             // Starting Y position
};

// When mouse pressed
canvas.addEventListener('mousedown', (event) => {
  const rect = canvas.getBoundingClientRect();
  
  drawingState.isDrawing = true;
  drawingState.startX = event.clientX - rect.left;
  drawingState.startY = event.clientY - rect.top;
});

// When mouse released
canvas.addEventListener('mouseup', () => {
  drawingState.isDrawing = false;
});

// When drawing
canvas.addEventListener('mousemove', (event) => {
  if (!drawingState.isDrawing) return; // Only if button pressed
  
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  // Draw from last position to current position
  ctx.beginPath();
  ctx.moveTo(drawingState.startX, drawingState.startY);
  ctx.lineTo(x, y);
  ctx.stroke();
  
  // Update last position for next move
  drawingState.startX = x;
  drawingState.startY = y;
});
```

## Common Canvas Patterns

### Simple Drawing App

```javascript
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2D');

// Configuration
ctx.lineWidth = 2;
ctx.strokeStyle = '#000';
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

// State
const isDrawing = { active: false };

// Mouse events
canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  isDrawing.active = true;
});

canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing.active) return;
  const rect = canvas.getBoundingClientRect();
  ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
  ctx.stroke();
});

canvas.addEventListener('mouseup', () => {
  isDrawing.active = false;
});

canvas.addEventListener('mouseleave', () => {
  isDrawing.active = false;
});
```

### Clearing the Canvas

```javascript
// Clear entire canvas
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Clear a specific area
ctx.clearRect(100, 100, 200, 200);

// Clear and reset (like creating new canvas)
canvas.width = canvas.width; // Resets canvas
```

### Drawing Different Shapes

```javascript
// Rectangle
ctx.fillStyle = 'blue';
ctx.fillRect(50, 50, 100, 100);

// Circle
ctx.beginPath();
ctx.arc(150, 150, 50, 0, Math.PI * 2);
ctx.fillStyle = 'red';
ctx.fill();

// Triangle
ctx.beginPath();
ctx.moveTo(100, 50);
ctx.lineTo(150, 150);
ctx.lineTo(50, 150);
ctx.closePath();
ctx.strokeStyle = 'green';
ctx.stroke();
```

## Performance Tips

**Canvas Performance Considerations:**

```javascript
// GOOD - Set properties once
ctx.strokeStyle = '#000';
ctx.lineWidth = 2;
for (let i = 0; i < 1000; i++) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

// BAD - Setting properties repeatedly
for (let i = 0; i < 1000; i++) {
  ctx.strokeStyle = '#000';  // Redundant!
  ctx.lineWidth = 2;         // Redundant!
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

// GOOD - Batch operations
ctx.save();
for (let i = 0; i < 1000; i++) {
  // Drawing operations
}
ctx.restore();

// AVOID - Creating new paths unnecessarily
for (let i = 0; i < 1000; i++) {
  ctx.beginPath();
  // ...
}
```

## Tips

- Canvas width and height must be set as attributes, not CSS
- Mouse events give window coordinates, must convert to canvas
- Always call `beginPath()` before starting a new path
- Call `stroke()` or `fill()` to actually draw
- Use `clearRect()` to erase parts of canvas
- Drawing is immediate - no automatic refresh
- Set properties before drawing for efficiency
- Use `moveTo()` to move without drawing
- Use `lineTo()` to draw to a point

## Common Mistakes

**Setting canvas size with CSS only:**
```javascript
// BAD - Canvas is stretched!
<canvas style="width: 800px; height: 600px;"></canvas>

// GOOD - Native resolution
<canvas width="800" height="600"></canvas>
```

**Not converting mouse coordinates:**
```javascript
// BAD - Drawing at wrong position
canvas.addEventListener('mousemove', (e) => {
  ctx.lineTo(e.clientX, e.clientY); // Window coords!
});

// GOOD - Convert to canvas coords
canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  ctx.lineTo(x, y);
});
```

**Forgetting to set drawing mode:**
```javascript
// BAD - Lines connect unexpectedly
canvas.addEventListener('mousemove', (e) => {
  ctx.lineTo(x, y);
  ctx.stroke();
});

// GOOD - Clear path on each stroke or use proper state
canvas.addEventListener('mousemove', (e) => {
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();
});
```

## Next Steps

Once complete, move to [exercise 119](../119-canvas-mouse-move) where you'll implement continuous drawing as the mouse moves.
