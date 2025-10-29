# Exercise 137: Data Pipeline - Compose Functions

Master **function composition** for building powerful, reusable data transformation pipelines. Combine functions to create complex operations elegantly.

## Overview

In this final Series 27 exercise, you'll learn function composition—the art of combining simple functions to create more complex operations. This is where functional programming becomes truly powerful.

### What You'll Learn

- **Compose**: Right-to-left function application
- **Pipe**: Left-to-right function application
- **Curry**: Partial application of function arguments
- **Memoization**: Caching function results
- **Function combinators**: Building higher-level abstractions
- **Async composition**: Combining async operations

## Key Concepts

### Function Composition Basics

**Composition** means combining functions so the output of one becomes the input of the next:

```javascript
// Without composition
const value = 5;
const step1 = add(value, 1);      // 6
const step2 = multiply(step1, 2); // 12
const result = subtract(step2, 3); // 9

// With composition
const composed = compose(subtract, multiply, add);
const result = composed(5, 1, 2, 3); // 9
```

### Compose vs Pipe

**compose()** - Right-to-left (mathematical style):

```javascript
// compose(f, g, h)(x) = f(g(h(x)))
const double = x => x * 2;
const addFive = x => x + 5;
const square = x => x * x;

const composed = compose(square, addFive, double);
composed(3);
// First: double(3) = 6
// Then: addFive(6) = 11
// Finally: square(11) = 121
```

**pipe()** - Left-to-right (more readable):

```javascript
// pipe(f, g, h)(x) = h(g(f(x)))
const piped = pipe(double, addFive, square);
piped(3);
// First: double(3) = 6
// Then: addFive(6) = 11
// Finally: square(11) = 121
// Same result, easier to follow!
```

### Implementing Compose

```javascript
function compose(...fns) {
  return x => fns.reduceRight((acc, fn) => fn(acc), x);
}

// Or step by step:
function compose(...fns) {
  return function(x) {
    return fns.reduceRight((accumulator, fn) => {
      return fn(accumulator);
    }, x);
  };
}
```

### Implementing Pipe

```javascript
function pipe(...fns) {
  return x => fns.reduce((acc, fn) => fn(acc), x);
}

// Key difference: reduce vs reduceRight
// compose uses reduceRight (right-to-left)
// pipe uses reduce (left-to-right)
```

### Currying

**Currying** converts a function into a series of functions, each taking one argument:

```javascript
// Normal function
const add = (a, b, c) => a + b + c;
add(1, 2, 3); // 6

// Curried version
const curriedAdd = curry(add);
curriedAdd(1)(2)(3); // 6

// Enables partial application
const addOne = curriedAdd(1);
const addOneAndTwo = addOne(2);
const result = addOneAndTwo(3); // 6
```

Implementing curry:

```javascript
function curry(fn) {
  const arity = fn.length; // Number of parameters
  
  return function curried(...args) {
    if (args.length >= arity) {
      return fn(...args);
    } else {
      return (...nextArgs) => curried(...args, ...nextArgs);
    }
  };
}
```

### Partial Application

**Partial application** pre-fills some arguments:

```javascript
const add = (a, b, c) => a + b + c;

const partial = (fn, ...prefilledArgs) =>
  (...laterArgs) => fn(...prefilledArgs, ...laterArgs);

const addOne = partial(add, 1);
addOne(2, 3); // 6
```

### Memoization

**Memoization** caches function results:

```javascript
function memoize(fn) {
  const cache = {};
  
  return (...args) => {
    const key = JSON.stringify(args);
    
    if (key in cache) {
      return cache[key];
    }
    
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

// Usage
const expensive = x => x * x;
const memoized = memoize(expensive);

memoized(5); // Computed
memoized(5); // Cached result
```

### Once Function

**Once** ensures a function is called exactly once:

```javascript
function once(fn) {
  let called = false;
  let result;
  
  return (...args) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}

// Usage
const initialize = once(() => {
  console.log('Initializing...');
  return 'initialized';
});

initialize(); // 'Initializing...' logged
initialize(); // Nothing logged, returns 'initialized'
```

