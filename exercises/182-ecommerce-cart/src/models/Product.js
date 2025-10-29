/**
 * Product Model
 *
 * Represents a product in the e-commerce store.
 * Contains product information and validation logic.
 */

import { v4 as uuidv4 } from "uuid";

export class Product {
  /**
   * Create a new Product
   *
   * @param {Object} data - Product data
   * @param {string} data.name - Product name
   * @param {number} data.price - Product price (in cents)
   * @param {string} data.description - Product description
   * @param {string} data.category - Product category
   * @param {number} data.stock - Available quantity
   * @param {string} [data.image] - Product image URL
   * @param {string} [data.sku] - Stock keeping unit (unique identifier)
   */
  constructor(data) {
    this.validate(data);

    this.id = uuidv4();
    this.name = data.name;
    this.price = Math.round(data.price); // Store in cents
    this.description = data.description;
    this.category = data.category;
    this.stock = data.stock;
    this.image = data.image || "";
    this.sku = data.sku || `SKU-${this.id.substring(0, 8).toUpperCase()}`;
    this.createdAt = new Date();
    this.rating = 0;
    this.reviews = [];
  }

  /**
   * TODO 1: VALIDATE PRODUCT DATA
   * Implement validation to ensure all required fields are present and valid
   *
   * Requirements:
   * - name must be a non-empty string
   * - price must be a positive number
   * - description must be a non-empty string
   * - category must be a non-empty string
   * - stock must be a non-negative integer
   * - Throw Error with descriptive message if validation fails
   */
  validate(data) {
    // TODO: Implement validation logic
    // Throw new Error('Product name is required') if invalid
    // Throw new Error('Product price must be positive') if invalid
    // etc.
  }

  /**
   * Get formatted price (currency display)
   * @returns {string} Formatted price like "$19.99"
   */
  getFormattedPrice() {
    return `$${(this.price / 100).toFixed(2)}`;
  }

  /**
   * TODO 2: CHECK IF PRODUCT IS IN STOCK
   * Implement method to determine if product has available quantity
   *
   * Requirements:
   * - Return true if stock > 0
   * - Return false if stock <= 0
   */
  isInStock() {
    // TODO: Implement stock check
  }

  /**
   * TODO 3: REDUCE STOCK
   * Decrease available stock when item is purchased
   *
   * Requirements:
   * - Decrease stock by quantity
   * - Throw error if quantity is invalid (negative or non-integer)
   * - Throw error if insufficient stock
   * - Return new stock level
   */
  reduceStock(quantity) {
    // TODO: Implement stock reduction with validation
  }

  /**
   * TODO 4: ADD PRODUCT REVIEW
   * Add a customer review to the product
   *
   * Requirements:
   * - Review object: { rating (1-5), comment, author }
   * - Validate rating is between 1-5
   * - Add review to this.reviews array
   * - Update average rating
   * - Return review object with id and timestamp
   */
  addReview(rating, comment, author) {
    // TODO: Implement review addition with validation
  }

  /**
   * Get average rating from all reviews
   * @returns {number} Average rating rounded to 2 decimals
   */
  getAverageRating() {
    if (this.reviews.length === 0) return 0;
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / this.reviews.length) * 100) / 100;
  }

  /**
   * Export product as plain object (for JSON serialization)
   * @returns {Object} Product data object
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      description: this.description,
      category: this.category,
      stock: this.stock,
      image: this.image,
      sku: this.sku,
      rating: this.getAverageRating(),
      reviewCount: this.reviews.length,
      createdAt: this.createdAt,
    };
  }

  /**
   * BONUS: Add your own features!
   * - Implement discounts/sales (sale price, discount percentage)
   * - Add tags/attributes (size, color, etc.)
   * - Implement rating tiers (verified purchase, etc.)
   * - Add product variants (different options)
   */
}
