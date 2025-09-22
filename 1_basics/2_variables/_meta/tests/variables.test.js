const test = require('node:test');
const assert = require('assert');
const { spawnSync } = require('child_process');
const path = require('path');

test('prints the name stored in a variable', () => {
  const scriptPath = path.resolve(__dirname, '../../index.js');
  const result = spawnSync('node', [scriptPath], { encoding: 'utf-8' });

  assert.strictEqual(result.status, 0, `Process exited with code ${result.status}. Stderr: ${result.stderr}`);

  // By default, the template uses 'Ada Lovelace'. Learners can change it; the test
  // should still pass as long as output is a non-empty single line (a name).
  const output = result.stdout.trim();
  assert.ok(output.length > 0, 'Expected some name to be printed');

  // Additional sanity: no extra newlines after trimming implies single line.
  assert.ok(!output.includes('\n'), 'Expected a single line output');
});
