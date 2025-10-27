// This exercise builds on exercise 019!
// The solution code from 019 is provided below as your starting point.

export function getLetterGrade(score) {
  // This function is complete from exercise grade-plus-minus
  if (score >= 90) {
    if (score >= 97) {
      return "A+";
    } else if (score >= 93) {
      return "A";
    } else {
      return "A-";
    }
  } else if (score >= 80) {
    if (score >= 87) {
      return "B+";
    } else if (score >= 83) {
      return "B";
    } else {
      return "B-";
    }
  } else if (score >= 70) {
    if (score >= 77) {
      return "C+";
    } else if (score >= 73) {
      return "C";
    } else {
      return "C-";
    }
  } else if (score >= 60) {
    if (score >= 67) {
      return "D+";
    } else if (score >= 63) {
      return "D";
    } else {
      return "D-";
    }
  } else {
    return "F";
  }
}

export function getPassFailStatus(letterGrade) {
  // TODO: Determine if a student passed or failed based on letter grade
  //
  // Passing grades: A+, A, A-, B+, B, B-, C+, C, C-, D+, D, D-
  // Failing grade: F
  //
  // Use a switch statement to check the letterGrade value
  //
  // Hint: Switch statements are perfect when checking one value against many specific options
  //
  // switch (letterGrade) {
  //   case "A+":
  //   case "A":
  //   case "A-":
  //   case "B+":
  //     // Continue for all passing grades...
  //     return "Pass";
  //   case "F":
  //     return "Fail";
  //   default:
  //     return "Invalid grade";
  // }
}

// Test both functions together
const scores = [98, 85, 73, 65, 42];

for (const score of scores) {
  const grade = getLetterGrade(score);
  const status = getPassFailStatus(grade);
  console.log(`Score ${score} → Grade: ${grade} → Status: ${status}`);
}
