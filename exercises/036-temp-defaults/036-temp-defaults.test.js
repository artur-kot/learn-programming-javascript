import test from 'node:test';
import assert from 'node:assert';
import { celsiusToFahrenheit } from './036-temp-defaults.js';

test('Celsius to Fahrenheit with default parameter', (t) => {
  assert.strictEqual(typeof celsiusToFahrenheit, 'function', 'Should export a function');

  // When provided, behave as usual
  assert.strictEqual(celsiusToFahrenheit(0), 32, '0°C should be 32°F');

  // Default behavior: no arguments
  const defaultResult = celsiusToFahrenheit();
  assert.strictEqual(defaultResult, (20 * 9) / 5 + 32, 'Default should assume 20°C (room temperature)');
});
