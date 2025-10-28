# 070 - User Profile: Optional Chaining

## Overview

Learn to safely access deeply nested properties without errors using optional chaining (`?.`) and nullish coalescing (`??`). These operators prevent "Cannot read property of undefined" errors.

## Challenge

Implement these functions using optional chaining:

1. **`getThemeSafely(userId)`** - Access `user?.preferences?.theme`, return 'default' if not found
2. **`getEmailNotificationSafely(userId)`** - Access `user?.preferences?.notifications?.email`
3. **`getUserCitySafely(userId)`** - Access `user?.address?.city`, return 'Unknown' if not found
4. **`isUserInCity(userId, city)`** - Check if user's city matches (case-insensitive), safely

## Syntax

```javascript
// Optional chaining: stops if any part is null/undefined
user?.preferences?.theme

// Nullish coalescing: provides default if null/undefined
value ?? 'default'

// Combined:
user?.preferences?.theme ?? 'default'
```

## Hints

- Use `?.` to safely access nested properties
- Use `??` to provide defaults
- Combine both for robust code: `obj?.nested?.prop ?? default`
- Test with missing/undefined values

## Example Usage

```javascript
// User with preferences
getThemeSafely(1);              // 'light'

// User without preferences
getThemeSafely(3);              // 'default'

// Non-existent user
getThemeSafely(999);            // 'default'
```

## Tests

```bash
npm test
```

## Read More

- [MDN: Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
- [MDN: Nullish Coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)
