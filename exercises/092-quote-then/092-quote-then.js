// Mock Quote Database
const quoteDatabase = [
  { id: 1, text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { id: 2, text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { id: 3, text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { id: 4, text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { id: 5, text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" }
];

// TODO: Implement the mockQuoteAPI function (from previous exercise)
export function mockQuoteAPI(delayMs = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const quote = quoteDatabase[Math.floor(Math.random() * quoteDatabase.length)];
      resolve(quote);
    }, delayMs);
  });
}

// TODO: Implement the fetchAndFormat function
// Get a quote and format it as a string using .then()
export function fetchAndFormat(delayMs = 1000) {
  
}

// TODO: Implement the fetchAndUppercase function
// Get a quote and uppercase the text using .then()
export function fetchAndUppercase(delayMs = 1000) {
  
}

// TODO: Implement the fetchMultipleQuotes function
// Fetch multiple quotes sequentially using .then() chaining
export function fetchMultipleQuotes(count = 2, delayMs = 1000) {
  
}

// TODO: Implement the fetchAndEnrich function
// Fetch a quote and add additional properties using .then()
export function fetchAndEnrich(delayMs = 1000) {
  
}
