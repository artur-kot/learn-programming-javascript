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

## Next Steps

Fantastic work! You've learned to control both WHERE your countdown starts and HOW it counts. In the final exercise of this series (027-countdown-break), you'll learn to STOP the countdown early using the `break` statement - letting you exit a loop before it naturally finishes!

## Read More

Want to dive deeper? Check out these resources:

- 📚 [continue Statement - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue)
