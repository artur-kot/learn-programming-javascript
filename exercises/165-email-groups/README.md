# Exercise 170: Email Validator - Capture Groups

Master one of regex's most powerful features: **capture groups**! Learn to extract specific parts of matched text using parentheses and numbered references.

## What You'll Learn

In previous exercises, you learned to validate and find emails. Now you'll learn to **extract and reuse parts** of matches using capture groups.

- **Parentheses ()** - Define capture groups
- **Numbered groups** - `$1`, `$2`, `$3` etc.
- **Extraction** - Pull specific parts from text
- **Transformation** - Rearrange and rebuild text
- **Data parsing** - Split emails into components

## Concepts

### What Are Capture Groups?

A **capture group** is a portion of a regex pattern enclosed in parentheses `()`. It "captures" and remembers the text matched by that portion.

**Basic Syntax:**
```javascript
/pattern(capture1)(capture2)/
```

Each pair of parentheses is a group, numbered from left to right.

### Understanding Groups

Let's break down an email pattern with 3 capture groups:

```javascript
/^(\w+)@(\w+)\.(\w+)$/
  ^^    ^^^^^^ ^^^^^
  1     2      3
```

- **Group 1: `(\w+)`** - Captures local part (before @)
- **Group 2: `(\w+)`** - Captures domain name (between @ and dot)
- **Group 3: `(\w+)`** - Captures TLD (after dot)

### Accessing Capture Groups

#### Method 1: Using match()

```javascript
const match = 'user@example.com'.match(/^(\w+)@(\w+)\.(\w+)$/);

console.log(match[0]);  // 'user@example.com' (full match)
console.log(match[1]);  // 'user'              (group 1)
console.log(match[2]);  // 'example'           (group 2)
console.log(match[3]);  // 'com'               (group 3)
```

**Key Points:**
- `match[0]` is always the full match
- `match[1]` through `match[n]` are the captured groups
- If no match, result is `null`

**Always check for null:**
```javascript
const match = email.match(/^(\w+)@(\w+)\.(\w+)$/);
if (match) {
  const local = match[1];
  const domain = match[2];
  const tld = match[3];
}
```

#### Method 2: Using replace() with References

Use `$1`, `$2`, etc. to reference captured groups in the replacement:

```javascript
// Simple reference:
'user@example.com'.replace(/(\w+)@(\w+)/, '$2 has email $1');
// Result: 'example has email user.com'

// Rearranging parts:
'user@example.com'.replace(/^(\w+)@(\w+)\.(\w+)$/, '$3/$2/$1');
// Result: 'com/example/user'

// Transforming format:
'user@example.com'.replace(/^(\w+)@(\w+)\.(\w+)$/, '$1 [at] $2 dot $3');
// Result: 'user [at] example dot com'
```

**Available References:**
- `$1` through `$99` - Captured groups
- `$&` - The entire match
- `$\`` - Text before the match
- `$'` - Text after the match

### Practical Examples

#### Example 1: Extract Email Parts
```javascript
function parseEmail(email) {
  const match = email.match(/^(\w+)@(\w+)\.(\w+)$/);
  if (!match) return null;
  
  return {
    local: match[1],      // 'user'
    domain: match[2],     // 'example'
    tld: match[3]         // 'com'
  };
}

parseEmail('user@example.com');
// { local: 'user', domain: 'example', tld: 'com' }
```

#### Example 2: Swap Parts
```javascript
function swapEmailParts(email) {
  return email.replace(
    /^(\w+)@(\w+)\.(\w+)$/,
    '$2@$1.$3'            // domain @ local . tld
  );
}

swapEmailParts('user@example.com');
// 'example@user.com'
```

#### Example 3: Format for Display
```javascript
function formatEmail(email) {
  return email.replace(
    /^(\w+)@(\w+)\.(\w+)$/,
    '$1 at $2 dot $3'
  );
}

formatEmail('user@example.com');
// 'user at example dot com'
```

