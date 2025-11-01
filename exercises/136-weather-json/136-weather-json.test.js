import { describe, it, expect } from 'vitest';
import {
  extractTemperature,
  extractWeatherInfo,
  parseCoordinates,
  formatWeatherDisplay,
  extractMultipleCities,
  getProperty,
  flattenWeatherData,
  selectFields,
  renameFields,
  parseWeatherArray
} from './136-weather-json.js';

// Sample data for testing
const sampleWeatherData = {
  current: {
    temperature_2m: 20.5,
    weather_code: 1,
    time: '2024-01-15T12:00'
  },
  latitude: 40.7128,
  longitude: -74.0060,
  elevation: 10
};

// ============================================================================
// EXTRACT TEMPERATURE
// ============================================================================

describe('extractTemperature', () => {
  it('extracts temperature from nested object', () => {
    const temp = extractTemperature(sampleWeatherData);
    expect(temp).toBe(20.5);
  });

  it('handles different temperature values', () => {
    const data = { current: { temperature_2m: -5.2 } };
    expect(extractTemperature(data)).toBe(-5.2);
  });

  it('returns undefined for missing temperature', () => {
    const data = { current: {} };
    const result = extractTemperature(data);
    expect(result === undefined || result === null).toBe(true);
  });
});

// ============================================================================
// EXTRACT WEATHER INFO
// ============================================================================

describe('extractWeatherInfo', () => {
  it('extracts multiple weather fields', () => {
    const info = extractWeatherInfo(sampleWeatherData);
    
    expect(info).toHaveProperty('temperature');
    expect(info).toHaveProperty('weatherCode');
    expect(info).toHaveProperty('time');
  });

  it('has correct values', () => {
    const info = extractWeatherInfo(sampleWeatherData);
    
    expect(info.temperature).toBe(20.5);
    expect(info.weatherCode).toBe(1);
    expect(info.time).toContain('2024');
  });

  it('returns object with all three properties', () => {
    const info = extractWeatherInfo(sampleWeatherData);
    const keys = Object.keys(info);
    
    expect(keys.length).toBe(3);
  });
});

// ============================================================================
// PARSE COORDINATES
// ============================================================================

describe('parseCoordinates', () => {
  it('extracts coordinates with renamed keys', () => {
    const coords = parseCoordinates(sampleWeatherData);
    
    expect(coords).toHaveProperty('lat');
    expect(coords).toHaveProperty('lon');
  });

  it('has correct coordinate values', () => {
    const coords = parseCoordinates(sampleWeatherData);
    
    expect(coords.lat).toBe(40.7128);
    expect(coords.lon).toBe(-74.0060);
  });

  it('works with different coordinates', () => {
    const data = { latitude: 51.5074, longitude: -0.1278 };
    const coords = parseCoordinates(data);
    
    expect(coords.lat).toBe(51.5074);
    expect(coords.lon).toBe(-0.1278);
  });
});

// ============================================================================
// FORMAT WEATHER DISPLAY
// ============================================================================

describe('formatWeatherDisplay', () => {
  it('returns formatted string with temperature', () => {
    const display = formatWeatherDisplay(sampleWeatherData);
    
    expect(typeof display).toBe('string');
    expect(display).toContain('20.5');
  });

  it('includes degree symbol or C', () => {
    const display = formatWeatherDisplay(sampleWeatherData);
    
    expect(display).toMatch(/°C|C/);
  });

  it('handles negative temperatures', () => {
    const data = { current: { temperature_2m: -5 } };
    const display = formatWeatherDisplay(data);
    
    expect(display).toContain('-5');
  });
});

// ============================================================================
// EXTRACT MULTIPLE CITIES
// ============================================================================

describe('extractMultipleCities', () => {
  const citiesData = [
    { name: 'New York', current: { temperature_2m: 20 } },
    { name: 'London', current: { temperature_2m: 15 } },
    { name: 'Tokyo', current: { temperature_2m: 8 } }
  ];

  it('extracts data from array of cities', () => {
    const result = extractMultipleCities(citiesData);
    
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);
  });

  it('each item has city and temperature', () => {
    const result = extractMultipleCities(citiesData);
    
    result.forEach(item => {
      expect(item).toHaveProperty('city');
      expect(item).toHaveProperty('temperature');
    });
  });

  it('has correct values', () => {
    const result = extractMultipleCities(citiesData);
    
    expect(result[0].city).toBe('New York');
    expect(result[0].temperature).toBe(20);
    expect(result[1].city).toBe('London');
    expect(result[1].temperature).toBe(15);
  });

  it('handles empty array', () => {
    const result = extractMultipleCities([]);
    expect(result).toEqual([]);
  });
});

// ============================================================================
// GET PROPERTY
// ============================================================================

