## Grade Calculator - Letter Grades

Welcome to the Grade Calculator series! In this series, you'll build a complete student grading system that converts numeric scores to letter grades, calculates GPAs, and determines honor roll status. This is a perfect way to master conditionals and comparison operators!

Real schools and learning platforms need to convert numeric test scores into letter grades. You'll start by building the foundation of any grading system: a function that converts scores to letters.

## Your Challenge

Open `018-grade-letter.js`. You'll see a function stub called `getLetterGrade` that takes a numeric score as input.

Your task is to convert numeric scores to letter grades based on these ranges:

- **90-100**: A
- **80-89**: B
- **70-79**: C
- **60-69**: D
- **0-59**: F

The function should **return** the letter grade (not console.log it).

## Expected Output

When you run your code, you should see:
```
Score 95: A
Score 87: B
Score 73: C
Score 65: D
Score 42: F
Score 100: A
Score 0: F
```

## Hints

<details>
<summary>Hint 1: Using if-else-if chains</summary>

For checking multiple ranges, use an if-else-if chain:

```javascript
function getLetterGrade(score) {
  if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  }
  // Continue for other grades...
}
```

The key insight: check from highest to lowest! If the score is 95:
1. Check `score >= 90` → true → return "A" immediately
2. The else-if checks never run

If the score is 75:
1. Check `score >= 90` → false
2. Check `score >= 80` → false
3. Check `score >= 70` → true → return "C" immediately
</details>

<details>
<summary>Hint 2: Why order matters</summary>

Always check from highest to lowest:

**Correct (highest first):**
```javascript
if (score >= 90) return "A";
else if (score >= 80) return "B";  // Checks 80-89
else if (score >= 70) return "C";  // Checks 70-79
```

**Wrong (lowest first):**
```javascript
if (score >= 70) return "C";  // Would catch scores 70-100!
else if (score >= 80) return "B";  // Never reached for scores 80+
else if (score >= 90) return "A";  // Never reached for scores 90+
```

When you check highest first, each else-if automatically handles the correct range.
</details>

<details>
<summary>Hint 3: Handling the F grade</summary>

You can handle F in two ways:

**Option 1: Check explicitly**
```javascript
if (score >= 90) return "A";
else if (score >= 80) return "B";
else if (score >= 70) return "C";
else if (score >= 60) return "D";
else if (score >= 0) return "F";
```

**Option 2: Use final else (simpler)**
```javascript
if (score >= 90) return "A";
else if (score >= 80) return "B";
else if (score >= 70) return "C";
else if (score >= 60) return "D";
else return "F";  // Handles everything below 60
```

Option 2 is cleaner since any score that doesn't meet the other conditions must be an F!
</details>

<details>
<summary>Hint 4: Return vs console.log</summary>

This function should **return** the grade, not log it:

```javascript
function getLetterGrade(score) {
  if (score >= 90) {
    return "A";  // Return the value
  }
  // ...
}

// The caller logs the result:
console.log("Score 95:", getLetterGrade(95));
```

**Return** sends the value back to whoever called the function. This makes the function reusable in many contexts (logging, storing in database, displaying on screen, etc.).
</details>

<details>
<summary>Hint 5: Complete solution structure</summary>

Here's the complete structure you need:

```javascript
export function getLetterGrade(score) {
  if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}
```

Try to implement this yourself before looking!
</details>

## Test Your Code

To run your code and see the output:
```bash
cd exercises/018-grade-letter
node 018-grade-letter.js
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise teaches you:
- **If-else-if chains** - checking multiple conditions in sequence
- **Range checking** - testing if a number falls within a range
- **Comparison operators** - using >= to check boundaries
- **Return statements** - sending values back from functions
- **Order of conditions** - why checking highest to lowest matters
- **Function design** - creating reusable, testable functions

These patterns apply to any system that categorizes numeric values!

## Reflection Questions

After completing the exercise, think about:
1. Why do we check from highest score to lowest? What would happen if we reversed the order?
2. Why is `score >= 90` correct for A, but we don't need `score <= 100`?
3. How would you modify this to include A+ (97-100), A (93-96), A- (90-92)?
4. What would happen if someone passed a negative number? How could you handle that?

## Next Steps

Great job! You've built the foundation of a grading system. In the next exercise (**019-grade-plus-minus**), you'll enhance your `getLetterGrade` function to return more precise grades like A+, A, A-, B+, B, B-, etc.

Your current solution will be the starting point for the next exercise - you'll build directly on this code!

## Read More

Want to dive deeper? Check out these resources:

- 📚 [switch Statement - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)
- 📖 [Control Flow - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- 🎯 [Switch Statement - JavaScript.info](https://javascript.info/switch)
