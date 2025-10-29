# Exercise 168: Email Validator - Basic Pattern

Master the fundamentals of regular expressions! You'll learn regex syntax, patterns, and techniques by validating simple email addresses. This is your entry point into one of JavaScript's most powerful features.

## Why Regular Expressions?

Regular expressions (regex) are essential for:
- **Form Validation** - Check email, phone, URLs before processing
- **Data Extraction** - Pull phone numbers, dates, codes from text
- **Text Search** - Find patterns in large documents
- **Data Cleaning** - Normalize and validate data formats
- **Security** - Validate user input to prevent injection attacks

**Real-world examples:**
- Email validation in signup forms
- Phone number formatting (123-456-7890 → 1234567890)
- Password strength checking (must have uppercase, numbers, symbols)
- URL pattern matching in web scrapers
- Log file analysis (extracting errors, timestamps)

## Concepts

### What is a Regular Expression?

A **regular expression** (or **regex**) is a pattern that describes a set of strings. It's like a "find and replace" tool on steroids.

**Basic Syntax:**
```javascript
/pattern/flags
```

**Example:**
```javascript
const emailRegex = /^\w+@\w+\.\w+$/;
```

### Understanding Regex Patterns

#### 1. **Literal Characters**
These match exactly what they are:
```javascript
/hello/    // matches "hello"
/123/      // matches "123"
/abc/      // matches "abc"
```

#### 2. **Escape Sequences**
Special characters need escaping with `\`:
```javascript
/\./       // matches a literal dot (. normally means "any character")
/\@/       // matches literal @ (though usually not needed)
/\\/       // matches a single backslash
```

#### 3. **Character Classes**
Define a set of characters to match:

```javascript
/[abc]/         // matches a, b, OR c
/[a-z]/         // matches any lowercase letter
/[A-Z]/         // matches any uppercase letter
/[0-9]/         // matches any digit
/[a-zA-Z0-9]/   // matches any letter or digit
/[^abc]/        // matches anything EXCEPT a, b, or c
```

#### 4. **Shorthand Character Classes**
```javascript
\d      // digit (0-9), same as [0-9]
\D      // non-digit, same as [^0-9]
\w      // word character (a-z, A-Z, 0-9, _), same as [a-zA-Z0-9_]
\W      // non-word character
\s      // whitespace (space, tab, newline)
\S      // non-whitespace
.       // any character except newline
```

#### 5. **Quantifiers**
Tell regex how many times a pattern should repeat:

```javascript
*       // 0 or more times
+       // 1 or more times
?       // 0 or 1 time (optional)
{n}     // exactly n times
{n,}    // n or more times
{n,m}   // between n and m times
```

**Examples:**
```javascript
/a*/        // matches "", "a", "aa", "aaa", ...
/a+/        // matches "a", "aa", "aaa", ... (NOT empty)
/a?/        // matches "" or "a" (but not "aa")
/a{3}/      // matches exactly "aaa"
/a{2,4}/    // matches "aa", "aaa", or "aaaa"
```

#### 6. **Anchors**
Mark positions in the string:

```javascript
^       // start of string
$       // end of string
\b      // word boundary
```

**Examples:**
```javascript
/^hello/    // matches "hello" or "hello world" but NOT "say hello"
/world$/    // matches "world" or "say world" but NOT "world peace"
/^world$/   // matches ONLY "world", nothing before or after
/\bhello\b/ // matches "hello" as a complete word, not in "helloing"
```

### Email Pattern Breakdown

Let's understand the basic email pattern: `/^\w+@\w+\.\w+$/`

```
^       - Start of string
\w+     - One or more word characters (the local part: "user", "john123")
@       - Literal @ symbol
\w+     - One or more word characters (the domain: "example", "company")
\.      - Literal dot (escaped!)
\w+     - One or more word characters (the extension: "com", "org")
$       - End of string
```

**What it matches:**
- ✅ `user@example.com` - valid
- ✅ `john123@domain.org` - valid
- ✅ `a@b.c` - technically valid (though very short)

**What it doesn't match:**
- ❌ `user.name@example.com` - has dot in local part (not \w)
- ❌ `user+tag@example.com` - has + which is not \w
- ❌ `user@example.` - no extension
- ❌ `@example.com` - no local part
- ❌ `userexample.com` - no @

### Regex Methods

#### 1. **test() - True/False**
Returns `true` if pattern matches, `false` otherwise:
```javascript
const regex = /^\w+@\w+\.\w+$/;
regex.test('user@example.com');    // true
regex.test('notanemail');          // false
```

#### 2. **match() - Find Matches**
Returns array of matches or `null`:
```javascript
'user@example.com hello@test.org'.match(/@/g);  // ['@', '@']
'user@example.com'.match(/\w+/g);               // ['user', 'example', 'com']
```

#### 3. **search() - Find Position**
Returns index of first match or -1:
```javascript
'user@example.com'.search(/@/);    // 4 (@ is at index 4)
'notanemail'.search(/@/);          // -1 (not found)
```

#### 4. **replace() - Find and Replace**
Replaces matches:
```javascript
'user@example.com'.replace(/@/, ' at ');        // 'user at example.com'
'a@b@c'.replace(/@/g, '-');                     // 'a-b-c' (with g flag)
```

### Flags

Modifiers that change how regex works:

```javascript
/pattern/i    // case-insensitive (ignore uppercase/lowercase)
/pattern/g    // global (find all matches, not just first)
/pattern/m    // multiline (treat ^ and $ as line boundaries)
/pattern/gi   // combine multiple flags (case-insensitive + global)
```

**Examples:**
```javascript
/hello/.test('HELLO');              // false
/hello/i.test('HELLO');             // true (case-insensitive)

