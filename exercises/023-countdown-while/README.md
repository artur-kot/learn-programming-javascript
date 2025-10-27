## Countdown - Basic While Loop

Welcome to the Countdown Timer series! In this series, you'll build a countdown display that counts backwards from a starting number. This is your first introduction to loops - one of the most powerful concepts in programming that lets you repeat actions without copying code.

Think about real-world countdowns: rocket launches ("10, 9, 8..."), microwave timers, New Year's Eve celebrations. They all count down and then do something when they reach zero. Let's build that!

## Your Challenge

You're going to create a function called `countdownWhile()` that displays a countdown from 10 down to 1, then shows "Blast off!" when it finishes.

Open `023-countdown-while.js` and implement the function to:
- Start counting at 10
- Display each number as it counts down
- Stop at 1
- Display "Blast off!" after the countdown completes

**Important:** You must use a **while loop** for this exercise. While loops are perfect when you want to repeat something as long as a condition is true.

## Expected Output

When you run your code, you should see:
```
=== Countdown Timer ===

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
<summary>Hint 1: While loop structure</summary>

A while loop has this basic structure:

```javascript
while (condition) {
  // code that repeats
}
```

The loop keeps running as long as the condition is true. Once the condition becomes false, the loop stops and the code continues after the loop.

For a countdown, you want to keep looping while your count is greater than or equal to 1:

```javascript
let count = 10;
while (count >= 1) {
  // do something with count
}
```

</details>

<details>
<summary>Hint 2: Displaying the number and decreasing it</summary>

Inside the loop, you need to do two things:

1. Display the current count using `console.log(count)`
2. Decrease the count by 1

```javascript
while (count >= 1) {
  console.log(count);
  count--;  // This decreases count by 1
}
```

The `count--` is shorthand for `count = count - 1`. It subtracts 1 from the variable.

</details>

<details>
<summary>Hint 3: After the loop ends</summary>

After the while loop finishes (when count becomes 0), you need to display the blast off message:

```javascript
while (count >= 1) {
  console.log(count);
  count--;
}
console.log("Blast off!");  // This runs AFTER the loop ends
```

This line is outside the loop, so it only runs once after all the counting is done.

</details>

<details>
<summary>Hint 4: Complete structure</summary>

Here's the complete structure to guide you:

```javascript
export function countdownWhile() {
  let count = 10;  // Start at 10

  while (count >= 1) {  // Keep going while count is 1 or more
    console.log(count);  // Display the current number
    count--;  // Decrease by 1
  }

  console.log("Blast off!");  // Final message
}
```

Try implementing it yourself before looking!

</details>

## Test Your Code

To run your code and see the countdown:
```bash
cd exercises/023-countdown-while
node 023-countdown-while.js
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise introduces you to:
- **While loops** - repeating code as long as a condition is true
- **Loop conditions** - controlling when a loop stops
- **Decrementation** - counting down by subtracting 1
- **Loop body** - the code that repeats each time through the loop
- **Sequential execution** - code after the loop runs only when the loop finishes

Understanding loops is crucial because they let you avoid repeating code. Instead of writing `console.log(10)`, `console.log(9)`, etc. ten times, you write the logic once and let the loop handle the repetition!

## Why While Loops?

While loops are great when you know the CONDITION for stopping but not necessarily how many times you'll loop. In this case, you want to "keep counting down while the number is still 1 or greater."

In the next exercise, you'll learn about for loops, which are better when you know exactly how many times you want to loop.

## Reflection Questions

After completing the exercise, think about:
1. What happens if you forget to decrease the count inside the loop? (Try it and see!)
2. Why does the loop stop when count becomes 0?
3. Could you make it count from 5 instead of 10? What would you change?
4. What would happen if you put the `count--` line BEFORE `console.log(count)`?

## Next Steps

Great job completing your first while loop! In the next exercise (024-countdown-for), you'll learn about **for loops** - another way to create loops that's especially useful when you know exactly how many times you want to repeat something.

You'll take the working countdown you just created and rewrite it using a for loop to see the differences between the two approaches. Both are useful in different situations!

## Read More

Want to dive deeper? Check out these resources:

- 📚 [while Loop - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)
- 📖 [Loops and Iteration - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)
- 🎯 [Loops - JavaScript.info](https://javascript.info/while-for)
