## Age Checker - Multiple Age Groups

You've mastered if statements (one condition) and if-else statements (two options). Now it's time to level up with **else-if** to handle multiple categories!

In the real world, age classification often has more than two groups. Think about movie ratings, ticket prices, or insurance categories. You might have child, teen, adult, and senior groups - that's four categories, not two! This is where **else-if chains** shine.

## Your Challenge

Open `015-age-multiple-groups.js`. You'll see four different ages: 8, 16, 35, and 72.

Your task is to classify each age into one of **four groups**:
- **Child**: 0-12 years old
- **Teen**: 13-17 years old
- **Adult**: 18-64 years old
- **Senior**: 65+ years old

## Expected Output

When you run your code, you should see:
```
Age 8: Child
Age 16: Teen
Age 35: Adult
Age 72: Senior
```

Each age should be classified into exactly one category - no more, no less!

## Hints

<details>
<summary>Hint 1: What is an else-if statement?</summary>

An **else-if** lets you check multiple conditions in order until one is true:

```javascript
const score = 85;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else {
  console.log("Grade: F");
}
// Output: "Grade: B"
```

**How it works:**
1. Checks first condition (score >= 90) → false, skip
2. Checks second condition (score >= 80) → true, run this block and stop
3. Doesn't check remaining conditions

The syntax is:
```javascript
if (condition1) {
  // Runs if condition1 is true
} else if (condition2) {
  // Runs if condition1 is false AND condition2 is true
} else if (condition3) {
  // Runs if condition1 and condition2 are false AND condition3 is true
} else {
  // Runs if all conditions are false
}
```
</details>

<details>
<summary>Hint 2: Age ranges and the order matters!</summary>

When checking age ranges, **start with the smallest** range and work your way up:

```javascript
if (age <= 12) {
  console.log("Child");
} else if (age <= 17) {
  console.log("Teen");
} else if (age <= 64) {
  console.log("Adult");
} else {
  console.log("Senior");
}
```

**Why this order works:**
- If age is 8: First check (8 <= 12) is true → "Child" (stops here)
- If age is 16: First check (16 <= 12) is false, second check (16 <= 17) is true → "Teen"
- If age is 35: First two checks fail, third check (35 <= 64) is true → "Adult"
- If age is 72: All checks fail → "Senior"

**Important**: Because of the else-if structure, if the first condition is true, the rest aren't even checked! This is called "short-circuit evaluation."
</details>

<details>
<summary>Hint 3: Why <= instead of checking ranges like 13-17?</summary>

You might think you need to check both ends of a range:
```javascript
// DON'T do this - it's redundant!
if (age >= 13 && age <= 17) {
  console.log("Teen");
}
```

But with else-if, you don't need to! The structure already handles it:
```javascript
if (age <= 12) {
  console.log("Child");
} else if (age <= 17) {  // We already know age > 12 here!
  console.log("Teen");
}
```

When you reach the else-if, you **already know** that age > 12 (because the first condition was false). So you only need to check the upper bound!
</details>

<details>
<summary>Hint 4: Complete structure for age classification</summary>

Here's the complete else-if chain for classifying an age:

```javascript
if (age <= 12) {
  console.log(`Age ${age}: Child`);
} else if (age <= 17) {
  console.log(`Age ${age}: Teen`);
} else if (age <= 64) {
  console.log(`Age ${age}: Adult`);
} else {
  console.log(`Age ${age}: Senior`);
}
```

Apply this same pattern to age1, age2, age3, and age4!
</details>

## Test Your Code

