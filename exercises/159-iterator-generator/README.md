# Exercise 164: Iterator - Generator Functions

Learn to use generator functions with the `yield` keyword to create clean, readable iterators.

## 📚 Concepts

### Generator Functions Syntax

A generator function is declared with an asterisk `*` after `function`:

```javascript
function* myGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

// Calling a generator returns a generator object (iterator)
const gen = myGenerator();

gen.next(); // {value: 1, done: false}
gen.next(); // {value: 2, done: false}
gen.next(); // {value: 3, done: false}
gen.next(); // {value: undefined, done: true}
```

### yield Keyword

The `yield` keyword:
- Pauses execution of the generator
- Returns the yielded value
- Resumes from this point on next `next()` call
- Similar to `return` but doesn't end the function

```javascript
function* example() {
  console.log('Start');    // Runs on first next()
  yield 1;
  console.log('Middle');   // Runs on second next()
  yield 2;
  console.log('End');      // Runs on third next()
  yield 3;
}

const gen = example();
gen.next(); // Logs 'Start', returns {value: 1, done: false}
gen.next(); // Logs 'Middle', returns {value: 2, done: false}
gen.next(); // Logs 'End', returns {value: 3, done: false}
gen.next(); // Returns {value: undefined, done: true}
```

### Generators Are Iterables

Generators have `[Symbol.iterator]` built-in, so they work with `for...of` and spread:

```javascript
function* counts() {
  for (let i = 1; i <= 3; i++) {
    yield i;
  }
}

// All work automatically!
for (const n of counts()) { console.log(n); }    // 1, 2, 3
const arr = [...counts()];                        // [1, 2, 3]
```

### Generator State

Each generator call creates a new independent generator:

```javascript
function* counter() {
  yield 1;
  yield 2;
}

const g1 = counter();
const g2 = counter();

g1.next(); // {value: 1, done: false}
g2.next(); // {value: 1, done: false} - Independent!
```

### Early Return from Generators

You can use `return` to end a generator early:

```javascript
function* earlyExit() {
  yield 1;
  yield 2;
  return; // Stop here
  yield 3; // Never reaches
}

[...earlyExit()]; // [1, 2]
```

## 🎯 Functions to Implement

### 1. generateCounts(max)
Generator that counts from 1 to max.

```javascript
for (const n of generateCounts(3)) {
  console.log(n); // 1, 2, 3
}

[...generateCounts(5)]; // [1, 2, 3, 4, 5]
```

**Key Points:**
- Use `function*` syntax
- Use `yield` for each value
- Works automatically with `for...of` and spread

### 2. generateFibonacci(count)
Generator that yields Fibonacci sequence.

```javascript
[...generateFibonacci(5)]; // [1, 1, 2, 3, 5]
[...generateFibonacci(7)]; // [1, 1, 2, 3, 5, 8, 13]
```

**Key Points:**
- Start with 1, 1
- Each next = sum of previous two
- Yield exactly `count` numbers

### 3. generateRange(start, end, step = 1)
Generator for numeric ranges.

```javascript
[...generateRange(1, 5)];     // [1, 2, 3, 4, 5]
[...generateRange(0, 10, 2)]; // [0, 2, 4, 6, 8, 10]
[...generateRange(-2, 1)];    // [-2, -1, 0, 1]
```

**Key Points:**
- Start and end inclusive
- Default step is 1
- Similar to earlier exercises but cleaner syntax

### 4. generateEvens(array)
Generator that yields only even numbers.

```javascript
[...generateEvens([1, 2, 3, 4, 5])]; // [2, 4]
[...generateEvens([10, 15, 20])];    // [10, 20]
```

**Key Points:**
- Filter with `item % 2 === 0`
- Use `for...of` to iterate array
- Conditionally `yield`

### 5. generateLetters(str)
Generator that yields string characters.

```javascript
[...generateLetters('Hi')];   // ['H', 'i']
[...generateLetters('ABC')];  // ['A', 'B', 'C']
```

