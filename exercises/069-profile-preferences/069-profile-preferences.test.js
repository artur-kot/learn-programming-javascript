import { strict as assert } from 'node:assert';
import test from 'node:test';
import * as ex from './069-profile-preferences.js';

test('069 - Profile Preferences', async (t) => {
  ex.populateUsers();

  await t.test('addPreferences creates nested preferences object', () => {
    const success = ex.addPreferences(1);
    assert.strictEqual(success, true);
    
    const user = ex.getUserById(1);
    assert(user.preferences);
    assert.strictEqual(user.preferences.theme, 'light');
  });

  await t.test('addPreferences includes nested notifications object', () => {
    const user = ex.getUserById(1);
    assert(user.preferences.notifications);
    assert.strictEqual(user.preferences.notifications.email, true);
    assert.strictEqual(user.preferences.notifications.sms, false);
  });

  await t.test('addPreferences includes nested privacy object', () => {
    const user = ex.getUserById(1);
    assert(user.preferences.privacy);
    assert.strictEqual(user.preferences.privacy.showEmail, false);
    assert.strictEqual(user.preferences.privacy.showPhone, false);
  });

  await t.test('addPreferences returns false for non-existent user', () => {
    const success = ex.addPreferences(999);
    assert.strictEqual(success, false);
  });

  await t.test('updateTheme changes theme preference', () => {
    const success = ex.updateTheme(1, 'dark');
    assert.strictEqual(success, true);
    
    const user = ex.getUserById(1);
    assert.strictEqual(user.preferences.theme, 'dark');
  });

  await t.test('toggleNotification flips notification state', () => {
    const result = ex.toggleNotification(1, 'email');
    assert.strictEqual(result, false);
    
    const user = ex.getUserById(1);
    assert.strictEqual(user.preferences.notifications.email, false);
  });

  await t.test('toggleNotification returns new value', () => {
    const result = ex.toggleNotification(1, 'sms');
    assert.strictEqual(result, true);
    
    const user = ex.getUserById(1);
    assert.strictEqual(user.preferences.notifications.sms, true);
  });

  await t.test('getPreferencesSummary returns summary object', () => {
    const summary = ex.getPreferencesSummary(1);
    assert(summary);
    assert.strictEqual(summary.theme, 'dark');
    assert.strictEqual(typeof summary.notificationCount, 'number');
  });

  await t.test('getPreferencesSummary counts enabled notifications', () => {
    const user = ex.getUserById(1);
    user.preferences.notifications = { email: true, sms: true, push: false };
    
    const summary = ex.getPreferencesSummary(1);
    assert.strictEqual(summary.notificationCount, 2);
  });

  await t.test('cleanup', () => {
    ex.resetUsers();
  });
});
