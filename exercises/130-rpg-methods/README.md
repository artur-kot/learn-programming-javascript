# Exercise 130: RPG Character System - Methods and Properties

Learn how to add **methods to classes** and implement game mechanics that modify character state.

## Overview

In this exercise, you'll add instance methods to your RPG character classes. Methods allow you to:
- Define behavior for objects
- Encapsulate game logic
- Modify and track state
- Create interactive game systems

Methods are functions defined inside a class that have access to `this` and can operate on instance data.

### What You'll Learn

- **Instance Methods**: Functions defined in classes
- **Using `this` in Methods**: Accessing and modifying instance properties
- **State Management**: Controlling how properties change through methods
- **Game Mechanics**: Implementing attack, defense, healing, and experience systems
- **Method Chaining**: Returning `this` for fluent API design

## Key Concepts

### Instance Methods

An **instance method** is a function defined in a class that operates on a specific instance. Use `this` to access that instance's properties.

```javascript
class Character {
  constructor(name, health) {
    this.name = name;
    this.health = health;
  }

  // Instance method
  takeDamage(amount) {
    this.health -= amount;
    return this; // Allow chaining
  }

  // Another instance method
  heal(amount) {
    this.health += amount;
    return this;
  }
}

const hero = new Character('Aldric', 100);
hero.takeDamage(20); // health becomes 80
hero.heal(10);       // health becomes 90
```

### `this` Context

In instance methods, `this` always refers to the specific object:

```javascript
class Character {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
}

const hero1 = new Character('Aldric');
const hero2 = new Character('Merlin');

hero1.greet(); // "Hello, I'm Aldric"
hero2.greet(); // "Hello, I'm Merlin"
// Each call uses the correct 'this'
```

### Method Chaining

Return `this` from methods to allow chaining multiple operations:

```javascript
class Character {
  constructor(name, health) {
    this.name = name;
    this.health = health;
  }

  takeDamage(amount) {
    this.health -= amount;
    return this; // Enable chaining
  }

  heal(amount) {
    this.health += amount;
    return this;
  }

  rest() {
    console.log(`${this.name} rests...`);
    return this;
  }
}

const hero = new Character('Aldric', 100);

// Chain multiple methods
hero.takeDamage(30).heal(20).rest();

// Equivalent to:
// hero.takeDamage(30);
// hero.heal(20);
// hero.rest();
```

### Methods vs Properties

- **Property**: A value stored on an object
- **Method**: A function stored on an object that operates on that object

```javascript
class Character {
  constructor(name) {
    this.name = name;        // Property
    this.health = 100;       // Property
  }

  takeDamage(amount) {       // Method
    this.health -= amount;
  }

  getInfo() {                // Method
    return `${this.name}: ${this.health} HP`;
  }
}
```

### State Management

Methods are ideal for controlling how state changes:

```javascript
class BankAccount {
  constructor(initialBalance) {
    this.balance = initialBalance;
  }

  // Validate before withdrawing
  withdraw(amount) {
    if (amount > this.balance) {
      console.log('Insufficient funds');
      return false;
    }
    this.balance -= amount;
    return true;
  }

  // Always safe to deposit
  deposit(amount) {
    this.balance += amount;
    return this;
  }
}
```

## Exercise Tasks

### Task 1: Implement Character Methods

Add these methods to your `Character` class:

#### `takeDamage(amount)`
- Reduces health by the given amount
- Sets `isAlive = false` if health <= 0
- Returns `this` for chaining

```javascript
const hero = new Character('Aldric', 100);
hero.takeDamage(30);
console.log(hero.health); // 70
```

#### `heal(amount)`
- Increases health by the given amount
- Cannot exceed initial health
- Returns `this` for chaining

```javascript
const hero = new Character('Aldric', 100);
hero.takeDamage(40);
hero.heal(20);
console.log(hero.health); // 80
```

#### `useMana(amount)`
- Reduces mana by the amount if available
- Returns `true` if successful, `false` if insufficient mana
- Does NOT return `this` for chaining

```javascript
const hero = new Character('Aldric', 100, 50);
const success = hero.useMana(20);
console.log(success); // true
console.log(hero.mana); // 30
```

#### `restoreMana(amount)`
- Increases mana by the given amount
- Returns `this` for chaining

```javascript
const hero = new Character('Aldric', 100, 30);
hero.restoreMana(20);
console.log(hero.mana); // 50
```

#### `gainExperience(amount)`
- Increases experience by the amount
- Level up (+1 level) for every 100 experience
- Returns `this` for chaining

```javascript
const hero = new Character('Aldric', 100, 50, 0);
hero.gainExperience(50);
console.log(hero.experience); // 50
console.log(hero.level);      // 1

hero.gainExperience(50);
console.log(hero.experience); // 100
console.log(hero.level);      // 2
```

#### `getStatus()`
- Returns an object with current state:
  `{ name, health, mana, experience, level, isAlive }`

```javascript
const hero = new Character('Aldric', 100, 50);
const status = hero.getStatus();
// { name: 'Aldric', health: 100, mana: 50, experience: 0, level: 1, isAlive: true }
```

### Task 2: Implement Warrior Methods

Add these methods to your `Warrior` class:

#### `attack(enemy, damage=20)`
- Deal damage to enemy using `enemy.takeDamage(damage)`
- Gain 10 experience
- Increase rage by 5
- Returns `this` for chaining

#### `defend(incomingDamage)`
- Reduce damage by armor value (armor reduces by 50%)
- Return the actual damage taken (after armor reduction)

#### `powerAttack(enemy)`
- Requires 30 mana
- Deals 50 damage to enemy
- Sets rage to 0
- Returns `this` if successful, `false` if insufficient mana

