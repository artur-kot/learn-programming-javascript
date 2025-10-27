import test from 'node:test';
import assert from 'node:assert';
import { checkVotingAge } from './013-age-basic-if.js';

test('Age Checker Basic If - should display message for ages 18 and older', (t) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args);
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof checkVotingAge, 'function', 'checkVotingAge should be a function');

  checkVotingAge();

  assert.strictEqual(logs.length, 2, 'Should log exactly 2 messages (ages 25 and 18 qualify)');
  assert.strictEqual(logs[0][0], 'Age 25: You are old enough to vote!', 'Age 25 should qualify');
  assert.strictEqual(logs[1][0], 'Age 18: You are old enough to vote!', 'Age 18 should qualify');
});
