/**
 * CartItem Model
 *
 * Represents a product in the shopping cart.
 * Tracks quantity, price snapshot, and item-specific operations.
 */

import { v4 as uuidv4 } from "uuid";

export class CartItem {
  /**
   * Create a new CartItem
   *
   * @param {Product} product - Product instance
   * @param {number} quantity - Quantity to add (must be positive integer)
   */
  constructor(product, quantity = 1) {
    this.validate(product, quantity);

    this.id = uuidv4();
    this.product = product;
    this.quantity = quantity;
    this.pricePerUnit = product.price; // Snapshot price at time of adding
    this.addedAt = new Date();
    this.notes = ""; // Customer notes about this item
  }

  /**
   * TODO 5: VALIDATE CART ITEM
   * Ensure product and quantity are valid
   *
   * Requirements:
   * - product must be a Product instance with required properties
   * - quantity must be a positive integer
   * - Throw Error if validation fails
   */
  validate(product, quantity) {
    // TODO: Implement validation
    // Check if product is valid
    // Check if quantity is positive integer
  }

  /**
   * Get item's total price (quantity × price per unit)
   * @returns {number} Total price in cents
   */
  getTotalPrice() {
    return this.quantity * this.pricePerUnit;
  }

  /**
   * Get formatted total price for display
   * @returns {string} Formatted price like "$39.98"
   */
  getFormattedTotal() {
    return `$${(this.getTotalPrice() / 100).toFixed(2)}`;
  }

  /**
   * TODO 6: UPDATE QUANTITY
   * Change the quantity of this item
   *
   * Requirements:
   * - New quantity must be positive integer
   * - If quantity becomes 0, should caller remove item? (just validate here)
   * - Throw error if quantity is invalid
   * - Return new quantity
   */
  updateQuantity(newQuantity) {
    // TODO: Implement quantity update with validation
  }

  /**
   * TODO 7: INCREMENT QUANTITY
   * Add one more of this item
   *
   * Requirements:
   * - Call updateQuantity or implement directly
   * - Return new quantity
   */
  increment() {
    // TODO: Increase quantity by 1
  }

  /**
   * TODO 8: DECREMENT QUANTITY
   * Remove one of this item (but don't go below 0)
   *
   * Requirements:
   * - Decrease quantity by 1
   * - Don't go below 0
   * - Return new quantity (may be 0)
   */
  decrement() {
    // TODO: Decrease quantity by 1, but not below 0
  }

  /**
   * Add customer notes to item (e.g., "Gift wrap this", "Rush shipping")
   * @param {string} notes - Customer notes
   */
  addNotes(notes) {
    if (typeof notes !== "string") {
      throw new Error("Notes must be a string");
    }
    this.notes = notes.trim();
  }

  /**
   * Get price comparison (current product price vs. cart item price)
   * @returns {Object} { original, current, difference, percentChange }
   */
  getPriceComparison() {
    const original = this.pricePerUnit;
    const current = this.product.price;
    const difference = current - original;
    const percentChange = (difference / original) * 100;

    return {
      original,
      current,
      difference,
      percentChange: Math.round(percentChange * 100) / 100,
      priceChanged: difference !== 0,
    };
  }

  /**
   * Export item as plain object
   * @returns {Object} CartItem data
   */
  toJSON() {
    return {
      id: this.id,
      productId: this.product.id,
      productName: this.product.name,
      quantity: this.quantity,
      pricePerUnit: this.pricePerUnit,
      totalPrice: this.getTotalPrice(),
      notes: this.notes,
      addedAt: this.addedAt,
    };
  }

  /**
   * BONUS: Add your own features!
   * - Implement item-level discounts
   * - Add warranty options
   * - Add gift wrapping option
   * - Implement product bundles
   */
}
