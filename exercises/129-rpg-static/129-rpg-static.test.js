import { test } from 'node:test';
import assert from 'node:assert';
import { Character, Warrior, Mage, Archer } from './129-rpg-static.js';

// ============================================================================
// CHARACTER STATIC METHODS
// ============================================================================

test('Character - static createHero factory', () => {
  const hero = Character.createHero('Aldric');
  
  assert.strictEqual(hero.name, 'Aldric', 'Hero has name');
  assert.strictEqual(hero.health, 150, 'Hero has 150 health');
  assert.strictEqual(hero.mana, 100, 'Hero has 100 mana');
  assert.strictEqual(hero.level, 1, 'Hero starts at level 1');
  assert.strictEqual(hero.isAlive, true, 'Hero is alive');
});

test('Character - static createEnemy factory', () => {
  const enemy = Character.createEnemy('Goblin');
  
  assert.strictEqual(enemy.name, 'Goblin', 'Enemy has name');
  assert.strictEqual(enemy.health, 50, 'Enemy has 50 health');
  assert.strictEqual(enemy.mana, 30, 'Enemy has 30 mana');
  assert.strictEqual(enemy.isAlive, true, 'Enemy is alive');
});

test('Character - static isSameName compares character names', () => {
  const hero1 = new Character('Aldric');
  const hero2 = new Character('Aldric');
  const hero3 = new Character('Merlin');
  
  assert.strictEqual(Character.isSameName(hero1, hero2), true, 'Same names');
  assert.strictEqual(Character.isSameName(hero1, hero3), false, 'Different names');
});

test('Character - static getTotalCharactersCreated tracks instances', () => {
  const before = Character.getTotalCharactersCreated();
  
  new Character('Test1');
  new Character('Test2');
  new Character('Test3');
  
  const after = Character.getTotalCharactersCreated();
  
  assert.strictEqual(after, before + 3, 'Total count increased by 3');
});

test('Character - multiple static methods work together', () => {
  const hero = Character.createHero('Hero1');
  const enemy = Character.createEnemy('Enemy1');
  
  assert(Character.isSameName(hero, hero), 'Hero compared to itself');
  assert.strictEqual(Character.isSameName(hero, enemy), false, 'Different names');
});

// ============================================================================
// WARRIOR STATIC METHODS
// ============================================================================

test('Warrior - static createBerserker factory', () => {
  const berserker = Warrior.createBerserker('Ragnar');
  
  assert.strictEqual(berserker.name, 'Ragnar', 'Berserker has name');
  assert.strictEqual(berserker.health, 200, 'Berserker has 200 health');
  assert.strictEqual(berserker.mana, 10, 'Berserker has 10 mana');
  assert.strictEqual(berserker.weaponType, 'sword', 'Berserker has sword');
  assert(berserker instanceof Warrior, 'Berserker is a Warrior');
  assert(berserker instanceof Character, 'Berserker is a Character');
});

test('Warrior - static createKnight factory', () => {
  const knight = Warrior.createKnight('Lancelot');
  
  assert.strictEqual(knight.name, 'Lancelot', 'Knight has name');
  assert.strictEqual(knight.health, 150, 'Knight has 150 health');
  assert.strictEqual(knight.mana, 30, 'Knight has 30 mana');
  assert.strictEqual(knight.weaponType, 'sword', 'Knight has sword');
  assert(knight instanceof Warrior, 'Knight is a Warrior');
});

test('Warrior - static getWarriorDefaults returns default values', () => {
  const defaults = Warrior.getWarriorDefaults();
  
  assert.strictEqual(typeof defaults, 'object', 'Returns object');
  assert.strictEqual(defaults.health, 150, 'Default health is 150');
  assert.strictEqual(defaults.mana, 20, 'Default mana is 20');
});

test('Warrior - factories create independent instances', () => {
  const berserker = Warrior.createBerserker('B1');
  const knight = Warrior.createKnight('K1');
  
  assert.strictEqual(berserker.health, 200, 'Berserker health');
  assert.strictEqual(knight.health, 150, 'Knight health');
  
  berserker.takeDamage(50);
  assert.strictEqual(berserker.health, 150, 'Berserker damaged');
  assert.strictEqual(knight.health, 150, 'Knight unaffected');
});

// ============================================================================
// MAGE STATIC METHODS
// ============================================================================

