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

## Next Steps

Awesome work! You can now calculate GPA across multiple courses. In the final exercise of this series (**022-grade-honor-roll**), you'll determine honor roll eligibility using complex conditions that combine GPA requirements with grade restrictions. This will bring together everything you've learned about conditionals!

Your current solution will be the starting point for the next exercise!