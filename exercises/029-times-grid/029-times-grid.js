// This exercise builds on exercise 028!
// The solution code from 028 is provided below as your starting point.

export function timesTable(number) {
  // This function is complete from exercise 028
  for (let i = 1; i <= 10; i++) {
    let result = number * i;
    console.log(`${number} x ${i} = ${result}`);
  }
}

export function timesGrid() {
  // TODO: Create a FULL multiplication grid from 1x1 to 10x10
  //
  // This is where nested loops come in!
  // You need to:
  // 1. Create an OUTER loop that goes from 1 to 10 (for the first number)
  // 2. Inside that, create an INNER loop that also goes from 1 to 10 (for the second number)
  // 3. For each combination, display: "outer x inner = result"
  //
  // Think of it like this:
  // - Outer loop picks the first number (1, then 2, then 3...)
  // - For EACH outer number, inner loop counts 1 to 10
  // - This gives you 1x1, 1x2, 1x3... then 2x1, 2x2, 2x3... etc.
  //
  // Structure:
  // for (let outer = 1; outer <= 10; outer++) {
  //   for (let inner = 1; inner <= 10; inner++) {
  //     // Calculate and display outer x inner
  //   }
  //   // Add a blank line after each table
  // }
  //
  // Hint: Put console.log("") after the inner loop to add spacing
  // Hint: Calculate result: let result = outer * inner
  // Hint: The inner loop runs 10 times for EACH iteration of the outer loop

  /* Your code here */
}

// Test the basic single table first
console.log("=== Single table for 3 ===\n");
timesTable(3);

// Now test the full grid
console.log("\n=== Full multiplication grid (1-10) ===\n");
timesGrid();
