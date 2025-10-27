## Profile Card - Display With Concatenation

You've learned how to store user information in variables. Now let's make it look more professional! Instead of just displaying raw values, you'll add labels like "Name:" and "Age:" to create a nicely formatted profile card.

This exercise teaches you **string concatenation** - a fancy term for joining pieces of text together.

## Your Challenge

Open `004-profile-concatenation.js`. You'll see the same three variables from the previous exercise (name, age, email).

Your task is to combine these variables with descriptive labels to create formatted messages:
- Combine "Name: " with the name variable
- Combine "Age: " with the age variable
- Combine "Email: " with the email variable

Then log each formatted message.

## Expected Output

When you run your code, you should see:
```
Name: Sarah Chen
Age: 28
Email: sarah.chen@email.com
```

## Hints

<details>
<summary>Hint 1: Joining pieces of text</summary>

You've probably used the plus sign for adding numbers. But what happens when you put a plus sign between two pieces of text? Try experimenting with joining "Hello" and "World" to see what happens. This same approach works for joining labels like "Name: " with the actual name value.

</details>

<details>
<summary>Hint 2: Building the formatted messages</summary>

Think about what you want to see in the output: "Name: Sarah Chen". This is made up of two parts - a label and a value. How can you combine the label text with what's stored in your variable? Don't forget about spacing - you'll want a space after the colon!

</details>

<details>
<summary>Hint 3: What about numbers?</summary>

You need to combine text labels with different types of data - both text and numbers. What do you think happens when you try to join a piece of text with a number? Does JavaScript know what to do?

</details>

## Test Your Code

To run your code and see the output:
```bash
cd exercises/004-profile-concatenation
node 004-profile-concatenation
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise teaches you about **string concatenation**:
- Combining multiple strings into one
- Mixing text literals with variables
- How JavaScript handles different data types when concatenating
- Creating formatted, readable output

## Reflection Questions

After completing the exercise, think about:
1. Why is "Name: " + name easier to read than just displaying the name alone?
2. What happens when you use `+` with a string and a number?
3. Can you think of other situations where you'd want to combine text with variable values?

## Next Steps

Nice work! You've created a formatted profile card using string concatenation. But JavaScript has an even better way to combine strings and variables - **template literals**! In the next exercise (**004-profile-templates**), you'll learn a more modern and readable approach. Ready? Let's go!

## Read More

Want to dive deeper? Check out these resources:

- 📚 [String Concatenation - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_concatenation)
- 📖 [Working with Strings - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Text_formatting)
- 🎯 [Strings - JavaScript.info](https://javascript.info/string)

