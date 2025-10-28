// User Profile System - Complex nested data structures
// This exercise introduces working with deeply nested objects

// Helper: Create an address object
function createAddress(street, city, state, zip, country = 'USA') {
  return { street, city, state, zip, country };
}

// Helper: Create a user profile with nested address
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

// TODO: Implement createProfile(id, firstName, lastName, email, street, city, state, zip)
// Create a new user profile with nested address
// Add to users array and return the created profile
export function createProfile(id, firstName, lastName, email, street, city, state, zip) {
  // TODO: Implementation
}

// TODO: Implement getUserById(id)
// Find and return user profile by ID
// Return undefined if not found
export function getUserById(id) {
  // TODO: Implementation
}

// TODO: Implement getUserFullName(id)
// Get the full name of user (using getFullName method)
// Return full name or undefined if user not found
export function getUserFullName(id) {
  // TODO: Implementation
}

// TODO: Implement getUserAddress(id)
// Get the full address of user (using getFullAddress method)
// Return address string or undefined if user not found
export function getUserAddress(id) {
  // TODO: Implementation
}

// TODO: Implement updateUserAddress(id, street, city, state, zip)
// Update the nested address object for a user
// Return true if updated, false if user not found
export function updateUserAddress(id, street, city, state, zip) {
  // TODO: Implementation
}

// TODO: Implement getAllUsers()
// Return array of all user profiles
export function getAllUsers() {
  // TODO: Implementation
}

// Helper for testing
export function populateUsers() {
  createProfile(1, 'Alice', 'Johnson', 'alice@example.com', '123 Main St', 'Boston', 'MA', '02101');
  createProfile(2, 'Bob', 'Smith', 'bob@example.com', '456 Oak Ave', 'New York', 'NY', '10001');
  createProfile(3, 'Carol', 'Davis', 'carol@example.com', '789 Pine Rd', 'Chicago', 'IL', '60601');
}

export function resetUsers() {
  users = [];
}
