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

Logical operators let you combine multiple conditions:

**AND operator (`&&`)** - Both conditions must be true:
```javascript
const age = 16;
const hasLicense = true;

if (age >= 16 && hasLicense) {
  console.log("Can drive!");  // Only runs if BOTH are true
}
```

**OR operator (`||`)** - At least one condition must be true:
```javascript
const age = 16;
const hasParentalConsent = true;

if (age >= 18 || hasParentalConsent) {
  console.log("Can proceed");  // Runs if EITHER is true
}
```

**Truth tables:**

AND (`&&`):
- true && true = true
- true && false = false
- false && true = false
- false && false = false

OR (`||`):
- true || true = true
- true || false = true
- false || true = true
- false || false = false
</details>

<details>
<summary>Hint 2: Using parentheses for complex conditions</summary>

When combining AND and OR, use parentheses to make the order clear:

```javascript
// Can watch R-rated: 17+ OR (13-16 AND has consent)
const canWatch = age >= 17 || (age >= 13 && age <= 16 && hasParentalConsent);
```

**Why parentheses matter:**
```javascript
// Without parentheses (might not work as expected):
const result = age >= 17 || age >= 13 && age <= 16 && hasParentalConsent;

// With parentheses (clear and correct):
const result = age >= 17 || (age >= 13 && age <= 16 && hasParentalConsent);
```

The parentheses group the conditions: "17+ OR (teen with consent)"
</details>

<details>
<summary>Hint 3: Accessing object properties</summary>

User information is stored in objects. Access properties with dot notation:

```javascript
const user = { name: "Alice", age: 16, hasParentalConsent: true };

console.log(user.name);  // "Alice"
console.log(user.age);  // 16
console.log(user.hasParentalConsent);  // true
```

Use these in your conditions:
```javascript
if (user.age >= 18) {
  console.log(`${user.name} can vote`);
}
```
</details>

<details>
<summary>Hint 4: The ternary operator for Yes/No</summary>

Display "Yes" or "No" based on a boolean value:

```javascript
const canVote = age >= 18;
console.log(`Can vote: ${canVote ? "Yes" : "No"}`);

// Or inline:
console.log(`Can vote: ${age >= 18 ? "Yes" : "No"}`);
```
</details>

<details>
<summary>Hint 5: Complete structure for one user</summary>

Here's the complete logic for checking one user's permissions:

```javascript
const user = { name: "Alice", age: 16, hasParentalConsent: true };

// Calculate permissions
const canWatchRRated = user.age >= 17 || (user.age >= 13 && user.age <= 16 && user.hasParentalConsent);
const canVote = user.age >= 18;
const canDrive = user.age >= 16;

// Display results
console.log(`${user.name} (age ${user.age}):`);
console.log(`  Can watch R-rated: ${canWatchRRated ? "Yes" : "No"}`);
console.log(`  Can vote: ${canVote ? "Yes" : "No"}`);
console.log(`  Can drive: ${canDrive ? "Yes" : "No"}`);
```

Apply this pattern to all four users!
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

## Solution

<details>
<summary>Click to see the solution (try the exercise first!)</summary>

```javascript
export function checkPermissions() {
  // User information
  const user1 = { name: "Alice", age: 16, hasParentalConsent: true };
  const user2 = { name: "Bob", age: 25, hasParentalConsent: false };
  const user3 = { name: "Carol", age: 14, hasParentalConsent: false };
  const user4 = { name: "David", age: 17, hasParentalConsent: true };

  // Check permissions for user1 (Alice)
  const canWatchRRated1 = user1.age >= 17 || (user1.age >= 13 && user1.age <= 16 && user1.hasParentalConsent);
  const canVote1 = user1.age >= 18;
  const canDrive1 = user1.age >= 16;

  console.log(`${user1.name} (age ${user1.age}):`);
  console.log(`  Can watch R-rated: ${canWatchRRated1 ? "Yes" : "No"}`);
  console.log(`  Can vote: ${canVote1 ? "Yes" : "No"}`);
  console.log(`  Can drive: ${canDrive1 ? "Yes" : "No"}`);

  // Check permissions for user2 (Bob)
  const canWatchRRated2 = user2.age >= 17 || (user2.age >= 13 && user2.age <= 16 && user2.hasParentalConsent);
  const canVote2 = user2.age >= 18;
  const canDrive2 = user2.age >= 16;

  console.log(`${user2.name} (age ${user2.age}):`);
  console.log(`  Can watch R-rated: ${canWatchRRated2 ? "Yes" : "No"}`);
  console.log(`  Can vote: ${canVote2 ? "Yes" : "No"}`);
  console.log(`  Can drive: ${canDrive2 ? "Yes" : "No"}`);

  // Check permissions for user3 (Carol)
  const canWatchRRated3 = user3.age >= 17 || (user3.age >= 13 && user3.age <= 16 && user3.hasParentalConsent);
  const canVote3 = user3.age >= 18;
  const canDrive3 = user3.age >= 16;

  console.log(`${user3.name} (age ${user3.age}):`);
  console.log(`  Can watch R-rated: ${canWatchRRated3 ? "Yes" : "No"}`);
  console.log(`  Can vote: ${canVote3 ? "Yes" : "No"}`);
  console.log(`  Can drive: ${canDrive3 ? "Yes" : "No"}`);

  // Check permissions for user4 (David)
  const canWatchRRated4 = user4.age >= 17 || (user4.age >= 13 && user4.age <= 16 && user4.hasParentalConsent);
  const canVote4 = user4.age >= 18;
  const canDrive4 = user4.age >= 16;

  console.log(`${user4.name} (age ${user4.age}):`);
  console.log(`  Can watch R-rated: ${canWatchRRated4 ? "Yes" : "No"}`);
  console.log(`  Can vote: ${canVote4 ? "Yes" : "No"}`);
  console.log(`  Can drive: ${canDrive4 ? "Yes" : "No"}`);
}

checkPermissions();
```

