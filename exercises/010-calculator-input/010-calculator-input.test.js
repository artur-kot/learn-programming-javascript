import test from 'node:test';
import assert from 'node:assert';
import { add, subtract, multiply, divide, modulo, power, squareRoot } from './010-calculator-input.js';

test('Calculator Input - add should handle string inputs', (t) => {
  assert.strictEqual(typeof add, 'function', 'add should be a function');
  assert.strictEqual(add("10", "5"), 15, 'add("10", "5") should return 15');
  assert.strictEqual(add("100", "250"), 350, 'add("100", "250") should return 350');
  assert.strictEqual(add(10, "5"), 15, 'add(10, "5") should handle mixed types');
  assert.strictEqual(add("7.5", "2.5"), 10, 'add("7.5", "2.5") should handle decimals');
});

test('Calculator Input - subtract should handle string inputs', (t) => {
  assert.strictEqual(subtract("10", "5"), 5, 'subtract("10", "5") should return 5');
  assert.strictEqual(subtract("100", "50"), 50, 'subtract("100", "50") should return 50');
  assert.strictEqual(subtract(15, "7"), 8, 'subtract(15, "7") should handle mixed types');
});

test('Calculator Input - multiply should handle string inputs', (t) => {
  assert.strictEqual(multiply("10", "5"), 50, 'multiply("10", "5") should return 50');
  assert.strictEqual(multiply("6", "7"), 42, 'multiply("6", "7") should return 42');
  assert.strictEqual(multiply("3", 4), 12, 'multiply("3", 4) should handle mixed types');
});

test('Calculator Input - divide should handle string inputs', (t) => {
  assert.strictEqual(divide("10", "5"), 2, 'divide("10", "5") should return 2');
  assert.strictEqual(divide("20", "4"), 5, 'divide("20", "4") should return 5');
  assert.strictEqual(divide(100, "10"), 10, 'divide(100, "10") should handle mixed types');
});

test('Calculator Input - modulo should handle string inputs', (t) => {
  assert.strictEqual(modulo("10", "3"), 1, 'modulo("10", "3") should return 1');
  assert.strictEqual(modulo("17", "5"), 2, 'modulo("17", "5") should return 2');
  assert.strictEqual(modulo(20, "4"), 0, 'modulo(20, "4") should handle mixed types');
});

test('Calculator Input - power should handle string inputs', (t) => {
  assert.strictEqual(power("2", "3"), 8, 'power("2", "3") should return 8');
  assert.strictEqual(power("5", "2"), 25, 'power("5", "2") should return 25');
  assert.strictEqual(power(10, "2"), 100, 'power(10, "2") should handle mixed types');
});

test('Calculator Input - squareRoot should handle string inputs', (t) => {
  assert.strictEqual(squareRoot("16"), 4, 'squareRoot("16") should return 4');
  assert.strictEqual(squareRoot("25"), 5, 'squareRoot("25") should return 5');
  assert.strictEqual(squareRoot("9"), 3, 'squareRoot("9") should return 3');
});

test('Calculator Input - should handle decimal string inputs', (t) => {
  assert.strictEqual(add("3.5", "2.5"), 6, 'Should handle decimal strings in add');
  assert.strictEqual(multiply("2.5", "4"), 10, 'Should handle decimal strings in multiply');
});
