export function fahrenheitToCelsius(fahrenheit) {
  // Convert Fahrenheit to Celsius using the standard formula
  return (fahrenheit - 32) * 5 / 9;
}

// Demo
console.log(fahrenheitToCelsius(32));   // 0
console.log(fahrenheitToCelsius(212));  // 100
