import { strict as assert } from 'node:assert';
import test from 'node:test';
import * as ex from './061-contact-methods.js';

test('061 - Contact Methods', async (t) => {
  const c = ex.createContact('Eve', 'eve@example.com', '(800) 555-1212');

  await t.test('attachDisplayMethod adds display method', () => {
    ex.attachDisplayMethod(c);
    assert.strictEqual(typeof c.display, 'function');
    const out = c.display();
    assert.ok(out.includes('Eve'));
    assert.ok(out.includes('eve@example.com'));
  });

  await t.test('attachFormatPhoneMethod adds formatPhone method', () => {
    ex.attachFormatPhoneMethod(c);
    assert.strictEqual(typeof c.formatPhone, 'function');
    const digits = c.formatPhone();
    assert.strictEqual(digits, '8005551212');
  });

  await t.test('methods use current object values (dynamic)', () => {
    ex.setProperty(c, 'name', 'Evelyn');
    const out = c.display();
    assert.ok(out.includes('Evelyn'));
  });
});
