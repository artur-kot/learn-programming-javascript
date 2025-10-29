# Exercise 176: Math Library - Statistics Analyzer

## Overview

This exercise applies the math library you created in **Exercise 175** to build a real-world **statistics analyzer application**. You'll learn how to structure a complete data analysis tool using the library functions you've already built.

This is a practical exercise that demonstrates how math libraries are used in real applications to solve actual business problems.

## Learning Objectives

By completing this exercise, you will:

1. **Integrate a library** into a real application
2. **Design data analysis workflows** using library functions
3. **Generate meaningful statistical reports** from raw data
4. **Apply statistical concepts** to real-world datasets
5. **Build layered architecture** with separate concerns (data, analysis, reporting)

## Key Concepts

### 1. Library Integration

You'll use the math library created in Exercise 175 to perform all statistical calculations:

```javascript
import * as stats from '../175-math-library-setup/src/statistics.js';
import * as math from '../175-math-library-setup/src/math.js';

// Use library functions
const average = stats.mean(data);
const deviation = stats.standardDeviation(data);
```

**Why this matters:** Professional applications don't reinvent the wheel—they build on reliable, tested libraries.

### 2. Multi-layer Architecture

The analyzer is organized into layers:

- **`datasets.js`** - Data layer (stores sample datasets)
- **`analyzer.js`** - Business logic layer (performs analysis)
- **`reports.js`** - Presentation layer (formats output)
- **`test.js`** - Quality assurance layer (validates functionality)

Each layer has a single responsibility, making the code maintainable and testable.

### 3. Real-World Datasets

The analyzer includes 9 realistic datasets:

- **Student Scores** - Test performance data
- **Daily Sales** - Financial metrics
- **Website Visitors** - Traffic patterns
- **Employee Salaries** - HR data
- **Temperature** - Time-series measurements
- **Product Ratings** - Customer feedback
- **Satisfaction Scores** - Survey results
- **Study Hours vs Scores** - Correlation data
- **Campaign Metrics** - Marketing performance

Each represents real business data analysts work with daily.

### 4. Statistical Analysis Types

The analyzer performs multiple types of analyses:

#### Summary Statistics
```javascript
const report = analyzer.summary();
// Returns: count, mean, median, min, max, range, stdDev
```

#### Performance Analysis
```javascript
const perf = analyzer.performance();
// Returns: insights about data consistency, distribution, outliers
```

#### Grading/Ranking
```javascript
const grades = analyzer.grades();
// Returns: Z-scores and letter grades for each value
```

#### Trend Analysis
```javascript
const trend = analyzer.trend();
// Returns: change percentage, direction (📈 or 📉)
```

#### Correlation Analysis
```javascript
const corr = generateCorrelationReport('X', data1, 'Y', data2);
// Returns: correlation coefficient and interpretation
```

### 5. Object-Oriented Design

The `DataAnalyzer` class encapsulates analysis logic:

```javascript
class DataAnalyzer {
  constructor(title, data) { }
  summary() { }
  performance() { }
  grades() { }
  trend() { }
  correlateWith(title, other) { }
  print(type) { }
}

// Usage
const analyzer = new DataAnalyzer('Sales', salesData);
analyzer.print('performance');
```

**Benefits:**
- Encapsulation: Related data and methods together
- Reusability: Use same analyzer for different datasets
- Maintainability: Changes isolated within class

### 6. Report Generation

Reports combine multiple statistical measures with human-readable insights:

```javascript
{
  title: 'Student Test Scores',
  count: 10,
  mean: 86.8,
  median: 88.5,
  stdDev: 6.42,
  insights: [
    '✓ Data is reasonably consistent',
    '✓ Distribution appears symmetric',
    '✓ Data range is compact'
  ]
}
```

**Why this matters:** Raw numbers don't help—insights do. A good analyzer interprets statistics for the user.

## Project Structure

```
176-stats-analyzer/
├── exercise.json          # Exercise metadata
├── package.json           # Project configuration
├── datasets.js            # Sample data (9 datasets)
├── analyzer.js            # Main analyzer class
├── reports.js             # Report generation functions
├── test.js                # Test suite
├── example.js             # Real-world examples
└── README.md              # This file
```

### File Responsibilities

**`datasets.js`** - Data Layer
- Contains 9 realistic datasets
- Export as constants for analysis
- Real values from plausible scenarios