### Pipeline Object

Create chainable pipelines:

```javascript
function pipeline() {
  const fns = [];
  
  return {
    add(fn) {
      fns.push(fn);
      return this; // Return this for chaining
    },
    execute(value) {
      return fns.reduce((acc, fn) => fn(acc), value);
    }
  };
}

// Usage
const result = pipeline()
  .add(x => x * 2)
  .add(x => x + 5)
  .add(x => x * x)
  .execute(3); // 121
```

## Exercise Tasks

### Task 1: Compose

Implement `compose`:
- Combine functions right-to-left
- compose(f, g, h)(x) = f(g(h(x)))

```javascript
const double = x => x * 2;
const addFive = x => x + 5;
const square = x => x * x;

const fn = compose(square, addFive, double);
fn(3); // 121
```

### Task 2: Pipe

Implement `pipe`:
- Combine functions left-to-right
- pipe(f, g, h)(x) = h(g(f(x)))

```javascript
const fn = pipe(double, addFive, square);
fn(3); // 121
```

### Task 3: Compose Async

Implement `composeAsync`:
- Compose async functions right-to-left
- Returns promise

```javascript
const asyncAdd = async x => x + 1;
const asyncMultiply = async x => x * 2;

const fn = composeAsync(asyncMultiply, asyncAdd);
await fn(5); // 12
```

### Task 4: Pipe Async

Implement `pipeAsync`:
- Pipe async functions left-to-right
- Returns promise

```javascript
const fn = pipeAsync(asyncAdd, asyncMultiply);
await fn(5); // 12
```

### Task 5: Curry

Implement `curry`:
- Convert function to curried version
- Enable partial application

```javascript
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

curriedAdd(1)(2)(3); // 6
const addOne = curriedAdd(1);
addOne(2, 3); // 6
```

### Task 6: Partial

Implement `partial`:
- Pre-fill function arguments
- Return function with remaining arguments

```javascript
const add = (a, b, c) => a + b + c;
const addOne = partial(add, 1);

addOne(2, 3); // 6
```

### Task 7: Memoize

Implement `memoize`:
- Cache function results
- Return cached result for same arguments

```javascript
let calls = 0;
const fn = x => { calls++; return x * 2; };
const memoized = memoize(fn);

memoized(5);
memoized(5);
// calls === 1 (second call used cache)
```

### Task 8: Once

Implement `once`:
- Function callable only once
- Return first result on subsequent calls

```javascript
const fn = once(() => Math.random());

const result1 = fn();
const result2 = fn();
// result1 === result2
```

### Task 9: Pipeline Object

Implement `pipeline`:
- Chainable pipeline object
- add(fn) for adding functions
- execute(value) for running pipeline

```javascript
const result = pipeline()
  .add(x => x * 2)
  .add(x => x + 5)
  .add(x => x * x)
  .execute(3); // 121
```

### Task 10: Sequence

Implement `sequence`:
- Execute array of functions in sequence
- Useful when functions stored in array

```javascript
const fns = [x => x + 1, x => x * 2, x => x - 3];
sequence(fns)(5); // 9
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

## Real-World Examples

### Data Processing Pipeline

```javascript
const processUser = pipe(
  validateInput,
  normalizeData,
  enrichWithMetadata,
  saveToDatabase,
  logSuccess
);

processUser(userData);
```

### Transforming API Response

```javascript
const transformResponse = compose(
  formatOutput,
  filterPrivate,
  parseData,
  validateSchema
);

const result = await api.fetch()
  .then(transformResponse);
```

### Creating Reusable Transformers

```javascript
const toUpperCase = str => str.toUpperCase();
const trim = str => str.trim();
const reverse = str => [...str].reverse().join('');

const cleanAndReverse = pipe(trim, toUpperCase, reverse);

