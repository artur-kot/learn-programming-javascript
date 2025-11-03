import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  fetchWithErrorHandling,
  validateWeatherData,
  fetchWithStatusCheck,
  safeJsonParse,
  getNestedValue,
  fetchWithDefaultValue,
  validateCoordinates,
  handleApiError,
  retryOnError,
  fetchMultipleWithErrorHandling
} from './135-weather-errors.js';

// ============================================================================
// FETCH WITH ERROR HANDLING
// ============================================================================

describe('fetchWithErrorHandling', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns success object on successful fetch', async () => {
    const mockData = { current: { temperature_2m: 20 } };
    global.fetch.mockResolvedValueOnce(
      new Response(JSON.stringify(mockData), { status: 200 })
    );

    const result = await fetchWithErrorHandling('https://api.example.com/data');

    expect(result.error).toBe(false);
    expect(result.data).toBeDefined();
  });

  it('returns error object on network error', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await fetchWithErrorHandling('https://api.example.com/data');

    expect(result.error).toBe(true);
    expect(result.message).toBeDefined();
  });

  it('returns error on parse error', async () => {
    global.fetch.mockResolvedValueOnce(
      new Response('Invalid JSON', { status: 200 })
    );

    const result = await fetchWithErrorHandling('https://api.example.com/data');

    expect(result.error).toBe(true);
  });
});

// ============================================================================
// VALIDATE WEATHER DATA
// ============================================================================

describe('validateWeatherData', () => {
  it('validates correct weather data', () => {
    const data = { current: { temperature_2m: 20 } };
    const result = validateWeatherData(data);

    expect(result.valid).toBe(true);
  });

  it('rejects data without current', () => {
    const data = { temperature_2m: 20 };
    const result = validateWeatherData(data);

    expect(result.valid).toBe(false);
    expect(result.message).toBeDefined();
  });

  it('rejects data without temperature', () => {
    const data = { current: { weather_code: 1 } };
    const result = validateWeatherData(data);

    expect(result.valid).toBe(false);
  });

  it('rejects null data', () => {
    const result = validateWeatherData(null);

    expect(result.valid).toBe(false);
  });
});

// ============================================================================
// FETCH WITH STATUS CHECK
// ============================================================================

describe('fetchWithStatusCheck', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns data on 200 status', async () => {
    const mockData = { current: { temperature_2m: 20 } };
    global.fetch.mockResolvedValueOnce(
      new Response(JSON.stringify(mockData), { status: 200, ok: true })
    );

    const result = await fetchWithStatusCheck('https://api.example.com');

    expect(result).toEqual(mockData);
  });

  it('throws on 404 status', async () => {
    global.fetch.mockResolvedValueOnce(
      new Response('Not Found', { status: 404, ok: false })
    );

    await expect(
      fetchWithStatusCheck('https://api.example.com')
    ).rejects.toThrow();
  });

  it('throws on 500 status', async () => {
    global.fetch.mockResolvedValueOnce(
      new Response('Server Error', { status: 500, ok: false })
    );

    await expect(
      fetchWithStatusCheck('https://api.example.com')
    ).rejects.toThrow();
  });
});

// ============================================================================
// SAFE JSON PARSE
// ============================================================================

describe('safeJsonParse', () => {
  it('parses valid JSON', () => {
    const result = safeJsonParse('{"name": "John"}');

    expect(result).toEqual({ name: 'John' });
  });

  it('returns null on invalid JSON', () => {
    const result = safeJsonParse('not json');

    expect(result).toBeNull();
  });

  it('parses arrays', () => {
    const result = safeJsonParse('[1, 2, 3]');

    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([1, 2, 3]);
  });

  it('parses nested objects', () => {
    const result = safeJsonParse('{"a": {"b": "c"}}');

    expect(result.a.b).toBe('c');
  });

  it('returns null for empty string', () => {
    const result = safeJsonParse('');

    expect(result).toBeNull();
  });
});

// ============================================================================
// GET NESTED VALUE
// ============================================================================

describe('getNestedValue', () => {
  const obj = {
    current: {
      temperature_2m: 20,
      weather_code: 1
    },
    latitude: 40.7128
  };

  it('gets top-level property', () => {
    const result = getNestedValue(obj, 'latitude');

    expect(result).toBe(40.7128);
  });

  it('gets nested property', () => {
    const result = getNestedValue(obj, 'current.temperature_2m');

    expect(result).toBe(20);
  });

  it('returns undefined for missing property', () => {
    const result = getNestedValue(obj, 'missing');

    expect(result).toBeUndefined();
  });

  it('returns undefined for missing nested path', () => {
    const result = getNestedValue(obj, 'current.missing.value');

    expect(result).toBeUndefined();
  });

  it('handles deep paths', () => {
    const deep = { a: { b: { c: { d: 'value' } } } };
    const result = getNestedValue(deep, 'a.b.c.d');

    expect(result).toBe('value');
  });
});

