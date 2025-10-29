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
  populateRecipes,
  resetRecipes,
  getAllRecipes
} from './076-recipe-for-of.js';

test('Recipe For...of Iteration', async (t) => {
  await t.beforeEach(() => {
    resetRecipes();
    populateRecipes();
  });

  await t.test('listAllRecipeIngredients returns formatted string', () => {
    const result = listAllRecipeIngredients(1);
    
    assert(typeof result === 'string');
    assert(result.includes('flour'));
    assert(result.includes('sugar'));
    assert(result.includes('eggs'));
  });

  await t.test('listAllRecipeIngredients joins with commas', () => {
    const result = listAllRecipeIngredients(1);
    
    const items = result.split(', ');
    assert(items.length >= 5);
  });

  await t.test('validateIngredients returns valid true for good recipe', () => {
    const result = validateIngredients(1);
    
    assert(typeof result === 'object');
    assert.equal(result.valid, true);
    assert(Array.isArray(result.missingFields));
    assert.equal(result.missingFields.length, 0);
  });

  await t.test('validateIngredients detects missing fields', () => {
    addRecipe(3, 'Bad Recipe', 1, [
      { name: 'flour', amount: 2 },
      { name: 'sugar', unit: 'cup' }
    ]);
    
    const result = validateIngredients(3);
    
    assert.equal(result.valid, false);
    assert(result.missingFields.length > 0);
  });

  await t.test('calculateTotalAmountByUnit groups by unit', () => {
    const totals = calculateTotalAmountByUnit(1);
    
    assert(typeof totals === 'object');
    assert.equal(totals.cups, 3);
    assert.equal(totals.teaspoon, 1);
  });

  await t.test('calculateTotalAmountByUnit handles large quantity', () => {
    const totals = calculateTotalAmountByUnit(2);
    
    assert.equal(totals.cans, 3);
    assert.equal(totals.cloves, 4);
  });

  await t.test('findIngredientsByUnit returns matching ingredients', () => {
    const found = findIngredientsByUnit(1, 'cups');
    
    assert(Array.isArray(found));
    assert(found.length >= 2);
    assert(found.every(ing => ing.unit === 'cups'));
  });

  await t.test('findIngredientsByUnit returns empty for no matches', () => {
    const found = findIngredientsByUnit(1, 'pounds');
    
    assert(Array.isArray(found));
    assert.equal(found.length, 0);
  });

  await t.test('printRecipeInstructions returns array of steps', () => {
    const instructions = printRecipeInstructions(1);
    
    assert(Array.isArray(instructions));
    assert(instructions.length >= 5);
    assert(instructions[0].includes('Step 1'));
  });

  await t.test('printRecipeInstructions formats with ingredient info', () => {
    const instructions = printRecipeInstructions(1);
    
    const hasFlour = instructions.some(step => step.includes('flour'));
    const hasAmount = instructions.some(step => step.includes('2'));
    assert(hasFlour && hasAmount);
  });

  await t.test('listAllRecipeIngredients handles single ingredient', () => {
    addRecipe(4, 'Simple', 1, [{ name: 'water', amount: 1, unit: 'cup' }]);
    const result = listAllRecipeIngredients(4);
    
    assert.equal(result, 'water');
  });
});
