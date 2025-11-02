# Exercise 097: Quote Fetcher - Promise.all

Parallel power! Fetch from multiple sources simultaneously with Promise.all(). Master concurrency and compare parallel vs sequential execution.

## Concepts

- **Promise.all()** - Wait for all promises to complete
- **Parallel Execution** - Multiple operations at once
- **Sequential Execution** - One after another
- **All or Nothing** - Promise.all fails if any promise fails
- **Promise.allSettled()** - Handle individual outcomes
- **Concurrency Patterns** - Performance optimization
- **Performance Comparison** - Parallel vs sequential timing

## What You're Learning

Parallel execution is crucial for performance. In this exercise, you'll:
- Use Promise.all() for concurrent operations
- Compare parallel vs sequential timing
- Understand "all or nothing" behavior
- Handle multiple simultaneous operations
- Use Promise.allSettled() for partial success
- Build efficient multi-source APIs

**Promise.all Pattern:**
```javascript
async function fetchFromAll() {
  const promises = [fetchSourceA(), fetchSourceB(), fetchSourceC()];
  const results = await Promise.all(promises);
  return results;
}
```

## Challenge

Create functions that fetch quotes from three different sources. Use Promise.all() for parallel fetching, and compare performance with sequential fetching.

## Functions to Implement

### `fetchFromAllSourcesParallel(delayMs = 1000)`
Fetch quotes from all sources in parallel using Promise.all().

**Parameters:**
- `delayMs` - Simulated network delay per source

**Returns:**
- Promise resolving with array of 3 quotes (one from each source)

**Example:**
```javascript
// All fetches happen at the same time
const quotes = await fetchFromAllSourcesParallel(1000);
// Total time: ~1000ms (not 3000ms)
```

**Note:** When using Promise.all, all operations start simultaneously, so total time is approximately the longest operation, not the sum of all operations.

### `fetchFromAllSourcesSequential(delayMs = 1000)`
Fetch quotes from all sources one after another.

**Parameters:**
- `delayMs` - Simulated network delay per source

**Returns:**
- Promise resolving with array of 3 quotes

**Example:**
```javascript
// Fetches happen one at a time
const quotes = await fetchFromAllSourcesSequential(1000);
// Total time: ~3000ms (sum of all delays)
```

### `fetchWithTimeout(delayMs = 1000, timeoutMs = 500)`
Fetch from all sources with timeout protection.

**Parameters:**
- `delayMs` - Simulated network delay
- `timeoutMs` - Timeout milliseconds

**Returns:**
- Promise resolving with results or errors on timeout

**Implementation Tip:**
- Use Promise.race() to implement timeout
- Race Promise.all() against a timeout promise
- Handle both success and timeout scenarios

**Example:**
```javascript
try {
  const quotes = await fetchWithTimeout(1000, 500);
} catch (error) {
  // Handle timeout
}
```

### `fetchUntilSuccess(delayMs = 1000, maxRetries = 3)`
Keep fetching until all sources succeed with retries.

**Parameters:**
- `delayMs` - Simulated network delay
- `maxRetries` - Maximum retry attempts

**Returns:**
- Promise resolving with successful quotes array

**Implementation Tip:**
- Use Promise.allSettled() to see individual results
- Retry failed sources
- Continue until all succeed or retries exhausted

### `createMultiSourceAPI(delayMs = 1000)`
Return API object that handles multiple sources.

**Parameters:**
- `delayMs` - Base delay for API calls

**Returns:**
- API object with methods

**Methods:**
- `async getParallel()` - Get quotes in parallel
- `async getSequential()` - Get quotes sequentially
- `async compare()` - Returns timing comparison object

**Example:**
```javascript
const api = createMultiSourceAPI(1000);
const parallel = await api.getParallel();
const sequential = await api.getSequential();
const comparison = await api.compare();
```

## Parallel vs Sequential

**Parallel (Promise.all):**
```javascript
async function parallel() {
  const startTime = Date.now();
  const quotes = await Promise.all([
    fetchFromSourceA(1000),
    fetchFromSourceB(1000),
    fetchFromSourceC(1000)
  ]);
  const duration = Date.now() - startTime;
  // ~1000ms total
  return { quotes, duration };
}
```

**Sequential (await in loop):**
```javascript
async function sequential() {
  const startTime = Date.now();
  const quotes = [];
  quotes.push(await fetchFromSourceA(1000));
  quotes.push(await fetchFromSourceB(1000));
  quotes.push(await fetchFromSourceC(1000));
  const duration = Date.now() - startTime;
  // ~3000ms total
  return { quotes, duration };
}
```

## Promise.all vs Promise.allSettled

**Promise.all():**
- Fails immediately if any promise rejects
- Returns array of values
- All or nothing

**Promise.allSettled():**
- Waits for all promises (success or failure)
- Returns array of result objects
- Can handle partial failures

```javascript
// Promise.all - fails fast
const results = await Promise.all(promises); // Throws if any fails

// Promise.allSettled - waits for all
const results = await Promise.allSettled(promises);
// Returns: [{ status: 'fulfilled', value: ... }, { status: 'rejected', reason: ... }]
```

## Tips

- Promise.all is much faster for independent operations
- Use Promise.race() for timeout implementation
- Promise.allSettled() handles partial failures gracefully
- Order of results matches order of input promises
- Consider error handling when any source might fail

## Next Steps

Series 19 complete! You've mastered promises, async/await, and concurrency. Ready to explore other programming concepts?
