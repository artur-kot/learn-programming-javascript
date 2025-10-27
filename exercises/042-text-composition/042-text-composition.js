// Complete previous solution functionality
export function countWords(text) {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

export function countCharacters(text) {
  return text.length;
}

export function countLetters(text) {
  let count = 0;
  for (const char of text) {
    if (/[a-zA-Z]/.test(char)) {
      count++;
    }
  }
  return count;
}

export function countDigits(text) {
  let count = 0;
  for (const char of text) {
    if (/[0-9]/.test(char)) {
      count++;
    }
  }
  return count;
}

export function countMatching(text, filterFunction) {
  let count = 0;
  for (const char of text) {
    if (filterFunction(char)) {
      count++;
    }
  }
  return count;
}

export function filterText(text, filterFunction) {
  let result = '';
  for (const char of text) {
    if (filterFunction(char)) {
      result += char;
    }
  }
  return result;
}

export function createDigitFilter() {
  return char => /[0-9]/.test(char);
}

export function createLetterFilter() {
  return char => /[a-zA-Z]/.test(char);
}

export function createLowercaseFilter() {
  return char => /[a-z]/.test(char);
}

export function createUppercaseFilter() {
  return char => /[A-Z]/.test(char);
}

export function createCharacterFilter(targetChar) {
  return char => char === targetChar;
}

// TODO: Create a composition function that combines all analysis functions
// This function should return an object with all the analysis results

export function analyzeText(text) {
  // TODO: Return an object with:
  // - words: number of words
  // - characters: total characters
  // - letters: total letters
  // - digits: total digits
  // - digitString: string of only digits
  // - letterString: string of only letters
}

export function analyzeTextWithOptions(text, options = {}) {
  // TODO: Return an analysis object, but customize which analysis to perform
  // options parameter might have properties like:
  // { includeDigits: true, includeLetters: false, ... }
  // Perform all analyses by default if no options given
}