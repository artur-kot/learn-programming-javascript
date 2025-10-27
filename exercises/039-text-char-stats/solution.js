export function countWords(text) {
  if (!text || text.trim() === "") {
    return 0;
  }
  const words = text.trim().split(/\s+/);
  return words.length;
}

export function countCharacters(text) {
  // Count all characters including spaces
  return text.length;
}

export function countLetters(text) {
  // Count only alphabetic characters
  let count = 0;
  for (let char of text) {
    if (/[a-zA-Z]/.test(char)) {
      count++;
    }
  }
  return count;
}

export function countDigits(text) {
  // Count only numeric characters
  let count = 0;
  for (let char of text) {
    if (/[0-9]/.test(char)) {
      count++;
    }
  }
  return count;
}

// Demo
console.log(countWords("Hello world")); // 2
console.log(countCharacters("Hello world")); // 11
console.log(countLetters("Hello world")); // 10
console.log(countDigits("I have 2 cats and 3 dogs")); // 2