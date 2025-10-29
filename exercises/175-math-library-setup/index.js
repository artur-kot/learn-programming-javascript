/**
 * Main entry point for Math Library
 * Exports all modules for convenient importing
 */

// Export all math functions
export * as math from './src/math.js';

// Export all trigonometry functions
export * as trig from './src/trigonometry.js';

// Export all statistics functions
export * as stats from './src/statistics.js';

// For default import convenience
import * as mathFuncs from './src/math.js';
import * as trigFuncs from './src/trigonometry.js';
import * as statsFuncs from './src/statistics.js';

export default {
  math: mathFuncs,
  trig: trigFuncs,
  stats: statsFuncs,
};
