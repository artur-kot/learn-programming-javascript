export function celsiusToFahrenheit(celsius) {
  // Convert Celsius to Fahrenheit using the standard formula
  // We explicitly return a Number so tests can compare numeric values
  return (celsius * 9) / 5 + 32;
}

// Example demonstration
console.log(celsiusToFahrenheit(0));   // 32
console.log(celsiusToFahrenheit(100)); // 212
