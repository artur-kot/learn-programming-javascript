import { test } from 'node:test';
import assert from 'node:assert';
import { addSong, getSongs, getSongCount } from './053-playlist-init.js';

test('addSong adds a song to the playlist', () => {
  addSong('Bohemian Rhapsody', 'Queen');
  const songs = getSongs();
  assert.strictEqual(songs.length, 1);
  assert.strictEqual(songs[0].title, 'Bohemian Rhapsody');
  assert.strictEqual(songs[0].artist, 'Queen');
});

test('addSong adds multiple songs', () => {
  addSong('Imagine', 'John Lennon');
  addSong('Hotel California', 'Eagles');
  
  const songs = getSongs();
  assert.strictEqual(songs.length, 2);
});

test('getSongs returns array of song objects', () => {
  addSong('Stairway to Heaven', 'Led Zeppelin');
  const songs = getSongs();
  
  assert.ok(Array.isArray(songs));
  assert.ok(songs[0].hasOwnProperty('title'));
  assert.ok(songs[0].hasOwnProperty('artist'));
});

test('getSongCount returns correct count', () => {
  addSong('Song 1', 'Artist 1');
  addSong('Song 2', 'Artist 2');
  addSong('Song 3', 'Artist 3');
  
  assert.strictEqual(getSongCount(), 3);
});

test('getSongs maintains song order', () => {
  addSong('First', 'Artist A');
  addSong('Second', 'Artist B');
  addSong('Third', 'Artist C');
  
  const songs = getSongs();
  assert.strictEqual(songs[0].title, 'First');
  assert.strictEqual(songs[1].title, 'Second');
  assert.strictEqual(songs[2].title, 'Third');
});