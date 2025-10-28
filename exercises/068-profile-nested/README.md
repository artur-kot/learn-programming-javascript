# 068 - User Profile: Basic Info

## Overview

Create a user profile system with nested objects. User profiles contain an address object (street, city, state, zip) and methods to access this nested data.

## Challenge

Implement these functions:

1. **`createProfile(id, firstName, lastName, email, street, city, state, zip)`** - Create a new user profile with nested address, add to storage, return the profile
2. **`getUserById(id)`** - Find user profile by ID
3. **`getUserFullName(id)`** - Get formatted full name using the getFullName() method
4. **`getUserAddress(id)`** - Get formatted full address using getFullAddress() method
5. **`updateUserAddress(id, street, city, state, zip)`** - Update nested address object, return success boolean
6. **`getAllUsers()`** - Return array of all user profiles

## Hints

- Nested objects: `user.address.street`, `user.address.city`, etc.
- Methods can call other methods: `this.firstName` and `this.lastName`
- Default parameters: `country = 'USA'`
- Use `.find()` to locate user by ID
- Use `.push()` to add to storage array

## Example Usage

```javascript
createProfile(1, 'Alice', 'Johnson', 'alice@example.com', '123 Main St', 'Boston', 'MA', '02101');
const user = getUserById(1);
console.log(user.getFullName());      // 'Alice Johnson'
console.log(user.getFullAddress());   // '123 Main St, Boston, MA 02101, USA'

updateUserAddress(1, '456 New St', 'Cambridge', 'MA', '02138');
console.log(getUserAddress(1));       // '456 New St, Cambridge, MA 02138, USA'
```

## Tests

```bash
npm test
```

## Read More

- [MDN: Nested Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#objects_and_properties)
- [MDN: Object Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#defining_methods)
