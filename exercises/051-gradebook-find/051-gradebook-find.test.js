import { test } from 'node:test';
import assert from 'node:assert';
import {
  addScore,
  findScore,
  findScoreIndex,
  findHighestScore,
  findLowestScore,
} from './051-gradebook-find.js';

test('findScore returns first matching score', () => {
  addScore(85);
  addScore(90);
  
  assert.strictEqual(findScore(90), 90);
});

test('findScore returns undefined if not found', () => {
  addScore(85);
  assert.strictEqual(findScore(100), undefined);
});

test('findScore with duplicates returns first occurrence', () => {
  addScore(85);
  addScore(90);
  addScore(85);
  
  const result = findScore(85);
  assert.strictEqual(result, 85);
});

test('findScoreIndex returns index of matching score', () => {
  addScore(85);
  addScore(90);
  addScore(75);
  
  assert.strictEqual(findScoreIndex(90), 1);
});

test('findScoreIndex returns -1 if not found', () => {
  addScore(85);
  assert.strictEqual(findScoreIndex(100), -1);
});

test('findScoreIndex with duplicates returns first index', () => {
  addScore(85);
  addScore(90);
  addScore(85);
  
  assert.strictEqual(findScoreIndex(85), 0);
});

test('findHighestScore returns maximum score', () => {
  addScore(85);
  addScore(95);
  addScore(75);
  
  assert.strictEqual(findHighestScore(), 95);
});

test('findLowestScore returns minimum score', () => {
  addScore(85);
  addScore(95);
  addScore(75);
  
  assert.strictEqual(findLowestScore(), 75);
});

test('findHighestScore and findLowestScore with single score', () => {
  addScore(88);
  
  assert.strictEqual(findHighestScore(), 88);
  assert.strictEqual(findLowestScore(), 88);
});