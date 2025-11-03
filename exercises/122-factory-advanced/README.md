# Exercise 124: Factory Functions - Module Pattern & Advanced Features

Build professional-grade factory patterns: implement the revealing module pattern, advanced closures with getters/setters, observable patterns, undo/redo, and validation callbacks.

## Concepts

- **Module Pattern** - Encapsulation with IIFE (Immediately Invoked Function Expression)
- **Revealing Module** - Public interface that reveals only necessary methods
- **Organization** - Grouping related functionality together
- **Public vs Private API** - What users can access vs internal implementation
- **Getters and Setters** - JavaScript property accessors for clean APIs
- **Observer Pattern** - Subscription-based notifications for state changes
- **Undo/Redo** - History management and state recovery
- **Validation** - Custom validation functions and business logic
- **Callbacks** - Functions passed as parameters for behavior customization
- **Advanced Closures** - Complex state management patterns

## What You're Learning

This exercise brings together professional patterns used in real JavaScript libraries and frameworks:

1. **Module Pattern**: How to organize large amounts of code into logically grouped, privately scoped functions
2. **Advanced Patterns**: Getters, setters, observers, and validation
3. **Undo/Redo**: Track state history and allow reversals
4. **Real-World Design**: How professional libraries structure their APIs

## Part 1: Module Pattern

### `Counter` Module
An IIFE that provides counter creation functionality.

**Public Interface:**
```javascript
export const Counter = (() => {
  // Private helpers
  function createCounterObject(name, value) {
    let count = value;
    
    return {
      getName() { return name; },
      getValue() { return count; },
      increment() { count++; },
      decrement() { count--; }
    };
  }

  // Reveal public interface
  return {
    create(name = 'Counter', initialValue = 0) {
      return createCounterObject(name, initialValue);
    },

    createMultiple(count, initialValue = 0) {
      const counters = [];
      for (let i = 0; i < count; i++) {
        counters.push(createCounterObject(`Counter ${i + 1}`, initialValue));
      }
      return counters;
    }
  };
})();
```

**Public Methods:**
- `create(name, initialValue)` - Create a single counter
- `createMultiple(count, initialValue)` - Create N counters

**Key Pattern:** The entire module is wrapped in an IIFE. Everything inside is private by default. Only what's returned from the IIFE is public.

### `CounterApp` Module
Application-level management using the revealing module pattern.

**Public Methods:**
- `addCounter(name, initialValue)` - Create and register counter
- `getCounter(name)` - Retrieve counter by name
- `removeCounter(name)` - Delete counter
- `getAllCounters()` - Get array of all counters
- `getStats()` - Get statistics (total, average, etc.)

### `StatsTracker` Module
Event tracking and statistics aggregation.

**Public Methods:**
- `track(eventName)` - Increment event counter
- `getCount(eventName)` - Get count for event
- `getAll()` - Get object of all events and counts
- `reset(eventName)` - Reset event counter
- `getHighest()` - Get event with highest count

## Part 2: Advanced Patterns

### `createAdvancedCounter(name, initialValue, max, min)`
Counter with bounds, reset, getters, and setters.

**Features:**
- Enforce min/max bounds on value
- Get/set syntax for clean API
- Reset to initial value
- Format method for display

**Implementation Example:**
```javascript
export function createAdvancedCounter(name, initialValue = 0, max = null, min = null) {
  let count = initialValue;
  const initial = initialValue;

  return {
    getValue() {
      return count;
    },

    get() {
      return count; // Getter method
    },

    set(newValue) {
      if (max !== null && newValue > max) count = max;
      else if (min !== null && newValue < min) count = min;
      else count = newValue;
    },

    increment() {
      this.set(count + 1);
    },

    decrement() {
      this.set(count - 1);
    },

    reset() {
      count = initial;
    },

    format() {
      return `${name}: ${count}${max ? ` (max: ${max})` : ''}`;
    }
  };
}
```

### `createObservableCounter(initialValue)`
Counter with observer pattern for change notifications.

**Features:**
- Register observers to be notified on changes
- Pass old and new values to observers
- Multiple simultaneous observers
- Unsubscribe mechanism

**Key Methods:**
- `onChange(observer)` - Register observer, returns unsubscribe function
- `increment()` / `decrement()` - Notify all observers
- `getValue()` - Get current value

**Observer Signature:**
```javascript
// Observer receives old value and new value
const observer = (oldValue, newValue) => {
  console.log(`Changed from ${oldValue} to ${newValue}`);
};
```

### `createHistoryCounter(initialValue)`
Counter with undo/redo functionality.

**Features:**
- Track all value changes
- Undo to previous states
- Redo after undo
- Check if undo/redo available
- Get full history

**Key Methods:**
- `getValue()` - Get current value
- `increment()` / `decrement()` - Change value and record in history
- `undo()` - Go to previous value
- `redo()` - Go to next value after undo
- `canUndo()` - Check if undo available
- `canRedo()` - Check if redo available
- `getHistory()` - Get array of all recorded values

**History Behavior:**
```javascript
const counter = createHistoryCounter(0);
counter.increment(); // History: [0, 1]
counter.increment(); // History: [0, 1, 2]
counter.undo();      // Back to 1, but can redo
counter.increment(); // New operation clears redo stack
```

