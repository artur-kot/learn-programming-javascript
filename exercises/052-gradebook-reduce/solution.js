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

export function calculateClassAverage() {
  const sum = scores.reduce((total, score) => total + score, 0);
  return scores.length === 0 ? 0 : sum / scores.length;
}

export function getStatistics() {
  return {
    average: calculateClassAverage(),
    highest: findHighestScore(),
    lowest: findLowestScore(),
    total: scores.length,
    passing: getPassingScores().length,
    failing: getFailingScores().length,
  };
}