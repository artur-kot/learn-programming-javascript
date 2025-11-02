# Exercise 108: Interactive Counter - Click Event

Build a click counter to learn event listeners and basic event handling.

## Concepts

- **Event Listeners** - Monitor for events on elements
- **Click Events** - Detect user clicks on buttons
- **addEventListener Method** - Attach listeners to elements
- **Event Handlers** - Functions that respond to events
- **Function Callbacks** - Functions passed to event listeners
- **DOM Updates** - Modify display on event
- **State Management** - Track counter value

## What You're Learning

Event listeners are fundamental to interactive web applications. In this exercise, you'll:
- Add click listeners to buttons
- Create event handler functions
- Update the DOM in response to events
- Manage counter state
- Understand event-driven programming

**Click Event Pattern:**
```javascript
// Add click listener to button
button.addEventListener('click', () => {
  // Handle click
});

// Handler function receives event object
button.addEventListener('click', (event) => {
  console.log(event); // Access event details
});
```

## Challenge

Implement functions to create a counter that increments on button click. Track and display the count.

## Functions to Implement

### `createCounter(initialValue = 0)`
Create counter object with initial value.

**Parameters:**
- `initialValue` - Starting count (default 0)

**Returns:**
- Counter object (could be object, class, or closure)

**Implementation Pattern:**
```javascript
export function createCounter(initialValue = 0) {
  let count = initialValue;
  return {
    increment: () => { count++; },
    getCount: () => count
  };
}
```

### `incrementCounter(counter)`
Increment counter value by 1.

**Parameters:**
- `counter` - Counter object from createCounter

**Implementation:**
```javascript
counter.increment();
// or if using a different pattern
```

### `getCount(counter)`
Get current counter value.

**Parameters:**
- `counter` - Counter object

**Returns:**
- Current count

**Implementation:**
```javascript
return counter.count;
// or counter.getCount()
```

### `updateDisplay(display, count)`
Update display element with current count.

**Parameters:**
- `display` - Display DOM element
- `count` - Count to display

**Implementation:**
```javascript
display.textContent = count;
```

### `setupCounter(button, display, counter)`
Add click listener to button that increments counter.

**Parameters:**
- `button` - Button DOM element
- `display` - Display DOM element
- `counter` - Counter object

**Implementation Pattern:**
```javascript
button.addEventListener('click', () => {
  incrementCounter(counter);
  updateDisplay(display, getCount(counter));
});
```

## Event Listeners Explained

**Adding a listener:**
```javascript
element.addEventListener(eventType, handler);

// Examples
button.addEventListener('click', handleClick);
input.addEventListener('change', handleChange);
window.addEventListener('scroll', handleScroll);
```

**Event object:**
```javascript
button.addEventListener('click', (event) => {
  event.target;        // The clicked element
  event.type;          // 'click'
  event.timestamp;     // When it occurred
  event.preventDefault(); // Stop default behavior
  event.stopPropagation(); // Stop bubbling
});
```

**Handler function patterns:**
```javascript
// Anonymous function
button.addEventListener('click', () => {
  counter++;
});

// Named function
function handleClick(event) {
  counter++;
}
button.addEventListener('click', handleClick);

// Arrow function
button.addEventListener('click', (e) => {
  counter++;
});
```

## Counter State Management

**Simple counter:**
```javascript
let count = 0;

function increment() {
  count++;
}

function getCount() {
  return count;
}
```

**Object-based counter:**
```javascript
const counter = {
  count: 0,
  increment() {
    this.count++;
  },
  getCount() {
    return this.count;
  }
};
```

**Closure-based counter:**
```javascript
function createCounter() {
  let count = 0;
  
  return {
    increment: () => count++,
    getCount: () => count
  };
}
```

## Updating the DOM

**On each click:**
```javascript
button.addEventListener('click', () => {
  count++;
  display.textContent = count;
});
```

**Efficiency consideration:**
```javascript
// Update only when needed
let previousCount = count;
count++;
if (count !== previousCount) {
  display.textContent = count;
}
```

## Tips

- Store counter value in a variable or object
- Update display after incrementing
- Event handlers are called with event object
- Use `event.target` to access clicked element
- Remove listeners when no longer needed (covered in exercise 112)
- Test handler called correct number of times
- Keep state separate from DOM

## Common Patterns

**Event listener setup:**
```javascript
const button = document.getElementById('btn');
const display = document.getElementById('display');
let count = 0;

button.addEventListener('click', () => {
  count++;
  display.textContent = count;
});
```

**With event object:**
```javascript
button.addEventListener('click', (e) => {
  console.log('Button clicked:', e.target);
  count++;
  display.textContent = count;
});
```

## Next Steps

Once complete, move to [exercise 109](../109-counter-event-obj) where you'll access event object properties.
