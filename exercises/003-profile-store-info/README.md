## Profile Card - Store User Info

Imagine you're building a social media app. Before you can display user information, you need to store it somewhere. That's where variables come in - they're like labeled boxes where you can keep pieces of information to use later.

In this exercise, you'll create your first variables to store a user's profile information: their name, age, and email address.

## Your Challenge

Open `003-profile-store-info.js` and create three variables inside the `createProfile` function:
- A variable to store the name "Sarah Chen"
- A variable to store the age 28
- A variable to store the email "sarah.chen@email.com"

Then, use `console.log()` to display each piece of information on its own line.

## Expected Output

When you run your code, you should see:
```
Sarah Chen
28
sarah.chen@email.com
```

## Hints

<details>
<summary>Hint 1: Creating variables</summary>

In JavaScript, you can create variables using `let` or `const`:
- `let` is for values that might change later
- `const` is for values that stay the same

Since this profile information won't change in our function, `const` is a good choice!

```javascript
const variableName = value;
```
</details>

<details>
<summary>Hint 2: Different types of values</summary>

Notice that we're storing different types of information:
- Text (like names and emails) needs to be wrapped in quotes: `"Sarah Chen"`
- Numbers (like age) don't need quotes: `28`
</details>

<details>
<summary>Hint 3: Logging multiple values</summary>

You can call `console.log()` multiple times:
```javascript
console.log(name);
console.log(age);
console.log(email);
```
</details>

## Test Your Code

To run your code and see the output:
```bash
cd exercises/003-profile-store-info
node 003-profile-store-info
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise teaches you about **variables** - one of the most fundamental concepts in programming. Variables let you:
- Store information to use later
- Give meaningful names to your data
- Organize your code so it's easier to understand and modify

## Reflection Questions

After completing the exercise, think about:
1. Why is it helpful to store information in variables instead of just typing the values directly?
2. What's the difference between the name variable and the age variable? (Hint: one uses quotes, one doesn't)
3. If you wanted to change the user's email, where would you make that change?

## Solution

<details>
<summary>Click to see the solution (try the exercise first!)</summary>

```javascript
export function createProfile() {
  // Create variables to store user information
  // We use 'const' because these values won't change
  const name = "Sarah Chen";
  const age = 28;
  const email = "sarah.chen@email.com";

  // Display each piece of information
  console.log(name);
  console.log(age);
  console.log(email);
}

createProfile();
```

**Why this works:**
- `const name = "Sarah Chen"` creates a variable called `name` and stores the text "Sarah Chen" in it
- The quotes around "Sarah Chen" and "sarah.chen@email.com" tell JavaScript these are text values (called "strings")
- The number 28 doesn't need quotes because it's a number
- Each `console.log()` statement prints one variable's value

**Key concepts:**
- **Variables** are containers for storing data values
- **const** declares a variable whose value won't be reassigned
- **Strings** (text) are wrapped in quotes; **numbers** are not
- You can reuse variable names throughout your code instead of typing the same values repeatedly
</details>

## Next Steps

Great job! Now that you know how to store information, the next exercise will teach you how to combine these pieces of information to create a formatted profile card display. Move on to **exercise 004-profile-concatenation** when you're ready!
