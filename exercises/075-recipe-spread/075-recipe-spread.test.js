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
  mergeRecipes,
  doubleRecipe,
  createRecipeVariation,
  combineMultipleRecipes,
  populateRecipes,
  resetRecipes,
  getAllRecipes
} from './075-recipe-spread.js';

test('Recipe Spread Operator', async (t) => {
  await t.beforeEach(() => {
    resetRecipes();
    populateRecipes();
  });

  await t.test('mergeRecipes combines ingredients from two recipes', () => {
    const merged = mergeRecipes(1, 2, 3, 'Mixed Recipe');
    
    assert(merged && typeof merged === 'object');
    assert.equal(merged.id, 3);
    assert.equal(merged.title, 'Mixed Recipe');
    assert.equal(merged.ingredients.length, 9);
  });

  await t.test('mergeRecipes preserves all ingredient properties', () => {
    mergeRecipes(1, 2, 3, 'Mixed');
    const merged = getRecipeById(3);
    
    const hasFlour = merged.ingredients.some(ing => ing.name === 'flour');
    const hasPasta = merged.ingredients.some(ing => ing.name === 'pasta');
    assert(hasFlour && hasPasta);
  });

  await t.test('mergeRecipes returns undefined for invalid source recipe', () => {
    const merged = mergeRecipes(1, 999, 3, 'Mixed');
    assert.equal(merged, undefined);
  });

  await t.test('doubleRecipe doubles ingredient amounts', () => {
    const doubled = doubleRecipe(1, 4);
    
    assert(doubled && typeof doubled === 'object');
    assert.equal(doubled.id, 4);
    const first = doubled.ingredients[0];
    assert.equal(first.amount, 4);
    assert.equal(first.name, 'flour');
  });

  await t.test('doubleRecipe preserves ingredient structure', () => {
    doubleRecipe(2, 5);
    const doubled = getRecipeById(5);
    
    assert.equal(doubled.ingredients.length, 4);
    doubled.ingredients.forEach(ing => {
      assert(typeof ing.amount === 'number');
      assert(typeof ing.unit === 'string');
    });
  });

  await t.test('doubleRecipe returns undefined for invalid recipe', () => {
    const doubled = doubleRecipe(999, 6);
    assert.equal(doubled, undefined);
  });

  await t.test('createRecipeVariation creates modified copy', () => {
    const variation = createRecipeVariation(1, 7, 'Modified Cookies', {
      'flour': 3,
      'sugar': 1.5
    });
    
    assert(variation && typeof variation === 'object');
    assert.equal(variation.id, 7);
    assert.equal(variation.title, 'Modified Cookies');
    
    const flour = variation.ingredients.find(ing => ing.name === 'flour');
    assert.equal(flour.amount, 3);
  });

  await t.test('createRecipeVariation preserves unmodified ingredients', () => {
    const variation = createRecipeVariation(1, 7, 'Cookies', { 'flour': 3 });
    
    const sugar = variation.ingredients.find(ing => ing.name === 'sugar');
    assert.equal(sugar.amount, 1);
  });

  await t.test('createRecipeVariation returns undefined for invalid recipe', () => {
    const variation = createRecipeVariation(999, 8, 'Test', {});
    assert.equal(variation, undefined);
  });

  await t.test('combineMultipleRecipes merges three recipes', () => {
    addRecipe(8, 'Salad', 2, [
      { name: 'lettuce', amount: 1, unit: 'head' },
      { name: 'tomato', amount: 2, unit: 'medium' }
    ]);
    
    const combined = combineMultipleRecipes(9, 'Mega Dish', 1, 2, 8);
    
    assert(combined && typeof combined === 'object');
    assert.equal(combined.ingredients.length, 11);
  });

  await t.test('combineMultipleRecipes works with single source', () => {
    const combined = combineMultipleRecipes(10, 'Single', 1);
    
    assert(combined && typeof combined === 'object');
    assert.equal(combined.ingredients.length, 5);
  });

  await t.test('combineMultipleRecipes works with two sources', () => {
    const combined = combineMultipleRecipes(11, 'Double', 1, 2);
    
    assert.equal(combined.ingredients.length, 9);
  });
});
