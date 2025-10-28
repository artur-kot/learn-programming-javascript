# Exercise 077: Recipe Organizer - Block Scope

Learn to use `let` and `const` to properly scope variables to blocks, protecting them from unintended access or modification. This exercise shows why modern JavaScript's block scoping is crucial for writing maintainable code.

## Concepts

- **Block Scope** - Variables limited to their code block (if, for, function, etc.)
- **Let vs Const** - let for mutable, const for immutable values
- **Scope Boundaries** - Where variables can be accessed
- **Temporal Dead Zone** - Why hoisting works differently for let/const
- **Variable Shadowing** - Reusing names in nested scopes (usually avoid)

## What You'll Learn

1. **Declaring Variables**: When to use const, when to use let
2. **Block Boundaries**: How scope protects variables
3. **Loop Scope**: How let behaves differently in loops vs var
4. **Nested Scopes**: Inner scopes can access outer but not vice versa
5. **Best Practices**: Patterns that prevent scope-related bugs

## Functions to Implement

### `scaleRecipe(recipeId, scaleFactor)`
Use `let` and `const` in a function to scale recipe ingredient amounts.

**Parameters:**
- `recipeId` - ID of the recipe
- `scaleFactor` - Number to multiply amounts by

**Returns:**
- Array of scaled amounts

**Example:**
```javascript
scaleRecipe(1, 2);
// Result: [4, 2, 4, 2, 4]  // All amounts doubled
```

### `checkIngredientAvailability(recipeId, availableIngredients)`
Use proper block scoping to separate available and missing ingredients.

**Parameters:**
- `recipeId` - ID of the recipe
- `availableIngredients` - Object with ingredient names as keys

**Returns:**
- Object: `{ available: [...], missing: [...] }`

**Example:**
```javascript
checkIngredientAvailability(1, { flour: true, sugar: true });
// Result: { available: ['flour', 'sugar'], missing: ['eggs', 'vanilla', ...] }
```

### `groupIngredientsByCategory(recipeId, categories)`
Use nested scopes to group ingredients properly.

**Parameters:**
- `recipeId` - ID of the recipe
- `categories` - Object mapping ingredient names to category strings

**Returns:**
- Object with category names as keys and ingredient arrays as values

**Example:**
```javascript
groupIngredientsByCategory(1, {
  flour: 'dry',
  sugar: 'dry',
  eggs: 'refrigerated'
});
// Result: {
//   dry: [flour_obj, sugar_obj],
//   refrigerated: [eggs_obj]
// }
```

### `createRecipeTemplate(baseRecipeId, scalingOptions)`
Use const for fixed values and proper scoping for each scale variant.

**Parameters:**
- `baseRecipeId` - ID of recipe to template
- `scalingOptions` - Configuration object

**Returns:**
- Object with `{ half, normal, double, triple }` scale variants

**Example:**
```javascript
createRecipeTemplate(1, {});
// Result: {
//   half: [1, 0.5, 1, 0.5, 1],
//   normal: [2, 1, 2, 1, 2],
//   double: [4, 2, 4, 2, 4],
//   triple: [6, 3, 6, 3, 6]
// }
```

### `optimizeRecipeFormat(recipeId)`
Organize recipe data using block scope for different sections.

**Parameters:**
- `recipeId` - ID of the recipe

**Returns:**
- Object with `{ base, scales, metadata }`

**Example:**
```javascript
optimizeRecipeFormat(1);
// Result: {
//   base: [2, 1, 2, 1, 2],
//   scales: { half: [...], normal: [...], double: [...] },
//   metadata: { title: 'Cookies', servings: 24, ingredients: 5 }
// }
```

## Hints

1. **Use Const by Default**: Most variables should be `const`
   ```javascript
   const recipe = getRecipeById(recipeId);
   if (!recipe) return [];
   ```

2. **Use Let for Mutable Values**: Only when you need to reassign
   ```javascript
   let sum = 0;
   for (const ing of ingredients) {
     sum += ing.amount;
   }
   ```

3. **Block Scope Protection**: Variables in blocks don't leak out
   ```javascript
   if (condition) {
     const localVar = 'only in this block';
   }
   // localVar is NOT accessible here
   ```

4. **Nested Scopes**: Inner access outer, but not vice versa
   ```javascript
   const outer = 'accessible inside';
   if (true) {
     const inner = 'only inside block';
     console.log(outer);  // ✓ Can access
   }
   console.log(inner);    // ✗ Error
   ```

5. **Loop Variable Scope**: Let creates fresh binding each iteration
   ```javascript
   // With let (correct)
   for (let i = 0; i < 3; i++) { ... }
   // i is only in loop scope
   
   // With var (avoid)
   for (var i = 0; i < 3; i++) { ... }
   // i leaks to outer scope
   ```

## Challenge

- Create a function that demonstrates variable shadowing and why to avoid it
- Implement a closure using proper block scope
- Build a function that uses multiple nested blocks with proper scoping
- Create a comparison showing var vs let behavior in loops

## Resources

- [MDN: Let Statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
- [MDN: Const Statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
- [Temporal Dead Zone](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone)
- [Scope and Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

## Notes

- **Always use const first**, then let if you need reassignment
- **Never use var** in modern JavaScript - it's function-scoped and confusing
- **Block scope prevents accidental overwrites** of outer variables
- **Inner blocks can access outer variables** but outer can't access inner
- **Const prevents reassignment but doesn't freeze objects** - properties can still change
