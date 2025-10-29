// TODO: Create custom error classes
// Define ValidationError, InvalidEmailError, InvalidPasswordError, etc.
export class ValidationError extends Error {
  
}

export class InvalidEmailError extends ValidationError {
  
}

export class InvalidPasswordError extends ValidationError {
  
}

export class InvalidUsernameError extends ValidationError {
  
}

export class InvalidAgeError extends ValidationError {
  
}

// TODO: Implement the validateEmail function
// Throw InvalidEmailError for invalid emails
export function validateEmail(email) {
  
}

// TODO: Implement the validatePassword function
// Throw InvalidPasswordError for invalid passwords
export function validatePassword(password) {
  
}

// TODO: Implement the validateUsername function
// Throw InvalidUsernameError for invalid usernames
export function validateUsername(username) {
  
}

// TODO: Implement the validateAge function
// Throw InvalidAgeError for invalid ages
export function validateAge(age) {
  
}

// TODO: Implement the validateForm function
// Try each field, catch specific errors, return detailed results
export function validateForm(formData) {
  
}
