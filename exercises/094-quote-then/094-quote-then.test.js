import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  mockQuoteAPI,
  fetchAndFormat,
  fetchAndUppercase,
  fetchMultipleQuotes,
  fetchAndEnrich
} from './094-quote-then.js';

test('Quote Fetcher - Handle Success', async (t) => {

  await t.test('fetchAndFormat returns a promise', () => {
    const result = fetchAndFormat(10);
    assert.ok(result instanceof Promise);
  });

  await t.test('fetchAndFormat resolves with formatted string', async () => {
    const result = await fetchAndFormat(10);
    assert.ok(typeof result === 'string');
    assert.ok(result.length > 0);
  });

  await t.test('fetchAndFormat includes quote and author', async () => {
    const result = await fetchAndFormat(10);
    assert.ok(result.includes('-'));
  });

  await t.test('fetchAndUppercase returns a promise', () => {
    const result = fetchAndUppercase(10);
    assert.ok(result instanceof Promise);
  });

  await t.test('fetchAndUppercase resolves with uppercase text', async () => {
    const result = await fetchAndUppercase(10);
    assert.ok(typeof result === 'string');
    assert.equal(result, result.toUpperCase());
  });

  await t.test('fetchAndUppercase returns uppercase quote', async () => {
    const result = await fetchAndUppercase(10);
    assert.ok(result.length > 0);
  });

  await t.test('fetchMultipleQuotes returns a promise', () => {
    const result = fetchMultipleQuotes(2, 10);
    assert.ok(result instanceof Promise);
  });

  await t.test('fetchMultipleQuotes resolves with array', async () => {
    const result = await fetchMultipleQuotes(2, 10);
    assert.ok(Array.isArray(result));
  });

  await t.test('fetchMultipleQuotes returns correct count', async () => {
    const result = await fetchMultipleQuotes(3, 10);
    assert.equal(result.length, 3);
  });

  await t.test('fetchMultipleQuotes contains quote objects', async () => {
    const result = await fetchMultipleQuotes(2, 10);
    result.forEach(quote => {
      assert.ok(quote.text);
      assert.ok(quote.author);
    });
  });

  await t.test('fetchAndEnrich returns a promise', () => {
    const result = fetchAndEnrich(10);
    assert.ok(result instanceof Promise);
  });

  await t.test('fetchAndEnrich resolves with enriched object', async () => {
    const result = await fetchAndEnrich(10);
    assert.ok(typeof result === 'object');
  });

  await t.test('fetchAndEnrich includes original properties', async () => {
    const result = await fetchAndEnrich(10);
    assert.ok(result.text);
    assert.ok(result.author);
  });

  await t.test('fetchAndEnrich adds new properties', async () => {
    const result = await fetchAndEnrich(10);
    const hasNewProperty = Object.keys(result).length > 3;
    assert.ok(hasNewProperty);
  });

});
