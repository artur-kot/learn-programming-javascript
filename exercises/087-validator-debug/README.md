# Exercise 087: Form Validator - Debug Mode

The final validator exercise! Add comprehensive debugging capabilities using console methods like `console.table()`, `console.group()`, `console.time()`, and `console.warn()` to create professional-grade debugging output.

## Concepts

- **console.log** - Standard logging
- **console.warn** - Warning-level messages
- **console.error** - Error-level messages
- **console.table** - Structured tabular data
- **console.group** - Organized output groups
- **console.time** - Performance timing
- **Debug Modes** - Conditional detailed output
- **Performance Metrics** - Tracking and reporting timing data

## What You're Learning

Professional debugging is essential for development and debugging. In this exercise, you'll:
- Create a debug mode that can be toggled on/off
- Use console.table for structured data display
- Group related output with console.group
- Track performance with console.time
- Generate comprehensive debug reports
- Profile batch operations
- Calculate and display metrics

**Key Pattern:**
```javascript
if (debug) {
  console.table(data);
  console.group('Validation Details');
  console.log(...);
  console.groupEnd();
}
```

## Challenge

Build the ultimate validator with professional debugging support. Create a system that provides detailed development insights when debug mode is enabled, including performance metrics, structured logging, and comprehensive reports.

## Classes and Functions to Implement

### `DebugValidator`
Validator with built-in debugging capabilities.

**Methods:**
- `constructor()` - Initialize validator
- `setDebugMode(enabled)` - Enable/disable debug mode
- `isDebugMode()` - Check if debug mode is active
- `validate(email)` - Validate email with optional debug output
- `getDebugInfo()` - Return debug information about last validation

### `validateWithDebug(email, debug = false)`
Validate email with optional debug output.

**Parameters:**
- `email` - Email to validate
- `debug` - Boolean to enable debug output

**Returns:**
```javascript
{
  isValid: boolean,
  email: string,
  timestamp: number,
  duration: number
}
```

### `validateBatchWithDebug(items, debug = false)`
Validate multiple items with batch statistics.

**Parameters:**
- `items` - Array of emails to validate
- `debug` - Boolean to enable debug output

**Returns:**
```javascript
{
  results: [ /* validation results */ ],
  stats: {
    total: number,
    succeeded: number,
    failed: number,
    successRate: number
  }
}
```

### `validateAndProfile(items)`
Validate with comprehensive performance profiling.

**Parameters:**
- `items` - Array of emails to validate

**Returns:**
```javascript
{
  results: [ /* validation results */ ],
  profile: {
    totalTime: number,
    averageTime: number,
    slowest: number,
    fastest: number
  }
}
```

### `generateDebugReport(validationResults)`
Create comprehensive debug report with metrics.

**Parameters:**
- `validationResults` - Array of validation result objects

**Returns:**
```javascript
{
  summary: {
    total: number,
    succeeded: number,
    failed: number,
    successRate: number
  },
  performance: {
    totalTime: number,
    averageTime: number,
    fastest: number,
    slowest: number
  },
  details: [ /* individual results */ ]
}
```

## Suggested Debug Output

When debug mode is enabled:
- Use `console.group()` to organize output
- Use `console.table()` for batch results
- Use `console.time()` for performance tracking
- Use `console.warn()` for validation failures
- Use `console.log()` for general information

**Example:**
```javascript
console.group('Email Validation');
console.log('Email:', email);
console.log('Valid:', isValid);
console.log('Duration:', duration + 'ms');
console.groupEnd();
```

## Tips

- Debug output should be conditional on debug flag
- Performance metrics should track milliseconds
- Calculate success rate as percentage
- Include slowest and fastest validation times
- Generate structured, easy-to-read reports
- Use console methods appropriately (log vs warn vs error)

## Series Complete!

You've mastered error handling fundamentals:
- ✅ Try-catch basics
- ✅ Custom error types
- ✅ Finally blocks and cleanup
- ✅ User-friendly error messages
- ✅ Advanced debugging

You're ready to move on to [Phase 10: Asynchronous JavaScript](../../#phase-10-asynchronous-javascript)!
