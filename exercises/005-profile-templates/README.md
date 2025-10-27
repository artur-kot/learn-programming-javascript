## Profile Card - Template Literals

In the last exercise, you used the `+` operator to combine strings. That works, but it can get messy with lots of quotes and plus signs. JavaScript has a better way: **template literals**!

Template literals make it much easier and cleaner to insert variables into strings. They're like mad-libs for your code - you create a sentence with blanks, and JavaScript fills in the blanks with your variable values.

## Your Challenge

Open `005-profile-templates.js`. You'll see the same three variables (name, age, email) from the previous exercises.

This time, use **template literals** instead of concatenation to create the same formatted output:
- "Name: Sarah Chen"
- "Age: 28"
- "Email: sarah.chen@email.com"

## Expected Output

When you run your code, you should see:
```
Name: Sarah Chen
Age: 28
Email: sarah.chen@email.com
```

(Same output as before, but created with cleaner, more modern syntax!)

## Hints

<details>
<summary>Hint 1: A different kind of quote</summary>

In the last exercise, you used the plus operator to join strings. There's a more modern way that's easier to read. Instead of regular quotes, JavaScript has a special character (the backtick) that creates a different kind of string. Can you find it on your keyboard? It's usually near the Escape key.

</details>

<details>
<summary>Hint 2: Inserting variables directly</summary>

With this special kind of string, you don't need plus signs at all. Instead, you can place variables directly inside the text. Think about how you might mark a "blank space" where a variable should go - like a placeholder that gets filled in with the actual value. JavaScript uses a special syntax with a dollar sign and curly braces for this.

</details>

<details>
<summary>Hint 3: Compare your approaches</summary>

Look back at how you created messages in the previous exercise using the plus operator. How many quotes and plus signs did you need? Now think about writing the same thing but with text, a placeholder for the variable, and all in one set of backticks. Which feels easier to read?

</details>

<details>
<summary>Hint 4: Building your first template</summary>

To create "Name: Sarah Chen", you want to write text that looks like "Name: " followed by the actual name value. Using backticks to start and end your text, how would you mark where the name variable should be inserted into that text?

</details>

## Test Your Code

To run your code and see the output:
```bash
cd exercises/005-profile-templates
node 005-profile-templates
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise teaches you about **template literals**:
- A more modern and readable way to combine strings and variables
- Using backticks `` ` `` instead of quotes
- Embedding expressions inside `${}`
- Why template literals are preferred over concatenation in modern JavaScript

## Reflection Questions

After completing the exercise, think about:
1. Which do you find easier to read: `"Name: " + name` or `` `Name: ${name}` ``?
2. What happens if you put multiple variables in one template literal?
3. Can you spot any advantages of template literals for longer, more complex strings?

## Next Steps

Excellent! You've learned a modern, clean way to combine strings and variables. Next, you'll discover how to transform and format text using **string methods** in **exercise 006-profile-format**. Let's make that profile card even more polished!

## Read More

Want to dive deeper? Check out these resources:

- 📚 [Template Literals - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
