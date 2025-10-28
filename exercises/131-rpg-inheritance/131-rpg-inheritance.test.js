import { test } from 'node:test';
import assert from 'node:assert';
import { Character, Warrior, Mage, Archer } from './131-rpg-inheritance.js';

// ============================================================================
// INHERITANCE BASICS
// ============================================================================

test('Warrior inherits from Character', () => {
  const warrior = new Warrior('Thorvald');
  
  assert(warrior instanceof Warrior, 'Warrior is instance of Warrior');
  assert(warrior instanceof Character, 'Warrior is also instance of Character');
});

test('Mage inherits from Character', () => {
  const mage = new Mage('Merlin');
  
  assert(mage instanceof Mage, 'Mage is instance of Mage');
  assert(mage instanceof Character, 'Mage is also instance of Character');
});

test('Archer inherits from Character', () => {
  const archer = new Archer('Robin');
  
  assert(archer instanceof Archer, 'Archer is instance of Archer');
  assert(archer instanceof Character, 'Archer is also instance of Character');
});

// ============================================================================
// INHERITED PROPERTIES
// ============================================================================

test('Warrior inherits Character properties from super()', () => {
  const warrior = new Warrior('Thorvald', 150, 20);
  
  assert.strictEqual(warrior.name, 'Thorvald', 'Has inherited name');
  assert.strictEqual(warrior.health, 150, 'Has inherited health');
  assert.strictEqual(warrior.mana, 20, 'Has inherited mana');
  assert.strictEqual(warrior.level, 1, 'Has inherited level');
  assert.strictEqual(warrior.isAlive, true, 'Has inherited isAlive');
  assert.strictEqual(warrior.experience, 0, 'Has inherited experience');
});

test('Mage inherits Character properties from super()', () => {
  const mage = new Mage('Merlin', 80, 100);
  
  assert.strictEqual(mage.name, 'Merlin', 'Has inherited name');
  assert.strictEqual(mage.health, 80, 'Has inherited health');
  assert.strictEqual(mage.mana, 100, 'Has inherited mana');
  assert.strictEqual(mage.level, 1, 'Has inherited level');
  assert.strictEqual(mage.isAlive, true, 'Has inherited isAlive');
});

test('Archer inherits Character properties from super()', () => {
  const archer = new Archer('Robin', 120, 30);
  
  assert.strictEqual(archer.name, 'Robin', 'Has inherited name');
  assert.strictEqual(archer.health, 120, 'Has inherited health');
  assert.strictEqual(archer.mana, 30, 'Has inherited mana');
  assert.strictEqual(archer.level, 1, 'Has inherited level');
  assert.strictEqual(archer.isAlive, true, 'Has inherited isAlive');
});

// ============================================================================
// SPECIALIZED PROPERTIES
// ============================================================================

test('Warrior has specialized properties', () => {
  const warrior = new Warrior('Thorvald');
  
  assert.strictEqual(warrior.weaponType, 'sword', 'Has weapon type');
  assert.strictEqual(warrior.armor, 25, 'Has armor');
  assert.strictEqual(warrior.rage, 0, 'Has rage');
});

test('Mage has specialized properties', () => {
  const mage = new Mage('Merlin');
  
  assert.strictEqual(mage.spellType, 'fireball', 'Has spell type');
  assert.strictEqual(mage.spellPower, 30, 'Has spell power');
  assert.strictEqual(mage.focus, 0, 'Has focus');
});

test('Archer has specialized properties', () => {
  const archer = new Archer('Robin');
  
  assert.strictEqual(archer.bowType, 'longbow', 'Has bow type');
  assert.strictEqual(archer.arrows, 50, 'Has arrows');
  assert.strictEqual(archer.precision, 0, 'Has precision');
});

// ============================================================================
// INHERITED METHODS
// ============================================================================

test('Warrior inherits Character methods - takeDamage', () => {
  const warrior = new Warrior('Thorvald', 150);
  warrior.takeDamage(30);
  
  assert.strictEqual(warrior.health, 120, 'takeDamage works');
});

test('Warrior inherits Character methods - heal', () => {
  const warrior = new Warrior('Thorvald', 150);
  warrior.takeDamage(40);
  warrior.heal(20);
  
  assert.strictEqual(warrior.health, 130, 'heal works');
});

test('Warrior inherits Character methods - useMana', () => {
  const warrior = new Warrior('Thorvald', 150, 20);
  const result = warrior.useMana(10);
  
  assert.strictEqual(result, true, 'useMana works');
  assert.strictEqual(warrior.mana, 10, 'Mana reduced');
});

test('Warrior inherits Character methods - gainExperience', () => {
  const warrior = new Warrior('Thorvald');
  warrior.gainExperience(50);
  
  assert.strictEqual(warrior.experience, 50, 'gainExperience works');
});

test('Mage inherits Character methods', () => {
  const mage = new Mage('Merlin');
  mage.takeDamage(20);
  mage.gainExperience(30);
  
  assert.strictEqual(mage.health, 60, 'Mage takeDamage works (80-20)');
  assert.strictEqual(mage.experience, 30, 'Mage gainExperience works');
});

