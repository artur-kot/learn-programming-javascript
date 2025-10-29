/**
 * Example Usage of Stats Analyzer
 */

import { DataAnalyzer } from './analyzer.js';
import {
  studentScores,
  dailySales,
  dailyVisitors,
  employeeSalaries,
  studyAnalysis,
  campaignMetrics
} from './datasets.js';
import { printReport, generateCorrelationReport } from './reports.js';

console.log('📊 Statistics Analyzer - Real-World Examples\n');

// Example 1: Student Test Scores
console.log('='.repeat(60));
console.log('Example 1: Student Test Scores Analysis');
console.log('='.repeat(60));

const scoresData = studentScores.map(s => s.score);
const scoreAnalyzer = new DataAnalyzer('Student Test Scores', scoresData);

printReport(scoreAnalyzer.summary());
printReport(scoreAnalyzer.performance());
printReport(scoreAnalyzer.grades());

// Example 2: Daily Sales Trend
console.log('='.repeat(60));
console.log('Example 2: Daily Sales Trend Analysis');
console.log('='.repeat(60));

const salesAnalyzer = new DataAnalyzer('Daily Sales ($)', dailySales);
printReport(salesAnalyzer.trend());

// Example 3: Website Visitors Growth
console.log('='.repeat(60));
console.log('Example 3: Website Visitors Over Time');
console.log('='.repeat(60));

const visitorsAnalyzer = new DataAnalyzer('Daily Visitors', dailyVisitors);
printReport(visitorsAnalyzer.trend());

// Example 4: Employee Salary Distribution
console.log('='.repeat(60));
console.log('Example 4: Employee Salary Distribution');
console.log('='.repeat(60));

const salaryAnalyzer = new DataAnalyzer('Employee Salaries ($K)', employeeSalaries);
printReport(salaryAnalyzer.performance());

// Example 5: Correlation Analysis - Study Hours vs Test Scores
console.log('='.repeat(60));
console.log('Example 5: Study Hours vs Test Scores Correlation');
console.log('='.repeat(60));

const correlationReport = generateCorrelationReport(
  'Study Hours',
  studyAnalysis.hoursStudied,
  'Test Scores',
  studyAnalysis.testScores
);
printReport(correlationReport);

// Example 6: Marketing Campaign Performance
console.log('='.repeat(60));
console.log('Example 6: Marketing Campaign Analysis');
console.log('='.repeat(60));

console.log('\n📈 Impressions Analysis:');
const impressionsAnalyzer = new DataAnalyzer('Campaign Impressions', campaignMetrics.impressions);
console.log(impressionsAnalyzer.summary());

console.log('\n📊 Clicks Analysis:');
const clicksAnalyzer = new DataAnalyzer('Campaign Clicks', campaignMetrics.clicks);
console.log(clicksAnalyzer.summary());

console.log('\n💰 Conversions Analysis:');
const conversionsAnalyzer = new DataAnalyzer('Campaign Conversions', campaignMetrics.conversions);
console.log(conversionsAnalyzer.summary());

// Impressions to Clicks correlation
const impressionsClicksReport = generateCorrelationReport(
  'Impressions',
  campaignMetrics.impressions,
  'Clicks',
  campaignMetrics.clicks
);
console.log('\n🔗 Impressions vs Clicks:');
printReport(impressionsClicksReport);

// Clicks to Conversions correlation
const clicksConversionsReport = generateCorrelationReport(
  'Clicks',
  campaignMetrics.clicks,
  'Conversions',
  campaignMetrics.conversions
);
console.log('\n🔗 Clicks vs Conversions:');
printReport(clicksConversionsReport);

console.log('='.repeat(60));
console.log('✓ Analysis complete!');
console.log('='.repeat(60));
