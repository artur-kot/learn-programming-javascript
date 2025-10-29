# Exercise 093: Quote Fetcher - Simulate API

Your first step into promises! Create a mocked API that returns quotes as promises. Learn how promises work by simulating async API calls.

## Concepts

- **Promise Constructor** - Creating new promises
- **Resolving Promises** - Using resolve() to succeed
- **Rejecting Promises** - Using reject() to fail
- **Promise States** - Pending, fulfilled, rejected
- **Simulated Delays** - Using setTimeout in promises
- **Mock API** - Simulating real API responses

## What You're Learning

Promises are the foundation of async JavaScript. In this exercise, you'll:
- Create promises that resolve after a delay
- Return quote objects from the promises
- Simulate API responses
- Build a mock API with multiple methods
- Learn when promises resolve and reject
- Create reusable API methods

**Promise Pattern:**
```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(data);
  }, 1000);
});
```

## Challenge

Build a complete mock API that simulates a quote service. Create functions that return promises resolving with quote data after a simulated network delay.

## Functions to Implement

### `mockQuoteAPI(delayMs = 1000)`
Create a mocked API that returns a promise resolving with a random quote.

**Parameters:**
- `delayMs` - Simulated network delay in milliseconds

**Returns:**
- Promise that resolves with a quote object

**Quote Object:**
```javascript
{
  id: number,
  text: string,
  author: string
}
```

**Examples:**
```javascript
const quote = await mockQuoteAPI(1000);
console.log(quote);
// {
//   id: 1,
//   text: "The only way to do great work is to love what you do.",
//   author: "Steve Jobs"
// }
```

### `fetchQuoteByAuthor(author, delayMs = 1000)`
Return a promise that resolves with a quote from a specific author.

**Parameters:**
- `author` - Author name to search for
- `delayMs` - Simulated network delay

**Returns:**
- Promise that resolves with matching quote object

**Examples:**
```javascript
const quote = await fetchQuoteByAuthor('Steve Jobs', 1000);
```

### `fetchRandomQuote(delayMs = 1000)`
Return a promise for a random quote.

**Parameters:**
- `delayMs` - Simulated network delay

**Returns:**
- Promise that resolves with random quote

### `mockQuoteWithError(shouldFail = false, delayMs = 1000)`
Return a promise that may reject with an error.

**Parameters:**
- `shouldFail` - Boolean to trigger rejection
- `delayMs` - Simulated network delay

**Returns:**
- Promise that resolves with quote OR rejects with error

**Error Object:**
- Should include message property

### `createQuoteAPI(baseDelayMs = 1000)`
Return an object with API methods.

**Parameters:**
- `baseDelayMs` - Base delay for all API calls

**Returns:**
- API object with methods

**Methods:**
- `getRandomQuote()` or `getRandom()` - Get random quote
- `getByAuthor(author)` - Get quote by author
- `getWithError(shouldFail)` - Get quote that may fail

**Examples:**
```javascript
const api = createQuoteAPI(1000);
const quote = await api.getRandomQuote();
const jobsQuote = await api.getByAuthor('Steve Jobs');
```

## Quote Database

The mock database includes quotes from:
- Steve Jobs (2 quotes)
- John Lennon (1 quote)
- Eleanor Roosevelt (1 quote)
- Aristotle (1 quote)

## Tips

- Use `new Promise((resolve, reject) => {...})` to create promises
- Call `resolve(data)` to fulfill a promise
- Call `reject(error)` to reject a promise
- Use `setTimeout` to simulate network delay
- Return different quotes for random selections
- Make sure error objects have a message property

## Next Steps

Once complete, move to [exercise 094](../094-quote-then) where you'll use .then() to handle promise results.
