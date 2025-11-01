# Exercise 166: Iterator - Custom Collections

Create custom iterable collection classes by implementing Symbol.iterator to make them work with `for...of` loops and the spread operator.

## 📚 Concepts

### Custom Iterable Classes

Any class can become iterable by implementing `Symbol.iterator`:

```javascript
class MyCollection {
  constructor() {
    this.items = [];
  }

  add(item) {
    this.items.push(item);
    return this; // for chaining
  }

  [Symbol.iterator]() {
    // Make it iterable!
    return this.items[Symbol.iterator]();
  }
}

const col = new MyCollection();
col.add(1).add(2).add(3);

for (const item of col) {
  console.log(item); // 1, 2, 3
}
```

### Linked Lists

A linked list is a collection where each element (node) points to the next:

```javascript
class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

// Chain: 1 -> 2 -> 3 -> null
const node3 = new Node(3);
const node2 = new Node(2, node3);
const node1 = new Node(1, node2);
```

**Advantages:**
- Efficient insertion/deletion at known position
- Dynamic size
- No pre-allocation needed

**Disadvantages:**
- No random access (must traverse from start)
- Extra memory for pointers
- Slower than arrays for iteration

### Queues (FIFO)

First-In-First-Out: Items added to back, removed from front.

```javascript
const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.dequeue(); // 1 (first in, first out)
```

**Use cases:**
- Task scheduling
- Print job queues
- Breadth-first search
- Message processing

### Stacks (LIFO)

Last-In-First-Out: Items added and removed from the same end (top).

```javascript
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.pop(); // 2 (last in, first out)
```

**Use cases:**
- Undo/redo functionality
- Function call stack
- Expression parsing
- Depth-first search

### Iteration Behavior

**For LinkedList:**
```javascript
const list = new LinkedList();
list.add(1).add(2).add(3);
[...list]; // [1, 2, 3] - front to back
```

**For Queue:**
```javascript
const queue = new Queue();
queue.enqueue(1).enqueue(2).enqueue(3);
[...queue]; // [1, 2, 3] - front to back, doesn't consume
```

**For Stack:**
```javascript
const stack = new Stack();
stack.push(1).push(2).push(3);
[...stack]; // [3, 2, 1] - top to bottom
```

## 🎯 Functions to Implement

### LinkedListNode Class

Represents single node in a linked list.

```javascript
const node = new LinkedListNode(5);
node.value; // 5
node.next;  // null

const next = new LinkedListNode(10);
node.next = next;
```

**Constructor:**
- Parameter: `value` (any type)
- Parameter: `next = null` (reference to next node)
- Properties: `value`, `next`

### LinkedList Class

Singly-linked list collection.

```javascript
const list = new LinkedList();
list.add(1).add(2).add(3);
[...list]; // [1, 2, 3]

for (const val of list) {
  console.log(val); // 1, 2, 3
}
```

**Methods:**
- `add(value)`: Add to end, return `this`
- `[Symbol.iterator]()`: Make iterable

**Key Points:**
- Maintains `head` (first node)
- Each node links to next
- Iteration starts from head

### Queue Class

FIFO collection (First In, First Out).

```javascript
const queue = new Queue();
queue.enqueue('a').enqueue('b').enqueue('c');
queue.dequeue(); // 'a'
queue.dequeue(); // 'b'

// Iteration doesn't consume
[...queue]; // ['c']
```

**Methods:**
- `enqueue(value)`: Add to back, return `this`
- `dequeue()`: Remove and return from front
- `[Symbol.iterator]()`: Iterate front to back

**Key Points:**
- Items removed in order added
- Like line at checkout
- Iteration doesn't modify queue

### Stack Class

LIFO collection (Last In, First Out).

```javascript
const stack = new Stack();
stack.push(1).push(2).push(3);
stack.pop(); // 3
stack.pop(); // 2

// Iteration is top to bottom
[...stack]; // [1]
```

**Methods:**
- `push(value)`: Add to top, return `this`
- `pop()`: Remove and return from top
- `[Symbol.iterator]()`: Iterate top to bottom

**Key Points:**
- Items removed in reverse order added
- Like stack of plates
- Iteration goes from top down

## 📖 Common Patterns

### Implementing Symbol.iterator for Class

```javascript
class MyList {
  constructor() {
    this.items = [];
  }

  add(item) {
    this.items.push(item);
    return this;
  }

  [Symbol.iterator]() {
    let index = 0;
    const items = this.items;
    
    return {
      next: () => {
        if (index < items.length) {
          return { value: items[index++], done: false };
        }
        return { done: true };
      }
    };
  }
}
```

### Method Chaining Pattern

```javascript
class Collection {
  add(item) {
    // ... add logic ...
    return this; // return this for chaining!
  }
  
  remove(item) {
    // ... remove logic ...
    return this;
  }
}

// Use: collection.add(1).add(2).remove(1).add(3)
```

### Linked List Traversal

```javascript
class LinkedList {
  add(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    return this;
  }
}
```

