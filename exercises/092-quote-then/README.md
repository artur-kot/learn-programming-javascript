# Exercise 094: Quote Fetcher - Handle Success

Master `.then()`! Use promise chains to transform and compose async data. Learn how to handle promise results and chain multiple operations.

## Concepts

- **.then() Method** - Handling promise fulfillment
- **Promise Chaining** - Connecting multiple .then() calls
- **Data Transformation** - Modifying data in .then()
- **Returning Values** - Passing data through chains
- **Sequential Operations** - Operations that depend on each other
- **Building Chains** - Composing complex async operations

## What You're Learning

`.then()` is how you work with promise results. In this exercise, you'll:
- Use `.then()` to handle successful promises
- Chain multiple `.then()` calls
- Transform data through the chain
- Return new promises from `.then()`
- Format quotes in different ways
- Fetch multiple quotes sequentially

**Chain Pattern:**
```javascript
mockQuoteAPI()
  .then(quote => formatQuote(quote))
  .then(formatted => console.log(formatted))
```

## Challenge

Build functions that fetch quotes and transform the data through promise chains. Each function should demonstrate different chaining patterns and data transformations.

## Functions to Implement

### `fetchAndFormat(delayMs = 1000)`
Get a quote and format it as a string using .then().

**Parameters:**
- `delayMs` - Simulated network delay

**Returns:**
- Promise that resolves with formatted string

**Format:** `"[text]" - [author]`

**Example:**
```javascript
fetchAndFormat(1000).then(formatted => {
  console.log(formatted);
  // '"The only way to do great work is to love what you do." - Steve Jobs'
});
```

### `fetchAndUppercase(delayMs = 1000)`
Get a quote and uppercase the text using .then().

**Parameters:**
- `delayMs` - Simulated network delay

**Returns:**
- Promise that resolves with uppercase quote text

**Example:**
```javascript
const uppercase = await fetchAndUppercase(1000);
// "THE ONLY WAY TO DO GREAT WORK IS TO LOVE WHAT YOU DO."
```

### `fetchMultipleQuotes(count = 2, delayMs = 1000)`
Fetch multiple quotes sequentially using .then() chaining.

**Parameters:**
- `count` - Number of quotes to fetch
- `delayMs` - Delay for each fetch

**Returns:**
- Promise that resolves with array of quote objects

**Example:**
```javascript
const quotes = await fetchMultipleQuotes(3, 1000);
// [quote1, quote2, quote3]
```

**Note:** Each quote should be fetched sequentially, one after another.

### `fetchAndEnrich(delayMs = 1000)`
Fetch a quote and add additional properties using .then().

**Parameters:**
- `delayMs` - Simulated network delay

**Returns:**
- Promise that resolves with enriched quote object

**Enriched Properties:**
- Keep original: `id`, `text`, `author`
- Add: `length` (text length), `wordCount` (number of words), `timestamp` (when fetched)

**Example:**
```javascript
const enriched = await fetchAndEnrich(1000);
// {
//   id: 1,
//   text: "...",
//   author: "Steve Jobs",
//   length: 45,
//   wordCount: 10,
//   timestamp: 1635123456789
// }
```

## Tips

- `.then()` receives the resolved value as parameter
- You can return a new value from `.then()` which becomes the next promise
- Returning a promise from `.then()` chains it
- For sequential fetches, use `.then()` chaining instead of parallel
- Each `.then()` gets the result of the previous one
- Don't forget to return values if you want to chain further

## Next Steps

Once complete, move to [exercise 095](../095-quote-catch) where you'll handle errors with .catch().