**`analyzer.js`** - Analysis Layer
- `DataAnalyzer` class with 5 analysis methods
- Uses math library for calculations
- Returns structured report objects

**`reports.js`** - Reporting Layer
- 6 report generation functions
- Formats raw statistics into insights
- Handles special cases (trends, correlations, grades)

**`test.js`** - Validation
- 10+ test cases
- Tests analyzer methods
- Tests correlation analysis
- Tests error handling

**`example.js`** - Demonstration
- 6 complete real-world examples
- Shows different analysis types
- Demonstrates library usage

## Running the Analyzer

### Run Examples
```bash
npm run example
```

Executes `example.js`, showing 6 real-world analysis scenarios:
1. Student test score analysis
2. Daily sales trends
3. Website visitor growth
4. Salary distribution
5. Study hours correlation
6. Marketing campaign metrics

Output includes summary, performance, grading, and trend reports.

### Run Tests
```bash
npm test
```

Executes `test.js`, running 10+ test cases:
- Analyzer creation and setup
- Summary statistics calculations
- Performance analysis
- Grading/ranking system
- Trend detection (upward, downward, stable)
- Correlation analysis
- Error handling

All tests output with color coding (✓ = pass, ✗ = fail) and summary counts.

### Use in Your Code
```javascript
import { DataAnalyzer, printReport } from './analyzer.js';
import { dailySales } from './datasets.js';

const analyzer = new DataAnalyzer('Sales Data', dailySales);
analyzer.print('performance');
```

## Real-World Applications

This analyzer demonstrates patterns used in:

### 1. Business Intelligence Tools
Dashboard software that analyzes sales, inventory, and revenue data uses similar statistical libraries.

### 2. Data Science Platforms
Tools like Python's Pandas use this same multi-layer architecture: data → analysis → visualization.

### 3. Educational Analytics
Schools use similar systems to analyze student performance, identify trends, and provide insights.

### 4. Marketing Analytics
Marketing teams use correlation analysis to understand campaign effectiveness and predict outcomes.

### 5. Quality Control
Manufacturers use statistical analysis to monitor production quality and detect outliers.

### 6. Financial Analysis
Investment firms use correlation analysis to understand relationships between assets.

## Code Patterns

### Pattern 1: Layered Architecture
```
Data Layer (datasets.js)
    ↓
Business Logic Layer (analyzer.js)
    ↓
Presentation Layer (reports.js)
    ↓
User Interface (example.js / test.js)
```

Each layer has single responsibility, making changes easier.

### Pattern 2: Object-Oriented Analysis
```javascript
// Create analyzer
const analyzer = new DataAnalyzer(title, data);

// Chain method calls
analyzer.summary();      // Basic stats
analyzer.performance();  // With insights
analyzer.grades();       // With ranking
analyzer.trend();        // Time-series
```

### Pattern 3: Correlation Analysis
```javascript
// Understand relationships
const report = generateCorrelationReport(
  'Variable X',
  xData,
  'Variable Y',
  yData
);

console.log(report.relationship); // "Strong positive"
```

### Pattern 4: Report Formatting
```javascript
// Combine statistics + interpretation
{
  count: 10,
  mean: 85.5,
  insights: [
    '✓ Data is consistent',
    '⚠ Distribution is skewed'
  ]
}
```

## Statistical Concepts Applied

### 1. Descriptive Statistics
- **Mean (Average)** - Central tendency
- **Median** - Middle value
- **Mode** - Most frequent value
- **Standard Deviation** - Spread of data
- **Range** - Min to max

### 2. Data Analysis
- **Outliers** - Values 2 standard deviations from mean
- **Distribution** - Symmetry check (mean ≈ median)
- **Trend** - Change from first half to second half
- **Percentile** - Position in ranking

### 3. Relationships
- **Correlation** - Strength of relationship (-1 to +1)
  - 0.8+: Strong
  - 0.5-0.8: Moderate
  - 0.2-0.5: Weak
  - -0.2-0.2: None
  - < -0.2: Negative

### 4. Grading System
- **Z-Score** - How many standard deviations from mean
- **Letter Grade** - Convert Z-score to A+/A/B+/B/C/D/F

## Advanced Challenges

### Challenge 1: Export to CSV
Add a `exportToCSV()` method that outputs report data in comma-separated format:
```javascript
analyzer.exportToCSV('results.csv');
```

