# Exercise 128: RPG Character System - Constructor Functions

Learn how to create objects using **constructor functions**, one of the foundational patterns in JavaScript for object-oriented programming.

## Overview

In this exercise, you'll build an RPG character system using constructor functions. Constructor functions are regular functions that are invoked with the `new` keyword to create and initialize new objects. This is the pre-ES6 way of creating objects in JavaScript and is still widely used.

### What You'll Learn

- **Constructor Functions**: What they are and how to create them
- **The `new` Keyword**: How it creates instances and sets up the context
- **The `this` Keyword**: How `this` refers to the newly created object
- **Instance Properties**: Creating unique state for each object
- **Difference from Factory Functions**: Constructor vs factory patterns

## Key Concepts

### Constructor Functions Explained

A **constructor function** is a regular function that is designed to be called with the `new` keyword. When you call a function with `new`, JavaScript automatically:

1. Creates a new empty object
2. Sets `this` to refer to that new object
3. Runs the function body (which typically sets properties on `this`)
4. Returns the new object (unless the function returns something else)

**Example - Simple Constructor:**

```javascript
function Character(name, health) {
  this.name = name;
  this.health = health;
  this.isAlive = true;
}

const hero = new Character('Aldric', 100);
console.log(hero.name);      // 'Aldric'
console.log(hero.isAlive);   // true
```

### Key Differences from Factory Functions

| Aspect | Constructor | Factory |
|--------|-----------|---------|
| Invocation | `new Character()` | `createCharacter()` |
| `this` keyword | Set to new object | Not automatically set |
| Return | Implicit (new object) | Explicit return |
| Prototype | Sets up prototype chain | No prototype involvement |
| Convention | Name capitalized | Usually starts with "create" |

**Factory Pattern Comparison:**

```javascript
// Factory Function (from Series 25)
function createCharacter(name, health) {
  return {
    name: name,
    health: health,
    isAlive: true
  };
}

// Constructor Function (Series 26)
function Character(name, health) {
  this.name = name;
  this.health = health;
  this.isAlive = true;
}
```

### Understanding `this` in Constructors

The `this` keyword in a constructor refers to the new object being created:

```javascript
function Character(name) {
  this.name = name;        // 'this' = new object
  this.greet = function() {
    console.log(`Hello, I'm ${this.name}`);
  };
}

const hero = new Character('Aldric');
hero.greet(); // "Hello, I'm Aldric"

const villain = new Character('Malachar');
villain.greet(); // "Hello, I'm Malachar"
```

### Instance Properties vs Shared Properties

Each instance created with a constructor has its own copy of instance properties:

```javascript
function Character(name, health) {
  this.name = name;        // Each instance has own name
  this.health = health;    // Each instance has own health
}

const hero1 = new Character('Hero1', 100);
const hero2 = new Character('Hero2', 150);

hero1.health = 50;
console.log(hero1.health); // 50
console.log(hero2.health); // 150 (unaffected)
```

### Default Parameters in Constructors

Constructor functions can use default parameters, just like any other function:

```javascript
function Character(name, health = 100, mana = 50) {
  this.name = name;
  this.health = health;
  this.mana = mana;
}

const hero = new Character('Aldric');
// hero.health = 100 (default)
// hero.mana = 50 (default)

