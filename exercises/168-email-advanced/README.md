# Exercise 171: Email Validator - Advanced Patterns

Master advanced regex techniques that enable sophisticated pattern matching! Learn lookahead, lookbehind, word boundaries, and complex validation patterns.

## What You'll Learn

You've learned basic patterns, methods, and groups. Now you'll learn **advanced assertions** that don't consume characters but control where matches can occur:

- **Lookahead** - Assert what comes **after** `(?=...)` and `(?!=...)`
- **Lookbehind** - Assert what comes **before** `(?<=...)` and `(?<!...)`
- **Word boundaries** - `\b` for exact word matches
- **Alternation** - `|` for multiple options
- **Complex validation** - Combining multiple techniques

## Concepts

### Lookahead Assertions

**Lookahead** checks what comes AFTER the current position without including it in the match.

#### Positive Lookahead `(?=pattern)`

"Match this, but only if followed by that"

```javascript
/test(?=ing)/
// Matches 'test' only in 'testing', not 'tested'
```

**Example with email:**
```javascript
// Match @ only if followed by valid domain pattern
/@(?=\w+\.\w+)/

// Real use: validate TLD length in lookahead
/\w+@\w+\.(?=[a-z]{2,6})[\w.]+/i
```

**Using in code:**
```javascript
const text = 'testing tested tester';
const matches = text.match(/test(?=ing)/g);
// ['test'] - only matches in 'testing'
```

#### Negative Lookahead `(?!pattern)`

"Match this, but NOT if followed by that"

```javascript
/test(?!ing)/
// Matches 'test' only in 'tested' or 'tester', not 'testing'
```

**Example with email:**
```javascript
// Reject if consecutive dots follow
/\.(?!\.)/
// Matches dot not followed by another dot

// Full pattern rejecting ".."
/^(?!.*\.\.)[\w.]+@/
// (?!.*\.\.) means "not anywhere followed by .."
```

### Lookbehind Assertions

**Lookbehind** checks what comes BEFORE the current position without including it.

**Note:** Lookbehind is newer (ES2018). Node.js 12.4+ supports it.

#### Positive Lookbehind `(?<=pattern)`

"Match this, but only if preceded by that"

```javascript
/(?<=@)\w+\.\w+/
// Matches domain.tld only after @

// Example: 'user@example.com' -> matches 'example.com'
```

#### Negative Lookbehind `(?<!pattern)`

"Match this, but NOT if preceded by that"

```javascript
/(?<!@)example\.com/
// Matches 'example.com' but not when part of email
```

### Word Boundaries `\b`

Match at positions between word and non-word characters.

```javascript
\bword\b  // 'word' as complete word, not 'words' or 'sword'
```

**Email example:**
```javascript
// Match complete email address in text
/\b[\w.+]+@[\w.-]+\.\w+\b/

// Without \b, might match partial addresses in strings
```

### Alternation `|`

Match multiple options.

```javascript
/(gmail|yahoo|outlook)/
// Matches any of: gmail, yahoo, or outlook

// In email:
/\w+@(gmail|yahoo|outlook)\.com/
// Valid for gmail.com, yahoo.com, or outlook.com only
```

## Practical Examples

### Example 1: Validate Specific Domains
```javascript
function validateCommonEmail(email) {
  const pattern = /^[\w.+]+@(gmail|yahoo|outlook|hotmail)\.com$/i;
  return pattern.test(email);
}

validateCommonEmail('user@gmail.com');    // true
validateCommonEmail('user@example.com');  // false
```

### Example 2: Allow Special Characters in Local Part
```javascript
function validateModernEmail(email) {
  // Allow dots, hyphens, plus in local part
  return /^[\w.+-]+@[\w.-]+\.\w+$/.test(email);
}

validateModernEmail('user+tag@example.com');     // true
validateModernEmail('first.last@example.com');   // true
validateModernEmail('user-name@example.com');    // true
```

