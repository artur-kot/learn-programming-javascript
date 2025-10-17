#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Generate a UUID v4
 */
function generateUUID() {
  return crypto.randomUUID();
}

/**
 * Check if a string is a valid UUID v4
 */
function isValidUUID(str) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

/**
 * Find all meta.json files in the repository
 */
function findMetaFiles(dir = '.', metaFiles = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    // Skip node_modules, .git, and hidden directories
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name.startsWith('.')) {
      continue;
    }

    if (entry.isDirectory()) {
      findMetaFiles(fullPath, metaFiles);
    } else if (entry.name === 'meta.json' && fullPath.includes('_meta')) {
      metaFiles.push(fullPath);
    }
  }

  return metaFiles;
}

/**
 * Validate and fix meta.json schema
 */
function validateAndFixMeta(filePath) {
  let modified = false;
  let meta;

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    meta = JSON.parse(content);
  } catch (error) {
    console.error(`❌ Error reading ${filePath}: ${error.message}`);
    return { valid: false, modified: false };
  }

  // Check and add/replace id field if missing or invalid
  if (!meta.id || typeof meta.id !== 'string' || meta.id.trim() === '' || !isValidUUID(meta.id)) {
    const oldId = meta.id;
    meta.id = generateUUID();
    modified = true;
    if (oldId && !isValidUUID(oldId)) {
      console.log(`✏️  Replaced invalid ID in ${filePath}: "${oldId}" -> "${meta.id}"`);
    } else {
      console.log(`✏️  Added UUID to ${filePath}: ${meta.id}`);
    }
  }

  // Validate required fields
  const requiredFields = ['id', 'title', 'initCmd', 'testCmd'];
  const missingFields = requiredFields.filter(field => !meta[field]);

  if (missingFields.length > 0) {
    console.error(`❌ ${filePath} is missing required fields: ${missingFields.join(', ')}`);
    return { valid: false, modified };
  }

  // Save if modified
  if (modified) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(meta, null, 2) + '\n', 'utf8');
      console.log(`✅ Updated ${filePath}`);
    } catch (error) {
      console.error(`❌ Error writing ${filePath}: ${error.message}`);
      return { valid: false, modified: false };
    }
  }

  return { valid: true, modified };
}

/**
 * Main validation function
 */
function main() {
  const args = process.argv.slice(2);
  const autoFix = args.includes('--fix');

  console.log('🔍 Searching for meta.json files...\n');

  const metaFiles = findMetaFiles('.');

  if (metaFiles.length === 0) {
    console.log('⚠️  No meta.json files found in _meta directories');
    return;
  }

  console.log(`Found ${metaFiles.length} meta.json file(s)\n`);

  let allValid = true;
  let totalModified = 0;

  for (const filePath of metaFiles) {
    const result = autoFix ? validateAndFixMeta(filePath) : validateMeta(filePath);

    if (!result.valid) {
      allValid = false;
    }

    if (result.modified) {
      totalModified++;
    }
  }

  console.log('\n' + '='.repeat(50));

  if (allValid) {
    console.log('✅ All meta.json files are valid!');
    if (totalModified > 0) {
      console.log(`📝 Modified ${totalModified} file(s)`);
    }
    process.exit(0);
  } else {
    console.error('❌ Validation failed! Run with --fix to auto-correct issues.');
    process.exit(1);
  }
}

/**
 * Validate meta.json without modifying (for CI)
 */
function validateMeta(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const meta = JSON.parse(content);

    // Check id field
    if (!meta.id || typeof meta.id !== 'string' || meta.id.trim() === '' || !isValidUUID(meta.id)) {
      console.error(`❌ ${filePath} is missing or has invalid 'id' field (must be a valid UUID v4)`);
      return { valid: false, modified: false };
    }

    // Validate required fields
    const requiredFields = ['id', 'title', 'initCmd', 'testCmd'];
    const missingFields = requiredFields.filter(field => !meta[field]);

    if (missingFields.length > 0) {
      console.error(`❌ ${filePath} is missing required fields: ${missingFields.join(', ')}`);
      return { valid: false, modified: false };
    }

    console.log(`✅ ${filePath} is valid`);
    return { valid: true, modified: false };

  } catch (error) {
    console.error(`❌ Error reading ${filePath}: ${error.message}`);
    return { valid: false, modified: false };
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { validateAndFixMeta, findMetaFiles, generateUUID };
