# Exercise 165: Iterator - Infinite Sequences

Learn to create infinite generators and work with lazy evaluation for memory-efficient programming.

## 📚 Concepts

### Infinite Generators

Unlike finite generators, infinite generators never stop yielding values. They're powerful for representing unbounded sequences:

```javascript
function* infiniteCount() {
  let n = 0;
  while (true) {  // Infinite loop!
    yield ++n;
  }
}

const counter = infiniteCount();
counter.next().value; // 1
counter.next().value; // 2
// Can get values forever...
```

**Key difference:** No `return` statement, just infinite `while(true)`.

### Lazy Evaluation

Infinite generators are only computed **when requested**. No infinite loop because values are generated on-demand:

```javascript
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// No computation until accessed
const fib = fibonacci();
console.log(fib.next().value); // Computes 1st
console.log(fib.next().value); // Computes 2nd
// Only computed when needed - memory efficient!
```

### Limiting Infinite Generators

Always use `take()`, `takeWhile()`, or similar to limit infinite sequences:

```javascript
// ❌ WRONG - Infinite loop, hangs!
const all = [...infiniteCount()];

// ✅ CORRECT - Get first 5
const first5 = take(infiniteCount(), 5); // [1, 2, 3, 4, 5]
```

### Memory Efficiency

Traditional approach (bad):
```javascript
// Create ALL million numbers in memory at once
const nums = Array.from({length: 1_000_000}, (_, i) => i);
```

With infinite generators (good):
```javascript
// Create numbers on-demand, one at a time
const nums = take(infiniteCount(), 1_000_000);
// Same result, but much more efficient
```

## 🎯 Functions to Implement

### 1. infiniteCount()
Generator that counts infinitely from 1.

```javascript
take(infiniteCount(), 5); // [1, 2, 3, 4, 5]

const gen = infiniteCount();
gen.next().value; // 1
gen.next().value; // 2
gen.next().value; // 3
```

**Key Points:**
- Use `while(true)` with `yield`
- Never returns, continues forever
- Works with `take()` to limit

### 2. infiniteRepeating(array)
Generator that cycles through array items forever.

```javascript
take(infiniteRepeating(['a', 'b', 'c']), 7); // ['a', 'b', 'c', 'a', 'b', 'c', 'a']
take(infiniteRepeating([1, 2]), 5);          // [1, 2, 1, 2, 1]
```

**Key Points:**
- Cycle through array endlessly
- Use modulo `%` or manual index
- Similar to `cycle()` function

### 3. infiniteFibonacci()
Generator yielding infinite Fibonacci sequence.

```javascript
take(infiniteFibonacci(), 6); // [1, 1, 2, 3, 5, 8]
```

**Key Points:**
- Start with [1, 1]
- Each next = sum of previous two
- Continue forever

### 4. infiniteSquares()
Generator yielding perfect squares: 1, 4, 9, 16, 25, ...

```javascript
take(infiniteSquares(), 5); // [1, 4, 9, 16, 25]
```

**Key Points:**
- Yield n² for n = 1, 2, 3, ...
- Simple math operation
- Grows quickly

### 5. infinitePowers(base)
Generator yielding powers: base¹, base², base³, ...

```javascript
take(infinitePowers(2), 5);  // [2, 4, 8, 16, 32]
take(infinitePowers(10), 3); // [10, 100, 1000]
```

**Key Points:**
- Yield base^1, base^2, base^3, etc.
- Exponential growth
- Track exponent

### 6. take(iterable, n)
Extract first n items from any iterable.

```javascript
take([1, 2, 3, 4, 5], 3);      // [1, 2, 3]
take('HELLO', 2);               // ['H', 'E']
take(infiniteCount(), 3);        // [1, 2, 3]
```

**Key Points:**
- Works with finite and infinite iterables
- Stop after n items
- Return array

### 7. takeWhile(iterable, predicate)
Extract items while condition is true.

```javascript
takeWhile([1, 2, 3, 4, 1], x => x < 4);      // [1, 2, 3]
takeWhile(infiniteCount(), x => x <= 5);      // [1, 2, 3, 4, 5]
takeWhile('ABCD', x => x <= 'B');             // ['A', 'B']
```

**Key Points:**
- Stop when predicate becomes false
- First false item triggers stop
- Works with infinite sequences

### 8. skip(iterable, n)
Skip first n items and collect rest.

```javascript
skip([1, 2, 3, 4, 5], 2);  // [3, 4, 5]
skip('ABCDE', 1);           // ['B', 'C', 'D', 'E']
```

**Key Points:**
- Discard first n items
- Return array of remaining
- Works with any iterable

### 9. cycle(array)
Create infinite cycle of array items.

```javascript
take(cycle([1, 2, 3]), 7); // [1, 2, 3, 1, 2, 3, 1]
take(cycle(['x']), 3);     // ['x', 'x', 'x']
```

**Key Points:**
- Repeat array forever
- Similar to `infiniteRepeating()`
- Alternative name for same concept

### 10. takeEvery(iterable, n)
Take every nth item from iterable.

```javascript
takeEvery([1, 2, 3, 4, 5, 6, 7], 2); // [2, 4, 6] (every 2nd)
takeEvery('ABCDEFG', 3);              // ['C', 'F'] (every 3rd)
```

**Key Points:**
- 0-indexed, so n=2 gets indices 1, 3, 5...
- Skip n-1 items, take 1, repeat
- Works like stride/step in array slicing

