// Solution from previous exercise - DO NOT MODIFY
let playlist = [];

export function addSong(title, artist) {
  playlist.push({ title, artist });
}

export function getSongs() {
  return playlist;
}

export function getSongCount() {
  return playlist.length;
}

// TODO: Implement sortByTitle()
// Sort the playlist alphabetically by song title
// Do not modify the original playlist, return a new sorted array
// Hint: Use Array.sort() with a comparison function
export function sortByTitle() {
  // TODO: Implementation
}

// TODO: Implement shufflePlaylist()
// Randomly shuffle the playlist using Fisher-Yates algorithm
// Do not modify the original playlist, return a new shuffled array
// Hint: Use Array.sort() with Math.random() for a simple shuffle
export function shufflePlaylist() {
  // TODO: Implementation
}
