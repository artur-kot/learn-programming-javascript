import { strict as assert } from 'node:assert';
import test from 'node:test';
import { createContact } from './058-contact-create.js';

test('058 - Contact Create', async (t) => {
  await t.test('createContact returns an object with correct properties', () => {
    const c = createContact('Alice', 'alice@example.com', '123-456');
    assert.strictEqual(typeof c, 'object');
    assert.strictEqual(c.name, 'Alice');
    assert.strictEqual(c.email, 'alice@example.com');
    assert.strictEqual(c.phone, '123-456');
  });

  await t.test('createContact works with empty strings', () => {
    const c = createContact('', '', '');
    assert.strictEqual(c.name, '');
    assert.strictEqual(c.email, '');
    assert.strictEqual(c.phone, '');
  });

  await t.test('createContact preserves provided types', () => {
    const c = createContact('Bob', null, undefined);
    assert.strictEqual(c.name, 'Bob');
    assert.strictEqual(c.email, null);
    assert.strictEqual(c.phone, undefined);
  });
});