test('Mage - static createFireMage factory', () => {
  const fireMage = Mage.createFireMage('Merlin');
  
  assert.strictEqual(fireMage.name, 'Merlin', 'Fire mage has name');
  assert.strictEqual(fireMage.health, 80, 'Fire mage has 80 health');
  assert.strictEqual(fireMage.mana, 120, 'Fire mage has 120 mana');
  assert.strictEqual(fireMage.spellType, 'fireball', 'Fire mage has fireball');
  assert(fireMage instanceof Mage, 'Fire mage is a Mage');
  assert(fireMage instanceof Character, 'Fire mage is a Character');
});

test('Mage - static createFrostMage factory', () => {
  const frostMage = Mage.createFrostMage('Elsa');
  
  assert.strictEqual(frostMage.name, 'Elsa', 'Frost mage has name');
  assert.strictEqual(frostMage.health, 90, 'Frost mage has 90 health');
  assert.strictEqual(frostMage.mana, 110, 'Frost mage has 110 mana');
  assert.strictEqual(frostMage.spellType, 'frostbolt', 'Frost mage has frostbolt');
  assert(frostMage instanceof Mage, 'Frost mage is a Mage');
});

test('Mage - static getMageDefaults returns default values', () => {
  const defaults = Mage.getMageDefaults();
  
  assert.strictEqual(typeof defaults, 'object', 'Returns object');
  assert.strictEqual(defaults.health, 80, 'Default health is 80');
  assert.strictEqual(defaults.mana, 100, 'Default mana is 100');
});

test('Mage - factories create independent instances', () => {
  const fireMage = Mage.createFireMage('FM1');
  const frostMage = Mage.createFrostMage('FrM1');
  
  assert.strictEqual(fireMage.spellType, 'fireball', 'Fire mage spell');
  assert.strictEqual(frostMage.spellType, 'frostbolt', 'Frost mage spell');
  
  fireMage.amplifySpell();
  assert.strictEqual(fireMage.spellPower, 50, 'Fire mage amplified');
  assert.strictEqual(frostMage.spellPower, 30, 'Frost mage unaffected');
});

// ============================================================================
// ARCHER STATIC METHODS
// ============================================================================

test('Archer - static createRanger factory', () => {
  const ranger = Archer.createRanger('Robin');
  
  assert.strictEqual(ranger.name, 'Robin', 'Ranger has name');
  assert.strictEqual(ranger.health, 130, 'Ranger has 130 health');
  assert.strictEqual(ranger.mana, 35, 'Ranger has 35 mana');
  assert.strictEqual(ranger.arrows, 75, 'Ranger has 75 arrows');
  assert(ranger instanceof Archer, 'Ranger is an Archer');
  assert(ranger instanceof Character, 'Ranger is a Character');
});

test('Archer - static createScout factory', () => {
  const scout = Archer.createScout('Will');
  
  assert.strictEqual(scout.name, 'Will', 'Scout has name');
  assert.strictEqual(scout.health, 110, 'Scout has 110 health');
  assert.strictEqual(scout.mana, 40, 'Scout has 40 mana');
  assert.strictEqual(scout.arrows, 30, 'Scout has 30 arrows');
  assert(scout instanceof Archer, 'Scout is an Archer');
});

test('Archer - static getArcherDefaults returns default values', () => {
  const defaults = Archer.getArcherDefaults();
  
  assert.strictEqual(typeof defaults, 'object', 'Returns object');
  assert.strictEqual(defaults.health, 120, 'Default health is 120');
  assert.strictEqual(defaults.mana, 30, 'Default mana is 30');
});

test('Archer - factories create independent instances', () => {
  const ranger = Archer.createRanger('R1');
  const scout = Archer.createScout('S1');
  
  assert.strictEqual(ranger.arrows, 75, 'Ranger arrows');
  assert.strictEqual(scout.arrows, 30, 'Scout arrows');
  
  ranger.shootArrow(new Character('E1', 50, 50, 0));
  assert.strictEqual(ranger.arrows, 74, 'Ranger arrow used');
  assert.strictEqual(scout.arrows, 30, 'Scout unaffected');
});

// ============================================================================
// CROSS-CLASS STATIC FACTORY USE
// ============================================================================

