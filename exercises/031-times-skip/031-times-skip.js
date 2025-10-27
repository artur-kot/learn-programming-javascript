// This exercise builds on exercise 030!
// The solution code from 030 is provided below as your starting point.

export function timesTable(number) {
  // This function is complete from exercise 028
  for (let i = 1; i <= 10; i++) {
    let result = number * i;
    console.log(`${number} x ${i} = ${result}`);
  }
}

export function timesGrid() {
  // This function is complete from exercise 029
  for (let outer = 1; outer <= 10; outer++) {
    for (let inner = 1; inner <= 10; inner++) {
      let result = outer * inner;
      console.log(`${outer} x ${inner} = ${result}`);
    }
    console.log("");
  }
}

export function timesGridRange(minRow, maxRow, minCol, maxCol) {
  // This function is complete from exercise 030
  for (let row = minRow; row <= maxRow; row++) {
    for (let col = minCol; col <= maxCol; col++) {
      let result = row * col;
      console.log(`${row} x ${col} = ${result}`);
    }
    console.log("");
  }
}

export function timesGridOddsOnly(minRow, maxRow, minCol, maxCol) {
  // TODO: Create a multiplication grid that SKIPS even numbers
  //
  // This function should:
  // 1. Work like timesGridRange with the same parameters
  // 2. But SKIP any row that is an even number
  // 3. And SKIP any column that is an even number
  // 4. Use the 'continue' statement to skip iterations
  //
  // The 'continue' statement:
  // - Skips the rest of the current iteration
  // - Jumps immediately to the next iteration
  // - Does NOT exit the loop (unlike 'break')
  //
  // How to check if a number is even:
  // if (number % 2 === 0) {
  //   // number is even
  // }
  //
  // Steps:
  // 1. Create nested loops with minRow/maxRow and minCol/maxCol
  // 2. In outer loop, check if row is even - if yes, use 'continue'
  // 3. In inner loop, check if col is even - if yes, use 'continue'
  // 4. Calculate and display row x col = result (only for odd numbers)
  // 5. Add blank line after each row's columns
  //
  // Hint: continue must come BEFORE the calculation
  // Hint: Check row in outer loop, col in inner loop
  // Hint: Only odd × odd combinations will be displayed

  /* Your code here */
}

// Test skipping evens
console.log("=== Standard 1-5 grid (all numbers) ===\n");
timesGridRange(1, 5, 1, 5);

console.log("\n=== Odds only 1-5 grid (skip evens) ===\n");
timesGridOddsOnly(1, 5, 1, 5);

console.log("\n=== Odds only 1-10 grid (skip evens) ===\n");
timesGridOddsOnly(1, 10, 1, 10);
