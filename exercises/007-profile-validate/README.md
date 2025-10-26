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
<summary>Hint 1: The .includes() method</summary>

The `.includes()` method checks if a string contains another string. It returns `true` or `false`:

```javascript
const text = "hello world";
const hasWorld = text.includes("world");  // true
const hasGoodbye = text.includes("goodbye");  // false
```

For email validation:
```javascript
const email = "test@example.com";
const hasAt = email.includes("@");  // true
```
</details>

<details>
<summary>Hint 2: The ternary operator (conditional expression)</summary>

The ternary operator is a shorthand for if-else. It's perfect for choosing between two values:

```javascript
const age = 18;
const status = age >= 18 ? "adult" : "minor";
console.log(status);  // Output: "adult"
```

The syntax is: `condition ? valueIfTrue : valueIfFalse`

For your exercise:
```javascript
const isValid = email.includes("@");
const result = isValid ? "valid" : "invalid";
```
</details>

<details>
<summary>Hint 3: Combining everything with template literals</summary>

You can put the entire check right inside a template literal:

```javascript
const email = "test@example.com";
console.log(`${email} is ${email.includes("@") ? "valid" : "invalid"}`);
```

Let's break this down:
- `${email}` - inserts the email address
- `${email.includes("@") ? "valid" : "invalid"}` - checks for @ and inserts either "valid" or "invalid"
</details>

<details>
<summary>Hint 4: Step-by-step for email1</summary>

Here's one way to validate email1:

```javascript
const hasAt1 = email1.includes("@");
const status1 = hasAt1 ? "valid" : "invalid";
console.log(`${email1} is ${status1}`);
```

Or more concisely:
```javascript
console.log(`${email1} is ${email1.includes("@") ? "valid" : "invalid"}`);
```

Both work! Choose whichever makes more sense to you.
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

## Solution

<details>
<summary>Click to see the solution (try the exercise first!)</summary>

```javascript
export function validateEmail() {
  // Test various email addresses
  const email1 = "sarah.chen@email.com";
  const email2 = "invalid.email.com";
  const email3 = "john@company.org";

  // Check if each email contains the @ symbol
  const hasAt1 = email1.includes("@");
  const hasAt2 = email2.includes("@");
  const hasAt3 = email3.includes("@");

  // Display validation results
  console.log(`${email1} is ${hasAt1 ? "valid" : "invalid"}`);
  console.log(`${email2} is ${hasAt2 ? "valid" : "invalid"}`);
  console.log(`${email3} is ${hasAt3 ? "valid" : "invalid"}`);
}

validateEmail();
```

**More concise version:**
```javascript
export function validateEmail() {
  const email1 = "sarah.chen@email.com";
  const email2 = "invalid.email.com";
  const email3 = "john@company.org";

  // Combine checking and logging in one line
  console.log(`${email1} is ${email1.includes("@") ? "valid" : "invalid"}`);
  console.log(`${email2} is ${email2.includes("@") ? "valid" : "invalid"}`);
  console.log(`${email3} is ${email3.includes("@") ? "valid" : "invalid"}`);
}

validateEmail();
```

**Why this works:**
- `.includes("@")` returns `true` if the email contains @ and `false` if it doesn't
- The ternary operator `? :` chooses "valid" when true, "invalid" when false
- The template literal creates the full message: "email is valid/invalid"

**How the ternary operator works:**
```javascript
// Think of it as a compact if-else:
condition ? doThisIfTrue : doThisIfFalse

// Instead of writing:
let status;
if (hasAt) {
  status = "valid";
} else {
  status = "invalid";
}

// You can write:
const status = hasAt ? "valid" : "invalid";
```

**Bonus: More robust email validation**
```javascript
function isEmailValid(email) {
  // Check for both @ and . after the @
  const hasAt = email.includes("@");
  const atIndex = email.indexOf("@");
  const hasDotAfterAt = email.slice(atIndex).includes(".");

  return hasAt && hasDotAfterAt;
}

// Usage:
const email = "test@example.com";
console.log(`${email} is ${isEmailValid(email) ? "valid" : "invalid"}`);
```

**Real-world context:**
In production applications, email validation is much more complex (checking for proper format, valid domain, etc.), but the principle is the same: using string methods to check if the input meets certain criteria.

</details>

## Series Complete!

Congratulations! You've completed the **Profile Card Builder** series!

Here's what you've accomplished:
- ✅ **Exercise 003**: Stored user information in variables
- ✅ **Exercise 004**: Combined strings with concatenation
- ✅ **Exercise 005**: Used modern template literals
- ✅ **Exercise 006**: Formatted text with string methods
- ✅ **Exercise 007**: Validated email addresses

You now have a solid foundation in working with strings and variables - skills you'll use in every JavaScript program you write!

## Next Steps

Ready for more? The next series, **Simple Calculator** (exercises 008-012), will teach you how to work with numbers, perform calculations, and handle user input. Take a break if you need one, then dive into **exercise 008-calculator-basic** when you're ready!

Keep up the excellent work!
