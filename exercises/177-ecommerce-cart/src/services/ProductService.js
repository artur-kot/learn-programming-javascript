/**
 * ProductService
 *
 * Business logic for product operations.
 * Handles product management, filtering, searching, and recommendations.
 */

import { Product } from "../models/index.js";

export class ProductService {
  /**
   * Create ProductService
   *
   * @param {Product[]} [initialProducts] - Initial product catalog
   */
  constructor(initialProducts = []) {
    this.products = initialProducts;
  }

  /**
   * Add a new product to the catalog
   * @param {Product} product - Product instance
   * @returns {Product} Added product
   */
  addProduct(product) {
    if (!(product instanceof Product)) {
      throw new Error("Product must be an instance of Product class");
    }
    this.products.push(product);
    return product;
  }

  /**
   * Get product by ID
   * @param {string} id - Product ID
   * @returns {Product|null} Product or null if not found
   */
  getProduct(id) {
    return this.products.find((p) => p.id === id) || null;
  }

  /**
   * Get product by SKU
   * @param {string} sku - Stock keeping unit
   * @returns {Product|null} Product or null if not found
   */
  getProductBySku(sku) {
    return this.products.find((p) => p.sku === sku) || null;
  }

  /**
   * TODO 22: FILTER PRODUCTS BY CATEGORY
   * Get all products in a specific category
   *
   * Requirements:
   * - Return array of products matching category
   * - Case-insensitive comparison
   * - Return empty array if no matches
   */
  getProductsByCategory(category) {
    // TODO: Implement category filtering
  }

  /**
   * TODO 23: SEARCH PRODUCTS
   * Search products by name or description
   *
   * Requirements:
   * - Search term should match name or description
   * - Case-insensitive
   * - Return matching products
   * - Return empty array if no matches
   */
  searchProducts(searchTerm) {
    // TODO: Implement search functionality
  }

  /**
   * TODO 24: GET IN-STOCK PRODUCTS
   * Get all currently available products
   *
   * Requirements:
   * - Return products where stock > 0
   * - Filter out out-of-stock items
   */
  getInStockProducts() {
    // TODO: Filter in-stock products
  }

  /**
   * TODO 25: GET PRODUCTS BY PRICE RANGE
   * Filter products within a price range
   *
   * Requirements:
   * - Filter by minPrice and maxPrice (in cents)
   * - Include products at exact boundaries
   * - Return sorted by price (ascending)
   */
  getProductsByPriceRange(minPrice, maxPrice) {
    // TODO: Implement price range filtering
  }

  /**
   * TODO 26: GET TOP-RATED PRODUCTS
   * Get highest-rated products
   *
   * Requirements:
   * - Sort by average rating (highest first)
   * - Optionally limit number of results
   * - Only include products with reviews
   */
  getTopRatedProducts(limit = 10) {
    // TODO: Get top-rated products
  }

  /**
   * TODO 27: GET SIMILAR PRODUCTS
   * Find products similar to a given product
   *
   * Requirements:
   * - Find products in same category
   * - Exclude the given product
   * - Optionally limit results
   */
  getSimilarProducts(productId, limit = 5) {
    // TODO: Find similar products
  }

  /**
   * Get all categories in catalog
   * @returns {string[]} Array of unique categories
   */
  getCategories() {
    const categories = new Set(this.products.map((p) => p.category));
    return Array.from(categories).sort();
  }

  /**
   * Get product statistics
   * @returns {Object} Statistics object
   */
  getStatistics() {
    return {
      totalProducts: this.products.length,
      inStockCount: this.products.filter((p) => p.isInStock()).length,
      outOfStockCount: this.products.filter((p) => !p.isInStock()).length,
      averagePrice: Math.round(
        this.products.reduce((sum, p) => sum + p.price, 0) / this.products.length
      ),
      categories: this.getCategories().length,
      totalReviews: this.products.reduce((sum, p) => sum + p.reviews.length, 0),
    };
  }

  /**
   * BONUS: Add your own features!
   * - Implement sorting (by price, name, rating, etc.)
   * - Add product recommendations (ML-based)
   * - Implement product filtering with multiple criteria
   * - Add trending products tracking
   * - Implement inventory management
   */
}
