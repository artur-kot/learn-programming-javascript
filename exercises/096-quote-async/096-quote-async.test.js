import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  getQuoteAsync,
  getQuoteWithErrorAsync,
  getMultipleQuotesAsync,
  fetchAndTransformAsync,
  createAsyncAPI
} from './096-quote-async.js';

test('Quote Fetcher - Async/Await', async (t) => {

  await t.test('getQuoteAsync returns a promise', () => {
    const result = getQuoteAsync(10);
    assert.ok(result instanceof Promise);
  });

  await t.test('getQuoteAsync resolves with quote', async () => {
    const quote = await getQuoteAsync(10);
    assert.ok(quote.text);
    assert.ok(quote.author);
  });

  await t.test('getQuoteWithErrorAsync returns a promise', () => {
    const result = getQuoteWithErrorAsync(false, 10);
    assert.ok(result instanceof Promise);
  });

  await t.test('getQuoteWithErrorAsync resolves on success', async () => {
    const quote = await getQuoteWithErrorAsync(false, 10);
    assert.ok(quote.text);
    assert.ok(quote.author);
  });

  await t.test('getQuoteWithErrorAsync handles errors with try/catch', async () => {
    const result = await getQuoteWithErrorAsync(true, 10);
    assert.ok(result !== null);
  });

  await t.test('getMultipleQuotesAsync returns a promise', () => {
    const result = getMultipleQuotesAsync(2, 10);
    assert.ok(result instanceof Promise);
  });

  await t.test('getMultipleQuotesAsync resolves with array', async () => {
    const quotes = await getMultipleQuotesAsync(3, 10);
    assert.ok(Array.isArray(quotes));
  });

  await t.test('getMultipleQuotesAsync returns correct count', async () => {
    const quotes = await getMultipleQuotesAsync(3, 10);
    assert.equal(quotes.length, 3);
  });

  await t.test('getMultipleQuotesAsync quotes have proper structure', async () => {
    const quotes = await getMultipleQuotesAsync(2, 10);
    quotes.forEach(quote => {
      assert.ok(quote.text);
      assert.ok(quote.author);
    });
  });

  await t.test('fetchAndTransformAsync returns a promise', () => {
    const result = fetchAndTransformAsync(10);
    assert.ok(result instanceof Promise);
  });

  await t.test('fetchAndTransformAsync resolves with object', async () => {
    const result = await fetchAndTransformAsync(10);
    assert.ok(typeof result === 'object');
  });

  await t.test('fetchAndTransformAsync transforms data', async () => {
    const result = await fetchAndTransformAsync(10);
    assert.ok(result.text);
    assert.ok(result.displayText || result.formatted);
  });

  await t.test('createAsyncAPI returns object', () => {
    const api = createAsyncAPI(10);
    assert.ok(typeof api === 'object');
  });

  await t.test('createAsyncAPI has getQuote method', () => {
    const api = createAsyncAPI(10);
    assert.ok(typeof api.getQuote === 'function');
  });

  await t.test('createAsyncAPI getQuote is async', async () => {
    const api = createAsyncAPI(10);
    const result = api.getQuote();
    assert.ok(result instanceof Promise);
  });

  await t.test('createAsyncAPI getQuote resolves with quote', async () => {
    const api = createAsyncAPI(10);
    const quote = await api.getQuote();
    assert.ok(quote.text);
  });

});
