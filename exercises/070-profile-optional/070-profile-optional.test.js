import { strict as assert } from 'node:assert';
import test from 'node:test';
import * as ex from './070-profile-optional.js';

test('070 - Profile Optional Chaining', async (t) => {
  ex.populateUsers();

  await t.test('getThemeSafely returns theme when available', () => {
    const theme = ex.getThemeSafely(1);
    assert.strictEqual(theme, 'light');
  });

  await t.test('getThemeSafely returns default when preferences missing', () => {
    const theme = ex.getThemeSafely(3);
    assert.strictEqual(theme, 'default');
  });

  await t.test('getThemeSafely returns default for non-existent user', () => {
    const theme = ex.getThemeSafely(999);
    assert.strictEqual(theme, 'default');
  });

  await t.test('getEmailNotificationSafely returns notification state', () => {
    const notif = ex.getEmailNotificationSafely(1);
    assert.strictEqual(notif, true);
  });

  await t.test('getEmailNotificationSafely returns undefined when preferences missing', () => {
    const notif = ex.getEmailNotificationSafely(3);
    assert.strictEqual(notif, undefined);
  });

  await t.test('getUserCitySafely returns city when available', () => {
    const city = ex.getUserCitySafely(1);
    assert.strictEqual(city, 'Boston');
  });

  await t.test('getUserCitySafely returns Unknown for non-existent user', () => {
    const city = ex.getUserCitySafely(999);
    assert.strictEqual(city, 'Unknown');
  });

  await t.test('isUserInCity matches case-insensitive', () => {
    const inCity = ex.isUserInCity(1, 'boston');
    assert.strictEqual(inCity, true);
  });

  await t.test('isUserInCity returns false for non-matching city', () => {
    const inCity = ex.isUserInCity(1, 'chicago');
    assert.strictEqual(inCity, false);
  });

  await t.test('isUserInCity returns false for non-existent user', () => {
    const inCity = ex.isUserInCity(999, 'boston');
    assert.strictEqual(inCity, false);
  });

  await t.test('cleanup', () => {
    ex.resetUsers();
  });
});
