import { test } from 'node:test';
import assert from 'node:assert';
import { Character, Warrior, Mage, Archer } from './125-rpg-constructor.js';

test('Character constructor - basic initialization', () => {
  const hero = new Character('Aldric', 100, 50, 0);
  
  assert.strictEqual(hero.name, 'Aldric', 'Character name should be set');
  assert.strictEqual(hero.health, 100, 'Character health should be set');
  assert.strictEqual(hero.mana, 50, 'Character mana should be set');
  assert.strictEqual(hero.experience, 0, 'Character experience should be set');
  assert.strictEqual(hero.level, 1, 'Character level should start at 1');
  assert.strictEqual(hero.isAlive, true, 'Character should be alive initially');
});

test('Character constructor - default parameters', () => {
  const hero = new Character('Basic');
  
  assert.strictEqual(hero.name, 'Basic', 'Name should be set');
  assert.strictEqual(hero.health, 100, 'Health should default to 100');
  assert.strictEqual(hero.mana, 50, 'Mana should default to 50');
  assert.strictEqual(hero.experience, 0, 'Experience should default to 0');
});

test('Character constructor - multiple instances are independent', () => {
  const hero1 = new Character('Hero1', 100, 50);
  const hero2 = new Character('Hero2', 150, 75);
  
  assert.strictEqual(hero1.name, 'Hero1', 'First character name');
  assert.strictEqual(hero2.name, 'Hero2', 'Second character name');
  assert.strictEqual(hero1.health, 100, 'First character health');
  assert.strictEqual(hero2.health, 150, 'Second character health');
  
  hero1.health = 50;
  assert.strictEqual(hero2.health, 150, 'Modifying one character should not affect another');
});

test('Character constructor - is object instance', () => {
  const hero = new Character('Test');
  
  assert(hero instanceof Character, 'Created object should be instance of Character');
  assert.strictEqual(typeof hero, 'object', 'Created object should be of type object');
});

test('Warrior constructor - basic initialization', () => {
  const warrior = new Warrior('Thorvald');
  
  assert.strictEqual(warrior.name, 'Thorvald', 'Warrior name should be set');
  assert.strictEqual(warrior.health, 150, 'Warrior health should default to 150');
  assert.strictEqual(warrior.mana, 20, 'Warrior mana should default to 20');
  assert.strictEqual(warrior.level, 1, 'Warrior level should be 1');
  assert.strictEqual(warrior.isAlive, true, 'Warrior should be alive');
  assert.strictEqual(warrior.weaponType, 'sword', 'Warrior weapon should be sword');
  assert.strictEqual(warrior.armor, 25, 'Warrior armor should be set');
  assert.strictEqual(warrior.rage, 0, 'Warrior rage should start at 0');
});

test('Warrior constructor - custom values', () => {
  const warrior = new Warrior('Ragnar', 200, 30);
  
  assert.strictEqual(warrior.name, 'Ragnar', 'Warrior name');
  assert.strictEqual(warrior.health, 200, 'Warrior custom health');
  assert.strictEqual(warrior.mana, 30, 'Warrior custom mana');
  assert.strictEqual(warrior.weaponType, 'sword', 'Warrior weapon type');
  assert.strictEqual(warrior.armor, 25, 'Warrior armor');
});

test('Warrior constructor - multiple instances', () => {
  const warrior1 = new Warrior('Thor');
  const warrior2 = new Warrior('Odin', 180);
  
  assert.strictEqual(warrior1.name, 'Thor', 'First warrior name');
  assert.strictEqual(warrior2.name, 'Odin', 'Second warrior name');
  assert.strictEqual(warrior1.health, 150, 'First warrior default health');
  assert.strictEqual(warrior2.health, 180, 'Second warrior custom health');
});

test('Mage constructor - basic initialization', () => {
  const mage = new Mage('Merlin');
  
  assert.strictEqual(mage.name, 'Merlin', 'Mage name should be set');
  assert.strictEqual(mage.health, 80, 'Mage health should default to 80');
  assert.strictEqual(mage.mana, 100, 'Mage mana should default to 100');
  assert.strictEqual(mage.level, 1, 'Mage level should be 1');
  assert.strictEqual(mage.isAlive, true, 'Mage should be alive');
  assert.strictEqual(mage.spellType, 'fireball', 'Mage spell should be fireball');
  assert.strictEqual(mage.spellPower, 30, 'Mage spell power should be set');
  assert.strictEqual(mage.focus, 0, 'Mage focus should start at 0');
});

test('Mage constructor - custom values', () => {
  const mage = new Mage('Gandalf', 100, 120);
  
  assert.strictEqual(mage.name, 'Gandalf', 'Mage name');
  assert.strictEqual(mage.health, 100, 'Mage custom health');
  assert.strictEqual(mage.mana, 120, 'Mage custom mana');
  assert.strictEqual(mage.spellType, 'fireball', 'Mage spell type');
  assert.strictEqual(mage.spellPower, 30, 'Mage spell power');
});

test('Mage constructor - multiple instances', () => {
  const mage1 = new Mage('Albus');
  const mage2 = new Mage('Minerva', 90, 110);
  
  assert.strictEqual(mage1.name, 'Albus', 'First mage name');
  assert.strictEqual(mage2.name, 'Minerva', 'Second mage name');
  assert.strictEqual(mage1.mana, 100, 'First mage default mana');
  assert.strictEqual(mage2.mana, 110, 'Second mage custom mana');
});

