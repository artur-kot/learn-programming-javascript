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
<summary>Hint 1: The + operator joins strings</summary>

The `+` operator can add numbers, but it can also join (concatenate) strings:

```javascript
const greeting = "Hello, " + "World!";
console.log(greeting);  // Output: Hello, World!
```

You can also combine a string with a variable:
```javascript
const name = "Alex";
const message = "Hello, " + name;
console.log(message);  // Output: Hello, Alex
```
</details>

<details>
<summary>Hint 2: Building the name message</summary>

To create "Name: Sarah Chen", you need to join two pieces:
1. The text "Name: " (note the space after the colon!)
2. The value stored in the `name` variable

```javascript
const nameMessage = "Name: " + name;
```
</details>

<details>
<summary>Hint 3: Numbers work too!</summary>

When you use `+` to concatenate a string with a number, JavaScript automatically converts the number to text:

```javascript
const age = 28;
const ageMessage = "Age: " + age;  // JavaScript converts 28 to "28"
console.log(ageMessage);  // Output: Age: 28
```
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

## Solution

<details>
<summary>Click to see the solution (try the exercise first!)</summary>

```javascript
export function displayProfile() {
  // Variables from the previous exercise
  const name = "Sarah Chen";
  const age = 28;
  const email = "sarah.chen@email.com";

  // Create formatted messages by concatenating strings
  const nameMessage = "Name: " + name;
  const ageMessage = "Age: " + age;
  const emailMessage = "Email: " + email;

  // Display the formatted profile
  console.log(nameMessage);
  console.log(ageMessage);
  console.log(emailMessage);
}

displayProfile();
```

**Why this works:**
- The `+` operator joins the label text with the variable value
- "Name: " is a string literal (the text you type in quotes)
- `name` is a variable containing "Sarah Chen"
- When you put them together with `+`, JavaScript creates a new string: "Name: Sarah Chen"
- Even though `age` is a number (28), JavaScript converts it to text when concatenating with a string

**Alternative approach (more direct):**
```javascript
// You can also concatenate and log in one line:
console.log("Name: " + name);
console.log("Age: " + age);
console.log("Email: " + email);
```

Both approaches work! The first creates intermediate variables (which can be useful if you need to reuse the formatted strings). The second is more concise.

</details>

## Next Steps

Nice work! You've created a formatted profile card using string concatenation. But JavaScript has an even better way to combine strings and variables - **template literals**! In the next exercise (**004-profile-templates**), you'll learn a more modern and readable approach. Ready? Let's go!
