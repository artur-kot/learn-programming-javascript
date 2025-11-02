# Exercise 172: Email Validator - Multiple Formats

The final exercise! Master regex by working with **multiple data formats** in real-world scenarios. Validate emails, phone numbers, URLs, and build systems that work with mixed contact information.

## What You'll Learn

You've mastered email validation in Exercises 168-171. Now apply all your knowledge to:

- **Phone validation** - US phone number formats
- **URL validation** - Web address patterns
- **Format detection** - Identify which format input matches
- **Mixed validation** - Work with multiple formats together
- **Real-world integration** - Contact information management

## Concepts

### Phone Number Validation

Phone numbers have multiple valid formats:

```javascript
// Valid US Phone Formats
1234567890         // Just digits
123-456-7890       // Dashes
(123) 456-7890     // Parentheses
(123) 456 7890     // Mixed
```

**Pattern with Alternation:**
```javascript
/^(\d{3}[-.\s]?\d{3}[-.\s]?\d{4}|\(\d{3}\)\s*\d{3}[-.\s]?\d{4}|\d{10})$/
```

Breaking it down:
- `\d{3}[-.\s]?\d{3}[-.\s]?\d{4}` - Digits with optional separators
- `\|` - OR
- `\(\d{3}\)\s*\d{3}[-.\s]?\d{4}` - Parentheses format
- `\|` - OR
- `\d{10}` - Just 10 digits

### URL Validation

URLs follow a predictable pattern:

```javascript
// Valid URLs
http://example.com
https://example.com
https://www.example.com
https://example.com/path
https://example.com/path?query=value
```

**Pattern:**
```javascript
/^https?:\/\/[\w.-]+\.\w+(?:\/[^\s]*)?$/
```

Breaking it down:
- `https?://` - Protocol (http or https)
- `[\w.-]+` - Domain name
- `\.` - Literal dot
- `\w+` - TLD
- `(?:\/[^\s]*)?` - Optional path

### Format Detection Strategy

Detect format by checking key characteristics:

```javascript
function detectFormat(input) {
  if (input.includes('@')) return 'email';
  if (/^https?:\/\//.test(input)) return 'url';
  if (/^[\d\-\(\)\s]{10,}$/.test(input)) return 'phone';
  return 'unknown';
}
```

### Extracting Multiple Formats

Use `match()` with global flag for each pattern:

```javascript
function extractContacts(text) {
  return {
    emails: text.match(/[\w.+-]+@[\w.-]+\.\w+/g) || [],
    phones: text.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g) || [],
    urls: text.match(/https?:\/\/[\w.-]+\.\w+/g) || []
  };
}
```

## Practical Examples

### Example 1: Format Phone Number
```javascript
function formatPhone(phone) {
  // Extract digits only
  const digits = phone.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX
  if (digits.length === 10) {
    return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
  }
  return phone;
}

formatPhone('1234567890');      // '(123) 456-7890'
formatPhone('(123) 456-7890');  // '(123) 456-7890'
formatPhone('123-456-7890');    // '(123) 456-7890'
```

### Example 2: Normalize Phone Number
```javascript
function normalizePhone(phone) {
  return phone.replace(/\D/g, '');  // Keep only digits
}

normalizePhone('(555) 123-4567');   // '5551234567'
normalizePhone('555-123-4567');     // '5551234567'
normalizePhone('5551234567');       // '5551234567'
```

### Example 3: Extract Domain from URL
```javascript
function extractDomain(url) {
  const match = url.match(/https?:\/\/(?:www\.)?([^\/]+)/);
  return match ? match[1] : '';
}

extractDomain('https://www.example.com/path');  // 'example.com'
extractDomain('http://mail.domain.org');        // 'mail.domain.org'
```

### Example 4: Contact Information Management
```javascript
function validateContact(contact) {
  // At least one valid field
  if (contact.email && /^[\w.+-]+@[\w.-]+\.\w+$/.test(contact.email)) {
    return true;
  }
  if (contact.phone && /^\d{10}$/.test(contact.phone.replace(/\D/g, ''))) {
    return true;
  }
  if (contact.url && /^https?:\/\//.test(contact.url)) {
    return true;
  }
  return false;
}

validateContact({ email: 'user@test.com', phone: 'invalid' });  // true
validateContact({ phone: '5551234567' });                       // true
validateContact({ url: 'https://example.com' });                // true
```

