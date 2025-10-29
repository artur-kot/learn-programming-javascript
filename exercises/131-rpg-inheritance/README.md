# Exercise 131: RPG Character System - Class Inheritance

Master **class inheritance** by creating specialized character types that inherit from a base class.

## Overview

In this exercise, you'll learn how to use **inheritance** to create a hierarchy of classes where specialized classes (Warrior, Mage, Archer) inherit common behavior from a base Character class. This reduces code duplication and makes your code more maintainable.

### What You'll Learn

- **Class Inheritance with `extends`**: Creating subclasses
- **The `super` Keyword**: Accessing parent constructor and methods
- **Method Overriding**: Providing new implementations in subclasses
- **Polymorphism**: Different types responding to similar operations differently
- **Inheritance Chains**: Objects are instances of multiple types

## Key Concepts

### Class Inheritance with `extends`

Use the `extends` keyword to create a **subclass** that inherits from a **parent class** (also called a **superclass**):

```javascript
class Character {
  constructor(name, health) {
    this.name = name;
    this.health = health;
  }

  takeDamage(amount) {
    this.health -= amount;
  }
}

// Warrior EXTENDS Character - inherits all properties and methods
class Warrior extends Character {
  constructor(name, health, armor) {
    super(name, health);          // Call parent constructor
    this.armor = armor;            // Add warrior-specific property
  }

  defend() {
    return this.armor * 2;
  }
}

const warrior = new Warrior('Thorvald', 150, 25);
warrior.takeDamage(20);  // Inherited method
warrior.defend();        // Specialized method
```

### The `super` Keyword

Use `super` to:
1. **Call parent constructor**: `super(args)`
2. **Access parent methods**: `super.methodName()`

```javascript
class Character {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, I'm ${this.name}`;
  }
}

class Warrior extends Character {
  constructor(name, weapon) {
    super(name);        // Call parent constructor
    this.weapon = weapon;
  }

  greet() {
    // Call parent method and extend it
    return super.greet() + ` with a ${this.weapon}`;
  }
}

const warrior = new Warrior('Thorvald', 'sword');
console.log(warrior.greet());
// "Hello, I'm Thorvald with a sword"
```

### Inheritance vs Composition

**Inheritance** (IS-A relationship):
```javascript
class Warrior extends Character {
  // Warrior IS-A Character
}
```

**Composition** (HAS-A relationship):
```javascript
class Party {
  constructor() {
    this.members = []; // Party HAS-A collection of characters
  }
}
```

For this exercise, we use inheritance because Warrior IS-A Character.

### Method Overriding

A subclass can provide a new implementation of a parent method:

```javascript
class Character {
  attack() {
    return 10; // Base damage
  }
}

class Warrior extends Character {
  attack() {
    return 20; // Warrior does more damage
  }
}

const hero = new Character();
const warrior = new Warrior();

console.log(hero.attack());     // 10
console.log(warrior.attack());  // 20
```

### Polymorphism

Polymorphism allows different objects to respond differently to the same operation:

```javascript
const characters = [
  new Character('Basic', 100, 50),
  new Warrior('Thor', 150, 20),
  new Mage('Merlin', 80, 100),
  new Archer('Robin', 120, 30)
];

// All have takeDamage method, but could behave differently
characters.forEach(char => {
  char.takeDamage(20);
});
```

### `instanceof` with Inheritance

```javascript
class Character {}
class Warrior extends Character {}

const warrior = new Warrior();

console.log(warrior instanceof Warrior);   // true
console.log(warrior instanceof Character); // true
console.log(warrior instanceof Object);    // true (all objects inherit from Object)
```

### Inheritance Chain

Objects inherit from their parent, which may inherit from a grandparent, etc.:

```javascript
class Entity {
  constructor(name) {
    this.name = name;
  }
}

class Character extends Entity {
  constructor(name, health) {
    super(name);
    this.health = health;
  }
}

class Warrior extends Character {
  constructor(name, health, weapon) {
    super(name, health);
    this.weapon = weapon;
  }
}

