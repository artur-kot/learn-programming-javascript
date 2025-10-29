/**
 * Utility Functions
 *
 * Helper functions for common operations.
 * Using lodash for production-quality utilities.
 */

import { isEqual, cloneDeep, debounce, throttle } from "lodash-es";
import { format, formatDistanceToNow } from "date-fns";

/**
 * Price formatting utility
 * @param {number} cents - Price in cents
 * @param {string} [currency] - Currency code (default: USD)
 * @returns {string} Formatted price
 */
export const formatPrice = (cents, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
};

/**
 * Date formatting utility
 * @param {Date} date - Date to format
 * @param {string} [pattern] - Format pattern
 * @returns {string} Formatted date
 */
export const formatDate = (date, pattern = "MMM d, yyyy") => {
  return format(new Date(date), pattern);
};

/**
 * Date distance utility (e.g., "2 hours ago")
 * @param {Date} date - Date to compare
 * @returns {string} Relative time string
 */
export const getTimeAgo = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

/**
 * Throttle async function
 * @param {Function} func - Function to throttle
 * @param {number} wait - Wait time in ms
 * @returns {Function} Throttled function
 */
export const throttleAsync = (func, wait) => {
  return throttle(func, wait);
};

/**
 * Debounce async function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export const debounceAsync = (func, wait) => {
  return debounce(func, wait);
};

/**
 * Deep clone object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export const deepClone = (obj) => {
  return cloneDeep(obj);
};

/**
 * Deep equality check
 * @param {*} value1 - First value
 * @param {*} value2 - Second value
 * @returns {boolean} True if equal
 */
export const deepEqual = (value1, value2) => {
  return isEqual(value1, value2);
};

/**
 * Get random element from array
 * @param {Array} arr - Array to pick from
 * @returns {*} Random element
 */
export const getRandomElement = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * Shuffle array (Fisher-Yates)
 * @param {Array} arr - Array to shuffle
 * @returns {Array} Shuffled copy
 */
export const shuffleArray = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

/**
 * Group array by key
 * @param {Array} arr - Array to group
 * @param {string|Function} keyOrFn - Property name or function
 * @returns {Object} Grouped object
 */
export const groupBy = (arr, keyOrFn) => {
  return arr.reduce((acc, item) => {
    const key = typeof keyOrFn === "function" ? keyOrFn(item) : item[keyOrFn];
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
};

/**
 * Calculate percentage
 * @param {number} value - Value
 * @param {number} total - Total
 * @returns {number} Percentage
 */
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

/**
 * Generate unique ID
 * @param {string} [prefix] - ID prefix
 * @returns {string} Unique ID
 */
export const generateId = (prefix = "") => {
  return `${prefix}${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
