# Exercise 177: Math Library - Geometry Calculator

## Overview

This exercise builds a **real-world geometry calculator** using the math library from **Exercise 175**. You'll create a practical tool that calculates properties of 2D and 3D shapes, performs unit conversions, and demonstrates advanced library integration.

This exercise completes **Series 36** by showing how a well-designed library enables building production-quality applications quickly and reliably.

## Learning Objectives

By completing this exercise, you will:

1. **Integrate trigonometry library** for geometric calculations
2. **Design a shape calculation system** with multiple shape types
3. **Implement unit conversion utilities** for different measurement systems
4. **Build practical calculation workflows** using library functions
5. **Create a calculator interface** for real-world geometry problems

## Key Concepts

### 1. Geometry and Trigonometry

You'll use trigonometry functions from Exercise 175 to solve real geometry problems:

```javascript
import * as trig from '../175-math-library-setup/src/trigonometry.js';

// Calculate hypotenuse of right triangle
const hyp = trig.hypotenuse(3, 4); // Returns 5

// Calculate circle properties
const area = trig.circleArea(radius);
const circumference = trig.circumference(radius);
```

**Why this matters:** Geometry is everywhere in real-world applications—architecture, engineering, mapping, and more.

### 2. 2D Shape Calculations

The calculator supports 7 common 2D shapes:

