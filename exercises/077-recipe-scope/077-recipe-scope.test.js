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
  listAllRecipeIngredients,
  validateIngredients,
  calculateTotalAmountByUnit,
  findIngredientsByUnit,
  printRecipeInstructions,
  scaleRecipe,
  checkIngredientAvailability,
  groupIngredientsByCategory,
  createRecipeTemplate,
  optimizeRecipeFormat,
  populateRecipes,
  resetRecipes,
  getAllRecipes
} from './077-recipe-scope.js';

test('Recipe Block Scope and Let/Const', async (t) => {
  await t.beforeEach(() => {
    resetRecipes();
    populateRecipes();
  });

  await t.test('scaleRecipe scales all ingredient amounts', () => {
    const scaled = scaleRecipe(1, 2);
    
    assert(Array.isArray(scaled));
    assert.equal(scaled.length, 5);
    assert.equal(scaled[0], 4);
    assert.equal(scaled[1], 2);
  });

  await t.test('scaleRecipe handles fractional scales', () => {
    const scaled = scaleRecipe(1, 0.5);
    
    assert.equal(scaled[0], 1);
    assert.equal(scaled[1], 0.5);
  });

  await t.test('scaleRecipe returns empty array for invalid recipe', () => {
    const scaled = scaleRecipe(999, 2);
    
    assert(Array.isArray(scaled));
    assert.equal(scaled.length, 0);
  });

  await t.test('checkIngredientAvailability identifies available items', () => {
    const available = { flour: true, sugar: true, eggs: true };
    const result = checkIngredientAvailability(1, available);
    
    assert(typeof result === 'object');
    assert(Array.isArray(result.available));
    assert(Array.isArray(result.missing));
    assert(result.available.length >= 1);
  });

  await t.test('checkIngredientAvailability identifies missing items', () => {
    const available = { flour: true };
    const result = checkIngredientAvailability(1, available);
    
    assert(result.missing.length > 0);
  });

  await t.test('groupIngredientsByCategory groups by category', () => {
    const categories = {
      flour: 'dry',
      sugar: 'dry',
      eggs: 'refrigerated',
      vanilla: 'pantry',
      'chocolate chips': 'pantry'
    };
    const result = groupIngredientsByCategory(1, categories);
    
    assert(typeof result === 'object');
    assert(Array.isArray(result.dry));
    assert(Array.isArray(result.refrigerated));
    assert(Array.isArray(result.pantry));
  });

  await t.test('groupIngredientsByCategory handles multiple items per category', () => {
    const categories = {
      flour: 'dry',
      sugar: 'dry',
      eggs: 'dry'
    };
    const result = groupIngredientsByCategory(1, categories);
    
    assert(result.dry.length === 3);
  });

  await t.test('createRecipeTemplate creates scale variations', () => {
    const template = createRecipeTemplate(1, {});
    
    assert(typeof template === 'object');
    assert(template.half);
    assert(template.normal);
    assert(template.double);
    assert(template.triple);
  });

  await t.test('createRecipeTemplate scales correctly', () => {
    const template = createRecipeTemplate(1, {});
    
    assert.equal(template.normal[0], 2);
    assert.equal(template.half[0], 1);
    assert.equal(template.double[0], 4);
    assert.equal(template.triple[0], 6);
  });

  await t.test('optimizeRecipeFormat creates formatted object', () => {
    const formatted = optimizeRecipeFormat(1);
    
    assert(typeof formatted === 'object');
    assert(formatted.base);
    assert(formatted.scales);
    assert(formatted.metadata);
  });

  await t.test('optimizeRecipeFormat includes all scale variations', () => {
    const formatted = optimizeRecipeFormat(1);
    
    assert(formatted.scales.half);
    assert(formatted.scales.normal);
    assert(formatted.scales.double);
  });

  await t.test('optimizeRecipeFormat includes recipe metadata', () => {
    const formatted = optimizeRecipeFormat(1);
    
    assert(formatted.metadata.title);
    assert(formatted.metadata.servings);
    assert(formatted.metadata.ingredients);
  });

  await t.test('checkIngredientAvailability handles empty categories', () => {
    const result = checkIngredientAvailability(1, {});
    
    assert(result.available.length === 0);
    assert(result.missing.length > 0);
  });
});
