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
  // TODO: Create a countdown that skips numbers based on the interval
  //
  // Instead of always counting by 1s (10, 9, 8, 7...),
  // count by the given interval:
  // - interval = 2: count by 2s (10, 8, 6, 4, 2)
  // - interval = 5: count by 5s (20, 15, 10, 5)
  // - interval = 10: count by 10s (100, 90, 80, 70...)
  //
  // Use the -= operator to decrease by the interval amount:
  // count -= interval;  // Same as count = count - interval
  //
  // Steps:
  // 1. Start with count = start
  // 2. Loop while count >= 1
  // 3. Log the count
  // 4. Decrease by interval using -= instead of --
  // 5. After loop, log "Blast off!"
  //
  // Hint: count-- decreases by 1, count -= interval decreases by any amount
  // Hint: count -= 2 means count = count - 2
  // Hint: count -= 5 means count = count - 5
  //
  let count = start;
  /* Your code here */
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
