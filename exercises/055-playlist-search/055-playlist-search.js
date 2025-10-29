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

export function sortByTitle() {
  return [...playlist].sort((a, b) => a.title.localeCompare(b.title));
}

export function shufflePlaylist() {
  return [...playlist].sort(() => Math.random() - 0.5);
}

// TODO: Implement searchByTitle(query)
// Find all songs where the title contains the query string (case-insensitive)
// Return an array of matching song objects
// Hint: Use Array.filter() with String.includes() or similar method
export function searchByTitle(query) {
  // TODO: Implementation
}

// TODO: Implement searchByArtist(query)
// Find all songs where the artist contains the query string (case-insensitive)
// Return an array of matching song objects
// Hint: Use Array.filter() with String.includes()
export function searchByArtist(query) {
  // TODO: Implementation
}