### Challenge 2: Add Percentile Report
Create a `percentiles()` method that returns:
```javascript
{
  p25: 25th percentile,
  p50: 50th percentile (median),
  p75: 75th percentile,
  p95: 95th percentile
}
```

### Challenge 3: Time Series Decomposition
Build trend, seasonality, and residual components from time series data.

### Challenge 4: Interactive Analyzer
Create a command-line interface:
```bash
$ node analyzer.js
> load student-scores
> summary
> correlation salary performance
> exit
```

### Challenge 5: Visualization
Generate ASCII charts:
```
Sales Distribution
20-30: ███ (3)
30-40: ██████ (6)
40-50: █████ (5)
```

## Success Criteria

You've successfully completed this exercise when:

- ✅ All 7 files created (exercise.json, package.json, 5 JS files, README.md)
- ✅ `analyzer.js` has DataAnalyzer class with 5+ methods
- ✅ `reports.js` has 6 report generation functions
- ✅ `datasets.js` has 9 realistic datasets
- ✅ `test.js` has 10+ passing test cases
- ✅ `example.js` runs without errors and shows all 6 examples
- ✅ All calculations use the math library from Exercise 175
- ✅ Code is well-documented with JSDoc comments
- ✅ No external dependencies (only Exercise 175)
- ✅ Outputs are formatted clearly with insights

## Testing Your Work

```bash
# Run the example analyses
npm run example

# Run the test suite
npm test
```

**Expected output for `npm run example`:**
- 6 complete analysis sections
- Formatted reports for each dataset
- Correlation analysis results
- No errors

**Expected output for `npm test`:**
- 10+ test results (✓ or ✗)
- All tests should pass (✓)
- Summary showing passed/failed count

## Important Notes

### 1. Import Paths
Exercise 176 imports from Exercise 175 using relative paths:
```javascript
import * as stats from '../175-math-library-setup/src/statistics.js';
```

Make sure your directory structure matches this path.

### 2. Array Extraction
When receiving objects with scores:
```javascript
// Object array
const data = studentScores.map(s => s.score);

// Extract numeric values
const scores = data.filter(n => typeof n === 'number');
```

### 3. Rounding for Display
Use the math library's rounding function:
```javascript
import { round } from '../175-math-library-setup/src/math.js';
math.round(3.14159, 2); // 3.14
```

### 4. Error Handling
Check array lengths before correlation:
```javascript
if (data1.length !== data2.length) {
  throw new Error('Datasets must have same length');
}
```

## Common Mistakes to Avoid

❌ **Importing without relative paths**
```javascript
// Wrong
import { sum } from 'statistics.js';
```

✅ **Use correct relative paths**
```javascript
// Correct
import { sum } from '../175-math-library-setup/src/statistics.js';
```

---

❌ **Forgetting to extract numeric values**
```javascript
// Wrong - objects aren't numbers
const analyzer = new DataAnalyzer('Data', studentScores);
```

✅ **Extract the values first**
```javascript
// Correct
const scores = studentScores.map(s => s.score);
const analyzer = new DataAnalyzer('Data', scores);
```

---

❌ **Not handling edge cases**
```javascript
// Wrong - fails with empty array
const mean = stats.mean(data);
```

✅ **Add validation**
```javascript
// Correct
if (data.length === 0) {
  throw new Error('Cannot analyze empty dataset');
}
```

## Learning Resources

### Statistics Concepts
- [Khan Academy - Statistics](https://www.khanacademy.org/math/statistics-probability)
- [Standard Deviation](https://en.wikipedia.org/wiki/Standard_deviation)
- [Correlation](https://en.wikipedia.org/wiki/Correlation)

### JavaScript OOP
- [MDN - Object-Oriented Programming](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects)
- [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [Module Pattern](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

### Data Analysis
- [Pandas Documentation](https://pandas.pydata.org/docs/) - Python data analysis library
- [R Project Statistics](https://www.r-project.org/) - Statistical computing

## Next Steps

After completing this exercise:

1. **Exercise 177** - Build a Geometry Calculator using the same library
2. Review the patterns used here—they apply to all data analysis
3. Consider how you'd extend this analyzer with new analysis types
4. Think about how this architecture scales to bigger projects

---

**Estimated Time:** 2.5 hours

**Difficulty:** Intermediate

**Concepts:** Library integration, object-oriented design, statistical analysis, real-world data
