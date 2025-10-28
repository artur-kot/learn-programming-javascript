# Exercise 124: Counter Factory - Private Variables

Explore how closures create truly private variables and methods in factory functions.

## Concepts

- **Private Variables** - Data completely hidden from outside access
- **Encapsulation** - Hiding implementation details behind a public interface
- **Public Interface** - The methods users are allowed to call
- **Closure Scope** - Variables accessible to inner functions
- **Data Protection** - Preventing unauthorized modification
- **Private Methods** - Functions only used internally
- **Information Hiding** - Revealing only what's necessary

## What You're Learning

Private variables are one of the biggest advantages of using factory functions with closures.
They allow you to create objects with data that cannot be accessed or modified directly from outside.
This is the foundation of encapsulation - a core principle of good software design.

## Functions to Implement

### `createUser(username, email)`
Factory that creates a user object with private email.

**Parameters:**
- `username` - User's username (public)
- `email` - User's email (private)

**Returns:**
- User object with public methods

**Public Methods:**
- `getUsername()` - Returns the username
- `getEmail()` - Returns the email (private)
- `updateEmail(newEmail)` - Changes the email

**Implementation:**
```javascript
export function createUser(username, email) {
  // email is private - locked in closure
  
  return {
    username,
    
    getUsername() {
      return username;
    },
    
    getEmail() {
      return email;
    },
    
    updateEmail(newEmail) {
      email = newEmail;
    }
  };
}
```

### `createBankAccount(owner, initialBalance)`
Factory that creates a bank account with private balance and transaction history.

**Parameters:**
- `owner` - Account owner name
- `initialBalance` - Starting balance

**Returns:**
- Account object with public methods

**Public Methods:**
- `getBalance()` - Returns current balance
- `deposit(amount)` - Adds money
- `withdraw(amount)` - Removes money (if sufficient funds)
- `getTransactionHistory()` - Returns copy of transaction history

**Implementation:**
```javascript
export function createBankAccount(owner, initialBalance) {
  let balance = initialBalance;
  const transactions = [];

  function recordTransaction(type, amount) {
    transactions.push({ type, amount, balance });
  }

  return {
    getBalance() {
      return balance;
    },

    deposit(amount) {
      balance += amount;
      recordTransaction('Deposit', amount);
    },

    withdraw(amount) {
      if (amount <= balance) {
        balance -= amount;
        recordTransaction('Withdrawal', amount);
      }
    },

    getTransactionHistory() {
      return [...transactions]; // Return copy!
    }
  };
}
```

### `createSecureNote(content, password)`
Factory that creates a password-protected note using closures.

**Parameters:**
- `content` - Secret message
- `password` - Access password

**Returns:**
- Note object with password-protected access

**Public Methods:**
- `read(password)` - Returns content if password matches, null otherwise
- `update(newContent, password)` - Updates content if password matches

**Implementation:**
```javascript
export function createSecureNote(content, password) {
  return {
    read(attemptedPassword) {
      if (attemptedPassword === password) {
        return content;
      }
      return null;
    },

    update(newContent, attemptedPassword) {
      if (attemptedPassword === password) {
        content = newContent;
      }
    }
  };
}
```

### `createPasswordManager()`
Factory for securely storing and verifying passwords.

**Returns:**
- Manager object with public methods

**Public Methods:**
- `store(service, password)` - Stores password for a service
- `verify(service, password)` - Returns true if password matches
- `update(service, oldPassword, newPassword)` - Changes password if old one matches

**Private Elements:**
- Private passwords storage object
- Private hash function

**Implementation:**
```javascript
export function createPasswordManager() {
  const passwords = {};

  function hashPassword(password) {
    return password
      .split('')
      .reduce((hash, char) => hash + char.charCodeAt(0), 0)
      .toString(16);
  }

  return {
    store(service, password) {
      passwords[service] = hashPassword(password);
    },

    verify(service, password) {
      if (!(service in passwords)) return false;
      return passwords[service] === hashPassword(password);
    },

    update(service, oldPassword, newPassword) {
      if (this.verify(service, oldPassword)) {
        this.store(service, newPassword);
      }
    }
  };
}
```

## Understanding Private Variables

### The Core Concept

Private variables in JavaScript are created using closures. A variable declared with `let` or `const`
inside a function is automatically private to that function.

```javascript
function createBank() {
  const vault = {}; // Private - only accessible inside this function

  return {
    deposit(amount) {
      vault.money = (vault.money || 0) + amount;
    },

    getBalance() {
      return vault.money;
    }
  };
}

const bank = createBank();
bank.deposit(100);

console.log(bank.vault);        // ❌ undefined - vault is private!
console.log(bank.getBalance()); // ✅ 100
```

### Private vs Public Data

