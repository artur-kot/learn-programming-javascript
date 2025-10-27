import test from 'node:test';
import assert from 'node:assert';
import { add, subtract, multiply, divide } from './008-calculator-basic.js';

test('Calculator Basic - add should return sum of two numbers', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args);
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof add, 'function', 'add should be a function');
  assert.strictEqual(add(10, 5), 15, 'add(10, 5) should return 15');
  assert.strictEqual(add(100, 250), 350, 'add(100, 250) should return 350');
  assert.strictEqual(add(-5, 10), 5, 'add(-5, 10) should return 5');
  assert.strictEqual(add(0, 0), 0, 'add(0, 0) should return 0');
});

test('Calculator Basic - subtract should return difference of two numbers', (t) => {
  assert.strictEqual(typeof subtract, 'function', 'subtract should be a function');
  assert.strictEqual(subtract(10, 5), 5, 'subtract(10, 5) should return 5');
  assert.strictEqual(subtract(100, 50), 50, 'subtract(100, 50) should return 50');
  assert.strictEqual(subtract(5, 10), -5, 'subtract(5, 10) should return -5');
  assert.strictEqual(subtract(0, 0), 0, 'subtract(0, 0) should return 0');
});

test('Calculator Basic - multiply should return product of two numbers', (t) => {
  assert.strictEqual(typeof multiply, 'function', 'multiply should be a function');
  assert.strictEqual(multiply(10, 5), 50, 'multiply(10, 5) should return 50');
  assert.strictEqual(multiply(6, 7), 42, 'multiply(6, 7) should return 42');
  assert.strictEqual(multiply(-5, 4), -20, 'multiply(-5, 4) should return -20');
  assert.strictEqual(multiply(0, 100), 0, 'multiply(0, 100) should return 0');
});

test('Calculator Basic - divide should return quotient of two numbers', (t) => {
  assert.strictEqual(typeof divide, 'function', 'divide should be a function');
  assert.strictEqual(divide(10, 5), 2, 'divide(10, 5) should return 2');
  assert.strictEqual(divide(20, 4), 5, 'divide(20, 4) should return 5');
  assert.strictEqual(divide(100, 10), 10, 'divide(100, 10) should return 10');
  assert.strictEqual(divide(7, 2), 3.5, 'divide(7, 2) should return 3.5');
});

test('Calculator Basic - should display results when run', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args.join(' '));
  };

  t.after(() => {
    console.log = originalLog;
  });

  // Re-import to trigger console.log statements
  import('./008-calculator-basic.js');

  // Wait a bit for imports
  setTimeout(() => {
    assert.strictEqual(logs.length >= 4, true, 'Should log at least 4 calculation results');
  }, 100);
});
