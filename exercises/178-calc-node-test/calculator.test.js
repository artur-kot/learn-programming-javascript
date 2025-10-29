/**
 * Calculator Tests using Node.js Built-in Testing Framework
 * 
 * The calculator.js is COMPLETE and WORKING.
 * Your job: WRITE THE TESTS to verify it works correctly.
 * 
 * Use these test skeletons as a guide. Replace the ?????? with actual assertions.
 * 
 * Run tests with: npm test
 * Run in watch mode: npm run test:watch
 * 
 * TESTING CONCEPTS TO LEARN:
 * - node:test - Node's built-in test runner (since Node 18)
 * - node:assert - Built-in assertion library
 * - assert.strictEqual(actual, expected) - Check exact equality
 * - assert.throws(() => fn(), ErrorType) - Check that function throws
 * - test() and test.describe() - Organize tests
 */

import test from 'node:test';
import assert from 'node:assert';
import { add, subtract, multiply, divide, power, modulo } from './calculator.js';

// ============================================
// TEST SECTION 1: Addition
// ============================================

test('Addition Tests', async (t) => {
  await t.test('add(2, 3) returns 5', () => {
    // TODO: Write assertion that checks add(2, 3) equals 5
    // HINT: Use assert.strictEqual(actual, expected)
  });

  await t.test('add(-1, 1) returns 0', () => {
    // TODO: Write assertion
  });

  await t.test('add(0.1, 0.2) approximately equals 0.3', () => {
    // TODO: Write assertion (hint: use Math.abs for floating point)
  });

  await t.test('add with string argument throws TypeError', () => {
    // TODO: Write assertion that checks add('2', 3) throws
    // HINT: Use assert.throws(() => add('2', 3), TypeError)
  });
});

// ============================================
// TEST SECTION 2: Subtraction
// ============================================

test('Subtraction Tests', async (t) => {
  await t.test('subtract(5, 3) returns 2', () => {
    // TODO: Write assertion
  });

  await t.test('subtract(3, 5) returns -2', () => {
    // TODO: Write assertion
  });

  await t.test('subtract(0, 0) returns 0', () => {
    // TODO: Write assertion
  });

  await t.test('subtract with non-number throws TypeError', () => {
    // TODO: Write assertion
  });
});

// ============================================
// TEST SECTION 3: Multiplication
// ============================================

test('Multiplication Tests', async (t) => {
  await t.test('multiply(4, 5) returns 20', () => {
    // TODO: Write assertion
  });

  await t.test('multiply(0, 100) returns 0', () => {
    // TODO: Write assertion
  });

  await t.test('multiply(-2, 3) returns -6', () => {
    // TODO: Write assertion
  });

  await t.test('multiply with non-number throws TypeError', () => {
    // TODO: Write assertion
  });
});

// ============================================
// TEST SECTION 4: Division
// ============================================

test('Division Tests', async (t) => {
  await t.test('divide(10, 2) returns 5', () => {
    // TODO: Write assertion
  });

  await t.test('divide(7, 2) returns 3.5', () => {
    // TODO: Write assertion
  });

  await t.test('divide(10, 0) throws Error', () => {
    // TODO: Write assertion that divide by zero throws
  });

  await t.test('divide with non-number throws TypeError', () => {
    // TODO: Write assertion
  });
});

// ============================================
// TEST SECTION 5: Power
// ============================================

test('Power Tests', async (t) => {
  await t.test('power(2, 3) returns 8', () => {
    // TODO: Write assertion
  });

  await t.test('power(5, 0) returns 1', () => {
    // TODO: Write assertion
  });

  await t.test('power(2, -1) returns 0.5', () => {
    // TODO: Write assertion
  });

  await t.test('power with non-number throws TypeError', () => {
    // TODO: Write assertion
  });
});

// ============================================
// TEST SECTION 6: Modulo
// ============================================

test('Modulo Tests', async (t) => {
  await t.test('modulo(10, 3) returns 1', () => {
    // TODO: Write assertion
  });

  await t.test('modulo(20, 5) returns 0', () => {
    // TODO: Write assertion
  });

  await t.test('modulo(10, 0) throws Error', () => {
    // TODO: Write assertion
  });

  await t.test('modulo with non-number throws TypeError', () => {
    // TODO: Write assertion
  });
});

// ============================================
// TEST SECTION 7: Chained Operations
// ============================================

test('Chained Operations', async (t) => {
  await t.test('(10 + 5) * 2 = 30', () => {
    // TODO: Call add(), then multiply the result by 2, assert equals 30
  });

  await t.test('(20 - 8) / 2 = 6', () => {
    // TODO: Call subtract(), then divide the result by 2, assert equals 6
  });

  await t.test('power(2, 3) * 5 = 40', () => {
    // TODO: Call power(), then multiply by 5, assert equals 40
  });
});
