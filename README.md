# Learn Programming JavaScript

![JavaScript](assets/JavaScript-logo.png)

Welcome to the Open Source JavaScript Course! This repository is designed to help learners of all levels understand and master JavaScript programming through hands-on examples and clear explanations.

## What You'll Find Here

- **Beginner to Advanced Topics:** Covering fundamentals, ES6+, asynchronous programming, and more.
- **Practical Examples:** Real-world code samples and exercises.
- **Open Collaboration:** Contributions and improvements are welcome from the community.

## Getting Started

### For Learners

1. Browse the modules in order or jump to topics of interest
2. Try out the code samples and complete the exercises
3. Run exercises using the commands in each exercise's `package.json`

### For Contributors

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

#### Quick Setup

```bash
# Clone the repository
git clone https://github.com/your-username/learn-programming-javascript.git
cd learn-programming-javascript

# Install dependencies
npm install

# Set up git hooks
npm run prepare
```

#### Validation

Before committing, you can validate exercise metadata:

```bash
# Validate all meta.json files
npm run validate

# Auto-fix any issues (generates UUIDs for missing IDs)
npm run validate:fix
```

## Repository Structure

```
overview.md                  # Course overview
1_basics/                    # Basic JavaScript concepts
  1_hello_world/             # Individual exercise
    _meta/
      description.md         # Exercise instructions
      meta.json             # Exercise metadata (auto-validated)
      tests/                # Test files
      solution/             # Solution files (optional)
    helloworld.js           # Entry file
    package.json            # Exercise configuration
course.json                  # Course metadata
```

## Exercise Metadata Schema

Each exercise contains a `meta.json` file with:

```json
{
  "id": "uuid-v4",                    // Auto-generated unique identifier
  "title": "Exercise Title",          // Human-readable title
  "initCmd": "node example.js",       // Command to run the exercise
  "testCmd": "node tests/test.js",    // Command to run tests
  "entryFile": "example.js"           // Main exercise file
}
```

## Automation

This repository includes automated validation:

- **Pre-commit hooks**: Automatically validate and fix `meta.json` files before commits
- **GitHub Actions**: Validate PRs and auto-fix any issues
- **UUID Generation**: Missing exercise IDs are automatically generated

## Contributing

We love contributions! Whether it's:

- Adding new exercises
- Improving existing content
- Fixing bugs
- Improving documentation

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:
- Exercise structure requirements
- How to add new exercises
- Validation and testing
- Pull request process

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Stay Connected

- Report issues: [GitHub Issues](https://github.com/your-username/learn-programming-javascript/issues)
- Submit PRs: [GitHub Pull Requests](https://github.com/your-username/learn-programming-javascript/pulls)

Happy learning!
