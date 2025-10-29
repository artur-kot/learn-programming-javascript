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

export function cloneProduct(product) {
  return { ...product };
}

export function updateProductPrice(product, newPrice) {
  return { ...product, price: newPrice };
}

export function mergeProductUpdates(product, updates) {
  return { ...product, ...updates };
}

export function addProductWithDefaults(name, price, quantity, category = 'Uncategorized') {
  const nextId = inventory.length > 0 ? Math.max(...inventory.map(p => p.id)) + 1 : 1;
  const product = { id: nextId, name, price, quantity, category };
  inventory.push(product);
  return product;
}
