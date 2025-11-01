/**
 * StorageService
 *
 * Persistence layer for cart and order data.
 * Handles localStorage integration and data serialization.
 */

import { Cart, CartItem, Product } from "../models/index.js";

export class StorageService {
  /**
   * Create StorageService
   *
   * @param {string} [cartKeyPrefix] - localStorage key prefix for carts
   * @param {string} [orderKeyPrefix] - localStorage key prefix for orders
   */
  constructor(
    cartKeyPrefix = "cart_",
    orderKeyPrefix = "order_"
  ) {
    this.cartKeyPrefix = cartKeyPrefix;
    this.orderKeyPrefix = orderKeyPrefix;
  }

  /**
   * TODO 40: SAVE CART TO STORAGE
   * Persist cart to localStorage
   *
   * Requirements:
   * - Serialize cart to JSON
   * - Store with timestamped key
   * - Handle storage quota exceeded
   * - Return success status
   */
  saveCart(cart, cartId = "current") {
    // TODO: Save cart to localStorage
  }

  /**
   * TODO 41: LOAD CART FROM STORAGE
   * Retrieve cart from localStorage
   *
   * Requirements:
   * - Load from localStorage
   * - Deserialize JSON
   * - Validate data structure
   * - Handle missing carts gracefully
   * - Return Cart object or null
   */
  loadCart(cartId = "current") {
    // TODO: Load cart from localStorage
  }

  /**
   * TODO 42: SAVE ORDER
   * Persist completed order to storage
   *
   * Requirements:
   * - Serialize order data
   * - Store with unique order ID
   * - Add timestamp
   * - Handle storage limits
   */
  saveOrder(order) {
    // TODO: Save order to localStorage
  }

  /**
   * TODO 43: GET ORDER HISTORY
   * Retrieve all saved orders
   *
   * Requirements:
   * - Load all orders from localStorage
   * - Sort by timestamp (newest first)
   * - Return array of orders
   */
  getOrderHistory() {
    // TODO: Get all orders
  }

  /**
   * TODO 44: DELETE CART
   * Remove saved cart from storage
   *
   * Requirements:
   * - Remove from localStorage
   * - Return success status
   */
  deleteCart(cartId = "current") {
    // TODO: Delete cart
  }

  /**
   * Get storage usage
   * @returns {Object} Storage information
   */
  getStorageInfo() {
    let carts = 0;
    let orders = 0;
    let totalSize = 0;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);

      if (key.startsWith(this.cartKeyPrefix)) {
        carts++;
        totalSize += value.length;
      }
      if (key.startsWith(this.orderKeyPrefix)) {
        orders++;
        totalSize += value.length;
      }
    }

    return {
      savedCarts: carts,
      savedOrders: orders,
      totalSize: totalSize,
      maxSize: 5 * 1024 * 1024, // 5MB limit for most browsers
      availableSpace: 5 * 1024 * 1024 - totalSize,
      percentageUsed: (totalSize / (5 * 1024 * 1024)) * 100,
    };
  }

  /**
   * Clear all stored data
   */
  clearAll() {
    const keysToDelete = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        key.startsWith(this.cartKeyPrefix) ||
        key.startsWith(this.orderKeyPrefix)
      ) {
        keysToDelete.push(key);
      }
    }
    keysToDelete.forEach((key) => localStorage.removeItem(key));
  }

  /**
   * BONUS: Add your own features!
   * - Implement IndexedDB for larger storage
   * - Add encryption for sensitive data
   * - Implement cloud sync (Firebase, etc.)
   * - Add data export/import (CSV, JSON)
   * - Implement automatic backups
   */
}
