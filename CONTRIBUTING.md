# Contributing to Learn Programming JavaScript

Thank you for your interest in contributing! This document provides guidelines for adding new exercises to the course.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up git hooks:
   ```bash
   npm run prepare
   ```

## Exercise Structure

Each exercise must follow this structure:

```
1_basics/
  1_hello_world/
    _meta/
      description.md       # Exercise description and instructions
      meta.json           # Exercise metadata (required schema)
      tests/
        example_test.js   # Test file
      solution/
        example.js        # Solution file (optional)
    example.js            # Entry file for the exercise
    package.json          # Package configuration
```

## meta.json Schema

Every exercise must have a `meta.json` file in the `_meta/` directory with the following required fields:

```json
{
  "id": "uuid-v4-here",           // Auto-generated UUID (required)
  "title": "Exercise Title",      // Human-readable title (required)
  "initCmd": "node example.js",   // Command to run the exercise (required)
  "testCmd": "node _meta/tests/example_test.js",  // Command to run tests (required)
  "entryFile": "example.js"       // Main file for the exercise (optional)
}
```

### Important Notes:

- **The `id` field is auto-generated** - You don't need to add it manually
- If you forget to add an `id`, our pre-commit hook will automatically generate a UUID for you
- **Never delete the `id` field** once it's been generated
- All other fields (`title`, `initCmd`, `testCmd`) are required

## Validation

### Local Validation

Before committing, you can manually validate your meta.json files:

```bash
# Check if all meta.json files are valid
npm run validate

# Auto-fix any issues (adds missing UUIDs)
npm run validate:fix
```

### Pre-commit Hook

When you commit, the pre-commit hook automatically:
1. Validates all `meta.json` files
2. Auto-generates UUIDs for any missing `id` fields
3. Adds the fixed files to your commit

### CI/CD Validation

When you open a pull request:
1. GitHub Actions validates all `meta.json` files
2. If issues are found, the bot automatically fixes them and pushes a commit
3. You'll be notified to pull the latest changes

## Adding a New Exercise

1. Create a new directory following the naming convention: `{number}_{exercise_name}`
2. Create the required directory structure
3. Add your `meta.json` file (you can skip the `id` field):
   ```json
   {
     "title": "My New Exercise",
     "initCmd": "node myexercise.js",
     "testCmd": "node _meta/tests/myexercise.test.js",
     "entryFile": "myexercise.js"
   }
   ```
4. Create `description.md` with exercise instructions
5. Write your exercise code and tests
6. Add a `package.json` for the exercise
7. Commit your changes - the pre-commit hook will add the UUID automatically

## Example Contribution

```bash
# Create exercise directory
mkdir -p 1_basics/3_my_exercise/_meta/tests

# Create meta.json (without id)
cat > 1_basics/3_my_exercise/_meta/meta.json << 'EOF'
{
  "title": "My Exercise",
  "initCmd": "node index.js",
  "testCmd": "node _meta/tests/index.test.js",
  "entryFile": "index.js"
}
EOF

# Add description
cat > 1_basics/3_my_exercise/_meta/description.md << 'EOF'
# My Exercise

Learn how to...
EOF

# Create exercise files
touch 1_basics/3_my_exercise/index.js
touch 1_basics/3_my_exercise/_meta/tests/index.test.js

# Add package.json
cat > 1_basics/3_my_exercise/package.json << 'EOF'
{
  "name": "3_my_exercise",
  "version": "1.0.0",
  "description": "My exercise description",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "node _meta/tests/index.test.js"
  }
}
EOF

# Commit - UUID will be auto-generated!
git add .
git commit -m "feat: add new exercise on..."
```

## Questions?

If you have any questions about contributing, please open an issue!
