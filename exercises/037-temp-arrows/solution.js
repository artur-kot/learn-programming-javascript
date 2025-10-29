export const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;
export const fahrenheitToCelsius = (fahrenheit) => (fahrenheit - 32) * 5 / 9;

// Demo
console.log(celsiusToFahrenheit(0)); // 32
console.log(fahrenheitToCelsius(32)); // 0
