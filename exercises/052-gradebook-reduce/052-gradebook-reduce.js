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

export function findScore(score) {
  return scores.find(s => s === score);
}

export function findScoreIndex(score) {
  return scores.findIndex(s => s === score);
}

export function findHighestScore() {
  let highest = scores[0];
  for (const score of scores) {
    if (score > highest) {
      highest = score;
    }
  }
  return highest;
}

export function findLowestScore() {
  let lowest = scores[0];
  for (const score of scores) {
    if (score < lowest) {
      lowest = score;
    }
  }
  return lowest;
}

// TODO: Implement aggregation using reduce

export function calculateClassAverage() {
  // TODO: Use Array.reduce() to sum all scores and calculate average
  // Return the average (sum / count)
}

export function getStatistics() {
  // TODO: Return an object with comprehensive statistics
  // Include: average, highest, lowest, total, passing, failing
}