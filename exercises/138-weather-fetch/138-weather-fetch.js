/**
 * Exercise 138: Weather Dashboard - Basic Fetch API
 *
 * Learn the Fetch API by making HTTP requests to weather services.
 * Understand how to fetch remote data and handle responses.
 */

// TODO: Implement the following Fetch functions

/**
 * fetchWeatherData
 * Make a GET request to fetch weather data for a city.
 * URL format: https://api.open-meteo.com/v1/forecast?latitude=LATITUDE&longitude=LONGITUDE&current=temperature_2m,weather_code
 * 
 * Return: Promise that resolves to response object
 */
export function fetchWeatherData(latitude, longitude) {
  // TODO: Implement basic fetch GET request
}

/**
 * fetchWithHeaders
 * Make fetch request with custom headers.
 * Add 'Content-Type': 'application/json' header to request.
 * 
 * Return: Promise with response
 */
export function fetchWithHeaders(url) {
  // TODO: Implement fetch with custom headers
}

/**
 * fetchMultipleUrls
 * Fetch data from multiple URLs in parallel using Promise.all()
 * 
 * URLs parameter: Array of URL strings
 * Return: Promise that resolves to array of responses
 */
export function fetchMultipleUrls(urls) {
  // TODO: Implement parallel fetching with Promise.all
}

/**
 * fetchWithTimeout
 * Fetch with timeout - if request takes longer than timeoutMs, reject.
 * 
 * Return: Promise that rejects if timeout exceeded
 */
export function fetchWithTimeout(url, timeoutMs = 5000) {
  // TODO: Implement fetch with timeout using Promise.race
}

/**
 * fetchAndRetry
 * Attempt to fetch, and retry up to 3 times if it fails.
 * 
 * Return: Promise that resolves after successful fetch or rejects after 3 failures
 */
export function fetchAndRetry(url, maxRetries = 3) {
  // TODO: Implement fetch with retry logic
}

/**
 * fetchJsonData
 * Fetch and parse JSON response.
 * Make fetch request and call .json() on response.
 * 
 * Return: Promise that resolves to parsed JSON object
 */
export function fetchJsonData(url) {
  // TODO: Implement fetch and json parsing
}

/**
 * fetchTextData
 * Fetch and parse as text.
 * Make fetch request and call .text() on response.
 * 
 * Return: Promise that resolves to text string
 */
export function fetchTextData(url) {
  // TODO: Implement fetch and text parsing
}

/**
 * fetchWithStatus
 * Check response.ok before parsing.
 * If not ok (status 4xx or 5xx), throw error with status code.
 * 
 * Return: Promise with data or rejected with error
 */
export function fetchWithStatus(url) {
  // TODO: Implement fetch with status checking
}

/**
 * fetchAbortable
 * Return object with fetch promise and abort function.
 * { promise, abort }
 * 
 * Allow canceling mid-flight request using AbortController
 */
export function fetchAbortable(url) {
  // TODO: Implement fetchable request with abort capability
}

/**
 * fetchWeatherMultipleCities
 * Fetch weather for multiple cities in parallel.
 * Cities parameter: Array of { name, latitude, longitude }
 * 
 * Return: Promise resolving to array of weather data objects
 */
export function fetchWeatherMultipleCities(cities) {
  // TODO: Implement fetching multiple weather endpoints
}