test('Archer constructor - basic initialization', () => {
  const archer = new Archer('Robin');
  
  assert.strictEqual(archer.name, 'Robin', 'Archer name should be set');
  assert.strictEqual(archer.health, 120, 'Archer health should default to 120');
  assert.strictEqual(archer.mana, 30, 'Archer mana should default to 30');
  assert.strictEqual(archer.level, 1, 'Archer level should be 1');
  assert.strictEqual(archer.isAlive, true, 'Archer should be alive');
  assert.strictEqual(archer.bowType, 'longbow', 'Archer bow should be longbow');
  assert.strictEqual(archer.arrows, 50, 'Archer arrows should be 50');
  assert.strictEqual(archer.precision, 0, 'Archer precision should start at 0');
});

test('Archer constructor - custom values', () => {
  const archer = new Archer('Legolas', 130, 40);
  
  assert.strictEqual(archer.name, 'Legolas', 'Archer name');
  assert.strictEqual(archer.health, 130, 'Archer custom health');
  assert.strictEqual(archer.mana, 40, 'Archer custom mana');
  assert.strictEqual(archer.bowType, 'longbow', 'Archer bow type');
  assert.strictEqual(archer.arrows, 50, 'Archer arrows');
});

test('Archer constructor - multiple instances', () => {
  const archer1 = new Archer('Will');
  const archer2 = new Archer('Much', 125, 35);
  
  assert.strictEqual(archer1.name, 'Will', 'First archer name');
  assert.strictEqual(archer2.name, 'Much', 'Second archer name');
  assert.strictEqual(archer1.health, 120, 'First archer default health');
  assert.strictEqual(archer2.health, 125, 'Second archer custom health');
});

test('Constructor vs Factory pattern - key difference with new', () => {
  const character = new Character('Test');
  
  assert.strictEqual(typeof character, 'object', 'Constructor with new creates object');
  assert(character instanceof Character, 'Instance of check works with constructors');
  assert.strictEqual(character.constructor, Character, 'Constructor property available');
});

test('All character types have base properties', () => {
  const warrior = new Warrior('W1');
  const mage = new Mage('M1');
  const archer = new Archer('A1');
  
  // All should have base character properties
  assert.strictEqual(typeof warrior.name, 'string', 'Warrior has name');
  assert.strictEqual(typeof warrior.health, 'number', 'Warrior has health');
  assert.strictEqual(typeof warrior.mana, 'number', 'Warrior has mana');
  assert.strictEqual(warrior.level, 1, 'Warrior has level');
  assert.strictEqual(warrior.isAlive, true, 'Warrior has isAlive');
  
  assert.strictEqual(typeof mage.name, 'string', 'Mage has name');
  assert.strictEqual(typeof mage.health, 'number', 'Mage has health');
  assert.strictEqual(typeof mage.mana, 'number', 'Mage has mana');
  
  assert.strictEqual(typeof archer.name, 'string', 'Archer has name');
  assert.strictEqual(typeof archer.health, 'number', 'Archer has health');
  assert.strictEqual(typeof archer.mana, 'number', 'Archer has mana');
});

test('Each character type has unique properties', () => {
  const warrior = new Warrior('W1');
  const mage = new Mage('M1');
  const archer = new Archer('A1');
  
  // Warrior-specific
  assert.strictEqual(typeof warrior.weaponType, 'string', 'Warrior has weaponType');
  assert.strictEqual(typeof warrior.armor, 'number', 'Warrior has armor');
  assert.strictEqual(typeof warrior.rage, 'number', 'Warrior has rage');
  
  // Mage-specific
  assert.strictEqual(typeof mage.spellType, 'string', 'Mage has spellType');
  assert.strictEqual(typeof mage.spellPower, 'number', 'Mage has spellPower');
  assert.strictEqual(typeof mage.focus, 'number', 'Mage has focus');
  
  // Archer-specific
  assert.strictEqual(typeof archer.bowType, 'string', 'Archer has bowType');
  assert.strictEqual(typeof archer.arrows, 'number', 'Archer has arrows');
  assert.strictEqual(typeof archer.precision, 'number', 'Archer has precision');
});

test('Constructor creates independent instances - modifications do not cross', () => {
  const warrior = new Warrior('W1', 100);
  const mage = new Mage('M1', 100);
  const archer = new Archer('A1', 100);
  
  warrior.health = 50;
  mage.mana = 25;
  archer.arrows = 10;
  
  assert.strictEqual(warrior.health, 50, 'Warrior health modified');
  assert.strictEqual(mage.health, 100, 'Mage health unchanged');
  assert.strictEqual(archer.health, 100, 'Archer health unchanged');
});

test('Constructor - proper initialization of numeric properties', () => {
  const character = new Character('Test', 150, 75, 100);
  
  assert.strictEqual(character.health, 150, 'Health initialized correctly');
  assert.strictEqual(character.mana, 75, 'Mana initialized correctly');
  assert.strictEqual(character.experience, 100, 'Experience initialized correctly');
  assert.strictEqual(typeof character.health, 'number', 'Health is number type');
  assert.strictEqual(typeof character.mana, 'number', 'Mana is number type');
});

test('Constructor - proper initialization of boolean properties', () => {
  const character = new Character('Test');
  
  assert.strictEqual(character.isAlive, true, 'isAlive is true');
  assert.strictEqual(typeof character.isAlive, 'boolean', 'isAlive is boolean type');
});
