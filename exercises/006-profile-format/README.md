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
<summary>Hint 1: String methods are functions attached to strings</summary>

String methods are special functions you can call on any string using the dot (`.`) notation:

```javascript
const text = "  hello  ";
const cleaned = text.trim();  // Removes spaces from both ends
console.log(cleaned);  // Output: "hello"
```

The original string stays the same - methods create a new modified string!
</details>

<details>
<summary>Hint 2: Common string methods</summary>

Here are the methods you'll need for this exercise:

**`.trim()`** - Removes whitespace from both ends of a string:
```javascript
const messy = "  hello  ";
const clean = messy.trim();  // "hello"
```

**`.toUpperCase()`** - Converts all letters to uppercase:
```javascript
const text = "hello";
const loud = text.toUpperCase();  // "HELLO"
```

**`.toLowerCase()`** - Converts all letters to lowercase:
```javascript
const text = "HELLO";
const quiet = text.toLowerCase();  // "hello"
```

**`.length`** - Property (not a method!) that gives the number of characters:
```javascript
const text = "hello";
const size = text.length;  // 5
```
Note: `.length` doesn't have parentheses because it's a property, not a method!
</details>

<details>
<summary>Hint 3: Clean the name first</summary>

Start by trimming the name to remove those extra spaces:
```javascript
const cleanName = name.trim();
```

Now `cleanName` will be "sarah chen" instead of "  sarah chen  "
</details>

<details>
<summary>Hint 4: Transform the role and company</summary>

For the role:
```javascript
const roleUpper = role.toUpperCase();
```

For the company:
```javascript
const companyLower = company.toLowerCase();
```
</details>

<details>
<summary>Hint 5: Get the length</summary>

Remember to get the length of the *cleaned* name (after trimming):
```javascript
const nameLength = cleanName.length;
```

Then display it in a template literal:
```javascript
console.log(`Name length: ${nameLength}`);
```
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

## Solution

<details>
<summary>Click to see the solution (try the exercise first!)</summary>

```javascript
export function formatProfile() {
  // User information with some formatting issues
  const name = "  sarah chen  ";
  const role = "software engineer";
  const company = "TECH CORP";

  // Clean and format the data using string methods
  const cleanName = name.trim();
  const roleUpper = role.toUpperCase();
  const companyLower = company.toLowerCase();
  const nameLength = cleanName.length;

  // Display the formatted profile
  console.log(`Name: ${cleanName}`);
  console.log(`Role: ${roleUpper}`);
  console.log(`Company: ${companyLower}`);
  console.log(`Name length: ${nameLength}`);
}

formatProfile();
```

**Why this works:**
- `.trim()` removes the extra spaces from "  sarah chen  " → "sarah chen"
- `.toUpperCase()` converts "software engineer" → "SOFTWARE ENGINEER"
- `.toLowerCase()` converts "TECH CORP" → "tech corp"
- `.length` counts the characters in "sarah chen" → 10 (including the space!)

**Important concepts:**
- String methods create new strings; they don't modify the original
- Methods have parentheses `()`, properties don't
- You can chain methods: `name.trim().toUpperCase()` (trim first, then uppercase)
- `.length` includes spaces and special characters in the count

**Method chaining example:**
```javascript
// You can apply multiple methods in sequence:
const formatted = "  HELLO  ".trim().toLowerCase();
console.log(formatted);  // Output: "hello"

// This works because:
// 1. "  HELLO  ".trim() → "HELLO"
// 2. "HELLO".toLowerCase() → "hello"
```

**Why these methods matter:**
In real applications, you'll constantly need to:
- Clean user input (trim spaces, standardize case)
- Format data for display (uppercase headers, lowercase emails)
- Validate input (check length, compare case-insensitively)
- Process text from APIs or databases (often needs cleaning)

</details>

## Next Steps

Fantastic! You've learned how to clean up and format text data. In the final exercise of this series (**exercise 007-profile-validate**), you'll use string methods to validate that an email address is properly formatted. This is a crucial skill for building real applications!
