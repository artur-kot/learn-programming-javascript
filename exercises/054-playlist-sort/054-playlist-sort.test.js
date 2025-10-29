import { strict as assert } from 'node:assert';
import test from 'node:test';
import * as ex from './054-playlist-sort.js';

test('054 - Playlist Sort', async (t) => {
  // Setup: Create a fresh playlist for testing
  ex.addSong('Bohemian Rhapsody', 'Queen');
  ex.addSong('Imagine', 'John Lennon');
  ex.addSong('A Day in the Life', 'The Beatles');
  ex.addSong('Stairway to Heaven', 'Led Zeppelin');

  await t.test('sortByTitle returns array', () => {
    const sorted = ex.sortByTitle();
    assert(Array.isArray(sorted), 'sortByTitle should return an array');
  });

  await t.test('sortByTitle sorts alphabetically by title', () => {
    const sorted = ex.sortByTitle();
    assert.strictEqual(sorted[0].title, 'A Day in the Life');
    assert.strictEqual(sorted[1].title, 'Bohemian Rhapsody');
    assert.strictEqual(sorted[2].title, 'Imagine');
    assert.strictEqual(sorted[3].title, 'Stairway to Heaven');
  });

  await t.test('sortByTitle does not modify original playlist', () => {
    const originalSongs = ex.getSongs();
    const originalLength = originalSongs.length;
    ex.sortByTitle();
    const currentSongs = ex.getSongs();
    assert.strictEqual(currentSongs.length, originalLength);
    assert.strictEqual(currentSongs[0].title, 'Bohemian Rhapsody');
  });

  await t.test('shufflePlaylist returns array with same length', () => {
    const shuffled = ex.shufflePlaylist();
    assert(Array.isArray(shuffled), 'shufflePlaylist should return an array');
    assert.strictEqual(shuffled.length, ex.getSongCount());
  });

  await t.test('shufflePlaylist contains all original songs', () => {
    const shuffled = ex.shufflePlaylist();
    const original = ex.getSongs();
    
    // Check each original song exists in shuffled array
    for (const song of original) {
      const found = shuffled.some(s => s.title === song.title && s.artist === song.artist);
      assert(found, `Song "${song.title}" should exist in shuffled playlist`);
    }
  });

  await t.test('shufflePlaylist does not modify original playlist', () => {
    const original = [...ex.getSongs()];
    ex.shufflePlaylist();
    const current = ex.getSongs();
    
    for (let i = 0; i < original.length; i++) {
      assert.strictEqual(current[i].title, original[i].title);
      assert.strictEqual(current[i].artist, original[i].artist);
    }
  });
});
