import test from 'node:test';
import assert from 'node:assert';
import { add, subtract, multiply, divide, power, squareRoot, formatCurrency, formatPercentage, formatDistance, formatCalculation } from './011-calculator-display.js';

test('Calculator Display - basic operations still work', (t) => {
  assert.strictEqual(add(10, 5), 15, 'add should work');
  assert.strictEqual(subtract(10, 5), 5, 'subtract should work');
  assert.strictEqual(multiply(10, 5), 50, 'multiply should work');
  assert.strictEqual(divide(10, 5), 2, 'divide should work');
});

test('Calculator Display - formatCurrency should format as dollar amount', (t) => {
  assert.strictEqual(typeof formatCurrency, 'function', 'formatCurrency should be a function');
  assert.strictEqual(formatCurrency(19.5), '$19.50', 'formatCurrency(19.5) should return "$19.50"');
  assert.strictEqual(formatCurrency(1234.567), '$1234.57', 'formatCurrency(1234.567) should return "$1234.57"');
  assert.strictEqual(formatCurrency(0.5), '$0.50', 'formatCurrency(0.5) should return "$0.50"');
  assert.strictEqual(formatCurrency(100), '$100.00', 'formatCurrency(100) should return "$100.00"');
});

test('Calculator Display - formatPercentage should format as percentage', (t) => {
  assert.strictEqual(typeof formatPercentage, 'function', 'formatPercentage should be a function');
  assert.strictEqual(formatPercentage(0.156), '15.6%', 'formatPercentage(0.156) should return "15.6%"');
  assert.strictEqual(formatPercentage(0.5), '50.0%', 'formatPercentage(0.5) should return "50.0%"');
  assert.strictEqual(formatPercentage(1.25), '125.0%', 'formatPercentage(1.25) should return "125.0%"');
  assert.strictEqual(formatPercentage(0.075), '7.5%', 'formatPercentage(0.075) should return "7.5%"');
});

test('Calculator Display - formatDistance should format with appropriate units', (t) => {
  assert.strictEqual(typeof formatDistance, 'function', 'formatDistance should be a function');
  assert.strictEqual(formatDistance(500), '500 m', 'formatDistance(500) should return "500 m"');
  assert.strictEqual(formatDistance(1500), '1.50 km', 'formatDistance(1500) should return "1.50 km"');
  assert.strictEqual(formatDistance(2750), '2.75 km', 'formatDistance(2750) should return "2.75 km"');
  assert.strictEqual(formatDistance(999), '999 m', 'formatDistance(999) should return "999 m"');
  assert.strictEqual(formatDistance(1000), '1.00 km', 'formatDistance(1000) should return "1.00 km"');
});

test('Calculator Display - formatCalculation should show full equation', (t) => {
  assert.strictEqual(typeof formatCalculation, 'function', 'formatCalculation should be a function');
  assert.strictEqual(formatCalculation("add", 10, 5.5, 15.5), '10 + 5.5 = 15.50', 'Should format addition');
  assert.strictEqual(formatCalculation("subtract", 10, 3, 7), '10 - 3 = 7.00', 'Should format subtraction');
  assert.strictEqual(formatCalculation("multiply", 7, 3, 21), '7 × 3 = 21.00', 'Should format multiplication');
  assert.strictEqual(formatCalculation("divide", 10, 3, 3.333333), '10 ÷ 3 = 3.33', 'Should format division');
});
