# Exercise 086: Form Validator - Error Messages

Build a comprehensive error messaging system! Create user-friendly, specific error messages that help users understand what went wrong and how to fix it.

## Concepts

- **Error Message Templates** - Reusable message patterns
- **Context Information** - Including relevant details
- **Message Builders** - Fluent interface for message creation
- **User-Friendly Language** - Clear, helpful guidance
- **Field-Specific Messages** - Tailored to each validation type
- **Internationalization Basics** - Preparing for multiple languages

## What You're Learning

Error messages are crucial for user experience. In this exercise, you'll:
- Create descriptive error messages for each validation failure
- Build a message creation system
- Include specific requirements in messages
- Return detailed results with human-readable text
- Create reusable message templates
- Guide users toward fixing problems

**Good Error Message:**
"Password must be at least 8 characters. Include uppercase, lowercase, and numbers."

**Bad Error Message:**
"Invalid"

## Challenge

Create a validation system where every error includes a specific, helpful message explaining what went wrong and what's needed to fix it. Use a message builder pattern to create formatted, consistent messages.

## Classes and Functions to Implement

### `MessageBuilder`
Create formatted error messages with a fluent interface.

**Methods:**
- `constructor(fieldName)` - Initialize with field name
- `required()` - Add message about required field
- `minLength(n)` - Add message about minimum length
- `maxLength(n)` - Add message about maximum length
- `uppercase()` - Add message about uppercase requirement
- `lowercase()` - Add message about lowercase requirement
- `digit()` - Add message about digit requirement
- `specialChar()` - Add message about special character requirement
- `format(pattern)` - Add message about format requirement
- `build()` - Return complete message string

### `validateEmailWithMessage(email)`
Validate email and return result with message.

**Parameters:**
- `email` - Email to validate

**Returns:**
```javascript
{
  isValid: true,
  message: "" // Empty if valid
}
// or
{
  isValid: false,
  message: "Email must contain @ and valid domain"
}
```

### `validatePasswordWithMessage(password)`
Validate password with specific requirements messaging.

**Parameters:**
- `password` - Password to validate

**Returns:**
- Object with `isValid` and `message`

**Example message:**
"Password must be at least 8 characters and include uppercase letters, lowercase letters, and numbers."

### `validateUsernameWithMessage(username)`
Validate username with format hints.

**Parameters:**
- `username` - Username to validate

**Returns:**
- Object with `isValid` and `message`

### `validateAgeWithMessage(age)`
Validate age with range information.

**Parameters:**
- `age` - Age to validate

**Returns:**
- Object with `isValid` and `message`

**Example message:**
"Age must be between 0 and 120"

### `validateFormWithMessages(formData)`
Validate all fields with detailed messages.

**Parameters:**
- `formData` - Object with email, password, username, age

**Returns:**
```javascript
{
  isValid: true,
  errors: {}
}
// or
{
  isValid: false,
  errors: {
    email: "Email must contain @ and valid domain",
    password: "Password must be at least 8 characters..."
  }
}
```

## Tips

- Use descriptive, action-oriented messages ("must include" vs. "invalid")
- Include specific requirements in messages (numbers, lengths, formats)
- Make messages helpful enough that users can fix issues without outside help
- Use template strings for dynamic values
- Build a reusable message system
- Keep messages concise but informative

## Next Steps

Once complete, move to [exercise 087](../087-validator-debug) where you'll add debugging capabilities and enhanced logging.
