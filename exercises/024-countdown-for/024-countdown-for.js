// This exercise builds on exercise 023!
// The solution code from 023 is provided below as your starting point.

export function countdownWhile() {
  // This function is complete from exercise 023
  let count = 10;

  while (count >= 1) {
    console.log(count);
    count--;
  }

  console.log("Blast off!");
}

export function countdownFor() {
  // TODO: Create the same countdown but using a for loop instead
  //
  // A for loop is another way to repeat code. It's especially good when
  // you know exactly how many times you want to loop.
  //
  // For loop structure:
  // for (initialization; condition; update) {
  //   // code to repeat
  // }
  //
  // - initialization: Set up your counter (let i = 10)
  // - condition: Keep looping while this is true (i >= 1)
  // - update: Change the counter after each loop (i--)
  //
  // Steps:
  // 1. Create a for loop starting at 10
  // 2. Continue while the counter is >= 1
  // 3. Decrease the counter by 1 each time (i--)
  // 4. Inside the loop, log the current number
  // 5. After the loop ends, log "Blast off!"
  //
  // Hint: The for loop puts all the counter logic in one line
  // Hint: for (let i = 10; i >= 1; i--)

  /* TODO: Your code goes here */

  console.log("Blast off!");
}

// Compare both versions
console.log("=== While Loop Version ===\n");
countdownWhile();

console.log("\n=== For Loop Version ===\n");
countdownFor();
