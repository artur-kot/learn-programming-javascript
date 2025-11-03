# Exercise 110: Interactive Counter - Multiple Buttons

Add increment, decrement, and reset buttons with different actions.

## Concepts

- **Multiple Event Listeners** - Attach listeners to multiple elements
- **Conditional Logic** - Different actions for different buttons
- **Button Identification** - Know which button was clicked
- **Different Actions per Button** - Increment, decrement, reset
- **Event Target Checking** - Identify button via event.target or ID
- **Counter Operations** - Multiple operations on same counter
- **UI State Management** - Keep display in sync with state

## What You're Learning

Real applications need multiple buttons with different actions. In this exercise, you'll:
- Add listeners to multiple buttons
- Implement different operations (increment, decrement, reset)
- Execute appropriate action based on which button clicked
- Update display after each operation
- Manage counter state through multiple operations

**Multiple Button Pattern:**
```javascript
const incrementBtn = document.getElementById('increment-btn');
const decrementBtn = document.getElementById('decrement-btn');
const resetBtn = document.getElementById('reset-btn');

incrementBtn.addEventListener('click', () => {
  counter++;
  display.textContent = counter;
});

decrementBtn.addEventListener('click', () => {
  counter--;
  display.textContent = counter;
});

resetBtn.addEventListener('click', () => {
  counter = 0;
  display.textContent = counter;
});
```

## Challenge

Implement functions to handle increment, decrement, and reset operations. Add event listeners to multiple buttons.

## Functions to Implement

### `decrementCounter(counter)`
Decrease counter by 1.

**Parameters:**
- `counter` - Counter object with count property

**Implementation:**
```javascript
counter.count--;
```

### `resetCounter(counter)`
Reset counter to 0.

**Parameters:**
- `counter` - Counter object

**Implementation:**
```javascript
counter.count = 0;
```

### `getCountValue(counter)`
Get current counter value.

**Parameters:**
- `counter` - Counter object

**Returns:**
- Current count

**Implementation:**
```javascript
return counter.count;
```

### `updateCountDisplay(display, count)`
Update display element with count value.

**Parameters:**
- `display` - Display DOM element
- `count` - Count to display

**Implementation:**
```javascript
display.textContent = count;
```

### `setupCounterButtons(incrementBtn, decrementBtn, resetBtn, display, counter)`
Setup event listeners for all three buttons.

**Parameters:**
- `incrementBtn` - Increment button element
- `decrementBtn` - Decrement button element
- `resetBtn` - Reset button element
- `display` - Display element
- `counter` - Counter object

**Implementation Pattern:**
```javascript
incrementBtn.addEventListener('click', () => {
  counter.count++;
  updateCountDisplay(display, getCountValue(counter));
});

decrementBtn.addEventListener('click', () => {
  decrementCounter(counter);
  updateCountDisplay(display, getCountValue(counter));
});

resetBtn.addEventListener('click', () => {
  resetCounter(counter);
  updateCountDisplay(display, getCountValue(counter));
});
```

## Counter Operations

**Increment:**
```javascript
function incrementCounter(counter) {
  counter.count++;
}
```

**Decrement:**
```javascript
function decrementCounter(counter) {
  counter.count--;
}
```

**Reset:**
```javascript
function resetCounter(counter) {
  counter.count = 0;
}
```

## Organizing Multiple Listeners

**Pattern 1 - Separate listeners:**
```javascript
button1.addEventListener('click', handler1);
button2.addEventListener('click', handler2);
button3.addEventListener('click', handler3);
```

**Pattern 2 - Shared function with conditional:**
```javascript
function handleClick(event) {
  if (event.target === incrementBtn) {
    counter++;
  } else if (event.target === decrementBtn) {
    counter--;
  }
}

incrementBtn.addEventListener('click', handleClick);
decrementBtn.addEventListener('click', handleClick);
```

**Pattern 3 - Setup function:**
```javascript
function setupButtons(btn1, btn2, btn3) {
  btn1.addEventListener('click', () => { /* action 1 */ });
  btn2.addEventListener('click', () => { /* action 2 */ });
  btn3.addEventListener('click', () => { /* action 3 */ });
}
```

## Keeping Display in Sync

**After each action:**
```javascript
incrementBtn.addEventListener('click', () => {
  counter.count++;
  display.textContent = counter.count; // Update display
});
```

**Helper function:**
```javascript
function updateDisplay() {
  display.textContent = counter.count;
}

incrementBtn.addEventListener('click', () => {
  counter.count++;
  updateDisplay();
});
```

## Testing Multiple Buttons

**In tests:**
```javascript
incrementBtn.click();
expect(counter.count).toBe(1);

decrementBtn.click();
expect(counter.count).toBe(0);

resetBtn.click();
expect(counter.count).toBe(0);
```

## Tips

- Attach listeners to each button separately
- Keep counter state in one place
- Update display after every state change
- Test each button independently
- Test button sequences
- Keep handler functions focused on one action
- Use meaningful button IDs for debugging
- Remember to call update function after operations

## Common Patterns

**Three operation counter:**
```javascript
const counter = { count: 0 };

incrementBtn.addEventListener('click', () => {
  counter.count++;
  display.textContent = counter.count;
});

decrementBtn.addEventListener('click', () => {
  counter.count--;
  display.textContent = counter.count;
});

resetBtn.addEventListener('click', () => {
  counter.count = 0;
  display.textContent = counter.count;
});
```

**With helper functions:**
```javascript
const counter = { count: 0 };

function updateDisplay() {
  display.textContent = counter.count;
}

incrementBtn.addEventListener('click', () => {
  counter.count++;
  updateDisplay();
});

decrementBtn.addEventListener('click', () => {
  counter.count--;
  updateDisplay();
});

resetBtn.addEventListener('click', () => {
  counter.count = 0;
  updateDisplay();
});
```

## Next Steps

Once complete, move to [exercise 111](../111-counter-keyboard) where you'll use keyboard events to control the counter.
