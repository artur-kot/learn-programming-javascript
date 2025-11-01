# Exercise 142: Weather Dashboard - Multiple Cities

Master **Promise.all()** and data aggregation. Fetch weather for multiple cities simultaneously and perform comparative analysis.

## Overview

Once you can fetch single data sources, the next step is handling multiple concurrent requests efficiently. This exercise teaches you parallel fetching and data aggregation patterns.

### What You'll Learn

- **Promise.all()**: Wait for multiple promises concurrently
- **Parallel execution**: Fetch multiple URLs simultaneously
- **Data aggregation**: Combine results from multiple sources
- **Comparative analysis**: Find extremes, calculate statistics
- **Array methods**: map, filter, reduce, sort, find
- **Performance**: Optimize with concurrent requests

## Key Concepts

### Promise.all() Basics

```javascript
// Array of promises
const promises = [
  fetch(url1),
  fetch(url2),
  fetch(url3)
];

// Wait for all to resolve
const results = await Promise.all(promises);
// If ANY rejects, entire Promise.all rejects
```

### Parallel Fetching

```javascript
const cities = [
  { name: 'NYC', lat: 40.7128, lon: -74.0060 },
  { name: 'London', lat: 51.5074, lon: -0.1278 }
];

// Create fetch promises
const fetchPromises = cities.map(city =>
  fetch(`https://api.example.com/weather?lat=${city.lat}&lon=${city.lon}`)
    .then(r => r.json())
);

// Wait for all in parallel
const results = await Promise.all(fetchPromises);
```

### Map to Extract Data

```javascript
const urls = ['url1', 'url2', 'url3'];

// Create fetch for each URL
const promises = urls.map(url => fetch(url).then(r => r.json()));

// All happen in parallel
const data = await Promise.all(promises);
```

### Finding Extremes

```javascript
// Find maximum
const hottest = cities.reduce((max, city) =>
  city.temperature > max.temperature ? city : max
);

// Find minimum
const coldest = cities.reduce((min, city) =>
  city.temperature < min.temperature ? city : min
);

// Or simpler
const hottest = cities.sort((a, b) => b.temperature - a.temperature)[0];
```

### Calculating Averages

```javascript
const average = cities.reduce((sum, city) =>
  sum + city.temperature, 0
) / cities.length;
```

### Sorting

```javascript
// Sort descending by temperature
const sorted = cities.sort((a, b) =>
  b.temperature - a.temperature
);

// Sort ascending
const sorted = cities.sort((a, b) =>
  a.temperature - b.temperature
);
```

### Grouping Data

```javascript
// Group by weather code
const grouped = cities.reduce((acc, city) => {
  const code = city.weather_code;
  if (!acc[code]) acc[code] = [];
  acc[code].push(city);
  return acc;
}, {});

// { '0': [...], '1': [...], '2': [...] }
```

### Promise.allSettled()

For partial failures:

```javascript
const results = await Promise.allSettled(
  cities.map(city => fetchWeather(city))
);

