# Exercise 178: Calculator Tests - Node.js Test Framework

## Overview

This exercise teaches **test-driven development (TDD)** by providing a complete, working calculator and having you write comprehensive unit tests for it using **Node.js built-in testing framework** (`node:test` and `node:assert`).

Unlike traditional testing where you verify existing code, this exercise flips the perspective: you'll learn what **good tests look like** by writing them from scratch.

## Learning Objectives

By completing this exercise, you will:

1. **Master Node.js built-in test framework** (`node:test`)
2. **Write effective assertions** using `node:assert`
3. **Understand test organization** with test groups and subtests
4. **Test for expected values** (happy path)
5. **Test for error handling** (error cases)
6. **Learn TDD mindset** - tests document expected behavior

## Key Concepts

### 1. Node.js Built-in Testing Framework

Node.js 18+ includes `node:test` - no installation needed!

```javascript
import test from 'node:test';
import assert from 'node:assert';

test('my test', () => {
  assert.strictEqual(2 + 2, 4);
});
```

**Why this matters:** Zero dependencies, built-in to Node.js, perfect for learning testing fundamentals.

### 2. Writing Assertions

The `node:assert` module provides several assertion methods:

```javascript
// Exact equality check
assert.strictEqual(actual, expected);

// Loose equality (avoid this usually)
assert.equal(actual, expected);

// Boolean check
assert.ok(condition);

// Array/object deep equality
assert.deepStrictEqual(actual, expected);

// Throw check
assert.throws(() => dangerousFunction(), ErrorType);

// Error handling
assert.rejects(async () => { throw new Error(); }, ErrorType);
```

**Choosing assertions:**
- `strictEqual` - Most common, checks `===`
- `throws` - For error cases
- `ok` - For boolean conditions
- `deepStrictEqual` - For objects/arrays

### 3. Test Organization with test()

Group related tests:

```javascript
test('Addition Tests', async (t) => {
  await t.test('add(2, 3) returns 5', () => {
    assert.strictEqual(add(2, 3), 5);
  });

  await t.test('add(-1, 1) returns 0', () => {
    assert.strictEqual(add(-1, 1), 0);
  });
});
```

**Structure:**
- `test()` - Top-level test group
- `t.test()` - Nested subtests
- Descriptive names explain what's being tested
- `async (t) => { ... }` - Required for nested tests

### 4. Testing Strategies

#### Happy Path (Normal Use Cases)
```javascript
test('add(2, 3) returns 5', () => {
  assert.strictEqual(add(2, 3), 5);
});
```

#### Edge Cases (Boundary Values)
```javascript
test('add(0, 0) returns 0', () => {
  assert.strictEqual(add(0, 0), 0);
});
```

#### Error Handling (Expected Failures)
```javascript
test('add with string throws TypeError', () => {
  assert.throws(() => add('2', 3), TypeError);
});
```

#### Floating Point Precision
```javascript
test('add(0.1, 0.2) approximately equals 0.3', () => {
  const result = add(0.1, 0.2);
  assert.ok(Math.abs(result - 0.3) < 0.0001);
});
```

### 5. Test-Driven Development (TDD) Cycle

The classic TDD cycle:

