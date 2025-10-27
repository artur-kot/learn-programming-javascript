import { test } from 'node:test';
import assert from 'node:assert';
import { addScore, scoreToLetter, mapScoresToLetters } from './049-gradebook-map.js';

test('scoreToLetter converts 90-100 to A', () => {
  assert.strictEqual(scoreToLetter(95), 'A');
  assert.strictEqual(scoreToLetter(90), 'A');
  assert.strictEqual(scoreToLetter(100), 'A');
});

test('scoreToLetter converts 80-89 to B', () => {
  assert.strictEqual(scoreToLetter(85), 'B');
  assert.strictEqual(scoreToLetter(80), 'B');
  assert.strictEqual(scoreToLetter(89), 'B');
});

test('scoreToLetter converts 70-79 to C', () => {
  assert.strictEqual(scoreToLetter(75), 'C');
  assert.strictEqual(scoreToLetter(70), 'C');
  assert.strictEqual(scoreToLetter(79), 'C');
});

test('scoreToLetter converts 60-69 to D', () => {
  assert.strictEqual(scoreToLetter(65), 'D');
  assert.strictEqual(scoreToLetter(60), 'D');
  assert.strictEqual(scoreToLetter(69), 'D');
});

test('scoreToLetter converts below 60 to F', () => {
  assert.strictEqual(scoreToLetter(59), 'F');
  assert.strictEqual(scoreToLetter(50), 'F');
  assert.strictEqual(scoreToLetter(0), 'F');
});

test('mapScoresToLetters converts all scores using map', () => {
  addScore(95);
  addScore(80);
  addScore(75);
  
  const letters = mapScoresToLetters();
  assert.deepStrictEqual(letters, ['A', 'B', 'C']);
});

test('mapScoresToLetters returns new array', () => {
  addScore(88);
  addScore(92);
  
  const letters = mapScoresToLetters();
  assert.ok(Array.isArray(letters));
  assert.strictEqual(letters.length, 2);
});

test('mapScoresToLetters with various grades', () => {
  addScore(100);
  addScore(85);
  addScore(70);
  addScore(65);
  addScore(55);
  
  const letters = mapScoresToLetters();
  assert.deepStrictEqual(letters, ['A', 'B', 'C', 'D', 'F']);
});