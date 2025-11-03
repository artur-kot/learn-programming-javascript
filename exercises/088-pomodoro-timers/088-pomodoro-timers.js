// TODO: Implement the timer functions below.
// This exercise combines setTimeout (one-time delays) and setInterval (repeated execution).

// ===== setTimeout Functions =====

/**
 * Execute a callback after specified milliseconds
 * @param {Function} callback - Function to execute
 * @param {number} delayMs - Delay in milliseconds
 * @param {...*} args - Arguments to pass to callback
 * @returns {number} Timeout ID
 */
export function runAfterDelay(callback, delayMs, ...args) {
  // TODO: Implement using setTimeout
}

/**
 * Execute a callback after specified seconds
 * @param {Function} callback - Function to execute
 * @param {number} seconds - Delay in seconds
 * @returns {number} Timeout ID
 */
export function runAfterSeconds(callback, seconds) {
  // TODO: Implement by converting seconds to milliseconds
}

/**
 * Return a promise that resolves after delay with greeting
 * @param {string} name - Person's name
 * @param {number} delayMs - Delay in milliseconds
 * @returns {Promise} Promise that resolves to greeting
 */
export function delayedGreeting(name, delayMs) {
  // TODO: Implement using Promise and setTimeout
}

/**
 * Start a countdown that calls callback after duration
 * @param {number} seconds - Duration in seconds
 * @param {Function} onComplete - Callback when countdown finishes
 * @returns {number} Timeout ID
 */
export function countdownStart(seconds, onComplete) {
  // TODO: Implement using runAfterSeconds
}

/**
 * Create a timer object with start method
 * @returns {object} Timer object with start method
 */
export function createTimer() {
  // TODO: Implement timer object that has start(seconds, callback) method
}

// ===== setInterval Functions =====

/**
 * Count down from seconds to 0, calling onTick each interval
 * @param {number} seconds - Starting seconds
 * @param {Function} onTick - Callback called each interval
 * @returns {number} Interval ID
 */
export function tickingCountdown(seconds, onTick) {
  // TODO: Implement using setInterval
}

/**
 * Create a countdown timer object with start method
 * @returns {object} Timer object with start method
 */
export function createCountdownTimer() {
  // TODO: Implement timer object that has start(seconds, onTick) method
}

/**
 * Track elapsed time and call onTick each second
 * @param {Function} onTick - Callback called each interval with elapsed time
 * @returns {number} Interval ID
 */
export function stopwatch(onTick) {
  // TODO: Implement using setInterval
}

/**
 * Create a work session with onTick updates
 * @param {number} durationSeconds - Session duration in seconds
 * @param {Function} onTick - Callback each interval
 * @param {Function} onComplete - Callback when session ends
 * @returns {number} Interval ID
 */
export function pomodoroSession(durationSeconds, onTick, onComplete) {
  // TODO: Implement using setInterval
}

/**
 * Run work and break periods alternately
 * @param {number} workSeconds - Work period duration
 * @param {number} breakSeconds - Break period duration
 * @param {Function} onUpdate - Callback with status updates
 * @returns {object} Cycle object with start and stop methods
 */
export function pomodoroWorkBreakCycle(workSeconds, breakSeconds, onUpdate) {
  // TODO: Implement work/break cycle
}