1. **Red** - Write a test (it fails because code doesn't exist)
2. **Green** - Write code to make test pass
3. **Refactor** - Improve code while keeping tests passing

In this exercise, **the code is already written**, so you're focusing on the "Red → Green → Refactor" mindset by validating existing code.

### 6. What Makes a Good Test?

A good test:

✅ **Tests one thing** - One assertion per concept  
✅ **Is readable** - Name describes what it tests  
✅ **Is independent** - Can run in any order  
✅ **Is fast** - Completes instantly  
✅ **Has clear purpose** - Easy to understand why it failed  
✅ **Tests behavior** - Not implementation details  

Example of good test naming:
```javascript
// GOOD: Clearly describes expected behavior
await t.test('divide(10, 0) throws Error', () => {

// BAD: Vague, doesn't describe what's being tested
await t.test('test divide', () => {
```

## Project Structure

```
178-calc-node-test/
├── calculator.js          # Complete calculator (ready to use)
├── calculator.test.js     # Test skeleton (YOUR JOB: fill this)
├── package.json           # Project config
├── exercise.json          # Exercise metadata
└── README.md              # This file
```

### calculator.js (Complete)

Provides 6 functions:

```javascript
add(a, b)      // a + b
subtract(a, b) // a - b
multiply(a, b) // a * b
divide(a, b)   // a / b (throws on divide by zero)
power(a, b)    // a ^ b
modulo(a, b)   // a % b (throws on modulo by zero)
```

All functions:
- Accept 2 numbers as parameters
- Return the calculated result
- Throw `TypeError` if inputs aren't numbers
- Throw `Error` for invalid operations (divide by zero, etc.)

### calculator.test.js (Your Job)

Contains 7 test groups with TODO placeholders:

1. **Addition Tests** (4 tests)
2. **Subtraction Tests** (4 tests)
3. **Multiplication Tests** (4 tests)
4. **Division Tests** (4 tests)
5. **Power Tests** (4 tests)
6. **Modulo Tests** (4 tests)
7. **Chained Operations** (3 tests)

Total: ~27 test cases to write

## Running Tests

### Run All Tests
```bash
npm test
```

Output shows each test with ✓ (pass) or ✗ (fail).

### Watch Mode (Re-run on File Change)
```bash
npm run test:watch
```

Perfect for TDD - tests re-run automatically as you edit.

## Your Tasks

### Task 1: Addition Tests

Complete these assertions:

```javascript
await t.test('add(2, 3) returns 5', () => {
  // Write: assert.strictEqual(add(2, 3), 5);
});
```

**Hints:**
- Call the function: `add(2, 3)`
- Assert result: `assert.strictEqual(result, expected)`

### Task 2: Error Handling Tests

Complete the error test:

```javascript
await t.test('add with string argument throws TypeError', () => {
  // Write: assert.throws(() => add('2', 3), TypeError);
});
```

**Pattern for error testing:**
```javascript
assert.throws(
  () => functionThatThrows(),
  ErrorType
);
```

### Task 3: Division by Zero

Complete divide by zero test:

```javascript
await t.test('divide(10, 0) throws Error', () => {
  // Write assertion that divide by zero throws
});
```

### Task 4: Chained Operations

Complete multi-step calculation:

```javascript
await t.test('(10 + 5) * 2 = 30', () => {
  // Step 1: Call add(10, 5)
  // Step 2: Multiply result by 2
  // Step 3: Assert equals 30
});
```

Pattern:
```javascript
const step1 = add(10, 5);    // 15
const result = multiply(step1, 2); // 30
assert.strictEqual(result, 30);
```

## Testing Examples

### Example 1: Simple Assertion
```javascript
await t.test('add(2, 3) returns 5', () => {
  assert.strictEqual(add(2, 3), 5);
});
```

### Example 2: Error Handling
```javascript
await t.test('add with string throws TypeError', () => {
  assert.throws(() => add('2', 3), TypeError);
});
```

### Example 3: Floating Point
```javascript
await t.test('add(0.1, 0.2) approximately equals 0.3', () => {
  const result = add(0.1, 0.2);
  assert.ok(Math.abs(result - 0.3) < 0.0001);
});
```

### Example 4: Chained Calls
```javascript
await t.test('(10 + 5) * 2 = 30', () => {
  const step1 = add(10, 5);
  const result = multiply(step1, 2);
  assert.strictEqual(result, 30);
});
```

## Assertion Reference

| Assertion | Purpose | Example |
|-----------|---------|---------|
| `assert.strictEqual(a, b)` | Exact equality (`===`) | `assert.strictEqual(add(2,3), 5)` |
| `assert.ok(value)` | Truthy check | `assert.ok(result > 0)` |
| `assert.throws(fn, ErrorType)` | Function throws | `assert.throws(() => divide(1,0), Error)` |
| `assert.deepStrictEqual(a, b)` | Deep object equality | `assert.deepStrictEqual({x:1}, {x:1})` |

## Real-World Testing

Professional testing frameworks built on these concepts:

- **Vitest** - Modern, fast testing (Exercise 179)
- **Jest** - Facebook's testing framework (Exercise 180)
- **Mocha** - Popular test runner
- **Jasmine** - BDD-style testing

But they all use the same fundamental concepts: organize tests, write assertions, check behavior.

## Success Criteria

You've completed this exercise when:

- ✅ All TODO comments replaced with assertions
- ✅ `npm test` runs without errors
- ✅ All ~27 tests pass (show as ✓)
- ✅ Tests cover happy path (normal cases)
- ✅ Tests cover edge cases (0, negative, floating point)
- ✅ Tests cover error cases (invalid types, divide by zero)
- ✅ Test names clearly describe what they test
- ✅ Code is well-commented explaining assertions

## Testing Checklist

Before submitting, verify:

- [ ] Addition tests (4 tests) - All passing
- [ ] Subtraction tests (4 tests) - All passing
- [ ] Multiplication tests (4 tests) - All passing
- [ ] Division tests (4 tests, including 0 case) - All passing
- [ ] Power tests (4 tests) - All passing
- [ ] Modulo tests (4 tests, including 0 case) - All passing
- [ ] Chained operations (3 tests) - All passing
- [ ] All error tests throw correct error types
- [ ] No TODO comments remaining
- [ ] All tests pass: `npm test` shows all ✓

## Common Mistakes to Avoid

❌ **Forgetting to call the function**
```javascript
// Wrong
await t.test('add(2, 3) returns 5', () => {
  assert.strictEqual(2 + 3, 5); // Testing raw JS, not your function!
});
```

✅ **Call the actual function**
```javascript
// Correct
await t.test('add(2, 3) returns 5', () => {
  assert.strictEqual(add(2, 3), 5);
});
```

---

❌ **Wrong error assertion syntax**
```javascript
// Wrong
assert.throws(add('2', 3), TypeError); // Calls immediately!
```

✅ **Pass function, not result**
```javascript
// Correct
assert.throws(() => add('2', 3), TypeError); // Wrapped in arrow function
```

---

❌ **Multiple assertions in one test**
```javascript
// Avoid - harder to debug
await t.test('addition operations', () => {
  assert.strictEqual(add(2, 3), 5);
  assert.strictEqual(add(0, 0), 0);
  assert.strictEqual(add(-1, 1), 0);
});
```

✅ **One assertion per test**
```javascript
// Better - clear purpose
await t.test('add(2, 3) returns 5', () => {
  assert.strictEqual(add(2, 3), 5);
});
```

## Learning Path

**Phase 1: Happy Path**
- Write tests for normal use cases
- Learn `assert.strictEqual()`
- Understand test naming

**Phase 2: Edge Cases**
- Test boundary values (0, negative numbers)
- Test floating-point precision
- Learn when to use different assertions

**Phase 3: Error Handling**
- Write tests that expect errors
- Learn `assert.throws()`
- Verify error types and messages

**Phase 4: Complexity**
- Chain multiple function calls
- Test real-world scenarios
- Think about test coverage

## Next Steps

After completing this exercise:

1. **Exercise 179** - Learn Vitest (modern testing framework)
2. **Exercise 180** - Learn Jest (industry-standard framework)
3. **Meta-testing** - Verify your tests actually test the code

**Key insight:** Good tests are documentation. Another developer can read your tests and understand exactly how the code should behave.

---

**Estimated Time:** 1.5 hours

**Difficulty:** Intermediate

**Focus:** Writing effective tests, understanding assertions, TDD mindset
