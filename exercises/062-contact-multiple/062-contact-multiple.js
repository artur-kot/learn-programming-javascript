// Previous solutions included for context
export function createContact(name, email, phone) {
  return { name, email, phone };
}

export function attachDisplayMethod(contact) {
  contact.display = function() {
    return `${this.name} <${this.email}> - ${this.phone}`;
  };
  return contact;
}

export function attachFormatPhoneMethod(contact) {
  contact.formatPhone = function() {
    return String(this.phone).replace(/\D/g, '');
  };
  return contact;
}

// TODO: Implement addContact(contacts, name, email, phone)
// Create a new contact and add it to the contacts array
// Each contact should have the display and formatPhone methods
// Return the modified contacts array
export function addContact(contacts, name, email, phone) {
  // TODO: Implementation
}

// TODO: Implement getAllContactsInfo(contacts)
// Use for...in to iterate through contact objects
// Call display() on each contact and collect all display strings
// Return an array of display strings
export function getAllContactsInfo(contacts) {
  // TODO: Implementation
}
