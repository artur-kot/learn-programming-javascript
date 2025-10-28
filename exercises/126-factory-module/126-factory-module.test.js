import { describe, it, expect } from 'vitest';
import { Counter, CounterApp, StatsTracker } from './126-factory-module.js';

describe('Counter Factory - Module Pattern', () => {
  describe('Counter Module', () => {
    it('should create a counter instance', () => {
      const counter = Counter.create('test', 0);
      expect(typeof counter).toBe('object');
    });

    it('should have increment and decrement methods', () => {
      const counter = Counter.create('test', 0);
      expect(typeof counter.increment).toBe('function');
      expect(typeof counter.decrement).toBe('function');
      expect(typeof counter.getValue).toBe('function');
    });

    it('should start with initial value', () => {
      const counter = Counter.create('test', 10);
      expect(counter.getValue()).toBe(10);
    });

    it('should increment and decrement', () => {
      const counter = Counter.create('test', 0);
      counter.increment();
      expect(counter.getValue()).toBe(1);
      counter.decrement();
      expect(counter.getValue()).toBe(0);
    });

    it('should create multiple independent counters', () => {
      const counters = Counter.createMultiple(3, 0);
      expect(counters.length).toBe(3);
      
      counters[0].increment();
      counters[0].increment();
      counters[1].increment();

      expect(counters[0].getValue()).toBe(2);
      expect(counters[1].getValue()).toBe(1);
      expect(counters[2].getValue()).toBe(0);
    });

    it('should create multiple with initial value', () => {
      const counters = Counter.createMultiple(5, 10);
      
      counters.forEach(counter => {
        expect(counter.getValue()).toBe(10);
      });
    });
  });

  describe('CounterApp Module', () => {
    it('should add counter to app', () => {
      const counter = CounterApp.addCounter('first', 0);
      expect(typeof counter).toBe('object');
    });

    it('should retrieve added counter', () => {
      CounterApp.addCounter('retrieve', 5);
      const counter = CounterApp.getCounter('retrieve');
      expect(counter.getValue()).toBe(5);
    });

    it('should track multiple counters', () => {
      CounterApp.addCounter('a', 0);
      CounterApp.addCounter('b', 0);
      CounterApp.addCounter('c', 0);

      const all = CounterApp.getAllCounters();
      expect(all.length).toBe(3);
    });

    it('should remove counter', () => {
      CounterApp.addCounter('remove-me', 0);
      let counter = CounterApp.getCounter('remove-me');
      expect(counter).toBeDefined();

      CounterApp.removeCounter('remove-me');
      counter = CounterApp.getCounter('remove-me');
      expect(counter).toBeUndefined();
    });

    it('should get stats for all counters', () => {
      CounterApp.addCounter('stat1', 5);
      CounterApp.addCounter('stat2', 10);
      
      const stats = CounterApp.getStats();
      expect(stats.total).toBe(15);
    });
  });

  describe('StatsTracker Module', () => {
    it('should track events', () => {
      StatsTracker.track('click');
      StatsTracker.track('click');
      StatsTracker.track('scroll');

      expect(StatsTracker.getCount('click')).toBe(2);
      expect(StatsTracker.getCount('scroll')).toBe(1);
    });

    it('should get count for event', () => {
      StatsTracker.track('login');
      StatsTracker.track('login');
      StatsTracker.track('login');

      expect(StatsTracker.getCount('login')).toBe(3);
    });

    it('should get all tracked events', () => {
      StatsTracker.track('event1');
      StatsTracker.track('event2');
      StatsTracker.track('event1');

      const all = StatsTracker.getAll();
      expect(all.event1).toBe(2);
      expect(all.event2).toBe(1);
    });

    it('should reset event counter', () => {
      StatsTracker.track('reset-me');
      StatsTracker.track('reset-me');
      expect(StatsTracker.getCount('reset-me')).toBe(2);

      StatsTracker.reset('reset-me');
      expect(StatsTracker.getCount('reset-me')).toBe(0);
    });

    it('should find highest event', () => {
      StatsTracker.track('a');
      StatsTracker.track('a');
      StatsTracker.track('b');
      StatsTracker.track('b');
      StatsTracker.track('b');
      StatsTracker.track('c');

      const highest = StatsTracker.getHighest();
      expect(highest.name).toBe('b');
      expect(highest.count).toBe(3);
    });
  });
});
