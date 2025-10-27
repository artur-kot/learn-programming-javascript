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

export function scoreToLetter(score) {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

export function mapScoresToLetters() {
  return scores.map(score => scoreToLetter(score));
}

export function getPassingScores(passingScore = 70) {
  return scores.filter(score => score >= passingScore);
}

export function getFailingScores(passingScore = 70) {
  return scores.filter(score => score < passingScore);
}

// TODO: Implement search functions using find and findIndex

export function findScore(score) {
  // TODO: Use Array.find() to return the first score that equals the target
  // Return undefined if not found
}

export function findScoreIndex(score) {
  // TODO: Use Array.findIndex() to return the index of the first matching score
  // Return -1 if not found
}

export function findHighestScore() {
  // TODO: Return the maximum score using find() or comparison
}

export function findLowestScore() {
  // TODO: Return the minimum score using find() or comparison
}