**Key Points:**
- Iterate through each character
- Yield each one
- Works like for...of already works with strings

### 6. generateWords(text)
Generator that yields words from text.

```javascript
[...generateWords('Hello World Test')]; // ['Hello', 'World', 'Test']
[...generateWords('one two')];          // ['one', 'two']
```

**Key Points:**
- Split by spaces
- Yield each word
- Use `.split(' ')` or similar

### 7. generateMatches(array, predicate)
Generator that yields matching items.

```javascript
[...generateMatches([1, 2, 3, 4], x => x > 2)]; // [3, 4]
[...generateMatches(['a', 'ab'], s => s.length > 1)]; // ['ab']
```

**Key Points:**
- Test each item with predicate
- Only `yield` if test passes
- Similar to Array.prototype.filter

### 8. generateMapped(array, mapFn)
Generator that transforms items.

```javascript
[...generateMapped([1, 2, 3], x => x * 2)]; // [2, 4, 6]
[...generateMapped(['a', 'b'], x => x.toUpperCase())]; // ['A', 'B']
```

**Key Points:**
- Apply function to each item
- `yield` the result
- Similar to Array.prototype.map

### 9. generatePairs(array)
Generator that yields adjacent pairs.

```javascript
[...generatePairs([1, 2, 3, 4])]; // [[1, 2], [2, 3], [3, 4]]
[...generatePairs('abc')];        // [['a', 'b'], ['b', 'c']]
```

**Key Points:**
- Yield [current, next] pairs
- Stop before last item
- Creates n-1 pairs from n items

### 10. generateRepeated(value, times)
Generator that repeats a value.

```javascript
[...generateRepeated('x', 3)]; // ['x', 'x', 'x']
[...generateRepeated(42, 2)];  // [42, 42]
```

**Key Points:**
- Yield the same value `times` times
- Works with any type
- Useful for creating uniform data

## 📖 Common Patterns

### Basic Generator

```javascript
function* basic() {
  yield 1;
  yield 2;
  yield 3;
}

[...basic()]; // [1, 2, 3]
```

### Generator with Loop

```javascript
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

[...range(1, 5)]; // [1, 2, 3, 4, 5]
```

### Generator with Condition

```javascript
function* evens(array) {
  for (const item of array) {
    if (item % 2 === 0) {
      yield item;
    }
  }
}

[...evens([1, 2, 3, 4])]; // [2, 4]
```

### Delegating to Another Generator

```javascript
function* first() {
  yield 1;
  yield 2;
}

function* second() {
  yield* first();  // yield* delegates to another generator
  yield 3;
}

[...second()]; // [1, 2, 3]
```

### Generator Expression (Arrow-like)

```javascript
function* map(array, fn) {
  for (const item of array) {
    yield fn(item);
  }
}

[...map([1, 2, 3], x => x * 2)]; // [2, 4, 6]
```

## 🚀 Real-World Applications

### 1. Reading Files Line by Line

```javascript
import fs from 'fs';

async function* readLines(filePath) {
  const file = await fs.open(filePath);
  for await (const line of file) {
    yield line.trim();
  }
}

for await (const line of readLines('data.txt')) {
  console.log(line); // Lazily reads each line
}
```

### 2. Paginated API Requests

```javascript
function* paginate(baseUrl, totalPages) {
  for (let page = 1; page <= totalPages; page++) {
    const url = `${baseUrl}?page=${page}`;
    yield fetch(url).then(r => r.json());
  }
}

for (const pagePromise of paginate('api.example.com', 5)) {
  const data = await pagePromise;
  console.log(data);
}
```

### 3. Lazy Fibonacci (Infinite)

```javascript
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
// Computes only when needed!
```

### 4. Tree Traversal

```javascript
function* traverse(node) {
  if (!node) return;
  
  yield node.value;
  yield* traverse(node.left);
  yield* traverse(node.right);
}

const tree = {
  value: 1,
  left: { value: 2, left: null, right: null },
  right: { value: 3, left: null, right: null }
};

[...traverse(tree)]; // [1, 2, 3]
```

