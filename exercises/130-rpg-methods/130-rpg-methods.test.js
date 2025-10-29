import { test } from 'node:test';
import assert from 'node:assert';
import { Character, Warrior, Mage, Archer } from './130-rpg-methods.js';

// ============================================================================
// CHARACTER CLASS TESTS
// ============================================================================

test('Character - takeDamage reduces health and returns this', () => {
  const hero = new Character('Aldric', 100);
  const result = hero.takeDamage(30);
  
  assert.strictEqual(hero.health, 70, 'Health reduced by damage amount');
  assert.strictEqual(result, hero, 'takeDamage returns this for chaining');
  assert.strictEqual(hero.isAlive, true, 'Still alive above 0 health');
});

test('Character - takeDamage sets isAlive to false when health <= 0', () => {
  const hero = new Character('Aldric', 50);
  hero.takeDamage(50);
  
  assert.strictEqual(hero.health, 0, 'Health at 0');
  assert.strictEqual(hero.isAlive, false, 'isAlive set to false');
});

test('Character - takeDamage with overkill damage', () => {
  const hero = new Character('Aldric', 50);
  hero.takeDamage(100);
  
  assert.strictEqual(hero.health, -50, 'Health goes negative');
  assert.strictEqual(hero.isAlive, false, 'isAlive set to false');
});

test('Character - heal increases health', () => {
  const hero = new Character('Aldric', 100);
  hero.takeDamage(40);
  const result = hero.heal(20);
  
  assert.strictEqual(hero.health, 80, 'Health increased by heal amount');
  assert.strictEqual(result, hero, 'heal returns this for chaining');
});

test('Character - heal cannot exceed initial health', () => {
  const hero = new Character('Aldric', 100);
  hero.heal(50);
  
  assert.strictEqual(hero.health, 100, 'Health capped at initial health');
});

test('Character - useMana reduces mana when available', () => {
  const hero = new Character('Aldric', 100, 50);
  const result = hero.useMana(20);
  
  assert.strictEqual(hero.mana, 30, 'Mana reduced by amount');
  assert.strictEqual(result, true, 'Returns true when mana available');
});

test('Character - useMana returns false when insufficient', () => {
  const hero = new Character('Aldric', 100, 20);
  const result = hero.useMana(30);
  
  assert.strictEqual(hero.mana, 20, 'Mana unchanged');
  assert.strictEqual(result, false, 'Returns false when insufficient');
});

test('Character - restoreMana increases mana and returns this', () => {
  const hero = new Character('Aldric', 100, 30);
  hero.useMana(20);
  const result = hero.restoreMana(15);
  
  assert.strictEqual(hero.mana, 25, 'Mana restored');
  assert.strictEqual(result, hero, 'restoreMana returns this');
});

test('Character - gainExperience increases experience', () => {
  const hero = new Character('Aldric', 100, 50, 0);
  const result = hero.gainExperience(50);
  
  assert.strictEqual(hero.experience, 50, 'Experience increased');
  assert.strictEqual(result, hero, 'gainExperience returns this');
  assert.strictEqual(hero.level, 1, 'Level stays 1 below 100 exp');
});

test('Character - gainExperience levels up at 100 exp', () => {
  const hero = new Character('Aldric', 100, 50, 50);
  hero.gainExperience(50);
  
  assert.strictEqual(hero.experience, 100, 'Experience at 100');
  assert.strictEqual(hero.level, 2, 'Level increased to 2');
});

test('Character - gainExperience multiple level ups', () => {
  const hero = new Character('Aldric', 100, 50, 0);
  hero.gainExperience(250);
  
  assert.strictEqual(hero.experience, 250, 'Experience at 250');
  assert.strictEqual(hero.level, 3, 'Level is 3 (250 exp / 100)');
});

test('Character - getStatus returns object with current state', () => {
  const hero = new Character('Aldric', 100, 50, 25);
  const status = hero.getStatus();
  
  assert.strictEqual(status.name, 'Aldric', 'Status includes name');
  assert.strictEqual(status.health, 100, 'Status includes health');
  assert.strictEqual(status.mana, 50, 'Status includes mana');
  assert.strictEqual(status.experience, 25, 'Status includes experience');
  assert.strictEqual(status.level, 1, 'Status includes level');
  assert.strictEqual(status.isAlive, true, 'Status includes isAlive');
});

