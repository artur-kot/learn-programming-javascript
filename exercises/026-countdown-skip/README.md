## Countdown - Skip Numbers

This exercise builds on exercise 025! You've created flexible countdown functions that can start from any number. Now you'll learn to count by different intervals - skipping numbers as you count down.

## What You're Building On

From exercise 025, you already have:
- `countdownWhile(start)` - Countdown using while loop (counts by 1s)
- `countdownFor(start)` - Countdown using for loop (counts by 1s)

Both functions count by 1s: 10, 9, 8, 7, 6...

## Your Challenge

Open `026-countdown-skip.js`. You'll see both your complete countdown functions from the previous exercise.

Your task is to create a NEW function called `countdownByInterval(start, interval)` that:
- Accepts TWO parameters: the starting number AND the interval to count by
- Counts down from `start` to 1 (or as close as possible)
- Decreases by `interval` each time instead of by 1
- Displays "Blast off!" when finished

**Examples:**
- `countdownByInterval(10, 2)` → 10, 8, 6, 4, 2
- `countdownByInterval(20, 5)` → 20, 15, 10, 5
- `countdownByInterval(100, 10)` → 100, 90, 80, 70, 60, 50, 40, 30, 20, 10

## Expected Output

When you run your code, you should see:
```
=== Countdown from 10 by 1s (While) ===

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

=== Countdown from 10 by 2s ===

10
8
6
4
2
Blast off!

=== Countdown from 20 by 5s ===

20
15
10
5
Blast off!

=== Countdown from 100 by 10s ===

100
90
80
70
60
50
40
30
20
10
Blast off!
```

## Hints

<details>
<summary>Hint 1: The -= operator</summary>

You've been using `count--` to decrease by 1. The `--` operator is shorthand for subtracting 1.

To subtract any amount, use the `-=` operator:

```javascript
count -= 2;   // Subtract 2 (same as count = count - 2)
count -= 5;   // Subtract 5 (same as count = count - 5)
count -= 10;  // Subtract 10 (same as count = count - 10)
```

With a variable:
```javascript
count -= interval;  // Subtract whatever interval is
```

All these operators work the same way:
- `count++` means `count = count + 1`
- `count--` means `count = count - 1`
- `count += 5` means `count = count + 5`
- `count -= 5` means `count = count - 5`

</details>

<details>
<summary>Hint 2: Two parameters</summary>

Your function needs to accept two pieces of information:

```javascript
export function countdownByInterval(start, interval) {
  // 'start' is where to begin counting
  // 'interval' is how much to subtract each time
}
```

When you call it:
```javascript
countdownByInterval(10, 2);
// start = 10
// interval = 2
```

</details>

<details>
<summary>Hint 3: Using the interval in the loop</summary>

Start with your regular countdown structure:

```javascript
let count = start;
while (count >= 1) {
  console.log(count);
  count--;  // This subtracts 1
}
```

Change the last line to use the interval:

```javascript
let count = start;
while (count >= 1) {
  console.log(count);
  count -= interval;  // This subtracts the interval amount
}
```

Now it will count by whatever interval is passed in!

</details>

<details>
<summary>Hint 4: Complete function structure</summary>

Here's the complete structure:

```javascript
export function countdownByInterval(start, interval) {
  let count = start;

  while (count >= 1) {
    console.log(count);
    count -= interval;  // Decrease by interval instead of 1
  }

  console.log("Blast off!");
}
```

That's it! The only changes from the regular countdown are:
1. Add a second parameter `interval`
2. Use `count -= interval` instead of `count--`

</details>

## Test Your Code

To run your code and see different intervals:
```bash
cd exercises/026-countdown-skip
node 026-countdown-skip.js
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise teaches you:
- **Multiple parameters** - functions can accept more than one input
- **The -= operator** - subtracting any amount from a variable
- **Variable step size** - loops don't always change by 1
- **Compound assignment** - operators that modify and assign in one step
- **Flexible algorithms** - making code work for different scenarios

Understanding how to adjust loop increments is essential for many programming tasks!

## Reflection Questions

After completing the exercise, think about:
1. What happens if you pass `countdownByInterval(10, 3)`? Will it show 1?
2. Could you create a version that counts UP by intervals instead of down?
3. What would happen if you pass 0 as the interval?
4. How could you modify this to ensure it always ends exactly at 1?

## Solution

<details>
<summary>Click to see the solution (try the exercise first!)</summary>

```javascript
// This exercise builds on exercise 025!
// The solution code from 025 is provided below as your starting point.

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
  let count = start;

  while (count >= 1) {
    console.log(count);
    count -= interval;  // Decrease by interval instead of 1
  }

  console.log("Blast off!");
}

// Test with different intervals
console.log("=== Countdown from 10 by 1s (While) ===\n");
countdownWhile(10);

console.log("\n=== Countdown from 10 by 2s ===\n");
countdownByInterval(10, 2);

console.log("\n=== Countdown from 20 by 5s ===\n");
countdownByInterval(20, 5);

