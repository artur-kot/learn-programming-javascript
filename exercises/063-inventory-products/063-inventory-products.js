// Product Inventory System Starter
// This exercise introduces working with objects containing multiple properties and methods

let inventory = [];

// Helper: Create a product object with all properties
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

// Helper: Add product to inventory
function addProduct(id, name, price, quantity, category) {
  const product = createProduct(id, name, price, quantity, category);
  inventory.push(product);
}

// TODO: Implement getInventory()
// Return the entire inventory array
export function getInventory() {
  // TODO: Implementation
}

// TODO: Implement getProductCount()
// Return the number of unique products in inventory
export function getProductCount() {
  // TODO: Implementation
}

// TODO: Implement getTotalInventoryValue()
// Calculate total value of all products (price * quantity for each)
// Return the sum
export function getTotalInventoryValue() {
  // TODO: Implementation
}

// TODO: Implement getProductsByCategory(category)
// Find all products that match the given category
// Return array of matching products
export function getProductsByCategory(category) {
  // TODO: Implementation
}

// Helper to populate inventory for testing
export function populateInventory() {
  addProduct(1, 'Laptop', 999.99, 5, 'Electronics');
  addProduct(2, 'Mouse', 29.99, 15, 'Electronics');
  addProduct(3, 'Desk', 299.99, 3, 'Furniture');
  addProduct(4, 'Chair', 199.99, 8, 'Furniture');
  addProduct(5, 'Monitor', 399.99, 4, 'Electronics');
}

// Reset inventory for testing
export function resetInventory() {
  inventory = [];
}
