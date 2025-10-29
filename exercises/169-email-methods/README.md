# Exercise 169: Email Validator - Test and Match Methods

Master the regex methods that make pattern matching powerful! You'll use `test()`, `match()`, `search()`, and `replace()` to validate, find, extract, and transform emails.

## What You'll Learn

After Exercise 168's introduction to regex syntax, you now learn the practical methods to use patterns:

- **test()** - Quick true/false validation
- **match()** - Find one or all matches
- **search()** - Find position of first match
- **replace()** - Transform matched text

These methods are the bridge between understanding regex patterns and using them in real code.

## Concepts

### Regex Methods vs String Methods

There are two ways to use regex in JavaScript:

#### 1. **Regex Object Methods**
```javascript
const pattern = /\w+@\w+\.\w+/;

// regex.test(string)
pattern.test('user@example.com');  // true or false

// regex.exec(string)
pattern.exec('user@example.com');  // detailed array or null
```

#### 2. **String Methods with Regex**
```javascript
const email = 'user@example.com';

// string.match(regex)
email.match(/\w+@\w+\.\w+/);       // array of matches or null

// string.search(regex)
email.search(/@/);                  // index or -1

// string.replace(regex, replacement)
email.replace(/@/, ' at ');         // new string

// string.split(regex)
email.split(/@/);                   // array of parts
```

### Method 1: test() - Boolean Check

The **simplest** regex method. Returns `true` if pattern matches, `false` otherwise.

**Syntax:**
```javascript
const regex = /pattern/;
const result = regex.test(string);  // true or false
```

**When to use:**
- Form validation (yes/no questions)
- Quick checks before processing
- When you only need true or false

**Examples:**
```javascript
const emailRegex = /^\w+@\w+\.\w+$/;

if (emailRegex.test(userInput)) {
  processEmail(userInput);
} else {
  showError('Invalid email');
}

// Common pattern:
const isValid = /^\w+@\w+\.\w+$/.test(email);
```

**Advantages:**
- Fast (stops at first match)
- Returns boolean directly
- Clean, readable code

### Method 2: match() - Find Matches

Returns an **array** of all matches or `null` if no matches. Behavior depends on the global flag `g`.

**Syntax:**
```javascript
const text = 'email user@example.com here';
const result = text.match(regex);  // array or null
```

**WITHOUT global flag (find first only):**
```javascript
const result = 'user@example.com test@test.org'.match(/\w+@\w+/);
// Result: ['user@example']
// Only first match!
```

**WITH global flag (find all):**
```javascript
const result = 'user@example.com test@test.org'.match(/\w+@\w+/g);
// Result: ['user@example', 'test@test']
// All matches!
```

**Key Point: The 'g' flag changes everything!**

```javascript
// Without 'g' - first match only:
'AAA BBB AAA'.match(/AAA/);      // ['AAA']

// With 'g' - all matches:
'AAA BBB AAA'.match(/AAA/g);     // ['AAA', 'AAA']
```

**When to use:**
- Extract multiple items from text
- Find and collect data
- Count occurrences

**Examples:**
```javascript
// Extract all emails from document
const emails = document.text.match(/\w+@\w+\.\w+/g) || [];

// Find all phone numbers
const phones = text.match(/\d{3}-\d{3}-\d{4}/g) || [];

// Count hashtags
const hashtags = tweet.match(/#\w+/g) || [];
```

**Null Handling:**
```javascript
// WRONG - crashes if no match!
const emails = text.match(/\w+@\w+\.\w+/g).length;

// CORRECT - handle null:
const emails = text.match(/\w+@\w+\.\w+/g) || [];
const count = emails.length;
```

### Method 3: search() - Find Position

Returns the **index** (position) of the first match or `-1` if not found.

**Syntax:**
```javascript
const index = string.search(regex);  // number: index or -1
```

**Examples:**
```javascript
'hello@world.com'.search(/@/);     // 5 (@ is at index 5)
'hello@world.com'.search(/w\w+/);  // 6 (matches "world")
'noemail'.search(/@/);              // -1 (not found)
```

