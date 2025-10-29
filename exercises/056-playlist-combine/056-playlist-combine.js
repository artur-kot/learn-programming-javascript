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

export function searchByTitle(query) {
  const lowerQuery = query.toLowerCase();
  return playlist.filter(song => song.title.toLowerCase().includes(lowerQuery));
}

export function searchByArtist(query) {
  const lowerQuery = query.toLowerCase();
  return playlist.filter(song => song.artist.toLowerCase().includes(lowerQuery));
}

// TODO: Implement mergePlaylist(otherPlaylist)
// Combine this playlist with another playlist using concat()
// Return a new array without modifying either playlist
// Hint: Use Array.concat() to merge two arrays
export function mergePlaylist(otherPlaylist) {
  // TODO: Implementation
}

// TODO: Implement combineWithSpread(otherPlaylist)
// Combine this playlist with another playlist using the spread operator
// Return a new array without modifying either playlist
// Hint: Use [...array1, ...array2] syntax
export function combineWithSpread(otherPlaylist) {
  // TODO: Implementation
}
