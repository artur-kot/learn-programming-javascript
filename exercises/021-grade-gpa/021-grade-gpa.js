// This exercise builds on exercise 020!
// The solution code from 020 is provided below as your starting point.

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
  // TODO: Calculate GPA from an array of letter grades
  //
  // GPA scale (4.0 scale):
  // A+ = 4.0, A = 4.0, A- = 3.7
  // B+ = 3.3, B = 3.0, B- = 2.7
  // C+ = 2.3, C = 2.0, C- = 1.7
  // D+ = 1.3, D = 1.0, D- = 0.7
  // F = 0.0
  //
  // Steps:
  // 1. Convert each letter grade to its grade point value
  // 2. Sum all the grade points
  // 3. Divide by the number of grades
  // 4. Return the result rounded to 2 decimal places
  //
  // Hint: Use a switch statement to convert letter grades to numbers
  // Hint: Use a loop to process all grades in the array
  // Hint: Use .toFixed(2) to round to 2 decimal places, then convert back to number

  
}

// Test the GPA calculation
const studentGrades = ["A", "B+", "A-", "B", "A+"];
const gpa = calculateGPA(studentGrades);
console.log("Student grades:", studentGrades.join(", "));
console.log("GPA:", gpa);

// Test with different grade combinations
const student2Grades = ["B", "B-", "C+", "B", "C"];
const gpa2 = calculateGPA(student2Grades);
console.log("\nStudent 2 grades:", student2Grades.join(", "));
console.log("GPA:", gpa2);

const student3Grades = ["A+", "A", "A", "A-", "A"];
const gpa3 = calculateGPA(student3Grades);
console.log("\nStudent 3 grades:", student3Grades.join(", "));
console.log("GPA:", gpa3);
