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
