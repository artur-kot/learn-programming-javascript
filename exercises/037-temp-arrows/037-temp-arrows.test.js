import test from 'node:test';
import assert from 'node:assert';
import { celsiusToFahrenheit, fahrenheitToCelsius } from './037-temp-arrows.js';

test('Arrow functions are used (no prototype)', (t) => {
  assert.strictEqual(typeof celsiusToFahrenheit, 'function', 'Should export a function');
  assert.strictEqual(typeof fahrenheitToCelsius, 'function', 'Should export a function');

  // Arrow functions do not have a 'prototype' property
  assert.strictEqual(celsiusToFahrenheit.prototype, undefined);
  assert.strictEqual(fahrenheitToCelsius.prototype, undefined);
});
