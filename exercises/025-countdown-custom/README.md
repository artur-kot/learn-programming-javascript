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

## Next Steps

Great work! Your countdown functions are now much more flexible. In the next exercise (026-countdown-skip), you'll add another parameter to control the counting interval. Instead of always counting by 1s, you'll be able to count by 2s, 5s, 10s, or any interval you choose!


