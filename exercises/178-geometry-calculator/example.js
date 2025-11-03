/**
 * Real-World Geometry Examples
 */

import { GeometryCalculator, printCalculation, formatResult } from './calculator.js';
import * as shapes from './shapes.js';
import * as conversions from './conversions.js';
import * as math from '../175-math-library-setup/src/math.js';

console.log('📐 Geometry Calculator - Real-World Examples\n');

const calculator = new GeometryCalculator();

// Example 1: Home Floor Plan
console.log('='.repeat(60));
console.log('Example 1: Calculating Floor Area for Tiles');
console.log('='.repeat(60));

const livingRoom = calculator.calculate('rectangle', [6.5, 4.2], 'Living Room');
const kitchen = calculator.calculate('rectangle', [3.5, 3.0], 'Kitchen');
const bedroom = calculator.calculate('rectangle', [4.0, 3.5], 'Bedroom');

console.log('\nRoom areas:');
console.log(`Living Room: ${math.round(livingRoom.area, 2)} m²`);
console.log(`Kitchen: ${math.round(kitchen.area, 2)} m²`);
console.log(`Bedroom: ${math.round(bedroom.area, 2)} m²`);

const totalArea = livingRoom.area + kitchen.area + bedroom.area;
console.log(`Total: ${math.round(totalArea, 2)} m²`);

// Convert to square feet
const areaInFeet = conversions.area.m2ToFeet2(totalArea);
console.log(`Total (in sq ft): ${math.round(areaInFeet, 2)} ft²`);

// Example 2: Garden Design
console.log('\n' + '='.repeat(60));
console.log('Example 2: Circular Garden Design');
console.log('='.repeat(60));

const gardenRadius = 5; // meters
const garden = calculator.calculate('circle', [gardenRadius], 'Garden');

console.log(`\nGarden radius: ${gardenRadius}m`);
console.log(`Area: ${math.round(garden.area, 2)} m²`);
console.log(`Circumference: ${math.round(garden.circumference, 2)} m`);

// Calculate fencing needed
const fencingMeters = garden.circumference;
const fencingFeet = conversions.length.metersToFeet(fencingMeters);
console.log(`Fencing needed: ${math.round(fencingMeters, 2)}m (${math.round(fencingFeet, 2)} ft)`);

// Example 3: Water Tank (Cylinder)
console.log('\n' + '='.repeat(60));
console.log('Example 3: Water Tank Capacity Calculation');
console.log('='.repeat(60));

const tankRadius = 1.5; // meters
const tankHeight = 2.0; // meters
const tank = calculator.calculate('cylinder', [tankRadius, tankHeight], 'Water Tank');

console.log(`\nTank dimensions: radius ${tankRadius}m, height ${tankHeight}m`);
console.log(`Volume: ${math.round(tank.volume, 2)} m³`);

// Convert to liters
const liters = conversions.volume.m3ToLiters(tank.volume);
console.log(`Capacity: ${math.round(liters, 2)} liters`);

// Surface area (for painting)
console.log(`Surface area: ${math.round(tank.surface_area, 2)} m²`);

// Example 4: Sports Field
console.log('\n' + '='.repeat(60));
console.log('Example 4: Sports Field Perimeter');
console.log('='.repeat(60));

const fieldLength = 100; // meters
const fieldWidth = 64; // meters
const field = calculator.calculate('rectangle', [fieldLength, fieldWidth], 'Football Field');

console.log(`\nField dimensions: ${fieldLength}m × ${fieldWidth}m`);
console.log(`Area: ${math.round(field.area, 2)} m²`);
console.log(`Perimeter: ${math.round(field.perimeter, 2)} m`);

// Convert to acres
const fieldAcres = field.area / 4047; // 1 acre = 4047 m²
console.log(`Area: ${math.round(fieldAcres, 3)} acres`);

