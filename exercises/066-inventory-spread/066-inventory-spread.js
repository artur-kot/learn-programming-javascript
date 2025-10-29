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

// TODO: Implement cloneProduct(product)
// Create an exact copy of a product using the spread operator
// Return the cloned product (not a reference to the original)
export function cloneProduct(product) {
  // TODO: Implementation
}

// TODO: Implement updateProductPrice(product, newPrice)
// Clone the product and update the price in the clone
// Do not modify the original product
// Return the updated clone
export function updateProductPrice(product, newPrice) {
  // TODO: Implementation
}

// TODO: Implement mergeProductUpdates(product, updates)
// Take a product and an object with property updates
// Use spread to merge updates into a new product
// Return the merged product without modifying the original
export function mergeProductUpdates(product, updates) {
  // TODO: Implementation
}

// TODO: Implement addProductWithDefaults(name, price, quantity, category = 'Uncategorized')
// Use spread with default values to create a new product
// Find the next available ID from inventory
// Return the new product
export function addProductWithDefaults(name, price, quantity, category = 'Uncategorized') {
  // TODO: Implementation
}