'AAA BBB AAA'.match(/AAA/);         // ['AAA'] (first only)
'AAA BBB AAA'.match(/AAA/g);        // ['AAA', 'AAA'] (all matches)
```

## Common Regex Patterns

### Email (Simple)
```javascript
/^\w+@\w+\.\w+$/
```
Matches basic emails but not dots in local part

### Phone Number
```javascript
/^\d{3}-\d{3}-\d{4}$/
```
Matches "123-456-7890"

### URL
```javascript
/^https?:\/\/.+/
```
Matches "http://example.com" or "https://example.com"

### Date (MM/DD/YYYY)
```javascript
/^\d{2}\/\d{2}\/\d{4}$/
```
Matches "12/25/2023"

### Hex Color
```javascript
/^#[0-9a-fA-F]{6}$/
```
Matches "#FF5733" or "#ff5733"

## Real-World Applications

### 1. Form Validation
```javascript
function validateEmail(email) {
  return /^\w+@\w+\.\w+$/.test(email);
}

// In a form:
if (validateEmail(userInput)) {
  submitForm();
} else {
  showError('Invalid email');
}
```

### 2. Data Extraction
```javascript
function extractEmails(text) {
  return text.match(/\w+@\w+\.\w+/g) || [];
}

const document = 'Contact us at support@company.com or sales@company.com';
extractEmails(document);  // ['support@company.com', 'sales@company.com']
```

### 3. Data Cleaning
```javascript
function normalizeEmail(email) {
  return email.toLowerCase().trim();
}

const dirty = '  USER@EXAMPLE.COM  ';
normalizeEmail(dirty);  // 'user@example.com'
```

### 4. Search and Replace
```javascript
function maskEmail(email) {
  return email.replace(/(.{2}).+(@.+)/, '$1***$2');
}

maskEmail('user@example.com');  // 'us***@example.com'
```

## Step-by-Step Learning Path

1. **Start Simple** - Master basic patterns first (`\w`, `\d`, `.`)
2. **Add Complexity** - Learn quantifiers (`+`, `*`, `{n,m}`)
3. **Add Anchors** - Understand `^` and `$` for boundaries
4. **Combine Patterns** - Build complex patterns from simple parts
5. **Test Thoroughly** - Always test edge cases
6. **Optimize Later** - Don't worry about perfect patterns yet

## Common Mistakes to Avoid

### ❌ Mistake 1: Forgetting to Escape Special Characters
```javascript
// WRONG - dot matches any character
/^\w+@\w+.\w+$/  // matches "user@example,com" (comma!)

