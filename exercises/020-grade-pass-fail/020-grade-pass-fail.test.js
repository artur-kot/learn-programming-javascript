import test from 'node:test';
import assert from 'node:assert';
import { getLetterGrade, getPassFailStatus } from './020-grade-pass-fail.js';

test('Grade Calculator - getLetterGrade should still work from previous exercise', (t) => {
  assert.strictEqual(typeof getLetterGrade, 'function', 'getLetterGrade should be a function');

  // Test a few key grades
  assert.strictEqual(getLetterGrade(98), 'A+', 'Score 98 should return A+');
  assert.strictEqual(getLetterGrade(85), 'B', 'Score 85 should return B');
  assert.strictEqual(getLetterGrade(73), 'C', 'Score 73 should return C');
  assert.strictEqual(getLetterGrade(65), 'D', 'Score 65 should return D');
  assert.strictEqual(getLetterGrade(42), 'F', 'Score 42 should return F');
});

test('Grade Calculator - should determine pass/fail status with switch statement', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args.join(' '));
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof getPassFailStatus, 'function', 'getPassFailStatus should be a function');

  // Test all A grades return Pass
  assert.strictEqual(getPassFailStatus('A+'), 'Pass', 'A+ should return Pass');
  assert.strictEqual(getPassFailStatus('A'), 'Pass', 'A should return Pass');
  assert.strictEqual(getPassFailStatus('A-'), 'Pass', 'A- should return Pass');

  // Test all B grades return Pass
  assert.strictEqual(getPassFailStatus('B+'), 'Pass', 'B+ should return Pass');
  assert.strictEqual(getPassFailStatus('B'), 'Pass', 'B should return Pass');
  assert.strictEqual(getPassFailStatus('B-'), 'Pass', 'B- should return Pass');

  // Test all C grades return Pass
  assert.strictEqual(getPassFailStatus('C+'), 'Pass', 'C+ should return Pass');
  assert.strictEqual(getPassFailStatus('C'), 'Pass', 'C should return Pass');
  assert.strictEqual(getPassFailStatus('C-'), 'Pass', 'C- should return Pass');

  // Test all D grades return Pass
  assert.strictEqual(getPassFailStatus('D+'), 'Pass', 'D+ should return Pass');
  assert.strictEqual(getPassFailStatus('D'), 'Pass', 'D should return Pass');
  assert.strictEqual(getPassFailStatus('D-'), 'Pass', 'D- should return Pass');

  // Test F grade returns Fail
  assert.strictEqual(getPassFailStatus('F'), 'Fail', 'F should return Fail');
});
