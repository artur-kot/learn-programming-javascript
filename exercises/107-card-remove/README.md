# Exercise 107: Card Generator - Remove Cards

Delete cards from the DOM. Manage element lifecycle and cleanup.

## Concepts

- **removeChild Method** - Remove child from parent
- **remove Method** - Remove element directly
- **Element Deletion** - Removing from DOM tree
- **Removing by ID** - Query and remove specific elements
- **Removing by Class** - Batch removal by selector
- **Removing All Children** - Clear container
- **Element Lifecycle** - Creation to cleanup
- **Cleanup Operations** - Memory management

## What You're Learning

Managing element removal is as important as creation. In this exercise, you'll:
- Use `removeChild()` to delete elements
- Use `remove()` method directly
- Remove elements by ID
- Remove elements by class
- Replace elements in the DOM
- Understand element lifecycle

**Removal Patterns:**
```javascript
// Remove from parent
parent.removeChild(child);

// Remove directly
element.remove();

// Remove by ID
document.getElementById('id').remove();

// Remove all children
while (parent.firstChild) {
  parent.removeChild(parent.firstChild);
}
```

## Challenge

Implement functions to delete cards from the page. Manage element cleanup and removal.

## Functions to Implement

### `removeCard(card)`
Remove a specific card element.

**Parameters:**
- `card` - Card element to remove

**Implementation:**
```javascript
if (card.parentNode) {
  card.parentNode.removeChild(card);
}
```

**Alternative:**
```javascript
card.remove();
```

### `removeAllCards(container)`
Remove all cards from a container.

**Parameters:**
- `container` - Parent element to clear

**Implementation (Method 1 - While loop):**
```javascript
while (container.firstChild) {
  container.removeChild(container.firstChild);
}
```

**Implementation (Method 2 - innerHTML):**
```javascript
container.innerHTML = '';
```

### `removeCardById(container, id)`
Find and remove card by ID.

**Parameters:**
- `container` - Parent element to search in
- `id` - ID of card to remove

**Implementation:**
```javascript
const card = container.querySelector(`#${id}`);
if (card) {
  card.remove();
}
```

### `removeCardsByClass(container, className)`
Remove all cards with a specific class.

**Parameters:**
- `container` - Parent element
- `className` - Class name to match

**Implementation:**
```javascript
const cards = container.querySelectorAll(`.${className}`);
cards.forEach(card => card.remove());
```

### `replaceCard(container, oldCard, newCard)`
Replace one card with another.

**Parameters:**
- `container` - Parent element
- `oldCard` - Card to replace
- `newCard` - Card to insert

**Implementation:**
```javascript
container.replaceChild(newCard, oldCard);
```

## Removal Methods

**removeChild:**
```javascript
// Must call on parent
parent.removeChild(child);

// Requires knowing parent
element.parentNode.removeChild(element);
```

**remove:**
```javascript
// Call on element directly
element.remove();

// No need to know parent
// Supported in all modern browsers
```

**replaceChild:**
```javascript
// Replace old with new
parent.replaceChild(newElement, oldElement);

// Maintains position in DOM
```

**innerHTML:**
```javascript
// Clear all children
element.innerHTML = '';

// Fast but loses references
// Breaks event listeners on removed elements
```

## Element Lifecycle

```javascript
// 1. Create
const card = document.createElement('div');

// 2. Configure
card.id = 'card-1';
card.className = 'card';

// 3. Add to DOM
container.appendChild(card);

// 4. (Element is in the DOM tree)

// 5. Remove from DOM
card.remove();

// 6. (Element still in memory but not in DOM)

// 7. Garbage collection (if no references)
```

## Performance Considerations

**Removing multiple elements:**
```javascript
// Slow - reflows after each removal
cards.forEach(card => card.remove());

// Better - collect and remove
const toRemove = document.querySelectorAll('.removable');
toRemove.forEach(card => card.remove());
```

**Clearing container:**
```javascript
// Method 1 - Fast and simple
container.innerHTML = '';

// Method 2 - Keep element
while (container.firstChild) {
  container.removeChild(container.firstChild);
}
```

## Memory Management

**Important:** Removing from DOM doesn't automatically delete from memory:

```javascript
const card = document.createElement('div');
container.appendChild(card);

// Later...
card.remove();

// `card` variable still exists in memory
// Browser can't garbage collect until no references remain
card = null; // Now eligible for garbage collection
```

**Event Listeners:**
```javascript
const button = document.createElement('button');
button.addEventListener('click', handler);
container.appendChild(button);

// Remove from DOM
button.remove();

// Listener still in memory (depending on browser)
// Best practice: remove listeners before removing
button.removeEventListener('click', handler);
```

## Querying Before Removal

**Finding specific elements:**
```javascript
// By ID
document.getElementById('card-1').remove();

// By class
document.querySelectorAll('.removable').forEach(el => el.remove());

// By selector
container.querySelector('.card:first-child').remove();

// By attribute
document.querySelector('[data-id="5"]').remove();
```

## Tips

- Prefer `remove()` for simplicity in modern browsers
- Use `removeChild()` when you need to keep parent reference
- Check if element has parent before removing
- Remove event listeners before removing elements
- Use `innerHTML = ''` for clearing large numbers of children
- Save references if you need to undo removal
- Consider animations before removal
- Test removal doesn't leave orphaned listeners

## Series 21 Complete

You've now implemented the complete card generator lifecycle:
- 103: Create elements with `createElement()`
- 104: Populate with content (`textContent`, `innerHTML`)
- 105: Style with attributes (`classList`, `id`, `dataset`)
- 106: Add to page with `appendChild()`
- 107: Remove from page with `remove()` and `removeChild()`

Congratulations on mastering DOM manipulation!
