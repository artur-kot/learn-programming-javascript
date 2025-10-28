# Exercise 127: Counter Factory - Advanced Features

Master advanced patterns with factory functions: getters, setters, history, and validation.

## Concepts

- **Getters and Setters** - JavaScript property accessors
- **Advanced Closures** - Complex state management
- **Callbacks** - Observer pattern for notifications
- **Validation** - Enforcing business rules
- **State History** - Undo/redo functionality
- **Computed Properties** - Derived values
- **Event Listeners** - Subscription pattern

## What You're Learning

This final exercise brings everything together. You'll implement advanced patterns that are
used in professional JavaScript libraries and frameworks. These patterns solve real-world problems
like undo/redo, validation, and reactive updates.

## Functions to Implement

### `createAdvancedCounter(name, initialValue, max, min)`
Factory with bounds, reset, getters, and setters.

**Features:**
- Enforce min/max bounds
- Get/set syntax for clean API
- Reset to initial value
- Format method for display

**Example:**
```javascript
export function createAdvancedCounter(name, initialValue = 0, max = null, min = null) {
  let count = initialValue;
  const initial = initialValue;

  return {
    getValue() {
      return count;
    },

    get value() {
      return count;
    },

    set value(newValue) {
      if (max !== null && newValue > max) count = max;
      else if (min !== null && newValue < min) count = min;
      else count = newValue;
    },

    set(newValue) {
      this.value = newValue;
    },

    increment() {
      this.value = count + 1;
    },

    decrement() {
      this.value = count - 1;
    },

    reset() {
      count = initial;
    },

    format() {
      return `${name}: ${count}${max ? `/${max}` : ''}`;
    }
  };
}
```

### `createObservableCounter(initialValue)`
Factory with observer pattern for change notifications.

**Features:**
- Call observers when value changes
- Pass old and new values to observers
- Support multiple observers
- Return unsubscribe function

**Example:**
```javascript
export function createObservableCounter(initialValue = 0) {
  let count = initialValue;
  const observers = [];

  function notifyObservers(oldValue, newValue) {
    observers.forEach(observer => observer(oldValue, newValue));
  }

  return {
    getValue() {
      return count;
    },

    increment() {
      const old = count;
      count++;
      notifyObservers(old, count);
    },

    decrement() {
      const old = count;
      count--;
      notifyObservers(old, count);
    },

    onChange(callback) {
      observers.push(callback);
      
      return () => {
        const index = observers.indexOf(callback);
        if (index > -1) observers.splice(index, 1);
      };
    }
  };
}
```

### `createHistoryCounter(initialValue)`
Factory with undo/redo using history stacks.

**Features:**
- Track all changes
- Undo previous operations
- Redo after undo
- Check undo/redo availability
- Get history

**Example:**
```javascript
export function createHistoryCounter(initialValue = 0) {
  let count = initialValue;
  const undoStack = [];
  const redoStack = [];

  return {
    getValue() {
      return count;
    },

    increment() {
      undoStack.push(count);
      count++;
      redoStack.length = 0; // Clear redo on new operation
    },

    decrement() {
      undoStack.push(count);
      count--;
      redoStack.length = 0;
    },

    undo() {
      if (undoStack.length === 0) return;
      redoStack.push(count);
      count = undoStack.pop();
    },

    redo() {
      if (redoStack.length === 0) return;
      undoStack.push(count);
      count = redoStack.pop();
    },

    canUndo() {
      return undoStack.length > 0;
    },

    canRedo() {
      return redoStack.length > 0;
    },

    getHistory() {
      return [...undoStack];
    }
  };
}
```

### `createValidatedCounter(initialValue, validator)`
Factory with custom validation rules.

**Features:**
- Accept custom validator function
- Default: prevent negative numbers
- Validate before changing value
- Reject invalid operations

**Example:**
```javascript
export function createValidatedCounter(initialValue = 0, validator = null) {
  let count = initialValue;
  const validate = validator || ((value) => value >= 0);

  return {
    getValue() {
      return count;
    },

    increment() {
      if (validate(count + 1)) {
        count++;
      }
    },

    decrement() {
      if (validate(count - 1)) {
        count--;
      }
    },

    setValue(newValue) {
      if (validate(newValue)) {
        count = newValue;
      }
    }
  };
}
```

## Advanced Patterns

### Pattern 1: Getter and Setter

```javascript
const counter = (() => {
  let count = 0;

  return {
    // Getter - read with dot notation
    get value() {
      return count;
    },

    // Setter - write with dot notation
    set value(newValue) {
      count = newValue;
    }
  };
})();

console.log(counter.value); // 0
counter.value = 5;
console.log(counter.value); // 5
```

### Pattern 2: Observer/Publish-Subscribe

