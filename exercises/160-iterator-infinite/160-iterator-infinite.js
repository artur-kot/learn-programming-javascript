// Exercise 165: Iterator - Infinite Sequences
// Create infinite generators and work with lazy evaluation

/**
 * Generator that counts infinitely from 1
 * 
 * @yields {number} Values 1, 2, 3, ... infinitely
 * 
 * @example
 * const counter = infiniteCount();
 * counter.next().value; // 1
 * counter.next().value; // 2
 * 
 * // Get first 5 with take():
 * take(infiniteCount(), 5); // [1, 2, 3, 4, 5]
 */
export function* infiniteCount() {
  // TODO: Implement infinite counter
  // Yield 1, 2, 3, ... forever
  // Use take() to limit results
}

/**
 * Generator that infinitely repeats array items
 * 
 * @param {Array} array - Array to repeat
 * @yields {*} Items from array, cycling forever
 * 
 * @example
 * take(infiniteRepeating(['a', 'b']), 5); // ['a', 'b', 'a', 'b', 'a']
 */
export function* infiniteRepeating(array) {
  // TODO: Implement infinite repeating
  // Cycle through array items forever
}

/**
 * Generator that yields infinite Fibonacci sequence
 * 
 * @yields {number} Fibonacci numbers: 1, 1, 2, 3, 5, 8, ...
 * 
 * @example
 * take(infiniteFibonacci(), 6); // [1, 1, 2, 3, 5, 8]
 */
export function* infiniteFibonacci() {
  // TODO: Implement infinite Fibonacci
  // Yield Fibonacci sequence forever
}

/**
 * Generator that yields perfect squares infinitely
 * 
 * @yields {number} Perfect squares: 1, 4, 9, 16, 25, ...
 * 
 * @example
 * take(infiniteSquares(), 4); // [1, 4, 9, 16]
 */
export function* infiniteSquares() {
  // TODO: Implement infinite squares
  // Yield 1^2, 2^2, 3^2, ... forever
}

/**
 * Generator that yields powers of a base infinitely
 * 
 * @param {number} base - Base value
 * @yields {number} Powers: base^1, base^2, base^3, ...
 * 
 * @example
 * take(infinitePowers(2), 5); // [2, 4, 8, 16, 32]
 */
export function* infinitePowers(base) {
  // TODO: Implement infinite powers
  // Yield base^1, base^2, base^3, ... forever
}

/**
 * Take first n items from any iterable
 * 
 * @param {Iterable} iterable - Source iterable (can be infinite)
 * @param {number} n - Number of items to take
 * @returns {Array} First n items
 * 
 * @example
 * take([1, 2, 3, 4, 5], 3); // [1, 2, 3]
 * take(infiniteCount(), 5); // [1, 2, 3, 4, 5]
 */
export function take(iterable, n) {
  // TODO: Implement take
  // Extract first n items and stop
  // Works with infinite iterables
}

/**
 * Take items while predicate is true
 * 
 * @param {Iterable} iterable - Source iterable
 * @param {Function} predicate - Test function
 * @returns {Array} Items while condition holds
 * 
 * @example
 * takeWhile([1, 2, 3, 4, 1], x => x < 4); // [1, 2, 3]
 * takeWhile(infiniteCount(), x => x < 5); // [1, 2, 3, 4]
 */
export function takeWhile(iterable, predicate) {
  // TODO: Implement takeWhile
  // Extract items while predicate is true
}

/**
 * Skip first n items from iterable
 * 
 * @param {Iterable} iterable - Source iterable
 * @param {number} n - Number of items to skip
 * @returns {Array} Remaining items after skipping
 * 
 * @example
 * skip([1, 2, 3, 4, 5], 2); // [3, 4, 5]
 * skip("ABCDE", 1); // ['B', 'C', 'D', 'E']
 */
export function skip(iterable, n) {
  // TODO: Implement skip
  // Skip first n items, collect remaining
}

/**
 * Create infinite cycle from array items
 * 
 * @param {Array} array - Array to cycle
 * @yields {*} Items repeating infinitely
 * 
 * @example
 * take(cycle([1, 2, 3]), 7); // [1, 2, 3, 1, 2, 3, 1]
 */
export function* cycle(array) {
  // TODO: Implement cycle
  // Repeat array items infinitely
  // Similar to infiniteRepeating
}

/**
 * Take every nth item from iterable
 * 
 * @param {Iterable} iterable - Source iterable
 * @param {number} n - Take every nth item
 * @returns {Array} Every nth item from iterable
 * 
 * @example
 * takeEvery([1, 2, 3, 4, 5, 6, 7], 2); // [2, 4, 6]
 * takeEvery("ABCDEFG", 3); // ['C', 'F']
 */
export function takeEvery(iterable, n) {
  // TODO: Implement takeEvery
  // Collect every nth item (0-indexed)
}
