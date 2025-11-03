import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  fetchFromAllSourcesParallel,
  fetchFromAllSourcesSequential,
  fetchWithTimeout,
  fetchUntilSuccess,
  createMultiSourceAPI
} from './095-quote-all.js';

test('Quote Fetcher - Promise.all', async (t) => {

  await t.test('fetchFromAllSourcesParallel returns a promise', () => {
    const result = fetchFromAllSourcesParallel(10);
    assert.ok(result instanceof Promise);
  });

  await t.test('fetchFromAllSourcesParallel resolves with array', async () => {
    const quotes = await fetchFromAllSourcesParallel(10);
    assert.ok(Array.isArray(quotes));
  });

  await t.test('fetchFromAllSourcesParallel returns 3 quotes', async () => {
    const quotes = await fetchFromAllSourcesParallel(10);
    assert.equal(quotes.length, 3);
  });

  await t.test('fetchFromAllSourcesParallel quotes have properties', async () => {
    const quotes = await fetchFromAllSourcesParallel(10);
    quotes.forEach(quote => {
      assert.ok(quote.text);
      assert.ok(quote.author);
    });
  });

  await t.test('fetchFromAllSourcesSequential returns array', async () => {
    const quotes = await fetchFromAllSourcesSequential(10);
    assert.ok(Array.isArray(quotes));
  });

  await t.test('fetchFromAllSourcesSequential returns 3 quotes', async () => {
    const quotes = await fetchFromAllSourcesSequential(10);
    assert.equal(quotes.length, 3);
  });

  await t.test('fetchFromAllSourcesSequential quotes are valid', async () => {
    const quotes = await fetchFromAllSourcesSequential(10);
    quotes.forEach(quote => {
      assert.ok(quote.text);
      assert.ok(quote.author);
    });
  });

  await t.test('fetchWithTimeout returns a promise', () => {
    const result = fetchWithTimeout(10, 500);
    assert.ok(result instanceof Promise);
  });

  await t.test('fetchWithTimeout handles successful fetch', async () => {
    const result = await fetchWithTimeout(10, 500);
    assert.ok(result);
  });

  await t.test('fetchUntilSuccess returns array', async () => {
    const quotes = await fetchUntilSuccess(10, 2);
    assert.ok(Array.isArray(quotes));
  });

  await t.test('fetchUntilSuccess returns quotes', async () => {
    const quotes = await fetchUntilSuccess(10, 2);
    quotes.forEach(quote => {
      assert.ok(quote.text);
    });
  });

  await t.test('createMultiSourceAPI returns object', () => {
    const api = createMultiSourceAPI(10);
    assert.ok(typeof api === 'object');
  });

  await t.test('createMultiSourceAPI has getParallel method', () => {
    const api = createMultiSourceAPI(10);
    assert.ok(typeof api.getParallel === 'function');
  });

  await t.test('createMultiSourceAPI getParallel returns promise', () => {
    const api = createMultiSourceAPI(10);
    const result = api.getParallel();
    assert.ok(result instanceof Promise);
  });

  await t.test('createMultiSourceAPI getParallel resolves with array', async () => {
    const api = createMultiSourceAPI(10);
    const quotes = await api.getParallel();
    assert.ok(Array.isArray(quotes));
  });

});
