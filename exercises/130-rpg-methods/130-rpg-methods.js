/**
 * Exercise 130: RPG Character System - Methods and Properties
 *
 * Add methods to RPG characters to implement game mechanics.
 * Learn how to define instance methods in classes,
 * use 'this' to modify state, and create game logic.
 *
 * Methods allow you to:
 * - Define behavior for characters
 * - Encapsulate game logic
 * - Modify and track state changes
 * - Create complex interactions
 */

// TODO: Create a Character class with methods
// Constructor should accept: name, initialHealth, initialMana, initialExperience (with defaults)
// Properties: name, health, mana, experience, level=1, isAlive=true
//
// Methods to implement:
// 1. takeDamage(amount): Reduce health by amount. If health <= 0, set isAlive=false. Return this.
// 2. heal(amount): Increase health (cannot exceed initial health). Return this.
// 3. useMana(amount): Reduce mana if available. Return true if successful, false if not enough mana.
// 4. restoreMana(amount): Increase mana. Return this.
// 5. gainExperience(amount): Increase experience and check for level up (every 100 exp = +1 level). Return this.
// 6. getStatus(): Return object with { name, health, mana, experience, level, isAlive }
class Character {
  // TODO: Implement Character class with constructor and methods
}

// TODO: Create a Warrior class that extends Character
// Constructor: name, initialHealth=150, initialMana=20
// Properties: weaponType='sword', armor=25, rage=0
// Additional methods:
// 1. attack(enemy, damage=20): Deal damage to enemy, gain 10 experience, increase rage by 5. Return this.
// 2. defend(incomingDamage): Reduce damage by armor value, reduce incoming by 50%. Return damage taken.
// 3. powerAttack(enemy): Use 30 mana to deal 50 damage, set rage to 0. Return this or false if not enough mana.
// 4. getRage(): Return rage value
class Warrior extends Character {
  // TODO: Implement Warrior class with specialized methods
}

// TODO: Create a Mage class that extends Character
// Constructor: name, initialHealth=80, initialMana=100
// Properties: spellType='fireball', spellPower=30, focus=0
// Additional methods:
// 1. castSpell(enemy, manaCost=30): Deal spellPower damage if mana available, gain 15 experience, increase focus. Return this or false.
// 2. meditate(): Restore 40 mana and set focus to 0. Return this.
// 3. amplifySpell(): Increase spell power and mana cost. Use 20 mana to boost damage to 50. Return this or false.
// 4. getFocus(): Return focus value
class Mage extends Character {
  // TODO: Implement Mage class with specialized methods
}

// TODO: Create an Archer class that extends Character
// Constructor: name, initialHealth=120, initialMana=30
// Properties: bowType='longbow', arrows=50, precision=0
// Additional methods:
// 1. shootArrow(enemy, damage=15): Deal damage if arrows > 0, reduce arrows, gain 8 experience. Return this or false.
// 2. restock(arrowCount=20): Add arrows to inventory. Return this.
// 3. precisionShot(enemy, damage=25): Use 2 arrows and 15 mana for powerful shot, increase precision. Return this or false.
// 4. getPrecision(): Return precision value
class Archer extends Character {
  // TODO: Implement Archer class with specialized methods
}

export { Character, Warrior, Mage, Archer };
