# Exercise 114: Live Search Filter - Prevent Default

Handle form submission without page reload using preventDefault.

## Concepts

- **preventDefault()** - Prevent default browser behavior
- **Form Submission** - Handle form submit events
- **Submit Event** - Triggered when form is submitted
- **Event Prevention** - Stop default actions
- **Form Handling** - Process form data without reload
- **Page Reload Prevention** - Keep user on same page
- **Event.preventDefault** - Method to prevent default behavior

## What You're Learning

By default, form submission causes page reload. Using `preventDefault()`, you can handle forms with JavaScript while staying on the same page. In this exercise, you'll:
- Listen for form submit events
- Prevent page reload with preventDefault
- Extract form data
- Process search without navigation
- Maintain user experience without interruption

**preventDefault Pattern:**
```javascript
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Stop page reload
  
  // Now handle the form data
  const formData = new FormData(event.target);
  const query = formData.get('search');
  performSearch(query);
});
```

## Challenge

Implement form submission handling that prevents page reload and performs search in-place.

## Functions to Implement

### `preventFormSubmit(event)`
Prevent default form submission behavior.

**Parameters:**
- `event` - Submit event object

**Implementation:**
```javascript
event.preventDefault();
```

### `getFormData(form)`
Extract search query from form.

**Parameters:**
- `form` - Form element

**Returns:**
- Object with form data (e.g., `{ query: 'search term' }`)

**Implementation:**
```javascript
const formData = new FormData(form);
return {
  query: formData.get('query') || ''
};
```

### `clearSearchForm(form)`
Clear form inputs.

**Parameters:**
- `form` - Form element to clear

**Implementation:**
```javascript
form.reset();
```

### `handleSearchSubmit(event, items, resultsContainer)`
Handle form submission and perform search.

**Parameters:**
- `event` - Submit event
- `items` - Items to search
- `resultsContainer` - Container for results

**Implementation Pattern:**
```javascript
preventFormSubmit(event);

const form = event.target;
const data = getFormData(form);
const searchTerm = data.query.toLowerCase();

const filtered = items.filter(item =>
  item.toLowerCase().includes(searchTerm)
);

displayResults(resultsContainer, filtered);
```

### `setupFormListener(form, items, resultsContainer)`
Setup submit event listener on form.

**Parameters:**
- `form` - Form element
- `items` - Items to search
- `resultsContainer` - Container for results

**Implementation:**
```javascript
form.addEventListener('submit', (event) => {
  handleSearchSubmit(event, items, resultsContainer);
});
```

## Form Submission Events

**Submit Event:**
```javascript
// Triggered when:
// 1. User clicks submit button
// 2. User presses Enter in input field
// 3. Form.submit() is called (doesn't trigger event!)

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Essential!
  // Handle submission
});
```

**Default Behavior:**
```javascript
// Without preventDefault:
<form action="/search" method="GET">
  <input name="q">
  <button>Search</button>
</form>

// Submitting navigates to: /search?q=query
// Page reloads!
```

**With preventDefault:**
```javascript
form.addEventListener('submit', (e) => {
  e.preventDefault(); // No navigation!
  
  const formData = new FormData(e.target);
  const query = formData.get('q');
  // Handle search with JavaScript
});
```

## FormData API

**Extract form values:**
```javascript
const form = document.getElementById('search-form');
const formData = new FormData(form);

// Get single value
const query = formData.get('query');

// Get all values for a name
const tags = formData.getAll('tags');

// Check if field exists
if (formData.has('query')) {
  // Field exists
}

// Convert to object
const data = Object.fromEntries(formData);
// { query: 'search term', category: 'all' }
```

**Multiple fields:**
```javascript
<form id="search-form">
  <input name="query" value="javascript">
  <select name="category">
    <option value="all">All</option>
  </select>
</form>

const formData = new FormData(form);
const data = {
  query: formData.get('query'),      // 'javascript'
  category: formData.get('category') // 'all'
};
```

## Form Methods

**Reset form:**
```javascript
form.reset(); // Clear all inputs
```

**Programmatic submission:**
```javascript
// Does NOT trigger submit event!
form.submit();

// To trigger submit event, dispatch it:
form.dispatchEvent(new Event('submit'));
```

**Check validity:**
```javascript
if (form.checkValidity()) {
  // Form is valid
} else {
  form.reportValidity(); // Show validation messages
}
```

## Common Patterns

**Basic form handling:**
```javascript
const form = document.getElementById('search-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const formData = new FormData(form);
  const query = formData.get('query');
  
  performSearch(query);
});
```

**With validation:**
```javascript
form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  
  const formData = new FormData(form);
  processForm(formData);
});
```

**Multiple submit handlers:**
```javascript
form.addEventListener('submit', validateForm);
form.addEventListener('submit', submitForm);

function validateForm(event) {
  if (!isValid()) {
    event.preventDefault();
  }
}

function submitForm(event) {
  event.preventDefault();
  // Only runs if validation passes
}
```

## preventDefault vs stopPropagation

**preventDefault():**
```javascript
// Prevents browser's default action
event.preventDefault();
// - Forms: Prevents navigation
// - Links: Prevents navigation
// - Checkboxes: Prevents checking
```

**stopPropagation():**
```javascript
// Stops event from bubbling up
event.stopPropagation();
// Event won't reach parent elements
```

**Both:**
```javascript
event.preventDefault();
event.stopPropagation();
// Prevent default AND stop bubbling
```

## Tips

- Always call preventDefault() first in submit handler
- Use FormData API for easy value extraction
- Form reset() clears all inputs
- Submit event fires on Enter key press
- Programmatic form.submit() doesn't trigger event
- Can have multiple submit event listeners
- Check form.checkValidity() before processing
- preventDefault works on any event (click, keydown, etc.)

## Common Mistakes

**Forgetting preventDefault:**
```javascript
// BAD - Page reloads!
form.addEventListener('submit', (event) => {
  const query = getFormData(form);
  search(query);
});

// GOOD - No reload
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = getFormData(form);
  search(query);
});
```

**Using form.submit():**
```javascript
// Does NOT trigger submit event
form.submit();

// Use this to trigger event:
form.dispatchEvent(new Event('submit'));
```

## Next Steps

Once complete, move to [exercise 115](../115-search-debounce) where you'll implement debounce logic for delayed search.
