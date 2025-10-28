# Exercise 123: Counter Factory - Basic Closure

Learn to create factory functions that use closures to maintain private state.

## Concepts

- **Closures** - Functions that remember their creation scope
- **Factory Functions** - Functions that create and return objects
- **Lexical Scope** - Access to parent function variables
- **Returning Functions** - Functions as return values
- **State Encapsulation** - Private data protection
- **Function Scope** - Variables live only in their scope
- **Higher-Order Functions** - Functions that work with functions

## What You're Learning

A closure is one of the most important and powerful concepts in JavaScript. It's how functions
"remember" the environment in which they were created. A factory function is a function that
creates objects, and when combined with closures, it creates a powerful pattern for managing
private state.

## Functions to Implement

### `createCounter(initialValue = 0)`
Factory function that creates a counter object with public methods and a private count variable.

**Parameters:**
- `initialValue` - Starting count (default: 0)

**Returns:**
- Object with `increment()`, `decrement()`, and `getValue()` methods

**Implementation:**
```javascript
export function createCounter(initialValue = 0) {
  // Private variable - only accessible inside this function
  let count = initialValue;

  // Return public interface
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
Factory that creates a counter with custom step value.

**Parameters:**
- `initialValue` - Starting count
- `step` - Amount to increment/decrement by

**Returns:**
- Counter object

**Implementation:**
```javascript
export function createMultiplyCounter(initialValue = 0, step = 1) {
  let count = initialValue;

  return {
    increment() {
      count += step;
    },
    
    decrement() {
      count -= step;
    },
    
    getValue() {
      return count;
    }
  };
}
```

### `createBoundedCounter(initialValue = 0, min = 0, max = 100)`
Factory that creates a counter with min/max bounds.

**Parameters:**
- `initialValue` - Starting count
- `min` - Minimum allowed value
- `max` - Maximum allowed value

**Returns:**
- Counter object that respects bounds

**Implementation:**
```javascript
export function createBoundedCounter(initialValue = 0, min = 0, max = 100) {
  let count = initialValue;

  return {
    increment() {
      if (count < max) count++;
    },
    
    decrement() {
      if (count > min) count--;
    },
    
    getValue() {
      return count;
    }
  };
}
```

## Understanding Closures

### The Basic Idea

A closure is created when a function "closes over" variables from its parent scope.

```javascript
function makeCounter() {
  let count = 0; // Parent scope variable

  return function() {
    count++; // Inner function accesses parent's variable
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// count is never directly accessible
// But the returned function remembers it!
```

### How It Works

```
When makeCounter() is called:
┌─────────────────────────────────┐
│ Function Scope                  │
│                                 │
│  let count = 0;  ←─────────┐   │
│                            │   │
│  return function() {       │   │
│    count++;  ←─ "closes over"  │
│    return count;           │   │
│  };                        │   │
└─────────────────────────────────┘

When the returned function is called,
it still has access to count!
```

## Factory Functions

### What is a Factory?

A factory is a function that creates objects. It's called a "factory" because it manufactures
objects on demand, similar to a real-world factory.

```javascript
// Factory function
function createPerson(name, age) {
  return {
    name: name,
    age: age,
    
    greet() {
      return `Hello, I'm ${this.name}`;
    }
  };
}

// Using the factory
const person1 = createPerson('Alice', 30);
const person2 = createPerson('Bob', 25);

console.log(person1.greet()); // Hello, I'm Alice
console.log(person2.greet()); // Hello, I'm Bob
```

### Factory vs Constructor

```javascript
// Constructor approach
class Counter {
  constructor(initial = 0) {
    this.count = initial; // Public - can be modified!
  }
  
  increment() {
    this.count++;
  }
}

const c1 = new Counter();
c1.count = 999; // ❌ Easy to break!

// Factory approach
function createCounter(initial = 0) {
  let count = initial; // Private - truly hidden
  
  return {
    increment() {
      count++;
    },
    
    getValue() {
      return count;
    }
  };
}

const c2 = createCounter();
c2.count = 999; // ❌ Doesn't do anything - count is private!
```

## Key Closure Examples

### Example 1: Private State

```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private!

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    
    withdraw(amount) {
      if (amount <= balance) {
        balance -= amount;
      }
      return balance;
    },
    
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(1000);

account.deposit(500);  // balance = 1500
account.withdraw(200); // balance = 1300

console.log(account.getBalance()); // 1300

// This won't work:
// account.balance = 9999; // ❌ Doesn't exist - it's private!
```

### Example 2: Multiple Independent Closures

```javascript
function createCounter(start) {
  let count = start;
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    get: () => count
  };
}

const counter1 = createCounter(0);
const counter2 = createCounter(100);
const counter3 = createCounter(-5);

counter1.increment(); // count1 = 1
counter2.decrement(); // count2 = 99
counter3.increment(); // count3 = -4

// Each counter has its OWN separate count variable
// They don't interfere with each other
```

### Example 3: Private Functions

```javascript
function createLogger() {
  const logs = [];
  
  // Private function - cannot be called from outside
  function formatTimestamp() {
    return new Date().toISOString();
  }
  
  return {
    log(message) {
      logs.push(`[${formatTimestamp()}] ${message}`);
    },
    
    getLogs() {
      return logs;
    }
  };
}

const logger = createLogger();
logger.log('User logged in');
logger.log('Page loaded');

console.log(logger.getLogs());

// This won't work:
// logger.formatTimestamp(); // ❌ formatTimestamp is private!
```

### Example 4: Stateful Function

```javascript
function createMultiplier(factor) {
  // factor is "closed over"
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const half = createMultiplier(0.5);

console.log(double(5));  // 10
console.log(triple(5));  // 15
console.log(half(10));   // 5

// Each function remembers its own factor
```

### Example 5: Complex State

```javascript
function createStore() {
  let state = {
    items: [],
    filters: {}
  };
  
  let history = [];
  
  function saveToHistory() {
    history.push(JSON.parse(JSON.stringify(state)));
  }

  return {
    addItem(item) {
      state.items.push(item);
      saveToHistory();
    },
    
    setFilter(key, value) {
      state.filters[key] = value;
      saveToHistory();
    },
    
    getState() {
      return state;
    },
    
    undo() {
      if (history.length > 0) {
        state = history.pop();
      }
    }
  };
}

const store = createStore();
store.addItem('apple');
store.setFilter('color', 'red');
console.log(store.getState());
// store.undo(); // Restore previous state
```

## Common Patterns

### The Module Pattern

```javascript
const counterModule = (() => {
  let count = 0; // Private to the module
  
  return {
    increment() {
      count++;
    },
    
    decrement() {
      count--;
    },
    
    get() {
      return count;
    }
  };
})();

// Use it
counterModule.increment();
console.log(counterModule.get()); // 1
```

### Factory with Configuration

```javascript
function createEvent(type, handlers) {
  return {
    emit(...args) {
      handlers.forEach(handler => handler(...args));
    },
    
    getType() {
      return type;
    }
  };
}

const clickEvent = createEvent('click', [
  () => console.log('Clicked!'),
  () => console.log('Handler 2')
]);

clickEvent.emit();
// Clicked!
// Handler 2
```

### Memoization with Closures

```javascript
function createMemoizer(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (key in cache) {
      console.log('From cache:', key);
      return cache[key];
    }
    
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const expensiveFn = (n) => {
  console.log('Computing...');
  return n * 2;
};

const memoized = createMemoizer(expensiveFn);
memoized(5); // Computing... 10
memoized(5); // From cache 10
memoized(3); // Computing... 6
```

## Debugging Closures

```javascript
function createDebugCounter(name) {
  let count = 0;
  
  return {
    increment() {
      count++;
      console.log(`[${name}] After increment: ${count}`);
    },
    
    getValue() {
      console.log(`[${name}] Getting value: ${count}`);
      return count;
    }
  };
}

const c1 = createDebugCounter('Counter 1');
const c2 = createDebugCounter('Counter 2');

c1.increment(); // [Counter 1] After increment: 1
c2.increment(); // [Counter 2] After increment: 1
c1.increment(); // [Counter 1] After increment: 2
```

## Tips

- Closures are automatic - you don't need to do anything special
- Variables in closures are truly private - impossible to access directly
- Each call to a factory creates a new closure with its own state
- Factories are great for hiding implementation details
- Remember: if it looks like a method but it's defined inside a function, it's likely using closures

## Common Mistakes

**Losing Track of State:**
```javascript
// ❌ BAD - Forgot that each instance has its own state
let globalCount = 0;
function increment() {
  globalCount++;
}

// ✅ GOOD - Each instance has independent state
function createCounter() {
  let count = 0;
  return {
    increment: () => count++
  };
}
```

**Exposing Private Variables:**
```javascript
// ❌ BAD - Count is public and can be changed
function createCounter() {
  return {
    count: 0, // Public - bad!
    increment() {
      this.count++;
    }
  };
}

// ✅ GOOD - Count is truly private
function createCounter() {
  let count = 0;
  return {
    increment() {
      count++;
    },
    getValue() {
      return count;
    }
  };
}
```

**Sharing State Accidentally:**
```javascript
// ❌ BAD - All counters share the same array
const createCounterArray = (() => {
  const shared = [];
  return () => {
    return {
      add: (x) => shared.push(x),
      getAll: () => shared
    };
  };
})();

// ✅ GOOD - Each counter has its own array
function createCounter() {
  const items = [];
  return {
    add: (x) => items.push(x),
    getAll: () => [...items]
  };
}
```

## Next Steps

Once you complete this exercise, move to [exercise 124](../124-factory-private) where you'll
dive deeper into private state management and explore more advanced factory patterns.
