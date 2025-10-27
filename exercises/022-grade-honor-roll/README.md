## Grade Calculator - Honor Roll

This is the final exercise in the Grade Calculator series! You've built functions to convert scores to grades, determine pass/fail status, and calculate GPA. Now you'll implement honor roll eligibility - a real-world feature that combines multiple conditions.

Schools recognize outstanding students by placing them on the honor roll. This isn't just about having a high GPA - students must also maintain consistently strong grades across all courses. Let's implement this!

## What You're Building On

From exercises 018-021, you already have:
- `getLetterGrade(score)` - Converts numeric scores to letter grades with +/- modifiers
- `getPassFailStatus(letterGrade)` - Determines if a grade is passing or failing
- `calculateGPA(grades)` - Calculates GPA from an array of letter grades

## Your Challenge

Open `022-grade-honor-roll.js`. You'll see all your complete functions from previous exercises.

Your task is to create a NEW function called `checkHonorRoll(gpa, grades)` that:
- Takes a GPA (number) and array of letter grades as input
- Returns `true` if the student qualifies for honor roll
- Returns `false` if they don't qualify

**Honor Roll Requirements (BOTH must be true):**
1. GPA must be **3.5 or higher** AND
2. **No grade below B-** (no C+, C, C-, D+, D, D-, or F grades allowed)

This means a student with a 3.8 GPA but one C+ does NOT qualify!

## Expected Output

When you run your code, you should see:
```
=== Honor Roll Check ===

Student 1 grades: A, A-, B+, A, A-
GPA: 3.74
Honor Roll: YES

Student 2 grades: A, A, A+, A, C+
GPA: 3.66
Honor Roll: NO

Student 3 grades: B, B+, B, B-, B
GPA: 3.06
Honor Roll: NO

Student 4 grades: A+, A+, A, A+, A
GPA: 4.0
Honor Roll: YES
```

## Hints

<details>
<summary>Hint 1: Complex conditions with AND</summary>

Honor roll requires TWO conditions to be true simultaneously:

```javascript
function checkHonorRoll(gpa, grades) {
  // Condition 1: GPA check
  const hasHighGPA = gpa >= 3.5;

  // Condition 2: No low grades check
  const hasNoLowGrades = // need to check...

  // Both must be true
  return hasHighGPA && hasNoLowGrades;
}
```

Use the AND operator (`&&`) to combine multiple requirements!
</details>

<details>
<summary>Hint 2: Early return for GPA check</summary>

Check the GPA first - if it's too low, return false immediately:

```javascript
function checkHonorRoll(gpa, grades) {
  if (gpa < 3.5) {
    return false;  // Doesn't qualify - stop checking
  }

  // If we reach here, GPA is good
  // Now check grades...
}
```

This is called an **early return** - exiting as soon as you know the answer!
</details>

<details>
<summary>Hint 3: Checking for low grades in a loop</summary>

Loop through the grades array and check each one:

```javascript
for (const grade of grades) {
  // Check if this grade is below B-
  if (grade === "C+" || grade === "C" || grade === "C-" ||
      grade === "D+" || grade === "D" || grade === "D-" || grade === "F") {
    return false;  // Found a low grade - disqualified!
  }
}

// If we get here, no low grades were found
return true;
```

As soon as you find one low grade, you can stop checking and return false!
</details>

<details>
<summary>Hint 4: Alternative approach with switch</summary>

You could use a switch statement to check for low grades:

```javascript
for (const grade of grades) {
  switch (grade) {
    case "C+":
    case "C":
    case "C-":
    case "D+":
    case "D":
    case "D-":
    case "F":
      return false;  // Found a disqualifying grade
  }
}
```

Both if and switch work - choose what's clearer to you!
</details>

<details>
<summary>Hint 5: Complete function structure</summary>

Here's the complete structure:

```javascript
function checkHonorRoll(gpa, grades) {
  // Check GPA requirement first
  if (gpa < 3.5) {
    return false;
  }

  // Check for any grades below B-
  for (const grade of grades) {
    if (grade === "C+" || grade === "C" || grade === "C-" ||
        grade === "D+" || grade === "D" || grade === "D-" || grade === "F") {
      return false;
    }
  }

  // Both conditions met!
  return true;
}
```

Try to implement it yourself before looking!
</details>

## Test Your Code

