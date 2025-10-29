import { describe, it, expect } from 'vitest';
import {
  createCounter,
  createCounterRegistry,
  createCounterGroup,
  createScaledCounters
} from './125-factory-multiple.js';

describe('Counter Factory - Multiple Counters', () => {
  describe('createCounter', () => {
    it('should create independent counter instances', () => {
      const counter1 = createCounter('Counter 1', 0);
      const counter2 = createCounter('Counter 2', 0);

      expect(counter1.getName()).toBe('Counter 1');
      expect(counter2.getName()).toBe('Counter 2');
    });

    it('should maintain separate state for each counter', () => {
      const counter1 = createCounter('A', 0);
      const counter2 = createCounter('B', 0);

      counter1.increment();
      counter1.increment();
      counter2.increment();

      expect(counter1.getValue()).toBe(2);
      expect(counter2.getValue()).toBe(1);
    });

    it('should handle different initial values', () => {
      const counter1 = createCounter('Start 0', 0);
      const counter2 = createCounter('Start 10', 10);
      const counter3 = createCounter('Start -5', -5);

      expect(counter1.getValue()).toBe(0);
      expect(counter2.getValue()).toBe(10);
      expect(counter3.getValue()).toBe(-5);
    });

    it('should preserve independence through operations', () => {
      const counter1 = createCounter('C1', 5);
      const counter2 = createCounter('C2', 10);
      const counter3 = createCounter('C3', 15);

      counter1.increment();
      counter2.increment();
      counter2.increment();
      counter3.decrement();

      expect(counter1.getValue()).toBe(6);
      expect(counter2.getValue()).toBe(12);
      expect(counter3.getValue()).toBe(14);
    });
  });

  describe('createCounterRegistry', () => {
    it('should create a registry for managing counters', () => {
      const registry = createCounterRegistry();
      expect(typeof registry).toBe('object');
    });

    it('should register and retrieve counters', () => {
      const registry = createCounterRegistry();
      registry.register('counter1', 0);

      const counter = registry.get('counter1');
      expect(counter.getValue()).toBe(0);
    });

    it('should increment registered counter', () => {
      const registry = createCounterRegistry();
      registry.register('counter1', 0);
      registry.increment('counter1');

      expect(registry.getValue('counter1')).toBe(1);
    });

    it('should handle multiple registered counters', () => {
      const registry = createCounterRegistry();
      registry.register('a', 0);
      registry.register('b', 10);
      registry.register('c', 20);

      registry.increment('a');
      registry.increment('b');
      registry.decrement('c');

      expect(registry.getValue('a')).toBe(1);
      expect(registry.getValue('b')).toBe(11);
      expect(registry.getValue('c')).toBe(19);
    });

    it('should list all registered counters', () => {
      const registry = createCounterRegistry();
      registry.register('x', 0);
      registry.register('y', 0);
      registry.register('z', 0);

      const names = registry.listCounters();
      expect(names).toContain('x');
      expect(names).toContain('y');
      expect(names).toContain('z');
      expect(names.length).toBe(3);
    });

    it('should reset individual counters', () => {
      const registry = createCounterRegistry();
      registry.register('a', 0);
      registry.register('b', 0);

      registry.increment('a');
      registry.increment('a');
      registry.increment('b');

      registry.reset('a');

      expect(registry.getValue('a')).toBe(0);
      expect(registry.getValue('b')).toBe(1);
    });
  });

  describe('createCounterGroup', () => {
    it('should create a counter group', () => {
      const group = createCounterGroup('stats');
      expect(typeof group).toBe('object');
    });

    it('should add counters to group', () => {
      const group = createCounterGroup('clicks');
      group.addCounter('button1', 0);
      group.addCounter('button2', 0);

      expect(group.getCounter('button1').getValue()).toBe(0);
    });

    it('should increment group counters', () => {
      const group = createCounterGroup('scores');
      group.addCounter('playerA', 0);
      group.addCounter('playerB', 0);

      group.increment('playerA');
      group.increment('playerA');
      group.increment('playerB');

      expect(group.getCounter('playerA').getValue()).toBe(2);
      expect(group.getCounter('playerB').getValue()).toBe(1);
    });

    it('should calculate group total', () => {
      const group = createCounterGroup('totals');
      group.addCounter('a', 5);
      group.addCounter('b', 10);
      group.addCounter('c', 15);

      expect(group.getTotal()).toBe(30);
    });

    it('should get group summary', () => {
      const group = createCounterGroup('metrics');
      group.addCounter('active', 5);
      group.addCounter('inactive', 3);

      const summary = group.getSummary();
      expect(summary.active).toBe(5);
      expect(summary.inactive).toBe(3);
    });

    it('should maintain group independence', () => {
      const group1 = createCounterGroup('group1');
      const group2 = createCounterGroup('group2');

      group1.addCounter('a', 0);
      group2.addCounter('a', 0);

      group1.increment('a');
      group1.increment('a');
      group2.increment('a');

      expect(group1.getCounter('a').getValue()).toBe(2);
      expect(group2.getCounter('a').getValue()).toBe(1);
    });
  });

  describe('createScaledCounters', () => {
    it('should create N independent counters', () => {
      const counters = createScaledCounters(3, 0);
      expect(counters.length).toBe(3);
    });

    it('should each counter start with initial value', () => {
      const counters = createScaledCounters(5, 10);
      
      counters.forEach(counter => {
        expect(counter.getValue()).toBe(10);
      });
    });

    it('should maintain independent state for each', () => {
      const counters = createScaledCounters(4, 0);

      counters[0].increment();
      counters[0].increment();
      counters[1].increment();
      counters[2].decrement();

      expect(counters[0].getValue()).toBe(2);
      expect(counters[1].getValue()).toBe(1);
      expect(counters[2].getValue()).toBe(-1);
      expect(counters[3].getValue()).toBe(0);
    });

    it('should handle large numbers of counters', () => {
      const counters = createScaledCounters(100, 0);
      expect(counters.length).toBe(100);

      counters[0].increment();
      counters[99].increment();
      counters[99].increment();

      expect(counters[0].getValue()).toBe(1);
      expect(counters[50].getValue()).toBe(0);
      expect(counters[99].getValue()).toBe(2);
    });

    it('should allow indexing and modification', () => {
      const counters = createScaledCounters(3, 5);

      counters[0].increment();
      counters[1].increment();
      counters[1].increment();
      counters[2].decrement();

      expect(counters[0].getValue()).toBe(6);
      expect(counters[1].getValue()).toBe(7);
      expect(counters[2].getValue()).toBe(4);
    });
  });

  describe('Closure Independence', () => {
    it('should prove each closure has its own scope', () => {
      const c1 = createCounter('C1', 0);
      const c2 = createCounter('C2', 0);
      const c3 = createCounter('C3', 0);

      for (let i = 0; i < 5; i++) {
        c1.increment();
      }

      for (let i = 0; i < 3; i++) {
        c2.increment();
      }

      expect(c1.getValue()).toBe(5);
      expect(c2.getValue()).toBe(3);
      expect(c3.getValue()).toBe(0);
    });

    it('should handle rapid operations independently', () => {
      const counters = createScaledCounters(3, 0);

      // Rapidly modify each
      for (let i = 0; i < 10; i++) {
        counters[0].increment();
        counters[1].increment();
        counters[1].increment();
        counters[2].decrement();
      }

      expect(counters[0].getValue()).toBe(10);
      expect(counters[1].getValue()).toBe(20);
      expect(counters[2].getValue()).toBe(-10);
    });
  });
});
