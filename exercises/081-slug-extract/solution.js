// Solution for Exercise 081: URL Slug Generator - Extract Parts

// Shorten slug to maxLength, removing trailing hyphens
export function truncateSlug(slug, maxLength) {
  if (slug.length <= maxLength) {
    return slug;
  }
  let truncated = slug.slice(0, maxLength);
  // Remove trailing hyphens
  return truncated.replace(/-+$/, '');
}

// Extract first N words from a hyphen-separated slug
export function getSlugPrefix(slug, wordCount) {
  const words = slug.split("-");
  return words.slice(0, wordCount).join("-");
}

// Extract last N words from a hyphen-separated slug
export function getSlugSuffix(slug, wordCount) {
  const words = slug.split("-");
  return words.slice(-wordCount).join("-");
}

// Extract single word at given position from slug
export function extractKeywordFromSlug(slug, position) {
  if (position < 0) {
    return "";
  }
  const words = slug.split("-");
  if (position >= words.length) {
    return "";
  }
  return words[position];
}
