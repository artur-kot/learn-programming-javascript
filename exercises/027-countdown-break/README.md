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

## Solution

<details>
<summary>Click to see the solution (try the exercise first!)</summary>

```javascript
// This exercise builds on exercise 026!
// The solution code from 026 is provided below as your starting point.

export function countdownWhile(start) {
  // This function is complete from exercise 025
  let count = start;

  while (count >= 1) {
    console.log(count);
    count--;
  }

  console.log("Blast off!");
}

export function countdownFor(start) {
  // This function is complete from exercise 025
  for (let i = start; i >= 1; i--) {
    console.log(i);
  }
  console.log("Blast off!");
}

export function countdownByInterval(start, interval) {
  // This function is complete from exercise 026
  let count = start;

  while (count >= 1) {
    console.log(count);
    count -= interval;
  }

  console.log("Blast off!");
}

export function countdownWithStop(start, stopAt) {
  let count = start;

  while (count >= 1) {
    console.log(count);  // Display current number

    if (count === stopAt) {  // Check if we've reached stop point
      break;  // Exit loop immediately
    }

    count--;  // Decrease (only runs if we didn't break)
  }

  console.log(`Stopped at ${stopAt}!`);  // Show where we stopped
}

// Test stopping at different points
console.log("=== Normal countdown from 10 ===\n");
countdownWhile(10);

console.log("\n=== Countdown from 10, stop at 5 ===\n");
countdownWithStop(10, 5);

console.log("\n=== Countdown from 20, stop at 15 ===\n");
countdownWithStop(20, 15);

console.log("\n=== Countdown from 10, stop at 1 ===\n");
countdownWithStop(10, 1);
```

**How break works:**

**Normal loop without break:**
```javascript
let count = 5;
while (count >= 1) {
  console.log(count);
  count--;
}
// Continues until condition becomes false (count < 1)
```

**Loop with break:**
```javascript
let count = 5;
while (count >= 1) {
  console.log(count);

  if (count === 3) {
    break;  // Exit immediately when count is 3
  }

  count--;
}
// Exits early when count equals 3, even though count >= 1 is still true
```

**Step-by-step execution:**

```javascript
countdownWithStop(10, 7);

Initial: count = 10, stopAt = 7

Iteration 1:
  - Check: Is 10 >= 1? YES → Enter loop
  - Log: 10
  - Check: Is 10 === 7? NO → Don't break
  - Decrease: count becomes 9

Iteration 2:
  - Check: Is 9 >= 1? YES → Continue loop
  - Log: 9
  - Check: Is 9 === 7? NO → Don't break
  - Decrease: count becomes 8

Iteration 3:
  - Check: Is 8 >= 1? YES → Continue loop
  - Log: 8
  - Check: Is 8 === 7? NO → Don't break
  - Decrease: count becomes 7

Iteration 4:
  - Check: Is 7 >= 1? YES → Continue loop
  - Log: 7
  - Check: Is 7 === 7? YES → BREAK!
  - Exit loop immediately (count-- never runs)

After loop:
  - Log: "Stopped at 7!"

Output: 10, 9, 8, 7, Stopped at 7!
```

**Why log before checking:**

```javascript
// CORRECT - shows stopAt number
console.log(count);  // Displays 7
if (count === stopAt) {
  break;  // Then exits
}

// WRONG - misses stopAt number
if (count === stopAt) {
  break;  // Exits before displaying
}
console.log(count);  // Never reached when stopAt matches
```

**Comparing natural end vs break:**

```javascript
// Natural end - loop condition becomes false
while (count >= 1) {  // Stops when count becomes 0
  console.log(count);
  count--;
}

// Break - forced exit while condition is still true
while (count >= 1) {  // Could continue, but we exit early
  console.log(count);
  if (count === 5) {
    break;  // Force exit even though count >= 1 is true
  }
  count--;
}
```

**Using break with for loops:**

Break works with for loops too:

```javascript
for (let i = 10; i >= 1; i--) {
  console.log(i);

  if (i === 5) {
    break;  // Exit for loop early
  }
}
// Output: 10, 9, 8, 7, 6, 5
```

**Edge case: stopAt equals start**

```javascript
countdownWithStop(10, 10);

Iteration 1:
  - Log: 10
  - Check: Is 10 === 10? YES → Break immediately

Output: 10, Stopped at 10!
// Only shows the starting number
```

**Edge case: stopAt never reached**

```javascript
countdownWithStop(10, 20);
// stopAt (20) is higher than start (10)

// Loop continues normally to 1 because count never equals 20
// Output: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, Stopped at 20!
// (The message says 20 but we actually went to 1)
```

You might want to add validation:

```javascript
export function countdownWithStop(start, stopAt) {
  if (stopAt > start) {
    console.log("Error: stopAt must be less than or equal to start!");
    return;
  }

  // ... rest of function
}
```

**Real-world uses of break:**

**Searching for a value:**
```javascript
function findNumber(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      console.log("Found at index", i);
      break;  // Stop searching once found
    }
  }
}
```

**Game countdown with pause:**
```javascript
function gameCountdown(start, pauseAt) {
  for (let i = start; i >= 1; i--) {
    console.log(i);

    if (i === pauseAt) {
      console.log("Game paused!");
      break;
    }
  }
}
```

**Input validation loop:**
```javascript
while (true) {  // Infinite loop
  let input = getUserInput();

  if (input === "quit") {
    break;  // Exit when user wants to quit
  }

  processInput(input);
}
```

**Break vs Continue:**

Break exits the loop entirely:
```javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    break;  // Exit loop completely
  }
  console.log(i);
}
// Output: 1, 2
```

Continue skips to next iteration:
```javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue;  // Skip this iteration, continue with next
  }
  console.log(i);
}
// Output: 1, 2, 4, 5 (skips 3)
```

**Common mistakes:**

**Breaking outside a loop:**
```javascript
// ERROR: break must be inside a loop
if (x === 5) {
  break;  // This will cause an error!
}
```

**Forgetting the condition:**
```javascript
while (count >= 1) {
  console.log(count);
  break;  // Always breaks on first iteration!
  count--;
}
// Only shows the starting number
```

**Breaking from nested loops:**
```javascript
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(i, j);
    if (j === 2) {
      break;  // Only exits inner loop, not outer loop
    }
  }
}
```

Break only exits the innermost loop it's in!

</details>

## Series Complete!

Congratulations! You've completed the **Countdown Timer** series!

Here's what you've accomplished:
- ✅ **Exercise 023**: Created a countdown using while loops
- ✅ **Exercise 024**: Rewrote the countdown using for loops
- ✅ **Exercise 025**: Made countdowns flexible with custom start parameters
- ✅ **Exercise 026**: Added interval counting to skip numbers
- ✅ **Exercise 027**: Learned to stop loops early with break

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

