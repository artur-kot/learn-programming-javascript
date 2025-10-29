# Exercise 138: Weather Dashboard - Basic Fetch API

Master the **Fetch API** by making HTTP requests to weather services. Learn how to fetch remote data and work with promises.

## Overview

In this exercise, you'll learn the fundamental Fetch API for making HTTP requests. Instead of using callbacks, Fetch uses modern promises to handle asynchronous operations elegantly.

### What You'll Learn

- **Fetch API basics**: Making HTTP GET requests
- **Promise handling**: Using `.then()` and `.catch()`
- **JSON parsing**: Converting responses to JavaScript objects
- **Parallel requests**: Using `Promise.all()` for multiple fetches
- **Error handling**: Managing network and parsing errors
- **Request options**: Adding headers and configuration

## Key Concepts

### Fetch Basics

**fetch()** returns a Promise that resolves with a Response object:

```javascript
// Basic fetch GET request
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// With async/await (cleaner)
async function getData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

### Response Object

After `fetch()`, you get a Response object with:

```javascript
const response = await fetch(url);

// Response properties
response.status;        // 200, 404, 500, etc.
response.ok;           // true if 200-299, false otherwise
response.headers;      // Response headers
response.url;          // Final URL (after redirects)

// Parsing methods
response.json();       // Parse as JSON
response.text();       // Parse as text
response.blob();       // Parse as binary
response.arrayBuffer(); // Parse as array buffer
```

### Promise Chain vs Async/Await

```javascript
// Promise chain style
fetch(url)
  .then(r => r.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Async/await style (more readable)
async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

### Fetch with Headers

Add custom headers to requests:

```javascript
const response = await fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  }
});
```

### Parallel Requests

Fetch multiple URLs simultaneously:

```javascript
// Promise.all waits for all promises to resolve
const urls = [
  'https://api.example.com/data1',
  'https://api.example.com/data2',
  'https://api.example.com/data3'
];

const responses = await Promise.all(urls.map(url => fetch(url)));
const data = await Promise.all(responses.map(r => r.json()));
console.log(data); // Array of parsed data
```

### Error Handling

Fetch has subtle error behavior - **network errors reject, but HTTP errors don't**:

```javascript
// This catches network errors only
try {
  const response = await fetch(url);
  // HTTP 404, 500 etc. do NOT throw here!
  
  // Must manually check status
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
} catch (error) {
  // Catches: network errors, JSON parse errors, and manual errors
  console.error(error);
}
```

### Timeout Pattern

Fetch doesn't have built-in timeout, use `AbortController`:

```javascript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);

try {
  const response = await fetch(url, { signal: controller.signal });
  clearTimeout(timeoutId);
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request timed out');
  }
}
```

### Retry Pattern

Retry failed requests:

```javascript
async function fetchWithRetry(url, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
}
```

## Exercise Tasks

### Task 1: Basic Fetch

Implement `fetchWeatherData`:
- Make GET request to weather API
- Accept latitude and longitude parameters
- Return response object

```javascript
const response = await fetchWeatherData(40.7128, -74.0060);
```

### Task 2: Fetch with Headers

Implement `fetchWithHeaders`:
- Make fetch request with custom headers
- Add 'Content-Type': 'application/json'
- Return response

```javascript
const response = await fetchWithHeaders(url);
```

### Task 3: Multiple URLs

Implement `fetchMultipleUrls`:
- Use Promise.all() to fetch in parallel
- Accept array of URLs
- Return array of responses

```javascript
const responses = await fetchMultipleUrls([url1, url2, url3]);
```

### Task 4: Fetch with Timeout

Implement `fetchWithTimeout`:
- Use AbortController for cancellation
- Reject if timeout exceeded
- Default timeout 5000ms

```javascript
const response = await fetchWithTimeout(url, 3000);
```

### Task 5: Fetch and Retry

Implement `fetchAndRetry`:
- Retry up to 3 times on failure
- Wait between retries
- Return data on success

```javascript
const data = await fetchAndRetry(url, 3);
```

### Task 6: Parse JSON

Implement `fetchJsonData`:
- Fetch and call `.json()` on response
- Return parsed object

```javascript
const data = await fetchJsonData(url);
```

### Task 7: Parse Text

Implement `fetchTextData`:
- Fetch and call `.text()` on response
- Return text string

```javascript
const text = await fetchTextData(url);
```

### Task 8: Check Status

Implement `fetchWithStatus`:
- Check `response.ok` before parsing
- Throw error if status not 200-299
- Return parsed data

```javascript
const data = await fetchWithStatus(url);
```

### Task 9: Abortable Fetch

Implement `fetchAbortable`:
- Return object with promise and abort function
- Use AbortController
- Allow canceling mid-flight

```javascript
const { promise, abort } = fetchAbortable(url);
abort(); // Cancel the request
```

### Task 10: Multiple Cities

Implement `fetchWeatherMultipleCities`:
- Fetch weather for multiple cities
- Accept array of { name, latitude, longitude }
- Return array of weather data

```javascript
const cities = [
  { name: 'NYC', latitude: 40.7128, longitude: -74.0060 },
  { name: 'London', latitude: 51.5074, longitude: -0.1278 }
];
const results = await fetchWeatherMultipleCities(cities);
```

## Testing

Run tests:

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

View interactive demo:

Open `index.html` in your browser to test Fetch implementations!

## Real-World Examples

### Weather App

```javascript
async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current=temperature_2m`
    );
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch weather:', error);
  }
}
```

### Parallel Requests

```javascript
async function fetchAllData() {
  try {
    const [users, posts, comments] = await Promise.all([
      fetch('/api/users').then(r => r.json()),
      fetch('/api/posts').then(r => r.json()),
      fetch('/api/comments').then(r => r.json())
    ]);

    return { users, posts, comments };
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}
```

### With Timeout and Retry

```javascript
async function robustFetch(url, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    for (let i = 0; i < 3; i++) {
      try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      } catch (error) {
        if (i === 2) throw error;
        await new Promise(r => setTimeout(r, 1000 * (i + 1)));
      }
    }
  } catch (error) {
    console.error('Request failed:', error);
  }
}
```

## Best Practices

### 1. Always Check Response Status

```javascript
// ✓ GOOD - Check status
const response = await fetch(url);
if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}
const data = await response.json();

