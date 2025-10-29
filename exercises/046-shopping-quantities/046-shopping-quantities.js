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

// TODO: Implement quantity tracking with objects

export function addItemWithQuantity(item, quantity = 1) {
  // TODO: Add an item object with quantity to the list
  // Structure: { item: name, quantity: number }
}

export function getListWithQuantities() {
  // TODO: Return the current list (with items and quantities)
}

export function updateQuantity(item, quantity) {
  // TODO: Update the quantity of an existing item
  // Return true if successful, false if item not found
}

export function getTotalItems() {
  // TODO: Return the total number of items (sum of all quantities)
}