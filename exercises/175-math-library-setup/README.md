# Exercise 175: Math Library - Setup & Basics

## Overview

Build a **reusable math utility library** organized as ES6 modules. This exercise teaches you how to structure code into logical, exportable functions and create libraries that other code can use.

**Key Learning:** Creating professional, organized, reusable code through modular architecture.

---

## 🎯 Learning Objectives

1. **Organize Code into Modules**
   - Separate concerns (math, trigonometry, statistics)
   - Use consistent naming conventions
   - Create logical groupings

2. **Master ES6 Export/Import**
   - Named exports for multiple functions
   - Default exports for main entry point
   - Re-exporting from main module

3. **Build Reusable Libraries**
   - Write functions for common use cases
   - Document parameters and return values
   - Handle edge cases and errors

4. **Test Your Code**
   - Create comprehensive test suite
   - Verify all functions work correctly
   - Run tests automatically

5. **Provide Usage Examples**
   - Show real-world applications
   - Document best practices
   - Help other developers use your library

---

## 📋 Project Structure

```
175-math-library-setup/
├── src/
│   ├── math.js          # Basic arithmetic, power, factorial
│   ├── trigonometry.js  # Angles, circles, distances
│   └── statistics.js    # Descriptive stats, correlation
├── index.js             # Main entry point (re-exports all)
├── test.js              # Test suite
├── examples.js          # Real-world usage examples
├── package.json
├── exercise.json
└── README.md
```

---

## 🚀 Getting Started

### Run Tests

```bash
npm install
npm test
```

You should see output like:
```
=== Math Functions ===
✓ add(5, 3) = 8
✓ subtract(10, 4) = 6
... (50+ tests)
✓ Passed: 50
  Failed: 0
```

### Run Examples

```bash
npm run example
```

Shows practical use cases:
- Compound interest calculation
- Distance between cities
- Student test score analysis
- Triangle properties
- etc.

---

## 📚 Code Organization

### Three Module Files

#### `src/math.js` - Basic Arithmetic
- `add(a, b)` - Addition
- `subtract(a, b)` - Subtraction
- `multiply(a, b)` - Multiplication
- `divide(a, b)` - Division (with zero check)
- `modulo(a, b)` - Remainder
- `power(base, exp)` - Exponentiation
- `squareRoot(num)` - Square root (with negative check)
- `absolute(num)` - Absolute value
- `round(num, decimals)` - Rounding to decimals
- `factorial(n)` - n! (0-20 reasonable range)

#### `src/trigonometry.js` - Angles & Circles
- `degreesToRadians(degrees)` - Convert units
- `radiansToDegrees(radians)` - Convert back
- `sine(degrees)` - sin(angle)
- `cosine(degrees)` - cos(angle)
- `tangent(degrees)` - tan(angle)
- `hypotenuse(a, b)` - Pythagorean theorem
- `distance(x1, y1, x2, y2)` - Point distance
- `angle(x, y)` - Bearing angle
- `circumference(radius)` - Circle perimeter
- `circleArea(radius)` - Circle area

#### `src/statistics.js` - Data Analysis
- `sum(numbers)` - Total
- `mean(numbers)` - Average
- `median(numbers)` - Middle value
- `mode(numbers)` - Most frequent
- `range(numbers)` - Max - min
- `variance(numbers)` - Spread measure
- `standardDeviation(numbers)` - Spread in original units
- `percentile(numbers, value)` - Position percentage
- `correlation(x, y)` - Relationship (-1 to 1)

---

## 🔑 Key Concepts

### ES6 Modules

**Named Exports** - Each function is individually exportable:
```javascript
// src/math.js
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }

// Usage
import { add, subtract } from './src/math.js';
add(5, 3);  // 8
```

**Re-exporting** - Main file exports from submodules:
```javascript
// index.js
export * as math from './src/math.js';
export * as trig from './src/trigonometry.js';
export * as stats from './src/statistics.js';

// Usage
import { math, trig, stats } from './index.js';
math.add(5, 3);    // 8
trig.distance(...); // distance
stats.mean([...]); // average
```

