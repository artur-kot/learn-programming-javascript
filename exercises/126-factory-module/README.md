# Exercise 126: Counter Factory - Module Pattern

Organize factory functions using the revealing module pattern.

## Concepts

- **Module Pattern** - Encapsulation with IIFE
- **Revealing Module** - Revealing only public methods
- **Organization** - Grouping related functionality
- **Public Interface** - What users can access
- **Private Utilities** - Hidden helper functions
- **IIFE** - Immediately Invoked Function Expression
- **Namespace** - Creating organized public API

## What You're Learning

The module pattern is a classic way to organize code in JavaScript. It uses closures to create
private variables and functions, then "reveals" a public interface. This is the foundation for
how many JavaScript libraries and frameworks are organized.

## Functions to Implement

### `Counter` Module

A module that provides counter creation functionality.

**Public Methods:**
- `create(name, initialValue)` - Create a single counter
- `createMultiple(count, initialValue)` - Create N counters

**Example:**
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

  // Public interface
  return {
    create(name = 'Counter', initialValue = 0) {
      return createCounterObject(name, initialValue);
    },

    createMultiple(count, initialValue = 0) {
      return Array.from(
        { length: count },
        (_, i) => createCounterObject(`Counter ${i}`, initialValue)
      );
    }
  };
})();
```

### `CounterApp` Module

A module that manages multiple counters with registry pattern.

**Public Methods:**
- `addCounter(name, initialValue)` - Add counter to app
- `getCounter(name)` - Retrieve counter by name
- `removeCounter(name)` - Remove counter
- `getAllCounters()` - Get all counters
- `getStats()` - Get statistics

### `StatsTracker` Module

A module for tracking and analyzing events.

**Public Methods:**
- `track(eventName)` - Record an event
- `getCount(eventName)` - Get count for event
- `getAll()` - Get all tracked events
- `reset(eventName)` - Reset counter
- `getHighest()` - Get most tracked event

## Understanding the Module Pattern

### Basic Structure

```javascript
const MyModule = (() => {
  // PRIVATE SCOPE
  let private1 = 'secret';
  const private2 = [];

  function privateFunction() {
    return private1;
  }

  // PUBLIC INTERFACE
  return {
    publicMethod() {
      return privateFunction();
    },

    anotherMethod() {
      return private2;
    }
  };
})();
```

### How It Works

```
1. Define a function with ()=>{ }
2. Wrap it in parentheses: (() => { })
3. Immediately invoke it with (): (() => { })()
4. Return an object with public methods
5. Methods have access to private variables through closures
```

### Why Use It?

```javascript
// ❌ Without module - everything is public
let count = 0;
let data = [];

function increment() {
  count++;
}

// Anyone can do:
count = 999;           // ❌ Easy to break!
data = [];             // ❌ Easy to clear!

// ✅ With module - private variables
const Counter = (() => {
  let count = 0;
  const data = [];

  return {
    increment() {
      count++;
    },

    getData() {
      return [...data];
    }
  };
})();

// Now count and data are safe!
Counter.count = 999;   // ❌ Doesn't work - it's undefined
```

## Detailed Examples

### Example 1: Simple Calculator Module

```javascript
const Calculator = (() => {
  let history = [];

  function record(operation, result) {
    history.push({ operation, result, time: new Date() });
  }

  return {
    add(a, b) {
      const result = a + b;
      record('add', result);
      return result;
    },

    subtract(a, b) {
      const result = a - b;
      record('subtract', result);
      return result;
    },

    getHistory() {
      return [...history];
    },

    clearHistory() {
      history = [];
    }
  };
})();

// Usage
Calculator.add(5, 3);      // history recorded
Calculator.subtract(10, 2); // history recorded
console.log(Calculator.getHistory());