// Each result: { status: 'fulfilled'/'rejected', value/reason }
results.forEach(result => {
  if (result.status === 'fulfilled') {
    console.log(result.value);
  } else {
    console.log('Error:', result.reason);
  }
});
```

## Exercise Tasks

### Task 1: Find Hottest City

Implement `findHottestCity`:
- Input: Array of { name, temperature, ... }
- Output: { name, temperature }

```javascript
const hottest = findHottestCity(cities);
// { name: 'Dubai', temperature: 35 }
```

### Task 2: Find Coldest City

Implement `findColdestCity`:
- Input: Array of city data
- Output: { name, temperature }

```javascript
const coldest = findColdestCity(cities);
// { name: 'Tokyo', temperature: 8 }
```

### Task 3: Calculate Average

Implement `calculateAverageTemperature`:
- Input: Array of city data
- Output: Average temperature number

```javascript
const avg = calculateAverageTemperature(cities);
// 15.2
```

### Task 4: Compare Two Cities

Implement `compareTemperatures`:
- Input: Two city objects
- Output: { hotter, difference }

```javascript
const result = compareTemperatures(city1, city2);
// { hotter: 'Dubai', difference: 13 }
```

### Task 5: Sort by Temperature

Implement `sortCitiesByTemperature`:
- Input: Array of cities
- Output: Sorted array (highest first)

```javascript
const sorted = sortCitiesByTemperature(cities);
// [Dubai, NYC, Sydney, London, Tokyo]
```

### Task 6: Group by Weather

Implement `groupByWeatherCondition`:
- Input: Array of cities with weather_code
- Output: Object with codes as keys

```javascript
const grouped = groupByWeatherCondition(cities);
// { '0': [Tokyo, Dubai], '1': [NYC, Sydney], '2': [London] }
```

### Task 7: Create Table

Implement `createComparisonTable`:
- Input: Array of city data
- Output: HTML table string

```javascript
const html = createComparisonTable(cities);
// <table><tr><th>City</th>...</tr>...
```

### Task 8: Fetch Multiple Cities

Implement `fetchMultipleCities`:
- Input: Array of { name, latitude, longitude }
- Use Promise.all() for parallel fetch
- Return: Array of { name, temperature, weather_code }

```javascript
const cities = [
  { name: 'NYC', latitude: 40.7128, longitude: -74.0060 },
  { name: 'London', latitude: 51.5074, longitude: -0.1278 }
];
const weather = await fetchMultipleCities(cities);
```

### Task 9: Fetch with Error Handling

Implement `fetchCitiesRobust`:
- Use Promise.allSettled() instead of Promise.all()
- Handle individual failures
- Return array with results and errors

```javascript
const results = await fetchCitiesRobust(cities);
// [{ name, temperature }, { name, error }]
```

### Task 10: Build Comparison Object

Implement `buildWeatherComparisonObject`:
- Input: Array of city weather data
- Output: { hottest, coldest, average, sorted }

```javascript
const comparison = buildWeatherComparisonObject(cities);
// {
//   hottest: { name: 'Dubai', temperature: 35 },
//   coldest: { name: 'Tokyo', temperature: 8 },
//   average: 15.2,
//   sorted: [...]
// }
```

## Real-World Examples

### Dashboard with Parallel Fetches

```javascript
async function loadWeatherDashboard(cities) {
  // Fetch all in parallel
  const cityWeather = await Promise.all(
    cities.map(city =>
      fetch(`/api/weather?lat=${city.lat}&lon=${city.lon}`)
        .then(r => r.json())
    )
  );

  // Build comparison
  const comparison = buildWeatherComparisonObject(cityWeather);

  // Display
  renderDashboard(comparison);
}
```

### Resilient Multi-Fetch

```javascript
async function fetchWithFallback(cities) {
  const results = await Promise.allSettled(
    cities.map(city => fetchWeather(city))
  );

  return results
    .map((r, i) => ({
      city: cities[i].name,
      data: r.status === 'fulfilled' ? r.value : null,
      error: r.status === 'rejected' ? r.reason : null
    }))
    .filter(r => r.data !== null); // Keep successes
}
```

### Comparison Analysis

```javascript
async function analyzeWeather(cityNames) {
  // Fetch all data
  const cities = await fetchMultipleCities(cityNames);

  // Analyze
  const hottest = findHottestCity(cities);
  const coldest = findColdestCity(cities);
  const average = calculateAverageTemperature(cities);

  // Display
  console.log(`Hottest: ${hottest.name} (${hottest.temperature}°C)`);
  console.log(`Coldest: ${coldest.name} (${coldest.temperature}°C)`);
  console.log(`Average: ${average.toFixed(1)}°C`);
}
```

## Best Practices

### 1. Use Promise.all() for Independent Requests

```javascript
// ✓ GOOD - Parallel execution
const results = await Promise.all(
  cities.map(city => fetchWeather(city))
);

// ❌ SLOW - Sequential execution
const results = [];
for (const city of cities) {
  results.push(await fetchWeather(city));
}
```

### 2. Handle Partial Failures Gracefully

```javascript
// ✓ GOOD - Continue with successes
const results = await Promise.allSettled(
  cities.map(city => fetchWeather(city))
);

// ❌ FAILS COMPLETELY - All-or-nothing
const results = await Promise.all(
  cities.map(city => fetchWeather(city))
);
```

### 3. Aggregate Before Rendering

```javascript
// ✓ GOOD - Process data first
const weather = await fetchMultipleCities(cities);
const comparison = buildWeatherComparisonObject(weather);
renderDashboard(comparison);

// ❌ SCATTERED - Process as you render
cities.forEach(async (city) => {
  const data = await fetchWeather(city);
  renderCard(data);
});
```

### 4. Use Reduce for Statistics

```javascript
// ✓ GOOD - Elegant and efficient
const max = cities.reduce((current, city) =>
  city.temperature > current.temperature ? city : current
);

// ❌ CREATES TEMP ARRAYS - Less efficient
const sorted = cities.sort((a, b) => b.temperature - a.temperature);
const max = sorted[0];
```

## Common Mistakes

```javascript
// ❌ WRONG - Not awaiting Promise.all
Promise.all(promises).then(results => {...});
// Continue immediately!

// ✓ RIGHT - Await properly
const results = await Promise.all(promises);
// Continue after all resolve

// ❌ WRONG - Promise.all with failures stops everything
try {
  const results = await Promise.all(promises);
} catch (error) {
  // All-or-nothing failure!
}

// ✓ RIGHT - Use allSettled for partial failures
const results = await Promise.allSettled(promises);
results.forEach(r => {
  if (r.status === 'fulfilled') {...}
  else {...}
});
```

## Summary

Promise patterns for multiple operations:

✅ Use `Promise.all()` for multiple concurrent requests
✅ Use `.map()` to create array of promises
✅ Use `.reduce()` for aggregation (sum, max, min)
✅ Use `.sort()` for ordering
✅ Use `.filter()` for conditional data
✅ Use `Promise.allSettled()` for partial failures
✅ Fetch in parallel, not sequentially
✅ Aggregate data before rendering
✅ Handle errors gracefully
✅ Optimize performance with concurrency

**Congratulations!** You've completed Series 28: Weather Dashboard. You now understand:
- Fetch API for HTTP requests
- JSON parsing and data extraction
- Error handling for reliability
- DOM rendering for display
- Promise.all() for concurrent operations

These are fundamental skills for building real-world web applications!
