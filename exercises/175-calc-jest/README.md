# Exercise 180: Calculator Tests - Jest + Meta-Testing

## Overview

Master **Jest**, the industry-standard testing framework used by React teams, Node.js backends, and professional projects worldwide. Learn:
- Jest syntax and powerful matchers
- Test coverage analysis
- **Meta-testing** (testing your tests!)
- Professional testing practices

## Key Concepts

### 1. Jest Features

Jest is powerful and comprehensive:

```javascript
describe('Calculator', () => {
  test('add(2, 3) returns 5', () => {
    expect(add(2, 3)).toBe(5);
  });
});
```

**Why Jest is industry standard:**
- Zero configuration (mostly)
- 50+ built-in matchers
- Snapshot testing
- Coverage reporting
- Parallel execution
- Great documentation

### 2. Jest Matchers Reference

```javascript
// Equality
expect(value).toBe(5);
expect(obj).toEqual({ x: 1 });

// Truthiness
expect(true).toBeTruthy();
expect(false).toBeFalsy();

// Numbers
expect(2 + 2).toBeGreaterThan(3);
expect(5).toBeLessThan(10);
expect(0.3).toBeCloseTo(0.30000000001, 5);

// Strings
expect('Jest').toMatch(/es/);

// Arrays
expect([1, 2]).toContain(1);

// Errors
expect(() => fn()).toThrow();
expect(() => fn()).toThrow(Error);

// Spying
const spy = jest.fn();
spy(1, 2);
expect(spy).toHaveBeenCalled();
expect(spy).toHaveBeenCalledWith(1, 2);
```

### 3. Test Coverage

Run with:
```bash
npm run test:coverage
```

Coverage shows:
- **Statements** - Lines of code executed (%)
- **Branches** - If/else paths taken (%)
- **Functions** - Functions that were called (%)
- **Lines** - Physical lines executed (%)

Goal: 80%+ coverage for all metrics.

### 4. Meta-Testing: Test the Tests!

**Meta-testing** validates that your tests actually test the code:

✅ **Good test:**
```javascript
test('add(2, 3) returns 5', () => {
  expect(add(2, 3)).toBe(5); // Calls the function
});
```

❌ **Bad test (even though it passes):**
```javascript
test('add(2, 3) returns 5', () => {
  expect(5).toBe(5); // Hardcoded! Never calls add()
});
```

Meta-tests catch bad tests:

```javascript
test('add function is actually tested', () => {
  const spy = jest.fn(add);
  spy(2, 3);
  expect(spy).toHaveBeenCalled();
});
```

## Understanding meta-testing.js

This file contains meta-tests that validate:

1. **Functions are called** - Tests actually use calculator functions
2. **Error handling** - Error paths are tested
3. **Type checking** - Type validation is tested
4. **Edge cases** - Zero, negative, special values tested
5. **Return types** - Functions return numbers, not strings
6. **Coverage** - Adequate number of assertions

Run meta-tests:
```bash
npm run test:validate
```

## Running Tests

```bash
# Normal test run
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# Meta-tests (validates test quality)
npm run test:validate
```

## Your Tasks

### Task 1: Write Calculator Tests

Complete the calculator.test.js using Jest syntax:

```javascript
describe('Addition', () => {
  test('add(2, 3) returns 5', () => {
    // TODO: expect(add(2, 3)).toBe(5);
  });
});
```

Key patterns:
- `describe()` - Test group
- `test()` - Individual test
- `expect()` - Assertion
- `.toBe()` - Exact match
- `.toThrow()` - Error checking
- `.toBeCloseTo()` - Floating point

### Task 2: Understand Meta-Tests

Read test-validator.js to understand:
- How to verify tests actually call functions
- How to check error handling coverage
- How to validate type checking
- How to ensure edge cases are tested

### Task 3: Validate Your Tests

Run meta-tests to verify quality:
```bash
npm run test:validate
```

If meta-tests pass, your tests are solid!

## Framework Progression

### Exercise 178: node:test
- Built-in Node.js
- Learning fundamentals
- No dependencies

### Exercise 179: Vitest
- Modern & fast
- Familiar syntax (describe/it)
- Growing popularity

### Exercise 180: Jest
- Industry standard
- Most widely used
- Professional teams use this
- Advanced features (mocking, snapshots)

## Why Jest?

**Jest is used by:**
- React teams (Facebook's testing framework)
- Vue.js core team
- Babel team
- Node.js projects
- 5+ million npm downloads/week

**Jest advantages:**
- Zero config (works out of box)
- Great error messages
- Snapshots for UI testing
- Mocking built-in
- Watch mode experience is excellent

## Coverage Challenge

After writing tests, run:
```bash
npm run test:coverage
```

Aim for 80%+ coverage on:
- Statements (lines of code)
- Branches (if/else paths)
- Functions (all functions called)
- Lines (physical lines)

Uncovered lines appear in RED in the report.

## Success Criteria

- ✅ All ~27 tests written with Jest syntax
- ✅ `npm test` shows all passing
- ✅ `npm run test:coverage` shows 80%+ coverage
- ✅ `npm run test:validate` shows meta-tests passing
- ✅ No TODO comments remaining
- ✅ Tests cover happy path, edge cases, errors
- ✅ Tests document expected behavior

## Professional Practices

Professional teams use:

1. **100% coverage goal** - Catch bugs before production
2. **Meta-tests** - Verify test quality
3. **CI/CD integration** - Tests run on every commit
4. **Snapshot tests** - Detect unintended changes
5. **Performance tests** - Track speed regressions

You're learning professional testing practices!

---

**Estimated Time:** 1.5 hours | **Difficulty:** Intermediate

**Key Insight:** Good tests are documentation. They show how code should behave and catch bugs before they reach users.
