import { strict as assert } from 'node:assert';
import test from 'node:test';
import * as ex from './060-contact-update.js';

test('060 - Contact Update', async (t) => {
  const c = ex.createContact('Dana', 'dana@example.com', '777-1111');

  await t.test('setProperty adds new property', () => {
    ex.setProperty(c, 'address', '123 Main St');
    assert.strictEqual(c.address, '123 Main St');
  });

  await t.test('setProperty updates existing property', () => {
    ex.setProperty(c, 'email', 'dana+work@example.com');
    assert.strictEqual(c.email, 'dana+work@example.com');
  });

  await t.test('setProperty returns the modified contact', () => {
    const result = ex.setProperty(c, 'nickname', 'D');
    assert.strictEqual(result.nickname, 'D');
  });

  await t.test('removeProperty deletes a property and returns true', () => {
    const ok = ex.removeProperty(c, 'nickname');
    assert.strictEqual(ok, true);
    assert.strictEqual(c.nickname, undefined);
  });

  await t.test('removeProperty returns false if property not present', () => {
    const ok = ex.removeProperty(c, 'nonexistent');
    assert.strictEqual(ok, false);
  });
});
