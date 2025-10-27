## Age Checker - Permission System

Welcome to the final exercise in the Age Checker series! You've learned if, else, else-if, and how to combine conditionals with calculations. Now it's time to master the most powerful tool in your conditional toolkit: **logical operators**.

Real-world permission systems rarely check just one condition. Think about social media age restrictions, movie ratings, or account permissions - they often require checking multiple conditions together. That's where **AND** (`&&`) and **OR** (`||`) operators come in!

## Your Challenge

Open `017-age-permissions.js`. You'll see four users with different ages and parental consent status.

Your task is to check three permissions for each user based on these complex rules:

1. **Can watch R-rated movie**: Age 17+ **OR** (Age 13-16 **AND** has parental consent)
2. **Can vote**: Age 18+
3. **Can drive**: Age 16+

## Expected Output

When you run your code, you should see:
```
Alice (age 16):
  Can watch R-rated: Yes
  Can vote: No
  Can drive: Yes
Bob (age 25):
  Can watch R-rated: Yes
  Can vote: Yes
  Can drive: Yes
Carol (age 14):
  Can watch R-rated: No
  Can vote: No
  Can drive: No
David (age 17):
  Can watch R-rated: Yes
  Can vote: No
  Can drive: Yes
```

## Hints

<details>
<summary>Hint 1: What are logical operators?</summary>

Logical operators let you combine multiple conditions into more complex decision-making logic.

**AND logic** - Both conditions must be true for the overall result to be true. Think of it like needing two keys to open a safe: you need BOTH, not just one.

**OR logic** - At least one condition must be true for the overall result to be true. Think of it like having multiple ways to unlock a door: if ANY method works, you get in.

These operators are fundamental to expressing complex real-world rules in code.
</details>

<details>
<summary>Hint 2: Using parentheses for complex conditions</summary>

When combining AND and OR logic, use parentheses to make the grouping clear and ensure the correct evaluation order.

For the R-rated rule, think about it in plain language: "Someone can watch if they're 17 or older, OR if they're a teen (13-16) AND have parental consent."

The parentheses group related conditions together, making the logic clear: one main option OR (a group of conditions that must all be true together).
</details>

<details>
<summary>Hint 3: Accessing object properties</summary>

User information is stored in objects. Access properties using dot notation to get the values you need for your permission checks.

For example, to get a user's age or consent status, you use the object name followed by a dot and the property name.
</details>

<details>
<summary>Hint 4: Displaying conditional results</summary>

You need to display "Yes" or "No" based on whether a condition is true or false. JavaScript has a compact way to express this: a ternary operator that checks a condition and returns one value if true, another if false.

This is useful for converting boolean results into readable text.
</details>

<details>
<summary>Hint 5: Pattern for checking permissions</summary>

For each user:
1. Calculate each permission by evaluating the rules (store results in variables)
2. Display the user's name and age
3. Display each permission result as Yes or No

The R-rated permission requires combining multiple conditions with both OR and AND logic. The other two permissions are simpler comparisons.

Apply this pattern to all four users to see how different ages and consent statuses affect permissions.
</details>

## Test Your Code

To run your code and see the output:
```bash
cd exercises/017-age-permissions
node 017-age-permissions.js
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise teaches you:
- **Logical AND (`&&`)** - checking multiple conditions that must all be true
- **Logical OR (`||`)** - checking conditions where at least one must be true
- **Combining operators** - using AND and OR together in complex expressions
- **Boolean logic** - the foundation of all conditional programming
- **Object property access** - working with structured data
- **Real-world permission systems** - how apps make access decisions

Logical operators are essential for any non-trivial conditional logic in programming!

## Reflection Questions

After completing the exercise, think about:
1. What's the difference between AND (`&&`) and OR (`||`)?
2. Why do we need parentheses when combining AND and OR operators?
3. How would you modify the R-rated rule to require **both** 17+ age **and** parental consent?
4. Can you think of other permission systems that use complex rules like this?

## What You've Mastered

**Conditional Statements:**
- `if` - run code when condition is true
- `if-else` - choose between two paths
- `if-else if-else` - choose between multiple paths

**Comparison Operators:**
- `>=`, `<=`, `>`, `<` - compare numbers
- `===`, `!==` - check equality

**Logical Operators:**
- `&&` (AND) - both conditions must be true
- `||` (OR) - at least one condition must be true

**Practical Applications:**
- Age verification systems
- Permission and access control
- Price calculation with rules
- Data classification and categorization

## Next Steps

Ready for your next challenge? The next series, **Grade Calculator** (exercises 018-022), will help you master conditionals even further by building a complete student grading system. You'll learn about switch statements, GPA calculations, and more complex decision-making patterns.

Take a break if you need one, then dive into **exercise 018-grade-letter** when you're ready!

Keep up the amazing work!

## Read More

Want to dive deeper? Check out these resources:

- 📚 [Complex Conditionals - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling#conditional_statements)
- 📖 [Boolean Logic - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
- 🎯 [Decision Making - JavaScript.info](https://javascript.info/ifelse)

