## Countdown - For Loop Version

This exercise builds on exercise 023! You've already created a countdown using a while loop. Now you'll learn about for loops by creating the exact same countdown but with different syntax.

## What You're Building On

From exercise 023, you already have:
- `countdownWhile()` - A working countdown from 10 to 1 using a while loop

## Your Challenge

Open `024-countdown-for.js`. You'll see your complete `countdownWhile()` function from the previous exercise.

Your task is to create a NEW function called `countdownFor()` that:
- Does exactly the same thing as `countdownWhile()`
- Counts from 10 down to 1
- Displays "Blast off!" at the end
- But uses a **for loop** instead of a while loop

Both functions should produce identical output - just using different loop styles!

## Expected Output

When you run your code, you should see both versions producing the same countdown:
```
=== While Loop Version ===

10
9
8
7
6
5
4
3
2
1
Blast off!

=== For Loop Version ===

10
9
8
7
6
5
4
3
2
1
Blast off!
```

## Hints

<details>
<summary>Hint 1: For loop structure</summary>

A for loop has three parts in parentheses, separated by semicolons:

```javascript
for (initialization; condition; update) {
  // code to repeat
}
```

- **initialization**: Runs once before the loop starts (let i = 10)
- **condition**: Checked before each iteration (i >= 1)
- **update**: Runs after each iteration (i--)

All the counter logic is in one line at the top!

</details>

<details>
<summary>Hint 2: Comparing while and for loops</summary>

Here's how while and for loops relate:

**While loop (what you already have):**
```javascript
let count = 10;           // initialization
while (count >= 1) {      // condition
  console.log(count);
  count--;                // update
}
```

**For loop (same thing, different format):**
```javascript
for (let i = 10; i >= 1; i--) {  // initialization; condition; update
  console.log(i);
}
```

The for loop just moves the initialization and update into the for statement!

</details>

<details>
<summary>Hint 3: Writing the for loop countdown</summary>

Your for loop should:
- Start with `let i = 10` (initialization)
- Continue while `i >= 1` (condition)
- Decrease with `i--` (update)

```javascript
for (let i = 10; i >= 1; i--) {
  console.log(i);
}
console.log("Blast off!");
```

Notice how compact it is compared to the while loop!

</details>

<details>
<summary>Hint 4: Complete function</summary>

Here's the complete structure:

```javascript
export function countdownFor() {
  for (let i = 10; i >= 1; i--) {
    console.log(i);
  }
  console.log("Blast off!");
}
```

The for loop is especially nice for counting because all the counter logic is in one place at the top!

</details>

## Test Your Code

To run your code and see both versions:
```bash
cd exercises/024-countdown-for
node 024-countdown-for.js
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise teaches you:
- **For loops** - a more compact way to write loops when you're counting
- **Loop variations** - different ways to accomplish the same goal
- **Code comparison** - seeing when one approach might be clearer than another
- **Loop structure** - understanding initialization, condition, and update
- **Variable scope** - the `i` variable only exists inside the for loop

## While vs For: When to Use Each?

**Use a while loop when:**
- You don't know how many times you'll loop
- The loop condition is complex
- You're looping until something happens (like user input)

```javascript
while (userWantsMore) {
  // Keep going until user is done
}
```

**Use a for loop when:**
- You know how many times to loop
- You're counting up or down
- You want all the counter logic in one place

```javascript
for (let i = 0; i < 10; i++) {
  // Loop exactly 10 times
}
```

For countdowns, either works fine! For loops are often preferred because they're more compact.

## Reflection Questions

After completing the exercise, think about:
1. Which loop style do you find easier to read - while or for?
2. What happens if you change `i--` to `i++` in the for loop? (Try it!)
3. How would you count backwards from 100 to 1 using a for loop?
4. Can you spot the three parts (initialization, condition, update) in the for loop?

## Next Steps

Excellent work! You now understand both while and for loops. In the next exercise (025-countdown-custom), you'll make your countdown more flexible by accepting a custom starting number as a parameter. Instead of always counting from 10, you'll be able to count from any number!

## Read More

Want to dive deeper? Check out these resources:

- 📚 [for Loop - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)
