# Exercise 075: Recipe Organizer - Spread Operator

Learn to use the spread operator (...) to expand arrays and objects in place. The spread operator is powerful for combining collections, cloning data, and creating new data structures without modifying the originals.

## Concepts

- **Spread with Arrays** - Unpack array elements into new arrays
- **Spread with Objects** - Copy object properties into new objects
- **Combining Collections** - Merge multiple arrays or objects
- **Cloning vs References** - Creating copies vs maintaining references
- **Immutability** - Creating new data without modifying originals

## What You'll Learn

1. **Array Spreading**: How to unpack arrays with ...
2. **Object Spreading**: Copying properties into new objects
3. **Combining Data**: Merging multiple sources into one collection
4. **Immutable Operations**: Creating new arrays/objects instead of modifying existing ones
5. **Practical Patterns**: Common use cases for spread operator

## Functions to Implement

### `mergeRecipes(recipe1Id, recipe2Id, newRecipeId, newTitle)`
Combine ingredients from two recipes into a new recipe using spread operator.

**Parameters:**
- `recipe1Id` - ID of first recipe
- `recipe2Id` - ID of second recipe
- `newRecipeId` - ID for the new merged recipe
- `newTitle` - Title for the merged recipe

**Returns:**
- New recipe with combined ingredients, or undefined if either source not found

**Example:**
```javascript
const merged = mergeRecipes(1, 2, 3, 'Fusion Dish');
// Result: Recipe 3 with ingredients from both recipe 1 and 2
```

### `doubleRecipe(recipeId, newRecipeId)`
Create a doubled version of a recipe with amounts multiplied by 2 using spread and property modification.

**Parameters:**
- `recipeId` - ID of recipe to double
- `newRecipeId` - ID for the doubled recipe

**Returns:**
- New recipe with doubled amounts, or undefined if recipe not found

**Example:**
```javascript
const doubled = doubleRecipe(1, 4);
// All ingredient amounts doubled
// Original recipe 1 remains unchanged
```

### `createRecipeVariation(recipeId, variationId, newTitle, ingredientModifications)`
Create a variation of a recipe with specific ingredient modifications using spread operator cloning.

**Parameters:**
- `recipeId` - ID of base recipe
- `variationId` - ID for the variation
- `newTitle` - Title for the variation
- `ingredientModifications` - Object with ingredient names as keys and new amounts as values

**Returns:**
- New variation recipe, or undefined if base recipe not found

**Example:**
```javascript
const variation = createRecipeVariation(1, 7, 'Low-Sugar Cookies', {
  'sugar': 0.5,
  'chocolate chips': 1
});
// New recipe with modified amounts, others unchanged
```

### `combineMultipleRecipes(newRecipeId, newTitle, ...sourceRecipeIds)`
Combine ingredients from multiple recipes using spread operator with rest parameters.

**Parameters:**
- `newRecipeId` - ID for the combined recipe
- `newTitle` - Title for the combined recipe
- `...sourceRecipeIds` - Variable number of recipe IDs to combine

**Returns:**
- New recipe with all combined ingredients

**Example:**
```javascript
const combined = combineMultipleRecipes(9, 'Mega Dish', 1, 2, 8);
// Recipe 9 contains ingredients from recipes 1, 2, and 8
```

## Hints

1. **Spread Arrays**: Unpack all elements into a new array
   ```javascript
   const merged = [...array1, ...array2];
   ```

2. **Spread Objects**: Copy properties into new object
   ```javascript
   const copied = { ...original };
   const modified = { ...original, amount: 10 };
   ```

3. **Mapping with Spread**: Combine spread with map for transformation
   ```javascript
   const doubled = items.map(item => ({
     ...item,
     amount: item.amount * 2
   }));
   ```

4. **Multiple Sources**: Chain spread operators
   ```javascript
   const combined = [...arr1, ...arr2, ...arr3];
   ```

5. **Immutability Pattern**: Always create new objects/arrays
   ```javascript
   // Good: Create new array
   const newRecipe = createRecipe(id, title, 1, [...original.ingredients]);
   
   // Bad: Modifying original
   original.ingredients.push(...newIngredients);
   ```

## Challenge

- Create a function that scales all recipes to a specific serving size
- Implement a recipe template system that extends base recipes
- Build a function that creates recipe combinations avoiding duplicates
- Develop an undo system using spread operator to create snapshots

## Resources

- [MDN: Spread Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [Spread for Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_array_literals)
- [Spread for Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals)

## Notes

- Spread operator creates shallow copies (nested objects are still referenced)
- Spread is great for immutable operations (not modifying original data)
- Combine spread with array methods like map for powerful transformations
- Spread with objects is perfect for creating variations or defaults
- Performance is excellent for most practical use cases
