const test = require('node:test');
const assert = require('assert');
const { spawnSync } = require('child_process');
const path = require('path');

test('index.js stores name in variable and prints it', () => {
  const scriptPath = path.resolve(__dirname, '../../index.js');
  const result = spawnSync('node', [scriptPath], { encoding: 'utf-8' });
  
  assert.strictEqual(result.status, 0, 'Script should run without errors');
  
  // Check that something is printed (not empty)
  assert.strictEqual(result.stdout.trim().length > 0, true, 'Should print something to console');
  
  // Check that the output is a valid name (contains letters)
  const output = result.stdout.trim();
  assert.strictEqual(/[a-zA-Z]/.test(output), true, 'Output should contain letters (a name)');
});