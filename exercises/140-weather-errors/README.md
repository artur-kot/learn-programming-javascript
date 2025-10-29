# Exercise 140: Weather Dashboard - Error Handling

Master **error handling** for robust API applications. Learn to handle network errors, validate data, and provide meaningful feedback to users.

## Overview

Real-world applications must handle errors gracefully. This exercise teaches you error handling patterns for reliable code.

### What You'll Learn

- **Try-catch blocks**: Handle errors in async code
- **Status checking**: Validate HTTP responses
- **Data validation**: Ensure correct data structure
- **Error recovery**: Provide defaults and fallbacks
- **Error messages**: Transform errors for users
- **Retry logic**: Recover from transient errors

## Key Concepts

### Try-Catch for Async

```javascript
// Catch network and parse errors
async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    // Catches: network errors, JSON parse errors
    console.error(error);
  }
}
```

### Status Checking

```javascript
// HTTP errors don't automatically throw!
const response = await fetch(url);

if (!response.ok) {
  // response.ok is false for 4xx, 5xx
  throw new Error(`HTTP ${response.status}`);
}

const data = await response.json();
```

### Validation

```javascript
function validateWeather(data) {
  if (!data.current) {
    return { valid: false, message: 'Missing current' };
  }
  if (!data.current.temperature_2m) {
    return { valid: false, message: 'Missing temperature' };
  }
  return { valid: true };
}
```

### Safe Parsing

```javascript
// Try-catch for JSON parse
function safeJsonParse(jsonStr) {
  try {
    return JSON.parse(jsonStr);
  } catch (error) {
    return null; // Return null instead of throwing
  }
}
```

### Safe Nested Access

```javascript
// Avoid error on missing properties
function getProperty(obj, path) {
  return path.split('.').reduce((current, prop) => {
    return current?.[prop]; // Optional chaining
  }, obj);
}
```

### Error Recovery with Defaults

```javascript
async function fetchWithDefault(url, defaultValue) {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error('Using default:', error);
    return defaultValue; // Graceful fallback
  }
}
```

### Retry Logic

```javascript
async function retryFetch(url, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      // Wait before retrying
      await new Promise(r => setTimeout(r, 1000 * attempt));
    }
  }
}
```

## Exercise Tasks

### Task 1: Fetch with Error Handling

Implement `fetchWithErrorHandling`:
- Make fetch request with try-catch
- Return `{ error: false, data: ... }` on success
- Return `{ error: true, message: '...' }` on failure

```javascript
const result = await fetchWithErrorHandling(url);
if (result.error) {
  console.error(result.message);
} else {
  console.log(result.data);
}
```

### Task 2: Validate Weather Data

Implement `validateWeatherData`:
- Check for `current` object
- Check for `current.temperature_2m`
- Return `{ valid: true/false, message: '...' }`

```javascript
const validation = validateWeatherData(data);
if (!validation.valid) {
  console.error(validation.message);
}
```

### Task 3: Fetch with Status Check

Implement `fetchWithStatusCheck`:
- Check `response.ok` before parsing
- Throw error on 4xx/5xx status
- Return parsed data on success

```javascript
const data = await fetchWithStatusCheck(url);
```

### Task 4: Safe JSON Parse

