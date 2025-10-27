## Grade Calculator - Multiple Subjects GPA

This exercise builds on **exercise 020**! You have working functions for converting scores to letter grades and determining pass/fail status. Now you'll add GPA (Grade Point Average) calculation across multiple courses.

Students don't just take one class - they take multiple courses each semester. Schools need to calculate an overall GPA to measure academic performance. Let's build that functionality!

## What You're Building On

From exercises 018-020, you already have:
- `getLetterGrade(score)` - Converts numeric scores to letter grades with +/- modifiers
- `getPassFailStatus(letterGrade)` - Determines if a grade is passing or failing

## Your Challenge

Open `021-grade-gpa.js`. You'll see your complete functions from previous exercises.

Your task is to create a NEW function called `calculateGPA(grades)` that:
- Takes an array of letter grades (like `["A", "B+", "A-", "B", "C"]`)
- Converts each letter grade to its numeric grade point value
- Calculates the average of all grade points
- Returns the GPA rounded to 2 decimal places

**GPA Scale (4.0 scale):**
- A+ = 4.0, A = 4.0, A- = 3.7
- B+ = 3.3, B = 3.0, B- = 2.7
- C+ = 2.3, C = 2.0, C- = 1.7
- D+ = 1.3, D = 1.0, D- = 0.7
- F = 0.0

**Formula:** GPA = (Sum of all grade points) / (Number of grades)

## Expected Output

When you run your code, you should see:
```
Student grades: A, B+, A-, B, A+
GPA: 3.6

Student 2 grades: B, B-, C+, B, C
GPA: 2.6

Student 3 grades: A+, A, A, A-, A
GPA: 3.94
```

## Hints

<details>
<summary>Hint 1: Working with arrays</summary>

The `grades` parameter is an array containing multiple letter grades:

```javascript
const grades = ["A", "B+", "A-"];

// Access individual elements:
console.log(grades[0]);  // "A"
console.log(grades[1]);  // "B+"
console.log(grades[2]);  // "A-"

// Get the number of elements:
console.log(grades.length);  // 3
```

You need to process each grade in the array and convert it to a number.
</details>

<details>
<summary>Hint 2: Looping through the array</summary>

Use a `for...of` loop to process each grade:

```javascript
function calculateGPA(grades) {
  let totalPoints = 0;

  for (const grade of grades) {
    // grade will be "A", then "B+", then "A-", etc.
    // Convert each grade to points and add to total
  }

  const gpa = totalPoints / grades.length;
  return gpa;
}
```

The loop visits each element in the array, one at a time.
</details>

<details>
<summary>Hint 3: Converting grades to points with switch</summary>

Use a switch statement inside the loop to convert each grade:

```javascript
for (const grade of grades) {
  switch (grade) {
    case "A+":
    case "A":
      totalPoints += 4.0;
      break;
    case "A-":
      totalPoints += 3.7;
      break;
    case "B+":
      totalPoints += 3.3;
      break;
    case "B":
      totalPoints += 3.0;
      break;
    // Continue for all other grades...
  }
}
```

Each grade adds its point value to the running total!
</details>

<details>
<summary>Hint 4: Rounding to 2 decimal places</summary>

Use `.toFixed(2)` to round, then convert back to a number:

```javascript
const gpa = totalPoints / grades.length;
return Number(gpa.toFixed(2));

// Example:
// 3.944444 → "3.94" → 3.94
```

`.toFixed(2)` returns a string, so wrap it in `Number()` to convert back!
</details>

<details>
<summary>Hint 5: Complete structure</summary>

Here's the complete function structure:

```javascript
function calculateGPA(grades) {
  let totalPoints = 0;

  for (const grade of grades) {
    switch (grade) {
      case "A+":
      case "A":
        totalPoints += 4.0;
        break;
      case "A-":
        totalPoints += 3.7;
        break;
      // Continue for all grades B+ through F...
    }
  }

  const gpa = totalPoints / grades.length;
  return Number(gpa.toFixed(2));
}
```