const warrior = new Warrior('Thorvald', 150, 'sword');
console.log(warrior instanceof Warrior);   // true
console.log(warrior instanceof Character); // true
console.log(warrior instanceof Entity);    // true
console.log(warrior instanceof Object);    // true
```

## Exercise Tasks

### Task 1: Create Base Character Class

Create a `Character` class with:
- Constructor accepting: name, initialHealth, initialMana, initialExperience (with defaults)
- Properties: name, health, mana, experience, level, isAlive, initialHealth
- Methods: takeDamage, heal, useMana, restoreMana, gainExperience, getStatus

This is the parent class that all other character types inherit from.

```javascript
const hero = new Character('Aldric', 100, 50);
console.log(hero.name);  // 'Aldric'
console.log(hero.health); // 100
```

### Task 2: Create Warrior Class

Create a `Warrior` class that **extends Character**:

```javascript
class Warrior extends Character {
  constructor(name, initialHealth = 150, initialMana = 20) {
    super(name, initialHealth, initialMana, 0);
    
    // Warrior-specific properties
    this.weaponType = 'sword';
    this.armor = 25;
    this.rage = 0;
  }

  // Warrior-specific methods
  attack(enemy, damage = 20) {
    enemy.takeDamage(damage);
    this.gainExperience(10);
    this.rage += 5;
    return this;
  }

  defend(incomingDamage) {
    return incomingDamage * 0.5; // Armor reduces by 50%
  }

  powerAttack(enemy) {
    if (!this.useMana(30)) return false;
    enemy.takeDamage(50);
    this.rage = 0;
    return this;
  }

  getRage() {
    return this.rage;
  }
}

const warrior = new Warrior('Thorvald');
console.log(warrior.health);     // 150 (warrior default)
console.log(warrior.weaponType); // 'sword'
console.log(warrior instanceof Character); // true
```

### Task 3: Create Mage Class

Create a `Mage` class that **extends Character**:

```javascript
class Mage extends Character {
  constructor(name, initialHealth = 80, initialMana = 100) {
    super(name, initialHealth, initialMana, 0);
    
    // Mage-specific properties
    this.spellType = 'fireball';
    this.spellPower = 30;
    this.focus = 0;
  }

  // Mage-specific methods
  castSpell(enemy, manaCost = 30) {
    if (!this.useMana(manaCost)) return false;
    enemy.takeDamage(this.spellPower);
    this.gainExperience(15);
    this.focus += 1;
    return this;
  }

  meditate() {
    this.restoreMana(40);
    this.focus = 0;
    return this;
  }

  amplifySpell() {
    if (!this.useMana(20)) return false;
    this.spellPower = 50;
    return this;
  }

  getFocus() {
    return this.focus;
  }
}

const mage = new Mage('Merlin');
console.log(mage.health);   // 80 (mage default)
console.log(mage.mana);     // 100 (mage default)
console.log(mage instanceof Character); // true
```

### Task 4: Create Archer Class

Create an `Archer` class that **extends Character**:

```javascript
class Archer extends Character {
  constructor(name, initialHealth = 120, initialMana = 30) {
    super(name, initialHealth, initialMana, 0);
    
    // Archer-specific properties
    this.bowType = 'longbow';
    this.arrows = 50;
    this.precision = 0;
  }

  // Archer-specific methods
  shootArrow(enemy, damage = 15) {
    if (this.arrows <= 0) return false;
    enemy.takeDamage(damage);
    this.arrows -= 1;
    this.gainExperience(8);
    return this;
  }

  restock(arrowCount = 20) {
    this.arrows += arrowCount;
    return this;
  }

  precisionShot(enemy, damage = 25) {
    if (this.arrows < 2 || !this.useMana(15)) return false;
    enemy.takeDamage(damage);
    this.arrows -= 2;
    this.precision += 1;
    return this;
  }

  getPrecision() {
    return this.precision;
  }
}

