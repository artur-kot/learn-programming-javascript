## Age Checker - Basic If Statement

Welcome to the **Age Checker App** series! Over the next five exercises, you'll build an age verification system that makes decisions based on someone's age. This is your introduction to one of the most important concepts in programming: **conditional logic** - teaching your code to make decisions!

In many countries, you need to be 18 years old to vote. Websites and apps check your age to determine what you're allowed to do. That's exactly what you'll build in this exercise using your first **if statement**.

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

An **if statement** lets your code make decisions. It only runs certain code when a condition is true:

```javascript
const temperature = 30;

if (temperature > 25) {
  console.log("It's hot outside!");
}
```

This only displays the message when temperature is greater than 25.

The syntax is:
```javascript
if (condition) {
  // Code to run when condition is true
}
```
</details>

<details>
<summary>Hint 2: Comparison operators</summary>

To compare numbers, JavaScript has several operators:
- `>` greater than
- `<` less than
- `>=` greater than or equal to
- `<=` less than or equal to
- `===` exactly equal to
- `!==` not equal to

For voting age, you need to check if someone is **18 or older**, so use:
```javascript
if (age >= 18) {
  // They can vote
}
```
</details>

<details>
<summary>Hint 3: Template literals for the message</summary>

Use template literals to include the age in your message:

```javascript
const age = 25;
console.log(`Age ${age}: You are old enough to vote!`);
```

This will output: `Age 25: You are old enough to vote!`
</details>

<details>
<summary>Hint 4: Complete example for age1</summary>

Here's how to check age1:

```javascript
if (age1 >= 18) {
  console.log(`Age ${age1}: You are old enough to vote!`);
}
```

The condition `age1 >= 18` checks if age1 is greater than or equal to 18. If true, the message displays. If false, nothing happens.

Now apply the same logic to age2 and age3!
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

## Solution

<details>
<summary>Click to see the solution (try the exercise first!)</summary>

```javascript
export function checkVotingAge() {
  // Test different ages
  const age1 = 25;
  const age2 = 16;
  const age3 = 18;

  // Check if age1 is 18 or older
  if (age1 >= 18) {
    console.log(`Age ${age1}: You are old enough to vote!`);
  }

  // Check if age2 is 18 or older
  if (age2 >= 18) {
    console.log(`Age ${age2}: You are old enough to vote!`);
  }

  // Check if age3 is 18 or older
  if (age3 >= 18) {
    console.log(`Age ${age3}: You are old enough to vote!`);
  }
}

checkVotingAge();
```

**Why this works:**
- Each `if` statement checks whether the age is >= 18
- The `>=` operator means "greater than or equal to"
- When the condition is **true** (age1: 25 >= 18, age3: 18 >= 18), the code inside the `{ }` runs
- When the condition is **false** (age2: 16 >= 18), the code inside is skipped
- That's why only age1 and age3 display messages!

**Understanding the comparison:**
```javascript
25 >= 18  // true (25 is greater than or equal to 18)
16 >= 18  // false (16 is NOT greater than or equal to 18)
18 >= 18  // true (18 equals 18, so it qualifies)
```

**Why >= instead of > ?**
```javascript
// Using > (greater than):
if (age > 18) {
  console.log("Can vote");
}
// This would exclude 18-year-olds!

// Using >= (greater than or equal to):
if (age >= 18) {
  console.log("Can vote");
}
// This correctly includes 18-year-olds
```

**Real-world application:**
If statements are everywhere in real applications:
- Age verification for content restrictions
- Price checks for discounts
- Checking if a user is logged in
- Validating form input
- Game logic (checking if player has enough points)

</details>

## Next Steps

Great start! You've learned to use if statements to check a condition. But what if you want to display a different message when someone is **too young** to vote? That's where `else` comes in!

In **exercise 014-age-if-else**, you'll expand your age checker to handle both cases: old enough AND too young. Get ready to make your code even smarter!
