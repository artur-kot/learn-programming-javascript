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

// Function composition: combine all analysis functions into one comprehensive result
export function analyzeText(text) {
  return {
    words: countWords(text),
    characters: countCharacters(text),
    letters: countLetters(text),
    digits: countDigits(text),
    digitString: filterText(text, createDigitFilter()),
    letterString: filterText(text, createLetterFilter()),
  };
}

export function analyzeTextWithOptions(text, options = {}) {
  const fullAnalysis = analyzeText(text);
  
  // If no options provided, return full analysis
  if (!options || Object.keys(options).length === 0) {
    return fullAnalysis;
  }
  
  // Build result based on options
  const result = {};
  
  if (options.includeWords !== false) result.words = fullAnalysis.words;
  if (options.includeCharacters !== false) result.characters = fullAnalysis.characters;
  if (options.includeLetters !== false) result.letters = fullAnalysis.letters;
  if (options.includeDigits !== false) result.digits = fullAnalysis.digits;
  if (options.includeDigitString !== false) result.digitString = fullAnalysis.digitString;
  if (options.includeLetterString !== false) result.letterString = fullAnalysis.letterString;
  
  return result;
}