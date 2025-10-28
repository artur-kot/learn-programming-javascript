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

export function addContact(contacts, name, email, phone) {
  const contact = createContact(name, email, phone);
  attachDisplayMethod(contact);
  attachFormatPhoneMethod(contact);
  contacts.push(contact);
  return contacts;
}

export function getAllContactsInfo(contacts) {
  const infos = [];
  for (let i = 0; i < contacts.length; i++) {
    infos.push(contacts[i].display());
  }
  return infos;
}
