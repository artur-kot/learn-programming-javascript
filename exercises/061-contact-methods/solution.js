export function createContact(name, email, phone) {
  return { name, email, phone };
}

export function setProperty(contact, prop, value) {
  contact[prop] = value;
  return contact;
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
