# Exercise 163: Iterator - Basic Iterator

Learn to implement the iterator protocol with Symbol.iterator for custom objects to make them iterable.

## 📚 Concepts

### Iterator Protocol

JavaScript's iteration is built on two protocols:

**1. Iterable Protocol:**
- An object must have a method at `Symbol.iterator`
- This method returns an iterator object

```javascript
const iterable = {
  [Symbol.iterator]() {
    // return iterator
  }
};
```

**2. Iterator Protocol:**
- An iterator object must have a `next()` method
- `next()` returns `{value, done}` object
- When done, returns `{value: undefined, done: true}`

```javascript
const iterator = {
  next() {
    return { value: 1, done: false };
  }
};
```

### for...of Loop

The `for...of` loop automatically calls `Symbol.iterator` and repeatedly calls `next()`:

```javascript
for (const value of iterable) {
  console.log(value); // Each yielded value
}
```

### Built-in Iterables

JavaScript has many built-in iterables:
- Arrays: `[1, 2, 3]`
- Strings: `"hello"`
- Maps: `new Map()`
- Sets: `new Set()`
- Arguments: function `arguments`
- NodeList: DOM results

### Spread Operator with Iterables

The spread operator `...` works with any iterable:

```javascript
const iter = myIterator();
const array = [...iter]; // Converts to array
```

## 🎯 Functions to Implement

### 1. createCounterIterator(max)
Create an iterable object that counts from 1 to max.

```javascript
const counter = createCounterIterator(3);
for (const n of counter) {
  console.log(n); // 1, 2, 3
}

const array = [...counter]; // [1, 2, 3]
```

**Key Points:**
- Must have `[Symbol.iterator]` method
- Iterator should yield values 1 through max
- Works with `for...of` and spread operator

### 2. createArrayIterator(array)
Manually create an iterator with explicit `next()` method.

```javascript
const iter = createArrayIterator([10, 20, 30]);
console.log(iter.next()); // {value: 10, done: false}
console.log(iter.next()); // {value: 20, done: false}
console.log(iter.next()); // {value: 30, done: false}
console.log(iter.next()); // {value: undefined, done: true}
```

**Key Points:**
- Return object with `next()` method
- Maintain position/index between calls
- Return `{value: undefined, done: true}` at end

### 3. createFilterIterator(array, predicate)
Create iterator that only yields matching items.

```javascript
const iter = createFilterIterator([1, 2, 3, 4, 5], x => x % 2 === 0);
[...iter]; // [2, 4]
```

**Key Points:**
- Test each item with predicate function
- Only yield items where predicate returns truthy
- Must have `[Symbol.iterator]`

### 4. createPairsIterator(array)
Yield adjacent pairs from array [a,b], [b,c], [c,d], etc.

```javascript
const iter = createPairsIterator([1, 2, 3, 4]);
[...iter]; // [[1, 2], [2, 3], [3, 4]]
```

**Key Points:**
- Each pair is array of two consecutive items
- Last item paired with nothing (stop before end)
- n items → n-1 pairs

### 5. createMapIterator(array, mapFn)
Create iterator that transforms each item.

```javascript
const iter = createMapIterator([1, 2, 3], x => x * 10);
[...iter]; // [10, 20, 30]
```

**Key Points:**
- Apply mapFn to each item
- Similar to Array.prototype.map but lazy
- Must have `[Symbol.iterator]`

### 6. makeIterableString(str)
Make object that iterates through string characters.

```javascript
const iter = makeIterableString("Hello");
[...iter]; // ['H', 'e', 'l', 'l', 'o']

for (const char of iter) {
  console.log(char);
}
```

**Key Points:**
- Implement `[Symbol.iterator]`
- Yield each character
- Works with `for...of`

### 7. createRangeIterator(start, end, step = 1)
Create numeric range iterator like Python's range().

```javascript
const iter = createRangeIterator(1, 5);
[...iter]; // [1, 2, 3, 4, 5]

const iter2 = createRangeIterator(0, 10, 2);
[...iter2]; // [0, 2, 4, 6, 8, 10]
```

**Key Points:**
- Start and end are inclusive
- Default step is 1
- Handle negative ranges

### 8. isIterable(obj)
Check if object implements iterable protocol.

```javascript
isIterable([1, 2, 3]); // true
isIterable("hello"); // true
isIterable({a: 1}); // false
isIterable(new Map()); // true
```

**Key Points:**
- Check for `Symbol.iterator` property
- Check that it's a function
- Works with any object

### 9. getIteratorValues(iterable)
Extract all values from any iterable into array.

```javascript
getIteratorValues("ABC"); // ['A', 'B', 'C']
getIteratorValues([1, 2]); // [1, 2]
getIteratorValues(new Set([1, 2, 3])); // [1, 2, 3] or similar
```

**Key Points:**
- Works with any iterable
- Use `for...of` or spread operator
- Return plain array

### 10. createZipIterator(array1, array2)
Zip two arrays together, stop at shortest.

```javascript
const iter = createZipIterator([1, 2, 3], ['a', 'b']);
[...iter]; // [[1, 'a'], [2, 'b']]
```

**Key Points:**
- Yield pairs [item1, item2]
- Stop when shorter array ends
- Similar to Python's zip()

## 📖 Common Patterns

### Creating an Iterator from Scratch

