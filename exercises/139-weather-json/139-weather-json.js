/**
 * Exercise 139: Weather Dashboard - JSON Parsing
 *
 * Learn to extract and transform data from JSON API responses.
 * Master destructuring and accessing nested properties.
 */

// TODO: Implement the following JSON parsing functions

/**
 * extractTemperature
 * From weather response object, extract the temperature value.
 * Response format: { current: { temperature_2m: 20.5 } }
 * 
 * Return: Temperature number
 */
export function extractTemperature(weatherData) {
  // TODO: Extract temperature from nested object
}

/**
 * extractWeatherInfo
 * Extract multiple fields: temperature, weather_code, time
 * Return object with these three properties.
 * 
 * Return: { temperature, weatherCode, time }
 */
export function extractWeatherInfo(weatherData) {
  // TODO: Extract multiple fields using destructuring
}

/**
 * parseCoordinates
 * From response with latitude and longitude, extract as object.
 * Response: { latitude: 40.7128, longitude: -74.0060 }
 * 
 * Return: { lat, lon }
 */
export function parseCoordinates(response) {
  // TODO: Extract and rename coordinates
}

/**
 * formatWeatherDisplay
 * Transform raw data into display-friendly format:
 * Input: { current: { temperature_2m: 20, weather_code: 0 } }
 * Output: "Temperature: 20°C"
 * 
 * Return: Formatted string with temperature
 */
export function formatWeatherDisplay(weatherData) {
  // TODO: Extract and format for display
}

/**
 * extractMultipleCities
 * From array of city responses, extract city name and temperature.
 * Each item: { name: 'NYC', current: { temperature_2m: 20 } }
 * 
 * Return: Array of { city, temperature }
 */
export function extractMultipleCities(citiesData) {
  // TODO: Extract from array using map
}

/**
 * getProperty
 * Safely access nested property using dot notation string.
 * Path examples: 'current.temperature_2m', 'data.results[0].value'
 * 
 * Return: Property value or undefined
 */
export function getProperty(obj, path) {
  // TODO: Navigate nested properties using path string
}

/**
 * flattenWeatherData
 * Convert nested weather object to flat object:
 * Input: { current: { temp: 20, code: 0, time: '12:00' } }
 * Output: { temp: 20, code: 0, time: '12:00' }
 * 
 * Return: Flattened object
 */
export function flattenWeatherData(weatherData) {
  // TODO: Flatten nested object structure
}

/**
 * selectFields
 * From object, select only specified fields.
 * Fields parameter: Array like ['temperature', 'humidity', 'wind']
 * 
 * Return: New object with only selected fields
 */
export function selectFields(data, fields) {
  // TODO: Create new object with only specified properties
}

/**
 * renameFields
 * Rename object fields according to mapping.
 * Mapping: { 'temperature_2m': 'temp', 'weather_code': 'condition' }
 * 
 * Return: New object with renamed fields
 */
export function renameFields(data, fieldMap) {
  // TODO: Transform object keys
}

/**
 * parseWeatherArray
 * From API array response, extract and transform all items.
 * Each item has temperature, humidity, wind_speed.
 * Transform to lowercase keys: { temperature, humidity, windSpeed }
 * 
 * Return: Array of transformed objects
 */
export function parseWeatherArray(weatherArray) {
  // TODO: Parse array with field transformation
}
