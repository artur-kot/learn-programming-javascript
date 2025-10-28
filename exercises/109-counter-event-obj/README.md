# Exercise 109: Interactive Counter - Event Object

Access event object properties like target, type, and timestamp.

## Concepts

- **Event Object** - Contains information about the event
- **event.target** - The element that triggered the event
- **event.type** - The type of event (click, change, etc.)
- **event.timestamp** - When the event occurred
- **Event Properties** - Various properties available on events
- **Event Details** - Information you can extract from events
- **Debugging Events** - Understanding what happened

## What You're Learning

Every event provides detailed information through the event object. In this exercise, you'll:
- Access event object properties
- Extract the target element
- Get event type information
- Read event timestamp
- Use event details in handlers
- Debug event behavior

**Event Object Pattern:**
```javascript
button.addEventListener('click', (event) => {
  console.log(event.type);      // 'click'
  console.log(event.target);    // The button element
  console.log(event.timestamp); // Time in milliseconds
});
```

## Challenge

Implement functions to access and use event object properties. Display event details when counter increments.

## Functions to Implement

### `getEventType(event)`
Get event type from event object.

**Parameters:**
- `event` - Event object from listener

**Returns:**
- Event type string (e.g., 'click')

**Implementation:**
```javascript
return event.type;
```

### `getEventTarget(event)`
Get target element from event.

**Parameters:**
- `event` - Event object

**Returns:**
- Element that triggered the event

**Implementation:**
```javascript
return event.target;
```

### `getEventTimestamp(event)`
Get timestamp when event occurred.

**Parameters:**
- `event` - Event object

**Returns:**
- Timestamp in milliseconds

**Implementation:**
```javascript
return event.timeStamp;
```

### `logEventDetails(event)`
Log event properties to console.

**Parameters:**
- `event` - Event object

**Implementation Pattern:**
```javascript
console.log('Event Type:', event.type);
console.log('Target:', event.target);
console.log('Timestamp:', event.timeStamp);
```

### `handleClickWithDetails(event, counter)`
Handle click and return event information.

**Parameters:**
- `event` - Click event object
- `counter` - Counter object with count property

**Returns:**
- Object with event info and count

**Implementation Pattern:**
```javascript
counter.count++;
return {
  type: event.type,
  target: event.target,
  timestamp: event.timeStamp,
  count: counter.count
};
```

## Event Object Properties

**Common properties:**
```javascript
event.type;          // 'click', 'change', etc.
event.target;        // Element that triggered event
event.currentTarget; // Element with listener
event.timeStamp;     // Milliseconds since page load
event.bubbles;       // Does event bubble?
event.cancelable;    // Can default be prevented?
```

**Mouse event properties:**
```javascript
event.clientX;  // X position relative to window
event.clientY;  // Y position relative to window
event.pageX;    // X position relative to page
event.pageY;    // Y position relative to page
event.button;   // Which button clicked (0=left, 1=middle, 2=right)
```

**Keyboard event properties:**
```javascript
event.key;      // 'a', 'Enter', 'ArrowUp', etc.
event.code;     // 'KeyA', 'Enter', 'ArrowUp', etc.
event.altKey;   // Was Alt pressed?
event.ctrlKey;  // Was Ctrl pressed?
event.shiftKey; // Was Shift pressed?
```

## Event Object Uses

**Accessing the clicked element:**
```javascript
button.addEventListener('click', (event) => {
  const clickedElement = event.target;
  console.log(clickedElement.id);
  console.log(clickedElement.classList);
});
```

**Getting event details:**
```javascript
button.addEventListener('click', (event) => {
  console.log(`Event: ${event.type}`);
  console.log(`Time: ${event.timeStamp}ms`);
  console.log(`Target: ${event.target.id}`);
});
```

**Preventing default behavior:**
```javascript
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Don't actually submit
  // Handle submission manually
});
```

**Stopping event propagation:**
```javascript
button.addEventListener('click', (event) => {
  event.stopPropagation(); // Don't bubble to parent
});
```

## Debugging with Event Details

**Log complete event object:**
```javascript
button.addEventListener('click', (event) => {
  console.log(event); // See all properties
});
```

**Create event summary:**
```javascript
function logEventDetails(event) {
  console.log(`Type: ${event.type}`);
  console.log(`Target: ${event.target.tagName} #${event.target.id}`);
  console.log(`Time: ${new Date(event.timeStamp)}`);
}
```

**Track event sequence:**
```javascript
let clickCount = 0;
button.addEventListener('click', (event) => {
  clickCount++;
  console.log(`Click #${clickCount} at ${event.timeStamp}ms`);
});
```

## Tips

- Always receive event object as first parameter in handler
- Use `event.target` to find which element was clicked
- `event.type` tells you what type of event occurred
- `event.timeStamp` is useful for tracking timing
- Different event types have different properties
- Don't modify the event object (it's read-only)
- Use event properties for conditional logic
- Log events for debugging

## Common Mistakes

```javascript
// ❌ Forgetting event parameter
button.addEventListener('click', () => {
  // event is undefined!
});

// ✅ Include event parameter
button.addEventListener('click', (event) => {
  console.log(event.type);
});

// ❌ Using wrong property
console.log(event.clicked); // undefined

// ✅ Use correct property
console.log(event.type); // 'click'
```

## Next Steps

Once complete, move to [exercise 110](../110-counter-multiple) where you'll handle multiple different buttons with different actions.
