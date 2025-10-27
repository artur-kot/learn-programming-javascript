import test from 'node:test';
import assert from 'node:assert';
import { getLetterGrade } from './019-grade-plus-minus.js';

test('Grade Calculator - should return grades with plus/minus modifiers', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args.join(' '));
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof getLetterGrade, 'function', 'getLetterGrade should be a function');

  // Test A grades (90-100)
  assert.strictEqual(getLetterGrade(100), 'A+', 'Score 100 should return A+');
  assert.strictEqual(getLetterGrade(98), 'A+', 'Score 98 should return A+');
  assert.strictEqual(getLetterGrade(97), 'A+', 'Score 97 should return A+');
  assert.strictEqual(getLetterGrade(96), 'A', 'Score 96 should return A');
  assert.strictEqual(getLetterGrade(95), 'A', 'Score 95 should return A');
  assert.strictEqual(getLetterGrade(93), 'A', 'Score 93 should return A');
  assert.strictEqual(getLetterGrade(92), 'A-', 'Score 92 should return A-');
  assert.strictEqual(getLetterGrade(90), 'A-', 'Score 90 should return A-');

  // Test B grades (80-89)
  assert.strictEqual(getLetterGrade(89), 'B+', 'Score 89 should return B+');
  assert.strictEqual(getLetterGrade(87), 'B+', 'Score 87 should return B+');
  assert.strictEqual(getLetterGrade(86), 'B', 'Score 86 should return B');
  assert.strictEqual(getLetterGrade(83), 'B', 'Score 83 should return B');
  assert.strictEqual(getLetterGrade(82), 'B-', 'Score 82 should return B-');
  assert.strictEqual(getLetterGrade(80), 'B-', 'Score 80 should return B-');

  // Test C grades (70-79)
  assert.strictEqual(getLetterGrade(79), 'C+', 'Score 79 should return C+');
  assert.strictEqual(getLetterGrade(77), 'C+', 'Score 77 should return C+');
  assert.strictEqual(getLetterGrade(76), 'C', 'Score 76 should return C');
  assert.strictEqual(getLetterGrade(73), 'C', 'Score 73 should return C');
  assert.strictEqual(getLetterGrade(72), 'C-', 'Score 72 should return C-');
  assert.strictEqual(getLetterGrade(70), 'C-', 'Score 70 should return C-');

  // Test D grades (60-69)
  assert.strictEqual(getLetterGrade(69), 'D+', 'Score 69 should return D+');
  assert.strictEqual(getLetterGrade(67), 'D+', 'Score 67 should return D+');
  assert.strictEqual(getLetterGrade(66), 'D', 'Score 66 should return D');
  assert.strictEqual(getLetterGrade(63), 'D', 'Score 63 should return D');
  assert.strictEqual(getLetterGrade(62), 'D-', 'Score 62 should return D-');
  assert.strictEqual(getLetterGrade(60), 'D-', 'Score 60 should return D-');

  // Test F grade (0-59)
  assert.strictEqual(getLetterGrade(59), 'F', 'Score 59 should return F');
  assert.strictEqual(getLetterGrade(42), 'F', 'Score 42 should return F');
  assert.strictEqual(getLetterGrade(0), 'F', 'Score 0 should return F');
});
