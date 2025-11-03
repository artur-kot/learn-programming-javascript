/**
 * E-commerce Cart System - Main Entry Point
 *
 * Initializes all services and makes them available globally.
 * This is the main file that brings all components together.
 */

import { Product, Cart, CartItem, Coupon } from "./models/index.js";
import {
  ProductService,
  CouponService,
  CartService,
  StorageService,
} from "./services/index.js";

// ============================================================================
// INITIALIZE SERVICES
// ============================================================================

// Create storage service first (for persistence)
const storageService = new StorageService();

// Create product service with initial catalog
const productService = new ProductService();

// Create coupon service
const couponService = new CouponService();

// Create cart service (orchestrator)
const cartService = new CartService(
  productService,
  couponService,
  storageService
);

// ============================================================================
// TODO 45: INITIALIZE SAMPLE DATA
// Populate the catalog with sample products and coupons
//
// Requirements:
// - Create 10+ products across different categories
// - Create 5+ coupons with different types and conditions
// - Add products to productService
// - Add coupons to couponService
// - Make data available for UI
//
// This is where sample data setup goes - helpful for development and testing
// ============================================================================

// TODO: Create sample products
// Example:
// const laptop = new Product({
//   name: "Laptop Pro",
//   price: 99999, // $999.99 in cents
//   description: "High-performance laptop",
//   category: "Electronics",
//   stock: 15,
//   image: "laptop.jpg"
// });
// productService.addProduct(laptop);

// TODO: Create sample coupons
// Example:
// const summerCoupon = new Coupon({
//   code: "SUMMER20",
//   type: "percentage",
//   value: 20,
//   description: "20% off all items",
//   minPurchase: 5000, // Min $50
// });
// couponService.createCoupon(summerCoupon);

// ============================================================================
// EXPORT SERVICES FOR USE IN OTHER MODULES
// ============================================================================

export {
  // Models
  Product,
  Cart,
  CartItem,
  Coupon,
  // Services
  productService,
  couponService,
  cartService,
  storageService,
};

// ============================================================================
// BROWSER GLOBAL ACCESS (for development/debugging)
// ============================================================================

if (typeof window !== "undefined") {
  window.app = {
    productService,
    couponService,
    cartService,
    storageService,
    models: { Product, Cart, CartItem, Coupon },
  };
  console.log(
    "✅ E-commerce app initialized. Access via window.app or console"
  );
  console.log("Services available:", {
    productService,
    couponService,
    cartService,
    storageService,
  });
}

// ============================================================================
// FOR NODE.JS ENVIRONMENTS (testing)
// ============================================================================

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    Product,
    Cart,
    CartItem,
    Coupon,
    productService,
    couponService,
    cartService,
    storageService,
  };
}
