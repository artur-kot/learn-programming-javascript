## Age Checker - Multiple Age Groups

You've mastered if statements (one condition) and if-else statements (two options). Now it's time to level up with **else-if** to handle multiple categories!

In the real world, age classification often has more than two groups. Think about movie ratings, ticket prices, or insurance categories. You might have child, teen, adult, and senior groups - that's four categories, not two! This is where **else-if chains** shine.

## If-Else-If Statements
An **else-if** statement allows you to check multiple conditions in sequence. The program evaluates each condition one by one:
```javascript
let score = 85;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else if (score >= 60) {
  console.log("Grade: D");
} else {
  console.log("Grade: F");
}
```

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

An **else-if** lets you check multiple conditions in order until one is true. Think of it like a series of questions where you stop as soon as you get a "yes" answer.

The program checks the first condition. If false, it moves to the next condition. If that's false, it moves to the next, and so on. As soon as one condition is true, it executes that block and skips all remaining checks.

This is called "short-circuit evaluation" - the chain stops checking as soon as it finds a match.
</details>

<details>
<summary>Hint 2: Age ranges and the order matters!</summary>

When checking age ranges, think about working from smallest to largest values. Check the lowest range first, then the next highest, and so on.

**Why this order works:**
- The structure automatically eliminates values that matched earlier conditions
- Each subsequent check only runs if all previous checks failed
- This means you already know certain facts about the value by the time you reach later conditions

Think carefully about which boundary to check at each step.
</details>

<details>
<summary>Hint 3: Implicit range boundaries</summary>

You might think you need to check both the minimum and maximum for each range (like checking both the lower and upper bound). But with an else-if chain, you don't need to check both!

When you reach an else-if condition, you already know the previous conditions were false. This means certain facts are already established about your value without explicitly checking them.

For example, if the first check tests whether a value is at or below a threshold, and that fails, you automatically know the value is above that threshold when you reach the next check.
</details>

<details>
<summary>Hint 4: Pattern for classification</summary>

Create a chain that:
1. Checks if the age falls in the first (lowest) category
2. If not, checks if it falls in the second category
3. If not, checks if it falls in the third category
4. If none match, it must be in the final (highest) category

Apply this pattern to all four age variables to classify each one correctly.
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

## Next Steps

Fantastic! You can now classify ages into multiple groups. But what if you need to make **calculations** based on age? What if children get 50% off and seniors get 30% off?

In **exercise 016-age-discounts**, you'll learn about **nested conditionals** - putting if statements inside other if statements to handle more complex logic. Get ready to build a discount calculator!

## Read More

Want to dive deeper? Check out these resources:

- 📚 [Logical Operators - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#binary_logical_operators)
- 🎯 [Logical Operators - JavaScript.info](https://javascript.info/logical-operators)
