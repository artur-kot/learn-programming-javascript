// This exercise builds on exercise 029!
// The solution code from 029 is provided below as your starting point.

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
  // TODO: Create a flexible multiplication grid with custom ranges
  //
  // Instead of always 1-10, this function accepts:
  // - minRow: starting number for rows (outer loop)
  // - maxRow: ending number for rows (outer loop)
  // - minCol: starting number for columns (inner loop)
  // - maxCol: ending number for columns (inner loop)
  //
  // Examples:
  // timesGridRange(1, 5, 1, 5) → 5x5 grid from 1 to 5
  // timesGridRange(3, 7, 1, 10) → rows 3-7, columns 1-10
  // timesGridRange(5, 8, 5, 12) → rows 5-8, columns 5-12
  //
  // Steps:
  // 1. Outer loop: for (let row = minRow; row <= maxRow; row++)
  // 2. Inner loop: for (let col = minCol; col <= maxCol; col++)
  // 3. Calculate: result = row * col
  // 4. Display: console.log(`${row} x ${col} = ${result}`)
  // 5. Add blank line after each row's complete column set
  //
  // Hint: Use 'row' and 'col' as variable names to make it clearer
  // Hint: Structure is the same as timesGrid, but with parameters for limits

  /* Your code here */
}

// Test the basic functions
console.log("=== Standard 10x10 grid (first 3 lines) ===\n");
timesTable(1);

console.log("\n=== Custom range: 5x5 grid (1 to 5) ===\n");
timesGridRange(1, 5, 1, 5);

console.log("\n=== Custom range: 3-7 rows, 1-10 columns ===\n");
timesGridRange(3, 7, 1, 10);

console.log("\n=== Custom range: 8-10 rows, 8-10 columns ===\n");
timesGridRange(8, 10, 8, 10);