Fill in all the grade cases from the GPA scale!
</details>

## Test Your Code

To run your code and see the output:
```bash
cd exercises/021-grade-gpa
node 021-grade-gpa.js
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise teaches you:
- **Arrays** - storing multiple values in one variable
- **For...of loops** - iterating through array elements
- **Accumulation pattern** - building up a total in a loop
- **Switch statements with arrays** - processing each element differently
- **Rounding numbers** - using toFixed() for decimal precision
- **Average calculation** - sum divided by count
- **Real-world data processing** - working with multiple related values

Arrays and loops are fundamental to processing collections of data!

## Reflection Questions

After completing the exercise, think about:
1. Why is a loop necessary for this task? Could you calculate GPA without one?
2. What would happen if the grades array was empty? How could you handle that?
3. How is this different from checking a single grade in previous exercises?
4. Why do A+ and A both equal 4.0 instead of having different values?

## Solution

<details>
<summary>Click to see the solution (try the exercise first!)</summary>

```javascript
export function getLetterGrade(score) {
  // This function is complete from exercise 019
  if (score >= 90) {
    if (score >= 97) {
      return "A+";
    } else if (score >= 93) {
      return "A";
    } else {
      return "A-";
    }
  } else if (score >= 80) {
    if (score >= 87) {
      return "B+";
    } else if (score >= 83) {
      return "B";
    } else {
      return "B-";
    }
  } else if (score >= 70) {
    if (score >= 77) {
      return "C+";
    } else if (score >= 73) {
      return "C";
    } else {
      return "C-";
    }
  } else if (score >= 60) {
    if (score >= 67) {
      return "D+";
    } else if (score >= 63) {
      return "D";
    } else {
      return "D-";
    }
  } else {
    return "F";
  }
}

export function getPassFailStatus(letterGrade) {
  // This function is complete from exercise 020
  switch (letterGrade) {
    case "A+":
    case "A":
    case "A-":
    case "B+":
    case "B":
    case "B-":
    case "C+":
    case "C":
    case "C-":
    case "D+":
    case "D":
    case "D-":
      return "Pass";

    case "F":
      return "Fail";

    default:
      return "Invalid grade";
  }
}

export function calculateGPA(grades) {
  let totalPoints = 0;

  for (const grade of grades) {
    switch (grade) {
      case "A+":
      case "A":
        totalPoints += 4.0;
        break;
      case "A-":
        totalPoints += 3.7;
        break;
      case "B+":
        totalPoints += 3.3;
        break;
      case "B":
        totalPoints += 3.0;
        break;
      case "B-":
        totalPoints += 2.7;
        break;
      case "C+":
        totalPoints += 2.3;
        break;
      case "C":
        totalPoints += 2.0;
        break;
      case "C-":
        totalPoints += 1.7;
        break;
      case "D+":
        totalPoints += 1.3;
        break;
      case "D":
        totalPoints += 1.0;
        break;
      case "D-":
        totalPoints += 0.7;
        break;
      case "F":
        totalPoints += 0.0;
        break;
    }
  }

  const gpa = totalPoints / grades.length;
  return Number(gpa.toFixed(2));
}

// Test the GPA calculation
const studentGrades = ["A", "B+", "A-", "B", "A+"];
const gpa = calculateGPA(studentGrades);
console.log("Student grades:", studentGrades.join(", "));
console.log("GPA:", gpa);

// Test with different grade combinations
const student2Grades = ["B", "B-", "C+", "B", "C"];
const gpa2 = calculateGPA(student2Grades);
console.log("\nStudent 2 grades:", student2Grades.join(", "));
console.log("GPA:", gpa2);