// CORRECT - escape the dot
/^\w+@\w+\.\w+$/ // only matches "user@example.com"
```

### ❌ Mistake 2: Using Wrong Anchors
```javascript
// WRONG - matches partial strings
/\w+@\w+\.\w+/  // matches in "email is user@example.com here"

// CORRECT - use anchors for exact match
/^\w+@\w+\.\w+$/ // only matches complete "user@example.com"
```

### ❌ Mistake 3: Forgetting Quantifiers
```javascript
// WRONG - matches exactly one character
/^\w@\w\.\w$/  // matches "u@e.c" only

// CORRECT - use + for one or more
/^\w+@\w+\.\w+$/ // matches "user@example.com"
```

### ❌ Mistake 4: Not Using Global Flag
```javascript
// WRONG - only finds first @
'user@example.com test@domain.org'.match(/@/);
// ['@']

// CORRECT - find all @ symbols
'user@example.com test@domain.org'.match(/@/g);
// ['@', '@']
```

### ❌ Mistake 5: Testing Complex Patterns Without Building Up
```javascript
// WRONG - trying to build complex pattern immediately
/^[\w+\-._]+@[\w+\-._]+\.[\w+\-._]+$/

// CORRECT - start simple, add complexity:
/^\w+@\w+\.\w+$/  // basic
/^[\w.]+@[\w.]+\.[\w.]+$/  // add dots
// ... test at each step
```

## Challenge Exercises

**Easy:**
- Write a regex that matches any email with exactly one @
- Write a function that counts @ symbols in a string
- Extract the domain from an email

**Medium:**
- Validate that extension is 2-6 letters
- Check that local part contains only alphanumeric and dots
- Extract both domain and extension from email

**Hard:**
- Write a regex that allows underscores in domain
- Create a function that validates multiple emails in text
- Build a regex that rejects consecutive dots

## Testing Your Knowledge

Run these tests to verify your understanding:

```bash
npm test
```

Each test covers a specific concept:
- **Basic validation** - Does your pattern match valid emails?
- **Edge cases** - Does it reject malformed emails?
- **Extraction** - Can you pull parts from an email?
- **Complex patterns** - Can you validate multiple criteria?

## Performance Tips

For regex in JavaScript:
1. **Cache compiled regex** - Don't recreate regex in loops
2. **Use `test()` for boolean** - Faster than `match()` when you only need true/false
3. **Be specific** - `/^\w+@\w+\.\w+$/` is faster than `/.*@.*\..*/`
4. **Avoid backtracking** - Complex patterns can be slow

## Next Steps

After mastering this exercise:
1. **Exercise 169** - Learn regex methods (`test()`, `match()`, `search()`)
2. **Exercise 170** - Master capture groups for extraction
3. **Exercise 171** - Build advanced patterns with lookahead/lookbehind
4. **Exercise 172** - Validate multiple formats (phone, URL, email)

## Additional Resources

### Learning More
- MDN Web Docs: Regular Expressions
- RegexOne.com - Interactive regex tutorial
- Regex101.com - Test regex patterns online (with explanations!)
- Regular-Expressions.info - Comprehensive reference

### Tools
- **Regex101.com** - Test patterns with live matching
- **RegExper.com** - Visualize regex patterns
- **Regex Tester Extensions** - Browser extensions for inline testing

## Summary

You've learned:
- ✅ Basic regex syntax and structure
- ✅ Character classes and shorthand sequences
- ✅ Quantifiers for repetition
- ✅ Anchors for boundaries
- ✅ Common regex methods (test, match, search)
- ✅ Email pattern basics
- ✅ How to validate simple email formats

In the next exercises, you'll build on these fundamentals to handle more complex patterns and extraction tasks!
