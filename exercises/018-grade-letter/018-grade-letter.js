export function getLetterGrade(score) {
  // TODO: Convert a numeric score to a letter grade
  // 90-100: A
  // 80-89: B
  // 70-79: C
  // 60-69: D
  // 0-59: F
  //
  // Hint: Use if-else-if chains to check the score ranges
  //
  // if (score >= 90) {
  //   return "A";
  // } else if (score >= 80) {
  //   return "B";
  // }
  // Continue for other grades...
}

// Test the function with sample scores
console.log("Score 95:", getLetterGrade(95));  // Should print: A
console.log("Score 87:", getLetterGrade(87));  // Should print: B
console.log("Score 73:", getLetterGrade(73));  // Should print: C
console.log("Score 65:", getLetterGrade(65));  // Should print: D
console.log("Score 42:", getLetterGrade(42));  // Should print: F
console.log("Score 100:", getLetterGrade(100)); // Should print: A
console.log("Score 0:", getLetterGrade(0));    // Should print: F