test('Static factories create properly typed instances', () => {
  const hero = Character.createHero('Hero');
  const berserker = Warrior.createBerserker('Berserker');
  const fireMage = Mage.createFireMage('Fire');
  const ranger = Archer.createRanger('Ranger');
  
  assert(hero instanceof Character, 'Hero is Character');
  assert(berserker instanceof Warrior, 'Berserker is Warrior');
  assert(fireMage instanceof Mage, 'Fire mage is Mage');
  assert(ranger instanceof Archer, 'Ranger is Archer');
  
  // All are also instances of Character
  assert(berserker instanceof Character, 'Berserker is also Character');
  assert(fireMage instanceof Character, 'Fire mage is also Character');
  assert(ranger instanceof Character, 'Ranger is also Character');
});

test('Static factories with different configurations', () => {
  const knight = Warrior.createKnight('K1');
  const berserker = Warrior.createBerserker('B1');
  
  assert.strictEqual(knight.health, 150, 'Knight health');
  assert.strictEqual(berserker.health, 200, 'Berserker higher health');
  assert.strictEqual(knight.mana, 30, 'Knight more mana');
  assert.strictEqual(berserker.mana, 10, 'Berserker lower mana');
});

// ============================================================================
// STATIC METHOD PATTERNS
// ============================================================================

test('Static methods do not affect instances', () => {
  const warrior = new Warrior('Test');
  const health1 = warrior.health;
  
  // Call static method
  Warrior.getWarriorDefaults();
  
  const health2 = warrior.health;
  
  assert.strictEqual(health1, health2, 'Instance unaffected by static method');
});

test('Static factories vs constructors - both work', () => {
  const warrior1 = new Warrior('Direct', 200, 15);
  const warrior2 = Warrior.createBerserker('Factory');
  
  assert(warrior1 instanceof Warrior, 'Direct constructor works');
  assert(warrior2 instanceof Warrior, 'Factory method works');
  
  assert.strictEqual(warrior1.health, 200, 'Direct constructor has custom health');
  assert.strictEqual(warrior2.health, 200, 'Factory creates berserker with 200 health');
});

test('Static methods are called on class, not instances', () => {
  const warrior = Warrior.createBerserker('Test');
  
  // Call static method on class
  const defaults = Warrior.getWarriorDefaults();
  assert(defaults, 'Static method called on class works');
  
  // Note: Instances can also call static methods in JavaScript
  // but it's not recommended
  const defaults2 = warrior.constructor.getWarriorDefaults();
  assert(defaults2, 'Can call via constructor property');
});

test('Character total count increments correctly', () => {
  const before = Character.getTotalCharactersCreated();
  
  // Create various characters
  Character.createHero('H1');
  Character.createEnemy('E1');
  new Warrior('W1');
  new Mage('M1');
  new Archer('A1');
  
  const after = Character.getTotalCharactersCreated();
  
  assert.strictEqual(after, before + 5, 'All character types increment counter');
});

// ============================================================================
// FACTORY PATTERN BENEFITS
// ============================================================================

test('Factories provide preset configurations', () => {
  const fireMage = Mage.createFireMage('FM1');
  const frostMage = Mage.createFrostMage('FrM1');
  
  // Different spell types set automatically
  assert.strictEqual(fireMage.spellType, 'fireball', 'Fire mage configured');
  assert.strictEqual(frostMage.spellType, 'frostbolt', 'Frost mage configured');
  
  // But both are Mages
  assert(fireMage instanceof Mage, 'Fire mage is Mage');
  assert(frostMage instanceof Mage, 'Frost mage is Mage');
});

test('Factories enable easy character creation', () => {
  // Easy party creation
  const party = [
    Warrior.createKnight('Knight'),
    Mage.createFireMage('Fire Mage'),
    Archer.createRanger('Ranger')
  ];
  
  assert.strictEqual(party.length, 3, 'Party created');
  assert(party[0] instanceof Warrior, 'Has warrior');
  assert(party[1] instanceof Mage, 'Has mage');
  assert(party[2] instanceof Archer, 'Has archer');
});

test('Static method queries work', () => {
  const warrior1 = new Warrior('Thorvald');
  const warrior2 = new Warrior('Thorvald');
  const archer = new Archer('Robin');
  
  assert.strictEqual(Warrior.isSameName(warrior1, warrior2), true, 'Same names');
  assert.strictEqual(Warrior.isSameName(warrior1, archer), false, 'Different types');
});
