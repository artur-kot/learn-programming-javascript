let scores = [];

export function addScore(score) {
  scores.push(score);
}

export function getScores() {
  return scores;
}

export function getScoreCount() {
  return scores.length;
}

// TODO: Implement score to letter conversion using map

export function scoreToLetter(score) {
  // TODO: Convert numeric score to letter grade
  // 90-100: A
  // 80-89: B
  // 70-79: C
  // 60-69: D
  // Below 60: F
}

export function mapScoresToLetters() {
  // TODO: Use Array.map() to convert all scores to letter grades
  // Return a new array of letter grades
}