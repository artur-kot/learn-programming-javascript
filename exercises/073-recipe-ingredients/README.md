# Exercise 073: Recipe Organizer - Ingredients

Learn how to use destructuring to extract ingredient data from recipe objects. Destructuring lets you unpack values from arrays or properties from objects into distinct variables in a clean, readable way.

## Concepts

- **Array Destructuring** - Extract elements from arrays into variables
- **Object Destructuring** - Extract properties from objects into variables
- **Nested Destructuring** - Destructure inside loops and functions
- **Skipping Elements** - Use commas to skip array elements
- **Default Values** - Provide defaults when destructuring

## What You'll Learn

1. **Basic Destructuring**: How to extract values from arrays and objects
2. **Destructuring in Functions**: Using destructuring in function parameters
3. **Destructuring in Loops**: Destructuring within for...of loops
4. **Multiple Levels**: Extracting and separating data into different structures
5. **Readable Code**: How destructuring makes code more expressive

## Functions to Implement

### `extractIngredientNames(recipeId)`
Extract just the names from a recipe's ingredients using destructuring.

**Parameters:**
- `recipeId` - ID of the recipe

**Returns:**
- Array of ingredient names (strings)

**Example:**
```javascript
addRecipe(1, 'Cookies', 24, [
  { name: 'flour', amount: 2, unit: 'cups' },
  { name: 'sugar', amount: 1, unit: 'cup' }
]);
const names = extractIngredientNames(1);
// Result: ['flour', 'sugar']
```

### `extractAllIngredients(recipeId)`
Extract ingredient names and amounts into two separate arrays using destructuring in a loop.

**Parameters:**
- `recipeId` - ID of the recipe

**Returns:**
- Object with shape: `{ names: [...], amounts: [...] }`

**Example:**
```javascript
const result = extractAllIngredients(1);
// Result: { names: ['flour', 'sugar'], amounts: [2, 1] }
```

### `getIngredientInfo(recipeId, ingredientIndex)`
Use destructuring to extract name, amount, and unit from a specific ingredient.

**Parameters:**
- `recipeId` - ID of the recipe
- `ingredientIndex` - Index of the ingredient in the ingredients array

**Returns:**
- Object with `{ name, amount, unit }` or `undefined` if not found

**Example:**
```javascript
const info = getIngredientInfo(1, 0);
// Result: { name: 'flour', amount: 2, unit: 'cups' }
```

### `listIngredientsFormatted(recipeId)`
Use destructuring in a loop to format each ingredient as a readable string.

**Parameters:**
- `recipeId` - ID of the recipe

**Returns:**
- Array of formatted strings like `['2 cups flour', '1 cup sugar']`

**Example:**
```javascript
const formatted = listIngredientsFormatted(1);
// Result: ['2 cups flour', '1 cup sugar']
```

## Hints

1. **Array Destructuring**: Extract values by position
   ```javascript
   const [first, second] = array;
   const { name, amount } = object;
   ```

2. **In Loops**: Destructure directly in for...of
   ```javascript
   for (const { name, amount } of ingredients) {
     // name and amount are already extracted
   }
   ```

3. **Skipping Values**: Use commas to skip array elements
   ```javascript
   const [first, , third] = array;  // Skip second element
   ```

4. **With Array Methods**: Use destructuring with map
   ```javascript
   arr.map(({ name }) => name)  // Extract just the name
   ```

5. **Multiple Extractions**: Build different data structures
   ```javascript
   const names = [];
   const amounts = [];
   for (const { name, amount } of ingredients) {
     names.push(name);
     amounts.push(amount);
   }
   ```

## Challenge

- Create a function that extracts ingredients by unit type
- Use rest parameters (...) in destructuring to capture remaining ingredients
- Implement renaming in destructuring: `{ name: ingredientName }`
- Create a function that groups ingredients by unit

## Resources

- [MDN: Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [Destructuring Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#object_destructuring)
- [Destructuring Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#array_destructuring)

## Notes

- Destructuring makes code more readable by clearly showing what data you're extracting
- You can destructure directly in function parameters
- Destructuring works with arrays (by position) and objects (by property name)
- Use descriptive variable names after destructuring for clarity
- Destructuring is especially powerful with loops and array methods like map and filter