test('Character - method chaining works', () => {
  const hero = new Character('Aldric', 100, 50);
  hero.takeDamage(20).heal(10).restoreMana(20).gainExperience(30);
  
  assert.strictEqual(hero.health, 90, 'Health after chain: 100 - 20 + 10');
  assert.strictEqual(hero.mana, 70, 'Mana after chain: 50 + 20');
  assert.strictEqual(hero.experience, 30, 'Experience after chain');
});

// ============================================================================
// WARRIOR CLASS TESTS
// ============================================================================

test('Warrior - inherits Character properties', () => {
  const warrior = new Warrior('Thorvald');
  
  assert.strictEqual(warrior.name, 'Thorvald', 'Has name');
  assert.strictEqual(warrior.health, 150, 'Has warrior health default');
  assert.strictEqual(warrior.mana, 20, 'Has warrior mana default');
  assert.strictEqual(warrior.level, 1, 'Starts at level 1');
  assert.strictEqual(warrior.isAlive, true, 'Starts alive');
});

test('Warrior - has warrior-specific properties', () => {
  const warrior = new Warrior('Thorvald');
  
  assert.strictEqual(warrior.weaponType, 'sword', 'Has weapon type');
  assert.strictEqual(warrior.armor, 25, 'Has armor value');
  assert.strictEqual(warrior.rage, 0, 'Starts with 0 rage');
});

test('Warrior - attack deals damage and gains experience', () => {
  const warrior = new Warrior('Thorvald');
  const enemy = new Character('Goblin', 50);
  const result = warrior.attack(enemy, 20);
  
  assert.strictEqual(enemy.health, 30, 'Enemy takes damage');
  assert.strictEqual(warrior.experience, 10, 'Warrior gains 10 experience');
  assert.strictEqual(warrior.rage, 5, 'Rage increases by 5');
  assert.strictEqual(result, warrior, 'attack returns this');
});

test('Warrior - defend reduces incoming damage by armor percentage', () => {
  const warrior = new Warrior('Thorvald');
  const damageTaken = warrior.defend(40);
  
  // Armor 25 should reduce by 50%, so 40 * 0.5 = 20
  assert.strictEqual(damageTaken, 20, 'Damage reduced by armor percentage');
});

test('Warrior - powerAttack uses mana and deals high damage', () => {
  const warrior = new Warrior('Thorvald');
  const enemy = new Character('Goblin', 100);
  const result = warrior.powerAttack(enemy);
  
  assert.strictEqual(warrior.mana, -10, 'Mana used (20 - 30 = -10 if capped)');
  assert.strictEqual(warrior.rage, 0, 'Rage reset to 0 after power attack');
  assert.strictEqual(result, warrior, 'powerAttack returns this when successful');
});

test('Warrior - powerAttack fails with insufficient mana', () => {
  const warrior = new Warrior('Thorvald', 100, 10);
  const enemy = new Character('Goblin', 100);
  const result = warrior.powerAttack(enemy);
  
  assert.strictEqual(result, false, 'powerAttack returns false with insufficient mana');
  assert.strictEqual(enemy.health, 100, 'Enemy unharmed');
  assert.strictEqual(warrior.mana, 10, 'Mana unchanged');
});

test('Warrior - getRage returns current rage value', () => {
  const warrior = new Warrior('Thorvald');
  assert.strictEqual(warrior.getRage(), 0, 'Initial rage is 0');
  
  const enemy = new Character('Goblin', 50);
  warrior.attack(enemy);
  assert.strictEqual(warrior.getRage(), 5, 'Rage increases after attack');
});

test('Warrior - attack chain', () => {
  const warrior = new Warrior('Thorvald');
  const enemy = new Character('Goblin', 100);
  
  warrior.attack(enemy, 20).attack(enemy, 15);
  
  assert.strictEqual(enemy.health, 65, 'Enemy damaged twice');
  assert.strictEqual(warrior.experience, 20, 'Experience from two attacks');
  assert.strictEqual(warrior.rage, 10, 'Rage from two attacks');
});

// ============================================================================
// MAGE CLASS TESTS
// ============================================================================

