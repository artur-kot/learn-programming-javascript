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

export function mergePlaylist(otherPlaylist) {
  return playlist.concat(otherPlaylist);
}

export function combineWithSpread(otherPlaylist) {
  return [...playlist, ...otherPlaylist];
}

// TODO: Implement hasDuplicateTitles()
// Check if any song appears more than once in the playlist by title
// Return true if duplicates exist, false otherwise
// Hint: Use Array.some() to check if any title appears more than once
export function hasDuplicateTitles() {
  // TODO: Implementation
}

// TODO: Implement checkDuplicateByTitle(title)
// Check if a specific song title appears more than once in the playlist
// Return true if the title is duplicated, false otherwise
// Hint: Use Array.filter().length > 1 or Array.some()
export function checkDuplicateByTitle(title) {
  // TODO: Implementation
}