// ============================================================================
// FETCH WITH DEFAULT VALUE
// ============================================================================

describe('fetchWithDefaultValue', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns fetched data on success', async () => {
    const mockData = { temperature: 20 };
    global.fetch.mockResolvedValueOnce(
      new Response(JSON.stringify(mockData), { status: 200 })
    );

    const result = await fetchWithDefaultValue(
      'https://api.example.com',
      { temperature: 0 }
    );

    expect(result).toEqual(mockData);
  });

  it('returns default value on fetch error', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    const defaultData = { temperature: 0 };
    const result = await fetchWithDefaultValue(
      'https://api.example.com',
      defaultData
    );

    expect(result).toEqual(defaultData);
  });

  it('returns default value on parse error', async () => {
    global.fetch.mockResolvedValueOnce(
      new Response('Invalid', { status: 200 })
    );

    const defaultData = { temperature: 0 };
    const result = await fetchWithDefaultValue(
      'https://api.example.com',
      defaultData
    );

    expect(result).toEqual(defaultData);
  });
});

// ============================================================================
// VALIDATE COORDINATES
// ============================================================================

describe('validateCoordinates', () => {
  it('validates correct coordinates', () => {
    const result = validateCoordinates(40.7128, -74.0060);

    expect(result.valid).toBe(true);
  });

  it('rejects invalid latitude (too high)', () => {
    const result = validateCoordinates(95, 0);

    expect(result.valid).toBe(false);
  });

  it('rejects invalid latitude (too low)', () => {
    const result = validateCoordinates(-95, 0);

    expect(result.valid).toBe(false);
  });

  it('rejects invalid longitude (too high)', () => {
    const result = validateCoordinates(0, 190);

    expect(result.valid).toBe(false);
  });

  it('rejects invalid longitude (too low)', () => {
    const result = validateCoordinates(0, -190);

    expect(result.valid).toBe(false);
  });

  it('accepts boundary values', () => {
    expect(validateCoordinates(90, 180).valid).toBe(true);
    expect(validateCoordinates(-90, -180).valid).toBe(true);
  });
});

// ============================================================================
// HANDLE API ERROR
// ============================================================================

describe('handleApiError', () => {
  it('handles network error', () => {
    const error = new Error('fetch failed');
    const message = handleApiError(error);

    expect(typeof message).toBe('string');
    expect(message.length).toBeGreaterThan(0);
  });

  it('handles HTTP error', () => {
    const error = new Error('HTTP 404: Not Found');
    const message = handleApiError(error);

    expect(message).toBeDefined();
  });

  it('handles parse error', () => {
    const error = new SyntaxError('Unexpected token');
    const message = handleApiError(error);

    expect(message).toBeDefined();
  });

  it('returns string message', () => {
    const error = new Error('Some error');
    const message = handleApiError(error);

    expect(typeof message).toBe('string');
  });
});

// ============================================================================
// RETRY ON ERROR
// ============================================================================

describe('retryOnError', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns data on first success', async () => {
    const mockData = { temperature: 20 };
    global.fetch.mockResolvedValueOnce(
      new Response(JSON.stringify(mockData), { status: 200 })
    );

    const result = await retryOnError('https://api.example.com');

    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('retries on network error', async () => {
    const mockData = { temperature: 20 };
    global.fetch
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce(
        new Response(JSON.stringify(mockData), { status: 200 })
      );

    const result = await retryOnError('https://api.example.com', 3);

    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('gives up after max attempts', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'));

    await expect(
      retryOnError('https://api.example.com', 2)
    ).rejects.toThrow();

    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});

// ============================================================================
// FETCH MULTIPLE WITH ERROR HANDLING
// ============================================================================

describe('fetchMultipleWithErrorHandling', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('handles multiple successful fetches', async () => {
    global.fetch
      .mockResolvedValueOnce(new Response(JSON.stringify({ id: 1 })))
      .mockResolvedValueOnce(new Response(JSON.stringify({ id: 2 })));

    const results = await fetchMultipleWithErrorHandling([
      'url1',
      'url2'
    ]);

    expect(results).toHaveLength(2);
    expect(results[0].success).toBe(true);
    expect(results[1].success).toBe(true);
  });

  it('handles individual failures', async () => {
    global.fetch
      .mockResolvedValueOnce(new Response(JSON.stringify({ id: 1 })))
      .mockRejectedValueOnce(new Error('Network error'));

    const results = await fetchMultipleWithErrorHandling([
      'url1',
      'url2'
    ]);

    expect(results[0].success).toBe(true);
    expect(results[1].success).toBe(false);
    expect(results[1].error).toBeDefined();
  });

  it('includes data in successful results', async () => {
    const mockData = { temperature: 20 };
    global.fetch.mockResolvedValueOnce(
      new Response(JSON.stringify(mockData))
    );

    const results = await fetchMultipleWithErrorHandling(['url1']);

    expect(results[0].data).toEqual(mockData);
  });
});
