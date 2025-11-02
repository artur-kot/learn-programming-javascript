# Exercise 167: Iterator - Generator Composition

Master composing and chaining multiple generators for complex data transformations using functional programming patterns.

## 📚 Concepts

### Function Composition

Composition is applying one function's output as another function's input:

```javascript
// Traditional way (right to left)
const result = g(f(x));

// Using compose (right to left)
const composed = compose(f, g);
const result = composed(x);
```

### Generator Composition

With generators, composition means:
1. First generator yields values
2. Second generator consumes and transforms those values
3. Can chain any number of transformations

```javascript
function* doubled(arr) {
  for (const x of arr) yield x * 2;
}

function* evens(gen) {
  for (const x of gen) {
    if (x % 2 === 0) yield x;
  }
}

// Compose: double then filter evens
const result = evens(doubled([1, 2, 3, 4]));
[...result]; // [4, 8]
```

### Transducers Pattern

Transducers combine multiple operations into single pass:

```javascript
// Without composition: 4 iterations
const step1 = [1, 2, 3, 4].map(x => x * 2);      // [2, 4, 6, 8]
const step2 = step1.filter(x => x > 4);           // [6, 8]

// With generators: 1 iteration (lazy evaluation)
const result = filter(map(nums([1, 2, 3, 4]), x => x * 2), x => x > 4);
```

### Pipe vs Compose

- **Compose:** Right-to-left (mathematical style)
- **Pipe:** Left-to-right (readable style)

```javascript
// Compose: right to left
const composed = compose(g, f, h); // h(g(f(x)))

// Pipe: left to right
const piped = pipe([h, g, f]); // f(g(h(x)))
```

## 🎯 Functions to Implement

### 1. compose(gen1, gen2)
Compose two generators into one.

```javascript
function* doubled(arr) {
  for (const x of arr) yield x * 2;
}

function* evens(gen) {
  for (const x of gen) if (x % 2 === 0) yield x;
}

const composed = compose(doubled, evens);
[...composed([1, 2, 3])]; // [4] (1*2=2 is even, 2*2=4 is even, 3*2=6 is even)
```

**Key Points:**
- Return function that takes input
- Apply first generator to input
- Pass result to second generator
- Enables chaining

### 2. pipe(transformers)
Chain multiple transformers left-to-right.

```javascript
function* add5(arr) { for (const x of arr) yield x + 5; }
function* double(arr) { for (const x of arr) yield x * 2; }

const transform = pipe([add5, double]);
[...transform([1])]; // [(1+5)*2] = [12]
```

**Key Points:**
- Array of transformer functions
- Apply in order: first, second, third, etc.
- Opposite of compose (left-to-right)
- More readable for many operations

### 3. map(generator, fn)
Transform each yielded value.

```javascript
const gen = map(nums([1, 2, 3]), x => x * 2);
[...gen]; // [2, 4, 6]
```

**Key Points:**
- Apply function to each yielded value
- Lazily evaluated (computed as needed)
- Similar to Array.prototype.map
- Can chain with other operations

### 4. filter(generator, predicate)
Only yield values matching condition.

```javascript
const gen = filter(nums([1, 2, 3, 4]), x => x > 2);
[...gen]; // [3, 4]
```

**Key Points:**
- Test each value with predicate
- Only yield if truthy
- Similar to Array.prototype.filter
- Lazy evaluation

### 5. flatMap(generator, fn)
Map then flatten one level.

```javascript
const gen = flatMap(nums([1, 2]), x => [x, x * 10]);
[...gen]; // [1, 10, 2, 20]
```

**Key Points:**
- Function returns iterable
- Yield each item from returned iterable
- Flattens one level only
- Similar to Array.prototype.flatMap

### 6. takeUntil(generator, predicate)
Yield until condition becomes true.

```javascript
const gen = takeUntil(nums([1, 2, 3, 4]), x => x > 2);
[...gen]; // [1, 2]
```

**Key Points:**
- Stop when predicate becomes true
- Includes values before predicate is true
- Similar to takeWhile but with different semantics

### 7. dropWhile(generator, predicate)
Skip while condition true, yield rest.

```javascript
const gen = dropWhile(nums([1, 2, 3, 4]), x => x < 3);
[...gen]; // [3, 4]
```

**Key Points:**
- Skip items while predicate is true
- Yield all remaining items
- Opposite of takeUntil

### 8. chunk(generator, size)
Group consecutive items into arrays.

```javascript
const gen = chunk(nums([1, 2, 3, 4, 5]), 2);
[...gen]; // [[1, 2], [3, 4], [5]]
```

**Key Points:**
- Yield arrays of given size
- Last chunk may be smaller
- Useful for pagination
- Buffering items

### 9. interleave(gen1, gen2)
Alternate values from two generators.

```javascript
const gen = interleave(nums([1, 2]), nums(['a', 'b']));
[...gen]; // [1, 'a', 2, 'b']
```

**Key Points:**
- Take alternately from each generator
- Continue with remaining items if lengths differ
- Merges two sequences

### 10. chain(generators)
Combine multiple generators sequentially.

```javascript
const gen = chain([nums([1, 2]), nums([3, 4])]);
[...gen]; // [1, 2, 3, 4]
```

**Key Points:**
- Array of generator objects
- Yield from each until exhausted
- Then move to next
- Concatenates sequences

## 📖 Common Patterns

### Chain Operations Together

```javascript
function* pipeline(input) {
  yield* map(nums(input), x => x * 2);
  // Now yields doubled values
}

function* withFilter(input) {
  yield* filter(pipeline(input), x => x > 5);
  // Now yields doubled values > 5
}

[...withFilter([1, 2, 3, 4])]; // [6, 8]
```

