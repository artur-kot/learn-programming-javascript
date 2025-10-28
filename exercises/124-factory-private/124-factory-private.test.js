import { describe, it, expect } from 'vitest';
import {
  createUser,
  createBankAccount,
  createSecureNote,
  createPasswordManager
} from './124-factory-private.js';

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
      const content = note.read('password123');
      expect(content).toBe('Secret message');
    });

    it('should prevent reading with wrong password', () => {
      const note = createSecureNote('Secret message', 'password123');
      const content = note.read('wrongpassword');
      expect(content).toBeNull();
    });

    it('should not expose content without password', () => {
      const note = createSecureNote('Secret message', 'pass');
      expect(note.content).toBeUndefined();
    });

    it('should allow updating content with correct password', () => {
      const note = createSecureNote('Original', 'pass');
      note.update('New content', 'pass');
      expect(note.read('pass')).toBe('New content');
    });

    it('should prevent updating with wrong password', () => {
      const note = createSecureNote('Original', 'pass');
      note.update('New content', 'wrong');
      expect(note.read('pass')).toBe('Original');
    });

    it('should create independent secure notes', () => {
      const note1 = createSecureNote('Message 1', 'pass1');
      const note2 = createSecureNote('Message 2', 'pass2');

      expect(note1.read('pass1')).toBe('Message 1');
      expect(note2.read('pass2')).toBe('Message 2');
      expect(note1.read('pass2')).toBeNull();
      expect(note2.read('pass1')).toBeNull();
    });
  });

  describe('createPasswordManager', () => {
    it('should create a password manager', () => {
      const manager = createPasswordManager();
      expect(typeof manager).toBe('object');
    });

    it('should store passwords securely', () => {
      const manager = createPasswordManager();
      manager.store('email', 'mypassword123');
      expect(manager.verify('email', 'mypassword123')).toBe(true);
    });

    it('should reject wrong passwords', () => {
      const manager = createPasswordManager();
      manager.store('email', 'mypassword123');
      expect(manager.verify('email', 'wrongpassword')).toBe(false);
    });

    it('should not expose stored passwords', () => {
      const manager = createPasswordManager();
      manager.store('email', 'secret');
      expect(manager.passwords).toBeUndefined();
    });

    it('should manage multiple passwords', () => {
      const manager = createPasswordManager();
      manager.store('email', 'pass1');
      manager.store('bank', 'pass2');
      manager.store('social', 'pass3');

      expect(manager.verify('email', 'pass1')).toBe(true);
      expect(manager.verify('bank', 'pass2')).toBe(true);
      expect(manager.verify('social', 'pass3')).toBe(true);
    });

    it('should update existing passwords', () => {
      const manager = createPasswordManager();
      manager.store('email', 'oldpass');
      manager.update('email', 'oldpass', 'newpass');

      expect(manager.verify('email', 'oldpass')).toBe(false);
      expect(manager.verify('email', 'newpass')).toBe(true);
    });

    it('should create independent managers', () => {
      const manager1 = createPasswordManager();
      const manager2 = createPasswordManager();

      manager1.store('email', 'pass1');
      manager2.store('email', 'pass2');

      expect(manager1.verify('email', 'pass1')).toBe(true);
      expect(manager2.verify('email', 'pass2')).toBe(true);
      expect(manager1.verify('email', 'pass2')).toBe(false);
    });
  });

  describe('Encapsulation', () => {
    it('should prevent direct property modification in createUser', () => {
      const user = createUser('john', 'john@example.com');
      user.email = 'hacked@example.com';
      expect(user.getEmail()).toBe('john@example.com');
    });

    it('should prevent direct balance modification', () => {
      const account = createBankAccount('Jane', 1000);
      account.balance = 999999;
      expect(account.getBalance()).toBe(1000);
    });

    it('should prevent direct content modification in secure note', () => {
      const note = createSecureNote('Secret', 'pass');
      note.content = 'Hacked!';
      expect(note.read('pass')).toBe('Secret');
    });
  });
});
