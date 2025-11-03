/**
 * Simple Calculator Implementation (from Exercise 178)
 * 
 * This is the same calculator from Exercise 178.
 * Tests in this exercise use Vitest instead of node:test.
 */

/**
 * Add two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 * @throws {TypeError} If inputs are not numbers
 */
export function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Both parameters must be numbers');
  }
  return a + b;
}

/**
 * Subtract two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Difference of a and b
 * @throws {TypeError} If inputs are not numbers
 */
export function subtract(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Both parameters must be numbers');
  }
  return a - b;
}

/**
 * Multiply two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Product of a and b
 * @throws {TypeError} If inputs are not numbers
 */
export function multiply(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Both parameters must be numbers');
  }
  return a * b;
}

/**
 * Divide two numbers
 * @param {number} a - Dividend
 * @param {number} b - Divisor
 * @returns {number} Quotient of a and b
 * @throws {TypeError} If inputs are not numbers
 * @throws {Error} If divisor is zero
 */
export function divide(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Both parameters must be numbers');
  }
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

/**
 * Get the power of a number (a^b)
 * @param {number} a - Base
 * @param {number} b - Exponent
 * @returns {number} a raised to power b
 * @throws {TypeError} If inputs are not numbers
 */
export function power(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Both parameters must be numbers');
  }
  return Math.pow(a, b);
}

/**
 * Get the modulo (remainder)
 * @param {number} a - Dividend
 * @param {number} b - Divisor
 * @returns {number} Remainder of a divided by b
 * @throws {TypeError} If inputs are not numbers
 * @throws {Error} If divisor is zero
 */
export function modulo(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Both parameters must be numbers');
  }
  if (b === 0) {
    throw new Error('Cannot calculate modulo by zero');
  }
  return a % b;
}
