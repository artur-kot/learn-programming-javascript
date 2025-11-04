/**
 * Test Suite for Geometry Calculator
 */

import { GeometryCalculator, formatResult } from './calculator.js';
import * as shapes from './shapes.js';
import * as conversions from './conversions.js';
import * as math from '../175-math-library-setup/src/math.js';

const green = '\x1b[32m';
const red = '\x1b[31m';
const reset = '\x1b[0m';

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`${green}✓${reset} ${testName}`);
    passed++;
  } else {
    console.log(`${red}✗${reset} ${testName}`);
    failed++;
  }
}

function assertClose(actual, expected, tolerance, testName) {
  const diff = Math.abs(actual - expected);
  assert(diff <= tolerance, testName);
}

console.log('Testing Geometry Calculator\n');

// Test 1: Rectangle calculations
const rect = shapes.rectangle(5, 3);
assert(rect.area === 15, 'Rectangle area calculation (5×3=15)');
assert(rect.perimeter === 16, 'Rectangle perimeter calculation');
assertClose(rect.diagonal, 5.83, 0.01, 'Rectangle diagonal (Pythagorean)');

// Test 2: Square calculations
const sq = shapes.square(4);
assert(sq.area === 16, 'Square area calculation (4×4=16)');
assert(sq.perimeter === 16, 'Square perimeter calculation (4×4)');
assertClose(sq.diagonal, 5.66, 0.01, 'Square diagonal (4√2)');

// Test 3: Right triangle
const rightTri = shapes.rightTriangle(3, 4);
assert(rightTri.area === 6, 'Right triangle area (3×4/2=6)');
assert(rightTri.hypotenuse === 5, 'Right triangle hypotenuse (3-4-5)');
assert(rightTri.perimeter === 12, 'Right triangle perimeter (3+4+5)');

// Test 4: Triangle by sides (Heron's formula)
const tri = shapes.triangle(5, 5, 6);
assertClose(tri.area, 12, 0.01, 'Triangle area using Heron\'s formula');
assert(tri.perimeter === 16, 'Triangle perimeter');

// Test 5: Circle calculations
const circ = shapes.circle(5);
assertClose(circ.area, 78.54, 0.01, 'Circle area (π×5²)');
assertClose(circ.circumference, 31.42, 0.01, 'Circle circumference (2π×5)');
assert(circ.diameter === 10, 'Circle diameter (2×5)');

// Test 6: Ellipse calculations
const ellip = shapes.ellipse(5, 3);
assertClose(ellip.area, 47.12, 0.01, 'Ellipse area (π×5×3)');
assert(ellip.perimeter > 0, 'Ellipse perimeter > 0');

// Test 7: Regular polygon (hexagon)
const hex = shapes.regularPolygon(6, 2);
assert(hex.perimeter === 12, 'Hexagon perimeter (6×2)');
assert(hex.area > 0, 'Hexagon area > 0');

// Test 8: Sphere calculations
const sphere = shapes.sphere(3);
assertClose(sphere.volume, 113.1, 0.1, 'Sphere volume (4/3×π×3³)');
assertClose(sphere.surface_area, 113.1, 0.1, 'Sphere surface area (4π×3²)');

// Test 9: Cube calculations
const cube = shapes.cube(4);
assert(cube.volume === 64, 'Cube volume (4³=64)');
assert(cube.surface_area === 96, 'Cube surface area (6×4²)');
assertClose(cube.diagonal, 6.93, 0.01, 'Cube diagonal (4√3)');

// Test 10: Rectangular box
const box = shapes.box(5, 4, 3);
assert(box.volume === 60, 'Box volume (5×4×3)');
assert(box.surface_area === 94, 'Box surface area');
assertClose(box.diagonal, 7.07, 0.01, 'Box diagonal');

// Test 11: Cylinder
const cyl = shapes.cylinder(2, 5);
assertClose(cyl.volume, 62.83, 0.01, 'Cylinder volume (π×2²×5)');
assertClose(cyl.lateral_area, 62.83, 0.01, 'Cylinder lateral area');

// Test 12: Cone
const cone = shapes.cone(2, 4);
assertClose(cone.volume, 16.76, 0.01, 'Cone volume (1/3×π×2²×4)');
assert(cone.slant_height > 0, 'Cone slant height > 0');

// Test 13: Pyramid
const pyr = shapes.pyramid(4, 5);
assertClose(pyr.volume, 26.67, 0.01, 'Pyramid volume (1/3×4²×5)');
assert(pyr.slant_height > 0, 'Pyramid slant height > 0');

// Test 14: Length conversions
assertClose(conversions.length.metersToFeet(1), 3.28084, 0.001, 'Meters to feet');
assertClose(conversions.length.feetToMeters(3.28084), 1, 0.001, 'Feet to meters');
assertClose(conversions.length.kmToMiles(1.60934), 1, 0.001, 'Km to miles');

// Test 15: Area conversions
assertClose(conversions.area.m2ToFeet2(1), 10.764, 0.01, 'Sq meters to sq feet');
assertClose(conversions.area.hectaresToM2(1), 10000, 0.01, 'Hectares to sq meters');

// Test 16: Volume conversions
assertClose(conversions.volume.m3ToLiters(1), 1000, 0.01, 'Cubic meters to liters');
assertClose(conversions.volume.litersToGallons(3.78541), 1, 0.01, 'Liters to gallons');

// Test 17: Angle conversions
assertClose(conversions.angle.degreesToRadians(180), Math.PI, 0.01, 'Degrees to radians');
assertClose(conversions.angle.radiansToDegrees(Math.PI), 180, 0.01, 'Radians to degrees');

// Test 18: Error handling - negative dimension
try {
  shapes.circle(-5);
  assert(false, 'Should throw error for negative radius');
} catch (e) {
  assert(true, 'Correctly throws error for negative radius');
}

// Test 19: Error handling - invalid triangle
try {
  shapes.triangle(1, 2, 10);
  assert(false, 'Should throw error for invalid triangle');
} catch (e) {
  assert(true, 'Correctly throws error for invalid triangle sides');
}

// Test 20: GeometryCalculator class
const calculator = new GeometryCalculator();
const result = calculator.calculate('circle', [5], 'Test Circle');
assert(result.area > 0, 'Calculator performs calculation');
assert(calculator.getHistory().length === 1, 'Calculator stores history');

// Test 21: Calculator history
calculator.calculate('rectangle', [4, 5], 'Test Rectangle');
assert(calculator.getHistory().length === 2, 'Calculator maintains history');
assert(calculator.getLastCalculation().name === 'Test Rectangle', 'Get last calculation');

// Test 22: Calculator clear history
calculator.clearHistory();
assert(calculator.getHistory().length === 0, 'Calculator clears history');

// Test 23: Format result
const unformatted = { area: 123.456789, perimeter: 45.123456 };
const formatted = formatResult(unformatted, 2);
assert(formatted.area === 123.46, 'Formatting rounds to 2 decimals');
assert(formatted.perimeter === 45.12, 'All values formatted');

console.log(`\n${green}Passed: ${passed}${reset}`);
console.log(`${red}Failed: ${failed}${reset}`);
console.log(`Total: ${passed + failed}`);
