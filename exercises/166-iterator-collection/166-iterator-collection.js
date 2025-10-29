// Exercise 166: Iterator - Custom Collections
// Create custom iterable collection classes with Symbol.iterator

/**
 * Class representing single node in linked list
 * 
 * @param {*} value - Value to store in node
 * @param {LinkedListNode} next - Next node reference
 * 
 * @example
 * const node = new LinkedListNode(5);
 * node.value; // 5
 * node.next;  // null
 */
class LinkedListNode {
  constructor(value, next = null) {
    // TODO: Implement constructor
    // Store value and next (reference to next node)
  }
}

/**
 * Class for singly-linked list collection
 * Must implement Symbol.iterator to be iterable
 * 
 * @example
 * const list = new LinkedList();
 * list.add(1).add(2).add(3);
 * for (const value of list) {
 *   console.log(value); // 1, 2, 3
 * }
 */
class LinkedList {
  constructor() {
    // TODO: Implement constructor
    // Initialize head to null, size to 0
  }

  /**
   * Add value to end of linked list
   * 
   * @param {*} value - Value to add
   * @returns {LinkedList} this for chaining
   */
  add(value) {
    // TODO: Implement add
    // Create new node and append to end
    // Update head if first node
    // Return this for chaining
  }

  /**
   * Make LinkedList iterable with for...of
   * 
   * @returns {Iterator} Iterator starting from head
   */
  [Symbol.iterator]() {
    // TODO: Implement Symbol.iterator
    // Yield each node value from head to end
  }
}

/**
 * FIFO queue collection class
 * Items added to back, removed from front
 * 
 * @example
 * const queue = new Queue();
 * queue.enqueue(1).enqueue(2).enqueue(3);
 * queue.dequeue(); // 1
 * queue.dequeue(); // 2
 */
class Queue {
  constructor() {
    // TODO: Implement constructor
    // Initialize empty queue storage
  }

  /**
   * Add item to back of queue
   * 
   * @param {*} value - Value to enqueue
   * @returns {Queue} this for chaining
   */
  enqueue(value) {
    // TODO: Implement enqueue
    // Add to end of queue
    // Return this
  }

  /**
   * Remove and return item from front
   * 
   * @returns {*} Front value or undefined if empty
   */
  dequeue() {
    // TODO: Implement dequeue
    // Remove from front
    // Return the value
  }

  /**
   * Make Queue iterable
   * 
   * @returns {Iterator} Iterator of queue values
   */
  [Symbol.iterator]() {
    // TODO: Implement Symbol.iterator
    // Yield items from front to back
    // Doesn't modify queue
  }
}

/**
 * LIFO stack collection class
 * Items added and removed from top
 * 
 * @example
 * const stack = new Stack();
 * stack.push(1).push(2).push(3);
 * stack.pop(); // 3
 * stack.pop(); // 2
 */
class Stack {
  constructor() {
    // TODO: Implement constructor
    // Initialize empty stack storage
  }

  /**
   * Add item to top of stack
   * 
   * @param {*} value - Value to push
   * @returns {Stack} this for chaining
   */
  push(value) {
    // TODO: Implement push
    // Add to top
    // Return this
  }

  /**
   * Remove and return item from top
   * 
   * @returns {*} Top value or undefined if empty
   */
  pop() {
    // TODO: Implement pop
    // Remove from top
    // Return the value
  }

  /**
   * Make Stack iterable (top to bottom)
   * 
   * @returns {Iterator} Iterator from top to bottom
   */
  [Symbol.iterator]() {
    // TODO: Implement Symbol.iterator
    // Yield items from top to bottom
    // Doesn't modify stack
  }
}

export { LinkedListNode, LinkedList, Queue, Stack };
