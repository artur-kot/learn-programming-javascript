// Previous solutions included for context
export function createContact(name, email, phone) {
  return { name, email, phone };
}

export function setProperty(contact, prop, value) {
  contact[prop] = value;
  return contact;
}

// TODO: Implement attachDisplayMethod(contact)
// Should add a display() method that returns a formatted string with name, email, phone
// Return the modified contact
export function attachDisplayMethod(contact) {
  // TODO: Implementation
}

// TODO: Implement attachFormatPhoneMethod(contact)
// Should add a formatPhone() method that returns a phone string with only digits
// Return the modified contact
export function attachFormatPhoneMethod(contact) {
  // TODO: Implementation
}