```javascript
// ❌ Public data is vulnerable
function createUser(name, password) {
  return {
    name: name,
    password: password // ❌ PUBLIC - Anyone can read this!
  };
}

const user = createUser('alice', 'secret123');
console.log(user.password); // ❌ 'secret123' - Anyone can steal it!

// ✅ Private data is protected
function createUser(name, password) {
  return {
    name: name,
    
    // Only check password, never expose it
    checkPassword(attempt) {
      return attempt === password;
    }
  };
}

const user = createUser('alice', 'secret123');
console.log(user.password); // ✅ undefined - Password is safe!
console.log(user.checkPassword('secret123')); // ✅ true
```

## Real-World Examples

### Example 1: Secure Configuration

```javascript
function createDatabaseConnection(host, port, password) {
  // All connection details are private
  
  return {
    // Only expose safe operations
    connect() {
      return `Connecting to ${host}:${port}...`;
    },

    query(sql) {
      return `Executing: ${sql}`;
    }

    // User cannot access host, port, or password directly!
  };
}

const db = createDatabaseConnection('localhost', 5432, 'supersecret');
console.log(db.host);     // ❌ undefined
console.log(db.password); // ❌ undefined
console.log(db.query('SELECT * FROM users')); // ✅ Works
```

### Example 2: Shopping Cart

```javascript
function createCart() {
  const items = [];
  let total = 0;

  function calculateTotal() {
    total = items.reduce((sum, item) => sum + item.price, 0);
  }

  return {
    addItem(item) {
      items.push(item);
      calculateTotal();
    },

    removeItem(index) {
      items.splice(index, 1);
      calculateTotal();
    },

    getTotal() {
      return total;
    },

    getItems() {
      return [...items]; // Return copy to prevent external modification
    }
  };
}

const cart = createCart();
cart.addItem({ name: 'Book', price: 15 });
cart.addItem({ name: 'Pen', price: 2 });

console.log(cart.getTotal());      // 17
const items = cart.getItems();
items.push({ name: 'Free item' }); // Modify the copy
console.log(cart.getTotal());      // Still 17 - original unaffected!
```

### Example 3: Event Emitter

```javascript
function createEventEmitter() {
  const listeners = {};

  return {
    on(event, callback) {
      if (!listeners[event]) {
        listeners[event] = [];
      }
      listeners[event].push(callback);
    },

    emit(event, data) {
      if (event in listeners) {
        listeners[event].forEach(callback => callback(data));
      }
    },

    off(event, callback) {
      if (event in listeners) {
        listeners[event] = listeners[event].filter(cb => cb !== callback);
      }
    }
  };
}

const emitter = createEventEmitter();

emitter.on('login', (user) => console.log(`${user} logged in`));
emitter.emit('login', 'Alice'); // Alice logged in

// Users cannot access listeners directly
console.log(emitter.listeners); // ❌ undefined
```

## Key Patterns

### Pattern 1: Validation

```javascript
function createUser(email) {
  return {
    setEmail(newEmail) {
      // Validation happens here!
      if (!newEmail.includes('@')) {
        throw new Error('Invalid email');
      }
      email = newEmail;
    },

    getEmail() {
      return email;
    }
  };
}

const user = createUser('alice@example.com');
user.setEmail('invalid'); // ❌ Error!
```

### Pattern 2: Lazy Loading

```javascript
function createExpensiveResource() {
  let resource = null;
  let loaded = false;

  return {
    get() {
      if (!loaded) {
        // Load it only when needed
        resource = expensiveLoad();
        loaded = true;
      }
      return resource;
    }
  };
}
```

### Pattern 3: Caching

```javascript
function createMemoizer(fn) {
  const cache = {};

  return function(...args) {
    const key = JSON.stringify(args);
    
    if (key in cache) {
      return cache[key];
    }

    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const fibonacci = createMemoizer((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});
```

## Common Mistakes

**Exposing Private Data by Reference:**
```javascript
// ❌ BAD - Returns reference to private array
function createList() {
  const items = [];
  return {
    getItems() {
      return items; // ❌ Direct reference!
    }
  };
}

const list = createList();
list.getItems().push('hacked!');

// ✅ GOOD - Returns copy
function createList() {
  const items = [];
  return {
    getItems() {
      return [...items]; // ✅ Copy
    }
  };
}
```

**Mixing Public and Private Inconsistently:**
```javascript
// ❌ CONFUSING - username is public, email is private
function createUser(username, email) {
  return {
    username: username, // Public
    getEmail() {
      return email; // Private
    }
  };
}

// ✅ CONSISTENT - All data is private, accessed through methods
function createUser(username, email) {
  return {
    getUsername() {
      return username;
    },
    getEmail() {
      return email;
    }
  };
}
```

## Testing Private Data

Testing private variables is actually easier than you might think:

```javascript
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

// You can't directly test count, but you can test the behavior
const counter = createCounter();
counter.increment();
counter.increment();

expect(counter.getValue()).toBe(2); // ✅ Tests private data indirectly
```

## Next Steps

Once you complete this exercise, move to [exercise 125](../125-factory-multiple) where you'll
create multiple independent counter instances and explore how each maintains its own private state.
