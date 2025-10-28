# 061 - Contact Manager: Add Methods

## Overview

Add methods to contact objects to display and format contact information.

## Challenge

- Implement `attachDisplayMethod(contact)` that adds a `display()` method to the contact which returns a formatted string with name, email, and phone.
- Implement `attachFormatPhoneMethod(contact)` that adds a `formatPhone()` method which returns only the digits from the phone number (remove all non-digit characters).

## Hints

- Methods use `this` to reference the contact object properties
- Use string replacement to remove non-digits: `String(value).replace(/\D/g, '')`
- Methods should be functions: `contact.display = function() { ... }`

## Tests

```bash
npm test
```
