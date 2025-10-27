## Grade Calculator - Plus/Minus Grades

This exercise builds on **exercise 018**! In the previous exercise, you created a function that converts scores to basic letter grades (A, B, C, D, F). Now you'll enhance it to return more precise grades with + and - modifiers.

Most schools don't just award a "B" - they distinguish between B+ (high B), B (solid B), and B- (low B). This gives students and parents a more accurate picture of performance. Let's add this precision to your grading system!

## What You're Building On

Your `getLetterGrade` function from exercise 018 already:
- Converts scores 90-100 to "A"
- Converts scores 80-89 to "B"
- Converts scores 70-79 to "C"
- Converts scores 60-69 to "D"
- Converts scores 0-59 to "F"

## Your Challenge

Open `019-grade-plus-minus.js`. You'll see your solution from exercise 018 as the starting point.

Your task is to enhance the function to return grades with + and - modifiers:

**A Range (90-100):**
- 97-100: A+
- 93-96: A
- 90-92: A-

**B Range (80-89):**
- 87-89: B+
- 83-86: B
- 80-82: B-

**C Range (70-79):**
- 77-79: C+
- 73-76: C
- 70-72: C-

**D Range (60-69):**
- 67-69: D+
- 63-66: D
- 60-62: D-

**F Range (0-59):**
- 0-59: F (no + or -)

## Expected Output

When you run your code, you should see:
```
Score 98: A+
Score 95: A
Score 90: A-
Score 87: B+
Score 83: B
Score 80: B-
Score 77: C+
Score 73: C
Score 70: C-
Score 67: D+
Score 63: D
Score 60: D-
Score 42: F
```

## Hints

<details>
<summary>Hint 1: Nested conditionals</summary>

Add if-else-if chains **inside** each existing grade check:

```javascript
if (score >= 90) {
  // Now we know it's an A (90-100)
  // Add nested checks to determine +, regular, or -
  if (score >= 97) {
    return "A+";
  } else if (score >= 93) {
    return "A";
  } else {
    return "A-";  // 90-92
  }
} else if (score >= 80) {
  // Now we know it's a B (80-89)
  if (score >= 87) {
    return "B+";
  } else if (score >= 83) {
    return "B";
  } else {
    return "B-";  // 80-82
  }
}
// Continue for C and D...
```

This is called **nested conditionals** - conditionals inside conditionals!
</details>

<details>
<summary>Hint 2: Understanding the nested structure</summary>

Think of it as a two-level decision:

**Level 1: What letter?**
- Is it A, B, C, D, or F?

**Level 2: What modifier?**
- Is it +, regular, or -?

```javascript
// Level 1: Determine letter
if (score >= 90) {
  // Level 2: Determine modifier for A
  if (score >= 97) return "A+";
  else if (score >= 93) return "A";
  else return "A-";
}
```

The outer if determines the letter, the inner if determines the modifier!
</details>

<details>
<summary>Hint 3: Pattern for each grade range</summary>

Each grade range (except F) follows the same pattern:

```javascript
if (score >= [range start]) {
  if (score >= [high cutoff]) return "[Letter]+";
  else if (score >= [mid cutoff]) return "[Letter]";
  else return "[Letter]-";
}
```

For B grades (80-89):
```javascript
if (score >= 80) {
  if (score >= 87) return "B+";   // 87-89
  else if (score >= 83) return "B"; // 83-86
  else return "B-";                 // 80-82
}
```

Apply this pattern to A, C, and D ranges!
</details>

<details>
<summary>Hint 4: Why F has no + or -</summary>

Failing grades typically don't have modifiers. An F is an F!

```javascript
else {
  return "F";  // Simple - no nested checks needed
}
```

Some schools do use F+ or F-, but it's uncommon. We'll keep it simple.
</details>

<details>
<summary>Hint 5: Complete structure for one range</summary>

Here's the complete pattern for A grades:

```javascript
if (score >= 90) {
  if (score >= 97) {
    return "A+";
  } else if (score >= 93) {
    return "A";
  } else {
    return "A-";
  }
}
```

Apply this same pattern to B, C, and D ranges with their respective cutoffs!
</details>

## Test Your Code

To run your code and see the output:
```bash
cd exercises/019-grade-plus-minus
node 019-grade-plus-minus.js
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise teaches you:
- **Nested conditionals** - if statements inside other if statements
- **Two-level decision making** - determining category, then subcategory
- **Code organization** - structuring complex conditional logic clearly
- **Real-world grading systems** - how schools implement precise grading
- **Building on existing code** - enhancing functions without starting from scratch

Nested conditionals are essential for multi-level categorization in programming!

## Reflection Questions

After completing the exercise, think about:
1. Why do we use nested if statements instead of checking all 13 conditions at the top level?
2. How does nesting make the code more organized and easier to understand?
3. What would happen if you checked the modifiers before checking the letter grade?
4. Can you think of other systems that use two-level categorization like this?

## Next Steps

Excellent work! You've enhanced your grading system with precise +/- grades. In the next exercise (**020-grade-pass-fail**), you'll add a new function that determines if a student passed or failed based on their letter grade. You'll use a **switch statement** - a different way to handle multiple specific values.

Your current solution will be the starting point for the next exercise!

## Read More

Want to dive deeper? Check out these resources:

- 📚 [switch Statement Advanced - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch#taking_advantage_of_fall-through)
- 📖 [Fall-through in Switch - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch#using_switch_to_handle_multiple_criteria)
- 🎯 [Complex Switch Cases - JavaScript.info](https://javascript.info/switch)

