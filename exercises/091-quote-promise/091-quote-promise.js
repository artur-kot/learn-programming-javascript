// Mock Quote Database
const quoteDatabase = [
  { id: 1, text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { id: 2, text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { id: 3, text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { id: 4, text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { id: 5, text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" }
];

// TODO: Implement the mockQuoteAPI function
// Create a mocked API that returns a promise resolving with a random quote
export function mockQuoteAPI(delayMs = 1000) {
  
}

// TODO: Implement the fetchQuoteByAuthor function
// Return a promise that resolves with a quote from specific author
export function fetchQuoteByAuthor(author, delayMs = 1000) {
  
}

// TODO: Implement the fetchRandomQuote function
// Return a promise for a random quote
export function fetchRandomQuote(delayMs = 1000) {
  
}

// TODO: Implement the mockQuoteWithError function
// Return a promise that may reject with an error
export function mockQuoteWithError(shouldFail = false, delayMs = 1000) {
  
}

// TODO: Implement the createQuoteAPI function
// Return an object with API methods
export function createQuoteAPI(baseDelayMs = 1000) {
  
}
