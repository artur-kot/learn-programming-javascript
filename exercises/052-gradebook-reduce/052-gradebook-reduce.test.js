import { test } from 'node:test';
import assert from 'node:assert';
import { addScore, calculateClassAverage, getStatistics } from './052-gradebook-reduce.js';

test('calculateClassAverage returns average of scores', () => {
  addScore(80);
  addScore(90);
  addScore(100);
  
  const average = calculateClassAverage();
  assert.strictEqual(average, 90);
});

test('calculateClassAverage with single score', () => {
  addScore(85);
  assert.strictEqual(calculateClassAverage(), 85);
});

test('calculateClassAverage with decimal result', () => {
  addScore(85);
  addScore(90);
  
  const average = calculateClassAverage();
  assert.strictEqual(average, 87.5);
});

test('calculateClassAverage using reduce method', () => {
  addScore(75);
  addScore(85);
  addScore(95);
  addScore(80);
  
  const average = calculateClassAverage();
  assert.strictEqual(average, 83.75);
});

test('getStatistics returns object with all properties', () => {
  addScore(80);
  addScore(90);
  
  const stats = getStatistics();
  assert.ok(stats.hasOwnProperty('average'));
  assert.ok(stats.hasOwnProperty('highest'));
  assert.ok(stats.hasOwnProperty('lowest'));
  assert.ok(stats.hasOwnProperty('total'));
  assert.ok(stats.hasOwnProperty('passing'));
  assert.ok(stats.hasOwnProperty('failing'));
});

test('getStatistics with comprehensive data', () => {
  addScore(95);
  addScore(75);
  addScore(65);
  addScore(55);
  
  const stats = getStatistics();
  assert.strictEqual(stats.average, 72.5);
  assert.strictEqual(stats.highest, 95);
  assert.strictEqual(stats.lowest, 55);
  assert.strictEqual(stats.total, 4);
  assert.strictEqual(stats.passing, 2); // 95, 75
  assert.strictEqual(stats.failing, 2); // 65, 55
});

test('getStatistics with all passing scores', () => {
  addScore(90);
  addScore(85);
  addScore(95);
  
  const stats = getStatistics();
  assert.strictEqual(stats.total, 3);
  assert.strictEqual(stats.passing, 3);
  assert.strictEqual(stats.failing, 0);
});

test('getStatistics with all failing scores', () => {
  addScore(50);
  addScore(55);
  
  const stats = getStatistics();
  assert.strictEqual(stats.total, 2);
  assert.strictEqual(stats.passing, 0);
  assert.strictEqual(stats.failing, 2);
});