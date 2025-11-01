import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  fetchWeatherData,
  fetchWithHeaders,
  fetchMultipleUrls,
  fetchWithTimeout,
  fetchAndRetry,
  fetchJsonData,
  fetchTextData,
  fetchWithStatus,
  fetchAbortable,
  fetchWeatherMultipleCities
} from './135-weather-fetch.js';

// ============================================================================
// BASIC FETCH
// ============================================================================

describe('fetchWeatherData', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('makes GET request to weather API', async () => {
    global.fetch.mockResolvedValueOnce(
      new Response(JSON.stringify({ temperature: 20 }), { status: 200 })
    );

    const result = await fetchWeatherData(40.7128, -74.0060);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('40.7128'),
      expect.any(Object)
    );
    expect(result).toBeDefined();
  });

  it('includes latitude and longitude in request', async () => {
    global.fetch.mockResolvedValueOnce(
      new Response(JSON.stringify({}), { status: 200 })
    );

    await fetchWeatherData(51.5074, -0.1278);

    const call = global.fetch.mock.calls[0][0];
    expect(call).toContain('51.5074');
    expect(call).toContain('-0.1278');
  });

  it('returns response object', async () => {
    const mockResponse = { status: 200, ok: true };
    global.fetch.mockResolvedValueOnce(mockResponse);

    const result = await fetchWeatherData(0, 0);

    expect(result).toEqual(mockResponse);
  });
});

// ============================================================================
// FETCH WITH HEADERS
// ============================================================================

describe('fetchWithHeaders', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('includes custom headers in request', async () => {
    global.fetch.mockResolvedValueOnce(
      new Response(JSON.stringify({}), { status: 200 })
    );

    await fetchWithHeaders('https://api.example.com/data');

    const options = global.fetch.mock.calls[0][1];
    expect(options.headers).toBeDefined();
    expect(options.headers['Content-Type']).toBe('application/json');
  });

  it('returns response object', async () => {
    const mockResponse = { status: 200 };
    global.fetch.mockResolvedValueOnce(mockResponse);

    const result = await fetchWithHeaders('https://api.example.com');

    expect(result).toEqual(mockResponse);
  });
});

// ============================================================================
// FETCH MULTIPLE URLS
// ============================================================================

describe('fetchMultipleUrls', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches all URLs in parallel', async () => {
    global.fetch
      .mockResolvedValueOnce(new Response(JSON.stringify({ id: 1 })))
      .mockResolvedValueOnce(new Response(JSON.stringify({ id: 2 })))
      .mockResolvedValueOnce(new Response(JSON.stringify({ id: 3 })));

    const urls = [
      'https://api.example.com/1',
      'https://api.example.com/2',
      'https://api.example.com/3'
    ];

    const results = await fetchMultipleUrls(urls);

    expect(results).toHaveLength(3);
    expect(global.fetch).toHaveBeenCalledTimes(3);
  });

  it('handles empty URL array', async () => {
    const results = await fetchMultipleUrls([]);

    expect(results).toEqual([]);
  });

  it('returns array of response objects', async () => {
    const resp1 = { status: 200 };
    const resp2 = { status: 200 };

    global.fetch
      .mockResolvedValueOnce(resp1)
      .mockResolvedValueOnce(resp2);

    const results = await fetchMultipleUrls(['url1', 'url2']);

    expect(results).toEqual([resp1, resp2]);
  });
});

// ============================================================================
// FETCH WITH TIMEOUT
// ============================================================================

describe('fetchWithTimeout', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('returns response if fetches within timeout', async () => {
    const mockResponse = { status: 200 };
    global.fetch.mockResolvedValueOnce(mockResponse);

    const promise = fetchWithTimeout('https://api.example.com', 5000);
    vi.advanceTimersByTime(1000);
    const result = await promise;

    expect(result).toEqual(mockResponse);
  });

  it('rejects if fetch exceeds timeout', async () => {
    global.fetch.mockImplementationOnce(
      () => new Promise(resolve => setTimeout(resolve, 10000))
    );

    const promise = fetchWithTimeout('https://api.example.com', 1000);
    vi.advanceTimersByTime(1500);

    await expect(promise).rejects.toThrow();
  });

  it('uses default timeout of 5000ms', async () => {
    global.fetch.mockResolvedValueOnce({ status: 200 });

    const promise = fetchWithTimeout('https://api.example.com');
    vi.advanceTimersByTime(1000);

    await expect(promise).resolves.toBeDefined();
  });
});

// ============================================================================
// FETCH AND RETRY
// ============================================================================

