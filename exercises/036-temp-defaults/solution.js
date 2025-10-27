export function celsiusToFahrenheit(celsius = 25) {
  return (celsius * 9) / 5 + 32;
}

// Demo
console.log(celsiusToFahrenheit()); // 77
console.log(celsiusToFahrenheit(0)); // 32
