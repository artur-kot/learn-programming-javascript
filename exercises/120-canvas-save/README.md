# Exercise 122: Interactive Drawing Canvas - Save Drawing

Export canvas drawings as images and implement download and clipboard functionality.

## Concepts

- **Canvas.toDataURL()** - Convert canvas to image data string
- **Image Export** - Save canvas as file
- **Blob Creation** - Convert canvas to binary data
- **File Download** - Trigger browser file download
- **Data URLs** - Text representation of images
- **Link Manipulation** - Use anchor elements for downloads
- **Image Formats** - PNG, JPEG, WebP differences
- **File Naming** - Generate unique filenames with timestamps

## What You're Learning

The final piece of building a drawing application: saving the user's work. You'll learn
how to export canvas drawings in different formats and provide users with download
and clipboard copy functionality.

## Functions to Implement

### `getCanvasDataURL(canvas, format = 'image/png')`
Convert canvas to data URL in specified format.

**Parameters:**
- `canvas` - Canvas element
- `format` - Image MIME type (default: 'image/png')

**Returns:**
- Data URL string (starts with 'data:image/...')

**Implementation:**
```javascript
return canvas.toDataURL(format);
```

### `getImageFormat(filename)`
Parse and return image format from filename.

**Parameters:**
- `filename` - Filename string (e.g., 'drawing.png')

**Returns:**
- Image MIME type

**Implementation:**
```javascript
const ext = filename.split('.').pop().toLowerCase();
const formats = {
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'webp': 'image/webp'
};
return formats[ext] || 'image/png';
```

### `generateFileName(extension = 'png')`
Generate filename with timestamp for uniqueness.

**Parameters:**
- `extension` - File extension (default: 'png')

**Returns:**
- Unique filename string

**Implementation:**
```javascript
const date = new Date().toISOString().split('T')[0];
const time = Date.now();
return `drawing-${date}-${time}.${extension}`;
```

### `createBlobFromCanvas(canvas, format = 'image/png')`
Convert canvas to Blob object.

**Parameters:**
- `canvas` - Canvas element
- `format` - Image MIME type

**Returns:**
- Promise that resolves to Blob

**Implementation:**
```javascript
return new Promise((resolve) => {
  canvas.toBlob(resolve, format);
});
```

### `downloadCanvasImage(canvas, filename = 'drawing.png')`
Trigger browser download of canvas image.

**Parameters:**
- `canvas` - Canvas element
- `filename` - Name for downloaded file

**Implementation:**
```javascript
const link = document.createElement('a');
link.href = canvas.toDataURL('image/png');
link.download = filename;
link.click();
```

### `copyCanvasToClipboard(canvas)`
Copy canvas image to system clipboard.

**Parameters:**
- `canvas` - Canvas element

**Returns:**
- Promise

**Implementation:**
```javascript
return new Promise((resolve, reject) => {
  canvas.toBlob(blob => {
    const item = new ClipboardItem({ 'image/png': blob });
    navigator.clipboard.write([item])
      .then(resolve)
      .catch(reject);
  }, 'image/png');
});
```

## Canvas Export Methods

### toDataURL() - Text Representation

```javascript
// Returns a long string starting with 'data:image/png;base64,'
const dataUrl = canvas.toDataURL('image/png');

// Can be used directly
img.src = dataUrl;

// Problems: Very long strings, memory intensive for large images
```

### toBlob() - Binary Data

```javascript
// More efficient for large images
canvas.toBlob((blob) => {
  // Blob is a binary file-like object
  console.log(blob.size);   // Actual file size
  console.log(blob.type);   // 'image/png'
  
  // Create download URL
  const url = URL.createObjectURL(blob);
  // ... use URL ...
  URL.revokeObjectURL(url); // Clean up
}, 'image/png');
```

### getImageData() - Raw Pixels

```javascript
// Get pixel data as array
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const pixels = imageData.data; // Uint8ClampedArray

// Each pixel is 4 values: [R, G, B, A]
const firstPixel = [pixels[0], pixels[1], pixels[2], pixels[3]];
```

## Image Format Comparison

