import test from 'node:test';
import assert from 'node:assert';
import { add, subtract, multiply, divide, modulo, power, squareRoot } from './009-calculator-advanced.js';

test('Calculator Advanced - basic operations still work', (t) => {
  assert.strictEqual(typeof add, 'function', 'add should be a function');
  assert.strictEqual(add(10, 5), 15, 'add(10, 5) should return 15');
  assert.strictEqual(subtract(10, 5), 5, 'subtract(10, 5) should return 5');
  assert.strictEqual(multiply(10, 5), 50, 'multiply(10, 5) should return 50');
  assert.strictEqual(divide(10, 5), 2, 'divide(10, 5) should return 2');
});

test('Calculator Advanced - modulo should return remainder', (t) => {
  assert.strictEqual(typeof modulo, 'function', 'modulo should be a function');
  assert.strictEqual(modulo(10, 3), 1, 'modulo(10, 3) should return 1');
  assert.strictEqual(modulo(17, 5), 2, 'modulo(17, 5) should return 2');
  assert.strictEqual(modulo(20, 4), 0, 'modulo(20, 4) should return 0');
  assert.strictEqual(modulo(7, 2), 1, 'modulo(7, 2) should return 1');
});

test('Calculator Advanced - power should return base raised to exponent', (t) => {
  assert.strictEqual(typeof power, 'function', 'power should be a function');
  assert.strictEqual(power(2, 3), 8, 'power(2, 3) should return 8');
  assert.strictEqual(power(5, 2), 25, 'power(5, 2) should return 25');
  assert.strictEqual(power(10, 0), 1, 'power(10, 0) should return 1');
  assert.strictEqual(power(3, 4), 81, 'power(3, 4) should return 81');
});

test('Calculator Advanced - squareRoot should return square root', (t) => {
  assert.strictEqual(typeof squareRoot, 'function', 'squareRoot should be a function');
  assert.strictEqual(squareRoot(16), 4, 'squareRoot(16) should return 4');
  assert.strictEqual(squareRoot(25), 5, 'squareRoot(25) should return 5');
  assert.strictEqual(squareRoot(9), 3, 'squareRoot(9) should return 3');
  assert.strictEqual(squareRoot(100), 10, 'squareRoot(100) should return 10');
  assert.strictEqual(squareRoot(2), Math.sqrt(2), 'squareRoot(2) should return √2');
});

test('Calculator Advanced - should display all results when run', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args.join(' '));
  };

  t.after(() => {
    console.log = originalLog;
  });

  // Re-import to trigger console.log statements
  import('./009-calculator-advanced.js');

  // Wait a bit for imports
  setTimeout(() => {
    assert.strictEqual(logs.length >= 7, true, 'Should log at least 7 calculation results');
  }, 100);
});
