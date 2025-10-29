/**
 * Cart Model
 *
 * Manages shopping cart state and calculations.
 * Central state management for e-commerce operations.
 */

import { v4 as uuidv4 } from "uuid";
import { CartItem } from "./CartItem.js";

export class Cart {
  /**
   * Create a new Shopping Cart
   *
   * @param {Object} [config] - Configuration options
   * @param {number} [config.taxRate] - Tax rate as decimal (e.g., 0.08 for 8%)
   * @param {number} [config.shippingCost] - Shipping cost in cents
   * @param {number} [config.freeShippingThreshold] - Free shipping above this amount
   */
  constructor(config = {}) {
    this.id = uuidv4();
    this.items = []; // CartItem instances
    this.coupon = null; // Applied coupon
    this.taxRate = config.taxRate || 0.08; // Default 8% tax
    this.shippingCost = config.shippingCost || 999; // Default $9.99 (in cents)
    this.freeShippingThreshold = config.freeShippingThreshold || 10000; // Free shipping over $100
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.notes = ""; // General cart notes
  }

  /**
   * TODO 12: ADD ITEM TO CART
   * Add a product to cart or increase quantity if already present
   *
   * Requirements:
   * - If product already in cart, increase its quantity
   * - If new product, add new CartItem
   * - Handle quantity validation
   * - Update updatedAt timestamp
   * - Return CartItem
   */
  addItem(product, quantity = 1) {
    // TODO: Implement item addition logic
  }

  /**
   * TODO 13: REMOVE ITEM FROM CART
   * Remove a cart item by CartItem ID
   *
   * Requirements:
   * - Find item by ID
   * - Remove from items array
   * - Update updatedAt
   * - Return removed item or null if not found
   */
  removeItem(cartItemId) {
    // TODO: Implement item removal
  }

  /**
   * TODO 14: UPDATE ITEM QUANTITY
   * Update quantity of item in cart
   *
   * Requirements:
   * - Find item by ID
   * - Update its quantity
   * - If quantity becomes 0, remove item
   * - Update updatedAt
   * - Return updated item
   */
  updateItemQuantity(cartItemId, newQuantity) {
    // TODO: Implement quantity update
  }

  /**
   * TODO 15: GET SUBTOTAL
   * Calculate sum of all item totals (before tax/shipping)
   *
   * Requirements:
   * - Sum all CartItem.getTotalPrice()
   * - Return total in cents
   */
  getSubtotal() {
    // TODO: Calculate subtotal
  }

  /**
   * TODO 16: GET APPLICABLE DISCOUNT
   * Calculate discount amount if coupon is applied
   *
   * Requirements:
   * - If no coupon, return 0
   * - If coupon not applicable, return 0
   * - Calculate discount using coupon.calculateDiscount(subtotal)
   * - Return discount amount in cents
   */
  getDiscountAmount() {
    // TODO: Calculate discount
  }

  /**
   * TODO 17: APPLY COUPON
   * Apply a discount coupon to the cart
   *
   * Requirements:
   * - Validate coupon is active
   * - Validate coupon is applicable to cart
   * - If invalid, throw Error with reason
   * - Set this.coupon
   * - Call coupon.apply() to track usage
   * - Update updatedAt
   */
  applyCoupon(coupon) {
    // TODO: Implement coupon application with validation
  }

  /**
   * TODO 18: REMOVE COUPON
   * Remove applied coupon from cart
   *
   * Requirements:
   * - Clear this.coupon
   * - Update updatedAt
   */
  removeCoupon() {
    // TODO: Clear coupon
  }

  /**
   * TODO 19: GET SHIPPING COST
   * Determine shipping cost based on subtotal
   *
   * Requirements:
   * - If subtotal >= freeShippingThreshold, return 0
   * - Otherwise return shippingCost
   */
  getShippingCost() {
    // TODO: Calculate shipping
  }

  /**
   * TODO 20: GET TAX AMOUNT
   * Calculate tax on subtotal minus discount
   *
   * Requirements:
   * - Calculate: (subtotal - discount) * taxRate
   * - Return rounded to cents
   */
  getTaxAmount() {
    // TODO: Calculate tax
  }

  /**
   * TODO 21: GET TOTAL
   * Calculate final total price
   *
   * Requirements:
   * - Calculate: subtotal - discount + tax + shipping
   * - Return total in cents
   */
  getTotal() {
    // TODO: Calculate total
  }

  /**
   * Get cart summary object
   * @returns {Object} Cart summary with all calculations
   */
  getSummary() {
    const subtotal = this.getSubtotal();
    const discount = this.getDiscountAmount();
    const shipping = this.getShippingCost();
    const tax = this.getTaxAmount();
    const total = this.getTotal();

    return {
      itemCount: this.items.length,
      itemQuantity: this.items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      discount,
      discountCode: this.coupon?.code || null,
      shipping,
      tax,
      total,
      formatted: {
        subtotal: this._formatPrice(subtotal),
        discount: this._formatPrice(discount),
        shipping: this._formatPrice(shipping),
        tax: this._formatPrice(tax),
        total: this._formatPrice(total),
      },
    };
  }

  /**
   * Helper to format price
   * @private
   */
  _formatPrice(cents) {
    return `$${(cents / 100).toFixed(2)}`;
  }

  /**
   * Check if cart is empty
   * @returns {boolean} True if no items
   */
  isEmpty() {
    return this.items.length === 0;
  }

  /**
   * Get all items in cart
   * @returns {CartItem[]} Array of cart items
   */
  getItems() {
    return [...this.items]; // Return copy to prevent external mutation
  }

  /**
   * Get specific item by ID
   * @param {string} cartItemId - CartItem ID
   * @returns {CartItem|null} CartItem or null if not found
   */
  getItem(cartItemId) {
    return this.items.find((item) => item.id === cartItemId) || null;
  }

  /**
   * Clear entire cart
   */
  clear() {
    this.items = [];
    this.coupon = null;
    this.updatedAt = new Date();
  }

  /**
   * Export cart as plain object
   * @returns {Object} Cart data
   */
  toJSON() {
    return {
      id: this.id,
      items: this.items.map((item) => item.toJSON()),
      coupon: this.coupon?.toJSON() || null,
      summary: this.getSummary(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * BONUS: Add your own features!
   * - Implement cart save/restore (versioning)
   * - Add abandoned cart recovery
   * - Implement gift card support
   * - Add loyalty points system
   * - Implement suggested items for cross-sell
   */
}
