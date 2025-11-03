/**
 * Exercise 158: Tags - Set Basics
 * 
 * Learn to use JavaScript Set data structure for storing unique tags.
 * Sets automatically prevent duplicates and offer efficient lookup.
 * 
 * Key Concepts:
 * - Set data structure
 * - Uniqueness guarantee
 * - Set methods: add, has, delete, clear, size
 * - Converting between Set and Array
 * - Iterating over Sets
 */

/**
 * createTagSet - Create a new Set for storing tags
 * 
 * Initialize a Set with optional starting tags.
 * 
 * @param {Array<string>} initialTags - Optional array of initial tags
 * @returns {Set} Set containing unique tags
 * 
 * @example
 * const tags = createTagSet(['javascript', 'web']);
 * // Set { 'javascript', 'web' }
 */
export function createTagSet(initialTags = []) {
  // TODO: Create and return a new Set with initialTags
}

/**
 * addTag - Add a tag to the set
 * 
 * Add a new tag, normalizing it first.
 * Returns true if added, false if already existed.
 * 
 * @param {Set} tags - The tag set
 * @param {string} tag - Tag to add
 * @returns {boolean} True if added, false if already exists
 * 
 * @example
 * const tags = createTagSet();
 * addTag(tags, 'javascript');  // true
 * addTag(tags, 'javascript');  // false (already exists)
 */
export function addTag(tags, tag) {
  // TODO: Normalize tag, check if exists, add if not
}

/**
 * hasTag - Check if a tag exists
 * 
 * Case-insensitive check for tag existence.
 * 
 * @param {Set} tags - The tag set
 * @param {string} tag - Tag to check
 * @returns {boolean} True if exists, false otherwise
 * 
 * @example
 * const tags = createTagSet(['javascript']);
 * hasTag(tags, 'javascript');  // true
 * hasTag(tags, 'python');      // false
 */
export function hasTag(tags, tag) {
  // TODO: Check if normalized tag exists in set
}

/**
 * removeTag - Remove a tag from the set
 * 
 * Remove tag if it exists. Returns success status.
 * 
 * @param {Set} tags - The tag set
 * @param {string} tag - Tag to remove
 * @returns {boolean} True if removed, false if didn't exist
 * 
 * @example
 * const tags = createTagSet(['javascript', 'python']);
 * removeTag(tags, 'javascript');  // true
 * removeTag(tags, 'ruby');        // false (not in set)
 */
export function removeTag(tags, tag) {
  // TODO: Remove normalized tag if exists, return success
}

/**
 * getAllTags - Get all tags as sorted array
 * 
 * Convert Set to array and sort alphabetically.
 * 
 * @param {Set} tags - The tag set
 * @returns {Array<string>} Sorted array of all tags
 * 
 * @example
 * const tags = createTagSet(['zebra', 'apple', 'banana']);
 * getAllTags(tags);  // ['apple', 'banana', 'zebra']
 */
export function getAllTags(tags) {
  // TODO: Convert set to sorted array
}

/**
 * getTagCount - Get number of unique tags
 * 
 * Return the size of the tag set.
 * 
 * @param {Set} tags - The tag set
 * @returns {number} Count of unique tags
 * 
 * @example
 * const tags = createTagSet(['javascript', 'python']);
 * getTagCount(tags);  // 2
 */
export function getTagCount(tags) {
  // TODO: Return set size
}

/**
 * clearAllTags - Remove all tags
 * 
 * Clear the set completely.
 * Returns true if had tags, false if already empty.
 * 
 * @param {Set} tags - The tag set
 * @returns {boolean} True if cleared (had tags), false if empty
 * 
 * @example
 * const tags = createTagSet(['javascript', 'python']);
 * clearAllTags(tags);  // true
 * clearAllTags(tags);  // false (already empty)
 */
export function clearAllTags(tags) {
  // TODO: Check if has tags, clear, return had tags status
}

/**
 * filterTags - Filter tags by search term
 * 
 * Find all tags containing the search term (case-insensitive).
 * 
 * @param {Set} tags - The tag set
 * @param {string} searchTerm - Term to search for
 * @returns {Array<string>} Array of matching tags
 * 
 * @example
 * const tags = createTagSet(['javascript', 'java', 'python']);
 * filterTags(tags, 'java');  // ['java', 'javascript']
 */
export function filterTags(tags, searchTerm) {
  // TODO: Filter tags containing search term (case-insensitive)
}

/**
 * normalizeTag - Normalize a tag
 * 
 * Convert to lowercase, trim whitespace, remove special characters.
 * 
 * @param {string} tag - Tag to normalize
 * @returns {string} Normalized tag
 * 
 * @example
 * normalizeTag('  JavaScript! ');  // 'javascript'
 * normalizeTag('Web-Dev');         // 'web-dev'
 */
export function normalizeTag(tag) {
  // TODO: Normalize: lowercase, trim, remove special chars
}

/**
 * getTagStats - Get statistics about tags
 * 
 * Return object with count, isEmpty status, and tags array.
 * 
 * @param {Set} tags - The tag set
 * @returns {object} Stats with count, isEmpty, tags
 * 
 * @example
 * const tags = createTagSet(['javascript', 'python']);
 * getTagStats(tags);
 * // { count: 2, isEmpty: false, tags: ['javascript', 'python'] }
 */
export function getTagStats(tags) {
  // TODO: Return stats object
}
