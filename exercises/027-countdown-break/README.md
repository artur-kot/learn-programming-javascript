## Countdown - Early Stop

This is the final exercise in the Countdown Timer series! You've learned to create flexible countdowns with custom starting points and intervals. Now you'll learn to STOP a loop early using the `break` statement - a powerful way to exit loops before they naturally finish.

## What You're Building On

From exercises 023-026, you already have:
- `countdownWhile(start)` - Countdown using while loop
- `countdownFor(start)` - Countdown using for loop
- `countdownByInterval(start, interval)` - Countdown by custom intervals

All these functions continue looping until the condition becomes false. But what if you need to stop early?

## Your Challenge

Open `027-countdown-break.js`. You'll see all your complete countdown functions from previous exercises.

Your task is to create a NEW function called `countdownWithStop(start, stopAt)` that:
- Accepts TWO parameters: the starting number AND the number to stop at
- Counts down from `start` by 1s
- When it reaches `stopAt`, immediately exits the loop using `break`
- Displays "Stopped at [stopAt]!" instead of "Blast off!"

**The break statement** lets you exit a loop immediately, even if the loop condition is still true!

## Expected Output

When you run your code, you should see:
```
=== Normal countdown from 10 ===

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

=== Countdown from 10, stop at 5 ===

10
9
8
7
6
5
Stopped at 5!

=== Countdown from 20, stop at 15 ===

20
19
18
17
16
15
Stopped at 15!

=== Countdown from 10, stop at 1 ===

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
Stopped at 1!
```

Notice how the countdown stops early when it reaches the stopAt number!

## Hints

<details>
<summary>Hint 1: The break statement</summary>

The `break` statement immediately exits the current loop:

```javascript
while (condition) {
  console.log("This runs");

  if (someReason) {
    break;  // Exit the loop right now!
  }

  console.log("This might not run if we broke above");
}
console.log("This runs after the loop exits");
```

As soon as JavaScript encounters `break`, it jumps out of the loop entirely and continues with the code after the loop.

</details>

<details>
<summary>Hint 2: Checking when to break</summary>

Inside your loop, after logging the number, check if you've reached the stop point:

```javascript
while (count >= 1) {
  console.log(count);

  if (count === stopAt) {
    break;  // Exit loop when we reach stopAt
  }

  count--;
}
```

This ensures you display the stop number before exiting!

</details>

<details>
<summary>Hint 3: Order matters!</summary>

The order of operations in the loop is important:

```javascript
// CORRECT - shows the stop number
console.log(count);  // Display first
if (count === stopAt) {
  break;  // Then check and exit
}
count--;

// WRONG - doesn't show the stop number
if (count === stopAt) {
  break;  // Exit before displaying
}
console.log(count);  // Never reaches here if we break
```

Log the number BEFORE checking whether to break!

</details>

<details>
<summary>Hint 4: Complete function structure</summary>

Here's the complete structure:

```javascript
export function countdownWithStop(start, stopAt) {
  let count = start;

  while (count >= 1) {
    console.log(count);  // Display the number

    if (count === stopAt) {  // Check if we should stop
      break;  // Exit the loop immediately
    }

    count--;  // Decrease (only runs if we didn't break)
  }

  console.log(`Stopped at ${stopAt}!`);  // Show where we stopped
}
```

The key is: log, check, break, decrease!

</details>

## Test Your Code

To run your code and see different stop points:
```bash
cd exercises/027-countdown-break
node 027-countdown-break.js
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise teaches you:
- **Break statement** - exiting loops early before the condition becomes false
- **Loop control flow** - controlling exactly when loops stop
- **Conditional exits** - stopping based on data, not just the loop condition
- **Early termination patterns** - common in searching and validation
- **Code execution order** - understanding what happens before and after break

The `break` statement is essential for scenarios where you need to stop as soon as you find what you're looking for!

## Reflection Questions

After completing the exercise, think about:
1. What's the difference between the loop ending naturally vs. ending with break?
2. What happens if you call `countdownWithStop(10, 20)`? (stopAt is higher than start)
3. Why do we log the number BEFORE checking whether to break?
4. Can you think of real-world situations where you'd want to stop a countdown early?

## What You've Mastered

**Loop Fundamentals:**
- While loops for condition-based repetition
- For loops for count-based repetition
- Loop initialization, condition, and update
- Loop body execution and timing

**Loop Control:**
- Counting down with decrement operators
- Using parameters for flexibility
- Variable step sizes with compound assignment
- Early exit with break statement

**Real-World Skills:**
- Creating countdown timers
- Implementing flexible, reusable functions
- Controlling loop flow based on conditions
- Writing functions that adapt to different inputs

## Next Steps

Ready for more looping practice? The next series in the roadmap will teach you about nested loops and more complex iteration patterns. You'll build multiplication tables and work with multi-dimensional data!

Take a moment to celebrate your progress - you now understand one of the most fundamental concepts in programming. Loops are everywhere in real code, and you've built a solid foundation!

Keep up the excellent work!

## Read More

Want to dive deeper? Check out these resources:

- 📚 [break Statement - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break)