const archer = new Archer('Robin');
console.log(archer.health);   // 120 (archer default)
console.log(archer.arrows);   // 50
console.log(archer instanceof Character); // true
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

## Key Inheritance Patterns

### Pattern 1: Basic Inheritance

```javascript
class Parent {
  constructor(name) {
    this.name = name;
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name);      // Always call super() first
    this.age = age;
  }
}
```

### Pattern 2: Overriding Methods

```javascript
class Parent {
  greet() {
    return 'Hello';
  }
}

class Child extends Parent {
  greet() {
    return super.greet() + ' from child';
  }
}
```

### Pattern 3: Specialization

```javascript
// Base class defines common interface
class Character {
  attack() { /* generic */ }
  defend() { /* generic */ }
}

// Subclasses specialize
class Warrior extends Character {
  attack() { /* high damage */ }
}

class Mage extends Character {
  attack() { /* spell damage */ }
}
```

## Common Mistakes

```javascript
// ❌ WRONG - Forget to call super()
class Warrior extends Character {
  constructor(name, health) {
    this.name = name; // Error! 'this' not initialized yet
  }
}

// ✓ RIGHT - Always call super() first
class Warrior extends Character {
  constructor(name, health) {
    super(name, health);
    this.armor = 25;
  }
}

// ❌ WRONG - Call super() after using 'this'
class Warrior extends Character {
  constructor(name, health) {
    this.weapon = 'sword'; // Error! 'this' not initialized
    super(name, health);
  }
}

// ✓ RIGHT - super() must be first
class Warrior extends Character {
  constructor(name, health) {
    super(name, health);
    this.weapon = 'sword'; // Now 'this' is initialized
  }
}

// ❌ WRONG - Not returning `this` for chaining
class Warrior extends Character {
  attack(enemy) {
    enemy.takeDamage(20);
    // Forgot: return this;
  }
}
// Can't chain: warrior.attack(enemy).attack(enemy2);

// ✓ RIGHT
class Warrior extends Character {
  attack(enemy) {
    enemy.takeDamage(20);
    return this; // Enables chaining
  }
}
```

## Benefits of Inheritance

### 1. Code Reuse
```javascript
// Without inheritance - lots of duplication
class Warrior {
  constructor(name, health, mana) {
    this.name = name;
    this.health = health;
    this.mana = mana;
    // ... repeated for Mage, Archer, etc.
  }
}

// With inheritance - shared in Character
class Warrior extends Character {
  constructor(name, health, mana) {
    super(name, health, mana);
    // Only warrior-specific code
  }
}
```

### 2. Consistent Interfaces
```javascript
// All character types have these methods
character.takeDamage(10);
character.heal(5);
character.gainExperience(50);
```

### 3. Polymorphism
```javascript
// Can treat different types uniformly
const party = [warrior, mage, archer];
party.forEach(member => member.takeDamage(10));
```

### 4. Easier Maintenance
```javascript
// Change Character affects all subclasses
class Character {
  levelUp() {
    this.level++;
    this.health += 10;
    this.mana += 5;
  }
}
// Warrior, Mage, Archer automatically get this
```

## Terminology

- **Inheritance**: Mechanism for classes to inherit from parent classes
- **extends**: Keyword to create a subclass
- **super**: Access parent class constructor or methods
- **Superclass/Parent Class**: Class being inherited from
- **Subclass/Child Class**: Class inheriting from parent
- **Method Override**: Providing new implementation in subclass
- **Polymorphism**: Different types responding differently to same call
- **Inheritance Chain**: Multiple levels of inheritance

## Summary

Key points about inheritance:

✅ Use `extends` to create subclasses
✅ Call `super()` in subclass constructor before using `this`
✅ Use `super.method()` to call parent methods
✅ Override methods for specialized behavior
✅ Subclasses are instances of parent class too (`instanceof`)
✅ Reduces code duplication
✅ Enables polymorphism

Next exercise: You'll learn **static methods** - methods that belong to the class itself, not instances!
