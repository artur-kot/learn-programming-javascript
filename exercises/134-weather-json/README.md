# Exercise 139: Weather Dashboard - JSON Parsing

Master **JSON parsing and data extraction** from API responses. Learn to navigate nested objects and transform data into usable formats.

## Overview

After fetching data with the Fetch API, you need to extract and transform it. This exercise teaches you to work with JSON responses effectively.

### What You'll Learn

- **JSON parsing**: Converting strings to JavaScript objects
- **Destructuring**: Extracting values from objects
- **Nested access**: Navigating deep object structures
- **Data transformation**: Reshaping API responses
- **Optional chaining**: Safe property access
- **Array transformations**: Working with multiple items

## Key Concepts

### JSON Parsing

JavaScript automatically parses JSON when using `response.json()`:

```javascript
// Fetch returns Response
const response = await fetch(url);

// .json() parses and returns parsed object
const data = await response.json();

// Now you can access properties
console.log(data.current.temperature_2m);
```

### Accessing Nested Properties

Navigate nested objects using dot notation:

```javascript
const data = {
  current: {
    temperature_2m: 20.5,
    weather_code: 1,
    time: '2024-01-15T12:00'
  }
};

// Access nested value
const temp = data.current.temperature_2m; // 20.5
```

### Destructuring

Extract values cleanly using destructuring syntax:

```javascript
// Object destructuring
const { current } = data;
const { temperature_2m, weather_code } = current;

// Nested destructuring
const { current: { temperature_2m } } = data;

// Renaming while destructuring
const { temperature_2m: temp } = data.current;
```

### Optional Chaining

Safely access properties that might not exist:

```javascript
// Without optional chaining - throws if current is missing
const temp = data.current.temperature_2m; // Error!

// With optional chaining - returns undefined safely
const temp = data?.current?.temperature_2m; // undefined instead of error
```

### Flattening Nested Objects

Convert nested structures to flat ones:

```javascript
const nested = {
  current: {
    temperature_2m: 20,
    weather_code: 1
  }
};

// Flatten by spreading
const flat = { ...nested.current };
// { temperature_2m: 20, weather_code: 1 }
```

### Renaming Fields

Transform field names from API format to app format:

```javascript
const apiData = {
  temperature_2m: 20,
  weather_code: 1,
  wind_speed: 10
};

// Rename to camelCase
const formatted = {
  temperature: apiData.temperature_2m,
  weather: apiData.weather_code,
  windSpeed: apiData.wind_speed
};
```

### Array Transformations

Transform arrays of data:

```javascript
const cities = [
  { name: 'NYC', current: { temperature_2m: 20 } },
  { name: 'London', current: { temperature_2m: 15 } }
];

// Extract specific fields
const simplified = cities.map(city => ({
  city: city.name,
  temperature: city.current.temperature_2m
}));
// [{ city: 'NYC', temperature: 20 }, { city: 'London', temperature: 15 }]
```

## Exercise Tasks

### Task 1: Extract Temperature

Extract temperature from nested response object:

```javascript
const data = { current: { temperature_2m: 20 } };
const temp = extractTemperature(data); // 20
```

### Task 2: Extract Multiple Fields

Use destructuring to extract temperature, weather code, and time:

```javascript
const info = extractWeatherInfo(data);
// { temperature: 20, weatherCode: 1, time: '...' }
```

### Task 3: Parse Coordinates

Extract and rename latitude/longitude:

```javascript
const coords = parseCoordinates(data);
// { lat: 40.7128, lon: -74.0060 }
```

### Task 4: Format for Display

Transform data into readable string format:

```javascript
const display = formatWeatherDisplay(data);
// "Temperature: 20.5°C"
```

### Task 5: Extract Multiple Cities

Transform array of city data:

```javascript
const cities = [...]; // Array of city objects
const result = extractMultipleCities(cities);
// [{ city: 'NYC', temperature: 20 }, ...]
```

### Task 6: Get Property by Path

Navigate objects using string paths:

```javascript
const value = getProperty(data, 'current.temperature_2m');
// 20.5
```

### Task 7: Flatten Nested Objects

Remove one level of nesting:

```javascript
const data = { current: { temp: 20, code: 1 } };
const flat = flattenWeatherData(data);
// { temp: 20, code: 1 }
```

