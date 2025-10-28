# Exercise 125: Counter Factory - Multiple Counters

Learn how each factory call creates independent closures with separate state.

## Concepts

- **Multiple Instances** - Creating many objects with the same factory
- **Independent Closures** - Each instance has its own closure scope
- **State Isolation** - Variables don't leak between instances
- **Counter Registry** - Managing multiple counters centrally
- **Factory Scaling** - Creating many instances efficiently
- **Closure Independence** - Proving each closure is separate
- **Instance Management** - Organizing multiple objects

## What You're Learning

The real power of closures becomes apparent when you create multiple instances from the same
factory function. Each instance gets its own private variables that never interfere with each other.

## Functions to Implement

### `createCounter(name = 'Counter', initialValue = 0)`
Factory that creates a named counter with independent state.

**Returns:**
- Counter object with methods

**Public Methods:**
- `getName()` - Returns counter name
- `getValue()` - Returns current count
- `increment()` - Adds 1
- `decrement()` - Subtracts 1

### `createCounterRegistry()`
Factory that manages multiple named counters.

**Returns:**
- Registry object with management methods

**Public Methods:**
- `register(name, initialValue)` - Create new counter
- `get(name)` - Get counter object
- `increment(name)` - Increment by name
- `decrement(name)` - Decrement by name
- `getValue(name)` - Get value by name
- `listCounters()` - Array of all counter names
- `reset(name)` - Reset counter to 0

### `createCounterGroup(groupName)`
Factory that groups related counters and provides statistics.

**Returns:**
- Group object with methods

**Public Methods:**
- `addCounter(name, initialValue)` - Add counter to group
- `getCounter(name)` - Get counter object
- `increment(name)` - Increment counter
- `decrement(name)` - Decrement counter
- `getTotal()` - Sum of all counters
- `getSummary()` - Object with all values

### `createScaledCounters(count, initialValue = 0)`
Factory that creates N independent counters as an array.

**Parameters:**
- `count` - Number of counters to create
- `initialValue` - Starting value for each

**Returns:**
- Array of counter objects

## Understanding Multiple Closures

### Each Factory Call Creates a New Closure

```javascript
function createCounter(name, initialValue = 0) {
  let count = initialValue;

  return {
    getValue() {
      return count;
    },
    
    increment() {
      count++;
    }
  };
}

// Three separate factory calls
const c1 = createCounter('Counter 1', 0);
const c2 = createCounter('Counter 2', 0);
const c3 = createCounter('Counter 3', 0);

// Three separate closures with THREE separate count variables
//
// Memory Layout:
// ┌──────────────────────┐
// │ c1's closure         │
// │ count: 0            │
// └──────────────────────┘
//
// ┌──────────────────────┐
// │ c2's closure         │
// │ count: 0            │
// └──────────────────────┘
//
// ┌──────────────────────┐
// │ c3's closure         │
// │ count: 0            │
// └──────────────────────┘

c1.increment();
c1.increment();
c2.increment();

console.log(c1.getValue()); // 2 - c1's count
console.log(c2.getValue()); // 1 - c2's count (different!)
console.log(c3.getValue()); // 0 - c3's count (untouched)
```

### Proof of Independence

```javascript
const counters = [];

// Create 5 counters
for (let i = 0; i < 5; i++) {
  counters.push(createCounter(`Counter ${i}`, 0));
}

// Modify them independently
counters[0].increment();
counters[2].increment();
counters[2].increment();
counters[4].increment();

console.log(counters[0].getValue()); // 1
console.log(counters[1].getValue()); // 0 (never modified)
console.log(counters[2].getValue()); // 2
console.log(counters[3].getValue()); // 0 (never modified)
console.log(counters[4].getValue()); // 1

// Impossible if they shared state!
```

## Real-World Patterns

### Pattern 1: Counter Registry

