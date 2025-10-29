import { strict as assert } from 'node:assert';
import test from 'node:test';
import * as ex from './059-contact-access.js';

test('059 - Contact Access', async (t) => {
  const c = ex.createContact('Charlie', 'charlie@example.com', '555-0000');

  await t.test('getNameDot returns name using dot notation', () => {
    const name = ex.getNameDot(c);
    assert.strictEqual(name, 'Charlie');
  });

  await t.test('getPropBracket returns property value using bracket notation', () => {
    const email = ex.getPropBracket(c, 'email');
    assert.strictEqual(email, 'charlie@example.com');
  });

  await t.test('getPropBracket works with dynamic property names', () => {
    assert.strictEqual(ex.getPropBracket(c, 'phone'), '555-0000');
  });

  await t.test('getPropBracket returns undefined for missing property', () => {
    assert.strictEqual(ex.getPropBracket(c, 'address'), undefined);
  });
});
