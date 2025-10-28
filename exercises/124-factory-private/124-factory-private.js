// TODO: Implement the createUser factory
// Create a user object with private email and public profile
export function createUser(username, email) {
  
}

// TODO: Implement the createBankAccount factory
// Create an account with private balance and transaction history
export function createBankAccount(owner, initialBalance) {
  
}

// TODO: Implement the createSecureNote factory
// Create a note with password protection using closures
export function createSecureNote(content, password) {
  
}

// TODO: Implement the createPasswordManager factory
// Factory for managing credentials with hashing
export function createPasswordManager() {
  
}

// TODO: Implement a private hash function (helper inside factory)
// This should be a helper function you create inside createPasswordManager
function hashPassword(password) {
  return password.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0).toString(16);
}
