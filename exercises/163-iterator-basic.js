// Exercise 163: Iterator - Basic Iterator
// Implement Symbol.iterator for custom objects to make them iterable

/**
 * Create object with Symbol.iterator that counts from 1 to max
 * 
 * @param {number} max - Maximum value to count to
 * @returns {Object} Object with [Symbol.iterator] method
 * 
 * @example
 * const counter = createCounterIterator(3);
 * const values = [...counter]; // [1, 2, 3]
 */
export function createCounterIterator(max) {
  // TODO: Implement function
  // Should return object with [Symbol.iterator]
  // Iterator should yield values from 1 to max
}

/**
 * Create iterator that manually iterates through array items
 * 
 * @param {Array} array - Array to iterate through
 * @returns {Object} Object with next() method returning {value, done}
 * 
 * @example
 * const iter = createArrayIterator([1, 2, 3]);
 * iter.next(); // {value: 1, done: false}
 * iter.next(); // {value: 2, done: false}
 * iter.next(); // {value: undefined, done: true}
 */
export function createArrayIterator(array) {
  // TODO: Implement function
  // Should return object with next() method
  // Each next() should return {value, done} format
}

/**
 * Create iterator that only yields items matching predicate
 * 
 * @param {Array} array - Array to iterate
 * @param {Function} predicate - Function to test items
 * @returns {Object} Object with [Symbol.iterator] method
 * 
 * @example
 * const iter = createFilterIterator([1, 2, 3, 4], x => x > 2);
 * [...iter]; // [3, 4]
 */
export function createFilterIterator(array, predicate) {
  // TODO: Implement function
  // Should only yield items where predicate(item) is true
}

/**
 * Create iterator that returns adjacent pairs from array
 * 
 * @param {Array} array - Array to create pairs from
 * @returns {Object} Object with [Symbol.iterator] method
 * 
 * @example
 * const iter = createPairsIterator([1, 2, 3, 4]);
 * [...iter]; // [[1, 2], [2, 3], [3, 4]]
 */
export function createPairsIterator(array) {
  // TODO: Implement function
  // Should yield [current, next] pairs
  // For array of length n, yields n-1 pairs
}

/**
 * Create iterator that transforms items using mapping function
 * 
 * @param {Array} array - Array to iterate
 * @param {Function} mapFn - Function to transform each item
 * @returns {Object} Object with [Symbol.iterator] method
 * 
 * @example
 * const iter = createMapIterator([1, 2, 3], x => x * 2);
 * [...iter]; // [2, 4, 6]
 */
export function createMapIterator(array, mapFn) {
  // TODO: Implement function
  // Should transform each item using mapFn
  // Similar to Array.prototype.map but as iterator
}

/**
 * Create object that iterates through string characters
 * 
 * @param {string} str - String to iterate through
 * @returns {Object} Object with [Symbol.iterator] method
 * 
 * @example
 * const iter = makeIterableString("ABC");
 * [...iter]; // ['A', 'B', 'C']
 */
export function makeIterableString(str) {
  // TODO: Implement function
  // Should iterate through each character
  // Should work with for...of loops
}

/**
 * Create iterator from start to end with optional step
 * 
 * @param {number} start - Starting value
 * @param {number} end - Ending value (inclusive)
 * @param {number} step - Step size (default 1)
 * @returns {Object} Object with [Symbol.iterator] method
 * 
 * @example
 * const iter = createRangeIterator(1, 5, 2);
 * [...iter]; // [1, 3, 5]
 */
export function createRangeIterator(start, end, step = 1) {
  // TODO: Implement function
  // Should yield values from start to end by step
  // Should work with for...of loops
}

/**
 * Check if object implements the iterable protocol
 * 
 * @param {*} obj - Object to check
 * @returns {boolean} True if object has [Symbol.iterator]
 * 
 * @example
 * isIterable([1, 2, 3]); // true
 * isIterable("hello"); // true
 * isIterable({a: 1}); // false
 */
export function isIterable(obj) {
  // TODO: Implement function
  // Check if obj[Symbol.iterator] is a function
}

/**
 * Extract all values from an iterable into array
 * 
 * @param {Iterable} iterable - Any iterable object
 * @returns {Array} Array of all yielded values
 * 
 * @example
 * getIteratorValues("ABC"); // ['A', 'B', 'C']
 * getIteratorValues([1, 2, 3]); // [1, 2, 3]
 */
export function getIteratorValues(iterable) {
  // TODO: Implement function
  // Should work with any iterable (arrays, strings, custom iterators)
  // Can use spread operator or for...of
}

/**
 * Create iterator that yields pairs from two arrays in parallel
 * 
 * @param {Array} array1 - First array
 * @param {Array} array2 - Second array
 * @returns {Object} Object with [Symbol.iterator] method
 * 
 * @example
 * const iter = createZipIterator([1, 2], ['a', 'b']);
 * [...iter]; // [[1, 'a'], [2, 'b']]
 */
export function createZipIterator(array1, array2) {
  // TODO: Implement function
  // Should yield pairs until shortest array ends
  // Similar to Python's zip() function
}
