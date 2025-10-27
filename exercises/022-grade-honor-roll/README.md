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