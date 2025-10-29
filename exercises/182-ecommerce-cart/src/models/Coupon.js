/**
 * Coupon Model
 *
 * Represents a discount coupon that can be applied to a cart.
 * Supports percentage and fixed-amount discounts with various conditions.
 */

import { v4 as uuidv4 } from "uuid";
import { isAfter, isBefore } from "date-fns";

export class Coupon {
  /**
   * Create a new Coupon
   *
   * @param {Object} data - Coupon data
   * @param {string} data.code - Coupon code (e.g., "SUMMER20")
   * @param {string} data.type - "percentage" or "fixed" (amount)
   * @param {number} data.value - Discount value (percentage: 0-100, fixed: amount in cents)
   * @param {string} [data.description] - Coupon description
   * @param {Date} [data.expiresAt] - Expiration date
   * @param {number} [data.minPurchase] - Minimum purchase amount in cents
   * @param {number} [data.maxUses] - Maximum number of uses (null = unlimited)
   * @param {string[]} [data.applicableCategories] - Categories this applies to (null = all)
   */
  constructor(data) {
    this.validate(data);

    this.id = uuidv4();
    this.code = data.code.toUpperCase();
    this.type = data.type; // "percentage" or "fixed"
    this.value = data.value;
    this.description = data.description || "";
    this.expiresAt = data.expiresAt || null;
    this.minPurchase = data.minPurchase || 0;
    this.maxUses = data.maxUses || null; // null = unlimited
    this.applicableCategories = data.applicableCategories || null; // null = all categories
    this.timesUsed = 0;
    this.createdAt = new Date();
  }

  /**
   * TODO 9: VALIDATE COUPON DATA
   * Ensure all coupon data is valid and sensible
   *
   * Requirements:
   * - code must be non-empty string
   * - type must be "percentage" or "fixed"
   * - value must be positive
   * - If percentage: value must be 0-100
   * - If fixed: value must be in valid range
   * - expiresAt if provided must be a Date in future
   * - minPurchase must be non-negative
   * - Throw Error if invalid
   */
  validate(data) {
    // TODO: Implement validation logic
  }

  /**
   * TODO 10: CHECK IF COUPON IS ACTIVE/VALID
   * Determine if coupon can currently be applied
   *
   * Requirements:
   * - Check if expired (expiresAt has passed)
   * - Check if max uses reached
   * - Return true if valid and usable, false otherwise
   */
  isActive() {
    // TODO: Implement active check
  }

  /**
   * TODO 11: CHECK IF COUPON APPLIES TO PURCHASE
   * Determine if coupon meets requirements for a specific purchase
   *
   * Parameters:
   * - cartTotal: total cart amount in cents
   * - categories: array of categories in cart
   *
   * Requirements:
   * - Check if cart meets minimum purchase requirement
   * - Check if cart contains applicable categories (if restricted)
   * - Return true if applicable, false otherwise
   */
  isApplicable(cartTotal, categories = []) {
    // TODO: Implement applicability check
  }

  /**
   * Calculate discount amount for a given total
   * @param {number} cartTotal - Cart total in cents
   * @returns {number} Discount amount in cents
   */
  calculateDiscount(cartTotal) {
    if (this.type === "percentage") {
      return Math.round(cartTotal * (this.value / 100));
    } else {
      // Fixed amount
      return Math.min(this.value, cartTotal); // Don't exceed cart total
    }
  }

  /**
   * Apply coupon (increment usage counter)
   * Only call if you've verified the coupon is valid!
   */
  apply() {
    if (!this.isActive()) {
      throw new Error("Coupon is no longer active");
    }
    this.timesUsed++;
  }

  /**
   * Get coupon display text (e.g., "20% off" or "$5 off")
   * @returns {string} Human-readable discount description
   */
  getDisplayText() {
    if (this.type === "percentage") {
      return `${this.value}% off`;
    } else {
      return `$${(this.value / 100).toFixed(2)} off`;
    }
  }

  /**
   * Get remaining uses
   * @returns {number|string} Number of uses left or "Unlimited"
   */
  getRemainingUses() {
    if (this.maxUses === null) return "Unlimited";
    return Math.max(0, this.maxUses - this.timesUsed);
  }

  /**
   * Check if coupon is nearly expired
   * @param {number} daysWarning - Warn if expires within this many days
   * @returns {boolean} True if expires soon
   */
  isExpiringSoon(daysWarning = 7) {
    if (!this.expiresAt) return false;
    const warningDate = new Date();
    warningDate.setDate(warningDate.getDate() + daysWarning);
    return isBefore(this.expiresAt, warningDate);
  }

  /**
   * Export coupon as plain object
   * @returns {Object} Coupon data
   */
  toJSON() {
    return {
      id: this.id,
      code: this.code,
      type: this.type,
      value: this.value,
      description: this.description,
      displayText: this.getDisplayText(),
      isActive: this.isActive(),
      timesUsed: this.timesUsed,
      remainingUses: this.getRemainingUses(),
      expiresAt: this.expiresAt,
      createdAt: this.createdAt,
    };
  }

  /**
   * BONUS: Add your own features!
   * - Implement tiered discounts (volume-based)
   * - Add first-time customer coupons
   * - Implement referral coupons
   * - Add seasonal coupon bundles
   * - Track coupon analytics (usage, effectiveness)
   */
}
