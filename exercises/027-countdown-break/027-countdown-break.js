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
  // TODO: Create a countdown that stops early at a specific number
  //
  // This countdown should:
  // 1. Start counting from 'start'
  // 2. Count down by 1s
  // 3. When it reaches 'stopAt', STOP the loop immediately
  // 4. Display a message showing where it stopped
  //
  // Use the 'break' statement to exit the loop early:
  // break;  // This exits the loop immediately
  //
  // Steps:
  // 1. Create a loop that counts from start down to 1
  // 2. Inside the loop, log the current number
  // 3. Check if the current number equals stopAt
  // 4. If yes, use 'break' to exit the loop
  // 5. Decrease the counter
  // 6. After the loop, log "Stopped at [stopAt]!"
  //
  // Hint: Use an if statement to check if count === stopAt
  // Hint: Put the break AFTER logging the number so stopAt is shown
  // Hint: The loop will exit immediately when break is executed

  let count = start;
  while (count >= 1) {
    console.log(count);
  
    /* Your code here */
  
    count--;
  }
  console.log(`Stopped at ${stopAt}!`);
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
