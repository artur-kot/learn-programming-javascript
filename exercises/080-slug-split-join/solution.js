// Solution for Exercise 080: URL Slug Generator - Split and Join

// Split by spaces, filter empty strings, lowercase, and join with hyphens
export function slugFromArray(title) {
  return title
    .split(" ")
    .filter(word => word.length > 0)
    .map(word => word.toLowerCase())
    .join("-");
}

// Split text by separator and filter out empty strings
export function splitAndFilter(text, separator) {
  return text.split(separator).filter(word => word.length > 0);
}

// Lowercase words, filter empties, and join with separator
export function normalizeAndJoin(words, separator) {
  return words
    .map(word => word.toLowerCase())
    .filter(word => word.length > 0)
    .join(separator);
}

// Clean special characters, split, filter, normalize, and join
export function buildSlugFromWords(title) {
  return title
    .replace(/[^a-z0-9 -]/gi, '')
    .split(" ")
    .filter(word => word.length > 0)
    .map(word => word.toLowerCase())
    .join("-")
    .replace(/-+/g, '-');
}
