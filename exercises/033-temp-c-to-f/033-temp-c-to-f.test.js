import test from 'node:test';
import assert from 'node:assert';
import { celsiusToFahrenheit } from './033-temp-c-to-f.js';

test('Celsius to Fahrenheit conversion', (t) => {
  assert.strictEqual(typeof celsiusToFahrenheit, 'function', 'Should export a function');

  // Basic known conversions
  assert.strictEqual(celsiusToFahrenheit(0), 32, '0°C should be 32°F');
  assert.strictEqual(celsiusToFahrenheit(100), 212, '100°C should be 212°F');
  assert.strictEqual(celsiusToFahrenheit(-40), -40, '-40°C should be -40°F');

  // Decimal inputs
  const result = celsiusToFahrenheit(37);
  assert.strictEqual(result, (37 * 9) / 5 + 32, '37°C should match formula');
});
