import { strict as assert } from 'node:assert';
import test from 'node:test';
import * as ex from './072-profile-json.js';

test('072 - Profile JSON', async (t) => {
  ex.populateUsers();

  await t.test('userToJSON returns string', () => {
    const json = ex.userToJSON(1);
    assert.strictEqual(typeof json, 'string');
  });

  await t.test('userToJSON excludes methods', () => {
    const json = ex.userToJSON(1);
    assert(!json.includes('getFullName'));
    assert(!json.includes('getFullAddress'));
  });

  await t.test('userToJSON includes data properties', () => {
    const json = ex.userToJSON(1);
    assert(json.includes('Alice'));
    assert(json.includes('Johnson'));
  });

  await t.test('parseJSON converts JSON back to object', () => {
    const json = ex.userToJSON(1);
    const parsed = ex.parseJSON(json);
    
    assert.strictEqual(parsed.firstName, 'Alice');
    assert.strictEqual(parsed.email, 'alice@example.com');
  });

  await t.test('parseJSON handles invalid JSON gracefully', () => {
    const result = ex.parseJSON('invalid json');
    assert.strictEqual(result, undefined);
  });

  await t.test('exportUsers returns JSON array string', () => {
    const json = ex.exportUsers();
    assert.strictEqual(typeof json, 'string');
    assert(json.includes('['));
    assert(json.includes(']'));
  });

  await t.test('exportUsers contains all users', () => {
    const json = ex.exportUsers();
    const parsed = JSON.parse(json);
    assert.strictEqual(parsed.length, 2);
  });

  await t.test('importUsers parses and adds users', () => {
    const json = ex.exportUsers();
    ex.resetUsers();
    
    const count = ex.importUsers(json);
    assert.strictEqual(count, 2);
    assert.strictEqual(ex.getAllUsers().length, 2);
  });

  await t.test('importUsers preserves data integrity', () => {
    const json = ex.exportUsers();
    ex.resetUsers();
    ex.importUsers(json);
    
    const user = ex.getUserById(1);
    assert.strictEqual(user.firstName, 'Alice');
    assert.strictEqual(user.address.city, 'Boston');
  });

  await t.test('userToJSONWithReplacer uses custom replacer', () => {
    const json = ex.userToJSONWithReplacer(1);
    const parsed = JSON.parse(json);
    
    assert(!parsed.getFullName);
    assert.strictEqual(parsed.firstName, 'Alice');
  });

  await t.test('cleanup', () => {
    ex.resetUsers();
  });
});
