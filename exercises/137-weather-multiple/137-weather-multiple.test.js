import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  fetchMultipleCities,
  findHottestCity,
  findColdestCity,
  calculateAverageTemperature,
  compareTemperatures,
  sortCitiesByTemperature,
  groupByWeatherCondition,
  createComparisonTable,
  fetchCitiesRobust,
  buildWeatherComparisonObject
} from './137-weather-multiple.js';

const sampleCitiesWeather = [
  { name: 'New York', temperature: 20, weather_code: 1 },
  { name: 'London', temperature: 15, weather_code: 2 },
  { name: 'Tokyo', temperature: 8, weather_code: 0 }
];

// ============================================================================
// FIND HOTTEST CITY
// ============================================================================

describe('findHottestCity', () => {
  it('finds city with highest temperature', () => {
    const result = findHottestCity(sampleCitiesWeather);

    expect(result.name).toBe('New York');
    expect(result.temperature).toBe(20);
  });

  it('returns object with name and temperature', () => {
    const result = findHottestCity(sampleCitiesWeather);

    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('temperature');
  });

  it('handles single city', () => {
    const data = [{ name: 'NYC', temperature: 20, weather_code: 1 }];
    const result = findHottestCity(data);

    expect(result.name).toBe('NYC');
  });
});

// ============================================================================
// FIND COLDEST CITY
// ============================================================================

describe('findColdestCity', () => {
  it('finds city with lowest temperature', () => {
    const result = findColdestCity(sampleCitiesWeather);

    expect(result.name).toBe('Tokyo');
    expect(result.temperature).toBe(8);
  });

  it('returns object with name and temperature', () => {
    const result = findColdestCity(sampleCitiesWeather);

    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('temperature');
  });
});

// ============================================================================
// CALCULATE AVERAGE TEMPERATURE
// ============================================================================

describe('calculateAverageTemperature', () => {
  it('calculates mean temperature', () => {
    const result = calculateAverageTemperature(sampleCitiesWeather);

    // (20 + 15 + 8) / 3 = 43 / 3 = 14.33...
    expect(result).toBeCloseTo(14.33, 1);
  });

  it('returns number', () => {
    const result = calculateAverageTemperature(sampleCitiesWeather);

    expect(typeof result).toBe('number');
  });

  it('handles single city', () => {
    const data = [{ name: 'NYC', temperature: 20, weather_code: 1 }];
    const result = calculateAverageTemperature(data);

    expect(result).toBe(20);
  });
});

// ============================================================================
// COMPARE TEMPERATURES
// ============================================================================

describe('compareTemperatures', () => {
  it('identifies hotter city', () => {
    const city1 = { name: 'New York', temperature: 20 };
    const city2 = { name: 'London', temperature: 15 };

    const result = compareTemperatures(city1, city2);

    expect(result.hotter).toBe('New York');
    expect(result.difference).toBe(5);
  });

  it('returns hotter and difference', () => {
    const city1 = { name: 'City1', temperature: 25 };
    const city2 = { name: 'City2', temperature: 10 };

    const result = compareTemperatures(city1, city2);

    expect(result).toHaveProperty('hotter');
    expect(result).toHaveProperty('difference');
  });

  it('handles equal temperatures', () => {
    const city1 = { name: 'City1', temperature: 20 };
    const city2 = { name: 'City2', temperature: 20 };

    const result = compareTemperatures(city1, city2);

    expect(result.difference).toBe(0);
  });
});

// ============================================================================
// SORT CITIES BY TEMPERATURE
// ============================================================================

describe('sortCitiesByTemperature', () => {
  it('sorts descending by temperature', () => {
    const result = sortCitiesByTemperature(sampleCitiesWeather);

    expect(result[0].temperature).toBe(20);
    expect(result[1].temperature).toBe(15);
    expect(result[2].temperature).toBe(8);
  });

  it('returns array', () => {
    const result = sortCitiesByTemperature(sampleCitiesWeather);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);
  });

  it('preserves city data', () => {
    const result = sortCitiesByTemperature(sampleCitiesWeather);

    expect(result[0].name).toBe('New York');
  });
});

// ============================================================================
// GROUP BY WEATHER CONDITION
// ============================================================================

