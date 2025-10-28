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

export function addPreferences(userId) {
  const user = getUserById(userId);
  if (!user) return false;
  
  user.preferences = {
    theme: 'light',
    notifications: { email: true, sms: false, push: true },
    privacy: { showEmail: false, showPhone: false }
  };
  return true;
}

export function addFriend(userId, friendId) {
  const user = getUserById(userId);
  if (!user) return false;
  if (user.friends.includes(friendId)) return false;
  
  user.friends.push(friendId);
  return true;
}

export function removeFriend(userId, friendId) {
  const user = getUserById(userId);
  if (!user) return false;
  
  const index = user.friends.indexOf(friendId);
  if (index === -1) return false;
  
  user.friends.splice(index, 1);
  return true;
}

export function getFriends(userId) {
  const user = getUserById(userId);
  if (!user) return undefined;
  
  return user.friends.map(friendId => getUserById(friendId));
}

export function getFriendCount(userId) {
  const user = getUserById(userId);
  return user ? user.friends.length : undefined;
}

export function areFriends(userId1, userId2) {
  const user1 = getUserById(userId1);
  const user2 = getUserById(userId2);
  
  return user1?.friends.includes(userId2) && user2?.friends.includes(userId1);
}

export function getMutualFriends(userId1, userId2) {
  const user1 = getUserById(userId1);
  const user2 = getUserById(userId2);
  
  if (!user1 || !user2) return [];
  
  const mutual = user1.friends.filter(id => user2.friends.includes(id));
  return mutual.map(id => getUserById(id));
}

export function populateUsers() {
  createProfile(1, 'Alice', 'Johnson', 'alice@example.com', '123 Main St', 'Boston', 'MA', '02101');
  createProfile(2, 'Bob', 'Smith', 'bob@example.com', '456 Oak Ave', 'New York', 'NY', '10001');
  createProfile(3, 'Carol', 'Davis', 'carol@example.com', '789 Pine Rd', 'Chicago', 'IL', '60601');
  createProfile(4, 'David', 'Wilson', 'david@example.com', '321 Elm St', 'Boston', 'MA', '02102');
}

export function resetUsers() {
  users = [];
}
