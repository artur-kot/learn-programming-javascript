# Exercise 117: Live Search Filter - Event Delegation

Handle clicks on dynamically created result items using event delegation.

## Concepts

- **Event Delegation** - Single listener for multiple elements
- **Event Bubbling** - Events propagate up the DOM tree
- **event.target** - Element that triggered the event
- **closest() Method** - Find nearest ancestor matching selector
- **Dynamic Elements** - Handle elements added after page load
- **Single Listener Pattern** - One listener instead of many
- **Event Propagation** - How events travel through the DOM

## What You're Learning

Event delegation uses event bubbling to handle events on parent containers instead of individual elements. This is more efficient and works automatically with dynamic content. In this exercise, you'll:
- Attach one listener to container instead of many to items
- Use event.target to identify clicked element
- Use closest() to find parent result element
- Handle clicks on dynamically added elements
- Extract data from clicked elements
- Implement efficient event handling pattern

**Event Delegation Pattern:**
```javascript
container.addEventListener('click', (event) => {
  const resultItem = event.target.closest('.result-item');
  
  if (resultItem) {
    const data = extractData(resultItem);
    handleClick(data);
  }
});
```

## Challenge

Implement event delegation for search results, allowing clicks on any result item (even dynamically added ones) with a single event listener.

## Functions to Implement

### `isResultElement(element, className)`
Check if element is a result item.

**Parameters:**
- `element` - Element to check
- `className` - Class name to look for

**Returns:**
- Boolean

**Implementation:**
```javascript
return element && element.classList && element.classList.contains(className);
```

### `getClickedResultElement(target, containerClass)`
Find the result element that was clicked.

**Parameters:**
- `target` - Event target element
- `containerClass` - Class name of result items

**Returns:**
- Result element or null

**Implementation:**
```javascript
// Use closest to find parent with class
const resultElement = target.closest(`.${containerClass}`);
return resultElement;
```

### `getResultData(element)`
Extract data from clicked result element.

**Parameters:**
- `element` - Result element

**Returns:**
- Object with result data

**Implementation:**
```javascript
return {
  text: element.textContent.trim(),
  id: element.dataset.id,
  type: element.dataset.type
};
```

### `handleResultClick(event, callback)`
Handle click on result item.

**Parameters:**
- `event` - Click event
- `callback` - Function to call with result data

**Implementation:**
```javascript
const resultElement = getClickedResultElement(event.target, 'result-item');

if (resultElement) {
  const data = getResultData(resultElement);
  callback(data);
}
```

### `setupResultsDelegation(container, callback)`
Setup event delegation on results container.

**Parameters:**
- `container` - Container element
- `callback` - Function to call when result clicked

**Implementation:**
```javascript
container.addEventListener('click', (event) => {
  handleResultClick(event, callback);
});
```

## Event Delegation vs Direct Listeners

**Without delegation (inefficient):**
```javascript
// Add listener to each result
const results = document.querySelectorAll('.result-item');
results.forEach(result => {
  result.addEventListener('click', handleClick);
});

// Problems:
// - 100 results = 100 listeners
// - Doesn't work with dynamic elements
// - Must re-attach when results change
```

**With delegation (efficient):**
```javascript
// One listener on container
const container = document.getElementById('results');
container.addEventListener('click', (event) => {
  const result = event.target.closest('.result-item');
  if (result) handleClick(result);
});

// Benefits:
// - 1 listener for unlimited results
// - Works with dynamic elements automatically
// - No need to re-attach
```

## Event Bubbling

**How events propagate:**
```html
<div id="container">
  <div class="result-item">
    <span>Click me</span>
  </div>
</div>
```

**Click on span triggers events in order:**
```javascript
1. span (target)
2. div.result-item
3. div#container (delegation listener here!)
4. body
5. html
6. document
```

**Bubbling example:**
```javascript
container.addEventListener('click', (event) => {
  console.log('Target:', event.target);        // span
  console.log('Current:', event.currentTarget); // container
});
```

## event.target vs event.currentTarget

**target** - Element that was actually clicked:
```javascript
container.addEventListener('click', (event) => {
  console.log(event.target); // Could be span, div, etc.
});
```

**currentTarget** - Element with the listener:
```javascript
container.addEventListener('click', (event) => {
  console.log(event.currentTarget); // Always container
});
```

**Example:**
```html
<div id="container">
  <div class="item"><span>Text</span></div>
</div>
```

