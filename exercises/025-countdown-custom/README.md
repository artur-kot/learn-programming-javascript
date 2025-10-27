## Countdown - Custom Start

This exercise builds on exercise 024! You've created countdown functions that count from 10 to 1. Now you'll make them more flexible by accepting any starting number as input.

## What You're Building On

From exercise 024, you already have:
- `countdownWhile()` - Countdown using while loop (currently hardcoded to start at 10)
- `countdownFor()` - Countdown using for loop (currently hardcoded to start at 10)

## Your Challenge

Open `025-countdown-custom.js`. You'll see both your complete countdown functions from the previous exercise.

Your task is to **MODIFY** both existing functions to accept a parameter called `start`:
- Change `countdownWhile()` to accept a `start` parameter and use it instead of the hardcoded `10`
- Change `countdownFor()` to accept a `start` parameter and use it instead of the hardcoded `10`
- Both should count from the given starting number down to 1

This makes your functions reusable! Instead of only counting from 10, they can now count from any number.

## Expected Output

When you run your code, you should see countdowns from different starting numbers:
```
=== Countdown from 5 (While) ===

5
4
3
2
1
Blast off!

=== Countdown from 3 (For) ===

3
2
1
Blast off!

=== Countdown from 20 (While) ===

20
19
18
...
3
2
1
Blast off!
```

## Hints

<details>
<summary>Hint 1: What is a parameter?</summary>

A parameter lets you pass information into a function when you call it:

```javascript
function greet(name) {  // 'name' is a parameter
  console.log("Hello, " + name);
}

greet("Alice");  // Pass "Alice" as an argument
// Output: Hello, Alice

greet("Bob");  // Pass "Bob" as an argument
// Output: Hello, Bob
```

The parameter makes the function flexible - it can work with different values!

For your countdown, you want to pass in the starting number:

```javascript
countdownWhile(5);   // Count from 5
countdownWhile(10);  // Count from 10
countdownWhile(100); // Count from 100
```

</details>

<details>
<summary>Hint 2: Modifying countdownWhile</summary>

Currently, your while loop function looks like this:

```javascript
export function countdownWhile() {  // No parameter yet
  let count = 10;  // Hardcoded to 10
  while (count >= 1) {
    console.log(count);
    count--;
  }
  console.log("Blast off!");
}
```

To make it accept a parameter:

```javascript
export function countdownWhile(start) {  // Add 'start' parameter
  let count = start;  // Use the parameter instead of 10
  while (count >= 1) {
    console.log(count);
    count--;
  }
  console.log("Blast off!");
}
```

Now when you call `countdownWhile(5)`, the `start` parameter will be 5!

</details>

<details>
<summary>Hint 3: Modifying countdownFor</summary>

Currently, your for loop function looks like this:

```javascript
export function countdownFor() {  // No parameter yet
  for (let i = 10; i >= 1; i--) {  // Hardcoded to 10
    console.log(i);
  }
  console.log("Blast off!");
}
```

To make it accept a parameter:

```javascript
export function countdownFor(start) {  // Add 'start' parameter
  for (let i = start; i >= 1; i--) {  // Use the parameter instead of 10
    console.log(i);
  }
  console.log("Blast off!");
}
```

Now when you call `countdownFor(3)`, it starts at 3!

</details>

<details>
<summary>Hint 4: Complete solution structure</summary>

Here are both functions with parameters:

```javascript
export function countdownWhile(start) {
  let count = start;  // Initialize from parameter
  while (count >= 1) {
    console.log(count);
    count--;
  }
  console.log("Blast off!");
}

export function countdownFor(start) {
  for (let i = start; i >= 1; i--) {  // Start from parameter
    console.log(i);
  }
  console.log("Blast off!");
}
```

The only changes are:
1. Adding `start` parameter to the function signature
2. Using `start` instead of the hardcoded `10`

</details>

## Test Your Code

To run your code and see countdowns with different starting numbers:
```bash
cd exercises/025-countdown-custom
node 025-countdown-custom.js
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise teaches you:
- **Function parameters** - accepting input to make functions flexible
- **Parameter usage** - using parameter values inside the function
- **Code reusability** - one function that works for many cases
- **Hardcoding vs parameterization** - making code more flexible
- **Function signatures** - defining what inputs a function accepts

Parameters are what make functions truly powerful - they let you write code once and use it many times with different inputs!

## Reflection Questions

After completing the exercise, think about:
1. Why are parameters better than hardcoding values inside functions?
2. What happens if you call `countdownWhile(0)`? Will it display anything?
3. Could you add a second parameter to control where to stop (instead of always stopping at 1)?
4. How would you call these functions to count from 100?

## Solution

<details>
<summary>Click to see the solution (try the exercise first!)</summary>

```javascript
// This exercise builds on exercise 024!
// The solution code from 024 is provided below as your starting point.

