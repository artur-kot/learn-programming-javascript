// Previous solution included for context
let inventory = [];

function createProduct(id, name, price, quantity, category) {
  return {
    id,
    name,
    price,
    quantity,
    category,
    totalValue() {
      return this.price * this.quantity;
    }
  };
}

function addProduct(id, name, price, quantity, category) {
  const product = createProduct(id, name, price, quantity, category);
  inventory.push(product);
}

export function getInventory() {
  return inventory;
}

export function getProductCount() {
  return inventory.length;
}

export function getTotalInventoryValue() {
  return inventory.reduce((sum, product) => sum + product.totalValue(), 0);
}

export function getProductsByCategory(category) {
  return inventory.filter(product => product.category === category);
}

export function populateInventory() {
  addProduct(1, 'Laptop', 999.99, 5, 'Electronics');
  addProduct(2, 'Mouse', 29.99, 15, 'Electronics');
  addProduct(3, 'Desk', 299.99, 3, 'Furniture');
  addProduct(4, 'Chair', 199.99, 8, 'Furniture');
  addProduct(5, 'Monitor', 399.99, 4, 'Electronics');
}

export function resetInventory() {
  inventory = [];
}

// TODO: Implement getProductPropertyNames(product)
// Use Object.keys() to extract all property names from a product
// Return an array of property name strings
export function getProductPropertyNames(product) {
  // TODO: Implementation
}

// TODO: Implement getProductPropertyValues(product)
// Use Object.values() to extract all property values from a product
// Return an array of values (excluding methods)
export function getProductPropertyValues(product) {
  // TODO: Implementation
}

// TODO: Implement getProductEntries(product)
// Use Object.entries() to get [key, value] pairs from a product
// Return an array of [key, value] pairs (excluding methods)
export function getProductEntries(product) {
  // TODO: Implementation
}

// TODO: Implement createPriceIndex()
// Create an object where keys are product names and values are prices
// Use Object.entries() or similar to build this from inventory
// Return the price index object
export function createPriceIndex() {
  // TODO: Implementation
}
