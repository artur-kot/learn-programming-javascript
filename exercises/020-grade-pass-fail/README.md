## Grade Calculator - Pass/Fail Status

This exercise builds on **exercise 019**! Your enhanced `getLetterGrade` function that returns grades with +/- modifiers is already working. Now you'll add a new function to determine if a student passed or failed.

Schools need to quickly categorize students as passing or failing. While you have precise grades (A+, B-, etc.), sometimes you just need a simple Pass/Fail status for reporting or determining eligibility for activities.

## What You're Building On

From exercises 018-019, you already have:
- `getLetterGrade(score)` - Converts numeric scores to letter grades with +/- modifiers
  - Returns: A+, A, A-, B+, B, B-, C+, C, C-, D+, D, D-, or F

## Your Challenge

Open `020-grade-pass-fail.js`. You'll see your complete `getLetterGrade` function from exercise 019.

Your task is to create a NEW function called `getPassFailStatus(letterGrade)` that:
- Takes a letter grade as input (like "A+", "B-", "C", "F")
- Returns "Pass" for any grade from D- through A+
- Returns "Fail" for F
- Uses a **switch statement** to check the grade

**Passing grades:** A+, A, A-, B+, B, B-, C+, C, C-, D+, D, D-
**Failing grade:** F

## Expected Output

When you run your code, you should see:
```
Score 98 → Grade: A+ → Status: Pass
Score 85 → Grade: B → Status: Pass
Score 73 → Grade: C → Status: Pass
Score 65 → Grade: D → Status: Pass
Score 42 → Grade: F → Status: Fail
```

## Hints

<details>
<summary>Hint 1: What is a switch statement?</summary>

A **switch statement** checks one value against multiple specific cases. It's an alternative to long if-else-if chains when checking for specific values:

```javascript
switch (variable) {
  case "value1":
    // Code if variable === "value1"
    break;
  case "value2":
    // Code if variable === "value2"
    break;
  default:
    // Code if no cases match
}
```

**Example:**
```javascript
const day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of work week");
    break;
  case "Friday":
    console.log("Almost weekend!");
    break;
  case "Saturday":
  case "Sunday":
    console.log("Weekend!");
    break;
  default:
    console.log("Regular weekday");
}
```
</details>

<details>
<summary>Hint 2: Fall-through cases</summary>

Multiple cases can share the same code by "falling through":

```javascript
switch (grade) {
  case "A+":
  case "A":
  case "A-":
    return "Excellent";  // All A grades reach here
  case "B+":
  case "B":
    return "Good";       // B+ and B reach here
}
```

When you don't put a `break` or `return` after a case, execution continues to the next case. This is perfect for grouping grades!
</details>

<details>
<summary>Hint 3: Structure for pass/fail</summary>

For the pass/fail function:

```javascript
function getPassFailStatus(letterGrade) {
  switch (letterGrade) {
    case "A+":
    case "A":
    case "A-":
    case "B+":
    case "B":
    case "B-":
    // Continue for C and D grades...
      return "Pass";

    case "F":
      return "Fail";

    default:
      return "Invalid grade";  // In case something unexpected is passed
  }
}
```

List all passing grades as cases before the `return "Pass"` statement!
</details>

<details>
<summary>Hint 4: Switch vs if-else-if</summary>

You could write this with if-else-if:

```javascript
if (letterGrade === "A+" || letterGrade === "A" || letterGrade === "A-" || ...) {
  return "Pass";
} else if (letterGrade === "F") {
  return "Fail";
}
```

But switch is much cleaner when checking one variable against many specific values:

```javascript
switch (letterGrade) {
  case "A+":
  case "A":
  // Much more readable!
}
```

Use switch for **exact value matching**, use if-else-if for **range checking** (like `score >= 90`).
</details>

<details>
<summary>Hint 5: Using both functions together</summary>

See how the two functions work together:

```javascript
const score = 85;
const grade = getLetterGrade(score);        // Returns "B"
const status = getPassFailStatus(grade);    // Returns "Pass"

console.log(`Score ${score} → Grade: ${grade} → Status: ${status}`);
// Output: Score 85 → Grade: B → Status: Pass
```

Or in one line:
```javascript
const status = getPassFailStatus(getLetterGrade(85));
```

Functions calling other functions is how we build complex programs from simple pieces!
</details>

## Test Your Code

To run your code and see the output:
```bash
cd exercises/020-grade-pass-fail
node 020-grade-pass-fail.js
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise teaches you:
- **Switch statements** - checking one value against multiple specific cases
- **Fall-through behavior** - multiple cases sharing the same code
- **Function composition** - using one function's output as another's input
- **When to use switch vs if-else** - exact values vs ranges
- **Code organization** - keeping related functions together
- **Real-world categorization** - simplifying detailed data for reporting

Switch statements make code much cleaner when checking for specific values!

## Reflection Questions

After completing the exercise, think about:
1. When would you use a switch statement instead of if-else-if?
2. What would happen if you forgot the `return` or `break` in a case?
3. Why is fall-through useful for grouping similar values?
4. How does the `default` case protect against unexpected input?

## Next Steps

Fantastic work! You now have a grading system that converts scores to grades and determines pass/fail status. In the next exercise (**021-grade-gpa**), you'll add GPA calculation across multiple courses. You'll learn to work with arrays of grades and compute averages!

Your current solution will be the starting point for the next exercise!


