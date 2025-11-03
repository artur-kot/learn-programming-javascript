/**
 * Exercise 135: Data Pipeline - Array Construction
 *
 * Master Array.from() and Array.of() for creating and transforming arrays.
 * Learn to convert iterables, array-like objects, and various data types
 * into arrays for processing.
 *
 * Array construction is essential for:
 * - Converting strings to character arrays
 * - Creating arrays from Sets and Maps
 * - Handling DOM collections and arguments
 * - Generating sequences and ranges
 * - Transforming data during creation
 */

// TODO: Complete the following functions using Array.from() and Array.of()

/**
 * stringToArray
 * Convert a string into an array of characters.
 * Example: 'hello' -> ['h', 'e', 'l', 'l', 'o']
 * 
 * Use Array.from()
 */
export function stringToArray(str) {
  // TODO: Implement using Array.from()
}

/**
 * createRange
 * Create array of numbers from start to end (inclusive).
 * Example: createRange(1, 5) -> [1, 2, 3, 4, 5]
 * 
 * Use Array.from() with length and mapping
 */
export function createRange(start, end) {
  // TODO: Implement using Array.from with mapping
}

/**
 * setToArray
 * Convert a Set to an array.
 * Example: new Set([1, 2, 3]) -> [1, 2, 3]
 * 
 * Use Array.from()
 */
export function setToArray(set) {
  // TODO: Implement using Array.from()
}

/**
 * mapToArray
 * Convert a Map to array of [key, value] pairs.
 * Example: new Map([['a', 1]]) -> [['a', 1]]
 * 
 * Use Array.from()
 */
export function mapToArray(map) {
  // TODO: Implement using Array.from()
}

/**
 * reverseString
 * Reverse a string using Array.from() and array methods.
 * Example: 'hello' -> 'olleh'
 * 
 * Use Array.from() then reverse() and join()
 */
export function reverseString(str) {
  // TODO: Implement using Array.from(), reverse, join
}

/**
 * arrayOf
 * Create an array from multiple arguments using Array.of().
 * Example: arrayOf(1, 2, 3) -> [1, 2, 3]
 * 
 * Use Array.of()
 */
export function arrayOf(...args) {
  // TODO: Implement using Array.of()
}

/**
 * transformRange
 * Create array of numbers 1 to n, transformed by function.
 * Example: transformRange(3, x => x * 2) -> [2, 4, 6]
 * 
 * Use Array.from() with mapping function
 */
export function transformRange(n, fn) {
  // TODO: Implement using Array.from with mapping
}

/**
 * countCharacters
 * Given a string, return object with character counts.
 * Example: 'aabbcc' -> { a: 2, b: 2, c: 2 }
 * 
 * Use Array.from() with reduce()
 */
export function countCharacters(str) {
  // TODO: Implement using Array.from() and reduce()
}

/**
 * createMatrix
 * Create 2D array (matrix) of given size, filled with fn(row, col) result.
 * Example: createMatrix(2, 2, (r,c) => r+c) -> [[0,1],[1,2]]
 * 
 * Use Array.from() nested
 */
export function createMatrix(rows, cols, fn) {
  // TODO: Implement using nested Array.from()
}

/**
 * uniqueCharacters
 * Given a string, return array of unique characters sorted.
 * Example: 'hello' -> ['e', 'h', 'l', 'o']
 * 
 * Use Array.from() with Set for uniqueness
 */
export function uniqueCharacters(str) {
  // TODO: Implement using Array.from(), Set, and sort()
}