### Using yield*

The `yield*` operator delegates to another generator:

```javascript
function* combined() {
  yield* map(nums([1, 2]), x => x * 10);
  yield* nums([100, 200]);
}

[...combined()]; // [10, 20, 100, 200]
```

### Pipe with Multiple Operations

```javascript
const operations = [
  gen => filter(gen, x => x > 0),
  gen => map(gen, x => x * 2),
  gen => filter(gen, x => x < 20),
];

const result = pipe(operations)(nums([-2, -1, 0, 1, 2, 3]));
[...result]; // [2, 4, 6]
```

### Lazy Evaluation Advantage

```javascript
// With arrays: processes everything
const step1 = big_array.map(expensive1); // 1M items
const step2 = step1.filter(predicate);   // 1M items
const result = step2.slice(0, 10);       // Use only 10

// With generators: processes only what's needed
const step1 = map(nums(big_array), expensive1);
const step2 = filter(step1, predicate);
const result = take(step2, 10); // Only 10 items computed!
```

## 🚀 Real-World Applications

### 1. Data Processing Pipeline

```javascript
function* csv_to_json(lines) {
  const header = lines[0].split(',');
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const obj = {};
    header.forEach((h, i) => obj[h] = values[i]);
    yield obj;
  }
}

function* processRecords() {
  const records = csv_to_json(lines);
  yield* filter(records, r => r.age > 18);
  yield* map(records, r => ({...r, ageGroup: ageGroup(r.age)}));
}
```

### 2. Search Query Pipeline

```javascript
function* search(query) {
  yield* dropWhile(db_records(), r => r.id < query.minId);
  yield* takeUntil(db_records(), r => r.id > query.maxId);
}

// Only reads records within range
for (const record of search({minId: 100, maxId: 200})) {
  console.log(record);
}
```

### 3. Batch Processing

```javascript
function* processBatches(items, batchSize) {
  for (const batch of chunk(nums(items), batchSize)) {
    yield processBatch(batch); // API call per batch
  }
}

const items = [...]; // 10000 items
for (const result of processBatches(items, 100)) {
  // Processes 100 items at a time
  console.log(result);
}
```

### 4. Real-time Event Stream

```javascript
function* eventPipeline(stream) {
  yield* filter(stream, e => e.type === 'click');
  yield* map(stream, e => ({...e, processed: true}));
  yield* chunk(stream, 10); // Batch events
}

eventEmitter.on('data', data => {
  for (const event of eventPipeline([data])) {
    handleEvent(event);
  }
});
```

### 5. Pagination Helper

```javascript
function* paginatedSearch(query, pageSize = 50) {
  const results = search(query);
  yield* chunk(results, pageSize);
}

// Gets results in manageable pages
for (const page of paginatedSearch(userQuery)) {
  renderPage(page);
}
```

## 🔧 Common Mistakes

### 1. Wrong Composition Order

```javascript
// ❌ WRONG - Doubles the result of filter
const wrong = compose(evens, doubled);
[...wrong([1, 2, 3])]; // Wrong order!

// ✅ CORRECT
const right = compose(doubled, evens);
```

### 2. Forgetting to Consume Generator

```javascript
// ❌ WRONG - Generator not consumed
const result = map(nums([1, 2, 3]), x => x * 2);
// result is a generator, not an array!

// ✅ CORRECT
const result = [...map(nums([1, 2, 3]), x => x * 2)];
```

### 3. Pipe Array Order Confusion

```javascript
// ❌ WRONG - Wrong order in pipe
const transform = pipe([filter, map]); // Filters, then maps

// ✅ CORRECT - Depends on desired order
const transform = pipe([map, filter]); // Maps, then filters
```

### 4. Not Handling Different Generator Lengths

```javascript
// ❌ WRONG - Doesn't handle length mismatch
function* interleave(gen1, gen2) {
  while (true) { // Infinite loop if lengths differ!
    yield gen1.next().value;
    yield gen2.next().value;
  }
}

// ✅ CORRECT
function* interleave(gen1, gen2) {
  let done1 = false, done2 = false;
  let iter1 = gen1[Symbol.iterator]();
  let iter2 = gen2[Symbol.iterator]();
  
  while (!done1 || !done2) {
    if (!done1) {
      const r = iter1.next();
      if (!r.done) yield r.value;
      done1 = r.done;
    }
    if (!done2) {
      const r = iter2.next();
      if (!r.done) yield r.value;
      done2 = r.done;
    }
  }
}
```

## 📚 Summary

**What You've Learned:**
- How to compose generators
- How to pipe multiple transformations
- How to create map, filter, flatMap generators
- How to take/drop items from generators
- How to chunk and interleave generators
- How to chain multiple generators
- Lazy evaluation advantages
- Functional programming patterns
- Real-world data processing pipelines

**Next Steps:**
- Build CLI tools with generator pipelines
- Create reactive/observable-like systems
- Study transducers library (transducers.js)
- Explore async generators
- Learn Rx.js or similar reactive libraries

## 🎓 Learning Checklist

- [ ] Understand function composition concept
- [ ] Can compose two generators
- [ ] Can use pipe for multiple transformations
- [ ] Can implement map for generators
- [ ] Can implement filter for generators
- [ ] Understand flatMap flattening one level
- [ ] Can takeUntil and dropWhile
- [ ] Can chunk items into groups
- [ ] Can interleave two generators
- [ ] Can chain multiple generators
- [ ] Understand lazy evaluation benefits
- [ ] Can build data processing pipelines
- [ ] Know real-world applications

---

**Run tests:** `npm test`

**Start coding:** Implement all 10 composition functions in `167-iterator-compose.js`

**Challenge:** Create a data pipeline that combines multiple complex operations!
