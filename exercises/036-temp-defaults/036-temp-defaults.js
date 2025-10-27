export function celsiusToFahrenheit(celsius) {
  // TODO: Convert Celsius to Fahrenheit with a default parameter
  // Default value represents a common room temperature (20°C)
  return (celsius * 9) / 5 + 32;
}

// Example usage
console.log(celsiusToFahrenheit()); // Expected: 68 (if implemented)
console.log(celsiusToFahrenheit(0)); // Expected: 32
