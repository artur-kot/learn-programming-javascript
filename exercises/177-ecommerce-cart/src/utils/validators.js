/**
 * Validators - Data validation utilities
 *
 * Functions for validating various data types and business rules.
 */

/**
 * Validate integer within range
 * @param {*} value - Value to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @throws {Error} If validation fails
 */
export const validateIntegerRange = (value, min, max) => {
  if (!Number.isInteger(value)) {
    throw new Error(`Must be an integer, got ${typeof value}`);
  }
  if (value < min || value > max) {
    throw new Error(`Must be between ${min} and ${max}, got ${value}`);
  }
};

/**
 * Validate non-negative number
 * @param {*} value - Value to validate
 * @param {string} fieldName - Field name for error message
 * @throws {Error} If not a non-negative number
 */
export const validateNonNegative = (value, fieldName = "Value") => {
  if (typeof value !== "number" || value < 0) {
    throw new Error(`${fieldName} must be a non-negative number`);
  }
};

/**
 * Validate positive number
 * @param {*} value - Value to validate
 * @param {string} fieldName - Field name for error message
 * @throws {Error} If not a positive number
 */
export const validatePositive = (value, fieldName = "Value") => {
  if (typeof value !== "number" || value <= 0) {
    throw new Error(`${fieldName} must be a positive number`);
  }
};

/**
 * Validate non-empty string
 * @param {*} value - Value to validate
 * @param {string} fieldName - Field name for error message
 * @throws {Error} If not a non-empty string
 */
export const validateNonEmptyString = (value, fieldName = "Field") => {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${fieldName} must be a non-empty string`);
  }
};

/**
 * Validate one of allowed values
 * @param {*} value - Value to validate
 * @param {Array} allowedValues - Allowed values
 * @param {string} fieldName - Field name for error message
 * @throws {Error} If value not in allowed list
 */
export const validateOneOf = (value, allowedValues, fieldName = "Value") => {
  if (!allowedValues.includes(value)) {
    throw new Error(
      `${fieldName} must be one of: ${allowedValues.join(", ")}, got "${value}"`
    );
  }
};

/**
 * Validate is array
 * @param {*} value - Value to validate
 * @param {string} fieldName - Field name for error message
 * @throws {Error} If not an array
 */
export const validateArray = (value, fieldName = "Value") => {
  if (!Array.isArray(value)) {
    throw new Error(`${fieldName} must be an array`);
  }
};

/**
 * Validate is object
 * @param {*} value - Value to validate
 * @param {string} fieldName - Field name for error message
 * @throws {Error} If not an object
 */
export const validateObject = (value, fieldName = "Value") => {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`${fieldName} must be an object`);
  }
};

/**
 * Validate is Date
 * @param {*} value - Value to validate
 * @param {string} fieldName - Field name for error message
 * @throws {Error} If not a Date
 */
export const validateDate = (value, fieldName = "Date") => {
  if (!(value instanceof Date) || isNaN(value)) {
    throw new Error(`${fieldName} must be a valid Date`);
  }
};

/**
 * Validate percentage (0-100)
 * @param {*} value - Value to validate
 * @param {string} fieldName - Field name for error message
 * @throws {Error} If not a valid percentage
 */
export const validatePercentage = (value, fieldName = "Percentage") => {
  validateNumberRange(value, 0, 100, fieldName);
};

/**
 * Validate number within range
 * @param {*} value - Value to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {string} fieldName - Field name for error message
 * @throws {Error} If out of range
 */
export const validateNumberRange = (value, min, max, fieldName = "Value") => {
  if (typeof value !== "number" || isNaN(value)) {
    throw new Error(`${fieldName} must be a number`);
  }
  if (value < min || value > max) {
    throw new Error(`${fieldName} must be between ${min} and ${max}`);
  }
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @throws {Error} If invalid email
 */
export const validateEmail = (email) => {
  validateNonEmptyString(email, "Email");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }
};

/**
 * Create required field validator
 * @param {string} fieldName - Field name
 * @returns {Function} Validator function
 */
export const createRequiredValidator = (fieldName) => {
  return (value) => {
    if (value === undefined || value === null || value === "") {
      throw new Error(`${fieldName} is required`);
    }
  };
};
