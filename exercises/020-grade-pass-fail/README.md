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

// Test both functions together
const scores = [98, 85, 73, 65, 42];

for (const score of scores) {
  const grade = getLetterGrade(score);
  const status = getPassFailStatus(grade);
  console.log(`Score ${score} → Grade: ${grade} → Status: ${status}`);
}
```

**Breaking down the switch statement:**

When `letterGrade` is **"B"**:
1. Check case "A+" → no match, continue
2. Check case "A" → no match, continue
3. Check case "A-" → no match, continue
4. Check case "B+" → no match, continue
5. Check case "B" → **match!** → fall through (no break)
6. Fall through cases B-, C+, C, C-, D+, D, D-
7. Reach `return "Pass"` → return it!

When `letterGrade` is **"F"**:
1. Check all passing grade cases → no matches
2. Check case "F" → **match!** → return "Fail"

When `letterGrade` is **"invalid"**:
1. Check all cases → no matches
2. Reach `default` → return "Invalid grade"

**How fall-through works:**

```javascript
switch (grade) {
  case "A+":  // If grade === "A+", start here
  case "A":   // If grade === "A", start here
  case "A-":  // If grade === "A-", start here
    return "Pass";  // All three cases reach this line
}
```

Without `break` or `return`, execution continues to the next case. This lets us group related values!

**Why use switch here?**

**Switch (clean and clear):**
```javascript
switch (letterGrade) {
  case "A+":
  case "A":
  case "A-":
    return "Pass";
}
```

**If-else (verbose and repetitive):**
```javascript
if (letterGrade === "A+" || letterGrade === "A" || letterGrade === "A-" ||
    letterGrade === "B+" || letterGrade === "B" || letterGrade === "B-" ||
    letterGrade === "C+" || letterGrade === "C" || letterGrade === "C-" ||
    letterGrade === "D+" || letterGrade === "D" || letterGrade === "D-") {
  return "Pass";
}
```

Switch is much more readable when checking for many specific values!

**When to use switch vs if-else-if:**

**Use switch for:**
- Exact value matching ("A+", "B", "C-")
- Many specific values to check
- When fall-through grouping is useful

**Use if-else-if for:**
- Range checking (score >= 90)
- Complex conditions (age > 18 && hasPermission)
- Comparing different variables

**The default case:**

Always include a `default` case to handle unexpected values:

```javascript
switch (grade) {
  case "A+":
  case "B":
    return "Pass";
  default:
    return "Invalid grade";  // Safety net
}
```

This prevents returning `undefined` if something unexpected is passed!

**Function composition:**

Notice how we chain functions together:

```javascript
// Step by step:
const score = 85;
const grade = getLetterGrade(score);      // "B"
const status = getPassFailStatus(grade);  // "Pass"

// Or composed:
const status = getPassFailStatus(getLetterGrade(85));
```

Building complex functionality from simple, focused functions is a key programming skill!

**Real-world switch statement examples:**

```javascript
// HTTP status codes
switch (statusCode) {
  case 200:
  case 201:
    return "Success";
  case 400:
  case 404:
    return "Client Error";
  case 500:
  case 503:
    return "Server Error";
}

// User roles
switch (role) {
  case "admin":
  case "moderator":
    return "Can delete posts";
  case "user":
    return "Can edit own posts";
  case "guest":
    return "Read only";
}

// File extensions
switch (extension) {
  case ".jpg":
  case ".png":
  case ".gif":
    return "Image file";
  case ".mp4":
  case ".avi":
    return "Video file";
  case ".mp3":
  case ".wav":
    return "Audio file";
}
```

Switch statements make categorization code clean and maintainable!

</details>

## Next Steps

Fantastic work! You now have a grading system that converts scores to grades and determines pass/fail status. In the next exercise (**021-grade-gpa**), you'll add GPA calculation across multiple courses. You'll learn to work with arrays of grades and compute averages!

Your current solution will be the starting point for the next exercise!

