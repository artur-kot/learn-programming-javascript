import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  mockQuoteAPI,
  fetchQuoteByAuthor,
  fetchRandomQuote,
  mockQuoteWithError,
  createQuoteAPI
} from './091-quote-promise.js';

test('Quote Fetcher - Simulate API', async (t) => {

  await t.test('mockQuoteAPI returns a promise', () => {
    const result = mockQuoteAPI(10);
    assert.ok(result instanceof Promise);
  });

  await t.test('mockQuoteAPI resolves with a quote object', async () => {
    const quote = await mockQuoteAPI(10);
    assert.ok(quote.text);
    assert.ok(quote.author);
  });

  await t.test('mockQuoteAPI quote has required properties', async () => {
    const quote = await mockQuoteAPI(10);
    assert.ok(typeof quote.text === 'string');
    assert.ok(typeof quote.author === 'string');
    assert.ok(quote.id !== undefined);
  });

  await t.test('mockQuoteAPI respects delay', async () => {
    const start = Date.now();
    await mockQuoteAPI(50);
    const elapsed = Date.now() - start;
    assert.ok(elapsed >= 40);
  });

  await t.test('mockQuoteAPI returns different quotes', async () => {
    const quote1 = await mockQuoteAPI(10);
    const quote2 = await mockQuoteAPI(10);
    // Just verify both have valid structure (may be same randomly)
    assert.ok(quote1.text);
    assert.ok(quote2.text);
  });

  await t.test('fetchQuoteByAuthor returns a promise', () => {
    const result = fetchQuoteByAuthor('Steve Jobs', 10);
    assert.ok(result instanceof Promise);
  });

  await t.test('fetchQuoteByAuthor resolves with matching author', async () => {
    const quote = await fetchQuoteByAuthor('Steve Jobs', 10);
    assert.ok(quote.text);
    assert.equal(quote.author, 'Steve Jobs');
  });

  await t.test('fetchQuoteByAuthor works with different authors', async () => {
    const quote = await fetchQuoteByAuthor('John Lennon', 10);
    assert.equal(quote.author, 'John Lennon');
  });

  await t.test('fetchRandomQuote returns a promise', () => {
    const result = fetchRandomQuote(10);
    assert.ok(result instanceof Promise);
  });

  await t.test('fetchRandomQuote resolves with a quote', async () => {
    const quote = await fetchRandomQuote(10);
    assert.ok(quote.text);
    assert.ok(quote.author);
  });

  await t.test('mockQuoteWithError returns a promise', () => {
    const result = mockQuoteWithError(false, 10);
    assert.ok(result instanceof Promise);
  });

  await t.test('mockQuoteWithError resolves when shouldFail is false', async () => {
    const quote = await mockQuoteWithError(false, 10);
    assert.ok(quote.text);
  });

  await t.test('mockQuoteWithError rejects when shouldFail is true', async () => {
    let errorThrown = false;
    try {
      await mockQuoteWithError(true, 10);
    } catch (error) {
      errorThrown = true;
      assert.ok(error.message);
    }
    assert.ok(errorThrown);
  });

  await t.test('createQuoteAPI returns object with methods', () => {
    const api = createQuoteAPI(10);
    assert.ok(typeof api.getRandomQuote === 'function');
  });

  await t.test('createQuoteAPI has getRandom method', () => {
    const api = createQuoteAPI(10);
    assert.ok(typeof api.getRandom === 'function' || typeof api.getRandomQuote === 'function');
  });

  await t.test('createQuoteAPI getRandomQuote returns promise', () => {
    const api = createQuoteAPI(10);
    const result = api.getRandomQuote ? api.getRandomQuote() : api.getRandom?.();
    assert.ok(result instanceof Promise);
  });

  await t.test('createQuoteAPI getRandomQuote resolves with quote', async () => {
    const api = createQuoteAPI(10);
    const quote = api.getRandomQuote ? await api.getRandomQuote() : await api.getRandom();
    assert.ok(quote.text);
  });

});
