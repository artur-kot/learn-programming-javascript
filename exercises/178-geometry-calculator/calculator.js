/**
 * Main Geometry Calculator
 */

import * as math from '../175-math-library-setup/src/math.js';
import * as shapes from './shapes.js';
import * as conversions from './conversions.js';

/**
 * GeometryCalculator class
 * Provides interface for geometry calculations
 */
export class GeometryCalculator {
  constructor() {
    this.history = [];
  }

  /**
   * Calculate shape properties
   */
  calculate(shapeType, params, name = '') {
    try {
      const result = shapes.shapeProperties(shapeType, ...params);
      const calculation = {
        timestamp: new Date().toISOString(),
        shape: shapeType,
        params,
        result,
        name
      };
      this.history.push(calculation);
      return result;
    } catch (error) {
      throw new Error(`Calculation failed for ${shapeType}: ${error.message}`);
    }
  }

  /**
   * Convert units
   */
  convert(value, fromUnit, toUnit, conversionType = 'length') {
    const converter = conversions[conversionType];
    if (!converter) {
      throw new Error(`Unknown conversion type: ${conversionType}`);
    }

    const key = `${fromUnit}To${toUnit.charAt(0).toUpperCase()}${toUnit.slice(1)}`;
    if (!converter[key]) {
      throw new Error(`Cannot convert from ${fromUnit} to ${toUnit}`);
    }

    return converter[key](value);
  }

  /**
   * Get calculation history
   */
  getHistory() {
    return this.history;
  }

  /**
   * Clear history
   */
  clearHistory() {
    this.history = [];
  }

  /**
   * Get last calculation
   */
  getLastCalculation() {
    return this.history[this.history.length - 1];
  }
}

/**
 * Helper functions for common calculations
 */
export function calculateCircleArea(radius) {
  return shapes.circle(radius).area;
}

export function calculateRectangleArea(length, width) {
  return shapes.rectangle(length, width).area;
}

export function calculateTriangleArea(a, b, c) {
  return shapes.triangle(a, b, c).area;
}

export function calculateSphereVolume(radius) {
  return shapes.sphere(radius).volume;
}

export function calculateCylinderVolume(radius, height) {
  return shapes.cylinder(radius, height).volume;
}

/**
 * Format calculation result for display
 */
export function formatResult(result, decimals = 2) {
  const formatted = {};

  for (const [key, value] of Object.entries(result)) {
    if (typeof value === 'number') {
      formatted[key] = math.round(value, decimals);
    } else {
      formatted[key] = value;
    }
  }

  return formatted;
}

/**
 * Print calculation result
 */
export function printCalculation(shapeName, result) {
  console.log(`\n📐 ${shapeName}`);
  console.log('─'.repeat(40));

  const formatted = formatResult(result);

  for (const [key, value] of Object.entries(formatted)) {
    const label = key.replace(/_/g, ' ');
    console.log(`${label}: ${value}`);
  }
}

export default GeometryCalculator;