const student3Grades = ["A+", "A", "A", "A-", "A"];
const gpa3 = calculateGPA(student3Grades);
console.log("\nStudent 3 grades:", student3Grades.join(", "));
console.log("GPA:", gpa3);
```

**Breaking down the GPA calculation:**

For grades `["A", "B+", "A-", "B", "A+"]`:

**Step 1: Initialize total**
```javascript
let totalPoints = 0;
```

**Step 2: Process each grade**
```
Loop iteration 1: grade = "A"
  → switch matches "A" → totalPoints += 4.0 → totalPoints = 4.0

Loop iteration 2: grade = "B+"
  → switch matches "B+" → totalPoints += 3.3 → totalPoints = 7.3

Loop iteration 3: grade = "A-"
  → switch matches "A-" → totalPoints += 3.7 → totalPoints = 11.0

Loop iteration 4: grade = "B"
  → switch matches "B" → totalPoints += 3.0 → totalPoints = 14.0

Loop iteration 5: grade = "A+"
  → switch matches "A+" → totalPoints += 4.0 → totalPoints = 18.0
```

**Step 3: Calculate average**
```javascript
const gpa = 18.0 / 5;  // 3.6
return Number((3.6).toFixed(2));  // 3.6
```

**The accumulation pattern:**

This is called the **accumulator pattern** - building up a total in a loop:

```javascript
let total = 0;  // Start at zero

for (const item of array) {
  total += item;  // Add each item to the total
}

const average = total / array.length;  // Use the accumulated total
```

This pattern appears everywhere in programming!

**Why toFixed and Number?**

```javascript
const raw = 3.944444444;
const fixed = raw.toFixed(2);     // "3.94" (string!)
const final = Number(fixed);       // 3.94 (number)

// Or in one line:
const result = Number(raw.toFixed(2));
```

`.toFixed(2)` rounds to 2 decimal places but returns a string. We convert back to a number for consistency.

**Alternative: Helper function for grade to points**

You could extract the switch to a separate function:

```javascript
function gradeToPoints(grade) {
  switch (grade) {
    case "A+":
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    // ... etc
    default:
      return 0.0;
  }
}

function calculateGPA(grades) {
  let totalPoints = 0;
  for (const grade of grades) {
    totalPoints += gradeToPoints(grade);
  }
  return Number((totalPoints / grades.length).toFixed(2));
}
```

This separates concerns and makes the code more modular!

**Edge case: Empty array**

What if someone passes an empty array?

```javascript
calculateGPA([]);  // Division by zero! → NaN or Infinity
```

You could add validation:

```javascript
function calculateGPA(grades) {
  if (grades.length === 0) {
    return 0.0;  // or throw an error
  }

  let totalPoints = 0;
  // ... rest of function
}
```

**Real-world GPA systems:**

Different schools use different scales:
- **4.0 scale** (most common): A=4.0, B=3.0, C=2.0, D=1.0, F=0.0
- **5.0 scale** (weighted): Honors/AP classes worth more (A=5.0)
- **100-point scale**: Direct average of numeric scores
- **European scale**: 1-6 or 1-10, often reversed (1=best)

Our implementation uses the standard US 4.0 scale with +/- modifiers!

**Combining all three functions:**

Now you can go from numeric scores to GPA:

```javascript
// Start with numeric scores
const scores = [95, 87, 90, 83, 98];

// Convert to letter grades
const grades = [];
for (const score of scores) {
  grades.push(getLetterGrade(score));
}
// grades = ["A", "B+", "A-", "B", "A+"]

// Calculate GPA
const gpa = calculateGPA(grades);
console.log("GPA:", gpa);  // 3.6

// Check if passing
for (const grade of grades) {
  console.log(`${grade}: ${getPassFailStatus(grade)}`);
}
```

You've built a complete grading system by combining simple functions!

</details>

## Next Steps

Awesome work! You can now calculate GPA across multiple courses. In the final exercise of this series (**022-grade-honor-roll**), you'll determine honor roll eligibility using complex conditions that combine GPA requirements with grade restrictions. This will bring together everything you've learned about conditionals!

Your current solution will be the starting point for the next exercise!