**Breaking down the R-rated logic:**

```javascript
const canWatchRRated = age >= 17 || (age >= 13 && age <= 16 && hasParentalConsent);
```

This reads as: "Can watch if **either**:
- Age is 17 or older, **OR**
- Age is between 13-16 **AND** has parental consent"

**For Alice (age 16, has consent):**
```javascript
16 >= 17  // false
(16 >= 13 && 16 <= 16 && true)  // true && true && true = true
false || true  // true → Can watch!
```

**For Bob (age 25, no consent):**
```javascript
25 >= 17  // true
// The OR short-circuits - doesn't even check the second part!
true || ...  // true → Can watch!
```

**For Carol (age 14, no consent):**
```javascript
14 >= 17  // false
(14 >= 13 && 14 <= 16 && false)  // true && true && false = false
false || false  // false → Cannot watch
```

**For David (age 17, has consent):**
```javascript
17 >= 17  // true
// Again, OR short-circuits
true || ...  // true → Can watch!
```

**Understanding short-circuit evaluation:**

With OR (`||`):
- If the first condition is true, JavaScript doesn't check the rest
- `true || anything` = `true`

With AND (`&&`):
- If the first condition is false, JavaScript doesn't check the rest
- `false && anything` = `false`

This improves performance and prevents errors!

**Truth tables for the R-rated rule:**

| Age | Has Consent | age >= 17 | age 13-16 + consent | Can Watch |
|-----|-------------|-----------|---------------------|-----------|
| 16  | Yes         | false     | true                | **Yes**   |
| 25  | No          | true      | false               | **Yes**   |
| 14  | No          | false     | false               | **No**    |
| 17  | Yes         | true      | false               | **Yes**   |

**Alternative: Using if-else instead of ternary:**
```javascript
console.log(`${user.name} (age ${user.age}):`);

if (canWatchRRated) {
  console.log("  Can watch R-rated: Yes");
} else {
  console.log("  Can watch R-rated: No");
}

if (canVote) {
  console.log("  Can vote: Yes");
} else {
  console.log("  Can vote: No");
}

if (canDrive) {
  console.log("  Can drive: Yes");
} else {
  console.log("  Can drive: No");
}
```

Both approaches work - the ternary operator is more concise!

**Real-world examples of complex permission logic:**
- Social media: Age 13+ OR (under 13 AND parent verified account)
- R-rated content: Age 17+ OR (age 13+ AND parental permission)
- Account deletion: (Account owner AND logged in) OR (Admin AND has deletion rights)
- File access: (File is public) OR (User is owner) OR (User in shared list AND has read permission)
- Checkout: (Items in cart) AND (Valid payment method) AND (Shipping address provided OR digital product)

**Common logical operator patterns:**
```javascript
// Both conditions must be true
if (isLoggedIn && hasPermission) { }

// At least one must be true
if (isAdmin || isOwner) { }

// Combining AND and OR
if (isPublic || (isPrivate && isOwner)) { }

// Multiple ANDs
if (age >= 18 && hasLicense && hasInsurance) { }

// Multiple ORs
if (isStudent || isSenior || isMilitary) { }
```

</details>

## Series Complete!

Congratulations! You've completed the **Age Checker App** series!

Here's what you've accomplished:
- ✅ **Exercise 013**: Used basic if statements to check single conditions
- ✅ **Exercise 014**: Added else to handle both true and false cases
- ✅ **Exercise 015**: Mastered else-if chains for multiple categories
- ✅ **Exercise 016**: Combined conditionals with calculations for discounts
- ✅ **Exercise 017**: Used logical operators (AND, OR) for complex permission rules

You now have a complete understanding of conditional logic - one of the most fundamental concepts in all of programming!

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
