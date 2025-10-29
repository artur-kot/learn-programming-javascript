# 069 - User Profile: Preferences

## Overview

Add deeply nested preferences to user profiles including theme, notifications, and privacy settings. This reinforces working with multiple levels of nested objects.

## Challenge

Implement these functions:

1. **`addPreferences(userId)`** - Add preferences object with nested notifications and privacy settings
2. **`updateTheme(userId, theme)`** - Update the theme preference
3. **`toggleNotification(userId, type)`** - Toggle notification type, return new value
4. **`getPreferencesSummary(userId)`** - Return summary with theme, notification count, privacy mode

## Structure

```javascript
user.preferences = {
  theme: 'light',
  notifications: { email: true, sms: false, push: true },
  privacy: { showEmail: false, showPhone: false }
}
```

## Hints

- Access deeply: `user.preferences.notifications.email`
- Count enabled notifications with `.filter()` and `.length`
- Toggle with `!` operator
- Use `.every()` to check if all privacy values are false

## Tests

```bash
npm test
```
