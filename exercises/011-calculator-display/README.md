## Calculator - Display Results

Your calculator works great! But the output could be more professional. When you divide 10 by 3, you get `3.3333333333333335` - not very user-friendly! Real applications format numbers to be readable and add helpful labels like "$", "%", or units.

In this exercise, you'll learn to format calculator results like a professional application.

**Building on previous exercises**: This exercise builds on your calculator from exercises 008-010, adding professional formatting to the output.

## Your Challenge

Imagine showing calculator results to real users. Compare these outputs:

**Ugly (what we have now):**
```
Price: 19.5
Tax rate: 0.156
Distance: 1500
Result: 3.3333333333333335
```

**Professional (what we want):**
```
Price: $19.50
Tax rate: 15.6%
Distance: 1.50 km
Result: 10 ÷ 3 = 3.33
```

Open `011-calculator-display.js`. Your task is to create four formatting functions:

1. `formatCurrency()` - Format numbers as dollars with 2 decimal places
2. `formatPercentage()` - Convert decimals to percentages with 1 decimal place
3. `formatDistance()` - Show meters or kilometers with appropriate units
4. `formatCalculation()` - Display full equation with formatted result

## Expected Output

When you run your code, you should see:
```
=== Currency Formatting ===
$19.50
$1234.57
$0.50

=== Percentage Formatting ===
15.6%
50.0%
125.0%

=== Distance Formatting ===
500 m
1.50 km
2.75 km

=== Calculation Formatting ===
10 + 5.5 = 15.50
7 × 3 = 21.00
10 ÷ 3 = 3.33
```

## Hints

<details>
<summary>Hint 1: Controlling decimal places</summary>

Numbers in JavaScript can have many decimal places, but displayed output needs precision control. Think about:
- How can you limit a number to exactly 2 decimal places?
- What if a number needs trailing zeros to reach that precision (like 19.5 becoming 19.50)?
- Does JavaScript provide methods to control number formatting?

Professional applications always control how many decimal places are shown to users.
</details>

<details>
<summary>Hint 2: Adding symbols and labels</summary>

Raw numbers lack context. Consider:
- How do you indicate that 19.50 represents currency?
- What symbol transforms 0.156 into an understandable percentage?
- Can you combine formatted numbers with text to create meaningful output?

Concatenating formatted values with symbols and units creates user-friendly displays.
</details>

<details>
<summary>Hint 3: Conditional formatting based on value</summary>

Sometimes the format depends on the value itself. Think about:
- When should you display a large distance in kilometers versus meters?
- How do you decide which unit is most appropriate?
- What conditional logic determines which formatting path to take?

Smart formatting chooses the most readable representation based on the data.
</details>

<details>
<summary>Hint 4: Building formatted output strings</summary>

Creating readable calculation displays requires several steps:
- Converting operation identifiers into human-readable symbols
- Controlling precision of the result value
- Assembling all pieces into a coherent string

Each formatting function follows a pattern: control precision, add context, return formatted string.
</details>

## Test Your Code

To run your code and see the output:
```bash
cd exercises/011-calculator-display
node 011-calculator-display.js
```

To run the tests:
```bash
npm test
```

## What You're Learning

This exercise teaches essential output formatting skills:

- **toFixed() method**: Controlling decimal places in numbers
- **String concatenation**: Combining numbers with labels and symbols
- **Conditional formatting**: Choosing format based on value
- **User-friendly output**: Making data readable for humans
- **Professional presentation**: Creating polished application displays

These skills are crucial for any user-facing application!

## Reflection Questions

After completing the exercise, think about:
1. Why does `toFixed()` return a string instead of a number?
2. How would you format a very large number like 1234567.89 with comma separators (1,234,567.89)?
3. When might you want more or fewer decimal places than 2?

## Next Steps

Fantastic work! Your calculator now produces professional, user-friendly output.

In **exercise 012-calculator-validation** (the final exercise in this series!), you'll learn to validate inputs and handle errors gracefully. What happens when someone enters "hello" instead of a number? Or divides by zero? You'll make your calculator bulletproof!

Keep coding!

## Read More

Want to dive deeper? Check out these resources:

- 📚 [Number Formatting - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)
- 📖 [Intl.NumberFormat - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
- 🎯 [Number Formatting - JavaScript.info](https://javascript.info/number#toFixed)

