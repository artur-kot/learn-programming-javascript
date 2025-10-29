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
    friends: [],
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

export function addFriend(userId, friendId) {
  const user = getUserById(userId);
  if (!user) return false;
  if (user.friends.includes(friendId)) return false;
  
  user.friends.push(friendId);
  return true;
}

export function userToJSON(userId) {
  const user = getUserById(userId);
  if (!user) return undefined;
  
  return JSON.stringify(user, (key, value) => {
    if (typeof value === 'function') return undefined;
    return value;
  });
}

export function parseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return undefined;
  }
}

export function exportUsers() {
  return JSON.stringify(users, (key, value) => {
    if (typeof value === 'function') return undefined;
    return value;
  });
}

export function importUsers(jsonString) {
  try {
    const parsedUsers = JSON.parse(jsonString);
    if (!Array.isArray(parsedUsers)) return 0;
    
    parsedUsers.forEach(userData => {
      const profile = createProfile(
        userData.id,
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.address.street,
        userData.address.city,
        userData.address.state,
        userData.address.zip
      );
      profile.friends = userData.friends || [];
    });
    
    return parsedUsers.length;
  } catch (e) {
    return 0;
  }
}

export function userToJSONWithReplacer(userId) {
  const user = getUserById(userId);
  if (!user) return undefined;
  
  const replacer = (key, value) => {
    if (typeof value === 'function') {
      return undefined;
    }
    return value;
  };
  
  return JSON.stringify(user, replacer);
}

export function populateUsers() {
  createProfile(1, 'Alice', 'Johnson', 'alice@example.com', '123 Main St', 'Boston', 'MA', '02101');
  createProfile(2, 'Bob', 'Smith', 'bob@example.com', '456 Oak Ave', 'New York', 'NY', '10001');
  addFriend(1, 2);
  addFriend(2, 1);
}

export function resetUsers() {
  users = [];
}

export function getAllUsers() {
  return users;
}
