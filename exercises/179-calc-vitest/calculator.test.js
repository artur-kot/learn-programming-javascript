/**
 * Calculator Tests using Vitest
 * 
 * Same calculator tests as Exercise 178, but now using Vitest!
 * 
 * Vitest features:
 * - describe/it syntax (familiar from Jest)
 * - beforeEach/afterEach hooks for setup/teardown
 * - Test UI with --ui flag
 * - Snapshot testing
 * - Faster than node:test
 * 
 * Run tests with: npm test
 * Run once: npm run test:run
 * UI Mode: npm run test:ui
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { add, subtract, multiply, divide, power, modulo } from './calculator.js';

// ============================================
// EXAMPLE: How Vitest differs from node:test
// ============================================

// node:test syntax:
// test('my test', async (t) => {
//   await t.test('subtest', () => { });
// });
// assert.strictEqual(a, b);

// Vitest syntax:
// describe('my test group', () => {
//   it('my test', () => {
//     expect(a).toBe(b);
//   });
// });

// ============================================
// VITEST HOOKS (setup/teardown)
// ============================================

// beforeEach runs before each test
// afterEach runs after each test
// Perfect for resetting state or initializing test data

let callCount = 0;

beforeEach(() => {
  callCount = 0;
  // Reset test state
});

afterEach(() => {
  // Cleanup after each test (optional)
});

// ============================================
// TEST SECTION 1: Addition
// ============================================

describe('Addition', () => {
  it('add(2, 3) returns 5', () => {
    // TODO: Use expect(add(2, 3)).toBe(5)
    // OR expect(add(2, 3)).toEqual(5)
  });

  it('add(-1, 1) returns 0', () => {
    // TODO: Write expectation
  });

  it('add(0.1, 0.2) approximately equals 0.3', () => {
    // TODO: Use expect().toBeCloseTo(expected, decimals)
    // HINT: expect(0.3).toBeCloseTo(0.30000000001, 5)
  });

  it('add with string argument throws TypeError', () => {
    // TODO: Use expect(() => add('2', 3)).toThrow(TypeError)
  });
});

// ============================================
// TEST SECTION 2: Subtraction
// ============================================

describe('Subtraction', () => {
  it('subtract(5, 3) returns 2', () => {
    // TODO: Write expectation
  });

  it('subtract(3, 5) returns -2', () => {
    // TODO: Write expectation
  });

  it('subtract(0, 0) returns 0', () => {
    // TODO: Write expectation
  });

  it('subtract with non-number throws TypeError', () => {
    // TODO: Write expectation
  });
});

// ============================================
// TEST SECTION 3: Multiplication
// ============================================

describe('Multiplication', () => {
  it('multiply(4, 5) returns 20', () => {
    // TODO: Write expectation
  });

  it('multiply(0, 100) returns 0', () => {
    // TODO: Write expectation
  });

  it('multiply(-2, 3) returns -6', () => {
    // TODO: Write expectation
  });

  it('multiply with non-number throws TypeError', () => {
    // TODO: Write expectation
  });
});

// ============================================
// TEST SECTION 4: Division
// ============================================

describe('Division', () => {
  it('divide(10, 2) returns 5', () => {
    // TODO: Write expectation
  });

  it('divide(7, 2) returns 3.5', () => {
    // TODO: Write expectation
  });

  it('divide(10, 0) throws Error', () => {
    // TODO: Write expectation
  });

  it('divide with non-number throws TypeError', () => {
    // TODO: Write expectation
  });
});

// ============================================
// TEST SECTION 5: Power
// ============================================

describe('Power', () => {
  it('power(2, 3) returns 8', () => {
    // TODO: Write expectation
  });

  it('power(5, 0) returns 1', () => {
    // TODO: Write expectation
  });

  it('power(2, -1) returns 0.5', () => {
    // TODO: Write expectation
  });

  it('power with non-number throws TypeError', () => {
    // TODO: Write expectation
  });
});

// ============================================
// TEST SECTION 6: Modulo
// ============================================

describe('Modulo', () => {
  it('modulo(10, 3) returns 1', () => {
    // TODO: Write expectation
  });

  it('modulo(20, 5) returns 0', () => {
    // TODO: Write expectation
  });

  it('modulo(10, 0) throws Error', () => {
    // TODO: Write expectation
  });

  it('modulo with non-number throws TypeError', () => {
    // TODO: Write expectation
  });
});

// ============================================
// TEST SECTION 7: Chained Operations
// ============================================

describe('Chained Operations', () => {
  it('(10 + 5) * 2 = 30', () => {
    // TODO: Chain add() then multiply()
  });

  it('(20 - 8) / 2 = 6', () => {
    // TODO: Chain subtract() then divide()
  });

  it('power(2, 3) * 5 = 40', () => {
    // TODO: Chain power() then multiply()
  });
});

// ============================================
// ADVANCED: Snapshot Testing (Optional Challenge)
// ============================================

// Vitest supports snapshot testing!
// Snapshots capture output and ensure it doesn't change unexpectedly

// Example:
// it('calculator result snapshot', () => {
//   const result = add(2, 3);
//   expect(result).toMatchSnapshot();
// });
//
// On first run, creates .snap file
// On subsequent runs, compares against snapshot
// Use 'u' flag to update snapshots if intentional change
