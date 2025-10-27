// This exercise builds on exercise 018
// The solution code from 018 is provided below as your starting point.

export function getLetterGrade(score) {
  // TODO: Enhance this function to return grades with + and - modifiers
  //
  // Current behavior: Returns basic letters (A, B, C, D, F)
  // New behavior: Return precise grades with +/- modifiers
  //
  // Grade scale with +/- modifiers:
  // 97-100: A+    93-96: A     90-92: A-
  // 87-89:  B+    83-86: B     80-82: B-
  // 77-79:  C+    73-76: C     70-72: C-
  // 67-69:  D+    63-66: D     60-62: D-
  // 0-59:   F (no F+ or F-)
  //
  // Hint: Use nested if statements within each grade range
  // For example, when you know it's a B (80-89):
  //   if (score >= 87) return "B+";
  //   else if (score >= 83) return "B";
  //   else return "B-";
  //
  // Start by modifying the A grade section:
  if (score >= 90) {
    // TODO: Add nested conditions here for A+, A, A-
    return "A";
  } else if (score >= 80) {
    // TODO: Add nested conditions here for B+, B, B-
    return "B";
  } else if (score >= 70) {
    // TODO: Add nested conditions here for C+, C, C-
    return "C";
  } else if (score >= 60) {
    // TODO: Add nested conditions here for D+, D, D-
    return "D";
  } else {
    return "F";
  }
}

// Test the function with sample scores
console.log("Score 98:", getLetterGrade(98));   // Should print: A+
console.log("Score 95:", getLetterGrade(95));   // Should print: A
console.log("Score 90:", getLetterGrade(90));   // Should print: A-
console.log("Score 87:", getLetterGrade(87));   // Should print: B+
console.log("Score 83:", getLetterGrade(83));   // Should print: B
console.log("Score 80:", getLetterGrade(80));   // Should print: B-
console.log("Score 77:", getLetterGrade(77));   // Should print: C+
console.log("Score 73:", getLetterGrade(73));   // Should print: C
console.log("Score 70:", getLetterGrade(70));   // Should print: C-
console.log("Score 67:", getLetterGrade(67));   // Should print: D+
console.log("Score 63:", getLetterGrade(63));   // Should print: D
console.log("Score 60:", getLetterGrade(60));   // Should print: D-
console.log("Score 42:", getLetterGrade(42));   // Should print: F