test('Archer inherits Character methods', () => {
  const archer = new Archer('Robin');
  archer.takeDamage(25);
  archer.restoreMana(10);
  
  assert.strictEqual(archer.health, 95, 'Archer takeDamage works (120-25)');
  assert.strictEqual(archer.mana, 40, 'Archer restoreMana works (30+10)');
});

// ============================================================================
// SPECIALIZED METHODS
// ============================================================================

test('Warrior specialized - attack method', () => {
  const warrior = new Warrior('Thorvald');
  const enemy = new Character('Goblin', 100, 50, 0);
  
  const result = warrior.attack(enemy, 25);
  
  assert.strictEqual(enemy.health, 75, 'Enemy takes damage');
  assert.strictEqual(warrior.experience, 10, 'Warrior gains experience');
  assert.strictEqual(warrior.rage, 5, 'Rage increases');
  assert.strictEqual(result, warrior, 'Returns this');
});

test('Warrior specialized - defend method', () => {
  const warrior = new Warrior('Thorvald');
  const damageTaken = warrior.defend(40);
  
  assert.strictEqual(damageTaken, 20, 'Armor reduces damage by 50%');
});

test('Warrior specialized - powerAttack method', () => {
  const warrior = new Warrior('Thorvald');
  const enemy = new Character('Goblin', 100, 50, 0);
  
  const result = warrior.powerAttack(enemy);
  
  assert.strictEqual(warrior.rage, 0, 'Rage reset');
  assert.strictEqual(result, warrior, 'powerAttack returns this when successful');
});

test('Warrior specialized - getRage method', () => {
  const warrior = new Warrior('Thorvald');
  assert.strictEqual(warrior.getRage(), 0, 'Initial rage is 0');
  
  const enemy = new Character('Goblin', 50, 50, 0);
  warrior.attack(enemy);
  assert.strictEqual(warrior.getRage(), 5, 'Rage increases after attack');
});

test('Mage specialized - castSpell method', () => {
  const mage = new Mage('Merlin');
  const enemy = new Character('Goblin', 100, 50, 0);
  
  const result = mage.castSpell(enemy, 30);
  
  assert.strictEqual(enemy.health, 70, 'Enemy takes spell power damage');
  assert.strictEqual(mage.mana, 70, 'Mana used');
  assert.strictEqual(mage.experience, 15, 'Experience gained');
  assert.strictEqual(result, mage, 'Returns this when successful');
});

test('Mage specialized - meditate method', () => {
  const mage = new Mage('Merlin');
  mage.castSpell(new Character('Goblin', 50, 50, 0), 40);
  mage.meditate();
  
  assert.strictEqual(mage.mana, 100, 'Mana restored');
  assert.strictEqual(mage.focus, 0, 'Focus reset');
});

test('Mage specialized - getFocus method', () => {
  const mage = new Mage('Merlin');
  assert.strictEqual(mage.getFocus(), 0, 'Initial focus is 0');
});

test('Archer specialized - shootArrow method', () => {
  const archer = new Archer('Robin');
  const enemy = new Character('Goblin', 100, 50, 0);
  
  const result = archer.shootArrow(enemy, 15);
  
  assert.strictEqual(enemy.health, 85, 'Enemy takes damage');
  assert.strictEqual(archer.arrows, 49, 'Arrow count decreased');
  assert.strictEqual(archer.experience, 8, 'Experience gained');
  assert.strictEqual(result, archer, 'Returns this');
});

test('Archer specialized - restock method', () => {
  const archer = new Archer('Robin');
  archer.arrows = 10;
  archer.restock(20);
  
  assert.strictEqual(archer.arrows, 30, 'Arrows restocked');
});

test('Archer specialized - getPrecision method', () => {
  const archer = new Archer('Robin');
  assert.strictEqual(archer.getPrecision(), 0, 'Initial precision is 0');
});

// ============================================================================
// POLYMORPHISM
// ============================================================================

test('Polymorphism - different classes handle attacks differently', () => {
  const warrior = new Warrior('W1', 150, 20);
  const mage = new Mage('M1', 80, 100);
  const archer = new Archer('A1', 120, 30);
  
  const enemy = new Character('E1', 100, 50, 0);
  
  // Each character type attacks differently
  warrior.attack(enemy, 20);
  assert.strictEqual(enemy.health, 80, 'After warrior attack');
  assert.strictEqual(warrior.rage, 5, 'Warrior gains rage');
  
  // Reset enemy
  const enemy2 = new Character('E2', 100, 50, 0);
  
  mage.castSpell(enemy2, 30);
  assert.strictEqual(enemy2.health, 70, 'After mage spell');
  assert.strictEqual(mage.focus > 0, 'Mage gains focus');
});

// ============================================================================
// INHERITANCE CHAIN
// ============================================================================

