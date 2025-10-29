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
