## Age Checker - If-Else for Categories

Building on what you learned in exercise 013, you now know how to run code when a condition is true. But what about when it's false? That's where the **else** statement comes in!

In the previous exercise, your code only displayed a message for ages 18+. Now you'll improve your age checker to handle **both cases**: displaying one message when someone is an adult and a **different message** when they're a minor.

## Your Challenge

Open `014-age-if-else.js`. You'll see three different ages: 25, 16, and 10.

Your task is to:
1. Check each age to see if it's 18 or older
2. Display "Adult" if they're 18 or older
3. Display "Minor" if they're under 18
4. Make sure **every** age gets classified (no one is left out)

## Expected Output

When you run your code, you should see:
```
Age 25: Adult
Age 16: Minor
Age 10: Minor
```

Notice that this time, **all three ages** display a message! The if-else structure ensures that one of the two messages always shows.

## Hints

<details>
<summary>Hint 1: What is an if-else statement?</summary>

An **if-else statement** gives your code two paths: one when the condition is true, another when it's false:

```javascript
const score = 85;

if (score >= 60) {
  console.log("You passed!");
} else {
  console.log("You failed. Try again!");
}
```

**Key point**: One of these will ALWAYS run. If the condition is true, the if block runs. If false, the else block runs. There's no third option.

The syntax is:
```javascript
if (condition) {
  // Code to run when condition is true
} else {
  // Code to run when condition is false
}
```
</details>

<details>
<summary>Hint 2: The two categories</summary>

For age classification, you have two categories:
- **Adult**: Age is 18 or older (`age >= 18` is true)
- **Minor**: Age is under 18 (`age >= 18` is false)

```javascript
if (age >= 18) {
  console.log(`Age ${age}: Adult`);
} else {
  console.log(`Age ${age}: Minor`);
}
```

Notice how the else block handles the opposite case automatically - you don't need to write `if (age < 18)` for the else!
</details>

<details>
<summary>Hint 3: Template literals work in both blocks</summary>

You can use template literals in both the if and else blocks:

```javascript
const age = 25;

if (age >= 18) {
  console.log(`Age ${age}: Adult`);  // Runs when age >= 18
} else {
  console.log(`Age ${age}: Minor`);  // Runs when age < 18
}
```

The `${age}` will be replaced with the actual age value in both cases.
</details>

<details>
<summary>Hint 4: Complete example for age1</summary>

Here's the complete if-else structure for age1:

```javascript
if (age1 >= 18) {
  console.log(`Age ${age1}: Adult`);
} else {
  console.log(`Age ${age1}: Minor`);
}
```

**How this works:**
- age1 is 25
- The condition `25 >= 18` is true
- So the if block runs, displaying "Age 25: Adult"
- The else block is skipped

Now apply the same pattern to age2 and age3!
</details>

## Test Your Code

To run your code and see the output:
```bash
cd exercises/014-age-if-else
node 014-age-if-else.js
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise teaches you:
- **If-else statements** - handling both true and false cases
- **Binary decisions** - choosing between exactly two options
- **Complete coverage** - ensuring all possibilities are handled
- **Control flow** - directing your code down different paths

If-else is one of the most common patterns in programming. Whenever you need to choose between two options, this is the structure you'll use!

## Reflection Questions

After completing the exercise, think about:
1. What's the difference between using just `if` (previous exercise) versus `if-else`?
2. When would you use a simple `if`, and when would you use `if-else`?
3. Can you think of other situations in real life or apps where something is classified into exactly two categories?

## Solution

<details>
<summary>Click to see the solution (try the exercise first!)</summary>

```javascript
export function classifyAge() {
  // Test different ages
  const age1 = 25;
  const age2 = 16;
  const age3 = 10;

  // Classify age1
  if (age1 >= 18) {
    console.log(`Age ${age1}: Adult`);
  } else {
    console.log(`Age ${age1}: Minor`);
  }

  // Classify age2
  if (age2 >= 18) {
    console.log(`Age ${age2}: Adult`);
  } else {
    console.log(`Age ${age2}: Minor`);
  }

  // Classify age3
  if (age3 >= 18) {
    console.log(`Age ${age3}: Adult`);
  } else {
    console.log(`Age ${age3}: Minor`);
  }
}

classifyAge();
```

**Why this works:**

For **age1 (25)**:
- Checks: `25 >= 18` → true
- Runs the if block: displays "Age 25: Adult"
- Skips the else block

For **age2 (16)**:
- Checks: `16 >= 18` → false
- Skips the if block
- Runs the else block: displays "Age 16: Minor"

For **age3 (10)**:
- Checks: `10 >= 18` → false
- Skips the if block
- Runs the else block: displays "Age 10: Minor"

**The guarantee of if-else:**
```javascript
if (condition) {
  // Path A - runs when condition is true
} else {
  // Path B - runs when condition is false
}
```
**Exactly one** of these paths will always run. There's no way for both to run, and no way for neither to run. This is what makes if-else perfect for binary decisions!

**Comparison: if vs if-else**

Using just **if** (Exercise 013):
```javascript
if (age >= 18) {
  console.log("Can vote");
}
// If age < 18, nothing happens
```

Using **if-else** (Exercise 014):
```javascript
if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}
// Something ALWAYS happens - everyone gets classified
```

**Real-world examples of if-else:**
- Login: successful → go to dashboard, failed → show error
- Payment: approved → show confirmation, declined → show error message
- File upload: valid format → process file, invalid → reject with message
- Game: player wins → show victory screen, player loses → show defeat screen

</details>

## Next Steps

Excellent work! You can now handle two categories with if-else. But what if you need **more than two categories**? What about child, teen, and adult? Or child, teen, adult, and senior?

In **exercise 015-age-multiple-groups**, you'll learn about **else-if** to handle multiple age categories. You're building toward a complete age classification system!
