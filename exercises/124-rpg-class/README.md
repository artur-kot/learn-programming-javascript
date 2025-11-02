# Exercise 129: RPG Character System - ES6 Class Syntax

Learn how to create objects using **ES6 class syntax**, the modern, cleaner way to define classes in JavaScript.

## Overview

In this exercise, you'll convert the constructor functions from Exercise 128 into ES6 classes. ES6 classes provide a more intuitive and familiar syntax for object-oriented programming. Under the hood, they work exactly like constructor functions, but the syntax is clearer and more powerful.

### What You'll Learn

- **ES6 Class Syntax**: How to define classes and create instances
- **Constructor Method**: The special method that runs when creating instances
- **Class vs Constructor Functions**: The relationship between the two patterns
- **Instance Properties**: Setting up state in the constructor method
- **Class Inheritance Preparation**: Classes make inheritance much cleaner (more in Exercise 131)

## Key Concepts

### ES6 Classes Explained

An **ES6 class** is a template for creating objects. It uses the `class` keyword and has a special `constructor` method that runs when you create a new instance.

**Basic Class Example:**

```javascript
class Character {
  constructor(name, health) {
    this.name = name;
    this.health = health;
    this.isAlive = true;
  }
}

const hero = new Character('Aldric', 100);
console.log(hero.name);    // 'Aldric'
console.log(hero.isAlive); // true
```

### Classes are Syntactic Sugar

**Important**: ES6 classes are syntax sugar over constructor functions. They don't fundamentally change how JavaScript works—they just provide better syntax.

**Constructor Function (Old Way):**

```javascript
function Character(name, health) {
  this.name = name;
  this.health = health;
  this.isAlive = true;
}

const hero = new Character('Aldric', 100);
```

**ES6 Class (Modern Way):**

```javascript
class Character {
  constructor(name, health) {
    this.name = name;
    this.health = health;
    this.isAlive = true;
  }
}

const hero = new Character('Aldric', 100);
```

Both work identically! Classes just look better and are easier to extend.

### Constructor Method

The `constructor` method is a special method that runs automatically when you create a new instance with `new`. You use it to initialize instance properties.

```javascript
class Character {
  constructor(name, health, mana) {
    // This runs automatically when you call: new Character(...)
    this.name = name;
    this.health = health;
    this.mana = mana;
    this.level = 1;
    this.isAlive = true;
  }
}
```

### Default Parameters in Classes

Just like regular functions, class constructors can have default parameters:

```javascript
class Character {
  constructor(name, health = 100, mana = 50) {
    this.name = name;
    this.health = health;
    this.mana = mana;
  }
}

const hero = new Character('Aldric');
// hero.health = 100 (default)
// hero.mana = 50 (default)

const strong = new Character('Thorvald', 150, 100);
// strong.health = 150 (custom)
// strong.mana = 100 (custom)
```

### Instance Properties

Each instance has its own copy of properties created in the constructor:

```javascript
class Character {
  constructor(name) {
    this.name = name;  // Each instance has own name
  }
}

const hero1 = new Character('Hero1');
const hero2 = new Character('Hero2');

hero1.name = 'Modified Hero1';
console.log(hero1.name); // 'Modified Hero1'
console.log(hero2.name); // 'Hero2' (unaffected)
```

### Checking Instance Type

Use `instanceof` to check if an object is an instance of a class:

```javascript
class Character {}
const hero = new Character('Aldric');

console.log(hero instanceof Character);  // true
console.log(hero instanceof Object);     // true
```

### Why Use Classes Instead of Constructor Functions?

| Aspect | Constructor | Class |
|--------|-----------|-------|
| Syntax | More verbose | Cleaner, more concise |
| Readability | Less obvious it's for object creation | Clear intent |
| Inheritance | Manual setup | Built-in `extends` |
| Methods | Added to prototype | Cleaner syntax |
| Conventions | Capitalization required | Obvious pattern |

## Exercise Tasks

### Task 1: Implement Character Class

Create a `Character` class with:
- A `constructor` method accepting: name, initialHealth, initialMana, initialExperience
- Set properties: name, health, mana, experience
- Initialize: level = 1, isAlive = true
- Defaults: health = 100, mana = 50, experience = 0

```javascript
class Character {
  constructor(name, initialHealth = 100, initialMana = 50, initialExperience = 0) {
    this.name = name;
    this.health = initialHealth;
    this.mana = initialMana;
    this.experience = initialExperience;
    this.level = 1;
    this.isAlive = true;
  }
}

const hero = new Character('Aldric');
console.log(hero.name);     // 'Aldric'
console.log(hero.health);   // 100
console.log(hero.level);    // 1
console.log(hero.isAlive);  // true
```

### Task 2: Implement Warrior Class

Create a `Warrior` class with:
- A `constructor` method accepting: name, initialHealth, initialMana
- Set all base character properties (name, health, mana, level=1, isAlive=true, experience=0)
- Defaults: health = 150, mana = 20, experience = 0
- Warrior-specific: weaponType = 'sword', armor = 25, rage = 0

```javascript
class Warrior {
  constructor(name, initialHealth = 150, initialMana = 20) {
    this.name = name;
    this.health = initialHealth;
    this.mana = initialMana;
    this.experience = 0;
    this.level = 1;
    this.isAlive = true;
    this.weaponType = 'sword';
    this.armor = 25;
    this.rage = 0;
  }
}

const warrior = new Warrior('Thorvald');
console.log(warrior.health);     // 150
console.log(warrior.weaponType); // 'sword'
console.log(warrior.armor);      // 25
```