Implement `safeJsonParse`:
- Try to parse JSON string
- Return parsed object on success
- Return null on parse error (don't throw)

```javascript
const data = safeJsonParse(jsonString);
if (data === null) {
  console.log('Invalid JSON');
}
```

### Task 5: Safe Nested Access

Implement `getNestedValue`:
- Navigate object using dot-notation path
- Return undefined if not found (don't throw)
- Handle missing intermediate properties

```javascript
const value = getNestedValue(obj, 'current.temperature_2m');
// Returns value or undefined, never throws
```

### Task 6: Fetch with Default

Implement `fetchWithDefaultValue`:
- Fetch data from URL
- Return parsed data on success
- Return default value if error

```javascript
const data = await fetchWithDefaultValue(url, defaultValue);
// Always returns something useful
```

### Task 7: Validate Coordinates

Implement `validateCoordinates`:
- Check latitude (-90 to 90)
- Check longitude (-180 to 180)
- Return `{ valid: true/false, message: '...' }`

```javascript
const validation = validateCoordinates(40.7128, -74.0060);
if (!validation.valid) console.error(validation.message);
```

### Task 8: Handle API Errors

Implement `handleApiError`:
- Transform error into user-friendly message
- Distinguish error types (network, parse, validation, etc)
- Return helpful string message

```javascript
try {
  await fetch(url);
} catch (error) {
  const userMessage = handleApiError(error);
  showAlert(userMessage); // Show to user
}
```

### Task 9: Retry on Error

Implement `retryOnError`:
- Retry fetch up to maxAttempts times
- Only retry on network errors
- Return data on success

```javascript
const data = await retryOnError(url, 3);
// Automatically retries on network failure
```

### Task 10: Multiple with Errors

Implement `fetchMultipleWithErrorHandling`:
- Fetch multiple URLs
- Handle each individually
- Return array of `{ success, data, error }` objects

```javascript
const results = await fetchMultipleWithErrorHandling(urls);
results.forEach(result => {
  if (result.success) {
    console.log(result.data);
  } else {
    console.error(result.error);
  }
});
```

## Real-World Examples

### Weather App with Fallback

```javascript
async function getWeatherOrUseDefault(latitude, longitude) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!data.current?.temperature_2m) {
      throw new Error('Invalid response format');
    }

    return data;
  } catch (error) {
    console.error('Weather fetch failed:', error);
    
    // Return sensible default
    return {
      current: {
        temperature_2m: 15,
        weather_code: 0
      }
    };
  }
}
```

### Resilient Multi-Request

```javascript
async function fetchMultipleWithFallback(urls, fallbackData = []) {
  const results = await Promise.allSettled(
    urls.map(url =>
      fetch(url)
        .then(r => r.json())
        .catch(error => {
          console.error(`Failed to fetch ${url}:`, error);
          return null;
        })
    )
  );

  return results
    .map((r, i) => r.status === 'fulfilled' ? r.value : null)
    .filter(v => v !== null);
}
```

### Data Validation Pipeline

```javascript
async function fetchAndValidate(url) {
  try {
    // Fetch
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    // Parse
    const data = await response.json();

    // Validate
    const validation = validateWeatherData(data);
    if (!validation.valid) throw new Error(validation.message);

    return data;
  } catch (error) {
    const message = handleApiError(error);
    console.error('Data retrieval failed:', message);
    return null;
  }
}
```

## Best Practices

### 1. Always Check Status

```javascript
// ✓ GOOD
const response = await fetch(url);
if (!response.ok) throw new Error(`HTTP ${response.status}`);

// ❌ WRONG - Ignores HTTP errors
const data = await fetch(url).then(r => r.json());
```

### 2. Validate Before Using

```javascript
// ✓ GOOD
const data = await response.json();
if (!data.current?.temperature_2m) {
  throw new Error('Missing required field');
}

// ❌ WRONG - Crashes if field missing
const temp = data.current.temperature_2m;
```

### 3. Provide Helpful Error Messages

```javascript
// ✓ GOOD - Clear what went wrong
function handleApiError(error) {
  if (error.name === 'TypeError') {
    return 'Network error. Check your connection.';
  }
  if (error instanceof SyntaxError) {
    return 'Server returned invalid data.';
  }
  return `Error: ${error.message}`;
}

// ❌ UNCLEAR
console.error(error); // Confusing to user
```

### 4. Use Retry for Transient Errors

```javascript
// ✓ GOOD - Recovers from temporary failures
async function robustFetch(url) {
  for (let i = 0; i < 3; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) break; // Don't retry HTTP errors
      return response.json();
    } catch (error) {
      if (i === 2) throw error;
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}
```

## Common Mistakes

```javascript
// ❌ WRONG - Assumes fetch always fails or succeeds
fetch(url).then(r => r.json());

// ✓ RIGHT - Handles all error cases
try {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
} catch (error) {
  console.error(error);
}

// ❌ WRONG - Ignores validation
const temp = data.current.temperature_2m;

// ✓ RIGHT - Validates structure
const temp = data?.current?.temperature_2m;
if (temp === undefined) throw new Error('Missing temperature');

// ❌ WRONG - No recovery strategy
await fetch(url);

// ✓ RIGHT - Graceful degradation
const data = await fetchWithDefault(url, { temperature: 15 });
```

## Summary

Error handling principles:

✅ Use try-catch for network and parse errors
✅ Always check `response.ok` status
✅ Validate data structure before using
✅ Provide sensible default values
✅ Transform errors into user-friendly messages
✅ Implement retry logic for reliability
✅ Handle each error type appropriately
✅ Log errors for debugging

Next exercise: You'll learn to **display formatted data** to the UI!