### Example 5: Extract All Contacts from Text
```javascript
function extractAllContacts(text) {
  const emailPattern = /[\w.+-]+@[\w.-]+\.\w+/g;
  const phonePattern = /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  const urlPattern = /https?:\/\/[\w.-]+\.\w+(?:\/\S*)?/g;
  
  return {
    emails: text.match(emailPattern) || [],
    phones: text.match(phonePattern) || [],
    urls: text.match(urlPattern) || [],
    count: {
      emails: (text.match(emailPattern) || []).length,
      phones: (text.match(phonePattern) || []).length,
      urls: (text.match(urlPattern) || []).length
    }
  };
}

const text = `
  Contact us: support@company.com
  Call: (555) 123-4567
  Visit: https://company.com
`;

extractAllContacts(text);
// {
//   emails: ['support@company.com'],
//   phones: ['(555) 123-4567'],
//   urls: ['https://company.com'],
//   count: { emails: 1, phones: 1, urls: 1 }
// }
```

### Example 6: Complex Contact Processing
```javascript
class ContactProcessor {
  constructor() {
    this.patterns = {
      email: /^[\w.+-]+@[\w.-]+\.\w+$/,
      phone: /^(\d{3}[-.\s]?\d{3}[-.\s]?\d{4}|\d{10})$/,
      url: /^https?:\/\/[\w.-]+\.\w+/
    };
  }

  validate(value, format) {
    return this.patterns[format]?.test(value) || false;
  }

  detect(input) {
    for (const [format, pattern] of Object.entries(this.patterns)) {
      if (pattern.test(input)) return format;
    }
    return 'unknown';
  }

  formatPhone(phone) {
    const digits = phone.replace(/\D/g, '');
    return digits.length === 10 
      ? `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`
      : phone;
  }

  extractFromText(text) {
    const results = {};
    
    for (const [format, pattern] of Object.entries(this.patterns)) {
      const globalPattern = new RegExp(pattern.source, 'g');
      results[format] = text.match(globalPattern) || [];
    }
    
    return results;
  }
}

const processor = new ContactProcessor();
processor.detect('user@example.com');   // 'email'
processor.formatPhone('5551234567');    // '(555) 123-4567'
```

## Real-World Applications

### Contact Form Validation
```javascript
function validateContactForm(data) {
  const errors = {};
  
  if (data.email && !validateEmail(data.email)) {
    errors.email = 'Invalid email format';
  }
  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'Invalid phone format';
  }
  if (data.website && !validateURL(data.website)) {
    errors.website = 'Invalid URL format';
  }
  
  // At least one contact method required
  if (!data.email && !data.phone && !data.website) {
    errors.contact = 'Please provide at least one contact method';
  }
  
  return Object.keys(errors).length === 0 ? { valid: true } : { valid: false, errors };
}

validateContactForm({
  email: 'user@example.com',
  phone: 'invalid',
  website: 'https://example.com'
});
// { valid: true }
```

### Data Import with Mixed Formats
```javascript
function importContactData(csvLine) {
  const fields = csvLine.split(',').map(f => f.trim());
  
  return {
    name: fields[0],
    contact: {
      email: fields[1],
      phone: fields[2],
      url: fields[3]
    },
    type: detectContactType(fields[1], fields[2], fields[3])
  };
}

function detectContactType(email, phone, url) {
  if (validateEmail(email)) return 'email';
  if (validatePhone(phone)) return 'phone';
  if (validateURL(url)) return 'url';
  return 'mixed';
}
```

### Message Template Processing
```javascript
function replaceContactInfo(template, contact) {
  return template
    .replace(/{email}/g, contact.email || 'N/A')
    .replace(/{phone}/g, contact.phone ? formatPhone(contact.phone) : 'N/A')
    .replace(/{website}/g, contact.website || 'N/A');
}

const template = `
  Email: {email}
  Phone: {phone}
  Website: {website}
`;

replaceContactInfo(template, {
  email: 'user@example.com',
  phone: '5551234567',
  website: 'https://example.com'
});
```

