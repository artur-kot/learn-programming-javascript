// Calculator functions from previous exercises (with input conversion)

export function add(a, b) {
  return Number(a) + Number(b);
}

export function subtract(a, b) {
  return Number(a) - Number(b);
}

export function multiply(a, b) {
  return Number(a) * Number(b);
}

export function divide(a, b) {
  return Number(a) / Number(b);
}

export function power(base, exponent) {
  return Number(base) ** Number(exponent);
}

export function squareRoot(number) {
  return Math.sqrt(Number(number));
}

// New display formatting functions!

export function formatCurrency(amount) {
  // TODO: Format a number as currency with 2 decimal places
}

export function formatPercentage(decimal) {
  // TODO: Convert a decimal to percentage with 1 decimal place
}

export function formatDistance(meters) {
  // TODO: Format distance with appropriate units
  // If distance is large, show kilometers; otherwise show meters
}

export function formatCalculation(operation, num1, num2, result) {
  // TODO: Create a formatted string showing the full calculation
  // Convert operation name to appropriate symbol and format result
}

// Test the formatting functions
console.log("=== Currency Formatting ===");
console.log(formatCurrency(19.5));
console.log(formatCurrency(1234.567));
console.log(formatCurrency(0.5));

console.log("\n=== Percentage Formatting ===");
console.log(formatPercentage(0.156));
console.log(formatPercentage(0.5));
console.log(formatPercentage(1.25));

console.log("\n=== Distance Formatting ===");
console.log(formatDistance(500));
console.log(formatDistance(1500));
console.log(formatDistance(2750));

console.log("\n=== Calculation Formatting ===");
console.log(formatCalculation("add", 10, 5.5, add(10, 5.5)));
console.log(formatCalculation("multiply", 7, 3, multiply(7, 3)));
console.log(formatCalculation("divide", 10, 3, divide(10, 3)));
