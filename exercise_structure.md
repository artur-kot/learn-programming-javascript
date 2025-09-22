# Exercise structure and conventions

This repository is a lightweight, file‑based course for learning JavaScript. Each exercise lives in its own folder at the repo root and contains a minimal workspace (what the learner edits/runs) plus a hidden metadata area with tests and the reference solution.

Use `1_hello_world/` as a canonical example throughout this guide.

## Repository layout

- `course.json` — course title and description.
- `_overview/` — optional course overview and assets.
- `<n>_<slug>/` — a single exercise (e.g., `1_hello_world/`).
    - Learner‑visible files live directly in this folder (e.g., `helloworld.js`).
    - `_meta/` — exercise metadata (tests, solution, config). Learners don’t edit this.
- Other docs: `exercise_structure.md` (this guide), `ROADMAP.md`, `LICENSE`.

## Single exercise anatomy

Example: `1_hello_world/`

- Workspace files (learner edits/runs):
    - `1_hello_world/helloworld.js` — main script.
    - `1_hello_world/second.js` — optional/extra file used by the exercise or as a sandbox.
- Metadata folder: `1_hello_world/_meta/`
    - `meta.json` — exercise metadata/config for automation:
        - `title` — human‑readable exercise name.
        - `run` — command to run the exercise from the exercise root (CWD = exercise folder). Example: `"node helloworld.js"`.
        - `test` — command to run tests from inside `_meta` (CWD = `_meta/tests`). Example: `"node helloworld.test.js"`.
    - `tests/` — Node.js tests targeting the exercise workspace. Tests run the learner files by resolving paths out of `_meta` back into the exercise folder. Example:
        - `tests/helloworld.test.js` runs `node ../../helloworld.js` and asserts output.
    - `solution/` — reference solution files mirroring the workspace names (e.g., `solution/helloworld.js`, `solution/second.js`).
    - `todo.md` - description of an exercise
### Example files (abridged)

- `1_hello_world/helloworld.js`
    - Prints `Hello, World!`.
- `1_hello_world/_meta/meta.json`
    - `{ "title": "Hello, World", "run": "node ./helloworld.js", "test": "node ./tests/helloworld.test.js" }`
- `1_hello_world/_meta/tests/helloworld.test.js`
    - Uses Node `node:test` and `child_process.spawnSync` to execute `../../helloworld.js` and asserts stdout equals `Hello, World!`.

## Conventions

- Folder naming: `<order>_<slug>` (e.g., `2_variables`, `3_functions`). `order` is a zero‑padded integer only if needed for natural sort; here plain integers are fine.
- Use simple, runnable entry points in the exercise root (e.g., `index.js` or a descriptive filename like `helloworld.js`).
- Keep learner workspace minimal: only files the learner should see/edit belong outside `_meta`.
- Commands (CWD expectations):
    - `meta.json:run` must be runnable with CWD at the exercise root (the `<n>_<slug>/` folder).
    - `meta.json:test` must be runnable with CWD at `_meta/`.
- Tests should:
    - Run from inside `_meta` via the `meta.json:test` command.
    - Execute learner files via relative paths (e.g., `../../file.js`).
    - Use Node’s built‑in `node:test` and `assert` to avoid extra deps.
- Solutions mirror workspace filenames 1:1 inside `_meta/solution/`.
- No external package.json is required; favor zero‑dependency Node tests.

## Running an exercise

From the exercise root (learner view):

1) Run the script directly or use `meta.json:run`:
    - Direct: `node helloworld.js`
    - Via metadata: run the command specified in `_meta/meta.json:run` with CWD at the exercise root (e.g., `node ./helloworld.js`).
2) To run tests (from inside the `_meta` folder):
    - Use the command specified in `_meta/meta.json:test`.
    - Example: `cd _meta && node ./tests/helloworld.test.js`

Tip: If you prefer a single entry point, you can standardize on `index.js` in each exercise and update `run` and tests accordingly.

## Command working directories (CWD)

- `run` (in `_meta/meta.json`): Executed with CWD = exercise root (`<n>_<slug>/`). Paths in `run` should be relative to the exercise folder (e.g., `node ./index.js`).
- `test` (in `_meta/meta.json`): Executed with CWD = `_meta/`. Tests should resolve learner files with `../../` paths back to the exercise root.

## Creating a new exercise

Suppose you want `2_variables/`.

1) Create the folder structure:
    - `2_variables/`
        - `index.js` (or another descriptive entry file)
        - `_meta/`
            - `meta.json`
            - `tests/`
            - `solution/`

2) Author the learner workspace files (outside `_meta`). Keep them minimal and runnable.

3) Write tests in `_meta/tests/` that execute the learner files via relative paths. Example test skeleton:

    - Use `node:test`, `assert`, and `child_process.spawnSync` to run `../../index.js` and assert on `stdout` or side effects.

4) Provide the reference solution in `_meta/solution/` mirroring the filenames used in the workspace.

5) Configure `_meta/meta.json`:
    - `title`: Human‑readable title (e.g., `"Variables"`).
    - `run`: Command to run the exercise from the exercise root (e.g., `"node ./index.js"`).
    - `test`: Command to run tests from inside `_meta` (e.g., `"node ./tests/variables.test.js"`).

6) Optionally update course docs or overview to link the new exercise.

### Minimal templates

`_meta/meta.json`

{
    "title": "Exercise Title",
    "run": "node ./index.js",
    "test": "node ./tests/<testfile>.test.js"
}

`_meta/tests/<name>.test.js`

const test = require('node:test');
const assert = require('assert');
const { spawnSync } = require('child_process');
const path = require('path');

test('describe behavior', () => {
    const scriptPath = path.resolve(__dirname, '../../index.js');
    const result = spawnSync('node', [scriptPath], { encoding: 'utf-8' });
    assert.strictEqual(result.status, 0);
    // add assertions on result.stdout, stderr, or file outputs
});

`_meta/solution/*`

- Place solved versions of the learner files, with identical names.

## How 1_hello_world works end‑to‑end

1) `_meta/meta.json` defines:
    - `run`: `node ./helloworld.js` (CWD = `1_hello_world/`)
    - `test`: `node ./tests/helloworld.test.js` (CWD = `1_hello_world/_meta/`)
2) Learner runs the exercise:
    - From `1_hello_world/`: `node helloworld.js` (same as `run`)
3) Tests:
    - `cd 1_hello_world/_meta/ && node ./tests/helloworld.test.js`
4) The test runner launches `node ../../helloworld.js` and asserts stdout equals `Hello, World!`.
5) The solution is available at `1_hello_world/_meta/solution/helloworld.js` for reference.

## FAQ

- Q: Where should I put extra helper files for an exercise?
    - A: In the exercise root (learner workspace) if learners should see/use them; otherwise include instructor‑only assets in `_meta`.
- Q: Can I use a different test framework?
    - A: Yes, but prefer `node:test` to keep exercises dependency‑free. If you switch, keep `meta.json:test` accurate.
- Q: Do I need a global package.json?
    - A: Not required. Keep each exercise self‑contained and runnable with Node alone.