To run your code and see the output:
```bash
cd exercises/022-grade-honor-roll
node 022-grade-honor-roll.js
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise teaches you:
- **Complex conditionals** - combining multiple requirements with AND
- **Early returns** - exiting functions as soon as you know the result
- **Array validation** - checking if all elements meet criteria
- **Guard clauses** - checking failure conditions first
- **Real-world business logic** - implementing multi-factor eligibility rules
- **Function composition** - using multiple functions together to solve problems

These patterns are essential for implementing complex rules in real applications!

## Reflection Questions

After completing the exercise, think about:
1. Why is it more efficient to check GPA first before looping through grades?
2. What's the difference between returning inside a loop vs after the loop?
3. How would you modify this to have different honor roll tiers (High Honors vs Honors)?
4. Why do we use AND (&&) for honor roll but OR (||) would be wrong?

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
  // This function is complete from exercise 021
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

export function checkHonorRoll(gpa, grades) {
  // Check GPA requirement first
  if (gpa < 3.5) {
    return false;
  }

  // Check for any grades below B-
  for (const grade of grades) {
    if (grade === "C+" || grade === "C" || grade === "C-" ||
        grade === "D+" || grade === "D" || grade === "D-" || grade === "F") {
      return false;
    }
  }

  // Both conditions met!
  return true;
}

// Test honor roll eligibility
console.log("=== Honor Roll Check ===\n");

// Student 1: High GPA, all good grades → Should qualify
const student1 = ["A", "A-", "B+", "A", "A-"];
const gpa1 = calculateGPA(student1);
const honorRoll1 = checkHonorRoll(gpa1, student1);
console.log("Student 1 grades:", student1.join(", "));
console.log("GPA:", gpa1);
console.log("Honor Roll:", honorRoll1 ? "YES" : "NO");
console.log();

// Student 2: High GPA, but one C+ → Should NOT qualify
const student2 = ["A", "A", "A+", "A", "C+"];
const gpa2 = calculateGPA(student2);
const honorRoll2 = checkHonorRoll(gpa2, student2);
console.log("Student 2 grades:", student2.join(", "));
console.log("GPA:", gpa2);
console.log("Honor Roll:", honorRoll2 ? "YES" : "NO");
console.log();

// Student 3: Decent GPA, all B range → Should NOT qualify (GPA too low)
const student3 = ["B", "B+", "B", "B-", "B"];
const gpa3 = calculateGPA(student3);
const honorRoll3 = checkHonorRoll(gpa3, student3);
console.log("Student 3 grades:", student3.join(", "));
console.log("GPA:", gpa3);
console.log("Honor Roll:", honorRoll3 ? "YES" : "NO");
console.log();

// Student 4: Perfect student → Should qualify
const student4 = ["A+", "A+", "A", "A+", "A"];
const gpa4 = calculateGPA(student4);
const honorRoll4 = checkHonorRoll(gpa4, student4);
console.log("Student 4 grades:", student4.join(", "));
console.log("GPA:", gpa4);
console.log("Honor Roll:", honorRoll4 ? "YES" : "NO");
```

**Breaking down the logic:**

**Student 1: ["A", "A-", "B+", "A", "A-"]**
```
1. Calculate GPA → 3.74
2. Check GPA: 3.74 >= 3.5? YES → Continue
3. Loop through grades:
   - "A": Not in low grade list → Continue
   - "A-": Not in low grade list → Continue
   - "B+": Not in low grade list → Continue
   - "A": Not in low grade list → Continue
   - "A-": Not in low grade list → Continue
4. Loop complete, no low grades found
5. Return true → Honor Roll: YES
```

**Student 2: ["A", "A", "A+", "A", "C+"]**
```
1. Calculate GPA → 3.66
2. Check GPA: 3.66 >= 3.5? YES → Continue
3. Loop through grades:
   - "A": Not in low grade list → Continue
   - "A": Not in low grade list → Continue
   - "A+": Not in low grade list → Continue
   - "A": Not in low grade list → Continue
   - "C+": IS in low grade list! → Return false immediately
4. Return false → Honor Roll: NO
```

**Student 3: ["B", "B+", "B", "B-", "B"]**
```
1. Calculate GPA → 3.06
2. Check GPA: 3.06 >= 3.5? NO → Return false immediately
3. Never reach grade checking
4. Return false → Honor Roll: NO
```

**Why check GPA first (early return optimization):**

If GPA is too low, there's no point checking all the grades:

```javascript
// Efficient: Check GPA first
if (gpa < 3.5) {
  return false;  // Exit immediately - saves work!
}
// Only loop if GPA is good
for (const grade of grades) { ... }
```

This is called a **guard clause** - checking failure conditions upfront!

**Early return in loop:**

