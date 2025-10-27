export function timesTable(number) {
  // TODO: Create a multiplication table for a single number
  //
  // This function should:
  // 1. Accept a number as input
  // 2. Display multiplication results from 1 to 10
  // 3. Format: "number x 1 = result", "number x 2 = result", etc.
  //
  // Example: timesTable(5) should show:
  // 5 x 1 = 5
  // 5 x 2 = 10
  // 5 x 3 = 15
  // ... up to 5 x 10 = 50
  //
  // Steps:
  // 1. Create a loop that counts from 1 to 10
  // 2. Inside the loop, multiply 'number' by the counter
  // 3. Display the equation using console.log
  //
  // Hint: Use a for loop: for (let i = 1; i <= 10; i++)
  // Hint: Calculate result: let result = number * i
  // Hint: Use template literals: `${number} x ${i} = ${result}`

  /* Your code here */
}

// Test with different numbers
console.log("=== Times table for 5 ===\n");
timesTable(5);

console.log("\n=== Times table for 7 ===\n");
timesTable(7);

console.log("\n=== Times table for 12 ===\n");
timesTable(12);
