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

// TODO: Implement searchByName(query)
// Find all products whose name contains the query (case-insensitive)
// Return array of matching products
export function searchByName(query) {
  // TODO: Implementation
}

// TODO: Implement findProductById(id)
// Find a single product by exact ID match
// Return the product or undefined if not found
export function findProductById(id) {
  // TODO: Implementation
}

// TODO: Implement getProductsInPriceRange(minPrice, maxPrice)
// Filter products where price is between minPrice and maxPrice (inclusive)
// Return array of matching products sorted by price ascending
export function getProductsInPriceRange(minPrice, maxPrice) {
  // TODO: Implementation
}

// TODO: Implement getLowStockProducts(threshold = 5)
// Find all products with quantity at or below threshold
// Return array sorted by quantity ascending
export function getLowStockProducts(threshold = 5) {
  // TODO: Implementation
}

// TODO: Implement getCategoryStats()
// For each category, calculate: count, total value, average price
// Return object: { categoryName: { count, totalValue, avgPrice }, ... }
export function getCategoryStats() {
  // TODO: Implementation
}