cleanAndReverse('  hello  '); // 'OLLEH'
```

### Functional Middleware

```javascript
const withLogging = fn => (x) => {
  console.log('Input:', x);
  const result = fn(x);
  console.log('Output:', result);
  return result;
};

const withValidation = fn => (x) => {
  if (typeof x !== 'number') throw new Error('Invalid');
  return fn(x);
};

const double = x => x * 2;
const safeSafeDouble = pipe(
  withValidation(double),
  withLogging
);
```

### Curried Configuration Functions

```javascript
const multiply = curry((a, b) => a * b);
const times2 = multiply(2);
const times3 = multiply(3);

times2(5); // 10
times3(5); // 15
```

## Best Practices

### 1. Prefer Pipe Over Compose

```javascript
// ✓ GOOD - Easier to read top-to-bottom
const result = pipe(
  parseInput,
  validate,
  transform,
  save
)(data);

// ❌ HARDER - Right-to-left is less intuitive
const result = compose(save, transform, validate, parseInput)(data);
```

### 2. Pure Functions

```javascript
// ✓ GOOD - No side effects
const double = x => x * 2;

// ❌ BAD - Side effect
const double = x => {
  console.log('doubling');
  return x * 2;
};
```

### 3. Meaningful Names

```javascript
// ✓ GOOD - Clear purpose
const toJSON = obj => JSON.stringify(obj);
const fromJSON = str => JSON.parse(str);
const removeEmpty = arr => arr.filter(x => x);

// ❌ UNCLEAR
const process = obj => JSON.stringify(obj);
const handle = str => JSON.parse(str);
```

### 4. Type Consistency

```javascript
// ✓ GOOD - Output type matches next input
const getUserId = user => user.id;        // object -> number
const formatId = id => `ID: ${id}`;       // number -> string
const log = str => console.log(str);      // string -> void

pipe(getUser, getUserId, formatId, log);

// ❌ RISKY - Type mismatches
const getId = user => user.id;           // object -> number
const isLarge = num => num > 1000;       // number -> boolean
const format = bool => `Result: ${bool}`; // boolean -> string

// Can still compose, but error-prone
```

## Common Mistakes

```javascript
// ❌ WRONG - Forgetting compose is right-to-left
const composed = compose(addFive, double);
composed(3);
// Expects: addFive(double(3)) = 11
// but might assume: double(addFive(3)) = 16

// ✓ RIGHT - Use pipe for left-to-right
const piped = pipe(double, addFive);
piped(3); // Clearly: addFive(double(3)) = 11

// ❌ WRONG - Not handling single values in reduce
function compose(...fns) {
  return fns.reduceRight((f, g) => x => f(g(x)));
  // Fails if only one function!
}

// ✓ RIGHT - Use correct reducer
function compose(...fns) {
  return x => fns.reduceRight((acc, fn) => fn(acc), x);
}

// ❌ WRONG - Partial doesn't work with variadic args
function partial(fn, ...args) {
  return fn.bind(null, ...args);
  // Doesn't support multiple partial calls
}

// ✓ RIGHT - Returns function for later args
function partial(fn, ...prefilledArgs) {
  return (...laterArgs) => fn(...prefilledArgs, ...laterArgs);
}
```

## Summary

Key points about function composition:

✅ Use `pipe()` for left-to-right (most readable)
✅ Use `compose()` for right-to-left (mathematical style)
✅ Combine simple functions to build complex operations
✅ Use currying for partial application
✅ Use memoization for expensive computations
✅ Create pipelines for clear data transformations
✅ Keep functions pure without side effects
✅ Match input/output types for proper composition

## Series 27 Complete!

You've mastered:
- **Exercise 133**: Method chaining for fluent data transformations
- **Exercise 134**: Flattening nested data structures
- **Exercise 135**: Array construction from various sources
- **Exercise 136**: Custom utility functions for common tasks
- **Exercise 137**: Function composition for powerful pipelines

**Next**: Series 28 will build on these functional programming skills with advanced applications!