```javascript
const eventBus = (() => {
  const listeners = {};

  return {
    on(event, callback) {
      if (!listeners[event]) {
        listeners[event] = [];
      }
      listeners[event].push(callback);

      // Return unsubscribe function
      return () => {
        listeners[event] = listeners[event].filter(cb => cb !== callback);
      };
    },

    emit(event, data) {
      if (listeners[event]) {
        listeners[event].forEach(callback => callback(data));
      }
    }
  };
})();

const unsubscribe = eventBus.on('userLogin', (user) => {
  console.log(`${user} logged in`);
});

eventBus.emit('userLogin', 'Alice'); // Logs: Alice logged in
unsubscribe(); // Stop listening
```

### Pattern 3: Undo/Redo with Stacks

```javascript
const editor = (() => {
  let content = '';
  const undoStack = [];
  const redoStack = [];

  return {
    write(text) {
      undoStack.push(content);
      content += text;
      redoStack.length = 0; // Clear redo
    },

    undo() {
      if (undoStack.length > 0) {
        redoStack.push(content);
        content = undoStack.pop();
      }
    },

    redo() {
      if (redoStack.length > 0) {
        undoStack.push(content);
        content = redoStack.pop();
      }
    },

    getContent() {
      return content;
    }
  };
})();
```

## Real-World Examples

### Example 1: Form Validation

```javascript
const createFormField = (name, validator) => {
  let value = '';

  return {
    setValue(newValue) {
      if (validator(newValue)) {
        value = newValue;
        return true;
      }
      return false;
    },

    getValue() {
      return value;
    },

    isValid() {
      return validator(value);
    }
  };
};

const emailField = createFormField('email', (val) => {
  return val.includes('@');
});

emailField.setValue('user@example.com'); // ✅ Valid
emailField.setValue('invalid-email');    // ❌ Invalid
```

### Example 2: State Management

```javascript
const store = (() => {
  let state = { count: 0, items: [] };
  const subscribers = [];

  function notify() {
    subscribers.forEach(cb => cb(state));
  }

  return {
    getState() {
      return state;
    },

    setState(newState) {
      state = { ...state, ...newState };
      notify();
    },

    subscribe(callback) {
      subscribers.push(callback);
      return () => {
        subscribers.splice(subscribers.indexOf(callback), 1);
      };
    }
  };
})();

store.subscribe((state) => {
  console.log('State changed:', state);
});

store.setState({ count: 1 });
```

### Example 3: Analytics Tracker

```javascript
const analytics = (() => {
  const events = {};
  const middleware = [];

  return {
    track(eventName, data) {
      middleware.forEach(fn => fn(eventName, data));

      if (!events[eventName]) events[eventName] = [];
      events[eventName].push({ data, timestamp: Date.now() });
    },

    getEvents(eventName) {
      return events[eventName] || [];
    },

    use(fn) {
      middleware.push(fn);
    }
  };
})();

// Add middleware
analytics.use((eventName, data) => {
  console.log(`Event: ${eventName}`, data);
});

// Track events
analytics.track('page_view', { page: '/' });
analytics.track('button_click', { button: 'submit' });
```

## Combining Patterns

```javascript
const advancedStore = (() => {
  let state = {};
  const history = [];
  const listeners = [];
  let currentStep = -1;

  function save() {
    currentStep++;
    if (currentStep < history.length) {
      history.length = currentStep;
    }
    history.push(JSON.parse(JSON.stringify(state)));
  }

  function notify() {
    listeners.forEach(cb => cb(state));
  }

  return {
    setState(newState) {
      state = { ...state, ...newState };
      save();
      notify();
    },

    undo() {
      if (currentStep > 0) {
        currentStep--;
        state = JSON.parse(JSON.stringify(history[currentStep]));
        notify();
      }
    },

    redo() {
      if (currentStep < history.length - 1) {
        currentStep++;
        state = JSON.parse(JSON.stringify(history[currentStep]));
        notify();
      }
    },

    subscribe(callback) {
      listeners.push(callback);
      return () => {
        listeners.splice(listeners.indexOf(callback), 1);
      };
    }
  };
})();
```

## Next Steps

You've now completed Series 25 - Counter Factory and mastered closures and factory functions!

These are the most important concepts in JavaScript:
- Closures enable state management
- Factories create flexible objects
- Patterns (observer, undo/redo, etc.) solve real problems

**What to explore next:**
- Classes (which use closures under the hood)
- Async/await for advanced patterns
- Design patterns (Singleton, Strategy, etc.)
- Building a small library or framework
- Contributing to open-source projects

**Practice Projects:**
- Build a todo app with undo/redo
- Create a state management system
- Build a simple reactive framework
- Make a game with object factories

You have all the skills needed to build professional-grade JavaScript applications!
