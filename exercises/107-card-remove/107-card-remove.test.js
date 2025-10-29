import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  removeCard,
  removeAllCards,
  removeCardById,
  removeCardsByClass,
  replaceCard
} from './107-card-remove.js';

describe('Card Generator - Remove Cards', () => {
  let dom;
  let window;
  let document;

  beforeEach(() => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head><title>Test</title></head>
      <body>
        <div id="container"></div>
      </body>
      </html>
    `;
    dom = new JSDOM(html);
    window = dom.window;
    document = window.document;
    global.window = window;
    global.document = document;
  });

  describe('removeCard', () => {
    it('should remove a card from parent', () => {
      const container = document.getElementById('container');
      const card = document.createElement('div');
      card.className = 'card';
      container.appendChild(card);
      
      expect(container.children.length).toBe(1);
      removeCard(card);
      expect(container.children.length).toBe(0);
    });

    it('should remove specific card from multiple', () => {
      const container = document.getElementById('container');
      const card1 = document.createElement('div');
      const card2 = document.createElement('div');
      
      card1.id = 'first';
      card2.id = 'second';
      
      container.appendChild(card1);
      container.appendChild(card2);
      
      removeCard(card2);
      
      expect(container.children.length).toBe(1);
      expect(container.firstChild.id).toBe('first');
    });

    it('should handle card with no parent', () => {
      const card = document.createElement('div');
      expect(() => removeCard(card)).not.toThrow();
    });
  });

  describe('removeAllCards', () => {
    it('should remove all children', () => {
      const container = document.getElementById('container');
      
      for (let i = 0; i < 5; i++) {
        container.appendChild(document.createElement('div'));
      }
      
      expect(container.children.length).toBe(5);
      removeAllCards(container);
      expect(container.children.length).toBe(0);
    });

    it('should leave container intact', () => {
      const container = document.getElementById('container');
      const card = document.createElement('div');
      card.className = 'card';
      container.appendChild(card);
      
      removeAllCards(container);
      
      expect(document.getElementById('container')).toBe(container);
    });

    it('should handle empty container', () => {
      const container = document.getElementById('container');
      expect(() => removeAllCards(container)).not.toThrow();
      expect(container.children.length).toBe(0);
    });
  });

  describe('removeCardById', () => {
    it('should remove card by ID', () => {
      const container = document.getElementById('container');
      const card = document.createElement('div');
      card.id = 'remove-me';
      container.appendChild(card);
      
      removeCardById(container, 'remove-me');
      
      expect(container.children.length).toBe(0);
    });

    it('should only remove matching ID', () => {
      const container = document.getElementById('container');
      const card1 = document.createElement('div');
      const card2 = document.createElement('div');
      
      card1.id = 'keep';
      card2.id = 'remove';
      
      container.appendChild(card1);
      container.appendChild(card2);
      
      removeCardById(container, 'remove');
      
      expect(container.children.length).toBe(1);
      expect(container.firstChild.id).toBe('keep');
    });

    it('should not throw if ID not found', () => {
      const container = document.getElementById('container');
      expect(() => removeCardById(container, 'nonexistent')).not.toThrow();
    });
  });

  describe('removeCardsByClass', () => {
    it('should remove cards by class', () => {
      const container = document.getElementById('container');
      const card1 = document.createElement('div');
      const card2 = document.createElement('div');
      
      card1.className = 'removable';
      card2.className = 'removable';
      
      container.appendChild(card1);
      container.appendChild(card2);
      
      removeCardsByClass(container, 'removable');
      
      expect(container.children.length).toBe(0);
    });

    it('should only remove cards with class', () => {
      const container = document.getElementById('container');
      const card1 = document.createElement('div');
      const card2 = document.createElement('div');
      
      card1.className = 'removable';
      card2.className = 'keep';
      
      container.appendChild(card1);
      container.appendChild(card2);
      
      removeCardsByClass(container, 'removable');
      
      expect(container.children.length).toBe(1);
      expect(container.firstChild.className).toBe('keep');
    });

    it('should handle multiple classes', () => {
      const container = document.getElementById('container');
      const card = document.createElement('div');
      card.className = 'card removable featured';
      container.appendChild(card);
      
      removeCardsByClass(container, 'removable');
      
      expect(container.children.length).toBe(0);
    });

    it('should not throw if class not found', () => {
      const container = document.getElementById('container');
      const card = document.createElement('div');
      card.className = 'other';
      container.appendChild(card);
      
      expect(() => removeCardsByClass(container, 'nonexistent')).not.toThrow();
      expect(container.children.length).toBe(1);
    });
  });

  describe('replaceCard', () => {
    it('should replace card', () => {
      const container = document.getElementById('container');
      const oldCard = document.createElement('div');
      const newCard = document.createElement('div');
      
      oldCard.id = 'old';
      newCard.id = 'new';
      
      container.appendChild(oldCard);
      replaceCard(container, oldCard, newCard);
      
      expect(container.children.length).toBe(1);
      expect(container.firstChild.id).toBe('new');
    });

    it('should maintain position', () => {
      const container = document.getElementById('container');
      const card1 = document.createElement('div');
      const card2 = document.createElement('div');
      const replacement = document.createElement('div');
      
      card1.id = 'first';
      card2.id = 'third';
      replacement.id = 'second';
      
      container.appendChild(card1);
      container.appendChild(card2);
      
      replaceCard(container, card2, replacement);
      
      expect(container.children[1].id).toBe('second');
    });

    it('should handle multiple replacements', () => {
      const container = document.getElementById('container');
      const old1 = document.createElement('div');
      const new1 = document.createElement('div');
      const old2 = document.createElement('div');
      const new2 = document.createElement('div');
      
      old1.id = 'old1';
      new1.id = 'new1';
      old2.id = 'old2';
      new2.id = 'new2';
      
      container.appendChild(old1);
      container.appendChild(old2);
      
      replaceCard(container, old1, new1);
      replaceCard(container, old2, new2);
      
      expect(container.firstChild.id).toBe('new1');
      expect(container.lastChild.id).toBe('new2');
    });
  });
});
