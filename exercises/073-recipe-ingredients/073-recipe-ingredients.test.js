import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  createIngredient,
  addRecipe,
  getRecipeById,
  extractIngredientNames,
  extractAllIngredients,
  getIngredientInfo,
  listIngredientsFormatted,
  addIngredient,
  populateRecipes,
  resetRecipes,
  getAllRecipes
} from './073-recipe-ingredients.js';

test('Recipe and Ingredient Destructuring', async (t) => {
  await t.beforeEach(() => {
    resetRecipes();
    populateRecipes();
  });

  await t.test('extractIngredientNames returns array of ingredient names', () => {
    const names = extractIngredientNames(1);
    assert(Array.isArray(names), 'Should return an array');
    assert.deepEqual(names, ['flour', 'sugar', 'eggs', 'vanilla', 'chocolate chips']);
  });

  await t.test('extractIngredientNames returns empty array for non-existent recipe', () => {
    const names = extractIngredientNames(999);
    assert(Array.isArray(names));
    assert.equal(names.length, 0);
  });

  await t.test('extractAllIngredients returns separated arrays', () => {
    const result = extractAllIngredients(2);
    assert(result && typeof result === 'object', 'Should return an object');
    assert(Array.isArray(result.names), 'names should be an array');
    assert(Array.isArray(result.amounts), 'amounts should be an array');
    assert.deepEqual(result.names, ['pasta', 'tomatoes', 'garlic', 'olive oil']);
    assert.deepEqual(result.amounts, [1, 3, 4, 3]);
  });

  await t.test('extractAllIngredients returns empty arrays for non-existent recipe', () => {
    const result = extractAllIngredients(999);
    assert.deepEqual(result.names, []);
    assert.deepEqual(result.amounts, []);
  });

  await t.test('getIngredientInfo returns destructured ingredient object', () => {
    const info = getIngredientInfo(1, 0);
    assert(info && typeof info === 'object');
    assert.equal(info.name, 'flour');
    assert.equal(info.amount, 2);
    assert.equal(info.unit, 'cups');
  });

  await t.test('getIngredientInfo returns undefined for invalid index', () => {
    const info = getIngredientInfo(1, 999);
    assert.equal(info, undefined);
  });

  await t.test('getIngredientInfo returns undefined for non-existent recipe', () => {
    const info = getIngredientInfo(999, 0);
    assert.equal(info, undefined);
  });

  await t.test('listIngredientsFormatted returns formatted strings', () => {
    const formatted = listIngredientsFormatted(1);
    assert(Array.isArray(formatted));
    assert.equal(formatted[0], '2 cups flour');
    assert.equal(formatted[1], '1 cup sugar');
    assert.equal(formatted[4], '2 cups chocolate chips');
  });

  await t.test('listIngredientsFormatted returns empty array for non-existent recipe', () => {
    const formatted = listIngredientsFormatted(999);
    assert(Array.isArray(formatted));
    assert.equal(formatted.length, 0);
  });

  await t.test('listIngredientsFormatted handles singular and plural units', () => {
    addRecipe(3, 'Simple Salad', 1, [
      { name: 'lettuce', amount: 1, unit: 'head' },
      { name: 'olive oil', amount: 2, unit: 'tablespoons' }
    ]);
    const formatted = listIngredientsFormatted(3);
    assert(formatted.some(item => item.includes('1 head')));
    assert(formatted.some(item => item.includes('2 tablespoons')));
  });
});
