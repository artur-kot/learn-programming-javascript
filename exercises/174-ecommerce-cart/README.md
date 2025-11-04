# Exercise 182: E-commerce Cart System - Professional Full-Stack Project

## Overview

Build a **professional-grade e-commerce cart system** using real-world patterns, architecture, and popular npm packages. This exercise teaches you how to structure a scalable JavaScript project with:

- ✅ Clean architecture with separation of concerns
- ✅ Service-oriented business logic layer
- ✅ Model-driven data structures
- ✅ Popular npm packages (uuid, lodash, date-fns)
- ✅ localStorage persistence
- ✅ Comprehensive test suite
- ✅ Production-like folder structure

## Learning Objectives

By completing this exercise, you'll learn:

1. **Project Architecture** - How to structure large JavaScript projects
2. **Design Patterns** - Services, models, and dependency injection
3. **npm Ecosystem** - Using popular packages in real projects
4. **State Management** - Managing complex application state
5. **Persistence** - Saving and restoring application data
6. **Testing** - Comprehensive unit and integration tests
7. **Real-World Development** - How professional teams organize code

## Project Structure

```
182-ecommerce-cart/
├── src/
│   ├── models/                 # Data models
│   │   ├── Product.js          # Product model (4 TODOs)
│   │   ├── CartItem.js         # Cart item model (4 TODOs)
│   │   ├── Coupon.js           # Discount coupon model (3 TODOs)
│   │   ├── Cart.js             # Shopping cart model (10 TODOs)
│   │   └── index.js            # Models export
│   ├── services/               # Business logic layer
│   │   ├── ProductService.js   # Product operations (6 TODOs)
│   │   ├── CouponService.js    # Coupon operations (5 TODOs)
│   │   ├── CartService.js      # Cart operations (7 TODOs)
│   │   ├── StorageService.js   # Persistence layer (5 TODOs)
│   │   └── index.js            # Services export
│   ├── components/             # UI components (stub for exercises 183-186)
│   ├── utils/
│   │   ├── helpers.js          # Helper functions (pre-filled)
│   │   └── validators.js       # Validation utilities (pre-filled)
│   └── index.js                # Main entry point (1 TODO)
├── tests/
│   └── cart.test.js            # Test suite (30+ test stubs)
├── dist/                       # Build output directory
├── package.json                # Dependencies & scripts
├── exercise.json               # Exercise metadata
└── README.md                   # This file
```

## 45 TODOs to Complete

### Models (21 TODOs)

**Product.js (4 TODOs)**
1. Validate product data
2. Check if product is in stock
3. Reduce stock when purchased
4. Add product reviews

**CartItem.js (4 TODOs)**
5. Validate cart item data
6. Update item quantity
7. Increment quantity
8. Decrement quantity

**Coupon.js (3 TODOs)**
9. Validate coupon data
10. Check if coupon is active
11. Check if coupon applies to cart

**Cart.js (10 TODOs)**
12. Add item to cart
13. Remove item from cart
14. Update item quantity in cart
15. Calculate subtotal
16. Calculate discount amount
17. Apply coupon to cart
18. Remove coupon from cart
19. Calculate shipping cost
20. Calculate tax amount
21. Calculate final total

### Services (24 TODOs)

**ProductService.js (6 TODOs)**
22. Filter products by category
23. Search products by name/description
24. Get in-stock products
25. Get products by price range
26. Get top-rated products
27. Get similar products

**CouponService.js (5 TODOs)**
28. Get coupon by code
29. Validate coupon code
30. Get available coupons
31. Get expiring soon coupons
32. Deactivate coupon

**CartService.js (7 TODOs)**
33. Add product to cart (with validation)
34. Remove item from cart
35. Update item quantity
36. Apply coupon code
37. Remove coupon
38. Checkout process
39. Restore cart from storage

**StorageService.js (5 TODOs)**
40. Save cart to localStorage
41. Load cart from localStorage
42. Save order to storage
43. Get order history
44. Delete cart

**index.js (1 TODO)**
45. Initialize sample data (products and coupons)

## Key Concepts

### 1. Models (Data Layer)

Models represent entities in your system. Each model encapsulates data and behavior related to that entity.

```javascript
// Product model - represents an item in the store
const laptop = new Product({
  name: "MacBook Pro",
  price: 199999, // in cents
  description: "Professional laptop",
  category: "Electronics",
  stock: 15,
});

// CartItem model - represents item in shopping cart
const cartItem = new CartItem(laptop, 2); // Add 2 laptops
```

