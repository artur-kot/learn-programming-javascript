/**
 * Exercise 129: RPG Character System - ES6 Class Syntax
 *
 * Convert constructor functions to modern ES6 class syntax.
 * Learn how classes work, the class constructor method,
 * and how classes are syntax sugar over functions.
 *
 * ES6 classes provide a cleaner, more intuitive way to create objects
 * and define object-oriented programs. Under the hood, they work
 * the same as constructor functions, but with better syntax.
 *
 * Key benefits of classes:
 * - Clearer, more intuitive syntax
 * - Easier to extend with inheritance
 * - Constructor method clearly defined
 * - Built-in support for subclassing
 */

// TODO: Create a Character class
// The class should have:
// - A constructor method accepting: name, initialHealth, initialMana, initialExperience
// - Constructor sets: this.name, this.health, this.mana, this.experience
// - Always set: this.level = 1, this.isAlive = true
// - Default values: health=100, mana=50, experience=0
class Character {
  // TODO: Implement constructor
}

// TODO: Create a Warrior class
// The class should have:
// - A constructor method accepting: name, initialHealth, initialMana
// - Call super() or set all base properties like Character
// - Default values: health=150, mana=20, experience=0
// - Set warrior-specific properties: weaponType='sword', armor=25, rage=0
class Warrior {
  // TODO: Implement constructor
}

// TODO: Create a Mage class
// The class should have:
// - A constructor method accepting: name, initialHealth, initialMana
// - Call super() or set all base properties like Character
// - Default values: health=80, mana=100, experience=0
// - Set mage-specific properties: spellType='fireball', spellPower=30, focus=0
class Mage {
  // TODO: Implement constructor
}

// TODO: Create an Archer class
// The class should have:
// - A constructor method accepting: name, initialHealth, initialMana
// - Call super() or set all base properties like Character
// - Default values: health=120, mana=30, experience=0
// - Set archer-specific properties: bowType='longbow', arrows=50, precision=0
class Archer {
  // TODO: Implement constructor
}

export { Character, Warrior, Mage, Archer };
