import { describe, it, expect } from 'vitest';
import {
  createAdvancedCounter,
  createObservableCounter,
  createHistoryCounter,
  createValidatedCounter
} from './127-factory-advanced.js';

describe('Counter Factory - Advanced Features', () => {
  describe('createAdvancedCounter', () => {
    it('should create counter with min/max bounds', () => {
      const counter = createAdvancedCounter('Bounded', 5, 10, 0);
      expect(counter.getValue()).toBe(5);
    });

    it('should respect maximum bound', () => {
      const counter = createAdvancedCounter('Test', 8, 10, 0);
      counter.increment();
      counter.increment();
      counter.increment(); // Should stop at 10
      expect(counter.getValue()).toBe(10);
    });

    it('should respect minimum bound', () => {
      const counter = createAdvancedCounter('Test', 2, 10, 0);
      counter.decrement();
      counter.decrement();
      counter.decrement(); // Should stop at 0
      expect(counter.getValue()).toBe(0);
    });

    it('should reset to initial value', () => {
      const counter = createAdvancedCounter('Test', 5, 20, 0);
      counter.increment();
      counter.increment();
      expect(counter.getValue()).toBe(7);
      
      counter.reset();
      expect(counter.getValue()).toBe(5);
    });

    it('should use getter syntax', () => {
      const counter = createAdvancedCounter('Test', 10);
      expect(counter.get).toBeDefined();
    });

    it('should use setter syntax for value', () => {
      const counter = createAdvancedCounter('Test', 0, 20, 0);
      counter.set(15);
      expect(counter.getValue()).toBe(15);
    });

    it('should validate when using setter', () => {
      const counter = createAdvancedCounter('Test', 5, 10, 0);
      counter.set(25); // Out of bounds
      expect(counter.getValue()).toBe(5); // Unchanged
    });

    it('should get formatted string', () => {
      const counter = createAdvancedCounter('Counter', 5);
      const formatted = counter.format();
      expect(formatted).toContain('5');
    });
  });

  describe('createObservableCounter', () => {
    it('should call observer on change', () => {
      let callCount = 0;
      const observer = () => callCount++;

      const counter = createObservableCounter(0);
      counter.onChange(observer);

      counter.increment();
      expect(callCount).toBe(1);

      counter.increment();
      expect(callCount).toBe(2);
    });

    it('should pass old and new values to observer', () => {
      let oldValue, newValue;
      const observer = (old, _new) => {
        oldValue = old;
        newValue = _new;
      };

      const counter = createObservableCounter(5);
      counter.onChange(observer);

      counter.increment();
      expect(oldValue).toBe(5);
      expect(newValue).toBe(6);
    });

    it('should handle multiple observers', () => {
      let calls1 = 0, calls2 = 0;
      const observer1 = () => calls1++;
      const observer2 = () => calls2++;

      const counter = createObservableCounter(0);
      counter.onChange(observer1);
      counter.onChange(observer2);

      counter.increment();

      expect(calls1).toBe(1);
      expect(calls2).toBe(1);
    });

    it('should remove observer', () => {
      let callCount = 0;
      const observer = () => callCount++;

      const counter = createObservableCounter(0);
      const unsubscribe = counter.onChange(observer);

      counter.increment();
      expect(callCount).toBe(1);

      unsubscribe();
      counter.increment();
      expect(callCount).toBe(1); // Not called again
    });
  });

  describe('createHistoryCounter', () => {
    it('should track value history', () => {
      const counter = createHistoryCounter(0);
      counter.increment();
      counter.increment();
      counter.decrement();

      const history = counter.getHistory();
      expect(history.length).toBeGreaterThan(0);
    });

    it('should return to previous value', () => {
      const counter = createHistoryCounter(5);
      counter.increment(); // 6
      counter.increment(); // 7
      counter.decrement(); // 6

      counter.undo();
      expect(counter.getValue()).toBe(7);

      counter.undo();
      expect(counter.getValue()).toBe(6);
    });

    it('should handle redo', () => {
      const counter = createHistoryCounter(0);
      counter.increment(); // 1
      counter.increment(); // 2

      counter.undo(); // Back to 1
      expect(counter.getValue()).toBe(1);

      counter.redo(); // Forward to 2
      expect(counter.getValue()).toBe(2);
    });

    it('should clear history on new operations after undo', () => {
      const counter = createHistoryCounter(0);
      counter.increment();
      counter.increment();

      counter.undo(); // Back to 1
      counter.increment(); // New operation

      expect(counter.canRedo()).toBe(false);
    });

    it('should report undo/redo availability', () => {
      const counter = createHistoryCounter(0);
      expect(counter.canUndo()).toBe(false);
      expect(counter.canRedo()).toBe(false);

      counter.increment();
      expect(counter.canUndo()).toBe(true);
      expect(counter.canRedo()).toBe(false);

      counter.undo();
      expect(counter.canUndo()).toBe(false);
      expect(counter.canRedo()).toBe(true);
    });
  });

  describe('createValidatedCounter', () => {
    it('should use default validator (positive only)', () => {
      const counter = createValidatedCounter(0);
      counter.increment();
      counter.increment();
      counter.decrement(); // Should go to 1
      counter.decrement(); // Should stop at 0
      expect(counter.getValue()).toBe(0);
    });

    it('should accept custom validator', () => {
      const evenOnly = (value) => value % 2 === 0;
      const counter = createValidatedCounter(0, evenOnly);

      counter.increment(); // 1 - rejected, stays 0
      expect(counter.getValue()).toBe(0);

      counter.increment();
      counter.increment(); // 2 - accepted
      expect(counter.getValue()).toBe(2);
    });

    it('should call validator before changing', () => {
      const multipleof5 = (value) => value % 5 === 0;
      const counter = createValidatedCounter(0, multipleof5);

      counter.increment(); // Not multiple of 5
      expect(counter.getValue()).toBe(0);

      counter.increment();
      counter.increment();
      counter.increment();
      counter.increment();
      counter.increment(); // 5 - valid
      expect(counter.getValue()).toBe(5);
    });

    it('should handle range validator', () => {
      const inRange = (value) => value >= 0 && value <= 10;
      const counter = createValidatedCounter(5, inRange);

      counter.increment();
      counter.increment();
      counter.increment();
      counter.increment();
      counter.increment(); // 10
      counter.increment(); // Rejected, stays 10
      expect(counter.getValue()).toBe(10);
    });
  });

  describe('Advanced Features Integration', () => {
    it('advanced counter should combine features', () => {
      const counter = createAdvancedCounter('Premium', 5, 15, 0);
      counter.increment();
      expect(counter.getValue()).toBe(6);
      
      counter.reset();
      expect(counter.getValue()).toBe(5);
    });

    it('observable counter should notify observers', () => {
      let changes = [];
      const counter = createObservableCounter(0);
      
      counter.onChange((old, newVal) => {
        changes.push({ old, new: newVal });
      });

      counter.increment();
      counter.increment();
      counter.decrement();

      expect(changes.length).toBe(3);
    });

    it('history counter should track all changes', () => {
      const counter = createHistoryCounter(10);
      counter.increment();
      counter.decrement();
      counter.increment();
      counter.increment();

      const history = counter.getHistory();
      expect(history.length).toBeGreaterThanOrEqual(4);
    });
  });
});
