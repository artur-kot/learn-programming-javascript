// Previous solutions included for context
export function createContact(name, email, phone) {
  return { name, email, phone };
}

export function getNameDot(contact) {
  return contact.name;
}

export function getPropBracket(contact, prop) {
  return contact[prop];
}

// TODO: Implement setProperty(contact, prop, value)
// Dynamically add or update a property on the contact object
// Return the modified contact
export function setProperty(contact, prop, value) {
  // TODO: Implementation
}

// TODO: Implement removeProperty(contact, prop)
// Remove the property from the contact if it exists
// Return true if property was deleted, false otherwise
export function removeProperty(contact, prop) {
  // TODO: Implementation
}
