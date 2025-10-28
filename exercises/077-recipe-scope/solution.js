function createIngredient(name, amount, unit) {
  return { name, amount, unit };
}

function createRecipe(id, title, servings, ingredients = []) {
  return {
    id,
    title,
    servings,
    ingredients,
    createdAt: new Date().toISOString()
  };
}

let recipes = [];

export function addRecipe(id, title, servings, ingredients = []) {
  const recipe = createRecipe(id, title, servings, ingredients);
  recipes.push(recipe);
  return recipe;
}

export function getRecipeById(id) {
  return recipes.find(recipe => recipe.id === id);
}

export function extractIngredientNames(recipeId) {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return [];
  
  return recipe.ingredients.map(({ name }) => name);
}

export function extractAllIngredients(recipeId) {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return { names: [], amounts: [] };
  
  const names = [];
  const amounts = [];
  
  for (const { name, amount } of recipe.ingredients) {
    names.push(name);
    amounts.push(amount);
  }
  
  return { names, amounts };
}

export function getIngredientInfo(recipeId, ingredientIndex) {
  const recipe = getRecipeById(recipeId);
  if (!recipe || !recipe.ingredients[ingredientIndex]) return undefined;
  
  const { name, amount, unit } = recipe.ingredients[ingredientIndex];
  return { name, amount, unit };
}

export function listIngredientsFormatted(recipeId) {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return [];
  
  return recipe.ingredients.map(({ amount, unit, name }) => {
    return `${amount} ${unit} ${name}`;
  });
}

export function addIngredient(recipeId, name, amount, unit) {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return false;
  
  const ingredient = createIngredient(name, amount, unit);
  recipe.ingredients.push(ingredient);
  return true;
}

export function createRecipeWithIngredients(id, title, servings, ...ingredients) {
  const recipe = createRecipe(id, title, servings, ingredients);
  recipes.push(recipe);
  return recipe;
}

export function addMultipleIngredients(recipeId, ...ingredients) {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return 0;
  
  recipe.ingredients.push(...ingredients);
  return ingredients.length;
}

export function combineDryIngredients(recipeId, ...dryItems) {
  const recipe = getRecipeById(recipeId);
  if (!recipe || dryItems.length === 0) return undefined;
  
  const totalAmount = dryItems.reduce((sum, item) => sum + item.amount, 0);
  const combined = createIngredient('combined dry mix', totalAmount, 'cups');
  recipe.ingredients.push(combined);
  
  return combined;
}

export function getRecipeIngredientSummary(recipeId) {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return undefined;
  
  const [first, ...others] = recipe.ingredients;
  return { first, others };
}

export function mergeRecipes(recipe1Id, recipe2Id, newRecipeId, newTitle) {
  const recipe1 = getRecipeById(recipe1Id);
  const recipe2 = getRecipeById(recipe2Id);
  
  if (!recipe1 || !recipe2) return undefined;
  
  const mergedIngredients = [...recipe1.ingredients, ...recipe2.ingredients];
  const merged = createRecipe(newRecipeId, newTitle, 1, mergedIngredients);
  recipes.push(merged);
  
  return merged;
}

export function doubleRecipe(recipeId, newRecipeId) {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return undefined;
  
  const doubledIngredients = recipe.ingredients.map(ing => ({
    ...ing,
    amount: ing.amount * 2
  }));
  
  const doubled = createRecipe(newRecipeId, recipe.title, recipe.servings * 2, doubledIngredients);
  recipes.push(doubled);
  
  return doubled;
}

export function createRecipeVariation(recipeId, variationId, newTitle, ingredientModifications = {}) {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return undefined;
  
  const modifiedIngredients = recipe.ingredients.map(ing => {
    if (ingredientModifications[ing.name]) {
      return { ...ing, amount: ingredientModifications[ing.name] };
    }
    return { ...ing };
  });
  
  const variation = createRecipe(variationId, newTitle, recipe.servings, modifiedIngredients);
  recipes.push(variation);
  
  return variation;
}

export function combineMultipleRecipes(newRecipeId, newTitle, ...sourceRecipeIds) {
  const allIngredients = [];
  
  for (const sourceId of sourceRecipeIds) {
    const source = getRecipeById(sourceId);
    if (source) {
      allIngredients.push(...source.ingredients);
    }
  }
  
  const combined = createRecipe(newRecipeId, newTitle, 1, allIngredients);
  recipes.push(combined);
  
  return combined;
}

