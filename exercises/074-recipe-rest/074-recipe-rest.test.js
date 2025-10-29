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
  createRecipeWithIngredients,
  addMultipleIngredients,
  combineDryIngredients,
  getRecipeIngredientSummary,
  populateRecipes,
  resetRecipes,
  getAllRecipes
} from './074-recipe-rest.js';

test('Recipe Rest Parameters', async (t) => {
  await t.beforeEach(() => {
    resetRecipes();
    populateRecipes();
  });

  await t.test('createRecipeWithIngredients accepts variable ingredients', () => {
    const recipe = createRecipeWithIngredients(
      3,
      'Simple Bread',
      1,
      { name: 'flour', amount: 3, unit: 'cups' },
      { name: 'water', amount: 1.5, unit: 'cups' },
      { name: 'salt', amount: 1, unit: 'teaspoon' },
      { name: 'yeast', amount: 1, unit: 'teaspoon' }
    );
    
    assert(recipe && typeof recipe === 'object');
    assert.equal(recipe.id, 3);
    assert.equal(recipe.title, 'Simple Bread');
    assert.equal(recipe.ingredients.length, 4);
    assert.equal(recipe.ingredients[0].name, 'flour');
  });

  await t.test('createRecipeWithIngredients stores recipe in collection', () => {
    createRecipeWithIngredients(
      4,
      'Test Recipe',
      2,
      { name: 'ingredient1', amount: 1, unit: 'cup' }
    );
    
    const retrieved = getRecipeById(4);
    assert(retrieved);
    assert.equal(retrieved.title, 'Test Recipe');
  });

  await t.test('addMultipleIngredients adds variable number of ingredients', () => {
    const count = addMultipleIngredients(
      1,
      { name: 'butter', amount: 1, unit: 'cup' },
      { name: 'baking powder', amount: 1, unit: 'teaspoon' },
      { name: 'salt', amount: 0.5, unit: 'teaspoon' }
    );
    
    assert.equal(count, 3);
    const recipe = getRecipeById(1);
    assert.equal(recipe.ingredients.length, 8);
  });

  await t.test('addMultipleIngredients returns 0 for invalid recipe', () => {
    const count = addMultipleIngredients(
      999,
      { name: 'ingredient', amount: 1, unit: 'cup' }
    );
    assert.equal(count, 0);
  });

  await t.test('combineDryIngredients merges dry ingredients', () => {
    const combined = combineDryIngredients(
      1,
      { name: 'flour', amount: 2, unit: 'cups' },
      { name: 'sugar', amount: 0.5, unit: 'cup' },
      { name: 'baking powder', amount: 2, unit: 'teaspoons' }
    );
    
    assert(combined && typeof combined === 'object');
    assert.equal(combined.name, 'combined dry mix');
    assert.equal(combined.amount, 3);
    assert.equal(combined.unit, 'cups');
  });

  await t.test('combineDryIngredients adds combined ingredient to recipe', () => {
    combineDryIngredients(
      2,
      { name: 'flour', amount: 1, unit: 'cup' }
    );
    
    const recipe = getRecipeById(2);
    const hasCombined = recipe.ingredients.some(ing => ing.name === 'combined dry mix');
    assert(hasCombined);
  });

  await t.test('getRecipeIngredientSummary separates first from others', () => {
    const summary = getRecipeIngredientSummary(1);
    
    assert(summary && typeof summary === 'object');
    assert(summary.first && typeof summary.first === 'object');
    assert(Array.isArray(summary.others));
    assert.equal(summary.first.name, 'flour');
    assert.equal(summary.others.length, 4);
  });

  await t.test('getRecipeIngredientSummary handles single ingredient', () => {
    addRecipe(5, 'One Ingredient', 1, [
      { name: 'ingredient', amount: 1, unit: 'cup' }
    ]);
    
    const summary = getRecipeIngredientSummary(5);
    assert.equal(summary.first.name, 'ingredient');
    assert.equal(summary.others.length, 0);
  });

  await t.test('getRecipeIngredientSummary returns undefined for invalid recipe', () => {
    const summary = getRecipeIngredientSummary(999);
    assert.equal(summary, undefined);
  });
});
