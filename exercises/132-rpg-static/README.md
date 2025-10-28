# Exercise 132: RPG Character System - Static Methods

Master **static methods** - class-level functions that belong to the class itself, not to instances.

## Overview

In this exercise, you'll learn to use **static methods** for:
- **Factory patterns**: Creating pre-configured instances
- **Utilities**: Helper functions that don't need instance state
- **Trackers**: Class-level counters and registries
- **Queries**: Class-level operations that compare or check things

### What You'll Learn

- **Static Methods**: Functions that belong to a class, not instances
- **Static Keyword**: How to define class-level operations
- **Factory Pattern**: Using static methods to create configured instances
- **Class-Level State**: Tracking information at the class level
- **Instance vs Static**: Understanding the difference and when to use each

## Key Concepts

### Static Methods

**Static methods** are defined with the `static` keyword and belong to the class itself, not instances:

```javascript
class Character {
  // Instance method - called on instances
  takeDamage(amount) {
    this.health -= amount;
  }

  // Static method - called on the class
  static createHero(name) {
    return new Character(name, 150, 100);
  }
}

// Call instance method
const hero = new Character('Aldric', 100, 50);
hero.takeDamage(20); // Instance method

// Call static method
const hero2 = Character.createHero('Merlin'); // Static method
```

### Calling Static Methods

Static methods are called on the **class**, not on instances:

```javascript
class Math {
  // This is NOT a real Math.max example, but shows the pattern
  static max(...numbers) {
    return Math.max(...numbers);
  }
}

// ✓ RIGHT - call on class
Math.max(1, 2, 3);

// ❌ WRONG - don't call on instance
const calc = new Math();
calc.max(1, 2, 3); // This won't work for true static methods
```

### Static Methods Don't Have Access to `this`

In a static method, `this` refers to the class itself, not an instance:

```javascript
class Character {
  constructor(name) {
    this.name = name;
  }

  // Instance method - this = instance
  greet() {
    return `Hello, I'm ${this.name}`;
  }

  // Static method - this = class
  static displayClassName() {
    return `This is the ${this.name} class`; // this.name = 'Character'
  }
}

const hero = new Character('Aldric');
hero.greet(); // "Hello, I'm Aldric"
Character.displayClassName(); // "This is the Character class"
```

### Factory Pattern with Static Methods

Use static methods as **factories** to create pre-configured instances:

```javascript
class Character {
  constructor(name, health, mana) {
    this.name = name;
    this.health = health;
    this.mana = mana;
  }

  // Factory method 1 - creates hero
  static createHero(name) {
    return new Character(name, 150, 100);
  }

  // Factory method 2 - creates enemy
  static createEnemy(name) {
    return new Character(name, 50, 30);
  }
}

// Easy to create configured instances
const hero = Character.createHero('Aldric');     // 150 health, 100 mana
const enemy = Character.createEnemy('Goblin');   // 50 health, 30 mana
```

### Static Properties

Store class-level data with static properties:

```javascript
class Character {
  static totalCharactersCreated = 0;

  constructor(name) {
    this.name = name;
    Character.totalCharactersCreated++; // Track on class
  }

  static getTotalCharactersCreated() {
    return Character.totalCharactersCreated;
  }
}

new Character('A');
new Character('B');
new Character('C');

Character.getTotalCharactersCreated(); // 3
```

### Instance vs Static Comparison

| Aspect | Instance Method | Static Method |
|--------|-----------------|---------------|
| Called on | Instance | Class |
| Access to `this` | Yes (instance) | No (or class) |
| Use cases | Modify/use instance state | Factories, utilities, class-level ops |
| Example | `hero.takeDamage()` | `Character.createHero()` |
| Memory | Each instance has copy | Shared at class level |

```javascript
class Character {
  constructor(name, health) {
    this.name = name;
    this.health = health;
  }

  // Instance method - each instance has this method
  takeDamage(amount) {
    this.health -= amount; // Uses instance 'this'
  }

  // Static method - belongs to class, not instances
  static createHero(name) {
    return new Character(name, 150);
  }

  // Static utility
  static isSameName(char1, char2) {
    return char1.name === char2.name;
  }
}

const hero1 = new Character('Aldric', 100);
hero1.takeDamage(20);             // Instance method

const hero2 = Character.createHero('Merlin'); // Static factory
Character.isSameName(hero1, hero2); // Static utility
```

### Inheritance with Static Methods

Subclasses inherit static methods:

```javascript
class Character {
  static createCharacter(name) {
    return new this(name); // 'this' is the class
  }
}

class Warrior extends Character {
  constructor(name) {
    super(name);
    this.armor = 25;
  }
}