test('instanceof works correctly with inheritance chain', () => {
  const warrior = new Warrior('Test');
  const mage = new Mage('Test');
  const archer = new Archer('Test');
  const character = new Character('Test');
  
  // Each subclass is instance of itself and Character
  assert(warrior instanceof Warrior, 'Warrior is Warrior');
  assert(warrior instanceof Character, 'Warrior is Character');
  assert(mage instanceof Mage, 'Mage is Mage');
  assert(mage instanceof Character, 'Mage is Character');
  assert(archer instanceof Archer, 'Archer is Archer');
  assert(archer instanceof Character, 'Archer is Character');
  
  // Character instances are not subclass instances
  assert(!(character instanceof Warrior), 'Character is not Warrior');
  assert(!(character instanceof Mage), 'Character is not Mage');
  assert(!(character instanceof Archer), 'Character is not Archer');
});

// ============================================================================
// MULTIPLE INSTANCES INDEPENDENCE
// ============================================================================

test('Multiple warrior instances are independent', () => {
  const warrior1 = new Warrior('W1');
  const warrior2 = new Warrior('W2', 120);
  
  warrior1.attack(new Character('E1', 50, 50, 0), 20);
  
  assert.strictEqual(warrior1.experience, 10, 'Warrior 1 has experience');
  assert.strictEqual(warrior2.experience, 0, 'Warrior 2 unaffected');
  assert.strictEqual(warrior1.rage, 5, 'Warrior 1 has rage');
  assert.strictEqual(warrior2.rage, 0, 'Warrior 2 unaffected');
});

test('Multiple mage instances are independent', () => {
  const mage1 = new Mage('M1');
  const mage2 = new Mage('M2', 90, 90);
  
  mage1.castSpell(new Character('E1', 50, 50, 0), 30);
  
  assert.strictEqual(mage1.mana, 70, 'Mage 1 used mana');
  assert.strictEqual(mage2.mana, 90, 'Mage 2 unchanged');
  assert.strictEqual(mage1.experience, 15, 'Mage 1 has experience');
  assert.strictEqual(mage2.experience, 0, 'Mage 2 unaffected');
});

// ============================================================================
// MIXED CHARACTER INTERACTIONS
// ============================================================================

test('Different character types interact', () => {
  const warrior = new Warrior('Thorvald');
  const mage = new Mage('Merlin');
  const archer = new Archer('Robin');
  
  const goblin = new Character('Goblin', 100, 50, 0);
  
  warrior.attack(goblin, 20);
  assert.strictEqual(goblin.health, 80, 'After warrior attack');
  
  mage.castSpell(goblin, 25);
  assert.strictEqual(goblin.health, 50, 'After mage spell (80 - 30)');
  
  archer.shootArrow(goblin, 18);
  assert.strictEqual(goblin.health, 32, 'After archer arrow (50 - 18)');
});

test('All character types can be healed and restored', () => {
  const warrior = new Warrior('W1', 100);
  const mage = new Mage('M1', 70);
  const archer = new Archer('A1', 100);
  
  warrior.takeDamage(30);
  mage.takeDamage(30);
  archer.takeDamage(30);
  
  warrior.heal(15);
  mage.heal(15);
  archer.heal(15);
  
  assert.strictEqual(warrior.health, 85, 'Warrior healed');
  assert.strictEqual(mage.health, 55, 'Mage healed');
  assert.strictEqual(archer.health, 85, 'Archer healed');
});

// ============================================================================
// GETSTATUS FROM INHERITED METHOD
// ============================================================================

test('Warrior getStatus includes inherited properties', () => {
  const warrior = new Warrior('Thorvald', 150, 20, 50);
  const status = warrior.getStatus();
  
  assert.strictEqual(status.name, 'Thorvald', 'Name in status');
  assert.strictEqual(status.health, 150, 'Health in status');
  assert.strictEqual(status.mana, 20, 'Mana in status');
  assert.strictEqual(status.experience, 50, 'Experience in status');
  assert.strictEqual(status.level, 1, 'Level in status');
  assert.strictEqual(status.isAlive, true, 'isAlive in status');
});

test('Mage getStatus works correctly', () => {
  const mage = new Mage('Merlin', 80, 100, 75);
  const status = mage.getStatus();
  
  assert.strictEqual(status.name, 'Merlin', 'Name in status');
  assert.strictEqual(status.health, 80, 'Health in status');
  assert.strictEqual(status.mana, 100, 'Mana in status');
  assert.strictEqual(status.experience, 75, 'Experience in status');
});

test('Archer getStatus works correctly', () => {
  const archer = new Archer('Robin', 120, 30, 100);
  const status = archer.getStatus();
  
  assert.strictEqual(status.name, 'Robin', 'Name in status');
  assert.strictEqual(status.health, 120, 'Health in status');
  assert.strictEqual(status.mana, 30, 'Mana in status');
  assert.strictEqual(status.experience, 100, 'Experience in status');
  assert.strictEqual(status.level, 2, 'Level increased to 2 at 100 exp');
});
