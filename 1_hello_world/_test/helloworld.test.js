const assert = require("assert");
const { spawnSync } = require("child_process");
const path = require("path");

const scriptPath = path.resolve(__dirname, "../helloworld.js");
const result = spawnSync("node", [scriptPath], { encoding: "utf-8" });
assert.strictEqual(result.stdout.trim(), "Hello, World!");
assert.strictEqual(result.status, 0);
