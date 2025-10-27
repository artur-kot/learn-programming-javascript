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

## Solution

<details>
<summary>Click to see the solution (try the exercise first!)</summary>

```javascript
// This exercise builds on exercise 023!
// The solution code from 023 is provided below as your starting point.

export function countdownWhile() {
  // This function is complete from exercise 023
  let count = 10;

  while (count >= 1) {
    console.log(count);
    count--;
  }

  console.log("Blast off!");
}

export function countdownFor() {
  // Using for loop - all counter logic in one line
  for (let i = 10; i >= 1; i--) {
    console.log(i);
  }
  console.log("Blast off!");
}

// Compare both versions
console.log("=== While Loop Version ===\n");
countdownWhile();

console.log("\n=== For Loop Version ===\n");
countdownFor();
```

**Breaking down the for loop:**

```javascript
for (let i = 10; i >= 1; i--) {
  console.log(i);
}
```

**Part 1: Initialization (let i = 10)**
- Runs once before the loop starts
- Creates the counter variable `i` and sets it to 10
- The variable `i` only exists inside the for loop (it's "block scoped")

**Part 2: Condition (i >= 1)**
- Checked before each iteration
- If true, run the loop body
- If false, exit the loop
- Same condition as the while loop!

**Part 3: Update (i--)**
- Runs after each iteration of the loop body
- Decreases `i` by 1
- Equivalent to `i = i - 1`

**How it executes:**

```
Before loop:
  - Create i = 10

Iteration 1:
  - Check: Is 10 >= 1? YES → Enter loop
  - Execute: console.log(10)
  - Update: i becomes 9

Iteration 2:
  - Check: Is 9 >= 1? YES → Continue
  - Execute: console.log(9)
  - Update: i becomes 8

... (continues) ...

Iteration 10:
  - Check: Is 1 >= 1? YES → Continue
  - Execute: console.log(1)
  - Update: i becomes 0

Iteration 11:
  - Check: Is 0 >= 1? NO → Exit loop

After loop:
  - Execute: console.log("Blast off!")
```

**Side-by-side comparison:**

```javascript
// WHILE LOOP - logic spread out
let count = 10;           // initialization (separate line)
while (count >= 1) {      // condition (in while statement)
  console.log(count);
  count--;                // update (inside loop body)
}

// FOR LOOP - logic in one place
for (let i = 10; i >= 1; i--) {  // init; condition; update (all together)
  console.log(i);
}
```

Both do the exact same thing! The for loop is just more compact because it puts all the counter management in one line.

**Common for loop patterns:**

**Counting up:**
```javascript
for (let i = 1; i <= 10; i++) {
  console.log(i);  // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
}
```

**Counting down:**
```javascript
for (let i = 10; i >= 1; i--) {
  console.log(i);  // 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
}
```

**Counting by 2s:**
```javascript
for (let i = 0; i <= 10; i += 2) {
  console.log(i);  // 0, 2, 4, 6, 8, 10
}
```

**Variable naming convention:**

You'll often see `i` used as the counter variable in for loops:
- `i` stands for "index" or "iterator"
- It's just a convention - you could use any name
- For nested loops, use `i`, `j`, `k`, etc.

```javascript
for (let i = 0; i < 5; i++) {        // outer loop
  for (let j = 0; j < 3; j++) {      // inner loop
    console.log(i, j);
  }
}
```

But for clarity, you can use descriptive names:

```javascript
for (let count = 10; count >= 1; count--) {
  console.log(count);
}
```

**What if you used i++ instead of i--?**

```javascript
for (let i = 10; i >= 1; i++) {
  console.log(i);
}
```

This creates an infinite loop! Here's why:
- Start: i = 10
- Check: 10 >= 1? YES
- Log: 10
- Update: i becomes 11
- Check: 11 >= 1? YES (still true!)
- Log: 11
- Update: i becomes 12
- ... continues forever!

The counter keeps increasing but the condition keeps being true, so the loop never ends!

**Counting from 100 to 1:**

```javascript
for (let i = 100; i >= 1; i--) {
  console.log(i);
}
```

Just change the starting value! The structure stays the same.

</details>

## Next Steps

Excellent work! You now understand both while and for loops. In the next exercise (025-countdown-custom), you'll make your countdown more flexible by accepting a custom starting number as a parameter. Instead of always counting from 10, you'll be able to count from any number!

