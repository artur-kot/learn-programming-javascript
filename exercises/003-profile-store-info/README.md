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

Think about how you would label a box to remember what's inside it. Variables work the same way - they give names to pieces of information. In JavaScript, you have two keywords to choose from when creating variables: one for values that might change, and one for values that stay constant. Which makes more sense when storing someone's profile information that won't be modified?

</details>

<details>
<summary>Hint 2: Different types of values</summary>

Notice that you're storing different types of information. Some pieces are text (like a person's name), while others are numbers (like their age). How does JavaScript know the difference? Think about what you need to wrap around text to tell the computer "this is words, not code."

</details>

<details>
<summary>Hint 3: Displaying your variables</summary>

You've created variables to hold your data. Now how do you show what's inside them? You've used this tool before to display text. Can you call it multiple times to show each piece of information on its own line?

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

## Next Steps

Great job! Now that you know how to store information, the next exercise will teach you how to combine these pieces of information to create a formatted profile card display. Move on to **exercise 004-profile-concatenation** when you're ready!
