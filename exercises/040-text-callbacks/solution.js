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
  // Count characters that pass the filter function
  let count = 0;
  for (let char of text) {
    if (filterFunction(char)) {
      count++;
    }
  }
  return count;
}

export function filterText(text, filterFunction) {
  // Return new string with only characters that pass the filter
  let result = "";
  for (let char of text) {
    if (filterFunction(char)) {
      result += char;
    }
  }
  return result;
}

// Demo
console.log(countMatching("hello123", char => /[0-9]/.test(char))); // 3
console.log(filterText("hello123", char => /[0-9]/.test(char))); // "123"