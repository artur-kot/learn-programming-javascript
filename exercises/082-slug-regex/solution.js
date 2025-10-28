// Solution for Exercise 082: URL Slug Generator - Regex Pattern Matching

// Create production-ready slugs with all refinements
export function advancedSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Check if a string is a valid slug format
export function isValidSlug(text) {
  const slugPattern = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;
  return slugPattern.test(text);
}

// Convert camelCase or PascalCase to slug format
export function camelCaseToSlug(text) {
  return text
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

// Extract all words from a slug using regex
export function findAllWords(slug) {
  const matches = slug.match(/[a-z0-9]+/g);
  return matches || [];
}

// Create slugs with custom rules
export function createCustomSlug(title, options = {}) {
  const { maxLength, maxWords, keepNumbers = true } = options;
  
  let slug = title.toLowerCase();
  
  // Remove special characters
  if (keepNumbers) {
    slug = slug.replace(/[^a-z0-9\s-]/g, '');
  } else {
    slug = slug.replace(/[^a-z\s-]/g, '');
  }
  
  // Normalize spaces
  slug = slug.replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
  
  // Apply maxWords
  if (maxWords) {
    const words = slug.split('-');
    slug = words.slice(0, maxWords).join('-');
  }
  
  // Apply maxLength
  if (maxLength && slug.length > maxLength) {
    slug = slug.slice(0, maxLength).replace(/-+$/, '');
  }
  
  return slug;
}
