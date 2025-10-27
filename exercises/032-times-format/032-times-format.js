// This exercise builds on exercise 031!
// The solution code from 031 is provided below as your starting point.

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
  // This function is complete from exercise 031
  for (let row = minRow; row <= maxRow; row++) {
    if (row % 2 === 0) {
      continue;
    }

    for (let col = minCol; col <= maxCol; col++) {
      if (col % 2 === 0) {
        continue;
      }

      let result = row * col;
      console.log(`${row} x ${col} = ${result}`);
    }
    console.log("");
  }
}

export function timesGridFormatted(size) {
  // TODO: Create a beautifully formatted multiplication table
  //
  // This function should:
  // 1. Accept a size (e.g., 10 for 10x10 table)
  // 2. Display results in a grid format with proper spacing
  // 3. Show all results on ONE LINE per row (not separate lines)
  // 4. Use padStart() to align numbers nicely
  //
  // Example output for size 5:
  //    1   2   3   4   5
  //    2   4   6   8  10
  //    3   6   9  12  15
  //    4   8  12  16  20
  //    5  10  15  20  25
  //
  // Each number should be right-aligned in a 4-character wide column.
  //
  // Key concepts:
  // - Build a string for each row instead of logging each number
  // - Use padStart() to add spacing: result.toString().padStart(4)
  // - Log the complete row string after the inner loop finishes
  //
  // Steps:
  // 1. Outer loop: for (let row = 1; row <= size; row++)
  // 2. Create empty string: let rowString = ""
  // 3. Inner loop: for (let col = 1; col <= size; col++)
  // 4. Calculate result: row * col
  // 5. Add to rowString with padding: rowString += result.toString().padStart(4)
  // 6. After inner loop, log the complete rowString
  //
  // Hint: padStart(4) makes the number 4 characters wide, adding spaces on left
  // Hint: Build the entire row as a string before logging
  // Hint: No blank lines between rows - it's a compact grid!

  /* Your code here */
}

// Test the formatted table
console.log("=== Unformatted 5x5 (old way) ===\n");
timesGridRange(1, 5, 1, 5);

console.log("\n=== Formatted 5x5 (new way) ===\n");
timesGridFormatted(5);

console.log("\n=== Formatted 10x10 ===\n");
timesGridFormatted(10);

console.log("\n=== Formatted 12x12 ===\n");
timesGridFormatted(12);
