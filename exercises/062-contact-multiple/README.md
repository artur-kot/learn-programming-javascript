# 062 - Contact Manager: Multiple Contacts

## Overview

Store multiple contacts in an array and iterate through them to display all contact information.

## Challenge

- Implement `addContact(contacts, name, email, phone)` that creates a new contact with all methods attached (from previous exercises), adds it to the contacts array, and returns the array.
- Implement `getAllContactsInfo(contacts)` that iterates through all contacts and collects their display information into an array.

## Hints

- Use `createContact()`, `attachDisplayMethod()`, and `attachFormatPhoneMethod()` from previous exercises
- Push the new contact into the array with `.push()`
- Use a simple for loop to iterate: `for (let i = 0; i < contacts.length; i++)`
- Call `.display()` on each contact and collect results

## Tests

```bash
npm test
```
