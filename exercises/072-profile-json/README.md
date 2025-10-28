# Exercise 072: User Profile - JSON Serialization

Learn how to convert user profile objects to JSON format and parse them back safely. This exercise focuses on serialization patterns and handling methods in data structures.

## Concepts

- **JSON.stringify()** - Convert objects to JSON strings with optional replacer functions
- **Replacer Functions** - Filter properties during serialization (exclude methods)
- **JSON.parse()** - Convert JSON strings back to objects safely
- **Error Handling** - Graceful handling of invalid JSON
- **Data Export/Import** - Patterns for persisting and loading data

## What You'll Learn

1. **Serializing Objects**: How to convert complex nested objects to JSON strings
2. **Excluding Methods**: Using replacer functions to exclude methods from serialization
3. **Safe Parsing**: Catching and handling JSON parse errors
4. **Bulk Operations**: Exporting and importing multiple records
5. **Custom Replacers**: Implementing custom serialization logic

## Functions to Implement

### `userToJSON(userId)`
Convert a single user profile to a JSON string, excluding methods.

**Parameters:**
- `userId` - The ID of the user to serialize

**Returns:**
- JSON string representation of the user (without methods), or `undefined` if user not found

**Example:**
```javascript
createProfile(1, 'Alice', 'Johnson', 'alice@example.com', '123 Main', 'Boston', 'MA', '02101');
const json = userToJSON(1);
// Result: '{"id":1,"firstName":"Alice",...}'
// Note: getFullName() method is NOT included
```

### `parseJSON(jsonString)`
Safely parse a JSON string and return the parsed object or undefined on error.

**Parameters:**
- `jsonString` - The JSON string to parse

**Returns:**
- Parsed object on success, `undefined` on error

**Example:**
```javascript
const user = parseJSON('{"id":1,"firstName":"Alice"}');
const invalid = parseJSON('not valid json');
// invalid === undefined
```

### `exportUsers()`
Export all users in the users array as a single JSON array string.

**Returns:**
- JSON string containing array of all users (without methods)

**Example:**
```javascript
createProfile(1, 'Alice', 'Johnson', 'alice@example.com', '123 Main', 'Boston', 'MA', '02101');
createProfile(2, 'Bob', 'Smith', 'bob@example.com', '456 Oak', 'New York', 'NY', '10001');
const json = exportUsers();
// Result: '[{"id":1,...},{"id":2,...}]'
```

### `importUsers(jsonString)`
Import users from a JSON string and add them to the users array. Rebuilds user objects with proper structure.

**Parameters:**
- `jsonString` - JSON array string of user objects

**Returns:**
- Number of successfully imported users, or 0 if import fails

**Example:**
```javascript
resetUsers();
const count = importUsers('[{"id":1,"firstName":"Alice",...}]');
// count === 1
// users array is populated with the imported user
```

### `userToJSONWithReplacer(userId)`
Convert a user to JSON using a custom replacer function pattern.

**Parameters:**
- `userId` - The ID of the user to serialize

**Returns:**
- JSON string (same as userToJSON but demonstrates custom replacer pattern)

**Example:**
```javascript
const json = userToJSONWithReplacer(1);
// Returns JSON string with custom replacer logic
```

## Hints

1. **Replacer Functions**: The replacer parameter of JSON.stringify can be a function that receives (key, value) and returns the value to include or undefined to exclude
   ```javascript
   JSON.stringify(obj, (key, value) => {
     if (typeof value === 'function') return undefined;
     return value;
   });
   ```

2. **Error Handling**: Always wrap JSON.parse in a try-catch block
   ```javascript
   try {
     return JSON.parse(jsonString);
   } catch (e) {
     return undefined;
   }
   ```

3. **Data Preservation**: When importing, remember to rebuild the nested address structure and friends array properly

4. **Helper Functions**: Use the provided `createProfile()` and `addFriend()` functions to properly rebuild imported data

5. **Methods Not Serialized**: Methods (like getFullName) won't be in the JSON, so you only need to restore the data properties and use createProfile to restore methods

## Challenge

- Create a versioning system where export includes a version number
- Implement a custom replacer that includes only specific fields
- Add compression/decompression functionality
- Create a diff function that shows what changed between two JSON exports

## Resources

- [MDN: JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
- [MDN: JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
- [Replacer Function Pattern](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#the_replacer_parameter)

## Notes

- Methods cannot be serialized to JSON, so they must be recreated after parsing
- The replacer function is called for every property in the object hierarchy
- Always handle parse errors gracefully - invalid JSON is common in real applications
- Consider the structure of your data when designing export/import workflows
