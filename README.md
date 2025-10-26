# JavaScript Course for `learnp` CLI

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an educational JavaScript course repository designed to teach JavaScript fundamentals through hands-on exercises. The project uses a structured approach where learners complete exercises by implementing functions and running tests.

## Contributing
Contributions to improve exercises, add new ones, or enhance documentation are welcome! Please follow standard open source contribution practices (fork, branch, PR).
### Using AI
When using AI tools like Claude or GitHub Copilot, ensure that the generated code aligns with the learning objectives of the exercises. Avoid relying solely on AI-generated solutions; instead, use them as a guide to understand concepts better and revise exercises afterward.

## Repository Structure

```
learn-programming-javascript/
├── course.json           # Course metadata (name, description, author, version)
├── Roadmap.md           # Exercise roadmap showing progression and completion status
├── progress.db          # SQLite database tracking user progress
└── exercises/
    └── XXX-exercise-name/
        ├── XXX-exercise-name.js       # Exercise implementation file
        ├── XXX-exercise-name.test.js  # Test file using Node.js test runner
        ├── README.md                  # Exercise instructions
        └── package.json               # Exercise-specific config
        └── exercise.json              # Optional - override default exercise metadata
```

Example exercise.json metadata:
```json
{
  "title": "Array Manipulation",
  "description": "Learn to work with arrays and common operations",
  "test_command": "pnpm test",
  "setup_command": "pnpm install",
  "context_files": ["exercise.js", "helpers.js"],
  "context_patterns": ["src/**/*.js", "lib/*.js"]
}
```
where:
- `title`: Exercise title
- `description`: Brief exercise description
- `test_command`: Command to run tests (default: `npm test`)
- `setup_command`: Command to set up dependencies (default: `npm install`)
- `context_files`: List of files to include as a context in ollama requests
- `context_patterns`: Glob patterns to include additional files as context

## Running Exercises

Each exercise is self-contained in its own directory. To work with an exercise:

**Run the exercise code directly:**
```bash
cd exercises/001-hello-world
node 001-hello-world.js
```

**Run tests for an exercise:**
```bash
cd exercises/001-hello-world
npm test
# or
node 001-hello-world.test.js
```

## Testing Framework

Exercises use Node.js's built-in test runner (`node:test` and `node:assert` modules) - no external testing frameworks like Jest or Mocha. Tests are written as ES modules (`"type": "module"` in package.json).

Test structure:
- Uses `import test from 'node:test'` and `import assert from 'node:assert'`
- Tests capture console output by mocking `console.log`
- Uses `assert.strictEqual()` for assertions
- Test cleanup is handled with `t.after()` hooks

## Code Conventions

- **ES Modules**: All JavaScript files use ES module syntax (`import`/`export`)
- **Naming**: Exercise files follow the pattern `XXX-exercise-name.js` where XXX is a zero-padded number (e.g., `001-hello-world.js`)
- **Function exports**: Exercise functions are exported for testing (e.g., `export function sayHello()`)
- **Learning-first approach**: Code includes TODO comments to guide learners on what to implement

## Important Notes

- **No root package.json**: The project does not have a root-level package.json by design. Each exercise has its own isolated dependencies.
- **Autocompletion guidance**: Exercise READMEs instruct learners to disable autocompletion tools (GitHub Copilot, etc.) to maximize hands-on learning.
- **Node.js requirement**: Exercises require Node.js installed to run JavaScript files outside a browser.
- **pnpm globally required**: Exercises are using alternative `pnpm` package manager to reduce disk space usage.

## Exercise README conventions
- **keep it concise**: Exercise READMEs focus on essential instructions only.
- **keep it simple**: Learner is probably new to programming - avoid jargon or explain it clearly.
- **code snippets**: Include code snippets for running exercises and tests.
- **explanations**: Provide brief explanations of concepts being taught.