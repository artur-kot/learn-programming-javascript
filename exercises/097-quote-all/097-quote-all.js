// Mock Quote Sources
const quoteSourceA = [
  { id: 1, text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { id: 2, text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" }
];

const quoteSourceB = [
  { id: 3, text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { id: 4, text: "Tomorrow is only found in the calendar.", author: "John Lennon" }
];

const quoteSourceC = [
  { id: 5, text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { id: 6, text: "No one can make you feel inferior without your consent.", author: "Eleanor Roosevelt" }
];

// Mock API for each source
async function fetchFromSourceA(delayMs = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(quoteSourceA[Math.floor(Math.random() * quoteSourceA.length)]);
    }, delayMs);
  });
}

async function fetchFromSourceB(delayMs = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(quoteSourceB[Math.floor(Math.random() * quoteSourceB.length)]);
    }, delayMs);
  });
}

async function fetchFromSourceC(delayMs = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(quoteSourceC[Math.floor(Math.random() * quoteSourceC.length)]);
    }, delayMs);
  });
}

// TODO: Implement the fetchFromAllSourcesParallel function
// Fetch quotes from all sources in parallel using Promise.all
export async function fetchFromAllSourcesParallel(delayMs = 1000) {
  
}

// TODO: Implement the fetchFromAllSourcesSequential function
// Fetch quotes from all sources one after another
export async function fetchFromAllSourcesSequential(delayMs = 1000) {
  
}

// TODO: Implement the fetchWithTimeout function
// Fetch from all sources with timeout protection
export async function fetchWithTimeout(delayMs = 1000, timeoutMs = 500) {
  
}

// TODO: Implement the fetchUntilSuccess function
// Keep fetching until all sources succeed with retries
export async function fetchUntilSuccess(delayMs = 1000, maxRetries = 3) {
  
}

// TODO: Implement the createMultiSourceAPI function
// Return API object that handles multiple sources
export function createMultiSourceAPI(delayMs = 1000) {
  
}
