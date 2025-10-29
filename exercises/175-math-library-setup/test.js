/**
 * Test Suite for Math Library
 * Tests all functions to ensure they work correctly
 */

import * as math from './src/math.js';
import * as trig from './src/trigonometry.js';
import * as stats from './src/statistics.js';

// Color codes for output
const green = '\x1b[32m';
const red = '\x1b[31m';
const reset = '\x1b[0m';
const blue = '\x1b[34m';

let passed = 0;
let failed = 0;

/**
 * Assert that a value equals expected
 */
function assert(actual, expected, testName) {
  const tolerance = 0.0001;
  const isEqual = Math.abs(actual - expected) < tolerance;
  
  if (isEqual) {
    console.log(`${green}✓${reset} ${testName}`);
    passed++;
  } else {
    console.log(`${red}✗${reset} ${testName}`);
    console.log(`  Expected: ${expected}, Got: ${actual}`);
    failed++;
  }
}

/**
 * Assert that code throws an error
 */
function assertThrows(fn, testName) {
  try {
    fn();
    console.log(`${red}✗${reset} ${testName} (no error thrown)`);
    failed++;
  } catch (e) {
    console.log(`${green}✓${reset} ${testName}`);
    passed++;
  }
}

// Math Tests
console.log(`${blue}=== Math Functions ===${reset}`);
assert(math.add(5, 3), 8, 'add(5, 3) = 8');
assert(math.subtract(10, 4), 6, 'subtract(10, 4) = 6');
assert(math.multiply(4, 7), 28, 'multiply(4, 7) = 28');
assert(math.divide(20, 4), 5, 'divide(20, 4) = 5');
assert(math.modulo(17, 5), 2, 'modulo(17, 5) = 2');
assert(math.power(2, 8), 256, 'power(2, 8) = 256');
assert(math.squareRoot(144), 12, 'squareRoot(144) = 12');
assert(math.absolute(-42), 42, 'absolute(-42) = 42');
assert(math.round(3.7), 4, 'round(3.7) = 4');
assert(math.round(3.456, 2), 3.46, 'round(3.456, 2) = 3.46');
assert(math.factorial(5), 120, 'factorial(5) = 120');
assertThrows(() => math.divide(5, 0), 'divide(5, 0) throws error');
assertThrows(() => math.squareRoot(-5), 'squareRoot(-5) throws error');

// Trigonometry Tests
console.log(`${blue}=== Trigonometry Functions ===${reset}`);
assert(trig.degreesToRadians(180), Math.PI, 'degreesToRadians(180) = π');
assert(trig.radiansToDegrees(Math.PI), 180, 'radiansToDegrees(π) = 180');
assert(trig.sine(90), 1, 'sine(90°) = 1');
assert(trig.cosine(0), 1, 'cosine(0°) = 1');
assert(trig.hypotenuse(3, 4), 5, 'hypotenuse(3, 4) = 5');
assert(trig.distance(0, 0, 3, 4), 5, 'distance((0,0), (3,4)) = 5');
assert(trig.circumference(5), Math.PI * 10, 'circumference(5) = 10π');
assert(trig.circleArea(5), Math.PI * 25, 'circleArea(5) = 25π');

// Statistics Tests
console.log(`${blue}=== Statistics Functions ===${reset}`);
const testArray = [2, 4, 6, 8, 10];
const testArray2 = [1, 2, 3, 4, 5];

assert(stats.sum(testArray), 30, 'sum([2,4,6,8,10]) = 30');
assert(stats.mean(testArray), 6, 'mean([2,4,6,8,10]) = 6');
assert(stats.median(testArray), 6, 'median([2,4,6,8,10]) = 6');
assert(stats.range(testArray), 8, 'range([2,4,6,8,10]) = 8');
assert(stats.variance(testArray), 8, 'variance([2,4,6,8,10]) = 8');
assert(stats.standardDeviation(testArray), Math.sqrt(8), 'standardDeviation calculated');
assert(stats.percentile(testArray, 6), 60, 'percentile([2,4,6,8,10], 6) = 60');

// Correlation test
const correlation = stats.correlation(testArray, testArray2);
assert(correlation, 1, 'correlation (perfect positive) = 1');

assertThrows(() => stats.mean([]), 'mean([]) throws error');
assertThrows(() => stats.median([]), 'median([]) throws error');

// Summary
console.log(`${blue}=== Test Summary ===${reset}`);
console.log(`${green}Passed: ${passed}${reset}`);
console.log(`${red}Failed: ${failed}${reset}`);
console.log(`Total: ${passed + failed}`);
