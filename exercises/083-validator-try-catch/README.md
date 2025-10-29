# Exercise 083: Form Validator - Try-Catch Basics

Your first step into error handling! Learn how to use try-catch blocks to create robust validation functions that handle errors gracefully instead of crashing.

## Concepts

- **Try-Catch Blocks** - Catching and handling exceptions
- **Error Objects** - Understanding error properties
- **Graceful Degradation** - Returning safe values instead of crashing
- **Validation Logic** - Creating predictable validators
- **Error Recovery** - Continuing execution after catching errors
- **Return Values** - Using patterns to indicate success/failure

## What You're Learning

Error handling is crucial for building robust applications. In this exercise, you'll:
- Wrap risky operations in try-catch blocks
- Return meaningful values (true/false) instead of throwing
- Handle multiple types of invalid input
- Collect validation errors without stopping execution
- Build the foundation for better error messages in later exercises

**Key Pattern:**
Validation functions should not crash. They should catch errors internally and return safe values that your code can work with.

## Challenge

Create a form validator that safely checks multiple fields. Each field has specific validation rules, and the validator should catch any errors without crashing, returning results that indicate which fields are valid.

## Functions to Implement

### `validateEmail(email)`
Validate email format. Must contain @ and a domain.

**Parameters:**
- `email` - String to validate

**Returns:**
- `true` if valid email format
- `false` if invalid or error occurs

**Examples:**
```javascript
validateEmail("user@example.com") // true
validateEmail("invalid") // false
validateEmail(null) // false (handle gracefully)
```

### `validatePassword(password)`
Validate password strength. Must be at least 8 characters.

**Parameters:**
- `password` - String to validate

**Returns:**
- `true` if password is strong enough
- `false` if too short or error occurs

**Examples:**
```javascript
validatePassword("SecurePass123!") // true
validatePassword("short") // false
validatePassword(undefined) // false (handle gracefully)
```

### `validateUsername(username)`
Validate username. Must be 3-20 characters, alphanumeric and underscores only.

**Parameters:**
- `username` - String to validate

**Returns:**
- `true` if valid username
- `false` if invalid or error occurs

**Examples:**
```javascript
validateUsername("john_doe") // true
validateUsername("ab") // false (too short)
validateUsername(null) // false (handle gracefully)
```

### `validateAge(age)`
Validate age. Must be number between 0 and 120.

**Parameters:**
- `age` - Value to validate

**Returns:**
- `true` if valid age
- `false` if invalid range or error occurs

**Examples:**
```javascript
validateAge(25) // true
validateAge(-5) // false
validateAge(undefined) // false (handle gracefully)
```

### `validateForm(formData)`
Validate all form fields at once. Collect errors without stopping.

**Parameters:**
- `formData` - Object with email, password, username, age

**Returns:**
- Object with `isValid` (boolean) and `errors` (array of field names)

**Examples:**
```javascript
validateForm({
  email: "user@example.com",
  password: "SecurePass123!",
  username: "john_doe",
  age: 25
})
// { isValid: true, errors: [] }

validateForm({
  email: "invalid",
  password: "short",
  username: "john_doe",
  age: 25
})
// { isValid: false, errors: ["email", "password"] }
```

## Tips

- Use try-catch to safely handle any operation that might throw
- Return false instead of throwing errors
- Handle null/undefined input without crashing
- In validateForm, catch errors for each field individually
- Continue validating all fields even if one fails

## Next Steps

Once complete, move to [exercise 084](../084-validator-custom-errors) where you'll create custom error types for more specific error handling.