### Function Documentation

Each function includes JSDoc comments:
```javascript
/**
 * Add two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
export function add(a, b) {
  return a + b;
}
```

Benefits:
- IntelliSense/autocomplete in editors
- Clear parameter types
- Expected return values
- Self-documenting code

### Error Handling

Validate inputs and throw meaningful errors:
```javascript
export function divide(a, b) {
  if (b === 0) throw new Error('Cannot divide by zero');
  return a / b;
}

export function squareRoot(num) {
  if (num < 0) throw new Error('Cannot calculate square root of negative number');
  return Math.sqrt(num);
}
```

### Testing Pattern

Simple test assertion function:
```javascript
function assert(actual, expected, testName) {
  if (Math.abs(actual - expected) < 0.0001) {
    console.log(`✓ ${testName}`);
  } else {
    console.log(`✗ ${testName}: expected ${expected}, got ${actual}`);
  }
}

// Usage
assert(add(5, 3), 8, 'add(5, 3) = 8');
```

---

## 💡 Real-World Applications

### Example 1: Compound Interest
```javascript
import { math } from './index.js';

const principal = 1000;
const rate = 0.05 / 4;
const periods = 10 * 4;

const amount = principal * math.power(1 + rate, periods);
// Final amount after compound interest
```

### Example 2: Test Score Analysis
```javascript
import { stats } from './index.js';

const scores = [78, 85, 92, 88, 76, 95, 82, 88, 90, 87];

const average = stats.mean(scores);     // 84.1
const median = stats.median(scores);    // 88
const spread = stats.standardDeviation(scores); // 5.47
```

### Example 3: Triangle Calculations
```javascript
import { trig } from './index.js';

const a = 5;
const b = 12;

const hypotenuse = trig.hypotenuse(a, b);  // 13
const area = (a * b) / 2;                   // 30
```

### Example 4: Correlation Analysis
```javascript
import { stats } from './index.js';

const temperature = [20, 22, 25, 30, 35];
const iceCreamSales = [5, 7, 10, 18, 25];

const correlation = stats.correlation(temperature, iceCreamSales);
// 0.99+ = strong positive correlation
```

---

## 🧪 Testing Approach

### Test Coverage

The `test.js` file includes:
- **Math tests:** Basic operations, edge cases
- **Trigonometry tests:** Angle conversions, distances, circles
- **Statistics tests:** Descriptive statistics, correlation
- **Error tests:** Division by zero, negative square root, etc.

Run tests:
```bash
npm test
```

Expected output:
```
=== Math Functions ===
✓ add(5, 3) = 8
✓ subtract(10, 4) = 6
... (50+ tests)

=== Test Summary ===
Passed: 50
Failed: 0
Total: 50
```

### Adding Your Own Tests

```javascript
// In test.js, add new assertions
assert(math.add(10, 5), 15, 'add(10, 5) = 15');
assert(trig.distance(0, 0, 5, 12), 13, 'distance(0,0,5,12) = 13');
```

---

## 📝 Usage Examples

### Direct Imports
```javascript
import { add, multiply, factorial } from './src/math.js';

add(5, 3);        // 8
multiply(4, 7);   // 28
factorial(5);     // 120
```

### Namespace Imports
```javascript
import * as math from './src/math.js';

math.add(5, 3);       // 8
math.divide(20, 4);   // 5
```

### Main Module Re-exports
```javascript
import { math, trig, stats } from './index.js';

math.power(2, 8);           // 256
trig.distance(0, 0, 3, 4);  // 5
stats.mean([1, 2, 3]);      // 2
```

### Using in Another File
```javascript
// myApp.js
import { stats } from './index.js';

const myScores = [85, 92, 78, 88, 95];
console.log('Average:', stats.mean(myScores));
console.log('Std Dev:', stats.standardDeviation(myScores));
```

---

## 🎓 Key Concepts Explained

### Module Pattern Benefits

**Organization:** Keep related functions together
```
math.js         → arithmetic operations
trigonometry.js → angle/circle calculations
statistics.js   → data analysis
```

