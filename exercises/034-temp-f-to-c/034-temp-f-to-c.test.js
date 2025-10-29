import test from 'node:test';
import assert from 'node:assert';
import { fahrenheitToCelsius } from './034-temp-f-to-c.js';

test('Fahrenheit to Celsius conversion', (t) => {
  assert.strictEqual(typeof fahrenheitToCelsius, 'function', 'Should export a function');

  assert.strictEqual(fahrenheitToCelsius(32), 0, '32°F should be 0°C');
  assert.strictEqual(fahrenheitToCelsius(212), 100, '212°F should be 100°C');
  assert.strictEqual(fahrenheitToCelsius(-40), -40, '-40°F should be -40°C');
});
