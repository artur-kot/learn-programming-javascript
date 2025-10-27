// Calculator functions with validation!

export function add(a, b) {
  // TODO: Convert inputs to numbers
  const numA = Number(a);
  const numB = Number(b);

  // TODO: Check if either number is invalid
  // If invalid, return "Error: Invalid input"
  // Otherwise, return the sum
}

export function subtract(a, b) {
  // TODO: Same validation as add, then subtract
  const numA = Number(a);
  const numB = Number(b);

  // Check for invalid inputs


  // Return the difference

}

export function multiply(a, b) {
  // TODO: Same validation as add, then multiply
  const numA = Number(a);
  const numB = Number(b);


}

export function divide(a, b) {
  // TODO: Convert to numbers and validate
  const numA = Number(a);
  const numB = Number(b);

  // TODO: Check for invalid inputs

  // TODO: Check for division by zero

  // Return the quotient
}

export function modulo(a, b) {
  // TODO: Validate inputs and check for division by zero
  const numA = Number(a);
  const numB = Number(b);


}

export function power(base, exponent) {
  // TODO: Validate both inputs
  const numBase = Number(base);
  const numExponent = Number(exponent);


}

export function squareRoot(number) {
  // TODO: Validate input
  const num = Number(number);

  // TODO: Check for invalid input
  // TODO: Check for negative numbers
}

// Test valid inputs
console.log("=== Valid Inputs ===");
console.log("add(10, 5) =", add(10, 5));
console.log("subtract(10, 5) =", subtract(10, 5));
console.log("divide(10, 5) =", divide(10, 5));

// Test invalid inputs (not numbers)
console.log("\n=== Invalid Inputs ===");
console.log('add("hello", 5) =', add("hello", 5));
console.log('multiply(10, "world") =', multiply(10, "world"));
console.log('subtract("abc", "def") =', subtract("abc", "def"));

// Test division by zero
console.log("\n=== Division by Zero ===");
console.log("divide(10, 0) =", divide(10, 0));
console.log("modulo(10, 0) =", modulo(10, 0));

// Test negative square root
console.log("\n=== Negative Square Root ===");
console.log("squareRoot(-16) =", squareRoot(-16));
console.log("squareRoot(16) =", squareRoot(16));