test('Mage - inherits Character properties', () => {
  const mage = new Mage('Merlin');
  
  assert.strictEqual(mage.name, 'Merlin', 'Has name');
  assert.strictEqual(mage.health, 80, 'Has mage health default');
  assert.strictEqual(mage.mana, 100, 'Has mage mana default');
  assert.strictEqual(mage.level, 1, 'Starts at level 1');
  assert.strictEqual(mage.isAlive, true, 'Starts alive');
});

test('Mage - has mage-specific properties', () => {
  const mage = new Mage('Merlin');
  
  assert.strictEqual(mage.spellType, 'fireball', 'Has spell type');
  assert.strictEqual(mage.spellPower, 30, 'Has spell power');
  assert.strictEqual(mage.focus, 0, 'Starts with 0 focus');
});

test('Mage - castSpell deals damage and uses mana', () => {
  const mage = new Mage('Merlin');
  const enemy = new Character('Goblin', 100);
  const result = mage.castSpell(enemy, 30);
  
  assert.strictEqual(enemy.health, 70, 'Enemy takes spell power damage');
  assert.strictEqual(mage.mana, 70, 'Mana used (100 - 30)');
  assert.strictEqual(mage.experience, 15, 'Mage gains 15 experience');
  assert.strictEqual(result, mage, 'castSpell returns this');
});

test('Mage - castSpell fails with insufficient mana', () => {
  const mage = new Mage('Merlin', 80, 20);
  const enemy = new Character('Goblin', 100);
  const result = mage.castSpell(enemy, 30);
  
  assert.strictEqual(result, false, 'castSpell returns false when insufficient mana');
  assert.strictEqual(enemy.health, 100, 'Enemy unharmed');
  assert.strictEqual(mage.mana, 20, 'Mana unchanged');
});

test('Mage - meditate restores mana', () => {
  const mage = new Mage('Merlin');
  mage.castSpell(new Character('Goblin', 50), 40);
  const result = mage.meditate();
  
  assert.strictEqual(mage.mana, 100, 'Mana restored to 100');
  assert.strictEqual(mage.focus, 0, 'Focus set to 0');
  assert.strictEqual(result, mage, 'meditate returns this');
});

test('Mage - amplifySpell increases damage for mana cost', () => {
  const mage = new Mage('Merlin');
  const enemy = new Character('Goblin', 100);
  mage.amplifySpell();
  mage.castSpell(enemy, 30);
  
  assert.strictEqual(enemy.health, 50, 'Enemy takes amplified spell damage (50 instead of 30)');
  assert.strictEqual(mage.mana, 50, 'Mana cost for amplify was 20');
});

test('Mage - amplifySpell fails with insufficient mana', () => {
  const mage = new Mage('Merlin', 80, 10);
  const result = mage.amplifySpell();
  
  assert.strictEqual(result, false, 'amplifySpell returns false');
  assert.strictEqual(mage.spellPower, 30, 'Spell power unchanged');
});

test('Mage - getFocus returns current focus value', () => {
  const mage = new Mage('Merlin');
  const enemy = new Character('Goblin', 50);
  
  assert.strictEqual(mage.getFocus(), 0, 'Initial focus is 0');
  mage.castSpell(enemy);
  assert(mage.getFocus() > 0, 'Focus increases after spell cast');
});

// ============================================================================
// ARCHER CLASS TESTS
// ============================================================================

test('Archer - inherits Character properties', () => {
  const archer = new Archer('Robin');
  
  assert.strictEqual(archer.name, 'Robin', 'Has name');
  assert.strictEqual(archer.health, 120, 'Has archer health default');
  assert.strictEqual(archer.mana, 30, 'Has archer mana default');
  assert.strictEqual(archer.level, 1, 'Starts at level 1');
  assert.strictEqual(archer.isAlive, true, 'Starts alive');
});

test('Archer - has archer-specific properties', () => {
  const archer = new Archer('Robin');
  
  assert.strictEqual(archer.bowType, 'longbow', 'Has bow type');
  assert.strictEqual(archer.arrows, 50, 'Has arrows');
  assert.strictEqual(archer.precision, 0, 'Starts with 0 precision');
});