### `createValidatedCounter(initialValue, validator)`
Counter that only accepts values passing a validation function.

**Features:**
- Custom validator function
- Default validator (positive only)
- Reject invalid values
- Type-safe operations

**Validator Signature:**
```javascript
// Validator receives the new value and returns true if valid
const validator = (newValue) => {
  return newValue >= 0 && newValue <= 100; // Range 0-100
};
```

**Default Validator:**
```javascript
// If no validator provided, default is positive only (>= 0)
const counter = createValidatedCounter(5);
counter.decrement(); // 4
counter.decrement(); // 3
// ... keep decrementing
counter.decrement(); // Stays at 0 (cannot go negative)
```

**Custom Examples:**
```javascript
// Even numbers only
const evenValidator = (value) => value % 2 === 0;

// Multiples of 5
const fivesValidator = (value) => value % 5 === 0;

// Power of 2
const powerOfTwoValidator = (value) => (value & (value - 1)) === 0;
```

## Module Pattern vs Factory Pattern

**Factory Pattern (Exercise 123):**
- Create one factory function that creates individual objects
- Each object has its own private state
- Good for creating many similar objects

**Module Pattern (Exercise 124):**
- Wrap code in IIFE for organization
- Group related functionality
- Private helpers inside IIFE, public methods returned
- Good for singletons and application-level functionality

## How They Work Together

```javascript
// IIFE creates private scope
export const Counter = (() => {
  // Private helper function
  function createCounterObject(name, value) {
    let count = value; // Private variable
    
    return { /* public methods */ };
  }

  // Public interface
  return {
    create(name, value) { return createCounterObject(name, value); },
    createMultiple(n, value) { /* ... */ }
  };
})();

// Usage
const c1 = Counter.create('A', 0);
const c2 = Counter.create('B', 0);
// c1 and c2 are independent with separate closures
```

## Testing Instructions

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test suite
npm test -- --grep "Module Pattern"
```

## Hints

<details>
<summary>Hint 1: IIFE Pattern</summary>
An IIFE (Immediately Invoked Function Expression) is `(() => { ... })()`. The extra `()` at the end calls the function immediately. Everything inside is private by default.
</details>

<details>
<summary>Hint 2: Revealing Module</summary>
Return an object from the IIFE with only the methods you want public. Everything else stays private inside the closure.
</details>

<details>
<summary>Hint 3: Observer Pattern</summary>
Keep an array of observer functions. When something changes, loop through and call each observer. Return an unsubscribe function that removes from the array.
</details>

<details>
<summary>Hint 4: Undo/Redo</summary>
Keep two arrays: `past` and `future`. When you do an operation, add current value to `past` and clear `future`. On undo, move from `past` to `future`. On redo, move from `future` to `past`.
</details>

<details>
<summary>Hint 5: Validation</summary>
Before changing the value, call `validator(newValue)`. Only update if it returns true. Use a default validator if none provided.
</details>

## Expected Behavior

### Module Pattern Example
```javascript
const counter1 = Counter.create('C1', 0);
const counter2 = Counter.create('C2', 10);

counter1.increment(); // Independent state
console.log(counter1.getValue()); // 1
console.log(counter2.getValue()); // 10
```

### Observer Example
```javascript
const counter = createObservableCounter(5);

counter.onChange((old, newVal) => {
  console.log(`Changed: ${old} → ${newVal}`);
});

counter.increment(); // Logs: "Changed: 5 → 6"
counter.increment(); // Logs: "Changed: 6 → 7"
```

### Undo/Redo Example
```javascript
const counter = createHistoryCounter(0);
counter.increment(); // 1
counter.increment(); // 2
counter.increment(); // 3

counter.undo(); // Back to 2
counter.undo(); // Back to 1

counter.redo(); // Forward to 2
console.log(counter.getValue()); // 2
```

### Validation Example
```javascript
const evenOnly = (value) => value % 2 === 0;
const counter = createValidatedCounter(0, evenOnly);

counter.increment(); // 1 - REJECTED, stays 0
counter.increment(); // 1 - REJECTED, stays 0
counter.increment(); // 1 - REJECTED, stays 0
counter.increment(); // 1 - REJECTED, stays 0

// Manually set to 2
counter.set(2); // OK, 2 is even
counter.increment(); // 3 - REJECTED, stays 2
```

## Reflection Questions

1. What's the difference between module pattern and factory pattern?
2. Why use IIFE instead of just creating a regular object?
3. How would you use the observer pattern in a real app (like a todo list)?
4. Why is undo/redo useful? What real apps use this?
5. What kinds of validations might you use for a shopping cart?

## Next Steps

After completing this exercise:
- Combine patterns: create an advanced counter with observers AND history
- Implement a real-world module (like a calculator)
- Explore ES6 classes as an alternative to factories
- Learn about design patterns like Singleton and Strategy

## Read More

- [MDN: IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)
- [MDN: Module Pattern](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Module)
- [JavaScript.info: Patterns](https://javascript.info/patterns)
- [Observer Pattern Explained](https://refactoring.guru/design-patterns/observer)
- [Undo/Redo Implementation](https://en.wikipedia.org/wiki/Undo)