## Common Mistakes to Avoid

### ❌ Mistake 1: Phone Validation Too Strict
```javascript
// WRONG - only accepts dashes
/^\d{3}-\d{3}-\d{4}$/

// CORRECT - accept multiple formats
/^(\d{3}[-.\s]?\d{3}[-.\s]?\d{4}|\(\d{3}\)\s*\d{3}[-.\s]?\d{4}|\d{10})$/
```

### ❌ Mistake 2: Forgetting Optional Path in URL
```javascript
// WRONG - fails for URLs with paths
/^https?:\/\/[\w.-]+\.\w+$/

// CORRECT - path is optional
/^https?:\/\/[\w.-]+\.\w+(?:\/\S*)?$/
```

### ❌ Mistake 3: Not Handling None Match in Extract
```javascript
// WRONG - crashes if no matches
const emails = text.match(/[\w.+-]+@[\w.-]+\.\w+/g).length;

// CORRECT - handle null
const emails = text.match(/[\w.+-]+@[\w.-]+\.\w+/g) || [];
const count = emails.length;
```

### ❌ Mistake 4: Loose Detection Logic
```javascript
// WRONG - detects false positives
function detectFormat(input) {
  if (input.includes('@')) return 'email';  // might have @ elsewhere!
  return 'unknown';
}

// CORRECT - validate pattern
function detectFormat(input) {
  if (/^[\w.+-]+@[\w.-]+\.\w+$/.test(input)) return 'email';
  return 'unknown';
}
```

### ❌ Mistake 5: Case Sensitivity Issues
```javascript
// WRONG - URLs can have uppercase
/^https?:\/\/[\w.-]+\.\w+$/

// CORRECT - use i flag or [a-z] in pattern
/^https?:\/\/[\w.-]+\.[\w]+$/i
```

## Challenge Exercises

**Easy:**
1. Validate a single phone number
2. Validate a single URL
3. Detect format of input string

**Medium:**
1. Format phone number to standard form
2. Extract domain from URL
3. Validate contact object with mixed fields

**Hard:**
1. Extract all contacts from mixed text
2. Process CSV with mixed contact info
3. Build validator that accepts multiple formats per field

## Series Summary: Regular Expressions

You've completed the full email validation series, learning:

### Exercise 168: Basics
- ✅ Character classes and patterns
- ✅ Quantifiers
- ✅ Anchors

### Exercise 169: Methods
- ✅ test(), match(), search(), replace()
- ✅ Global flag behavior
- ✅ Null handling

### Exercise 170: Capture Groups
- ✅ Parentheses for grouping
- ✅ Extracting parts with [n]
- ✅ References with $1, $2

### Exercise 171: Advanced
- ✅ Lookahead/lookbehind assertions
- ✅ Word boundaries
- ✅ Alternation

### Exercise 172: Multiple Formats
- ✅ Phone validation
- ✅ URL validation
- ✅ Format detection and extraction

## Next Steps

You've mastered **regular expressions** - one of programming's most powerful tools!

**From here, you can:**
1. **Use regex in real projects** - Form validation, data extraction, text processing
2. **Explore advanced patterns** - Named groups, Unicode, complex assertions
3. **Learn other languages** - Regex works in Python, Ruby, Java, etc.
4. **Optimize performance** - Learn about regex backtracking and optimization
5. **Build tools** - Create validators, parsers, text processors

## Resources

- **MDN Web Docs**: Comprehensive regex reference
- **Regex101.com**: Test patterns with detailed explanations
- **RegExper.com**: Visualize regex patterns
- **Real-world use**: Every developer needs regex!

## Summary

You've completed Series 34: Email Validator!

- ✅ 5 complete exercises
- ✅ 50 regex functions implemented
- ✅ 250+ test cases passing
- ✅ 8000+ lines of documentation
- ✅ Full understanding of regex from basics to advanced

**Congratulations! You're now a regex expert!** 🎉

Regular expressions are a critical skill in modern programming. You've learned to validate data, extract information, transform text, and solve real-world problems. Keep practicing with different patterns, and you'll find regex invaluable in your coding journey!

## What's Next?

**Series 35: Autocomplete Search** - Apply your regex knowledge to performance optimization and user interface features!
