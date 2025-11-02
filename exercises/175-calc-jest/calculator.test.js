/**
 * Calculator Tests using Jest
 * 
 * Jest is the industry-standard testing framework.
 * Used by React teams, Node backends, and professional projects.
 * 
 * Key Jest features:
 * - describe/it syntax (clear test organization)
 * - Powerful matchers: toBe, toEqual, toThrow, etc.
 * - Snapshots for complex output
 * - Built-in coverage reporting: npm run test:coverage
 * - Mocking and spying
 * - Parallel test execution
 * 
 * Run tests: npm test
 * Watch mode: npm run test:watch
 * Coverage: npm run test:coverage
 */

import { add, subtract, multiply, divide, power, modulo } from './calculator.js';

// ============================================
// TEST SECTION 1: Addition
// ============================================

describe('Addition', () => {
  test('add(2, 3) returns 5', () => {
    // TODO: Use expect(add(2, 3)).toBe(5);
  });

  test('add(-1, 1) returns 0', () => {
    // TODO: Write expectation
  });

  test('add(0.1, 0.2) approximately equals 0.3', () => {
    // TODO: Use expect(add(0.1, 0.2)).toBeCloseTo(0.3, 5)
  });

  test('add with string argument throws TypeError', () => {
    // TODO: Use expect(() => add('2', 3)).toThrow(TypeError);
  });
});

// ============================================
// TEST SECTION 2: Subtraction
// ============================================

describe('Subtraction', () => {
  test('subtract(5, 3) returns 2', () => {
    // TODO: Write expectation
  });

  test('subtract(3, 5) returns -2', () => {
    // TODO: Write expectation
  });

  test('subtract(0, 0) returns 0', () => {
    // TODO: Write expectation
  });

  test('subtract with non-number throws TypeError', () => {
    // TODO: Write expectation
  });
});

// ============================================
// TEST SECTION 3: Multiplication
// ============================================

describe('Multiplication', () => {
  test('multiply(4, 5) returns 20', () => {
    // TODO: Write expectation
  });

  test('multiply(0, 100) returns 0', () => {
    // TODO: Write expectation
  });

  test('multiply(-2, 3) returns -6', () => {
    // TODO: Write expectation
  });

  test('multiply with non-number throws TypeError', () => {
    // TODO: Write expectation
  });
});

// ============================================
// TEST SECTION 4: Division
// ============================================

describe('Division', () => {
  test('divide(10, 2) returns 5', () => {
    // TODO: Write expectation
  });

  test('divide(7, 2) returns 3.5', () => {
    // TODO: Write expectation
  });

  test('divide(10, 0) throws Error', () => {
    // TODO: Write expectation
  });

  test('divide with non-number throws TypeError', () => {
    // TODO: Write expectation
  });
});

// ============================================
// TEST SECTION 5: Power
// ============================================

describe('Power', () => {
  test('power(2, 3) returns 8', () => {
    // TODO: Write expectation
  });

  test('power(5, 0) returns 1', () => {
    // TODO: Write expectation
  });

  test('power(2, -1) returns 0.5', () => {
    // TODO: Write expectation
  });

  test('power with non-number throws TypeError', () => {
    // TODO: Write expectation
  });
});

// ============================================
// TEST SECTION 6: Modulo
// ============================================

describe('Modulo', () => {
  test('modulo(10, 3) returns 1', () => {
    // TODO: Write expectation
  });

  test('modulo(20, 5) returns 0', () => {
    // TODO: Write expectation
  });

  test('modulo(10, 0) throws Error', () => {
    // TODO: Write expectation
  });

  test('modulo with non-number throws TypeError', () => {
    // TODO: Write expectation
  });
});

// ============================================
// TEST SECTION 7: Chained Operations
// ============================================

describe('Chained Operations', () => {
  test('(10 + 5) * 2 = 30', () => {
    // TODO: Chain add() then multiply()
  });

  test('(20 - 8) / 2 = 6', () => {
    // TODO: Chain subtract() then divide()
  });

  test('power(2, 3) * 5 = 40', () => {
    // TODO: Chain power() then multiply()
  });
});
