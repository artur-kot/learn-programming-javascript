# Exercise Manager

This is tool is intended to use for course contributors.

A command-line tool to manage exercise order and structure in the JavaScript course.

## Features

- **Insert** new exercises at any position (shifts existing ones)
- **Remove** exercises (automatically renumbers remaining ones)
- **Swap** two exercise positions
- **Cleanup** duplicates and renumber all exercises sequentially
- **List** all exercises with completion status
- **Smart duplicate resolution** using hybrid strategy
- **Dry-run mode** to preview changes before applying
- **Auto mode** for non-interactive operation

## Installation

No additional dependencies required! The script uses only Node.js built-in modules.

## Usage

### Quick Commands (via npm scripts)

```bash
# List all exercises
npm run exercises:list

# Insert new exercise at position 66
npm run exercises:insert 66 new-exercise-name

# Remove exercise at position 50
npm run exercises:remove 50

# Swap exercises 10 and 15
npm run exercises:swap 10 15

# Clean up duplicates and renumber
npm run exercises:cleanup
```

### Direct Usage

```bash
# With options
node scripts/exercise-manager.js cleanup --dry-run --auto

# Or make it executable (Unix/Mac)
chmod +x scripts/exercise-manager.js
./scripts/exercise-manager.js list
```

## Commands

### `insert <position> <slug>`

Inserts a new exercise at the specified position and shifts all following exercises forward.

**Example:**
```bash
npm run exercises:insert 66 array-methods

# Creates exercises/066-array-methods/
# Shifts 066-inventory-spread → 067-inventory-spread
# Shifts 067-inventory-search → 068-inventory-search
# etc.
```

**Creates:**
- Exercise directory with proper naming
- Basic `.js` and `.test.js` files
- `README.md` and `package.json`
- Updates `Roadmap.md` automatically

---

### `remove <number>`

Removes an exercise and shifts all following exercises backward.

**Example:**
```bash
npm run exercises:remove 50

# Removes exercises/050-gradebook-filter/
# Shifts 051-gradebook-find → 050-gradebook-find
# Shifts 052-gradebook-reduce → 051-gradebook-reduce
# etc.
```

**Safety:**
- Prompts for confirmation (unless `--auto` flag)
- Can be tested with `--dry-run` first

---

### `swap <num1> <num2>`

Swaps the positions of two exercises.

**Example:**
```bash
npm run exercises:swap 10 25

# 010-calculator-input becomes 025-calculator-input
# 025-countdown-custom becomes 010-countdown-custom
```

**Updates:**
- Directory names
- File names inside directories
- Import statements in test files
- Links in `Roadmap.md`

---

### `cleanup`

Detects duplicate exercise numbers and renumbers all exercises sequentially.

**Example:**
```bash
npm run exercises:cleanup

# If you manually created 066-new-exercise and 066-inventory-spread already exists:
# 1. Prompts which one to keep at position 066
# 2. Shifts the other to the next available number
# 3. Renumbers all exercises to remove gaps
```

**Duplicate Resolution Strategy:**
1. **Check progress database** - keeps exercise with user progress
2. **Check file completeness** - keeps exercise with tests + implementation + README
3. **Check creation date** - keeps oldest (if `--auto` flag)
4. **Interactive prompt** - asks user to choose (default)

---

### `list`

Lists all exercises with completion status.

**Example:**
```bash
npm run exercises:list

# Output:
# 📚 Current exercises:
#   ✓ 001-hello-world
#   ✓ 002-console-methods
#   ○ 003-profile-store-info (incomplete)
#   ...
# Total: 107 exercises
```

**Status indicators:**
- `✓` Complete (has test, implementation, and README)
- `○` Incomplete

---

## Options

### `--dry-run`

Preview what would happen without making any changes.

**Example:**
```bash
node scripts/exercise-manager.js cleanup --dry-run

# Output shows all planned changes without executing them
```

**Use cases:**
- Test before committing
- Verify logic before large operations
- Safe exploration

---

### `--auto`

Run in non-interactive mode (automatic conflict resolution).

**Example:**
```bash
node scripts/exercise-manager.js cleanup --auto

# Resolves duplicates using:
# 1. Progress database (if available)
# 2. File completeness
# 3. Creation date (oldest wins)
# No user prompts required
```

