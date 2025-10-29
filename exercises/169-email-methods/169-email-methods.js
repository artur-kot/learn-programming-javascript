/**
 * REGEX METHODS - INTRODUCTION
 * 
 * JavaScript provides several methods to use regular expressions:
 * 
 * REGEX METHODS (called on regex object):
 * ======================================
 * regex.test(string)        - Returns true/false if pattern matches
 * regex.exec(string)        - Returns detailed match array or null
 * 
 * STRING METHODS (called on string with regex):
 * ============================================
 * string.match(regex)       - Returns array of matches or null
 * string.search(regex)      - Returns index of first match or -1
 * string.replace(regex, replacement)  - Replace matches
 * string.split(regex)       - Split string by pattern
 * 
 * KEY CONCEPT: The 'g' (global) flag changes behavior!
 * Without 'g': returns first match only
 * With 'g': returns ALL matches
 * 
 * EXAMPLES:
 * =========
 * 
 * test() - Boolean check:
 * const regex = /^\w+@\w+\.\w+$/;
 * regex.test('user@example.com');     // true
 * regex.test('notanemail');           // false
 * 
 * match() - Without 'g' (first only):
 * 'user@example.com test@test.com'.match(/\w+@\w+/);
 * // ['user@example', '@'] but only FIRST match
 * 
 * match() - With 'g' (all matches):
 * 'user@example.com test@test.com'.match(/\w+@\w+/g);
 * // ['user@example', 'test@test']
 * 
 * search() - Find position:
 * 'hello@world.com'.search(/@/);      // 5 (index of @)
 * 'noemailhere'.search(/@/);          // -1 (not found)
 * 
 * replace() - First occurrence:
 * 'user@example.com test@test.com'.replace(/@/, ' at ');
 * // 'user at example.com test@test.com' (only first @)
 * 
 * replace() - All with 'g':
 * 'user@example.com test@test.com'.replace(/@/g, ' at ');
 * // 'user at example.com test at test.com' (all @)
 */

// TODO: Implement the testEmailFormat function
// Use regex.test() to validate email (returns boolean)
// Pattern: ^\w+@\w+\.\w+$
export function testEmailFormat(email) {

}

// TODO: Implement the findAllEmails function
// Use string.match(regex) with global flag 'g'
// Pattern: \w+@\w+\.\w+ (without anchors, with g flag)
// Returns array of matches or empty array
export function findAllEmails(text) {

}

// TODO: Implement the findFirstEmail function
// Use string.match(regex) WITHOUT global flag
// Pattern: \w+@\w+\.\w+ (without g flag)
// Returns array with first match or null
export function findFirstEmail(text) {

}

// TODO: Implement the findEmailPosition function
// Use string.search(regex) to find first @ position
// Returns index number or -1 if not found
export function findEmailPosition(email) {

}

// TODO: Implement the replaceAtSymbol function
// Use string.replace(regex, replacement)
// Replace @ with ' at ' (with spaces)
// Use replace(/@/, ' at ') for first only
export function replaceAtSymbol(email) {

}

// TODO: Implement the maskEmail function
// Use replace() with capture groups
// Keep first 2 chars, mask the rest before @
// Example: 'user@example.com' -> 'us***@example.com'
// Pattern: use replace() to capture and reconstruct
export function maskEmail(email) {

}

// TODO: Implement the countEmails function
// Count how many valid emails are in text
// Use match() with global flag and count results
// Return number of emails found
export function countEmails(text) {

}

// TODO: Implement the validateEmailList function
// Check if ALL emails in array are valid
// Use every() method with test()
// Return true if all valid, false if any invalid
export function validateEmailList(emails) {

}

// TODO: Implement the getValidEmails function
// Filter array to keep only valid emails
// Use filter() method with test()
// Return new array with only valid emails
export function getValidEmails(emails) {

}

// TODO: Implement the normalizeEmails function
// Remove spaces around @ symbol
// Use replace() to fix 'user @ example.com' -> 'user@example.com'
// Use replace(/\s*@\s*/, '@') to remove all spaces around @
export function normalizeEmails(email) {

}
