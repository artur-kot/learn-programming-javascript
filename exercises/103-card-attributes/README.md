# Exercise 105: Card Generator - Set Attributes

Add classes, IDs, and data attributes to elements. Learn attribute management for styling and data storage.

## Concepts

- **Setting className** - Apply CSS classes
- **Setting id Attribute** - Unique element identifiers
- **Data Attributes (data-*)** - Store custom data
- **setAttribute Method** - Generic attribute setter
- **getAttribute Method** - Generic attribute getter
- **classList API** - Class manipulation
- **Attribute Naming** - Naming conventions and rules

## What You're Learning

Attributes are essential for styling, identification, and data storage. In this exercise, you'll:
- Add CSS classes to elements
- Set unique IDs
- Use data attributes for custom data
- Understand attribute management
- Combine attributes with styling

**Attribute Pattern:**
```javascript
// Set class
element.className = 'card';
element.classList.add('card');

// Set ID
element.id = 'card-1';

// Set data attribute
element.dataset.type = 'product';
element.setAttribute('data-id', '123');

// Get data attribute
const type = element.dataset.type;
const id = element.getAttribute('data-id');
```

## Challenge

Implement functions to set and manage element attributes. Create styled cards with IDs and data attributes.

## Functions to Implement

### `addCardClass(element, className)`
Add a class to a card element.

**Parameters:**
- `element` - Element to modify
- `className` - Class name to add

**Implementation:**
```javascript
element.classList.add(className);
```

### `setCardId(element, id)`
Set an ID on a card element.

**Parameters:**
- `element` - Element to modify
- `id` - ID value to set

**Implementation:**
```javascript
element.id = id;
```

### `addDataAttribute(element, key, value)`
Add a data attribute to an element.

**Parameters:**
- `element` - Element to modify
- `key` - Data attribute key (without 'data-' prefix)
- `value` - Data attribute value

**Implementation:**
```javascript
element.dataset[key] = value;
// Or: element.setAttribute(`data-${key}`, value);
```

**Result:**
- `data-key="value"` attribute on element

### `getDataAttribute(element, key)`
Get a data attribute value.

**Parameters:**
- `element` - Element to read from
- `key` - Data attribute key (without 'data-' prefix)

**Returns:**
- Attribute value, or null if not set

**Implementation:**
```javascript
return element.getAttribute(`data-${key}`);
```

### `createStyledCard(title, content, id, className, dataAttrs)`
Create card with class, ID, and data attributes.

**Parameters:**
- `title` - Card header text
- `content` - Card content text
- `id` - ID for the card element
- `className` - CSS class(es) for the card
- `dataAttrs` - Object with data attributes:
  ```javascript
  {
    type: 'product',
    priority: 'high'
  }
  ```

**Returns:**
- Card object with styled elements:
  ```javascript
  {
    card: <div with ID, class, and data-*>,
    header: <div with title>,
    content: <div with content>
  }
  ```

## Working with Attributes

**Setting attributes:**
```javascript
element.className = 'card';           // Direct property
element.id = 'card-1';                // Direct property
element.dataset.type = 'product';     // Dataset API
element.setAttribute('role', 'button'); // Generic method
```

**Getting attributes:**
```javascript
const className = element.className;
const id = element.id;
const type = element.dataset.type;
const role = element.getAttribute('role');
```

## Data Attributes

**Syntax:**
```javascript
// HTML: <div data-id="123" data-name="test"></div>

// JavaScript access:
element.dataset.id;      // "123"
element.dataset.name;    // "test"

// Setting:
element.dataset.id = '456';
```

**Naming:**
- Data attributes start with `data-`
- JavaScript accesses without `data-` prefix
- Keys use camelCase in dataset (data-my-key → dataset.myKey)

## classList vs className

**className:**
```javascript
element.className = 'card';        // Replaces all classes
element.className += ' dark';      // Append (risky)
```

**classList (Preferred):**
```javascript
element.classList.add('card');           // Add class
element.classList.remove('card');        // Remove class
element.classList.toggle('dark');        // Toggle class
element.classList.contains('card');      // Check class
```

## Practical Example

**Creating a styled card:**
```javascript
function createCard(id, title, type) {
  const card = document.createElement('div');
  card.id = id;
  card.className = 'card';
  card.dataset.type = type;
  
  const header = document.createElement('div');
  header.textContent = title;
  
  card.appendChild(header);
  return card;
}

const card = createCard('card-1', 'My Card', 'product');
```

## Tips

- Use `classList` for class management
- Use `dataset` for data attributes
- IDs should be unique on page
- Data attributes store custom data
- Combine attributes for styling with data
- Use `getAttribute` for non-standard attributes

## Styling with Classes

```css
.card {
  padding: 20px;
}

.card.featured {
  border: 2px solid gold;
  background: lightyellow;
}

.card.premium {
  background: linear-gradient(...);
}
```

```javascript
createStyledCard('Title', 'Content', 'card-1', 'card featured', { type: 'product' });
```

## Next Steps

Once complete, move to [exercise 106](../106-card-append) where you'll add cards to the page using appendChild.
