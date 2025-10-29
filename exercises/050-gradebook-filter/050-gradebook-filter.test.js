import { test } from 'node:test';
import assert from 'node:assert';
import { addScore, getPassingScores, getFailingScores } from './050-gradebook-filter.js';

test('getPassingScores returns only scores >= 70', () => {
  addScore(85);
  addScore(65);
  addScore(75);
  
  const passing = getPassingScores();
  assert.deepStrictEqual(passing, [85, 75]);
});

test('getPassingScores includes boundary score', () => {
  addScore(70);
  addScore(69);
  
  const passing = getPassingScores();
  assert.ok(passing.includes(70));
  assert.ok(!passing.includes(69));
});

test('getPassingScores with custom passing score', () => {
  addScore(85);
  addScore(75);
  addScore(65);
  
  const passing = getPassingScores(80);
  assert.deepStrictEqual(passing, [85]);
});

test('getFailingScores returns only scores < 70', () => {
  addScore(85);
  addScore(65);
  addScore(75);
  
  const failing = getFailingScores();
  assert.deepStrictEqual(failing, [65]);
});

test('getFailingScores with custom passing score', () => {
  addScore(85);
  addScore(75);
  addScore(65);
  
  const failing = getFailingScores(80);
  assert.deepStrictEqual(failing, [75, 65]);
});

test('getPassingScores returns empty array if all fail', () => {
  addScore(50);
  addScore(55);
  addScore(60);
  
  const passing = getPassingScores(100);
  assert.deepStrictEqual(passing, []);
});

test('getFailingScores returns empty array if all pass', () => {
  addScore(95);
  addScore(90);
  addScore(85);
  
  const failing = getFailingScores(80);
  assert.deepStrictEqual(failing, []);
});