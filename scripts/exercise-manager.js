#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const EXERCISES_DIR = path.join(ROOT_DIR, 'exercises');
const ROADMAP_FILE = path.join(ROOT_DIR, 'Roadmap.md');
const PROGRESS_DB = path.join(ROOT_DIR, 'progress.db');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Utility to prompt user for input
function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

class ExerciseManager {
  constructor(options = {}) {
    this.options = options;
    this.dryRun = options.dryRun || false;
    this.auto = options.auto || false;
  }

  // Parse exercise directory name
  parseExerciseName(dirname) {
    const match = dirname.match(/^(\d+(?:\.\d+)?)-(.+)$/);
    if (!match) return null;
    return {
      number: parseFloat(match[1]),
      slug: match[2],
      fullName: dirname,
    };
  }

  // Get all exercises sorted by number
  async getExercises() {
    const entries = await fs.readdir(EXERCISES_DIR, { withFileTypes: true });
    const exercises = [];

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const parsed = this.parseExerciseName(entry.name);
      if (parsed) {
        const dirPath = path.join(EXERCISES_DIR, entry.name);
        const stats = await fs.stat(dirPath);
        exercises.push({
          ...parsed,
          path: dirPath,
          created: stats.birthtime,
          modified: stats.mtime,
        });
      }
    }

