# Exercise 102: Theme Switcher - Save Preference

Save theme preference to localStorage. Learn to persist user choices across browser sessions.

## Concepts

- **localStorage API** - Browser's persistent storage
- **setItem() Method** - Save key-value pairs
- **getItem() Method** - Retrieve saved values
- **removeItem() Method** - Delete stored data
- **JSON Serialization** - Storing complex objects
- **Persistent Data** - Survives page refreshes
- **Session Persistence** - Data lives until cleared

## What You're Learning

localStorage allows you to save user preferences that persist between sessions. In this exercise, you'll:
- Save theme preferences to localStorage
- Retrieve saved preferences on page load
- Update localStorage when theme changes
- Handle JSON serialization for complex data
- Restore user experience automatically

**localStorage Pattern:**
```javascript
// Save
localStorage.setItem('theme', 'dark');

// Get
const theme = localStorage.getItem('theme');

// Remove
localStorage.removeItem('theme');

// Save object
localStorage.setItem('prefs', JSON.stringify({ theme: 'dark' }));

// Get object
const prefs = JSON.parse(localStorage.getItem('prefs'));
```

## Challenge

Implement functions to save and load theme preferences. Create a complete theme switcher where user choices persist.

## Functions to Implement

### `saveTheme(themeName)`
Save theme preference to localStorage.

**Parameters:**
- `themeName` - Theme name to save ('dark', 'light', etc.)

**Implementation:**
```javascript
localStorage.setItem('theme', themeName);
```

### `getTheme()`
Get saved theme from localStorage.

**Returns:**
- Saved theme name, or default theme if not set

**Implementation:**
```javascript
return localStorage.getItem('theme') || 'light';
```

### `removeTheme()`
Remove theme preference from storage.

**Implementation:**
```javascript
localStorage.removeItem('theme');
```

### `saveUserPreferences(preferences)`
Save multiple preferences as JSON object.

**Parameters:**
- `preferences` - Object with multiple preferences:
  ```javascript
  {
    theme: 'dark',
    fontSize: '16px',
    language: 'en'
  }
  ```

**Implementation:**
```javascript
localStorage.setItem('preferences', JSON.stringify(preferences));
```

### `getUserPreferences()`
Load preferences from localStorage.

**Returns:**
- Preferences object, or empty object if not set

**Implementation:**
```javascript
const saved = localStorage.getItem('preferences');
return saved ? JSON.parse(saved) : {};
```

## localStorage API

**Basic Methods:**
```javascript
// Save
localStorage.setItem(key, value);

// Retrieve
const value = localStorage.getItem(key);

// Delete
localStorage.removeItem(key);

// Clear all
localStorage.clear();

// Check if key exists
if (localStorage.getItem(key)) { }

// Get number of items
localStorage.length;
```

## Working with Objects

**Saving objects:**
```javascript
// Can't save directly
localStorage.setItem('user', { name: 'John' }); // Wrong!

// Must convert to JSON string
const user = { name: 'John', age: 30 };
localStorage.setItem('user', JSON.stringify(user));

// Retrieving objects
const saved = localStorage.getItem('user');
const user = JSON.parse(saved); // Convert back
```

## Common Patterns

**With defaults:**
```javascript
function getTheme() {
  return localStorage.getItem('theme') || 'light';
}
```

**Update on change:**
```javascript
themeButton.addEventListener('click', () => {
  isDark = !isDark;
  const theme = isDark ? 'dark' : 'light';
  saveTheme(theme);
  applyTheme(theme);
});
```

**Load on page startup:**
```javascript
window.addEventListener('load', () => {
  const theme = getTheme();
  applyTheme(theme);
});
```

## Storage Limits

- **Typical limit:** 5-10MB per domain
- **Persistent:** Survives page close and browser restart
- **Per-domain:** Each domain has separate storage
- **Private browsing:** May be cleared on session end
- **Shared:** Shared across all tabs of same origin

## localStorage vs sessionStorage

**localStorage:**
- ✅ Persists between sessions
- ✅ Survives browser close
- ✅ Great for preferences

**sessionStorage:**
- ✅ Clears on tab close
- ✅ Separate per tab
- ✅ Good for temporary data

```javascript
// Same API, different persistence
localStorage.setItem(key, value);
sessionStorage.setItem(key, value);
```

## Tips

- Always convert objects to JSON before saving
- Parse JSON strings back to objects when retrieving
- Use try-catch with JSON.parse for error handling
- localStorage is synchronous (don't store large amounts)
- Clear sensitive data when user logs out
- Test with empty localStorage first

## Error Handling

```javascript
try {
  const prefs = JSON.parse(localStorage.getItem('preferences'));
} catch (error) {
  // Handle invalid JSON
  console.error('Invalid preferences data');
}
```

## Next Steps

Series 20 complete! You've mastered DOM manipulation and persistence. Ready for more advanced browser features? Next series will focus on event handling and interactivity.
