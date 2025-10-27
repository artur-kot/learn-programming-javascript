import test from 'node:test';
import assert from 'node:assert';
import { getLetterGrade, getPassFailStatus, calculateGPA, checkHonorRoll } from './022-grade-honor-roll.js';

test('Grade Calculator - previous functions should still work', (t) => {
  assert.strictEqual(typeof getLetterGrade, 'function', 'getLetterGrade should be a function');
  assert.strictEqual(typeof getPassFailStatus, 'function', 'getPassFailStatus should be a function');
  assert.strictEqual(typeof calculateGPA, 'function', 'calculateGPA should be a function');

  // Test getLetterGrade
  assert.strictEqual(getLetterGrade(95), 'A', 'Score 95 should return A');

  // Test getPassFailStatus
  assert.strictEqual(getPassFailStatus('A'), 'Pass', 'A should return Pass');

  // Test calculateGPA
  const gpa = calculateGPA(['A', 'B+', 'A-', 'B', 'A+']);
  assert.strictEqual(gpa, 3.6, 'GPA should be calculated correctly');
});

test('Grade Calculator - should determine honor roll eligibility', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args.join(' '));
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof checkHonorRoll, 'function', 'checkHonorRoll should be a function');

  // Test 1: High GPA (3.5+) with all good grades (B- or better) → YES
  const student1 = ['A', 'A-', 'B+', 'A', 'A-'];
  const gpa1 = calculateGPA(student1);  // 3.74
  assert.strictEqual(checkHonorRoll(gpa1, student1), true, 'GPA 3.74 with no grades below B- should qualify');

  // Test 2: High GPA but has one C+ → NO
  const student2 = ['A', 'A', 'A+', 'A', 'C+'];
  const gpa2 = calculateGPA(student2);  // 3.66
  assert.strictEqual(checkHonorRoll(gpa2, student2), false, 'GPA 3.66 but with C+ should NOT qualify');

  // Test 3: Good grades but GPA too low (below 3.5) → NO
  const student3 = ['B', 'B+', 'B', 'B-', 'B'];
  const gpa3 = calculateGPA(student3);  // 3.06
  assert.strictEqual(checkHonorRoll(gpa3, student3), false, 'GPA 3.06 (below 3.5) should NOT qualify');

  // Test 4: Perfect student (4.0 GPA, all A grades) → YES
  const student4 = ['A+', 'A+', 'A', 'A+', 'A'];
  const gpa4 = calculateGPA(student4);  // 4.0
  assert.strictEqual(checkHonorRoll(gpa4, student4), true, 'Perfect 4.0 GPA should qualify');

  // Test 5: Exactly 3.5 GPA with all B grades → YES
  const student5 = ['A-', 'B+', 'A-', 'B+', 'A-'];
  const gpa5 = calculateGPA(student5);  // 3.5
  assert.strictEqual(checkHonorRoll(gpa5, student5), true, 'GPA exactly 3.5 with no grades below B- should qualify');

  // Test 6: High GPA but has one F → NO
  const student6 = ['A+', 'A+', 'A+', 'A+', 'F'];
  const gpa6 = calculateGPA(student6);  // 3.2
  assert.strictEqual(checkHonorRoll(gpa6, student6), false, 'Any F grade should disqualify');

  // Test 7: High GPA but has D+ → NO
  const student7 = ['A', 'A', 'A', 'A-', 'D+'];
  const gpa7 = calculateGPA(student7);  // 3.46
  assert.strictEqual(checkHonorRoll(gpa7, student7), false, 'D+ grade should disqualify');

  // Test 8: All B- grades (borderline) → NO (GPA will be 2.7)
  const student8 = ['B-', 'B-', 'B-', 'B-', 'B-'];
  const gpa8 = calculateGPA(student8);  // 2.7
  assert.strictEqual(checkHonorRoll(gpa8, student8), false, 'GPA 2.7 (below 3.5) should NOT qualify even with all B-');

  // Test 9: Mix of A and B- (borderline grades) → Should work if GPA >= 3.5
  const student9 = ['A+', 'A', 'A', 'B-', 'A'];
  const gpa9 = calculateGPA(student9);  // 3.54
  assert.strictEqual(checkHonorRoll(gpa9, student9), true, 'GPA 3.54 with B- as lowest grade should qualify');

  // Test 10: High GPA with one C (not C+) → NO
  const student10 = ['A+', 'A', 'A', 'A', 'C'];
  const gpa10 = calculateGPA(student10);  // 3.6
  assert.strictEqual(checkHonorRoll(gpa10, student10), false, 'C grade should disqualify even with high GPA');
});
