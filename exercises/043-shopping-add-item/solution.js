let currentItem = undefined;

export function addItem(item) {
  currentItem = item;
}

export function getItem() {
  return currentItem;
}