```javascript
container.addEventListener('click', (e) => {
  // Clicked on span:
  e.target        // <span>
  e.currentTarget // <div id="container">
});
```

## closest() Method

**Find nearest ancestor:**
```javascript
const span = document.querySelector('span');
const resultItem = span.closest('.result-item');
// Returns nearest parent with class 'result-item'
```

**vs querySelector:**
```javascript
// closest() - searches UP (ancestors)
element.closest('.result-item');

// querySelector() - searches DOWN (descendants)
element.querySelector('.result-item');
```

**With event delegation:**
```javascript
container.addEventListener('click', (event) => {
  const item = event.target.closest('.result-item');
  
  if (item) {
    // Found a result item (could be target or parent)
  }
});
```

**Check boundaries:**
```javascript
container.addEventListener('click', (event) => {
  const item = event.target.closest('.result-item');
  
  // Make sure we're still inside container
  if (item && container.contains(item)) {
    handleClick(item);
  }
});
```

## Dataset API

**HTML data attributes:**
```html
<div class="result-item" data-id="123" data-type="language">
  JavaScript
</div>
```

**Access in JavaScript:**
```javascript
const element = document.querySelector('.result-item');

element.dataset.id;    // '123'
element.dataset.type;  // 'language'

// Set values
element.dataset.selected = 'true';
// <div ... data-selected="true">
```

**Extract all data:**
```javascript
function getResultData(element) {
  return {
    id: element.dataset.id,
    type: element.dataset.type,
    text: element.textContent.trim()
  };
}
```

## Common Patterns

**Basic delegation:**
```javascript
container.addEventListener('click', (event) => {
  const item = event.target.closest('.item');
  if (item) {
    console.log('Clicked:', item.textContent);
  }
});
```

**With data extraction:**
```javascript
container.addEventListener('click', (event) => {
  const item = event.target.closest('.result-item');
  
  if (item) {
    const data = {
      id: item.dataset.id,
      text: item.textContent
    };
    handleClick(data);
  }
});
```

**Multiple event types:**
```javascript
function setupDelegation(container) {
  container.addEventListener('click', handleClick);
  container.addEventListener('mouseenter', handleHover, true);
  container.addEventListener('mouseleave', handleHover, true);
}

function handleClick(event) {
  const item = event.target.closest('.item');
  if (item) console.log('Clicked:', item);
}

function handleHover(event) {
  const item = event.target.closest('.item');
  if (item) console.log('Hover:', event.type);
}
```

**Delegation with multiple selectors:**
```javascript
container.addEventListener('click', (event) => {
  const deleteBtn = event.target.closest('.delete-btn');
  const editBtn = event.target.closest('.edit-btn');
  const item = event.target.closest('.item');
  
  if (deleteBtn) handleDelete(deleteBtn.closest('.item'));
  else if (editBtn) handleEdit(editBtn.closest('.item'));
  else if (item) handleSelect(item);
});
```

## Tips

- Use event delegation for dynamic elements
- Attach listener to stable parent container
- Use closest() to find target element
- Check if element exists before handling
- Extract data using dataset or textContent
- One listener is more efficient than many
- Works automatically with new elements
- Use stopPropagation() carefully (can break delegation)
- Consider using capture phase for some events
- Document the delegation pattern for maintainability

## Common Mistakes

**Not checking if element exists:**
```javascript
// BAD - crashes if not found
container.addEventListener('click', (event) => {
  const item = event.target.closest('.item');
  const data = item.dataset.id; // Error if item is null!
});

// GOOD - check first
container.addEventListener('click', (event) => {
  const item = event.target.closest('.item');
  if (item) {
    const data = item.dataset.id;
  }
});
```

**Stopping propagation unnecessarily:**
```javascript
// BAD - breaks delegation
item.addEventListener('click', (event) => {
  event.stopPropagation(); // Event won't reach container!
});

// Event delegation won't work because event doesn't bubble
```

**Attaching listeners to dynamic elements:**
```javascript
// BAD - doesn't work with new elements
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', handleClick);
});

// GOOD - delegation works automatically
container.addEventListener('click', (event) => {
  const item = event.target.closest('.item');
  if (item) handleClick(item);
});
```

## Next Steps

Congratulations! You've completed Series 23: Live Search Filter. You now understand:
- Input events and real-time filtering
- Form submission with preventDefault
- Debouncing for performance
- Text highlighting with regex
- Event delegation for dynamic elements

These patterns form the foundation of interactive search interfaces in modern web applications.
