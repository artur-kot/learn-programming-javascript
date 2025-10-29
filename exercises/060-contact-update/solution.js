export function createContact(name, email, phone) {
  return { name, email, phone };
}

export function getNameDot(contact) {
  return contact.name;
}

export function getPropBracket(contact, prop) {
  return contact[prop];
}

export function setProperty(contact, prop, value) {
  contact[prop] = value;
  return contact;
}

export function removeProperty(contact, prop) {
  if (prop in contact) {
    delete contact[prop];
    return true;
  }
  return false;
}
