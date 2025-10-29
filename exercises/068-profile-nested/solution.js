function createAddress(street, city, state, zip, country = 'USA') {
  return { street, city, state, zip, country };
}

function createUserProfile(id, firstName, lastName, email, street, city, state, zip) {
  return {
    id,
    firstName,
    lastName,
    email,
    address: createAddress(street, city, state, zip),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    getFullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    getFullAddress() {
      const { street, city, state, zip, country } = this.address;
      return `${street}, ${city}, ${state} ${zip}, ${country}`;
    }
  };
}

let users = [];

export function createProfile(id, firstName, lastName, email, street, city, state, zip) {
  const profile = createUserProfile(id, firstName, lastName, email, street, city, state, zip);
  users.push(profile);
  return profile;
}

export function getUserById(id) {
  return users.find(user => user.id === id);
}

export function getUserFullName(id) {
  const user = getUserById(id);
  return user ? user.getFullName() : undefined;
}

export function getUserAddress(id) {
  const user = getUserById(id);
  return user ? user.getFullAddress() : undefined;
}

export function updateUserAddress(id, street, city, state, zip) {
  const user = getUserById(id);
  if (!user) return false;
  
  user.address = createAddress(street, city, state, zip, user.address.country);
  user.updatedAt = new Date().toISOString();
  return true;
}

export function getAllUsers() {
  return users;
}

export function populateUsers() {
  createProfile(1, 'Alice', 'Johnson', 'alice@example.com', '123 Main St', 'Boston', 'MA', '02101');
  createProfile(2, 'Bob', 'Smith', 'bob@example.com', '456 Oak Ave', 'New York', 'NY', '10001');
  createProfile(3, 'Carol', 'Davis', 'carol@example.com', '789 Pine Rd', 'Chicago', 'IL', '60601');
}

export function resetUsers() {
  users = [];
}
