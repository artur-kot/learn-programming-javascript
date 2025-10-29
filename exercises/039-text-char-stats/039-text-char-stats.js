export function countWords(text) {
  // Handle empty or whitespace-only strings
  if (!text || text.trim() === "") {
    return 0;
  }
  
  // Split by whitespace, filter out empty strings
  const words = text.trim().split(/\s+/);
  return words.length;
}

export function countCharacters(text) {
  // TODO: Count total characters (including spaces and punctuation)
  // This should count every character, including spaces
}

export function countLetters(text) {
  // TODO: Count only alphabetic characters (a-z, A-Z)
  // Ignore digits, spaces, and punctuation
}

export function countDigits(text) {
  // TODO: Count only numeric characters (0-9)
}

// Example usage
console.log(countWords("Hello world"));          // 2
console.log(countCharacters("Hello world"));     // 11 (including space)
console.log(countLetters("Hello world"));        // 10 (H,e,l,l,o,w,o,r,l,d)
console.log(countDigits("I have 2 cats and 3 dogs")); // 2