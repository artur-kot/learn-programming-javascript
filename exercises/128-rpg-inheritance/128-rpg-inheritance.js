/**
 * Exercise 131: RPG Character System - Class Inheritance
 *
 * Master class inheritance using extends and super.
 * Learn how to create specialized classes that inherit from a parent class,
 * and how to override parent methods for specialized behavior.
 *
 * Inheritance allows you to:
 * - Reduce code duplication by sharing common behavior
 * - Create specialized classes with specific capabilities
 * - Build hierarchies of related objects
 * - Implement polymorphism (different behavior, same interface)
 */

// TODO: Create a base Character class with:
// - Constructor: name, initialHealth, initialMana, initialExperience (with defaults)
// - Properties: name, health, mana, experience, level=1, isAlive=true, initialHealth
// - Methods: takeDamage(amount), heal(amount), useMana(amount), restoreMana(amount),
//   gainExperience(amount), getStatus()
class Character {
  // TODO: Implement base Character class
}

// TODO: Create a Warrior class that EXTENDS Character
// - Use extends keyword to inherit from Character
// - Call super(name, health, mana, experience) in constructor
// - Add warrior-specific properties: weaponType='sword', armor=25, rage=0
// - Override attack method with warrior-specific logic:
//   * Deal damage to enemy
//   * Gain 10 experience
//   * Increase rage by 5
//   * Return this for chaining
// - Add methods: defend(incomingDamage), powerAttack(enemy), getRage()
class Warrior extends Character {
  // TODO: Implement Warrior class
}

// TODO: Create a Mage class that EXTENDS Character
// - Use extends keyword to inherit from Character
// - Call super(name, health, mana, experience) in constructor
// - Add mage-specific properties: spellType='fireball', spellPower=30, focus=0
// - Override castSpell method with mage-specific logic
// - Add methods: meditate(), amplifySpell(), getFocus()
class Mage extends Character {
  // TODO: Implement Mage class
}

// TODO: Create an Archer class that EXTENDS Character
// - Use extends keyword to inherit from Character
// - Call super(name, health, mana, experience) in constructor
// - Add archer-specific properties: bowType='longbow', arrows=50, precision=0
// - Override shootArrow method with archer-specific logic
// - Add methods: restock(arrowCount), precisionShot(enemy, damage), getPrecision()
class Archer extends Character {
  // TODO: Implement Archer class
}

export { Character, Warrior, Mage, Archer };
