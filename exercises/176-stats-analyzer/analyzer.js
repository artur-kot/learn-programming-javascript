/**
 * Main Analyzer Application
 * Analyzes datasets using the math library
 */

import * as stats from '../175-math-library-setup/src/statistics.js';
import * as math from '../175-math-library-setup/src/math.js';
import {
  generateSummaryReport,
  generatePerformanceReport,
  generateCorrelationReport,
  generateGradingReport,
  generateTrendReport,
  generateComparisonReport,
  printReport
} from './reports.js';
import {
  studentScores,
  dailySales,
  dailyVisitors,
  employeeSalaries,
  monthlyTemperature,
  productRatings,
  satisfactionScores,
  studyAnalysis,
  campaignMetrics
} from './datasets.js';

/**
 * Analyzer class - performs various statistical analyses
 */
export class DataAnalyzer {
  constructor(title, data) {
    this.title = title;
    this.data = Array.isArray(data) ? data : Object.values(data);
  }

  /**
   * Get basic summary statistics
   */
  summary() {
    return generateSummaryReport(this.title, this.data);
  }

  /**
   * Get detailed performance analysis
   */
  performance() {
    return generatePerformanceReport(this.title, this.data);
  }

  /**
   * Get grading/ranking report
   */
  grades() {
    return generateGradingReport(this.title, this.data);
  }

  /**
   * Get trend analysis if time-series data
   */
  trend() {
    return generateTrendReport(this.title, this.data);
  }

  /**
   * Check correlation with another dataset
   */
  correlateWith(title, otherData) {
    return generateCorrelationReport(this.title, this.data, title, otherData);
  }

  /**
   * Get all statistics
   */
  all() {
    return {
      summary: this.summary(),
      performance: this.performance(),
      grades: this.grades(),
      trend: this.trend()
    };
  }

  /**
   * Print formatted analysis
   */
  print(reportType = 'summary') {
    if (reportType === 'all') {
      printReport(this.summary());
      printReport(this.performance());
      printReport(this.grades());
      printReport(this.trend());
    } else if (reportType === 'performance') {
      printReport(this.performance());
    } else if (reportType === 'grades') {
      printReport(this.grades());
    } else if (reportType === 'trend') {
      printReport(this.trend());
    } else {
      printReport(this.summary());
    }
  }
}

/**
 * Quick analysis function
 */
export function analyze(title, data, type = 'summary') {
  const analyzer = new DataAnalyzer(title, data);
  return analyzer.all()[type] || analyzer.summary();
}

// Export analyzer for use in other files
export { DataAnalyzer as default };
