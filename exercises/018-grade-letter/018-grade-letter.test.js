import test from 'node:test';
import assert from 'node:assert';
import { getLetterGrade } from './018-grade-letter.js';

test('Grade Calculator - should convert numeric scores to letter grades', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args.join(' '));
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof getLetterGrade, 'function', 'getLetterGrade should be a function');

  // Test A grade (90-100)
  assert.strictEqual(getLetterGrade(100), 'A', 'Score 100 should return A');
  assert.strictEqual(getLetterGrade(95), 'A', 'Score 95 should return A');
  assert.strictEqual(getLetterGrade(90), 'A', 'Score 90 should return A');

  // Test B grade (80-89)
  assert.strictEqual(getLetterGrade(89), 'B', 'Score 89 should return B');
  assert.strictEqual(getLetterGrade(85), 'B', 'Score 85 should return B');
  assert.strictEqual(getLetterGrade(80), 'B', 'Score 80 should return B');

  // Test C grade (70-79)
  assert.strictEqual(getLetterGrade(79), 'C', 'Score 79 should return C');
  assert.strictEqual(getLetterGrade(75), 'C', 'Score 75 should return C');
  assert.strictEqual(getLetterGrade(70), 'C', 'Score 70 should return C');

  // Test D grade (60-69)
  assert.strictEqual(getLetterGrade(69), 'D', 'Score 69 should return D');
  assert.strictEqual(getLetterGrade(65), 'D', 'Score 65 should return D');
  assert.strictEqual(getLetterGrade(60), 'D', 'Score 60 should return D');

  // Test F grade (0-59)
  assert.strictEqual(getLetterGrade(59), 'F', 'Score 59 should return F');
  assert.strictEqual(getLetterGrade(42), 'F', 'Score 42 should return F');
  assert.strictEqual(getLetterGrade(0), 'F', 'Score 0 should return F');
});
