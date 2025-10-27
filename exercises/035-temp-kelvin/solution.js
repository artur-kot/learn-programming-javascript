export function celsiusToKelvin(celsius) {
  return celsius + 273.15;
}

export function kelvinToCelsius(kelvin) {
  return kelvin - 273.15;
}

// Demo
console.log(celsiusToKelvin(0));     // 273.15
console.log(kelvinToCelsius(273.15)); // 0