export function countdownWhile(start) {
  let count = start;  // Use the parameter instead of hardcoded 10

  while (count >= 1) {
    console.log(count);
    count--;
  }

  console.log("Blast off!");
}

export function countdownFor(start) {
  for (let i = start; i >= 1; i--) {  // Use the parameter instead of hardcoded 10
    console.log(i);
  }
  console.log("Blast off!");
}

// Test with different starting numbers
console.log("=== Countdown from 5 (While) ===\n");
countdownWhile(5);

console.log("\n=== Countdown from 3 (For) ===\n");
countdownFor(3);

console.log("\n=== Countdown from 20 (While) ===\n");
countdownWhile(20);
```

**What changed:**

**While loop version:**
```javascript
// BEFORE (hardcoded)
export function countdownWhile() {
  let count = 10;  // Always starts at 10
  // ... rest of function
}

// AFTER (with parameter)
export function countdownWhile(start) {  // Added parameter
  let count = start;  // Uses whatever is passed in
  // ... rest of function
}
```

**For loop version:**
```javascript
// BEFORE (hardcoded)
export function countdownFor() {
  for (let i = 10; i >= 1; i--) {  // Always starts at 10
    // ... rest of function
  }
}

// AFTER (with parameter)
export function countdownFor(start) {  // Added parameter
  for (let i = start; i >= 1; i--) {  // Uses whatever is passed in
    // ... rest of function
  }
}
```

**How parameters work:**

When you call a function with an argument, that value gets assigned to the parameter:

```javascript
countdownWhile(5);
// Inside the function, 'start' becomes 5
// So 'let count = start' is the same as 'let count = 5'
```

```javascript
countdownFor(20);
// Inside the function, 'start' becomes 20
// So 'for (let i = start; ...)' is the same as 'for (let i = 20; ...)'
```

**Multiple calls with different values:**

```javascript
countdownWhile(3);   // Counts: 3, 2, 1, Blast off!
countdownWhile(7);   // Counts: 7, 6, 5, 4, 3, 2, 1, Blast off!
countdownWhile(1);   // Counts: 1, Blast off!
countdownWhile(100); // Counts: 100, 99, 98, ... 2, 1, Blast off!
```

Each call uses a different starting value, but you only wrote the function once!

**What happens with edge cases?**

**Start at 0:**
```javascript
countdownWhile(0);
// count = 0
// Check: Is 0 >= 1? NO
// Loop doesn't run at all
// Output: Blast off!
```

**Start at negative number:**
```javascript
countdownWhile(-5);
// count = -5
// Check: Is -5 >= 1? NO
// Loop doesn't run at all
// Output: Blast off!
```

**Start at 1:**
```javascript
countdownWhile(1);
// count = 1
// Check: Is 1 >= 1? YES → Enter loop
// Log: 1
// Decrease: count becomes 0
// Check: Is 0 >= 1? NO → Exit loop
// Output: 1, Blast off!
```

**Benefits of parameters:**

**Without parameters (inflexible):**
```javascript
function countdown5() {
  for (let i = 5; i >= 1; i--) {
    console.log(i);
  }
}

function countdown10() {
  for (let i = 10; i >= 1; i--) {
    console.log(i);
  }
}

function countdown20() {
  for (let i = 20; i >= 1; i--) {
    console.log(i);
  }
}

// Need a separate function for each starting number!
```

**With parameters (flexible):**
```javascript
function countdown(start) {
  for (let i = start; i >= 1; i--) {
    console.log(i);
  }
}

// One function works for everything!
countdown(5);
countdown(10);
countdown(20);
countdown(1000);
```

**Adding more parameters (preview of next exercises):**

You could add a second parameter for the ending point:

```javascript
function countdown(start, end) {
  for (let i = start; i >= end; i--) {
    console.log(i);
  }
}

countdown(10, 1);   // 10 to 1
countdown(10, 5);   // 10 to 5
countdown(100, 90); // 100 to 90
```

Or a parameter for the step size:

```javascript
function countdown(start, step) {
  for (let i = start; i >= 1; i -= step) {
    console.log(i);
  }
}

countdown(10, 1);  // 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
countdown(10, 2);  // 10, 8, 6, 4, 2
countdown(20, 5);  // 20, 15, 10, 5
```

You'll explore intervals in the next exercise!

**Real-world uses of countdown functions:**

```javascript
// Rocket launch countdown
countdown(10);  // T-minus 10 seconds

// Microwave timer
countdown(180);  // 3 minutes = 180 seconds

// Game start countdown
countdown(3);  // 3, 2, 1, GO!

// New Year's Eve
countdown(60);  // Final minute of the year
```

Parameters make your functions adaptable to different situations!

</details>

## Next Steps

Great work! Your countdown functions are now much more flexible. In the next exercise (026-countdown-skip), you'll add another parameter to control the counting interval. Instead of always counting by 1s, you'll be able to count by 2s, 5s, 10s, or any interval you choose!

