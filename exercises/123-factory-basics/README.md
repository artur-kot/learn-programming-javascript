# Exercise 123: Factory Functions - Closures & Private State

Master the most powerful pattern in JavaScript: factory functions combined with closures to create private state, encapsulation, and independent instances.

## Concepts

- **Closures** - Functions that remember their creation scope
- **Factory Functions** - Functions that create and return objects
- **Lexical Scope** - Access to parent function variables
- **Private Variables** - Data completely hidden from outside access
- **Encapsulation** - Hiding implementation details behind a public interface
- **State Isolation** - Each instance has its own separate state
- **Independent Instances** - Multiple objects from the same factory don't interfere
- **Information Hiding** - Revealing only what's necessary
- **Higher-Order Functions** - Functions that work with functions

## What You're Learning

This exercise teaches three critical concepts that work together:

1. **Closures & Basic State**: How functions "remember" variables and maintain private state
2. **Encapsulation & Protection**: Using closures to create truly private data that cannot be accessed directly
3. **Multiple Instances**: Creating many independent objects that don't share state

These patterns are foundational for professional JavaScript and are used everywhere in modern libraries and frameworks.

## Part 1: Closures & Basic State

### `createCounter(initialValue = 0)`
Factory that creates a counter with increment/decrement methods.

**Returns:**
- Object with `increment()`, `decrement()`, and `getValue()` methods

**Implementation:**
```javascript
export function createCounter(initialValue = 0) {
  let count = initialValue; // Private variable
  
  return {
    increment() {
      count++;
    },
    
    decrement() {
      count--;
    },
    
    getValue() {
      return count;
    }
  };
}
```

### `createMultiplyCounter(initialValue = 0, step = 1)`
Counter that increments/decrements by a custom step value.

**Parameters:**
- `initialValue` - Starting count
- `step` - Amount to add/subtract per operation

**Returns:**
- Counter object with methods

### `createBoundedCounter(initialValue = 0, min = 0, max = 100)`
Counter that respects minimum and maximum bounds.

**Parameters:**
- `initialValue` - Starting count
- `min` - Lowest allowed value
- `max` - Highest allowed value

**Returns:**
- Counter object that clamps values within bounds

## Part 2: Private Variables & Encapsulation

### `createUser(username, email)`
Factory with private email that cannot be accessed directly.

**Parameters:**
- `username` - User's username (public)
- `email` - User's email (private - locked in closure)

**Public Methods:**
- `getUsername()` - Returns username
- `getEmail()` - Returns email (private but accessible via method)
- `updateEmail(newEmail)` - Changes email

**Key Concept:** Email is truly private. You cannot access `user.email` directly - only through the getter method.

### `createBankAccount(owner, initialBalance)`
Account with private balance and transaction history.

**Parameters:**
- `owner` - Account owner name
- `initialBalance` - Starting balance

**Public Methods:**
- `getBalance()` - Get current balance
- `deposit(amount)` - Add money
- `withdraw(amount)` - Remove money (prevent over-withdrawal)
- `getTransactionHistory()` - Get array of transactions

**Key Concept:** Balance is truly private. The only way to modify it is through `deposit()` and `withdraw()`, which enforce business rules like preventing over-withdrawal.

### `createSecureNote(content, password)`
Note with password-protected reading.

**Parameters:**
- `content` - Note content
- `password` - Password to read content

**Public Methods:**
- `read(password)` - Return content if password correct, else null
- `changePassword(oldPassword, newPassword)` - Change password

**Key Concept:** Content and password are both completely private. No one can read the note without the correct password.

### `createPasswordManager()`
Secure password storage (simplified).

**Public Methods:**
- `store(key, password)` - Store password
- `retrieve(key)` - Get password (or undefined)
- `list()` - Get all stored keys
- `delete(key)` - Remove password

**Key Concept:** All passwords are private. No one can access the internal storage directly.

## Part 3: Multiple Instances & Independence

### `createCounterWithName(name = 'Counter', initialValue = 0)`
Named counter factory for creating independent instances.

**Parameters:**
- `name` - Counter name
- `initialValue` - Starting count

**Public Methods:**
- `getName()` - Get counter name
- `getValue()` - Get current value
- `increment()` - Add 1
- `decrement()` - Subtract 1

**Key Concept:** Each call creates a NEW closure with NEW private variables. Two counters never share state.

### `createCounterRegistry()`
Manages multiple counters in one place.

