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

let itemsWithQuantities = [];

export function addItemWithQuantity(item, quantity = 1) {
  itemsWithQuantities.push({ item, quantity });
}

export function getListWithQuantities() {
  return itemsWithQuantities;
}

export function updateQuantity(item, quantity) {
  for (const itemObj of itemsWithQuantities) {
    if (itemObj.item === item) {
      itemObj.quantity = quantity;
      return true;
    }
  }
  return false;
}

export function getTotalItems() {
  let total = 0;
  for (const itemObj of itemsWithQuantities) {
    total += itemObj.quantity;
  }
  return total;
}

// TODO: Create a shopping manager object that brings everything together

export function createShoppingManager() {
  // TODO: Return an object with methods for all shopping list operations
  // Methods should include:
  // - add(item, quantity) - add item with optional quantity
  // - remove(item) - remove an item
  // - getList() - get all items with quantities
  // - updateQuantity(item, quantity) - update item quantity
  // - getTotal() - get total number of items
  // - clear() - clear all items
  // - findItem(item) - find item index
  // - isEmpty() - check if list is empty
  // - getCount() - return number of unique items
}