**Checking if Found:**
```javascript
if (email.search(/@/) !== -1) {
  console.log('Has @');
} else {
  console.log('Missing @');
}
```

**When to use:**
- Find first occurrence position
- Check if substring exists (like `includes()` but for patterns)
- Split operations

**Common Pattern:**
```javascript
// Check if @ exists
if (email.search(/@/) > 0) {
  // @ found (at index > 0)
}
```

### Method 4: replace() - Transform Text

Replaces **first** or **all** matches (with global flag) with replacement text.

**Syntax:**
```javascript
const newString = string.replace(regex, replacement);
```

**WITHOUT global flag (first only):**
```javascript
'user@example.com test@test.org'.replace(/@/, ' at ');
// 'user at example.com test@test.org'
// Only first @ replaced!
```

**WITH global flag (all):**
```javascript
'user@example.com test@test.org'.replace(/@/g, ' at ');
// 'user at example.com test at test.org'
// All @ replaced!
```

**When to use:**
- Clean/normalize data
- Transform formats
- Mask sensitive information

**Examples:**
```javascript
// Normalize spaces around @
'user  @  example.com'.replace(/\s*@\s*/, '@');
// 'user@example.com'

// Remove @ symbols
'email@example.com'.replace(/@/g, '[at]');
// 'email[at]example.com'

// Replace special characters
'user+tag@example.com'.replace(/[+]/g, '-');
// 'user-tag@example.com'
```

**Advanced: Capture Groups**

Use `$1`, `$2`, etc. to reference captured groups:

```javascript
// Mask email: 'user@example.com' -> 'us***@example.com'
'user@example.com'.replace(/^(.{2}).+(@.+)$/, '$1***$2');
// $1 = 'us' (first 2 chars)
// $2 = '@example.com' (@ and everything after)

// Result: 'us***@example.com'
```

### Global Flag 'g' - The Game Changer

The `g` flag is **crucial** - it changes behavior of multiple methods:

```javascript
// WITHOUT g - first match only
/pattern/.exec(str)           // first match
str.match(/pattern/)          // first match
str.replace(/pattern/, repl)  // replace first only
str.split(/pattern/, n)       // split on first only

// WITH g - all matches
/pattern/g.exec(str)          // all matches (in loop)
str.match(/pattern/g)         // all matches (one call)
str.replace(/pattern/g, repl) // replace all
str.split(/pattern/g)         // split on all
```

**Common Mistake:**
```javascript
// WRONG - only finds first email
const emails = text.match(/\w+@\w+\.\w+/);

// CORRECT - finds all emails
const emails = text.match(/\w+@\w+\.\w+/g);
```

## Practical Workflow: Validating Email Lists

Here's a complete workflow using these methods:

```javascript
// 1. CHECK ONE EMAIL (use test())
const emailRegex = /^\w+@\w+\.\w+$/;
if (!emailRegex.test(userInput)) {
  return 'Invalid email';
}

// 2. FIND ALL EMAILS IN TEXT (use match() with g)
const foundEmails = text.match(/\w+@\w+\.\w+/g) || [];

// 3. COUNT OCCURRENCES
const emailCount = foundEmails.length;

// 4. FILTER VALID EMAILS (use filter() with test())
const validEmails = emails.filter(e => emailRegex.test(e));

// 5. NORMALIZE DATA (use replace())
const normalized = email.replace(/\s*@\s*/, '@');
```

## Real-World Applications

### 1. Validate Sign-Up Form
```javascript
const emailRegex = /^\w+@\w+\.\w+$/;

function validateSignup(email, password) {
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }
  if (password.length < 8) {
    return { valid: false, error: 'Password too short' };
  }
  return { valid: true };
}

// Usage
const result = validateSignup('user@example.com', 'secure123');
```

### 2. Extract Emails from Document
```javascript
function extractEmails(document) {
  const emails = document.match(/\w+@\w+\.\w+/g);
  return emails ? [...new Set(emails)] : [];  // Remove duplicates
}

const text = `
  Contact support@company.com or sales@company.com
  CEO email: ceo@company.com