export function listAllRecipeIngredients(recipeId) {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return '';
  
  const names = [];
  for (const ingredient of recipe.ingredients) {
    names.push(ingredient.name);
  }
  
  return names.join(', ');
}

export function validateIngredients(recipeId) {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return { valid: false, missingFields: ['recipe not found'] };
  
  const missingFields = [];
  
  for (const ingredient of recipe.ingredients) {
    if (!ingredient.name) missingFields.push('name missing');
    if (ingredient.amount === undefined) missingFields.push('amount missing');
    if (!ingredient.unit) missingFields.push('unit missing');
  }
  
  return {
    valid: missingFields.length === 0,
    missingFields
  };
}

export function calculateTotalAmountByUnit(recipeId) {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return {};
  
  const totals = {};
  
  for (const ingredient of recipe.ingredients) {
    if (!totals[ingredient.unit]) {
      totals[ingredient.unit] = 0;
    }
    totals[ingredient.unit] += ingredient.amount;
  }
  
  return totals;
}

export function findIngredientsByUnit(recipeId, targetUnit) {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return [];
  
  const found = [];
  
  for (const ingredient of recipe.ingredients) {
    if (ingredient.unit === targetUnit) {
      found.push(ingredient);
    }
  }
  
  return found;
}

export function printRecipeInstructions(recipeId) {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return [];
  
  const instructions = [];
  let step = 1;
  
  for (const ingredient of recipe.ingredients) {
    instructions.push(`Step ${step}: Add ${ingredient.amount} ${ingredient.unit} of ${ingredient.name}`);
    step++;
  }
  
  return instructions;
}

export function scaleRecipe(recipeId, scaleFactor) {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return [];
  
  const scaled = [];
  
  for (const ingredient of recipe.ingredients) {
    const scaledAmount = ingredient.amount * scaleFactor;
    scaled.push(scaledAmount);
  }
  
  return scaled;
}

export function checkIngredientAvailability(recipeId, availableIngredients) {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return { available: [], missing: [] };
  
  const available = [];
  const missing = [];
  
  for (const ingredient of recipe.ingredients) {
    if (availableIngredients[ingredient.name]) {
      available.push(ingredient.name);
    } else {
      missing.push(ingredient.name);
    }
  }
  
  return { available, missing };
}

export function groupIngredientsByCategory(recipeId, categories = {}) {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return {};
  
  const grouped = {};
  
  for (const ingredient of recipe.ingredients) {
    const category = categories[ingredient.name];
    
    if (category) {
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(ingredient);
    }
  }
  
  return grouped;
}

export function createRecipeTemplate(baseRecipeId, scalingOptions) {
  const recipe = getRecipeById(baseRecipeId);
  if (!recipe) return {};
  
  const half = scaleRecipe(baseRecipeId, 0.5);
  const normal = scaleRecipe(baseRecipeId, 1);
  const double = scaleRecipe(baseRecipeId, 2);
  const triple = scaleRecipe(baseRecipeId, 3);
  
  return { half, normal, double, triple };
}

export function optimizeRecipeFormat(recipeId) {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return {};
  
  const base = recipe.ingredients.map(ing => ing.amount);
  const scales = createRecipeTemplate(recipeId, {});
  
  const metadata = {
    title: recipe.title,
    servings: recipe.servings,
    ingredients: recipe.ingredients.length
  };
  
  return { base, scales, metadata };
}

export function populateRecipes() {
  addRecipe(1, 'Chocolate Chip Cookies', 24, [
    createIngredient('flour', 2, 'cups'),
    createIngredient('sugar', 1, 'cup'),
    createIngredient('eggs', 2, 'large'),
    createIngredient('vanilla', 1, 'teaspoon'),
    createIngredient('chocolate chips', 2, 'cups')
  ]);
  
  addRecipe(2, 'Tomato Pasta', 4, [
    createIngredient('pasta', 1, 'pound'),
    createIngredient('tomatoes', 3, 'cans'),
    createIngredient('garlic', 4, 'cloves'),
    createIngredient('olive oil', 3, 'tablespoons')
  ]);
}

export function resetRecipes() {
  recipes = [];
}

export function getAllRecipes() {
  return recipes;
}
