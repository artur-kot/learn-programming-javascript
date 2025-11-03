## Profile Card - Store User Info

Imagine you're building a social media app. Before you can display user information, you need to store it somewhere. That's where variables come in - they're like labeled boxes where you can keep pieces of information to use later.

In this exercise, you'll create your first variables to store a user's profile information: their name, age, and email address.

In JavaScript, there are two main ways to create variables:
- `let`: Use this when the value might change later.
```javascript
let age = 25;
```
- `const`: Use this when the value will stay the same.
```javascript
const name = "John Doe";
```

Also, we have primitive data types to represent different kinds of information:
- **String**: Text values, like names or email addresses. These are wrapped in quotes (single or double).
- **Number**: Numeric values, like age. These are written without quotes.
- **Boolean**: True or false values, often used for yes/no questions.

These types will fit for now, you have to remember that we have also other types like `null`, `undefined`, `object`, but let's not complicate things for now.

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

## Bonus Goals
- Create `boolean` variable `isActive` and set it to `true` to indicate the user is active.
- Create `const` variable `country` and set it to `"USA"` to store the user's country.

## Read More

Want to dive deeper? Check out these resources:

- 📚 [Variables - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#declarations)
- 📖 [JavaScript Data Types - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
- 🎯 [Variables and Scoping - JavaScript.info](https://javascript.info/variables)