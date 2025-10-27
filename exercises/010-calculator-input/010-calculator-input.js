// Calculator functions from previous exercises

export function add(a, b) {
  // TODO: Convert a and b to numbers before adding
  // Hint: Use Number() to convert strings to numbers
  // Example: Number("5") becomes 5
  // Then return the sum
}

export function subtract(a, b) {
  // TODO: Convert a and b to numbers before subtracting
  // Then return the difference
}

export function multiply(a, b) {
  // TODO: Convert a and b to numbers before multiplying
  // Then return the product
}

export function divide(a, b) {
  // TODO: Convert a and b to numbers before dividing
  // Then return the quotient
}

export function modulo(a, b) {
  // TODO: Convert a and b to numbers before finding modulo
  // Then return the remainder
}

export function power(base, exponent) {
  // TODO: Convert base and exponent to numbers before calculating power
  // Then return the result
}

export function squareRoot(number) {
  // TODO: Convert number to a number before calculating square root
  // Hint: Use parseFloat() for decimal numbers
  // Then return Math.sqrt() of the number
}

// Test with string inputs (simulating user input from forms)
console.log("=== Testing with String Inputs ===");
console.log('add("10", "5") =', add("10", "5"));
console.log('subtract("10", "5") =', subtract("10", "5"));
console.log('multiply("10", "5") =', multiply("10", "5"));
console.log('divide("10", "5") =', divide("10", "5"));
console.log('modulo("10", "3") =', modulo("10", "3"));
console.log('power("2", "3") =', power("2", "3"));
console.log('squareRoot("16") =', squareRoot("16"));

// Test with mixed inputs
console.log("\n=== Mixed Number and String Inputs ===");
console.log('add(10, "5") =', add(10, "5"));
console.log('multiply("7", 3) =', multiply("7", 3));
