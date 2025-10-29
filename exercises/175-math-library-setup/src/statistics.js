/**
 * Statistics Utilities
 * Basic statistical functions for data analysis
 */

/**
 * Calculate the sum of an array of numbers
 * @param {number[]} numbers - Array of numbers
 * @returns {number} Sum of all numbers
 */
export function sum(numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

/**
 * Calculate the mean (average) of an array
 * @param {number[]} numbers - Array of numbers
 * @returns {number} Mean value
 * @throws {Error} If array is empty
 */
export function mean(numbers) {
  if (numbers.length === 0) throw new Error('Cannot calculate mean of empty array');
  return sum(numbers) / numbers.length;
}

/**
 * Calculate the median of an array
 * @param {number[]} numbers - Array of numbers
 * @returns {number} Median value
 */
export function median(numbers) {
  if (numbers.length === 0) throw new Error('Cannot calculate median of empty array');
  
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  
  // If odd length, return middle value; if even, return average of two middle values
  if (sorted.length % 2 !== 0) {
    return sorted[mid];
  }
  return (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * Calculate the mode (most frequent value) of an array
 * @param {number[]} numbers - Array of numbers
 * @returns {number|null} Mode value, or null if no mode
 */
export function mode(numbers) {
  if (numbers.length === 0) return null;
  
  const frequency = {};
  let maxCount = 0;
  let modeValue = null;
  
  for (const num of numbers) {
    frequency[num] = (frequency[num] || 0) + 1;
    
    if (frequency[num] > maxCount) {
      maxCount = frequency[num];
      modeValue = num;
    }
  }
  
  return maxCount > 1 ? modeValue : null;
}

/**
 * Calculate the range of an array
 * @param {number[]} numbers - Array of numbers
 * @returns {number} Range (max - min)
 */
export function range(numbers) {
  if (numbers.length === 0) throw new Error('Cannot calculate range of empty array');
  
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);
  return max - min;
}

/**
 * Calculate variance of an array
 * Variance measures how spread out data is
 * @param {number[]} numbers - Array of numbers
 * @returns {number} Variance
 */
export function variance(numbers) {
  if (numbers.length === 0) throw new Error('Cannot calculate variance of empty array');
  
  const avg = mean(numbers);
  const squaredDifferences = numbers.map(num => (num - avg) ** 2);
  return squaredDifferences.reduce((total, diff) => total + diff, 0) / numbers.length;
}

/**
 * Calculate standard deviation of an array
 * Measures how spread out data is from the mean
 * @param {number[]} numbers - Array of numbers
 * @returns {number} Standard deviation
 */
export function standardDeviation(numbers) {
  return Math.sqrt(variance(numbers));
}

/**
 * Calculate percentile of a value in an array
 * @param {number[]} numbers - Array of numbers
 * @param {number} value - Value to find percentile for
 * @returns {number} Percentile (0-100)
 */
export function percentile(numbers, value) {
  if (numbers.length === 0) throw new Error('Cannot calculate percentile of empty array');
  
  const sorted = [...numbers].sort((a, b) => a - b);
  const count = sorted.filter(num => num <= value).length;
  return (count / sorted.length) * 100;
}

/**
 * Calculate correlation between two arrays
 * Values close to 1 = strong positive correlation
 * Values close to -1 = strong negative correlation
 * @param {number[]} x - First array of numbers
 * @param {number[]} y - Second array of numbers
 * @returns {number} Correlation coefficient (-1 to 1)
 */
export function correlation(x, y) {
  if (x.length !== y.length) throw new Error('Arrays must have same length');
  if (x.length === 0) throw new Error('Cannot calculate correlation of empty arrays');
  
  const meanX = mean(x);
  const meanY = mean(y);
  
  const numerator = x.reduce((sum, xi, i) => {
    return sum + (xi - meanX) * (y[i] - meanY);
  }, 0);
  
  const sumSquaredX = x.reduce((sum, xi) => sum + (xi - meanX) ** 2, 0);
  const sumSquaredY = y.reduce((sum, yi) => sum + (yi - meanY) ** 2, 0);
  
  const denominator = Math.sqrt(sumSquaredX * sumSquaredY);
  
  if (denominator === 0) return 0;
  return numerator / denominator;
}