## 📖 Common Patterns

### Basic Infinite Generator

```javascript
function* infinite() {
  let n = 0;
  while (true) {
    yield ++n;
  }
}

take(infinite(), 3); // [1, 2, 3]
```

### Cycling Pattern

```javascript
function* cycle(array) {
  let i = 0;
  while (true) {
    yield array[i % array.length];
    i++;
  }
}
```

### Mathematical Sequence

```javascript
function* squares() {
  let n = 1;
  while (true) {
    yield n * n;
    n++;
  }
}

take(squares(), 4); // [1, 4, 9, 16]
```

### Fibonacci Pattern

```javascript
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

take(fibonacci(), 6); // [0, 1, 1, 2, 3, 5]
```

## 🚀 Real-World Applications

### 1. Data Stream Processing

```javascript
async function* readData(stream) {
  for await (const chunk of stream) {
    yield chunk;
  }
}

// Process data as it arrives
for (const item of take(readData(inputStream), 1000)) {
  processItem(item);
}
```

### 2. ID Generation

```javascript
function* idGenerator() {
  let id = 1;
  while (true) {
    yield `ID_${String(id).padStart(6, '0')}`;
    id++;
  }
}

// Create new IDs as needed
const ids = idGenerator();
console.log(ids.next().value); // ID_000001
console.log(ids.next().value); // ID_000002
```

### 3. Pagination Helper

```javascript
function* pages(totalItems, pageSize) {
  for (let i = 0; i < totalItems; i += pageSize) {
    yield {
      pageNumber: Math.floor(i / pageSize) + 1,
      items: getData(i, pageSize)
    };
  }
}

for (const page of pages(1000, 50)) {
  console.log(`Processing page ${page.pageNumber}`);
}
```

### 4. Range Query Helper

```javascript
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

// Find primes in huge range without computing all
function* primes(n) {
  for (const i of range(2, n)) {
    if (isPrime(i)) {
      yield i;
    }
  }
}

const firstPrimes = take(primes(1_000_000), 100);
```

### 5. Retry Logic

```javascript
function* exponentialBackoff(baseDelay = 100) {
  let delay = baseDelay;
  while (true) {
    yield delay;
    delay *= 2;
  }
}

async function retryWithBackoff(fn, maxRetries = 5) {
  let lastError;
  for (const [i, delay] of enumerate(exponentialBackoff())) {
    if (i >= maxRetries) break;
    try {
      return await fn();
    } catch (e) {
      lastError = e;
      await sleep(delay);
    }
  }
  throw lastError;
}
```

### 6. Hash/Checksum Sequences

```javascript
function* checksumSequence(seed) {
  let current = seed;
  while (true) {
    yield current;
    current = hash(current);
  }
}
```

## 🔧 Common Mistakes

### 1. Forgetting while(true)

```javascript
// ❌ WRONG - Finite generator, not infinite
function* infinite() {
  for (let i = 0; i < 100; i++) {
    yield i;
  }
}

// ✅ CORRECT
function* infinite() {
  let i = 0;
  while (true) {
    yield ++i;
  }
}
```

### 2. Using [...infinite()] Without Limit

```javascript
// ❌ WRONG - Infinite loop, hangs forever!
const all = [...infiniteCount()];

// ✅ CORRECT
const first5 = take(infiniteCount(), 5);
```

### 3. Not Checking Predicate in takeWhile

```javascript
// ❌ WRONG - Might not stop
function takeWhile(iterable, predicate) {
  const result = [];
  for (const item of iterable) {
    result.push(item);
    // Missing: if (!predicate(item)) break;
  }
  return result;
}

// ✅ CORRECT
function takeWhile(iterable, predicate) {
  const result = [];
  for (const item of iterable) {
    if (!predicate(item)) break;
    result.push(item);
  }
  return result;
}
```

### 4. Index Issues in Cyclic Patterns

```javascript
// ❌ WRONG - Index grows unbounded
function* cycle(array) {
  let i = 0;
  while (true) {
    yield array[i];
    i++; // Will eventually overflow!
  }
}

// ✅ CORRECT
function* cycle(array) {
  let i = 0;
  while (true) {
    yield array[i % array.length];
    i++;
  }
}
```

## 📚 Summary

**What You've Learned:**
- How to create infinite generators with `while(true)`
- How lazy evaluation saves memory
- How to limit infinite sequences with `take()` and `takeWhile()`
- How to work with infinite mathematical sequences
- How to compose multiple operations on generators
- Real-world uses for infinite generators
- Memory-efficient alternatives to array creation

**Next Steps:**
- Exercise 166: Custom collections with iterators
- Exercise 167: Composing generators
- Learn async generators for asynchronous streams
- Study performance implications of lazy evaluation

## 🎓 Learning Checklist

- [ ] Understand difference between finite and infinite generators
- [ ] Know how to use `while(true)` safely
- [ ] Understand lazy evaluation and its benefits
- [ ] Can use `take()` to limit infinite sequences
- [ ] Can implement common infinite sequences (count, Fibonacci, squares)
- [ ] Can chain operations on infinite generators
- [ ] Know memory advantages of lazy evaluation
- [ ] Can debug generator issues
- [ ] Understand `takeWhile()` predicate evaluation
- [ ] Can compose infinite generators with utility functions

---

**Run tests:** `npm test`

**Start coding:** Implement generators in `165-iterator-infinite.js`

**Challenge:** Create a generator that yields digits of pi, or prime numbers infinitely!
