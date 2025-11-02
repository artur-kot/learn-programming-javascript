/**
 * Report Generation Functions
 * Creates formatted statistical reports
 */

import * as stats from '../175-math-library-setup/src/statistics.js';
import * as math from '../175-math-library-setup/src/math.js';

/**
 * Generate a summary report for a dataset
 */
export function generateSummaryReport(title, numbers) {
  const avg = stats.mean(numbers);
  const med = stats.median(numbers);
  const stdDev = stats.standardDeviation(numbers);
  const rng = stats.range(numbers);
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);

  return {
    title,
    count: numbers.length,
    mean: math.round(avg, 2),
    median: med,
    stdDev: math.round(stdDev, 2),
    range: rng,
    min,
    max,
  };
}

/**
 * Generate a detailed performance report with insights
 */
export function generatePerformanceReport(title, numbers) {
  const report = generateSummaryReport(title, numbers);
  const avg = stats.mean(numbers);
  const variance = stats.variance(numbers);

  // Determine performance level
  const mean50 = stats.percentile(numbers, avg);
  
  // Identify outliers (more than 2 standard deviations from mean)
  const stdDev = Math.sqrt(variance);
  const outliers = numbers.filter(
    n => Math.abs(n - avg) > 2 * stdDev
  );

  return {
    ...report,
    variance: math.round(variance, 2),
    outliers: outliers.length,
    outliersPercentage: math.round((outliers.length / numbers.length) * 100, 2),
    insights: generateInsights(report, avg, stdDev)
  };
}

/**
 * Generate insights based on statistical analysis
 */
function generateInsights(report, mean, stdDev) {
  const insights = [];

  // Consistency check
  const coefficientOfVariation = (stdDev / mean) * 100;
  if (coefficientOfVariation < 10) {
    insights.push('✓ Data is very consistent');
  } else if (coefficientOfVariation < 25) {
    insights.push('✓ Data is reasonably consistent');
  } else {
    insights.push('⚠ Data shows high variability');
  }

  // Distribution check
  if (Math.abs(report.mean - report.median) < stdDev * 0.5) {
    insights.push('✓ Distribution appears symmetric');
  } else {
    insights.push('⚠ Distribution is skewed');
  }

  // Range check
  if (report.range < stdDev * 6) {
    insights.push('✓ Data range is compact');
  } else {
    insights.push('⚠ Data has wide range');
  }

  return insights;
}

/**
 * Generate correlation report between two datasets
 */
export function generateCorrelationReport(title1, data1, title2, data2) {
  if (data1.length !== data2.length) {
    throw new Error('Datasets must have same length');
  }

  const corr = stats.correlation(data1, data2);
  const mean1 = stats.mean(data1);
  const mean2 = stats.mean(data2);

  let relationship = '';
  if (corr > 0.8) {
    relationship = 'Strong positive';
  } else if (corr > 0.5) {
    relationship = 'Moderate positive';
  } else if (corr > 0.2) {
    relationship = 'Weak positive';
  } else if (corr > -0.2) {
    relationship = 'No correlation';
  } else if (corr > -0.5) {
    relationship = 'Weak negative';
  } else if (corr > -0.8) {
    relationship = 'Moderate negative';
  } else {
    relationship = 'Strong negative';
  }

  return {
    comparison: `${title1} vs ${title2}`,
    correlation: math.round(corr, 3),
    relationship,
    interpretation: `"${title1}" and "${title2}" show a ${relationship.toLowerCase()} correlation`
  };
}

/**
 * Generate performance tier report (A+, A, B+, etc.)
 */
export function generateGradingReport(title, numbers) {
  const avg = stats.mean(numbers);
  const stdDev = stats.standardDeviation(numbers);

  const graded = numbers.map(score => {
    const zScore = (score - avg) / stdDev;
    let grade;

    if (zScore > 1.5) grade = 'A+';
    else if (zScore > 1.0) grade = 'A';
    else if (zScore > 0.5) grade = 'B+';
    else if (zScore > 0.0) grade = 'B';
    else if (zScore > -0.5) grade = 'C';
    else if (zScore > -1.0) grade = 'D';
    else grade = 'F';

    return { score, grade, zScore: math.round(zScore, 2) };
  });

  const gradeCounts = {};
  graded.forEach(item => {
    gradeCounts[item.grade] = (gradeCounts[item.grade] || 0) + 1;
  });

  return {
    title,
    mean: math.round(avg, 2),
    stdDev: math.round(stdDev, 2),
    graded,
    gradeCounts,
    distribution: generateGradeDistribution(gradeCounts, numbers.length)
  };
}

/**
 * Generate visual grade distribution
 */
function generateGradeDistribution(counts, total) {
  const grades = ['A+', 'A', 'B+', 'B', 'C', 'D', 'F'];
  const distribution = {};

  grades.forEach(grade => {
    const count = counts[grade] || 0;
    const percentage = math.round((count / total) * 100, 1);
    const bar = '█'.repeat(Math.round(percentage / 5));
    distribution[grade] = `${bar} ${percentage}% (${count})`;
  });

  return distribution;
}

/**
 * Generate comparison report between multiple datasets
 */
export function generateComparisonReport(datasets) {
  return datasets.map(({ title, data }) => {
    const report = generateSummaryReport(title, data);
    return report;
  }).sort((a, b) => b.mean - a.mean);
}

/**
 * Generate trend analysis report
 */
export function generateTrendReport(title, timeSeries) {
  const report = generateSummaryReport(title, timeSeries);

  // Determine trend
  const firstHalf = timeSeries.slice(0, Math.floor(timeSeries.length / 2));
  const secondHalf = timeSeries.slice(Math.floor(timeSeries.length / 2));

  const firstAvg = stats.mean(firstHalf);
  const secondAvg = stats.mean(secondHalf);
  const changePercent = math.round(((secondAvg - firstAvg) / firstAvg) * 100, 2);

  let trend = 'Stable';
  if (changePercent > 5) trend = '📈 Upward';
  else if (changePercent < -5) trend = '📉 Downward';

  return {
    ...report,
    firstHalfAverage: math.round(firstAvg, 2),
    secondHalfAverage: math.round(secondAvg, 2),
    changePercent,
    trend
  };
}

/**
 * Pretty print a report to console
 */
export function printReport(report) {
  console.log('\n' + '='.repeat(60));
  console.log(`📊 ${report.title || 'Report'}`);
  console.log('='.repeat(60));

  for (const [key, value] of Object.entries(report)) {
    if (key === 'title') continue;

    if (Array.isArray(value)) {
      console.log(`\n${key}:`);
      value.forEach(item => console.log(`  • ${item}`));
    } else if (typeof value === 'object' && value !== null) {
      console.log(`\n${key}:`);
      for (const [k, v] of Object.entries(value)) {
        console.log(`  ${k}: ${v}`);
      }
    } else {
      console.log(`${key}: ${value}`);
    }
  }

  console.log('\n' + '='.repeat(60) + '\n');
}