```javascript
function createCounterRegistry() {
  const counters = {};

  return {
    register(name, initialValue = 0) {
      counters[name] = createCounter(name, initialValue);
    },

    increment(name) {
      if (name in counters) {
        counters[name].increment();
      }
    },

    getValue(name) {
      return counters[name]?.getValue() || null;
    },

    listCounters() {
      return Object.keys(counters);
    },

    getTotal() {
      return Object.values(counters)
        .reduce((sum, counter) => sum + counter.getValue(), 0);
    }
  };
}

const metrics = createCounterRegistry();

metrics.register('pageViews', 0);
metrics.register('userLogins', 0);
metrics.register('apiCalls', 0);

metrics.increment('pageViews');
metrics.increment('pageViews');
metrics.increment('userLogins');

console.log(metrics.getValue('pageViews'));  // 2
console.log(metrics.getValue('userLogins')); // 1
console.log(metrics.getTotal());             // 3
```

### Pattern 2: Counter Group

```javascript
function createCounterGroup(groupName) {
  const counters = {};

  return {
    addCounter(name, initialValue = 0) {
      counters[name] = createCounter(name, initialValue);
    },

    getTotal() {
      return Object.values(counters)
        .reduce((sum, c) => sum + c.getValue(), 0);
    },

    getSummary() {
      const summary = {};
      Object.keys(counters).forEach(name => {
        summary[name] = counters[name].getValue();
      });
      return summary;
    },

    incrementAll() {
      Object.values(counters).forEach(c => c.increment());
    }
  };
}

const stats = createCounterGroup('Performance');

stats.addCounter('requests', 100);
stats.addCounter('errors', 5);
stats.addCounter('slowRequests', 2);

console.log(stats.getTotal());    // 107
console.log(stats.getSummary()); 
// { requests: 100, errors: 5, slowRequests: 2 }
```

### Pattern 3: Scaled Counters

```javascript
function createScaledCounters(count, initialValue = 0) {
  const counters = [];
  
  for (let i = 0; i < count; i++) {
    counters.push(createCounter(`Counter ${i}`, initialValue));
  }
  
  return counters;
}

// Create 10 independent counters
const counters = createScaledCounters(10, 0);

// Use array operations
counters.forEach((counter, index) => {
  counter.increment();
});

// Each has its own state
counters[0].increment();
console.log(counters[0].getValue()); // 2
console.log(counters[1].getValue()); // 1
```

## Real-World Examples

### Example 1: User Profiles

```javascript
const users = {
  alice: createCounterGroup('Alice Stats'),
  bob: createCounterGroup('Bob Stats'),
  charlie: createCounterGroup('Charlie Stats')
};

users.alice.addCounter('followers', 0);
users.alice.addCounter('posts', 0);

users.bob.addCounter('followers', 0);
users.bob.addCounter('posts', 0);

// Each user has independent stats
users.alice.incrementAll(); // Alice's all go up by 1
// Bob's stats are unaffected
```

### Example 2: Game Characters

```javascript
const characters = createScaledCounters(4, 100); // 4 players, health 100

function damageCharacter(index, amount) {
  characters[index].getValue() >= amount 
    ? characters[index].decrement() 
    : null;
}

// Each character has independent health
damageCharacter(0, 10); // Damages player 1
// Players 2, 3, 4 unaffected
```

### Example 3: Analytics Dashboard

```javascript
const analytics = createCounterRegistry();

analytics.register('dailyVisitors', 0);
analytics.register('weeklyVisitors', 0);
analytics.register('monthlyVisitors', 0);

// Track independently
analytics.increment('dailyVisitors');
// weeklyVisitors and monthlyVisitors unchanged

console.log(analytics.listCounters());
// ['dailyVisitors', 'weeklyVisitors', 'monthlyVisitors']
```

## Key Takeaways

1. **Each factory call creates a new closure** with its own variables
2. **Closures don't share state** - perfectly isolated
3. **Multiple instances are independent** - modifications don't affect others
4. **Use registries to manage many instances** - makes it easier to query/update
5. **Perfect for real-world scenarios** - users, products, counters, etc.

## Common Patterns

```javascript
// Pattern: Create many, manage centrally
const registry = createCounterRegistry();

for (let i = 0; i < 100; i++) {
  registry.register(`item${i}`, 0);
}

// Query all at once
console.log(registry.listCounters().length); // 100

// Update in bulk
registry.listCounters().forEach(name => {
  registry.increment(name);
});
```

## Next Steps

Once you complete this exercise, move to [exercise 126](../126-factory-module) where you'll
organize factories using the revealing module pattern.
