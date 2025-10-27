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