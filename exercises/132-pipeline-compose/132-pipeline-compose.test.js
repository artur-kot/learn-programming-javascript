import { test } from 'node:test';
import assert from 'node:assert';
import {
  compose,
  pipe,
  composeAsync,
  pipeAsync,
  curry,
  partial,
  memoize,
  once,
  pipeline,
  sequence
} from './132-pipeline-compose.js';

// ============================================================================
// COMPOSE (right-to-left)
// ============================================================================

test('compose - applies functions right-to-left', () => {
  const add = x => x + 1;
  const multiply = x => x * 2;
  const subtract = x => x - 3;

  const result = compose(subtract, multiply, add)(5);
  // compose(subtract, multiply, add)(5)
  // = subtract(multiply(add(5)))
  // = subtract(multiply(6))
  // = subtract(12)
  // = 9

  assert.strictEqual(result, 9, 'Correct composition result');
});

test('compose - single function', () => {
  const double = x => x * 2;
  const fn = compose(double);

  assert.strictEqual(fn(5), 10, 'Single function works');
});

test('compose - with more complex functions', () => {
  const square = x => x * x;
  const addTwo = x => x + 2;
  const halve = x => x / 2;

  const composed = compose(halve, addTwo, square);
  const result = composed(3);
  // square(3) = 9
  // addTwo(9) = 11
  // halve(11) = 5.5

  assert.strictEqual(result, 5.5, 'Complex composition works');
});

// ============================================================================
// PIPE (left-to-right)
// ============================================================================

test('pipe - applies functions left-to-right', () => {
  const add = x => x + 1;
  const multiply = x => x * 2;
  const subtract = x => x - 3;

  const result = pipe(add, multiply, subtract)(5);
  // pipe(add, multiply, subtract)(5)
  // = subtract(multiply(add(5)))
  // = subtract(multiply(6))
  // = subtract(12)
  // = 9

  assert.strictEqual(result, 9, 'Correct pipeline result');
});

test('pipe - reads left-to-right naturally', () => {
  const double = x => x * 2;
  const addFive = x => x + 5;
  const square = x => x * x;

  const fn = pipe(double, addFive, square);
  const result = fn(3);
  // (3 * 2) + 5 = 11
  // 11 * 11 = 121

  assert.strictEqual(result, 121, 'Pipeline computes correctly');
});

test('pipe - single function', () => {
  const double = x => x * 2;
  const fn = pipe(double);

  assert.strictEqual(fn(5), 10, 'Single function works');
});

// ============================================================================
// COMPOSE ASYNC
// ============================================================================

test('composeAsync - composes async functions right-to-left', async () => {
  const asyncAdd = async x => x + 1;
  const asyncMultiply = async x => x * 2;

  const composed = composeAsync(asyncMultiply, asyncAdd);
  const result = await composed(5);
  // asyncAdd(5) = 6
  // asyncMultiply(6) = 12

  assert.strictEqual(result, 12, 'Async composition works');
});

test('composeAsync - handles multiple async operations', async () => {
  const fetchUser = async id => ({ id, name: 'Alice' });
  const getName = async user => user.name.toUpperCase();

  const composed = composeAsync(getName, fetchUser);
  const result = await composed(1);

  assert.strictEqual(result, 'ALICE', 'Multiple async operations work');
});

// ============================================================================
// PIPE ASYNC
// ============================================================================

test('pipeAsync - pipes async functions left-to-right', async () => {
  const asyncAdd = async x => x + 1;
  const asyncMultiply = async x => x * 2;

  const piped = pipeAsync(asyncAdd, asyncMultiply);
  const result = await piped(5);
  // asyncAdd(5) = 6
  // asyncMultiply(6) = 12

  assert.strictEqual(result, 12, 'Async piping works');
});

test('pipeAsync - with multiple operations', async () => {
  const fetchUser = async id => ({ id, name: 'Bob' });
  const getName = async user => user.name.toUpperCase();

  const piped = pipeAsync(fetchUser, getName);
  const result = await piped(1);

  assert.strictEqual(result, 'BOB', 'Async piping in order works');
});

// ============================================================================
// CURRY
// ============================================================================

test('curry - converts function to curried version', () => {
  const add = (a, b, c) => a + b + c;
  const curriedAdd = curry(add);

  const result = curriedAdd(1)(2)(3);

  assert.strictEqual(result, 6, 'Curried function works');
});

test('curry - allows partial application', () => {
  const add = (a, b, c) => a + b + c;
  const curriedAdd = curry(add);

  const addOne = curriedAdd(1);
  const addOneAndTwo = addOne(2);
  const result = addOneAndTwo(3);

  assert.strictEqual(result, 6, 'Partial application works');
});

