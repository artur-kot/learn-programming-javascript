export function createContact(name, email, phone) {
  return { name, email, phone };
}

export function getNameDot(contact) {
  return contact.name;
}

export function getPropBracket(contact, prop) {
  return contact[prop];
}
