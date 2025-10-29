import { strict as assert } from 'node:assert';
import test from 'node:test';
import * as ex from './062-contact-multiple.js';

test('062 - Contact Multiple', async (t) => {
  await t.test('addContact creates contact with methods and adds to array', () => {
    const contacts = [];
    const result = ex.addContact(contacts, 'Frank', 'frank@example.com', '999-1111');
    
    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].name, 'Frank');
    assert.strictEqual(typeof result[0].display, 'function');
    assert.strictEqual(typeof result[0].formatPhone, 'function');
  });

  await t.test('addContact returns the modified array', () => {
    const contacts = [];
    const returned = ex.addContact(contacts, 'Grace', 'grace@example.com', '123-4567');
    assert.strictEqual(returned, contacts);
  });

  await t.test('addContact can add multiple contacts', () => {
    const contacts = [];
    ex.addContact(contacts, 'Hank', 'hank@example.com', '555-7890');
    ex.addContact(contacts, 'Ivy', 'ivy@example.com', '555-1234');
    
    assert.strictEqual(contacts.length, 2);
  });

  await t.test('getAllContactsInfo returns array of display strings', () => {
    const contacts = [];
    ex.addContact(contacts, 'Jack', 'jack@example.com', '111-2222');
    ex.addContact(contacts, 'Kate', 'kate@example.com', '222-3333');
    
    const infos = ex.getAllContactsInfo(contacts);
    assert(Array.isArray(infos));
    assert.strictEqual(infos.length, 2);
    assert.ok(infos[0].includes('Jack'));
    assert.ok(infos[1].includes('Kate'));
  });

  await t.test('getAllContactsInfo calls display on each contact', () => {
    const contacts = [];
    ex.addContact(contacts, 'Leo', 'leo@example.com', '333-4444');
    
    const infos = ex.getAllContactsInfo(contacts);
    assert.ok(infos[0].includes('leo@example.com'));
  });
});
