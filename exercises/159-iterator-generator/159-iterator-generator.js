// Exercise 164: Iterator - Generator Functions
// Use generator functions with yield to create simple iterators

/**
 * Generator function that yields numbers from 1 to max
 * 
 * @param {number} max - Maximum value to count to
 * @yields {number} Values from 1 to max
 * 
 * @example
 * for (const n of generateCounts(3)) {
 *   console.log(n); // 1, 2, 3
 * }
 */
export function* generateCounts(max) {
  // TODO: Implement generator
  // Use yield to return each value
  // Should work with for...of loops
}

/**
 * Generator function that yields Fibonacci sequence
 * 
 * @param {number} count - How many Fibonacci numbers to generate
 * @yields {number} Fibonacci numbers
 * 
 * @example
 * [...generateFibonacci(5)]; // [1, 1, 2, 3, 5]
 */
export function* generateFibonacci(count) {
  // TODO: Implement generator
  // Yield Fibonacci sequence: 1, 1, 2, 3, 5, 8, ...
}

/**
 * Generator function for numeric range with step
 * 
 * @param {number} start - Starting value
 * @param {number} end - Ending value (inclusive)
 * @param {number} step - Step size (default 1)
 * @yields {number} Values in range
 * 
 * @example
 * [...generateRange(1, 5, 2)]; // [1, 3, 5]
 */
export function* generateRange(start, end, step = 1) {
  // TODO: Implement generator
  // Yield values from start to end by step
}

/**
 * Generator that yields only even numbers from array
 * 
 * @param {Array} array - Array to process
 * @yields {number} Even numbers from array
 * 
 * @example
 * [...generateEvens([1, 2, 3, 4])]; // [2, 4]
 */
export function* generateEvens(array) {
  // TODO: Implement generator
  // Yield only items where item % 2 === 0
}

/**
 * Generator that yields characters from string
 * 
 * @param {string} str - String to iterate
 * @yields {string} Individual characters
 * 
 * @example
 * [...generateLetters("Hi")]; // ['H', 'i']
 */
export function* generateLetters(str) {
  // TODO: Implement generator
  // Yield each character of string
}

/**
 * Generator that yields words from text
 * 
 * @param {string} text - Text to split into words
 * @yields {string} Individual words
 * 
 * @example
 * [...generateWords("Hello World Test")]; // ['Hello', 'World', 'Test']
 */
export function* generateWords(text) {
  // TODO: Implement generator
  // Split text by spaces, yield each word
}

/**
 * Generator that yields matching items from array
 * 
 * @param {Array} array - Array to filter
 * @param {Function} predicate - Test function
 * @yields {*} Items where predicate(item) is true
 * 
 * @example
 * [...generateMatches([1, 2, 3, 4], x => x > 2)]; // [3, 4]
 */
export function* generateMatches(array, predicate) {
  // TODO: Implement generator
  // Yield items matching predicate
}

/**
 * Generator that transforms items with function
 * 
 * @param {Array} array - Array to transform
 * @param {Function} mapFn - Transformation function
 * @yields {*} Transformed values
 * 
 * @example
 * [...generateMapped([1, 2, 3], x => x * 2)]; // [2, 4, 6]
 */
export function* generateMapped(array, mapFn) {
  // TODO: Implement generator
  // Yield mapFn(item) for each item
}

/**
 * Generator that yields adjacent pairs from array
 * 
 * @param {Array} array - Array to pair
 * @yields {Array} Adjacent [current, next] pairs
 * 
 * @example
 * [...generatePairs([1, 2, 3])]; // [[1, 2], [2, 3]]
 */
export function* generatePairs(array) {
  // TODO: Implement generator
  // Yield [current, next] for adjacent elements
}

/**
 * Generator that repeats value n times
 * 
 * @param {*} value - Value to repeat
 * @param {number} times - How many times to repeat
 * @yields {*} The value, repeated
 * 
 * @example
 * [...generateRepeated('x', 3)]; // ['x', 'x', 'x']
 */
export function* generateRepeated(value, times) {
  // TODO: Implement generator
  // Yield value 'times' times
}
