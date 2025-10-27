import test from 'node:test';
import assert from 'node:assert';
import { checkPermissions } from './017-age-permissions.js';

test('Age Checker Permissions - should check complex permissions with logical operators', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args.join(' '));
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof checkPermissions, 'function', 'checkPermissions should be a function');

  checkPermissions();

  // Should have 4 users × 4 lines each (name + 3 permissions) = 16 lines
  assert.strictEqual(logs.length, 16, 'Should log 16 lines (4 users with 4 lines each)');

  // Alice (16, has consent)
  assert.strictEqual(logs[0], 'Alice (age 16):', 'Should display Alice info');
  assert.strictEqual(logs[1], '  Can watch R-rated: Yes', 'Alice can watch R-rated (has parental consent)');
  assert.strictEqual(logs[2], '  Can vote: No', 'Alice cannot vote (under 18)');
  assert.strictEqual(logs[3], '  Can drive: Yes', 'Alice can drive (age 16+)');

  // Bob (25, no consent)
  assert.strictEqual(logs[4], 'Bob (age 25):', 'Should display Bob info');
  assert.strictEqual(logs[5], '  Can watch R-rated: Yes', 'Bob can watch R-rated (17+)');
  assert.strictEqual(logs[6], '  Can vote: Yes', 'Bob can vote (18+)');
  assert.strictEqual(logs[7], '  Can drive: Yes', 'Bob can drive (16+)');

  // Carol (14, no consent)
  assert.strictEqual(logs[8], 'Carol (age 14):', 'Should display Carol info');
  assert.strictEqual(logs[9], '  Can watch R-rated: No', 'Carol cannot watch R-rated (no parental consent)');
  assert.strictEqual(logs[10], '  Can vote: No', 'Carol cannot vote (under 18)');
  assert.strictEqual(logs[11], '  Can drive: No', 'Carol cannot drive (under 16)');

  // David (17, has consent)
  assert.strictEqual(logs[12], 'David (age 17):', 'Should display David info');
  assert.strictEqual(logs[13], '  Can watch R-rated: Yes', 'David can watch R-rated (17+)');
  assert.strictEqual(logs[14], '  Can vote: No', 'David cannot vote (under 18)');
  assert.strictEqual(logs[15], '  Can drive: Yes', 'David can drive (16+)');
});
