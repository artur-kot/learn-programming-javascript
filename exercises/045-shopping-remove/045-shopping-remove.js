let currentItem = undefined;

export function addItem(item) {
  currentItem = item;
}

export function getItem() {
  return currentItem;
}

let shoppingList = [];

export function addToList(item) {
  shoppingList.push(item);
}

export function getList() {
  return shoppingList;
}

export function clearList() {
  shoppingList = [];
}

// TODO: Implement search and remove functions

export function findItem(item) {
  // TODO: Return the index of the first occurrence of item
  // Return -1 if not found
}

export function removeItem(item) {
  // TODO: Remove the first occurrence of item from the list
  // Return true if item was removed, false if not found
}