### 2. Services (Business Logic Layer)

Services implement business logic and orchestrate between models. They're testable and reusable.

```javascript
// ProductService - handles product operations
const products = productService.searchProducts("laptop");
const inStock = productService.getInStockProducts();

// CouponService - handles discount operations
const coupon = couponService.getCouponByCode("SAVE20");

// CartService - orchestrates cart, product, and coupon services
cartService.addProductToCart(productId, quantity);
cartService.applyCouponCode("SAVE20");
```

### 3. Separation of Concerns

Each layer has clear responsibilities:
- **Models**: Data structure and basic validation
- **Services**: Business logic and operations
- **Components**: UI layer (implemented in exercises 183-186)
- **Utilities**: Helper functions and validators

### 4. Dependencies

Services depend on other services, but not the other way around:

```
UI Components
     ↓
  CartService ← orchestrator
    ↙ ↓ ↘
ProductService  CouponService  StorageService
    ↓              ↓              ↓
  Models        Models        localStorage
```

### 5. npm Packages Used

- **uuid** - Generate unique IDs for products, carts, items
- **lodash-es** - Utility functions (deep clone, debounce, grouping)
- **date-fns** - Date manipulation and formatting
- **jest** - Testing framework

## Implementation Guide

### Step 1: Complete Product Model

Start with the simplest model:

```javascript
// TODO 1: Validate product data
validate(data) {
  if (typeof data.name !== 'string' || data.name.trim() === '') {
    throw new Error('Product name is required');
  }
  if (typeof data.price !== 'number' || data.price <= 0) {
    throw new Error('Product price must be positive');
  }
  // ... validate other fields
}

// TODO 2: Check if in stock
isInStock() {
  return this.stock > 0;
}

// TODO 3: Reduce stock
reduceStock(quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error('Quantity must be positive integer');
  }
  if (quantity > this.stock) {
    throw new Error(`Insufficient stock. Available: ${this.stock}`);
  }
  this.stock -= quantity;
  return this.stock;
}
```

### Step 2: Complete CartItem Model

```javascript
// TODO 5: Validate cart item
validate(product, quantity) {
  if (!product || !product.id) {
    throw new Error('Invalid product');
  }
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error('Quantity must be positive integer');
  }
}

// TODO 6: Update quantity
updateQuantity(newQuantity) {
  this.validate(this.product, newQuantity);
  this.quantity = newQuantity;
  return this.quantity;
}
```

### Step 3: Complete Coupon Model

```javascript
// TODO 9: Validate coupon
validate(data) {
  if (!data.code || typeof data.code !== 'string') {
    throw new Error('Coupon code required');
  }
  if (!['percentage', 'fixed'].includes(data.type)) {
    throw new Error('Type must be "percentage" or "fixed"');
  }
  if (data.type === 'percentage' && (data.value < 0 || data.value > 100)) {
    throw new Error('Percentage must be 0-100');
  }
}

// TODO 10: Check if active
isActive() {
  if (this.expiresAt && new Date() > this.expiresAt) {
    return false; // Expired
  }
  if (this.maxUses !== null && this.timesUsed >= this.maxUses) {
    return false; // Max uses reached
  }
  return true;
}
```

### Step 4: Complete Cart Model

This is the most complex model with 10 TODOs:

```javascript
// TODO 12: Add item to cart
addItem(product, quantity = 1) {
  // Check if product already in cart
  const existingItem = this.items.find(item => item.product.id === product.id);
  
  if (existingItem) {
    // Increase quantity
    existingItem.updateQuantity(existingItem.quantity + quantity);
    return existingItem;
  }
  
  // Add new item
  const newItem = new CartItem(product, quantity);
  this.items.push(newItem);
  this.updatedAt = new Date();
  return newItem;
}

// TODO 15: Calculate subtotal
getSubtotal() {
  return this.items.reduce((sum, item) => sum + item.getTotalPrice(), 0);
}

// TODO 21: Calculate total
getTotal() {
  const subtotal = this.getSubtotal();
  const discount = this.getDiscountAmount();
  const tax = this.getTaxAmount();
  const shipping = this.getShippingCost();
  return subtotal - discount + tax + shipping;
}
```

### Step 5: Complete Services

Services coordinate models and implement business logic:

