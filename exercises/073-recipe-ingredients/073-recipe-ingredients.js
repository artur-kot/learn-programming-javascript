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
  // TODO: Use destructuring to extract ingredient names from recipe
  // Extract the names from ingredients array using destructuring
  // Return array of just the names: ['flour', 'sugar', 'eggs']
}

export function extractAllIngredients(recipeId) {
  // TODO: Use multiple destructuring to extract name and amount separately
  // Get both the names and amounts from all ingredients
  // Return object with { names: [...], amounts: [...] }
}

export function getIngredientInfo(recipeId, ingredientIndex) {
  // TODO: Use destructuring to extract name, amount, and unit
  // Get specific ingredient from recipe by index
  // Return { name, amount, unit } or undefined if not found
}

export function listIngredientsFormatted(recipeId) {
  // TODO: Use destructuring in a loop to format ingredients nicely
  // Example: ['2 cups flour', '1 tablespoon sugar']
  // Return formatted array of strings
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