test('Archer - shootArrow deals damage and uses arrows', () => {
  const archer = new Archer('Robin');
  const enemy = new Character('Goblin', 100);
  const result = archer.shootArrow(enemy, 15);
  
  assert.strictEqual(enemy.health, 85, 'Enemy takes arrow damage');
  assert.strictEqual(archer.arrows, 49, 'Arrow count decreased');
  assert.strictEqual(archer.experience, 8, 'Archer gains experience');
  assert.strictEqual(result, archer, 'shootArrow returns this');
});

test('Archer - shootArrow fails with no arrows', () => {
  const archer = new Archer('Robin', 120, 30, 0);
  archer.arrows = 0;
  const enemy = new Character('Goblin', 100);
  const result = archer.shootArrow(enemy, 15);
  
  assert.strictEqual(result, false, 'shootArrow returns false');
  assert.strictEqual(enemy.health, 100, 'Enemy unharmed');
});

test('Archer - restock adds arrows and returns this', () => {
  const archer = new Archer('Robin');
  archer.arrows = 10;
  const result = archer.restock(20);
  
  assert.strictEqual(archer.arrows, 30, 'Arrows restocked');
  assert.strictEqual(result, archer, 'restock returns this');
});

test('Archer - precisionShot uses arrows and mana', () => {
  const archer = new Archer('Robin');
  const enemy = new Character('Goblin', 100);
  const result = archer.precisionShot(enemy, 25);
  
  assert.strictEqual(enemy.health, 75, 'Enemy takes precision shot damage');
  assert.strictEqual(archer.arrows, 48, 'Uses 2 arrows');
  assert.strictEqual(archer.mana, 15, 'Uses 15 mana');
  assert.strictEqual(result, archer, 'precisionShot returns this');
});

test('Archer - precisionShot fails with insufficient resources', () => {
  const archer = new Archer('Robin', 120, 10);
  archer.arrows = 1;
  const enemy = new Character('Goblin', 100);
  const result = archer.precisionShot(enemy);
  
  assert.strictEqual(result, false, 'precisionShot returns false');
  assert.strictEqual(enemy.health, 100, 'Enemy unharmed');
  assert.strictEqual(archer.arrows, 1, 'Arrows unchanged');
});

test('Archer - getPrecision returns current precision value', () => {
  const archer = new Archer('Robin');
  assert.strictEqual(archer.getPrecision(), 0, 'Initial precision is 0');
  
  const enemy = new Character('Goblin', 50);
  archer.precisionShot(enemy);
  assert(archer.getPrecision() > 0, 'Precision increases after precision shot');
});

test('Archer - shootArrow chain', () => {
  const archer = new Archer('Robin');
  const enemy = new Character('Goblin', 100);
  
  archer.shootArrow(enemy, 10).shootArrow(enemy, 10).shootArrow(enemy, 10);
  
  assert.strictEqual(enemy.health, 70, 'Enemy damaged by 3 arrows');
  assert.strictEqual(archer.arrows, 47, 'Used 3 arrows');
});

// ============================================================================
// CROSS-CLASS INTERACTION TESTS
// ============================================================================

test('Combat scenario - warrior vs character', () => {
  const warrior = new Warrior('Thorvald');
  const goblin = new Character('Goblin', 50);
  
  warrior.attack(goblin, 20);
  warrior.attack(goblin, 20);
  
  assert.strictEqual(goblin.health, 10, 'Goblin health reduced');
  assert.strictEqual(goblin.isAlive, true, 'Goblin still alive');
});

test('Combat scenario - mage vs character', () => {
  const mage = new Mage('Merlin');
  const goblin = new Character('Goblin', 50);
  
  mage.castSpell(goblin, 20);
  mage.castSpell(goblin, 20);
  
  assert.strictEqual(goblin.health, 10, 'Goblin health reduced');
  assert.strictEqual(mage.mana, 60, 'Mana consumed');
});

test('Multiple characters maintain independent state', () => {
  const warrior = new Warrior('W1');
  const mage = new Mage('M1');
  const archer = new Archer('A1');
  
  warrior.attack(new Character('Enemy', 100), 20);
  mage.castSpell(new Character('Enemy', 100), 30);
  archer.shootArrow(new Character('Enemy', 100), 15);
  
  assert.strictEqual(warrior.experience, 10, 'Warrior experience');
  assert.strictEqual(mage.experience, 15, 'Mage experience');
  assert.strictEqual(archer.experience, 8, 'Archer experience');
});
