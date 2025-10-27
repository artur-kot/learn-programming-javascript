## Age Checker - If-Else for Categories

Building on what you learned in exercise 013, you now know how to run code when a condition is true. But what about when it's false? That's where the **else** statement comes in!

In the previous exercise, your code only displayed a message for ages 18+. Now you'll improve your age checker to handle **both cases**: displaying one message when someone is an adult and a **different message** when they're a minor.

## Your Challenge

Open `014-age-if-else.js`. You'll see three different ages: 25, 16, and 10.

Your task is to:
1. Check each age to see if it's 18 or older
2. Display "Adult" if they're 18 or older
3. Display "Minor" if they're under 18
4. Make sure **every** age gets classified (no one is left out)

## Expected Output

When you run your code, you should see:
```
Age 25: Adult
Age 16: Minor
Age 10: Minor
```

Notice that this time, **all three ages** display a message! The if-else structure ensures that one of the two messages always shows.

## Hints

<details>
<summary>Hint 1: What is an if-else statement?</summary>

An **if-else statement** gives your code two paths: one when the condition is true, another when it's false.

Think about a fork in the road: you can only go left OR right, never both. Similarly, if-else ensures exactly one path executes.

**Key point**: One of these will ALWAYS run. If the condition is true, the first block runs. If false, the second block runs. There's no third option - complete coverage is guaranteed.
</details>

<details>
<summary>Hint 2: The two categories</summary>

For age classification, you have two categories:
- **Adult**: Age meets or exceeds the threshold
- **Minor**: Age is below the threshold

The else block handles the opposite case automatically. You don't need to explicitly check the opposite condition - the structure handles it for you!
</details>

<details>
<summary>Hint 3: Consistent message format</summary>

Both paths should display messages in the same format. The only difference is the category label that changes based on which path executes.

Template literals help you embed the age value dynamically in both messages.
</details>

<details>
<summary>Hint 4: Apply the pattern</summary>

For each age variable:
1. Check if it meets the adult threshold
2. Display "Adult" message if true
3. Display "Minor" message if false
4. Ensure one message always appears

Apply this pattern to all three ages to see how each is classified.
</details>

## Test Your Code

To run your code and see the output:
```bash
cd exercises/014-age-if-else
node 014-age-if-else.js
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise teaches you:
- **If-else statements** - handling both true and false cases
- **Binary decisions** - choosing between exactly two options
- **Complete coverage** - ensuring all possibilities are handled
- **Control flow** - directing your code down different paths

If-else is one of the most common patterns in programming. Whenever you need to choose between two options, this is the structure you'll use!

## Reflection Questions

After completing the exercise, think about:
1. What's the difference between using just `if` (previous exercise) versus `if-else`?
2. When would you use a simple `if`, and when would you use `if-else`?
3. Can you think of other situations in real life or apps where something is classified into exactly two categories?

## Next Steps

Excellent work! You can now handle two categories with if-else. But what if you need **more than two categories**? What about child, teen, and adult? Or child, teen, adult, and senior?

In **exercise 015-age-multiple-groups**, you'll learn about **else-if** to handle multiple age categories. You're building toward a complete age classification system!