### Task 8: Select Fields

Create new object with only selected properties:

```javascript
const data = { a: 1, b: 2, c: 3 };
const result = selectFields(data, ['a', 'c']);
// { a: 1, c: 3 }
```

### Task 9: Rename Fields

Transform field names:

```javascript
const data = { temperature_2m: 20 };
const result = renameFields(data, { temperature_2m: 'temp' });
// { temp: 20 }
```

### Task 10: Parse Weather Array

Transform and rename fields in array:

```javascript
const array = [{ temperature: 20, wind_speed: 10 }];
const result = parseWeatherArray(array);
// [{ temperature: 20, windSpeed: 10 }]
```

## Real-World Examples

### Weather Display Component

```javascript
async function displayWeather(latitude, longitude) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
  );
  
  const data = await response.json();
  
  // Extract what we need
  const { temperature_2m: temp } = data.current;
  
  // Format for display
  document.querySelector('.temperature').textContent = `${temp}°C`;
}
```

### Multiple Cities Comparison

```javascript
async function compareWeather(cities) {
  // Fetch all in parallel
  const responses = await Promise.all(
    cities.map(city =>
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m`)
    )
  );
  
  // Parse all responses
  const allData = await Promise.all(responses.map(r => r.json()));
  
  // Extract temperatures
  return cities.map((city, index) => ({
    city: city.name,
    temperature: allData[index].current.temperature_2m
  }));
}
```

### Data Transformation Pipeline

```javascript
function transformWeatherData(apiResponse) {
  const { current, latitude, longitude } = apiResponse;
  
  return {
    temperature: current.temperature_2m,
    condition: current.weather_code,
    timestamp: current.time,
    location: {
      latitude,
      longitude
    }
  };
}
```

## Best Practices

### 1. Always Check for Undefined

```javascript
// ✓ GOOD - Check before using
const temp = data?.current?.temperature_2m;
if (temp !== undefined) {
  console.log(temp);
}

// ❌ WRONG - Can throw if missing
const temp = data.current.temperature_2m; // Error if current missing!
```

### 2. Use Destructuring for Clarity

```javascript
// ✓ GOOD - Clear what's being extracted
const { current: { temperature_2m, weather_code } } = data;

// ❌ HARD TO READ
const temp = data.current.temperature_2m;
const code = data.current.weather_code;
```

### 3. Create Intermediate Objects

```javascript
// ✓ GOOD - Easier to maintain and test
const extracted = {
  temperature: data.current.temperature_2m,
  weather: data.current.weather_code,
  time: data.current.time
};

// ❌ HARDER - Less reusable
displayTemp(data.current.temperature_2m);
displayWeather(data.current.weather_code);
```

### 4. Validate Data Structure

```javascript
// ✓ GOOD - Handle missing data
function extractTemp(data) {
  return data?.current?.temperature_2m ?? 'N/A';
}

// ❌ FRAGILE - Crashes on bad data
function extractTemp(data) {
  return data.current.temperature_2m;
}
```

## Common Mistakes

```javascript
// ❌ WRONG - Forgot to call .json()
const data = await fetch(url);
console.log(data.current); // undefined - data is Response object!

// ✓ RIGHT - Parse response
const data = await fetch(url).then(r => r.json());
console.log(data.current); // Works!

// ❌ WRONG - Accessing missing nested level
const temp = data.current.temperature; // undefined
console.log(temp.value); // Error!

// ✓ RIGHT - Check with optional chaining
const temp = data?.current?.temperature?.value;

// ❌ WRONG - Mutating original object
data.current.temperature_2m = data.current.temperature_2m * 2;

// ✓ RIGHT - Create new object
const transformed = {
  ...data,
  current: {
    ...data.current,
    temperature_2m: data.current.temperature_2m * 2
  }
};
```

## Summary

Key takeaways:

✅ Use `response.json()` to parse responses
✅ Navigate nested objects with dot notation
✅ Use destructuring for clean code
✅ Apply optional chaining for safety
✅ Transform arrays with `.map()`
✅ Validate data exists before using
✅ Create intermediate objects for clarity
✅ Separate extraction from display logic

Next exercise: You'll learn **error handling** for robust applications!
