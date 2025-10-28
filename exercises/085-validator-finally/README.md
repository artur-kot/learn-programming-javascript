# Exercise 085: Form Validator - Finally Cleanup

Master the finally block! Learn how to execute cleanup code that always runs, whether validation succeeds or fails. This is essential for resource management and logging.

## Concepts

- **Finally Blocks** - Code that always executes
- **Try-Catch-Finally Flow** - Complete error handling pattern
- **Guaranteed Execution** - Finally runs even with return or throw
- **Cleanup Operations** - Releasing resources
- **Logging and Tracking** - Recording attempts and results
- **State Management** - Maintaining accurate state through operations

## What You're Learning

The finally block is perfect for cleanup, logging, and operations that must happen regardless of success or failure. In this exercise, you'll:
- Use finally for logging validation attempts
- Track successful and failed validations
- Ensure cleanup always happens
- Implement performance tracking
- Create comprehensive audit logs

**Key Pattern:**
```javascript
try {
  // Try to validate
  doSomething();
} catch (error) {
  // Handle error
  handleError(error);
} finally {
  // Always cleanup
  cleanup();
}
```

## Challenge

Build a validation system with comprehensive logging. Use finally blocks to ensure every validation attempt is recorded, whether successful or not. Create a logger that tracks attempts, successes, and failures.

## Classes and Functions to Implement

### `ValidationLogger`
Track validation attempts and results.

**Methods:**
- `recordAttempt(data)` - Record a validation attempt
- `recordSuccess(data)` - Record a successful validation
- `recordFailure(data, errorType)` - Record a failed validation
- `getAttempts()` - Return total attempts
- `getSuccesses()` - Return successful validations
- `getFailures()` - Return failed validations
- `getSummary()` - Return object with attempts, successes, failures

### `validateWithLogging(data, logger)`
Validate email and log using finally block.

**Parameters:**
- `data` - Email to validate
- `logger` - ValidationLogger instance

**Returns:**
- Object with `{ isValid: boolean, email: string }`

**Pattern:**
```javascript
try {
  // Validate
} catch (error) {
  // Catch error
} finally {
  // Log in finally
}
```

### `batchValidate(items, logger)`
Validate multiple items and log all attempts.

**Parameters:**
- `items` - Array of emails to validate
- `logger` - ValidationLogger instance

**Returns:**
- Array of validation results

### `validateAndCleanup(email, onCleanup)`
Validate email and call cleanup function.

**Parameters:**
- `email` - Email to validate
- `onCleanup` - Function to call in finally block

**Returns:**
- Object with validation result

### `secureValidate(data, options = {})`
Validate with timing and security logging.

**Parameters:**
- `data` - Email to validate
- `options` - Optional configuration

**Returns:**
- Object with `{ isValid: boolean, timestamp: number, duration: number }`

## Tips

- The finally block executes even if try or catch has return statements
- Use finally for cleanup operations like closing files or clearing timers
- Logging in finally ensures every operation is recorded
- Track time before try and calculate duration in finally
- Never throw in finally - it masks original errors

## Next Steps

Once complete, move to [exercise 086](../086-validator-messages) where you'll create user-friendly error messages.
