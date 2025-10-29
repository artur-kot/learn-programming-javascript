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

export function createShoppingManager() {
  let items = [];
  
  return {
    add(item, quantity = 1) {
      items.push({ item, quantity });
    },
    
    remove(item) {
      const index = items.findIndex(obj => obj.item === item);
      if (index > -1) {
        items.splice(index, 1);
        return true;
      }
      return false;
    },
    
    getList() {
      return items;
    },
    
    updateQuantity(item, quantity) {
      for (const itemObj of items) {
        if (itemObj.item === item) {
          itemObj.quantity = quantity;
          return true;
        }
      }
      return false;
    },
    
    getTotal() {
      let total = 0;
      for (const itemObj of items) {
        total += itemObj.quantity;
      }
      return total;
    },
    
    clear() {
      items = [];
    },
    
    findItem(item) {
      return items.findIndex(obj => obj.item === item);
    },
    
    isEmpty() {
      return items.length === 0;
    },
    
    getCount() {
      return items.length;
    }
  };
}