/**
 * Test Suite for Stats Analyzer
 */

import { DataAnalyzer } from './analyzer.js';
import { generateCorrelationReport } from './reports.js';

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

console.log('Testing Stats Analyzer\n');

// Test 1: Basic analyzer creation
const testData = [10, 20, 30, 40, 50];
const analyzer = new DataAnalyzer('Test Data', testData);
assert(analyzer.title === 'Test Data', 'Analyzer created with correct title');
assert(analyzer.data.length === 5, 'Analyzer stores correct number of values');

// Test 2: Summary statistics
const summary = analyzer.summary();
assert(summary.count === 5, 'Summary has correct count');
assert(summary.mean === 30, 'Summary calculates correct mean');
assert(summary.median === 30, 'Summary calculates correct median');
assert(summary.min === 10, 'Summary has correct minimum');
assert(summary.max === 50, 'Summary has correct maximum');

// Test 3: Performance report
const performance = analyzer.performance();
assert(performance.count === 5, 'Performance report has count');
assert('stdDev' in performance, 'Performance report includes standard deviation');
assert('outliers' in performance, 'Performance report includes outlier count');

// Test 4: Grading report
const grades = analyzer.grades();
assert('graded' in grades, 'Grading report includes graded values');
assert('gradeCounts' in grades, 'Grading report includes grade counts');
assert(grades.graded.length === 5, 'Grading report grades all values');

// Test 5: Trend analysis
const trendData = [100, 110, 120, 130, 140];
const trendAnalyzer = new DataAnalyzer('Trend Test', trendData);
const trend = trendAnalyzer.trend();
assert(trend.trend === '📈 Upward', 'Trend correctly identifies upward trend');

// Test 6: Downward trend
const downwardData = [140, 130, 120, 110, 100];
const downwardAnalyzer = new DataAnalyzer('Downward Trend', downwardData);
const downwardTrend = downwardAnalyzer.trend();
assert(downwardTrend.trend === '📉 Downward', 'Trend correctly identifies downward trend');

// Test 7: Correlation analysis
const x = [1, 2, 3, 4, 5];
const y = [2, 4, 6, 8, 10];
const correlationReport = generateCorrelationReport('X', x, 'Y', y);
assert(Math.abs(correlationReport.correlation - 1.0) < 0.01, 'Perfect positive correlation detected');
assert(correlationReport.relationship === 'Strong positive', 'Correlation relationship correctly identified');

// Test 8: Negative correlation
const y2 = [10, 8, 6, 4, 2];
const negCorrelation = generateCorrelationReport('X', x, 'Y2', y2);
assert(Math.abs(negCorrelation.correlation - (-1.0)) < 0.01, 'Perfect negative correlation detected');

// Test 9: No correlation (random data)
const random = [1, 5, 2, 9, 3];
const noCorrelation = generateCorrelationReport('X', x, 'Random', random);
assert(Math.abs(noCorrelation.correlation) < 0.5, 'No correlation case handled');

// Test 10: Multiple datasets
const data1 = [1, 2, 3, 4, 5];
const data2 = [10, 20, 30, 40, 50];
const data3 = [5, 10, 15, 20, 25];

const datasets = [
  { title: 'Data1', data: data1 },
  { title: 'Data2', data: data2 },
  { title: 'Data3', data: data3 }
];

// Test error handling
try {
  const mismatchX = [1, 2, 3];
  const mismatchY = [1, 2];
  generateCorrelationReport('X', mismatchX, 'Y', mismatchY);
  assert(false, 'Should throw error for mismatched array lengths');
} catch (e) {
  assert(true, 'Correctly throws error for mismatched arrays');
}

console.log(`\n${green}Passed: ${passed}${reset}`);
console.log(`${red}Failed: ${failed}${reset}`);
console.log(`Total: ${passed + failed}`);