console.log("\n=== Countdown from 100 by 10s ===\n");
countdownByInterval(100, 10);
```

**How it works:**

**Counting by 2s from 10:**
```javascript
countdownByInterval(10, 2);

Initial: count = 10, interval = 2

Iteration 1:
  - Check: Is 10 >= 1? YES
  - Log: 10
  - Update: count -= 2 → count becomes 8

Iteration 2:
  - Check: Is 8 >= 1? YES
  - Log: 8
  - Update: count -= 2 → count becomes 6

Iteration 3:
  - Check: Is 6 >= 1? YES
  - Log: 6
  - Update: count -= 2 → count becomes 4

Iteration 4:
  - Check: Is 4 >= 1? YES
  - Log: 4
  - Update: count -= 2 → count becomes 2

Iteration 5:
  - Check: Is 2 >= 1? YES
  - Log: 2
  - Update: count -= 2 → count becomes 0

Iteration 6:
  - Check: Is 0 >= 1? NO → Exit loop

After loop:
  - Log: "Blast off!"

Output: 10, 8, 6, 4, 2, Blast off!
```

**Counting by 5s from 20:**
```javascript
countdownByInterval(20, 5);

Initial: count = 20, interval = 5

20 → 15 → 10 → 5 → 0 (stop) → Blast off!
Output: 20, 15, 10, 5, Blast off!
```

**Understanding the -= operator:**

```javascript
// All of these do the same thing:
count = count - interval;
count -= interval;

// Examples:
let x = 10;
x -= 3;  // x is now 7 (10 - 3)
x -= 3;  // x is now 4 (7 - 3)
x -= 3;  // x is now 1 (4 - 3)
```

**Other compound assignment operators:**

```javascript
count += 5;   // Add 5 (count = count + 5)
count -= 5;   // Subtract 5 (count = count - 5)
count *= 2;   // Multiply by 2 (count = count * 2)
count /= 2;   // Divide by 2 (count = count / 2)
count %= 3;   // Modulo 3 (count = count % 3)
```

**What happens with odd intervals?**

```javascript
countdownByInterval(10, 3);

10 → 7 → 4 → 1 → -2 (stop, because -2 < 1)
Output: 10, 7, 4, 1, Blast off!

// It shows 1 because 1 >= 1 is true
// Then 1 - 3 = -2, and -2 >= 1 is false, so loop stops
```

```javascript
countdownByInterval(11, 3);

11 → 8 → 5 → 2 → -1 (stop)
Output: 11, 8, 5, 2, Blast off!

// Doesn't show 1 because it jumps from 2 to -1
```

**Using intervals with for loops:**

You could also use a for loop with intervals:

```javascript
export function countdownByInterval(start, interval) {
  for (let i = start; i >= 1; i -= interval) {
    console.log(i);
  }
  console.log("Blast off!");
}
```

The `i -= interval` in the update section decreases by the interval!

**Counting UP by intervals:**

To count up instead of down, change the logic:

```javascript
function countUpByInterval(start, end, interval) {
  for (let i = start; i <= end; i += interval) {
    console.log(i);
  }
}

countUpByInterval(0, 20, 5);
// Output: 0, 5, 10, 15, 20
```

**Real-world uses:**

```javascript
// Temperature dropping every 10 degrees
countdownByInterval(100, 10);  // 100°, 90°, 80°, 70°...

// Parking meter counting down by 15 minute intervals
countdownByInterval(120, 15);  // 120 min, 105 min, 90 min...

// Percentage loading bar going backwards
countdownByInterval(100, 10);  // 100%, 90%, 80%...

// Sale countdown in 5 dollar increments
countdownByInterval(50, 5);    // $50, $45, $40, $35...
```

**Edge case: interval of 1**

```javascript
countdownByInterval(5, 1);
// Works exactly like regular countdown!
// 5, 4, 3, 2, 1, Blast off!

// Because count -= 1 is the same as count--
```

**Edge case: interval larger than start**

```javascript
countdownByInterval(5, 10);
// count = 5
// Check: 5 >= 1? YES
// Log: 5
// Update: 5 - 10 = -5
// Check: -5 >= 1? NO → Stop
// Output: 5, Blast off!

// Only shows the starting number because the first subtraction goes below 1
```

**Making it always end at 1 (advanced):**

If you wanted to ensure it always shows 1 as the last number:

```javascript
function countdownByIntervalToOne(start, interval) {
  let count = start;

  while (count > 1) {  // Stop BEFORE going below 1
    console.log(count);
    count -= interval;
  }

  console.log(1);  // Always show 1 at the end
  console.log("Blast off!");
}

countdownByIntervalToOne(10, 3);
// Output: 10, 7, 4, 1, Blast off!
// (Always ends at 1 even though 4 - 3 = 1)
```

</details>

## Next Steps

Fantastic work! You've learned to control both WHERE your countdown starts and HOW it counts. In the final exercise of this series (027-countdown-break), you'll learn to STOP the countdown early using the `break` statement - letting you exit a loop before it naturally finishes!

