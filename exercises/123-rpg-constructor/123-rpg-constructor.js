/**
 * Exercise 128: RPG Character System - Constructor Function
 *
 * Build an RPG character system using constructor functions.
 * Learn how constructors work as object creation patterns,
 * the 'new' keyword, the 'this' keyword, and instance properties.
 *
 * In this exercise, we'll focus on the basics of constructor functions:
 * - How to create a constructor function
 * - Using 'new' to create instances
 * - Initializing properties with 'this'
 * - Different characters with independent state
 *
 * Constructor functions are a pre-ES6 way to create objects.
 * They work by calling a function with the 'new' keyword,
 * which creates a new object and sets 'this' to refer to that object.
 */

// TODO: Create a Character constructor function
// The constructor should accept: name, initialHealth, initialMana, initialExperience
// Set these as instance properties: this.name, this.health, this.mana, this.experience
// Set level to 1 and isAlive to true
function Character(name, initialHealth = 100, initialMana = 50, initialExperience = 0) {
  // TODO: Implement constructor
}

// TODO: Create a Warrior constructor function that sets up warrior-specific properties
// Parameters: name, initialHealth (default 150), initialMana (default 20)
// In addition to character properties, add:
// - weaponType: 'sword'
// - armor: 25
// - rage: 0 (warrior-specific stat)
function Warrior(name, initialHealth = 150, initialMana = 20) {
  // TODO: Implement constructor (use Character logic plus warrior specifics)
}

// TODO: Create a Mage constructor function
// Parameters: name, initialHealth (default 80), initialMana (default 100)
// In addition to character properties, add:
// - spellType: 'fireball'
// - spellPower: 30
// - focus: 0 (mage-specific stat)
function Mage(name, initialHealth = 80, initialMana = 100) {
  // TODO: Implement constructor
}

// TODO: Create an Archer constructor function
// Parameters: name, initialHealth (default 120), initialMana (default 30)
// In addition to character properties, add:
// - bowType: 'longbow'
// - arrows: 50
// - precision: 0 (archer-specific stat)
function Archer(name, initialHealth = 120, initialMana = 30) {
  // TODO: Implement constructor
}

export { Character, Warrior, Mage, Archer };
