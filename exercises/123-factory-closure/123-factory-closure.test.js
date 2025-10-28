import { describe, it, expect, beforeEach } from 'vitest';
import {
  createCounter,
  createMultiplyCounter,
  createBoundedCounter
} from './123-factory-closure.js';

describe('Counter Factory - Basic Closure', () => {
  describe('createCounter', () => {
    it('should return an object with methods', () => {
      const counter = createCounter();
      expect(typeof counter).toBe('object');
      expect(typeof counter.increment).toBe('function');
      expect(typeof counter.decrement).toBe('function');
      expect(typeof counter.getValue).toBe('function');
    });

    it('should start with initial value 0', () => {
      const counter = createCounter();
      expect(counter.getValue()).toBe(0);
    });

    it('should start with provided initial value', () => {
      const counter = createCounter(5);
      expect(counter.getValue()).toBe(5);
    });

    it('should increment the counter', () => {
      const counter = createCounter(0);
      counter.increment();
      expect(counter.getValue()).toBe(1);
    });

    it('should decrement the counter', () => {
      const counter = createCounter(5);
      counter.decrement();
      expect(counter.getValue()).toBe(4);
    });

    it('should handle multiple increments', () => {
      const counter = createCounter(0);
      counter.increment();
      counter.increment();
      counter.increment();
      expect(counter.getValue()).toBe(3);
    });

    it('should handle mixed increment and decrement', () => {
      const counter = createCounter(10);
      counter.increment();
      counter.increment();
      counter.decrement();
      expect(counter.getValue()).toBe(11);
    });

    it('should handle negative numbers', () => {
      const counter = createCounter(-5);
      counter.increment();
      expect(counter.getValue()).toBe(-4);
      counter.decrement();
      counter.decrement();
      expect(counter.getValue()).toBe(-6);
    });
  });

  describe('createMultiplyCounter', () => {
    it('should increment by custom step', () => {
      const counter = createMultiplyCounter(0, 5);
      counter.increment();
      expect(counter.getValue()).toBe(5);
    });

    it('should decrement by custom step', () => {
      const counter = createMultiplyCounter(10, 2);
      counter.decrement();
      expect(counter.getValue()).toBe(8);
    });

    it('should handle fractional steps', () => {
      const counter = createMultiplyCounter(0, 0.5);
      counter.increment();
      counter.increment();
      expect(counter.getValue()).toBe(1);
    });

    it('should start with provided initial value', () => {
      const counter = createMultiplyCounter(100, 10);
      expect(counter.getValue()).toBe(100);
    });

    it('should handle multiple operations with step', () => {
      const counter = createMultiplyCounter(0, 3);
      counter.increment();
      counter.increment();
      counter.decrement();
      expect(counter.getValue()).toBe(3);
    });
  });

  describe('createBoundedCounter', () => {
    it('should not increment past max', () => {
      const counter = createBoundedCounter(98, 0, 100);
      counter.increment();
      counter.increment();
      counter.increment(); // Should stop at 100
      expect(counter.getValue()).toBe(100);
    });

    it('should not decrement below min', () => {
      const counter = createBoundedCounter(2, 0, 100);
      counter.decrement();
      counter.decrement();
      counter.decrement(); // Should stop at 0
      expect(counter.getValue()).toBe(0);
    });

    it('should start within bounds', () => {
      const counter = createBoundedCounter(50, 0, 100);
      expect(counter.getValue()).toBe(50);
    });

    it('should handle custom bounds', () => {
      const counter = createBoundedCounter(5, 1, 10);
      counter.increment();
      expect(counter.getValue()).toBe(6);
      counter.decrement();
      expect(counter.getValue()).toBe(5);
    });

    it('should respect negative bounds', () => {
      const counter = createBoundedCounter(0, -5, 5);
      counter.decrement();
      counter.decrement();
      counter.decrement();
      counter.decrement();
      counter.decrement();
      counter.decrement(); // Should stop at -5
      expect(counter.getValue()).toBe(-5);
    });

    it('should handle single value bounds', () => {
      const counter = createBoundedCounter(5, 5, 5);
      counter.increment(); // Should not change
      expect(counter.getValue()).toBe(5);
      counter.decrement(); // Should not change
      expect(counter.getValue()).toBe(5);
    });
  });

  describe('Closure Behavior', () => {
    it('should maintain separate state for different counters', () => {
      const counter1 = createCounter(0);
      const counter2 = createCounter(100);

      counter1.increment();
      counter2.decrement();

      expect(counter1.getValue()).toBe(1);
      expect(counter2.getValue()).toBe(99);
    });

    it('should not leak state between counters', () => {
      const counter1 = createCounter(10);
      const counter2 = createCounter(20);
      const counter3 = createCounter(30);

      counter1.increment();
      counter2.increment();
      counter3.increment();

      expect(counter1.getValue()).toBe(11);
      expect(counter2.getValue()).toBe(21);
      expect(counter3.getValue()).toBe(31);
    });

    it('should preserve state across multiple calls', () => {
      const counter = createCounter(5);
      
      expect(counter.getValue()).toBe(5);
      counter.increment();
      expect(counter.getValue()).toBe(6);
      counter.increment();
      expect(counter.getValue()).toBe(7);
      counter.decrement();
      expect(counter.getValue()).toBe(6);
    });
  });

  describe('Integration', () => {
    it('should work with array of counters', () => {
      const counters = [
        createCounter(1),
        createCounter(2),
        createCounter(3)
      ];

      counters.forEach(c => c.increment());

      expect(counters[0].getValue()).toBe(2);
      expect(counters[1].getValue()).toBe(3);
      expect(counters[2].getValue()).toBe(4);
    });

    it('should support chaining-like operations', () => {
      const counter = createCounter(0);
      counter.increment();
      counter.increment();
      counter.decrement();
      const result = counter.getValue();
      expect(result).toBe(1);
    });
  });
});
