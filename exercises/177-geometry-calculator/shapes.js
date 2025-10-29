/**
 * Shape Calculation Functions
 * Provides calculators for various 2D and 3D shapes
 */

import * as math from '../175-math-library-setup/src/math.js';
import * as trig from '../175-math-library-setup/src/trigonometry.js';

/**
 * 2D Shape Calculations
 */

/**
 * Rectangle calculations
 */
export function rectangle(length, width) {
  if (length <= 0 || width <= 0) throw new Error('Dimensions must be positive');

  const area = length * width;
  const perimeter = 2 * (length + width);
  const diagonal = trig.hypotenuse(length, width);

  return { area, perimeter, diagonal };
}

/**
 * Square calculations
 */
export function square(side) {
  if (side <= 0) throw new Error('Side must be positive');

  const area = side * side;
  const perimeter = 4 * side;
  const diagonal = side * Math.sqrt(2);

  return { area, perimeter, diagonal };
}

/**
 * Triangle calculations (by sides)
 */
export function triangle(a, b, c) {
  if (a <= 0 || b <= 0 || c <= 0) {
    throw new Error('Sides must be positive');
  }

  // Check triangle inequality
  if (a + b <= c || b + c <= a || a + c <= b) {
    throw new Error('Invalid triangle: sides do not form valid triangle');
  }

  const perimeter = a + b + c;
  const s = perimeter / 2; // Semi-perimeter
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c)); // Heron's formula

  return { area, perimeter, sides: [a, b, c] };
}

/**
 * Right triangle calculations
 */
export function rightTriangle(base, height) {
  if (base <= 0 || height <= 0) throw new Error('Dimensions must be positive');

  const area = (base * height) / 2;
  const hypotenuse = trig.hypotenuse(base, height);
  const perimeter = base + height + hypotenuse;

  return { area, perimeter, hypotenuse };
}

/**
 * Circle calculations
 */
export function circle(radius) {
  if (radius <= 0) throw new Error('Radius must be positive');

  const area = trig.circleArea(radius);
  const circumference = trig.circumference(radius);
  const diameter = 2 * radius;

  return { area, circumference, diameter, radius };
}

/**
 * Ellipse calculations
 */
export function ellipse(majorAxis, minorAxis) {
  if (majorAxis <= 0 || minorAxis <= 0) {
    throw new Error('Axes must be positive');
  }

  const area = Math.PI * majorAxis * minorAxis;
  const perimeter = Math.PI * (majorAxis + minorAxis); // Approximation
  const eccentricity = Math.sqrt(1 - (minorAxis * minorAxis) / (majorAxis * majorAxis));

  return { area, perimeter, eccentricity };
}

/**
 * Polygon calculations
 */
export function regularPolygon(sides, sideLength) {
  if (sides < 3 || sideLength <= 0) {
    throw new Error('Invalid polygon');
  }

  const perimeter = sides * sideLength;
  const apothem = sideLength / (2 * Math.tan(Math.PI / sides));
  const area = (perimeter * apothem) / 2;

  return { sides, area, perimeter, apothem };
}

/**
 * 3D Shape Calculations
 */

/**
 * Sphere calculations
 */
export function sphere(radius) {
  if (radius <= 0) throw new Error('Radius must be positive');

  const surface_area = 4 * Math.PI * radius * radius;
  const volume = (4 / 3) * Math.PI * math.power(radius, 3);
  const diameter = 2 * radius;

  return { volume, surface_area, diameter, radius };
}

/**
 * Cube calculations
 */
export function cube(side) {
  if (side <= 0) throw new Error('Side must be positive');

  const volume = math.power(side, 3);
  const surface_area = 6 * side * side;
  const diagonal = side * Math.sqrt(3);

  return { volume, surface_area, diagonal };
}

/**
 * Rectangular prism (box) calculations
 */
export function box(length, width, height) {
  if (length <= 0 || width <= 0 || height <= 0) {
    throw new Error('Dimensions must be positive');
  }

  const volume = length * width * height;
  const surface_area = 2 * (length * width + width * height + height * length);
  const diagonal = Math.sqrt(length * length + width * width + height * height);

  return { volume, surface_area, diagonal };
}

/**
 * Cylinder calculations
 */
export function cylinder(radius, height) {
  if (radius <= 0 || height <= 0) {
    throw new Error('Dimensions must be positive');
  }

  const volume = Math.PI * radius * radius * height;
  const surface_area = 2 * Math.PI * radius * (radius + height);
  const lateral_area = 2 * Math.PI * radius * height;

  return { volume, surface_area, lateral_area };
}

/**
 * Cone calculations
 */
export function cone(radius, height) {
  if (radius <= 0 || height <= 0) {
    throw new Error('Dimensions must be positive');
  }

  const slant_height = trig.hypotenuse(radius, height);
  const volume = (1 / 3) * Math.PI * radius * radius * height;
  const surface_area = Math.PI * radius * (radius + slant_height);
  const lateral_area = Math.PI * radius * slant_height;

  return { volume, surface_area, lateral_area, slant_height };
}

/**
 * Pyramid calculations (square base)
 */
export function pyramid(base, height) {
  if (base <= 0 || height <= 0) {
    throw new Error('Dimensions must be positive');
  }

  const volume = (1 / 3) * base * base * height;
  const slant_height = trig.hypotenuse(base / 2, height);
  const lateral_area = 2 * base * slant_height;
  const surface_area = base * base + lateral_area;

  return { volume, surface_area, lateral_area, slant_height };
}

/**
 * Get shape properties summary
 */
export function shapeProperties(shapeType, ...params) {
  const shapes = {
    rectangle: () => rectangle(...params),
    square: () => square(...params),
    triangle: () => triangle(...params),
    'right-triangle': () => rightTriangle(...params),
    circle: () => circle(...params),
    ellipse: () => ellipse(...params),
    polygon: () => regularPolygon(...params),
    sphere: () => sphere(...params),
    cube: () => cube(...params),
    box: () => box(...params),
    cylinder: () => cylinder(...params),
    cone: () => cone(...params),
    pyramid: () => pyramid(...params),
  };

  if (!shapes[shapeType]) {
    throw new Error(`Unknown shape: ${shapeType}`);
  }

  return shapes[shapeType]();
}
