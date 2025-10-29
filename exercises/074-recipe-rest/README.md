# Exercise 074: Recipe Organizer - Rest Parameters

Learn to use rest parameters (...) to accept a variable number of arguments in functions. This allows you to write flexible functions that can handle any number of inputs without predefined limits.

## Concepts

- **Rest Parameters** - Use ... to collect multiple arguments into an array
- **Variable Arguments** - Functions that accept flexible numbers of inputs
- **Rest vs Spread** - How rest parameters differ from spread operator in context
- **Function Flexibility** - Creating adaptable functions for different use cases
- **Array Handling** - Working with variable-length argument collections

## What You'll Learn

1. **Rest Parameters**: How to collect arguments with the ... syntax
2. **Flexible Signatures**: Creating functions that work with any number of arguments
3. **Argument Collections**: Treating variable arguments as an array
4. **Common Patterns**: Combining rest with other parameters
5. **Practical Use**: When and why to use rest parameters

## Functions to Implement

### `createRecipeWithIngredients(id, title, servings, ...ingredients)`
Create a recipe by accepting any number of ingredient objects as rest parameters.

**Parameters:**
- `id` - Recipe ID
- `title` - Recipe title
- `servings` - Number of servings
- `...ingredients` - Variable number of ingredient objects

**Returns:**
- The created recipe object

**Example:**
```javascript
const recipe = createRecipeWithIngredients(
  1,
  'Bread',
  1,
  { name: 'flour', amount: 3, unit: 'cups' },
  { name: 'water', amount: 1.5, unit: 'cups' },
  { name: 'salt', amount: 1, unit: 'teaspoon' }
);
// Recipe created with 3 ingredients
```

### `addMultipleIngredients(recipeId, ...ingredients)`
Add any number of ingredients to a recipe using rest parameters.

**Parameters:**
- `recipeId` - ID of the recipe
- `...ingredients` - Variable number of ingredient objects

**Returns:**
- Number of ingredients successfully added

**Example:**
```javascript
const count = addMultipleIngredients(
  1,
  { name: 'butter', amount: 1, unit: 'cup' },
  { name: 'baking powder', amount: 1, unit: 'teaspoon' },
  { name: 'salt', amount: 0.5, unit: 'teaspoon' }
);
// Returns: 3
```

### `combineDryIngredients(recipeId, ...dryItems)`
Accept variable dry ingredients and combine them into a single ingredient.

**Parameters:**
- `recipeId` - ID of the recipe
- `...dryItems` - Variable number of dry ingredient objects

**Returns:**
- The combined ingredient object

**Example:**
```javascript
const combined = combineDryIngredients(
  1,
  { name: 'flour', amount: 2, unit: 'cups' },
  { name: 'sugar', amount: 0.5, unit: 'cup' },
  { name: 'baking powder', amount: 2, unit: 'teaspoons' }
);
// Returns: { name: 'combined dry mix', amount: 3, unit: 'cups' }
```

### `getRecipeIngredientSummary(recipeId)`
Use rest parameters in destructuring to separate first ingredient from the rest.

**Parameters:**
- `recipeId` - ID of the recipe

**Returns:**
- Object with `{ first: {...}, others: [...] }`

**Example:**
```javascript
const summary = getRecipeIngredientSummary(1);
// Result: {
//   first: { name: 'flour', amount: 2, unit: 'cups' },
//   others: [{ name: 'sugar', ... }, { name: 'eggs', ... }, ...]
// }
```

## Hints

1. **Rest Parameters Syntax**: Use ... in function parameter
   ```javascript
   function myFunction(first, second, ...rest) {
     // first and second are individual parameters
     // rest is an array of remaining arguments
   }
   ```

2. **With Spread Operator**: Combine rest-collected array back
   ```javascript
   export function addMultiple(recipeId, ...ingredients) {
     recipe.ingredients.push(...ingredients);  // Spread to add all
   }
   ```

3. **Calculating Totals**: Rest gives you an array to reduce
   ```javascript
   const total = dryItems.reduce((sum, item) => sum + item.amount, 0);
   ```

4. **Rest in Destructuring**: Collect remaining elements
   ```javascript
   const [first, ...others] = array;
   ```

5. **Rest Must Be Last**: Rest parameter must be the final parameter
   ```javascript
   function good(a, b, ...rest) { }     // ✓ Correct
   function bad(...rest, a, b) { }      // ✗ Error
   ```

## Challenge

- Create a function that merges multiple recipes into one
- Implement argument validation before using rest parameters
- Create a function that accepts both required and variable optional parameters
- Build a function that sums amounts of similar ingredients from rest parameters

## Resources

- [MDN: Rest Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
- [Rest vs Spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [Function Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

## Notes

- Rest parameters must be the last formal parameter
- Rest parameters create a real array (not array-like like arguments)
- Rest parameters work great with modern destructuring
- Combining rest with other parameters is common and powerful
- Rest parameters are often used with the spread operator in the function body