### Example 3: Reject Consecutive Dots
```javascript
function validateNoDots(email) {
  // Negative lookahead: not followed by ..
  return /^(?!.*\.\.)[\w.]+@[\w.-]+\.\w+$/.test(email);
}

validateNoDots('user.name@example.com');   // true
validateNoDots('user..name@example.com');  // false
```

### Example 4: Find Emails in Text
```javascript
function extractEmails(text) {
  // Use word boundaries to avoid partial matches
  const pattern = /\b[\w.+-]+@[\w.-]+\.\w+\b/g;
  return text.match(pattern) || [];
}

const text = 'Contact support@company.com or admin@test.org';
extractEmails(text);
// ['support@company.com', 'admin@test.org']
```

### Example 5: Exclude Bracketed Emails
```javascript
function extractNonBracketed(text) {
  // Use negative lookbehind/lookahead for < and >
  const pattern = /(?<!<)[\w.+-]+@[\w.-]+(?!>)/g;
  return text.match(pattern) || [];
}

const text = 'Contact user@test.com or <admin@test.com>';
extractNonBracketed(text);
// ['user@test.com'] (excludes admin@test.com)
```

### Example 6: Extract Email with Context
```javascript
function extractEmailWithContext(text) {
  const pattern = /(\S+)?\s+([\w.+-]+@[\w.-]+\.\w+)\s+(\S+)?/;
  const match = text.match(pattern);
  
  if (!match) return null;
  
  return {
    before: match[1],
    email: match[2],
    after: match[3]
  };
}

extractEmailWithContext('Send to user@example.com today');
// { before: 'to', email: 'user@example.com', after: 'today' }
```

## Advanced Validation Patterns

### Email with Dots in Local Part
```javascript
const pattern = /^[\w.]+@[\w.-]+\.\w+$/;
// Allows: john.doe@example.com, user.name@domain.co.uk
```

### Email with Hyphens in Domain
```javascript
const pattern = /^[\w.+-]+@[\w-]+\.\w+$/;
// Allows: user@my-domain.com, admin@mail-server.org
```

### Email with Lookahead for TLD
```javascript
const pattern = /^[\w.+-]+@[\w.-]+\.(?=[a-z]{2,6}$)\w+$/i;
// TLD must be 2-6 letters using lookahead
```

### Email Not Starting with Number/Dot
```javascript
const pattern = /^(?![0-9.])[\w.+-]+@[\w.-]+\.\w+$/;
// Negative lookahead at start ensures first char is letter
```

### Email Without Consecutive Dots
```javascript
const pattern = /^(?!.*\.\.)[\w.+-]+@(?!.*\.\.)[\w.-]+\.\w+$/;
// (?!.*\.\.) in two places prevents ".." anywhere
```

## Real-World Applications

### Form Validation with Multiple Rules
```javascript
class EmailValidator {
  constructor(options = {}) {
    this.allowCommonOnly = options.commonOnly || false;
    this.allowSpecialChars = options.specialChars !== false;
    this.minLocalLength = options.minLocal || 1;
  }

  validate(email) {
    // Check pattern based on options
    let pattern;
    
    if (this.allowCommonOnly) {
      pattern = /^[\w.+-]+@(gmail|yahoo|outlook|hotmail)\.com$/i;
    } else if (!this.allowSpecialChars) {
      pattern = /^\w+@[\w.-]+\.\w+$/;
    } else {
      pattern = /^[\w.+-]+@[\w.-]+\.\w+$/;
    }
    
    return pattern.test(email);
  }
}

const validator = new EmailValidator({ commonOnly: true });
validator.validate('user@gmail.com');    // true
validator.validate('user@custom.com');   // false
```

