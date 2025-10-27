import { strict as assert } from 'node:assert';
import test from 'node:test';
import * as ex from './057-playlist-duplicates.js';

test('057 - Playlist Duplicates', async (t) => {
  // Setup: Create a fresh playlist with some duplicates
  ex.addSong('Imagine', 'John Lennon');
  ex.addSong('A Day in the Life', 'The Beatles');
  ex.addSong('Imagine', 'John Lennon');
  ex.addSong('While My Guitar Gently Weeps', 'The Beatles');

  await t.test('hasDuplicateTitles returns boolean', () => {
    const result = ex.hasDuplicateTitles();
    assert.strictEqual(typeof result, 'boolean');
  });

  await t.test('hasDuplicateTitles returns true when duplicates exist', () => {
    const result = ex.hasDuplicateTitles();
    assert.strictEqual(result, true);
  });

  await t.test('hasDuplicateTitles returns false when no duplicates', () => {
    // Clear and add unique songs
    ex.getSongs().length = 0;
    ex.addSong('Bohemian Rhapsody', 'Queen');
    ex.addSong('Stairway to Heaven', 'Led Zeppelin');
    
    const result = ex.hasDuplicateTitles();
    assert.strictEqual(result, false);
  });

  await t.test('checkDuplicateByTitle returns boolean', () => {
    // Reset playlist with duplicates
    ex.getSongs().length = 0;
    ex.addSong('Imagine', 'John Lennon');
    ex.addSong('A Day in the Life', 'The Beatles');
    ex.addSong('Imagine', 'John Lennon');
    
    const result = ex.checkDuplicateByTitle('Imagine');
    assert.strictEqual(typeof result, 'boolean');
  });

  await t.test('checkDuplicateByTitle returns true for duplicate title', () => {
    const result = ex.checkDuplicateByTitle('Imagine');
    assert.strictEqual(result, true);
  });

  await t.test('checkDuplicateByTitle returns false for unique title', () => {
    const result = ex.checkDuplicateByTitle('A Day in the Life');
    assert.strictEqual(result, false);
  });

  await t.test('checkDuplicateByTitle returns false for non-existent title', () => {
    const result = ex.checkDuplicateByTitle('Bohemian Rhapsody');
    assert.strictEqual(result, false);
  });

  await t.test('checkDuplicateByTitle is case-sensitive', () => {
    const result = ex.checkDuplicateByTitle('imagine');
    assert.strictEqual(result, false);
  });

  await t.test('hasDuplicateTitles detects multiple duplicates', () => {
    ex.getSongs().length = 0;
    ex.addSong('Song A', 'Artist A');
    ex.addSong('Song B', 'Artist B');
    ex.addSong('Song A', 'Artist A');
    ex.addSong('Song B', 'Artist B');
    
    const result = ex.hasDuplicateTitles();
    assert.strictEqual(result, true);
  });
});
