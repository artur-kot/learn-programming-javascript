# Exercise Schema Documentation

This document defines the required schema for exercise metadata files.

## meta.json Schema

Location: `{exercise_directory}/_meta/meta.json`

### Required Fields

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `id` | string | Unique identifier for the exercise | Must be a valid UUID v4 format |
| `title` | string | Human-readable exercise title | Required, non-empty |
| `initCmd` | string | Command to run/initialize the exercise | Required, non-empty |
| `testCmd` | string | Command to run tests for the exercise | Required, non-empty |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `entryFile` | string | Main entry file for the exercise |

### Example

```json
{
  "id": "f017dfc8-2f89-4956-9730-caee84b81bcf",
  "title": "Hello, World",
  "initCmd": "node helloworld.js",
  "testCmd": "node _meta/tests/helloworld.test.js",
  "entryFile": "helloworld.js"
}
```

## Validation Rules

### UUID Format

The `id` field must be a valid UUID v4 format:
- Format: `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`
- Where:
  - `x` is any hexadecimal digit (0-9, a-f)
  - `y` is one of: 8, 9, a, or b

Example valid UUIDs:
- `f017dfc8-2f89-4956-9730-caee84b81bcf`
- `a8ffcc9b-24b9-4f01-8332-0afee2794878`

### Automatic Validation

The repository includes automated validation:

1. **Pre-commit Hook**: Runs before each commit
   - Validates all `meta.json` files
   - Auto-generates missing UUIDs
   - Adds fixed files to the commit

2. **GitHub Actions**: Runs on pull requests
   - Validates all changed `meta.json` files
   - Auto-fixes issues and commits them
   - Comments on the PR if fixes were applied

3. **Manual Validation**: Available via npm scripts
   ```bash
   npm run validate        # Check only
   npm run validate:fix    # Check and auto-fix
   ```

## Directory Structure

Each exercise must follow this structure:

```
{number}_{exercise_name}/
├── _meta/
│   ├── meta.json              # Required: Exercise metadata
│   ├── description.md         # Required: Exercise description
│   ├── tests/
│   │   └── {name}.test.js    # Required: Test file(s)
│   └── solution/
│       └── {name}.js         # Optional: Solution file(s)
├── {entryFile}.js            # Required: Main exercise file
└── package.json              # Required: Package configuration
```

### File Naming Conventions

- Exercise directories: `{number}_{snake_case_name}`
  - Example: `1_hello_world`, `2_variables`
- Test files: `{name}.test.js`
- Entry files: Any valid JavaScript filename

## Common Validation Errors

### Missing UUID

**Error**: `meta.json is missing or has invalid 'id' field`

**Fix**: Run `npm run validate:fix` or let the pre-commit hook auto-generate it

### Invalid UUID Format

**Error**: `meta.json is missing or has invalid 'id' field (must be a valid UUID v4)`

**Fix**: Run `npm run validate:fix` to replace with a valid UUID

### Missing Required Fields

**Error**: `meta.json is missing required fields: title, initCmd`

**Fix**: Manually add the missing fields to your `meta.json` file

## Schema Version

Current schema version: `1.0.0`

Future schema changes will be documented here with migration guides.
