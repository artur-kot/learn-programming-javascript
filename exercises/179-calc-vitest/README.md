# Exercise 179: Calculator Tests - Vitest Framework

## Overview

Learn **Vitest**, a modern testing framework that combines the best of Vitest + Jest. Vitest is:
- **Fast** - Uses Vite's transformation pipeline
- **Familiar** - Jest-compatible syntax (describe/it)
- **Simple** - Less configuration than Jest
- Increasingly popular in modern JavaScript projects

Port your tests from Exercise 178 (node:test) to Vitest and discover framework similarities.

## Key Concepts

### 1. Vitest vs node:test

| Feature | node:test | Vitest |
|---------|-----------|--------|
| Syntax | `test()` | `describe()` / `it()` |
| Assertions | `assert.strictEqual()` | `expect().toBe()` |
| Matchers | Limited | 50+ matchers |
| Speed | Moderate | Very fast |
| Setup | Built-in | npm install |
| UI | No | Yes (--ui) |

### 2. Vitest Expect Matchers

```javascript
// Basic matchers
expect(2 + 2).toBe(4);
expect(add(2, 2)).toEqual(4);

// Floating point
expect(0.3).toBeCloseTo(0.30000000001, 5);

// Errors
expect(() => divide(1, 0)).toThrow(Error);
expect(() => add('2', 3)).toThrow(TypeError);

// Truthy/Falsy
expect(result).toBeTruthy();
expect(error).toBeFalsy();
```

### 3. Vitest Hooks

```javascript
beforeEach(() => {
  // Run before each test
});

afterEach(() => {
  // Run after each test (cleanup)
});

beforeAll(() => {
  // Run once at start
});

afterAll(() => {
  // Run once at end
});
```

### 4. Test Organization

```javascript
describe('Addition', () => {
  it('adds numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
  });

  describe('edge cases', () => {
    it('handles zero', () => {
      expect(add(0, 5)).toBe(5);
    });
  });
});
```

## Running Tests

```bash
# Run tests once
npm run test:run

# Watch mode (re-run on change)
npm test

# UI mode (visual interface)
npm run test:ui
```

## Your Tasks

Complete the calculator tests using Vitest syntax:

```javascript
describe('Addition', () => {
  it('add(2, 3) returns 5', () => {
    // TODO: expect(add(2, 3)).toBe(5);
  });
});
```

Key differences from node:test:
- Use `expect()` instead of `assert.strictEqual()`
- Use `.toBe()` instead of `strictEqual()`
- Use `.toThrow()` instead of `assert.throws()`
- Use `describe/it` instead of `test/t.test()`

## Framework Comparison

After completing this exercise, you'll understand:

| Aspect | node:test | Vitest | Jest |
|--------|-----------|--------|------|
| Built-in | Yes | No | No |
| Install | 0 steps | 1 step | 1 step |
| Learning curve | Easy | Easy | Moderate |
| Speed | Good | Excellent | Good |
| Popular | Growing | Rising | Industry standard |

## Success Criteria

- ✅ All ~27 tests written in Vitest syntax
- ✅ `npm run test:run` shows all tests pass
- ✅ No TODO comments remaining
- ✅ Tests cover happy path, edge cases, errors
- ✅ Test names clearly describe behavior

---

**Estimated Time:** 1.5 hours | **Difficulty:** Intermediate
