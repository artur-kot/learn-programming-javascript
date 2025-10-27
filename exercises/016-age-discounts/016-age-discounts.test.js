import test from 'node:test';
import assert from 'node:assert';
import { calculateTicketPrice } from './016-age-discounts.js';

test('Age Checker Discounts - should calculate correct ticket prices with age-based discounts', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args);
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof calculateTicketPrice, 'function', 'calculateTicketPrice should be a function');

  calculateTicketPrice();

  assert.strictEqual(logs.length, 4, 'Should log exactly 4 ticket prices');
  assert.strictEqual(logs[0][0], 'Age 8: Child ticket = $10', 'Child (age 8) should get 50% discount');
  assert.strictEqual(logs[1][0], 'Age 16: Teen ticket = $15', 'Teen (age 16) should get 25% discount');
  assert.strictEqual(logs[2][0], 'Age 35: Adult ticket = $20', 'Adult (age 35) should pay full price');
  assert.strictEqual(logs[3][0], 'Age 70: Senior ticket = $14', 'Senior (age 70) should get 30% discount');
});
