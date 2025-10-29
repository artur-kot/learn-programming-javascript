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

// TODO: Create functions that return filter functions (higher-order functions)
// These functions should return a new function that can be used as a callback

export function createDigitFilter() {
  // TODO: Return a function that tests if a character is a digit
}

export function createLetterFilter() {
  // TODO: Return a function that tests if a character is a letter
}

export function createLowercaseFilter() {
  // TODO: Return a function that tests if a character is lowercase
}

export function createUppercaseFilter() {
  // TODO: Return a function that tests if a character is uppercase
}

export function createCharacterFilter(targetChar) {
  // TODO: Return a function that tests if a character matches the target character
}