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

export function findItem(item) {
  return shoppingList.indexOf(item);
}

export function removeItem(item) {
  const index = shoppingList.indexOf(item);
  if (index > -1) {
    shoppingList.splice(index, 1);
    return true;
  }
  return false;
}