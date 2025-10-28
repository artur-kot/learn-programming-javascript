/**
 * Exercise 142: Weather Dashboard - Multiple Cities
 *
 * Fetch weather data for multiple cities in parallel.
 * Learn Promise.all() and data aggregation patterns.
 */

// TODO: Implement the following functions

/**
 * fetchMultipleCities
 * Given array of city objects with latitude/longitude,
 * fetch weather for all cities in parallel using Promise.all()
 * 
 * Input cities: [{ name, latitude, longitude }, ...]
 * Return: Promise with array of { name, temperature, weather_code }
 */
export function fetchMultipleCities(cities) {
  // TODO: Implement parallel fetch with Promise.all
}

/**
 * findHottestCity
 * From array of city weather data, find the one with highest temperature.
 * 
 * Return: { name, temperature }
 */
export function findHottestCity(citiesWeather) {
  // TODO: Find city with max temperature
}

/**
 * findColdestCity
 * From array of city weather data, find the one with lowest temperature.
 * 
 * Return: { name, temperature }
 */
export function findColdestCity(citiesWeather) {
  // TODO: Find city with min temperature
}

/**
 * calculateAverageTemperature
 * Get average temperature across all cities.
 * 
 * Return: Average temperature number
 */
export function calculateAverageTemperature(citiesWeather) {
  // TODO: Calculate mean temperature
}

/**
 * compareTemperatures
 * Compare temperatures between two cities.
 * Return object showing which is hotter and by how much.
 * 
 * Return: { hotter, difference }
 */
export function compareTemperatures(city1, city2) {
  // TODO: Compare two cities
}

/**
 * sortCitiesByTemperature
 * Sort array of city weather data by temperature (highest first).
 * 
 * Return: Sorted array
 */
export function sortCitiesByTemperature(citiesWeather) {
  // TODO: Sort descending by temperature
}

/**
 * groupByWeatherCondition
 * Group cities by weather code (same code grouped together).
 * Return object with weather codes as keys.
 * 
 * Return: { code: [cities...], ... }
 */
export function groupByWeatherCondition(citiesWeather) {
  // TODO: Group cities by weather_code
}

/**
 * createComparisonTable
 * Build HTML table comparing multiple cities.
 * Columns: City, Temperature, Condition, Latitude, Longitude
 * 
 * Return: HTML string
 */
export function createComparisonTable(citiesWeather) {
  // TODO: Generate HTML table
}

/**
 * fetchCitiesRobust
 * Fetch multiple cities with error handling.
 * Return array with { name, temperature, error } for each.
 * Include errors instead of failing entirely.
 * 
 * Return: Promise with results array
 */
export function fetchCitiesRobust(cities) {
  // TODO: Implement Promise.allSettled for partial failures
}

/**
 * buildWeatherComparisonObject
 * Create detailed comparison object with stats and rankings.
 * Include: hottest, coldest, average, sorted list.
 * 
 * Return: { hottest, coldest, average, sorted }
 */
export function buildWeatherComparisonObject(citiesWeather) {
  // TODO: Build comprehensive comparison object
}