describe('fetchAndRetry', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns on first successful fetch', async () => {
    const mockResponse = { status: 200 };
    global.fetch.mockResolvedValueOnce(mockResponse);

    const result = await fetchAndRetry('https://api.example.com');

    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('retries on failure', async () => {
    const mockResponse = { status: 200 };
    global.fetch
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce(mockResponse);

    const result = await fetchAndRetry('https://api.example.com', 3);

    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('gives up after max retries', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'));

    await expect(
      fetchAndRetry('https://api.example.com', 2)
    ).rejects.toThrow();

    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});

// ============================================================================
// FETCH JSON DATA
// ============================================================================

describe('fetchJsonData', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches and parses JSON', async () => {
    const mockData = { temperature: 20, humidity: 65 };
    global.fetch.mockResolvedValueOnce(
      new Response(JSON.stringify(mockData), { status: 200 })
    );

    const result = await fetchJsonData('https://api.example.com/weather');

    expect(result).toEqual(mockData);
  });

  it('handles JSON arrays', async () => {
    const mockData = [{ id: 1 }, { id: 2 }];
    global.fetch.mockResolvedValueOnce(
      new Response(JSON.stringify(mockData))
    );

    const result = await fetchJsonData('https://api.example.com/list');

    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(mockData);
  });
});

// ============================================================================
// FETCH TEXT DATA
// ============================================================================

describe('fetchTextData', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches and returns text', async () => {
    const mockText = 'This is plain text content';
    global.fetch.mockResolvedValueOnce(
      new Response(mockText, { status: 200 })
    );

    const result = await fetchTextData('https://api.example.com/text');

    expect(typeof result).toBe('string');
    expect(result).toContain('plain text');
  });
});

// ============================================================================
// FETCH WITH STATUS
// ============================================================================

describe('fetchWithStatus', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns data on 200 status', async () => {
    const mockData = { success: true };
    const mockResponse = new Response(JSON.stringify(mockData), {
      status: 200,
      ok: true
    });
    global.fetch.mockResolvedValueOnce(mockResponse);

    const result = await fetchWithStatus('https://api.example.com/data');

    expect(result).toBeDefined();
  });

  it('throws error on 404 status', async () => {
    const mockResponse = new Response('Not Found', {
      status: 404,
      ok: false
    });
    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(
      fetchWithStatus('https://api.example.com/missing')
    ).rejects.toThrow();
  });

  it('throws error on 500 status', async () => {
    const mockResponse = new Response('Server Error', {
      status: 500,
      ok: false
    });
    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(
      fetchWithStatus('https://api.example.com/error')
    ).rejects.toThrow();
  });
});

// ============================================================================
// FETCH ABORTABLE
// ============================================================================

describe('fetchAbortable', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns object with promise and abort', async () => {
    global.fetch.mockResolvedValueOnce({ status: 200 });

    const result = fetchAbortable('https://api.example.com');

    expect(result).toHaveProperty('promise');
    expect(result).toHaveProperty('abort');
    expect(typeof result.abort).toBe('function');
  });

  it('promise resolves when fetch completes', async () => {
    const mockResponse = { status: 200 };
    global.fetch.mockResolvedValueOnce(mockResponse);

    const { promise } = fetchAbortable('https://api.example.com');
    const result = await promise;

    expect(result).toEqual(mockResponse);
  });

  it('abort function cancels the request', async () => {
    global.fetch.mockImplementationOnce(
      () => new Promise(resolve => setTimeout(resolve, 5000))
    );

    const { promise, abort } = fetchAbortable('https://api.example.com');

    setTimeout(() => abort(), 100);

    await expect(promise).rejects.toThrow();
  });
});

// ============================================================================
// FETCH WEATHER MULTIPLE CITIES
// ============================================================================

describe('fetchWeatherMultipleCities', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches weather for multiple cities', async () => {
    global.fetch
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ temperature: 20 }), { status: 200 })
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ temperature: 15 }), { status: 200 })
      );

    const cities = [
      { name: 'New York', latitude: 40.7128, longitude: -74.0060 },
      { name: 'London', latitude: 51.5074, longitude: -0.1278 }
    ];

    const results = await fetchWeatherMultipleCities(cities);

    expect(results).toHaveLength(2);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('returns array of weather data', async () => {
    const nyData = { city: 'New York', temperature: 20 };
    const lonData = { city: 'London', temperature: 15 };

    global.fetch
      .mockResolvedValueOnce(new Response(JSON.stringify(nyData)))
      .mockResolvedValueOnce(new Response(JSON.stringify(lonData)));

    const cities = [
      { name: 'New York', latitude: 40.7128, longitude: -74.0060 },
      { name: 'London', latitude: 51.5074, longitude: -0.1278 }
    ];

    const results = await fetchWeatherMultipleCities(cities);

    expect(results[0]).toEqual(nyData);
    expect(results[1]).toEqual(lonData);
  });

  it('handles empty cities array', async () => {
    const results = await fetchWeatherMultipleCities([]);

    expect(results).toEqual([]);
  });
});
