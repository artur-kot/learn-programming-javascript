import test from 'node:test';
import assert from 'node:assert';
import { celsiusToKelvin, kelvinToCelsius } from './035-temp-kelvin.js';

test('Kelvin <-> Celsius conversions', (t) => {
  assert.strictEqual(typeof celsiusToKelvin, 'function', 'Should export a function');
  assert.strictEqual(typeof kelvinToCelsius, 'function', 'Should export a function');

  // Known conversions
  assert.ok(Math.abs(celsiusToKelvin(0) - 273.15) < 1e-9, '0°C should be 273.15K');
  assert.ok(Math.abs(celsiusToKelvin(100) - 373.15) < 1e-9, '100°C should be 373.15K');
  assert.ok(Math.abs(kelvinToCelsius(273.15) - 0) < 1e-9, '273.15K should be 0°C');
  assert.ok(Math.abs(kelvinToCelsius(0) + 273.15) < 1e-9, '0K should be -273.15°C');
});
