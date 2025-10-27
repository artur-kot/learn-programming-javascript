// Import the basic operations from the previous exercise
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function multiply(a, b) {
  return a * b;
}

export function divide(a, b) {
  return a / b;
}

// New advanced operations below!

export function modulo(a, b) {
  // TODO: Return the remainder when a is divided by b
}

export function power(base, exponent) {
  // TODO: Return base raised to the power of exponent
}

export function squareRoot(number) {
  // TODO: Return the square root of a number
}

// Test basic operations
console.log("=== Basic Operations ===");
console.log("Addition: 10 + 5 =", add(10, 5));
console.log("Subtraction: 10 - 5 =", subtract(10, 5));
console.log("Multiplication: 10 * 5 =", multiply(10, 5));
console.log("Division: 10 / 5 =", divide(10, 5));

// Test advanced operations
console.log("\n=== Advanced Operations ===");
console.log("Modulo: 10 % 3 =", modulo(10, 3));
console.log("Power: 2 ** 3 =", power(2, 3));
console.log("Square Root: √16 =", squareRoot(16));