#### Example 4: Mask Sensitive Data
```javascript
function maskEmail(email) {
  return email.replace(
    /^(.).+(@.+)$/,       // first char + rest + @ + domain
    '$1***$2'             // first char + *** + @ + domain
  );
}

maskEmail('user@example.com');
// 'u***@example.com'

maskEmail('administrator@private.com');
// 'a***@private.com'
```

### Non-Capturing Groups

Sometimes you want grouping for repetition but don't need to capture:

```javascript
// CAPTURING (stores in $1, $2):
/(user|admin)@example/.match();  // Could reference $1

// NON-CAPTURING (doesn't store):
/(?:user|admin)@example/.match();  // Can't reference

// Use non-capturing when you need grouping but not capturing:
/^[a-z]+@(?:example|domain)\.com$/
```

The `?:` makes it non-capturing, improving performance slightly.

### Nested and Complex Groups

Groups can be nested, and numbering goes left-to-right by opening parenthesis:

```javascript
/^((\w+)@(\w+))\.(\w+)$/
  ^1    ^2    ^3  ^4

// Example: 'user@example.com'
// $1 = 'user@example'        (entire address without .com)
// $2 = 'user'                (local)
// $3 = 'example'             (domain)
// $4 = 'com'                 (TLD)
```

**Better approach:** Use named groups (advanced topic in next exercise)

## Real-World Applications

### 1. Email Parsing
```javascript
function parseAndValidate(email) {
  const match = email.match(/^(\w+)@(\w+)\.([a-z]{2,6})$/i);
  
  if (!match) {
    return { valid: false };
  }
  
  return {
    valid: true,
    local: match[1],
    domain: match[2],
    tld: match[3]
  };
}

const info = parseAndValidate('john@company.com');
// { valid: true, local: 'john', domain: 'company', tld: 'com' }
```

### 2. Data Extraction from Text
```javascript
function extractEmailInfo(text) {
  const emails = [];
  let match;
  const pattern = /(\w+)@(\w+)\.(\w+)/g;
  
  while ((match = pattern.exec(text)) !== null) {
    emails.push({
      full: match[0],
      local: match[1],
      domain: match[2]
    });
  }
  
  return emails;
}

extractEmailInfo('Contact support@company.com or sales@company.com');
// [
//   { full: 'support@company.com', local: 'support', domain: 'company' },
//   { full: 'sales@company.com', local: 'sales', domain: 'company' }
// ]
```

### 3. Data Normalization and Cleaning
```javascript
function normalizeEmailData(emails) {
  return emails.map(email => {
    // Extract and rebuild, normalizing in process
    return email
      .replace(/\s*@\s*/, '@')                    // Fix spaces
      .replace(/^(\w+)@(\w+)\.(\w+)$/, 
        (match, local, domain, tld) => 
          `${local.toLowerCase()}@${domain.toLowerCase()}.${tld.toLowerCase()}`
      );
  });
}
```

### 4. Batch Processing
```javascript
function processEmailList(csvText) {
  const lines = csvText.split('\n');
  
  return lines.map(line => {
    const match = line.match(/^(.+),(\w+@\w+\.\w+)$/);
    
    if (!match) return null;
    
    return {
      name: match[1].trim(),
      email: match[2],
      domain: match[2].replace(/.*@(\w+)\./, '$1')
    };
  }).filter(item => item !== null);
}
```

## Step-by-Step Examples

### Building an Email Parser

```javascript
// Step 1: Simple extraction
function getLocal(email) {
  const match = email.match(/^(\w+)@/);
  return match ? match[1] : '';
}

// Step 2: Get multiple parts
function getParts(email) {
  const match = email.match(/^(\w+)@(\w+)\.(\w+)$/);
  return match ? [match[1], match[2], match[3]] : [];
}

// Step 3: Create object
function parseEmail(email) {
  const match = email.match(/^(\w+)@(\w+)\.(\w+)$/);
  if (!match) return null;
  
  const [, local, domain, tld] = match;  // Destructure!
  return { local, domain, tld };
}

// Step 4: Validate and parse
function validateAndParse(email) {
  const match = email.match(/^([a-z0-9]+)@([a-z0-9]+)\.([a-z]{2,})$/i);
  
  if (!match) {
    return { valid: false, error: 'Invalid email format' };
  }
  
  const [, local, domain, tld] = match;
  
  if (local.length > 64) {
    return { valid: false, error: 'Local part too long' };
  }
  
  return {
    valid: true,
    local,
    domain,
    tld,
    fullEmail: email.toLowerCase()
  };
}
```

