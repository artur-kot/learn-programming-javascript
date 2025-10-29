import { test } from 'node:test';
import assert from 'node:assert';
import { addScore, getScores, getScoreCount } from './048-gradebook-store.js';

test('addScore adds a score to the array', () => {
  addScore(85);
  assert.deepStrictEqual(getScores(), [85]);
});

test('addScore adds multiple scores', () => {
  addScore(90);
  addScore(75);
  assert.strictEqual(getScoreCount(), 2);
});

test('getScores returns array of all scores', () => {
  addScore(88);
  addScore(92);
  addScore(80);
  const scores = getScores();
  assert.ok(Array.isArray(scores));
  assert.strictEqual(scores.length, 3);
});

test('getScoreCount returns correct count', () => {
  addScore(95);
  addScore(87);
  assert.strictEqual(getScoreCount(), 2);
});

test('getScores returns scores in order added', () => {
  addScore(100);
  addScore(85);
  addScore(70);
  assert.deepStrictEqual(getScores(), [100, 85, 70]);
});