    return exercises.sort((a, b) => a.number - b.number);
  }

  // Check if exercise has complete structure
  async isComplete(exercisePath) {
    try {
      const files = await fs.readdir(exercisePath);
      const hasTest = files.some(f => f.endsWith('.test.js'));
      const hasImpl = files.some(f => f.endsWith('.js') && !f.endsWith('.test.js'));
      const hasReadme = files.includes('README.md');
      return hasTest && hasImpl && hasReadme;
    } catch {
      return false;
    }
  }

  // Check if exercise has progress in database
  async hasProgress(exerciseNumber) {
    try {
      // Check if progress.db exists and has entries for this exercise
      await fs.access(PROGRESS_DB);
      // Note: Would need sqlite3 package to actually query
      // For now, returning false - can be extended
      return false;
    } catch {
      return false;
    }
  }

  // Detect and resolve duplicate exercise numbers
  async detectDuplicates() {
    const exercises = await this.getExercises();
    const duplicates = new Map();

    for (const ex of exercises) {
      const intNum = Math.floor(ex.number);
      if (!duplicates.has(intNum)) {
        duplicates.set(intNum, []);
      }
      duplicates.get(intNum).push(ex);
    }

    const conflicts = Array.from(duplicates.entries())
      .filter(([_, exs]) => exs.length > 1);

    return conflicts;
  }

  // Resolve which duplicate to keep
  async resolveDuplicate(duplicates) {
    log(`\n⚠️  Found ${duplicates.length} exercises with the same number:`, 'yellow');

    // 1. Check progress database
    const withProgress = [];
    for (const ex of duplicates) {
      if (await this.hasProgress(ex.number)) {
        withProgress.push(ex);
      }
    }

    if (withProgress.length === 1) {
      log(`✓ Keeping ${withProgress[0].fullName} (has user progress)`, 'green');
      return { keep: withProgress[0], shift: duplicates.filter(d => d !== withProgress[0]) };
    }

    // 2. Check file completeness
    const complete = [];
    for (const ex of duplicates) {
      if (await this.isComplete(ex.path)) {
        complete.push(ex);
      }
    }

    if (complete.length === 1) {
      log(`✓ Keeping ${complete[0].fullName} (more complete)`, 'green');
      return { keep: complete[0], shift: duplicates.filter(d => d !== complete[0]) };
    }

    // 3. In auto mode, use creation date
    if (this.auto) {
      const oldest = duplicates.sort((a, b) => a.created - b.created)[0];
      log(`✓ Keeping ${oldest.fullName} (oldest, using --auto mode)`, 'green');
      return { keep: oldest, shift: duplicates.filter(d => d !== oldest) };
    }

    // 4. Interactive prompt
    duplicates.forEach((d, i) => {
      log(`  ${i + 1}. ${d.fullName}`, 'cyan');
      log(`     Created: ${d.created.toISOString()}`, 'reset');
      log(`     Modified: ${d.modified.toISOString()}`, 'reset');
    });

    while (true) {
      const answer = await prompt(`\nWhich exercise should keep its number? (1-${duplicates.length}): `);
      const choice = parseInt(answer, 10);
      if (choice >= 1 && choice <= duplicates.length) {
        const keep = duplicates[choice - 1];
        return { keep, shift: duplicates.filter((_, i) => i !== choice - 1) };
      }
      log('Invalid choice, please try again.', 'red');
    }
  }

  // Rename exercise directory and update all references
  async renameExercise(exercise, newNumber) {
    const paddedNum = String(Math.floor(newNumber)).padStart(3, '0');
    const newName = `${paddedNum}-${exercise.slug}`;
    const newPath = path.join(EXERCISES_DIR, newName);

    if (this.dryRun) {
      log(`[DRY RUN] Would rename: ${exercise.fullName} → ${newName}`, 'blue');
      return { ...exercise, number: newNumber, fullName: newName, path: newPath };
    }

    // Rename directory
    await fs.rename(exercise.path, newPath);

    // Update files inside
    const files = await fs.readdir(newPath);
    for (const file of files) {
      const oldPattern = `${String(Math.floor(exercise.number)).padStart(3, '0')}-${exercise.slug}`;
      if (file.includes(oldPattern)) {
        const newFile = file.replace(oldPattern, newName);
        await fs.rename(
          path.join(newPath, file),
          path.join(newPath, newFile)
        );

        // Update imports in test files
        if (newFile.endsWith('.test.js')) {
          const testPath = path.join(newPath, newFile);
          let content = await fs.readFile(testPath, 'utf-8');
          content = content.replace(
            new RegExp(`from '\\./${oldPattern}\\.js'`, 'g'),
            `from './${newName}.js'`
          );
          await fs.writeFile(testPath, content, 'utf-8');
        }
      }
    }

    log(`✓ Renamed: ${exercise.fullName} → ${newName}`, 'green');
    return { ...exercise, number: newNumber, fullName: newName, path: newPath };
  }

  // Update Roadmap.md with new exercise numbers
  async updateRoadmap() {
    if (this.dryRun) {
      log('[DRY RUN] Would update Roadmap.md', 'blue');
      return;
    }

    const exercises = await this.getExercises();
    let content = await fs.readFile(ROADMAP_FILE, 'utf-8');

    // Update exercise links and numbers
    for (const ex of exercises) {
      const paddedNum = String(Math.floor(ex.number)).padStart(3, '0');

      // Update exercise links: (exercise XXX) or [exercise XXX]
      const oldLinkPattern = new RegExp(
        `\\(exercise \\d+\\)\\(\\./exercises/${paddedNum}-${ex.slug}\\)`,
        'g'
      );
      const newLink = `(exercise ${Math.floor(ex.number)})(./exercises/${paddedNum}-${ex.slug})`;
      content = content.replace(oldLinkPattern, newLink);

      // Also handle markdown links like [exercise 001](./exercises/001-hello-world)
      const oldMdPattern = new RegExp(
        `\\[exercise \\d+\\]\\(\\./exercises/${paddedNum}-${ex.slug}\\)`,
        'g'
      );
      const newMdLink = `[exercise ${Math.floor(ex.number)}](./exercises/${paddedNum}-${ex.slug})`;
      content = content.replace(oldMdPattern, newMdLink);
    }

    await fs.writeFile(ROADMAP_FILE, content, 'utf-8');
    log('✓ Updated Roadmap.md', 'green');
  }

  // Insert new exercise at position
  async insert(position, slug) {
    log(`\n📝 Inserting exercise "${slug}" at position ${position}...`, 'cyan');

    const exercises = await this.getExercises();
    const toShift = exercises.filter(ex => Math.floor(ex.number) >= position);

    if (toShift.length > 0) {
      log(`\nShifting ${toShift.length} exercises forward...`, 'yellow');
      // Shift in reverse order to avoid conflicts
      for (const ex of toShift.reverse()) {
        await this.renameExercise(ex, Math.floor(ex.number) + 1);
      }
    }

    // Create new exercise directory
    const paddedNum = String(position).padStart(3, '0');
    const newName = `${paddedNum}-${slug}`;
    const newPath = path.join(EXERCISES_DIR, newName);

    if (!this.dryRun) {
      await fs.mkdir(newPath, { recursive: true });

      // Create basic files
      await fs.writeFile(
        path.join(newPath, `${newName}.js`),
        `// TODO: Implement ${slug}\n\nexport function placeholder() {\n  // Your code here\n}\n`,
        'utf-8'
      );

      await fs.writeFile(
        path.join(newPath, `${newName}.test.js`),
        `import test from 'node:test';\nimport assert from 'node:assert';\nimport { placeholder } from './${newName}.js';\n\ntest('${slug}', (t) => {\n  // TODO: Add tests\n  assert.ok(true);\n});\n`,
        'utf-8'
      );

      await fs.writeFile(
        path.join(newPath, 'README.md'),
        `# ${slug}\n\nTODO: Add exercise description\n`,
        'utf-8'
      );

      await fs.writeFile(
        path.join(newPath, 'package.json'),
        JSON.stringify({
          type: 'module',
          scripts: {
            test: `node ${newName}.test.js`
          }
        }, null, 2),
        'utf-8'
      );

      log(`✓ Created new exercise: ${newName}`, 'green');
    } else {
      log(`[DRY RUN] Would create: ${newName}`, 'blue');
    }

    await this.updateRoadmap();
    log('\n✅ Insert complete!', 'green');
  }

  // Remove exercise at position
  async remove(number) {
    log(`\n🗑️  Removing exercise at position ${number}...`, 'cyan');

    const exercises = await this.getExercises();
    const toRemove = exercises.find(ex => Math.floor(ex.number) === number);

    if (!toRemove) {
      log(`❌ No exercise found at position ${number}`, 'red');
      return;
    }

    // Confirm deletion
    if (!this.auto && !this.dryRun) {
      const answer = await prompt(`Are you sure you want to remove "${toRemove.fullName}"? (yes/no): `);
      if (answer.toLowerCase() !== 'yes') {
        log('Cancelled.', 'yellow');
        return;
      }
    }

    if (!this.dryRun) {
      await fs.rm(toRemove.path, { recursive: true, force: true });
      log(`✓ Removed: ${toRemove.fullName}`, 'green');
    } else {
      log(`[DRY RUN] Would remove: ${toRemove.fullName}`, 'blue');
    }

    // Shift remaining exercises down
    const toShift = exercises.filter(ex => Math.floor(ex.number) > number);
    if (toShift.length > 0) {
      log(`\nShifting ${toShift.length} exercises backward...`, 'yellow');
      for (const ex of toShift) {
        await this.renameExercise(ex, Math.floor(ex.number) - 1);
      }
    }

    await this.updateRoadmap();
    log('\n✅ Remove complete!', 'green');
  }

  // Swap two exercises
  async swap(num1, num2) {
    log(`\n🔄 Swapping exercises ${num1} and ${num2}...`, 'cyan');

    const exercises = await this.getExercises();
    const ex1 = exercises.find(ex => Math.floor(ex.number) === num1);
    const ex2 = exercises.find(ex => Math.floor(ex.number) === num2);

    if (!ex1 || !ex2) {
      log(`❌ Could not find exercises at positions ${num1} and/or ${num2}`, 'red');
      return;
    }

    // Rename to temporary numbers to avoid conflicts
    const temp1 = await this.renameExercise(ex1, 9999);
    const temp2 = await this.renameExercise(ex2, 9998);

    // Swap to final positions
    await this.renameExercise(temp2, num1);
    await this.renameExercise(temp1, num2);

    await this.updateRoadmap();
    log('\n✅ Swap complete!', 'green');
  }

  // Cleanup and renumber all exercises
  async cleanup() {
    log('\n🧹 Cleaning up and renumbering exercises...', 'cyan');

    // Detect duplicates
    const conflicts = await this.detectDuplicates();

    if (conflicts.length > 0) {
      log(`\nFound ${conflicts.length} duplicate number(s)`, 'yellow');

      for (const [num, duplicates] of conflicts) {
        const resolution = await this.resolveDuplicate(duplicates);

        // Shift duplicates to temporary high numbers
        for (let i = 0; i < resolution.shift.length; i++) {
          const tempNum = 9000 + i;
          await this.renameExercise(resolution.shift[i], tempNum);
        }
      }
    }

    // Get all exercises and renumber sequentially
    const exercises = await this.getExercises();
    log(`\nRenumbering ${exercises.length} exercises sequentially...`, 'yellow');

    for (let i = 0; i < exercises.length; i++) {
      const targetNum = i + 1;
      if (Math.floor(exercises[i].number) !== targetNum) {
        await this.renameExercise(exercises[i], targetNum);
      }
    }

    await this.updateRoadmap();
    log('\n✅ Cleanup complete!', 'green');
  }

  // List all exercises
  async list() {
    const exercises = await this.getExercises();
    log('\n📚 Current exercises:', 'cyan');
    for (const ex of exercises) {
      const complete = await this.isComplete(ex.path);
      const status = complete ? '✓' : '○';
      log(`  ${status} ${ex.fullName}`, complete ? 'green' : 'yellow');
    }
    log(`\nTotal: ${exercises.length} exercises\n`, 'cyan');
  }
}

