export function countWords(text) {
  if (!text || text.trim() === "") {
    return 0;
  }
  const words = text.trim().split(/\s+/);
  return words.length;
}

export function countCharacters(text) {
  return text.length;
}

export function countLetters(text) {
  let count = 0;
  for (let char of text) {
    if (/[a-zA-Z]/.test(char)) {
      count++;
    }
  }
  return count;
}

export function countDigits(text) {
  let count = 0;
  for (let char of text) {
    if (/[0-9]/.test(char)) {
      count++;
    }
  }
  return count;
}

export function countMatching(text, filterFunction) {
  // TODO: Count characters that match a custom filter function
  // The filterFunction receives each character and returns true/false
  // Example: countMatching("hello123", char => /[0-9]/.test(char)) should return 3
}

export function filterText(text, filterFunction) {
  // TODO: Return a new string containing only characters that match the filter
  // Example: filterText("hello123", char => /[0-9]/.test(char)) should return "123"
}

// Example usage
console.log(countMatching("hello123", char => /[0-9]/.test(char))); // Expected: 3
console.log(filterText("hello123", char => /[0-9]/.test(char))); // Expected: "123"