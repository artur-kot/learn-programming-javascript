// This exercise builds on exercise 021!
// The solution code from 021 is provided below as your starting point.

export function getLetterGrade(score) {
  // This function is complete from exercise 019
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
  // This function is complete from exercise 020
  switch (letterGrade) {
    case "A+":
    case "A":
    case "A-":
    case "B+":
    case "B":
    case "B-":
    case "C+":
    case "C":
    case "C-":
    case "D+":
    case "D":
    case "D-":
      return "Pass";

    case "F":
      return "Fail";

    default:
      return "Invalid grade";
  }
}

export function calculateGPA(grades) {
  // This function is complete from exercise 021
  let totalPoints = 0;

  for (const grade of grades) {
    switch (grade) {
      case "A+":
      case "A":
        totalPoints += 4.0;
        break;
      case "A-":
        totalPoints += 3.7;
        break;
      case "B+":
        totalPoints += 3.3;
        break;
      case "B":
        totalPoints += 3.0;
        break;
      case "B-":
        totalPoints += 2.7;
        break;
      case "C+":
        totalPoints += 2.3;
        break;
      case "C":
        totalPoints += 2.0;
        break;
      case "C-":
        totalPoints += 1.7;
        break;
      case "D+":
        totalPoints += 1.3;
        break;
      case "D":
        totalPoints += 1.0;
        break;
      case "D-":
        totalPoints += 0.7;
        break;
      case "F":
        totalPoints += 0.0;
        break;
    }
  }

  const gpa = totalPoints / grades.length;
  return Number(gpa.toFixed(2));
}

export function checkHonorRoll(gpa, grades) {
  // TODO: Determine if a student qualifies for honor roll
  //
  // Honor Roll Requirements:
  // 1. GPA must be 3.5 or higher AND
  // 2. No grade below B- (no C+, C, C-, D+, D, D-, or F)
  //
  // Steps:
  // 1. Check if GPA >= 3.5
  // 2. Loop through all grades to check if any are below B-
  // 3. Return true only if BOTH conditions are met
  //
  // Hint: Use logical AND (&&) to combine conditions
  // Hint: Use a loop to check each grade
  // Hint: If you find any grade below B-, immediately return false

  
}

// Test honor roll eligibility
console.log("=== Honor Roll Check ===\n");

// Student 1: High GPA, all good grades → Should qualify
const student1 = ["A", "A-", "B+", "A", "A-"];
const gpa1 = calculateGPA(student1);
const honorRoll1 = checkHonorRoll(gpa1, student1);
console.log("Student 1 grades:", student1.join(", "));
console.log("GPA:", gpa1);
console.log("Honor Roll:", honorRoll1 ? "YES" : "NO");
console.log();

// Student 2: High GPA, but one C+ → Should NOT qualify
const student2 = ["A", "A", "A+", "A", "C+"];
const gpa2 = calculateGPA(student2);
const honorRoll2 = checkHonorRoll(gpa2, student2);
console.log("Student 2 grades:", student2.join(", "));
console.log("GPA:", gpa2);
console.log("Honor Roll:", honorRoll2 ? "YES" : "NO");
console.log();

// Student 3: Decent GPA, all B range → Should NOT qualify (GPA too low)
const student3 = ["B", "B+", "B", "B-", "B"];
const gpa3 = calculateGPA(student3);
const honorRoll3 = checkHonorRoll(gpa3, student3);
console.log("Student 3 grades:", student3.join(", "));
console.log("GPA:", gpa3);
console.log("Honor Roll:", honorRoll3 ? "YES" : "NO");
console.log();

// Student 4: Perfect student → Should qualify
const student4 = ["A+", "A+", "A", "A+", "A"];
const gpa4 = calculateGPA(student4);
const honorRoll4 = checkHonorRoll(gpa4, student4);
console.log("Student 4 grades:", student4.join(", "));
console.log("GPA:", gpa4);
console.log("Honor Roll:", honorRoll4 ? "YES" : "NO");