### Batch Processing with Extraction
```javascript
function processEmailList(text) {
  const pattern = /\b([\w.+-]+)@([\w.-]+)\.(\w+)\b/g;
  const results = [];
  let match;
  
  while ((match = pattern.exec(text)) !== null) {
    results.push({
      full: match[0],
      local: match[1],
      domain: match[2],
      tld: match[3]
    });
  }
  
  return results;
}

const emails = processEmailList('admin@company.com support@company.com');
// [
//   { full: 'admin@company.com', local: 'admin', domain: 'company', tld: 'com' },
//   { full: 'support@company.com', local: 'support', domain: 'company', tld: 'com' }
// ]
```

## Common Mistakes to Avoid

### ❌ Mistake 1: Forgetting Lookahead/Lookbehind Don't Consume
```javascript
// WRONG - expects 'ingtest' in result
const match = 'testing'.match(/(?=test)ing/);
// Matches 'ing' (lookahead for 'test' is just assertion)

// Remember: lookahead/lookbehind don't include their content
```

### ❌ Mistake 2: Wrong Lookahead Position
```javascript
// WRONG - checks what follows the pattern, not before it
/@(?=\w+@)/  // looks for @@ (wrong!)

// CORRECT - check before the pattern you want to match
/(?<=@)\w+/  // lookbehind checks before word chars
```

### ❌ Mistake 3: Lookbehind Not Supported
```javascript
// Note: Lookbehind requires modern JavaScript
// Check your Node.js version: should be 12.4+
const pattern = /(?<=@)\w+/;  // Works in modern Node.js
```

### ❌ Mistake 4: Alternation Precedence
```javascript
// WRONG - OR has low precedence
/user@gmail|yahoo\.com/
// Matches either 'user@gmail' OR 'yahoo.com' (wrong!)

// CORRECT - use groups to limit alternation
/user@(gmail|yahoo)\.com/
// Matches user@gmail.com or user@yahoo.com
```

### ❌ Mistake 5: Forgetting to Escape in Alternation
```javascript
// WRONG - dot matches any char
/gmail.com|yahoo.com/

// CORRECT - escape dot
/(gmail|yahoo)\.com/
```

## Challenge Exercises

**Easy:**
1. Validate email with dots in local part
2. Validate email with + for tags
3. Find emails in text with word boundaries

**Medium:**
1. Reject consecutive dots using negative lookahead
2. Validate specific domains using alternation
3. Extract email with surrounding context

**Hard:**
1. Combine multiple validation rules
2. Find emails excluding bracketed ones
3. Create complex validator with multiple options

## Advanced Topics

### Named Groups (Modern JavaScript)
```javascript
const pattern = /^(?<local>[\w.+-]+)@(?<domain>[\w.-]+)\.(?<tld>\w+)$/;
const match = 'user@example.com'.match(pattern);
console.log(match.groups);
// { local: 'user', domain: 'example', tld: 'com' }
```

### Backreferences
```javascript
// Match repeated text using \1, \2
/^(\w+)\s+\1$/  // Matches "test test" but not "test other"
```

## Quick Reference

| Feature | Syntax | Example |
|---------|--------|---------|
| Positive lookahead | `(?=...)` | `test(?=ing)` |
| Negative lookahead | `(?!=...)` | `test(?!ing)` |
| Positive lookbehind | `(?<=...)` | `(?<=@)user` |
| Negative lookbehind | `(?<!...)` | `(?<!@)example` |
| Word boundary | `\b` | `\bword\b` |
| Alternation | \| | `(a\|b\|c)` |

## Summary

You've mastered:
- ✅ Lookahead assertions (positive and negative)
- ✅ Lookbehind assertions (positive and negative)
- ✅ Word boundaries for complete matches
- ✅ Alternation for multiple options
- ✅ Complex validation patterns
- ✅ Real-world email processing

You now have advanced regex skills for sophisticated pattern matching!

## Next Exercise

**Exercise 172: Email Multiple Formats** - Validate phone numbers, URLs, and other formats alongside email using your advanced regex knowledge!
