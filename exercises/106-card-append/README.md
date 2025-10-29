# Exercise 106: Card Generator - Append to Page

Add cards to the DOM with appendChild. Render created elements to the page.

## Concepts

- **appendChild Method** - Add element as last child
- **insertBefore Method** - Insert before specific element
- **Adding to Parent** - Parent-child relationships
- **DOM Tree Structure** - Element hierarchy
- **Rendering Elements** - Making elements visible
- **Batch Insertion** - Adding multiple elements
- **Parent-Child Relationships** - DOM structure

## What You're Learning

Rendering elements to the page is essential for interactive applications. In this exercise, you'll:
- Use `appendChild()` to add elements
- Use `insertBefore()` for precise positioning
- Add multiple elements efficiently
- Understand DOM tree structure
- Render dynamically created elements

**Append Pattern:**
```javascript
// Add as last child
parent.appendChild(child);

// Insert before element
parent.insertBefore(newChild, referenceElement);

// Add multiple
children.forEach(child => parent.appendChild(child));
```

## Challenge

Implement functions to add cards to containers. Render created elements to the page.

## Functions to Implement

### `appendCard(container, card)`
Add a card element to a container.

**Parameters:**
- `container` - Parent element to add card to
- `card` - Card element to add

**Implementation:**
```javascript
container.appendChild(card);
```

### `appendMultipleCards(container, cards)`
Add multiple cards to container.

**Parameters:**
- `container` - Parent element
- `cards` - Array of card elements to add

**Implementation:**
```javascript
cards.forEach(card => container.appendChild(card));
```

### `insertCardBefore(container, card, beforeElement)`
Insert card before a specific element.

**Parameters:**
- `container` - Parent element
- `card` - Card to insert
- `beforeElement` - Element to insert before

**Implementation:**
```javascript
container.insertBefore(card, beforeElement);
```

### `appendCardToBody(card)`
Add card directly to page body.

**Parameters:**
- `card` - Card element to add to body

**Implementation:**
```javascript
document.body.appendChild(card);
```

### `createAndAppendCard(container, title, content, id)`
Create card and append to container in one function.

**Parameters:**
- `container` - Parent element
- `title` - Card title
- `content` - Card content
- `id` - Card ID

**Returns:**
- The created and appended card element

**Implementation Pattern:**
1. Create card element with id
2. Create header with title
3. Create content with text
4. Append header and content to card
5. Append card to container
6. Return card

## DOM Insertion Methods

**appendChild:**
```javascript
// Adds as last child
parent.appendChild(child);

// Doesn't remove from previous parent
// If child already has parent, moves it
```

**insertBefore:**
```javascript
// Inserts before referenceElement
parent.insertBefore(newChild, referenceElement);

// If referenceElement is null, acts like appendChild
parent.insertBefore(child, null);
```

**insertAdjacentElement:**
```javascript
element.insertAdjacentElement('beforeend', child);  // Like appendChild
element.insertAdjacentElement('beforebegin', child); // Before element
```

## Creating and Appending Together

**Efficient pattern:**
```javascript
function createAndAppendCard(container, title, id) {
  const card = document.createElement('div');
  card.id = id;
  card.className = 'card';
  
  const header = document.createElement('div');
  header.textContent = title;
  card.appendChild(header);
  
  container.appendChild(card);
  return card;
}
```

## Performance Considerations

**Single insertion:**
```javascript
// This causes 3 reflows
container.appendChild(card1);
container.appendChild(card2);
container.appendChild(card3);
```

**Batch insertion (more efficient):**
```javascript
const fragment = document.createDocumentFragment();
fragment.appendChild(card1);
fragment.appendChild(card2);
fragment.appendChild(card3);
container.appendChild(fragment); // One reflow
```

## DOM Tree Structure

```
body
├── div#container
│   ├── div.card#card-1
│   │   ├── div.card-header
│   │   └── div.card-content
│   └── div.card#card-2
│       ├── div.card-header
│       └── div.card-content
└── script
```

## Tips

- `appendChild()` moves elements if they have parent
- `insertBefore()` with null reference acts like `appendChild()`
- Elements can only have one parent at a time
- Use DocumentFragment for batch insertions
- Return created elements for further manipulation
- Check if element exists before appending

## Moving vs Copying

```javascript
// Moving (element leaves old parent)
container.appendChild(element);

// Copying (need to clone)
container.appendChild(element.cloneNode(true));
```

## Next Steps

Once complete, move to [exercise 107](../107-card-remove) where you'll delete cards from the DOM.
