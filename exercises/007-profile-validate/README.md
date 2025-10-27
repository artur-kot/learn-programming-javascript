## Profile Card - Validate Email

Congratulations on making it to the final exercise in the Profile Card Builder series! You've learned to store data, combine strings, use template literals, and format text. Now it's time to put it all together for a practical real-world task: **validating email addresses**.

Every time you create an account on a website, the site checks whether your email looks valid. One basic check is making sure it contains the `@` symbol. That's exactly what you'll build in this exercise!

## Your Challenge

Open `007-profile-validate.js`. You'll see three email addresses, and one of them is missing the `@` symbol.

Your task is to:
1. Check each email to see if it contains the `@` symbol using the `.includes()` method
2. Display whether each email is "valid" or "invalid"

## Expected Output

When you run your code, you should see:
```
sarah.chen@email.com is valid
invalid.email.com is invalid
john@company.org is valid
```

## Hints

<details>
<summary>Hint 1: Checking if text contains something</summary>

You need to find out if each email address contains a specific character (the @ symbol). Strings have a built-in ability to search for text within themselves. What would you call a method that checks whether a string "includes" or "contains" another piece of text? This method returns a yes/no answer (true or false).

</details>

<details>
<summary>Hint 2: Making decisions based on conditions</summary>

Once you know whether an email contains the @ symbol (true or false), you need to choose between two words: "valid" or "invalid". JavaScript has a compact way to make this kind of either/or decision. It uses a question mark and colon to ask "if this condition is true, use this value, otherwise use that value." Think of it as a shorthand for an if-else statement.

</details>

<details>
<summary>Hint 3: Combining the check and the decision</summary>

You can do the checking and deciding in one expression. Think about how you might embed both the test (does it contain @?) and the decision (valid or invalid?) right inside your template literal. This keeps your code concise and readable.

</details>

<details>
<summary>Hint 4: Breaking it down step by step</summary>

If combining everything feels overwhelming, break it into steps:
1. First, check if the email contains the @ symbol and store the result (true/false)
2. Then, use that result to decide between "valid" and "invalid"
3. Finally, display the email and its status together

Once this works, you might see how to combine the steps!

</details>

## Test Your Code

To run your code and see the output:
```bash
cd exercises/007-profile-validate
node 007-profile-validate
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise brings together multiple concepts:
- **String methods** (`.includes()`)
- **Boolean values** (true/false)
- **Conditional logic** (ternary operator)
- **Template literals** (embedding expressions)
- **Real-world validation** (practical application)

## Reflection Questions

After completing the exercise, think about:
1. Why is checking for `@` only a *basic* validation? What else makes a valid email?
2. How would you check if an email contains both `@` and a period `.`?
3. Can you think of other situations where you'd use `.includes()` to validate user input?

## Next Steps

Ready for more? The next series, **Simple Calculator** (exercises 008-012), will teach you how to work with numbers, perform calculations, and handle user input. Take a break if you need one, then dive into **exercise 008-calculator-basic** when you're ready!

Keep up the excellent work!

## Read More

Want to dive deeper? Check out these resources:

- 📚 [String Validation - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#instance_methods)
- 📖 [Regular Expressions - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- 🎯 [Email Validation Best Practices](https://emailregex.com/)