```
PNG (Lossless):
✓ Perfect quality preservation
✓ Good for art, screenshots, graphics
✗ Larger file size
✓ All browsers support

JPEG (Lossy):
✓ Smaller file size (~10% of PNG)
✓ Good for photos
✗ Some quality loss
✓ All browsers support

WebP (Modern):
✓ 25-35% smaller than JPEG
✓ Better compression
✗ Not supported in older browsers
✓ Modern browsers support

Example sizes:
- PNG: 500 KB
- JPEG: 50 KB
- WebP: 40 KB
```

## Creating Download Links

### Simple Download

```javascript
const link = document.createElement('a');
link.href = canvas.toDataURL('image/png');
link.download = 'my-drawing.png';
link.click();

// Link is immediately removed, no cleanup needed
```

### Download with Blob (Better)

```javascript
canvas.toBlob((blob) => {
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'my-drawing.png';
  link.click();
  
  // Clean up
  URL.revokeObjectURL(url);
});
```

## Clipboard Integration

### Copy Image to Clipboard

```javascript
// Modern browsers only
canvas.toBlob((blob) => {
  const item = new ClipboardItem({ 'image/png': blob });
  
  navigator.clipboard.write([item])
    .then(() => console.log('Copied!'))
    .catch(err => console.log('Failed:', err));
}, 'image/png');
```

### Check Clipboard Support

```javascript
if (navigator.clipboard && 
    navigator.clipboard.write &&
    ClipboardItem) {
  // Clipboard available
  copyCanvasToClipboard();
} else {
  // Fallback to download
  downloadCanvasImage(canvas, 'drawing.png');
}
```

## File Naming Patterns

### Timestamp Format

```javascript
// ISO date format: YYYY-MM-DD
const date = new Date().toISOString().split('T')[0];
// Result: "2024-01-15"

// With time
const time = Date.now();
// Result: 1705332456789

// Combined
const filename = `drawing-${date}-${time}.png`;
// Result: drawing-2024-01-15-1705332456789.png
```

### User-Friendly Format

```javascript
function generateFileName(name = 'drawing') {
  const date = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).replace(/\//g, '-').replace(/[:\s]/g, '-');
  
  return `${name}-${date}.png`;
}
// Result: drawing-01-15-2024-04-32.png
```

## Tips

- Use PNG for artwork, JPEG for photos
- Blob is more efficient than data URL for large images
- Always revoke object URLs to avoid memory leaks
- Generate unique filenames to prevent overwrites
- Check browser support before using clipboard API
- Provide fallback download option if clipboard fails
- Save original canvas quality (avoid re-exporting exports)

## Common Mistakes

**Not revoking object URLs:**
```javascript
// BAD - Memory leak
for (let i = 0; i < 100; i++) {
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    // Forgot to revoke!
  });
}

// GOOD - Clean up
canvas.toBlob((blob) => {
  const url = URL.createObjectURL(blob);
  // Use URL...
  URL.revokeObjectURL(url); // Clean up!
});
```

**Large data URLs crashing browser:**
```javascript
// BAD - Data URL for large canvas
const hugeUrl = canvas.toDataURL('image/png');
// May crash browser with memory error

// GOOD - Use Blob instead
canvas.toBlob((blob) => {
  const url = URL.createObjectURL(blob);
  // More efficient
  URL.revokeObjectURL(url);
});
```

**Assuming clipboard always works:**
```javascript
// BAD - No error handling
navigator.clipboard.write([item]);

// GOOD - Handle errors and fallback
navigator.clipboard.write([item])
  .catch(() => {
    // Fallback to download
    downloadCanvasImage(canvas);
  });
```

**Losing canvas state when exporting:**
```javascript
// BAD - Clearing canvas after export
const url = canvas.toDataURL();
ctx.clearRect(0, 0, canvas.width, canvas.height);
// User can't keep drawing!

// GOOD - Export doesn't affect canvas
const url = canvas.toDataURL();
// Canvas still has drawing, user can continue
```

## Next Steps

Congratulations! You've completed Series 24 - Interactive Drawing Canvas. You now have:
- Exercise 118: Mouse click events to start/stop drawing
- Exercise 119: Mouse move to draw continuously
- Exercise 120: Color picker with event delegation
- Exercise 121: Custom events and undo functionality
- Exercise 122: Canvas export and image saving

You've built a complete, professional drawing application with all the essential features!