**Use cases:**
- CI/CD pipelines
- Batch operations
- Scripting

---

## Common Scenarios

### Scenario 1: Insert Exercise in the Middle

You want to add a new exercise about "array slicing" between exercises 45 and 46.

```bash
# 1. Preview the changes
node scripts/exercise-manager.js insert 46 array-slicing --dry-run

# 2. Execute
npm run exercises:insert 46 array-slicing

# Result:
# - New: 046-array-slicing/
# - Old 046 becomes 047
# - Old 047 becomes 048
# - etc.
```

---

### Scenario 2: Accidentally Created Duplicate

You manually created `066-new-feature/` but `066-inventory-spread/` already exists.

```bash
# Run cleanup
npm run exercises:cleanup

# Interactive prompt shows:
# ⚠️  Found 2 exercises with the same number:
#   1. 066-inventory-spread
#      Created: 2025-01-15T10:30:00.000Z
#      Modified: 2025-01-20T14:22:00.000Z
#   2. 066-new-feature
#      Created: 2025-01-28T16:45:00.000Z
#      Modified: 2025-01-28T16:45:00.000Z
#
# Which exercise should keep number 066? (1/2): 1

# Result:
# - 066-inventory-spread stays at 066
# - 066-new-feature moves to 067
# - All following exercises shift +1
```

---

### Scenario 3: Reorder Series

You want to swap two exercise series.

```bash
# Swap individual exercises
npm run exercises:swap 33 43
npm run exercises:swap 34 44
npm run exercises:swap 35 45
# ... etc

# Or use cleanup to renumber everything after manual renaming
```

---

### Scenario 4: Remove Outdated Exercise

```bash
# 1. Check what exists
npm run exercises:list

# 2. Preview removal
node scripts/exercise-manager.js remove 25 --dry-run

# 3. Remove
npm run exercises:remove 25

# Confirms before deletion
```

---

## What Gets Updated

When you modify exercises, the tool automatically updates:

1. **Directory names**: `exercises/XXX-name/`
2. **File names**: `XXX-name.js`, `XXX-name.test.js`
3. **Import statements**: `import { func } from './XXX-name.js'`
4. **Roadmap links**: `[exercise XXX](./exercises/XXX-name)`
5. **Exercise numbering**: Ensures sequential order

---

## Safety Features

- **Dry-run mode** - test before executing
- **Confirmation prompts** - for destructive operations
- **Duplicate detection** - prevents conflicts
- **Atomic operations** - rename exercises in safe order
- **Preserves user progress** - smart resolution keeps worked-on exercises

---

## Technical Details

### Naming Convention

Exercises follow the pattern: `XXX-slug-name`

- `XXX` = 3-digit zero-padded number (001, 002, ..., 107)
- `slug-name` = kebab-case description

### File Structure

Each exercise directory contains:
```
XXX-exercise-name/
├── XXX-exercise-name.js       # Implementation
├── XXX-exercise-name.test.js  # Tests
├── README.md                  # Instructions
├── package.json               # Config
└── exercise.json              # Optional metadata
```

### Roadmap Format

The `Roadmap.md` file uses this format for exercise links:
```markdown
42. [x] **Exercise Title** - Description [exercise 42](./exercises/042-exercise-name)
```

The tool updates both the exercise number and the link path.

---

## Troubleshooting

### "No exercise found at position X"

The exercise number doesn't exist. Use `npm run exercises:list` to see available exercises.

### "Found duplicate number(s)"

Run `npm run exercises:cleanup` to resolve duplicates.

### Import statements not updating

The tool updates imports in `.test.js` files. If you have custom imports elsewhere, update them manually.

### Roadmap links broken

Run `npm run exercises:cleanup` to regenerate all links.

---

## Contributing

When adding features:
1. Test with `--dry-run` first
2. Handle edge cases (missing files, permissions, etc.)
3. Update this README
4. Consider backward compatibility

---

## Future Enhancements

Potential improvements:
- [ ] SQLite integration for progress database checking
- [ ] Batch operations (insert multiple, swap ranges)
- [ ] Undo/redo functionality
- [ ] Git integration (auto-commit changes)
- [ ] Validate exercise structure
- [ ] Generate missing files
- [ ] Course.json automatic updates
- [ ] Interactive TUI (terminal UI)

---

## License

Same as parent project.