```javascript
// ProductService - TODO 22: Filter by category
getProductsByCategory(category) {
  return this.products.filter(p => 
    p.category.toLowerCase() === category.toLowerCase()
  );
}

// CouponService - TODO 28: Get coupon by code
getCouponByCode(code) {
  return this.coupons.find(c => 
    c.code.toUpperCase() === code.toUpperCase()
  ) || null;
}

// CartService - TODO 33: Add product to cart
addProductToCart(productId, quantity = 1) {
  const product = this.productService.getProduct(productId);
  if (!product) {
    throw new Error('Product not found');
  }
  if (!product.isInStock()) {
    throw new Error('Product out of stock');
  }
  
  const item = this.cart.addItem(product, quantity);
  this.storageService.saveCart(this.cart);
  return item;
}
```

### Step 6: Complete StorageService

Handle localStorage persistence:

```javascript
// TODO 40: Save cart
saveCart(cart, cartId = "current") {
  try {
    const data = JSON.stringify(cart);
    localStorage.setItem(this.cartKeyPrefix + cartId, data);
    return true;
  } catch (e) {
    console.error('Storage quota exceeded', e);
    return false;
  }
}

// TODO 41: Load cart
loadCart(cartId = "current") {
  const data = localStorage.getItem(this.cartKeyPrefix + cartId);
  if (!data) return null;
  
  const cartData = JSON.parse(data);
  // Reconstruct Cart object from JSON
  const cart = new Cart();
  // ... restore items, coupon, etc.
  return cart;
}
```

### Step 7: Initialize Sample Data

Create realistic sample data:

```javascript
// TODO 45: Initialize sample data
const laptop = new Product({
  name: "MacBook Pro 16\"",
  price: 199999,
  description: "Professional laptop with M2 chip",
  category: "Electronics",
  stock: 10,
  image: "macbook.jpg"
});
productService.addProduct(laptop);

const coupon = new Coupon({
  code: "WELCOME20",
  type: "percentage",
  value: 20,
  description: "Welcome 20% off",
  minPurchase: 5000
});
couponService.createCoupon(coupon);
```

## Running Tests

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests in watch mode (re-run on file changes)
npm run test:watch

# Run with coverage report
npm run test:coverage
```

## Real-World Features Implemented

1. **Product Management**
   - Stock tracking
   - Reviews and ratings
   - Category organization
   - Price management

2. **Shopping Cart**
   - Add/remove items
   - Quantity management
   - Price snapshots (item prices locked when added)
   - State persistence

3. **Discounts**
   - Percentage discounts
   - Fixed amount discounts
   - Usage limits
   - Expiration dates
   - Minimum purchase requirements

4. **Order Management**
   - Tax calculation
   - Shipping costs
   - Free shipping thresholds
   - Order history

## Bonus Features to Add (After Completing TODOs)

1. **Product Variants**
   - Size, color, configuration options
   - Different prices for variants
   - Variant-specific stock

2. **Gift Cards**
   - Treat as special coupons
   - Fixed amount discounts
   - Partial usage tracking

3. **Loyalty Points**
   - Earn points per purchase
   - Redeem points for discounts
   - Tier-based multipliers

4. **Wishlists**
   - Save items for later
   - Price drop notifications
   - Share wishlists

5. **Abandoned Cart Recovery**
   - Email reminders
   - Time-based recovery
   - Special recovery coupons

6. **Product Recommendations**
   - Similar items
   - Frequently bought together
   - Trending items
   - Personalized recommendations

7. **Advanced Filtering**
   - Multiple category selection
   - Brand filtering
   - Price range slider
   - Rating filtering

8. **Analytics**
   - Track popular products
   - Monitor coupon effectiveness
   - Analyze customer behavior
   - Revenue reports

## Key Takeaways

✅ How to structure large JavaScript projects
✅ Service-oriented architecture benefits
✅ Separation of concerns principle
✅ npm package ecosystem
✅ State management patterns
✅ localStorage persistence
✅ Comprehensive testing practices
✅ Real-world development patterns

## Resources

- [JavaScript Design Patterns](https://www.patterns.dev/posts/classic-design-patterns/)
- [npm Packages](https://www.npmjs.com/)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Jest Testing Framework](https://jestjs.io/)

## Success Criteria

✅ All 45 TODOs completed
✅ All tests passing
✅ No console errors
✅ Sample data initialized
✅ Cart operations work correctly
✅ Totals calculated accurately
✅ Coupons apply correctly
✅ Data persists in localStorage
✅ Code follows separation of concerns

Have fun building a professional e-commerce system! 🛒✨