#### `getRage()`
- Returns current rage value

### Task 3: Implement Mage Methods

Add these methods to your `Mage` class:

#### `castSpell(enemy, manaCost=30)`
- Requires enough mana
- Deals `spellPower` damage to enemy
- Uses the specified mana cost
- Gain 15 experience
- Increase focus by 1
- Returns `this` if successful, `false` if insufficient mana

#### `meditate()`
- Restore 40 mana (can go over max)
- Set focus to 0
- Returns `this`

#### `amplifySpell()`
- Costs 20 mana
- Increases spell power from 30 to 50
- Returns `this` if successful, `false` if insufficient mana

#### `getFocus()`
- Returns current focus value

### Task 4: Implement Archer Methods

Add these methods to your `Archer` class:

#### `shootArrow(enemy, damage=15)`
- Requires at least 1 arrow
- Deals damage to enemy
- Decreases arrow count by 1
- Gain 8 experience
- Returns `this` if successful, `false` if no arrows

#### `restock(arrowCount=20)`
- Adds arrows to inventory
- Returns `this` for chaining

#### `precisionShot(enemy, damage=25)`
- Requires 2 arrows and 15 mana
- Deals damage to enemy
- Increase precision by 1
- Returns `this` if successful, `false` if insufficient resources

#### `getPrecision()`
- Returns current precision value

## Testing

Run the tests to verify your implementation:

```bash
npm test
```

Watch mode for development:

```bash
npm run test:watch
```

## Real-World Applications

Methods are fundamental to object-oriented programming:

```javascript
// Web APIs use methods
element.addEventListener('click', () => {});
array.map(item => item * 2);
string.toUpperCase();

// Express.js routing
app.get('/users', (req, res) => res.send('users'));

// Database queries
db.find({ name: 'John' });

// Your classes
class User {
  changePassword(newPassword) { /* ... */ }
  updateProfile(data) { /* ... */ }
  deactivateAccount() { /* ... */ }
}
```

## Method Design Patterns

### 1. Getters - Return State

```javascript
getStatus() {
  return { name, health, mana, experience, level, isAlive };
}

getName() {
  return this.name;
}
```

### 2. Setters - Modify State

```javascript
takeDamage(amount) {
  this.health -= amount;
}

heal(amount) {
  this.health += amount;
}
```

### 3. Query Methods - Check State

```javascript
isDefeated() {
  return this.health <= 0;
}

canCastSpell(manaCost) {
  return this.mana >= manaCost;
}
```

### 4. Action Methods - Perform Operations

```javascript
attack(enemy) {
  enemy.takeDamage(this.power);
  this.gainExperience(10);
}

levelUp() {
  this.level++;
  this.maxHealth += 10;
  this.maxMana += 5;
}
```

## Best Practices

### 1. Use Meaningful Names

```javascript
// ✓ GOOD - Clear what the method does
takeDamage(amount)
gainExperience(amount)
castSpell(enemy, manaCost)

// ❌ LESS CLEAR
reduce(amount)
add(amount)
doCast(enemy, cost)
```

### 2. Validate State Before Modifying

```javascript
// ✓ GOOD - Check before action
useMana(amount) {
  if (this.mana >= amount) {
    this.mana -= amount;
    return true;
  }
  return false;
}

// ❌ RISKY - No validation
useMana(amount) {
  this.mana -= amount; // Could go negative
}
```

### 3. Return `this` for Chaining When Appropriate

```javascript
// ✓ GOOD - Enables method chaining for related operations
takeDamage(amount) {
  this.health -= amount;
  return this;
}

// ✗ DON'T CHAIN for queries/checks
useMana(amount) {
  return this.mana >= amount; // Returns boolean, not `this`
}
```

### 4. Keep Methods Focused

```javascript
// ✓ GOOD - Each method does one thing
takeDamage(amount) {
  this.health -= amount;
}

isDead() {
  return this.health <= 0;
}

// ❌ TOO MUCH - Method does too much
takeDamage(amount) {
  this.health -= amount;
  if (this.health <= 0) {
    this.isAlive = false;
    console.log('Character defeated!');
    // ... send event, update UI, etc.
  }
}
```

## Common Mistakes

```javascript
// ❌ WRONG - Forgetting to return `this`
heal(amount) {
  this.health += amount;
  // Forgot: return this;
}
// Can't chain: hero.takeDamage(20).heal(10); // Error!

// ❌ WRONG - Modifying other instances unexpectedly
takeDamage(amount) {
  Character.count--; // Wrong! Affects class, not instance
}

// ✓ RIGHT - Only modify `this` instance
takeDamage(amount) {
  this.health -= amount;
}

// ❌ WRONG - Not checking preconditions
castSpell(enemy, manaCost) {
  this.mana -= manaCost; // What if not enough?
}

// ✓ RIGHT - Validate before action
castSpell(enemy, manaCost) {
  if (this.mana < manaCost) return false;
  this.mana -= manaCost;
  // ...
}
```

## Terminology

- **Instance Method**: Function defined in a class that operates on instances
- **`this` Context**: Refers to the specific instance calling the method
- **State Management**: Controlling how object properties change
- **Method Chaining**: Returning `this` to enable multiple method calls
- **Encapsulation**: Controlling property access through methods
- **Getter Method**: Returns current state without modification
- **Setter Method**: Modifies state (often with validation)

## Summary

Key points about methods:

✅ Methods are functions inside classes
✅ Use `this` to access instance properties
✅ Methods can modify state and perform operations
✅ Return `this` for method chaining
✅ Validate state before making changes
✅ Keep methods focused and simple
✅ Use meaningful method names

Next exercise: You'll learn **inheritance** to create specialized character types that share common behavior!