const strong = new Character('Thorvald', 150, 100);
// strong.health = 150 (custom)
// strong.mana = 100 (custom)
```

## Exercise Tasks

### Task 1: Implement Character Constructor

Create the base `Character` constructor function that accepts:
- `name`: Character name
- `initialHealth`: Health points (default: 100)
- `initialMana`: Mana points (default: 50)
- `initialExperience`: Experience points (default: 0)

Set properties:
- `this.name`, `this.health`, `this.mana`, `this.experience`
- `this.level = 1` (all characters start at level 1)
- `this.isAlive = true` (all characters start alive)

```javascript
const hero = new Character('Aldric', 100, 50, 0);
console.log(hero.name);      // 'Aldric'
console.log(hero.health);    // 100
console.log(hero.level);     // 1
console.log(hero.isAlive);   // true
```

### Task 2: Implement Warrior Constructor

Create a `Warrior` constructor for warrior characters with:
- Parameters: `name`, `initialHealth` (default: 150), `initialMana` (default: 20)
- Base properties from Character (name, health, mana, level=1, isAlive=true, experience=0)
- Warrior-specific properties:
  - `weaponType = 'sword'`
  - `armor = 25`
  - `rage = 0` (warrior-specific combat stat)

```javascript
const warrior = new Warrior('Thorvald');
console.log(warrior.name);       // 'Thorvald'
console.log(warrior.health);     // 150
console.log(warrior.weaponType); // 'sword'
console.log(warrior.armor);      // 25
console.log(warrior.rage);       // 0
```

### Task 3: Implement Mage Constructor

Create a `Mage` constructor for mage characters with:
- Parameters: `name`, `initialHealth` (default: 80), `initialMana` (default: 100)
- Base properties from Character
- Mage-specific properties:
  - `spellType = 'fireball'`
  - `spellPower = 30`
  - `focus = 0` (mage-specific casting stat)

```javascript
const mage = new Mage('Merlin');
console.log(mage.name);       // 'Merlin'
console.log(mage.health);     // 80
console.log(mage.mana);       // 100
console.log(mage.spellType);  // 'fireball'
console.log(mage.spellPower); // 30
```

### Task 4: Implement Archer Constructor

Create an `Archer` constructor for archer characters with:
- Parameters: `name`, `initialHealth` (default: 120), `initialMana` (default: 30)
- Base properties from Character
- Archer-specific properties:
  - `bowType = 'longbow'`
  - `arrows = 50`
  - `precision = 0` (archer-specific accuracy stat)

```javascript
const archer = new Archer('Robin');
console.log(archer.name);    // 'Robin'
console.log(archer.health);  // 120
console.log(archer.bowType); // 'longbow'
console.log(archer.arrows);  // 50
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
- **Series 25 (Closures)**: You learned about object creation with factories
- **Series 26 (Constructors)**: Now learn the constructor function pattern
- **Exercise 129**: Next, you'll convert these to modern ES6 class syntax
- **Exercise 130+**: Add methods and behavior to characters

## Real-World Application

Constructor functions are used in many JavaScript libraries and frameworks:

```javascript
// DOM API uses constructor functions
const element = new Element();

// Popular libraries
const error = new Error('Something went wrong');
const date = new Date();
const array = new Array(1, 2, 3);

// Custom library example
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}
```

## Important Notes

### Best Practices

1. **Capitalization Convention**: Constructor function names should start with a capital letter by convention
2. **Always use `new`**: Constructor functions are designed to be called with `new`
3. **Avoid returning explicit values**: Let the constructor implicitly return the new object
4. **Use `this` carefully**: Remember `this` refers to the new object in the constructor

### Common Mistakes

```javascript
// ❌ WRONG - Not calling with 'new' - this won't create an object correctly
const hero = Character('Aldric', 100);
// In non-strict mode, 'this' would refer to global object!

// ✓ RIGHT - Always use 'new'
const hero = new Character('Aldric', 100);

// ❌ WRONG - Returning explicit value prevents proper object creation
function Character(name) {
  this.name = name;
  return 'I am a character'; // This replaces the object!
}

// ✓ RIGHT - Let constructor return the object implicitly
function Character(name) {
  this.name = name;
  // implicit return of this object
}
```

## Terminology

- **Constructor Function**: Function called with `new` to create objects
- **Instance**: An object created by calling a constructor with `new`
- **this Context**: In constructors, refers to the newly created object
- **Instance Property**: Property unique to each object instance
- **Prototype**: Objects created by constructors share a prototype
- **new Keyword**: Operator that creates instances and sets up constructor invocation

## Summary

Constructor functions provide a way to create multiple objects with the same structure. Key points:

✅ Use `new` keyword to create instances
✅ Use `this` to set properties on the new object
✅ Capitalize constructor function names
✅ Each instance has independent state
✅ Default parameters work in constructors
✅ Different constructors can specialize behavior (Warrior, Mage, Archer)

Next, you'll see how modern ES6 classes make this pattern cleaner and more intuitive!
