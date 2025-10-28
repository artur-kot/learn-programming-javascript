// Solution for Exercise 078: URL Slug Generator - Basic Conversion

// Convert title to lowercase and replace spaces with hyphens
export function basicSlug(title) {
  return title.toLowerCase().replaceAll(" ", "-");
}

// Create a complete blog post URL using the slug
export function createBlogPostUrl(title) {
  const slug = basicSlug(title);
  return `https://myblog.com/posts/${slug}`;
}

// Same logic as basicSlug (for practicing function names)
export function convertToSlug(text) {
  return text.toLowerCase().replaceAll(" ", "-");
}
