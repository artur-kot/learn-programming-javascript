/**
 * Exercise 132: RPG Character System - Static Methods
 *
 * Master static methods - methods that belong to the class itself,
 * not to instances. Learn about factory patterns, utilities,
 * and class-level operations.
 *
 * Static methods are useful for:
 * - Factory functions to create configured instances
 * - Utility/helper functions
 * - Class-level counters or registries
 * - Shared calculations that don't require instance state
 */

// TODO: Create a Character class with:
// - Constructor: name, initialHealth, initialMana, initialExperience (with defaults)
// - Properties: name, health, mana, experience, level=1, isAlive=true, initialHealth
// - Methods: takeDamage, heal, useMana, restoreMana, gainExperience, getStatus
// - Static property: totalCharactersCreated = 0 (increment in constructor)
// - Static methods:
//   * createHero(name): Factory to create hero with 150 health, 100 mana
//   * createEnemy(name): Factory to create enemy with 50 health, 30 mana
//   * isSameName(char1, char2): Check if two characters have same name
//   * getTotalCharactersCreated(): Return total characters created
class Character {
  // TODO: Implement Character class with static methods
}

// TODO: Create a Warrior class that extends Character with:
// - Constructor: name, initialHealth=150, initialMana=20
// - Warrior-specific properties: weaponType='sword', armor=25, rage=0
// - Methods: attack, defend, powerAttack, getRage
// - Static methods:
//   * createBerserker(name): High health warrior (200) with low mana (10)
//   * createKnight(name): Balanced warrior (150) with medium mana (30)
//   * getWarriorDefaults(): Return { health: 150, mana: 20 }
class Warrior extends Character {
  // TODO: Implement Warrior class with static methods
}

// TODO: Create a Mage class that extends Character with:
// - Constructor: name, initialHealth=80, initialMana=100
// - Mage-specific properties: spellType='fireball', spellPower=30, focus=0
// - Methods: castSpell, meditate, amplifySpell, getFocus
// - Static methods:
//   * createFireMage(name): Mage with 80 health, 120 mana, spellType='fireball'
//   * createFrostMage(name): Mage with 90 health, 110 mana, spellType='frostbolt'
//   * getMageDefaults(): Return { health: 80, mana: 100 }
class Mage extends Character {
  // TODO: Implement Mage class with static methods
}

// TODO: Create an Archer class that extends Character with:
// - Constructor: name, initialHealth=120, initialMana=30
// - Archer-specific properties: bowType='longbow', arrows=50, precision=0
// - Methods: shootArrow, restock, precisionShot, getPrecision
// - Static methods:
//   * createRanger(name): Archer with 130 health, 35 mana, 75 arrows
//   * createScout(name): Archer with 110 health, 40 mana, 30 arrows
//   * getArcherDefaults(): Return { health: 120, mana: 30 }
class Archer extends Character {
  // TODO: Implement Archer class with static methods
}

export { Character, Warrior, Mage, Archer };
