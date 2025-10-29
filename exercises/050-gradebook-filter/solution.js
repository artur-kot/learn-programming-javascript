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