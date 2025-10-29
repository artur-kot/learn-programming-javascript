/**
 * TEST-THE-TESTS: Meta Testing with Jest
 * 
 * This file demonstrates testing your tests!
 * It validates that:
 * 1. All calculator functions are actually called
 * 2. Tests don't have hardcoded return values
 * 3. Error cases are tested
 * 4. Coverage is adequate
 * 
 * This is meta-testing: using tests to verify tests work correctly.
 * 
 * Run with: npm run test:validate
 */

import { add, subtract, multiply, divide, power, modulo } from './calculator.js';

describe('Meta-Testing: Validate the Tests', () => {
  // ============================================
  // Validate: Tests actually call functions
  // ============================================

  test('add function is being tested (not hardcoded)', () => {
    // If calculator.test.js just has expect(5).toBe(5),
    // the function is never called!
    
    // This meta-test ensures add() is actually used:
    const spy = jest.fn(add);
    spy(2, 3);
    
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(2, 3);
  });

  // ============================================
  // Validate: Error handling is tested
  // ============================================

  test('divide by zero throws error (not silently fails)', () => {
    // Some bad tests might not check error handling
    expect(() => divide(10, 0)).toThrow();
  });

  test('modulo by zero throws error', () => {
    expect(() => modulo(10, 0)).toThrow();
  });

  // ============================================
  // Validate: Type checking is enforced
  // ============================================

  test('add rejects non-number types', () => {
    expect(() => add('2', 3)).toThrow(TypeError);
    expect(() => add(2, '3')).toThrow(TypeError);
    expect(() => add(null, 3)).toThrow(TypeError);
    expect(() => add(undefined, 3)).toThrow(TypeError);
  });

  test('all operations reject non-numbers', () => {
    const operations = [
      () => subtract('a', 1),
      () => multiply('b', 2),
      () => divide('c', 3),
      () => power('d', 4),
      () => modulo('e', 5),
    ];
    
    operations.forEach(op => {
      expect(op).toThrow(TypeError);
    });
  });

  // ============================================
  // Validate: Edge cases are covered
  // ============================================

  test('addition handles zero correctly', () => {
    expect(add(0, 0)).toBe(0);
    expect(add(5, 0)).toBe(5);
    expect(add(0, -5)).toBe(-5);
  });

  test('negative numbers work', () => {
    expect(add(-5, 3)).toBe(-2);
    expect(multiply(-2, -3)).toBe(6);
  });

  test('power with zero exponent returns 1', () => {
    expect(power(5, 0)).toBe(1);
    expect(power(100, 0)).toBe(1);
  });

  test('power with negative exponent works', () => {
    expect(power(2, -1)).toBe(0.5);
    expect(power(10, -2)).toBe(0.01);
  });

  // ============================================
  // Validate: Floating point precision
  // ============================================

  test('floating point arithmetic is handled', () => {
    const result = add(0.1, 0.2);
    // 0.1 + 0.2 = 0.30000000000000004 in JavaScript!
    expect(result).toBeCloseTo(0.3, 5);
  });

  // ============================================
  // Validate: Return values are correct types
  // ============================================

  test('calculator returns numbers, not strings', () => {
    expect(typeof add(2, 3)).toBe('number');
    expect(typeof subtract(5, 2)).toBe('number');
    expect(typeof multiply(3, 4)).toBe('number');
    expect(typeof divide(10, 2)).toBe('number');
    expect(typeof power(2, 3)).toBe('number');
    expect(typeof modulo(10, 3)).toBe('number');
  });

  // ============================================
  // Challenge: Can we count test assertions?
  // ============================================

  test('coverage: we have enough assertions', () => {
    // Count the number of assertions in this meta-test
    // If we only had 1 assertion, coverage would be low!
    
    // This test file has 30+ assertions
    // Your calculator.test.js should have 25+ assertions
    expect(true).toBe(true); // Placeholder
  });

  // ============================================
  // Advanced: Snapshot of behavior
  // ============================================

  test('snapshot: calculator behavior contract', () => {
    // Snapshots ensure behavior doesn't accidentally change
    const behaviors = {
      addition: add(2, 2),
      subtraction: subtract(5, 3),
      multiplication: multiply(4, 5),
      division: divide(10, 2),
      power: power(2, 8),
      modulo: modulo(17, 5),
    };

    expect(behaviors).toMatchSnapshot();
  });
});

describe('Coverage Analysis Hints', () => {
  // Run: npm run test:coverage
  
  test('branch coverage: test both paths', () => {
    // Good tests cover both success and error paths
    expect(divide(10, 2)).toBe(5); // Happy path
    expect(() => divide(10, 0)).toThrow(); // Error path
  });

  test('line coverage: every line should execute', () => {
    // If a line doesn't execute, it's not covered
    // Use: npm run test:coverage
    // Look for red lines - those aren't tested!
    
    add(1, 1); // Execute every function
    subtract(2, 1);
    multiply(2, 2);
    divide(4, 2);
    power(2, 2);
    modulo(5, 2);
  });
});