describe('getProperty', () => {
  it('gets top-level property', () => {
    const value = getProperty(sampleWeatherData, 'elevation');
    expect(value).toBe(10);
  });

  it('gets nested property with dot notation', () => {
    const value = getProperty(sampleWeatherData, 'current.temperature_2m');
    expect(value).toBe(20.5);
  });

  it('returns undefined for missing property', () => {
    const value = getProperty(sampleWeatherData, 'missing');
    expect(value === undefined).toBe(true);
  });

  it('handles multiple nesting levels', () => {
    const data = { a: { b: { c: { d: 'value' } } } };
    const value = getProperty(data, 'a.b.c.d');
    expect(value).toBe('value');
  });

  it('returns undefined for missing nested path', () => {
    const value = getProperty(sampleWeatherData, 'current.missing.value');
    expect(value === undefined).toBe(true);
  });
});

// ============================================================================
// FLATTEN WEATHER DATA
// ============================================================================

describe('flattenWeatherData', () => {
  it('flattens nested object', () => {
    const data = { current: { temp: 20, code: 0, time: '12:00' } };
    const result = flattenWeatherData(data);
    
    expect(result).toHaveProperty('temp');
    expect(result).toHaveProperty('code');
    expect(result).toHaveProperty('time');
  });

  it('removes nesting level', () => {
    const data = { current: { temp: 20 } };
    const result = flattenWeatherData(data);
    
    expect(result.temp).toBe(20);
    expect(result.current).toBeUndefined();
  });

  it('handles deep weather data', () => {
    const result = flattenWeatherData(sampleWeatherData);
    
    expect(result).toHaveProperty('temperature_2m');
    expect(result).toHaveProperty('weather_code');
  });
});

// ============================================================================
// SELECT FIELDS
// ============================================================================

describe('selectFields', () => {
  it('selects specified fields', () => {
    const data = { a: 1, b: 2, c: 3, d: 4 };
    const result = selectFields(data, ['a', 'c']);
    
    expect(result).toHaveProperty('a');
    expect(result).toHaveProperty('c');
  });

  it('excludes non-selected fields', () => {
    const data = { a: 1, b: 2, c: 3 };
    const result = selectFields(data, ['a', 'c']);
    
    expect(result).not.toHaveProperty('b');
  });

  it('preserves values', () => {
    const data = { name: 'John', age: 30, city: 'NYC' };
    const result = selectFields(data, ['name', 'age']);
    
    expect(result.name).toBe('John');
    expect(result.age).toBe(30);
  });

  it('handles empty fields array', () => {
    const data = { a: 1, b: 2 };
    const result = selectFields(data, []);
    
    expect(Object.keys(result).length).toBe(0);
  });
});

// ============================================================================
// RENAME FIELDS
// ============================================================================

describe('renameFields', () => {
  it('renames fields according to mapping', () => {
    const data = { old_name: 'John', old_age: 30 };
    const mapping = { old_name: 'name', old_age: 'age' };
    const result = renameFields(data, mapping);
    
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('age');
  });

  it('removes old field names', () => {
    const data = { old_name: 'John' };
    const mapping = { old_name: 'name' };
    const result = renameFields(data, mapping);
    
    expect(result).not.toHaveProperty('old_name');
  });

  it('preserves values during rename', () => {
    const data = { temperature_2m: 20, weather_code: 1 };
    const mapping = { temperature_2m: 'temp', weather_code: 'code' };
    const result = renameFields(data, mapping);
    
    expect(result.temp).toBe(20);
    expect(result.code).toBe(1);
  });

  it('keeps unmapped fields', () => {
    const data = { a: 1, b: 2, c: 3 };
    const mapping = { a: 'alpha' };
    const result = renameFields(data, mapping);
    
    expect(result.alpha).toBe(1);
    expect(result.b).toBe(2);
    expect(result.c).toBe(3);
  });
});

// ============================================================================
// PARSE WEATHER ARRAY
// ============================================================================

describe('parseWeatherArray', () => {
  const weatherArray = [
    {
      temperature: 20,
      humidity: 65,
      wind_speed: 10
    },
    {
      temperature: 15,
      humidity: 70,
      wind_speed: 8
    }
  ];

  it('parses array of weather items', () => {
    const result = parseWeatherArray(weatherArray);
    
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
  });

  it('transforms field names to camelCase', () => {
    const result = parseWeatherArray(weatherArray);
    
    result.forEach(item => {
      expect(item).toHaveProperty('temperature');
      expect(item).toHaveProperty('humidity');
      expect(item).toHaveProperty('windSpeed');
    });
  });

  it('removes underscore format', () => {
    const result = parseWeatherArray(weatherArray);
    
    result.forEach(item => {
      expect(item).not.toHaveProperty('wind_speed');
    });
  });

  it('preserves values', () => {
    const result = parseWeatherArray(weatherArray);
    
    expect(result[0].temperature).toBe(20);
    expect(result[0].humidity).toBe(65);
    expect(result[0].windSpeed).toBe(10);
  });

  it('handles empty array', () => {
    const result = parseWeatherArray([]);
    expect(result).toEqual([]);
  });
});
