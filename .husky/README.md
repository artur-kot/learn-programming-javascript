# Git Hooks

This directory contains git hooks managed by [husky](https://typicode.github.io/husky/).

## Available Hooks

### pre-commit

Runs before each commit to:
1. Validate all `meta.json` files in exercise directories
2. Auto-generate UUIDs for any missing `id` fields
3. Ensure all required fields are present
4. Auto-stage any fixed `meta.json` files

## Setup

Git hooks are automatically installed when you run:

```bash
npm install
```

This triggers the `prepare` script in `package.json` which runs `husky install`.

## Manual Installation

If hooks aren't working, you can manually install them:

```bash
npm run prepare
```

## Bypassing Hooks

If you need to bypass the pre-commit hook (not recommended):

```bash
git commit --no-verify -m "your message"
```

**Warning**: Bypassing hooks may result in invalid metadata being committed, which will be caught and auto-fixed by the GitHub Actions workflow.

## Troubleshooting

### Hook not running

1. Ensure husky is installed: `npm install`
2. Check hook file has execute permissions: `chmod +x .husky/pre-commit`
3. Verify git hooks path: `git config core.hooksPath` should show `.husky`

### Permission errors on Windows

If you get permission errors:
1. The hook will still work even if chmod fails on Windows
2. Git for Windows handles the script execution automatically
