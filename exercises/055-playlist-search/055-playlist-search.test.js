import { strict as assert } from 'node:assert';
import test from 'node:test';
import * as ex from './055-playlist-search.js';

test('055 - Playlist Search', async (t) => {
  // Setup: Create a fresh playlist for testing
  ex.addSong('Bohemian Rhapsody', 'Queen');
  ex.addSong('Another One Bites the Dust', 'Queen');
  ex.addSong('Imagine', 'John Lennon');
  ex.addSong('A Day in the Life', 'The Beatles');
  ex.addSong('While My Guitar Gently Weeps', 'The Beatles');

  await t.test('searchByTitle returns array', () => {
    const results = ex.searchByTitle('One');
    assert(Array.isArray(results), 'searchByTitle should return an array');
  });

  await t.test('searchByTitle finds songs with matching title', () => {
    const results = ex.searchByTitle('Bohemian');
    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].title, 'Bohemian Rhapsody');
  });

  await t.test('searchByTitle is case-insensitive', () => {
    const results = ex.searchByTitle('imagine');
    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].title, 'Imagine');
  });

  await t.test('searchByTitle returns multiple matches', () => {
    const results = ex.searchByTitle('the');
    assert(results.length >= 2, 'Should find multiple songs with "the"');
  });

  await t.test('searchByTitle returns empty array for no matches', () => {
    const results = ex.searchByTitle('Metallica');
    assert.strictEqual(results.length, 0);
  });

  await t.test('searchByArtist returns array', () => {
    const results = ex.searchByArtist('Queen');
    assert(Array.isArray(results), 'searchByArtist should return an array');
  });

  await t.test('searchByArtist finds songs by artist', () => {
    const results = ex.searchByArtist('Queen');
    assert.strictEqual(results.length, 2);
    assert(results.every(s => s.artist === 'Queen'));
  });

  await t.test('searchByArtist is case-insensitive', () => {
    const results = ex.searchByArtist('queen');
    assert.strictEqual(results.length, 2);
  });

  await t.test('searchByArtist handles partial matches', () => {
    const results = ex.searchByArtist('Beatles');
    assert.strictEqual(results.length, 2);
  });

  await t.test('searchByArtist returns empty array for no matches', () => {
    const results = ex.searchByArtist('Pink Floyd');
    assert.strictEqual(results.length, 0);
  });
});
