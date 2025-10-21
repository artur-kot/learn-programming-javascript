const test = require('node:test');
const assert = require('node:assert');
const { sayHello } = require('./exercise');

test('Hello World Exercise - sayHello should console.log "Hello, World!"', (t) => {
  const logs = [];
  const originalLog = console.log;
  
  console.log = (...args) => {
    logs.push(args);
  };

  t.after(() => {
    console.log = originalLog;
  });

  assert.strictEqual(typeof sayHello, 'function');
  sayHello();
  assert.strictEqual(logs.length, 1);
  assert.strictEqual(logs[0][0], 'Hello, World!');
});