// Users cannot access history directly
// console.log(Calculator.history); // ❌ undefined
```

### Example 2: User Manager Module

```javascript
const UserManager = (() => {
  const users = {};
  let nextId = 1;

  function validateEmail(email) {
    return email.includes('@');
  }

  return {
    addUser(name, email) {
      if (!validateEmail(email)) {
        throw new Error('Invalid email');
      }

      const user = {
        id: nextId++,
        name,
        email,
        created: new Date()
      };

      users[user.id] = user;
      return user;
    },

    getUser(id) {
      return users[id] || null;
    },

    getAllUsers() {
      return Object.values(users);
    },

    deleteUser(id) {
      delete users[id];
    }
  };
})();
```

### Example 3: Event System Module

```javascript
const EventSystem = (() => {
  const listeners = {};

  return {
    on(event, handler) {
      if (!listeners[event]) {
        listeners[event] = [];
      }
      listeners[event].push(handler);
    },

    emit(event, data) {
      if (event in listeners) {
        listeners[event].forEach(handler => handler(data));
      }
    },

    off(event, handler) {
      if (event in listeners) {
        listeners[event] = listeners[event].filter(h => h !== handler);
      }
    }
  };
})();

// Usage
EventSystem.on('userLogin', (user) => {
  console.log(`${user} logged in`);
});

EventSystem.emit('userLogin', 'Alice');
```

## Module Pattern Variations

### Variation 1: Module with Dependencies

```javascript
const ModuleWithDeps = ((Utils, Helpers) => {
  return {
    doSomething() {
      return Utils.format(Helpers.compute());
    }
  };
})(UtilityModule, HelpersModule);
```

### Variation 2: Sub-modules

```javascript
const App = (() => {
  const Database = (() => {
    const data = {};
    return {
      save(key, value) { data[key] = value; },
      load(key) { return data[key]; }
    };
  })();

  const UI = (() => {
    return {
      show(message) { console.log(message); }
    };
  })();

  return {
    Database,
    UI
  };
})();

// Usage
App.Database.save('name', 'Alice');
App.UI.show('Saved!');
```

### Variation 3: Extending Modules

```javascript
const BaseModule = (() => {
  return {
    doBase() { return 'base'; }
  };
})();

const ExtendedModule = ((Base) => {
  return {
    ...Base,
    doExtra() { return 'extra'; }
  };
})(BaseModule);
```

## Key Patterns

### Pattern: Configuration

```javascript
const ConfigModule = (() => {
  const config = {
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    debug: false
  };

  return {
    get(key) {
      return config[key];
    },

    set(key, value) {
      config[key] = value;
    },

    getAll() {
      return { ...config };
    }
  };
})();
```

### Pattern: Singleton

```javascript
const Singleton = (() => {
  let instance = null;

  function createInstance() {
    return {
      id: Math.random(),
      created: new Date()
    };
  }

  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

// Always returns same instance
const a = Singleton.getInstance();
const b = Singleton.getInstance();
console.log(a === b); // ✅ true
```

### Pattern: Factory

```javascript
const FactoryModule = (() => {
  const instances = [];

  function create(type, config) {
    const instance = { type, config, id: Math.random() };
    instances.push(instance);
    return instance;
  }

  return {
    create,
    getAll() {
      return [...instances];
    },
    getById(id) {
      return instances.find(i => i.id === id);
    }
  };
})();
```

## Organizing Your Modules

```
// File: modules/counter.js
export const Counter = (() => {
  // ...
})();

// File: modules/app.js
export const CounterApp = (() => {
  // ...
})();

// File: index.js
import { Counter } from './modules/counter.js';
import { CounterApp } from './modules/app.js';

// Now you have clean, organized code
```

## Best Practices

1. **One module per file** - Makes code easier to find
2. **Clear naming** - Module names should describe what they do
3. **Consistent API** - Methods should follow similar patterns
4. **Document parameters** - Make it clear what methods expect
5. **Don't expose internals** - Only reveal what's necessary
6. **Use private helpers** - Extract complex logic to private functions

## Next Steps

Once you complete this exercise, move to [exercise 127](../127-factory-advanced) where you'll
add advanced features like getters, setters, and other JavaScript patterns.
