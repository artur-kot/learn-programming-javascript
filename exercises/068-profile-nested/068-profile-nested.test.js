import { strict as assert } from 'node:assert';
import test from 'node:test';
import * as ex from './068-profile-nested.js';

test('068 - Profile Nested', async (t) => {
  ex.populateUsers();

  await t.test('createProfile creates user with nested address', () => {
    const user = ex.getUserById(1);
    assert.strictEqual(user.firstName, 'Alice');
    assert.strictEqual(user.address.street, '123 Main St');
    assert.strictEqual(user.address.city, 'Boston');
  });

  await t.test('createProfile sets default country to USA', () => {
    const user = ex.getUserById(1);
    assert.strictEqual(user.address.country, 'USA');
  });

  await t.test('getUserById returns user or undefined', () => {
    const user = ex.getUserById(1);
    assert(user);
    assert.strictEqual(user.id, 1);
    
    const notFound = ex.getUserById(999);
    assert.strictEqual(notFound, undefined);
  });

  await t.test('getUserFullName returns formatted name', () => {
    const fullName = ex.getUserFullName(1);
    assert.strictEqual(fullName, 'Alice Johnson');
  });

  await t.test('getUserFullName returns undefined for non-existent user', () => {
    const fullName = ex.getUserFullName(999);
    assert.strictEqual(fullName, undefined);
  });

  await t.test('getUserAddress returns formatted address', () => {
    const address = ex.getUserAddress(2);
    assert.ok(address.includes('456 Oak Ave'));
    assert.ok(address.includes('New York'));
    assert.ok(address.includes('NY'));
  });

  await t.test('updateUserAddress modifies nested address', () => {
    const success = ex.updateUserAddress(1, '999 New St', 'Cambridge', 'MA', '02138');
    assert.strictEqual(success, true);
    
    const user = ex.getUserById(1);
    assert.strictEqual(user.address.street, '999 New St');
    assert.strictEqual(user.address.city, 'Cambridge');
  });

  await t.test('updateUserAddress returns false for non-existent user', () => {
    const success = ex.updateUserAddress(999, 'St', 'City', 'ST', '00000');
    assert.strictEqual(success, false);
  });

  await t.test('getAllUsers returns array of all profiles', () => {
    const all = ex.getAllUsers();
    assert(Array.isArray(all));
    assert.strictEqual(all.length, 3);
  });

  await t.test('cleanup', () => {
    ex.resetUsers();
  });
});