// Example 5: Building Volume
console.log('\n' + '='.repeat(60));
console.log('Example 5: Building Storage Capacity');
console.log('='.repeat(60));

const buildingLength = 50; // meters
const buildingWidth = 30; // meters
const buildingHeight = 4.5; // meters

const building = calculator.calculate(
  'box',
  [buildingLength, buildingWidth, buildingHeight],
  'Warehouse'
);

console.log(`\nWarehouse: ${buildingLength}m × ${buildingWidth}m × ${buildingHeight}m`);
console.log(`Volume: ${math.round(building.volume, 2)} m³`);

const gallons = conversions.volume.m3ToGallons(building.volume);
console.log(`If filled with liquid: ${math.round(gallons, 0)} gallons`);

// Example 6: Cone-shaped Storage (Grain Silo)
console.log('\n' + '='.repeat(60));
console.log('Example 6: Grain Silo Capacity');
console.log('='.repeat(60));

const siloRadius = 3; // meters
const siloHeight = 8; // meters

const silo = calculator.calculate('cone', [siloRadius, siloHeight], 'Grain Silo');

console.log(`\nSilo: radius ${siloRadius}m, height ${siloHeight}m`);
console.log(`Volume: ${math.round(silo.volume, 2)} m³`);

const cubicFeet = conversions.volume.m3ToMilliliters(silo.volume) / 28316.8;
console.log(`Volume: ${math.round(cubicFeet, 2)} cubic feet`);
console.log(`Slant height: ${math.round(silo.slant_height, 2)} m`);

// Example 7: Land Surveying
console.log('\n' + '='.repeat(60));
console.log('Example 7: Land Surveying - Triangle Plot');
console.log('='.repeat(60));

const plotA = 120; // meters (side 1)
const plotB = 150; // meters (side 2)
const plotC = 180; // meters (side 3)

const plot = calculator.calculate('triangle', [plotA, plotB, plotC], 'Land Plot');

console.log(`\nTriangular plot with sides: ${plotA}m, ${plotB}m, ${plotC}m`);
console.log(`Area: ${math.round(plot.area, 2)} m²`);
console.log(`Perimeter: ${math.round(plot.perimeter, 2)} m`);

// Convert to hectares
const hectares = plot.area / 10000;
console.log(`Area: ${math.round(hectares, 3)} hectares`);

// Example 8: Unit Conversions
console.log('\n' + '='.repeat(60));
console.log('Example 8: Unit Conversions Reference');
console.log('='.repeat(60));

console.log('\nLength Conversions (100 meters):');
console.log(`• ${conversions.length.metersToKm(100)} km`);
console.log(`• ${conversions.length.metersToFeet(100).toFixed(2)} feet`);
console.log(`• ${conversions.length.metersToMiles(100).toFixed(4)} miles`);

console.log('\nArea Conversions (1000 m²):');
console.log(`• ${conversions.area.m2ToKm2(1000).toFixed(6)} km²`);
console.log(`• ${conversions.area.m2ToFeet2(1000).toFixed(2)} ft²`);
console.log(`• ${(1000 / 10000).toFixed(2)} hectares`);

console.log('\nVolume Conversions (10 m³):');
console.log(`• ${conversions.volume.m3ToLiters(10)} liters`);
console.log(`• ${conversions.volume.m3ToGallons(10).toFixed(2)} gallons`);

// Summary
console.log('\n' + '='.repeat(60));
console.log('Calculation Summary');
console.log('='.repeat(60));

console.log(`\nTotal calculations performed: ${calculator.getHistory().length}`);
console.log('\nCalculation types:');

const typeCount = {};
calculator.getHistory().forEach(calc => {
  typeCount[calc.shape] = (typeCount[calc.shape] || 0) + 1;
});

for (const [shape, count] of Object.entries(typeCount)) {
  console.log(`  • ${shape}: ${count}`);
}

console.log('\n✓ Examples complete!');
console.log('='.repeat(60));
