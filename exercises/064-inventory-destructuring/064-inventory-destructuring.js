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

// TODO: Implement extractProductName(product)
// Use destructuring to extract the name property
// Return just the name string
export function extractProductName(product) {
  // TODO: Implementation
}

// TODO: Implement extractProductInfo(product)
// Use destructuring to extract name, price, and quantity
// Return an object with just these three properties
export function extractProductInfo(product) {
  // TODO: Implementation
}

// TODO: Implement extractWithDefaults(product, defaultCategory = 'Uncategorized')
// Use destructuring with default values to extract name, price, and category
// If category is missing, use the default value
// Return an object with these properties
export function extractWithDefaults(product, defaultCategory = 'Uncategorized') {
  // TODO: Implementation
}