As soon as we find a disqualifying grade, return immediately:

```javascript
for (const grade of grades) {
  if (grade === "C+" /* ... */) {
    return false;  // Found one bad grade - no need to check the rest!
  }
}
```

If we had 100 grades and the 3rd one is a C+, we don't waste time checking the other 97!

**Alternative: Using a helper function**

You could extract the low grade check:

```javascript
function isBelowBMinus(grade) {
  return grade === "C+" || grade === "C" || grade === "C-" ||
         grade === "D+" || grade === "D" || grade === "D-" || grade === "F";
}

function checkHonorRoll(gpa, grades) {
  if (gpa < 3.5) {
    return false;
  }

  for (const grade of grades) {
    if (isBelowBMinus(grade)) {
      return false;
    }
  }

  return true;
}
```

This makes the code more readable and reusable!

**Alternative: Using array methods (advanced)**

You could use `.some()` to check if ANY grade is below B-:

```javascript
function checkHonorRoll(gpa, grades) {
  if (gpa < 3.5) {
    return false;
  }

  const lowGrades = ["C+", "C", "C-", "D+", "D", "D-", "F"];
  const hasLowGrade = grades.some(grade => lowGrades.includes(grade));

  return !hasLowGrade;
}
```

We'll learn array methods like `.some()` and `.includes()` in future exercises!

**AND vs OR logic:**

**Honor Roll uses AND (both required):**
```javascript
// Must have high GPA AND good grades
return gpa >= 3.5 && noLowGrades;
```

**Wrong - using OR (only one required):**
```javascript
// Would qualify with high GPA OR good grades (too lenient!)
return gpa >= 3.5 || noLowGrades;
```

With OR, a student with 2.0 GPA but all A grades would qualify - that's not right!

**Real-world multi-factor eligibility:**

Many systems combine multiple requirements:

**College admission:**
- GPA >= 3.0 AND
- SAT >= 1200 AND
- Completed application essay AND
- Has recommendation letters

**Loan approval:**
- Credit score >= 650 AND
- Income >= $50,000 AND
- Debt-to-income ratio < 40% AND
- No bankruptcies in last 7 years

**Job qualification:**
- Has required degree AND
- Years of experience >= 3 AND
- Passed technical interview AND
- Salary expectation within budget

All use AND logic - every condition must be true!

**Extending honor roll with tiers:**

You could create multiple honor roll levels:

```javascript
function getHonorRollTier(gpa, grades) {
  const hasLowGrades = grades.some(g => ["C+", "C", "C-", "D+", "D", "D-", "F"].includes(g));
  const hasBGrades = grades.some(g => ["B+", "B", "B-"].includes(g));

  if (gpa >= 3.9 && !hasLowGrades && !hasBGrades) {
    return "Highest Honors";  // All A grades, GPA 3.9+
  } else if (gpa >= 3.7 && !hasLowGrades) {
    return "High Honors";     // No grades below B-, GPA 3.7+
  } else if (gpa >= 3.5 && !hasLowGrades) {
    return "Honors";          // No grades below B-, GPA 3.5+
  } else {
    return "None";
  }
}
```

Tiered systems add even more complex conditional logic!

</details>

## Series Complete!

Congratulations! You've completed the **Grade Calculator** series!

Here's what you've accomplished:
- ✅ **Exercise 018**: Converted numeric scores to basic letter grades (A-F)
- ✅ **Exercise 019**: Enhanced grades with +/- modifiers using nested conditionals
- ✅ **Exercise 020**: Determined pass/fail status with switch statements
- ✅ **Exercise 021**: Calculated GPA from multiple courses using arrays and loops
- ✅ **Exercise 022**: Implemented honor roll eligibility with complex conditional logic

## What You've Mastered

**Conditional Statements:**
- If-else-if chains for range checking
- Nested conditionals for two-level decisions
- Switch statements for exact value matching
- Guard clauses and early returns
- Complex conditions with logical operators (&&, ||)

**Data Processing:**
- Working with arrays of data
- Looping through arrays with for...of
- Accumulation pattern for totals
- Validation with multiple criteria

**Real-World Applications:**
- Grade conversion systems
- GPA calculation
- Eligibility determination
- Multi-factor decision making

## Next Steps

Ready for more challenges? The next series in the roadmap will teach you about loops and iteration. You'll build countdown timers and multiplication tables while mastering `while` loops, `for` loops, `break`, and `continue`.

Take a well-deserved break, then continue your JavaScript journey with the next series!

Keep up the excellent work!