- **Rectangle** - Area, perimeter, diagonal
- **Square** - Area, perimeter, diagonal
- **Triangle** - Area (Heron's formula), perimeter
- **Right Triangle** - Area, perimeter, hypotenuse
- **Circle** - Area, circumference, diameter
- **Ellipse** - Area, perimeter, eccentricity
- **Regular Polygon** - Area, perimeter, apothem

Each returns structured data with all relevant measurements.

### 3. 3D Shape Calculations

The calculator supports 7 common 3D shapes:

- **Sphere** - Volume, surface area, diameter
- **Cube** - Volume, surface area, diagonal
- **Rectangular Box** - Volume, surface area, diagonal
- **Cylinder** - Volume, surface area, lateral area
- **Cone** - Volume, surface area, slant height
- **Pyramid** - Volume, surface area, slant height

### 4. Unit Conversion System

A comprehensive conversion module handles 4 types of units:

#### Length (11 conversions)
```javascript
conversions.length.metersToFeet(10);      // 32.8 feet
conversions.length.kmToMiles(1.609);      // 1 mile
conversions.length.inchesToCm(12);        // 30.48 cm
```

#### Area (8 conversions)
```javascript
conversions.area.m2ToFeet2(100);          // 1076.4 sq ft
conversions.area.hectaresToM2(1);         // 10000 m²
```

#### Volume (7 conversions)
```javascript
conversions.volume.m3ToLiters(1);         // 1000 liters
conversions.volume.gallonsToLiters(1);    // 3.78541 liters
```

#### Angle (6 conversions)
```javascript
conversions.angle.degreesToRadians(180);  // π radians
conversions.angle.radiansToDegrees(π);    // 180 degrees
```

### 5. Object-Oriented Calculator

The `GeometryCalculator` class provides a user-friendly interface:

```javascript
const calculator = new GeometryCalculator();

// Perform calculations
calculator.calculate('circle', [5], 'My Circle');
calculator.calculate('rectangle', [10, 6], 'Room Floor');

// Access history
calculator.getHistory();
calculator.getLastCalculation();
calculator.clearHistory();
```

**Benefits:**
- Encapsulation: Calculator state managed internally
- History tracking: All calculations stored
- Simple interface: Consistent API for all shapes

### 6. Mathematical Formulas

The calculator uses authentic mathematical formulas:

#### Areas
- **Rectangle/Square:** length × width
- **Triangle (Heron's):** √[s(s-a)(s-b)(s-c)] where s = (a+b+c)/2
- **Circle:** πr²
- **Ellipse:** πab (where a, b are semi-axes)
- **Regular Polygon:** (perimeter × apothem) / 2

#### Volumes
- **Sphere:** (4/3)πr³
- **Cylinder:** πr²h
- **Cone:** (1/3)πr²h
- **Pyramid:** (1/3) × base² × h

#### Geometry
- **Hypotenuse (Pythagorean):** √(a² + b²)
- **Distance (2D):** √[(x₂-x₁)² + (y₂-y₁)²]
- **Circumference:** 2πr
- **Slant height (cone):** √(r² + h²)

### 7. Real-World Applications

The example file demonstrates 8 practical use cases:

1. **Floor Planning** - Calculate room areas for tile purchases
2. **Garden Design** - Circular garden with perimeter calculation
3. **Tank Capacity** - Water tank volume in liters and gallons
4. **Sports Fields** - Field area and perimeter measurements
5. **Building Volume** - Warehouse storage capacity
6. **Grain Silo** - Cone-shaped storage calculations
7. **Land Surveying** - Triangular plot area in hectares
8. **Unit Conversions** - Reference conversions

## Project Structure

```
177-geometry-calculator/
├── exercise.json          # Exercise metadata
├── package.json           # Project configuration
├── shapes.js              # 2D/3D shape calculations (13 shapes)
├── conversions.js         # Unit conversion utilities
├── calculator.js          # Main calculator class
├── test.js                # Test suite (23 tests)
├── example.js             # Real-world examples (8 scenarios)
└── README.md              # This file
```

### File Responsibilities

**`shapes.js`** - Shape Calculations
- 7 functions for 2D shapes (rectangle, square, triangle, etc.)
- 7 functions for 3D shapes (sphere, cube, cylinder, etc.)
- Uses trigonometry library for calculations
- Returns structured objects with all measurements
- Validates input (positive dimensions, valid triangles)

**`conversions.js`** - Unit Conversions
- 4 conversion modules (length, area, volume, angle)
- 32 conversion functions total
- Easy chaining: `conversions.length.metersToFeet(10)`
- Formatting helpers for display

**`calculator.js`** - Main Calculator
- `GeometryCalculator` class with calculation history
- Helper functions for common calculations
- `formatResult()` for consistent decimal places
- `printCalculation()` for formatted console output

**`test.js`** - Validation
- 23 test cases covering:
  - All shape types
  - All unit conversions
  - Error handling
  - Calculator class methods
  - Formatting and rounding

**`example.js`** - Demonstrations
- 8 complete real-world scenarios
- Practical use cases with realistic numbers
- Shows multiple calculation approaches
- Demonstrates all major features

## Running the Calculator

### Run Examples
```bash
npm run example
```

Executes `example.js`, showing 8 real-world scenarios:
1. Floor plan area for tile purchasing
2. Circular garden with fencing calculation
3. Water tank capacity in liters/gallons
4. Sports field perimeter and acreage
5. Building storage volume
6. Grain silo cone calculations
7. Land survey triangle area in hectares
8. Unit conversion reference

Each example shows practical calculations with results in multiple units.

### Run Tests
```bash
npm test
```

Executes `test.js`, running 23 comprehensive tests:

**Shape Tests (13 tests)**
- Rectangle: area, perimeter, diagonal
- Square: area, perimeter, diagonal
- Right triangle: area, perimeter, hypotenuse
- Triangle (Heron's): area, perimeter
- Circle: area, circumference, diameter
- Ellipse: area, perimeter
- Regular polygon: area, perimeter
- Sphere, Cube, Box, Cylinder, Cone, Pyramid

**Conversion Tests (6 tests)**
- Length conversions (m→ft, km→miles, etc.)
- Area conversions (m²→ft², hectares→m²)
- Volume conversions (m³→liters, L→gallons)
- Angle conversions (degrees↔radians)

**Quality Assurance Tests (4 tests)**
- Error handling (negative dimensions)
- Invalid triangle detection
- Calculator functionality
- Formatting and rounding

All tests use color-coded output and summary counts.

### Use in Your Code
```javascript
import { GeometryCalculator } from './calculator.js';
import * as shapes from './shapes.js';
import * as conversions from './conversions.js';

// Calculate a circle
const circle = shapes.circle(5);
console.log(`Area: ${circle.area}`);

// Convert units
const feet = conversions.length.metersToFeet(10);
console.log(`10m = ${feet} feet`);

// Use calculator
const calc = new GeometryCalculator();
calc.calculate('rectangle', [5, 3], 'Room');
```

## Real-World Applications

### 1. Architecture & Construction
- Calculate room areas for flooring materials
- Estimate paint needed (surface area)
- Plan layouts with perimeter calculations
- Volume calculations for construction materials

### 2. Land Surveying
- Area calculations for property boundaries
- Distance measurements between points
- Triangle property analysis
- Unit conversions for reports

### 3. Engineering
- Cylindrical tank specifications
- Cone/pyramid-shaped structures
- Material volume requirements
- Precision measurements

### 4. Gardening & Landscaping
- Garden bed planning
- Fencing requirements (perimeter)
- Watering needs (area-based)
- Tree spacing calculations

### 5. Manufacturing
- Container volume specifications
- Surface area for painting/coating
- Material weight calculations (volume × density)
- Specification documentation

### 6. Education
- Geometry teaching tool
- Formula demonstrations
- Unit conversion practice
- Real-world math application

## Code Patterns

### Pattern 1: Unified Shape Interface
```javascript
// All shapes return consistent structure
const square = shapes.square(5);
const circle = shapes.circle(5);
const cube = shapes.cube(5);

// Access properties uniformly
console.log(square.area);
console.log(circle.area);
console.log(cube.volume);
```

### Pattern 2: Unit Conversion Chains
```javascript
// Easy chaining for complex conversions
const meters = 100;
const feet = conversions.length.metersToFeet(meters);
const miles = conversions.length.feetToMiles(feet);
```

### Pattern 3: Input Validation
```javascript
// Validate before calculation
if (radius <= 0) throw new Error('Radius must be positive');
if (a + b <= c) throw new Error('Invalid triangle');
```

### Pattern 4: Result Formatting
```javascript
// Consistent formatting for display
const formatted = formatResult(result, 2);
console.log(`${formatted.area} square units`);
```

## Mathematical Accuracy

The calculator uses precise formulas:

### Heron's Formula (Triangle Area)
```
s = (a + b + c) / 2
Area = √[s(s-a)(s-b)(s-c)]
```

### Pythagorean Theorem
```
c² = a² + b²
c = √(a² + b²)
```

### Sphere Volume
```
V = (4/3)πr³
```

### Cone Slant Height
```
l = √(r² + h²)
```

All formulas implemented accurately using JavaScript's Math API through the imported library.

## Advanced Challenges

### Challenge 1: Composite Shapes
Create calculations for complex shapes:
```javascript
// House shape = rectangle + triangle (roof)
function houseArea(width, height, roofHeight) {
  const walls = rectangle(width, height).area;
  const roof = triangle(width, roofHeight).area;
  return walls + roof;
}
```

### Challenge 2: 3D Coordinate Distance
Extend to 3D space:
```javascript
function distance3D(x1, y1, z1, x2, y2, z2) {
  return Math.sqrt(
    (x2-x1)² + (y2-y1)² + (z2-z1)²
  );
}
```

### Challenge 3: Surface Area from Nets
Given shape dimensions, calculate from unfolded surface:
```javascript
// Unfold 3D shapes into 2D faces
// Calculate total area from faces
```

### Challenge 4: Interactive CLI
Build command-line interface:
```bash
$ npm run interactive
> circle 5
Area: 78.54
> convert 100 meters feet
328.08 feet
```

### Challenge 5: Visualization
Generate ASCII visualization:
```
Circle (radius 5)
Area: 78.54
    ·····
  ·········
 ···········
 ···········
  ·········
    ·····
```

## Success Criteria

You've successfully completed this exercise when:

- ✅ All 7 files created (exercise.json, package.json, 5 JS files)
- ✅ `shapes.js` has 14 shape functions (7 for 2D, 7 for 3D)
- ✅ `conversions.js` has 4 conversion modules with 32+ functions
- ✅ `calculator.js` has GeometryCalculator class with history tracking
- ✅ `test.js` has 23+ passing test cases
- ✅ `example.js` runs without errors and shows all 8 examples
- ✅ All calculations use math library from Exercise 175
- ✅ Code is well-documented with JSDoc comments
- ✅ Input validation catches invalid shapes/dimensions
- ✅ Output is formatted clearly with multiple units

## Testing Your Work

```bash
# Run the example scenarios
npm run example

# Run the test suite
npm test
```

**Expected output for `npm run example`:**
- 8 scenario sections with headers
- Calculations in multiple units (metric + imperial)
- Formatted results with descriptive labels
- Summary of calculation types performed
- No errors

**Expected output for `npm test`:**
- 23 test results (✓ or ✗)
- All tests should pass (✓)
- Tests organized by type (shapes, conversions, errors)
- Summary showing passed/failed count

## Important Notes

### 1. Import Paths
Exercise 177 imports from Exercise 175:
```javascript
import * as math from '../175-math-library-setup/src/math.js';
import * as trig from '../175-math-library-setup/src/trigonometry.js';
```

Ensure paths match your directory structure.

### 2. Mathematical Precision
Use the `math.round()` function for consistent decimal places:
```javascript
import * as math from '../175-math-library-setup/src/math.js';
math.round(value, 2); // Round to 2 decimals
```

### 3. Conversion Accuracy
Conversion factors are standard (not approximations):
- 1 meter = 3.28084 feet (exact)
- 1 km = 0.621371 miles (exact)
- 1 liter = 0.264172 gallons (exact)

### 4. Triangle Validation
Always check triangle inequality:
```javascript
if (a + b <= c || b + c <= a || a + c <= b) {
  throw new Error('Invalid triangle');
}
```

### 5. Error Handling
Validate all inputs before calculation:
```javascript
if (radius <= 0) {
  throw new Error('Radius must be positive');
}
```

## Common Mistakes to Avoid

❌ **Using incorrect import paths**
```javascript
// Wrong
import * as math from 'math.js';
```

✅ **Use relative paths to Exercise 175**
```javascript
// Correct
import * as math from '../175-math-library-setup/src/math.js';
```

---

❌ **Forgetting to validate input**
```javascript
// Wrong - fails with negative radius
const area = shapes.circle(radius);
```

✅ **Add validation checks**
```javascript
// Correct
if (radius <= 0) throw new Error('Radius must be positive');
const area = shapes.circle(radius);
```

---

❌ **Using approximations for conversions**
```javascript
// Wrong
const feet = meters * 3.28; // Close but not exact
```

✅ **Use precise conversion factors**
```javascript
// Correct
const feet = meters * 3.28084; // Exact conversion
```

---

❌ **Not rounding for display**
```javascript
// Wrong - ugly output
console.log(area); // 78.53981633974483
```

✅ **Format results**
```javascript
// Correct
console.log(math.round(area, 2)); // 78.54
```

## Learning Resources

### Geometry Resources
- [Khan Academy - Geometry](https://www.khanacademy.org/math/geometry)
- [Properties of Shapes](https://en.wikipedia.org/wiki/Shape)
- [Heron's Formula](https://en.wikipedia.org/wiki/Heron%27s_formula)
- [Unit Conversions](https://www.metric-conversions.org/)

### Mathematics Resources
- [Pythagorean Theorem](https://en.wikipedia.org/wiki/Pythagorean_theorem)
- [Trigonometry](https://en.wikipedia.org/wiki/Trigonometry)
- [Calculus - Volume Integration](https://en.wikipedia.org/wiki/Volume_(thermodynamics))

### Programming Resources
- [MDN - Object-Oriented JS](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects)
- [ES6 Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Math API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)

## Series 36 Completion

With Exercise 177, you've completed **Series 36: Math Utility Library** with 3 focused exercises:

1. **Exercise 175** - Build the library (30+ functions, testing framework)
2. **Exercise 176** - Use it for statistics (data analysis tool)
3. **Exercise 177** - Use it for geometry (calculation tool)

This demonstrates how professional libraries are created and used in real applications.

---

**Estimated Time:** 2.5 hours

**Difficulty:** Intermediate

**Concepts:** Geometry, unit conversions, OOP design, library integration, real-world calculations

**Skills Demonstrated:** Mathematical problem-solving, system design, code organization, practical application development
