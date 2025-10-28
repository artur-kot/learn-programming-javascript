# Exercise 076: Recipe Organizer - For...of Iteration

Learn to use for...of loops to iterate over arrays and other iterable objects. The for...of loop provides a clean, readable way to loop through collections without dealing with indices or callbacks.

## Concepts

- **For...of Loops** - Modern iteration over iterable values
- **Clean Iteration** - Simpler than for loops or callbacks
- **Building Collections** - Accumulating data while iterating
- **Validation Patterns** - Checking data as you iterate
- **Aggregation** - Summarizing or grouping data

## What You'll Learn

1. **For...of Syntax**: How to iterate directly over values
2. **Destructuring in Loops**: Extracting properties while iterating
3. **Accumulation**: Building new arrays and objects from iterations
4. **Validation**: Checking properties and constraints
5. **Aggregation**: Grouping and summing data

## Functions to Implement

### `listAllRecipeIngredients(recipeId)`
Use for...of loop to iterate through ingredients and build a formatted string.

**Parameters:**
- `recipeId` - ID of the recipe

**Returns:**
- Single string with all ingredient names joined by ', '

**Example:**
```javascript
listAllRecipeIngredients(1);
// Result: 'flour, sugar, eggs, vanilla, chocolate chips'
```

### `validateIngredients(recipeId)`
Use for...of loop to check each ingredient has required properties.

**Parameters:**
- `recipeId` - ID of the recipe

**Returns:**
- Object: `{ valid: boolean, missingFields: [...] }`

**Example:**
```javascript
validateIngredients(1);
// Result: { valid: true, missingFields: [] }
```

### `calculateTotalAmountByUnit(recipeId)`
Use for...of to group ingredient amounts by their unit.

**Parameters:**
- `recipeId` - ID of the recipe

**Returns:**
- Object with units as keys and total amounts as values

**Example:**
```javascript
calculateTotalAmountByUnit(1);
// Result: { cups: 5, teaspoon: 1, large: 2 }
```

### `findIngredientsByUnit(recipeId, targetUnit)`
Use for...of to find all ingredients with a specific unit of measurement.

**Parameters:**
- `recipeId` - ID of the recipe
- `targetUnit` - The unit to search for

**Returns:**
- Array of matching ingredient objects

**Example:**
```javascript
findIngredientsByUnit(1, 'cups');
// Result: [
//   { name: 'flour', amount: 2, unit: 'cups' },
//   { name: 'chocolate chips', amount: 2, unit: 'cups' }
// ]
```

### `printRecipeInstructions(recipeId)`
Use for...of to build step-by-step instructions from ingredients.

**Parameters:**
- `recipeId` - ID of the recipe

**Returns:**
- Array of instruction strings formatted as "Step N: Add X unit of ingredient"

**Example:**
```javascript
printRecipeInstructions(1);
// Result: [
//   'Step 1: Add 2 cups of flour',
//   'Step 2: Add 1 cup of sugar',
//   ...
// ]
```

## Hints

1. **Basic For...of**: Iterate directly over values
   ```javascript
   for (const ingredient of recipe.ingredients) {
     console.log(ingredient.name);
   }
   ```

2. **With Destructuring**: Extract properties during iteration
   ```javascript
   for (const { name, amount, unit } of ingredients) {
     // name, amount, unit are already extracted
   }
   ```

3. **Building Collections**: Accumulate results
   ```javascript
   const names = [];
   for (const ingredient of recipe.ingredients) {
     names.push(ingredient.name);
   }
   return names.join(', ');
   ```

4. **Grouping Data**: Use objects to accumulate by key
   ```javascript
   const totals = {};
   for (const { unit, amount } of ingredients) {
     if (!totals[unit]) totals[unit] = 0;
     totals[unit] += amount;
   }
   ```

5. **Conditional Collection**: Filter during iteration
   ```javascript
   const found = [];
   for (const ingredient of ingredients) {
     if (ingredient.unit === targetUnit) {
       found.push(ingredient);
     }
   }
   ```

## Challenge

- Create a function that finds ingredients over a certain amount
- Build a function that categorizes ingredients by type
- Implement a shopping list combiner using for...of loops
- Create a nutrition calculator that sums properties while iterating

## Resources

- [MDN: for...of Statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
- [Iterating Over Collections](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)
- [Iterables and Iterators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators)

## Notes

- for...of works with any iterable (arrays, strings, Sets, Maps, etc.)
- for...of is cleaner than for loops when you don't need the index
- Combine for...of with destructuring for readable code
- for...of doesn't work with plain objects (use for...in instead)
- Always prefer for...of over forEach when you need early exit (break/continue)
