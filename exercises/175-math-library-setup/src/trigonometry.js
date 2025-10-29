/**
 * Trigonometry Utilities
 * Angle conversion and trigonometric functions
 */

/**
 * Convert degrees to radians
 * @param {number} degrees - Angle in degrees
 * @returns {number} Angle in radians
 */
export function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

/**
 * Convert radians to degrees
 * @param {number} radians - Angle in radians
 * @returns {number} Angle in degrees
 */
export function radiansToDegrees(radians) {
  return (radians * 180) / Math.PI;
}

/**
 * Calculate sine of an angle (in degrees)
 * @param {number} degrees - Angle in degrees
 * @returns {number} Sine value
 */
export function sine(degrees) {
  const radians = degreesToRadians(degrees);
  return Math.sin(radians);
}

/**
 * Calculate cosine of an angle (in degrees)
 * @param {number} degrees - Angle in degrees
 * @returns {number} Cosine value
 */
export function cosine(degrees) {
  const radians = degreesToRadians(degrees);
  return Math.cos(radians);
}

/**
 * Calculate tangent of an angle (in degrees)
 * @param {number} degrees - Angle in degrees
 * @returns {number} Tangent value
 */
export function tangent(degrees) {
  const radians = degreesToRadians(degrees);
  return Math.tan(radians);
}

/**
 * Calculate the hypotenuse of a right triangle
 * Using Pythagorean theorem: c = sqrt(a² + b²)
 * @param {number} a - Length of side a
 * @param {number} b - Length of side b
 * @returns {number} Length of hypotenuse
 */
export function hypotenuse(a, b) {
  return Math.sqrt(a * a + b * b);
}

/**
 * Calculate distance between two points on a plane
 * Using distance formula: sqrt((x2-x1)² + (y2-y1)²)
 * @param {number} x1 - X coordinate of point 1
 * @param {number} y1 - Y coordinate of point 1
 * @param {number} x2 - X coordinate of point 2
 * @param {number} y2 - Y coordinate of point 2
 * @returns {number} Distance between points
 */
export function distance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

/**
 * Calculate angle between two points from origin
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @returns {number} Angle in degrees
 */
export function angle(x, y) {
  return radiansToDegrees(Math.atan2(y, x));
}

/**
 * Calculate circumference of a circle
 * @param {number} radius - Radius of circle
 * @returns {number} Circumference (2πr)
 */
export function circumference(radius) {
  return 2 * Math.PI * radius;
}

/**
 * Calculate area of a circle
 * @param {number} radius - Radius of circle
 * @returns {number} Area (πr²)
 */
export function circleArea(radius) {
  return Math.PI * radius * radius;
}
