// Exercise 167: Iterator - Generator Composition
// Compose and chain multiple generators for complex transformations

/**
 * Compose two generator functions into one
 * 
 * @param {Function} gen1 - First generator function
 * @param {Function} gen2 - Second generator function
 * @returns {Function} Composed generator function
 * 
 * @example
 * function* doubled(arr) {
 *   for (const x of arr) yield x * 2;
 * }
 * function* evens(gen) {
 *   for (const x of gen) if (x % 2 === 0) yield x;
 * }
 * const composed = compose(doubled, evens);
 * [...composed([1, 2, 3])]; // [4]
 */
export function compose(gen1, gen2) {
  // TODO: Implement compose
  // Return function that takes input, applies gen1, then gen2
}

/**
 * Chain multiple transformations left-to-right
 * 
 * @param {Array} transformers - Array of transformer functions
 * @returns {Function} Function that applies all transformers in sequence
 * 
 * @example
 * function* add10(arr) { for (const x of arr) yield x + 10; }
 * function* double(arr) { for (const x of arr) yield x * 2; }
 * const transform = pipe([add10, double]);
 * [...transform([1, 2, 3])]; // [22, 24, 26]
 */
export function pipe(transformers) {
  // TODO: Implement pipe
  // Reduce transformers to apply each in order
  // Each transformer wraps the previous
}

/**
 * Transform each yielded value with function
 * 
 * @param {Generator} generator - Source generator
 * @param {Function} fn - Transformation function
 * @yields {*} Transformed values
 * 
 * @example
 * function* source() { yield 1; yield 2; yield 3; }
 * const mapped = map(source(), x => x * 2);
 * [...mapped]; // [2, 4, 6]
 */
export function* map(generator, fn) {
  // TODO: Implement map
  // Yield fn(value) for each yielded value
}

/**
 * Only yield values matching predicate
 * 
 * @param {Generator} generator - Source generator
 * @param {Function} predicate - Test function
 * @yields {*} Values where predicate(value) is true
 * 
 * @example
 * function* source() { yield 1; yield 2; yield 3; }
 * const filtered = filter(source(), x => x > 1);
 * [...filtered]; // [2, 3]
 */
export function* filter(generator, predicate) {
  // TODO: Implement filter
  // Yield only values where predicate returns truthy
}

/**
 * Map then flatten results one level
 * 
 * @param {Generator} generator - Source generator
 * @param {Function} fn - Function returning iterable
 * @yields {*} Flattened values
 * 
 * @example
 * function* source() { yield 1; yield 2; }
 * const flat = flatMap(source(), x => [x, x * 10]);
 * [...flat]; // [1, 10, 2, 20]
 */
export function* flatMap(generator, fn) {
  // TODO: Implement flatMap
  // For each value, call fn to get iterable
  // Yield each item from the iterable
}

/**
 * Yield until predicate becomes true
 * 
 * @param {Generator} generator - Source generator
 * @param {Function} predicate - Stop condition
 * @yields {*} Values until condition met
 * 
 * @example
 * function* source() { yield 1; yield 2; yield 3; }
 * const limited = takeUntil(source(), x => x > 2);
 * [...limited]; // [1, 2]
 */
export function* takeUntil(generator, predicate) {
  // TODO: Implement takeUntil
  // Yield values until predicate(value) is true
}

/**
 * Skip while condition true, yield rest
 * 
 * @param {Generator} generator - Source generator
 * @param {Function} predicate - Skip condition
 * @yields {*} Values after condition becomes false
 * 
 * @example
 * function* source() { yield 1; yield 2; yield 3; }
 * const dropped = dropWhile(source(), x => x < 2);
 * [...dropped]; // [2, 3]
 */
export function* dropWhile(generator, predicate) {
  // TODO: Implement dropWhile
  // Skip while predicate is true, then yield rest
}

/**
 * Group consecutive items into arrays
 * 
 * @param {Generator} generator - Source generator
 * @param {number} size - Chunk size
 * @yields {Array} Arrays of consecutive items
 * 
 * @example
 * function* source() { yield 1; yield 2; yield 3; yield 4; }
 * const chunks = chunk(source(), 2);
 * [...chunks]; // [[1, 2], [3, 4]]
 */
export function* chunk(generator, size) {
  // TODO: Implement chunk
  // Group items into arrays of given size
  // Last chunk may be smaller
}

/**
 * Alternate values from two generators
 * 
 * @param {Generator} gen1 - First generator
 * @param {Generator} gen2 - Second generator
 * @yields {*} Alternating values from both
 * 
 * @example
 * function* source1() { yield 1; yield 2; }
 * function* source2() { yield 'a'; yield 'b'; }
 * const interleaved = interleave(source1(), source2());
 * [...interleaved]; // [1, 'a', 2, 'b']
 */
export function* interleave(gen1, gen2) {
  // TODO: Implement interleave
  // Alternately yield from each generator
}

/**
 * Combine multiple generators sequentially
 * 
 * @param {Array} generators - Array of generator objects
 * @yields {*} All values from all generators in sequence
 * 
 * @example
 * function* first() { yield 1; yield 2; }
 * function* second() { yield 3; yield 4; }
 * const chained = chain([first(), second()]);
 * [...chained]; // [1, 2, 3, 4]
 */
export function* chain(generators) {
  // TODO: Implement chain
  // Yield from each generator until exhausted
  // Then move to next
}
