import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  addCardClass,
  setCardId,
  addDataAttribute,
  getDataAttribute,
  createStyledCard
} from './105-card-attributes.js';

describe('Card Generator - Set Attributes', () => {
  let dom;
  let window;
  let document;

  beforeEach(() => {
    dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    window = dom.window;
    document = window.document;
    global.window = window;
    global.document = document;
  });

  describe('addCardClass', () => {
    it('should add class to element', () => {
      const card = document.createElement('div');
      addCardClass(card, 'card');
      expect(card.classList.contains('card')).toBe(true);
    });

    it('should add multiple classes', () => {
      const card = document.createElement('div');
      addCardClass(card, 'card');
      addCardClass(card, 'dark');
      expect(card.classList.contains('card')).toBe(true);
      expect(card.classList.contains('dark')).toBe(true);
    });

    it('should not duplicate classes', () => {
      const card = document.createElement('div');
      addCardClass(card, 'card');
      addCardClass(card, 'card');
      const classList = Array.from(card.classList);
      expect(classList.filter(c => c === 'card').length).toBe(1);
    });
  });

  describe('setCardId', () => {
    it('should set ID on element', () => {
      const card = document.createElement('div');
      setCardId(card, 'card-1');
      expect(card.id).toBe('card-1');
    });

    it('should replace existing ID', () => {
      const card = document.createElement('div');
      card.id = 'old-id';
      setCardId(card, 'new-id');
      expect(card.id).toBe('new-id');
    });

    it('should handle different IDs', () => {
      const card1 = document.createElement('div');
      const card2 = document.createElement('div');
      setCardId(card1, 'card-1');
      setCardId(card2, 'card-2');
      expect(card1.id).toBe('card-1');
      expect(card2.id).toBe('card-2');
    });
  });

  describe('addDataAttribute', () => {
    it('should add data attribute', () => {
      const card = document.createElement('div');
      addDataAttribute(card, 'type', 'product');
      expect(card.dataset.type).toBe('product');
    });

    it('should add multiple data attributes', () => {
      const card = document.createElement('div');
      addDataAttribute(card, 'id', '123');
      addDataAttribute(card, 'name', 'Card Name');
      expect(card.dataset.id).toBe('123');
      expect(card.dataset.name).toBe('Card Name');
    });

    it('should handle different values', () => {
      const card = document.createElement('div');
      addDataAttribute(card, 'count', '5');
      addDataAttribute(card, 'visible', 'true');
      expect(card.dataset.count).toBe('5');
      expect(card.dataset.visible).toBe('true');
    });

    it('should use getAttribute', () => {
      const card = document.createElement('div');
      addDataAttribute(card, 'test', 'value');
      expect(card.getAttribute('data-test')).toBe('value');
    });
  });

  describe('getDataAttribute', () => {
    it('should get data attribute value', () => {
      const card = document.createElement('div');
      card.dataset.type = 'product';
      const value = getDataAttribute(card, 'type');
      expect(value).toBe('product');
    });

    it('should return null if not set', () => {
      const card = document.createElement('div');
      const value = getDataAttribute(card, 'missing');
      expect(value).toBeNull();
    });

    it('should work with multiple attributes', () => {
      const card = document.createElement('div');
      addDataAttribute(card, 'id', '123');
      addDataAttribute(card, 'name', 'Test');
      expect(getDataAttribute(card, 'id')).toBe('123');
      expect(getDataAttribute(card, 'name')).toBe('Test');
    });
  });

  describe('createStyledCard', () => {
    it('should create card object', () => {
      const card = createStyledCard('Title', 'Content', 'card-1', 'card', {});
      expect(typeof card).toBe('object');
      expect(card.card).toBeTruthy();
    });

    it('should set ID', () => {
      const card = createStyledCard('Title', 'Content', 'my-card', 'card', {});
      expect(card.card.id).toBe('my-card');
    });

    it('should add class', () => {
      const card = createStyledCard('Title', 'Content', 'id', 'styled', {});
      expect(card.card.classList.contains('styled')).toBe(true);
    });

    it('should add data attributes', () => {
      const attrs = { type: 'product', priority: 'high' };
      const card = createStyledCard('Title', 'Content', 'id', 'card', attrs);
      expect(card.card.dataset.type).toBe('product');
      expect(card.card.dataset.priority).toBe('high');
    });

    it('should have content', () => {
      const card = createStyledCard('My Title', 'My Content', 'id', 'card', {});
      expect(card.header.textContent).toBe('My Title');
      expect(card.content.textContent).toBe('My Content');
    });

    it('should handle complex data attributes', () => {
      const attrs = { id: '123', status: 'active', category: 'tech' };
      const card = createStyledCard('Title', 'Content', 'card-id', 'premium', attrs);
      expect(card.card.dataset.id).toBe('123');
      expect(card.card.dataset.status).toBe('active');
      expect(card.card.dataset.category).toBe('tech');
    });
  });
});