```javascript
// Manually implementing iterator protocol
const myIterator = {
  data: [1, 2, 3],
  index: 0,
  
  [Symbol.iterator]() {
    return this; // Return iterator (self)
  },
  
  next() {
    if (this.index < this.data.length) {
      return { value: this.data[this.index++], done: false };
    }
    return { value: undefined, done: true };
  }
};

for (const n of myIterator) {
  console.log(n);
}
```

### Separate Iterator Object

```javascript
// Iterator separate from iterable
function createCounter(max) {
  return {
    [Symbol.iterator]() {
      let n = 0;
      return {
        next: () => {
          if (n < max) {
            return { value: ++n, done: false };
          }
          return { value: undefined, done: true };
        }
      };
    }
  };
}
```

### Generator Functions (Preview)

Generators (next exercise) simplify this pattern:

```javascript
function* counter(max) {
  for (let i = 1; i <= max; i++) {
    yield i;
  }
}

for (const n of counter(3)) {
  console.log(n); // 1, 2, 3
}
```

## 🚀 Real-World Applications

### 1. Custom Data Structure Iteration
```javascript
class LinkedList {
  constructor() {
    this.head = null;
  }
  
  [Symbol.iterator]() {
    let node = this.head;
    return {
      next: () => {
        if (node) {
          const value = node.value;
          node = node.next;
          return { value, done: false };
        }
        return { done: true };
      }
    };
  }
}

// Now linked list works with for...of!
const list = new LinkedList();
for (const item of list) {
  console.log(item);
}
```

### 2. Lazy Evaluation
```javascript
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// Only computes values when accessed
const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
```

### 3. File Reading
```javascript
async function* readLines(filePath) {
  const file = await fs.open(filePath);
  for await (const line of file) {
    yield line.trim();
  }
}

// Lazily read file line by line
for await (const line of readLines('data.txt')) {
  console.log(line);
}
```

### 4. Filtering and Transforming
```javascript
function* filter(iterable, predicate) {
  for (const item of iterable) {
    if (predicate(item)) {
      yield item;
    }
  }
}

function* map(iterable, fn) {
  for (const item of iterable) {
    yield fn(item);
  }
}

// Compose iterators
const data = [1, 2, 3, 4, 5];
const result = filter(map(data, x => x * 2), x => x > 4);
console.log([...result]); // [6, 8, 10]
```

### 5. Matrix Traversal
```javascript
function* traverse(matrix) {
  for (const row of matrix) {
    for (const cell of row) {
      yield cell;
    }
  }
}

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

for (const value of traverse(matrix)) {
  console.log(value); // 1, 2, 3, 4, 5, 6, 7, 8, 9
}
```

## 🔧 Common Mistakes

### 1. Forgetting Symbol.iterator
```javascript
// ❌ WRONG - Not iterable
const counter = {
  next() { ... }
};
for (const n of counter) { } // TypeError!

// ✅ CORRECT
const counter = {
  [Symbol.iterator]() {
    return {
      next() { ... }
    };
  }
};
```

### 2. Mutable Shared State
```javascript
// ❌ WRONG - All iterators share index
function createCounter() {
  let index = 0;
  return {
    [Symbol.iterator]() {
      return this; // Reuses same object
    },
    next() {
      return { value: index++, done: index > 3 };
    }
  };
}

const c1 = createCounter();
const arr1 = [...c1]; // [0, 1, 2]
const arr2 = [...c1]; // [] - Iterator exhausted!

// ✅ CORRECT - Each iteration gets fresh iterator
function createCounter() {
  return {
    [Symbol.iterator]() {
      let index = 0;
      return {
        next() {
          return { value: index++, done: index > 3 };
        }
      };
    }
  };
}
```

### 3. Forgetting done: true
```javascript
// ❌ WRONG - Infinite loop
next() {
  return { value: this.data[this.index++] };
  // Missing done flag!
}

// ✅ CORRECT
next() {
  if (this.index < this.data.length) {
    return { value: this.data[this.index++], done: false };
  }
  return { value: undefined, done: true };
}
```

### 4. Not Returning Iterator from [Symbol.iterator]
```javascript
// ❌ WRONG - Returns iterator data, not iterator
[Symbol.iterator]() {
  return this.data; // Array, not iterator
}

// ✅ CORRECT
[Symbol.iterator]() {
  return {
    next: () => { ... }
  };
}
```

## 📚 Summary

**What You've Learned:**
- How to implement the iterator protocol
- How to create custom `Symbol.iterator` methods
- How to write `next()` methods with `{value, done}` format
- How to make objects work with `for...of` loops
- How to use spread operator with custom iterators
- How to compose and chain iterators
- Common patterns for custom iterables

**Next Steps:**
- Exercise 164: Generator functions (easier iterator syntax)
- Exercise 165: Infinite sequences
- Exercise 166: Custom collections with iterators
- Exercise 167: Generator composition

## 🎓 Learning Checklist

- [ ] Understand iterator protocol: `[Symbol.iterator]` and `next()`
- [ ] Can create basic iterator from scratch
- [ ] Can implement `createCounterIterator`
- [ ] Understand difference between iterator and iterable
- [ ] Can use custom iterators with `for...of`
- [ ] Can use custom iterators with spread `...`
- [ ] Understand state management in iterators
- [ ] Can compose multiple iterators
- [ ] Understand real-world applications
- [ ] Can debug iterator-related issues

---

**Run tests:** `npm test`

**Start coding:** Fill in the TODO functions in `163-iterator-basic.js`

**Need help?** Review the concepts section, patterns, or real-world applications above.