**Public Methods:**
- `register(name, initialValue)` - Create new counter
- `get(name)` - Get counter object
- `increment(name)` - Increment by name
- `decrement(name)` - Decrement by name
- `getValue(name)` - Get value by name
- `listCounters()` - Array of all counter names
- `reset(name)` - Reset counter to 0

**Key Concept:** The registry manages many independent counters, each with its own private state.

### `createCounterGroup(groupName)`
Groups related counters with statistics.

**Parameters:**
- `groupName` - Name for the group

**Public Methods:**
- `getName()` - Get group name
- `addCounter(name, initialValue)` - Add counter to group
- `getCounter(name)` - Get specific counter
- `increment(name)` - Increment counter
- `decrement(name)` - Decrement counter
- `getValue(name)` - Get counter value
- `getSum()` - Total of all counters in group
- `getAverage()` - Average of all counters

### `createScaledCounters(count, initialValue = 0)`
Factory that creates N independent counters.

**Parameters:**
- `count` - Number of counters to create
- `initialValue` - Starting value for each

**Returns:**
- Array of counter objects

**Key Concept:** Can create 100 independent counters at once. Each has its own closure and state.

## How Closures Work

```javascript
// Every time createCounter is called, a NEW closure is created
const counter1 = createCounter(0);
const counter2 = createCounter(0);

// They each have their own 'count' variable
counter1.increment(); // counter1's count is now 1
console.log(counter2.getValue()); // counter2's count is still 0

// The 'count' variable is unreachable from outside
console.log(counter1.count); // undefined - it's private!
console.log(counter1.getValue()); // 1 - must use the method
```

## Why This Pattern Matters

1. **Encapsulation**: Hide complex internal logic behind a simple interface
2. **Validation**: Enforce business rules when data is modified
3. **Security**: Data that cannot be directly accessed cannot be corrupted
4. **Organization**: Keep related data and functions together

## Testing Instructions

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test
npm test -- --grep "createCounter"
```

## Hints

<details>
<summary>Hint 1: Understanding Closure</summary>
A closure happens when a function returns another object that can still access variables from the outer function. Those variables become "private" because only the returned methods can access them.
</details>

<details>
<summary>Hint 2: Private Variables</summary>
Prefix variables like `let email = ...;` before the return statement. Variables declared this way are trapped in the closure and cannot be accessed from outside the factory.
</details>

<details>
<summary>Hint 3: Multiple Instances</summary>
Every time you call the factory function, you get a new closure with new private variables. The key insight: `counter1` and `counter2` are completely separate and their private variables never mix.
</details>

<details>
<summary>Hint 4: Validation in Factories</summary>
Since all data access goes through your methods, you can add validation. For example, in `createBoundedCounter`, check bounds before updating the value.
</details>

<details>
<summary>Hint 5: Registry Pattern</summary>
A registry is just an object that stores many factory-created instances in an internal object or array. Use a private object like `let counters = {}` to store them.
</details>

## Expected Behavior

### Example: Basic Closure
```javascript
const counter = createCounter(5);
console.log(counter.getValue()); // 5
counter.increment();
console.log(counter.getValue()); // 6
counter.decrement();
console.log(counter.getValue()); // 5

// Try to access the private variable
console.log(counter.count); // undefined
```

### Example: Encapsulation
```javascript
const account = createBankAccount('Alice', 1000);
console.log(account.getBalance()); // 1000

account.deposit(200);
console.log(account.getBalance()); // 1200

account.withdraw(500);
console.log(account.getBalance()); // 700

// Try to cheat by accessing balance directly
account.balance = 10000; // Fails - it's private!
console.log(account.getBalance()); // Still 700
```

### Example: Multiple Instances
```javascript
const counter1 = createCounterWithName('A', 0);
const counter2 = createCounterWithName('B', 0);

counter1.increment();
counter1.increment();
counter2.increment();

console.log(counter1.getValue()); // 2
console.log(counter2.getValue()); // 1 - independent!
```

## Reflection Questions

1. Why would you use a factory function instead of just creating an object literal?
2. How does a closure protect data?
3. What happens if you create 100 counters? Do they share any state?
4. Why is the registry pattern useful?
5. How would you add a "reset" method to a counter?

## Next Steps

After completing this exercise:
- Explore the advanced factory patterns (getters, setters, observers)
- Learn how this pattern compares to ES6 classes
- Implement your own password manager or task tracker

## Read More

- [MDN: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [MDN: Factory Functions](https://developer.mozilla.org/en-US/docs/Glossary/Factory_function)
- [JavaScript.info: Closure](https://javascript.info/closure)
- [JavaScript Pattern: Module Pattern](https://www.patterns.dev/posts/module-pattern/)