describe('groupByWeatherCondition', () => {
  it('groups cities by weather code', () => {
    const result = groupByWeatherCondition(sampleCitiesWeather);

    expect(result).toHaveProperty('0');
    expect(result).toHaveProperty('1');
    expect(result).toHaveProperty('2');
  });

  it('groups correctly', () => {
    const result = groupByWeatherCondition(sampleCitiesWeather);

    expect(result['0']).toContainEqual(
      expect.objectContaining({ name: 'Tokyo' })
    );
    expect(result['1']).toContainEqual(
      expect.objectContaining({ name: 'New York' })
    );
  });

  it('returns object', () => {
    const result = groupByWeatherCondition(sampleCitiesWeather);

    expect(typeof result).toBe('object');
  });
});

// ============================================================================
// CREATE COMPARISON TABLE
// ============================================================================

describe('createComparisonTable', () => {
  it('returns HTML string', () => {
    const html = createComparisonTable(sampleCitiesWeather);

    expect(typeof html).toBe('string');
    expect(html).toContain('<');
    expect(html).toContain('>');
  });

  it('contains table tag', () => {
    const html = createComparisonTable(sampleCitiesWeather);

    expect(html).toContain('<table');
  });

  it('contains city names', () => {
    const html = createComparisonTable(sampleCitiesWeather);

    expect(html).toContain('New York');
    expect(html).toContain('London');
    expect(html).toContain('Tokyo');
  });

  it('contains temperatures', () => {
    const html = createComparisonTable(sampleCitiesWeather);

    expect(html).toContain('20');
    expect(html).toContain('15');
    expect(html).toContain('8');
  });
});

// ============================================================================
// FETCH MULTIPLE CITIES
// ============================================================================

describe('fetchMultipleCities', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches multiple cities', async () => {
    global.fetch
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ current: { temperature_2m: 20 } }))
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ current: { temperature_2m: 15 } }))
      );

    const cities = [
      { name: 'NYC', latitude: 40.7128, longitude: -74.0060 },
      { name: 'London', latitude: 51.5074, longitude: -0.1278 }
    ];

    const results = await fetchMultipleCities(cities);

    expect(results).toHaveLength(2);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('fetches in parallel', async () => {
    let callCount = 0;
    global.fetch.mockImplementation(() => {
      callCount++;
      return Promise.resolve(
        new Response(JSON.stringify({ current: { temperature_2m: 20 } }))
      );
    });

    const cities = [
      { name: 'NYC', latitude: 40.7128, longitude: -74.0060 },
      { name: 'London', latitude: 51.5074, longitude: -0.1278 }
    ];

    await fetchMultipleCities(cities);

    expect(callCount).toBe(2);
  });
});

// ============================================================================
// FETCH CITIES ROBUST
// ============================================================================

describe('fetchCitiesRobust', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('includes successful results', async () => {
    global.fetch
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ current: { temperature_2m: 20 } }))
      )
      .mockRejectedValueOnce(new Error('Network error'));

    const cities = [
      { name: 'NYC', latitude: 40.7128, longitude: -74.0060 },
      { name: 'London', latitude: 51.5074, longitude: -0.1278 }
    ];

    const results = await fetchCitiesRobust(cities);

    expect(results).toHaveLength(2);
    expect(results[0]).toHaveProperty('temperature');
    expect(results[1]).toHaveProperty('error');
  });
});

// ============================================================================
// BUILD WEATHER COMPARISON OBJECT
// ============================================================================

describe('buildWeatherComparisonObject', () => {
  it('returns object with stats', () => {
    const result = buildWeatherComparisonObject(sampleCitiesWeather);

    expect(result).toHaveProperty('hottest');
    expect(result).toHaveProperty('coldest');
    expect(result).toHaveProperty('average');
    expect(result).toHaveProperty('sorted');
  });

  it('hottest city is correct', () => {
    const result = buildWeatherComparisonObject(sampleCitiesWeather);

    expect(result.hottest.name).toBe('New York');
    expect(result.hottest.temperature).toBe(20);
  });

  it('coldest city is correct', () => {
    const result = buildWeatherComparisonObject(sampleCitiesWeather);

    expect(result.coldest.name).toBe('Tokyo');
    expect(result.coldest.temperature).toBe(8);
  });

  it('average is correct', () => {
    const result = buildWeatherComparisonObject(sampleCitiesWeather);

    expect(result.average).toBeCloseTo(14.33, 1);
  });

  it('sorted list is in descending order', () => {
    const result = buildWeatherComparisonObject(sampleCitiesWeather);

    expect(result.sorted[0].temperature).toBe(20);
    expect(result.sorted[1].temperature).toBe(15);
    expect(result.sorted[2].temperature).toBe(8);
  });
});