**Reusability:** Import only what you need
```javascript
// Just math functions
import { add, multiply } from './src/math.js';

// Or everything
import { math, trig, stats } from './index.js';
```

**Maintainability:** Easy to find and update code
- Bug in distance calculation? Check trigonometry.js
- Need new statistics function? Add to statistics.js

**Testability:** Test each module independently
```javascript
// Test math.js separately
import * as math from './src/math.js';
assert(math.add(5, 3), 8);
```

### Named vs Default Exports

**Named Exports** (use when many related functions)
```javascript
// src/math.js
export function add(a, b) { ... }
export function subtract(a, b) { ... }
export function multiply(a, b) { ... }

// Import specific functions
import { add, multiply } from './src/math.js';
```

**Default Export** (use for main entry point)
```javascript
// index.js
export default {
  math: mathFuncs,
  trig: trigFuncs,
  stats: statsFuncs
};

// Import as single object
import lib from './index.js';
lib.math.add(5, 3);
```

### Error Handling

Throw errors for invalid inputs:
```javascript
export function divide(a, b) {
  if (b === 0) throw new Error('Cannot divide by zero');
  return a / b;
}

// Usage
try {
  divide(10, 0);  // Throws error
} catch (error) {
  console.error(error.message);  // "Cannot divide by zero"
}
```

---

## 🚀 Advanced Challenges

### 1. Add Finance Module
```javascript
// src/finance.js
export function simpleInterest(principal, rate, time) { ... }
export function presentValue(futureValue, rate, time) { ... }
export function monthlyPayment(loanAmount, annualRate, years) { ... }
```

### 2. Add Geometry Module
```javascript
// src/geometry.js
export function triangleArea(base, height) { ... }
export function rectanglePerimeter(width, height) { ... }
export function sphereVolume(radius) { ... }
```

### 3. Add Complex Numbers
```javascript
// src/complex.js
export function complexAdd(a, b) { ... }
export function complexMultiply(a, b) { ... }
```

### 4. Create CLI Tool
```bash
# math-calc.js
$ node math-calc.js "add(5, 3)"
8

$ node math-calc.js "stats.mean([1,2,3,4,5])"
3
```

### 5. Add Performance Benchmarks
```javascript
// benchmark.js - measure execution time of functions
import { stats } from './index.js';

const startTime = performance.now();
stats.correlation(largeArray1, largeArray2);
const endTime = performance.now();

console.log(`Correlation took ${endTime - startTime}ms`);
```

---

## 📚 Learning Resources

### JavaScript Modules
- MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
- ES6 Modules: https://www.freecodecamp.org/news/javascript-modules-explained-with-examples/

### JSDoc Documentation
- JSDoc Guide: https://jsdoc.app/
- Best Practices: https://jsdoc.app/index.html

### Math Functions
- MDN Math Object: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
- Statistics Formulas: https://www.khanacademy.org/math/statistics-probability

---

## ✅ Success Criteria

You've completed Exercise 175 when:

- ✅ `npm test` runs and passes all tests
- ✅ `npm run example` shows practical usage examples
- ✅ All 30+ functions documented with JSDoc
- ✅ Can import using named exports: `import { add } from './src/math.js'`
- ✅ Can import using namespace: `import * as math from './src/math.js'`
- ✅ Can import from main module: `import { math, trig, stats } from './index.js'`
- ✅ All math operations work correctly
- ✅ All trigonometry functions work correctly
- ✅ All statistics functions work correctly
- ✅ Error handling for edge cases (division by zero, negative sqrt, etc.)
- ✅ Can create new test cases
- ✅ Understand module organization and reusability

---

## 🎉 What You've Learned

✓ Creating professional, organized JavaScript code  
✓ ES6 modules and export/import  
✓ Reusable function libraries  
✓ JSDoc documentation  
✓ Error handling and validation  
✓ Testing and verification  
✓ Real-world application patterns  

**Next:** Exercise 176 - Use this library in a real-world statistics analyzer application!

---

**Happy Coding! 🧮**
