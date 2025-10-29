// User Profile System - Friends and social features
// Previous solution included for context (complete)

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

// TODO: Implement addFriend(userId, friendId)
// Add friend ID to user's friends array (avoid duplicates)
// Return true if added, false if user not found or already friends
export function addFriend(userId, friendId) {
  // TODO: Implementation
}

// TODO: Implement removeFriend(userId, friendId)
// Remove friend ID from user's friends array
// Return true if removed, false if not found
export function removeFriend(userId, friendId) {
  // TODO: Implementation
}

// TODO: Implement getFriends(userId)
// Get array of friend objects (not just IDs) for a user
// Return array of user objects or undefined if user not found
export function getFriends(userId) {
  // TODO: Implementation
}

// TODO: Implement getFriendCount(userId)
// Return number of friends user has
// Return undefined if user not found
export function getFriendCount(userId) {
  // TODO: Implementation
}

// TODO: Implement areFriends(userId1, userId2)
// Check if userId1 and userId2 are friends (bidirectional)
// Return true if mutual friends, false otherwise
export function areFriends(userId1, userId2) {
  // TODO: Implementation
}

// TODO: Implement getMutualFriends(userId1, userId2)
// Find friends that both users have in common
// Return array of mutual friend objects
export function getMutualFriends(userId1, userId2) {
  // TODO: Implementation
}

// Helper
export function populateUsers() {
  createProfile(1, 'Alice', 'Johnson', 'alice@example.com', '123 Main St', 'Boston', 'MA', '02101');
  createProfile(2, 'Bob', 'Smith', 'bob@example.com', '456 Oak Ave', 'New York', 'NY', '10001');
  createProfile(3, 'Carol', 'Davis', 'carol@example.com', '789 Pine Rd', 'Chicago', 'IL', '60601');
  createProfile(4, 'David', 'Wilson', 'david@example.com', '321 Elm St', 'Boston', 'MA', '02102');
}

export function resetUsers() {
  users = [];
}