### Iterator That Doesn't Consume

When implementing `[Symbol.iterator]`, create fresh iterator each time so iteration doesn't modify the collection:

```javascript
[Symbol.iterator]() {
  // Create NEW iterator each call
  let current = this.head;
  return {
    next: () => {
      if (current) {
        const value = current.value;
        current = current.next;
        return { value, done: false };
      }
      return { done: true };
    }
  };
}
```

## 🚀 Real-World Applications

### 1. Task Queue

```javascript
class TaskQueue extends Queue {
  processAll() {
    while (true) {
      const task = this.dequeue();
      if (!task) break;
      task.execute();
    }
  }
}

const queue = new TaskQueue();
queue.enqueue(task1).enqueue(task2).enqueue(task3);
queue.processAll();
```

### 2. Undo/Redo Stack

```javascript
class CommandStack extends Stack {
  execute(command) {
    command.execute();
    this.push(command);
  }

  undo() {
    const command = this.pop();
    if (command) command.undo();
  }
}
```

### 3. Browser History (Stack)

```javascript
class BrowserHistory {
  constructor() {
    this.history = new Stack();
  }

  visit(url) {
    this.history.push(url);
    console.log(`Visiting ${url}`);
  }

  back() {
    this.history.pop(); // Current
    return this.history.pop(); // Previous
  }
}
```

### 4. Breadth-First Search (Queue)

```javascript
function bfs(startNode) {
  const queue = new Queue();
  const visited = new Set();
  
  queue.enqueue(startNode);
  visited.add(startNode);

  while (true) {
    const node = queue.dequeue();
    if (!node) break;
    
    process(node);
    
    for (const neighbor of node.neighbors) {
      if (!visited.has(neighbor)) {
        queue.enqueue(neighbor);
        visited.add(neighbor);
      }
    }
  }
}
```

### 5. Expression Evaluation (Stack)

```javascript
function evaluatePostfix(expression) {
  const stack = new Stack();
  
  for (const token of expression) {
    if (isOperator(token)) {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(apply(token, a, b));
    } else {
      stack.push(parseFloat(token));
    }
  }
  
  return stack.pop();
}
```

## 🔧 Common Mistakes

### 1. Forgetting to Return this in add/enqueue/push

```javascript
// ❌ WRONG - No chaining possible
add(value) {
  this.items.push(value);
  // Missing return this!
}

// ✅ CORRECT
add(value) {
  this.items.push(value);
  return this; // Enable chaining
}
```

### 2. Iterator Consuming the Collection

```javascript
// ❌ WRONG - Iteration breaks queue
[Symbol.iterator]() {
  return this; // Returns this, gets exhausted
}

// ✅ CORRECT - Fresh iterator each time
[Symbol.iterator]() {
  // Create new iterator
  let current = this.head;
  return {
    next: () => { ... }
  };
}
```

### 3. Not Handling Empty Collection

```javascript
// ❌ WRONG - Crashes on empty
dequeue() {
  return this.items.shift();
  // Returns undefined, but no error handling
}

// ✅ CORRECT
dequeue() {
  return this.items.length > 0 ? this.items.shift() : undefined;
}
```

### 4. Linked List End Condition

```javascript
// ❌ WRONG - Infinite loop if not careful
while (current.next) {
  // ... never checks current itself
}

// ✅ CORRECT - Check current != null
while (current) {
  process(current);
  current = current.next;
}
```

### 5. Not Making Stack Iterate Top-to-Bottom

```javascript
// ❌ WRONG - Bottom to top
[Symbol.iterator]() {
  return this.items[Symbol.iterator](); // Wrong order for stack!
}

// ✅ CORRECT - Reverse order (top to bottom)
[Symbol.iterator]() {
  for (let i = this.items.length - 1; i >= 0; i--) {
    yield this.items[i];
  }
}
```

## 📚 Summary

**What You've Learned:**
- How to implement `Symbol.iterator` in classes
- How to create linked lists with node chains
- How to build FIFO queues
- How to build LIFO stacks
- How to make classes work with `for...of`
- Method chaining patterns
- Real-world collection uses
- Common implementation mistakes

**Next Steps:**
- Exercise 167: Composing generators
- Learn Tree structures (similar iterators)
- Study graph traversal patterns
- Explore priority queues

## 🎓 Learning Checklist

- [ ] Understand LinkedListNode structure
- [ ] Can implement LinkedList with iteration
- [ ] Understand FIFO queue behavior
- [ ] Can implement Queue with enqueue/dequeue
- [ ] Understand LIFO stack behavior
- [ ] Can implement Stack with push/pop
- [ ] Know how to implement `Symbol.iterator` in classes
- [ ] Can enable method chaining with `return this`
- [ ] Understand iteration without consuming
- [ ] Can debug collection issues

---

**Run tests:** `npm test`

**Start coding:** Implement the four classes in `166-iterator-collection.js`

**Challenge:** Implement a Deque (double-ended queue) that supports add/remove from both ends!
