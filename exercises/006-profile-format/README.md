## Profile Card - Format and Style

Real-world data is messy! User input might have extra spaces, inconsistent capitalization, or other formatting issues. Thankfully, JavaScript provides built-in **string methods** to help you clean up and format text exactly how you need it.

In this exercise, you'll use string methods to transform messy profile data into a clean, professional format.

## Your Challenge

Open `006-profile-format.js`. You'll notice the variables have some formatting problems:
- `name` has extra spaces at the beginning and end
- `role` is all lowercase when it should stand out
- `company` is all uppercase when it should be lowercase

Use JavaScript string methods to:
1. Remove the extra spaces from the name (`.trim()`)
2. Convert the role to all uppercase (`.toUpperCase()`)
3. Convert the company to all lowercase (`.toLowerCase()`)
4. Find out how many characters are in the cleaned name (`.length`)

## Expected Output

When you run your code, you should see:
```
Name: sarah chen
Role: SOFTWARE ENGINEER
Company: tech corp
Name length: 10
```

## Hints

<details>
<summary>Hint 1: Strings have built-in capabilities</summary>

Strings in JavaScript aren't just passive data - they come with built-in abilities to transform themselves. You can access these abilities using the dot notation. When you use a dot after a variable name, you're asking "what can this string do?" Think about the kinds of transformations you might want: removing unwanted characters, changing capitalization, or measuring length.

</details>

<details>
<summary>Hint 2: Removing unwanted whitespace</summary>

The name has extra spaces at the beginning and end. How would you clean that up? Strings have a built-in ability to remove whitespace from both ends. What word describes getting rid of excess material to make something neat?

</details>

<details>
<summary>Hint 3: Changing letter case</summary>

You need to transform text to all uppercase and all lowercase. Strings have built-in abilities for these transformations. Think about descriptive names for these actions - what would you call the process of making all letters uppercase? What about lowercase?

</details>

<details>
<summary>Hint 4: Measuring text</summary>

To find out how many characters are in a string, you need to access information about the string rather than transform it. Unlike the transformation abilities (which are methods you call), this information is a property you can read. What property would tell you the size or count of characters?

</details>

<details>
<summary>Hint 5: Order matters</summary>

Make sure you clean the name first (removing spaces) before you measure its length. Why? Because the spaces count as characters! If you measure before cleaning, you'll get the wrong count.

</details>

## Test Your Code

To run your code and see the output:
```bash
cd exercises/006-profile-format
node 006-profile-format
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise teaches you about **string methods**:
- Using built-in JavaScript functions to manipulate text
- The difference between methods (with parentheses) and properties (without)
- How methods return new values without changing the original
- Practical text formatting techniques you'll use constantly in real projects

## Reflection Questions

After completing the exercise, think about:
1. Why would you want to trim whitespace from user input?
2. What are some real-world situations where you'd need to change text to uppercase or lowercase?
3. What's the difference between `text.length` and `text.trim()` in terms of syntax?

## Next Steps

Fantastic! You've learned how to clean up and format text data. In the final exercise of this series (**exercise 007-profile-validate**), you'll use string methods to validate that an email address is properly formatted. This is a crucial skill for building real applications!

## Read More

Want to dive deeper? Check out these resources:

- 📚 [String Methods - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#instance_methods)
- 📖 [String.prototype.trim() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim)
- 🎯 [String Methods - JavaScript.info](https://javascript.info/string#changing-the-case)

