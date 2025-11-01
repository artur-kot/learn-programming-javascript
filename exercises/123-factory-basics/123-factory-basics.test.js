import { describe, it, expect, beforeEach } from 'vitest';
import {
  createCounter,
  createMultiplyCounter,
  createBoundedCounter,
  createUser,
  createBankAccount,
  createSecureNote,
  createPasswordManager,
  createCounterWithName,
  createCounterRegistry,
  createCounterGroup,
  createScaledCounters
} from './123-factory-basics.js';

describe('Counter Factory - Basics', () => {
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
    it('should enforce maximum bound', () => {
      const counter = createBoundedCounter(50, 0, 100);
      counter.increment();
      counter.increment();
      for (let i = 0; i < 100; i++) {
        counter.increment();
      }
      expect(counter.getValue()).toBe(100);
    });

    it('should enforce minimum bound', () => {
      const counter = createBoundedCounter(5, 0, 100);
      counter.decrement();
      counter.decrement();
      for (let i = 0; i < 100; i++) {
        counter.decrement();
      }
      expect(counter.getValue()).toBe(0);
    });

    it('should handle custom bounds', () => {
      const counter = createBoundedCounter(15, 10, 20);
      expect(counter.getValue()).toBe(15);
    });

    it('should start within bounds', () => {
      const counter = createBoundedCounter(0, 0, 100);
      expect(counter.getValue()).toBe(0);
    });
  });
});

describe('Counter Factory - Private Variables', () => {
  describe('createUser', () => {
    it('should create user with username and email', () => {
      const user = createUser('alice', 'alice@example.com');
      expect(typeof user).toBe('object');
      expect(user.getUsername()).toBe('alice');
    });

    it('should keep email private but accessible via getter', () => {
      const user = createUser('bob', 'bob@example.com');
      expect(user.getEmail()).toBe('bob@example.com');
    });

    it('should not expose email as public property', () => {
      const user = createUser('charlie', 'charlie@example.com');
      expect(user.email).toBeUndefined();
    });

    it('should allow updating email through method', () => {
      const user = createUser('diana', 'diana@example.com');
      user.updateEmail('diana.new@example.com');
      expect(user.getEmail()).toBe('diana.new@example.com');
    });

    it('should return different users independently', () => {
      const user1 = createUser('eve', 'eve@example.com');
      const user2 = createUser('frank', 'frank@example.com');

      user1.updateEmail('eve.new@example.com');

      expect(user1.getEmail()).toBe('eve.new@example.com');
      expect(user2.getEmail()).toBe('frank@example.com');
    });
  });

  describe('createBankAccount', () => {
    it('should create account with owner and initial balance', () => {
      const account = createBankAccount('Alice', 1000);
      expect(account.getBalance()).toBe(1000);
    });

    it('should keep balance private', () => {
      const account = createBankAccount('Bob', 500);
      expect(account.balance).toBeUndefined();
    });

    it('should allow deposits', () => {
      const account = createBankAccount('Charlie', 1000);
      account.deposit(500);
      expect(account.getBalance()).toBe(1500);
    });

    it('should allow withdrawals', () => {
      const account = createBankAccount('Diana', 1000);
      account.withdraw(300);
      expect(account.getBalance()).toBe(700);
    });

    it('should not allow over-withdrawal', () => {
      const account = createBankAccount('Eve', 500);
      account.withdraw(600);
      expect(account.getBalance()).toBe(500);
    });

    it('should track transaction history privately', () => {
      const account = createBankAccount('Frank', 1000);
      account.deposit(200);
      account.withdraw(100);
      const history = account.getTransactionHistory();
      expect(history.length).toBe(2);
    });

    it('should maintain separate balances for different accounts', () => {
      const account1 = createBankAccount('Grace', 1000);
      const account2 = createBankAccount('Henry', 500);

      account1.deposit(200);
      account2.withdraw(100);

      expect(account1.getBalance()).toBe(1200);
      expect(account2.getBalance()).toBe(400);
    });
  });

  describe('createSecureNote', () => {
    it('should create a note with password protection', () => {
      const note = createSecureNote('Secret message', 'password123');
      expect(typeof note).toBe('object');
    });

    it('should allow reading content with correct password', () => {
      const note = createSecureNote('Secret message', 'password123');
      expect(note.read('password123')).toBe('Secret message');
    });

    it('should prevent reading with wrong password', () => {
      const note = createSecureNote('Secret message', 'password123');
      expect(note.read('wrongpass')).toBeNull();
    });

    it('should not expose content directly', () => {
      const note = createSecureNote('Secret message', 'password123');
      expect(note.content).toBeUndefined();
    });

    it('should allow changing password', () => {
      const note = createSecureNote('Secret message', 'oldpass');
      note.changePassword('oldpass', 'newpass');
      expect(note.read('newpass')).toBe('Secret message');
      expect(note.read('oldpass')).toBeNull();
    });
  });

  describe('createPasswordManager', () => {
    it('should store and retrieve passwords', () => {
      const manager = createPasswordManager();
      manager.store('github', 'mypass123');
      expect(manager.retrieve('github')).toBe('mypass123');
    });

    it('should not expose stored passwords directly', () => {
      const manager = createPasswordManager();
      manager.store('github', 'mypass123');
      expect(manager.passwords).toBeUndefined();
    });

    it('should list all stored keys', () => {
      const manager = createPasswordManager();
      manager.store('github', 'pass1');
      manager.store('email', 'pass2');
      expect(manager.list()).toContain('github');
      expect(manager.list()).toContain('email');
    });

    it('should allow deleting passwords', () => {
      const manager = createPasswordManager();
      manager.store('github', 'mypass');
      manager.delete('github');
      expect(manager.retrieve('github')).toBeUndefined();
    });

    it('should maintain separate manager instances', () => {
      const manager1 = createPasswordManager();
      const manager2 = createPasswordManager();

      manager1.store('key1', 'value1');
      manager2.store('key2', 'value2');

      expect(manager1.retrieve('key1')).toBe('value1');
      expect(manager1.retrieve('key2')).toBeUndefined();
      expect(manager2.retrieve('key2')).toBe('value2');
      expect(manager2.retrieve('key1')).toBeUndefined();
    });
  });
});

