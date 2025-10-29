import { describe, it, expect } from 'vitest';
import { LinkedListNode, LinkedList, Queue, Stack } from './166-iterator-collection.js';

describe('Exercise 166: Iterator - Custom Collections', () => {
  describe('LinkedListNode', () => {
    it('should create node with value', () => {
      const node = new LinkedListNode(5);
      expect(node.value).toBe(5);
    });

    it('should store next reference', () => {
      const node1 = new LinkedListNode(1);
      const node2 = new LinkedListNode(2);
      node1.next = node2;
      expect(node1.next).toBe(node2);
    });

    it('should default next to null', () => {
      const node = new LinkedListNode(42);
      expect(node.next).toBeNull();
    });

    it('should work with any value type', () => {
      expect(new LinkedListNode('a').value).toBe('a');
      expect(new LinkedListNode(null).value).toBeNull();
      expect(new LinkedListNode({x: 1}).value).toEqual({x: 1});
    });
  });

  describe('LinkedList', () => {
    it('should start empty', () => {
      const list = new LinkedList();
      expect([...list]).toEqual([]);
    });

    it('should add single value', () => {
      const list = new LinkedList();
      list.add(1);
      expect([...list]).toEqual([1]);
    });

    it('should add multiple values in order', () => {
      const list = new LinkedList();
      list.add(1).add(2).add(3);
      expect([...list]).toEqual([1, 2, 3]);
    });

    it('should work with for...of loop', () => {
      const list = new LinkedList();
      list.add('a').add('b');
      const result = [];
      for (const value of list) {
        result.push(value);
      }
      expect(result).toEqual(['a', 'b']);
    });

    it('should allow chaining', () => {
      const list = new LinkedList();
      const returned = list.add(1);
      expect(returned).toBe(list);
    });

    it('should work with different types', () => {
      const list = new LinkedList();
      list.add(1).add('two').add(null).add({x: 3});
      expect([...list]).toEqual([1, 'two', null, {x: 3}]);
    });

    it('should maintain insertion order', () => {
      const list = new LinkedList();
      for (let i = 5; i >= 1; i--) {
        list.add(i);
      }
      expect([...list]).toEqual([5, 4, 3, 2, 1]);
    });

    it('should handle many items', () => {
      const list = new LinkedList();
      for (let i = 1; i <= 100; i++) {
        list.add(i);
      }
      const result = [...list];
      expect(result.length).toBe(100);
      expect(result[0]).toBe(1);
      expect(result[99]).toBe(100);
    });

    it('should be iterable multiple times', () => {
      const list = new LinkedList();
      list.add(1).add(2);
      expect([...list]).toEqual([1, 2]);
      expect([...list]).toEqual([1, 2]); // Can iterate again
    });
  });

  describe('Queue', () => {
    it('should start empty', () => {
      const queue = new Queue();
      expect(queue.dequeue()).toBeUndefined();
    });

    it('should enqueue single item', () => {
      const queue = new Queue();
      queue.enqueue(1);
      expect(queue.dequeue()).toBe(1);
    });

    it('should follow FIFO order', () => {
      const queue = new Queue();
      queue.enqueue(1).enqueue(2).enqueue(3);
      expect(queue.dequeue()).toBe(1);
      expect(queue.dequeue()).toBe(2);
      expect(queue.dequeue()).toBe(3);
    });

    it('should allow chaining on enqueue', () => {
      const queue = new Queue();
      const result = queue.enqueue(1);
      expect(result).toBe(queue);
    });

    it('should work with for...of', () => {
      const queue = new Queue();
      queue.enqueue('a').enqueue('b').enqueue('c');
      expect([...queue]).toEqual(['a', 'b', 'c']);
    });

    it('should preserve queue when iterating', () => {
      const queue = new Queue();
      queue.enqueue(1).enqueue(2);
      const arr = [...queue];
      expect(arr).toEqual([1, 2]);
      expect(queue.dequeue()).toBe(1); // Not consumed by iteration
    });

    it('should handle mixed operations', () => {
      const queue = new Queue();
      queue.enqueue(1).enqueue(2);
      expect(queue.dequeue()).toBe(1);
      queue.enqueue(3);
      expect([...queue]).toEqual([2, 3]);
    });
  });

  describe('Stack', () => {
    it('should start empty', () => {
      const stack = new Stack();
      expect(stack.pop()).toBeUndefined();
    });

    it('should push single item', () => {
      const stack = new Stack();
      stack.push(1);
      expect(stack.pop()).toBe(1);
    });

    it('should follow LIFO order', () => {
      const stack = new Stack();
      stack.push(1).push(2).push(3);
      expect(stack.pop()).toBe(3);
      expect(stack.pop()).toBe(2);
      expect(stack.pop()).toBe(1);
    });

    it('should allow chaining on push', () => {
      const stack = new Stack();
      const result = stack.push(1);
      expect(result).toBe(stack);
    });

    it('should work with for...of', () => {
      const stack = new Stack();
      stack.push('a').push('b').push('c');
      expect([...stack]).toEqual(['c', 'b', 'a']);
    });

    it('should iterate top to bottom', () => {
      const stack = new Stack();
      stack.push(1).push(2).push(3);
      const result = [];
      for (const val of stack) {
        result.push(val);
      }
      expect(result).toEqual([3, 2, 1]);
    });

    it('should preserve stack when iterating', () => {
      const stack = new Stack();
      stack.push(1).push(2);
      const arr = [...stack];
      expect(arr).toEqual([2, 1]);
      expect(stack.pop()).toBe(2); // Not consumed by iteration
    });

    it('should handle mixed operations', () => {
      const stack = new Stack();
      stack.push(1).push(2);
      expect(stack.pop()).toBe(2);
      stack.push(3);
      expect([...stack]).toEqual([3, 1]);
    });
  });

  describe('Integration tests', () => {
    it('should convert linked list to array', () => {
      const list = new LinkedList();
      list.add(10).add(20).add(30);
      const arr = [...list];
      expect(arr).toEqual([10, 20, 30]);
    });

    it('should use queue in realistic scenario', () => {
      const queue = new Queue();
      const tasks = ['task1', 'task2', 'task3'];
      
      for (const task of tasks) {
        queue.enqueue(task);
      }

      const completed = [];
      while (queue.dequeue()) {
        completed.push(queue.dequeue());
      }
      expect(completed[0]).toBe('task2');
    });

    it('should use stack for expression parsing', () => {
      const stack = new Stack();
      const symbols = ['(', 'x', ')'];
      
      for (const sym of symbols) {
        if (sym === '(') stack.push(sym);
        else if (sym === ')') stack.pop();
      }
      
      expect(stack.pop()).toBeUndefined();
    });

    it('should combine collections', () => {
      const list = new LinkedList();
      list.add(1).add(2).add(3);
      
      const queue = new Queue();
      for (const val of list) {
        queue.enqueue(val * 2);
      }
      
      expect([...queue]).toEqual([2, 4, 6]);
    });

    it('should use stack to reverse', () => {
      const stack = new Stack();
      for (const n of [1, 2, 3, 4, 5]) {
        stack.push(n);
      }
      expect([...stack]).toEqual([5, 4, 3, 2, 1]);
    });
  });
});
