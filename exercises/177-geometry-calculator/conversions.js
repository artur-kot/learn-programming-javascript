/**
 * Unit Conversion Utilities
 * Convert between different measurement units
 */

import * as math from '../175-math-library-setup/src/math.js';

/**
 * Length conversions
 */
export const length = {
  // Millimeters
  mmToCm: (mm) => mm / 10,
  mmToMeters: (mm) => mm / 1000,
  mmToKm: (mm) => mm / 1_000_000,
  mmToInches: (mm) => mm / 25.4,
  mmToFeet: (mm) => mm / 304.8,
  mmToMiles: (mm) => mm / 1_609_344,

  // Centimeters
  cmToMm: (cm) => cm * 10,
  cmToMeters: (cm) => cm / 100,
  cmToInches: (cm) => cm / 2.54,
  cmToFeet: (cm) => cm / 30.48,

  // Meters
  metersToMm: (m) => m * 1000,
  metersToCm: (m) => m * 100,
  metersToKm: (m) => m / 1000,
  metersToFeet: (m) => m * 3.28084,
  metersToMiles: (m) => m / 1609.34,

  // Kilometers
  kmToMeters: (km) => km * 1000,
  kmToMiles: (km) => km * 0.621371,

  // Inches
  inchesToMm: (inches) => inches * 25.4,
  inchesToCm: (inches) => inches * 2.54,
  inchesToFeet: (inches) => inches / 12,
  inchesToMeters: (inches) => inches * 0.0254,

  // Feet
  feetToInches: (feet) => feet * 12,
  feetToMeters: (feet) => feet * 0.3048,
  feetToMiles: (feet) => feet / 5280,

  // Miles
  milesToKm: (miles) => miles * 1.60934,
  milesToMeters: (miles) => miles * 1609.34,
  milesToFeet: (miles) => miles * 5280,
};

/**
 * Area conversions
 */
export const area = {
  // Square meters
  m2ToCm2: (m2) => m2 * 10000,
  m2ToMm2: (m2) => m2 * 1_000_000,
  m2ToKm2: (m2) => m2 / 1_000_000,
  m2ToInches2: (m2) => m2 * 1550,
  m2ToFeet2: (m2) => m2 * 10.764,
  m2ToMiles2: (m2) => m2 / 2_590_000,

  // Square kilometers
  km2ToM2: (km2) => km2 * 1_000_000,
  km2ToMiles2: (km2) => km2 * 0.386102,

  // Square feet
  feet2ToM2: (feet2) => feet2 * 0.092903,
  feet2ToInches2: (feet2) => feet2 * 144,

  // Square miles
  miles2ToKm2: (miles2) => miles2 * 2.58999,
  miles2ToM2: (miles2) => miles2 * 2_589_988,

  // Hectares
  hectaresToM2: (ha) => ha * 10000,
  hectaresToKm2: (ha) => ha / 100,
  hectaresToMiles2: (ha) => ha * 0.00386102,
};

/**
 * Volume conversions
 */
export const volume = {
  // Cubic meters
  m3ToLiters: (m3) => m3 * 1000,
  m3ToMilliliters: (m3) => m3 * 1_000_000,
  m3ToGallons: (m3) => m3 * 264.172,

  // Liters
  litersToM3: (liters) => liters / 1000,
  litersToMilliliters: (liters) => liters * 1000,
  litersToGallons: (liters) => liters * 0.264172,

  // Gallons
  gallonsToLiters: (gallons) => gallons * 3.78541,
  gallonsToM3: (gallons) => gallons * 0.00378541,

  // Milliliters
  millilitersToLiters: (ml) => ml / 1000,
  millilitersToM3: (ml) => ml / 1_000_000,
};

/**
 * Angle conversions
 */
export const angle = {
  // Degrees
  degreesToRadians: (deg) => (deg * Math.PI) / 180,
  degreesToGradians: (deg) => deg * (10 / 9),
  degreesToTurns: (deg) => deg / 360,

  // Radians
  radiansToDegrees: (rad) => (rad * 180) / Math.PI,
  radiansToGradians: (rad) => rad * (200 / Math.PI),

  // Gradians
  gradiansToDegrees: (grad) => grad * (9 / 10),
  gradiansToRadians: (grad) => grad * (Math.PI / 200),

  // Turns
  turnsToDegrees: (turns) => turns * 360,
};

/**
 * Format measurement for display
 */
export function formatMeasurement(value, unit) {
  const rounded = math.round(value, 2);
  return `${rounded} ${unit}`;
}

/**
 * Pretty print conversions
 */
export function printConversion(value, fromUnit, conversions) {
  console.log(`\n${value} ${fromUnit} equals:`);
  for (const [unit, converted] of Object.entries(conversions)) {
    console.log(`  • ${math.round(converted, 4)} ${unit}`);
  }
}
