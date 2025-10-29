/**
 * Examples: Real-world usage of Math Library
 * Shows practical applications of the library functions
 */

import * as math from './src/math.js';
import * as trig from './src/trigonometry.js';
import * as stats from './src/statistics.js';

console.log('=== Math Library Usage Examples ===\n');

// Example 1: Compound Interest Calculator
console.log('📊 Example 1: Calculate Compound Interest');
console.log('Principal: $1000, Rate: 5%, Years: 10, Compounded: 4x/year\n');

const principal = 1000;
const annualRate = 0.05;
const years = 10;
const compoundsPerYear = 4;

const rate = annualRate / compoundsPerYear;
const periods = years * compoundsPerYear;
const amount = principal * math.power(1 + rate, periods);

console.log(`Formula: A = P(1 + r/n)^(nt)`);
console.log(`A = ${principal} × (1 + ${rate})^${periods}`);
console.log(`Final Amount: $${math.round(amount, 2)}`);
console.log();

// Example 2: Distance Calculator
console.log('🗺️  Example 2: Calculate Distance Between Cities');
console.log('City A: (40.7128°N, 74.0060°W)');
console.log('City B: (51.5074°N, 0.1278°W)\n');

const cityA = [40.7128, -74.0060];
const cityB = [51.5074, -0.1278];

const dist = trig.distance(cityA[0], cityA[1], cityB[0], cityB[1]);
console.log(`Distance: ${math.round(dist, 2)} degrees`);
console.log('(Approximate - real calculation needs Earth radius)\n');

// Example 3: Statistics - Test Score Analysis
console.log('📈 Example 3: Analyze Student Test Scores');
const scores = [78, 85, 92, 88, 76, 95, 82, 88, 90, 87];
console.log(`Scores: ${scores.join(', ')}\n`);

const avg = stats.mean(scores);
const med = stats.median(scores);
const stdDev = stats.standardDeviation(scores);
const best = Math.max(...scores);
const worst = Math.min(...scores);
const rng = stats.range(scores);

console.log(`Mean: ${math.round(avg, 2)}`);
console.log(`Median: ${med}`);
console.log(`Standard Deviation: ${math.round(stdDev, 2)}`);
console.log(`Range: ${worst} - ${best} (${rng} points)`);
console.log();

// Example 4: Triangle Properties
console.log('△ Example 4: Calculate Triangle Properties');
const sideA = 5;
const sideB = 12;
const hyp = trig.hypotenuse(sideA, sideB);

console.log(`Right Triangle with sides ${sideA} and ${sideB}`);
console.log(`Hypotenuse: ${hyp}`);
console.log(`Area: ${math.round((sideA * sideB) / 2, 2)}`);
console.log();

// Example 5: Correlation Analysis
console.log('📊 Example 5: Analyze Relationship Between Variables');
const temperature = [20, 22, 25, 30, 35, 28, 24, 21];
const iceCreams = [5, 7, 10, 18, 25, 20, 12, 8];

const corr = stats.correlation(temperature, iceCreams);
console.log(`Temperature: ${temperature.join(', ')}`);
console.log(`Ice Cream Sales: ${iceCreams.join(', ')}\n`);
console.log(`Correlation: ${math.round(corr, 3)}`);
if (corr > 0.8) {
  console.log('→ Strong positive correlation: Higher temps = Higher ice cream sales');
} else if (corr < -0.8) {
  console.log('→ Strong negative correlation');
} else {
  console.log('→ Weak or no significant correlation');
}
console.log();

// Example 6: Circular Motion
console.log('⭕ Example 6: Circle Calculations');
const radius = 7;
const circum = trig.circumference(radius);
const area = trig.circleArea(radius);

console.log(`Circle with radius ${radius}:`);
console.log(`Circumference: ${math.round(circum, 2)}`);
console.log(`Area: ${math.round(area, 2)}`);
console.log();

// Example 7: Percentage and Distribution
console.log('% Example 7: Find Percentile Ranking');
const testScores = [45, 52, 68, 72, 78, 82, 85, 88, 92, 95];
const myScore = 85;
const pct = stats.percentile(testScores, myScore);

console.log(`Scores: ${testScores.join(', ')}`);
console.log(`Your Score: ${myScore}`);
console.log(`Percentile: ${math.round(pct, 1)}%`);
console.log(`You scored better than ${math.round(pct, 1)}% of test takers`);
