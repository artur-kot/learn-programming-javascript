import test from 'node:test';
import assert from 'node:assert';
import { add, subtract, multiply, divide, modulo, power, squareRoot } from './012-calculator-validation.js';

test('Calculator Validation - operations work with valid inputs', (t) => {
  assert.strictEqual(add(10, 5), 15, 'add should work with valid numbers');
  assert.strictEqual(subtract(10, 5), 5, 'subtract should work with valid numbers');
  assert.strictEqual(multiply(10, 5), 50, 'multiply should work with valid numbers');
  assert.strictEqual(divide(10, 5), 2, 'divide should work with valid numbers');
  assert.strictEqual(modulo(10, 3), 1, 'modulo should work with valid numbers');
  assert.strictEqual(power(2, 3), 8, 'power should work with valid numbers');
  assert.strictEqual(squareRoot(16), 4, 'squareRoot should work with valid numbers');
});

test('Calculator Validation - add detects invalid inputs', (t) => {
  assert.strictEqual(add("hello", 5), "Error: Invalid input", 'Should detect invalid first input');
  assert.strictEqual(add(5, "world"), "Error: Invalid input", 'Should detect invalid second input');
  assert.strictEqual(add("abc", "def"), "Error: Invalid input", 'Should detect both invalid inputs');
});

test('Calculator Validation - subtract detects invalid inputs', (t) => {
  assert.strictEqual(subtract("hello", 5), "Error: Invalid input", 'Should detect invalid first input');
  assert.strictEqual(subtract(10, "world"), "Error: Invalid input", 'Should detect invalid second input');
});

test('Calculator Validation - multiply detects invalid inputs', (t) => {
  assert.strictEqual(multiply("hello", 5), "Error: Invalid input", 'Should detect invalid first input');
  assert.strictEqual(multiply(10, "world"), "Error: Invalid input", 'Should detect invalid second input');
});

test('Calculator Validation - divide detects invalid inputs', (t) => {
  assert.strictEqual(divide("hello", 5), "Error: Invalid input", 'Should detect invalid first input');
  assert.strictEqual(divide(10, "world"), "Error: Invalid input", 'Should detect invalid second input');
});

test('Calculator Validation - divide detects division by zero', (t) => {
  assert.strictEqual(divide(10, 0), "Error: Division by zero", 'Should detect division by zero');
  assert.strictEqual(divide(100, 0), "Error: Division by zero", 'Should detect division by zero');
  assert.strictEqual(divide(0, 0), "Error: Division by zero", 'Should detect 0/0');
});

test('Calculator Validation - modulo detects division by zero', (t) => {
  assert.strictEqual(modulo(10, 0), "Error: Division by zero", 'Should detect modulo by zero');
  assert.strictEqual(modulo(5, 0), "Error: Division by zero", 'Should detect modulo by zero');
});

test('Calculator Validation - modulo detects invalid inputs', (t) => {
  assert.strictEqual(modulo("hello", 5), "Error: Invalid input", 'Should detect invalid input');
});

test('Calculator Validation - power detects invalid inputs', (t) => {
  assert.strictEqual(power("hello", 2), "Error: Invalid input", 'Should detect invalid base');
  assert.strictEqual(power(2, "world"), "Error: Invalid input", 'Should detect invalid exponent');
});

test('Calculator Validation - squareRoot detects invalid inputs', (t) => {
  assert.strictEqual(squareRoot("hello"), "Error: Invalid input", 'Should detect invalid input');
});

test('Calculator Validation - squareRoot detects negative numbers', (t) => {
  assert.strictEqual(squareRoot(-16), "Error: Cannot calculate square root of negative number", 'Should detect negative number');
  assert.strictEqual(squareRoot(-1), "Error: Cannot calculate square root of negative number", 'Should detect negative number');
});

test('Calculator Validation - squareRoot allows zero', (t) => {
  assert.strictEqual(squareRoot(0), 0, 'Should allow square root of zero');
});
