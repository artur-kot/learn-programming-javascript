# Exercise 084: Form Validator - Custom Errors

Take your error handling to the next level by creating custom error classes. Learn when and how to throw specific error types for different failure scenarios.

## Concepts

- **Error Class Extension** - Creating custom error types
- **Instanceof Operator** - Checking error types
- **Error Hierarchy** - Parent/child error relationships
- **Specific Error Throwing** - Throwing meaningful errors
- **Error Context** - Including data in errors
- **Type Checking Errors** - Catching specific error types

## What You're Learning

Different types of validation failures should have different error types. This allows calling code to handle them appropriately. In this exercise, you'll:
- Create custom error classes that extend Error
- Throw specific error types for each validation failure
- Catch specific error types in validateForm
- Provide better context about why validation failed
- Build a foundation for user-friendly error messages

**Key Pattern:**
```javascript
class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MyError';
  }
}
```

## Challenge

Create a validation system with specific error types. Each field has its own error class, and validateForm must catch each type and return appropriate error information.

## Error Classes to Create

### `ValidationError`
Base error class for all validation errors.

### `InvalidEmailError extends ValidationError`
Thrown when email format is invalid.

### `InvalidPasswordError extends ValidationError`
Thrown when password doesn't meet requirements.

### `InvalidUsernameError extends ValidationError`
Thrown when username format is invalid.

### `InvalidAgeError extends ValidationError`
Thrown when age is out of valid range.

## Functions to Implement

### `validateEmail(email)`
Throw `InvalidEmailError` if invalid, return `true` if valid.

**Parameters:**
- `email` - String to validate

**Returns:**
- `true` if valid

**Throws:**
- `InvalidEmailError` if invalid email format

### `validatePassword(password)`
Throw `InvalidPasswordError` if invalid, return `true` if valid.

**Parameters:**
- `password` - String to validate

**Returns:**
- `true` if valid

**Throws:**
- `InvalidPasswordError` if password too short

### `validateUsername(username)`
Throw `InvalidUsernameError` if invalid, return `true` if valid.

**Parameters:**
- `username` - String to validate

**Returns:**
- `true` if valid

**Throws:**
- `InvalidUsernameError` if invalid username format

### `validateAge(age)`
Throw `InvalidAgeError` if invalid, return `true` if valid.

**Parameters:**
- `age` - Value to validate

**Returns:**
- `true` if valid

**Throws:**
- `InvalidAgeError` if age out of range

### `validateForm(formData)`
Validate all fields, catching specific error types.

**Parameters:**
- `formData` - Object with email, password, username, age

**Returns:**
- `{ isValid: true, errors: {} }` if all valid
- `{ isValid: false, errors: { fieldName: "error message" } }` if invalid

**Examples:**
```javascript
validateForm({
  email: "user@example.com",
  password: "SecurePass123!",
  username: "john_doe",
  age: 25
})
// { isValid: true, errors: {} }

validateForm({
  email: "invalid",
  password: "short",
  username: "john_doe",
  age: 25
})
// {
//   isValid: false,
//   errors: {
//     email: "Invalid email format",
//     password: "Password too short"
//   }
// }
```

## Tips

- Remember to set `this.name = 'ClassName'` in custom error constructors
- Use `instanceof` to check error types in catch blocks
- Each validation function should throw a specific error type
- Store error messages in the error objects
- In validateForm, catch each specific error type separately

## Next Steps

Once complete, move to [exercise 085](../085-validator-finally) where you'll use finally blocks for cleanup and logging.
