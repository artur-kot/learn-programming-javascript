## Age Checker - Basic If Statement

Welcome to the **Age Checker App** series! Over the next five exercises, you'll build an age verification system that makes decisions based on someone's age. This is your introduction to one of the most important concepts in programming: **conditional logic** - teaching your code to make decisions!

In many countries, you need to be 18 years old to vote. Websites and apps check your age to determine what you're allowed to do. That's exactly what you'll build in this exercise using your first **if statement**.

## Introduction to If Statements
An **if statement** is the foundation of decision-making in programming. Think of it as teaching your computer to think: "If this condition is true, then do this action."

### The Basic Structure

Every if statement follows this pattern:
```javascript
if (condition) {
  // Code to run when condition is true
}
```

The **condition** is a question that can be answered with true or false. If the answer is true, the code inside the curly braces `{}` runs. If false, that code is completely skipped.

### Real-World Examples

Before diving into code, let's think about everyday decisions:
- **If** you're hungry, **then** eat something
- **If** it's raining, **then** take an umbrella  
- **If** you're 18 or older, **then** you can vote

These are all conditional statements - actions that depend on circumstances.

### Programming Example

Here's how you'd check voting age in JavaScript:
```javascript
let age = 25;

if (age >= 18) {
  console.log("You are old enough to vote!");
}
```

### Breaking Down the Parts

1. **`if`** - The keyword that starts the statement
2. **`(age >= 18)`** - The condition to test (is age greater than or equal to 18?)
3. **`{}`** - The code block that runs when the condition is true
4. **`>=`** - The "greater than or equal to" comparison operator

### Why If Statements Matter

Without if statements, programs could only follow one path - they'd do the same thing every single time. If statements give your code the power to:
- Respond to different inputs
- Handle various scenarios  
- Make intelligent decisions
- Create interactive experiences

### Truthy/Falsy Values
In JavaScript, conditions can evaluate to "truthy" or "falsy" values. A truthy value means the condition is considered true, while a falsy value means it's false. Here are some common examples:
- **Truthy values:** non-zero numbers, non-empty strings, objects, arrays
- **Falsy values:** `0`, `""` (empty string), `null`, `undefined`, `NaN`, `false`

## Your Challenge

Open `013-age-basic-if.js`. You'll see three different ages: 25, 16, and 18.

Your task is to:
1. Check each age to see if it's 18 or older
2. **Only** display a message for ages that are 18 or older
3. Don't display anything for ages under 18

## Expected Output

When you run your code, you should see:
```
Age 25: You are old enough to vote!
Age 18: You are old enough to vote!
```

Notice that age 16 doesn't display anything - that's correct! The if statement only runs its code when the condition is true.

## Hints

<details>
<summary>Hint 1: What is an if statement?</summary>

An **if statement** lets your code make decisions. It only runs certain code when a condition is true.

Think about it like this: "If the weather is rainy, bring an umbrella." The action (bringing an umbrella) only happens when the condition (rainy weather) is true.

In programming, you check a condition, and if it evaluates to true, the code inside executes. If false, that code is skipped entirely.
</details>

<details>
<summary>Hint 2: Comparing values</summary>

To make decisions, you need to compare values. JavaScript provides ways to check:
- Is one number larger than another?
- Is a number equal to or larger than a threshold?
- Are two values exactly the same?

For voting age, think about the threshold. You need to determine if someone meets or exceeds the minimum voting age of 18.
</details>

<details>
<summary>Hint 3: Including values in messages</summary>

When displaying messages, you'll want to include the actual age value in your output. JavaScript template literals let you embed variables directly into strings using special syntax with backticks and placeholders.

This makes your messages dynamic and informative.
</details>

<details>
<summary>Hint 4: Structure your decision</summary>

For each age value, you need to:
1. Evaluate whether the age meets the voting requirement
2. If it does, display a message indicating eligibility
3. If it doesn't, the code does nothing (skips the display)

Apply this pattern to all three age variables to see which ones qualify for voting.
</details>

## Test Your Code

To run your code and see the output:
```bash
cd exercises/013-age-basic-if
node 013-age-basic-if.js
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise introduces you to:
- **If statements** - making your code conditional
- **Comparison operators** - checking relationships between values (`>=`, `>`, `<`, etc.)
- **Boolean logic** - conditions that are either true or false
- **Decision making** - running code only when certain conditions are met

These are fundamental programming concepts you'll use in almost every program you write!

## Reflection Questions

After completing the exercise, think about:
1. What happens to the code inside the if statement when the condition is false?
2. Why use `>=` (greater than or equal to) instead of `>` (greater than) for checking voting age?
3. Can you think of other real-world scenarios where a program needs to check if something meets a minimum requirement?

## Next Steps

Great start! You've learned to use if statements to check a condition. But what if you want to display a different message when someone is **too young** to vote? That's where `else` comes in!

In **exercise 014-age-if-else**, you'll expand your age checker to handle both cases: old enough AND too young. Get ready to make your code even smarter!

## Read More

Want to dive deeper? Check out these resources:

- 📚 [if...else Statements - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)
- 📖 [Comparison Operators - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#relational_operators)
- 🎯 [Conditional Branching - JavaScript.info](https://javascript.info/ifelse)
