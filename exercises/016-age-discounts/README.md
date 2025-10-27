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
1. Convert the percentage to a decimal (50% = 0.50, 25% = 0.25, 30% = 0.30)
2. Multiply the base price by the decimal
3. Subtract the discount from the base price

```javascript
const basePrice = 20;
const discountPercent = 0.50;  // 50%
const discountAmount = basePrice * discountPercent;  // 20 * 0.50 = 10
const finalPrice = basePrice - discountAmount;  // 20 - 10 = 10
```

Or calculate directly:
```javascript
const finalPrice = basePrice * (1 - discountPercent);  // 20 * 0.50 = 10
```
</details>

<details>
<summary>Hint 2: Combining age classification with calculations</summary>

You use the same else-if structure from exercise 015, but now you add calculations inside each block:

```javascript
if (age <= 12) {
  // Child discount: 50%
  const discount = basePrice * 0.50;
  const finalPrice = basePrice - discount;
  console.log(`Age ${age}: Child ticket = $${finalPrice}`);
} else if (age <= 17) {
  // Teen discount: 25%
  const discount = basePrice * 0.25;
  const finalPrice = basePrice - discount;
  console.log(`Age ${age}: Teen ticket = $${finalPrice}`);
}
// ... and so on
```
</details>

<details>
<summary>Hint 3: Variables inside if blocks</summary>

You can declare variables inside if/else-if/else blocks:

```javascript
if (age <= 12) {
  const discount = basePrice * 0.50;  // Only exists in this block
  const finalPrice = basePrice - discount;
  console.log(`Child ticket = $${finalPrice}`);
}
// discount and finalPrice don't exist here
```

This is called **block scope** - variables declared inside `{ }` only exist within those braces.
</details>

<details>
<summary>Hint 4: Complete structure for discount calculation</summary>

Here's the complete else-if chain with discount calculations:

```javascript
if (age <= 12) {
  const discount = basePrice * 0.50;  // 50% discount
  const finalPrice = basePrice - discount;
  console.log(`Age ${age}: Child ticket = $${finalPrice}`);
} else if (age <= 17) {
  const discount = basePrice * 0.25;  // 25% discount
  const finalPrice = basePrice - discount;
  console.log(`Age ${age}: Teen ticket = $${finalPrice}`);
} else if (age <= 64) {
  const finalPrice = basePrice;  // No discount
  console.log(`Age ${age}: Adult ticket = $${finalPrice}`);
} else {
  const discount = basePrice * 0.30;  // 30% discount
  const finalPrice = basePrice - discount;
  console.log(`Age ${age}: Senior ticket = $${finalPrice}`);
}
```

Apply this pattern to all four ages!
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

## Solution

<details>
<summary>Click to see the solution (try the exercise first!)</summary>

