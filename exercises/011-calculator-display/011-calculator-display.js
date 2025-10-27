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
  // Hint: Use .toFixed(2) to round to 2 decimal places
  // Example: formatCurrency(19.5) should return "$19.50"
}

export function formatPercentage(decimal) {
  // TODO: Convert a decimal to percentage with 1 decimal place
  // Hint: Multiply by 100, then use .toFixed(1)
  // Example: formatPercentage(0.156) should return "15.6%"
}

export function formatDistance(meters) {
  // TODO: Format distance with units
  // If meters >= 1000, convert to kilometers with 2 decimals
  // Otherwise, show meters with 0 decimals
  // Hint: Use if-else and toFixed()
  // Example: formatDistance(1500) returns "1.50 km"
  //          formatDistance(750) returns "750 m"
}

export function formatCalculation(operation, num1, num2, result) {
  // TODO: Create a formatted string showing the full calculation
  // Format the result to 2 decimal places
  // Example: formatCalculation("add", 10, 5.5, 15.5)
  //          should return "10 + 5.5 = 15.50"
  // Hint: Use template literals and toFixed(2)
  // Operations: "add" (+), "subtract" (-), "multiply" (×), "divide" (÷)
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
