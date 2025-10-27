import test from 'node:test';
import assert from 'node:assert';
import { getLetterGrade, getPassFailStatus, calculateGPA } from './021-grade-gpa.js';

test('Grade Calculator - previous functions should still work', (t) => {
  assert.strictEqual(typeof getLetterGrade, 'function', 'getLetterGrade should be a function');
  assert.strictEqual(typeof getPassFailStatus, 'function', 'getPassFailStatus should be a function');

  // Test getLetterGrade
  assert.strictEqual(getLetterGrade(95), 'A', 'Score 95 should return A');
  assert.strictEqual(getLetterGrade(85), 'B', 'Score 85 should return B');

  // Test getPassFailStatus
  assert.strictEqual(getPassFailStatus('A'), 'Pass', 'A should return Pass');
  assert.strictEqual(getPassFailStatus('F'), 'Fail', 'F should return Fail');
});

test('Grade Calculator - should calculate GPA from array of letter grades', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args.join(' '));
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof calculateGPA, 'function', 'calculateGPA should be a function');

  // Test perfect A grades (A+ = 4.0, A = 4.0)
  const perfectGPA = calculateGPA(['A+', 'A', 'A', 'A+', 'A']);
  assert.strictEqual(perfectGPA, 4.0, 'All A grades should return 4.0 GPA');

  // Test mix of high grades (A, B+, A-, B, A+)
  // A=4.0, B+=3.3, A-=3.7, B=3.0, A+=4.0
  // Total: 18.0 / 5 = 3.6
  const highGPA = calculateGPA(['A', 'B+', 'A-', 'B', 'A+']);
  assert.strictEqual(highGPA, 3.6, 'Mix of A and B grades should return 3.6 GPA');

  // Test mix of B and C grades (B, B-, C+, B, C)
  // B=3.0, B-=2.7, C+=2.3, B=3.0, C=2.0
  // Total: 13.0 / 5 = 2.6
  const midGPA = calculateGPA(['B', 'B-', 'C+', 'B', 'C']);
  assert.strictEqual(midGPA, 2.6, 'Mix of B and C grades should return 2.6 GPA');

  // Test mostly A grades (A+, A, A, A-, A)
  // A+=4.0, A=4.0, A=4.0, A-=3.7, A=4.0
  // Total: 19.7 / 5 = 3.94
  const excellentGPA = calculateGPA(['A+', 'A', 'A', 'A-', 'A']);
  assert.strictEqual(excellentGPA, 3.94, 'Mostly A grades should return 3.94 GPA');

  // Test with D and F grades (C, D, F, C-, D+)
  // C=2.0, D=1.0, F=0.0, C-=1.7, D+=1.3
  // Total: 6.0 / 5 = 1.2
  const lowGPA = calculateGPA(['C', 'D', 'F', 'C-', 'D+']);
  assert.strictEqual(lowGPA, 1.2, 'Mix of C, D, and F grades should return 1.2 GPA');

  // Test single grade
  const singleGPA = calculateGPA(['B+']);
  assert.strictEqual(singleGPA, 3.3, 'Single B+ should return 3.3 GPA');

  // Test all same grade (B-)
  // B-=2.7
  const samGradeGPA = calculateGPA(['B-', 'B-', 'B-']);
  assert.strictEqual(sameGradeGPA, 2.7, 'All B- grades should return 2.7 GPA');
});