// ❌ WRONG - Ignoring status
const response = await fetch(url);
const data = await response.json(); // May parse error page!
```

### 2. Use Async/Await Over Chains

```javascript
// ✓ GOOD - Readable and maintainable
async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// ❌ HARD TO READ - Deep nesting
fetch(url)
  .then(r => r.json())
  .then(d => console.log(d))
  .catch(e => console.error(e));
```

### 3. Handle All Error Types

```javascript
// ✓ GOOD - Handles all errors
try {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
} catch (error) {
  // Catches: network errors, parse errors, HTTP errors
  console.error(error);
}
```

### 4. Use AbortController for Cancellation

```javascript
// ✓ GOOD - Can cancel requests
const controller = new AbortController();
const promise = fetch(url, { signal: controller.signal });

button.onclick = () => controller.abort();

try {
  await promise;
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('User cancelled');
  }
}
```

## Common Mistakes

```javascript
// ❌ WRONG - Assuming 404 throws
try {
  const response = await fetch(url);
  const data = await response.json();
} catch (error) {
  // Won't catch 404!
}

// ✓ RIGHT - Check status explicitly
const response = await fetch(url);
if (!response.ok) throw new Error(`HTTP ${response.status}`);
const data = await response.json();

// ❌ WRONG - Not parsing response
const data = await fetch(url); // data is Response, not parsed!

// ✓ RIGHT - Call appropriate method
const data = await fetch(url).then(r => r.json());

// ❌ WRONG - No timeout
await fetch(url); // Can hang indefinitely

// ✓ RIGHT - Add timeout
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000);
await fetch(url, { signal: controller.signal });
```

## Summary

Key points about Fetch API:

✅ Use `fetch()` for modern HTTP requests
✅ Fetch returns promises - use async/await for readability
✅ Always check `response.ok` before parsing
✅ Parse with `.json()`, `.text()`, `.blob()` as needed
✅ Use `Promise.all()` for parallel requests
✅ Handle network errors in catch block
✅ Use AbortController for timeouts and cancellation
✅ Implement retry logic for reliability

Next exercise: You'll learn to **parse and extract data** from API responses!