// CLI
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  const options = {
    dryRun: args.includes('--dry-run'),
    auto: args.includes('--auto'),
  };

  const manager = new ExerciseManager(options);

  if (options.dryRun) {
    log('🔍 DRY RUN MODE - No changes will be made\n', 'yellow');
  }

  try {
    switch (command) {
      case 'insert': {
        const position = parseInt(args[1], 10);
        const slug = args[2];
        if (!position || !slug) {
          log('Usage: node exercise-manager.js insert <position> <slug>', 'red');
          process.exit(1);
        }
        await manager.insert(position, slug);
        break;
      }

      case 'remove': {
        const number = parseInt(args[1], 10);
        if (!number) {
          log('Usage: node exercise-manager.js remove <number>', 'red');
          process.exit(1);
        }
        await manager.remove(number);
        break;
      }

      case 'swap': {
        const num1 = parseInt(args[1], 10);
        const num2 = parseInt(args[2], 10);
        if (!num1 || !num2) {
          log('Usage: node exercise-manager.js swap <num1> <num2>', 'red');
          process.exit(1);
        }
        await manager.swap(num1, num2);
        break;
      }

      case 'cleanup':
        await manager.cleanup();
        break;

      case 'list':
        await manager.list();
        break;

      default:
        log('Exercise Manager - Manage exercise order and structure\n', 'cyan');
        log('Commands:', 'yellow');
        log('  insert <position> <slug>  Insert new exercise at position', 'reset');
        log('  remove <number>           Remove exercise at position', 'reset');
        log('  swap <num1> <num2>        Swap two exercises', 'reset');
        log('  cleanup                   Fix duplicates and renumber', 'reset');
        log('  list                      List all exercises', 'reset');
        log('\nOptions:', 'yellow');
        log('  --dry-run                 Show what would happen without making changes', 'reset');
        log('  --auto                    Use automatic resolution for conflicts', 'reset');
        log('\nExamples:', 'yellow');
        log('  node exercise-manager.js insert 66 new-exercise', 'reset');
        log('  node exercise-manager.js cleanup --dry-run', 'reset');
        log('  node exercise-manager.js swap 10 15', 'reset');
    }
  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'red');
    if (options.dryRun) {
      log('(This error occurred in dry-run mode)', 'yellow');
    }
    process.exit(1);
  }
}

main();
