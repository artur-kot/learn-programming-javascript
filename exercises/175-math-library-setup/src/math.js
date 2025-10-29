/**
 * Core Math Utilities
 * Basic arithmetic and rounding functions
 */

/**
 * Calculate the sum of two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
export function add(a, b) {
  return a + b;
}

/**
 * Calculate the difference between two numbers
 * @param {number} a - First number
 * @param {number} b - Number to subtract
 * @returns {number} Difference (a - b)
 */
export function subtract(a, b) {
  return a - b;
}

/**
 * Calculate the product of two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Product of a and b
 */
export function multiply(a, b) {
  return a * b;
}

/**
 * Calculate the quotient of two numbers
 * @param {number} a - Dividend
 * @param {number} b - Divisor (must not be 0)
 * @returns {number} Quotient (a / b)
 * @throws {Error} If divisor is 0
 */
export function divide(a, b) {
  if (b === 0) throw new Error('Cannot divide by zero');
  return a / b;
}

/**
 * Calculate remainder after division (modulo)
 * @param {number} a - Dividend
 * @param {number} b - Divisor
 * @returns {number} Remainder of a / b
 */
export function modulo(a, b) {
  if (b === 0) throw new Error('Cannot modulo by zero');
  return a % b;
}

/**
 * Calculate the power of a number
 * @param {number} base - Base number
 * @param {number} exponent - Power to raise to
 * @returns {number} base raised to exponent
 */
export function power(base, exponent) {
  return Math.pow(base, exponent);
}

/**
 * Calculate the square root of a number
 * @param {number} num - Number to find square root of
 * @returns {number} Square root of num
 * @throws {Error} If num is negative
 */
export function squareRoot(num) {
  if (num < 0) throw new Error('Cannot calculate square root of negative number');
  return Math.sqrt(num);
}

/**
 * Calculate absolute value
 * @param {number} num - Number
 * @returns {number} Absolute value (always positive)
 */
export function absolute(num) {
  return Math.abs(num);
}

/**
 * Round number to specified decimal places
 * @param {number} num - Number to round
 * @param {number} decimals - Number of decimal places (default: 0)
 * @returns {number} Rounded number
 */
export function round(num, decimals = 0) {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}

/**
 * Calculate the factorial of a number
 * @param {number} n - Non-negative integer
 * @returns {number} Factorial of n (n!)
 * @throws {Error} If n is negative
 */
export function factorial(n) {
  if (n < 0) throw new Error('Factorial is not defined for negative numbers');
  if (n === 0 || n === 1) return 1;
  
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
