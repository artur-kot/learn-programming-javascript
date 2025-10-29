# 060 - Contact Manager: Update Contact

## Overview

Learn how to dynamically add, update, and remove properties on objects.

## Challenge

- Implement `setProperty(contact, prop, value)` to add or update a property on the contact object and return the modified object.
- Implement `removeProperty(contact, prop)` to remove a property and return `true` if removed or `false` if not present.

## Hints

- Use `contact[prop] = value` to set properties dynamically
- Use the `delete` operator to remove a property: `delete contact[prop]`
- Use the `in` operator to check if a property exists

## Tests

```bash
npm test
```