### Task 3: Implement Mage Class

Create a `Mage` class with:
- A `constructor` method accepting: name, initialHealth, initialMana
- Set all base character properties
- Defaults: health = 80, mana = 100, experience = 0
- Mage-specific: spellType = 'fireball', spellPower = 30, focus = 0

```javascript
class Mage {
  constructor(name, initialHealth = 80, initialMana = 100) {
    this.name = name;
    this.health = initialHealth;
    this.mana = initialMana;
    this.experience = 0;
    this.level = 1;
    this.isAlive = true;
    this.spellType = 'fireball';
    this.spellPower = 30;
    this.focus = 0;
  }
}

const mage = new Mage('Merlin');
console.log(mage.mana);      // 100
console.log(mage.spellType); // 'fireball'
console.log(mage.spellPower);// 30
```

### Task 4: Implement Archer Class

Create an `Archer` class with:
- A `constructor` method accepting: name, initialHealth, initialMana
- Set all base character properties
- Defaults: health = 120, mana = 30, experience = 0
- Archer-specific: bowType = 'longbow', arrows = 50, precision = 0

```javascript
class Archer {
  constructor(name, initialHealth = 120, initialMana = 30) {
    this.name = name;
    this.health = initialHealth;
    this.mana = initialMana;
    this.experience = 0;
    this.level = 1;
    this.isAlive = true;
    this.bowType = 'longbow';
    this.arrows = 50;
    this.precision = 0;
  }
}

const archer = new Archer('Robin');
console.log(archer.bowType);   // 'longbow'
console.log(archer.arrows);    // 50
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

## Learning Path

This exercise builds on previous knowledge:
- **Exercise 128**: You learned constructor functions
- **Exercise 129**: Now learn ES6 class syntax (syntactic sugar)
- **Exercise 130**: Add methods to classes
- **Exercise 131+**: Master inheritance with classes

## Key Differences from Constructor Functions

### Declaration

```javascript
// Constructor Function
function Character(name) {
  this.name = name;
}

// ES6 Class
class Character {
  constructor(name) {
    this.name = name;
  }
}
```

### Instance Check

```javascript
// Both use instanceof the same way
const hero = new Character('Aldric');
console.log(hero instanceof Character); // true
```

### Hoisting

```javascript
// ❌ Constructor functions are hoisted
console.log(typeof Character); // 'function'
function Character(name) { this.name = name; }

// ❌ Class declarations are NOT hoisted (temporal dead zone)
console.log(typeof Warrior); // ReferenceError
class Warrior { constructor(name) { this.name = name; } }
```

## Best Practices

### 1. Use Classes for Modern Code

```javascript
// ✓ Preferred in modern JavaScript
class Character {
  constructor(name) {
    this.name = name;
  }
}
```

### 2. Always use `new`

```javascript
// ❌ WRONG - Classes must be called with 'new'
const hero = Character('Aldric'); // TypeError

// ✓ RIGHT
const hero = new Character('Aldric');
```

### 3. Constructor is for Initialization

```javascript
class Character {
  constructor(name, health) {
    // Only initialize properties here
    this.name = name;
    this.health = health;
    // Don't do heavy computation or side effects
  }
}
```

### 4. Use Descriptive Property Names

```javascript
// ✓ GOOD - Clear what the property is
class Character {
  constructor(name, initialHealth) {
    this.name = name;
    this.health = initialHealth;
  }
}

// ❌ LESS CLEAR
class Character {
  constructor(name, h) {
    this.name = name;
    this.health = h;
  }
}
```

## Common Mistakes

```javascript
// ❌ WRONG - No class keyword
const Character = {
  constructor(name) { this.name = name; }
};

// ✓ RIGHT
class Character {
  constructor(name) {
    this.name = name;
  }
}

// ❌ WRONG - Forgetting 'new' keyword
const hero = Character('Aldric'); // TypeError

// ✓ RIGHT
const hero = new Character('Aldric');

// ❌ WRONG - Multiple constructors not allowed
class Character {
  constructor(name) { this.name = name; }
  constructor(name, health) { /* Can't do this */ }
}

// ✓ RIGHT - Use default parameters
class Character {
  constructor(name, health = 100) {
    this.name = name;
    this.health = health;
  }
}
```

## Terminology

- **Class**: Template for creating objects
- **Constructor**: Special method that runs when creating instances
- **Instance**: Object created from a class
- **Instance Property**: Property unique to each instance
- **new Keyword**: Creates a new instance from a class
- **instanceof**: Operator to check if object is instance of class
- **Syntactic Sugar**: Cleaner syntax for existing functionality

## Real-World Examples

Classes are used everywhere in modern JavaScript:

```javascript
// Built-in classes
const now = new Date();
const error = new Error('Something went wrong');
const regex = new RegExp('\\d+');

// React components (before hooks)
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }
}

// Your own classes
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}
```

## Summary

Key points about ES6 classes:

✅ Cleaner syntax than constructor functions
✅ `constructor` method runs on instance creation
✅ Use `new` keyword to create instances
✅ Each instance has independent properties
✅ `instanceof` works to check instance type
✅ Default parameters work in constructors
✅ Specialized classes can set different defaults
✅ Classes are the modern way to do OOP in JavaScript

Next exercise: You'll add methods to your classes to give characters abilities like `attack()`, `defend()`, and `heal()`!
