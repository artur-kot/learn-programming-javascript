// This exercise builds on exercise 024!
// The solution code from 024 is provided below as your starting point.

export function countdownWhile(start) {
  // TODO: Modify this function to accept a 'start' parameter
  //
  // Previously, this function always counted from 10.
  // Now it should count from whatever number is passed in!
  //
  // Changes needed:
  // 1. Change 'let count = 10' to 'let count = start'
  // 2. Everything else stays the same!
  //
  // Hint: Instead of hardcoding 10, use the parameter
  //
  // let count = start;  // Use the parameter instead of 10
  // while (count >= 1) {
  //   console.log(count);
  //   count--;
  // }
  // console.log("Blast off!");

  let count = 10;  // TODO: Change this to use the 'start' parameter

  while (count >= 1) {
    console.log(count);
    count--;
  }

  console.log("Blast off!");
}

export function countdownFor(start) {
  // TODO: Modify this function to accept a 'start' parameter
  //
  // Previously, this function always counted from 10.
  // Now it should count from whatever number is passed in!
  //
  // Changes needed:
  // 1. In the for loop, change 'let i = 10' to 'let i = start'
  // 2. Everything else stays the same!
  //
  // Hint: Use the parameter in the initialization part of the for loop
  //
  // for (let i = start; i >= 1; i--) {
  //   console.log(i);
  // }
  // console.log("Blast off!");

  for (let i = 10; i >= 1; i--) {  // TODO: Change 10 to use the 'start' parameter
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
