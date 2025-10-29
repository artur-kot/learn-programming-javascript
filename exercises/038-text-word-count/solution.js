export function countWords(text) {
  // Handle empty or whitespace-only strings
  if (!text || text.trim() === "") {
    return 0;
  }
  
  // Split by whitespace, filter out empty strings
  const words = text.trim().split(/\s+/);
  return words.length;
}

// Demo
console.log(countWords("hello world")); // 2
console.log(countWords("The quick brown fox")); // 4
console.log(countWords("")); // 0
console.log(countWords("  multiple   spaces  ")); // 2