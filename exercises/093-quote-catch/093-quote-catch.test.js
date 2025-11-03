import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  fetchQuoteWithCatch,
  fetchWithRetry,
  fetchMultipleWithErrorHandling,
  fetchAndLog,
  createResiliantAPI
} from './093-quote-catch.js';

test('Quote Fetcher - Error Handling', async (t) => {

  await t.test('fetchQuoteWithCatch returns a promise', () => {
    const result = fetchQuoteWithCatch(false, 10);
    assert.ok(result instanceof Promise);
  });

  await t.test('fetchQuoteWithCatch resolves on success', async () => {
    const quote = await fetchQuoteWithCatch(false, 10);
    assert.ok(quote.text);
    assert.ok(quote.author);
  });

  await t.test('fetchQuoteWithCatch returns default on error', async () => {
    const quote = await fetchQuoteWithCatch(true, 10);
    assert.ok(quote.text);
    assert.ok(quote.author);
  });

  await t.test('fetchWithRetry returns a promise', () => {
    const result = fetchWithRetry(3, 10);
    assert.ok(result instanceof Promise);
  });

  await t.test('fetchWithRetry resolves eventually', async () => {
    const quote = await fetchWithRetry(3, 10);
    assert.ok(quote.text);
  });

  await t.test('fetchMultipleWithErrorHandling returns a promise', () => {
    const result = fetchMultipleWithErrorHandling(2, 10);
    assert.ok(result instanceof Promise);
  });

  await t.test('fetchMultipleWithErrorHandling returns array', async () => {
    const results = await fetchMultipleWithErrorHandling(3, 10);
    assert.ok(Array.isArray(results));
  });

  await t.test('fetchMultipleWithErrorHandling handles errors gracefully', async () => {
    const results = await fetchMultipleWithErrorHandling(3, 10);
    assert.equal(results.length, 3);
  });

  await t.test('fetchMultipleWithErrorHandling includes errors and quotes', async () => {
    const results = await fetchMultipleWithErrorHandling(3, 10);
    results.forEach(item => {
      assert.ok(item !== null && item !== undefined);
    });
  });

  await t.test('fetchAndLog returns a promise', () => {
    const result = fetchAndLog(false, 10);
    assert.ok(result instanceof Promise);
  });

  await t.test('fetchAndLog resolves with quote on success', async () => {
    const quote = await fetchAndLog(false, 10);
    assert.ok(quote.text);
  });

  await t.test('fetchAndLog returns error object on failure', async () => {
    const result = await fetchAndLog(true, 10);
    assert.ok(result.error || result.message || typeof result === 'object');
  });

  await t.test('createResiliantAPI returns object', () => {
    const api = createResiliantAPI(10);
    assert.ok(typeof api === 'object');
  });

  await t.test('createResiliantAPI has getQuote method', () => {
    const api = createResiliantAPI(10);
    assert.ok(typeof api.getQuote === 'function');
  });

  await t.test('createResiliantAPI getQuote returns promise', () => {
    const api = createResiliantAPI(10);
    const result = api.getQuote();
    assert.ok(result instanceof Promise);
  });

  await t.test('createResiliantAPI getQuote handles errors', async () => {
    const api = createResiliantAPI(10);
    const result = await api.getQuote();
    assert.ok(result !== null);
  });

});
