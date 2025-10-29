// Solution for Exercise 079: URL Slug Generator - Remove Special Characters

// Remove special characters and convert to slug format
export function cleanSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replaceAll(" ", "-")
    .replaceAll("--", "-")
    .replace(/^-+|-+$/g, '');
}

// Remove all special characters, keep letters, numbers, spaces, and hyphens
export function removeSpecialChars(text) {
  return text.replace(/[^a-z0-9 \-]/gi, '');
}

// Clean title by removing special characters and converting to slug
export function sanitizeTitle(title) {
  return cleanSlug(title);
}
