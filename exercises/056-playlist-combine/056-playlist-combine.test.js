import { strict as assert } from 'node:assert';
import test from 'node:test';
import * as ex from './056-playlist-combine.js';

test('056 - Playlist Combine', async (t) => {
  // Setup: Create a fresh playlist for testing
  ex.addSong('Bohemian Rhapsody', 'Queen');
  ex.addSong('Another One Bites the Dust', 'Queen');

  const otherPlaylist = [
    { title: 'Imagine', artist: 'John Lennon' },
    { title: 'A Day in the Life', artist: 'The Beatles' }
  ];

  await t.test('mergePlaylist returns array', () => {
    const merged = ex.mergePlaylist(otherPlaylist);
    assert(Array.isArray(merged), 'mergePlaylist should return an array');
  });

  await t.test('mergePlaylist combines playlists correctly', () => {
    const merged = ex.mergePlaylist(otherPlaylist);
    assert.strictEqual(merged.length, 4);
    assert.strictEqual(merged[0].title, 'Bohemian Rhapsody');
    assert.strictEqual(merged[2].title, 'Imagine');
  });

  await t.test('mergePlaylist does not modify original playlists', () => {
    const originalCount = ex.getSongCount();
    const otherCount = otherPlaylist.length;
    ex.mergePlaylist(otherPlaylist);
    
    assert.strictEqual(ex.getSongCount(), originalCount);
    assert.strictEqual(otherPlaylist.length, otherCount);
  });

  await t.test('combineWithSpread returns array', () => {
    const combined = ex.combineWithSpread(otherPlaylist);
    assert(Array.isArray(combined), 'combineWithSpread should return an array');
  });

  await t.test('combineWithSpread combines playlists correctly', () => {
    const combined = ex.combineWithSpread(otherPlaylist);
    assert.strictEqual(combined.length, 4);
    assert.strictEqual(combined[0].title, 'Bohemian Rhapsody');
    assert.strictEqual(combined[2].title, 'Imagine');
  });

  await t.test('combineWithSpread does not modify original playlists', () => {
    const originalCount = ex.getSongCount();
    const otherCount = otherPlaylist.length;
    ex.combineWithSpread(otherPlaylist);
    
    assert.strictEqual(ex.getSongCount(), originalCount);
    assert.strictEqual(otherPlaylist.length, otherCount);
  });

  await t.test('mergePlaylist and combineWithSpread produce same result', () => {
    const merged = ex.mergePlaylist(otherPlaylist);
    const combined = ex.combineWithSpread(otherPlaylist);
    
    assert.deepStrictEqual(merged, combined);
  });

  await t.test('mergePlaylist handles empty other playlist', () => {
    const merged = ex.mergePlaylist([]);
    assert.strictEqual(merged.length, ex.getSongCount());
  });

  await t.test('combineWithSpread handles empty other playlist', () => {
    const combined = ex.combineWithSpread([]);
    assert.strictEqual(combined.length, ex.getSongCount());
  });
});
