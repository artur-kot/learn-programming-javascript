## Age Checker - Discount Calculator

You've learned to classify ages into categories. Now let's put that knowledge to practical use! Real-world applications often need to make decisions AND perform calculations based on those decisions. Think about ticket prices, membership fees, or insurance rates - the price often depends on your age.

In this exercise, you'll build a ticket pricing system with age-based discounts. You'll combine what you've learned about else-if chains with arithmetic to calculate different prices for different age groups.

## Your Challenge

Open `016-age-discounts.js`. You'll see four different ages: 8, 16, 35, and 70. The base ticket price is $20.

Your task is to calculate the final ticket price using these discount rules:
- **Child (0-12)**: 50% discount → $10
- **Teen (13-17)**: 25% discount → $15
- **Adult (18-64)**: No discount → $20
- **Senior (65+)**: 30% discount → $14

## Expected Output

When you run your code, you should see:
```
Age 8: Child ticket = $10
Age 16: Teen ticket = $15
Age 35: Adult ticket = $20
Age 70: Senior ticket = $14
```

## Hints

<details>
<summary>Hint 1: Calculating percentages</summary>

To calculate a percentage discount:
1. Convert the percentage to a decimal (50% becomes 0.50, 25% becomes 0.25, etc.)
2. Multiply the base price by this decimal to get the discount amount
3. Subtract the discount amount from the base price to get the final price

Alternatively, you can think about what percentage they DO pay (paying 50% of the price is the same as getting a 50% discount).
</details>

<details>
<summary>Hint 2: Combining classification with calculations</summary>

You use the same multi-condition structure from exercise 015, but now you perform calculations inside each block before displaying the result.

Each age category needs:
1. Classification logic (which group?)
2. Price calculation based on that group's discount
3. Display the result with the category name and final price
</details>

<details>
<summary>Hint 3: Variables inside decision blocks</summary>

You can declare variables inside conditional blocks. These variables only exist within those braces - this is called **block scope**.

For each category, you might want to create variables to hold:
- The discount amount
- The final price after applying the discount

These calculations happen inside the appropriate block based on which condition matched.
</details>

<details>
<summary>Hint 4: Pattern for price calculation</summary>

For each age value:
1. Classify which age group it belongs to
2. Calculate the appropriate discount for that group
3. Compute the final price
4. Display the age, category name, and final price

Some categories have discounts, one category has no discount. Apply the appropriate calculation based on the classification.
</details>

## Test Your Code

To run your code and see the output:
```bash
cd exercises/016-age-discounts
node 016-age-discounts.js
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise teaches you:
- **Combining conditionals with calculations** - making decisions that affect numbers
- **Percentage calculations** - converting percentages to decimals and computing discounts
- **Block scope** - understanding where variables exist and can be used
- **Practical applications** - seeing how conditionals solve real-world problems
- **Nested logic** - calculations depend on which condition is true

This pattern (classify → calculate → display) is extremely common in real applications!

## Reflection Questions

After completing the exercise, think about:
1. Why do we calculate the discount inside each if block instead of after all the if statements?
2. What would happen if you tried to use the `finalPrice` variable outside of its if block?
3. How would you modify this code to add a 10% tax after applying the discount?
4. Can you think of other scenarios where prices change based on categories?

## Next Steps

Excellent work! You've learned to combine conditionals with calculations. For the final exercise in this series, you'll tackle the most complex scenario yet: **logical operators**.

In **exercise 017-age-permissions**, you'll build a permission system that checks **multiple conditions at once** using AND (`&&`) and OR (`||`) operators. This is where conditionals become truly powerful!