### 5. Database Query Lazy Evaluation

```javascript
function* query(sql, params) {
  // Simulate streaming results
  const results = getResults(sql, params);
  for (const row of results) {
    if (shouldProcess(row)) {
      yield row;
    }
  }
}

// Only processes rows that match filter
for (const row of query('SELECT * FROM users', [])) {
  console.log(row);
}
```

### 6. Event Stream Processing

```javascript
function* filterEvents(events, type) {
  for (const event of events) {
    if (event.type === type) {
      yield event;
    }
  }
}

function* mapEvents(events, mapper) {
  for (const event of events) {
    yield mapper(event);
  }
}

// Compose operations
const allEvents = /* ... */;
const clicks = filterEvents(allEvents, 'click');
const coords = mapEvents(clicks, e => e.coordinates);

for (const coord of coords) {
  console.log(coord); // Only processes clicked events
}
```

## 🔧 Common Mistakes

### 1. Forgetting the Asterisk

```javascript
// ❌ WRONG - Regular function, not generator
function counts() {
  yield 1; // SyntaxError!
}

// ✅ CORRECT
function* counts() {
  yield 1;
}
```

### 2. Calling Instead of Iterating

```javascript
// ❌ WRONG - Calling doesn't iterate
generateCounts(3); // Returns generator, doesn't print

// ✅ CORRECT
for (const n of generateCounts(3)) {
  console.log(n);
}

// Or
[...generateCounts(3)]; // [1, 2, 3]
```

### 3. Generator Exhaustion

```javascript
// ❌ WRONG - Generator exhausted after first use
const gen = generateCounts(2);
const arr1 = [...gen]; // [1, 2]
const arr2 = [...gen]; // [] - Exhausted!

// ✅ CORRECT - Create new generator each time
const arr1 = [...generateCounts(2)]; // [1, 2]
const arr2 = [...generateCounts(2)]; // [1, 2]
```

### 4. Using return Instead of yield

```javascript
// ❌ WRONG - Only returns one value
function* numbers() {
  return 1;
  return 2;
  return 3; // Unreachable
}

[...numbers()]; // [1]

// ✅ CORRECT
function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}

[...numbers()]; // [1, 2, 3]
```

### 5. Infinite Loops Without Conditions

```javascript
// ❌ WRONG - Infinite loop, hangs
function* infinite() {
  while (true) {
    yield 1;
  }
}

[...infinite()]; // Hangs forever!

// ✅ CORRECT - Use with limit or next() manually
const gen = infinite();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 1
// Take only what you need
```

## 📊 Generators vs Iterators

| Feature | Iterator | Generator |
|---------|----------|-----------|
| Code length | More | Simpler |
| Readability | Complex | Clean |
| Manual state | Yes | No |
| Syntax | `{next()}` | `function*` |
| Error-prone | More | Less |

## 📚 Summary

**What You've Learned:**
- How to declare generator functions with `function*`
- How to use `yield` to produce values
- How generators create iterators automatically
- How to use generators with `for...of` and spread
- How to compose and chain generators
- Common patterns and real-world uses
- Advantages over manual iterators

**Next Steps:**
- Exercise 165: Infinite sequences with generators
- Exercise 166: Custom collections
- Exercise 167: Composing multiple generators
- Learn async generators (`async function*`)

## 🎓 Learning Checklist

- [ ] Understand `function*` syntax
- [ ] Understand `yield` keyword
- [ ] Can implement basic generator
- [ ] Know generators work with `for...of` automatically
- [ ] Know generators work with spread `...`
- [ ] Understand generator exhaustion
- [ ] Can combine generators with loops and conditions
- [ ] Understand `yield*` delegation
- [ ] Know common real-world patterns
- [ ] Can debug generator issues

---

**Run tests:** `npm test`

**Start coding:** Fill in the TODO generators in `164-iterator-generator.js`

**Try this:** Create a generator that yields prime numbers, or one that generates infinite sequence.