```javascript
export function calculateTicketPrice() {
  const basePrice = 20; // Base ticket price in dollars

  // Test different ages
  const age1 = 8;
  const age2 = 16;
  const age3 = 35;
  const age4 = 70;

  // Calculate price for age1 (8)
  if (age1 <= 12) {
    const discount = basePrice * 0.50;
    const finalPrice = basePrice - discount;
    console.log(`Age ${age1}: Child ticket = $${finalPrice}`);
  } else if (age1 <= 17) {
    const discount = basePrice * 0.25;
    const finalPrice = basePrice - discount;
    console.log(`Age ${age1}: Teen ticket = $${finalPrice}`);
  } else if (age1 <= 64) {
    const finalPrice = basePrice;
    console.log(`Age ${age1}: Adult ticket = $${finalPrice}`);
  } else {
    const discount = basePrice * 0.30;
    const finalPrice = basePrice - discount;
    console.log(`Age ${age1}: Senior ticket = $${finalPrice}`);
  }

  // Calculate price for age2 (16)
  if (age2 <= 12) {
    const discount = basePrice * 0.50;
    const finalPrice = basePrice - discount;
    console.log(`Age ${age2}: Child ticket = $${finalPrice}`);
  } else if (age2 <= 17) {
    const discount = basePrice * 0.25;
    const finalPrice = basePrice - discount;
    console.log(`Age ${age2}: Teen ticket = $${finalPrice}`);
  } else if (age2 <= 64) {
    const finalPrice = basePrice;
    console.log(`Age ${age2}: Adult ticket = $${finalPrice}`);
  } else {
    const discount = basePrice * 0.30;
    const finalPrice = basePrice - discount;
    console.log(`Age ${age2}: Senior ticket = $${finalPrice}`);
  }

  // Calculate price for age3 (35)
  if (age3 <= 12) {
    const discount = basePrice * 0.50;
    const finalPrice = basePrice - discount;
    console.log(`Age ${age3}: Child ticket = $${finalPrice}`);
  } else if (age3 <= 17) {
    const discount = basePrice * 0.25;
    const finalPrice = basePrice - discount;
    console.log(`Age ${age3}: Teen ticket = $${finalPrice}`);
  } else if (age3 <= 64) {
    const finalPrice = basePrice;
    console.log(`Age ${age3}: Adult ticket = $${finalPrice}`);
  } else {
    const discount = basePrice * 0.30;
    const finalPrice = basePrice - discount;
    console.log(`Age ${age3}: Senior ticket = $${finalPrice}`);
  }

  // Calculate price for age4 (70)
  if (age4 <= 12) {
    const discount = basePrice * 0.50;
    const finalPrice = basePrice - discount;
    console.log(`Age ${age4}: Child ticket = $${finalPrice}`);
  } else if (age4 <= 17) {
    const discount = basePrice * 0.25;
    const finalPrice = basePrice - discount;
    console.log(`Age ${age4}: Teen ticket = $${finalPrice}`);
  } else if (age4 <= 64) {
    const finalPrice = basePrice;
    console.log(`Age ${age4}: Adult ticket = $${finalPrice}`);
  } else {
    const discount = basePrice * 0.30;
    const finalPrice = basePrice - discount;
    console.log(`Age ${age4}: Senior ticket = $${finalPrice}`);
  }
}

calculateTicketPrice();
```

**Breaking down the calculations:**

For **Child (50% discount)**:
```javascript
basePrice = 20
discount = 20 * 0.50 = 10
finalPrice = 20 - 10 = 10
```

For **Teen (25% discount)**:
```javascript
basePrice = 20
discount = 20 * 0.25 = 5
finalPrice = 20 - 5 = 15
```

For **Adult (no discount)**:
```javascript
finalPrice = 20
```

For **Senior (30% discount)**:
```javascript
basePrice = 20
discount = 20 * 0.30 = 6
finalPrice = 20 - 6 = 14
```

**Alternative approach (calculate price directly):**
```javascript
if (age <= 12) {
  const finalPrice = basePrice * 0.50;  // Pay 50% of base price
  console.log(`Age ${age}: Child ticket = $${finalPrice}`);
} else if (age <= 17) {
  const finalPrice = basePrice * 0.75;  // Pay 75% of base price
  console.log(`Age ${age}: Teen ticket = $${finalPrice}`);
} else if (age <= 64) {
  const finalPrice = basePrice;  // Pay 100% of base price
  console.log(`Age ${age}: Adult ticket = $${finalPrice}`);
} else {
  const finalPrice = basePrice * 0.70;  // Pay 70% of base price
  console.log(`Age ${age}: Senior ticket = $${finalPrice}`);
}
```

This works by thinking of it as "what percentage do they pay" instead of "what percentage discount do they get."

**Understanding block scope:**
```javascript
if (age <= 12) {
  const discount = 10;
  const finalPrice = 10;
  console.log(finalPrice);  // ✓ Works - finalPrice exists here
}

console.log(finalPrice);  // ✗ Error! finalPrice doesn't exist outside the block
```

**Real-world applications:**
- Movie tickets with age-based pricing
- Theme park admission with age tiers
- Public transportation fare systems
- Museum or zoo entry fees
- Software subscription pricing for students/seniors
- Insurance premiums based on age brackets

**Bonus: Adding tax calculation:**
```javascript
if (age <= 12) {
  const discount = basePrice * 0.50;
  const discountedPrice = basePrice - discount;
  const tax = discountedPrice * 0.10;  // 10% tax
  const finalPrice = discountedPrice + tax;
  console.log(`Age ${age}: Child ticket = $${finalPrice.toFixed(2)}`);
}
```

</details>

## Next Steps

Excellent work! You've learned to combine conditionals with calculations. For the final exercise in this series, you'll tackle the most complex scenario yet: **logical operators**.

In **exercise 017-age-permissions**, you'll build a permission system that checks **multiple conditions at once** using AND (`&&`) and OR (`||`) operators. This is where conditionals become truly powerful!