`;
const contacts = extractEmails(text);
// ['support@company.com', 'sales@company.com', 'ceo@company.com']
```

### 3. Mask Sensitive Email Data
```javascript
function maskEmails(text) {
  return text.replace(/(\w)(\w+)(@\w+\.\w+)/g, '$1***$3');
}

const log = 'Contacted user@example.com about support@company.org';
const masked = maskEmails(log);
// 'Contacted u***@example.com about s***@company.org'
```

### 4. Normalize Email List
```javascript
function normalizeEmails(emailString) {
  // Remove spaces around @
  const cleaned = emailString.replace(/\s*@\s*/, '@');
  // Split by common delimiters
  const emails = cleaned.split(/[,;:\s]+/);
  // Filter and validate
  return emails
    .filter(e => /\w+@\w+\.\w+/.test(e))
    .map(e => e.toLowerCase());
}

const input = 'user @ example.com , admin @ test.org';
const output = normalizeEmails(input);
// ['user@example.com', 'admin@test.org']
```

## Quick Reference Guide

| Method | Purpose | Returns | Example |
|--------|---------|---------|---------|
| `.test()` | Check if matches | true/false | `/\w+@/.test(email)` |
| `.match()` | Find matches | Array or null | `text.match(/\w+/g)` |
| `.search()` | Find position | Number (-1 if not) | `email.search(/@/)` |
| `.replace()` | Replace matches | New string | `email.replace(/@/, ' at ')` |

## Common Mistakes to Avoid

### ❌ Mistake 1: Forgetting to Handle null from match()
```javascript
// WRONG - crashes if no matches
const emails = text.match(/\w+@\w+\.\w+/g).length;

// CORRECT - handle null
const emails = text.match(/\w+@\w+\.\w+/g) || [];
const count = emails.length;
```

### ❌ Mistake 2: Forgetting 'g' Flag for Multiple Matches
```javascript
// WRONG - only gets first match
const all = text.match(/\w+@\w+\.\w+/);

// CORRECT - get all matches
const all = text.match(/\w+@\w+\.\w+/g);
```

### ❌ Mistake 3: Using search() for Array Access
```javascript
// WRONG - search() returns index, not the match
const match = email.search(/@\w+/);  // Returns number (3)

// CORRECT - use match() for actual match
const match = email.match(/@\w+/);   // Returns ['@example']
```

### ❌ Mistake 4: Forgetting Anchors in test()
```javascript
// WRONG - matches "user@example in the middle of text"
const valid = /\w+@\w+\.\w+/.test(text);

// CORRECT - ensure whole string matches
const valid = /^\w+@\w+\.\w+$/.test(email);
```

### ❌ Mistake 5: Not Escaping Special Characters in replace()
```javascript
// WRONG - . matches any character in replacement
'a.b.c'.replace(/\./, 'X');  // Works but confusing

// CORRECT - still works but literal is clearer
'a.b.c'.replace(/\./g, 'X');  // 'aXbXc'
```

## Challenge Exercises

**Easy:**
1. Validate a single email
2. Find the position of @ in an email
3. Count how many @ symbols in text

**Medium:**
1. Extract all emails from a document
2. Mask all emails in text
3. Validate an array of emails

**Hard:**
1. Replace only emails after a certain pattern
2. Extract emails but exclude certain domains
3. Create a normalize function for messy email input

## Next Steps

You now understand the core regex methods! 

**In Exercise 170, you'll learn:**
- **Capture groups** - Extract parts of matches
- **Parentheses ()** - Group and capture
- **$1, $2 references** - Use captured groups in replace()
- **Advanced extraction** - Pull specific data from emails

**Coming Up:**
- Exercise 171: Advanced patterns (lookahead, lookbehind)
- Exercise 172: Multiple formats (phone, URL, email)

## Summary

You've mastered:
- ✅ test() for boolean validation
- ✅ match() with and without 'g' flag
- ✅ search() for finding position
- ✅ replace() for transformation
- ✅ How 'g' flag changes behavior
- ✅ Real-world email processing patterns

You're now ready to use regex for practical email validation in forms, data processing, and text analysis!