## Common Mistakes to Avoid

### ❌ Mistake 1: Forgetting to Check for Null
```javascript
// WRONG - crashes if no match
const local = email.match(/^(\w+)@/)[1];

// CORRECT - check first
const match = email.match(/^(\w+)@/);
const local = match ? match[1] : '';
```

### ❌ Mistake 2: Wrong Group Numbering
```javascript
// WRONG - group numbering starts at 1, not 0
const match = 'user@example.com'.match(/(\w+)@(\w+)/);
const local = match[0];  // This is the FULL match!

// CORRECT - match[1] is first group
const local = match[1];  // 'user'
const domain = match[2];  // 'example'
```

### ❌ Mistake 3: Forgetting Dollar Signs in Replace
```javascript
// WRONG - $1 interpreted as literal string
'user@example'.replace(/(\w+)@(\w+)/, '$2 - $1');
// Result: '$2 - $1' (not evaluated!)

// CORRECT - use dollar signs for groups
'user@example'.replace(/(\w+)@(\w+)/, '$2 - $1');
// Result: 'example - user'
```

### ❌ Mistake 4: Wrong Replace Syntax
```javascript
// WRONG - string concatenation doesn't work
email.replace(/(\w+)@(\w+)/, match[1] + '@' + match[2]);

// CORRECT - use $1, $2 in replacement string
email.replace(/(\w+)@(\w+)/, '$1@$2');

// OR use function (advanced):
email.replace(/(\w+)@(\w+)/, (match, group1, group2) => {
  return group2 + '@' + group1;
});
```

### ❌ Mistake 5: Assuming All Emails Fit One Pattern
```javascript
// WRONG - doesn't account for dots in local part
/^(\w+)@(\w+)\.(\w+)$/;

// BETTER - allows dots in local part
/^([\w.]+)@(\w+)\.(\w+)$/;

// EVEN BETTER - use appropriate character classes
/^([\w.+-]+)@([\w.-]+)\.([a-z]{2,})$/i;
```

## Challenge Exercises

**Easy:**
1. Extract just the local part (before @)
2. Extract just the domain
3. Create a simple email parser returning object

**Medium:**
1. Swap local and domain parts
2. Format email for display
3. Mask email for privacy

**Hard:**
1. Extract email while handling subdomains
2. Parse and normalize multiple formats
3. Build a complete email parser with validation

## Advanced Topics (Next Exercise)

You'll soon learn:
- **Named groups** - `(?<name>...)` for clarity
- **Lookahead/Lookbehind** - `(?=...)` and `(?<=...)`
- **Backreferences** - `\1`, `\2` to match same text twice

## Quick Reference

| What | Syntax | Example |
|------|--------|---------|
| Capture group | `(pattern)` | `(\w+)` |
| Access in match | `match[n]` | `match[1]` |
| Reference in replace | `$n` | `$1-$2` |
| Full match | `$&` | Keep whole match |
| Text before match | `$\`` | Text before |
| Non-capturing | `(?:...)` | `(?:a\|b)` |

## Summary

You've mastered:
- ✅ Creating capture groups with parentheses
- ✅ Accessing groups from match() results
- ✅ Using $1, $2 references in replace()
- ✅ Extracting email components
- ✅ Transforming and rebuilding strings
- ✅ Real-world email parsing patterns

You now have powerful tools for data extraction and transformation! In the next exercise, you'll learn even more advanced techniques like lookahead and lookbehind assertions.

## Next Exercise

**Exercise 171: Email Advanced** - Learn lookahead, lookbehind, and named groups for even more sophisticated pattern matching!
