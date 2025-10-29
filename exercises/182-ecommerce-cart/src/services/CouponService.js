/**
 * CouponService
 *
 * Business logic for discount coupon management.
 * Handles coupon validation, application, and tracking.
 */

import { Coupon } from "../models/index.js";

export class CouponService {
  /**
   * Create CouponService
   *
   * @param {Coupon[]} [initialCoupons] - Initial coupon catalog
   */
  constructor(initialCoupons = []) {
    this.coupons = initialCoupons;
  }

  /**
   * Create and register a new coupon
   * @param {Object} couponData - Coupon data
   * @returns {Coupon} Created coupon
   */
  createCoupon(couponData) {
    const coupon = new Coupon(couponData);
    this.coupons.push(coupon);
    return coupon;
  }

  /**
   * TODO 28: GET COUPON BY CODE
   * Find coupon by its code
   *
   * Requirements:
   * - Search case-insensitive
   * - Return Coupon or null if not found
   */
  getCouponByCode(code) {
    // TODO: Find coupon by code (case-insensitive)
  }

  /**
   * TODO 29: VALIDATE COUPON CODE
   * Check if a coupon code is valid and can be applied
   *
   * Requirements:
   * - Check if code exists
   * - Check if coupon is active
   * - Return validation result object: { valid, coupon, reason }
   * - Include error reason if not valid
   */
  validateCouponCode(code) {
    // TODO: Implement coupon validation
    // Return { valid: boolean, coupon: Coupon|null, reason: string }
  }

  /**
   * TODO 30: GET AVAILABLE COUPONS
   * Get all currently active coupons
   *
   * Requirements:
   * - Return only active coupons (not expired, not maxed out)
   * - Sort by expiration date (soonest first)
   */
  getAvailableCoupons() {
    // TODO: Get active coupons
  }

  /**
   * TODO 31: GET EXPIRING SOON COUPONS
   * Get coupons that expire soon (for alerts/notifications)
   *
   * Requirements:
   * - Check which coupons expire within specified days
   * - Default to 7 days
   * - Sort by expiration date
   */
  getExpiringSoonCoupons(days = 7) {
    // TODO: Get expiring coupons
  }

  /**
   * TODO 32: DEACTIVATE COUPON
   * Manually deactivate a coupon (set very old expiration)
   *
   * Requirements:
   * - Find coupon by code
   * - Set expiresAt to now (or past)
   * - Return updated coupon
   */
  deactivateCoupon(code) {
    // TODO: Deactivate coupon
  }

  /**
   * Get coupon statistics
   * @returns {Object} Statistics object
   */
  getStatistics() {
    const activeCoupons = this.coupons.filter((c) => c.isActive());
    const percentageCoupons = this.coupons.filter((c) => c.type === "percentage");
    const fixedCoupons = this.coupons.filter((c) => c.type === "fixed");

    return {
      totalCoupons: this.coupons.length,
      activeCoupons: activeCoupons.length,
      expiredCoupons: this.coupons.length - activeCoupons.length,
      percentageCoupons: percentageCoupons.length,
      fixedCoupons: fixedCoupons.length,
      totalUsages: this.coupons.reduce((sum, c) => sum + c.timesUsed, 0),
      mostUsedCoupon: this._getMostUsedCoupon(),
    };
  }

  /**
   * Helper: Find most used coupon
   * @private
   */
  _getMostUsedCoupon() {
    if (this.coupons.length === 0) return null;
    return this.coupons.reduce((max, coupon) =>
      coupon.timesUsed > max.timesUsed ? coupon : max
    );
  }

  /**
   * BONUS: Add your own features!
   * - Implement bulk coupon creation
   * - Add coupon performance analytics
   * - Implement coupon scheduling (activate/deactivate at specific times)
   * - Add A/B testing for coupon value
   * - Implement seasonal coupon templates
   */
}