// Static method inherited
const warrior = Warrior.createCharacter('Thorvald');
console.log(warrior instanceof Warrior); // true
```

## Exercise Tasks

### Task 1: Character Static Methods

Add these static methods to your `Character` class:

#### `static createHero(name)`
Factory that creates a hero with:
- health: 150
- mana: 100

```javascript
const hero = Character.createHero('Aldric');
console.log(hero.health); // 150
console.log(hero.mana);   // 100
```

#### `static createEnemy(name)`
Factory that creates an enemy with:
- health: 50
- mana: 30

```javascript
const enemy = Character.createEnemy('Goblin');
console.log(enemy.health); // 50
console.log(enemy.mana);   // 30
```

#### `static isSameName(char1, char2)`
Returns true if both characters have the same name:

```javascript
const h1 = new Character('Aldric');
const h2 = new Character('Aldric');
Character.isSameName(h1, h2); // true
```

#### `static getTotalCharactersCreated()`
Returns the total number of Character instances created:

```javascript
Character.getTotalCharactersCreated(); // Total count
```

Also add a static property to track total characters created.

### Task 2: Warrior Static Methods

Add these static methods to your `Warrior` class:

#### `static createBerserker(name)`
Factory for a high-damage warrior:
- health: 200
- mana: 10

```javascript
const berserker = Warrior.createBerserker('Ragnar');
console.log(berserker.health); // 200
console.log(berserker.mana);   // 10
```

#### `static createKnight(name)`
Factory for a balanced warrior:
- health: 150
- mana: 30

```javascript
const knight = Warrior.createKnight('Lancelot');
console.log(knight.health); // 150
console.log(knight.mana);   // 30
```

#### `static getWarriorDefaults()`
Returns an object with default warrior values:

```javascript
const defaults = Warrior.getWarriorDefaults();
// { health: 150, mana: 20 }
```

### Task 3: Mage Static Methods

Add these static methods to your `Mage` class:

#### `static createFireMage(name)`
Factory for a fire mage:
- health: 80
- mana: 120
- spellType: 'fireball'

```javascript
const fireMage = Mage.createFireMage('Merlin');
console.log(fireMage.mana);     // 120
console.log(fireMage.spellType); // 'fireball'
```

#### `static createFrostMage(name)`
Factory for a frost mage:
- health: 90
- mana: 110
- spellType: 'frostbolt'

```javascript
const frostMage = Mage.createFrostMage('Elsa');
console.log(frostMage.mana);     // 110
console.log(frostMage.spellType); // 'frostbolt'
```

#### `static getMageDefaults()`
Returns an object with default mage values:

```javascript
const defaults = Mage.getMageDefaults();
// { health: 80, mana: 100 }
```

### Task 4: Archer Static Methods

Add these static methods to your `Archer` class:

#### `static createRanger(name)`
Factory for a ranger (arrows-focused archer):
- health: 130
- mana: 35
- arrows: 75

```javascript
const ranger = Archer.createRanger('Robin');
console.log(ranger.arrows); // 75
```

#### `static createScout(name)`
Factory for a scout (mobility-focused archer):
- health: 110
- mana: 40
- arrows: 30

```javascript
const scout = Archer.createScout('Will');
console.log(scout.health); // 110
```

#### `static getArcherDefaults()`
Returns an object with default archer values:

```javascript
const defaults = Archer.getArcherDefaults();
// { health: 120, mana: 30 }
```

## Testing

Run the tests to verify your implementation:

```bash
npm test
```

Watch mode for development:

```bash
npm run test:watch
```

## Real-World Factory Pattern Examples

```javascript
// JavaScript Built-ins use factories
Array.of(1, 2, 3);
Array.from('hello');
Object.create({});
Object.assign({}, source);

// Popular libraries use factories
jQuery.ajax({ url: '/api/data' });
moment('2024-01-01').format('YYYY-MM-DD');
Sequelize.define('User', { /* ... */ });

// Your code
const party = [
  Warrior.createKnight('Knight'),
  Mage.createFireMage('Mage'),
  Archer.createRanger('Archer')
];
```

## Best Practices

### 1. Use Factories for Common Configurations

```javascript
// ✓ GOOD - Easy to create common variants
static createFireMage(name) {
  return new Mage(name, 80, 120, 'fireball');
}

// Alternative - more verbose for users
const mage = new Mage('Merlin', 80, 120);
mage.spellType = 'fireball';
```

### 2. Use Static Methods for Utilities

```javascript
// ✓ GOOD - Doesn't need instance state
static isSameName(char1, char2) {
  return char1.name === char2.name;
}

// ❌ NOT GOOD - Should be static
instanceMethod(char) {
  return this.name === char.name; // Why use 'this'?
}
```

### 3. Track Class-Level State

```javascript
// ✓ GOOD - Useful for tracking
class Character {
  static totalCreated = 0;
  constructor(name) {
    this.name = name;
    Character.totalCreated++;
  }
  static getTotal() {
    return Character.totalCreated;
  }
}
```

### 4. Return `this` from Factory for Consistency

```javascript
// ✓ GOOD - Factories return instances
static createHero(name) {
  return new Character(name, 150, 100);
}

// Instance methods return `this` for chaining
takeDamage(amount) {
  this.health -= amount;
  return this;
}
```

## Common Mistakes

```javascript
// ❌ WRONG - Static methods called on instance
const hero = new Character('Test');
hero.createHero('Test2'); // Wrong! Static on instance

// ✓ RIGHT - Static methods called on class
Character.createHero('Test2');

// ❌ WRONG - Trying to use 'this.property' in static
static createHero(name) {
  return new Character(name, this.defaultHealth); // this is class, not instance!
}

// ✓ RIGHT - Use class name or parameter
static createHero(name) {
  return new Character(name, 150);
}

// ❌ WRONG - Forgetting to return from factory
static createHero(name) {
  new Character(name, 150);
  // Forgot: return
}

// ✓ RIGHT
static createHero(name) {
  return new Character(name, 150);
}
```

## Terminology

- **Static Method**: Class-level method, not tied to instances
- **Static Property**: Class-level property shared by all instances
- **Factory Method**: Static method that creates configured instances
- **Utility Method**: Static method for helper calculations
- **Class-Level Operation**: Logic that doesn't need instance state
- **`this` in Static**: Refers to the class, not an instance

## Summary

Key points about static methods:

✅ Called on the class, not instances
✅ Don't have access to instance properties (no `this` in normal sense)
✅ Perfect for factory patterns
✅ Great for utility/helper functions
✅ Can track class-level state
✅ Inherited by subclasses
✅ Makes common configurations easy

**Series 26 Complete!** You've mastered:
- Constructor functions (128)
- ES6 class syntax (129)
- Instance methods (130)
- Class inheritance (131)
- Static methods and factories (132)

These are the core concepts of object-oriented programming in JavaScript!
