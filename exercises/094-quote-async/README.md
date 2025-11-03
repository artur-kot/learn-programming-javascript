# Exercise 096: Quote Fetcher - Async/Await

Modern async JavaScript! Refactor to clean, readable async/await syntax. Leave .then() and .catch() behind for synchronous-looking code.

## Concepts

- **async Functions** - Functions that return promises
- **await Keyword** - Waiting for promises to resolve
- **Synchronous-Looking Code** - Readable async patterns
- **try/catch Blocks** - Error handling in async code
- **Async Always Returns Promise** - Understanding async nature
- **Refactoring** - Converting .then() to async/await

## What You're Learning

Async/await is the modern way to write asynchronous code. In this exercise, you'll:
- Create async functions
- Use await to wait for promises
- Handle errors with try/catch
- Write readable, maintainable async code
- Understand async function returns
- Refactor promise chains to async/await

**Async/Await Pattern:**
```javascript
async function getQuote() {
  try {
    const quote = await mockQuoteAPI();
    return quote;
  } catch (error) {
    console.log('Error:', error.message);
    return defaultQuote;
  }
}
```

## Challenge

Refactor quote fetcher functions to use async/await. Create clean, readable async code that's easier to understand than promise chains.

## Functions to Implement

### `getQuoteAsync(delayMs = 1000)`
Get a quote using async/await.

**Parameters:**
- `delayMs` - Simulated network delay

**Returns:**
- Promise that resolves with quote object

**Example:**
```javascript
async function demo() {
  const quote = await getQuoteAsync(1000);
  console.log(quote);
}
```

### `getQuoteWithErrorAsync(shouldFail = false, delayMs = 1000)`
Get a quote with error handling using try/catch.

**Parameters:**
- `shouldFail` - Boolean to trigger rejection
- `delayMs` - Simulated network delay

**Returns:**
- Promise that resolves with quote or default on error

**Example:**
```javascript
const quote = await getQuoteWithErrorAsync(true, 1000);
// Handles error gracefully
```

### `getMultipleQuotesAsync(count = 3, delayMs = 1000)`
Fetch multiple quotes sequentially using async/await.

**Parameters:**
- `count` - Number of quotes to fetch
- `delayMs` - Delay for each fetch

**Returns:**
- Promise that resolves with array of quotes

**Example:**
```javascript
const quotes = await getMultipleQuotesAsync(5, 1000);
// Fetches 5 quotes one by one
```

### `fetchAndTransformAsync(delayMs = 1000)`
Fetch and transform quote data using async/await.

**Parameters:**
- `delayMs` - Simulated network delay

**Returns:**
- Promise that resolves with transformed object

**Transform Example:**
```javascript
{
  text: original.text,
  author: original.author,
  displayText: `"${original.text}" - ${original.author}`,
  wordCount: original.text.split(' ').length,
  length: original.text.length
}
```

### `createAsyncAPI(delayMs = 1000)`
Return API object with async methods.

**Parameters:**
- `delayMs` - Base delay for API calls

**Returns:**
- API object with async methods

**Methods:**
- `async getQuote()` - Get random quote
- `async getMultiple(count)` - Get multiple quotes
- `async getTransformed()` - Get quote and transform it

**Example:**
```javascript
const api = createAsyncAPI(1000);
const quote = await api.getQuote();
const quotes = await api.getMultiple(3);
const transformed = await api.getTransformed();
```

## Key Differences: Promises vs Async/Await

**Promises:**
```javascript
function getQuote() {
  return mockQuoteAPI()
    .then(quote => quote)
    .catch(error => defaultQuote);
}
```

**Async/Await:**
```javascript
async function getQuote() {
  try {
    return await mockQuoteAPI();
  } catch (error) {
    return defaultQuote;
  }
}
```

## Tips

- `async` functions always return promises
- `await` can only be used inside `async` functions
- `try/catch` in async functions is cleaner than `.catch()`
- `await` pauses execution until promise resolves
- Multiple awaits execute sequentially
- You can still use `.then()` on async function results

## Next Steps

Once complete, move to [exercise 097](../097-quote-all) where you'll fetch from multiple sources in parallel using Promise.all().
