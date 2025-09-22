const test = require('node:test');
const assert = require('assert');
const { spawnSync } = require('child_process');
const path = require('path');

test('helloworld.js prints Hello, World!', () => {
  const scriptPath = path.resolve(__dirname, '../../helloworld.js');
  const result = spawnSync('node', [scriptPath], { encoding: 'utf-8' });
  assert.strictEqual(result.stdout.trim(), 'Hello, World!');
  assert.strictEqual(result.status, 0);
});