describe('Counter Factory - Multiple Instances', () => {
  describe('createCounterWithName', () => {
    it('should create independent counter instances', () => {
      const counter1 = createCounterWithName('Counter 1', 0);
      const counter2 = createCounterWithName('Counter 2', 0);

      expect(counter1.getName()).toBe('Counter 1');
      expect(counter2.getName()).toBe('Counter 2');
    });

    it('should maintain separate state for each counter', () => {
      const counter1 = createCounterWithName('A', 0);
      const counter2 = createCounterWithName('B', 0);

      counter1.increment();
      counter1.increment();
      counter2.increment();

      expect(counter1.getValue()).toBe(2);
      expect(counter2.getValue()).toBe(1);
    });

    it('should handle different initial values', () => {
      const counter1 = createCounterWithName('Start 0', 0);
      const counter2 = createCounterWithName('Start 10', 10);
      const counter3 = createCounterWithName('Start -5', -5);

      expect(counter1.getValue()).toBe(0);
      expect(counter2.getValue()).toBe(10);
      expect(counter3.getValue()).toBe(-5);
    });

    it('should preserve independence through operations', () => {
      const counter1 = createCounterWithName('C1', 5);
      const counter2 = createCounterWithName('C2', 10);
      const counter3 = createCounterWithName('C3', 15);

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
    });

    it('should reset counter', () => {
      const registry = createCounterRegistry();
      registry.register('test', 5);
      registry.increment('test');
      registry.reset('test');
      expect(registry.getValue('test')).toBe(0);
    });

    it('should maintain separate registry instances', () => {
      const registry1 = createCounterRegistry();
      const registry2 = createCounterRegistry();

      registry1.register('counter', 5);
      registry2.register('counter', 10);

      expect(registry1.getValue('counter')).toBe(5);
      expect(registry2.getValue('counter')).toBe(10);
    });
  });

  describe('createCounterGroup', () => {
    it('should create a group with a name', () => {
      const group = createCounterGroup('MyGroup');
      expect(group.getName()).toBe('MyGroup');
    });

    it('should add counters to group', () => {
      const group = createCounterGroup('group1');
      group.addCounter('counter1', 0);
      expect(group.getCounter('counter1')).toBeDefined();
    });

    it('should maintain grouped counters independently', () => {
      const group1 = createCounterGroup('Group1');
      const group2 = createCounterGroup('Group2');

      group1.addCounter('c1', 0);
      group2.addCounter('c1', 10);

      group1.increment('c1');

      expect(group1.getValue('c1')).toBe(1);
      expect(group2.getValue('c1')).toBe(10);
    });
  });

  describe('createScaledCounters', () => {
    it('should create N independent counters', () => {
      const counters = createScaledCounters(3, 0);
      expect(counters.length).toBe(3);
    });

    it('should create counters with initial value', () => {
      const counters = createScaledCounters(5, 10);
      counters.forEach(counter => {
        expect(counter.getValue()).toBe(10);
      });
    });

    it('should maintain independence', () => {
      const counters = createScaledCounters(3, 0);
      counters[0].increment();
      counters[1].increment();
      counters[1].increment();

      expect(counters[0].getValue()).toBe(1);
      expect(counters[1].getValue()).toBe(2);
      expect(counters[2].getValue()).toBe(0);
    });

    it('should handle many counters', () => {
      const counters = createScaledCounters(100, 0);
      expect(counters.length).toBe(100);
      
      counters[50].increment();
      expect(counters[50].getValue()).toBe(1);
      expect(counters[49].getValue()).toBe(0);
      expect(counters[51].getValue()).toBe(0);
    });
  });
});
