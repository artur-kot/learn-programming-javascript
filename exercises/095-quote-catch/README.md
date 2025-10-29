# Exercise 095: Quote Fetcher - Error Handling

Master error handling with `.catch()`! Learn to gracefully handle promise rejections and build resilient applications.

## Concepts

- **.catch() Method** - Handling promise rejections
- **Error Objects** - Understanding error structure
- **Fallback Values** - Providing defaults when errors occur
- **Error Recovery** - Responding to failures
- **Retry Logic** - Attempting operations multiple times
- **Error Propagation** - Passing errors through chains

## What You're Learning

Real applications must handle failures. In this exercise, you'll:
- Use `.catch()` to handle rejected promises
- Provide fallback values
- Implement retry logic
- Handle errors in chains
- Create resilient APIs
- Log errors appropriately

**Error Handling Pattern:**
```javascript
mockQuoteAPI()
  .then(quote => formatQuote(quote))
  .catch(error => {
    console.log('Error:', error.message);
    return defaultQuote;
  })
```

## Challenge

Build error handling into the quote fetcher. Create functions that gracefully handle failures, retry operations, and provide fallback values.

## Functions to Implement

### `fetchQuoteWithCatch(shouldFail = false, delayMs = 1000)`
Fetch quote and catch errors, returning a default quote.

**Parameters:**
- `shouldFail` - Boolean to trigger rejection
- `delayMs` - Simulated network delay

**Returns:**
- Promise that always resolves (with quote or default)

**Default Quote:**
```javascript
{
  id: 0,
  text: "An error occurred, but here's a quote anyway.",
  author: "Unknown"
}
```

**Example:**
```javascript
const quote = await fetchQuoteWithCatch(true, 1000);
// Returns default quote on error
```

### `fetchWithRetry(maxRetries = 3, delayMs = 1000)`
Attempt to fetch, retry on error.

**Parameters:**
- `maxRetries` - Number of retry attempts
- `delayMs` - Delay for each attempt

**Returns:**
- Promise that resolves with quote or rejects after all retries

**Logic:**
- Attempt fetch
- If failed, retry up to maxRetries times
- Each retry adds a small delay
- After all retries fail, reject

### `fetchMultipleWithErrorHandling(count = 3, delayMs = 1000)`
Fetch multiple quotes and handle individual errors.

**Parameters:**
- `count` - Number of quotes to attempt
- `delayMs` - Delay for each fetch

**Returns:**
- Promise that resolves with array of results (quotes or errors)

**Result Array:**
- Mix of successful quotes and error objects
- Never rejects, always returns array

### `fetchAndLog(shouldFail = false, delayMs = 1000)`
Fetch quote and log errors without throwing.

**Parameters:**
- `shouldFail` - Boolean to trigger rejection
- `delayMs` - Simulated network delay

**Returns:**
- Promise that resolves with either quote or error object

**Behavior:**
- On success: return quote
- On error: log error and return error object
- Never rejects

**Error Object:**
```javascript
{
  error: true,
  message: "Error message"
}
```

### `createResiliantAPI(delayMs = 1000)`
Return API object with error handling built in.

**Parameters:**
- `delayMs` - Base delay for API calls

**Returns:**
- API object with methods

**Methods:**
- `getQuote()` - Get quote with built-in error handling
- `getMultiple(count)` - Get multiple quotes with error handling
- `getWithRetry(maxRetries)` - Get quote with retry logic

**Behavior:**
- All methods should handle errors gracefully
- Never reject, always return valid results
- Provide meaningful error information

## Tips

- `.catch()` only runs if the promise rejects
- Return a value from `.catch()` to continue the chain
- Returning a rejected promise from `.catch()` propagates the error
- Use try-catch mentally to understand error flow
- Test both success and failure paths
- Provide meaningful error messages

## Next Steps

Once complete, move to [exercise 096](../096-quote-async) where you'll refactor using async/await syntax.