test('curry - with two arguments', () => {
  const multiply = (a, b) => a * b;
  const curriedMultiply = curry(multiply);

  assert.strictEqual(curriedMultiply(3)(4), 12, 'Two-arg curry works');
});

// ============================================================================
// PARTIAL
// ============================================================================

test('partial - pre-fills function arguments', () => {
  const add = (a, b, c) => a + b + c;
  const addOne = partial(add, 1);

  const result = addOne(2, 3);

  assert.strictEqual(result, 6, 'Partial application works');
});

test('partial - can fill multiple arguments', () => {
  const multiply = (a, b, c) => a * b * c;
  const multiplyByTwo = partial(multiply, 2);
  const multiplyByTwoAndThree = partial(multiplyByTwo, 3);

  const result = multiplyByTwoAndThree(4);

  assert.strictEqual(result, 24, 'Multiple partial applications work');
});

// ============================================================================
// MEMOIZE
// ============================================================================

test('memoize - caches function results', () => {
  let callCount = 0;
  const expensive = x => {
    callCount++;
    return x * 2;
  };

  const memoized = memoize(expensive);

  const result1 = memoized(5);
  const result2 = memoized(5);

  assert.strictEqual(result1, 10, 'First call works');
  assert.strictEqual(result2, 10, 'Second call returns same result');
  assert.strictEqual(callCount, 1, 'Function called only once');
});

test('memoize - caches different arguments separately', () => {
  let callCount = 0;
  const add = (a, b) => {
    callCount++;
    return a + b;
  };

  const memoized = memoize(add);

  memoized(1, 2);
  memoized(1, 2);
  memoized(2, 3);
  memoized(2, 3);

  assert.strictEqual(callCount, 2, 'Called once per unique arguments');
});

// ============================================================================
// ONCE
// ============================================================================

test('once - function can only be called once', () => {
  let callCount = 0;
  const increment = () => {
    callCount++;
    return callCount;
  };

  const onceIncrement = once(increment);

  const result1 = onceIncrement();
  const result2 = onceIncrement();
  const result3 = onceIncrement();

  assert.strictEqual(result1, 1, 'First call returns correct result');
  assert.strictEqual(result2, 1, 'Second call returns same result');
  assert.strictEqual(result3, 1, 'Third call returns same result');
  assert.strictEqual(callCount, 1, 'Original function called once');
});

test('once - preserves arguments', () => {
  const add = (a, b) => a + b;
  const onceAdd = once(add);

  const result1 = onceAdd(2, 3);
  const result2 = onceAdd(5, 6); // Should ignore new arguments

  assert.strictEqual(result1, 5, 'First call works');
  assert.strictEqual(result2, 5, 'Second call returns first result');
});

// ============================================================================
// PIPELINE OBJECT
// ============================================================================

test('pipeline - creates chainable pipeline', () => {
  const double = x => x * 2;
  const addFive = x => x + 5;
  const square = x => x * x;

  const result = pipeline()
    .add(double)
    .add(addFive)
    .add(square)
    .execute(3);

  // 3 * 2 = 6
  // 6 + 5 = 11
  // 11 * 11 = 121

  assert.strictEqual(result, 121, 'Pipeline executes in order');
});

test('pipeline - with multiple executions', () => {
  const double = x => x * 2;
  const addFive = x => x + 5;

  const p = pipeline().add(double).add(addFive);

  assert.strictEqual(p.execute(3), 11, 'First execution');
  assert.strictEqual(p.execute(4), 13, 'Second execution');
  assert.strictEqual(p.execute(5), 15, 'Third execution');
});

test('pipeline - empty pipeline returns input', () => {
  const result = pipeline().execute(42);

  assert.strictEqual(result, 42, 'Empty pipeline returns input');
});

// ============================================================================
// SEQUENCE
// ============================================================================

test('sequence - executes array of functions in sequence', () => {
  const double = x => x * 2;
  const addFive = x => x + 5;
  const square = x => x * x;

  const fns = [double, addFive, square];
  const result = sequence(fns)(3);

  // 3 * 2 = 6
  // 6 + 5 = 11
  // 11 * 11 = 121

  assert.strictEqual(result, 121, 'Sequence executes correctly');
});

test('sequence - with single function', () => {
  const double = x => x * 2;
  const result = sequence([double])(5);

  assert.strictEqual(result, 10, 'Single function works');
});

test('sequence - with empty array', () => {
  const result = sequence([])(42);

  assert.strictEqual(result, 42, 'Empty sequence returns input');
});

test('sequence - useful when functions are dynamic', () => {
  const transformations = [
    x => x + 1,
    x => x * 2,
    x => x - 3
  ];

  const executor = sequence(transformations);

  assert.strictEqual(executor(5), 9, 'Dynamic sequence works');
  // 5 + 1 = 6
  // 6 * 2 = 12
  // 12 - 3 = 9
});
