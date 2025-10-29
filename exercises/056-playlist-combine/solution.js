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
