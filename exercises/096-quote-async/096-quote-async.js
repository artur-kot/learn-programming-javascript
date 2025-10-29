// Mock Quote Database
const quoteDatabase = [
  { id: 1, text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { id: 2, text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { id: 3, text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { id: 4, text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { id: 5, text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" }
];

// Helper function that may fail
async function mockQuoteAPIAsync(shouldFail = false, delayMs = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Failed to fetch quote'));
      } else {
        const quote = quoteDatabase[Math.floor(Math.random() * quoteDatabase.length)];
        resolve(quote);
      }
    }, delayMs);
  });
}

// TODO: Implement the getQuoteAsync function
// Get a quote using async/await
export async function getQuoteAsync(delayMs = 1000) {
  
}

// TODO: Implement the getQuoteWithErrorAsync function
// Get a quote with error handling using try/catch
export async function getQuoteWithErrorAsync(shouldFail = false, delayMs = 1000) {
  
}

// TODO: Implement the getMultipleQuotesAsync function
// Fetch multiple quotes sequentially using async/await
export async function getMultipleQuotesAsync(count = 3, delayMs = 1000) {
  
}

// TODO: Implement the fetchAndTransformAsync function
// Fetch and transform quote data using async/await
export async function fetchAndTransformAsync(delayMs = 1000) {
  
}

// TODO: Implement the createAsyncAPI function
// Return API object with async methods
export function createAsyncAPI(delayMs = 1000) {
  
}
