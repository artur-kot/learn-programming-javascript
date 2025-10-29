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

export function searchByName(query) {
  const lowerQuery = query.toLowerCase();
  return inventory.filter(product => product.name.toLowerCase().includes(lowerQuery));
}

export function findProductById(id) {
  return inventory.find(product => product.id === id);
}

export function getProductsInPriceRange(minPrice, maxPrice) {
  return inventory
    .filter(product => product.price >= minPrice && product.price <= maxPrice)
    .sort((a, b) => a.price - b.price);
}

export function getLowStockProducts(threshold = 5) {
  return inventory
    .filter(product => product.quantity <= threshold)
    .sort((a, b) => a.quantity - b.quantity);
}

export function getCategoryStats() {
  const stats = {};
  
  inventory.forEach(product => {
    if (!stats[product.category]) {
      stats[product.category] = { count: 0, totalValue: 0, avgPrice: 0 };
    }
    stats[product.category].count += 1;
    stats[product.category].totalValue += product.totalValue();
  });
  
  // Calculate average price per category
  Object.keys(stats).forEach(category => {
    const categoryProducts = inventory.filter(p => p.category === category);
    const avgPrice = categoryProducts.reduce((sum, p) => sum + p.price, 0) / categoryProducts.length;
    stats[category].avgPrice = avgPrice;
  });
  
  return stats;
}
