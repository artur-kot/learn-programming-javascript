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
<summary>Hint 1: Template literals use backticks</summary>

Template literals use backticks `` ` `` instead of regular quotes `"` or `'`:

```javascript
const message = `This is a template literal`;
```

The backtick key is usually in the top-left of your keyboard, below the Escape key and above Tab.
</details>

<details>
<summary>Hint 2: Insert variables with ${}</summary>

Inside a template literal, you can insert variables using `${}`:

```javascript
const name = "Alex";
const greeting = `Hello, ${name}!`;
console.log(greeting);  // Output: Hello, Alex!
```

JavaScript will replace `${name}` with the actual value of the name variable.
</details>

<details>
<summary>Hint 3: Compare concatenation vs template literals</summary>

**Using concatenation (old way):**
```javascript
const message = "Name: " + name;
```

**Using template literals (modern way):**
```javascript
const message = `Name: ${name}`;
```

See how much cleaner the template literal is? No quotes or plus signs to juggle!
</details>

<details>
<summary>Hint 4: Creating your messages</summary>

For the name message:
```javascript
const nameMessage = `Name: ${name}`;
```

For the age message:
```javascript
const ageMessage = `Age: ${age}`;
```

For the email message:
```javascript
const emailMessage = `Email: ${email}`;
```
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

## Solution

<details>
<summary>Click to see the solution (try the exercise first!)</summary>

```javascript
export function displayProfileCard() {
  // Same variables from previous exercises
  const name = "Sarah Chen";
  const age = 28;
  const email = "sarah.chen@email.com";

  // Create formatted messages using template literals
  const nameMessage = `Name: ${name}`;
  const ageMessage = `Age: ${age}`;
  const emailMessage = `Email: ${email}`;

  // Display the formatted profile
  console.log(nameMessage);
  console.log(ageMessage);
  console.log(emailMessage);
}

displayProfileCard();
```

**Why this works:**
- Backticks `` ` `` create a template literal
- `${name}` tells JavaScript to insert the value of the `name` variable at that spot
- JavaScript evaluates what's inside `${}` and converts it to a string
- The result is a clean, readable string with the variable values inserted

**More concise version:**
```javascript
// You can also skip the intermediate variables:
console.log(`Name: ${name}`);
console.log(`Age: ${age}`);
console.log(`Email: ${email}`);
```

**Template literals can do even more:**
```javascript
// You can put any expression inside ${}:
const nextAge = `Next year, I'll be ${age + 1}`;
console.log(nextAge);  // Output: Next year, I'll be 29

// You can have multiple variables in one template:
const summary = `${name} (${age}) - ${email}`;
console.log(summary);  // Output: Sarah Chen (28) - sarah.chen@email.com
```

**Why template literals are better:**
- Easier to read and write
- Less error-prone (no forgetting quote marks or plus signs)
- Can span multiple lines (we'll use this later!)
- The standard in modern JavaScript code

</details>

## Next Steps

Excellent! You've learned a modern, clean way to combine strings and variables. Next, you'll discover how to transform and format text using **string methods** in **exercise 006-profile-format**. Let's make that profile card even more polished!