To run your code and see the output:
```bash
cd exercises/015-age-multiple-groups
node 015-age-multiple-groups.js
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise teaches you:
- **Else-if chains** - checking multiple conditions in sequence
- **Mutually exclusive conditions** - only one path executes
- **Short-circuit evaluation** - stopping as soon as a condition is true
- **Range checking** - classifying values into groups
- **Logical flow** - understanding how conditions build on each other

Else-if chains are essential for any program that needs to categorize data or make multi-way decisions!

## Reflection Questions

After completing the exercise, think about:
1. Why does the order of conditions matter in an else-if chain?
2. What would happen if you checked age <= 64 before age <= 17?
3. Why don't you need to check both the minimum AND maximum for each range (like age >= 13 && age <= 17)?
4. Can you think of other scenarios where you'd need to classify something into more than two categories?

## Solution

<details>
<summary>Click to see the solution (try the exercise first!)</summary>

```javascript
export function classifyAgeGroup() {
  // Test different ages
  const age1 = 8;
  const age2 = 16;
  const age3 = 35;
  const age4 = 72;

  // Classify age1 (8)
  if (age1 <= 12) {
    console.log(`Age ${age1}: Child`);
  } else if (age1 <= 17) {
    console.log(`Age ${age1}: Teen`);
  } else if (age1 <= 64) {
    console.log(`Age ${age1}: Adult`);
  } else {
    console.log(`Age ${age1}: Senior`);
  }

  // Classify age2 (16)
  if (age2 <= 12) {
    console.log(`Age ${age2}: Child`);
  } else if (age2 <= 17) {
    console.log(`Age ${age2}: Teen`);
  } else if (age2 <= 64) {
    console.log(`Age ${age2}: Adult`);
  } else {
    console.log(`Age ${age2}: Senior`);
  }

  // Classify age3 (35)
  if (age3 <= 12) {
    console.log(`Age ${age3}: Child`);
  } else if (age3 <= 17) {
    console.log(`Age ${age3}: Teen`);
  } else if (age3 <= 64) {
    console.log(`Age ${age3}: Adult`);
  } else {
    console.log(`Age ${age3}: Senior`);
  }

  // Classify age4 (72)
  if (age4 <= 12) {
    console.log(`Age ${age4}: Child`);
  } else if (age4 <= 17) {
    console.log(`Age ${age4}: Teen`);
  } else if (age4 <= 64) {
    console.log(`Age ${age4}: Adult`);
  } else {
    console.log(`Age ${age4}: Senior`);
  }
}

classifyAgeGroup();
```

**How the else-if chain works:**

For **age1 (8)**:
- Checks: `8 <= 12` → **true**
- Runs: `console.log("Age 8: Child")`
- **Stops** - doesn't check remaining conditions

For **age2 (16)**:
- Checks: `16 <= 12` → false, continue
- Checks: `16 <= 17` → **true**
- Runs: `console.log("Age 16: Teen")`
- **Stops**

For **age3 (35)**:
- Checks: `35 <= 12` → false
- Checks: `35 <= 17` → false
- Checks: `35 <= 64` → **true**
- Runs: `console.log("Age 35: Adult")`
- **Stops**

For **age4 (72)**:
- Checks: `72 <= 12` → false
- Checks: `72 <= 17` → false
- Checks: `72 <= 64` → false
- Runs the else block: `console.log("Age 72: Senior")`

**Why order matters:**

If you reversed the order (checking largest first):
```javascript
// WRONG - Don't do this!
if (age <= 64) {
  console.log("Adult");
} else if (age <= 17) {  // This would never run for teens!
  console.log("Teen");
}
```

Problem: If age is 16, the first condition (16 <= 64) is true, so it would incorrectly classify as "Adult" and never check if it's a teen!

**Visualizing the logic:**

```
Age value: 16

Check 1: Is 16 <= 12? NO
↓
Check 2: Is 16 <= 17? YES → Output "Teen" and STOP
↓
Check 3: Never reaches here
↓
Else: Never reaches here
```

**Real-world examples of else-if chains:**
- Grading systems: A, B, C, D, F
- Shipping costs: based on weight ranges
- Tax brackets: based on income levels
- Ticket pricing: child, student, adult, senior
- Game difficulty: easy, medium, hard, expert

**Alternative approach (using ranges explicitly):**
```javascript
// Also works, but more verbose
if (age >= 0 && age <= 12) {
  console.log("Child");
} else if (age >= 13 && age <= 17) {
  console.log("Teen");
} else if (age >= 18 && age <= 64) {
  console.log("Adult");
} else {
  console.log("Senior");
}
```

The first approach (checking only upper bounds) is more elegant because the else-if structure already handles the lower bounds!

</details>

## Next Steps

Fantastic! You can now classify ages into multiple groups. But what if you need to make **calculations** based on age? What if children get 50% off and seniors get 30% off?

In **exercise 016-age-discounts**, you'll learn about **nested conditionals** - putting if statements inside other if statements to handle more complex logic. Get ready to build a discount calculator!
